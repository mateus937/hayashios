# Identidade visual Hayashi

> Como a marca aparece em tudo que o HayashiOS gera. Implementada em
> `identidade/hayashi.css` e nos templates de `identidade/templates/`.
> Fontes: logo oficial, Guia do Manifesto da Cultura (v1.7), Manual do
> Colaborador (v4), cartão de aniversariantes. Mudanças aqui são de
> Comunicação/diretoria e exigem atualizar o CSS.

---

## Marca

- **Símbolo:** brasão circular com folhas de bambu (kamon) em verde-petróleo;
  palavra HAYASHI em caixa alta, letras espaçadas, em cinza grafite (versão
  principal) ou branca (sobre petróleo).
- **Significado (Manual):** "Símbolo de solidez, construindo legados e
  servindo de inspiração para novos começos, renovando a cada dia."
- **Arquivos:** `identidade/logo.png` (512x512, colorido, fundo transparente) e
  `identidade/logo-branco.png` (versão pra fundo escuro: anel, folhas e palavra
  em branco, miolo vazado, como no verso do cartão oficial; gerada a partir do
  PNG colorido, substituir pela oficial quando a Comunicação enviar). A
  adicionar: `logo.svg` vetorial e `logo-simbolo.svg` (só o brasão).
- **Regras:** nunca distorcer, recortar, girar, aplicar sombra ou contorno,
  nem mudar as cores (só petróleo, branco ou grafite). Área de respiro:
  metade da altura do símbolo em volta. Tamanho mínimo: 24 mm impresso /
  120 px em tela com a palavra; 12 mm / 64 px só o símbolo. Sobre foto,
  sempre com overlay petróleo.

---

## Cores

| Nome | Hex | RGB | CMYK aprox. | Uso |
|---|---|---|---|---|
| **Verde-petróleo Hayashi** | `#007581` | 0 117 129 | 100 35 40 10 | principal: logo, fundos, títulos, barras |
| Petróleo escuro | `#005A64` | 0 90 100 | | sombras de cor, contraste |
| Petróleo claro | `#2A9AA5` | 42 154 165 | | gráficos, detalhes |
| Água | `#D7E8EA` | 215 232 234 | | ilustrações de linha (balões, folhas), fundos suaves |
| Névoa | `#EEF4F5` | 238 244 245 | | fundo alternativo |
| Cinza claro | `#E6E9EA` | 230 233 234 | | cards claros, linhas alternadas de tabela |
| Grafite | `#4A4A4D` | 74 74 77 | | palavra HAYASHI, textos de apoio |
| Texto | `#2B2B2B` | 43 43 43 | | texto corrido |
| Verde de apoio | `#5DB75D` | 93 183 93 | | só em ícones de linha (padrão do manual) |
| Branco | `#FFFFFF` | | | |

- **Fundo principal:** branco (peças de leitura) ou petróleo (capas, citações, vinhetas)
- **Cor de destaque / CTA:** verde-petróleo
- **Texto principal:** texto `#2B2B2B` sobre claro; branco sobre petróleo
- **Fundo alternativo / cards:** cinza claro, névoa, água
- **Cores proibidas:** qualquer segunda cor de marca (laranja, roxo, vermelho
  fora de sinalização), gradientes multicoloridos, neon
- **Segurança (NR-26), só em placas:** vermelho `#C8102E` (proibição,
  combate a incêndio), amarelo `#F2B705` (atenção), azul `#0057B8`
  (obrigação), verde `#009639` (emergência, segurança)

Proporção: petróleo e branco dominam; água e névoa dão respiro; verde de
apoio só em ícones.

---

## Tipografia

- **Títulos e destaques:** Roboto Condensed, pesos 300 (leve) e 700 (bold),
  caixa alta. Composição marcante do guia: primeira parte leve + palavra-
  chave bold ("GUIA DO MANIFESTO DA / **CULTURA**").
- **Títulos de documento:** Roboto 700 em petróleo (padrão do Manual).
- **Corpo, subtítulos, tabelas, botões:** Lato 400 / 700.
- **Peso do título:** bold; leve só na primeira parte de composições.
- **Fallback:** Roboto, Arial. As fontes vêm do Google Fonts (no CSS); pra
  gravar legendas em vídeo, instalar Lato no sistema.
- **Tamanhos de referência:** peça de 1080 px → título 84-120 px, corpo
  24-28 px · A4 → título 22-28 pt, corpo 11 pt · placa A4 lida a 3 m →
  título ≥ 85 pt · slide 1920x1080 → título 96 px, corpo 34 px.

---

## Estilo geral

Limpo, institucional, confiável. Muito branco e petróleo, poucas palavras,
fotos reais da lavoura (céu com nuvens, campo de batata em flor, batatas em
tigela de madeira, equipe em campo com EPI). Transmite solidez e
simplicidade; não parece agência nem rede social.

---

## Elementos-chave

- **Cards** com cantos muito arredondados (40-48 px; em A4, 8-10 mm), às
  vezes assimétricos (um canto reto), em petróleo com texto branco ou cinza
  claro com texto escuro
- **Régua curta** petróleo sob títulos de seção
- **Aspas grandes** em citações (propósito, visão, falas da liderança)
- **Círculo com chevron** ( › ) antes de ACEITAMOS / NÃO ACEITAMOS
- **Barra superior** petróleo com logo branco nas peças digitais;
  **cabeçalho de documento** com número da página em caixa petróleo +
  "HAYASHI | Título" + logo pequeno à direita
- **Ilustrações de linha fina** em água ou branco (balões, folhas, presente)
  nos cartões
- **Folhas brancas** (cheias e em contorno) saindo das bordas e **onda
  petróleo em dois tons** no rodapé, na arte "Reforço no time!" (boas-vindas)
- **Ícones de linha** (traço 2 px) em petróleo; no manual, preto com verde de apoio
- **Tabelas** com linhas alternadas em cinza claro
- **Pílulas** para tags e botões
- Bordas: finas (1 px) ou nenhuma · Border-radius dos cards: 40-48 px ·
  Sombras: nenhuma ou muito suave

---

## Fotos

Reais, da própria Hayashi, catalogadas em `identidade/fotos.md`. Com
overlay petróleo quando há texto por cima. Pessoas sempre com EPI em cena
de campo e com autorização de uso de imagem. Sem banco de imagem genérico
quando houver foto própria; nunca foto gerada por IA representando a
empresa, as pessoas ou o produto.

---

## O que NUNCA fazer

- Segunda cor de marca, gradiente arco-íris, sombra pesada, efeito 3D
- Fonte fora de Roboto Condensed / Roboto / Lato
- Logo colorido, distorcido, com contorno, ou sobre foto sem overlay
- Emoji como ícone; clip-art
- Texto demais numa placa ou tela
- Placa de segurança com a cor de marca no lugar da cor NR-26

---

## Formatos padrão (classes do hayashi.css)

post 1080x1350 · quadrado 1080x1080 · story 1080x1920 · slide 1920x1080 ·
a4 · a4-paisagem · a3 · a3-paisagem · cartao 1400x840 · cracha 54x86 mm ·
certificado A4 paisagem · vinheta e lower third 1920x1080 · reforço no time (A4)

---

## Logo

- **Arquivo:** identidade/logo.png
- **Versão pra fundo escuro:** identidade/logo-branco.png *(a adicionar; até lá, classe `.branco`)*
- **Onde usar:** barra superior das peças, rodapé, capa e encerramento de
  slides e vídeos, cabeçalho de documentos, topo das placas
- **Tamanho sugerido:** 56 px na barra; 120-260 px em capas; 14 mm em documentos; 18 mm no topo de placas

---

## Observações adicionais

Site e redes sociais: confirmar os endereços oficiais e a paleta usada
neles pra manter coerência.
