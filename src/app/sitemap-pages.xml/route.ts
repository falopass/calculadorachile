// ============================================
// Sub-sitemap: páginas estáticas + categorías
// ----------------------------------------------
// Incluye home, /calculadoras, /blog, /guias, /faq, /acerca-de,
// /equipo, /cookies y todas las páginas de categoría con calculadoras
// asignadas.
//
// `/buscar`, `/privacidad` y `/terminos` NO se incluyen: tienen noindex
// y agregarlas al sitemap es contraproducente (Google las rechazaría
// como "indexed but blocked", confundiendo el crawl budget).
// ============================================

import { calculators } from '@/data/calculators';
import { CALCULATOR_CATEGORY_LIST } from '@/lib/calculatorCategories';
import {
  SITE_URL,
  SITE_LAST_MODIFIED,
  renderUrlsetXml,
  SITEMAP_RESPONSE_HEADERS,
  type SitemapEntry,
} from '@/lib/seo/sitemap-helpers';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  // Páginas estáticas principales
  const staticPages: SitemapEntry[] = [
    {
      url: SITE_URL,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [`${SITE_URL}/og-image.png`],
    },
    {
      url: `${SITE_URL}/calculadoras`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [`${SITE_URL}/og-image.png`],
    },
    {
      url: `${SITE_URL}/categoria`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guias`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/equipo`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/acerca-de`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified: new Date('2026-03-31'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Páginas de categoría: una por cada categoría con calculadoras
  // asignadas. No incluimos categorías vacías para no diluir el
  // crawl budget.
  const categoryCounts = calculators.reduce<Record<string, number>>(
    (acc, c) => {
      acc[c.category] = (acc[c.category] ?? 0) + 1;
      return acc;
    },
    {},
  );
  const categoryPages: SitemapEntry[] = CALCULATOR_CATEGORY_LIST
    .filter((cat) => (categoryCounts[cat.id] ?? 0) > 0)
    .map((cat) => ({
      url: `${SITE_URL}/categoria/${cat.id}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }));

  const xml = renderUrlsetXml([...staticPages, ...categoryPages]);

  return new Response(xml, {
    status: 200,
    headers: SITEMAP_RESPONSE_HEADERS,
  });
}
