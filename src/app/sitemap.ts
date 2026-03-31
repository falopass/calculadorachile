// ============================================
// Sitemap dinámico para SEO
// Genera automáticamente todas las URLs del sitio
// ============================================

import { MetadataRoute } from 'next';
import { calculators } from '@/data/calculators';
import { articles } from '@/data/articles';

const BASE_URL = 'https://calculachile.cl';

// Prioridades según importancia del contenido
const CATEGORY_PRIORITIES: Record<string, number> = {
  'sueldo': 0.9,
  'impuestos': 0.85,
  'beneficios': 0.85,
  'conversiones': 0.8,
  'vivienda': 0.75,
  'vehiculos': 0.75,
  'familia': 0.7,
  'empresas': 0.7,
  'pension': 0.7,
  'educacion': 0.65,
  'hogar': 0.65,
  'servicios': 0.6,
};

export default function sitemap(): MetadataRoute.Sitemap {
  // Páginas de calculadoras con prioridad por categoría
  const calculatorPages = calculators.map((calc) => ({
    url: `${BASE_URL}/calculadoras/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: CATEGORY_PRIORITIES[calc.category] || 0.7,
  }));

  // Páginas del blog con fecha real
  const blogPages = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Páginas estáticas con prioridades diferenciadas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    },
    {
      url: `${BASE_URL}/guias`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    },
    {
      url: `${BASE_URL}/#calculadoras`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9
    },
    {
      url: `${BASE_URL}/#como-funciona`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    },
    // Páginas legales
    {
      url: `${BASE_URL}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3
    },
    {
      url: `${BASE_URL}/terminos`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3
    },
  ];

  return [...staticPages, ...calculatorPages, ...blogPages];
}
