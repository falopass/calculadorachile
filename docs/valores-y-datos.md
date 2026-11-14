# Valores económicos y datos externos

> Flujo de `/api/values`, prioridad de fuentes y fallbacks. Se movió aquí desde [`AGENTS.md`](../AGENTS.md); la regla de no hardcodear valores sigue en el contrato.
> El contrato vigente sigue en [`AGENTS.md`](../AGENTS.md); este documento conserva el detalle movido.

## Valores económicos y datos externos

No hardcodees UF, UTM, IPC, dólar, euro, topes, tasas o valores legales en componentes.

Fuentes y flujo actual:

- `GET /api/values` en `src/app/api/values/route.ts` entrega UF, UTM, dólar observado/venta y euro.
- Prioridad de datos: **BCentral → Mindicador → fallback local**.
- Cache: `revalidate = 3600` y headers `s-maxage=3600, stale-while-revalidate=86400`.
- Fallbacks y snapshots viven en `src/lib/values/`:
  - `constants.ts` para constantes legales/financieras usadas por cálculos.
  - `fallback.ts` para respaldo runtime.
  - `snapshot.json` y `tmc-snapshot.json` para datos congelados.
- Hooks/contexto: `ValuesContext` y `useLiveValues` cuando la UI necesita valores actuales.

Credenciales BCentral (`BCENTRAL_USER`, `BCENTRAL_PASS`) van solo en las Variables and Secrets del Worker en Cloudflare. El repo debe funcionar sin ellas usando Mindicador/fallback.
