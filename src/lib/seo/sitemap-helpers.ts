// ============================================
// Helpers para generación de sitemaps XML
// ----------------------------------------------
// Compartidos entre el sitemap-index y cada sub-sitemap por sección
// (calculadoras, blog, guías, páginas estáticas).
//
// Convenciones:
//   - lastModified: ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
//   - changeFrequency: always | hourly | daily | weekly | monthly |
//                      yearly | never
//   - priority: 0.0 a 1.0
//   - images: <image:image> dentro de cada <url>, extensión Google
//     Image Sitemap (namespace 1.1 — el 0.9 es inválido y dispara
//     errores "etiqueta image:loc no reconocida" en Search Console).
//
// El sitemap dividido permite a los crawlers descubrir y priorizar
// secciones independientemente. Ahora son ~97 URLs y cabrían sin
// problema en un único archivo, pero el split prepara el sitio para
// crecer hasta 50.000 URLs sin tocar la infraestructura.
// ============================================

import { SITE_URL } from '@/lib/site';

export type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency?: ChangeFrequency;
  priority?: number;
  /** URLs absolutas de imágenes asociadas (Google Image Sitemap). */
  images?: string[];
}

/**
 * Escape de caracteres especiales para XML.
 * URLs solo necesitan & escapado y comillas; usamos el set completo
 * por seguridad.
 */
export function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Formato W3C Datetime que Google acepta en `<lastmod>`. */
export function toW3CDatetime(date: Date): string {
  return date.toISOString();
}

/**
 * Renderiza un array de entradas como un Sitemap 0.9 con extensión
 * de imágenes (xmlns:image). Compatible con Google, Bing y Yandex.
 */
export function renderUrlsetXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const lines: string[] = [
        `    <loc>${escapeXml(entry.url)}</loc>`,
        `    <lastmod>${toW3CDatetime(entry.lastModified)}</lastmod>`,
      ];
      if (entry.changeFrequency) {
        lines.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
      }
      if (typeof entry.priority === 'number') {
        lines.push(`    <priority>${entry.priority.toFixed(2)}</priority>`);
      }
      if (entry.images && entry.images.length > 0) {
        for (const img of entry.images) {
          lines.push(
            `    <image:image><image:loc>${escapeXml(img)}</image:loc></image:image>`,
          );
        }
      }
      return `  <url>\n${lines.join('\n')}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
}

/**
 * Renderiza un sitemap-index 0.9 que referencia sub-sitemaps por
 * sección.
 */
export function renderSitemapIndexXml(
  sitemaps: Array<{ loc: string; lastmod: Date }>,
): string {
  const items = sitemaps
    .map(
      (s) =>
        `  <sitemap>\n    <loc>${escapeXml(s.loc)}</loc>\n    <lastmod>${toW3CDatetime(
          s.lastmod,
        )}</lastmod>\n  </sitemap>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</sitemapindex>`;
}

/** Headers comunes para todas las respuestas XML del sitemap. */
export const SITEMAP_RESPONSE_HEADERS: HeadersInit = {
  'Content-Type': 'application/xml; charset=utf-8',
  // Cache 1 hora en CDN, 5 minutos en navegadores.
  'Cache-Control':
    'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
};

/** Fecha estable del sitio para páginas estáticas. */
export const SITE_LAST_MODIFIED = new Date('2026-05-16');

/** Prioridades por categoría de calculadora (heurística por demanda). */
export const CATEGORY_PRIORITIES: Record<string, number> = {
  sueldo: 0.9,
  impuestos: 0.85,
  beneficios: 0.85,
  conversiones: 0.8,
  vivienda: 0.75,
  vehiculos: 0.75,
  familia: 0.7,
  empresas: 0.7,
  pension: 0.7,
  educacion: 0.65,
  hogar: 0.65,
  servicios: 0.6,
};

export { SITE_URL };
