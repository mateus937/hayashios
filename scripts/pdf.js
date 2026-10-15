#!/usr/bin/env node
'use strict';
// Converte um HTML em PDF (propostas, orçamentos, relatórios) usando Playwright.
//
// Uso:
//   node scripts/pdf.js <arquivo.html> <saida.pdf> [--formato A4] [--paisagem] [--margem 0]
//
// Exemplo:
//   node scripts/pdf.js saidas/propostas/acme-2026-10-10.html saidas/propostas/acme-2026-10-10.pdf

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { args, garantirPasta } = require('./_lib');

(async () => {
  const { _: [html, saida], flags } = args();
  if (!html || !saida) {
    console.error('Uso: node scripts/pdf.js <arquivo.html> <saida.pdf> [--formato A4] [--paisagem] [--margem 0]');
    process.exit(1);
  }
  const arquivo = path.resolve(html);
  if (!fs.existsSync(arquivo)) {
    console.error(`HTML não encontrado: ${arquivo}`);
    process.exit(1);
  }
  let chromium;
  try {
    ({ chromium } = require('playwright'));
  } catch {
    console.error('Playwright não está instalado. Na raiz do projeto, rode: npm install && npx playwright install chromium');
    process.exit(1);
  }
  garantirPasta(path.dirname(path.resolve(saida)));
  const margem = String(flags.margem || '0');
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(arquivo).href, { waitUntil: 'networkidle' });
    await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: path.resolve(saida),
      format: flags.formato || 'A4',
      landscape: Boolean(flags.paisagem),
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: margem, right: margem, bottom: margem, left: margem },
    });
    console.log(`PDF gerado: ${path.resolve(saida)}`);
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error('Erro ao gerar PDF:', e.message);
  process.exit(1);
});
