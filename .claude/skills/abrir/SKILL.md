---
name: abrir
description: >
  Abre a sessão de trabalho: confirma que a memória da Hayashi está carregada e devolve um resumo
  curto com quem está usando, versão do sistema, datas e campanhas próximas do mês e a última
  atividade registrada. Use quando o usuário disser "/abrir", "começar", "bom dia", "o que tem
  pra hoje", ou no primeiro turno de uma sessão.
---

# /abrir — Abertura de sessão

Curto: em 6 linhas a pessoa sabe onde está e o que vem pela frente.

## Workflow

1. A memória já vem carregada pelo `CLAUDE.md`. Conferir só se
   `_memoria/usuario.md` existe e tem nome. Se não:
   > "Ainda não sei quem está usando. Quer rodar `/instalar`? (2 minutos)"
   E parar.

2. Levantar sem narrar:
   - `VERSION`
   - `comunicacao/calendario/<YYYY-MM atual>.md`: itens pendentes desta semana
     (se não existir e for dia 20 ou mais, sugerir `/calendario`)
   - `templates/calendario/datas-hayashi.md`: datas dos próximos 15 dias
     relevantes pra área do usuário
   - `saidas/registro/<slug>.md`: última linha
   - `git status --short | wc -l`: mudanças não salvas

3. Responder UMA mensagem:

```
Hayashi OS v<versão> · <nome>, <área> · <unidade>
Próximos dias: <data: evento> · <data: evento>
Calendário: <N itens pendentes esta semana | sem calendário deste mês>
Última atividade: <data> (<skill>) · <N arquivos não salvos | tudo salvo>

O que vamos fazer? (/decisao, /comunicado, /arte, /placa, /video, /cultura…)
```

4. Não listar arquivos lidos.

## Regras

- Cabe em 6 linhas.
- Pendência que não existe não aparece.
- Nenhuma pergunta além de "o que vamos fazer?".
