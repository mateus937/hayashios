#!/usr/bin/env node
'use strict';
// Publica um carrossel (ou imagem única) no Instagram via Meta Graph API.
//
// Uso:
//   node scripts/postar-instagram.js <pasta-do-conteudo> [--base-url URL] [--legenda legenda.md] [--simular]
//
// A pasta precisa ter instagram/slide-XX.png (ou *.png na raiz) e legenda.md.
// --simular: valida tudo (imagens, legenda, credenciais, hospedagem) sem publicar.
// --base-url: URL pública onde os PNGs já estão (ex: https://site.com.br/img/posts/slug). Sem isso, usa IMGBB_API_KEY.
//
// .env: META_PAGE_ACCESS_TOKEN, META_IG_USER_ID (opcionais: META_GRAPH_VERSION, IMGBB_API_KEY)

const path = require('path');
const {
  carregarEnv,
  exigirEnv,
  args,
  graph,
  esperar,
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
    console.error('Uso: node scripts/postar-instagram.js <pasta-do-conteudo> [--base-url URL] [--legenda legenda.md] [--simular]');
    process.exit(1);
  }
  const dir = path.resolve(pasta);
  const slides = listarSlides(dir);
  const legenda = lerLegenda(dir, flags.legenda || 'legenda.md');

  if (slides.length > 10) throw new Error(`Instagram aceita no máximo 10 imagens por carrossel (encontrei ${slides.length}).`);
  if (legenda.length > 2200) console.warn(`  aviso: legenda com ${legenda.length} caracteres. O Instagram corta em 2200.`);
  const hashtags = (legenda.match(/#\w+/g) || []).length;
  if (hashtags > 30) console.warn(`  aviso: ${hashtags} hashtags. O Instagram aceita até 30.`);

  const anteriores = lerRegistros(dir).filter((r) => r.rede === 'instagram');
  if (anteriores.length) {
    const ult = anteriores[anteriores.length - 1];
    console.warn(`  aviso: essa pasta já foi publicada no Instagram em ${ult.data} (${ult.permalink || ult.id}).`);
  }

  console.log(`Instagram: ${slides.length} imagem(ns), legenda com ${legenda.length} caracteres, ${hashtags} hashtags`);
  slides.forEach((s) => console.log(`  ${path.basename(s)}`));

  const hospedagem = flags['base-url']
    ? `--base-url ${flags['base-url']}`
    : process.env.IMGBB_API_KEY
      ? 'imgbb (upload automático)'
      : 'NENHUMA. Defina --base-url ou IMGBB_API_KEY no .env';
  const credenciais = process.env.META_PAGE_ACCESS_TOKEN && process.env.META_IG_USER_ID ? 'ok' : 'FALTANDO (META_PAGE_ACCESS_TOKEN / META_IG_USER_ID)';

  if (flags.simular) {
    console.log(`Hospedagem das imagens: ${hospedagem}`);
    console.log(`Credenciais Meta: ${credenciais}`);
    const ok = hospedagem.indexOf('NENHUMA') < 0 && credenciais === 'ok';
    console.log(ok ? 'Simulação ok. Rode sem --simular pra publicar.' : 'Simulação com pendências. Corrija antes de publicar.');
    process.exit(ok ? 0 : 2);
  }

  exigirEnv('META_PAGE_ACCESS_TOKEN', 'META_IG_USER_ID');
  const ig = process.env.META_IG_USER_ID;
  const urls = await resolverUrlsPublicas(slides, { baseUrl: flags['base-url'] });

  let criacao;
  if (urls.length === 1) {
    criacao = await graph('POST', `${ig}/media`, { image_url: urls[0], caption: legenda });
  } else {
    const filhos = [];
    for (const u of urls) {
      const r = await graph('POST', `${ig}/media`, { image_url: u, is_carousel_item: true });
      filhos.push(r.id);
      console.log(`  item ${filhos.length}/${urls.length} criado`);
    }
    criacao = await graph('POST', `${ig}/media`, { media_type: 'CAROUSEL', children: filhos.join(','), caption: legenda });
  }

  // O container leva alguns segundos pra processar as imagens.
  let pronto = false;
  for (let i = 0; i < 40; i++) {
    const st = await graph('GET', `${criacao.id}`, { fields: 'status_code,status' });
    if (st.status_code === 'FINISHED') {
      pronto = true;
      break;
    }
    if (st.status_code === 'ERROR' || st.status_code === 'EXPIRED') {
      throw new Error(`Container do Instagram com erro: ${st.status || st.status_code}`);
    }
    await esperar(3000);
  }
  if (!pronto) throw new Error('Instagram demorou demais pra processar as imagens. Tente de novo em alguns minutos.');

  const pub = await graph('POST', `${ig}/media_publish`, { creation_id: criacao.id });
  let permalink = null;
  try {
    const info = await graph('GET', `${pub.id}`, { fields: 'permalink' });
    permalink = info.permalink || null;
  } catch (e) {
    permalink = null; // o permalink é só conveniência
  }
  salvarRegistro(dir, 'instagram', { id: pub.id, permalink, data: new Date().toISOString(), imagens: slides.length });
  console.log(`Publicado no Instagram: ${permalink || 'id ' + pub.id}`);
})().catch((e) => {
  console.error('Erro ao postar no Instagram:', e.message);
  process.exit(1);
});
