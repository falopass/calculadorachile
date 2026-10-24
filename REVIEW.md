# REVIEW.md — CalculaChile

Instrucciones para el revisor automático (Devin Review). Responde en español.

## Contexto
Sitio YMYL de calculadoras laborales/tributarias/financieras chilenas (54 activas en
`src/data/calculators.ts`, módulos en `src/lib/calculations/`). Un error en una fórmula,
monto o fuente afecta decisiones económicas reales y la confianza/SEO.

## Revisa con rigor (prioridad máxima)
- **Fórmulas y valores**: cualquier número hardcoded (UF, UTM, topes imponibles, tasas,
  tramos, porcentajes, fechas de vigencia) debe tener fuente oficial (SII, DT, Previred,
  BCentral, Diario Oficial). Flaguear valores sin fuente o con vigencia ambigua.
- Tests de cálculo: módulo nuevo o modificado sin su test correspondiente en
  `src/lib/calculations/` es un hallazgo.
- `DisclaimerYMYL` y metadata/canonical correctos en páginas nuevas; respetar
  `seo-overrides.ts` para title/description.
- Dependencias: no introducir Three.js/GSAP/Lenis ni dependencias nuevas sin necesidad
  demostrada.

## Ignora
- Calculadoras `noIndex` retiradas y rutas 410: no sugerir reactivarlas.
- AdSense/analytics wiring existente.
