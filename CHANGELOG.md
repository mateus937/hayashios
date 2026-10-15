# Changelog

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/). Cada
versão traz uma seção **O que muda pra você**, mostrada pelo
`/atualizar-sistema`.

## [1.1.0] — 2026-10-15

### O que muda pra você

- Chegou colaborador novo? `/boas-vindas` gera a arte oficial "Reforço no
  time!" (foto em círculo, nome, setor) em PNG pra WhatsApp/mural e PDF,
  mais a mensagem pro grupo.

### Adicionado

- Skill `boas-vindas` (24 skills no total) e template
  `identidade/templates/reforco-no-time.html` (A4; 1 a 4 pessoas; placeholder
  de silhueta quando não há foto)
- `/integracao` passa a usar a arte oficial no kit; elementos "folhas" e
  "onda" documentados no design-guide

## [1.0.0] — 2026-10-15

Primeira versão do HayashiOS.

### O que muda pra você

- O Claude Code passa a conhecer a Hayashi: o Guia do Manifesto da Cultura
  (v1.7), o Manual do Colaborador (v4), a história, as unidades e a
  identidade visual.
- `/decisao` orienta qualquer situação do dia a dia citando o arquétipo e
  o item do guia; `/cultura` responde o que o guia e o manual dizem.
- Materiais saem no padrão da empresa: `/arte`, `/placa`, `/apresentacao`,
  `/documento`, `/video`, `/comunicado`, `/reconhecimento`, `/integracao`.

### Documentos oficiais carregados

- Guia do Manifesto da Cultura Hayashi, versão 1.7, julho de 2024
- Manual do Colaborador, versão 4, 11/12/2024
- Cartão de aniversariantes (texto oficial)

### Skills (23)

cultura, decisao, feedback, integracao, reconhecimento, comunicado, arte,
placa, apresentacao, documento, video, carrossel, calendario, aprovar-post,
analisar-dados, email-profissional, instalar, abrir, salvar, atualizar,
atualizar-sistema, novo-projeto, mapear-rotinas

### Identidade

- `identidade/design-guide.md` com cores (petróleo #007581 medido no logo),
  tipografia (Roboto Condensed, Roboto, Lato), elementos e regras do logo
- `identidade/hayashi.css` e 10 templates: post, story, placa A4, placa A3
  paisagem, slide 16:9, cartão (aniversário oficial), documento A4 (padrão
  do manual), certificado, vinheta de vídeo, lower third

### Scripts

render (com `--transparente`), pdf, video (ffmpeg: info, cortar, juntar,
formato, vinheta, sobrepor, marca, legenda, audio, extrair-audio,
thumbnail, converter), transcrever (OpenAI), qrcode, verificar-ambiente
(inclui ffmpeg e fonte Lato), screenshot, checar-url, postar-instagram,
postar-facebook

### Pendências pro administrador

- `_memoria/empresa.md`: canais internos, áreas e responsáveis, site e
  redes marcados *(confirmar)*
- `identidade/`: logo vetorial e versão branca oficial; fotos oficiais
- `templates/calendario/datas-hayashi.md`: datas internas (SIPAT, integrações)
- Repositório privado e lista de pessoas com acesso
