---
name: cultura
description: >
  Consulta o Guia do Manifesto da Cultura Hayashi (v1.7) e o Manual do Colaborador (v4) e responde
  com o texto oficial e a seção: propósito, visão, valores, os dez arquétipos (aceitamos / não
  aceitamos), políticas de RH e segurança (ponto, faltas, atestado, licenças, férias, EPI).
  Também gera resumos pra mural, trechos pra apresentação e quiz de fixação. Use quando o usuário
  perguntar "o que o guia diz sobre...", "quais são os valores", "o que é aceito em...", "quantos
  dias de licença...", "regra de atestado", "/cultura", "me explica o arquétipo X". Pra orientar
  uma situação concreta, a skill é /decisao.
argument-hint: "[tema | arquétipo | quiz | resumo]"
---

# /cultura — O que o guia e o manual dizem

Fonte única: `_memoria/cultura.md` (Guia do Manifesto da Cultura, v1.7,
julho/2024) e `_memoria/politicas.md` (Manual do Colaborador, v4,
dezembro/2024). Já estão carregados na sessão.

## Modos

### 1. Consulta (padrão)

Pergunta → resposta com o **texto literal** e a referência:

```
**Arquétipo VI, Interação Externa** (Guia da Cultura, v1.7)
Aceitamos: "Todo e qualquer brinde recebido deverá ser direcionado para a empresa..."
Não aceitamos: "Recebimento recorrente de brindes ou que sejam personalizados com o nome do colaborador."
Valores ligados: Confiança, Respeito.
```

Políticas: `**Manual do Colaborador, 5.2.2 Atestados médicos:** "Deve ser
entregue ao seu líder ou RH em até 48 horas após a emissão."`

Se a pergunta mistura guia e manual (ex.: atraso), citar os dois. Se o
assunto não está em nenhum, dizer: "O Guia e o Manual não tratam disso.
Quem responde é o RH / a Segurança do Trabalho / o gerente da unidade."
Nunca completar com regra inventada; a CLT pode ser citada como "regra
geral, confirmar com o RH".

### 2. Explicar um arquétipo

`/cultura arquétipo VII` → o que é, por que existe (ligação com os valores
e o propósito), os itens literais, 3 exemplos do dia a dia no campo, no
escritório e na liderança, e o que fazer quando é descumprido (ver
`templates/cultura/casos.md`).

### 3. Resumo pra mural, cartaz ou slide

`/cultura resumo valores`, `/cultura resumo arquétipos`, `/cultura resumo
linha ética` → texto enxuto, fiel ao original, pronto pra `/arte`,
`/placa` ou `/apresentacao`. Sem parafrasear o propósito e a visão: são
citados exatamente como estão.

### 4. Quiz de fixação (treinamento contínuo)

`/cultura quiz [tema] [N]` → N perguntas (padrão 10) de múltipla escolha
ou verdadeiro/falso, com gabarito e a referência de cada resposta. Mistura
situações práticas ("Um fornecedor mandou um brinde com seu nome. O que
fazer?") com conceito (valores, propósito). Salvar em
`materiais/cultura/<YYYY-MM-DD>-quiz-<tema>.md` se o usuário pedir.

### 5. Versão pra conversa

"Me explica isso como se fosse pra um operador de máquina novo" → mesma
regra, linguagem simples, sem perder o sentido, sempre apontando que o
texto oficial está no guia impresso que ele recebeu.

## Regras

- Texto do guia e do manual é citado literalmente, entre aspas, com a
  seção. Paráfrase só quando o usuário pedir "em outras palavras", e aí
  sinalizada como tal.
- Versão: sempre dizer "v1.7 (julho/2024)" do guia e "v4 (dezembro/2024)"
  do manual quando a resposta for pra outra pessoa ou pra material impresso.
- Não opinar sobre a regra; explicar a regra. Sugestões de mudança no
  guia são encaminhadas à diretoria/RH (o próprio guia, arquétipo I, pede
  alinhamento antes de alterar processos).
- Registrar em `saidas/registro/<slug-usuario>.md` só quando gerar
  material (resumo, quiz), não em consultas.
