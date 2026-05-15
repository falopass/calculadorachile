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
        // Solo bloqueamos rutas técnicas reales del proyecto.
        disallow: ['/api/', '/_next/'],
      },
      // Nota: No agregamos reglas separadas para Googlebot/Bingbot
      // si las reglas son idénticas a `*`. Mantener menos directivas
      // facilita el debugging y evita conflictos cuando un crawler
      // particular cambia de UA.
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
