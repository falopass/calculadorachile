// ============================================
// Artículo del blog — /blog/[slug]
// ----------------------------------------------
// Server Component que renderiza un artículo. Incluye:
//  - Metadata SEO completo (canonical, OG article, twitter)
//  - JSON-LD Article + BreadcrumbList + WebPage
//  - Calculadoras relacionadas con nombres reales (no slugs)
//  - Artículos relacionados de la misma categoría
//  - Breadcrumbs accesibles
// ============================================

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calculator, Clock } from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import ReadingProgress from '@/components/article/ReadingProgress';
import {
  articleSchema,
  breadcrumbSchema,
} from '@/lib/seo/schema';
import {
  buildPageMetadata,
  estimateWordCount,
  estimateReadingTime,
} from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/site';
import { articles, getArticleBySlug } from '@/data/articles';
import { calculators } from '@/data/calculators';
import { guias } from '@/data/guias';

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return buildPageMetadata({
      path: `/blog/${slug}`,
      title: 'Artículo no encontrado',
      description: 'El artículo que buscas no existe o ha sido movido.',
      noIndex: true,
    });
  }

  return buildPageMetadata({
    path: `/blog/${article.slug}`,
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    ogType: 'article',
    publishedTime: article.date,
    modifiedTime: article.date,
    section: article.category,
    tags: article.keywords,
    ogImage: {
      url: absoluteUrl(`/blog/${article.slug}/opengraph-image`),
      alt: `${article.title} — Blog CalculaChile`,
      width: 1200,
      height: 630,
    },
  });
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const url = absoluteUrl(`/blog/${article.slug}`);
  const wordCount = estimateWordCount(article.content);
  const readingTime = estimateReadingTime(wordCount);

  // Resolver calculadoras relacionadas (de slug a objeto Calculator)
  const relatedCalcs = article.relatedCalculators
    .map((s) => calculators.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // Artículos relacionados de la misma categoría (excluyendo el actual)
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  // Schemas: Article + BreadcrumbList
  const ogImageUrl = absoluteUrl(`/blog/${article.slug}/opengraph-image`);
  const schemas = [
    articleSchema({
      url,
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      dateModified: article.date,
      keywords: article.keywords,
      articleSection: article.category,
      wordCount,
      imageUrl: ogImageUrl,
      mentions: relatedCalcs.map((c) => absoluteUrl(`/calculadoras/${c.slug}`)),
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: article.title },
    ]),
  ];

  const formattedDate = new Date(article.date).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Guía pillar relacionada (si la hay declarada en el artículo).
  const relatedGuiaSlug = article.relatedGuia;
  const relatedGuia = relatedGuiaSlug
    ? guias.find((g) => g.slug === relatedGuiaSlug)
    : undefined;

  return (
    <>
      <JsonLd id="blog-article" data={schemas} />
      <ReadingProgress />

      <article className="container-base py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: article.title },
          ]}
        />

        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 capitalize">
                Blog · {article.category.replace('-', ' ')}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-[var(--foreground-muted)]">
                <Clock className="w-3.5 h-3.5" />
                {readingTime} min de lectura
              </span>
            </div>
            <h1 className="heading-display text-4xl md:text-5xl text-[var(--foreground)] mb-5 leading-[1.1]">
              {article.title}
            </h1>
            <p className="text-lg md:text-xl text-[var(--foreground-secondary)] leading-relaxed">
              {article.description}
            </p>
            <div className="mt-6 pt-5 border-t border-[var(--border)] flex flex-wrap items-center gap-4 text-sm text-[var(--foreground-muted)]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                  CC
                </div>
                <span>Equipo CalculaChile</span>
              </div>
              <span className="text-[var(--border)]">·</span>
              <span>Publicado el {formattedDate}</span>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-[var(--foreground)]
              prose-headings:font-bold
              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-[var(--foreground-secondary)]
              prose-p:leading-relaxed
              prose-strong:text-[var(--foreground)]
              prose-a:text-[var(--color-primary-600)]
              prose-a:no-underline hover:prose-a:underline
              prose-li:text-[var(--foreground-secondary)]
              prose-ul:my-5 prose-ol:my-5"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/*
            Bloque "Lee la guía completa" — linking interno blog →
            guía pillar. Aparece si el artículo declara `relatedGuia`.
          */}
          {relatedGuia && (
            <aside className="mt-12 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.04] to-emerald-500/[0.02] p-6">
              <Link
                href={`/guias/${relatedGuia.slug}`}
                className="group flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-1">
                    Guía pillar relacionada
                  </p>
                  <h3 className="text-base md:text-lg font-semibold text-[var(--foreground)] mb-1.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    {relatedGuia.title}
                  </h3>
                  <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
                    {relatedGuia.description}
                  </p>
                  <p className="text-xs text-[var(--foreground-muted)] mt-2">
                    {relatedGuia.readingTime} min de lectura · cobertura completa con tablas, ejemplos numéricos y bases legales.
                  </p>
                </div>
              </Link>
            </aside>
          )}

          {/* Calculadoras relacionadas */}
          {relatedCalcs.length > 0 && (
            <section className="mt-12 pt-8 border-t border-[var(--border)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-500)]/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-[var(--color-primary-500)]" />
                </div>
                <h2 className="text-xl font-bold text-[var(--foreground)]">
                  Calculadoras relacionadas
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedCalcs.map((calc) => (
                  <Link
                    key={calc.id}
                    href={`/calculadoras/${calc.slug}`}
                    className="group flex items-start gap-3 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--color-primary-500)]/40 hover:shadow-sm transition-all"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-[var(--foreground)] mb-1 group-hover:text-[var(--color-primary-600)] transition-colors">
                        {calc.name}
                      </h3>
                      <p className="text-xs text-[var(--foreground-muted)] line-clamp-2">
                        {calc.description}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-[var(--color-primary-600)] whitespace-nowrap">
                      Calcular →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Artículos relacionados */}
          {relatedArticles.length > 0 && (
            <section className="mt-10">
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">
                Sigue leyendo
              </h2>
              <ul className="space-y-2.5">
                {relatedArticles.map((art) => (
                  <li key={art.slug}>
                    <Link
                      href={`/blog/${art.slug}`}
                      className="group flex items-center gap-2 text-sm text-[var(--foreground-secondary)] hover:text-[var(--color-primary-600)] transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-60 group-hover:opacity-100" />
                      <span className="line-clamp-1">{art.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Volver */}
          <div className="mt-10 pt-6 border-t border-[var(--border)]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-primary-600)] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
