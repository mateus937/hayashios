---
name: email-profissional
description: >
  Rascunha e-mails internos (área, liderança, RH) e externos (fornecedor, parceiro, órgão,
  cliente) no tom da Hayashi, com duas versões de tom em assunto delicado. E-mail externo em nome
  da empresa é assinado por diretoria ou gerência. Use quando o usuário disser "escreve um
  e-mail", "como respondo esse e-mail", "e-mail pro fornecedor", "e-mail pra equipe".
---

# /email-profissional — E-mail no tom Hayashi

## Dependências

- `_memoria/preferencias.md`, `_memoria/empresa.md`, `_memoria/usuario.md`
  (assinatura: nome, cargo, área, unidade)
- `_memoria/cultura.md` quando o assunto tocar conduta (ex.: recusar
  brinde de fornecedor, arquétipo VI; responder cliente em divergência, V)
- Saída (quando pedido): `saidas/emails/<YYYY-MM-DD>-<assunto>.md`

## Workflow

1. Contexto (se faltar): pra quem e qual a relação; objetivo (informar,
   pedir, responder, recusar, cobrar, agradecer); o que precisa constar ou
   evitar.
2. Escrever: assunto específico; objetivo na abertura; uma ação por vez;
   fecho sem redundância; assinatura de `usuario.md`.
   Externo em nome da empresa (posicionamento, dados, compromisso) →
   assinatura da diretoria ou gerência e marcação "requer aprovação" (VI);
   o usuário pode enviar como rascunho pra quem assina.
3. Assunto delicado (recusa, cobrança, reclamação): versão A direta e B
   mais suave.
4. Salvar se pedido; registrar. Envio só com MCP de e-mail conectado e
   confirmação explícita do destinatário e do texto; senão, o usuário
   copia.

## Regras

- Sem corporativês vazio; português do Brasil.
- Recusa de brinde ou favor: cordial, cita a política da empresa, sem
  constranger o fornecedor.
- Resposta a cliente em situação divergente: respeitosa, foco na solução (V).
- Dados pessoais de terceiros não vão pra memória.
