// ============================================
// Sub-sitemap: calculadoras
// ----------------------------------------------
// 40 calculadoras con prioridad por categoría y `images` apuntando
// a la OG dinámica generada por opengraph-image.tsx.
//
// `lastmod` refleja la última revisión editorial de cada calculadora
// (`calc.lastReviewed` del catálogo), no la fecha del build: si el
// campo falta o es inválido se cae a `SITE_LAST_MODIFIED`.
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

/**
 * Parsea una fecha `YYYY-MM-DD` (formato de `Calculator.lastReviewed`)
 * a `Date` en UTC. Devuelve `null` si el string falta o no es una
 * fecha válida, para que el caller caiga a `SITE_LAST_MODIFIED`.
 */
function parseLastReviewed(value: string | undefined): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function GET() {
  // Excluir calculadoras marcadas `noIndex` del sitemap para no
  // enviar señales contradictorias a Google (noindex + sitemap).
  const indexableCalculators = calculators.filter(
    (calc) => !calc.noIndex,
  );

  const entries: SitemapEntry[] = indexableCalculators.map((calc) => ({
    url: `${SITE_URL}/calculadoras/${calc.slug}`,
    lastModified: parseLastReviewed(calc.lastReviewed) ?? SITE_LAST_MODIFIED,
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
