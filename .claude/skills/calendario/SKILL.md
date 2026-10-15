---
name: calendario
description: >
  Monta o calendário de comunicação do mês da Hayashi: datas da empresa e do agro, campanhas de
  saúde e segurança, DDS, aniversariantes, comunicados previstos (pagamento, benefícios, escalas)
  e posts pras redes, por unidade e canal, a partir de templates/calendario/datas-hayashi.md. Cada
  linha vira input de /comunicado, /arte, /carrossel, /video e /reconhecimento. Use quando o
  usuário pedir "calendário do mês", "o que comunicar esse mês", "planejar a comunicação",
  "/calendario".
argument-hint: "[YYYY-MM] [unidade]"
---

# /calendario — Comunicação do mês

## Dependências

- `templates/calendario/datas-hayashi.md`, `_memoria/estrategia.md`
  (campanhas e eventos com prazo), `_memoria/empresa.md` (canais, unidades)
- `comunicacao/calendario/<mês anterior>.md` e `saidas/registro/*.md`
- Saída: `comunicacao/calendario/<YYYY-MM>.md`

## Workflow

1. **Mês e unidade.** Argumento ou: dia ≥ 20 → mês seguinte. Já existe →
   ajustar ou refazer.
2. **Levantar:** datas do mês (empresa, agro, saúde/segurança, pessoas);
   feriados (escala, transporte); campanhas do ano; eventos internos
   informados; o que ficou pendente no mês anterior.
3. **Perguntar (2):** "Tem evento, campanha ou comunicado já previsto
   (SIPAT, integração, confraternização, mudança de escala)?" e "Quais
   canais vamos usar esse mês (WhatsApp, mural, TV, e-mail, DDS, redes)?"
4. **Montar:**

```markdown
# Calendário de comunicação — <Mês/Ano> — <unidade | todas>

| Data | Canal | Peça | Tema | Área responsável | Skill | Aprovação | Status |
|---|---|---|---|---|---|---|---|
| 03/11 seg | WhatsApp + mural | aviso | Transporte: novo horário | RH | /comunicado | gerente | pendente |
| 05/11 qua | TV | tela | Dia do Técnico Agrícola | Comunicação | /arte | — | pendente |
| 07/11 sex | DDS | vídeo 2 min | EPI na colheita | Segurança | /video | SST | pendente |
| 20/11 qui | — | — | Feriado nacional (Consciência Negra): escala | RH | /comunicado | gerente | pendente |
| 28/11 sex | mural | lista | Aniversariantes de dezembro | RH | /reconhecimento | — | pendente |
| 30/11 | WhatsApp | aviso | 1ª parcela do 13º (Manual 5.4) | RH | /comunicado | RH | pendente |
```

Fechar com "Ideias reserva" e "Fotos que precisamos".

**CHECKPOINT:** mostrar e ajustar.

5. **Entregar:** salvar, registrar, oferecer já produzir a primeira peça.

## Regras

- Só o sustentável: menos e constante.
- Datas comemorativas só quando ligam com a Hayashi ou as pessoas.
- Campanhas de saúde mental e temas sensíveis com tom cuidadoso.
- Evento ou mudança não confirmada entra como "[confirmar]".
