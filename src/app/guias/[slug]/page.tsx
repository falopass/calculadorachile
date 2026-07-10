// ============================================
// Guía individual — /guias/[slug]
// ----------------------------------------------
// Server Component que renderiza una guía pillar de larga forma.
// Layout editorial profesional: header prominente, hero card,
// secciones con iconos, TOC sticky y bloques relacionados.
// ============================================

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Calculator,
  Car,
  Clock,
  DollarSign,
  ExternalLink,
  FileText,
  GraduationCap,
  Home,
  Receipt,
  Scale,
  TrendingUp,
  Users,
  Building2,
  CircleHelp,
  List,
  Banknote,
} from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import TocSticky from '@/components/article/TocSticky';
import ReadingProgress from '@/components/article/ReadingProgress';
import CrossDomainCta from '@/components/calculator/CrossDomainCta';
import { resolveCvlistoContentOrigen } from '@/lib/cvlisto';
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
import { seoOverrides } from '@/data/seo-overrides';
import snapshot from '@/lib/values/snapshot.json';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guias.map((g) => ({ slug: g.slug }));
}

const sectionIconMap: { keywords: string[]; icon: React.ComponentType<{ className?: string }> }[] = [
  { keywords: ['uf', 'fomento', 'unidad fomento'], icon: Scale },
  { keywords: ['utm', 'uta', 'tributaria', 'tributario'], icon: Receipt },
  { keywords: ['ipc', 'inflación', 'precios', 'indicador'], icon: TrendingUp },
  { keywords: ['dólar', 'dolar', 'euro', 'divisa', 'cambio'], icon: DollarSign },
  { keywords: ['crédito', 'hipotecario', 'vivienda', 'arriendo', 'hogar'], icon: Home },
  { keywords: ['sueldo', 'remuneración', 'líquido', 'bruto'], icon: Banknote },
  { keywords: ['finiquito', 'indemnización', 'vacaciones', 'despido'], icon: FileText },
  { keywords: ['afp', 'pensión', 'jubilación', 'previsional'], icon: TrendingUp },
  { keywords: ['vehículo', 'vehiculo', 'auto', 'moto', 'tag', 'permiso'], icon: Car },
  { keywords: ['familia', 'alimenticia', 'alimentos'], icon: Users },
  { keywords: ['cae', 'educación', 'universidad', 'crédito aval'], icon: GraduationCap },
  { keywords: ['empresa', 'pyme', 'patente', 'comercial'], icon: Building2 },
  { keywords: ['fuente', 'oficial'], icon: BookOpen },
];

function getSectionIcon(title: string): React.ComponentType<{ className?: string }> {
  const lower = title.toLowerCase();
  const match = sectionIconMap.find((m) => m.keywords.some((k) => lower.includes(k)));
  return match?.icon ?? CircleHelp;
}

function isIndicatorGuide(slug: string): boolean {
  return slug === 'uf-utm-indicadores-chile';
}

function formatCLP(value: number): string {
  return `$${Math.round(value).toLocaleString('es-CL')}`;
}

function formatUF(value: number): string {
  return `$${value.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Extrae texto plano (sin HTML) de una sección y lo limita a `max`
 * caracteres cortando en el último espacio.
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

  const override = seoOverrides[guia.slug];
  return buildPageMetadata({
    path: `/guias/${guia.slug}`,
    title: override?.seoTitle ?? guia.title,
    description: override?.seoDescription ?? guia.description,
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

  const relatedCalcs = guia.relatedCalculators
    .map((s) => calculators.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const relatedArts = guia.relatedArticles
    .map((s) => articles.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

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

  if (howToSteps.length >= 3) {
    schemas.push(
      howToSchema({
        name: `${guia.title}: pasos clave`,
        description: guia.intent,
        url,
        totalTime: `PT${guia.readingTime}M`,
        steps: howToSteps,
      }),
    );
  }

  const formattedUpdated = new Date(guia.updatedAt).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const hasPublishDate = guia.publishedAt !== guia.updatedAt;
  const formattedPublished = hasPublishDate
    ? new Date(guia.publishedAt).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const h2Sections = guia.sections.filter((s) => s.level === 2);

  return (
    <>
      <JsonLd id="guia-schemas" data={schemas} />
      <ReadingProgress />

      {/* Header prominente */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="container-base py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Guías', href: '/guias' },
              { label: guia.title },
            ]}
          />

          <div className="mx-auto mt-6 max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-primary-100)] bg-[var(--accent-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)]">
                <BookOpen className="h-3.5 w-3.5" />
                Guía pillar · {guia.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                <Clock className="h-3.5 w-3.5" />
                {guia.readingTime} min de lectura
              </span>
            </div>

            <h1 className="heading-display break-words text-2xl text-[var(--foreground)] sm:text-3xl md:text-5xl">
              {guia.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[var(--foreground-secondary)] sm:text-lg md:text-xl">
              {guia.description}
            </p>

            <div className="mt-6 flex flex-col gap-3 text-sm text-[var(--foreground-muted)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/acerca-de"
                className="group flex min-w-0 items-center gap-2 transition-colors hover:text-[var(--accent)]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                  DS
                </div>
                <span className="group-hover:underline">Por {AUTHOR.name}</span>
              </Link>
              <span aria-hidden className="hidden text-[var(--border)] sm:inline">
                ·
              </span>
              <span className="min-w-0 break-words leading-relaxed">
                {formattedPublished && (
                  <>
                    Publicado el{' '}
                    <time dateTime={guia.publishedAt}>{formattedPublished}</time>
                    {' · '}
                  </>
                )}
                Actualizado el <time dateTime={guia.updatedAt}>{formattedUpdated}</time>
              </span>
            </div>
          </div>
        </div>
      </header>

      <article className="container-base py-8 md:py-12">
        <div className="grid min-w-0 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* TOC */}
          <aside className="order-1 min-w-0 lg:order-1 lg:col-span-3">
            <div className="min-w-0 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2">
              <details className="mb-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 lg:hidden" open>
                <summary className="flex cursor-pointer select-none items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
                  <List className="h-4 w-4 shrink-0" />
                  En esta guía
                </summary>
                <ol className="mt-3 list-none space-y-1">
                  {h2Sections.map((section, idx) => (
                    <li key={section.id} className="min-w-0">
                      <a href={`#${section.id}`} className="toc-link block break-words">
                        <span className="mr-2 tabular-nums text-[var(--foreground-muted)]">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
              <div className="hidden min-w-0 lg:block">
                <TocSticky
                  items={h2Sections.map((s) => ({ id: s.id, title: s.title }))}
                  title="En esta guía"
                />
              </div>
            </div>
          </aside>

          {/* Contenido */}
          <div className="order-2 min-w-0 lg:col-span-8 lg:col-start-5">
            {/* Hero card: intent */}
            <div className="mb-10 rounded-2xl border border-[var(--color-primary-100)] bg-[var(--accent-muted)] p-6 md:p-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                En resumen
              </p>
              <p className="text-lg font-medium leading-relaxed text-[var(--foreground)] md:text-xl">
                {guia.intent}
              </p>
            </div>

            {/* Dashboard de indicadores (solo guía de indicadores) */}
            {isIndicatorGuide(guia.slug) && <IndicatorDashboard />}

            {/* Secciones con iconos */}
            <div className="space-y-10 md:space-y-12">
              {guia.sections.map((section) => {
                const Icon = getSectionIcon(section.title);
                const isH2 = section.level === 2;

                return isH2 ? (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 overflow-hidden rounded-2xl border-b border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-6 md:p-8"
                  >
                    <div className="mb-5 flex min-w-0 items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="min-w-0 break-words text-lg font-bold tracking-[-0.02em] text-[var(--foreground)] sm:text-xl md:text-2xl">
                        {section.title}
                      </h2>
                    </div>
                    {/* Estilos tipográficos: globals.css `.prose` (sin plugin typography). */}
                    <div
                      className="prose min-w-0 max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.html }}
                    />
                  </section>
                ) : (
                  <div key={section.id} id={section.id} className="scroll-mt-28">
                    <h3 className="mb-3 text-xl font-bold text-[var(--foreground)]">
                      {section.title}
                    </h3>
                    <div
                      className="prose min-w-0 max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.html }}
                    />
                  </div>
                );
              })}
            </div>

            {/* CTA reinserción laboral (solo guías finiquito / sueldo) */}
            {(() => {
              const origen = resolveCvlistoContentOrigen({ guiaSlug: guia.slug });
              if (!origen) return null;
              return (
                <div className="mt-12">
                  <CrossDomainCta
                    origen={origen}
                    contentId={`guia:${guia.slug}`}
                    placement="guia_footer"
                  />
                </div>
              );
            })()}

            {/* Calculadoras relacionadas */}
            {relatedCalcs.length > 0 && (
              <section className="mt-14">
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
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Artículos del blog */}
            {relatedArts.length > 0 && (
              <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <h2 className="mb-4 text-lg font-bold text-[var(--foreground)]">
                  Sigue leyendo en el blog
                </h2>
                <ul className="space-y-3">
                  {relatedArts.map((art) => (
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

            {/* Guías relacionadas */}
            {relatedGuias.length > 0 && (
              <section className="mt-12">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-[var(--foreground)]">
                    Otras guías que te pueden interesar
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {relatedGuias.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/guias/${g.slug}`}
                      className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--accent)] hover:shadow-sm"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--foreground-muted)]">
                          {g.categoryLabel}
                        </span>
                        <span className="text-[10px] text-[var(--foreground-muted)]">
                          · {g.readingTime} min
                        </span>
                      </div>
                      <h3 className="mb-1 text-sm font-semibold leading-snug text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                        {g.title}
                      </h3>
                      <p className="line-clamp-2 text-xs text-[var(--foreground-muted)]">
                        {g.description}
                  </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Fuentes */}
            {guia.sources.length > 0 && (
              <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
                  Fuentes oficiales
                </h2>
                <ul className="space-y-2">
                  {guia.sources.map((source) => (
                    <li key={source.url} className="text-sm">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[var(--foreground-secondary)] transition-colors hover:text-[var(--accent)]"
                      >
                        {source.label}
                        <ExternalLink className="h-3 w-3" />
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
                className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] transition-colors hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver a Guías
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

function IndicatorDashboard() {
  const indicators = [
    { label: 'UF', value: formatUF(snapshot.uf), sub: 'Banco Central' },
    { label: 'UTM', value: formatCLP(snapshot.utm), sub: 'SII' },
    { label: 'Dólar observado', value: formatUF(snapshot.dolarObservado), sub: 'BCCh' },
    { label: 'Euro', value: formatUF(snapshot.euro ?? 0), sub: 'BCCh' },
  ];

  return (
    <div className="mb-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-[var(--accent)]" />
        <h2 className="text-sm font-semibold text-[var(--foreground)]">Indicadores del día</h2>
        <span className="ml-auto text-xs text-[var(--foreground-muted)]">
          {new Date(snapshot.asOf).toLocaleDateString('es-CL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {indicators.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"
          >
            <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
              {item.label}
            </span>
            <span className="mt-1 block text-lg font-bold tabular-nums tracking-tight text-[var(--foreground)]">
              {item.value}
            </span>
            <span className="block text-[10px] text-[var(--foreground-muted)]">{item.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
