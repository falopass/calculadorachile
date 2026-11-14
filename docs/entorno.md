# Entorno: comandos y variables

> Comandos del repo y variables de entorno. Se movió aquí desde [`AGENTS.md`](../AGENTS.md); ningún comando es obligatorio por defecto.
> El contrato vigente sigue en [`AGENTS.md`](../AGENTS.md); este documento conserva el detalle movido.

## Comandos útiles

```bash
npm run dev             # servidor local
npm run build           # build de producción Next.js
npm start               # servir build de producción
npm run lint            # ESLint según script del repo
npm run typecheck       # TypeScript sin emitir
npm run format:check    # Prettier check
npm test                # Vitest watch mode
npm run test:run        # Vitest una pasada
npm run test:coverage   # Vitest con coverage
```

## Variables de entorno

Nombres relevantes:

```bash
# Banco Central de Chile API
BCENTRAL_USER=
BCENTRAL_PASS=

# Next.js / públicos
NEXT_PUBLIC_SITE_URL=https://calculadorachile.cl
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=
DEBUG=false
```

Secretos y valores reales de producción van en **Cloudflare → Workers & Pages → calculadorachile → Settings → Variables and Secrets (runtime) y Build variables (NEXT_PUBLIC_*)**, no en el repo. Nunca commitees `.env`, credenciales, dumps ni tokens.

Nota: `BCENTRAL_*` solo existen en runtime (no en build); tras cada deploy, las 2 páginas con UF/UTM en el title muestran el title genérico hasta la primera revalidación (≤1 h).

## Stack real instalado

Verifica siempre `package.json` antes de asumir versiones. A la fecha:

- **Framework**: Next.js 15.x con App Router.
- **UI**: React 19, TypeScript 5, Tailwind CSS 3.
- **Animaciones**: Framer Motion 12.x. No están instalados Three.js, GSAP ni Lenis.
- **Íconos**: Lucide React.
- **Testing**: Vitest 3 + jsdom.
- **Fuentes activas**: Geist Sans + Geist Mono vía `next/font/google` en `src/app/layout.tsx`.
- **Ads**: Google AdSense.
- **Analytics**: Google Analytics 4.
- **Datos económicos**: BCentral + Mindicador + fallback local.
- **Imágenes dinámicas**: `canvas` para generación server-side donde aplica.
- **Deploy**: Cloudflare Workers vía OpenNext (Workers Builds desde `main`).

No instales dependencias nuevas salvo necesidad real demostrada. En particular, no introduzcas Three.js/GSAP/Lenis para “rediseño” sin decisión explícita: no forman parte del stack actual.
