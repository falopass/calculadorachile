# Catálogo y estado del producto — CalculaChile

> Inventario, historial y estado del catálogo. Contenido movido aquí desde [`AGENTS.md`](../AGENTS.md) al reducir el contrato normativo a 6 KiB.
> El contrato vigente sigue en [`AGENTS.md`](../AGENTS.md); este documento conserva el detalle completo.

## Qué es este proyecto

**CalculaChile** (`calculadorachile.cl`) es un sitio chileno de calculadoras laborales, tributarias, previsionales y financieras. Es un producto **YMYL** (Your Money / Your Life): un error en una fórmula, monto o fuente puede afectar decisiones económicas reales y dañar confianza/SEO.

Prioridad del proyecto: **ship rápido, bajo costo y alta confiabilidad en cálculos chilenos**. AdSense y tráfico orgánico son críticos.

Estado actual del catálogo:

- **82 calculadoras activas** en `src/data/calculators.ts` (76 indexables, 6 `noIndex`; alta de `validador-rut` el 22-11-2026, única con resultados de texto vía `format: 'text'`; alta de `porcentaje` el 22-11-2026; alta de `dias-administrativos` el 19-11-2026; `subsidio-unificado-empleo` es indexable desde el 20-10-2026: los parámetros del primer año los fijó el Decreto 273 exento de Hacienda, DO 01-10-2026, https://www.diariooficial.interior.gob.cl/publicaciones/2026/10/01/44563/01/2881073.pdf, y el reglamento de la Ley 21.808 es el Decreto 75 del Ministerio del Trabajo, DO 30-09-2026, https://www.diariooficial.interior.gob.cl/publicaciones/2026/09/30/44562/01/2880088.pdf).
- **82 módulos de cálculo** con su test en `src/lib/calculations/` (más tests auxiliares `input-coerce` y `seguro-social`).
- `porcentaje` (hogar): calculadora de porcentajes y descuentos orientada a ofertas/rebajas (CyberDay, Black Friday); cinco modos (X% de un monto, qué % es A de B, variación porcentual, precio con descuento simple o sucesivo, precio con aumento). Aritmética pura sin constantes legales; fuentes de contexto SERNAC.
- `validador-rut` (servicios): valida el dígito verificador de un RUT con módulo 11 y muestra el dígito esperado; primera calculadora con resultados de texto (`format: 'text'`). Fuentes: Ley 4.808 (BCN), Registro Civil y esquema DTE del SII.
- `dias-administrativos`: saldo anual y simulación de solicitud para funcionarios públicos y municipales; cupo verificado en DFL 29, art. 109, y Ley 18.883, art. 108. Indexable, con metodología, respuesta rápida y prueba de wiring.
- `bono-bodas-oro` fue **reactivado el 26-09-2026** con fórmula verificada (ChileAtiende ficha 5369): la ruta 410 anterior fue eliminada y el slug lo sirve la ruta dinámica normal.

- `auto-electrico-vs-bencina` (vehículos): comparación de costo energético por km y mensual con precios y consumos ingresados por el usuario, sin precios precargados. Diferencia mensual/anual firmada y porcentaje respecto de bencina; CLP al entero al final y porcentaje a un decimal. Fuentes de referencia: Bencina en Línea (CNE) y boleta/tarifas eléctricas (CNE/SEC); no compara costo total de propiedad.
