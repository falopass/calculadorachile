---
name: contenido-editorial-ymyl
description: Operar la publicación e integración de artículos y guías YMYL en CalculaChile usando plan editorial, archivos de datos, enlaces internos, SEO y validación técnica. Usar para alta en articles.ts o guias.ts, estado del backlog, wiring editorial, metadata, mapeo calculadora-guía y cierre de publicación. Para investigación y escritura larga de 1.500+ palabras usar periodismo-editorial-chile.
---

# Contenido editorial YMYL — CalculaChile

Lee `AGENTS.md`, `docs/contexto.md` y `docs/plan-editorial.md`. Para investigar o redactar una pieza larga, usa también `$periodismo-editorial-chile`. No conviertas una hipótesis editorial en un dato financiero.

## Flujo

1. Ubica el tema en `docs/plan-editorial.md`; respeta tipo (`blog`, `blog*` o `guía`), prioridad, slug e intención.
2. Abre solo el research pertinente:
   - `docs/research/dossier-ymyl.md` para fórmulas, topes y normativa.
   - `docs/research/inventario-seo.md` para montos, fechas y estacionalidad.
   - `docs/research/deep-research.md` para el dossier `DR[n]` asignado.
3. Revalida en internet todo dato temporal, legal o monetario. Prioriza SII, Dirección del Trabajo, Banco Central, Superintendencias, CMF, IPS/ChileAtiende, MINVU y BCN/Ley Chile.
4. Distingue en las notas de trabajo: **verificado**, **inferido** y **supuesto**. No publiques supuestos como hechos.
5. Implementa con el patrón existente en `src/data/articles.ts` o `src/data/guias.ts`. Reutiliza los componentes y helpers editoriales existentes.
6. Enlaza la calculadora relevante y, si aplica, actualiza `src/lib/seo/calculator-guia-map.ts`.
7. Mantén title, description, canonical, autoría, fecha de revisión, fuentes, disclaimer y schema alineados con el contenido visible.
8. Ejecuta `npm run typecheck` y `npm run build`. Si cambias helpers SEO, ejecuta también sus tests.
9. Tras publicar una pieza del backlog, actualiza su estado en `docs/plan-editorial.md` sin alterar los conteos silenciosamente.

## Reglas

- No cambies un slug planificado o publicado sin un plan SEO aprobado.
- No prometas que CalculaChile o su resultado es “oficial” de un organismo.
- No uses `LocalBusiness`, testimonios inventados ni cifras sin fuente.
- No mezcles dos intenciones de búsqueda distintas solo para reducir el número de páginas.
- Revalida montos y fechas sensibles inmediatamente antes de publicar.

## Entrega

Reporta slug, tipo de pieza, intención, fuentes oficiales verificadas, enlaces internos, archivos modificados y resultados reales de validación.
