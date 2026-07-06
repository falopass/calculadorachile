import type { Metadata } from 'next';

import OfficialValuesBlock from '@/components/home/OfficialValuesBlock';
import SearchHero from '@/components/home/SearchHero';
import CategoryCatalog from '@/components/home/CategoryCatalog';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/site';

/**
 * Página principal — Server Component.
 *
 * Tres bloques densos reemplazan las 5 secciones del template SaaS
 * anterior (HomeHero, PopularCalculators, CategoriesGrid, HowItWorks,
 * HomeCTA):
 *   1. OfficialValuesBlock — valores oficiales grandes (client island)
 *   2. SearchHero — buscador + chips (client island)
 *   3. CategoryCatalog — catálogo por categoría (server)
 *
 * AdSense queda automático vía el script global del root layout; no
 * hay banner manual en la home.
 *
 * SEO: H1 semántico vive dentro de OfficialValuesBlock. Metadata
 * específica de la home vía buildPageMetadata, manteniendo canonical
 * y hreflang es-CL + x-default.
 */
export const metadata: Metadata = {
  ...buildPageMetadata({
    path: '/',
    title: 'Calculadoras chilenas 2026',
    description:
      'Calculadoras laborales, tributarias y financieras para Chile: sueldo líquido, finiquito, UF, UTM, IVA, créditos y más. Gratis, precisas y actualizadas a 2026.',
    keywords: [
      'calculadoras chilenas 2026',
      'calculadora sueldo líquido',
      'calculadora finiquito',
      'UF a pesos',
      'calculadora IVA',
      'calculadora boleta honorarios',
      'calculadora horas extra',
      'calculadora crédito hipotecario',
    ],
  }),
  alternates: {
    canonical: '/',
    languages: {
      'es-CL': SITE_URL,
      'x-default': SITE_URL,
    },
  },
};

export default function HomePage() {
  return (
    <>
      <OfficialValuesBlock />
      <SearchHero />
      <CategoryCatalog />
    </>
  );
}
