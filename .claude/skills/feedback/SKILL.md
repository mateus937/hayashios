---
name: feedback
description: >
  Estrutura uma conversa de feedback de desenvolvimento ou de reconhecimento (líder → colaborador,
  ou entre pares) referenciando o Guia da Cultura Hayashi: fatos, impacto, arquétipo e valor
  envolvidos, expectativa, combinado e acompanhamento. Inclui as reuniões de avaliação do contrato
  de experiência (Manual 5.1). Gera roteiro da conversa, registro resumido e mensagem de convite.
  Use quando o usuário disser "preciso dar um feedback", "como falo com fulano sobre...",
  "avaliação de experiência", "feedback positivo", "/feedback".
argument-hint: "[desenvolvimento | positivo | experiencia-45 | experiencia-90]"
---

# /feedback — Feedback com o guia na mão

"Ao fornecer feedback, os líderes devem referenciar o guia para destacar
comportamentos que estão alinhados com a cultura e áreas que podem ser
aprimoradas." (Como utilizar o guia, item 7.) Arquétipo IV pede feedbacks
individuais alinhados aos comportamentos e objetivos combinados; arquétipo
III não aceita líderes que não orientam diante de erros e baixo desempenho.

## Dependências

- `_memoria/cultura.md`, `_memoria/politicas.md` (5.1 contrato de experiência;
  5.2 jornada e ponto), `templates/cultura/casos.md`
- `_memoria/preferencias.md` (tom)
- Saída (não versionada): `pessoas/feedback/<YYYY-MM-DD>-<slug>/`

## Tipos

- **desenvolvimento** — comportamento ou resultado abaixo do combinado
- **positivo** — reconhecer algo específico (ver também `/reconhecimento`)
- **experiencia-45** e **experiencia-90** — as duas reuniões do contrato de
  experiência (Manual 5.1): análise comportamental, desempenho e feedback,
  com colaborador, líder imediato e RH, até 10 dias antes do vencimento;
  a segunda define continuidade ou encerramento

## Workflow

### Passo 1 — Coletar (uma mensagem, responder o que souber)

1. Quem recebe (primeiro nome ou papel) e há quanto tempo está na função
2. O que foi combinado (meta, papel, comportamento esperado): se não houve
   combinado claro, o feedback começa por aí (arquétipo I: clareza do papel)
3. Fatos observados: o quê, quando, quantas vezes, impacto (em
   resultado, equipe, segurança, cliente)
4. O que já foi conversado antes
5. O que o líder espera daqui pra frente e em quanto tempo

### Passo 2 — Ligar ao guia

Identificar arquétipo(s) e valor(es) que o comportamento toca (ex.:
atrasos → IX Senso de Justiça + Manual 5.2; não comunicar erro → VIII;
não apoiar outra área → VII). Pro feedback positivo, o mesmo: dizer qual
valor a pessoa demonstrou.

### Passo 3 — Roteiro da conversa (1 página)

```
# Roteiro de feedback — <primeiro nome> — <data>

**Objetivo da conversa:** (1 frase)
**Onde e como:** reservado, sem pressa, sem plateia; começar pelo contexto, não pelo problema

1. Abertura (1 min): por que a conversa; o que o guia espera de líder e colaborador
2. Fatos (não rótulos): "Nos dias X e Y aconteceu Z; o efeito foi W"
3. Escuta: "Como você vê isso?" (anotar a versão da pessoa)
4. O que a cultura espera: Arquétipo <N> — "<item literal>"; valor: <valor>
5. Expectativa clara: o que muda, até quando, como vamos medir
6. Apoio: o que o líder/empresa oferece (treino, acompanhamento, ferramenta)
7. Combinado e próximo encontro: data

Frases prontas (tom Hayashi): ...
O que evitar: generalizações ("você sempre"), comparação com colegas, ironia, ameaça
```

Pra **positivo**: fatos + valor demonstrado + efeito no time + "continue
assim" + se vale compartilhar com o time (arquétipo X).

Pra **experiência**: incluir os blocos do manual (comportamento,
desempenho, feedback), a pergunta sobre adaptação, e no 90 a decisão.
Lembrar o prazo (até 10 dias antes do vencimento) e a presença do RH.

**CHECKPOINT:** mostrar o roteiro; ajustar.

### Passo 4 — Entregáveis

- `roteiro.md` (acima)
- `registro.md`: modelo de ata curta pra depois da conversa (data,
  participantes por papel, fatos, combinado, prazo, próxima conversa,
  assinaturas se o RH exigir)
- `convite.md`: mensagem curta pra marcar ("Quero conversar com você
  quinta às 14h sobre nosso combinado de X. É uma conversa de alinhamento.")
- Se for experiência: `avaliacao.md` com os critérios em tabela (comportamento
  alinhado ao guia, entrega, segurança, pontualidade, colaboração)

Salvar em `pessoas/feedback/<YYYY-MM-DD>-<slug>/` (não versionada).
Registrar em `saidas/registro/<slug-usuario>.md` sem nome da pessoa.

## Regras

- Fatos observáveis, nunca rótulos ("desinteressado", "preguiçoso").
- Sempre um combinado com prazo e um retorno marcado.
- Feedback de desenvolvimento é individual e reservado; reconhecimento
  pode ser público (X).
- O OS não decide sanção nem continuidade de contrato; prepara a conversa.
- Dados de saúde, família ou vida pessoal da pessoa não entram no
  registro.
- Se o relato indicar assédio ou agressão, parar e seguir o Passo 0 do
  `/decisao`.
