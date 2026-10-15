---
name: novo-projeto
description: >
  Cria a pasta de uma frente com começo, meio e fim (SIPAT, confraternização, campanha de
  segurança, programa 5S, implantação de nova unidade ou setor, evento com famílias, projeto de
  comunicação) com CLAUDE.md próprio, briefing e subpastas das entregas. Use quando o usuário
  disser "novo projeto", "nova campanha", "vamos organizar a SIPAT", "/novo-projeto".
---

# /novo-projeto — Frente com pasta própria

## Passo 1 — Entrevista (4 perguntas, uma mensagem)

1. Nome da frente
2. Objetivo em uma frase e data (ou período)
3. Unidade(s) e áreas envolvidas; quem lidera
4. Entregas previstas (comunicados, placas, vídeo DDS, apresentação,
   cartazes, certificados, formulários, cronograma)

## Passo 2 — Estrutura

`projetos/<YYYY-MM>-<slug>/` com:
- `CLAUDE.md` do projeto (abaixo)
- `briefing.md` (respostas + cronograma inicial + responsáveis por área, sem telefone)
- subpastas só das entregas citadas (`comunicados/`, `placas/`, `videos/`,
  `apresentacao/`, `artes/`)

As saídas das skills continuam nos caminhos padrão (`comunicacao/`,
`materiais/`); a pasta do projeto guarda briefing, cronograma, decisões e
links pros arquivos. Se o usuário preferir tudo dentro do projeto, as
skills aceitam a pasta como destino.

## Passo 3 — CLAUDE.md do projeto

```markdown
# <Nome da frente>

> Criado em <data>. Complementa as regras da raiz; em conflito, valem as daqui.

## Objetivo e prazo
...

## Unidades, áreas e quem lidera
...

## Entregas e onde ficam
- <entrega> → <caminho>

## Aprovações
- Segurança do Trabalho (placas, campanha de segurança) · RH (pessoas, cultura) · gerente da unidade (comunicados gerais) · diretoria (externo)

## Herda da raiz
Guia da Cultura, Manual, identidade e preferências vêm de `_memoria/` e `identidade/`. Não duplicar.

## Específico deste projeto
(regras que forem aparecendo)
```

## Passo 4 — Resumo e registro

```
Projeto criado: projetos/<pasta>/
✓ CLAUDE.md · briefing.md · subpastas: ...
Pra trabalhar nele: "no projeto <nome>, ..." ou abra o Claude dentro da pasta.
```

Registrar em `saidas/registro/<slug>.md`.

## Regras

- Não criar subpasta não pedida.
- Projeto que envolve pessoas (listas, inscrições) guarda isso em `pessoas/`,
  não na pasta do projeto.
- Evento com famílias: lembrar o arquétipo IV (visitas de familiares só
  com autorização do gerente da unidade) e a Segurança do Trabalho.
