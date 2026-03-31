# CLAUDE.md — CalculaChile

## Project Overview

CalculaChile (calculachile.cl) — Chilean financial calculator SaaS. 50+ calculators for labor, tax, real estate and financial topics. Monetized via Google AdSense + premium subscription. All calculations run client-side (zero server cost).

Stack: Next.js 16 (App Router), TypeScript strict, Tailwind CSS, Firebase (Auth + Firestore), MercadoPago, Vercel.

## Commands

```bash
npm run dev          # Dev server with Turbopack
npm run build        # Production build
npx tsc --noEmit     # Type-check — RUN BEFORE EVERY COMMIT
```

Deploy: automatic via Vercel on push to `master`.

## Architecture

```
src/
├── app/
│   ├── layout.tsx                # Global layout (header, footer, AdSense)
│   ├── page.tsx                  # Home — grid of all calculators
│   ├── calculadora-[nombre]/     # Each calculator is a folder
│   │   └── page.tsx
│   ├── blog/                     # MDX SEO articles
│   └── premium/                  # Premium plan pages
├── components/
│   ├── ui/                       # Base components (Button, Input, Card)
│   ├── calculator/               # Reusable calculator components
│   │   ├── CalculatorLayout.tsx
│   │   ├── InputField.tsx
│   │   ├── SelectField.tsx
│   │   ├── ResultCard.tsx
│   │   ├── ResultRow.tsx
│   │   └── FAQSection.tsx
│   ├── layout/                   # Header, Footer, Sidebar
│   └── ads/                      # AdSense components
├── lib/
│   ├── calculators/              # Pure calculation logic per calculator
│   │   └── index.ts              # Registry of all calculators
│   ├── values/                   # Updatable official values
│   │   ├── constants.ts          # UF, UTM, minimum wage
│   │   ├── afp-rates.ts          # AFP rates per fund
│   │   └── tax-brackets.ts       # Income tax brackets
│   ├── formatters.ts             # Format CLP, UF, percentages
│   └── seo.ts                    # Metadata and Schema.org helpers
├── data/
│   └── calculators.ts            # Calculator catalog (metadata)
└── types/
    └── calculator.ts             # Shared types
```

### Three-Part Rule per Calculator
Every calculator has 3 SEPARATE parts:
1. **Logic** (`lib/calculators/[name].ts`): Pure function. No React. Testable.
2. **UI** (`app/calculadora-[name]/page.tsx`): React component using reusable calculator components.
3. **SEO Content**: Inside the same page — legal explanation, FAQ, numeric example.

### All Calculations are Client-Side
All calculations execute in the browser (pure JavaScript). NEVER create /api/ endpoints for calculations. The only allowed /api/ routes: `/api/checkout`, `/api/webhook`, `/api/auth`.

### Official Values
ALL annually-changing values go in `lib/values/`. NEVER hardcode UF, UTM, AFP rates, tax brackets, or minimum wage inside a calculator.

## Code Rules

### Language Convention
- Code (variables, functions, components): ENGLISH
- UI content, SEO text, comments: SPANISH (Chile)

### TypeScript
- NEVER use `any`. Always define interfaces for inputs/outputs.
- Absolute imports with `@/` alias.
- Async functions with try/catch. Errors logged with `console.error` only.

### Styling
- Tailwind CSS exclusively. No CSS modules, no styled-components.
- Mobile-first with responsive classes (sm:, md:, lg:).
- Dark mode via `dark:` prefix.
- Chilean number format: dot for thousands, comma for decimals. Example: $1.250.000
- CLP amounts without decimals. UF with 2 decimals.

### Calculator Logic Rules
- Each calculator exports a pure function with JSDoc explaining the formula and legal basis.
- Receives a typed object. Returns a typed object with full result breakdown.
- No side effects, no React dependencies.
- Use `Math.round()` for CLP, 2 decimals for UF.
- Validate ranges: salary >= 0, years 0-50, percentages 0-100.
- Import values from `lib/values/`, never hardcode.
- Always export the main function AND input/output types.

### Calculator UI Rules
- Use components from `components/calculator/` for visual consistency.
- Real-time results on onChange, no "Calculate" button.
- Numeric inputs use `inputMode="numeric"` with real-time formatting.
- Import calculation functions from `lib/calculators/` — never reimplement logic in the component.
- AdSense slots go inside `components/ads/`.

### SEO Rules (MANDATORY per calculator)
Every calculator page MUST include:
1. The interactive calculator
2. How the calculation works in simple language
3. Legal basis: specific law articles cited
4. Real numeric example with concrete CLP values
5. FAQ with minimum 3 questions (FAQPage Schema JSON-LD)
6. Links to related calculators
7. Visible last-updated date

### SEO Technical
- `generateMetadata()` with unique title, description and keywords per calculator.
- Title pattern: keyword + "Chile" + current year (2026).
- Description: 150-160 characters.
- URLs: `/calculadora-[name]` (e.g., `/calculadora-sueldo-liquido`)
- Exactly ONE H1 per page with the primary keyword.
- Dynamic sitemap in `app/sitemap.ts`. Robots in `app/robots.ts`.

### Blog Articles
- MDX format with gray-matter frontmatter.
- Minimum 800 words per article.
- Simple language, like explaining to a friend.
- Cite official sources: SII, DT, BCN, Superintendencia de Pensiones.
- Each article links to the corresponding calculator.
- Each calculator links to related articles and calculators.

### Git and Deploy
- Main branch: `master`. Vercel auto-deploys on push.
- Verify `npx tsc --noEmit` passes before every push.
- Commit format: `tipo: descripción breve` (types: feat, fix, refactor, seo, blog, security, config, style).

## What NOT to Do
- Don't use `any` in TypeScript.
- Don't create /api/ endpoints for calculations (everything client-side).
- Don't hardcode annually-changing values (UF, UTM, brackets, AFP rates).
- Don't use remark-gfm or rehype plugins (incompatible with Turbopack).
- Don't use `console.log` in production.
- Don't install unnecessary dependencies.
- Don't commit `.env.local` or API keys.
