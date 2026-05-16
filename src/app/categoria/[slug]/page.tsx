// ============================================
// Categoría de calculadoras — /categoria/[slug]
// ----------------------------------------------
// URL canónica para queries long-tail "calculadoras de <X>".
//
// Cada slug corresponde a una de las categorías de `Calculator`
// (sueldo, vivienda, vehiculos, etc.) y muestra todas las
// calculadoras de ese rubro junto con guías y artículos
// relacionados.
//
// Estos slugs se generan estáticamente en build (`generateStaticParams`)
// y forman parte del sitemap. Schema.org `CollectionPage` con
// `ItemList` para que Google entienda el listado.
// ============================================

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import CalculatorCard from '@/components/home/CalculatorCard';
import JsonLd from '@/components/seo/JsonLd';
import {
  collectionPageSchema,
  breadcrumbSchema,
} from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/site';
import { calculators } from '@/data/calculators';
import { guias } from '@/data/guias';
import { articles } from '@/data/articles';
import {
  CALCULATOR_CATEGORY_LIST,
  getCalculatorCategory,
  type CalculatorCategory,
} from '@/lib/calculatorCategories';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-genera una página por categoría — hoy son 12. Devolver
 * `dynamicParams = false` adicional permitiría rechazar slugs no
 * conocidos en build, pero preferimos que `notFound()` haga el job.
 */
export async function generateStaticParams() {
  return CALCULATOR_CATEGORY_LIST.map((cat) => ({ slug: cat.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCalculatorCategory(slug);
  if (!cat) {
    return buildPageMetadata({
      path: `/categoria/${slug}`,
      title: 'Categoría no encontrada',
      description: 'La categoría que buscas no existe.',
      noIndex: true,
    });
  }

  const items = calculators.filter((c) => c.category === cat.id);
  const title = `${cat.pluralLabel} en Chile 2026`;
  const description = `${items.length} ${items.length === 1 ? 'herramienta' : 'herramientas'}: ${cat.description}`;

  return buildPageMetadata({
    path: `/categoria/${cat.id}`,
    title,
    description,
    keywords: cat.keywords,
  });
}

export default async function CategoriaPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = getCalculatorCategory(slug);
  if (!cat) notFound();

  const url = absoluteUrl(`/categoria/${cat.id}`);

  // Calculadoras de esta categoría
  const items = calculators.filter((c) => c.category === cat.id);
  if (items.length === 0) {
    // Categoría declarada en el tipo pero sin calculadoras todavía:
    // 404 explícito para que no quede una página vacía indexable.
    notFound();
  }

  // Guías relacionadas: usamos un mapping calculator-category →
  // guia-category. No es 1:1 porque el dominio es distinto: las
  // guías están en categorías más amplias ("laboral" agrupa sueldo
  // y beneficios). Lo definimos aquí para localizar este conocimiento
  // en una sola tabla.
  const GUIA_MAPPING: Partial<Record<CalculatorCategory, string[]>> = {
    sueldo: ['laboral'],
    beneficios: ['laboral'],
    impuestos: ['tributario'],
    vivienda: ['vivienda'],
    vehiculos: ['vehiculos'],
    pension: ['previsional'],
    conversiones: ['finanzas'],
    familia: ['familia'],
    educacion: ['educacion'],
  };
  const guiaCategories = GUIA_MAPPING[cat.id] ?? [];
  const relatedGuias = guias.filter((g) => guiaCategories.includes(g.category));

  // Artículos del blog: el campo `category` del blog también es un
  // string libre. Nos quedamos con los que matchen alguna palabra
  // clave evidente del slug de la categoría.
  const articleSlugs = new Set<string>();
  const relatedArticles = articles.filter((a) => {
    const cat = a.category.toLowerCase();
    if (slug === 'sueldo' || slug === 'beneficios') return cat === 'laboral';
    if (slug === 'impuestos') return cat === 'impuestos';
    if (slug === 'vivienda') return cat === 'vivienda';
    if (slug === 'conversiones') return cat === 'educacion-financiera';
    return false;
  }).filter((a) => {
    if (articleSlugs.has(a.slug)) return false;
    articleSlugs.add(a.slug);
    return true;
  }).slice(0, 4);

  // Schemas: CollectionPage con ItemList completo + BreadcrumbList.
  // El ItemList ranquea las calculadoras dentro del listado, lo que
  // mejora cómo Google entiende qué hay dentro de cada categoría.
  const schemas = [
    collectionPageSchema({
      url,
      name: `${cat.pluralLabel} en Chile 2026`,
      description: cat.description,
      items: items.map((c) => ({
        name: c.name,
        url: absoluteUrl(`/calculadoras/${c.slug}`),
        description: c.description,
      })),
      breadcrumb: [
        { name: 'Inicio', path: '/' },
        { name: 'Categorías', path: '/categoria' },
        { name: cat.pluralLabel },
      ],
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Categorías', path: '/categoria' },
      { name: cat.pluralLabel },
    ]),
  ];

  const Icon = cat.icon;

  return (
    <>
      <JsonLd id="categoria-schemas" data={schemas} />

      <div className="container-base py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Categorías', href: '/categoria' },
            { label: cat.pluralLabel },
          ]}
        />

        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <header className="mb-10 md:mb-12">
            <div className="flex items-start gap-4 mb-5">
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-md`}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium uppercase tracking-wide text-[var(--foreground-muted)]">
                  Categoría · {items.length} {items.length === 1 ? 'calculadora' : 'calculadoras'}
                </span>
                <h1 className="heading-display text-3xl md:text-4xl text-[var(--foreground)] mt-1.5 leading-tight">
                  {cat.pluralLabel}
                </h1>
              </div>
            </div>
            <p className="text-base md:text-lg text-[var(--foreground-secondary)] leading-relaxed max-w-3xl">
              {cat.description}
            </p>
          </header>

          {/* Grilla de calculadoras */}
          <section aria-label={`Calculadoras de ${cat.label}`} className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {items.map((calc, i) => (
                <CalculatorCard key={calc.id} calculator={calc} index={i} />
              ))}
            </div>
          </section>

          {/* Guías relacionadas */}
          {relatedGuias.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                Guías de {cat.label.toLowerCase()}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {relatedGuias.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guias/${g.slug}`}
                    className="group p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--color-primary-500)]/40 hover:shadow-sm transition-all"
                  >
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--foreground-muted)]">
                      {g.categoryLabel} · {g.readingTime} min
                    </span>
                    <h3 className="font-semibold text-[var(--foreground)] text-sm mt-1 mb-1 group-hover:text-[var(--color-primary-600)] transition-colors leading-snug">
                      {g.title}
                    </h3>
                    <p className="text-xs text-[var(--foreground-muted)] line-clamp-2">
                      {g.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Blog relacionado */}
          {relatedArticles.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">
                Artículos del blog
              </h2>
              <ul className="space-y-2">
                {relatedArticles.map((art) => (
                  <li key={art.slug}>
                    <Link
                      href={`/blog/${art.slug}`}
                      className="group flex items-center gap-2 text-sm text-[var(--foreground-secondary)] hover:text-[var(--color-primary-600)] transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                      <span className="line-clamp-1">{art.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Volver */}
          <div className="mt-10 pt-6 border-t border-[var(--border)] flex items-center justify-between">
            <Link
              href="/categoria"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-primary-600)] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Todas las categorías
            </Link>
            <Link
              href="/calculadoras"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
            >
              Catálogo completo
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
