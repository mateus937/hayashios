---
name: reconhecimento
description: >
  Cria reconhecimento alinhado ao arquétipo X (Reconhecimento): mensagem pública pro time, cartão
  digital, post interno ou certificado por resultado, comportamento alinhado à cultura, tempo de
  casa, e os cartões de aniversariantes do mês (modelo oficial). Confere se o reconhecimento é
  merecido (resultado dentro do esperado) antes de criar. Use quando o usuário disser
  "reconhecer", "parabenizar o time", "aniversariantes do mês", "destaque do mês", "tempo de
  casa", "certificado de participação", "/reconhecimento".
argument-hint: "[resultado | comportamento | aniversariantes | tempo-de-casa | certificado]"
---

# /reconhecimento — Celebrar o que merece

Arquétipo X: aceitamos "valorizar a qualidade do trabalho realizado, o
cumprimento dos prazos e os bons resultados alcançados" e "celebrar os bons
resultados e conquistas"; não aceitamos "valorizar e reconhecer em
situações de resultado inferior ao esperado" nem "deixar de reconhecer,
celebrar e compartilhar perante o time".

## Dependências

- `_memoria/cultura.md`, `_memoria/preferencias.md`, `_memoria/empresa.md`
- `/arte` (cartão, post, certificado), `identidade/templates/cartao.html`
- Saída: `materiais/reconhecimento/<YYYY-MM-DD>-<slug>/`

## Modos

(Boas-vindas a colaborador novo é `/boas-vindas`, arte "Reforço no time!".)

### resultado / comportamento

1. Perguntar (se faltar): quem (pessoa ou equipe; primeiro nome e área), o
   que foi alcançado (número, prazo, situação), qual valor ou arquétipo o
   comportamento demonstrou, quem vai assinar (líder, gerente, diretoria),
   onde vai circular (WhatsApp do time, mural, TV, e-mail, Instagram interno).
2. Checar o arquétipo X: o resultado está dentro ou acima do combinado? Se
   o usuário disser que ficou abaixo, orientar: reconhecer honestamente o
   comportamento (sem prêmio por resultado) ou fazer `/feedback` positivo
   individual. Não criar "destaque" pra resultado inferior.
3. Texto (tom Hayashi): específico (o quê, quando, impacto), curto, sem
   superlativo vazio, cita o valor demonstrado, assinado. Versões: mensagem
   pro grupo (3-5 linhas), texto do cartão (2 frases), legenda de post.
4. Peça visual via `/arte` (cartão 1400x840 ou post 1080x1350) com foto
   real (se autorizada) ou arte com logo.

### aniversariantes

Modelo oficial da Hayashi (cartão "Feliz Aniversário!"):

> **FELIZ ANIVERSÁRIO!**
> Queremos celebrar a pessoa especial que você é.
> Desejamos que esta nova etapa seja repleta de saúde, alegrias e
> realizações. Que cada momento seja uma oportunidade para florescer e
> colher os frutos de todo o seu esforço e dedicação.
> Que você continue a inspirar e **fazer a diferença**.

Verso: fundo verde-petróleo, logo branco centralizado, balões em linha.

1. O usuário cola a lista do mês (primeiro nome, dia, unidade/área). A
   lista não é salva no repositório (vem do RH).
2. Gerar: `aniversariantes-<YYYY-MM>.png` (lista do mês pra mural/TV, por
   unidade) e, se pedido, um cartão por pessoa (`cartao-<nome>.png`) com
   o texto oficial e o primeiro nome.
3. Mensagem pro grupo da unidade no dia (opcional).

### tempo-de-casa

Marcos (1, 5, 10, 15, 20... anos): mensagem + certificado A4 paisagem
(`/arte` certificado) assinado por gerente/diretoria. Pedir o ano de
admissão; não inventar.

### certificado

Participação em treinamento, SIPAT, integração: título, nome, carga
horária, data, assinaturas. `/arte` certificado.

## Entrega

```
✓ Reconhecimento: <quem> — <motivo>
materiais/reconhecimento/<pasta>/  (texto.md · cartao.png | post.png | certificado.pdf)
Pra circular: <canal>. Quem assina: <nome/cargo>.
```

Registrar em `saidas/registro/<slug-usuario>.md`.

## Regras

- Específico e verdadeiro. "Parabéns pelo ótimo trabalho" não é
  reconhecimento; "equipe de colheita fechou o talhão 12 dois dias antes
  do prazo, sem incidente" é.
- Resultado abaixo do esperado não ganha reconhecimento público (X).
- Primeiro nome + área; foto só com autorização; sem dados pessoais.
- Reconhecimento público é compartilhado perante o time (X): sugerir o
  canal em que o time todo vê.
- Nada é publicado ou enviado por aqui; o usuário escolhe o canal e manda.
