# OpenCode — contexto de proyecto CalculaChile

Este archivo existe para **anular el marco pyme** del OpenCode global cuando trabajas en este repo.

## Qué es este producto

- Plataforma nacional chilena de **calculadoras + contenido** (laboral, tributario, previsional, financiero).
- Dominio: [calculadorachile.cl](https://calculadorachile.cl).
- Modelo: SEO orgánico + **AdSense**. No es e-commerce ni negocio local.
- Vertical **YMYL**: un error de fórmula o fuente daña confianza y ranking.

Reglas de producto: raíz `AGENTS.md` del repo (manda sobre cualquier doc genérico).

## Skills permitidas (únicas)

| Skill | Uso |
|-------|-----|
| `nueva-calculadora` | Alta / wiring de calculadora (catálogo + módulo + test + adapter) |
| `auditoria-ymyl` | Inputs fantasma, fórmulas, fuentes, tests golden |
| `seo-adsense` | Metadata, noIndex, schema, sitemaps, AdSense |

Cualquier otra skill global (en especial `web-factory` y `pyme-template-intelligence`) está **denegada** en `opencode.json` de este proyecto.

## Skills / docs / comandos globales a IGNORAR aquí

Vienen de `C:\Users\lenov\.config\opencode` y sirven para webs de pymes. **No aplicar en CalculaChile**:

| Origen global | Por qué no |
|---------------|------------|
| Skills `web-factory`, `pyme-template-intelligence` | Arquetipos locales, WhatsApp, LocalBusiness |
| `docs/WEB_FACTORY.md`, `SEGMENT_PLAYBOOK.md`, `QUALITY_GATE.md` (pyme) | CTA de reserva/cotiza, schema local |
| Comandos `/new-web`, `/template-web`, `/brief-web`, `/launch-web`, `/copy-web`, `/visuals-web`, `/template-audit` | Pipeline de webs cliente local |
| Template `universal-next-app` + briefs handmade/local | Stack de landing pyme, no de este monorepo |

Comandos globales **sí útiles** si el flujo es genérico de repo: `/tsc`, `/gpush`, `/vercel-deploy` (con cuidado en prod), y el espíritu de `/seo-web` **solo** si no mete LocalBusiness; preferir skill `seo-adsense` + `.opencode/skills/seo-chile.md`.

## Stack real (no inventar otro)

Next.js 15 App Router · React 19 · TypeScript 5 · Tailwind 3 · Framer Motion · Vitest · Lucide · Vercel.

**No** introducir: Three.js, GSAP, Lenis, dark mode, LocalBusiness, dependencias “por si acaso”.

## Prioridades al implementar

1. Fórmulas con fuente oficial (SII, DT, BCentral, SP, CMF, IPS, MINVU, BCN…).
2. Inputs del catálogo = lo que el adapter calcula (cero inputs fantasma).
3. No romper slugs, sitemaps, 410, AdSense placements ni disclaimers YMYL.
4. Validar: `npm run typecheck` y el test del módulo tocado; `npm run build` si hay rutas/catálogo/SEO.

## Mapa rápido del repo

```text
src/data/calculators.ts          → catálogo (39 activas)
src/lib/calculations/            → lógica pura + __tests__
src/app/calculadoras/[slug]/    → UI + calculationFunctions
src/lib/values/                  → constantes + snapshot UF/UTM
src/lib/seo/ + seo-overrides.ts  → SEO
src/components/ads/              → AdSense (no mover sin OK)
.agents/skills/                  → skills de este producto
```

## Conflicto de instrucciones

Orden de autoridad en este repo:

1. Pedido explícito del usuario en la sesión.
2. `AGENTS.md` del **repo** CalculaChile.
3. Skills permitidas de `.agents/skills/`.
4. Constitución global OpenCode (`~/.config/opencode/AGENTS.md`) para estilo de trabajo (cambio mínimo, verificación, honestidad).
5. Cualquier playbook pyme global → **descartar**.
