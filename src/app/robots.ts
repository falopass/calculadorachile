// ============================================
// Robots.txt dinámico para SEO
// ----------------------------------------------
// Reglas de crawling. Quitamos `host` que está deprecado y rutas
// inexistentes (`/private/`, `/admin/`).
// ============================================

import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Solo bloqueamos endpoints internos. /_next/ (assets estáticos)
        // debe quedar permitido para que Googlebot renderice el JS del sitio.
        disallow: ['/api/'],
      },
      // Nota: No agregamos reglas separadas para Googlebot/Bingbot
      // si las reglas son idénticas a `*`. Mantener menos directivas
      // facilita el debugging y evita conflictos cuando un crawler
      // particular cambia de UA.
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
