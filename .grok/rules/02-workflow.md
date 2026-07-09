# Workflow Grok Build

Harness: **Grok Build terminal** (Grok 4.5 / `grok-build`). Manual: `docs/GROK_BUILD.md`.

1. Leer `AGENTS.md` + `docs/PRODUCT_CONTEXT.md` si aplica.
2. Skill o slash: `/ymyl-audit` | `/p0-wiring` | `/ship-check` | `/nueva-calc` | `/seo-fix`.
3. Plan mode si hay ambigüedad de fórmula/unidades/wiring grande.
4. Cambio mínimo robusto multi-archivo (catálogo + adapter + test).
5. Validar con comandos reales y reportar salida.

```bash
npm run typecheck
npm run test:run -- src/lib/calculations/__tests__/<mod>.test.ts
node scripts/audit-ymyl-matrix.mjs
# + npm run build si catálogo/rutas/SEO
```
