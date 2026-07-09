---
description: Gate de validación antes de dar por cerrado un cambio en CalculaChile.
---

Corre el **ship-check** de CalculaChile y reporta resultados reales (no “debería pasar”).

1. Detecta qué se tocó (fórmula / wiring / SEO / solo docs).
2. Según `AGENTS.md`:

| Cambio | Comandos |
|--------|----------|
| Fórmula o wiring | `npm run typecheck` + `npm run test:run -- src/lib/calculations/__tests__/<mod>.test.ts` |
| Nueva calc / catálogo / rutas / SEO | lo anterior + `npm run build` |
| Cualquier calc phase 1 | también `node scripts/audit-ymyl-matrix.mjs` y confirma fantasmas de ese `id` |

3. Checklist YMYL:
   - [ ] Sin inputs fantasma en la calc tocada
   - [ ] Sin cambiar slugs / 410 / AdSense placements
   - [ ] Fuentes / lastReviewed si hubo review real de fórmula
   - [ ] Formato CLP vía `formatters.ts`

4. Entrega: tabla comando → exit code → resumen. Si falla, arregla o declara bloqueo.
