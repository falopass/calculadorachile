// ============================================
// Guía individual — /guias/[slug]
// ----------------------------------------------
// Server Component que renderiza una guía pillar de larga forma.
// Incluye: metadata SEO completo, JSON-LD Article + BreadcrumbList,
// table of contents, secciones con H2/H3, calculadoras y artículos
// relacionados, fuentes oficiales.
// ============================================

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calculator, ExternalLink } from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import {
  articleSchema,
  breadcrumbSchema,
  webPageSchema,
} from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/site';
import { guias, getGuiaBySlug } from '@/data/guias';
import { calculators } from '@/data/calculators';
import { articles } from '@/data/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guias.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guia = getGuiaBySlug(slug);
  if (!guia) {
    return buildPageMetadata({
      path: `/guias/${slug}`,
      title: 'Guía no encontrada',
      description: 'La guía que buscas no existe o ha sido movida.',
      noIndex: true,
    });
  }

  return buildPageMetadata({
    path: `/guias/${guia.slug}`,
    title: guia.title,
    description: guia.description,
    keywords: guia.keywords,
    ogType: 'article',
    publishedTime: guia.publishedAt,
    modifiedTime: guia.updatedAt,
    section: guia.categoryLabel,
    tags: guia.keywords,
  });
}

export default async function GuiaPage({ params }: PageProps) {
  const { slug } = await params;
  const guia = getGuiaBySlug(slug);
  if (!guia) notFound();

  const url = absoluteUrl(`/guias/${guia.slug}`);

  // Calculadoras relacionadas (resolver desde el slug de la URL)
  const relatedCalcs = guia.relatedCalculators
    .map((s) => calculators.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // Artículos del blog relacionados
  const relatedArts = guia.relatedArticles
    .map((s) => articles.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  // Schema: Article + BreadcrumbList + WebPage
  const schemas = [
    articleSchema({
      url,
      headline: guia.title,
      description: guia.description,
      datePublished: guia.publishedAt,
      dateModified: guia.updatedAt,
      keywords: guia.keywords,
      articleSection: guia.categoryLabel,
      mentions: [
        ...relatedCalcs.map((c) => absoluteUrl(`/calculadoras/${c.slug}`)),
        ...relatedArts.map((a) => absoluteUrl(`/blog/${a.slug}`)),
      ],
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Guías', path: '/guias' },
      { name: guia.title },
    ]),
    webPageSchema({
      url,
      name: guia.title,
      description: guia.description,
      datePublished: guia.publishedAt,
      dateModified: guia.updatedAt,
    }),
  ];

  const formattedDate = new Date(guia.updatedAt).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <JsonLd id="guia-schemas" data={schemas} />

      <article className="container-base py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Guías', href: '/guias' },
            { label: guia.title },
          ]}
        />

        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-600)]">
                <BookOpen className="w-3.5 h-3.5" />
                {guia.categoryLabel}
              </span>
              <span className="text-xs text-[var(--foreground-muted)]">
                {guia.readingTime} min de lectura
              </span>
            </div>
            <h1 className="heading-display text-3xl md:text-4xl text-[var(--foreground)] mb-4">
              {guia.title}
            </h1>
            <p className="text-lg text-[var(--foreground-secondary)] leading-relaxed">
              {guia.description}
            </p>
            <p className="text-sm text-[var(--foreground-muted)] mt-3">
              Actualizado el {formattedDate}
            </p>
          </header>

          {/* Tabla de contenidos */}
          <nav
            aria-label="Tabla de contenidos"
            className="mb-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3 uppercase tracking-wide">
              En esta guía
            </h2>
            <ol className="space-y-1.5 text-sm">
              {guia.sections
                .filter((s) => s.level === 2)
                .map((section, idx) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-[var(--foreground-secondary)] hover:text-[var(--color-primary-600)] transition-colors"
                    >
                      <span className="text-[var(--foreground-muted)] mr-2">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
            </ol>
          </nav>

          {/* Secciones */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-[var(--foreground)]
              prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-[var(--foreground-secondary)]
              prose-p:leading-relaxed
              prose-strong:text-[var(--foreground)]
              prose-a:text-[var(--color-primary-600)] prose-a:no-underline hover:prose-a:underline
              prose-li:text-[var(--foreground-secondary)]
              prose-table:text-sm
              prose-th:text-[var(--foreground)] prose-th:bg-[var(--background-secondary)]
              prose-td:text-[var(--foreground-secondary)]
              prose-code:text-[var(--color-primary-700)] prose-code:bg-[var(--color-primary-500)]/10
              prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-code:font-medium prose-code:before:content-none prose-code:after:content-none"
          >
            {guia.sections.map((section) =>
              section.level === 2 ? (
                <section key={section.id} id={section.id}>
                  <h2>{section.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: section.html }} />
                </section>
              ) : (
                <div key={section.id} id={section.id}>
                  <h3>{section.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: section.html }} />
                </div>
              ),
            )}
          </div>

          {/* Calculadoras relacionadas */}
          {relatedCalcs.length > 0 && (
            <section className="mt-14 pt-10 border-t border-[var(--border)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-500)]/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-[var(--color-primary-500)]" />
                </div>
                <h2 className="text-xl font-bold text-[var(--foreground)]">
                  Calculadoras relacionadas
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {relatedCalcs.map((calc) => (
                  <Link
                    key={calc.id}
                    href={`/calculadoras/${calc.slug}`}
                    className="group p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:shadow-sm transition-all"
                  >
                    <h3 className="font-semibold text-[var(--foreground)] text-sm mb-1 group-hover:text-[var(--color-primary-600)] transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-xs text-[var(--foreground-muted)] line-clamp-2">
                      {calc.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Artículos del blog */}
          {relatedArts.length > 0 && (
            <section className="mt-10">
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">
                Sigue leyendo en el blog
              </h2>
              <ul className="space-y-2">
                {relatedArts.map((art) => (
                  <li key={art.slug}>
                    <Link
                      href={`/blog/${art.slug}`}
                      className="flex items-center gap-2 text-sm text-[var(--color-primary-600)] hover:underline"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                      {art.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Fuentes */}
          {guia.sources.length > 0 && (
            <section className="mt-10 pt-6 border-t border-[var(--border)]">
              <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3 uppercase tracking-wide">
                Fuentes oficiales
              </h2>
              <ul className="space-y-1.5">
                {guia.sources.map((source) => (
                  <li key={source.url} className="text-sm">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[var(--foreground-secondary)] hover:text-[var(--color-primary-600)] transition-colors"
                    >
                      {source.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Volver */}
          <div className="mt-10">
            <Link
              href="/guias"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-primary-600)] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Guías
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
