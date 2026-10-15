#!/usr/bin/env node
'use strict';
// Espera uma URL responder 200 (útil pra aguardar deploy antes de publicar nas redes).
//
// Uso:
//   node scripts/checar-url.js <url> [--timeout 300] [--intervalo 10]
//
// Sai com 0 quando a URL responde 200; com 1 se estourar o tempo.

const { args, esperar } = require('./_lib');

(async () => {
  const { _: [url], flags } = args();
  if (!url) {
    console.error('Uso: node scripts/checar-url.js <url> [--timeout 300] [--intervalo 10]');
    process.exit(1);
  }
  const timeout = parseInt(flags.timeout || '300', 10) * 1000;
  const intervalo = parseInt(flags.intervalo || '10', 10) * 1000;
  const inicio = Date.now();
  let tentativa = 0;
  while (Date.now() - inicio < timeout) {
    tentativa++;
    try {
      const resp = await fetch(url, { method: 'GET', redirect: 'follow', cache: 'no-store' });
      if (resp.status === 200) {
        console.log(`ok (${resp.status}) após ${tentativa} tentativa(s): ${url}`);
        process.exit(0);
      }
      console.log(`tentativa ${tentativa}: HTTP ${resp.status}, aguardando...`);
    } catch (e) {
      console.log(`tentativa ${tentativa}: ${e.message}, aguardando...`);
    }
    await esperar(intervalo);
  }
  console.error(`Tempo esgotado (${timeout / 1000}s) esperando ${url}`);
  process.exit(1);
})();
