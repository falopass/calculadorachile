# Encargo — Sueldo casa particular (nana) + Sala de prensa (CalculaChile)

> Para: agente de código (Claude Code) · 2026-10-08 · Origen: tanda SEO de octubre (post-baseline GSC)
> Regla madre: **AGENTS.md del repo manda**. Sin fuente oficial verificada no se crea ni cambia una fórmula.

## Contexto

- CalculaChile (calculadorachile.cl): 53 calculadoras, Next.js 15 App Router, producto YMYL.
- El bloque anterior ya publicó overrides CTR, quick answers y llms.txt (commit `8510a90`) — NO repetir ese trabajo; sí seguir sus patrones.
- Evidencia de demanda (autocomplete Chile + GSC oct-2026): "calculadora sueldo nana" / "cuánto gana una nana"; competidores (p. ej. nanapp.cl) muestran valores 2025 desactualizados. No existe hoy página para esta demanda en el sitio.
- El patrón a replicar es el de `calculadora-patente-comercial`: página específica de alta intención, con fuentes citadas.

## Tarea 1 (prioridad) — Calculadora de sueldo de trabajadora de casa particular (nana)

### Investigación previa OBLIGATORIA (con fuentes oficiales)

Verifica y cita la norma o ficha oficial (dt.gob.cl, chileatiende.gob.cl, leychile.cl, suseso.cl) para CADA regla que implementes, incluyendo en particular:

- ¿Existe ingreso mínimo especial para trabajadoras de casa particular o aplica el IMM general? Estado de vigencia.
- Asignación de casa particular (nombre exacto, monto/regla, condiciones) si existe.
- Jornada, descansos y modalidades puertas adentro / puertas afuera.
- Cotizaciones y cualquier particularidad de término de contrato (p. ej. indemnización adicional por falta de aviso).

Si una regla no logra fuente oficial: **NO la incluyas**; documéntala como pendiente en el informe.

### Entregables (patrón del repo)

1. Módulo puro en `src/lib/calculations/` + test en `src/lib/calculations/__tests__/` con al menos un golden tomado de la fuente oficial (ejemplo numérico verificable).
2. Wiring en `src/app/calculadoras/[slug]/CalculatorPageClient.tsx` (registrar en `calculationFunctions[id]`).
3. Entrada en `src/data/calculators.ts`: id, slug, name, description, category (una de las 12 canónicas), inputs, faq, keywords, sources, lastReviewed, seoTitle, seoDescription.
4. Quick answer SSR en `src/data/calculator-quick-answers.ts` (H1 + lead + tabla calculada con el módulo) y agregar el id a `src/data/__tests__/calculator-quick-answers.test.ts`.
5. Override CTR en `src/data/seo-overrides.ts` (junto al bloque de calculadoras), usando la demanda real como gancho.
6. `node scripts/audit-ymyl-matrix.mjs <id>` → 0 fantasmas; `npm run typecheck`; test focal; `npm run build`.

### Guía de naming (decide con criterio SEO)

- Slug propuesto: `calculadora-trabajadora-casa-particular` o `calculadora-sueldo-casa-particular` — elige el mejor para intención y longitud.
- El término popular de búsqueda es "nana": el title/H1 puede incluir "nana" entre paréntesis si cabe; en el cuerpo, usa el término formal (trabajadora de casa particular).
- Reutiliza lógica existente cuando calce (p. ej. proporcionalidad IMM para jornadas parciales ya resuelta en `sueldo-part-time.ts` y `sueldo-liquido.ts`); NO dupliques fórmulas sin necesidad, pero NO fuerces una reutilización que contradiga la fuente.

## Tarea 2 — Página de prensa / datos citables (`/prensa`)

### Qué construir

- Nueva ruta `src/app/prensa/page.tsx` (server component): "sala de datos" para periodistas y superficies IA — valores vigentes del mes en una sola página citable.

### Contenido (solo datos YA existentes en el repo; fecha de actualización visible)

- UF y UTM vigentes + dólar observado (replicar el mecanismo existente de las páginas que muestran valores en vivo; p. ej. `getCurrentValues` con fallback).
- Sueldo mínimo vigente, tope imponible AFP/salud (90 UF) y cesantía (135,2 UF) en pesos con la UF vigente, tope de gratificación (4,75 IMM) y 1–2 indicadores legales más si existen en `constants.ts`. **No inventar cifras nuevas.**
- Sección "Cómo citar": texto sugerido de cita con enlace a calculadorachile.cl y nota de la fecha; indicar cuándo se actualiza.

### Requisitos

- Metadata vía `buildPageMetadata`; canonical; sin schema inventado (solo helpers existentes si aplican); sin tocar AdSense; disclaimers YMYL.
- Incluir la ruta en `sitemap-pages.xml` si las páginas estáticas están listadas ahí (revisar `src/lib/seo/sitemap-helpers.ts` y la ruta del sitemap).
- Si el Footer lista páginas del sitio (`src/components/layout/Footer.tsx`), añadir el enlace "Prensa" con el mismo estilo — cambio mínimo, sin rediseño.
- Añadir una línea en `public/llms.txt` apuntando a `/prensa`.

## Reglas y prohibiciones

- Leer antes de tocar: `AGENTS.md`, `docs/contexto.md`, `.agents/skills/nueva-calculadora`, `.agents/skills/seo-adsense`. Seguirlas.
- PROHIBIDO: cambiar slugs/URLs existentes, tocar AdSense, dark mode, schema existente, disclaimers, ni instalar dependencias. No levantar servidores que pisen procesos existentes (si necesitas probar render, usa un puerto libre y apágalo al terminar).
- No commitees `.devin/` ni `tmp/` (déjalos tal cual). Commitea solo tus archivos.
- Español de Chile; formato chileno con `formatters.ts`.

## Cierre

- Commit(s) atómicos con mensaje estilo del repo (p. ej. `feat(calc): ...` / `feat(seo): ...`) y `git push origin main` (Vercel despliega solo; Hermes verificará producción después).
- Informe final (en tu respuesta): (1) reglas y fuentes de la calculadora nueva (URLs citadas), (2) archivos creados/modificados, (3) comandos de verificación ejecutados y su resultado, (4) pendientes o cosas dejadas fuera y por qué, (5) supuestos.

## Fuera de alcance (no hacer en esta pasada)

- Calculadora de sueldo docente (investigación mayor; otra tanda).
- Widget embebible/aliados, cambios de navegación global, CVListo.
