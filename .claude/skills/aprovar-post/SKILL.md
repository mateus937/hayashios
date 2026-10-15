---
name: aprovar-post
description: >
  Publica nas redes públicas da Hayashi (Instagram + Facebook) um post já criado pelo /carrossel
  e aprovado pela diretoria, via scripts/postar-instagram.js e postar-facebook.js. Use SOMENTE
  quando o usuário digitar /aprovar-post ou disser "a diretoria aprovou, pode publicar o post X".
disable-model-invocation: true
---

# /aprovar-post — Publicar com aprovação

Representação e divulgação são da diretoria (arquétipo VI). Sem aprovação
registrada, não publica.

## Pré-requisitos (`docs/integracoes.md`)

- `.env` com `META_PAGE_ACCESS_TOKEN`, `META_PAGE_ID`, `META_IG_USER_ID`
- Hospedagem das imagens: `IMGBB_API_KEY` ou `SITE_URL`
- Contas da Hayashi administradas pela Comunicação

## Workflow

1. Localizar `comunicacao/redes/*-<slug>/`; ler `meta.md`. Exigir
   `aprovado_por:` preenchido (nome e cargo de quem aprovou na diretoria)
   e data. Vazio → parar: "Registre quem aprovou em meta.md".
2. Validar `instagram/slide-*.png` (1-10) e `legenda.md`; `publicacoes.jsonl`
   já tem registro → avisar e perguntar se republica.
3. `node scripts/postar-instagram.js <pasta> --simular` e o do Facebook.
   Pendência → parar e orientar.
4. Mostrar título, nº de slides, 200 letras da legenda, redes, quem
   aprovou. **"Confirma a publicação? (sim/não)"**
5. `node scripts/postar-instagram.js <pasta>` → falhou, parar.
6. `node scripts/postar-facebook.js <pasta>`.
7. `meta.md`: `status: publicado`, `publicado_em`, links. Registro.

```
✓ Publicado: <tema> · Instagram: <link> · Facebook: <link>
Aprovado por: <nome, cargo> em <data>
```

## Regras

- Nunca pular a confirmação. Nunca ler `.env`.
- Falha com código 190 → token expirado (`docs/integracoes.md`).
