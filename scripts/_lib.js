'use strict';
// Funções compartilhadas pelos scripts do HayashiOS. Não precisa chamar direto.

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');

// Lê o .env da raiz (se existir) sem depender de pacote externo.
// Variáveis já definidas no ambiente têm prioridade.
function carregarEnv(arquivo = path.join(RAIZ, '.env')) {
  if (!fs.existsSync(arquivo)) return false;
  const linhas = fs.readFileSync(arquivo, 'utf8').replace(/^﻿/, '').split(/\r?\n/);
  for (const linha of linhas) {
    const l = linha.trim();
    if (!l || l.startsWith('#')) continue;
    const i = l.indexOf('=');
    if (i < 0) continue;
    const chave = l.slice(0, i).trim();
    let valor = l.slice(i + 1).trim();
    const aspas = (valor.startsWith('"') && valor.endsWith('"')) || (valor.startsWith("'") && valor.endsWith("'"));
    if (aspas) valor = valor.slice(1, -1);
    else valor = valor.replace(/\s+#.*$/, '').trim(); // comentário no fim da linha
    if (process.env[chave] === undefined || process.env[chave] === '') process.env[chave] = valor;
  }
  return true;
}

function exigirEnv(...chaves) {
  const faltam = chaves.filter((c) => !process.env[c]);
  if (faltam.length) {
    console.error(`Faltam variáveis no .env: ${faltam.join(', ')}`);
    console.error('Copie .env.example para .env (na raiz do projeto) e preencha. Veja scripts/README.md.');
    process.exit(1);
  }
}

// Parser simples de argumentos: posicionais em _, flags em flags (--chave valor | --chave=valor | --chave)
function args(argv = process.argv.slice(2)) {
  const r = { _: [], flags: {} };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const semPrefixo = a.slice(2);
      const eq = semPrefixo.indexOf('=');
      if (eq >= 0) r.flags[semPrefixo.slice(0, eq)] = semPrefixo.slice(eq + 1);
      else if (argv[i + 1] !== undefined && !argv[i + 1].startsWith('--')) r.flags[semPrefixo] = argv[++i];
      else r.flags[semPrefixo] = true;
    } else r._.push(a);
  }
  return r;
}

function esperar(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// Chamada à Graph API da Meta (Instagram + Facebook).
async function graph(metodo, caminho, params = {}, opcoes = {}) {
  const versao = opcoes.versao || process.env.META_GRAPH_VERSION || 'v23.0';
  const token = opcoes.token || process.env.META_PAGE_ACCESS_TOKEN;
  const url = new URL(`https://graph.facebook.com/${versao}/${String(caminho).replace(/^\//, '')}`);
  const corpo = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    corpo.set(k, typeof v === 'object' ? JSON.stringify(v) : String(v));
  }
  corpo.set('access_token', token);
  let resp;
  if (metodo === 'GET') {
    url.search = corpo.toString();
    resp = await fetch(url);
  } else {
    resp = await fetch(url, { method: 'POST', body: corpo });
  }
  const json = await resp.json().catch(() => ({}));
  if (!resp.ok || json.error) {
    const e = json.error || {};
    const detalhe = [e.message || `HTTP ${resp.status}`, e.code ? `code ${e.code}` : null, e.error_subcode ? `subcode ${e.error_subcode}` : null, e.error_user_msg || null]
      .filter(Boolean)
      .join(' | ');
    throw new Error(`Graph API ${metodo} /${caminho} falhou: ${detalhe}`);
  }
  return json;
}

// Sobe uma imagem pro imgbb (hospedagem gratuita) e devolve a URL pública.
async function subirImagemImgbb(caminhoPng) {
  exigirEnv('IMGBB_API_KEY');
  const b64 = fs.readFileSync(caminhoPng).toString('base64');
  const corpo = new URLSearchParams({ image: b64, name: path.basename(caminhoPng, path.extname(caminhoPng)) });
  const expiracao = parseInt(process.env.IMGBB_EXPIRACAO || '86400', 10);
  const url = new URL('https://api.imgbb.com/1/upload');
  url.searchParams.set('key', process.env.IMGBB_API_KEY);
  if (expiracao >= 60) url.searchParams.set('expiration', String(expiracao));
  const resp = await fetch(url, { method: 'POST', body: corpo });
  const json = await resp.json().catch(() => ({}));
  if (!resp.ok || !json.success) throw new Error(`Upload pro imgbb falhou: ${JSON.stringify(json.error || json).slice(0, 300)}`);
  return json.data.url;
}

// A API do Instagram/Facebook só aceita imagens por URL pública.
// Ordem: --base-url (imagens já no site) → IMGBB_API_KEY (upload automático) → erro explicando.
async function resolverUrlsPublicas(pngs, { baseUrl } = {}) {
  if (baseUrl) {
    const base = String(baseUrl).replace(/\/+$/, '');
    return pngs.map((p) => `${base}/${path.basename(p)}`);
  }
  if (process.env.IMGBB_API_KEY) {
    const urls = [];
    for (const p of pngs) {
      const u = await subirImagemImgbb(p);
      console.log(`  upload ok: ${path.basename(p)} → ${u}`);
      urls.push(u);
    }
    return urls;
  }
  throw new Error(
    'A API da Meta precisa de URL pública das imagens. Duas opções:\n' +
      '  1) Imagens já no site: passe --base-url https://seusite.com.br/img/posts/<slug>\n' +
      '  2) Sem site: crie conta grátis em https://api.imgbb.com e coloque IMGBB_API_KEY no .env'
  );
}

// Lista os slides PNG de uma pasta de conteúdo: <pasta>/instagram/*.png (padrão) ou <pasta>/*.png
function listarSlides(pasta, sub = 'instagram') {
  const candidatos = [path.join(pasta, sub), pasta];
  for (const dir of candidatos) {
    if (!fs.existsSync(dir)) continue;
    const pngs = fs
      .readdirSync(dir)
      .filter((f) => /\.png$/i.test(f) && !/^foto-/i.test(f))
      .sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }))
      .map((f) => path.join(dir, f));
    if (pngs.length) return pngs;
  }
  throw new Error(`Nenhum PNG encontrado em ${path.join(pasta, sub)} nem em ${pasta}. Renderize antes: node scripts/render.js <html> ${path.join(pasta, sub)}`);
}

// Lê a legenda (legenda.md por padrão), tirando título markdown e comentários.
function lerLegenda(pasta, arquivo = 'legenda.md') {
  const caminho = path.isAbsolute(arquivo) ? arquivo : path.join(pasta, arquivo);
  if (!fs.existsSync(caminho)) throw new Error(`Legenda não encontrada: ${caminho}`);
  let texto = fs.readFileSync(caminho, 'utf8').replace(/^﻿/, '');
  texto = texto.replace(/<!--[\s\S]*?-->/g, '');
  const linhas = texto.split(/\r?\n/);
  while (linhas.length && (/^\s*#/.test(linhas[0]) || !linhas[0].trim())) linhas.shift();
  return linhas.join('\n').trim();
}

// Registra publicações em <pasta>/publicacoes.jsonl (serve pra idempotência do /aprovar-post)
function salvarRegistro(pasta, rede, dados) {
  const arquivo = path.join(pasta, 'publicacoes.jsonl');
  fs.appendFileSync(arquivo, JSON.stringify({ rede, ...dados }) + '\n');
}

function lerRegistros(pasta) {
  const arquivo = path.join(pasta, 'publicacoes.jsonl');
  if (!fs.existsSync(arquivo)) return [];
  return fs
    .readFileSync(arquivo, 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function garantirPasta(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

module.exports = {
  RAIZ,
  carregarEnv,
  exigirEnv,
  args,
  esperar,
  graph,
  subirImagemImgbb,
  resolverUrlsPublicas,
  listarSlides,
  lerLegenda,
  salvarRegistro,
  lerRegistros,
  garantirPasta,
};
