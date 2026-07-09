// ============================================
// Índice del blog — /blog
// ----------------------------------------------
// Lista todos los artículos. Incluye CollectionPage + BreadcrumbList
// schema y un H2 explícito para no saltar de h1 a h3 en cards.
// ============================================

import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import ArticleCard from '@/components/blog/ArticleCard';
import RssSubscribeButton from '@/components/blog/RssSubscribeButton';
import JsonLd from '@/components/seo/JsonLd';
import {
  collectionPageSchema,
  breadcrumbSchema,
} from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/site';
import { articles } from '@/data/articles';

const PAGE_TITLE = 'Blog de finanzas y legislación laboral chilena';
const PAGE_DESC =
  'Artículos prácticos sobre sueldo, finiquito, IVA, créditos hipotecarios, AFP y derechos laborales en Chile. Actualizado a 2026 con bases legales citadas.';

export const metadata: Metadata = buildPageMetadata({
  path: '/blog',
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: [
    'blog finanzas chile',
    'blog laboral chile',
    'derechos trabajadores chile',
    'impuestos chile blog',
    'sueldo líquido artículos',
    'finiquito chile',
    'guía laboral 2026',
  ],
});

export default function BlogPage() {
  const url = absoluteUrl('/blog');

  // Agrupar artículos por categoría para mostrarlos organizados
  const byCategory = articles.reduce<Record<string, typeof articles>>(
    (acc, art) => {
      const cat = art.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(art);
      return acc;
    },
    {},
  );

  // Orden preferido para las categorías conocidas. Cualquier categoría
  // nueva que aparezca en `articles` se renderiza al final con su
  // nombre capitalizado, evitando la fuga de artículos fuera del
  // índice del blog (bug previo: `previsional` y `educacion` no se
  // mostraban pese a tener artículos con tracción real en GSC).
  const categoryOrder = [
    'laboral',
    'impuestos',
    'vivienda',
    'previsional',
    'educacion',
    'educacion-financiera',
  ];
  const categoryLabels: Record<string, string> = {
    laboral: 'Laboral y sueldo',
    impuestos: 'Impuestos y tributos',
    vivienda: 'Vivienda y arriendo',
    previsional: 'Previsional y AFP',
    educacion: 'Educación y créditos estudiantiles',
    'educacion-financiera': 'Educación financiera',
  };

  // Schema: CollectionPage + BreadcrumbList
  const schemas = [
    collectionPageSchema({
      url,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      items: articles.map((art) => ({
        name: art.title,
        url: absoluteUrl(`/blog/${art.slug}`),
        description: art.description,
      })),
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Blog' },
    ]),
  ];

  return (
    <>
      <JsonLd id="blog-index" data={schemas} />

      <div className="container-base py-8 md:py-12">
        <Breadcrumbs
          items={[{ label: 'Inicio', href: '/' }, { label: 'Blog' }]}
        />

        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary-500)]/10 mb-4">
              <BookOpen className="w-8 h-8 text-[var(--color-primary-500)]" />
            </div>
            <h1 className="heading-display text-3xl md:text-4xl text-[var(--foreground)] mb-3">
              {PAGE_TITLE}
            </h1>
            <p className="text-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto leading-relaxed">
              {PAGE_DESC}
            </p>
            {/*
              Suscripción RSS usable: Feedly + copiar URL + XML.
              El enlace plano a feed.xml solo muestra XML y parece roto.
            */}
            <RssSubscribeButton />
          </div>

          {articles.length > 0 ? (
            <div className="space-y-12">
              {/* Categorías en orden preferido + cualquier otra que
                  exista en `articles` pero no esté en `categoryOrder`.
                  Esto evita que artículos con categorías nuevas
                  queden invisibles en el índice del blog. */}
              {[
                ...categoryOrder,
                ...Object.keys(byCategory).filter(
                  (c) => !categoryOrder.includes(c),
                ),
              ].map((cat) => {
                const list = byCategory[cat];
                if (!list || list.length === 0) return null;
                return (
                  <section key={cat}>
                    <h2 className="text-xl font-bold text-[var(--foreground)] mb-5 capitalize">
                      {categoryLabels[cat] ?? cat.replace(/-/g, ' ')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {list.map((art, idx) => (
                        <ArticleCard
                          key={art.slug}
                          article={art}
                          index={idx}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-[var(--foreground-muted)]">
              <p>Pronto publicaremos artículos. Vuelve en unos días.</p>
            </div>
          )}

          {/* CTA a guías */}
          <div className="mt-16 p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] text-center">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              ¿Buscas algo más profundo?
            </h2>
            <p className="text-sm text-[var(--foreground-secondary)] mb-4">
              Lee nuestras guías pillar (15+ minutos) con todas las fórmulas, ejemplos numéricos y bases legales.
            </p>
            <Link
              href="/guias"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary-600)] text-white text-sm font-medium hover:bg-[var(--color-primary-500)] transition-all"
            >
              Ver guías completas
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
