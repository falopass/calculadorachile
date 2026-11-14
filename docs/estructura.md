# Estructura y patrón de calculadoras

> Árbol del proyecto y anatomía de una calculadora. Se movió aquí desde [`AGENTS.md`](../AGENTS.md) para que el contrato quepa en 6 KiB; el contrato sigue mandando sobre este material.
> El contrato vigente sigue en [`AGENTS.md`](../AGENTS.md); este documento conserva el detalle movido.

## Estructura relevante

```text
src/
├── app/
│   ├── api/                         # API routes; /api/values vive aquí
│   ├── blog/                        # artículos
│   ├── buscar/                      # búsqueda del sitio
│   ├── calculadoras/                # índice, rutas dinámicas y 410 retiradas
│   ├── categoria/                   # páginas por categoría de calculadoras
│   ├── guias/                       # guías pillar / contenido educativo
│   ├── robots.ts                    # robots.txt
│   ├── sitemap*.xml/route.ts        # sitemaps segmentados
│   ├── layout.tsx                   # layout raíz, fuentes, AdSense, JSON-LD global
│   └── page.tsx                     # home
├── components/
│   ├── ads/                         # componentes AdSense
│   ├── analytics/                   # GA4
│   ├── article/                     # componentes de artículos/guías
│   ├── calculator/                  # shell, inputs, resultados, FAQ, related, etc.
│   ├── home/                        # home
│   ├── layout/                      # Header/Footer
│   ├── search/                      # búsqueda
│   ├── seo/                         # inyección JSON-LD
│   ├── ui/                          # UI base
│   └── DisclaimerYMYL.tsx           # disclaimer YMYL
├── data/
│   ├── calculators.ts               # catálogo activo: 64 calculadoras
│   ├── articles.ts                  # blog
│   ├── guias.ts                     # guías SEO/educativas
│   └── seo-overrides.ts             # overrides canónicos de title/description
├── lib/
│   ├── api/                         # BCentral, Mindicador, tipos de API
│   ├── calculations/                # módulos de cálculo + tests
│   ├── calculatorCategories.ts      # 12 categorías canónicas
│   ├── context/ValuesContext.tsx    # valores económicos globales
│   ├── formatters.ts                # CLP/UF/UTM/porcentajes
│   ├── hooks/                       # hooks compartidos, incl. useLiveValues
│   ├── seo/                         # metadata, schema, sitemap helpers, author/editorial
│   ├── site.ts                      # SITE_URL, SITE_NAME, absoluteUrl
│   └── values/                      # constants, fallback, snapshots
└── types/
    └── calculator.ts                # contratos compartidos
```

## Patrón de calculadoras

Una calculadora activa se compone de piezas conectadas por `calculator.id`:

1. **Metadata/catálogo** en `src/data/calculators.ts`.
   - Define `id`, `slug`, `name`, `description`, `category`, `inputs`, `faq`, `keywords`, `featured`, `phase`, `seoTitle`, `seoDescription`, `noIndex`.
   - El `slug` define la URL pública. No lo cambies sin plan SEO.
2. **Lógica pura** en `src/lib/calculations/<modulo>.ts`.
   - Exporta la función de cálculo y el adaptador `*ToResults` a `CalculatorResult[]`.
   - Mantén la lógica testeable, sin depender de React ni del DOM.
3. **Conexión UI** en `src/app/calculadoras/[slug]/CalculatorPageClient.tsx`.
   - Importa la función y registra `calculationFunctions[calculator.id]`.
   - Algunos archivos tienen nombre distinto al `id`; la clave real de ejecución es `calculator.id`.
4. **Test** en `src/lib/calculations/__tests__/<modulo>.test.ts`.
   - Toda fórmula nueva o cambio de fórmula requiere test relevante.

Las categorías canónicas viven en `src/lib/calculatorCategories.ts`. Actualmente son 12: `sueldo`, `impuestos`, `beneficios`, `conversiones`, `familia`, `vivienda`, `vehiculos`, `empresas`, `servicios`, `pension`, `educacion`, `hogar`.
