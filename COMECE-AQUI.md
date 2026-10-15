# Comece aqui — HayashiOS

> Manual de uso pra quem tem acesso ao Claude Code na Hayashi.

## O que é

O HayashiOS é o Claude Code configurado com a memória da Hayashi: o Guia
do Manifesto da Cultura (v1.7), o Manual do Colaborador (v4), a história, a
identidade visual e um conjunto de skills (comandos) pra orientar decisões
pela cultura e produzir materiais no padrão da empresa: comunicados,
placas, cartazes, cartões, apresentações, documentos e vídeos.

## Como abrir

1. Abra a pasta do HayashiOS no computador (Explorer → botão direito num
   espaço vazio → "Abrir no Terminal"; ou no VS Code, terminal integrado).
2. Digite `claude`.
3. No primeiro acesso, digite `/instalar` (2 minutos: nome, área, unidade).
4. Em toda sessão, comece com `/abrir` e termine com `/salvar`.

## O que você vai usar

| Você quer… | Digite |
|---|---|
| Saber o que fazer numa situação (conflito, brinde, erro, visita, atraso…) | `/decisao` e descreva |
| Saber o que o guia ou o manual diz sobre algo | `/cultura <tema>` |
| Preparar um feedback ou a avaliação de experiência | `/feedback` |
| Montar a integração de um colaborador novo ou de uma turma | `/integracao` |
| Reconhecer alguém, aniversariantes do mês, certificado | `/reconhecimento` |
| Escrever aviso, comunicado, campanha, mensagem pro grupo | `/comunicado` |
| Cartaz, cartão, tela pra TV, banner, crachá, convite | `/arte` |
| Placa de setor, aviso, segurança (EPI, proibido fumar), Linha Ética | `/placa` |
| Apresentação (slides) | `/apresentacao` |
| Documento oficial (ata, POP, ofício, formulário, termo) | `/documento` |
| Roteiro ou edição de vídeo (DDS, treinamento, institucional) | `/video` |
| Planejar a comunicação do mês | `/calendario` |
| Post pras redes públicas (com aprovação da diretoria) | `/carrossel` |
| Analisar uma planilha | `/analisar-dados` |
| E-mail | `/email-profissional` |
| Organizar uma frente (SIPAT, evento, campanha) | `/novo-projeto` |
| Transformar uma rotina sua em comando | `/mapear-rotinas` |

Também dá pra falar normalmente: "um fornecedor me mandou um presente, o
que faço?", "faz uma placa de uso obrigatório de capacete pra oficina",
"escreve o aviso do novo horário do ônibus". O Claude escolhe a skill.

## Regras de ouro

- **O guia é a fonte.** Toda orientação cita o arquétipo e o item. O que o
  guia e o manual não dizem, o sistema não inventa: ele indica quem responde.
- **Situação grave** (assédio, agressão, fraude, risco à segurança): o
  sistema orienta a falar agora com o líder/gerente ou usar a Linha Ética
  (hayashi.onsearch.com.br, anônima). Ele não investiga nem julga.
- **Nada sai da empresa sem a diretoria.** Material externo vem marcado
  "requer aprovação".
- **Nada é publicado ou enviado sem você confirmar.**
- **Dados de pessoas** (feedback, listas, decisões) ficam na pasta
  `pessoas/`, só no seu computador.
- **Identidade visual** sempre: logo inteiro, verde-petróleo, Roboto
  Condensed e Lato, fotos reais.

## Onde ficam as coisas

- `_memoria/` — a empresa, o guia, o manual, as preferências (não edite o
  guia e o manual: são os documentos oficiais)
- `identidade/` — cores, fontes, logo, templates, fotos
- `comunicacao/` — comunicados, calendário, posts
- `materiais/` — artes, placas, apresentações, documentos, vídeos, integração, reconhecimento
- `pessoas/` — só no seu computador
- `saidas/` — análises, e-mails, registro do que foi feito
- `dados/` — arquivos que você quer analisar (não vai pro repositório)

## Quando der erro

1. Leia a mensagem: quase sempre diz o que falta.
2. No terminal: `node scripts/verificar-ambiente.js` e mande o resultado
   pro administrador do OS.
3. Fechou sem querer? `claude --continue` volta de onde parou.

## Administrador do HayashiOS

*(nome e contato: preencher)* — `docs/guia-administrador.md` tem como
manter o sistema, cadastrar pessoas e atualizar o guia quando sair versão
nova.
