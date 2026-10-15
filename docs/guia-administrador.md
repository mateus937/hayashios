# Guia do administrador do Hayashi OS

> Pra quem mantém o sistema na Hayashi: repositório, acessos, documentos
> oficiais, identidade, versões.

## 1. Repositório

- Um repositório **privado** (GitHub da empresa ou servidor interno) com
  este conteúdo. Todos clonam o mesmo; o `/salvar` de cada pessoa faz
  commit + pull + push no `main`.
- Acesso: conceder por pessoa, com e-mail corporativo. Remover ao
  desligar. Sem repositório público: há dados da empresa (guia, manual,
  materiais).
- O que nunca entra: `.env`, `_memoria/usuario.md`, `pessoas/`, `dados/`,
  vídeos e áudios (já no `.gitignore`). Revisar de tempos em tempos com
  `git log --stat` se alguém versionou algo pessoal por engano.

## 2. Cadastrar uma pessoa

1. Ela instala Git, Node.js LTS e Claude Code (login com a assinatura da
   empresa ou dela, conforme a política de TI).
2. `git clone <repo> hayashi-os`, `npm install`, `npx playwright install chromium`.
3. Pra vídeo: `winget install Gyan.FFmpeg` (fechar e abrir o terminal).
4. `claude` → `/instalar` (cria o `usuario.md` dela).
5. Entregar o `COMECE-AQUI.md` e combinar `/salvar` no fim de cada sessão.

## 3. Documentos oficiais

- `_memoria/cultura.md` é a transcrição do Guia do Manifesto da Cultura
  (v1.7, jul/2024); `_memoria/politicas.md`, do Manual do Colaborador (v4,
  dez/2024). **Só o administrador edita**, e só quando sair versão nova do
  documento (RH/diretoria).
- Ao atualizar: trocar o cabeçalho `<!-- fonte: ... -->` e o aviso de
  versão, manter a estrutura (os arquétipos numerados, as seções do
  manual), registrar no `CHANGELOG.md` com a seção "O que muda pra você",
  subir `VERSION`, `git tag v<versão>`. Materiais antigos (quiz, cartazes
  de valores) podem precisar de revisão.
- Divergência apontada por um usuário entre o que o OS diz e a prática:
  confirmar com o RH; se o documento oficial mudou, atualizar; se não, a
  prática é que se ajusta (ou o RH decide revisar o documento).

## 4. Identidade

- Pedir à Comunicação: logo vetorial (`logo.svg`), versão branca
  (`logo-branco.png`), só o símbolo (`logo-simbolo.svg`); fotos oficiais
  em alta (capa do guia, lideranças, lavoura) → `identidade/fotos/` com
  inventário em `fotos.md`.
- Mudança de cor ou fonte: só com a Comunicação; atualizar
  `design-guide.md` **e** `hayashi.css` juntos; renderizar os templates
  pra conferir.

## 5. Memória da empresa

- Completar em `_memoria/empresa.md` o que está *(confirmar)*: canais
  internos por unidade, áreas e responsáveis (cargo e área; sem telefone
  pessoal), site e redes e quem administra.
- `templates/calendario/datas-hayashi.md`: datas internas do ano (SIPAT
  por unidade, integrações, confraternização, aniversário das unidades).
- `_memoria/estrategia.md`: metas numéricas quando a diretoria/RH definir.

## 6. Aprovações

Registrar no bloco "Hayashi" do `CLAUDE.md` quem aprova o quê, com cargo.
Material externo exige diretoria (arquétipo VI); placa de segurança,
Segurança do Trabalho; cultura, RH.

## 7. Integrações (opcionais)

`docs/integracoes.md`: transcrição automática (OpenAI), publicação em
redes (Meta), hospedagem de imagem. Chaves no `.env` de quem opera (a
Comunicação), nunca no repositório.

## 8. Publicar uma versão nova do OS

1. Mudanças em `.claude/skills/`, `scripts/`, `templates/`, `identidade/`,
   `_memoria/` (oficial), `CLAUDE.md` (núcleo), docs.
2. Se mexeu no núcleo do `CLAUDE.md`, regenerar
   `templates/sistema/claude-md-nucleo.md` (trecho entre os marcadores).
3. `VERSION` (correção = patch; skill nova = minor; mudança de estrutura
   ou de documento oficial = major) e `CHANGELOG.md`.
4. `git commit`, `git tag v<versão>`, `git push && git push --tags`.
5. Avisar as pessoas: `/atualizar-sistema` (ou o próximo `/salvar` já traz).

## 9. Skills criadas pelas pessoas

Qualquer um pode criar via `/mapear-rotinas`; depois do `/salvar` vale pra
todos. Revisar periodicamente: nomes, duplicidade, se cita regra
corretamente, se guarda dados pessoais fora de `pessoas/`. Listar em
`templates/skills/catalogo.md`.

## 10. Suporte: erros comuns

| Sintoma | Causa | Solução |
|---|---|---|
| `/instalar` não aparece | Claude aberto fora da pasta | abrir dentro da pasta |
| "Playwright não está instalado" | `npm install` não rodou | `npm install && npx playwright install chromium` |
| "ffmpeg não encontrado" | não instalado ou terminal antigo | instalar; fechar e abrir o terminal |
| PNG com fonte errada | sem internet no render | repetir conectado |
| Legenda no vídeo com fonte padrão | Lato não instalada no Windows | instalar a fonte (opcional) |
| `git push` recusado | sem acesso de escrita | conceder acesso ou receber o commit por outro meio |
| Conflito no `/salvar` | duas pessoas editaram o mesmo arquivo | a skill resolve mantendo os dois; se travar, `git rebase --abort` e chamar o administrador |
| Memória "sumiu" | `CLAUDE.md` sem marcadores | `/atualizar` restaura o núcleo |
