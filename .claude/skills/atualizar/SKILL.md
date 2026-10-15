---
name: atualizar
description: >
  Varre o workspace e reconcilia a memória compartilhada (`_memoria/empresa.md`, bloco "Hayashi"
  do CLAUDE.md, `identidade/fotos.md`, `identidade/design-guide.md`) com o que existe de fato
  (áreas e responsáveis citados em materiais, canais usados, fotos sem catalogar, skills criadas,
  ferramentas configuradas). Confere a integridade do núcleo do CLAUDE.md e a versão dos
  documentos oficiais. Use quando o usuário disser "/atualizar", "atualiza a memória",
  "reconcilia", "a memória está desatualizada".
---

# /atualizar — Memória em dia

Não altera `cultura.md` nem `politicas.md` (documentos oficiais); só
aponta se a versão anunciada no CHANGELOG diverge do cabeçalho deles.

## Passo 1 — Levantamento

- `git log --since=30.days --name-only --pretty=format:` (atividade recente)
- `saidas/registro/*.md`: últimas 30 linhas de cada
- `comunicacao/`, `materiais/`, `projetos/`: pastas e datas
- `.claude/skills/`: skills existentes vs. citadas no bloco "Hayashi" e no
  `templates/skills/catalogo.md`
- `identidade/fotos/`: arquivos não listados em `identidade/fotos.md`
- `identidade/`: existem `logo-branco.png`, `logo.svg`? (checklist do bloco Hayashi)
- `node scripts/verificar-ambiente.js`: ffmpeg, Playwright, chaves presentes
- `CLAUDE.md`: marcadores `hayashi:nucleo:*` e `hayashi:contexto:*` presentes?
- `_memoria/cultura.md` e `politicas.md`: cabeçalho de versão vs. `CHANGELOG.md`

## Passo 2 — Comparação

- `empresa.md`: áreas/responsáveis/canais marcados *(confirmar)* que
  aparecem preenchidos em materiais recentes (ex.: comunicado assinado
  pelo "RH — Fulana") → propor registrar (cargo e área; sem telefone)
- Bloco "Hayashi": ferramentas conectadas e skills em uso batem?
- `fotos.md`: fotos novas sem inventário
- `design-guide.md`: peças recentes usaram cor ou fonte fora do guia?
  (apontar a peça, não mudar o guia)

## Passo 3 — Proposta

```
Encontrei N coisas pra atualizar:
1. _memoria/empresa.md — responsável do RH aparece em 3 comunicados: registrar?
2. identidade/fotos.md — 8 fotos em identidade/fotos/colheita/ sem catalogar
3. CLAUDE.md (bloco Hayashi) — marcar "Transcrição automática" como conectada
4. templates/skills/catalogo.md — skill /dds criada e não listada
Aplico todas, algumas ou nenhuma?
```

## Passo 4 — Aplicação

Edição cirúrgica, diff mostrado. Núcleo ausente → restaurar de
`templates/sistema/claude-md-nucleo.md`.

## Regras

- Só o que tem evidência; ambíguo → perguntar.
- Não apagar; atualizar e adicionar.
- Nunca editar o núcleo (exceto restaurar), `cultura.md`, `politicas.md`.
- Nada mudou → "Tá tudo coerente."
