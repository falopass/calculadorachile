# AGENTS.md — CalculaChile

> Referencia obligatoria para agentes y desarrolladores antes de tocar este repo.

## Qué es este proyecto

**CalculaChile** (`calculadorachile.cl`) es un sitio chileno de calculadoras laborales, tributarias, previsionales y financieras. Es un producto **YMYL** (Your Money / Your Life): un error en una fórmula, monto o fuente puede afectar decisiones económicas reales y dañar confianza/SEO.

Prioridad del proyecto: **ship rápido, bajo costo y alta confiabilidad en cálculos chilenos**. AdSense y tráfico orgánico son críticos.

Estado actual del catálogo:

- **39 calculadoras activas** en `src/data/calculators.ts`.
- **40 módulos de cálculo y 40 tests** en `src/lib/calculations/` porque `bono-bodas-oro` sigue en el repo como módulo/test histórico.
- `bono-bodas-oro` fue retirado del catálogo público: `src/app/calculadoras/calculadora-bono-bodas-oro/route.ts` responde **410 Gone**. No lo reintroduzcas sin fórmula verificada y aprobación explícita.

## Stack real instalado

Verifica siempre `package.json` antes de asumir versiones. A la fecha:

- **Framework**: Next.js 15.x con App Router.
- **UI**: React 19, TypeScript 5, Tailwind CSS 3.
- **Animaciones**: Framer Motion 12.x. No están instalados Three.js, GSAP ni Lenis.
- **Íconos**: Lucide React.
- **Testing**: Vitest 3 + jsdom.
- **Fuentes activas**: Geist Sans + Geist Mono vía `next/font/google` en `src/app/layout.tsx`.
- **Ads**: Google AdSense.
- **Analytics**: Google Analytics 4.
- **Datos económicos**: BCentral + Mindicador + fallback local.
- **Imágenes dinámicas**: `canvas` para generación server-side donde aplica.
- **Deploy**: Vercel.

No instales dependencias nuevas salvo necesidad real demostrada. En particular, no introduzcas Three.js/GSAP/Lenis para “rediseño” sin decisión explícita: no forman parte del stack actual.

## Comandos útiles

```bash
npm run dev             # servidor local
npm run build           # build de producción Next.js
npm start               # servir build de producción
npm run lint            # ESLint según script del repo
npm run typecheck       # TypeScript sin emitir
npm run format:check    # Prettier check
npm test                # Vitest watch mode
npm run test:run        # Vitest una pasada
npm run test:coverage   # Vitest con coverage
```

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
│   ├── calculators.ts               # catálogo activo: 39 calculadoras
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

Credenciales BCentral (`BCENTRAL_USER`, `BCENTRAL_PASS`) van solo en variables de entorno/Vercel Dashboard. El repo debe funcionar sin ellas usando Mindicador/fallback.

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

## Estilo, UI y accesibilidad

- El sitio está en **modo light-only**. `tailwind.config.ts` mantiene `darkMode: 'class'` para que clases `dark:` residuales no se activen por `prefers-color-scheme`. No reintroduzcas dark mode.
- Usa las fuentes activas: Geist Sans y Geist Mono. No reintroduzcas Inter/Syne/DM Sans/Playfair/JetBrains como stack global.
- Mantén UI mobile-first, accesible y rápida. Semántica HTML, labels, focus visible y contraste son mínimos.
- Formato chileno siempre desde `src/lib/formatters.ts`: pesos como `$1.000.000`, UF/UTM con convención local.
- Framer Motion está permitido para microinteracciones existentes. No agregues animaciones pesadas a calculadoras core.

## Variables de entorno

Nombres relevantes:

```bash
# Banco Central de Chile API
BCENTRAL_USER=
BCENTRAL_PASS=

# Next.js / públicos
NEXT_PUBLIC_SITE_URL=https://calculadorachile.cl
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=
DEBUG=false
```

Secretos y valores reales de producción van en **Vercel Dashboard → Settings → Environment Variables**, no en el repo. Nunca commitees `.env`, credenciales, dumps ni tokens.

## Qué no tocar sin aprobación explícita

- Fórmulas, topes, tasas o constantes financieras sin fuente oficial verificada.
- Slugs, URLs públicas, canonicals, redirects, 410, robots o sitemaps. Romper rutas indexadas rompe tráfico orgánico.
- AdSense: script global, placeholders, componentes o ubicación de placements.
- Structured data SEO/YMYL: Organization/WebSite/Person/FAQ/HowTo/SoftwareApplication/Breadcrumbs.
- `bono-bodas-oro`: no reactivarlo ni devolverlo al catálogo/sitemap sin revisión de fuente y aprobación.
- Dark mode: el producto está light-only.
- Nuevas dependencias de animación/3D/smooth scroll no instaladas.
- Formato de moneda chilena.
- Secretos o credenciales.

## Validación mínima por tipo de cambio

El trabajo no está terminado hasta ejecutar una validación real y reportar el resultado.

| Cambio | Validación mínima |
|---|---|
| Fórmula de cálculo | Test específico en `src/lib/calculations/__tests__/` + `npm run typecheck` |
| Nueva calculadora | Test de cálculo + conexión en `CalculatorPageClient` + `npm run typecheck` + `npm run build` |
| Catálogo/categorías/rutas | `npm run typecheck` + `npm run build` |
| SEO metadata/schema/sitemap | `npm run typecheck` + `npm run build`; revisar salida/canonical si aplica |
| `/api/values` o datos externos | `npm run typecheck` + prueba real del endpoint o test equivalente |
| UI/componente | `npm run typecheck` + revisión responsive básica (mobile primero) |
| Solo documentación | Leer el archivo completo modificado y buscar referencias obsoletas |

Si la validación falla, corrige y vuelve a ejecutar. No entregues “debería pasar”.

## Criterio operativo para agentes

1. Lee este archivo antes de tocar código.
2. Lee `package.json` antes de asumir stack o comandos.
3. Ubica el patrón existente y cambia lo mínimo robusto.
4. En este dominio, distingue entre dato verificado, inferencia y supuesto.
5. Si un cambio toca dinero real, impuestos, leyes laborales, previsión, SEO indexado, AdSense o credenciales: extrema cautela y pide confirmación cuando haya dos caminos razonables.
6. No inventes cifras, fuentes, reseñas, direcciones ni valores financieros.
