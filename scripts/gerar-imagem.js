#!/usr/bin/env node
'use strict';
// Gera uma imagem com IA a partir de um prompt (OpenAI ou Gemini) e salva em PNG.
//
// Uso:
//   node scripts/gerar-imagem.js "<prompt em inglês>" <saida.png> [--provedor openai|gemini] [--tamanho 1024x1536] [--qualidade medium]
//
// Exemplo:
//   node scripts/gerar-imagem.js "Editorial photo of a barber shop interior, warm light" marketing/conteudo/x/foto-capa.png
//
// Configuração (.env): OPENAI_API_KEY (+ OPENAI_IMAGE_MODEL opcional) ou GEMINI_API_KEY (+ GEMINI_IMAGE_MODEL opcional).
// IMAGEM_PROVEDOR=openai|gemini define o padrão quando --provedor não é passado.

const fs = require('fs');
const path = require('path');
const { carregarEnv, args, garantirPasta } = require('./_lib');

carregarEnv();

const TAMANHOS_OPENAI = ['1024x1024', '1024x1536', '1536x1024', 'auto'];

function proporcaoDe(tamanho) {
  const [w, h] = tamanho.split('x').map(Number);
  if (!w || !h) return '4:5';
  const r = w / h;
  const opcoes = { '1:1': 1, '4:5': 0.8, '5:4': 1.25, '3:4': 0.75, '4:3': 1.333, '2:3': 0.667, '3:2': 1.5, '9:16': 0.5625, '16:9': 1.778 };
  let melhor = '1:1';
  let dist = Infinity;
  for (const [k, v] of Object.entries(opcoes)) {
    const d = Math.abs(v - r);
    if (d < dist) {
      dist = d;
      melhor = k;
    }
  }
  return melhor;
}

async function gerarOpenAI(prompt, tamanho, qualidade) {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY não definida no .env');
  const modelo = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
  const corpo = { model: modelo, prompt, n: 1 };
  if (modelo.startsWith('dall-e')) {
    corpo.size = tamanho === '1024x1536' ? '1024x1792' : tamanho === '1536x1024' ? '1792x1024' : '1024x1024';
    corpo.response_format = 'b64_json';
    if (modelo === 'dall-e-3') corpo.quality = qualidade === 'high' ? 'hd' : 'standard';
  } else {
    corpo.size = TAMANHOS_OPENAI.includes(tamanho) ? tamanho : '1024x1536';
    corpo.quality = ['low', 'medium', 'high', 'auto'].includes(qualidade) ? qualidade : 'medium';
  }
  const resp = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify(corpo),
  });
  const json = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(`OpenAI respondeu ${resp.status}: ${(json.error && json.error.message) || JSON.stringify(json).slice(0, 300)}`);
  const item = json.data && json.data[0];
  if (!item) throw new Error('OpenAI não retornou imagem');
  if (item.b64_json) return Buffer.from(item.b64_json, 'base64');
  if (item.url) {
    const r = await fetch(item.url);
    return Buffer.from(await r.arrayBuffer());
  }
  throw new Error('Resposta da OpenAI sem b64_json nem url');
}

async function gerarGemini(prompt, tamanho) {
  if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY não definida no .env');
  const modelo = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`;
  const tentativas = [
    { contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: proporcaoDe(tamanho) } } },
    { contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ['TEXT', 'IMAGE'] } },
  ];
  let ultimoErro = null;
  for (const corpo of tentativas) {
    const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) });
    const json = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      ultimoErro = new Error(`Gemini respondeu ${resp.status}: ${(json.error && json.error.message) || JSON.stringify(json).slice(0, 300)}`);
      continue;
    }
    const partes = (((json.candidates || [])[0] || {}).content || {}).parts || [];
    const img = partes.find((p) => p.inlineData && p.inlineData.data);
    if (img) return Buffer.from(img.inlineData.data, 'base64');
    ultimoErro = new Error('Gemini não retornou imagem (pode ter bloqueado o prompt). Tente reformular.');
  }
  throw ultimoErro;
}

(async () => {
  const { _: [prompt, saida], flags } = args();
  if (!prompt || !saida) {
    console.error('Uso: node scripts/gerar-imagem.js "<prompt>" <saida.png> [--provedor openai|gemini] [--tamanho 1024x1536] [--qualidade medium]');
    process.exit(1);
  }
  const provedor = String(flags.provedor || process.env.IMAGEM_PROVEDOR || (process.env.OPENAI_API_KEY ? 'openai' : process.env.GEMINI_API_KEY ? 'gemini' : 'openai')).toLowerCase();
  const tamanho = String(flags.tamanho || '1024x1536');
  const qualidade = String(flags.qualidade || 'medium');

  console.log(`Gerando imagem via ${provedor} (${tamanho})...`);
  const buffer = provedor === 'gemini' ? await gerarGemini(prompt, tamanho) : await gerarOpenAI(prompt, tamanho, qualidade);
  const destino = path.resolve(saida);
  garantirPasta(path.dirname(destino));
  fs.writeFileSync(destino, buffer);
  console.log(`Imagem salva: ${destino} (${Math.round(buffer.length / 1024)} KB)`);
})().catch((e) => {
  console.error('Erro ao gerar imagem:', e.message);
  process.exit(1);
});
