---
name: atualizar-sistema
description: >
  Traz a versão mais nova do HayashiOS do repositório da empresa (skills, scripts, templates,
  memória oficial, identidade) sem mexer no que é só seu (`_memoria/usuario.md`, `pessoas/`,
  `dados/`). Mostra o que mudou (CHANGELOG). Use quando o usuário disser "/atualizar-sistema",
  "tem versão nova?", "atualiza o HayashiOS", ou quando o administrador avisar de versão nova.
disable-model-invocation: true
---

# /atualizar-sistema — Versão nova

Todos usam o mesmo repositório, então atualizar é trazer o `main`. O que é
pessoal não está versionado e fica intacto.

## Workflow

1. `git status --porcelain`. Mudanças não salvas → "Roda `/salvar` antes."
2. `git fetch origin main`.
3. Versão: `cat VERSION` vs. `git show origin/main:VERSION`. Iguais →
   "Já está na vX." e parar.
4. `git show origin/main:CHANGELOG.md`: mostrar as seções entre a versão
   local e a nova, com destaque pra "O que muda pra você".
5. Perguntar: "Atualizo da vX pra vY?"
6. `git pull --rebase --autostash origin main`. Conflito em arquivo de
   sistema → manter a versão do `origin` (sistema) e avisar; em arquivo de
   trabalho do usuário → manter o dele.
7. Se `package.json` mudou → `npm install`; se avisar do Chromium →
   `npx playwright install chromium`.
8. `node scripts/verificar-ambiente.js`.
9. Resumo:

```
✓ HayashiOS atualizado: vX → vY
O que muda pra você: ...
Skills novas: ... · Alteradas: ...
Guia/Manual: <versão carregada> (mudou? sim/não)
```

## Regras

- Sem `--force`, sem `reset --hard`.
- Nunca tocar em `_memoria/usuario.md`, `pessoas/`, `dados/`, `.env`.
- Se o guia ou o manual mudou de versão, lembrar que materiais antigos
  (quiz, cartazes) podem precisar de revisão.
