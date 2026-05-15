// ============================================
// Índice de guías — /guias
// ----------------------------------------------
// Página de aterrizaje para las guías pillar. Muestra una grilla
// agrupada por categoría con metadata SEO y JSON-LD CollectionPage.
// ============================================

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Briefcase,
  TrendingUp,
  Home,
  Car,
  Wallet,
  GraduationCap,
  Clock,
  ArrowRight,
} from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import {
  collectionPageSchema,
  breadcrumbSchema,
} from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/site';
import { guias, type Guia } from '@/data/guias';

const PAGE_TITLE = 'Guías de finanzas personales y legislación chilena';
const PAGE_DESC =
  'Guías profundas y actualizadas a 2026 sobre sueldo líquido, finiquito, IVA, créditos hipotecarios, AFP y más. Escritas con ejemplos en pesos chilenos y bases legales citadas.';

export const metadata: Metadata = buildPageMetadata({
  path: '/guias',
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: [
    'guías finanzas chile',
    'guía laboral chile',
    'guía tributaria chile',
    'guía crédito hipotecario',
    'guía AFP',
    'finiquito guía',
    'sueldo líquido guía',
    'IVA guía',
    'recursos legales chile',
  ],
});

interface CategoryConfig {
  id: Guia['category'];
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    id: 'laboral',
    label: 'Laboral y sueldo',
    description: 'Sueldos, finiquitos, vacaciones, horas extra y derechos laborales.',
    icon: Briefcase,
    gradient: 'from-[var(--color-primary-500)] to-[var(--color-primary-600)]',
  },
  {
    id: 'tributario',
    label: 'Impuestos y tributos',
    description: 'IVA, boleta de honorarios, operación renta y declaraciones.',
    icon: TrendingUp,
    gradient: 'from-[var(--color-error-500)] to-[var(--color-error-600)]',
  },
  {
    id: 'vivienda',
    label: 'Vivienda y hogar',
    description: 'Créditos hipotecarios, arriendo, contribuciones y subsidios.',
    icon: Home,
    gradient: 'from-[var(--color-warning-500)] to-[var(--color-warning-600)]',
  },
  {
    id: 'previsional',
    label: 'Pensiones y previsión',
    description: 'AFP, PGU, APV y reforma previsional Ley 21.735.',
    icon: GraduationCap,
    gradient: 'from-[var(--color-success-500)] to-[var(--color-success-600)]',
  },
  {
    id: 'finanzas',
    label: 'Educación financiera',
    description: 'UF, UTM, IPC, indicadores económicos y conversiones.',
    icon: Wallet,
    gradient: 'from-[var(--color-accent-500)] to-[var(--color-accent-600)]',
  },
  {
    id: 'vehiculos',
    label: 'Vehículos y transporte',
    description: 'Permiso de circulación, multas, TAG y créditos automotrices.',
    icon: Car,
    gradient: 'from-[var(--color-primary-400)] to-[var(--color-primary-500)]',
  },
];

export default function GuiasPage() {
  const url = absoluteUrl('/guias');

  // Schema: CollectionPage + BreadcrumbList
  const schemas = [
    collectionPageSchema({
      url,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      items: guias.map((g) => ({
        name: g.title,
        url: absoluteUrl(`/guias/${g.slug}`),
        description: g.description,
      })),
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Guías' },
    ]),
  ];

  return (
    <>
      <JsonLd id="guias-index" data={schemas} />

      <div className="container-base py-8 md:py-12">
        <Breadcrumbs
          items={[{ label: 'Inicio', href: '/' }, { label: 'Guías' }]}
        />

        <div className="max-w-5xl mx-auto">
          {/* Header */}
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
          </div>

          {/* Categorías con sus guías */}
          <div className="space-y-12">
            {CATEGORY_CONFIG.map((cat) => {
              const guidesInCategory = guias.filter((g) => g.category === cat.id);
              if (guidesInCategory.length === 0) return null;

              const Icon = cat.icon;
              return (
                <section key={cat.id}>
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[var(--foreground)]">
                        {cat.label}
                      </h2>
                      <p className="text-sm text-[var(--foreground-secondary)]">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {guidesInCategory.map((guia) => (
                      <Link
                        key={guia.slug}
                        href={`/guias/${guia.slug}`}
                        className="group block p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 text-xs text-[var(--foreground-muted)]">
                            <Clock className="w-3 h-3" />
                            {guia.readingTime} min
                          </span>
                        </div>
                        <h3 className="font-semibold text-[var(--foreground)] text-base mb-2 group-hover:text-[var(--color-primary-600)] transition-colors leading-snug">
                          {guia.title}
                        </h3>
                        <p className="text-sm text-[var(--foreground-secondary)] line-clamp-2 mb-4 leading-relaxed">
                          {guia.description}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary-600)] group-hover:gap-2 transition-all">
                          Leer guía
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* CTA al blog */}
          <div className="mt-16 p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] text-center">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              ¿Buscas algo más específico?
            </h2>
            <p className="text-sm text-[var(--foreground-secondary)] mb-4">
              Encuentra artículos cortos sobre temas concretos en nuestro blog.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface)] text-sm font-medium text-[var(--foreground)] transition-all"
            >
              Ir al blog
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
