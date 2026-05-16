// ============================================
// Sub-sitemap: blog
// ----------------------------------------------
// Cada artículo usa su fecha real de publicación. Si en el futuro
// se agrega un campo `updatedAt`, conviene reemplazar `article.date`
// por `article.updatedAt ?? article.date`.
// ============================================

import { articles } from '@/data/articles';
import {
  SITE_URL,
  renderUrlsetXml,
  SITEMAP_RESPONSE_HEADERS,
  type SitemapEntry,
} from '@/lib/seo/sitemap-helpers';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  const entries: SitemapEntry[] = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
    images: [`${SITE_URL}/blog/${article.slug}/opengraph-image`],
  }));

  const xml = renderUrlsetXml(entries);

  return new Response(xml, {
    status: 200,
    headers: SITEMAP_RESPONSE_HEADERS,
  });
}
