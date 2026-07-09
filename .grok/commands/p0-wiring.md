---
description: Cerrar inputs fantasma P0 (wiring catálogo→adapter→módulo) sin rediseño UI.
---

Modo **fix de honestidad YMYL** en CalculaChile (Grok Build).

1. Lee `AGENTS.md` y la skill `auditoria-ymyl`.
2. Corre `node scripts/audit-ymyl-matrix.mjs`.
3. Prioridad fija salvo que el usuario diga otra:
   - P0a: `sueldo-liquido` (cablear lo que el módulo ya soporta o recortar catálogo con honestidad)
   - P0b: `subsidio-habitacional` (`tipoSubsidio` + unidad UF/CLP)
   - P0c: `boleta-honorarios` (al menos `ano`)
4. Si hay ambigüedad de fórmula o de unidad legal → **Plan mode** antes de editar.
5. Si hay `docs/research/perplexity-ymyl-dossier.md`, úsalo como fundamento; no inventes tasas.
6. Implementa el **cambio mínimo robusto** multi-archivo:
   - `src/data/calculators.ts`
   - `src/app/calculadoras/[slug]/CalculatorPageClient.tsx`
   - tests en `src/lib/calculations/__tests__/`
   - módulo solo si hace falta (unidades, no “mejoras” de ley)
7. Validar y reportar salida real:
   ```bash
   npm run typecheck
   npm run test:run -- src/lib/calculations/__tests__/<modulo>.test.ts
   node scripts/audit-ymyl-matrix.mjs
   ```
8. Meta: **cero fantasmas** en la calculadora tocada (o solo cosméticos documentados).
9. No uses skills/comandos de pyme. No toques AdSense ni slugs.
