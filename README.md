# Hayashi OS

> O sistema operacional da Hayashi dentro do Claude Code.

A cultura da Hayashi, formalizada no Guia do Manifesto da Cultura, vira a
base de operação de quem usa o Claude Code na empresa: orientação pra
decisões do dia a dia, feedback e integração alinhados ao guia, e produção
de materiais (comunicados, placas, cartazes, cartões, apresentações,
documentos e vídeos) na identidade visual da empresa, com o mesmo padrão
nas duas unidades.

## O que vem carregado

- **Guia do Manifesto da Cultura Hayashi v1.7 (julho/2024):** propósito,
  visão, valores, os dez arquétipos com Aceitamos / Não aceitamos, Linha
  Ética, confirmação de recebimento (`_memoria/cultura.md`)
- **Manual do Colaborador v4 (dezembro/2024):** contrato de experiência,
  jornada e ponto, faltas, atestados, licenças, férias, salário e 13º,
  benefícios, acidentes, EPI (`_memoria/politicas.md`)
- **A empresa:** história desde 1963, linha do tempo, unidades
  (Cristalina-GO e Chapada Diamantina-BA), números de dez/2024, governança
  (`_memoria/empresa.md`)
- **Identidade visual:** cores oficiais (verde-petróleo #007581), Roboto
  Condensed + Lato, logo, elementos (cards, régua, aspas, chevrons),
  implementados em `identidade/hayashi.css` e em 10 templates HTML
- **Tom de voz** da empresa (`_memoria/preferencias.md`)

## As skills (23)

**Cultura e pessoas** — `/cultura` (o que o guia e o manual dizem) ·
`/decisao` (situação → arquétipo → orientação) · `/feedback` · `/integracao`
· `/reconhecimento` (inclui aniversariantes) · `/comunicado`

**Materiais** — `/arte` · `/placa` (NR-26 + identidade) · `/apresentacao` ·
`/documento` · `/video` (ffmpeg: corte, vinheta, lower third, legendas,
formato) · `/carrossel` (redes públicas, com aprovação) · `/calendario` ·
`/aprovar-post`

**Produtividade** — `/analisar-dados` · `/email-profissional`

**Núcleo** — `/instalar` · `/abrir` · `/salvar` · `/atualizar` ·
`/atualizar-sistema` · `/novo-projeto` · `/mapear-rotinas`

Manual de uso: [`COMECE-AQUI.md`](COMECE-AQUI.md).

## Como começar

```
git clone <repositório privado da Hayashi> hayashi-os
cd hayashi-os
npm install
npx playwright install chromium
claude
```

Dentro do Claude: `/instalar`. Pra vídeo, instale o ffmpeg
(`winget install Gyan.FFmpeg`). Conferência: `node scripts/verificar-ambiente.js`.

## Princípios que valem em tudo

1. O Guia da Cultura é a fonte de toda orientação; cada resposta cita o
   arquétipo e o item literal. O que o guia não cobre não é inventado.
2. O sistema orienta; não decide por pessoas, não julga, não substitui RH,
   jurídico, Segurança do Trabalho nem a liderança. Situações graves vão
   pro líder/gerente e pra Linha Ética.
3. Representação e divulgação externa são da diretoria (arquétipo VI);
   material externo sai marcado "requer aprovação".
4. Dados pessoais de colaboradores não entram no repositório.
5. Identidade visual em tudo; fotos reais; nada gerado por IA representando
   a Hayashi.
6. Nada é publicado, enviado ou apagado sem confirmação.

## Estrutura

```
_memoria/        empresa, cultura (guia), politicas (manual), preferencias, estrategia, usuario (pessoal, não versionado)
identidade/      design-guide, hayashi.css, logo, templates/, fotos/
.claude/skills/  as 23 skills
scripts/         render, pdf, video, transcrever, qrcode, verificar-ambiente...
templates/       cultura/casos.md, calendario/datas-hayashi.md, catálogos, sistema/
comunicacao/     comunicados, calendário, posts
materiais/       artes, placas, apresentações, documentos, vídeos, integração, reconhecimento, cultura
pessoas/         feedback e decisões (não versionada)
saidas/          análises, e-mails, registro por pessoa
dados/           entrada (não versionada)
projetos/        frentes com pasta própria
docs/            integrações, guia do administrador
```

## Manutenção

Versão em `VERSION`, mudanças em `CHANGELOG.md`. Quando o guia ou o manual
ganharem versão nova, o administrador atualiza `_memoria/` e registra. Guia
do administrador: [`docs/guia-administrador.md`](docs/guia-administrador.md).
