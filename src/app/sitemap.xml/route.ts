// ============================================
// Sitemap-index principal — /sitemap.xml
// ----------------------------------------------
// Route handler que sirve un <sitemapindex> apuntando a los
// sub-sitemaps por sección:
//
//   /sitemap-pages.xml         estáticas + categorías
//   /sitemap-calculadoras.xml  40 calculadoras
//   /sitemap-guias.xml         guías pillar
//   /sitemap-blog.xml          artículos del blog
//
// Beneficios del split:
//   - Google/Bing pueden priorizar secciones independientemente.
//   - Soporta crecimiento hasta 50.000 URLs por sub-sitemap
//     (límite del spec) sin tocar infraestructura.
//   - Cada sección puede invalidar su cache por separado.
//
// Implementación: Route Handler en lugar del `app/sitemap.ts`
// nativo de Next.js, porque la API nativa solo emite <urlset>.
// Para que Google trate este archivo como sitemap-index, debe
// retornar la estructura `<sitemapindex>` exacta del estándar 0.9.
// ============================================

import { articles } from '@/data/articles';
import { guias } from '@/data/guias';
import {
  SITE_URL,
  SITE_LAST_MODIFIED,
  renderSitemapIndexXml,
  SITEMAP_RESPONSE_HEADERS,
} from '@/lib/seo/sitemap-helpers';

export const dynamic = 'force-static';
export const revalidate = 3600;

/**
 * Devuelve la fecha más reciente de un set de fechas en formato
 * ISO; cae al `SITE_LAST_MODIFIED` si la colección está vacía.
 */
function maxDate(dates: string[]): Date {
  const valid = dates
    .map((d) => new Date(d))
    .filter((d) => !Number.isNaN(d.getTime()));
  if (valid.length === 0) return SITE_LAST_MODIFIED;
  return valid.reduce((acc, d) => (d > acc ? d : acc), valid[0]);
}

export async function GET() {
  const blogLastMod = maxDate(articles.map((a) => a.date));
  const guiasLastMod = maxDate(guias.map((g) => g.updatedAt));

  const xml = renderSitemapIndexXml([
    { loc: `${SITE_URL}/sitemap-pages.xml`, lastmod: SITE_LAST_MODIFIED },
    { loc: `${SITE_URL}/sitemap-calculadoras.xml`, lastmod: SITE_LAST_MODIFIED },
    { loc: `${SITE_URL}/sitemap-guias.xml`, lastmod: guiasLastMod },
    { loc: `${SITE_URL}/sitemap-blog.xml`, lastmod: blogLastMod },
  ]);

  return new Response(xml, {
    status: 200,
    headers: SITEMAP_RESPONSE_HEADERS,
  });
}
