# AGENTS.md — CalculaChile (calculadorachile)

> AI agents and developers: Read this BEFORE making changes to this codebase.

## What is this?

**CalculaChile** — 47 calculadoras financieras y laborales de Chile. Next.js estático con AdSense, deploy Vercel. Prioridad: ship rápido, bajo costo.
Domain: `calculadorachile.cl`

## Stack

- **Framework**: Next.js 15.x (App Router)
- **UI**: React 19 + TypeScript 5.x + Tailwind CSS 3.x
- **Animations**: Framer Motion 12.x + GSAP 3.x + Three.js 183 (cinematic redesign)
- **Smooth Scroll**: Lenis (@studio-freight/lenis)
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
│   ├── calculator/             # Calculator UI components
│   ├── creative/               # Creative/experimental components
│   ├── home/                   # Landing page components
│   ├── layout/                 # Header, Footer, etc.
│   ├── navigation/             # Navigation components
│   ├── redesign/               # Redesign-specific components
│   └── ui/                     # Base UI components (Toast, etc.)
├── data/
│   ├── calculators.ts          # Calculator catalog (47 calculators)
│   └── articles.ts             # Blog articles
├── hooks/
│   ├── useCalculationHistory.ts
│   ├── useFocusTrap.ts
│   ├── useFormattedInput.ts
│   └── useKeyboardShortcuts.ts
├── lib/
│   ├── analytics.ts            # GA4 analytics helpers
│   ├── api/                    # External API integrations (BCentral)
│   ├── calculations/           # Calculation logic (one per calculator)
│   ├── context/
│   │   └── ValuesContext.tsx   # Global values provider (UF, currency, etc.)
│   ├── formatters.ts           # Currency/number formatters
│   ├── gsap.ts                 # GSAP animations config
│   ├── hooks/                  # Shared hooks
│   └── values/                 # Chilean financial values (UF, UTM, etc.)
└── types/
    ├── calculator.ts           # Calculator type definitions
    └── css.d.ts                # CSS module types
```

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

## ⚠️ WHAT NOT TO TOUCH

- **NO romper** ad placement — AdSense es la monetización principal
- **NO modificar** las fórmulas de cálculo sin verificar con fuentes oficiales (BCentral, SII, legislation)
- **NO commitear** credenciales de BCentral (`BCENTRAL_USER`, `BCENTRAL_PASS`)
- **NO cambiar** el formato de moneda chilena — usa siempre `formatters.ts`
- **NO eliminar** SEO metadata (robots, sitemap, alternates)
- **NO hardcodear** valores financieros (UF, UTM, IPC) — vienen de `src/lib/values/` o BCentral API
- **NO romper** el sitemap ni robots.ts — SEO es crítico para tráfico orgánico
- **No sobrecargar** calculadores con animaciones 3D — Three.js/GSAP solo en landing/rediseño

## Calculator Data Structure

Each calculator in `src/data/calculators.ts`:
```typescript
{
  id: string,           // e.g. 'sueldo-liquido'
  name: string,         // Display name
  description: string,  // Short description
  slug: string,         // URL slug
  category: string,     // e.g. 'sueldo', 'credito', 'impuestos'
  featured: boolean,    // Show on homepage
  phase: number,        // Development phase
  keywords: string[],   // SEO keywords
  inputs: InputDef[],   // Input field definitions
  faq: FAQItem[],       // FAQ for SEO
}
```

## Chilean Financial Values

Managed in `src/lib/values/`:
- UF (Unidad de Fomento)
- UTM (Unidad Tributaria Mensual)
- IPC (Índice de Precios al Consumidor)
- Tasa de interés BCentral
- Sueldo mínimo
- Tramos impositivos (segunda categoría)

## Environment Variables

```
BCENTRAL_USER=                    # Banco Central API user
BCENTRAL_PASS=                    # Banco Central API password
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
