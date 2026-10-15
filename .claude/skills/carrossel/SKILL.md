---
name: carrossel
description: >
  Cria posts e carrosséis pras redes sociais públicas da Hayashi (Instagram, LinkedIn, Facebook):
  institucional, datas do agro e da empresa, bastidores da lavoura, marca empregadora, com a
  identidade Hayashi (hayashi.css + template post-feed), renderizados em PNG com legenda pronta.
  Sempre marcado como "requer aprovação da diretoria". Use quando o usuário pedir "post pro
  instagram", "carrossel", "post pro linkedin", "conteúdo pras redes", "/carrossel". Material
  interno (mural, TV, WhatsApp) é /arte.
---

# /carrossel — Redes sociais públicas

Redes públicas falam pela empresa: representação e divulgação são da
diretoria (arquétipo VI). Esta skill produz a peça pronta; a publicação
depende da aprovação registrada.

## Dependências

- `identidade/design-guide.md`, `identidade/hayashi.css`,
  `identidade/templates/post-feed.html`, `story.html`, `identidade/fotos.md`
- `_memoria/empresa.md` (fatos com data), `_memoria/cultura.md` (citações
  literais), `_memoria/preferencias.md`, `templates/calendario/datas-hayashi.md`
- `node scripts/render.js`
- Saída: `comunicacao/redes/<YYYY-MM-DD>-<slug>/`

## Tipos

1. **Carrossel** (5-8 slides, 1080x1350): história da Hayashi, valores (1
   por slide), dia a dia da lavoura, segurança, datas
2. **Post único** (1080x1350 ou 1080x1080): data comemorativa, citação do
   propósito/visão, foto da safra
3. **Story** (1080x1920): bastidor, aviso leve, data

## Workflow

1. **Tema e canal.** Do `/calendario` ou pedido. Fotos reais disponíveis?
   (sem foto própria, arte tipográfica com logo; nunca IA).
2. **Texto.** Capa com até 8 palavras; 1 ideia por slide; dados com fonte
   e data; citações do guia literais. Legenda: 3-6 linhas, tom
   institucional, até 5 hashtags, sem CTA comercial agressivo.
   **CHECKPOINT.**
3. **HTML.** Pasta `comunicacao/redes/<YYYY-MM-DD>-<slug>/`; copiar
   `post-feed.html` pra `carrossel.html` (caminhos `../../../identidade/...`);
   uma `.hay-page.post` por slide; alternar fundo branco/petróleo/foto com
   overlay; logo e contador em todos; último slide com logo e site.
4. **Render.** `node scripts/render.js comunicacao/redes/<pasta>/carrossel.html comunicacao/redes/<pasta>/instagram --largura 1080 --altura 1350`.
   Conferir capa e último (Read).
5. **Salvar.** `legenda.md`, `meta.md` (tipo, tema, status: rascunho |
   aprovado | publicado, `aprovado_por:` vazio até a diretoria aprovar,
   `publicado_em:`). Registrar em `saidas/registro/<slug>.md`.

```
✓ Carrossel: <tema> — N slides
comunicacao/redes/<pasta>/instagram/ · legenda.md
Requer aprovação da diretoria antes de publicar. Depois: /aprovar-post.
```

## Regras

- Foto real com EPI em cena de campo; pessoas com autorização de imagem.
- Sem dado interno (produtividade, custo, pessoas) sem aprovação.
- Logo inteiro; cores e fontes do guia.
- Nada publicado por aqui.
