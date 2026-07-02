<div align="center">

# 🇨🇱 CalculaChile

**Chile's most complete calculator platform**

40+ financial, tax, and legal calculators — updated with 2026 values from the Central Bank of Chile.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![AdSense](https://img.shields.io/badge/Monetization-AdSense-4285f4?style=for-the-badge&logo=google-ads&logoColor=white)](https://adsense.google.com)
[![Vitest](https://img.shields.io/badge/Tests-Vitest-6e9f18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev)

**[🌐 Live at calculadorachile.cl](https://calculadorachile.cl)**  ·  [📚 Blog](https://calculadorachile.cl/blog)  ·  [📊 AFP Comparator](https://calculadorachile.cl/calculadoras/comparador-afp)

</div>

---

## 📖 Overview

CalculaChile is a production platform serving **40+ financial and legal calculators tailored specifically for Chile**. From liquid salary and severance calculations to mortgage simulations, government subsidies, and traffic fines — everything a Chilean citizen or business needs to make informed financial decisions.

Built with performance, accessibility, and SEO as first-class concerns. Live values are fetched from the **Central Bank of Chile API** (UF, UTM, USD, EUR).

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🧮 **40+ Calculators** | Salary, mortgage, tax, AFP comparison, subsidies, and more |
| 📈 **Interactive SVG Charts** | Real-time amortization, projections, comparisons |
| 💾 **PNG Export** | Download results to share or archive |
| 🔄 **Scenario Comparator** | Compare up to 3 scenarios side by side (e.g., different AFPs) |
| 📜 **Calculation History** | Local storage of past calculations for quick access |
| ⚡ **Live Values** | UF, UTM, USD, EUR from Banco Central de Chile |
| 📱 **Fully Responsive** | Works on mobile, tablet, desktop |
| ♿ **WCAG 2.1 AA** | Keyboard navigation, screen reader support |
| 🔍 **SEO-Optimized** | Schema.org, meta tags, structured content |
| 🎨 **Immersive UI** | Framer Motion, GSAP, Three.js, Lenis smooth scroll |

---

## 📊 Calculator Catalog

### Core Set (Phase 1) — 15 calculators

| Calculator | Path |
|------------|------|
| Liquid Salary | `/calculadoras/sueldo-liquido` |
| Fee Invoice (Boleta de Honorarios) | `/calculadoras/boleta-honorarios` |
| Vacation Days | `/calculadoras/vacaciones` |
| Severance (Finiquito) | `/calculadoras/finiquito` |
| Indemnization | `/calculadoras/indemnizacion` |
| Overtime | `/calculadoras/horas-extra` |
| Gratification | `/calculadoras/gratificacion` |
| Family Allowance | `/calculadoras/asignacion-familiar` |
| Christmas Bonus | `/calculadoras/aguinaldo` |
| Child Support | `/calculadoras/pension-alimenticia` |
| Mortgage Credit | `/calculadoras/credito-hipotecario` |
| Auto Loan | `/calculadoras/credito-automotriz` |
| Student Loan (CAE) | `/calculadoras/credito-cae` |
| AFP Comparator | `/calculadoras/comparador-afp` |
| UF to CLP | `/calculadoras/uf-clp` |

### Niche Set (Phase 2) — 15 specialized calculators

Tax calculations (IVA, Impuesto Segunda Categoría, PPM), government subsidies (PGU, Bono Bodas de Oro, Subsidio Habitacional, Subsidio Agua), business operations (Costo Empleado, Patente Comercial, Contribuciones), and transit (Permiso Circulación, Costo TAG).

### Additional Set (Phase 3) — 10+ complementary tools

Traffic fines, utility bills, common expenses, rent adjustments, currency conversion, tip legality, and more.

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=next.js) | 15.2.4 | React framework with App Router |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178c6?logo=typescript) | 5.x | Type safety |
| ![Tailwind](https://img.shields.io/badge/-Tailwind-38bdf8?logo=tailwind-css) | 3.4 | Utility-first styling |
| ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055ff?logo=framer) | 12.38 | Animations |
| ![Three.js](https://img.shields.io/badge/-Three.js-000000?logo=three.js) | 0.183 | 3D graphics |
| ![R3F](https://img.shields.io/badge/-R3F-000000?logo=react) | 9.5 | Three.js for React |
| ![GSAP](https://img.shields.io/badge/-GSAP-88ce02?logo=gsap) | 3.14 | Advanced animations |
| ![Lenis](https://img.shields.io/badge/-Lenis-1a1a1a) | 1.3 | Smooth scroll |
| ![Vitest](https://img.shields.io/badge/-Vitest-6e9f18?logo=vitest) | 3.1 | Testing |

</div>

---

## 🏗️ Architecture

```
CalculaChile/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── page.tsx               # Home with calculator grid
│   │   ├── calculadoras/[slug]/   # Dynamic calculator pages
│   │   ├── blog/[slug]/           # SEO-optimized articles
│   │   └── api/values/            # Banco Central API integration
│   ├── components/
│   │   ├── calculator/            # 30+ calculator components
│   │   ├── creative/              # 3D and animation components
│   │   ├── ads/                   # Google AdSense integration
│   │   └── analytics/             # Google Analytics
│   ├── lib/
│   │   ├── calculations/          # 40 files of pure business logic
│   │   ├── api/                   # Banco Central API client
│   │   └── hooks/                 # useLiveValues, etc.
│   └── data/
│       ├── calculators.ts         # Metadata (1,700+ lines)
│       └── articles.ts            # SEO blog articles
├── public/                        # Static assets
└── tests/                         # E2E tests
```

---

## 💰 Monetization

**100% Google AdSense** with strategic placement:

- **Display Ads** — sidebar and between results
- **Native Ads** — integrated into calculation flow
- **Mobile Ads** — optimized for mobile viewport

Revenue optimized through content strategy (SEO blog articles), high-intent calculators (mortgage, salary), and long dwell time from comparison tools.

---

## ⚙️ Installation

```bash
# Clone
git clone https://github.com/falopass/calculadorachile.git
cd calculadorachile

# Install
npm install

# Development
npm run dev

# Type check
npx tsc --noEmit

# Tests
npm run test

# Build
npm run build
```

---

## 🚀 Deployment

Deployed to **Vercel** with automatic deploys from `main`. Central Bank values are cached at the edge for performance. AdSense is loaded async to avoid blocking Core Web Vitals.

---

## 📊 About This Project

CalculaChile is part of an indie SaaS portfolio focused on serving the Chilean market with high-quality, freely accessible tools. Solo-built and maintained.

**Live URL:** [calculadorachile.cl](https://calculadorachile.cl)
**Built by:** Diego Bravo Opazo — [Portfolio](https://github.com/falopass)

---

<details>
<summary><b>🇪🇸 Descripción en español</b></summary>

<br>

## Sobre CalculaChile

CalculaChile es una plataforma en producción que ofrece **40+ calculadoras financieras y legales específicas para Chile**. Desde sueldo líquido y finiquitos hasta simulaciones hipotecarias, subsidios estatales y multas de tránsito — todo lo que un chileno o empresa necesita para tomar decisiones informadas.

Construida con performance, accesibilidad (WCAG 2.1 AA) y SEO como prioridades. Los valores en vivo (UF, UTM, USD, EUR) se obtienen desde la **API del Banco Central de Chile**.

## Características principales

- 🧮 40+ calculadoras: sueldo, hipotecario, impuestos, AFP, subsidios y más
- 📈 Gráficos SVG interactivos en tiempo real
- 💾 Export a PNG
- 🔄 Comparador de escenarios (hasta 3 lado a lado)
- 📜 Historial local de cálculos
- ⚡ Valores oficiales desde Banco Central
- ♿ Accesible (WCAG 2.1 AA)
- 🔍 SEO optimizado con Schema.org
- 🎨 UI inmersiva con Framer Motion, GSAP, Three.js

## Producto en vivo

**[calculadorachile.cl](https://calculadorachile.cl)** · Construido por Diego Bravo Opazo

</details>

---

<div align="center">

**⭐ If you find this project useful, please star the repo!**

</div>
