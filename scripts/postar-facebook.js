#!/usr/bin/env node
'use strict';
// Publica um post com uma ou mais fotos na Página do Facebook via Meta Graph API.
//
// Uso:
//   node scripts/postar-facebook.js <pasta-do-conteudo> [--base-url URL] [--legenda legenda.md] [--simular]
//
// A pasta precisa ter instagram/slide-XX.png (ou *.png na raiz) e legenda.md.
// --simular: valida tudo sem publicar.
// .env: META_PAGE_ACCESS_TOKEN, META_PAGE_ID (opcionais: META_GRAPH_VERSION, IMGBB_API_KEY)

const path = require('path');
const {
  carregarEnv,
  exigirEnv,
  args,
  graph,
  resolverUrlsPublicas,
  listarSlides,
  lerLegenda,
  salvarRegistro,
  lerRegistros,
} = require('./_lib');

carregarEnv();

(async () => {
  const { _: [pasta], flags } = args();
  if (!pasta) {
    console.error('Uso: node scripts/postar-facebook.js <pasta-do-conteudo> [--base-url URL] [--legenda legenda.md] [--simular]');
    process.exit(1);
  }
  const dir = path.resolve(pasta);
  const slides = listarSlides(dir);
  const legenda = lerLegenda(dir, flags.legenda || 'legenda.md');

  const anteriores = lerRegistros(dir).filter((r) => r.rede === 'facebook');
  if (anteriores.length) {
    const ult = anteriores[anteriores.length - 1];
    console.warn(`  aviso: essa pasta já foi publicada no Facebook em ${ult.data} (${ult.url || ult.id}).`);
  }

  console.log(`Facebook: ${slides.length} foto(s), legenda com ${legenda.length} caracteres`);
  slides.forEach((s) => console.log(`  ${path.basename(s)}`));

  const hospedagem = flags['base-url']
    ? `--base-url ${flags['base-url']}`
    : process.env.IMGBB_API_KEY
      ? 'imgbb (upload automático)'
      : 'NENHUMA. Defina --base-url ou IMGBB_API_KEY no .env';
  const credenciais = process.env.META_PAGE_ACCESS_TOKEN && process.env.META_PAGE_ID ? 'ok' : 'FALTANDO (META_PAGE_ACCESS_TOKEN / META_PAGE_ID)';

  if (flags.simular) {
    console.log(`Hospedagem das imagens: ${hospedagem}`);
    console.log(`Credenciais Meta: ${credenciais}`);
    const ok = hospedagem.indexOf('NENHUMA') < 0 && credenciais === 'ok';
    console.log(ok ? 'Simulação ok. Rode sem --simular pra publicar.' : 'Simulação com pendências. Corrija antes de publicar.');
    process.exit(ok ? 0 : 2);
  }

  exigirEnv('META_PAGE_ACCESS_TOKEN', 'META_PAGE_ID');
  const pagina = process.env.META_PAGE_ID;
  const urls = await resolverUrlsPublicas(slides, { baseUrl: flags['base-url'] });

  // 1) sobe cada foto sem publicar; 2) cria o post com todas anexadas
  const ids = [];
  for (const u of urls) {
    const r = await graph('POST', `${pagina}/photos`, { url: u, published: false });
    ids.push(r.id);
    console.log(`  foto ${ids.length}/${urls.length} enviada`);
  }
  const post = await graph('POST', `${pagina}/feed`, {
    message: legenda,
    attached_media: ids.map((id) => ({ media_fbid: id })),
  });
  const url = `https://www.facebook.com/${post.id}`;
  salvarRegistro(dir, 'facebook', { id: post.id, url, data: new Date().toISOString(), imagens: slides.length });
  console.log(`Publicado no Facebook: ${url}`);
})().catch((e) => {
  console.error('Erro ao postar no Facebook:', e.message);
  process.exit(1);
});
