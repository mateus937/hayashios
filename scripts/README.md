# scripts/ — utilitários do Hayashi OS

Scripts Node.js que as skills chamam pra fazer o que o texto sozinho não
faz: renderizar HTML em imagem e PDF, editar vídeo, transcrever, gerar QR.
Vêm prontos; ninguém precisa criar script.

| Script | O que faz | Quem usa |
|---|---|---|
| `verificar-ambiente.js` | confere Node, Git, Playwright, ffmpeg, fonte Lato, `.env`, memória | `/instalar`, suporte |
| `render.js` | HTML → PNG por `.hay-page` (qualquer tamanho; `--transparente` pra sobreposição) | `/arte`, `/placa`, `/apresentacao`, `/carrossel`, `/video` |
| `pdf.js` | HTML → PDF (A4, A3, A2, paisagem, tamanho do `@page`) | `/placa`, `/documento`, `/apresentacao`, `/arte` |
| `video.js` | edição com ffmpeg: info, cortar, juntar, formato, vinheta, sobrepor, marca, legenda, audio, extrair-audio, thumbnail, converter | `/video` |
| `transcrever.js` | áudio/vídeo → legendas SRT/VTT/TXT (OpenAI whisper-1) | `/video` |
| `qrcode.js` | texto/URL → QR em PNG (cor petróleo) | `/placa`, `/arte` |
| `screenshot.js` | página web → PNG (celular/desktop) | referência de sites |
| `checar-url.js` | espera uma URL responder 200 | `/aprovar-post` |
| `gerar-imagem.js` | imagem por IA (OpenAI/Gemini); não usar pra representar a Hayashi | fundos abstratos, se tanto |
| `postar-instagram.js`, `postar-facebook.js` | publicação via Graph API (com aprovação da diretoria) | `/aprovar-post` |
| `_lib.js` | funções comuns (.env, Graph API, upload) | os outros |

## Como rodar

Sempre a partir da raiz do projeto:

```bash
node scripts/verificar-ambiente.js
node scripts/render.js materiais/placas/<pasta>/placa.html materiais/placas/<pasta> --largura 794 --altura 1123
node scripts/pdf.js materiais/placas/<pasta>/placa.html materiais/placas/<pasta>/placa.pdf --formato A3 --paisagem
node scripts/video.js info materiais/videos/<pasta>/brutos/original.mp4
node scripts/video.js legenda in.mp4 out.mp4 --srt legendas/legendas.srt
node scripts/transcrever.js brutos/original.mp4 legendas/legendas.srt
node scripts/qrcode.js "https://hayashi.onsearch.com.br" qr.png --cor 007581
```

Funciona igual em Windows (PowerShell ou Git Bash), Mac e Linux. Os scripts
leem o `.env` sozinhos.

## Pré-requisitos

| O quê | Pra quê | Como |
|---|---|---|
| Node.js 20.6+ | tudo | https://nodejs.org (LTS) |
| Playwright + Chromium | PNG e PDF | `npm install` e `npx playwright install chromium` (uma vez, ~150 MB) |
| ffmpeg completo | vídeo | Windows: `winget install Gyan.FFmpeg` · Mac: `brew install ffmpeg` |
| Fonte Lato no sistema | legendas gravadas no vídeo com a fonte da marca | fonts.google.com/specimen/Lato (opcional) |
| `OPENAI_API_KEY` no `.env` | transcrição automática | `docs/integracoes.md` |
| Tokens Meta no `.env` | publicar nas redes | `docs/integracoes.md` |

## Quando algo falha

- `Playwright não está instalado` → `npm install` + `npx playwright install chromium`
- `ffmpeg não encontrado` → instalar e **fechar e abrir o terminal**
- PNG com fonte errada → sem internet na hora do render (Google Fonts); rodar de novo conectado
- `Graph API ... code 190` → token expirado
- Rode `node scripts/verificar-ambiente.js` antes de pedir ajuda.
