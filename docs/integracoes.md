# Integrações do HayashiOS

> Nenhuma é obrigatória. O dia a dia (cultura, comunicados, placas, artes,
> apresentações, documentos, corte e formatação de vídeo) funciona só com
> Node, Playwright e ffmpeg. Chaves vão no `.env` (copiado de
> `.env.example`) da pessoa que opera; nunca no repositório.

## 1. Playwright (PNG e PDF)

```bash
npm install
npx playwright install chromium
```

Conferir: `node scripts/verificar-ambiente.js`.

## 2. ffmpeg (vídeo)

- Windows: `winget install Gyan.FFmpeg` (fechar e abrir o terminal depois)
- Mac: `brew install ffmpeg`
- Fonte Lato instalada no sistema deixa as legendas gravadas na fonte da
  marca (fonts.google.com/specimen/Lato → instalar os .ttf). Opcional.

Teste: `node scripts/video.js info <qualquer video.mp4>`.

## 3. Transcrição automática (legendas)

`scripts/transcrever.js` usa a API da OpenAI (modelo whisper-1). Custo por
minuto de áudio; conta e chave em https://platform.openai.com/api-keys.

```
OPENAI_API_KEY=sk-...
```

O áudio do vídeo é enviado pra OpenAI: não transcrever reuniões com
informação confidencial sem alinhar com a diretoria/TI. Revisar sempre
nomes e termos antes de gravar as legendas no vídeo.

## 4. Publicação nas redes públicas (Instagram + Facebook)

Só a Comunicação, com aprovação da diretoria registrada no `meta.md` do
post. Passo a passo (uma vez):

1. developers.facebook.com → criar app tipo "Empresa" → adicionar
   Instagram Graph API e Facebook Login for Business.
2. Graph API Explorer → token com `pages_show_list`, `pages_read_engagement`,
   `pages_manage_posts`, `instagram_basic`, `instagram_content_publish`.
3. Estender pra token de longa duração; `GET /me/accounts` → `access_token`
   da Página (`META_PAGE_ACCESS_TOKEN`) e `id` (`META_PAGE_ID`).
4. `GET /<META_PAGE_ID>?fields=instagram_business_account` → `META_IG_USER_ID`.
5. Hospedagem das imagens (a API baixa por URL pública): `SITE_URL` se o
   site da Hayashi tiver pasta pública com deploy, ou `IMGBB_API_KEY`
   (conta grátis em api.imgbb.com).

Teste sem publicar: `node scripts/postar-instagram.js comunicacao/redes/<pasta> --simular`.
Token expirado = erro `code 190`: repetir os passos 2-4.

## 5. Geração de imagem por IA

`scripts/gerar-imagem.js` (OpenAI ou Gemini) existe, mas a identidade
Hayashi usa fotos reais; imagem gerada nunca representa a empresa, as
pessoas ou o produto. Uso aceitável: textura ou fundo abstrato em cor
petróleo, se tanto.

## 6. Conectores (MCP) opcionais

| Conector | Pra quê | Observação |
|---|---|---|
| E-mail corporativo (Microsoft 365 / Gmail) | enviar o que o `/email-profissional` rascunha | só com conector oficial aprovado pela TI; envio sempre com confirmação |
| Agenda | marcar integrações, reuniões de avaliação | idem |
| Planilhas (Drive/SharePoint) | ler dados pro `/analisar-dados` | alternativa: salvar em `dados/` |

Instalação: `claude mcp add ...` conforme a documentação do conector; a TI
decide quais são permitidos.

## Checklist

```
[ ] Node 20.6+          node --version
[ ] Git                 git --version
[ ] Playwright          npm install && npx playwright install chromium
[ ] ffmpeg              ffmpeg -version
[ ] (opcional) Lato instalada
[ ] (opcional) OPENAI_API_KEY (transcrição)
[ ] (opcional) tokens Meta + hospedagem (Comunicação)
[ ] tudo verde          node scripts/verificar-ambiente.js
```
