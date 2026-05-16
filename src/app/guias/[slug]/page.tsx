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
import { ArrowLeft, BookOpen, Calculator, Clock, ExternalLink, List } from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import TocSticky from '@/components/article/TocSticky';
import ReadingProgress from '@/components/article/ReadingProgress';
import {
  articleSchema,
  breadcrumbSchema,
  webPageSchema,
  learningResourceSchema,
  howToSchema,
} from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/site';
import { AUTHOR } from '@/lib/seo/author';
import { guias, getGuiaBySlug, type Guia } from '@/data/guias';
import { calculators } from '@/data/calculators';
import { articles } from '@/data/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guias.map((g) => ({ slug: g.slug }));
}

/**
 * Extrae texto plano (sin HTML) de una sección y lo limita a `max`
 * caracteres cortando en el último espacio. Necesario porque
 * `HowToStep.text` debe ser conciso para que Google muestre los
 * pasos en SERPs.
 */
function clampSectionText(html: string, max = 220): string {
  const flat = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (flat.length <= max) return flat;
  const truncated = flat.slice(0, max);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '…';
}

/**
 * Convierte las secciones H2 de una guía en pasos de HowTo. Usa el
 * título de la sección como nombre del paso, y un resumen del HTML
 * de su cuerpo como `text`. La URL del paso apunta al ancla de la
 * sección dentro de la guía (deep link a la sección específica).
 *
 * Sólo consideramos secciones de nivel 2 (las H3 son sub-temas, no
 * pasos del recorrido). Si la guía tiene más de 8 secciones H2 nos
 * quedamos con las primeras 8 para mantener el HowTo tractable
 * (Google no muestra más de ~6-8 pasos en SERPs).
 */
function buildGuiaHowToSteps(
  guia: Guia,
  baseUrl: string,
): { name: string; text: string; url: string }[] {
  return guia.sections
    .filter((s) => s.level === 2)
    .slice(0, 8)
    .map((section) => ({
      name: section.title,
      text: clampSectionText(section.html),
      url: `${baseUrl}#${section.id}`,
    }));
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
    ogImage: {
      url: absoluteUrl(`/guias/${guia.slug}/opengraph-image`),
      alt: `${guia.title} — Guía CalculaChile`,
      width: 1200,
      height: 630,
    },
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

  // Guías relacionadas (cross-link entre pillars). Estrategia:
  //  1. Misma categoría → primeras 2 guías distintas a la actual.
  //  2. Si no alcanza, completa con otras guías de cualquier categoría
  //     hasta tener un máximo de 3.
  // Esto refuerza el grafo de linking interno entre pillars sin que
  // tengamos que mantener un mapping manual por guía.
  const sameCategoryGuias = guias.filter(
    (g) => g.category === guia.category && g.slug !== guia.slug,
  );
  const otherCategoryGuias = guias.filter(
    (g) => g.category !== guia.category && g.slug !== guia.slug,
  );
  const relatedGuias: Guia[] = [
    ...sameCategoryGuias,
    ...otherCategoryGuias,
  ].slice(0, 3);

  const ogImageUrl = absoluteUrl(`/guias/${guia.slug}/opengraph-image`);

  // Schema: Article + LearningResource + BreadcrumbList + WebPage + HowTo.
  // - Article: para Google News / Discover y rich results clásicos.
  // - LearningResource: para "About this result" educativo, mejora la
  //   comprensión semántica de que es un recurso pedagógico.
  // - WebPage: ancla la página y permite breadcrumb + dates.
  // - HowTo: pasos derivados de las secciones H2 de la guía. Habilita
  //   que Google pueda mostrar los pasos como rich result en SERPs
  //   ("Cómo calcular el sueldo líquido en Chile: 8 pasos").
  const howToSteps = buildGuiaHowToSteps(guia, url);

  const schemas: Record<string, unknown>[] = [
    articleSchema({
      url,
      headline: guia.title,
      description: guia.description,
      datePublished: guia.publishedAt,
      dateModified: guia.updatedAt,
      keywords: guia.keywords,
      articleSection: guia.categoryLabel,
      imageUrl: ogImageUrl,
      mentions: [
        ...relatedCalcs.map((c) => absoluteUrl(`/calculadoras/${c.slug}`)),
        ...relatedArts.map((a) => absoluteUrl(`/blog/${a.slug}`)),
        ...relatedGuias.map((g) => absoluteUrl(`/guias/${g.slug}`)),
      ],
    }),
    learningResourceSchema({
      url,
      name: guia.title,
      description: guia.description,
      datePublished: guia.publishedAt,
      dateModified: guia.updatedAt,
      about: guia.categoryLabel,
      teaches: guia.intent,
      timeRequired: `PT${guia.readingTime}M`,
      audience: 'Trabajadores y contribuyentes en Chile',
      keywords: guia.keywords,
      imageUrl: ogImageUrl,
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
      primaryImageOfPage: ogImageUrl,
    }),
  ];

  // HowTo sólo si la guía tiene al menos 3 secciones H2 — con menos
  // pasos no agrega valor sobre el Article y Google puede marcarlo
  // como "thin content".
  if (howToSteps.length >= 3) {
    schemas.push(
      howToSchema({
        name: `${guia.title}: pasos clave`,
        description: guia.intent,
        url,
        // Tiempo total estimado en formato ISO 8601. Reusamos el
        // readingTime de la guía como proxy del tiempo necesario
        // para "ejecutar" los pasos (leyéndolos).
        totalTime: `PT${guia.readingTime}M`,
        steps: howToSteps,
      }),
    );
  }

  const formattedDate = new Date(guia.updatedAt).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <JsonLd id="guia-schemas" data={schemas} />
      <ReadingProgress />

      <article className="container-base py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Guías', href: '/guias' },
            { label: guia.title },
          ]}
        />

        {/*
          Header — versión "hero" más generosa: badge categoría con
          icono, título grande tipo display, descripción larga,
          metadatos editoriales (autor + fecha + lectura) y un
          accent-bar superior para distinguir guías de blog y de
          calculadoras (cada superficie tiene su acento de color).
        */}
        <header className="max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <BookOpen className="w-3.5 h-3.5" />
              Guía pillar · {guia.categoryLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
              <Clock className="w-3.5 h-3.5" />
              {guia.readingTime} min de lectura
            </span>
          </div>
          <h1 className="heading-display text-4xl md:text-5xl text-[var(--foreground)] mb-5 leading-[1.1]">
            {guia.title}
          </h1>
          <p className="text-lg md:text-xl text-[var(--foreground-secondary)] leading-relaxed">
            {guia.description}
          </p>
          <div className="mt-6 pt-5 border-t border-[var(--border)] flex flex-wrap items-center gap-4 text-sm text-[var(--foreground-muted)]">
            <Link
              href="/equipo"
              className="flex items-center gap-2 hover:text-[var(--color-primary-600)] transition-colors group"
              aria-label={`Perfil de ${AUTHOR.name}`}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] flex items-center justify-center text-white text-[10px] font-bold">
                DS
              </div>
              <span className="group-hover:underline">Por {AUTHOR.name}</span>
            </Link>
            <span className="text-[var(--border)]">·</span>
            <span>Actualizado el {formattedDate}</span>
          </div>
        </header>

        {/*
          Grid responsive: en >=lg, el TOC sticky queda a la izquierda
          (3 cols) y el contenido a la derecha (8 cols, 1 col de
          margen). En mobile/tablet, el TOC va arriba como bloque
          colapsable y el contenido ocupa el ancho completo.
        */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* TOC Sticky (desktop) / TOC arriba (mobile) */}
          <aside className="lg:col-span-3 lg:order-1 order-1">
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2">
              {/* Mobile: bloque collapsible */}
              <details className="lg:hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 mb-6" open>
                <summary className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide select-none">
                  <List className="w-4 h-4" />
                  En esta guía
                </summary>
                <ol className="mt-3 space-y-1 list-none">
                  {guia.sections
                    .filter((s) => s.level === 2)
                    .map((section, idx) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="toc-link block"
                        >
                          <span className="text-[var(--foreground-muted)] mr-2 tabular-nums">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          {section.title}
                        </a>
                      </li>
                    ))}
                </ol>
              </details>
              {/* Desktop: TOC con scroll-spy */}
              <div className="hidden lg:block">
                <TocSticky
                  items={guia.sections
                    .filter((s) => s.level === 2)
                    .map((s) => ({ id: s.id, title: s.title }))}
                  title="En esta guía"
                />
              </div>
            </div>
          </aside>

          {/* Contenido principal */}
          <div className="lg:col-span-8 lg:col-start-5 order-2 max-w-3xl">
            {/* Secciones */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-[var(--foreground)]
                prose-headings:font-bold
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:scroll-mt-24
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-[var(--foreground-secondary)]
                prose-p:leading-relaxed
                prose-strong:text-[var(--foreground)]
                prose-a:text-[var(--color-primary-600)] prose-a:no-underline hover:prose-a:underline
                prose-li:text-[var(--foreground-secondary)]"
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
                      className="group p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--color-primary-500)]/40 hover:shadow-sm transition-all"
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

            {/*
              Guías relacionadas — cross-link entre pillars. Refuerza el
              grafo de linking interno entre las guías profundas, lo que
              ayuda a Google a entender la estructura topical del sitio
              y distribuye PageRank/autoridad entre pillars.
            */}
            {relatedGuias.length > 0 && (
              <section className="mt-12 pt-10 border-t border-[var(--border)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-success-500)]/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[var(--color-success-500)]" />
                  </div>
                  <h2 className="text-xl font-bold text-[var(--foreground)]">
                    Otras guías que te pueden interesar
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {relatedGuias.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/guias/${g.slug}`}
                      className="group p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--color-success-500)]/40 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--foreground-muted)]">
                          {g.categoryLabel}
                        </span>
                        <span className="text-[10px] text-[var(--foreground-muted)]">
                          · {g.readingTime} min
                        </span>
                      </div>
                      <h3 className="font-semibold text-[var(--foreground)] text-sm mb-1 group-hover:text-[var(--color-primary-600)] transition-colors leading-snug">
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
        </div>
      </article>
    </>
  );
}
