# Catálogo de ferramentas

O que as skills usam. Tudo essencial já está em `scripts/`.

## Vem no Hayashi OS (scripts/)

| Script | O que faz | Precisa de |
|---|---|---|
| `verificar-ambiente.js` | confere a máquina | nada |
| `render.js` | HTML → PNG por `.hay-page` (`--transparente` pra sobreposição) | Playwright |
| `pdf.js` | HTML → PDF (A4/A3/A2, paisagem) | Playwright |
| `video.js` | edição com ffmpeg (13 comandos) | ffmpeg |
| `transcrever.js` | áudio/vídeo → SRT | OPENAI_API_KEY (+ ffmpeg) |
| `qrcode.js` | QR em PNG | internet (api.qrserver.com; sem dado sensível) |
| `screenshot.js` | página web → PNG | Playwright |
| `checar-url.js` | espera URL responder | nada |
| `gerar-imagem.js` | imagem por IA (uso restrito) | chave |
| `postar-instagram.js`, `postar-facebook.js` | publicar nas redes | tokens Meta + hospedagem |

## Nativos do Claude Code

WebSearch (pesquisa, ex.: normas, datas), WebFetch (ler página pública),
Read de imagem e PDF (prints, documentos).

## Programas na máquina

| Programa | Pra quê | Windows | Mac |
|---|---|---|---|
| Node.js LTS | scripts | `winget install OpenJS.NodeJS.LTS` | `brew install node` |
| Git | repositório | `winget install Git.Git` | `brew install git` |
| ffmpeg | vídeo | `winget install Gyan.FFmpeg` | `brew install ffmpeg` |
| Fonte Lato | legendas em vídeo | fonts.google.com | idem |

## Referências úteis

- Pictogramas de segurança ISO 7010 (placas): usar os oficiais quando a Segurança exigir
- Ícones de linha (Lucide, MIT) pra artes: inline SVG, traço 2 px, cor petróleo
- Normas: NR-26 (cores de sinalização), NR-6 (EPI), NR-31 (rural), NR-5 (CIPA)

## Como adicionar

```markdown
### Nome
**O que faz:** ...
**Precisa de:** ...
**Quando usar:** em qual skill
```
