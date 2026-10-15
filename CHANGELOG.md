# Changelog

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/). Cada
versão traz uma seção **O que muda pra você**, mostrada pelo
`/atualizar-sistema`.

## [1.0.0] — em preparação (outubro de 2026)

Primeira versão do HayashiOS. Ainda não publicada pra equipe.

### O que muda pra você

- O Claude Code passa a conhecer a Hayashi: o Guia do Manifesto da Cultura
  (v1.7), o Manual do Colaborador (v4), a história, as unidades e a
  identidade visual.
- `/decisao` orienta qualquer situação do dia a dia citando o arquétipo e
  o item do guia; `/cultura` responde o que o guia e o manual dizem.
- Materiais saem no padrão da empresa: `/arte`, `/placa`, `/apresentacao`,
  `/documento`, `/video`, `/comunicado`, `/reconhecimento`, `/integracao`.
- Chegou colaborador novo? `/boas-vindas` gera a arte oficial "Reforço no
  time!" (foto em círculo, nome, setor) em PNG e PDF, mais a mensagem pro
  grupo.

### Documentos oficiais carregados

- Guia do Manifesto da Cultura Hayashi, versão 1.7, julho de 2024
- Manual do Colaborador, versão 4, 11/12/2024
- Cartão de aniversariantes e arte "Reforço no time!" (textos oficiais)

### Skills (24)

cultura, decisao, feedback, integracao, boas-vindas, reconhecimento,
comunicado, arte, placa, apresentacao, documento, video, carrossel,
calendario, aprovar-post, analisar-dados, email-profissional, instalar,
abrir, salvar, atualizar, atualizar-sistema, novo-projeto, mapear-rotinas

### Identidade

- `identidade/design-guide.md` com cores (petróleo #007581 medido no logo),
  tipografia (Roboto Condensed, Roboto, Lato), elementos e regras do logo
- `identidade/logo.png` e `logo-branco.png` (anel, folhas e palavra em
  branco, miolo vazado)
- `identidade/elementos/`: folha de canto, ramo de bambu e serpentina
  oficiais, em petróleo e branco, com fundo e nervuras transparentes
- `identidade/hayashi.css` e 11 templates: post, story, placa A4, placa A3
  paisagem, slide 16:9, cartão (aniversário oficial), documento A4 (padrão
  do manual), certificado, vinheta de vídeo, lower third, reforço no time

### Scripts

render (com `--transparente`), pdf, video (ffmpeg: info, cortar, juntar,
formato, vinheta, sobrepor, marca, legenda, audio, extrair-audio,
thumbnail, converter), transcrever (OpenAI), qrcode, verificar-ambiente
(inclui ffmpeg e fonte Lato), screenshot, checar-url, postar-instagram,
postar-facebook

### Pendências pro administrador

- `_memoria/empresa.md`: canais internos, áreas e responsáveis, site e
  redes marcados *(confirmar)*
- `identidade/`: logo vetorial oficial; fotos oficiais
- `templates/calendario/datas-hayashi.md`: datas internas (SIPAT, integrações)
- Lista de pessoas com acesso ao repositório
