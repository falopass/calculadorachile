<div align="center">

# CalculaChile

### Calculadoras laborales, tributarias y financieras para Chile

**39 calculadoras activas** · valores oficiales en vivo · SEO orgánico · AdSense · vertical **YMYL**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vitest](https://img.shields.io/badge/Vitest-3-6e9f18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

**Sitio en producción:** [calculadorachile.cl](https://calculadorachile.cl)

[Blog](https://calculadorachile.cl/blog)
· [Guías](https://calculadorachile.cl/guias)
· [Sueldo líquido](https://calculadorachile.cl/calculadoras/calculadora-sueldo-liquido)
· [IVA](https://calculadorachile.cl/calculadoras/calculadora-iva)
· [Finiquito](https://calculadorachile.cl/calculadoras/calculadora-finiquito)

</div>

---

## Tabla de contenidos

- [Qué es](#qué-es)
- [Estado del catálogo](#estado-del-catálogo)
- [Características](#características)
- [Stack](#stack)
- [Inicio rápido](#inicio-rápido)
- [Comandos](#comandos)
- [Arquitectura](#arquitectura)
- [Patrón de calculadoras](#patrón-de-calculadoras)
- [Valores económicos](#valores-económicos)
- [SEO, YMYL y AdSense](#seo-ymyl-y-adsense)
- [Contenido editorial](#contenido-editorial)
- [Variables de entorno](#variables-de-entorno)
- [CI / GitHub Actions](#ci--github-actions)
- [Documentación del repo](#documentación-del-repo)
- [Validación por tipo de cambio](#validación-por-tipo-de-cambio)
- [Qué no tocar sin aprobación](#qué-no-tocar-sin-aprobación)
- [Deploy](#deploy)
- [Autor](#autor)
- [English overview](#english-overview)

---

## Qué es

**CalculaChile** es una plataforma web chilena de **calculadoras + contenido** (laboral, tributario, previsional, financiero, vivienda, vehículos).

Es un producto **YMYL** (*Your Money / Your Life*): un error en una fórmula, un tope o una fuente puede afectar decisiones económicas reales y dañar confianza y ranking.

| Prioridad | Qué significa en la práctica |
|-----------|------------------------------|
| 1. Confiabilidad | UI = adapter = módulo; fuentes oficiales; tests |
| 2. SEO orgánico | URLs estables, metadata, schema, E-E-A-T |
| 3. AdSense | Pageviews de calidad; no mover placements por estética |
| 4. Ship barato | Stack liviano; sin dependencias “por si acaso” |

**No es:** e-commerce, SaaS con login, negocio local ni web de pyme (sin `LocalBusiness`, sin CTA de WhatsApp/barrio).

---

## Estado del catálogo

| Pieza | Cantidad | Ubicación |
|-------|----------|-----------|
| Calculadoras **activas** | **39** | `src/data/calculators.ts` |
| Módulos de cálculo + tests | **40** | `src/lib/calculations/` (+ histórico `bono-bodas-oro`) |
| Guías pillar | **12** | `src/data/guias.ts` |
| Artículos de blog | **19** | `src/data/articles.ts` |
| Categorías canónicas | **12** | `src/lib/calculatorCategories.ts` |
| Calculadoras `noIndex` | **8** | thin content en cuarentena SEO |

`bono-bodas-oro` está **fuera del catálogo público**: la ruta responde **410 Gone**. No reactivarlo sin fórmula verificada y aprobación explícita.

### Phase 1 — Core (15)

| Calculadora | Ruta |
|-------------|------|
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

Operación Renta, contribuciones, notaría, plusvalía, subsidio habitacional, patente comercial, comparador AFP, APV, intereses por mora, asignación familiar, CAE, crédito automotriz, multas de tránsito, **costo TAG** (`noIndex`), cuenta de luz.

### Phase 3 — Complementarias (9)

Impuesto 2.ª categoría, PPM, y con `noIndex`: subsidio agua, cotización independientes, propina legal, gastos comunes, conversor divisas, aguinaldo, PGU.

### Categorías (12)

`sueldo` · `impuestos` · `beneficios` · `conversiones` · `familia` · `vivienda` · `vehiculos` · `empresas` · `servicios` · `pension` · `educacion` · `hogar`

---

## Características

| | Feature | Detalle |
|---|---------|---------|
| 🧮 | **39 calculadoras** | Laborales, impuestos, vivienda, vehículos, pensiones, hogar |
| ⚡ | **Valores en vivo** | UF, UTM, dólar, euro vía `GET /api/values` |
| 🧩 | **Code-split de cálculo** | Carga dinámica por `calculator.id` (`load-calculator.ts`) |
| 🛡️ | **Inputs honestos** | Coerción central (`input-coerce.ts`); meta: 0 inputs fantasma |
| 📈 | **Gráficos SVG** | Amortización / desgloses donde el módulo lo soporta |
| 🔍 | **SEO YMYL** | Metadata, `seo-overrides`, sitemaps, JSON-LD, FAQ, fuentes |
| 📱 | **Mobile-first** | Light-only, Geist Sans/Mono, overflow controlado |
| 💰 | **AdSense + GA4** | Monetización y analítica de producción |
| 📰 | **Blog + guías** | Contenido estacional y pillar con CTA a calculadoras |

**Fuera de scope del stack:** Three.js, React Three Fiber, GSAP, Lenis, dark mode.

---

## Stack

Verifica siempre `package.json` antes de asumir versiones.

| Capa | Tecnología |
|------|------------|
| Framework | **Next.js 15** (App Router) |
| UI | **React 19**, **TypeScript 5** |
| Estilos | **Tailwind CSS 3** (modo light-only) |
| Animación | **Framer Motion 12** (microinteracciones) |
| Íconos | **Lucide React** |
| Tests | **Vitest 3** + jsdom |
| OG / canvas | `canvas` (devDependency, server-side donde aplica) |
| Deploy | **Vercel** |

---

## Inicio rápido

```bash
# Requisitos: Node 20+ recomendado (CI usa Node 22)
git clone https://github.com/falopass/calculadorachile.git
cd calculadorachile
npm install
npm run dev
# → http://localhost:3000
```

Sin credenciales del Banco Central el sitio funciona con **Mindicador** y **fallback local**.

---

## Comandos

```bash
npm run dev              # desarrollo
npm run build            # build de producción
npm start                # servir build
npm run lint             # ESLint
npm run lint:fix        # ESLint --fix
npm run typecheck        # tsc --noEmit
npm run format           # Prettier write
npm run format:check     # Prettier check
npm test                 # Vitest watch
npm run test:run         # Vitest una pasada
npm run test:coverage    # coverage

# Matriz catálogo ↔ adapter (YMYL)
node scripts/audit-ymyl-matrix.mjs

# Snapshot UF/UTM/divisas (también corre en GitHub Actions)
node scripts/update-values.mjs
```

---

## Arquitectura

```text
src/
├── app/
│   ├── api/values/                 # UF, UTM, dólar, euro
│   ├── calculadoras/[slug]/       # páginas de calculadoras
│   ├── blog/ · guias/ · categoria/ · buscar/
│   ├── sitemap*.xml/               # sitemaps segmentados
│   ├── robots.ts
│   └── layout.tsx                  # fuentes, AdSense, JSON-LD global
├── components/
│   ├── calculator/                 # shell, inputs, results, FAQ
│   ├── home/                       # hero, popular, catálogo
│   ├── ads/ · analytics/ · seo/
│   ├── search/                     # SiteSearch
│   └── DisclaimerYMYL.tsx
├── data/
│   ├── calculators.ts              # catálogo activo (39)
│   ├── articles.ts · guias.ts
│   └── seo-overrides.ts            # titles/descriptions CTR
├── lib/
│   ├── calculations/               # lógica pura + __tests__/
│   │   ├── input-coerce.ts
│   │   └── load-calculator.ts      # dynamic import por id
│   ├── api/                        # BCentral, Mindicador
│   ├── values/                     # constants, fallback, snapshot
│   ├── seo/                        # schema, metadata, related, sitemaps
│   ├── formatters.ts               # CLP / UF / UTM chilenos
│   └── context/ValuesContext.tsx
└── types/calculator.ts

docs/                               # producto, auditorías, plan editorial
docs/research/                      # dossier YMYL + inventario SEO + deep research
scripts/                            # audit-ymyl-matrix, update-values
.github/workflows/                  # snapshot diario de valores
```

### Flujo de datos (valores)

```text
Cliente / SSR
    ↓
GET /api/values
    ↓
BCentral  →  Mindicador  →  fallback (snapshot.json / constants)
    ↓
ValuesContext / useLiveValues  →  calculadoras (valorUF/UTM opcional)
```

Cache: `revalidate = 3600` y headers `s-maxage=3600, stale-while-revalidate=86400`.

---

## Patrón de calculadoras

Una calculadora activa se arma en **cuatro piezas** unidas por `calculator.id`:

| # | Pieza | Archivo |
|---|--------|---------|
| 1 | **Catálogo** | `src/data/calculators.ts` — `id`, `slug`, inputs, FAQ, sources, `phase`, `noIndex`… |
| 2 | **Lógica pura** | `src/lib/calculations/<modulo>.ts` + `*ToResults` |
| 3 | **Loader / adapter** | `src/lib/calculations/load-calculator.ts` (code-split) |
| 4 | **Test** | `src/lib/calculations/__tests__/<modulo>.test.ts` |

- La clave de ejecución es **`calculator.id`**, no el nombre del archivo.
- El **`slug` define la URL pública**: no cambiar sin plan SEO (rompe tráfico indexado).
- Inputs del catálogo deben ser los que el adapter realmente usa (**cero fantasmas**).
- Formato de pesos chilenos siempre vía `src/lib/formatters.ts` (`$1.000.000`).

---

## Valores económicos

| Concepto | Dónde |
|----------|--------|
| Endpoint | `GET /api/values` |
| Snapshot versionado | `src/lib/values/snapshot.json` |
| Constantes legales | `src/lib/values/constants.ts` |
| Fallback runtime | `src/lib/values/fallback.ts` |
| Job diario | `.github/workflows/update-values.yml` → `scripts/update-values.mjs` |

**No hardcodear** UF, UTM, dólar, topes o tasas en componentes de UI.

Credenciales BCentral (`BCENTRAL_USER`, `BCENTRAL_PASS`) solo en Vercel / secrets de GitHub Actions. El repo debe funcionar sin ellas.

---

## SEO, YMYL y AdSense

### SEO

| Tema | Ubicación |
|------|-----------|
| Metadata base | `src/lib/seo/metadata.ts`, `src/app/layout.tsx` |
| Overrides CTR | **`src/data/seo-overrides.ts`** (canónico para title/description) |
| Schema.org | `src/lib/seo/schema.ts` — Organization, Person, WebSite, FAQ, HowTo, SoftwareApplication, Article, Breadcrumbs… |
| Sitemaps | `src/app/sitemap*.xml/route.ts` + `src/lib/seo/sitemap-helpers.ts` |
| Related calcs | `src/lib/seo/related-calculators.ts` |
| Plan de contenidos | [`docs/plan-editorial-integrado-2026-h2-2027-h1.md`](./docs/plan-editorial-integrado-2026-h2-2027-h1.md) |

**No** usar `LocalBusiness`: es plataforma web nacional.

### YMYL

Regla de oro: **sin fuente oficial verificada, no se cambia una fórmula.**

Fuentes típicas: Banco Central, SII, Dirección del Trabajo, Superintendencia de Pensiones, CMF, IPS/ChileAtiende, MINVU, BCN/Ley Chile.

```bash
node scripts/audit-ymyl-matrix.mjs   # catálogo ↔ adapter ↔ módulo
```

Informe de referencia: [`docs/auditoria-ymyl-2026-07.md`](./docs/auditoria-ymyl-2026-07.md).

### AdSense

- Script global en `src/app/layout.tsx`; componentes en `src/components/ads/`.
- En dev, `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXX` **desactiva** la carga real: no “arreglar” el placeholder.
- No mover ni ocultar placements por rediseño visual sin decisión explícita.

---

## Contenido editorial

| Doc | Rol |
|-----|-----|
| [`docs/plan-editorial-integrado-2026-h2-2027-h1.md`](./docs/plan-editorial-integrado-2026-h2-2027-h1.md) | **Plan operativo** (publicados + pendientes P1/P2/P3) |
| [`docs/plan-editorial-seo-2026-h2-2027-h1.md`](./docs/plan-editorial-seo-2026-h2-2027-h1.md) | Histórico / outlines (SUPERSEDED) |
| [`docs/research/`](./docs/research/) | Dossier YMYL, inventario SEO, deep research (30 dossiers) |

Código de blog: `src/data/articles.ts` → URL `/blog/{slug}`.

---

## Variables de entorno

```bash
# Banco Central de Chile (opcional)
BCENTRAL_USER=
BCENTRAL_PASS=

# Públicos
NEXT_PUBLIC_SITE_URL=https://calculadorachile.cl
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=

DEBUG=false
```

| Variable | Notas |
|----------|--------|
| `BCENTRAL_*` | Solo server / Actions. Sin ellas → Mindicador + fallback |
| `NEXT_PUBLIC_SITE_URL` | Canonical y sitemaps |
| `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` | Placeholder `ca-pub-XXXXXXX` = sin ads reales |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 |

Secretos de producción: **Vercel Dashboard** y **GitHub Secrets** (workflow de valores). Nunca commitear `.env`.

---

## CI / GitHub Actions

| Workflow | Archivo | Qué hace |
|----------|---------|----------|
| Actualizar valores oficiales | [`.github/workflows/update-values.yml`](./.github/workflows/update-values.yml) | Diario ~12:30 UTC: corre `update-values.mjs` y, si cambió, commit de `snapshot.json` |

Commit típico del bot: `chore(values): actualizar snapshot diario [skip ci]`.

---

## Documentación del repo

| Documento | Contenido |
|-----------|-----------|
| [`AGENTS.md`](./AGENTS.md) | Constitución del producto para humanos y agentes |
| [`docs/PRODUCT_CONTEXT.md`](./docs/PRODUCT_CONTEXT.md) | Snapshot vivo (números, P0, anti-objetivos) |
| [`docs/GROK_BUILD.md`](./docs/GROK_BUILD.md) | Cómo trabajar el repo en Grok Build |
| [`docs/auditoria-ymyl-2026-07.md`](./docs/auditoria-ymyl-2026-07.md) | Auditoría YMYL |
| [`docs/auditoria-codigo-estructura.md`](./docs/auditoria-codigo-estructura.md) | Estructura / bundle |
| [`docs/plan-editorial-integrado-2026-h2-2027-h1.md`](./docs/plan-editorial-integrado-2026-h2-2027-h1.md) | Backlog de contenidos |
| [`docs/research/`](./docs/research/) | Research y dossiers |

### Carpetas locales de agentes (no van al remoto)

Estas rutas están en **`.gitignore`** (herramientas locales; no se suben a GitHub):

```text
.agents/     # skills espejo (OpenCode / agentes)
.grok/       # skills, slash, rules, hooks (Grok Build)
.opencode/   # config de proyecto OpenCode
opencode.json
```

La constitución versionada del producto es **`AGENTS.md`**, no esas carpetas.

---

## Validación por tipo de cambio

| Cambio | Validación mínima |
|--------|-------------------|
| Fórmula de cálculo | Test en `__tests__/` + `npm run typecheck` |
| Nueva calculadora | Test + loader/wiring + `typecheck` + `build` |
| Catálogo / categorías / rutas | `typecheck` + `build` |
| SEO (metadata, schema, sitemap) | `typecheck` + `build` |
| `/api/values` o datos externos | `typecheck` + prueba del endpoint |
| UI / componente | `typecheck` + revisión mobile |
| Solo docs | Lectura del archivo y referencias cruzadas |

Si la validación falla, se corrige y se vuelve a ejecutar. No entregar “debería pasar”.

---

## Qué no tocar sin aprobación

- Fórmulas, topes, tasas o constantes financieras **sin fuente oficial verificada**.
- Slugs, URLs públicas, canonicals, redirects, **410**, robots o sitemaps.
- Script / placements de **AdSense**.
- Structured data YMYL (Organization, FAQ, HowTo, SoftwareApplication, etc.).
- Reactivar **`bono-bodas-oro`**.
- **Dark mode** o dependencias 3D / GSAP / Lenis no instaladas.
- Formato de moneda chilena fuera de `formatters.ts`.
- Secretos o credenciales.

---

## Deploy

- **Vercel**, deploy automático desde `main`.
- Valores económicos: API + snapshot diario por Actions.
- AdSense async para no bloquear Core Web Vitals.
- Dominio canónico: **apex** `calculadorachile.cl` (www redirige).

---

## Autor

Mantenido por **Diego Bravo Opazo** — [GitHub @falopass](https://github.com/falopass).

**Live:** [https://calculadorachile.cl](https://calculadorachile.cl)

---

## English overview

<details>
<summary><b>Expand English overview</b></summary>

<br>

**CalculaChile** (`calculadorachile.cl`) is a production Chilean platform with **39 active calculators** for salaries, taxes, pensions, housing, vehicles and household costs, plus guides and a blog. Live indicators (UF, UTM, USD, EUR) come from the Central Bank / Mindicador with a local snapshot fallback.

Stack: **Next.js 15 (App Router), React 19, TypeScript 5, Tailwind 3, Framer Motion, Vitest**. Monetization: **Google AdSense**. Deploy: **Vercel**.

This is a **YMYL** product: formula changes require verified official sources (SII, Labour Directorate, Central Bank, Pension Superintendence, etc.). Catalog inputs must match what the calculation adapter actually uses (no “phantom” fields).

Contributor and agent rules: [`AGENTS.md`](./AGENTS.md). Editorial backlog: [`docs/plan-editorial-integrado-2026-h2-2027-h1.md`](./docs/plan-editorial-integrado-2026-h2-2027-h1.md). Local agent tooling folders (`.agents/`, `.grok/`, `.opencode/`) are **gitignored**.

</details>

---

<div align="center">

**[calculadorachile.cl](https://calculadorachile.cl)** · confiable · chileno · open for contributions that respect YMYL

</div>
