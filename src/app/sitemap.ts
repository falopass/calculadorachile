// ============================================
// Sitemap dinámico para SEO
// ----------------------------------------------
// Genera /sitemap.xml automáticamente con:
//   - Páginas estáticas (home, catálogo, blog, guías, FAQ, legales)
//   - 40 calculadoras con prioridad por categoría
//   - 10 artículos del blog con fecha real de publicación
//   - 6 guías pillar con fecha de actualización
//
// `lastModified` usa fechas reales del contenido (no `new Date()` en
// cada build) para que los crawlers vean frescura solo cuando hay
// cambio real.
//
// Las URLs de calculadora, artículo y guía incluyen el campo `images`
// apuntando a la OG image dinámica generada por opengraph-image.tsx.
// Esto habilita Google Image Search y enriquece la información que
// Google tiene sobre cada URL.
// ============================================

import type { MetadataRoute } from 'next';
import { calculators } from '@/data/calculators';
import { articles } from '@/data/articles';
import { guias } from '@/data/guias';
import { SITE_URL } from '@/lib/site';

// Prioridades por categoría de calculadora (heurística por demanda
// de búsqueda en Chile).
const CATEGORY_PRIORITIES: Record<string, number> = {
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

// Fecha estable para el sitio en general. Se actualiza solo cuando se
// reedita estructura/contenido global (hoy: relanzamiento SEO).
const SITE_LAST_MODIFIED = new Date('2026-05-15');

export default function sitemap(): MetadataRoute.Sitemap {
  // Calculadoras: prioridad por categoría, lastModified = fecha global,
  // images = OG dinámica de la calculadora.
  const calculatorPages: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${SITE_URL}/calculadoras/${calc.slug}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: CATEGORY_PRIORITIES[calc.category] ?? 0.7,
    images: [`${SITE_URL}/calculadoras/${calc.slug}/opengraph-image`],
  }));

  // Blog: fecha real de publicación, OG dinámica del artículo.
  const blogPages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
    images: [`${SITE_URL}/blog/${article.slug}/opengraph-image`],
  }));

  // Guías pillar: fecha de actualización (más reciente que la
  // publicación si hay revisiones), OG dinámica de la guía.
  const guiasPages: MetadataRoute.Sitemap = guias.map((g) => ({
    url: `${SITE_URL}/guias/${g.slug}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.85, // las guías pillar son más profundas que el blog
    images: [`${SITE_URL}/guias/${g.slug}/opengraph-image`],
  }));

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
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
      url: `${SITE_URL}/privacidad`,
      lastModified: new Date('2026-03-31'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terminos`,
      lastModified: new Date('2026-03-31'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified: new Date('2026-03-31'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return [...staticPages, ...calculatorPages, ...guiasPages, ...blogPages];
}
