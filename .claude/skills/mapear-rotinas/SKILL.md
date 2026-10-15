---
name: mapear-rotinas
description: >
  Descobre tarefas que a área repete (RH, Segurança, Comunicação, liderança, administrativo) e
  transforma as aprovadas em skills do HayashiOS, compartilhadas com todos depois do /salvar.
  Parte de rotinas já mapeadas por área. Use quando o usuário disser "/mapear-rotinas", "criar
  skill", "automatizar minha rotina", "o que mais dá pra fazer com isso".
---

# /mapear-rotinas — De rotina a skill

## Passo 1 — Ponto de partida

Ler `_memoria/usuario.md` (área) e `_memoria/estrategia.md` ("rotinas que
as áreas querem tirar das costas"); listar o que já existe (`Glob
.claude/skills/*/SKILL.md`). Propor 5-8 rotinas típicas da área que ainda
não têm skill:

- **RH:** aviso de benefício do mês (batatas na colheita, cesta natalina,
  13º), termo de entrega de EPI em branco, lista de presença de
  treinamento, lembrete das reuniões de avaliação de experiência (45/90
  dias), comunicado de vagas internas, boas-vindas por turma
- **Segurança do Trabalho:** DDS semanal (texto + vídeo curto), placa por
  setor, campanha mensal (Abril Verde, SIPAT), relatório simples de
  incidentes a partir de planilha, checklist de EPI por função
- **Comunicação:** post de data comemorativa, tela da TV da semana, resumo
  do mês pra diretoria, roteiro de vídeo institucional
- **Liderança:** reunião de alinhamento de metas (arquétipo I), feedback
  mensal, reconhecimento do time, orientação por situação
- **Administrativo / Financeiro:** ata de reunião, ofício, comunicado de
  fornecedor, análise de planilha
- **Produção / Agronômico:** relatório de campo a partir de dados, placa de
  talhão/área, instrução de trabalho ilustrada

## Passo 2 — Perguntar (3 perguntas, uma por vez)

1. "Dessa lista, o que você faz na mão hoje? Tem outra?"
2. "O que você tem na mão na hora (planilha, foto, print, nome)?"
3. "O que precisa sair (mensagem, PDF, imagem, vídeo, planilha)?"

## Passo 3 — Cobertura

Skill do OS já cobre? (ex.: cartões de aniversário → `/reconhecimento`;
placa → `/placa`). Se sim, mostrar como usar. Senão, propor:

```
### /<nome>
**O que faz:** ...
**Você manda:** ...
**Sai:** ... (caminho da tabela "Onde cada coisa é salva")
**Lê:** _memoria/..., identidade/..., templates/...
**Aprovação:** quem
```

## Passo 4 — Criar (máximo 5 por rodada)

`.claude/skills/<nome>/SKILL.md`: frontmatter com as palavras que a pessoa
diria; dependências; workflow com checkpoint antes de qualquer envio;
citação literal do guia/manual quando a skill tocar regra; saída fixa;
registro; UTF-8 sem BOM. Testar com um exemplo real.

Adicionar ao `templates/skills/catalogo.md` e avisar: "Depois do `/salvar`
essa skill vale pra todo mundo; o administrador revisa."

## Regras

- Rotina repetida, não tarefa única.
- Nada que envie ou publique sem confirmação.
- Skill que trate de pessoas guarda saída em `pessoas/`.
