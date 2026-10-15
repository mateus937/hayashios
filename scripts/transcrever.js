#!/usr/bin/env node
'use strict';
// Transcreve áudio ou vídeo em legendas (SRT) ou texto, via API da OpenAI (whisper-1).
//
// Uso:
//   node scripts/transcrever.js <video-ou-audio> [saida.srt] [--formato srt|vtt|txt] [--idioma pt]
//
// Precisa de OPENAI_API_KEY no .env. Se o arquivo for vídeo ou passar de 24 MB, o áudio é
// extraído com o ffmpeg antes (mono, 16 kHz) pra caber no limite da API.
// Dica: termos próprios (Hayashi, Cristalina, Chapada Diamantina, batata, EPI) já vão no
// "prompt" pra melhorar a grafia.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { carregarEnv, exigirEnv, args, garantirPasta } = require('./_lib');

carregarEnv();

const LIMITE_MB = 24;
const EXT_VIDEO = ['.mp4', '.mov', '.mkv', '.avi', '.webm', '.m4v', '.wmv'];

function extrairAudio(entrada) {
  const tmp = path.join(os.tmpdir(), `hayashi-transcricao-${process.pid}.mp3`);
  const r = spawnSync('ffmpeg', ['-hide_banner', '-y', '-i', entrada, '-vn', '-ac', '1', '-ar', '16000', '-b:a', '48k', tmp], { stdio: ['ignore', 'ignore', 'pipe'], encoding: 'utf8', windowsHide: true });
  if (r.status !== 0) throw new Error('ffmpeg não conseguiu extrair o áudio. Instale o ffmpeg (winget install Gyan.FFmpeg).');
  return tmp;
}

(async () => {
  const { _: [entrada, saidaArg], flags } = args();
  if (!entrada) {
    console.error('Uso: node scripts/transcrever.js <video-ou-audio> [saida.srt] [--formato srt|vtt|txt] [--idioma pt]');
    process.exit(1);
  }
  exigirEnv('OPENAI_API_KEY');
  if (!fs.existsSync(entrada)) throw new Error(`Arquivo não encontrado: ${entrada}`);

  const formato = String(flags.formato || (saidaArg ? path.extname(saidaArg).slice(1) : 'srt') || 'srt').toLowerCase();
  if (!['srt', 'vtt', 'txt'].includes(formato)) throw new Error('formato: srt | vtt | txt');
  const saida = path.resolve(saidaArg || entrada.replace(/\.[^.]+$/, '') + '.' + formato);

  let arquivo = entrada;
  let temp = null;
  const mb = fs.statSync(entrada).size / 1048576;
  if (EXT_VIDEO.includes(path.extname(entrada).toLowerCase()) || mb > LIMITE_MB) {
    console.log(`Extraindo áudio (${mb.toFixed(1)} MB de origem)...`);
    temp = extrairAudio(entrada);
    arquivo = temp;
    const mb2 = fs.statSync(temp).size / 1048576;
    if (mb2 > LIMITE_MB) throw new Error(`Áudio com ${mb2.toFixed(1)} MB passa do limite de ${LIMITE_MB} MB. Corte o vídeo em partes (node scripts/video.js cortar ...).`);
  }

  try {
    const form = new FormData();
    form.append('file', await fs.openAsBlob(arquivo), path.basename(arquivo));
    form.append('model', process.env.OPENAI_TRANSCRIBE_MODEL || 'whisper-1');
    form.append('language', String(flags.idioma || 'pt'));
    form.append('response_format', formato === 'txt' ? 'text' : formato);
    form.append('prompt', 'Hayashi, Cristalina, Chapada Diamantina, batata, soja, milho, trigo, EPI, Linha Ética, Guia da Cultura Hayashi, colaborador, líder imediato.');
    console.log('Transcrevendo...');
    const resp = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: form,
    });
    const texto = await resp.text();
    if (!resp.ok) throw new Error(`OpenAI respondeu ${resp.status}: ${texto.slice(0, 300)}`);
    garantirPasta(path.dirname(saida));
    fs.writeFileSync(saida, texto.trim() + '\n', 'utf8');
    const linhas = texto.split(/\r?\n/).filter(Boolean).length;
    console.log(`Transcrição salva: ${saida} (${linhas} linhas). Revise nomes e termos antes de gravar no vídeo.`);
  } finally {
    if (temp && fs.existsSync(temp)) fs.unlinkSync(temp);
  }
})().catch((e) => {
  console.error('Erro na transcrição:', e.message);
  process.exit(1);
});
