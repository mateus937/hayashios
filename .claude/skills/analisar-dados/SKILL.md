---
name: analisar-dados
description: >
  Analisa um arquivo de dados (CSV, Excel, PDF, TXT, print) deixado em dados/ e gera resumo
  executivo em prosa na linguagem da Hayashi: o que está bom, o que preocupa, comparações e 3
  recomendações. Serve pra planilhas de RH (faltas, treinamentos, rotatividade), segurança
  (incidentes, EPI), produção, custos. Use quando o usuário disser "analisa essa planilha",
  "o que mostram esses dados", "resume esse relatório", ou arrastar um arquivo.
argument-hint: "[arquivo em dados/]"
---

# /analisar-dados — Resumo executivo

## Dependências

- `_memoria/empresa.md` (o que os dados representam), `_memoria/estrategia.md`
  (prioridades), `_memoria/preferencias.md`
- Entrada: `dados/` (não versionada)
- Saída: `saidas/analises/<YYYY-MM-DD>-<nome>.md` (+ HTML/PDF via
  `/documento` se for pra circular)

## Workflow

1. Sem argumento: listar `dados/` (recentes primeiro) e perguntar qual.
   Contexto não óbvio → "O que é esse arquivo e qual pergunta quer
   responder?"
2. Ler: CSV/TXT direto (números pt-BR → normalizar); XLSX pela skill
   `xlsx` se existir, senão pedir CSV; PDF pelo Read ou skill `pdf`; print
   → transcrever e marcar "lido de imagem". Dados incompletos → dizer antes.
3. Analisar: o que está bom, o que preocupa (abaixo de meta, tendência,
   anomalia), comparações (período, unidade, área), insights não óbvios.
   Segurança: acidente é dito como acidente, sem suavizar.
4. Escrever:

```markdown
# Análise — <arquivo>
*<data>* · fonte: dados/<arquivo> (<período>)
## O que esses dados mostram
## O que está funcionando
## O que merece atenção
## 3 recomendações
## Números-chave (tabela)
```

Registrar em `saidas/registro/<slug>.md`.

## Regras

- Prosa legível sem abrir o arquivo; nunca inventar; jargão traduzido.
- Dados de pessoas (nomes, matrículas, atestados) não vão pro resumo:
  agregar por área/unidade. Se o arquivo for nominal, a análise fica em
  `pessoas/` em vez de `saidas/`.
- Relatório pra fora da empresa → diretoria.
