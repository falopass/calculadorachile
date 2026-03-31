// ============================================
// Robots.txt dinámico para SEO
// Configura las reglas de rastreo para buscadores
// ============================================

import { MetadataRoute } from 'next';

const BASE_URL = 'https://calculachile.cl';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Reglas para todos los bots
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
          '/admin/',
        ],
      },
      // Reglas específicas para Googlebot
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // Reglas para Bingbot
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
