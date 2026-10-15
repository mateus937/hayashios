---
name: placa
description: >
  Cria placas e sinalização no padrão Hayashi, prontas pra impressão (PDF vetorial A4/A3/A2):
  identificação de setor e sala, avisos (proibido fumar, uso obrigatório de EPI, visitantes
  só com autorização, velocidade, área restrita), placas de segurança nas cores da NR-26
  (proibição, atenção, obrigação, emergência), orientações de procedimento, Linha Ética com QR
  code, frota e portaria. Use quando o usuário pedir "placa", "sinalização", "aviso pra parede",
  "placa de EPI", "placa de proibido", "identificação da sala", "/placa".
argument-hint: "[identificacao | aviso | seguranca | obrigatorio | emergencia | procedimento | linha-etica]"
---

# /placa — Sinalização

Placa boa se lê de longe, diz uma coisa só e tem a cara da Hayashi. As
regras de conduta nas placas saem do guia (ex.: "Fumar em ambientes
fechados ou cobertos" não é aceito, IX; visitas só com autorização do
gerente da unidade, IV; EPI obrigatório, VII e Manual 6.3).

## Dependências

- `identidade/design-guide.md`, `identidade/hayashi.css` (classes
  `.hay-placa`, `.seguranca`, `.atencao`, `.obrigatorio`, `.emergencia`),
  `identidade/templates/placa-a4.html`, `placa-a3-paisagem.html`, `identidade/logo.png`
- `_memoria/cultura.md`, `_memoria/politicas.md` (texto da regra, com a
  seção, quando a placa for de conduta)
- `node scripts/pdf.js <html> <pdf> --formato A4|A3|A2 [--paisagem]`,
  `node scripts/render.js` (PNG de conferência),
  `node scripts/qrcode.js "<url>" <png> --cor 007581` (Linha Ética, vídeos, formulários)
- Saída: `materiais/placas/<YYYY-MM-DD>-<slug>/`

## Tipos e cores

| Tipo | Classe | Cor dominante | Exemplos |
|---|---|---|---|
| identificacao | `.hay-placa` | petróleo + branco | Setor, sala, almoxarifado, refeitório, vestiário, portaria |
| aviso / conduta | `.hay-placa` | petróleo | "Visitantes: acesso somente com autorização do gerente da unidade", "Mantenha o ambiente limpo" |
| seguranca (proibição) | `.seguranca` | vermelho (NR-26) | "Proibido fumar", "Proibido entrada de pessoas não autorizadas", "Não opere sem treinamento" |
| atencao (alerta) | `.atencao` | amarelo + preto | "Atenção: tráfego de máquinas", "Piso escorregadio", "Produto químico" |
| obrigatorio | `.obrigatorio` | azul | "Uso obrigatório de capacete / óculos / protetor auricular", "Lave as mãos" |
| emergencia | `.emergencia` | verde | "Saída de emergência", "Ponto de encontro", "Chuveiro de emergência" |
| procedimento | `.hay-placa` | petróleo | passo a passo curto (5S, descarte de embalagem, bloqueio de máquina) |
| linha-etica | `.hay-placa` | petróleo | "Sua voz importa" + QR + hayashi.onsearch.com.br |

Sinalização de segurança segue as cores e o sentido da NR-26 (e os
pictogramas da ISO 7010 quando houver). A identidade Hayashi entra na
faixa superior (logo) e no rodapé; nunca substitui a cor de segurança.

## Workflow

### Passo 1 — Briefing (perguntar só o que faltar)

1. O que a placa diz (uma mensagem por placa; se vierem três, são três placas)
2. Tipo (tabela acima) e onde fica (interno/externo, distância de leitura,
   altura)
3. Tamanho: A4 (sala, mural), A3 (corredor, galpão), A2 (pátio, entrada)
   ou medida livre em mm
4. Unidade/setor pra constar no topo
5. Material: adesivo, PVC, ACM, lona (só orienta; não é obrigatório)

### Passo 2 — Texto

- Título em caixa alta, curto (até 4 palavras): "USO OBRIGATÓRIO DE EPI"
- Linha de apoio (opcional): a regra como está no guia/manual, com a
  fonte pequena: "Guia da Cultura Hayashi, arquétipo VII · Manual, 6.3"
- Pictograma: descrever qual (ISO 7010 quando existir, ex.: M014
  capacete, P002 proibido fumar); o OS desenha um placeholder vetorial
  simples em SVG (círculo/triângulo/quadrado na cor do tipo) e indica
  onde baixar o oficial se a Segurança exigir o pictograma normatizado
- Rodapé: unidade, setor, código da placa (ex.: CRI-SEG-012), data

**CHECKPOINT:** mostrar texto, tipo e tamanho. Aprovar.

### Passo 3 — HTML e PDF

1. Pasta `materiais/placas/<YYYY-MM-DD>-<slug>/`; copiar o template
   (`placa-a4.html` ou `placa-a3-paisagem.html`) pra `placa.html`; ajustar
   caminhos (`../../../identidade/hayashi.css`, `../../../identidade/logo.png`).
2. Classe do tipo no `.hay-placa`; `@page { size: A4|A3|A2 [landscape]; margin: 0 }`.
3. Tamanho de letra: regra prática, altura da letra do título ≈ 1 cm
   pra cada 1 a 1,5 m de distância de leitura. A4 pra ler a 3 m: título
   ≥ 30 mm (≈ 85 pt). Fontes grandes, poucas palavras.
4. Margem de segurança de 10 mm sem texto (corte da gráfica).
5. `node scripts/pdf.js materiais/placas/<pasta>/placa.html materiais/placas/<pasta>/placa.pdf --formato A3 --paisagem`
   e PNG de conferência com `render.js` (largura/altura em px proporcionais).
6. Linha Ética: `node scripts/qrcode.js "https://hayashi.onsearch.com.br" materiais/placas/<pasta>/qr.png --cor 007581`
   e inserir o `qr.png` na placa.

Olhar o PNG. Legível de longe? Uma mensagem? Cores certas? Corrigir.

### Passo 4 — Entregar

```
✓ Placa: <título> — <tipo> — <tamanho>
materiais/placas/<pasta>/  (placa.html · placa.pdf · placa.png)
Impressão: PDF vetorial, <tamanho>, cores CMYK aproximadas (petróleo ≈ C100 M35 Y40 K10), material sugerido <...>
Validar com a Segurança do Trabalho antes de instalar (placas de segurança).
```

Registrar em `saidas/registro/<slug-usuario>.md`.

## Regras

- Uma mensagem por placa.
- Cor de segurança nunca é trocada pela cor da marca.
- Texto de regra vem do guia/manual com a seção; sem inventar regra
  ("multa", "advertência") que não está lá.
- Placas de segurança: validação da Segurança do Trabalho antes de
  instalar; o OS entrega o arquivo, não decide a sinalização obrigatória.
- Pictograma normatizado (ISO 7010) quando a Segurança exigir: usar o
  oficial, não o placeholder.
