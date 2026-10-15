#!/usr/bin/env node
'use strict';
// Renderiza um HTML em PNGs (um por elemento .hay-page ou .slide) usando Playwright.
//
// Uso:
//   node scripts/render.js <arquivo.html> <pasta-saida> [--largura 1080] [--altura 1350] [--seletor .hay-page] [--prefixo slide] [--escala 1] [--transparente]
//
// Exemplos:
//   node scripts/render.js materiais/artes/2026-10-27-dds/arte.html materiais/artes/2026-10-27-dds
//   node scripts/render.js identidade/templates/slide-16x9.html saida --largura 1920 --altura 1080
//   node scripts/render.js identidade/templates/lower-third.html pecas --largura 1920 --altura 1080 --transparente
//
// Se o HTML não tiver nenhum elemento do seletor, tira um screenshot único no tamanho informado.
// --transparente mantém o fundo transparente (pra lower third e sobreposições em vídeo).

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { args, garantirPasta } = require('./_lib');

function carregarPlaywright() {
  try {
    return require('playwright');
  } catch {
    console.error('Playwright não está instalado. Na raiz do projeto, rode:');
    console.error('  npm install');
    console.error('  npx playwright install chromium');
    process.exit(1);
  }
}

(async () => {
  const { _: [html, saida], flags } = args();
  if (!html || !saida) {
    console.error('Uso: node scripts/render.js <arquivo.html> <pasta-saida> [--largura 1080] [--altura 1350] [--seletor .hay-page] [--prefixo slide] [--escala 1] [--transparente]');
    process.exit(1);
  }
  const arquivo = path.resolve(html);
  if (!fs.existsSync(arquivo)) {
    console.error(`HTML não encontrado: ${arquivo}`);
    process.exit(1);
  }
  const largura = parseInt(flags.largura || '1080', 10);
  const altura = parseInt(flags.altura || '1350', 10);
  const seletor = flags.seletor || '.hay-page, .slide';
  const prefixo = flags.prefixo || 'slide';
  const escala = parseFloat(flags.escala || '1');
  const transparente = Boolean(flags.transparente);

  const { chromium } = carregarPlaywright();
  garantirPasta(saida);

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: largura, height: altura }, deviceScaleFactor: escala });
    await page.goto(pathToFileURL(arquivo).href, { waitUntil: 'networkidle' });
    await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
    await page.waitForTimeout(400);
    if (transparente) {
      await page.addStyleTag({ content: 'html, body { background: transparent !important; }' });
    }

    const elementos = page.locator(seletor);
    const total = await elementos.count();
    const gerados = [];

    if (total === 0) {
      const destino = path.join(saida, `${prefixo}-01.png`);
      await page.screenshot({ path: destino, type: 'png', omitBackground: transparente, clip: { x: 0, y: 0, width: largura, height: altura } });
      gerados.push(destino);
    } else {
      for (let i = 0; i < total; i++) {
        const el = elementos.nth(i);
        await el.scrollIntoViewIfNeeded();
        const box = await el.boundingBox();
        if (box && (Math.round(box.width) !== largura || Math.round(box.height) !== altura)) {
          console.warn(`  aviso: elemento #${i + 1} tem ${Math.round(box.width)}x${Math.round(box.height)}, esperado ${largura}x${altura}`);
        }
        const destino = path.join(saida, `${prefixo}-${String(i + 1).padStart(2, '0')}.png`);
        await el.screenshot({ path: destino, type: 'png', omitBackground: transparente });
        gerados.push(destino);
      }
    }

    console.log(`Renderizado ${gerados.length} arquivo(s) em ${path.resolve(saida)}:`);
    for (const g of gerados) console.log(`  ${path.basename(g)}`);
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error('Erro ao renderizar:', e.message);
  process.exit(1);
});
