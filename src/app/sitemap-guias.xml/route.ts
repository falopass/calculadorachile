// ============================================
// Sub-sitemap: guías pillar
// ----------------------------------------------
// Cada guía usa su `updatedAt` real (no la fecha global del sitio)
// para que los crawlers detecten frescura solo cuando hay cambio.
// ============================================

import { guias } from '@/data/guias';
import {
  SITE_URL,
  renderUrlsetXml,
  SITEMAP_RESPONSE_HEADERS,
  type SitemapEntry,
} from '@/lib/seo/sitemap-helpers';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  const entries: SitemapEntry[] = guias.map((g) => ({
    url: `${SITE_URL}/guias/${g.slug}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: 'monthly',
    // Las guías pillar son más profundas que el blog → prioridad alta.
    priority: 0.85,
    images: [`${SITE_URL}/guias/${g.slug}/opengraph-image`],
  }));

  const xml = renderUrlsetXml(entries);

  return new Response(xml, {
    status: 200,
    headers: SITEMAP_RESPONSE_HEADERS,
  });
}
