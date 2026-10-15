#!/usr/bin/env node
'use strict';
// Edição de vídeo com ffmpeg, no padrão Hayashi.
//
// Precisa do ffmpeg completo instalado (Windows: winget install Gyan.FFmpeg;
// Mac: brew install ffmpeg). node scripts/verificar-ambiente.js confere.
//
// Uso: node scripts/video.js <comando> [argumentos] [--opcoes]
//
//   info <video>                                   duração, tamanho, codecs, áudio
//   cortar <in> <out> --inicio 0:05 --fim 0:20    (ou --duracao 15) [--rapido: sem reencodar]
//   juntar <out> <in1> <in2> [...]                 concatena (ajusta tudo ao tamanho do 1º)
//   formato <in> <out> --preset reels|story|feed|quadrado|youtube|whatsapp [--modo ajustar|cortar|desfocar]
//   vinheta <in> <out> --abertura capa.png [--encerramento fim.png] [--duracao 3] [--fade 0.6]
//   sobrepor <in> <out> --imagem lower.png --inicio 2 --fim 8 [--fade 0.4]   (PNG transparente do tamanho do vídeo)
//   marca <in> <out> [--logo identidade/logo.png] [--posicao sup-dir|sup-esq|inf-dir|inf-esq] [--escala 0.12] [--opacidade 0.85]
//   legenda <in> <out> --srt legendas.srt [--tamanho 22]
//   audio <in> <out> --musica trilha.mp3 [--volume 0.25] [--substituir] [--fade 2]
//   extrair-audio <in> <out.mp3>
//   thumbnail <in> <out.png> [--tempo 0:03]
//   converter <in> <out.mp4> [--qualidade alta|media|baixa] [--sem-audio]
//
// Tempos aceitam segundos (12), mm:ss (1:30) ou hh:mm:ss(.ms).

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { args, garantirPasta } = require('./_lib');

const TEAL = '#007581';
const PRESETS = {
  reels: { w: 1080, h: 1920 },
  story: { w: 1080, h: 1920 },
  feed: { w: 1080, h: 1350 },
  quadrado: { w: 1080, h: 1080 },
  youtube: { w: 1920, h: 1080 },
  tv: { w: 1920, h: 1080 },
  whatsapp: { w: 1280, h: 720, maxMB: 15 },
};
const QUALIDADE = { alta: 18, media: 21, baixa: 26 };

// ---------- localizar ffmpeg ----------
function existeExe(cmd) {
  const r = spawnSync(cmd, ['-version'], { stdio: 'ignore', windowsHide: true });
  return !r.error && r.status === 0;
}
function acharBin(nome) {
  if (process.env.FFMPEG_DIR) {
    const p = path.join(process.env.FFMPEG_DIR, process.platform === 'win32' ? `${nome}.exe` : nome);
    if (fs.existsSync(p)) return p;
  }
  if (existeExe(nome)) return nome;
  // fallback: ffmpeg do Playwright (só codifica VP8/WebM e não tem ffprobe)
  const base = process.platform === 'win32' ? path.join(os.homedir(), 'AppData', 'Local', 'ms-playwright') : path.join(os.homedir(), '.cache', 'ms-playwright');
  if (nome === 'ffmpeg' && fs.existsSync(base)) {
    const dirs = fs.readdirSync(base).filter((d) => d.startsWith('ffmpeg')).sort().reverse();
    for (const d of dirs) {
      const cand = fs.readdirSync(path.join(base, d)).find((f) => f.startsWith('ffmpeg'));
      if (cand) {
        console.warn('  aviso: usando o ffmpeg do Playwright, que só gera WebM/VP8. Pra MP4 instale o ffmpeg completo: winget install Gyan.FFmpeg');
        return path.join(base, d, cand);
      }
    }
  }
  console.error(`${nome} não encontrado. Instale o ffmpeg completo:\n  Windows: winget install Gyan.FFmpeg   (feche e abra o terminal depois)\n  Mac:     brew install ffmpeg`);
  process.exit(1);
}
const FFMPEG = acharBin('ffmpeg');
let FFPROBE = null;
function ffprobe() {
  if (!FFPROBE) FFPROBE = acharBin('ffprobe');
  return FFPROBE;
}

let VERBOSO = false; // --verboso mostra o log completo do ffmpeg

function rodar(argv) {
  const r = spawnSync(FFMPEG, ['-hide_banner', '-loglevel', VERBOSO ? 'info' : 'error', '-y', ...argv], {
    stdio: VERBOSO ? ['ignore', 'inherit', 'inherit'] : ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
    windowsHide: true,
  });
  if (r.status !== 0) {
    const detalhe = !VERBOSO && r.stderr ? ': ' + r.stderr.trim().split('\n').slice(-6).join('\n') : '';
    throw new Error(`ffmpeg falhou (código ${r.status})${detalhe}\nRode de novo com --verboso pra ver o log completo.`);
  }
  return r;
}

function info(arquivo) {
  const r = spawnSync(ffprobe(), ['-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams', arquivo], { encoding: 'utf8', windowsHide: true });
  if (r.status !== 0) throw new Error(`ffprobe não conseguiu ler ${arquivo}`);
  const j = JSON.parse(r.stdout);
  const v = (j.streams || []).find((s) => s.codec_type === 'video');
  const a = (j.streams || []).find((s) => s.codec_type === 'audio');
  const fpsStr = v && v.avg_frame_rate ? v.avg_frame_rate : '30/1';
  const [n, d] = fpsStr.split('/').map(Number);
  return {
    duracao: parseFloat((j.format && j.format.duration) || (v && v.duration) || 0),
    tamanhoMB: j.format && j.format.size ? +(j.format.size / 1048576).toFixed(2) : null,
    largura: v ? v.width : null,
    altura: v ? v.height : null,
    fps: d ? +(n / d).toFixed(2) : 30,
    codecVideo: v ? v.codec_name : null,
    codecAudio: a ? a.codec_name : null,
    temAudio: Boolean(a),
    temVideo: Boolean(v),
  };
}

function segundos(t) {
  if (t === undefined || t === null) return null;
  const s = String(t).trim();
  if (/^\d+(\.\d+)?$/.test(s)) return parseFloat(s);
  const partes = s.split(':').map(Number);
  if (partes.some(isNaN)) throw new Error(`Tempo inválido: ${t}`);
  return partes.reduce((acc, p) => acc * 60 + p, 0);
}

const ENC_VIDEO = (crf = 21) => ['-c:v', 'libx264', '-preset', 'medium', '-crf', String(crf), '-pix_fmt', 'yuv420p', '-movflags', '+faststart'];
const ENC_AUDIO = ['-c:a', 'aac', '-b:a', '160k', '-ar', '48000'];

function prepararSaida(saida) {
  garantirPasta(path.dirname(path.resolve(saida)));
  return path.resolve(saida);
}

function escaparFiltroCaminho(p) {
  // caminho pra usar dentro de -vf (subtitles=...): barras normais e ':' escapado
  return p.replace(/\\/g, '/').replace(/:/g, '\\:').replace(/'/g, "\\'");
}

function tempPath(ext) {
  return path.join(os.tmpdir(), `hayashi-video-${process.pid}-${Math.random().toString(36).slice(2, 8)}${ext}`);
}

// escala + enquadramento pra um tamanho alvo
function filtroEnquadrar(w, h, modo) {
  if (modo === 'cortar') return `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},setsar=1`;
  if (modo === 'desfocar') {
    return `split[a][b];[a]scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},boxblur=24:8[bg];[b]scale=${w}:${h}:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1`;
  }
  return `scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=${TEAL},setsar=1`;
}

// ---------- comandos ----------
const comandos = {
  info([arquivo]) {
    if (!arquivo) throw new Error('Uso: info <video>');
    const i = info(arquivo);
    console.log(JSON.stringify(i, null, 2));
  },

  cortar([entrada, saida], f) {
    if (!entrada || !saida) throw new Error('Uso: cortar <in> <out> --inicio 0:05 --fim 0:20 | --duracao 15 [--rapido]');
    const ini = segundos(f.inicio) || 0;
    const fim = f.fim !== undefined ? segundos(f.fim) : f.duracao !== undefined ? ini + segundos(f.duracao) : null;
    const out = prepararSaida(saida);
    const argv = ['-ss', String(ini), '-i', entrada];
    if (fim !== null) argv.push('-to', String(fim - ini));
    if (f.rapido) argv.push('-c', 'copy');
    else argv.push(...ENC_VIDEO(), ...ENC_AUDIO);
    rodar([...argv, out]);
    console.log(`Cortado: ${out}`);
  },

  juntar([saida, ...entradas], f) {
    if (!saida || entradas.length < 2) throw new Error('Uso: juntar <out> <in1> <in2> [...]');
    const base = info(entradas[0]);
    const w = base.largura, h = base.altura;
    const argv = [];
    const partes = [];
    let idx = 0;
    const silencios = [];
    entradas.forEach((e) => {
      argv.push('-i', e);
    });
    entradas.forEach((e, i) => {
      const inf = info(e);
      let aLabel;
      if (inf.temAudio) aLabel = `[${i}:a]`;
      else {
        const si = entradas.length + silencios.length;
        argv.push('-f', 'lavfi', '-t', String(inf.duracao || 1), '-i', 'anullsrc=r=48000:cl=stereo');
        silencios.push(si);
        aLabel = `[${si}:a]`;
      }
      partes.push(`[${i}:v]${filtroEnquadrar(w, h, f.modo || 'ajustar')},fps=30,format=yuv420p[v${i}];${aLabel}aresample=48000,aformat=channel_layouts=stereo[a${i}]`);
      idx++;
    });
    const concat = entradas.map((_, i) => `[v${i}][a${i}]`).join('') + `concat=n=${idx}:v=1:a=1[v][a]`;
    const out = prepararSaida(saida);
    rodar([...argv, '-filter_complex', partes.join(';') + ';' + concat, '-map', '[v]', '-map', '[a]', ...ENC_VIDEO(), ...ENC_AUDIO, out]);
    console.log(`Junto: ${out}`);
  },

  formato([entrada, saida], f) {
    const preset = PRESETS[String(f.preset || '').toLowerCase()];
    if (!entrada || !saida || !preset) throw new Error('Uso: formato <in> <out> --preset reels|story|feed|quadrado|youtube|whatsapp [--modo ajustar|cortar|desfocar]');
    const out = prepararSaida(saida);
    const inf = info(entrada);
    const argv = ['-i', entrada, '-vf', filtroEnquadrar(preset.w, preset.h, f.modo || 'ajustar')];
    if (preset.maxMB && inf.duracao) {
      const bitsTotais = preset.maxMB * 8 * 1024 * 1024;
      const audioK = 96;
      // teto de 2500 kbps (720p já fica bom); o cálculo só reduz quando o vídeo é longo
      const videoK = Math.min(2500, Math.max(300, Math.floor(bitsTotais / inf.duracao / 1000) - audioK - 50));
      argv.push('-c:v', 'libx264', '-preset', 'medium', '-b:v', `${videoK}k`, '-maxrate', `${videoK}k`, '-bufsize', `${videoK * 2}k`, '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', `${audioK}k`, '-ar', '44100');
      console.log(`  alvo WhatsApp: ~${preset.maxMB} MB → vídeo ${videoK} kbps`);
    } else {
      argv.push(...ENC_VIDEO(), ...ENC_AUDIO);
    }
    rodar([...argv, out]);
    const r = info(out);
    console.log(`Formato ${f.preset} (${preset.w}x${preset.h}): ${out} (${r.tamanhoMB} MB)`);
  },

  vinheta([entrada, saida], f) {
    if (!entrada || !saida || (!f.abertura && !f.encerramento)) throw new Error('Uso: vinheta <in> <out> --abertura capa.png [--encerramento fim.png] [--duracao 3] [--fade 0.6]');
    const inf = info(entrada);
    const dur = parseFloat(f.duracao || '3');
    const fade = parseFloat(f.fade || '0.6');
    const temps = [];
    const clipeDeImagem = (img) => {
      const t = tempPath('.mp4');
      rodar(['-loop', '1', '-t', String(dur), '-i', img, '-f', 'lavfi', '-t', String(dur), '-i', 'anullsrc=r=48000:cl=stereo',
        '-vf', `${filtroEnquadrar(inf.largura, inf.altura, 'ajustar')},fps=30,fade=t=in:st=0:d=${fade},fade=t=out:st=${Math.max(0, dur - fade)}:d=${fade},format=yuv420p`,
        '-shortest', ...ENC_VIDEO(), ...ENC_AUDIO, t]);
      temps.push(t);
      return t;
    };
    const lista = [];
    if (f.abertura) lista.push(clipeDeImagem(f.abertura));
    lista.push(entrada);
    if (f.encerramento) lista.push(clipeDeImagem(f.encerramento));
    try {
      comandos.juntar([saida, ...lista], {});
    } finally {
      temps.forEach((t) => fs.existsSync(t) && fs.unlinkSync(t));
    }
    console.log(`Vinheta aplicada: ${path.resolve(saida)}`);
  },

  sobrepor([entrada, saida], f) {
    if (!entrada || !saida || !f.imagem) throw new Error('Uso: sobrepor <in> <out> --imagem lower.png --inicio 2 --fim 8 [--fade 0.4]');
    const inf = info(entrada);
    const ini = segundos(f.inicio) || 0;
    const fim = f.fim !== undefined ? segundos(f.fim) : inf.duracao;
    const fade = parseFloat(f.fade || '0.4');
    const out = prepararSaida(saida);
    const ov = `[1:v]scale=${inf.largura}:${inf.altura},format=rgba,fade=t=in:st=${ini}:d=${fade}:alpha=1,fade=t=out:st=${Math.max(ini, fim - fade)}:d=${fade}:alpha=1[ov];[0:v][ov]overlay=0:0:enable='between(t,${ini},${fim})'[v]`;
    const argv = ['-i', entrada, '-loop', '1', '-i', f.imagem, '-filter_complex', ov, '-map', '[v]'];
    if (inf.temAudio) argv.push('-map', '0:a', ...ENC_AUDIO);
    rodar([...argv, '-shortest', ...ENC_VIDEO(), out]);
    console.log(`Sobreposição aplicada (${ini}s a ${fim}s): ${out}`);
  },

  marca([entrada, saida], f) {
    if (!entrada || !saida) throw new Error('Uso: marca <in> <out> [--logo identidade/logo.png] [--posicao inf-dir] [--escala 0.12] [--opacidade 0.85]');
    const logo = f.logo || path.join(__dirname, '..', 'identidade', 'logo.png');
    if (!fs.existsSync(logo)) throw new Error(`Logo não encontrado: ${logo}`);
    const inf = info(entrada);
    const escala = parseFloat(f.escala || '0.12');
    const op = parseFloat(f.opacidade || '0.85');
    const m = 40;
    const pos = { 'sup-dir': `W-w-${m}:${m}`, 'sup-esq': `${m}:${m}`, 'inf-dir': `W-w-${m}:H-h-${m}`, 'inf-esq': `${m}:H-h-${m}` }[f.posicao || 'inf-dir'];
    if (!pos) throw new Error('posicao: sup-dir | sup-esq | inf-dir | inf-esq');
    const out = prepararSaida(saida);
    const fc = `[1:v]scale=${Math.round(inf.largura * escala)}:-1,format=rgba,colorchannelmixer=aa=${op}[lg];[0:v][lg]overlay=${pos}[v]`;
    const argv = ['-i', entrada, '-i', logo, '-filter_complex', fc, '-map', '[v]'];
    if (inf.temAudio) argv.push('-map', '0:a', '-c:a', 'copy');
    rodar([...argv, ...ENC_VIDEO(), out]);
    console.log(`Marca d'água aplicada: ${out}`);
  },

  legenda([entrada, saida], f) {
    if (!entrada || !saida || !f.srt) throw new Error('Uso: legenda <in> <out> --srt legendas.srt [--tamanho 22]');
    const tmp = tempPath('.srt');
    fs.copyFileSync(f.srt, tmp);
    const tam = parseInt(f.tamanho || '22', 10);
    // Estilo Hayashi: Lato branca sobre faixa verde-petróleo translúcida (cores ASS em &HAABBGGRR)
    const estilo = `FontName=Lato,FontSize=${tam},PrimaryColour=&H00FFFFFF,OutlineColour=&H00817500,BackColour=&H60817500,BorderStyle=3,Outline=2,Shadow=0,MarginV=36,Alignment=2,Bold=0`;
    const out = prepararSaida(saida);
    try {
      rodar(['-i', entrada, '-vf', `subtitles='${escaparFiltroCaminho(tmp)}':force_style='${estilo}'`, ...ENC_VIDEO(), '-c:a', 'copy', out]);
    } finally {
      fs.existsSync(tmp) && fs.unlinkSync(tmp);
    }
    console.log(`Legendas gravadas: ${out} (se a fonte Lato não estiver instalada no sistema, o ffmpeg usa a fonte padrão)`);
  },

  audio([entrada, saida], f) {
    if (!entrada || !saida || !f.musica) throw new Error('Uso: audio <in> <out> --musica trilha.mp3 [--volume 0.25] [--substituir] [--fade 2]');
    const inf = info(entrada);
    const vol = parseFloat(f.volume || '0.25');
    const fade = parseFloat(f.fade || '2');
    const out = prepararSaida(saida);
    const musica = `[1:a]volume=${vol},afade=t=in:st=0:d=${fade},afade=t=out:st=${Math.max(0, inf.duracao - fade)}:d=${fade},aformat=channel_layouts=stereo,aresample=48000[m]`;
    let fc, mapA;
    if (f.substituir || !inf.temAudio) {
      fc = musica;
      mapA = '[m]';
    } else {
      fc = `${musica};[0:a]aformat=channel_layouts=stereo,aresample=48000[o];[o][m]amix=inputs=2:duration=first:dropout_transition=2[a]`;
      mapA = '[a]';
    }
    rodar(['-i', entrada, '-stream_loop', '-1', '-i', f.musica, '-filter_complex', fc, '-map', '0:v', '-map', mapA, '-t', String(inf.duracao), '-c:v', 'copy', ...ENC_AUDIO, out]);
    console.log(`Áudio ${f.substituir ? 'substituído' : 'mixado'}: ${out}`);
  },

  'extrair-audio'([entrada, saida]) {
    if (!entrada || !saida) throw new Error('Uso: extrair-audio <in> <out.mp3>');
    const out = prepararSaida(saida);
    rodar(['-i', entrada, '-vn', '-c:a', 'libmp3lame', '-q:a', '2', out]);
    console.log(`Áudio extraído: ${out}`);
  },

  thumbnail([entrada, saida], f) {
    if (!entrada || !saida) throw new Error('Uso: thumbnail <in> <out.png> [--tempo 0:03]');
    const out = prepararSaida(saida);
    rodar(['-ss', String(segundos(f.tempo) || 1), '-i', entrada, '-frames:v', '1', out]);
    console.log(`Thumbnail: ${out}`);
  },

  converter([entrada, saida], f) {
    if (!entrada || !saida) throw new Error('Uso: converter <in> <out.mp4> [--qualidade alta|media|baixa] [--sem-audio]');
    const out = prepararSaida(saida);
    const crf = QUALIDADE[f.qualidade || 'media'] || 21;
    const argv = ['-i', entrada, ...ENC_VIDEO(crf)];
    if (f['sem-audio']) argv.push('-an');
    else argv.push(...ENC_AUDIO);
    rodar([...argv, out]);
    const r = info(out);
    console.log(`Convertido: ${out} (${r.largura}x${r.altura}, ${r.tamanhoMB} MB)`);
  },
};

(async () => {
  const { _: [cmd, ...rest], flags } = args();
  VERBOSO = Boolean(flags.verboso);
  if (!cmd || !comandos[cmd]) {
    console.error('Comandos: ' + Object.keys(comandos).join(', ') + '\nVeja o cabeçalho deste arquivo pra sintaxe de cada um.');
    process.exit(1);
  }
  comandos[cmd](rest, flags);
})().catch((e) => {
  console.error('Erro no vídeo:', e.message);
  process.exit(1);
});
