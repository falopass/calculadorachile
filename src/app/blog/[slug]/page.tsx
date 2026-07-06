// ============================================
// Artículo del blog — /blog/[slug]
// ----------------------------------------------
// Server Component que renderiza un artículo.
// Layout editorial profesional: header prominente,
// contenido en card, FAQ destacados, bloques relacionados.
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
  faqPageSchema,
} from '@/lib/seo/schema';
import {
  buildPageMetadata,
  estimateWordCount,
  estimateReadingTime,
} from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/site';
import { AUTHOR } from '@/lib/seo/author';
import { articles, getArticleBySlug } from '@/data/articles';
import { calculators } from '@/data/calculators';
import { guias } from '@/data/guias';
import { seoOverrides } from '@/data/seo-overrides';

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
      description: 'El artículo que buscas no existe o ha sido movida.',
      noIndex: true,
    });
  }

  return buildPageMetadata({
    path: `/blog/${article.slug}`,
    title: seoOverrides[article.slug]?.seoTitle ?? article.seoTitle ?? article.title,
    description: seoOverrides[article.slug]?.seoDescription ?? article.seoDescription ?? article.description,
    keywords: article.keywords,
    ogType: 'article',
    publishedTime: article.date,
    modifiedTime: article.updatedAt ?? article.date,
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

  const relatedCalcs = article.relatedCalculators
    .map((s) => calculators.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  const ogImageUrl = absoluteUrl(`/blog/${article.slug}/opengraph-image`);
  const schemas = [
    articleSchema({
      url,
      headline: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.description,
      datePublished: article.date,
      dateModified: article.updatedAt ?? article.date,
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
    ...(article.faq && article.faq.length > 0
      ? [faqPageSchema(article.faq)]
      : []),
  ];

  const formattedDate = new Date(article.date).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const updatedDate = article.updatedAt ?? article.date;
  const hasUpdate = updatedDate > article.date;
  const formattedUpdated = hasUpdate
    ? new Date(updatedDate).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const relatedGuiaSlug = article.relatedGuia;
  const relatedGuia = relatedGuiaSlug
    ? guias.find((g) => g.slug === relatedGuiaSlug)
    : undefined;

  return (
    <>
      <JsonLd id="blog-article" data={schemas} />
      <ReadingProgress />

      {/* Header prominente */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="container-base py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: article.title },
            ]}
          />

          <div className="mx-auto mt-6 max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-primary-100)] bg-[var(--accent-muted)] px-3 py-1.5 text-xs font-semibold capitalize text-[var(--accent)]">
                Blog · {article.category.replace('-', ' ')}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                <Clock className="h-3.5 w-3.5" />
                {readingTime} min de lectura
              </span>
            </div>

            <h1 className="heading-display text-3xl text-[var(--foreground)] md:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--foreground-secondary)] md:text-xl">
              {article.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[var(--foreground-muted)]">
              <Link
                href="/acerca-de"
                className="group flex items-center gap-2 transition-colors hover:text-[var(--accent)]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                  DS
                </div>
                <span className="group-hover:underline">Por {AUTHOR.name}</span>
              </Link>
              <span aria-hidden className="text-[var(--border)]">
                ·
              </span>
              <span>
                Publicado el <time dateTime={article.date}>{formattedDate}</time>
                {formattedUpdated && (
                  <>
                    {' · '}
                    Actualizado el{' '}
                    <time dateTime={updatedDate}>{formattedUpdated}</time>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </header>

      <article className="container-base py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          {/* Contenido en card */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm md:p-10">
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-[var(--foreground)]
                prose-headings:font-bold
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:scroll-mt-24
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-[var(--foreground-secondary)]
                prose-p:leading-relaxed
                prose-strong:text-[var(--foreground)]
                prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline
                prose-li:text-[var(--foreground-secondary)]"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* FAQ embebido */}
          {article.faq && article.faq.length > 0 && (
            <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
              <h2 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
                Preguntas frecuentes
              </h2>
              <div className="space-y-4">
                {article.faq.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5"
                  >
                    <h3
                      className="mb-2 text-base font-semibold text-[var(--foreground)]"
                      itemProp="name"
                    >
                      {item.question}
                    </h3>
                    <p
                      className="text-sm leading-relaxed text-[var(--foreground-secondary)]"
                      itemProp="text"
                    >
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Guía pillar relacionada */}
          {relatedGuia && (
            <aside className="mt-10 rounded-2xl border border-[var(--color-primary-100)] bg-[var(--accent-muted)] p-6">
              <Link
                href={`/guias/${relatedGuia.slug}`}
                className="group flex items-start gap-4"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                    Guía pillar relacionada
                  </p>
                  <h3 className="mb-1.5 text-base font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent-hover)] md:text-lg">
                    {relatedGuia.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--foreground-secondary)]">
                    {relatedGuia.description}
                  </p>
                  <p className="mt-2 text-xs text-[var(--foreground-muted)]">
                    {relatedGuia.readingTime} min de lectura · cobertura completa con tablas, ejemplos numéricos y bases legales.
                  </p>
                </div>
              </Link>
            </aside>
          )}

          {/* Calculadoras relacionadas */}
          {relatedCalcs.length > 0 && (
            <section className="mt-12">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]">
                  <Calculator className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-[var(--foreground)]">
                  Calculadoras relacionadas
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedCalcs.map((calc) => (
                  <Link
                    key={calc.id}
                    href={`/calculadoras/${calc.slug}`}
                    className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--accent)] hover:shadow-sm"
                  >
                    <h3 className="mb-1 text-sm font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                      {calc.name}
                    </h3>
                    <p className="line-clamp-2 text-xs text-[var(--foreground-muted)]">
                      {calc.description}
                    </p>
                    <span className="mt-2 inline-block text-xs font-medium text-[var(--accent)]">
                      Calcular →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Artículos relacionados */}
          {relatedArticles.length > 0 && (
            <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="mb-4 text-lg font-bold text-[var(--foreground)]">
                Sigue leyendo
              </h2>
              <ul className="space-y-3">
                {relatedArticles.map((art) => (
                  <li key={art.slug}>
                    <Link
                      href={`/blog/${art.slug}`}
                      className="group flex items-start gap-3 text-sm text-[var(--foreground-secondary)] transition-colors hover:text-[var(--accent)]"
                    >
                      <ArrowLeft className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 rotate-180 opacity-60 transition-opacity group-hover:opacity-100" />
                      <span className="line-clamp-2">{art.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Volver */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] transition-colors hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
