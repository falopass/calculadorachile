// ============================================
// Catálogo de calculadoras — /calculadoras
// ----------------------------------------------
// Lista todas las calculadoras agrupadas por categoría. Incluye:
//  - Metadata SEO completo (canonical, OG, twitter, keywords).
//  - JSON-LD CollectionPage + ItemList con todas las calculadoras.
//  - BreadcrumbList accesible con schema.
// ============================================

import type { Metadata } from 'next';
import Link from 'next/link';

import { calculators } from '@/data/calculators';
import type { Calculator } from '@/types/calculator';
import { absoluteUrl } from '@/lib/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import CalculatorsCatalog from '@/components/home/CalculatorsCatalog';
import JsonLd from '@/components/seo/JsonLd';
import {
  collectionPageSchema,
  breadcrumbSchema,
} from '@/lib/seo/schema';
import { CATEGORY_LABELS } from '@/lib/calculatorCategories';

const PAGE_TITLE = 'Catálogo de calculadoras de Chile 2026';
const PAGE_DESC = `Catálogo completo de ${calculators.length} calculadoras laborales, tributarias y financieras de Chile: sueldo líquido, finiquito, UF, IVA, crédito hipotecario, AFP, permiso de circulación y más. Gratis, sin registro, actualizadas a 2026.`;

export const metadata: Metadata = buildPageMetadata({
  path: '/calculadoras',
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: [
    'calculadoras chile',
    'calculadora sueldo líquido',
    'calculadora finiquito',
    'calculadora UF',
    'calculadora UTM',
    'calculadora IVA',
    'calculadora crédito hipotecario',
    'calculadora AFP',
    'calculadora permiso circulación',
    'calculadora boleta honorarios',
    'herramientas finanzas chile',
    'calculadoras gratuitas chile',
  ],
});

export default function CalculadorasPage() {
  const url = absoluteUrl('/calculadoras');

  // Build-time: agrupo por categoría
  const grouped = calculators.reduce<
    Record<Calculator['category'], Calculator[]>
  >(
    (acc, calc) => {
      (acc[calc.category] ??= []).push(calc);
      return acc;
    },
    {} as Record<Calculator['category'], Calculator[]>,
  );

  const categoryOrder = (Object.keys(grouped) as Calculator['category'][]).sort(
    (a, b) => grouped[b].length - grouped[a].length,
  );

  const groups = categoryOrder.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat] ?? cat,
    items: grouped[cat],
  }));

  // Schema: CollectionPage con ItemList completo + BreadcrumbList
  const schemas = [
    collectionPageSchema({
      url,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      items: calculators.map((c) => ({
        name: c.name,
        url: absoluteUrl(`/calculadoras/${c.slug}`),
        description: c.description,
      })),
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Calculadoras' },
    ]),
  ];

  return (
    <>
      <JsonLd id="catalog-schemas" data={schemas} />

      {/* Hero del catálogo */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.04]" />
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-[var(--color-primary-500)]/10 blur-[100px]"
        />
        <div className="container-base relative pt-12 pb-10 md:pt-16 md:pb-12">
          <nav aria-label="Migas de pan" className="mb-6 text-xs">
            <ol className="flex items-center gap-1.5 text-[var(--foreground-muted)]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[var(--foreground)] font-medium">Calculadoras</li>
            </ol>
          </nav>

          <h1 className="heading-display text-3xl md:text-5xl">
            Todas las <span className="text-gradient">calculadoras</span>
          </h1>
          <p className="mt-3 text-base md:text-lg text-[var(--foreground-secondary)] max-w-2xl">
            {calculators.length} herramientas gratuitas para sueldo, impuestos,
            vivienda, pensiones y más. Datos oficiales actualizados a 2026, con
            bases legales citadas y fórmulas explicadas.
          </p>
        </div>
      </section>

      <CalculatorsCatalog groups={groups} />
    </>
  );
}
