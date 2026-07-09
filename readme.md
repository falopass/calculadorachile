<div align="center">

# 🇨🇱 CalculaChile

**Calculadoras laborales, tributarias y financieras para Chile**

39 calculadoras activas · valores oficiales 2026 · SEO / AdSense / YMYL

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![AdSense](https://img.shields.io/badge/Monetization-AdSense-4285f4?style=for-the-badge&logo=google-ads&logoColor=white)](https://adsense.google.com)
[![Vitest](https://img.shields.io/badge/Tests-Vitest-6e9f18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev)

**[🌐 calculadorachile.cl](https://calculadorachile.cl)**
· [📚 Blog](https://calculadorachile.cl/blog)
· [📖 Guías](https://calculadorachile.cl/guias)
· [📊 Comparador AFP](https://calculadorachile.cl/calculadoras/calculadora-comparador-afp)

</div>

---

## Qué es

**CalculaChile** es una plataforma web chilena de calculadoras laborales, tributarias, previsionales y financieras. Es un producto **YMYL** (Your Money / Your Life): un error en una fórmula, monto o fuente puede afectar decisiones económicas reales.

Prioridad del producto:

1. **Confiabilidad** de cálculos con base legal/oficial.
2. **SEO orgánico** y señales E-E-A-T.
3. **Monetización AdSense** sin romper UX ni confianza.
4. **Ship rápido y bajo costo** (stack liviano, sin dependencias de relleno).

Sitio en producción: [calculadorachile.cl](https://calculadorachile.cl).

---

## Estado del catálogo

| Pieza | Cantidad |
|-------|----------|
| Calculadoras activas | **39** (`src/data/calculators.ts`) |
| Módulos de cálculo + tests | **40** (incluye histórico `bono-bodas-oro`) |
| Guías pillar | **12** |
| Artículos de blog | **15** |
| Categorías | **12** |
| `noIndex` (fuera del índice) | **8** calculadoras delgadas |

`bono-bodas-oro` está **retirado del catálogo público**: la ruta responde **410 Gone**. No reactivarlo sin fórmula verificada y aprobación explícita.

### Phase 1 — Core (15)

| Calculadora | URL |
|-------------|-----|
| Sueldo líquido | `/calculadoras/calculadora-sueldo-liquido` |
| Finiquito | `/calculadoras/calculadora-finiquito` |
| UF ↔ CLP | `/calculadoras/calculadora-uf-clp` |
| IVA | `/calculadoras/calculadora-iva` |
| Horas extra | `/calculadoras/calculadora-horas-extra` |
| Vacaciones proporcionales | `/calculadoras/calculadora-vacaciones-proporcionales` |
| Boleta de honorarios | `/calculadoras/calculadora-boleta-honorarios` |
| UTM ↔ CLP | `/calculadoras/calculadora-utm-clp` |
| Gratificación legal | `/calculadoras/calculadora-gratificacion-legal` |
| Indemnización por años de servicio | `/calculadoras/calculadora-indemnizacion-anos-servicio` |
| Pensión alimenticia | `/calculadoras/calculadora-pension-alimenticia` |
| Reajuste de arriendo | `/calculadoras/calculadora-reajuste-arriendo` |
| Permiso de circulación | `/calculadoras/calculadora-permiso-circulacion` |
| Costo empleado PYME | `/calculadoras/calculadora-costo-empleado-pyme` |
| Crédito hipotecario | `/calculadoras/calculadora-credito-hipotecario` |

### Phase 2 — Nicho (15)

Operación Renta, contribuciones, notaría, plusvalía, subsidio habitacional, patente comercial, comparador AFP, APV, intereses por mora, asignación familiar, CAE, crédito automotriz, multas de tránsito, costo TAG (`noIndex`), cuenta de luz.

### Phase 3 — Complementarias (9)

Impuesto 2ª categoría, PPM, y varias con `noIndex`: subsidio agua, cotización independientes, propina legal, gastos comunes, conversor divisas, aguinaldo, PGU.

---

## Características reales

| Feature | Descripción |
|---------|-------------|
| 🧮 **39 calculadoras** | Laborales, impuestos, vivienda, vehículos, pensiones, hogar, etc. |
| ⚡ **Valores en vivo** | UF, UTM, dólar y euro vía `/api/values` (BCentral → Mindicador → fallback) |
| 📈 **Gráficos SVG** | Amortización, proyecciones y comparaciones donde aplica |
| 💾 **Export / historial** | Export de resultados e historial local en calculadoras premium |
| 🔍 **SEO YMYL** | Metadata, sitemaps segmentados, JSON-LD, FAQ, fuentes oficiales, disclaimers |
| 📱 **Mobile-first** | Light-only, Geist Sans/Mono, accesibilidad básica |
| 💰 **AdSense + GA4** | Monetización y analítica de producción |

**No forman parte del stack:** Three.js, React Three Fiber, GSAP, Lenis, dark mode.

---

## Stack

| Tecnología | Uso |
|------------|-----|
| **Next.js 15** (App Router) | Framework y rutas |
| **React 19** + **TypeScript 5** | UI tipada |
| **Tailwind CSS 3** | Estilos (light-only) |
| **Framer Motion 12** | Microinteracciones |
| **Lucide React** | Íconos |
| **Vitest 3** + jsdom | Tests de fórmulas |
| **canvas** (dev) | OG images server-side donde aplica |
| **Vercel** | Deploy |

Verifica siempre `package.json` antes de asumir versiones.

---

## Arquitectura

```text
src/
├── app/
│   ├── api/values/              # UF, UTM, dólar, euro
│   ├── calculadoras/[slug]/    # páginas de calculadoras
│   ├── blog/ · guias/ · categoria/
│   ├── sitemap*.xml/            # sitemaps segmentados
│   └── layout.tsx               # fuentes, AdSense, JSON-LD global
├── components/
│   ├── calculator/              # shell premium, FAQ, results, sources
│   ├── ads/ · analytics/ · seo/
│   └── DisclaimerYMYL.tsx
├── data/
│   ├── calculators.ts           # catálogo activo (39)
│   ├── articles.ts · guias.ts
│   └── seo-overrides.ts         # titles/descriptions CTR
├── lib/
│   ├── calculations/            # lógica pura + __tests__/
│   ├── api/                     # BCentral, Mindicador
│   ├── values/                  # constants, fallback, snapshots
│   ├── seo/                     # schema, metadata, sitemaps, author
│   └── formatters.ts            # CLP / UF / UTM chilenos
└── types/calculator.ts          # contratos compartidos
```

### Patrón de una calculadora activa

1. **Catálogo** — `src/data/calculators.ts` (`id`, `slug`, inputs, FAQ, sources, `lastReviewed`, …).
2. **Lógica pura** — `src/lib/calculations/<modulo>.ts` + `*ToResults`.
3. **Wiring UI** — `calculationFunctions[calculator.id]` en `CalculatorPageClient.tsx`.
4. **Test** — `src/lib/calculations/__tests__/<modulo>.test.ts`.

La clave de ejecución es `calculator.id` (no el nombre del archivo). El `slug` define la URL pública: **no cambiar sin plan SEO**.

---

## Valores económicos

```text
GET /api/values  →  BCentral → Mindicador → fallback local
```

- Cache: `revalidate = 3600`, `s-maxage=3600, stale-while-revalidate=86400`.
- Snapshot diario vía GitHub Action (`.github/workflows/update-values.yml` + `scripts/update-values.mjs`).
- Constantes legales (AFP, topes, tramos, ingreso mínimo) en `src/lib/values/constants.ts`.

No hardcodear UF/UTM/dólar/tasas en componentes.

---

## Comandos

```bash
npm install
npm run dev             # http://localhost:3000
npm run build
npm start
npm run lint
npm run typecheck
npm run format:check
npm test                # Vitest watch
npm run test:run        # una pasada
npm run test:coverage
```

---

## Variables de entorno

```bash
# Banco Central (opcional; sin ellas se usa Mindicador/fallback)
BCENTRAL_USER=
BCENTRAL_PASS=

NEXT_PUBLIC_SITE_URL=https://calculadorachile.cl
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=
DEBUG=false
```

Secretos de producción solo en **Vercel Dashboard**. No commitear `.env` ni credenciales.

En dev/staging, el publisher placeholder `ca-pub-XXXXXXX` desactiva la carga real de AdSense; no “arreglarlo”.

---

## SEO, YMYL y AdSense

- Overrides de title/description: `src/data/seo-overrides.ts`.
- Schema.org: `src/lib/seo/schema.ts` (Organization, WebSite, FAQ, HowTo, SoftwareApplication, Article, Breadcrumbs, …).
- **No** usar `LocalBusiness`: es plataforma web nacional, no local físico.
- Disclaimers YMYL, fuentes oficiales y autoría forman parte del producto.
- Regla de oro: **sin fuente oficial verificada, no se cambia una fórmula** (SII, DT, BCentral, Superintendencia de Pensiones, CMF, IPS, MINVU, BCN/Ley Chile, etc.).

---

## Desarrollo con Grok Build (Grok 4.5)

| Doc | Rol |
|-----|-----|
| [`AGENTS.md`](./AGENTS.md) | Constitución del producto |
| [`docs/PRODUCT_CONTEXT.md`](./docs/PRODUCT_CONTEXT.md) | Snapshot vivo (P0, números, anti-objetivos) |
| [`docs/GROK_BUILD.md`](./docs/GROK_BUILD.md) | Cómo trabajar en el TUI |
| [`.grok/`](./.grok/) | Skills, slash, rules, hooks |

```powershell
cd C:\code\SaaS2\CalculaChile
grok
# primera vez: /hooks-trust
# /p0-wiring  |  /ymyl-audit  |  /ship-check
```

Config usuario: `~/.grok/config.toml` con `models.default = "grok-build"`, memory on, skills pyme deshabilitadas.

---

## Qué no tocar sin aprobación

- Fórmulas, topes o tasas sin fuente oficial.
- Slugs, canonicals, redirects, 410, robots, sitemaps.
- Placements de AdSense y structured data YMYL.
- Reactivar `bono-bodas-oro`.
- Dark mode o dependencias 3D/GSAP/Lenis.
- Formato de moneda chilena fuera de `formatters.ts`.
- Secretos o credenciales.

---

## Deploy

**Vercel**, deploy automático desde `main`. Valores del Banco Central cacheados en edge/API. AdSense se carga de forma async para no bloquear Core Web Vitals.

---

## Autor

Construido y mantenido por **Diego Bravo Opazo** — [GitHub](https://github.com/falopass).

**Live:** [calculadorachile.cl](https://calculadorachile.cl)

---

<details>
<summary><b>English overview</b></summary>

<br>

CalculaChile is a production Chilean platform with **39 active calculators** for salaries, taxes, pensions, housing, vehicles and household costs. Live economic indicators (UF, UTM, USD, EUR) come from the Central Bank / Mindicador with local fallback.

Stack: **Next.js 15, React 19, TypeScript 5, Tailwind 3, Framer Motion, Vitest**. Monetization: **Google AdSense**. Deploy: **Vercel**.

This is a **YMYL** product: formulas require verified official sources. See `AGENTS.md` for contributor/agent rules.

</details>
