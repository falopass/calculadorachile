# AGENTS.md — CalculaChile

> Referencia obligatoria. Contrato normativo; detalle en `docs/`. **AGENTS.md manda** sobre skills y docs auxiliares.

## Qué es

**CalculaChile** (`calculadorachile.cl`) es un sitio chileno de calculadoras laborales, tributarias, previsionales y financieras. Es un producto **YMYL**: un error en una fórmula, monto o fuente afecta decisiones económicas reales y daña confianza/SEO. Prioridad: **ship rápido, bajo costo y alta confiabilidad en cálculos chilenos**. AdSense y tráfico orgánico son críticos.

Catálogo: **64 calculadoras** (56 indexables, 8 `noIndex`) y **64 módulos** con test en `src/lib/calculations/`. Estado: [`docs/catalogo.md`](docs/catalogo.md). Árbol y patrón: [`docs/estructura.md`](docs/estructura.md).

## Stack y comandos

Verifica `package.json` antes de asumir versiones. Next.js 15 (App Router), React 19, TypeScript 5, Tailwind 3, Vitest 3 + jsdom; Geist Sans/Mono; AdSense + GA4; datos de BCentral/Mindicador con fallback local; Cloudflare Workers vía OpenNext (Workers Builds desde `main`). Dependencias nuevas: necesidad demostrada; Three.js/GSAP/Lenis: decisión explícita. Stack y comandos: [`docs/entorno.md`](docs/entorno.md).

Comandos: `npm run dev`, `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm test`, `npm run test:run`, `npm run test:coverage`.

## Regla de oro YMYL

**Sin fuente oficial verificada, no se cambia una fórmula.** Fuentes típicas: Banco Central, SII, Dirección del Trabajo, Superintendencia de Pensiones, CMF, IPS/ChileAtiende, MINVU, BCN/Ley Chile. No hardcodees UF, UTM, IPC, dólar, euro, topes, tasas ni valores legales en componentes: usa `/api/values` y `src/lib/values/` (BCentral → Mindicador → fallback). Detalle: [`docs/valores-y-datos.md`](docs/valores-y-datos.md) y [`docs/seo-y-adsense.md`](docs/seo-y-adsense.md).

- No propongas ni agregues `LocalBusiness`. No elimines disclaimers YMYL, fuentes, autoría, breadcrumbs ni structured data sin reemplazo equivalente.
- No muevas, elimines ni escondas placements de AdSense sin decisión explícita; en desarrollo el placeholder `ca-pub-XXXXXXX` desactiva el script real y no se "arregla".
- El `slug` define la URL pública: no lo cambies sin plan SEO. Toda fórmula nueva o alterada requiere test relevante.

## Estilo y accesibilidad

Light-only: `darkMode: 'class'` en `tailwind.config.ts` evita que clases `dark:` residuales se activen; no reintroduzcas dark mode ni Inter/Syne/DM Sans/Playfair/JetBrains. UI mobile-first y accesible (semántica, labels, foco visible, contraste). Formato chileno siempre desde `src/lib/formatters.ts` (`$1.000.000`). Framer Motion solo para microinteracciones existentes; sin animaciones pesadas en calculadoras core. Detalle: [`docs/estilo-y-ui.md`](docs/estilo-y-ui.md).

Base: `frontend-base`. Piso comprobable antes de entregar: `C:/Users/lenov/.agents/studio/canonical/frontend-references/corpus/piso.md` (16 reglas; vale con cualquier dirección). Referencias por tema en `corpus/LEEME.md`; aquí sirven `interfaz-producto.md`, `accesibilidad-responsive.md`, `design-system.md`. Rutas de la máquina de Diego. No relaja YMYL, AdSense ni light-only.

## Qué no tocar sin aprobación explícita

- Fórmulas, topes, tasas o constantes financieras sin fuente oficial verificada.
- Slugs, URLs públicas, canonicals, redirects, 410, robots o sitemaps: romper rutas indexadas rompe el tráfico orgánico.
- AdSense: script global, placeholders, componentes o ubicación de placements.
- Structured data SEO/YMYL: solo corregir propiedades inválidas según schema.org/Google, sin tipos nuevos ni quitar entidades.
- Dark mode, dependencias de animación/3D/smooth scroll no instaladas, formato de moneda chilena y secretos o credenciales. Detalle: [`docs/limites.md`](docs/limites.md).

## Comprobaciones

Ningún comando es obligatorio por defecto; solo por petición o riesgo no resoluble por lectura, y las fórmulas nuevas o alteradas conservan su prueba específica. Tabla por tipo de cambio: [`docs/verificacion.md`](docs/verificacion.md). `verifier` solo por riesgo alto y reporta sin editar; build y suite completa solo por petición o riesgo que un check menor no cubra. Si un check falla, quien implementa corrige la causa y repite solo ese check. Un PASS vigente no se repite mientras no cambien sus inputs.

## Criterio operativo

1. Lee este archivo, `docs/contexto.md` y `package.json` antes de tocar código o asumir stack.
2. Ubica el patrón existente y cambia lo mínimo robusto. Distingue dato **verificado**, **inferido** y **supuesto**.
3. Dinero, impuestos, laboral, previsión, SEO indexado, AdSense o secretos: cautela; confirma si hay dos caminos.
4. No inventes cifras, fuentes, reseñas ni valores financieros. Posts: `docs/plan-editorial.md` + research; fórmulas: `docs/research/dossier-ymyl.md` + matriz.
5. Tras el wiring de una calculadora, ejecuta `node scripts/audit-ymyl-matrix.mjs` para ese `id`; se espera 0 fantasmas salvo cosméticos documentados.

## Agentes y entorno

Inicia con `CalculaChile` como carpeta; sin clones locales; no uses `web-factory`, `pyme-template-intelligence` ni schema `LocalBusiness`. Root: arquitectura, integración y decisión final; máximo 4 agentes activos y 3 hijos, sin anidamiento. Builders implementan y scouts evidencian; writers en background con `WRITE_SCOPE`/`VALIDATION_COMMANDS`, scopes compartidos en secuencia y >1 writer con pregrant; quien implementa relee su cambio. `verifier` (`LOCAL_HEAVY_LOCK`) solo riesgo alto o petición; `mechanical-worker` no ejecuta; guards YOLO desactivados. Proveedores/credenciales/routers/aliases: configuración personal, nunca del repo. Frontend: `design-taste-frontend` en públicas/editoriales, `interface-design` en calculadoras/producto, una por superficie, con YMYL/SEO/AdSense/accesibilidad/DNA.

Skills: [`docs/agentes-y-skills.md`](docs/agentes-y-skills.md). Secretos y variables: [`docs/entorno.md`](docs/entorno.md); secretos reales solo en Cloudflare (Variables and Secrets / Build variables), nunca en el repo. El repo funciona sin BCentral (Mindicador/fallback). No commitees `.env`, credenciales, dumps ni tokens.

## Repositorio y estado

Remoto `github.com/falopass/calculadorachile`, rama `main`; push a `main` despliega por Workers Builds (Cloudflare + OpenNext, worker `calculadorachile`). Estado: [`docs/repositorio.md`](docs/repositorio.md).
