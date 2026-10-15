---
name: integracao
description: >
  Monta o kit de Integração Cultural de novos colaboradores (uma pessoa ou uma turma): roteiro da
  apresentação do Manifesto da Cultura, slides, checklist da primeira semana (ponto, EPI,
  transporte, contrato de experiência, Linha Ética), quiz de fixação, cartão de boas-vindas,
  mensagem pro líder e a folha de Confirmação de Recebimento em PDF. Use quando o usuário disser
  "integração", "onboarding", "turma nova", "colaborador novo", "boas-vindas", "/integracao".
argument-hint: "[nome-ou-turma] [unidade] [data]"
---

# /integracao — Integração cultural

"Durante o processo de integração de novos membros, o guia deve ser
apresentado de maneira abrangente. Os novos colaboradores devem
compreender não apenas o que fazemos, mas por que fazemos." (Como utilizar
o guia, item 2.) O Manual (seção 4) diz que todo novo colaborador passa pela
Integração Cultural, recebe o guia impresso e assina a Confirmação de
Recebimento.

## Dependências

- `_memoria/cultura.md`, `_memoria/politicas.md`, `_memoria/empresa.md`
  (história, unidades, números), `_memoria/preferencias.md`
- `/apresentacao` (slides), `/arte` (cartão), `/documento` (confirmação,
  checklist em PDF), `/cultura quiz`
- `identidade/templates/`, `identidade/hayashi.css`
- Saída: `materiais/integracao/<YYYY-MM-DD>-<slug>/`

## Workflow

### Passo 1 — Contexto (perguntar só o que faltar)

1. Uma pessoa ou turma? Quantos? Primeiros nomes e áreas (ou só áreas)
2. Unidade (Cristalina-GO, Chapada Diamantina-BA, escritório) e data
3. Quem conduz (RH, líder, Segurança) e quanto tempo tem (30, 60, 90 min)
4. Já existe apresentação oficial? Se sim, apontar o arquivo e adaptar
   em vez de criar outra

### Passo 2 — Roteiro da integração (`roteiro.md`)

Estrutura padrão de 60 min (ajustar):

1. Boas-vindas (5 min): "Escreva a sua história com a Hayashi! Você já faz
   parte!" + o que a empresa espera (6 objetivos do Manual)
2. Quem somos (10 min): história da família (1963 → hoje), unidades,
   culturas e áreas, os 6 fatores do respeito conquistado (`empresa.md`)
3. Propósito, Visão, Valores (10 min): citados literalmente + o que
   significam no dia a dia da área da turma
4. Os dez arquétipos (20 min): 1 slide por arquétipo com Aceitamos / Não
   aceitamos e 1 exemplo do campo (`templates/cultura/casos.md`)
5. Linha Ética (5 min): o que é, anônimo, QR
6. Regras práticas da primeira semana (5 min): ponto, EPI, transporte,
   refeição, contrato de experiência 45+45, atestado em 48 h
7. Quiz rápido (5 min) e assinatura da Confirmação de Recebimento

### Passo 3 — Materiais

- `slides/` → `/apresentacao` em modo orquestrado (capa, 1 slide por
  bloco acima, 1 por arquétipo, encerramento com as frases do Fundador e do
  Diretor Geral)
- `checklist-primeira-semana.md` (+ PDF via `/documento`): o que o novo
  colaborador precisa fazer e receber (uniforme, EPIs com assinatura,
  acesso ao app de ponto, horário e setor, transporte, contato do líder,
  data da 1ª reunião de avaliação)
- `quiz.md` → `/cultura quiz integracao 10`
- `confirmacao-recebimento.pdf` → `/documento` com o texto oficial da
  Confirmação (em `cultura.md`), campos nome legível, assinatura, data,
  versão 1.7
- `cartao-boas-vindas/` → `/arte` tipo cartão, com primeiro nome (ou "Bem-
  vindo(a) ao time Hayashi" sem nome pra turma)
- `mensagem-lider.md`: texto pro líder imediato mandar no primeiro dia
  (apresentação, horário, onde se apresentar, quem procurar)

**CHECKPOINT:** mostrar o roteiro e a lista de materiais antes de gerar
os arquivos pesados (slides, PDFs).

### Passo 4 — Entregar

```
✓ Integração <turma/nome> — <unidade> — <data>
materiais/integracao/<pasta>/
  roteiro.md · slides/ (PNG + PDF) · checklist-primeira-semana.pdf
  quiz.md · confirmacao-recebimento.pdf · cartao-boas-vindas/ · mensagem-lider.md
Lembrete: o guia impresso é entregue na integração e a confirmação assinada vai pro RH.
```

Registrar em `saidas/registro/<slug-usuario>.md`.

## Regras

- Propósito, visão, valores e itens dos arquétipos são citados
  literalmente; a versão do guia (1.7) aparece nos slides e na confirmação.
- Nome completo, CPF, dados pessoais: não entram nos materiais. Primeiro
  nome e área bastam.
- Fotos de pessoas só com autorização de uso de imagem.
- Não inventar política que não está no manual (ex.: valor de benefício).
