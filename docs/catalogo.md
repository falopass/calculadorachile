# Catálogo y estado del producto — CalculaChile

> Inventario, historial y estado del catálogo. Contenido movido aquí desde [`AGENTS.md`](../AGENTS.md) al reducir el contrato normativo a 6 KiB.
> El contrato vigente sigue en [`AGENTS.md`](../AGENTS.md); este documento conserva el detalle completo.

## Qué es este proyecto

**CalculaChile** (`calculadorachile.cl`) es un sitio chileno de calculadoras laborales, tributarias, previsionales y financieras. Es un producto **YMYL** (Your Money / Your Life): un error en una fórmula, monto o fuente puede afectar decisiones económicas reales y dañar confianza/SEO.

Prioridad del proyecto: **ship rápido, bajo costo y alta confiabilidad en cálculos chilenos**. AdSense y tráfico orgánico son críticos.

Estado actual del catálogo:

- **64 calculadoras activas** en `src/data/calculators.ts` (56 indexables, 8 `noIndex`; `subsidio-unificado-empleo` es indexable desde el 20-10-2026: los parámetros del primer año los fijó el Decreto 273 exento de Hacienda, DO 01-10-2026, https://www.diariooficial.interior.gob.cl/publicaciones/2026/10/01/44563/01/2881073.pdf, y el reglamento de la Ley 21.808 es el Decreto 75 del Ministerio del Trabajo, DO 30-09-2026, https://www.diariooficial.interior.gob.cl/publicaciones/2026/09/30/44562/01/2880088.pdf).
- **64 módulos de cálculo** con su test en `src/lib/calculations/` (más tests auxiliares `input-coerce` y `seguro-social`).
- `bono-bodas-oro` fue **reactivado el 26-09-2026** con fórmula verificada (ChileAtiende ficha 5369): la ruta 410 anterior fue eliminada y el slug lo sirve la ruta dinámica normal.
