---
name: salvar
description: >
  Salva o trabalho no repositório da Hayashi (commit + pull + push), sem levar dados pessoais,
  chaves ou vídeos. Na primeira vez, se não houver remoto, orienta o administrador. Use quando o
  usuário disser "salvar", "/salvar", "commit", "push", "guardar", "fim de sessão".
---

# /salvar — Guardar no repositório da Hayashi

Repositório único e privado, compartilhado por quem usa o HayashiOS.
`/salvar` leva o que é da empresa (materiais, comunicados, skills,
registro) e deixa de fora o que é pessoal ou pesado (`_memoria/usuario.md`,
`pessoas/`, `dados/`, `.env`, vídeos: tudo no `.gitignore`).

## Antes de tudo: segurança

1. `git check-ignore -q .env` quando o `.env` existir; se não estiver
   ignorado, parar e corrigir o `.gitignore`.
2. `git status --porcelain`: se aparecer algo de `pessoas/`, `dados/`,
   `_memoria/usuario.md` ou arquivo `.mp4/.mov/.mp3/.wav`, parar e avisar
   (o `.gitignore` deveria cobrir; conferir).
3. Olhar os nomes dos arquivos novos: lista de aniversariantes, ata com
   nomes completos, termo preenchido → não versionar; mover pra `pessoas/`.

## Cenários

### A. Sem remoto (`git remote get-url origin` falha)

> "Esta pasta ainda não está ligada ao repositório da Hayashi. Isso é
> configurado pelo administrador do OS (docs/guia-administrador.md). Quer
> que eu só faça o commit local por enquanto?"

Commit local: `git add -A` → `git commit -m "<mensagem>"`.

### B. Com remoto (uso normal)

1. `git status --short`. Sem mudança → "Tudo salvo." e parar.
2. Mostrar a lista curta e perguntar:
   > "Vou salvar isso. Quer descrever em uma frase ou uso um resumo automático?"
3. Mensagem: a do usuário ou gerada a partir dos arquivos ("Adiciona placas
   de EPI da oficina", "Comunicado de transporte de novembro", "Skill
   /dds criada"), com o slug do usuário no fim entre colchetes
   (`[mateus]`) pra rastrear quem fez.
4. `git add -A` → `git commit -m "<mensagem>"`.
5. `git pull --rebase --autostash origin main`. Conflito:
   - em `saidas/registro/*.md` ou outro arquivo só de acréscimo: manter as
     duas versões (as linhas dos dois lados), `git add`, `git rebase --continue`
   - em outro arquivo: mostrar os dois trechos e resolver com o usuário;
     nunca descartar o trabalho dele; `git rebase --abort` se ele preferir
     parar e pedir ajuda ao administrador
6. `git push origin main`.
7. Confirmar: "Salvo. <URL do repositório>".

## Regras

- Nunca `--force`, `reset --hard`, `clean`.
- Nunca commitar `.env`, `pessoas/`, `dados/`, `usuario.md`, vídeo ou áudio.
- Se `git config user.name`/`user.email` estiverem vazios, configurar com
  `--local` (nome e e-mail corporativo da pessoa).
- Push recusado por permissão → "Sua conta não tem acesso de escrita ao
  repositório; fale com o administrador." Commit local fica feito.
- Arquivo acima de 20 MB: avisar e deixar fora.
