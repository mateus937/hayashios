# materiais/ — o que o HayashiOS produz

```
materiais/
├── artes/<YYYY-MM-DD>-<slug>/             /arte (arte.html, arte.png | arte.pdf)
├── placas/<YYYY-MM-DD>-<slug>/            /placa (placa.html, placa.pdf, placa.png, qr.png)
├── apresentacoes/<YYYY-MM-DD>-<slug>/     /apresentacao (apresentacao.html, slides/, .pdf, roteiro.md)
├── documentos/<YYYY-MM-DD>-<slug>/        /documento (documento.md, .html, .pdf)
├── videos/<YYYY-MM-DD>-<slug>/            /video (roteiro.md, legendas/, pecas/; brutos/ e .mp4 não versionados)
├── integracao/<YYYY-MM-DD>-<slug>/        /integracao (roteiro, slides, checklist, quiz, confirmação, cartão)
├── reconhecimento/<YYYY-MM-DD>-<slug>/    /reconhecimento (texto, cartão, post, certificado)
└── cultura/                               /cultura (quiz, resumos)
```

Toda peça HTML referencia `../../../identidade/hayashi.css` e
`../../../identidade/logo.png` e é renderizada por `scripts/render.js` ou
`scripts/pdf.js`. Modelos preenchidos com dados de pessoas (termo de EPI,
lista de presença) ficam em `pessoas/`, não aqui.
