---
name: documento
description: >
  Cria documentos oficiais em A4 no padrão visual do Manual do Colaborador: comunicado interno
  numerado, política ou procedimento (POP), ata de reunião, ofício/carta, formulário (confirmação
  de recebimento, termo de entrega de EPI, lista de presença), relatório, checklist. Sai em HTML
  → PDF; Word (.docx) quando a skill docx estiver disponível. Use quando o usuário pedir
  "documento", "ata", "política", "procedimento", "POP", "ofício", "formulário", "termo",
  "lista de presença", "relatório em PDF", "/documento".
argument-hint: "[comunicado | politica | procedimento | ata | oficio | formulario | relatorio | checklist]"
---

# /documento — Documentos oficiais

Mesmo padrão do Manual do Colaborador: cabeçalho com número da página em
caixa petróleo, "HAYASHI | <Título do documento>" em petróleo, logo
pequeno à direita; títulos em Roboto/Roboto Condensed petróleo; texto em
Lato; tabelas com linhas alternadas; rodapé com versão, data e área
responsável.

## Dependências

- `identidade/hayashi.css`, `identidade/templates/documento-a4.html`,
  `identidade/logo.png`, `identidade/design-guide.md`
- `_memoria/politicas.md` e `_memoria/cultura.md` (quando o documento
  cita regra ou cultura: literal, com seção)
- `_memoria/preferencias.md` (tom institucional)
- `node scripts/pdf.js <html> <pdf> --formato A4`
- Skill `docx` (plugin da Anthropic), se instalada, pra Word editável
- Saída: `materiais/documentos/<YYYY-MM-DD>-<slug>/`

## Modo orquestrado

Chamada por `/comunicado`, `/integracao`, `/feedback`: recebe tipo,
conteúdo e pasta; executa sem checkpoint.

## Tipos

| Tipo | Estrutura |
|---|---|
| comunicado | número (CI-AAAA-NNN), data, para, de, assunto, texto, assinatura |
| politica / procedimento (POP) | código, versão, data, objetivo, abrangência, definições, responsabilidades, descrição passo a passo, registros, referências (guia/manual/NR), histórico de revisões, aprovação |
| ata | reunião, data/hora/local, participantes (nome e área), pauta, decisões, responsáveis e prazos, próxima reunião, assinaturas |
| oficio / carta | timbre, número, data, destinatário, assunto, corpo, fecho, assinatura (diretoria/gerência: representação formal, VI) |
| formulario | título, instruções, campos com linhas, assinaturas e data (ex.: Confirmação de Recebimento do guia, termo de entrega de EPI, lista de presença de treinamento) |
| relatorio | capa, sumário, seções, tabelas, conclusões, anexos |
| checklist | itens com caixa, responsável, data, observações |

## Workflow

### Passo 1 — Conteúdo

Perguntar só o que faltar: tipo, título, área responsável, quem aprova e
assina, conteúdo (ou fonte: reunião, política atual, texto do guia),
versão/numeração (próximo número = maior em `materiais/documentos/` + 1,
se o usuário não tiver controle próprio).

### Passo 2 — Texto

Escrever o documento completo em Markdown primeiro (`documento.md`).
Regras citadas literalmente com a fonte. Linguagem institucional, direta,
sem juridiquês onde não precisa. **CHECKPOINT** (fora do modo orquestrado).

### Passo 3 — HTML e PDF

Pasta `materiais/documentos/<YYYY-MM-DD>-<slug>/`; copiar
`documento-a4.html` pra `documento.html`; ajustar caminhos
(`../../../identidade/...`); uma `<div class="hay-page a4">` por página
(quebrar o conteúdo em páginas; cabeçalho e rodapé repetidos em cada
uma); `node scripts/pdf.js ... --formato A4`. Conferir a 1ª página em PNG
(`render.js` com 794x1123) se houver dúvida de layout.

Word: se a skill `docx` estiver disponível, gerar `.docx` com os mesmos
estilos (fontes Roboto/Lato, cor 007581); senão, entregar PDF e avisar.

### Passo 4 — Entregar

```
✓ Documento: <tipo> — <título> — v<versão>
materiais/documentos/<pasta>/  (documento.md · documento.html · documento.pdf [· .docx])
Aprovação/assinatura: <quem>.
```

Registrar em `saidas/registro/<slug-usuario>.md`.

## Regras

- Versão, data e responsável em todo documento.
- Regra citada, não reescrita; lacuna marcada "[confirmar com o RH]".
- Documentos com dados pessoais (ata com nomes, termo de EPI) ficam em
  `materiais/documentos/` só como modelo em branco; o preenchido fica fora
  do repositório (ou em `pessoas/`, não versionada).
- Ofício e carta externa: assinatura da diretoria ou gerência (VI).
