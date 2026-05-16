// ============================================
// Índice de categorías de calculadoras — /categoria
// ----------------------------------------------
// Página de aterrizaje que lista las 12 categorías de calculadoras
// como tarjetas. Sirve como hub para SEO long-tail: cada tarjeta
// linkea a /categoria/<id> (URL canónica para "calculadoras de X").
//
// El catálogo principal vive en /calculadoras (con buscador y
// filtros). Esta página es complementaria: optimiza para queries
// del tipo "calculadoras de vivienda chile", donde el usuario
// quiere ver TODAS las herramientas del rubro en una sola pantalla.
// ============================================

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import {
  collectionPageSchema,
  breadcrumbSchema,
} from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/site';
import { calculators } from '@/data/calculators';
import { CALCULATOR_CATEGORY_LIST } from '@/lib/calculatorCategories';

const PAGE_TITLE = 'Categorías de calculadoras de Chile';
const PAGE_DESC =
  'Explora las 12 categorías de calculadoras chilenas: sueldo, impuestos, beneficios, vivienda, vehículos, pensiones, educación, hogar, empresas y más. Encuentra rápido la herramienta exacta que necesitas.';

export const metadata: Metadata = buildPageMetadata({
  path: '/categoria',
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: [
    'categorías calculadoras chile',
    'calculadoras por tema',
    'herramientas finanzas chile',
    'calculadoras laborales',
    'calculadoras vivienda',
  ],
});

export default function CategoriaIndexPage() {
  const url = absoluteUrl('/categoria');

  // Conteo de calculadoras por categoría — se usa en cada tarjeta.
  // Lo calculamos aquí (en build) para no recorrer 40 calculadoras
  // por cada tarjeta en el render.
  const counts = calculators.reduce<Record<string, number>>((acc, c) => {
    acc[c.category] = (acc[c.category] ?? 0) + 1;
    return acc;
  }, {});

  // Filtramos categorías sin calculadoras: aparecen en el tipo
  // (porque el sitio puede agregar nuevas) pero hoy no tienen
  // contenido y no queremos páginas /categoria/<vacía>.
  const visibleCategories = CALCULATOR_CATEGORY_LIST.filter(
    (cat) => (counts[cat.id] ?? 0) > 0,
  );

  const schemas = [
    collectionPageSchema({
      url,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      items: visibleCategories.map((cat) => ({
        name: cat.pluralLabel,
        url: absoluteUrl(`/categoria/${cat.id}`),
        description: cat.description,
      })),
      breadcrumb: [
        { name: 'Inicio', path: '/' },
        { name: 'Categorías' },
      ],
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Categorías' },
    ]),
  ];

  return (
    <>
      <JsonLd id="categoria-index" data={schemas} />

      <div className="container-base py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Categorías' },
          ]}
        />

        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-10 md:mb-12">
            <h1 className="heading-display text-3xl md:text-4xl text-[var(--foreground)] mb-3">
              {PAGE_TITLE}
            </h1>
            <p className="text-base md:text-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto leading-relaxed">
              {PAGE_DESC}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleCategories.map((cat) => {
              const Icon = cat.icon;
              const count = counts[cat.id] ?? 0;
              return (
                <Link
                  key={cat.id}
                  href={`/categoria/${cat.id}`}
                  className="group p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:shadow-md transition-all"
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-semibold text-[var(--foreground)] text-base md:text-lg mb-1.5 group-hover:text-[var(--color-primary-600)] transition-colors leading-snug">
                    {cat.pluralLabel}
                  </h2>
                  <p className="text-sm text-[var(--foreground-secondary)] line-clamp-3 mb-4 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--foreground-muted)]">
                      {count} {count === 1 ? 'calculadora' : 'calculadoras'}
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium text-[var(--color-primary-600)] group-hover:gap-1.5 transition-all">
                      Ver categoría
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA al catálogo completo */}
          <div className="mt-12 p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] text-center">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              ¿Buscas una calculadora específica?
            </h2>
            <p className="text-sm text-[var(--foreground-secondary)] mb-4">
              Usa el buscador en el catálogo para filtrar entre las {calculators.length} calculadoras.
            </p>
            <Link
              href="/calculadoras"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary-600)] text-white text-sm font-medium hover:bg-[var(--color-primary-500)] transition-all"
            >
              Ver catálogo completo
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
