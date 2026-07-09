---
name: nueva-calculadora
description: >
  Agregar o conectar una calculadora end-to-end en CalculaChile (catálogo,
  módulo puro, adapter UI, test, SEO mínimo). Usar cuando el usuario pida
  nueva calculadora, alta de calculadora, conectar módulo, wiring de
  calculationFunctions, o /nueva-calculadora.
---

# Nueva calculadora — CalculaChile

Lee y respeta `AGENTS.md` antes de implementar. Producto **YMYL**: sin fuente oficial verificada no se inventan fórmulas ni montos.

## Piezas obligatorias (orden)

Una calculadora activa se conecta por `calculator.id`:

| # | Pieza | Path |
|---|--------|------|
| 1 | Catálogo | `src/data/calculators.ts` |
| 2 | Lógica pura | `src/lib/calculations/<modulo>.ts` |
| 3 | Test | `src/lib/calculations/__tests__/<modulo>.test.ts` |
| 4 | Wiring UI | `src/app/calculadoras/[slug]/CalculatorPageClient.tsx` → `calculationFunctions[id]` |

Opcional según alcance: `seo-overrides.ts`, mapeo guía en `calculator-guia-map.ts`, `lastReviewed`, `sources`, `noIndex`.

## Checklist de implementación

### 0. Decidir identidad

- `id`: kebab-case estable (clave de ejecución). **No reutilizar ids retirados** sin aprobación.
- `slug`: URL pública, patrón `calculadora-<nombre>`. **No cambiar slugs existentes** sin plan SEO.
- `category`: una de las 12 en `src/lib/calculatorCategories.ts`.
- `phase`: 1 core / 2 nicho / 3 complementaria.
- `noIndex`: solo si es delgada o en cuarentena de índice (documentar por qué).
- **Fuente oficial** de la fórmula (SII, DT, BCentral, SP, CMF, IPS, MINVU, BCN/Ley Chile, etc.). Si no hay fuente, **parar y pedir**.

### 1. Módulo de cálculo (`src/lib/calculations/<modulo>.ts`)

- Lógica **pura**: sin React, sin DOM, sin fetch en la fórmula.
- Constantes legales desde `src/lib/values/constants.ts` (o params inyectables si dependen de UF/UTM en vivo).
- No hardcodear UF/UTM/dólar del día en el módulo si ya viven en values/API.
- Exportar:
  - tipos de input/result claros
  - `calculateX(input): Result`
  - `xToResults(result): CalculatorResult[]` con `format` correcto (`CLP` | `UF` | `UTM` | `percentage` | `days` | `number`)
- Redondeo CLP: ser explícito (`Math.round`) y consistente con tests.
- Documentar en comentarios breves la base legal / circular cuando exista.

### 2. Test (`__tests__/<modulo>.test.ts`)

Mínimo:

- Caso feliz con **montos esperados** (golden), no solo “> 0”.
- Bordes: cero, tope, máximo legal, input inválido si aplica.
- Si hay tramos/tablas, al menos un caso por tramo relevante.

```bash
npm run test:run -- src/lib/calculations/__tests__/<modulo>.test.ts
```

### 3. Catálogo (`src/data/calculators.ts`)

- `name`, `description` útiles (no relleno genérico).
- `inputs[]` con `id` alineados al adapter; `unit` explícita en numéricos (`CLP`, `UF`, `percent`, …).
- `faq` (3–6) con respuestas concretas y legales cuando aplique.
- `keywords`, `seoTitle` / `seoDescription` si el default es flojo.
- `sources[]` (máx. 4, URL a la subpágina oficial, no solo home).
- `lastReviewed`: fecha real de revisión ISO (`YYYY-MM-DD`), no la del deploy.
- `featured` / `phase` coherentes con el resto del catálogo.

### 4. Wiring (`CalculatorPageClient.tsx`)

- Import del módulo.
- Entrada en `calculationFunctions` con clave **`calculator.id`** exacta.
- Mapear **todos** los inputs del catálogo que deban afectar el resultado.
- **Prohibido** dejar inputs visibles que el adapter ignore (inputs fantasma).
- Casts `as` solo donde el shell entrega `unknown`; preferir validación mínima (números, defaults).

### 5. SEO / confianza (mínimo)

- Si hay CTR a cuidar: entrada en `src/data/seo-overrides.ts`.
- Si existe guía pillar: actualizar `src/lib/seo/calculator-guia-map.ts`.
- No agregar `LocalBusiness`.
- No tocar sitemaps/robots salvo que la calculadora deba excluirse (`noIndex` ya la saca del sitemap vía helpers).

### 6. Validación obligatoria (reportar salida real)

```bash
npm run typecheck
npm run test:run -- src/lib/calculations/__tests__/<modulo>.test.ts
npm run build
```

Nueva calculadora **no está lista** sin typecheck + test del módulo + build.

## Anti-patrones

- Inventar tasas, topes o “promedios de mercado” sin fuente.
- Meter lógica de negocio en componentes React del shell.
- Crear ruta App Router custom si el patrón dinámico `[slug]` alcanza.
- Reactivar `bono-bodas-oro` o copiar su 410 sin aprobación.
- Instalar Three.js / GSAP / Lenis / dark mode para “completar” la feature.
- Hardcodear formato `$1,000,000` (US): usar `src/lib/formatters.ts` (CLP chileno).

## Entrega al usuario

Al terminar, reportar:

1. `id` + `slug` + URL pública.
2. Fuente oficial usada.
3. Inputs conectados (lista) y confirmación de que no hay fantasma.
4. Comandos de validación y resultado.
5. Si quedó `noIndex` o falta guía/override SEO.
