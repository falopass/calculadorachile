# Contexto operativo — CalculaChile

**Un solo archivo** para producto + YMYL + Grok Build.  
Constitución del repo: [`AGENTS.md`](../AGENTS.md).  
Plan de posts: [`plan-editorial.md`](./plan-editorial.md).  
Research: [`research/`](./research/).

**Última actualización:** 2026-07-10

---

## 1. Producto

| Campo | Valor |
|-------|--------|
| URL | https://calculadorachile.cl |
| Tipo | Plataforma nacional de calculadoras + contenido |
| Vertical | **YMYL** (laboral / tributario / previsional / financiero) |
| Monetización | AdSense + SEO orgánico |
| Deploy | Vercel |
| Harness | **Grok Build** (`grok-build`) — no pymes, no OpenCode como flujo principal |

**No es:** local business, e-commerce, SaaS con login, web de pyme.

| Pieza | Estado |
|-------|--------|
| Calculadoras activas | **39** |
| Módulos + tests | **40** (histórico `bono-bodas-oro`) |
| noIndex | **8** |
| Guías / blog | 12 / ~19 |
| `bono-bodas-oro` | **410 Gone** — no reactivar sin OK |

### Prioridades

1. Verdad del cálculo (UI = adapter = módulo)  
2. Fuentes y disclaimers YMYL  
3. SEO / CTR sin romper URLs  
4. AdSense sin mover placements por estética  
5. Ship barato  

### Anti-objetivos

- Pyme / WhatsApp CTA / `LocalBusiness`  
- Three.js / GSAP / Lenis / dark mode  
- Reactivar bono-bodas-oro  
- Cambiar slugs “porque quedan más bonitos”  
- Actualizar fórmulas sin fuente oficial  

---

## 2. YMYL (estado)

**Meta:** 0 inputs fantasma en catálogo activo.

```bash
node scripts/audit-ymyl-matrix.mjs
```

### Wiring cerrado (2026-07-08)

| Prioridad | ids |
|-----------|-----|
| P0 | `sueldo-liquido`, `subsidio-habitacional` (UF), `boleta-honorarios` (Ley 21.133) |
| P1 | `finiquito`, `horas-extra` (jornada 42), `credito-hipotecario` |
| P2 | `uf-clp` (podado), `subsidio-agua` (podado, noIndex) |

### Embudo analytics + CTA CVListo (2026-07-10+)

| Pieza | Estado |
|-------|--------|
| `calculator_started` / `calculator_completed` | Shell premium (GA4; `calculator_used` alias) |
| CTA post-resultado | finiquito, indemnización, vacaciones, sueldo, **honorarios** |
| Enlazado laboral | Clúster 3–5 links + related calcs en calcs laborales |

**Hallazgo madre (sigue valiendo):** el módulo a menudo calcula bien; el riesgo es adapter/catálogo desalineados. Si el label promete y no cambia el resultado → bug YMYL.

**Research de fórmulas:** [`research/dossier-ymyl.md`](./research/dossier-ymyl.md)  
**Constantes:** `src/lib/values/constants.ts`

---

## 3. Mapa de código

```text
data/calculators.ts              → inputs visibles
lib/calculations/<mod>.ts        → fórmula pura + *ToResults
lib/calculations/load-calculator.ts → dynamic import por id
__tests__/<mod>.test.ts          → golden
lib/values/constants.ts          → tasas/topes
lib/values/snapshot.json         → UF/UTM del día
app/api/values                   → BCentral → Mindicador → fallback
data/seo-overrides.ts            → titles CTR
data/articles.ts                 → blog /blog/{slug}
```

---

## 4. Grok Build (arranque)

```powershell
cd C:\code\SaaS2\CalculaChile
grok
# primera vez: /hooks-trust
```

| Pieza | Path |
|-------|------|
| Constitución | `AGENTS.md` |
| Este archivo | `docs/contexto.md` |
| Plan posts | `docs/plan-editorial.md` |
| Research | `docs/research/*` |
| Skills locales | `.grok/skills/` (gitignored) |
| Slash | `/ymyl-audit` `/ship-check` `/nueva-calc` `/seo-fix` `/p0-wiring` |

Config usuario (`~/.grok/config.toml`): `models.default = "grok-build"`, memory on, skills pyme **disabled**.

### Validación

```bash
npm run typecheck
npm run test:run -- src/lib/calculations/__tests__/<mod>.test.ts
node scripts/audit-ymyl-matrix.mjs
npm run build   # si tocaste catálogo / rutas / SEO
```

### Flujo típico

```text
1. Leer AGENTS.md + este contexto
2. Si post → plan-editorial.md + research/deep-research.md o inventario-seo.md
3. Si fórmula → dossier-ymyl.md + constants.ts + matriz
4. Cambiar mínimo + tests
5. /ship-check o comandos de arriba
```

---

## 5. Research (carpeta)

| Archivo | Cuándo abrirlo |
|---------|----------------|
| [`research/dossier-ymyl.md`](./research/dossier-ymyl.md) | Fórmulas, topes, fuentes oficiales |
| [`research/inventario-seo.md`](./research/inventario-seo.md) | Montos/fechas de beneficios y picos SEO |
| [`research/deep-research.md`](./research/deep-research.md) | Dossiers `DR[1]`…`DR[30]` al redactar posts |

**Plan de contenidos (único):** [`plan-editorial.md`](./plan-editorial.md)
