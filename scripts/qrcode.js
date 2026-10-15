#!/usr/bin/env node
'use strict';
// Gera um QR code em PNG (pra placas, cartazes, crachás: Linha Ética, formulários, vídeos).
//
// Uso:
//   node scripts/qrcode.js "<texto ou URL>" <saida.png> [--tamanho 600] [--cor 007581] [--fundo FFFFFF] [--margem 2]
//
// Usa o serviço público api.qrserver.com (o conteúdo do QR é enviado pra lá):
// não gerar QR com dado sensível ou pessoal. Links e textos públicos estão ok.

const fs = require('fs');
const path = require('path');
const { args, garantirPasta } = require('./_lib');

(async () => {
  const { _: [texto, saida], flags } = args();
  if (!texto || !saida) {
    console.error('Uso: node scripts/qrcode.js "<texto ou URL>" <saida.png> [--tamanho 600] [--cor 007581] [--fundo FFFFFF] [--margem 2]');
    process.exit(1);
  }
  const tamanho = parseInt(flags.tamanho || '600', 10);
  const url = new URL('https://api.qrserver.com/v1/create-qr-code/');
  url.searchParams.set('size', `${tamanho}x${tamanho}`);
  url.searchParams.set('data', texto);
  url.searchParams.set('color', String(flags.cor || '007581').replace('#', ''));
  url.searchParams.set('bgcolor', String(flags.fundo || 'FFFFFF').replace('#', ''));
  url.searchParams.set('margin', String(flags.margem || '2'));
  url.searchParams.set('format', 'png');
  url.searchParams.set('ecc', 'M');
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Serviço de QR respondeu ${resp.status}`);
  const buf = Buffer.from(await resp.arrayBuffer());
  const destino = path.resolve(saida);
  garantirPasta(path.dirname(destino));
  fs.writeFileSync(destino, buf);
  console.log(`QR salvo: ${destino} (${tamanho}x${tamanho}, conteúdo: ${texto.slice(0, 80)})`);
})().catch((e) => {
  console.error('Erro ao gerar QR:', e.message);
  process.exit(1);
});
