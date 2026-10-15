# Catálogo de skills do Hayashi OS

O que **vem no sistema**, o que é **instalável** e o que **não existe**.
O `/mapear-rotinas` consulta aqui e confere com `Glob .claude/skills/*/SKILL.md`.

> Skills ficam em `.claude/skills/<nome>/SKILL.md` e valem pra todos depois
> do `/salvar`. O administrador revisa.

## Vem no Hayashi OS (23)

### Cultura e pessoas
| Skill | O que faz |
|---|---|
| `/cultura` | o que o Guia (v1.7) e o Manual (v4) dizem; resumos; quiz |
| `/decisao` | situação → arquétipo → orientação e quem envolver |
| `/feedback` | roteiro de feedback e avaliação de experiência referenciados no guia |
| `/integracao` | kit de integração cultural (roteiro, slides, checklist, quiz, confirmação, cartão) |
| `/reconhecimento` | reconhecimento (arquétipo X), aniversariantes, tempo de casa, certificados |
| `/comunicado` | comunicação interna por canal, com aprovação e assinatura |

### Materiais
| Skill | O que faz |
|---|---|
| `/arte` | cartaz, banner, tela, cartão, certificado, crachá, convite |
| `/placa` | sinalização (identificação, conduta, NR-26, Linha Ética) em PDF |
| `/apresentacao` | slides 16:9 em PNG/PDF (e .pptx se a skill pptx existir) |
| `/documento` | ata, POP, ofício, formulário, termo, relatório em A4 |
| `/video` | roteiro e edição (ffmpeg): corte, vinheta, lower third, legenda, formato |
| `/carrossel` | posts pras redes públicas (requer aprovação da diretoria) |
| `/calendario` | comunicação do mês |
| `/aprovar-post` | publicação nas redes com aprovação registrada |

### Produtividade e núcleo
| Skill | O que faz |
|---|---|
| `/analisar-dados` | resumo executivo de planilha/PDF |
| `/email-profissional` | e-mail interno/externo |
| `/instalar` `/abrir` `/salvar` `/atualizar` `/atualizar-sistema` `/novo-projeto` `/mapear-rotinas` | operação do sistema |

## Instalável (skills da Anthropic, via `/plugin`)

| Skill | Pra quê |
|---|---|
| `pptx` | `.pptx` editável a partir do `/apresentacao` |
| `docx` | `.docx` a partir do `/documento` |
| `xlsx` | ler/criar planilhas no `/analisar-dados` |
| `pdf` | extrair tabelas de PDF |

## Não existe (não prometer)

- Publicação automática no LinkedIn e em WhatsApp (o OS entrega o texto).
- Reprodução de vídeo dentro do Claude (o usuário assiste no computador).
- Qualquer decisão sobre pessoas (advertência, desligamento): é do RH e da liderança.

## Skills criadas pelas áreas

*(o `/mapear-rotinas` adiciona aqui: nome, área, o que faz, data)*

## Modelo pra skill nova

```markdown
---
name: nome-da-skill
description: >
  O que faz. Use quando o usuário disser "...", "...", ou /nome-da-skill.
---

# /nome-da-skill — Título

## Dependências
- `_memoria/...` · `identidade/...` · saída: `<caminho da tabela do CLAUDE.md>`

## Workflow
### Passo 1 — ...
**CHECKPOINT:** mostrar antes de salvar ou enviar.
### Passo N — Registrar em `saidas/registro/<slug>.md`

## Regras
- Citar o guia/manual literalmente quando tocar regra
- Nada enviado ou publicado sem confirmação
- Dados de pessoas em `pessoas/`
```
