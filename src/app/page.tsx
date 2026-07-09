import type { Metadata } from 'next';

import OfficialValuesBlock from '@/components/home/OfficialValuesBlock';
import SearchHero from '@/components/home/SearchHero';
import PopularCalculators from '@/components/home/PopularCalculators';
import CategoryCatalog from '@/components/home/CategoryCatalog';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/site';

/**
 * Página principal — Server Component.
 *
 *   1. OfficialValuesBlock — valores oficiales (client island)
 *   2. SearchHero — buscador + chips top (client island)
 *   3. PopularCalculators — grid de alto tráfico (server, GSC-driven)
 *   4. CategoryCatalog — catálogo por categoría (server)
 *
 * AdSense: script global en root layout (auto ads).
 */
export const metadata: Metadata = {
  ...buildPageMetadata({
    path: '/',
    title: 'Calculadoras Chile 2026: IVA, CAE, sueldo y más',
    description:
      'Calculadoras gratis para Chile 2026: IVA 19%, simulador CAE, patente comercial, sueldo líquido, finiquito, permiso de circulación y UF. Actualizadas y sin registro.',
    keywords: [
      'calculadoras chilenas 2026',
      'calculadora IVA',
      'calculadora IVA chile',
      'simulador CAE 2026',
      'calculadora CAE',
      'patente comercial',
      'calculadora sueldo líquido',
      'calculadora finiquito',
      'permiso de circulación',
      'vacaciones proporcionales',
      'UF a pesos',
      'calculadora boleta honorarios',
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
      <PopularCalculators />
      <CategoryCatalog />
    </>
  );
}
