#!/usr/bin/env node
'use strict';
// Screenshot de uma página pública (site do negócio, concorrente, ficha no Maps) via Playwright.
//
// Uso:
//   node scripts/screenshot.js <url> <saida.png> [--celular] [--pagina-inteira] [--largura 1280] [--altura 800]
//
// --celular usa viewport 390x844 (iPhone) com user agent mobile: mostra como o cliente vê no celular.

const path = require('path');
const { args, garantirPasta } = require('./_lib');

(async () => {
  const { _: [url, saida], flags } = args();
  if (!url || !saida) {
    console.error('Uso: node scripts/screenshot.js <url> <saida.png> [--celular] [--pagina-inteira] [--largura 1280] [--altura 800]');
    process.exit(1);
  }
  let pw;
  try {
    pw = require('playwright');
  } catch {
    console.error('Playwright não está instalado. Na raiz do projeto: npm install && npx playwright install chromium');
    process.exit(1);
  }
  garantirPasta(path.dirname(path.resolve(saida)));
  const browser = await pw.chromium.launch();
  try {
    const contexto = flags.celular
      ? await browser.newContext({ ...pw.devices['iPhone 13'] })
      : await browser.newContext({ viewport: { width: parseInt(flags.largura || '1280', 10), height: parseInt(flags.altura || '800', 10) } });
    const page = await contexto.newPage();
    const inicio = Date.now();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(1500);
    const tempo = Date.now() - inicio;
    await page.screenshot({ path: path.resolve(saida), fullPage: Boolean(flags['pagina-inteira']) });
    const titulo = await page.title();
    const descricao = await page.locator('meta[name="description"]').first().getAttribute('content').catch(() => null);
    console.log(`Screenshot salvo: ${path.resolve(saida)}`);
    console.log(`Título: ${titulo || '(sem título)'}`);
    console.log(`Descrição: ${descricao || '(sem meta description)'}`);
    console.log(`Tempo até carregar: ${(tempo / 1000).toFixed(1)}s`);
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error('Erro no screenshot:', e.message);
  process.exit(1);
});
