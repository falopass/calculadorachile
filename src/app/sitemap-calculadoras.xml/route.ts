// ============================================
// Sub-sitemap: calculadoras
// ----------------------------------------------
// 40 calculadoras con prioridad por categoría y `images` apuntando
// a la OG dinámica generada por opengraph-image.tsx.
// ============================================

import { calculators } from '@/data/calculators';
import {
  SITE_URL,
  SITE_LAST_MODIFIED,
  renderUrlsetXml,
  SITEMAP_RESPONSE_HEADERS,
  CATEGORY_PRIORITIES,
  type SitemapEntry,
} from '@/lib/seo/sitemap-helpers';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  // Excluir calculadoras marcadas `noIndex` del sitemap para no
  // enviar señales contradictorias a Google (noindex + sitemap).
  const indexableCalculators = calculators.filter(
    (calc) => !calc.noIndex,
  );

  const entries: SitemapEntry[] = indexableCalculators.map((calc) => ({
    url: `${SITE_URL}/calculadoras/${calc.slug}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: CATEGORY_PRIORITIES[calc.category] ?? 0.7,
    images: [`${SITE_URL}/calculadoras/${calc.slug}/opengraph-image`],
  }));

  const xml = renderUrlsetXml(entries);

  return new Response(xml, {
    status: 200,
    headers: SITEMAP_RESPONSE_HEADERS,
  });
}
