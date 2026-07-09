---
description: SEO/AdSense seguro (overrides, noIndex, schema, sitemaps) sin romper URLs indexadas.
---

Ejecuta la skill **seo-adsense** (`.grok/skills/seo-adsense/SKILL.md`).

- Overrides CTR: preferir `src/data/seo-overrides.ts`.
- Prohibido: LocalBusiness, cambiar slugs indexados, quitar placements AdSense.
- Validar: `npm run typecheck` + `npm run build` si tocas rutas/sitemaps/metadata.
