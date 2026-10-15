---
name: apresentacao
description: >
  Cria apresentações 16:9 no padrão Hayashi (capa, agenda, conteúdo, dados, citação do
  propósito/visão, encerramento) em HTML renderizado em PNG por slide e PDF; opcionalmente
  .pptx quando a skill pptx estiver disponível. Serve pra integração, reunião de resultados,
  treinamento, DDS, comitê, apresentação a parceiros (com aprovação). Use quando o usuário pedir
  "apresentação", "slides", "deck", "material pra reunião", "treinamento em slides",
  "/apresentacao".
argument-hint: "[tema] [--slides N] [--publico interno|externo]"
---

# /apresentacao — Slides no padrão Hayashi

## Dependências

- `identidade/design-guide.md`, `identidade/hayashi.css`,
  `identidade/templates/slide-16x9.html`, `identidade/logo.png`, `identidade/fotos.md`
- `_memoria/cultura.md` (citações literais), `_memoria/empresa.md` (dados
  com data), `_memoria/preferencias.md`
- `node scripts/render.js <html> <pasta>/slides --largura 1920 --altura 1080`
  e `node scripts/pdf.js <html> <pdf>` (o template já tem `@page` 1920x1080)
- Skill `pptx` (plugin da Anthropic), se instalada, pra entregar .pptx editável
- Saída: `materiais/apresentacoes/<YYYY-MM-DD>-<slug>/`

## Modo orquestrado

Chamada por `/integracao` ou `/comunicado`: recebe o roteiro de slides e
a pasta; executa sem checkpoint de texto.

## Workflow

### Passo 1 — Briefing

Tema e objetivo (informar, treinar, decidir, apresentar a terceiro),
público (interno: qual área/nível; externo: quem), duração (1 slide a
cada 1-2 min), dados disponíveis (planilha em `dados/`, números de
`empresa.md`), fotos reais.

Público externo → avisar: representação formal da empresa e divulgação de
dados são da diretoria/gerência (arquétipo VI); a apresentação sai marcada
"requer aprovação".

### Passo 2 — Roteiro (texto, antes do visual)

Um bloco por slide: tipo, título (≤ 8 palavras), conteúdo (≤ 40 palavras
ou 1 gráfico/tabela), nota do apresentador (o que falar). Tipos:
- **capa** (petróleo, logo, título leve+bold como no guia, data, unidade)
- **agenda**
- **conteudo** (título + 3-5 pontos ou texto curto)
- **dados** (tabela ou gráfico simples em SVG/CSS; fonte do dado e data)
- **citacao** (propósito, visão, valores, fala do Fundador/DG, literal)
- **arquetipo** (Aceitamos / Não aceitamos com os chevrons)
- **foto** (foto real com overlay petróleo e 1 frase)
- **encerramento** (petróleo, logo branco, "Obrigado" + contato/próximos passos)

**CHECKPOINT:** mostrar o roteiro. Ajustar.

### Passo 3 — HTML

Pasta `materiais/apresentacoes/<YYYY-MM-DD>-<slug>/`; copiar
`slide-16x9.html` pra `apresentacao.html`; ajustar caminhos
(`../../../identidade/...`); uma `<div class="hay-page slide">` por slide,
na ordem; numeração no `.hay-contador`; fotos por caminho relativo.
Gráficos: SVG inline simples (barras/linhas) em petróleo e água, sem
biblioteca externa.

### Passo 4 — Render

- PNGs: `node scripts/render.js materiais/apresentacoes/<pasta>/apresentacao.html materiais/apresentacoes/<pasta>/slides --largura 1920 --altura 1080`
- PDF: `node scripts/pdf.js materiais/apresentacoes/<pasta>/apresentacao.html materiais/apresentacoes/<pasta>/apresentacao.pdf`
- Conferir capa, 1 slide de conteúdo e o encerramento (Read dos PNGs).
- `.pptx` editável: se a skill `pptx` estiver disponível, gerar a partir do
  roteiro usando as cores e fontes do design-guide; senão, entregar PDF +
  PNGs (que entram em qualquer PowerPoint como imagem) e avisar.

### Passo 5 — Entregar

```
✓ Apresentação: <título> — N slides
materiais/apresentacoes/<pasta>/  (apresentacao.html · slides/slide-NN.png · apresentacao.pdf [· .pptx])
roteiro.md com notas do apresentador
[Público externo: requer aprovação da diretoria/gerência antes de apresentar]
```

Registrar em `saidas/registro/<slug-usuario>.md`.

## Regras

- Pouco texto por slide; a fala fica nas notas.
- Números com fonte e data; nada inventado. Dados internos sensíveis
  (custo, produtividade, pessoas) em apresentação externa só com aprovação.
- Propósito, visão, valores e arquétipos: literais.
- Foto real antes de qualquer outra; IA nunca pra representar a Hayashi.
- Uma `apresentacao.html` por pasta; render pelos scripts.
