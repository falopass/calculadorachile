# Análisis y plan de expansión — CalculaChile (2026-11-16)

> Encargo: expansión integral orientada a atraer más visitas y lograr que vuelvan.
> Priorización por impacto en tráfico × esfuerzo. Fuentes citadas por ítem.

## 1. Estado actual (inventario verificado en el repo)

| Pieza | Estado |
|-------|--------|
| Calculadoras | **64 activas** (59 indexables, 6 `noIndex` según `audit-ymyl-matrix`), 12 categorías, cada una con módulo puro + test + `sources` + `lastReviewed` |
| Contenido | **40 artículos** de blog + **15 guías** pillar (`articles.ts`, `guias.ts`) |
| Datos | `/api/values` BCentral → Mindicador → fallback; `snapshot.json` actualizado **diario** por cron; constantes legales con fuente (`constants.ts`, IUSC 2026 con rebajas oficiales ya aplicadas, aporte empleador 3,5 % Ley 21.735 ya aplicado) |
| SEO técnico | Sitemaps segmentados, `seo-overrides.ts` CTR, `calculator-guia-map.ts`, JSON-LD completo (Organization, WebSite+SearchAction, BreadcrumbList, Article, SoftwareApplication, HowTo, FAQPage), autoría/editorial (`author.ts`, `editorial.ts`) |
| GEO | `public/llms.txt` existe pero lista solo ~20 calculadoras; `calculator-quick-answers.ts` da respuestas directas; `/prensa` con texto citable; `/api/values` público y documentado — base GEO **fuerte** |
| Retención | `ExportMenu` (PNG, copiar, `navigator.share`), GA4 con funnel `calculator_started/completed`, CTA a CVListo en calcs laborales, hub `/cesantia` |
| Monetización | AdSense global + placements; placeholder de dev correcto; no tocar |

### Auditoría de vigencia
- Fórmulas corregidas del plan Q4-2026 **ya aplicadas** (IUSC con rebajas, tabla UTA, aporte 3,5 %, PGU 75+, SUE indexable).
- Matriz YM:YL 0 inputs fantasma; gates AdSense 0 fallos.
- Riesgo residual: discrepancia SIS 1,62 % vs 1,78 % (B2 del plan Q4) sigue marcada como "verificar dos fuentes" — **pendiente, requiere decisión**.

## 2. Huecos de demanda (Chile, verificado contra oferta de competidores)

| Intención de búsqueda | Competidor que la cubre | Cubierta por CalculaChile |
|------------------------|--------------------------|---------------------------|
| "cuánto me pagan por trabajar feriado" / feriado irrenunciable | haberes.cl (art. 32, 1,5×) | **No** → calculadora nueva |
| "valor hora de trabajo" / "cuánto gano por hora" | f5contable.cl, 1g.cl | Parcial (factor-hora-extra nichado a horas extra) → **calculadora nueva dedicada** |
| "costo de viaje en auto" / bencina + peajes | comparabencina.cl | **No** → calculadora nueva (inputs del usuario, sin precio oficial de combustible) |
| Contenido de ventana diciembre (aguinaldo público, feriado 25 dic, gratificación fin de año) | varios | **No publicado aún** (pendientes #34/#35/#36 del plan editorial) |
| Operación Renta 2027 (pico marzo-abril) | contando.cl, simuladores SII | Solo `operacion-renta`; falta guía pillar #39 |
| "sueldo bruto desde líquido" (inversa) | 1g.cl, contando.cl | **Ya cubierta** (`calculoInverso` en sueldo-liquido) |
| Conversor UF/UTM/dólar | previred | Cubierto |

Competidores relevantes: **Previred** (domina "indicadores previsionales"), **contando.cl** (liquidación completa con parámetros), **1g.cl**, **haberes.cl**, **f5contable.cl**, **comparabencina.cl**. Ventaja de CalculaChile: amplitud del catálogo + datos vigentes diarios + contenido editorial. Huecos aprovechables: feriado trabajado, costo de viaje, valor hora y contenido de temporada publicado antes del pico.

## 3. Plan priorizado

| Prio | Trabajo | Impacto esperado | Esfuerzo | Dueño |
|------|---------|------------------|----------|-------|
| **P0** | Calculadora `trabajo-en-feriado` (art. 32 CT, recargo 50 %, compensación descanso; irrenunciables Ley 19.973) | Alto estacional: picos 18-19 sep, 25 dic, 1 ene, 1 may | Medio | Subagente |
| **P0** | Calculadora `costo-viaje` (km × rendimiento × precio combustible + peajes/TAG, por pasajero, ida/vuelta) | Alto estacional: verano, semana santa, 18, fin de año | Medio | Subagente |
| **P1** | Calculadora `valor-hora-trabajo` (sueldo ÷ 30 × 28 ÷ jornada×4; fórmula DT) | Evergreen alto, complementa horas-extra y feriado | Bajo | Subagente |
| **P0** | Blogs de ventana diciembre: #34 feriado 25 dic, #35 aguinaldo sector público, #36 gratificación fin de año | Alto si se publican 3-4 semanas antes del pico | Medio | Subagente |
| **P1** | Blog #12 boleta honorarios retención 15,25 % (+ aludir calendario 2027-2028) | Evergreen con pico Operación Renta | Medio | Subagente |
| **P1** | GEO: refrescar `llms.txt` con catálogo completo + nuevas calcs; cobertura de quick-answers en calcs top | Mejora citación en ChatGPT/Perplexity/AI Overviews | Bajo | Subagente + integrador |
| **P1** | SEO: `seo-overrides` CTR en páginas de ventana diciembre; enlazado interno de artículos nuevos | CTR en SERP | Bajo | Subagente |
| **P2** | Guía pillar #39 Operación Renta 2027 (para publicar enero) | Autoridad del cluster impuestos | Alto | Backlog listo en calendario |
| **P2** | Ideas de retención (ver backlog): estado compartible por URL, alertas de indicadores, widget embebible | Retención/backlinks | Alto | Backlog |

## 4. Reglas aplicadas

- Cero datos inventados: todo monto legal con fuente y fecha; si no hay fuente verificable → backlog + revisión de Diego.
- Sin cambios de slugs, URLs, placements AdSense ni structured data existente.
- Toda fórmula nueva con test golden y `node scripts/audit-ymyl-matrix.mjs` sin fantasmas.
- Commits agrupados por área en un solo PR (`devin/expansion-nov-2026`).

## 5. Decisiones que requieren revisión de Diego

1. **SIS 1,78 % vs 1,62 %**: Previred reporta 1,78 % para remuneraciones ago–oct 2026; el plan Q4 pedía dos fuentes de acuerdo antes de cambiar. No se tocó. Verificar y decidir.
2. **Precio de combustible en `costo-viaje`**: no hay API oficial de precio de bencina; la calculadora queda 100 % por input del usuario (con enlace sugerido a precios publicados). ¿Agregar precio referencial editable o dejarlo solo input?
3. **`valor-hora` y `trabajo-en-feriado`** usan la fórmula DT documentada en haberes.cl/ordinario 4631 y el art. 32; revisar que el redondeo y el factor mínimo 1,5 queden como espera.
