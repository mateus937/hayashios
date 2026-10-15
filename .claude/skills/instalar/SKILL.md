---
name: instalar
description: >
  Prepara o Hayashi OS no computador de quem acabou de clonar: confere o ambiente (Node,
  Playwright, ffmpeg, git), cria o `_memoria/usuario.md` com nome, área, unidade e papel da
  pessoa, confirma que a memória da empresa está carregada e mostra por onde começar. Modo
  administrador pra configurar o repositório pela primeira vez. Use quando o usuário acabou de
  clonar, disser "/instalar", "configurar o sistema", "primeiro acesso", "sou novo aqui".
argument-hint: "[administrador]"
---

# /instalar — Primeiro acesso ao Hayashi OS

A memória da empresa (guia, manual, identidade) já vem preenchida no
repositório. O que falta é o contexto de quem está usando e a máquina
pronta. Leva 5 minutos.

## Fase 0 — Ambiente

1. `node scripts/verificar-ambiente.js`. Resumir em uma frase por item
   faltante. Node ausente → "Pra gerar imagens, PDF e vídeo precisa do
   Node.js LTS (https://nodejs.org). O resto funciona sem."
2. Sem `node_modules/` → oferecer `npm install` e `npx playwright install
   chromium` (uma vez, ~150 MB). Rodar se aceitar.
3. Sem ffmpeg → só avisar: "Pra editar vídeo: `winget install
   Gyan.FFmpeg` (feche e abra o terminal depois)". Não bloquear.
4. Não pedir chaves de API agora (`docs/integracoes.md` quando precisar).

## Fase 1 — Quem é você (6 perguntas, uma mensagem)

Se `_memoria/usuario.md` já existir e estiver preenchido, pular pra Fase 2.

> "Pra eu trabalhar do seu jeito, me conta:
> 1. Como quer ser chamado(a)?
> 2. Sua área (RH, Comunicação, Segurança do Trabalho, Produção, Administrativo, Financeiro, TI, Comercial, Liderança)?
> 3. Unidade (Cristalina-GO, Chapada Diamantina-BA, ambas, escritório)?
> 4. Seu cargo ou papel (e quem é seu líder imediato, se quiser)?
> 5. O que você mais vai produzir aqui? (comunicados, placas, cartões, apresentações, vídeos, orientação pela cultura)
> 6. Ferramentas que já usa (Canva, PowerPoint, CapCut, WhatsApp, Teams)?"

Criar `_memoria/usuario.md` a partir de `_memoria/usuario.exemplo.md` com
as respostas e um `Slug` (nome curto sem acento). O arquivo não vai pro
repositório (está no `.gitignore`).

Criar `saidas/registro/<slug>.md` com a primeira linha:
`- YYYY-MM-DD | /instalar | primeiro acesso | _memoria/usuario.md`.

## Fase 2 — Conferência da memória

Checar que existem e não estão vazios: `_memoria/cultura.md` (deve conter
"Arquétipo" ou "I. Direcionadores"), `_memoria/politicas.md`,
`_memoria/empresa.md`, `identidade/design-guide.md`, `identidade/logo.png`.
Faltando algo → "O repositório está incompleto; rode `/atualizar-sistema`
ou avise o administrador."

Conferir que o `CLAUDE.md` contém `hayashi:nucleo:inicio` e
`hayashi:contexto:inicio`.

## Fase 3 — Por onde começar

Mostrar, conforme a área (do `usuario.md`):

```
Pronto, <nome>. O Hayashi OS já conhece a empresa, o Guia da Cultura (v1.7) e a identidade.

Pra você, de <área>, o mais útil tende a ser:
- /decisao       uma situação do dia a dia → o que o guia orienta
- /comunicado    aviso, comunicado, campanha, mensagem pro grupo
- /arte, /placa  cartaz, cartão, tela pra TV, placa de setor ou segurança
- /apresentacao, /documento, /video
- /cultura       o que o guia ou o manual dizem sobre X

Comece toda sessão com /abrir. Termine com /salvar.
Manual completo: COMECE-AQUI.md
```

RH: destacar `/integracao`, `/reconhecimento aniversariantes`, `/feedback`.
Segurança: `/placa`, `/video` (DDS), `/comunicado campanha`.
Liderança: `/decisao`, `/feedback`, `/reconhecimento`.
Comunicação: `/arte`, `/calendario`, `/carrossel`, `/video`.

## Modo administrador (`/instalar administrador`)

Pra quem mantém o repositório (uma vez):

1. Repositório privado da Hayashi no GitHub (ou no servidor da empresa);
   `origin` apontando pra ele; quem tem acesso (ver `docs/guia-administrador.md`).
2. Arquivos de marca que faltam: `identidade/logo-branco.png`,
   `logo-simbolo.svg`, `logo.svg`; fotos oficiais em `identidade/fotos/` e
   inventário em `fotos.md`.
3. Completar `_memoria/empresa.md`: canais internos, áreas e responsáveis,
   site e redes (marcados *(confirmar)*).
4. Conferir datas internas em `templates/calendario/datas-hayashi.md`
   (SIPAT, integrações, confraternização).
5. `.env` só se for usar transcrição ou publicação em redes.
6. Teste de fumaça: `/cultura arquétipo IV`, `/placa` de setor em A4,
   `/arte` cartão de aniversário, `/video` info num vídeo qualquer.
7. `/salvar`.

## Regras

- Não inventar dados da empresa pra preencher lacunas; marcar *(confirmar)*.
- Nunca editar `cultura.md` e `politicas.md` aqui.
- Nunca pedir nem ler chaves de API.
