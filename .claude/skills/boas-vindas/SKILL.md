---
name: boas-vindas
description: >
  Cria a arte "Reforço no time!" de boas-vindas a colaboradores novos, no padrão oficial da
  Hayashi (cabeçalho verde-petróleo com folhas, logo, foto em círculo, nome e setor, onda no
  rodapé), em PNG pra WhatsApp/mural/TV e PDF pra impressão, mais a mensagem de boas-vindas pro
  grupo. Use quando o usuário disser "colaborador novo", "reforço no time", "boas-vindas",
  "entrou gente nova", "chegou um novo colega", "/boas-vindas". Kit completo (roteiro, slides,
  checklist, confirmação) é /integracao.
argument-hint: "[nome - setor] [nome - setor] [unidade]"
---

# /boas-vindas — "Reforço no time!"

A arte oficial de chegada de colaborador. Sempre que alguém entra, uma
arte nesse padrão vai pros grupos e pro mural. Texto oficial, identidade
oficial, foto em círculo.

## Dependências

- `identidade/templates/reforco-no-time.html`, `identidade/hayashi.css`,
  `identidade/logo.png`, `identidade/logo-branco.png`,
  `identidade/elementos/` (folha de canto e ramo em branco)
- `_memoria/empresa.md` (unidade, setores), `_memoria/preferencias.md`
- `node scripts/render.js` e `node scripts/pdf.js`
- Saída: `materiais/boas-vindas/<YYYY-MM-DD>-<slug>/`

## Texto oficial (não reescrever; só ajustar o número)

- **Título:** REFORÇO NO TIME!
- **Chamada (plural):** "Estamos felizes em comunicar que receberemos novos
  colegas para fazer história no Time Hayashi."
- **Chamada (uma pessoa):** "Estamos felizes em comunicar que receberemos
  um novo colega para fazer história no Time Hayashi." (ou "uma nova
  colega")
- **Apoio (plural):** "Juntos, podemos fazer a diferença na vida e na
  carreira deles. Contamos com todos vocês para o acolhimento, suporte e
  colaboração."
- **Apoio (uma pessoa):** "...na vida e na carreira dele/dela..."
- Por pessoa: **primeiro nome** e **Setor: <setor>**

## Workflow

### Passo 1 — Coletar (uma mensagem)

1. Primeiro nome de cada pessoa e o setor (como a empresa chama: Vigilância
   de Campo, Colheita, Oficina, Administrativo...)
2. Unidade (Cristalina-GO, Chapada Diamantina-BA) e data de entrada
3. Fotos: caminho dos arquivos (em `dados/` ou onde estiverem) ou "sem
   foto". Foto de rosto, de frente, fundo neutro; o template recorta em
   círculo. Lembrar: a pessoa precisa concordar com o uso da foto
   (padrão da integração; se não houver concordância, usar a silhueta).
4. Onde vai circular: WhatsApp dos grupos, mural, TV, e-mail

Mais de 4 pessoas → dividir em duas artes (por setor ou por unidade).

### Passo 2 — Montar

1. Pasta `materiais/boas-vindas/<YYYY-MM-DD>-<slug>/` (slug: nomes ou
   "turma-<unidade>"); subpasta `fotos/` com as fotos copiadas e renomeadas
   (`<nome>.jpg`).
2. Copiar `identidade/templates/reforco-no-time.html` pra `reforco.html`;
   trocar `../hayashi.css`, `../logo.png`, `../logo-branco.png` e
   `../elementos/` por `../../../identidade/...`.
3. Preencher: chamada e apoio no singular ou plural; um bloco `.pessoa` por
   pessoa; com foto, `<img class="foto" src="fotos/<nome>.jpg">`; sem foto,
   manter o placeholder. Classe da lista: 1 pessoa → `pessoas um`; 2-3 →
   `pessoas`; 4 → `pessoas quatro`.
4. Render:
   - PNG (WhatsApp/mural): `node scripts/render.js materiais/boas-vindas/<pasta>/reforco.html materiais/boas-vindas/<pasta> --largura 794 --altura 1123 --prefixo reforco --escala 2`
   - PDF (impressão A4): `node scripts/pdf.js materiais/boas-vindas/<pasta>/reforco.html materiais/boas-vindas/<pasta>/reforco.pdf --formato A4`
5. Olhar o PNG (Read): rosto centralizado no círculo (ajustar
   `object-position` se cortar a testa), nomes certos, setor certo, texto
   no singular/plural correto.

**CHECKPOINT:** mostrar o PNG; ajustar; só então a mensagem.

### Passo 3 — Mensagem pro grupo (`mensagem.md`)

3-5 linhas no tom Hayashi, pra ir junto com a imagem:

> *Reforço no time!* 
> Hoje recebemos <Nome> (<setor>) e <Nome> (<setor>) na Unidade <unidade>.
> Contamos com todos vocês para o acolhimento, suporte e colaboração.
> Sejam bem-vindos ao Time Hayashi!

Assinatura: RH ou gerência da unidade (quem publica).

### Passo 4 — Entregar e registrar

```
✓ Reforço no time: <nomes> — <unidade> — <data>
materiais/boas-vindas/<pasta>/  (reforco-01.png · reforco.pdf · mensagem.md · fotos/)
Pra circular: <canais>. Quem publica: <RH | gerente>.
Próximo passo: /integracao (kit completo) quando for a integração cultural.
```

Linha em `saidas/registro/<slug-usuario>.md` (sem nome das pessoas:
"arte de boas-vindas, 2 pessoas, Cristalina").

## Regras

- Texto oficial literal; só muda singular/plural.
- Primeiro nome e setor; nada de cargo completo, matrícula ou dados
  pessoais.
- Foto só com concordância da pessoa; sem foto, silhueta (nunca foto de
  banco ou gerada por IA).
- Identidade: logo inteiro, petróleo, Roboto Condensed no título, Lato no
  corpo; não mudar as cores da onda e das folhas.
- Interno. Se for pra rede pública da Hayashi, passa pela diretoria (VI)
  e pelo `/carrossel`.
