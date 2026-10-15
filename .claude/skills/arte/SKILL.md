---
name: arte
description: >
  Cria peças gráficas com a identidade visual da Hayashi a partir dos templates em
  identidade/templates e do hayashi.css: cartaz (A4/A3), banner, tela pra TV/painel, cartão
  (aniversário, boas-vindas, agradecimento, datas), certificado, crachá, convite, capa de
  documento, post pra WhatsApp/mural, imagem pra e-mail. Renderiza em PNG (scripts/render.js) e
  PDF (scripts/pdf.js). Use quando o usuário pedir "arte", "cartaz", "banner", "cartão",
  "certificado", "crachá", "convite", "imagem pro mural", "tela pra TV", "/arte". Placa de
  sinalização é /placa; post pra Instagram é /carrossel; slides é /apresentacao.
argument-hint: "[cartaz | banner | tela | cartao | certificado | cracha | convite | capa]"
---

# /arte — Peças gráficas no padrão Hayashi

Toda peça sai do mesmo sistema: `identidade/hayashi.css` (cores, fontes,
componentes), `identidade/templates/*.html` (bases prontas) e
`identidade/logo.png`. O resultado é consistente entre quem faz no RH, na
Segurança ou na Comunicação.

## Dependências

- `identidade/design-guide.md` (ler antes; é a regra), `identidade/hayashi.css`,
  `identidade/templates/`, `identidade/logo.png`, `identidade/fotos.md`
- `_memoria/preferencias.md` (texto), `_memoria/cultura.md` (citações
  literais quando a peça for de cultura)
- Render: `node scripts/render.js <html> <pasta> [--largura --altura] [--transparente]`
  e `node scripts/pdf.js <html> <pdf> [--formato A4|A3] [--paisagem]`
- Elementos oficiais: `identidade/elementos/` (folha de canto, ramo de
  bambu, serpentina; versões petróleo e branca) com a classe `.hay-folha`;
  folha de canto sempre encostada num canto, ramo pode girar, serpentina só
  em celebração
- Ícones: inline SVG de linha (Lucide, MIT) em traço 2px, cor petróleo ou
  verde de apoio; sem clip-art, sem emoji como ícone
- Saída: `materiais/artes/<YYYY-MM-DD>-<slug>/`

## Modo orquestrado

Chamada por `/comunicado`, `/reconhecimento`, `/integracao`,
`/calendario`: recebe tipo, texto final e pasta; executa sem perguntar;
checkpoint só do PNG final.

## Tipos e bases

| Tipo | Template | Tamanho | Saída |
|---|---|---|---|
| cartaz | `placa-a4.html` (corpo livre) ou `documento-a4.html` | A4 / A3 retrato | PDF + PNG de conferência |
| banner / faixa | `slide-16x9.html` adaptado | sob medida (ex.: 3000x1000) | PDF vetorial |
| tela (TV, painel, mural digital) | `slide-16x9.html` | 1920x1080 | PNG |
| post WhatsApp / mural digital | `post-feed.html` ou `quadrado` | 1080x1350 / 1080x1080 | PNG |
| cartão (aniversário, agradecimento) | `cartao.html` | 1400x840 (frente e verso) | PNG |
| boas-vindas a colaborador novo | `reforco-no-time.html` → usar `/boas-vindas` | A4 | PNG + PDF |
| certificado | `certificado-a4-paisagem.html` | A4 paisagem | PDF |
| crachá | `cracha` (54x86 mm, a partir de `documento-a4.html`) | CR-80 | PDF |
| convite | `cartao.html` ou `post-feed.html` | digital | PNG |
| capa de documento | `documento-a4.html` (capa) | A4 | PDF |

## Workflow

### Passo 1 — Briefing (perguntar só o que faltar)

Tipo, texto (título, linhas, assinatura, data), onde vai (impresso ou
digital; tamanho), foto real disponível (`identidade/fotos/`), prazo.
Texto de cultura (propósito, visão, valores, arquétipo): copiar literal de
`cultura.md`.

### Passo 2 — Texto e composição

Mostrar em texto: título, subtítulo/kicker, corpo (curto), rodapé,
versão de cor (petróleo sobre branco / branco sobre petróleo / foto com
overlay). **CHECKPOINT** (fora do modo orquestrado).

### Passo 3 — HTML

1. Criar `materiais/artes/<YYYY-MM-DD>-<slug>/`.
2. Copiar o template pra `arte.html` na pasta e ajustar os caminhos:
   `../hayashi.css` → `../../../identidade/hayashi.css`;
   `../logo.png` → `../../../identidade/logo.png`; fotos por caminho relativo.
3. Preencher o conteúdo. Respeitar: margem interna, logo sempre inteiro
   (sem cortar, sem distorcer, sem recolorir fora de branco/petróleo),
   títulos em Roboto Condensed caixa alta, corpo em Lato, uma cor de
   destaque. Nada de gradiente arco-íris, sombra pesada, fonte extra.

### Passo 4 — Render e conferência

- PNG: `node scripts/render.js materiais/artes/<pasta>/arte.html materiais/artes/<pasta> --largura W --altura H`
- PDF: `node scripts/pdf.js materiais/artes/<pasta>/arte.html materiais/artes/<pasta>/arte.pdf --formato A4 [--paisagem]`
- Olhar o PNG (Read): texto cortado? logo pequeno? contraste? Corrigir e
  renderizar de novo. Erro de Playwright → `node scripts/verificar-ambiente.js`.

### Passo 5 — Entregar

```
✓ Arte: <tipo> — <título>
materiais/artes/<pasta>/  (arte.html · arte.png | arte.pdf)
Impressão: <A4/A3, cores, papel sugerido> | Digital: <canal e tamanho>
```

Registrar em `saidas/registro/<slug-usuario>.md`.

## Regras

- Design-guide manda; hayashi.css é a implementação. Não inventar cor nem
  fonte. Preto puro só em texto de documento; cinza grafite nos apoios.
- Foto real (fazenda, colheita, equipe, batata) antes de ilustração;
  ilustração de linha em água/petróleo (como no cartão de aniversário)
  antes de imagem de banco; foto gerada por IA nunca pra representar a
  Hayashi, as pessoas ou o produto.
- Pessoas em foto: autorização de uso de imagem.
- Material pra fora da empresa (cliente, imprensa, feira): aprovação da
  diretoria (arquétipo VI), marcado no resumo.
- Um `arte.html` por pasta; render só pelos scripts.
