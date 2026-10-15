---
name: comunicado
description: >
  Escreve comunicação interna da Hayashi no tom da empresa: comunicado oficial, aviso de
  operação (escala, transporte, feriado, pagamento, benefício), campanha (segurança, saúde,
  cultura), mensagem de WhatsApp pra equipes, e-mail interno, texto pra mural e TV, mensagem da
  diretoria. Entrega as versões por canal e indica quem aprova e assina. Use quando o usuário
  disser "comunicado", "aviso pra equipe", "mensagem pro grupo", "informar os colaboradores",
  "campanha de...", "texto pro mural", "/comunicado".
argument-hint: "[aviso | oficial | campanha | whatsapp | diretoria]"
---

# /comunicado — Comunicação interna

"A comunicação interna deve ser construída com base nos princípios de
transparência e honestidade." (Como utilizar o guia, item 3.) Toda
comunicação daqui é clara, respeitosa, simples (valor Simplicidade) e
assinada por quem responde pelo assunto.

## Dependências

- `_memoria/preferencias.md` (tom, vocabulário), `_memoria/empresa.md`
  (unidades, áreas), `_memoria/politicas.md` (quando o assunto é regra de
  RH/SST: citar a seção, não reescrever a regra), `_memoria/cultura.md`
- `templates/calendario/datas-hayashi.md` (campanhas e datas)
- `/arte` (versão visual pra mural/TV/WhatsApp), `/documento` (comunicado
  oficial em A4)
- Saída: `comunicacao/comunicados/<YYYY-MM-DD>-<slug>/`

## Workflow

### Passo 1 — Briefing (uma mensagem; responder o que souber)

1. Assunto e o fato (o quê, quando, onde, quem é afetado)
2. Pra quem: todos, uma unidade, uma área, lideranças
3. Canais: WhatsApp dos grupos, mural impresso, TV/painel, e-mail, reunião
   de início de turno (DDS), app
4. Quem assina e quem precisa aprovar antes (líder da área, RH,
   gerente da unidade, diretoria)
5. Tem ação esperada? (comparecer, assinar, usar, evitar) e prazo

Dados de data, horário, valor e local: só os informados. Faltou → marcar
`[confirmar]` no texto, nunca chutar.

### Passo 2 — Texto base

Estrutura (Simplicidade):
1. **Título** direto (o quê + quando): "Transporte: novo horário a partir de 3/11"
2. **O que muda / o que acontece** (2-4 linhas)
3. **O que você precisa fazer** (se houver), com prazo
4. **Por quê** (1 linha; ligar ao valor ou ao guia quando fizer sentido,
   sem sermão)
5. **Dúvidas:** com quem falar (líder imediato, RH, Segurança)
6. **Assinatura:** área/cargo (e nome quando for a diretoria)

Tom: "Prezado(a) colaborador(a)" ou "Pessoal" (WhatsApp de equipe), você,
frases curtas, sem jargão, sem ironia, sem exclamação em excesso. Regras
de RH/SST citadas como estão no manual, com a seção.

### Passo 3 — Versões por canal (só os pedidos)

- **WhatsApp (grupo):** até 8 linhas, título em negrito, 1 emoji no máximo
  (ou nenhum em assunto sério), sem link encurtado desconhecido
- **Mural / TV:** `/arte` em modo orquestrado (cartaz A4 ou tela 1920x1080):
  título grande, 3 linhas, logo, data
- **E-mail:** assunto específico, texto base completo, assinatura
- **Oficial (A4 assinado):** `/documento` tipo comunicado interno, com
  número e data
- **DDS / fala do líder:** 5 frases pra o líder ler no início do turno
- **Diretoria:** carta curta em primeira pessoa, no tom das palavras do
  Fundador e do Diretor Geral (respeitoso, agradece, convoca)

### Passo 4 — Campanha (quando for)

Pra Abril Verde, SIPAT, Setembro Amarelo, Outubro Rosa, Novembro Azul,
cultura, 5S: plano de 2-4 semanas com 1 peça por semana (tema, canal,
formato, responsável), textos e pedido de artes ao `/arte`. Saúde mental e
temas sensíveis: tom cuidadoso, sem banalizar, indicar apoio (RH, Linha
Ética quando couber).

**CHECKPOINT:** mostrar os textos; ajustar; só então gerar artes/PDF.

### Passo 5 — Entregar

```
✓ Comunicado: <título>
comunicacao/comunicados/<pasta>/  (texto.md · whatsapp.md · mural.png · oficial.pdf · email.md)
Aprovar com: <quem>. Assina: <quem>. Enviar em: <canais>, <quando>.
```

Registrar em `saidas/registro/<slug-usuario>.md`.

## Regras

- Transparente e honesto: não omitir o "por quê" nem maquiar notícia
  ruim; dizer o que se sabe e o que ainda será informado.
- Regra ou política: citar o manual (seção) ou o guia (arquétipo); não
  inventar prazo, valor ou consequência.
- Comunicação pra fora da empresa (imprensa, clientes, redes públicas)
  não é daqui: arquétipo VI, diretoria. Avisar e encaminhar.
- Dados pessoais de colaboradores não entram em comunicado coletivo.
- Nada é enviado por aqui; o usuário envia pelo canal.
