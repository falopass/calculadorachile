---
name: seo-adsense
description: >
  SEO técnico y AdSense en CalculaChile: metadata, seo-overrides, noIndex,
  sitemaps, schema.org, canonicals, E-E-A-T y placements de ads. Usar cuando
  el usuario pida SEO, CTR, titles, noindex, sitemap, JSON-LD, schema,
  AdSense, E-E-A-T, o /seo-adsense.
---

# SEO + AdSense — CalculaChile

Sitio de tráfico orgánico + AdSense sobre contenido **YMYL**. Un cambio de slug o de schema puede costar indexación o revisión de ads. Lee `AGENTS.md`.

## Principios

1. **No romper URLs indexadas** (slugs, canonicals, 410, redirects) sin plan.
2. **Confianza > clickbait**: titles honestos; no prometer “cálculo oficial del SII”.
3. **No tocar placements AdSense** por estética sin aprobación.
4. **No inventar** reseñas, direcciones, `LocalBusiness`, ni entidades falsas.
5. Light-only, mobile-first, performance: no meter 3D/smooth-scroll “por SEO”.

## Mapa de archivos

| Preocupación | Archivo(s) |
|--------------|------------|
| Metadata base | `src/lib/seo/metadata.ts`, `src/app/layout.tsx` |
| Overrides CTR title/description | **`src/data/seo-overrides.ts`** (canónico) |
| Catálogo (seoTitle, noIndex, FAQ, sources) | `src/data/calculators.ts` |
| Schema JSON-LD | `src/lib/seo/schema.ts`, `src/components/seo/JsonLd.tsx`, `SeoStructuredData` |
| Autor / E-E-A-T | `src/lib/seo/author.ts`, `editorial.ts` |
| Calculadora ↔ guía pillar | `src/lib/seo/calculator-guia-map.ts` |
| Sitemaps | `src/lib/seo/sitemap-helpers.ts`, `src/app/sitemap*.xml/route.ts` |
| robots | `src/app/robots.ts` |
| AdSense UI | `src/components/ads/`, script en `layout.tsx` |
| Analytics | `src/components/analytics/`, `src/lib/analytics.ts` |
| Guías / blog | `src/data/guias.ts`, `src/data/articles.ts` |

## Tareas comunes

### A. Mejorar CTR de una página (title/description)

1. Preferir **`src/data/seo-overrides.ts`** para title/description canónicos de CTR.
2. Si es calculadora, también se puede usar `seoTitle` / `seoDescription` en el catálogo; no pelear con el override (revisar cuál gana en `generateMetadata`).
3. Incluir año/contexto Chile solo si es cierto (valores 2026, etc.).
4. No keyword-stuffing; longitud razonable para SERP móvil.

### B. Marcar / desmarcar `noIndex`

En el catálogo: `noIndex: true` → `noindex, follow` y exclusión de sitemap (vía helpers).

Usar para:

- Calculadoras delgadas en cuarentena de calidad.
- Experimentos no listos para índice.

No usar para esconder errores de fórmula: **arregla o retira** (410) con decisión explícita.

### C. Schema.org

Implementado: Organization, Person, WebSite+SearchAction, WebPage/About/Contact, BreadcrumbList, Article/BlogPosting, CollectionPage/ItemList, SoftwareApplication, HowTo, FAQPage.

- Extender en `schema.ts` con el mismo estilo de helpers.
- **Prohibido** agregar `LocalBusiness`.
- No eliminar Organization/WebSite/Person/FAQ/HowTo/SoftwareApplication/Breadcrumbs sin reemplazo equivalente.
- FAQ del schema debe coincidir con FAQ visible (no inventar Q&A solo para rich results).

### D. Sitemaps y robots

- Sitemaps segmentados: pages, calculadoras, blog, guias.
- Tras cambiar `noIndex` o alta de contenido, verificar que los helpers incluyan/excluyan bien.
- No editar robots para “forzar” indexación de basura.

### E. AdSense

- Publisher real solo en env de producción.
- Placeholder `ca-pub-XXXXXXX` en dev: **no “arreglarlo”**.
- No mover, quitar ni esconder `AdBanner` / slots por rediseño visual.
- Contenido delgado + ads agresivos = riesgo de policy; prioriza profundidad (FAQ, fuentes, guía relacionada).

### F. Contenido pilar (guías / blog)

- Guías enlazan calculadoras; calculadoras deben enlazar guía si existe mapeo.
- HTML editorial vía helpers en `editorial.ts` / componente `Callout`.
- No inventar cifras legales en el copy; alinear con el módulo de cálculo.

### G. Retiro de URL

Patrón existente: ruta dedicada con **410 Gone** (ej. bono bodas de oro).
No devolver 200 vacío ni 404 blando si la URL estuvo indexada y se retira a propósito.

## Checklist pre-merge SEO

- [ ] Canonical correcto (`SITE_URL` / `absoluteUrl`)
- [ ] Title/description únicos (no plantilla idéntica en 40 URLs)
- [ ] `noIndex` coherente con sitemap
- [ ] JSON-LD sin tipos prohibidos / inventados
- [ ] FAQ y HowTo alineados al producto real
- [ ] Fuentes y disclaimer YMYL intactos
- [ ] Ads no eliminados
- [ ] `npm run typecheck` + `npm run build`

## Validación

```bash
npm run typecheck
npm run build
```

Si tocas sitemaps/helpers, correr tests de `src/lib/seo/__tests__/` si existen.

## Anti-patrones

- Cambiar `slug` de calculadora indexada “porque queda más bonito”.
- Copiar el mismo párrafo SEO en todas las páginas.
- Prometer resultados “oficiales” de un organismo público.
- Usar skills de pyme local (`LocalBusiness`, WhatsApp CTA) como marco de este sitio.
- Meter keywords de ciudad falsa o dirección inventada.
