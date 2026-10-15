#!/usr/bin/env node
'use strict';
// Confere se a máquina está pronta pra rodar o Hayashi OS e diz o que falta.
//
// Uso:
//   node scripts/verificar-ambiente.js
//
// Não altera nada. O /instalar usa isso.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { RAIZ, carregarEnv } = require('./_lib');

const OK = '  [ok]  ';
const FALTA = '  [--]  ';
const AVISO = '  [!]   ';
const pendencias = [];

function cmd(c) {
  try {
    return execSync(c, { stdio: ['ignore', 'pipe', 'ignore'], encoding: 'utf8', windowsHide: true }).trim();
  } catch {
    return null;
  }
}
function linha(ok, texto, dica) {
  console.log((ok ? OK : FALTA) + texto);
  if (!ok && dica) pendencias.push(dica);
}

console.log('\nHayashi OS, verificação de ambiente\n');

// Node
const [maior, menor] = process.versions.node.split('.').map(Number);
const nodeOk = maior > 20 || (maior === 20 && menor >= 6);
linha(nodeOk, `Node.js ${process.versions.node}${nodeOk ? '' : ' (precisa 20.6 ou superior)'}`, 'Instale o Node.js LTS em https://nodejs.org');

// Git
const gitV = cmd('git --version');
linha(Boolean(gitV), gitV || 'Git não encontrado', 'Instale o Git em https://git-scm.com');
if (gitV) {
  const nome = cmd('git config --get user.name');
  const email = cmd('git config --get user.email');
  linha(Boolean(nome && email), nome && email ? `Git configurado como ${nome} <${email}>` : 'Git sem nome/email', 'git config --local user.name "Seu Nome" e user.email "voce@hayashi.agr.br"');
  const remoto = cmd(`git -C "${RAIZ}" remote get-url origin`);
  console.log((remoto ? OK : AVISO) + (remoto ? `origin: ${remoto}` : 'Sem remoto git (o administrador configura; /salvar faz commit local)'));
}

// Playwright
let pw = null;
try {
  pw = require('playwright');
} catch {
  pw = null;
}
linha(Boolean(pw), pw ? 'Pacote playwright instalado' : 'Pacote playwright não instalado (necessário pra PNG e PDF)', 'Na raiz do projeto: npm install');
if (pw) {
  let exe = null;
  try {
    exe = pw.chromium.executablePath();
  } catch {
    exe = null;
  }
  const tem = Boolean(exe && fs.existsSync(exe));
  linha(tem, tem ? 'Chromium do Playwright instalado' : 'Chromium do Playwright não baixado', 'npx playwright install chromium');
}

// ffmpeg
const ff = cmd('ffmpeg -version');
const fp = cmd('ffprobe -version');
if (ff && fp) {
  const temX264 = /enable-libx264|--enable-gpl/.test(ff) || Boolean(cmd('ffmpeg -hide_banner -encoders 2>&1 | findstr libx264') || cmd('ffmpeg -hide_banner -encoders | grep libx264'));
  console.log(OK + `ffmpeg ${ff.split('\n')[0].replace('ffmpeg version ', '').split(' ')[0]}${temX264 ? '' : ' (sem libx264: MP4 pode não sair)'}`);
} else {
  console.log(AVISO + 'ffmpeg não encontrado (só precisa pra /video). Windows: winget install Gyan.FFmpeg  |  Mac: brew install ffmpeg');
}

// Fontes do sistema (pra legendas gravadas em vídeo)
if (process.platform === 'win32') {
  const fontes = path.join(process.env.WINDIR || 'C:\\Windows', 'Fonts');
  let temLato = false;
  try {
    temLato = fs.readdirSync(fontes).some((f) => /^lato/i.test(f));
  } catch {
    temLato = false;
  }
  const local = path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'Windows', 'Fonts');
  try {
    temLato = temLato || fs.readdirSync(local).some((f) => /^lato/i.test(f));
  } catch {
    /* sem pasta local */
  }
  console.log((temLato ? OK : AVISO) + (temLato ? 'Fonte Lato instalada (legendas em vídeo)' : 'Fonte Lato não instalada: legendas em vídeo saem na fonte padrão (opcional: baixar em fonts.google.com/specimen/Lato)'));
}

// .env
const envPath = path.join(RAIZ, '.env');
const temEnv = fs.existsSync(envPath);
if (temEnv) carregarEnv(envPath);
console.log((temEnv ? OK : AVISO) + (temEnv ? '.env encontrado' : '.env ausente (só precisa pra transcrição automática e publicação em redes)'));
if (temEnv) {
  const grupos = [
    ['Transcrição de vídeo (OpenAI)', ['OPENAI_API_KEY']],
    ['Publicar Instagram', ['META_PAGE_ACCESS_TOKEN', 'META_IG_USER_ID']],
    ['Publicar Facebook', ['META_PAGE_ACCESS_TOKEN', 'META_PAGE_ID']],
    ['Hospedar imagens (imgbb)', ['IMGBB_API_KEY']],
  ];
  for (const [nome, chaves] of grupos) {
    const falta = chaves.filter((k) => !process.env[k]);
    console.log((falta.length ? AVISO : OK) + `${nome}: ${falta.length ? 'falta ' + falta.join(', ') : 'configurado'}`);
  }
}

// Estrutura e memória
const esperados = ['CLAUDE.md', '_memoria/empresa.md', '_memoria/cultura.md', '_memoria/politicas.md', '_memoria/preferencias.md', 'identidade/design-guide.md', 'identidade/hayashi.css', 'identidade/logo.png', 'identidade/templates', '.claude/skills'];
const faltando = esperados.filter((p) => !fs.existsSync(path.join(RAIZ, p)));
linha(faltando.length === 0, faltando.length ? `Estrutura incompleta: falta ${faltando.join(', ')}` : 'Estrutura do Hayashi OS completa', 'Rode /atualizar-sistema ou clone de novo');

try {
  const cultura = fs.readFileSync(path.join(RAIZ, '_memoria/cultura.md'), 'utf8');
  const temArq = /### X\. Reconhecimento/.test(cultura);
  linha(temArq, temArq ? 'Guia da Cultura carregado (10 arquétipos)' : 'Guia da Cultura incompleto em _memoria/cultura.md', 'Rode /atualizar-sistema');
} catch {
  /* já apontado acima */
}

const usuario = path.join(RAIZ, '_memoria/usuario.md');
const temUsuario = fs.existsSync(usuario) && /\*\*Nome:\*\*\s*\S/.test(fs.readFileSync(usuario, 'utf8'));
console.log((temUsuario ? OK : AVISO) + (temUsuario ? 'usuario.md preenchido' : '_memoria/usuario.md ausente ou vazio (rode /instalar)'));

console.log('');
if (pendencias.length) {
  console.log('Pra deixar tudo pronto:');
  pendencias.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
  console.log('');
  process.exit(2);
} else {
  console.log('Ambiente pronto.\n');
}
