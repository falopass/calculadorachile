# Contexto de producto — CalculaChile

Snapshot para agentes en **Grok Build**. Actualizar cuando cambie el estado real del catálogo o del P0.

**Última actualización contexto:** 2026-07-08

---

## Identidad

| Campo | Valor |
|-------|--------|
| Producto | CalculaChile |
| URL | https://calculadorachile.cl |
| Tipo | Plataforma nacional de calculadoras + contenido (Chile) |
| Vertical | **YMYL** financiero / laboral / tributario / previsional |
| Monetización | Google AdSense + SEO orgánico |
| Deploy | Vercel |
| Harness de desarrollo | **Grok Build** (Grok 4.5), no OpenCode, no pymes |

No es: negocio local, e-commerce, SaaS B2B con login, web de pyme.

---

## Números actuales

| Pieza | Estado |
|-------|--------|
| Calculadoras activas | **39** (`src/data/calculators.ts`) |
| Módulos + tests | **40** (incluye histórico `bono-bodas-oro`) |
| noIndex | **8** (cuarentena thin content) |
| Guías | ~12 |
| Blog | ~15 |
| Categorías | 12 |
| Bono bodas de oro | **410 Gone** — no reactivar sin aprobación |

---

## Prioridades de producto (orden)

1. **Verdad del cálculo** (UI = adapter = módulo)
2. **Fuentes y disclaimers YMYL**
3. **SEO / indexación / CTR** sin romper URLs
4. **AdSense** sin mover placements por estética
5. Ship barato (stack liviano)

---

## Deuda YMYL

Fuente: `docs/auditoria-ymyl-2026-07.md` + dossier + `node scripts/audit-ymyl-matrix.mjs`.

### P0 — CERRADO 2026-07-08

| id | Qué se hizo |
|----|-------------|
| `sueldo-liquido` | Adapter cablea Isapre UF, contrato, no imponibles, descuentos, inverso. Quitados `saludTramo` y `tipoCalculo` fantasmas. |
| `subsidio-habitacional` | Inputs en **UF**; `tipoSubsidio` obligatorio; topes DS01 T2=1600; zona extrema; sin crash sin tipo. |
| `boleta-honorarios` | `ano` cableado; desglose solo informativo; sin préstamo solidario inventado; cita Ley 21.133. |

### P1 — CERRADO 2026-07-08

| id | Qué se hizo |
|----|-------------|
| `finiquito` | Aviso previo opt-in; recargo Art. 168 0/30/50/80/100; vacaciones años ant.; sin fechas muertas |
| `horas-extra` | Jornada default 42; sin nocturnas; festivos/impacto/topes cableados |
| `credito-hipotecario` | Seguros/CAE/prepago/tabla cableados (mercado); podados tipoTasa y gracia no modelados |

### P2 — CERRADO 2026-07-08

| id | Qué se hizo |
|----|-------------|
| `uf-clp` | Podados histórico/proyección/gráfico; solo monto + dirección; FAQ honesta |
| `subsidio-agua` | Podado `zona` fantasma (sigue noIndex) |

### Fantasmas

**Meta catálogo activo:** 0 inputs fantasma (verificar con `node scripts/audit-ymyl-matrix.mjs`).

---

## Mapa mental de archivos

```text
Patrón calculadora:
  data/calculators.ts          → inputs visibles
  lib/calculations/<mod>.ts    → fórmula pura
  __tests__/<mod>.test.ts      → golden
  CalculatorPageClient.tsx     → calculationFunctions[id]  ← suele faltar wiring

Valores:
  lib/values/constants.ts      → tasas/topes legales
  lib/values/snapshot.json     → UF/UTM del día
  app/api/values               → live BCentral→Mindicador→fallback

SEO:
  data/seo-overrides.ts
  lib/seo/*
```

---

## Skills y slash (Grok)

| Slash | Skill / acción |
|-------|----------------|
| `/ymyl-audit` | auditoria-ymyl |
| `/p0-wiring` | Cerrar fantasmas P0 |
| `/ship-check` | typecheck + test + matriz |
| `/nueva-calc` | nueva-calculadora |
| `/seo-fix` | seo-adsense |

Skills en: `.grok/skills/` (canónico).

---

## Research

- **Dossier YMYL (canónico):** `docs/research/dossier-verificacion-ymyl-calculachile.md` (2026-07-08, fuentes oficiales)
- Cómo usarlo: `docs/research/README.md`
- Research YMYL / inventario SEO: `docs/research/` (no HTML one-shot)

Al implementar P0/P1: cruzar siempre dossier + `docs/auditoria-ymyl-2026-07.md` + matriz de fantasmas.

---

## Anti-objetivos (no pedir / no hacer)

- Webs pyme, WhatsApp CTA, LocalBusiness
- Three.js / GSAP / Lenis / dark mode
- Reactivar bono-bodas-oro
- Cambiar slugs indexados “porque quedan más bonitos”
- “Actualizar todas las fórmulas a 2026” sin fuentes
