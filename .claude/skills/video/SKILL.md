---
name: video
description: >
  Roteiriza e edita vídeos no padrão Hayashi com o ffmpeg (scripts/video.js): corte, junção,
  formato (reels/story 9:16, feed, TV 16:9, WhatsApp leve), vinheta de abertura e encerramento
  com a identidade, lower third (nome e cargo), marca d'água, legendas (transcrição automática
  + gravação no vídeo), trilha de fundo, thumbnail. Pra treinamento, DDS, institucional,
  depoimento, aviso. Use quando o usuário pedir "editar vídeo", "cortar o vídeo", "colocar
  legenda", "vinheta", "vídeo pro WhatsApp", "transformar em reels", "roteiro de vídeo",
  "/video".
argument-hint: "[roteiro | editar | legendar | formato | vinheta]"
---

# /video — Roteiro e edição

Vídeo curto, com a cara da Hayashi, legível sem som (legenda) e no
formato certo pro canal. A edição é feita por `scripts/video.js` (ffmpeg);
as peças visuais (vinheta, lower third, capa) saem dos templates HTML.

## Dependências

- ffmpeg completo instalado (`node scripts/verificar-ambiente.js` confere;
  Windows: `winget install Gyan.FFmpeg`)
- `scripts/video.js` (comandos no cabeçalho do arquivo), `scripts/transcrever.js`
  (legendas automáticas; precisa de `OPENAI_API_KEY`), `scripts/render.js --transparente`
- `identidade/templates/vinheta-video.html`, `lower-third.html`, `identidade/hayashi.css`,
  `identidade/logo.png`, `identidade/design-guide.md`
- `_memoria/preferencias.md`, `_memoria/cultura.md` (texto literal quando o vídeo for de cultura)
- Saída: `materiais/videos/<YYYY-MM-DD>-<slug>/` com `brutos/` (originais, não
  versionados), `legendas/`, `pecas/` (PNG de vinheta/lower third), `saida/`

## Modos

### roteiro

Pra treinamento, DDS, institucional, depoimento, aviso. Entrega
`roteiro.md`: objetivo, público, canal e formato, duração alvo, tabela
cena a cena (tempo, imagem/ação, fala ou texto na tela, legenda/lower
third), lista de captação (o que gravar, onde, com quem, autorização de
imagem), texto da vinheta. Regras de gravação em 1 página (celular na
horizontal pra TV / vertical pra WhatsApp e reels, luz de frente, áudio
perto, 10-20 s por plano, EPI em cena no campo).

### editar (passo a passo típico)

1. **Organizar:** copiar os originais pra `brutos/`; `node scripts/video.js info brutos/<arquivo>`.
2. **Cortar / juntar:** `cortar` com início e fim; `juntar` na ordem do roteiro.
3. **Vinheta:** preencher `vinheta-video.html` (título, unidade, data) na
   pasta `pecas/`, renderizar `abertura-01.png` e `encerramento-01.png`
   (1920x1080 ou 1080x1920 conforme o formato) com `render.js`, aplicar com
   `vinheta --abertura --encerramento --duracao 3`.
4. **Lower third:** preencher `lower-third.html` (nome, cargo, unidade),
   `render.js ... --transparente`, aplicar com `sobrepor --inicio --fim`.
5. **Legendas:** `transcrever.js brutos/<video> legendas/legendas.srt`;
   **revisar nomes e termos** (o usuário confere); gravar com `legenda --srt`.
   Sem chave de API: pedir o texto e montar o SRT à mão com os tempos.
6. **Marca d'água:** `marca` (logo no canto, padrão inferior direito).
7. **Trilha:** `audio --musica --volume 0.2` só com música licenciada ou
   própria; sem música de terceiros sem licença.
8. **Formato final:** `formato --preset reels|story|feed|youtube|tv|whatsapp`
   (WhatsApp sai leve, ~15 MB). Vídeo horizontal em vertical: `--modo desfocar`.
9. **Thumbnail / capa:** `thumbnail` ou capa pelo template.

Checkpoints: mostrar o roteiro antes de editar; mostrar `thumbnail` do
resultado e a duração antes de dar por pronto. O usuário assiste no
computador dele (o OS não reproduz vídeo).

### legendar

Só os passos 5 (e 8 se precisar). Estilo das legendas: Lato branca sobre
faixa verde-petróleo translúcida, centralizada embaixo (já configurado no
script).

### formato / vinheta

Só o passo correspondente, num vídeo já pronto.

## Entregar

```
✓ Vídeo: <título> — <duração> — <formato>
materiais/videos/<pasta>/saida/<slug>-<formato>.mp4  (+ thumbnail.png, legendas.srt, roteiro.md)
Pra onde vai: <canal>. [Externo: aprovação da diretoria]
```

Registrar em `saidas/registro/<slug-usuario>.md`.

## Regras

- Pessoas em vídeo: autorização de uso de imagem. Colaborador em cena no
  campo com EPI (vídeo sem EPI não sai; VII e Manual 6.3).
- Vídeo pra fora da empresa: aprovação da diretoria (VI).
- Legenda sempre que houver fala (acessibilidade e WhatsApp sem som).
- Logo inteiro, sem distorção; cores da identidade na vinheta e no lower third.
- Música: só licenciada/própria. Nada inventado em texto na tela (datas,
  números: fonte).
- Arquivos de vídeo não vão pro repositório (`.gitignore`); roteiro,
  legendas e peças vão.
