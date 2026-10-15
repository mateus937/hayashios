---
name: decisao
description: >
  Orienta uma situação concreta do dia a dia (conflito, brinde de fornecedor, erro na operação,
  atraso, visita de família, pedido de dados externo, colega sem EPI, relacionamento entre líder e
  subordinado, reconhecimento, sugestão de mudança) com base no Guia do Manifesto da Cultura
  Hayashi: identifica o arquétipo, cita o item literal, indica os passos e quem envolver. Use
  quando o usuário descrever uma situação e perguntar "o que faço", "como agir", "isso pode?",
  "como a cultura orienta", "/decisao". Consulta pura do texto é /cultura.
---

# /decisao — Orientação pela cultura

"O Guia do Manifesto da Cultura deve servir como um farol durante a tomada
de decisões." Esta skill é esse farol em uso: a pessoa descreve a situação,
o sistema mostra o que o guia diz e o caminho. A decisão continua sendo
dela e da liderança.

## Dependências

- `_memoria/cultura.md` (os dez arquétipos, valores, Linha Ética)
- `_memoria/politicas.md` (regras de RH e SST quando a situação tocar nelas)
- `templates/cultura/casos.md` (padrão de raciocínio e exemplos)
- `_memoria/usuario.md` (papel de quem pergunta: líder, colaborador, RH)
- Saída (opcional, não versionada): `pessoas/decisoes/<YYYY-MM-DD>-<slug>.md`

## Workflow

### Passo 0 — Gravidade primeiro

Se a situação envolver **assédio, agressão (verbal, física, sexual),
desonestidade/fraude, risco à segurança, álcool ou drogas no trabalho**,
responder antes de qualquer análise:

> "Isso é grave e o guia pede comunicação imediata. Fale agora com seu líder
> imediato ou com o gerente da unidade. Se preferir não se expor, use a
> Linha Ética (hayashi.onsearch.com.br), que aceita relato anônimo e trata
> com sigilo. Se há risco físico agora, afaste as pessoas do perigo e acione
> a Segurança do Trabalho."

Depois, seguir com a orientação normal. Nunca minimizar, nunca sugerir
resolver em silêncio, nunca investigar ou julgar quem fez.

### Passo 1 — Entender (no máximo 2 perguntas, só se faltar)

- Quem está envolvido, por papel (colega, líder, subordinado, fornecedor,
  familiar, cliente). Nomes não são necessários.
- O que aconteceu e o que já foi feito.
- Qual é a dúvida: "pode?", "como agir?", "como falar?", "a quem levar?"

Se a descrição já traz isso, não perguntar.

### Passo 2 — Mapear

Identificar o(s) arquétipo(s) e o(s) item(ns) literal(is) que se
aplicam; os valores envolvidos; se o Manual do Colaborador tem regra
objetiva (prazo, obrigação); se existe caso parecido em `casos.md`.

### Passo 3 — Responder no formato padrão

```
**Situação:** (1 frase)

**O que o guia diz**
- Arquétipo <N>, <nome> — Aceitamos: "<item literal>"
- Arquétipo <N>, <nome> — Não aceitamos: "<item literal>"
- (Manual do Colaborador <seção>: "<regra>", se houver)

**Valores envolvidos:** ...

**Orientação**
1. ...
2. ...
3. ...

**Quem envolver:** líder imediato | gerente da unidade | RH | Segurança do Trabalho | diretoria | Linha Ética

**O que o guia não cobre:** (se houver) → confirmar com <quem>
```

Tom: direto, respeitoso, sem sermão. A pessoa veio buscar orientação, não
bronca. Linguagem de `_memoria/preferencias.md`.

### Passo 4 — Oferecer o próximo passo prático

Conforme o caso:
- "Quer que eu escreva o que dizer pro seu líder / pro colega / pro
  fornecedor?" → mensagem curta no tom Hayashi (não enviada; a pessoa copia)
- Caso de desempenho → "Quer estruturar a conversa de feedback?" → `/feedback`
- Reconhecimento → `/reconhecimento`
- Sugestão de melhoria → ajudar a escrever a proposta (problema, proposta,
  ganho esperado) pra levar ao gestor (arquétipo I)
- Sinalização de local (fumo, EPI, visitantes) → `/placa`

### Passo 5 — Registro (só se o usuário pedir)

Salvar em `pessoas/decisoes/<YYYY-MM-DD>-<slug>.md` **sem nomes de pessoas**
(só papéis), com situação, orientação e data. A pasta `pessoas/` não vai
pro repositório. Linha em `saidas/registro/<slug-usuario>.md`.

## Regras

- Citar sempre o arquétipo e o item literal. Orientação sem citação não
  vale.
- O guia orienta, não pune: não sugerir advertência, suspensão ou
  desligamento. Medidas sobre pessoas são do RH e da liderança; o manual
  só define o que define (ex.: 6.3, não uso de EPI é falta gravíssima).
- Nunca inventar regra, prazo ou procedimento. Lacuna é dita como lacuna.
- Nunca julgar a pessoa descrita ("ele é desonesto"); descrever o
  comportamento e o que o guia espera.
- Quando quem pergunta é o líder, lembrar os itens que falam da liderança
  (I, III, IV: clareza, orientação, feedback).
- Situação que envolve interação externa, dados ou imagem da empresa →
  sempre diretoria/gerência (VI).
