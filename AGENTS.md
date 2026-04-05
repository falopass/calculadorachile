# AGENTS.md — CalculaChile (calculadorachile)

> AI agents and developers: Read this BEFORE making changes to this codebase.

## What is this?

**CalculaChile** — 40 calculadoras financieras, laborales y tributarias de Chile. Next.js estático con AdSense, deploy Vercel. Prioridad: ship rápido, bajo costo.
Domain: `calculadorachile.cl`

## Stack

- **Framework**: Next.js 15.x (App Router)
- **UI**: React 19 + TypeScript 5.x + Tailwind CSS 3.x
- **Animations**: Framer Motion 12.x + GSAP 3.x + Three.js 183 (cinematic redesign)
- **Smooth Scroll**: Lenis
- **Testing**: Vitest 3.x + jsdom
- **Fonts**: Inter, Syne, DM Sans, Playfair Display, JetBrains Mono
- **Icons**: Lucide React
- **Ads**: Google AdSense
- **Analytics**: Google Analytics 4
- **Data**: Banco Central de Chile API (BCentral)
- **Canvas**: canvas (server-side image generation)
- **Deploy**: Vercel

## Commands

```bash
npm run dev        # Dev server
npm run build      # Production build
npm start          # Production server
npm run lint       # ESLint
npm test           # Vitest watch mode
npm run test:run   # Vitest single run
```

## Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   ├── blog/                   # Blog posts
│   ├── calculadoras/           # Calculator pages
│   │   ├── [slug]/             # Dynamic calculator route
│   │   ├── comparador-afp/     # AFP comparator
│   │   ├── comparador-credito-hipotecario/  # Mortgage comparator
│   │   └── page.tsx            # Calculator index page
│   ├── cookies/                # Cookie policy
│   ├── faq/                    # FAQ page
│   ├── guias/                  # Guides/educational content
│   ├── privacidad/             # Privacy policy
│   ├── terminos/               # Terms of service
│   ├── rediseño/               # Cinematic redesign experiments
│   ├── globals.css             # Global styles + Tailwind
│   ├── layout.tsx              # Root layout (providers, fonts)
│   ├── not-found.tsx           # 404 page
│   ├── page.tsx                # Landing page
│   ├── robots.ts               # robots.txt
│   └── sitemap.ts              # sitemap.xml
├── components/
│   ├── ads/                    # AdSense ad components
│   ├── analytics/              # GA4 + tracking
│   ├── blog/                   # Blog components
│   ├── calculator/             # Calculator UI components (30+ files)
│   │   ├── CalculatorLayout.tsx / CalculatorShell.tsx / CalculatorPageLayout.tsx
│   │   ├── InputField.tsx / SelectField.tsx
│   │   ├── ResultCard.tsx / ResultChart.tsx / ResultSkeleton.tsx
│   │   ├── AmortizationTable.tsx / ScenarioComparator.tsx
│   │   ├── FAQ.tsx / EnhancedFAQ.tsx
│   │   ├── HistoryPanel.tsx / RelatedCalculators.tsx
│   │   ├── ExportMenu.tsx / LegalNote.tsx / SeoStructuredData.tsx
│   │   ├── SearchBar.tsx / EmptyState.tsx
│   │   ├── Premium* (redesign variants)
│   │   └── index.ts
│   ├── creative/               # Creative/experimental components
│   ├── home/                   # Landing page components
│   ├── layout/                 # Header, Footer, etc.
│   ├── navigation/             # Navigation components
│   ├── redesign/               # Redesign-specific components
│   └── ui/                     # Base UI (Toast, etc.)
├── data/
│   ├── calculators.ts          # 40 calculators catalog
│   └── articles.ts             # Blog articles
├── hooks/
│   ├── useCalculationHistory.ts
│   ├── useFocusTrap.ts
│   ├── useFormattedInput.ts
│   └── useKeyboardShortcuts.ts
├── lib/
│   ├── analytics.ts            # GA4 helpers
│   ├── api/                    # BCentral API integration
│   ├── calculations/           # 40 calculation modules (one .ts per calculator)
│   │   ├── __tests__/          # Vitest tests
│   │   └── [calculator].ts     # Each module exports calculation logic
│   ├── context/ValuesContext.tsx # Global values (UF, UTM, currency)
│   ├── formatters.ts           # CLP currency formatters
│   ├── gsap.ts                 # GSAP animations config
│   ├── hooks/                  # Shared hooks
│   └── values/constants.ts     # Chilean financial constants
└── types/
    ├── calculator.ts           # Calculator type definitions
    └── css.d.ts                # CSS module types
```

## 40 Calculation Modules (lib/calculations/)

**Laboral / Sueldo:**
- sueldo-liquido, finiquito, horas-extra, vacaciones, boleta-honorarios
- gratificacion, indemnizacion, costo-empleado, cotizacion-independientes
- asignacion-familiar, pension-alimenticia, impuestos-segunda-categoria
- ppm, propina-legal, aguinaldo, bono-bodas-oro

**Créditos:**
- credito-hipotecario, credito-automotriz, credito-cae, simulador-apv
- intereses-mora

**Conversores / Valores:**
- uf-clp, utm-clp, conversor-divisas, reajuste-arriendo

**Impuestos / Finanzas:**
- iva, patente-comercial, operacion-renta, plusvalia, contribuciones

**Subsidios / Gastos:**
- subsidio-habitacional, subsidio-agua, permiso-circulacion
- gastos-comunes, cuenta-luz, costo-notaria, costo-tag, multas-transito

**Otros:**
- comparador-afp, pgu

## Code Conventions

- **TypeScript strict** — no `any` unless unavoidable
- **App Router** — server components by default
- **Static generation preferred** — prioritize `next build` static output for AdSense/SEO
- **Calculator pattern**: `src/data/calculators.ts` defines calculator metadata, `src/lib/calculations/` holds the math logic
- **Formatting**: Chilean peso formatting (`$1.000.000`), use `src/lib/formatters.ts`
- **Animations**: Keep them lightweight — Three.js/GSAP only in redesign, not in core calculators
- **Ads**: AdSense components in `src/components/ads/` — do not break ad placement for UX "improvements"
- **Analytics**: GA via `src/components/analytics/GAProvider` and `src/lib/analytics.ts`
- **SEO**: robots.ts + sitemap.ts auto-generated, metadata in layout.tsx
- **Testing**: Vitest, tests in `src/lib/calculations/__tests__/`

## ⚠️ WHAT NOT TO TOUCH

- **NO romper** ad placement — AdSense es la monetización principal
- **NO modificar** las fórmulas de cálculo sin verificar con fuentes oficiales (BCentral, SII, legislación vigente)
- **NO commitear** credenciales de BCentral (`BCENTRAL_USER`, `BCENTRAL_PASS`)
- **NO cambiar** el formato de moneda chilena — usa siempre `formatters.ts`
- **NO eliminar** SEO metadata (robots.ts, sitemap.ts, alternates)
- **NO hardcodear** valores financieros (UF, UTM, IPC) — vienen de `src/lib/values/` o BCentral API
- **NO romper** el sitemap ni robots.ts — SEO es crítico para tráfico orgánico
- **No sobrecargar** calculadoras con animaciones 3D — Three.js/GSAP solo en landing/rediseño

## Calculator Data Structure

Each calculator in `src/data/calculators.ts`:

```typescript
{
  id: string,           // e.g. 'sueldo-liquido'
  name: string,         // Display name: 'Sueldo Líquido 2026'
  description: string,  // Short SEO description
  slug: string,         // URL slug: 'calculadora-sueldo-liquido'
  category: string,     // e.g. 'sueldo', 'credito', 'impuestos'
  featured: boolean,    // Show on homepage
  phase: number,        // Development phase (1 = ready)
  keywords: string[],   // SEO keywords
  inputs: InputDef[],   // Input field definitions (number, select, boolean)
  faq: FAQItem[],       // FAQ for SEO and user help
}
```

## Chilean Financial Values

Managed in `src/lib/values/constants.ts`:
- UF (Unidad de Fomento)
- UTM (Unidad Tributaria Mensual)
- IPC (Índice de Precios al Consumidor)
- Tasa de interés BCentral
- Sueldo mínimo
- Tramos impositivos (segunda categoría)

## Environment Variables

```bash
# Banco Central de Chile API
BCENTRAL_USER=
BCENTRAL_PASS=

# Next.js
NEXT_PUBLIC_SITE_URL=https://calculadorachile.cl
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-4950005977906560
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PHMWEP3S9T
DEBUG=false
```

## Deployment (Vercel)

```bash
npx vercel              # Deploy from CLI
git push origin main    # Auto-deploy (Vercel detects repo)
```

All env vars in **Vercel Dashboard → Settings → Environment Variables**.
Build output: `.next` (standard Next.js)

## SEO / Growth

- Blog (`/blog`) for long-tail keywords
- Guides (`/guias`) for educational content
- FAQ sections on each calculator
- Calculator-specific slugs for search optimization
- Static generation for fast load times
- Structured data for rich snippets
