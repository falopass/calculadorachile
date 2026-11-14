# SEO, YMYL, AdSense y analytics

> Detalle de SEO/YMYL y monetización. Se movió aquí desde [`AGENTS.md`](../AGENTS.md); las reglas que no se pueden violar siguen en el contrato.
> El contrato vigente sigue en [`AGENTS.md`](../AGENTS.md); este documento conserva el detalle movido.

## SEO, YMYL y E-E-A-T

Este sitio compite en búsquedas financieras/laborales chilenas. Trata SEO y confianza como parte del producto, no como decoración.

- Metadata base: `src/lib/seo/metadata.ts` y `src/app/layout.tsx`.
- Overrides específicos de title/description: **`src/data/seo-overrides.ts`**. Ese es el lugar canónico para ajustes CTR por página.
- Mapeo calculadora ↔ guía pillar: `src/lib/seo/calculator-guia-map.ts`.
- Sitemap helpers: `src/lib/seo/sitemap-helpers.ts` y rutas `src/app/sitemap*.xml/route.ts`.
- Autoría/editorial: `src/lib/seo/author.ts` y `src/lib/seo/editorial.ts`.
- JSON-LD implementado en `src/lib/seo/schema.ts`: `Organization`, `Person`, `WebSite` con `SearchAction`, `WebPage`/`AboutPage`/`ContactPage`, `BreadcrumbList`, `Article`/`BlogPosting`, `CollectionPage`/`ItemList`, `SoftwareApplication`, `HowTo`, `FAQPage`.
- No propongas ni agregues `LocalBusiness`: CalculaChile es una plataforma web nacional, no un negocio local con atención física.
- No elimines disclaimers YMYL, fuentes, autoría, breadcrumbs ni structured data sin reemplazo equivalente.

Regla de oro: **sin fuente oficial verificada, no se cambia una fórmula**. Fuentes típicas: Banco Central de Chile, SII, Dirección del Trabajo, Superintendencia de Pensiones, CMF, IPS/ChileAtiende, MINVU, BCN/Ley Chile o normativa vigente aplicable.

## AdSense y analytics

- AdSense es monetización principal. Componentes en `src/components/ads/` y script global en `src/app/layout.tsx`.
- En desarrollo/staging, `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXX` desactiva la carga real del script. No “arregles” ese placeholder.
- No muevas, elimines ni escondas placements de ads por mejoras visuales sin una decisión explícita.
- GA4 vive en `src/components/analytics/GAProvider` y helpers en `src/lib/analytics.ts`.
