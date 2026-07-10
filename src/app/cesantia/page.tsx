// ============================================
// Hub cesantía — /cesantia
// ----------------------------------------------
// Punto de entrada del clúster "me despidieron":
// finiquito → cobertura → trámites → reinserción (CVListo).
// ============================================

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ClipboardList,
  FileText,
  ShieldAlert,
  Wallet,
} from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrossDomainCta from '@/components/calculator/CrossDomainCta';
import {
  breadcrumbSchema,
  collectionPageSchema,
  webPageSchema,
} from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

const PAGE_TITLE = 'Me despidieron Chile 2026: finiquito y qué hacer';
const PAGE_DESC =
  'Checklist post-despido: finiquito, indemnización, AFC y reinserción. Calculadoras gratis + preparar el CV. Fuentes DT y Código del Trabajo.';

export const metadata: Metadata = buildPageMetadata({
  path: '/cesantia',
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: [
    'me despidieron chile',
    'qué hacer después de un despido',
    'cesantía chile 2026',
    'finiquito y seguro de cesantía',
    'checklist despido',
    'reinserción laboral chile',
    'calcular finiquito chile',
  ],
});

const STEPS = [
  {
    n: '1',
    title: 'Estima lo que te deben pagar',
    body: 'Finiquito, vacaciones proporcionales e indemnización según la causal. Usa las calculadoras antes de firmar.',
    href: '/calculadoras/calculadora-finiquito',
    cta: 'Calcular finiquito',
    icon: Calculator,
  },
  {
    n: '2',
    title: 'Revisa formalidades y plazos',
    body: 'El finiquito suele pagarse en 10 días hábiles. Debe firmarse ante ministro de fe cuando corresponda. Guarda copia de todo.',
    href: '/guias/finiquito-laboral-chile',
    cta: 'Guía de finiquito',
    icon: FileText,
  },
  {
    n: '3',
    title: 'Ordena tu cobertura financiera',
    body: 'Suma finiquito, ahorros y Seguro de Cesantía (AFC). Entiende CIC vs finiquito y cómo solicitar giros en la AFC.',
    href: '/blog/seguro-cesantia-finiquito-2026-afc',
    cta: 'Seguro de Cesantía explicado',
    icon: Wallet,
  },
  {
    n: '4',
    title: 'Prepara la reinserción',
    body: 'Adapta el CV a cada vacante real. Un score ATS y una optimización gratis ayudan a no postular con el mismo currículum genérico.',
    href: 'https://cvlisto.cl/desde-calculachile?origen=finiquito&utm_source=calculachile&utm_medium=referral&utm_campaign=ecosistema_laboral&utm_content=hub_cesantia',
    cta: 'Analizar CV gratis',
    icon: ClipboardList,
    external: true,
  },
] as const;

const TOOLS = [
  {
    href: '/calculadoras/calculadora-finiquito',
    title: 'Calculadora de finiquito',
    desc: 'Indemnización, vacaciones y conceptos según causal.',
  },
  {
    href: '/calculadoras/calculadora-indemnizacion-anos-servicio',
    title: 'Indemnización por años',
    desc: '30 días por año, topes 11 años y 90 UF.',
  },
  {
    href: '/calculadoras/calculadora-vacaciones-proporcionales',
    title: 'Vacaciones proporcionales',
    desc: 'Días y monto al término del contrato.',
  },
  {
    href: '/calculadoras/calculadora-sueldo-liquido',
    title: 'Sueldo líquido',
    desc: 'Útil si estás evaluando una nueva oferta.',
  },
  {
    href: '/guias/finiquito-laboral-chile',
    title: 'Guía pillar: finiquito laboral',
    desc: 'Casos, bases legales y ejemplos en pesos.',
  },
  {
    href: '/blog/seguro-cesantia-finiquito-2026-afc',
    title: 'Seguro de Cesantía (AFC) 2026',
    desc: 'CIC, Fondo Solidario, cotizaciones y vs finiquito.',
  },
  {
    href: '/blog/como-cobrar-seguro-cesantia-afc-2026',
    title: 'Cómo cobrar el seguro AFC',
    desc: 'Documentos, cotizaciones mínimas y sucursal virtual.',
  },
  {
    href: '/blog/checklist-despues-despido-chile-2026',
    title: 'Checklist post-despido',
    desc: 'Finiquito, AFC, presupuesto y reinserción.',
  },
  {
    href: '/guias/sueldo-liquido-chile',
    title: 'Guía pillar: sueldo líquido',
    desc: 'Descuentos, topes y liquidación referencial.',
  },
] as const;

export default function CesantiaHubPage() {
  const url = absoluteUrl('/cesantia');

  const schemas = [
    webPageSchema({
      url,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      datePublished: '2026-07-10',
      dateModified: '2026-07-10',
      breadcrumb: [
        { name: 'Inicio', path: '/' },
        { name: 'Cesantía' },
      ],
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Cesantía', path: '/cesantia' },
    ]),
    collectionPageSchema({
      url,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      breadcrumb: [
        { name: 'Inicio', path: '/' },
        { name: 'Cesantía', path: '/cesantia' },
      ],
      items: TOOLS.map((t, i) => ({
        name: t.title,
        url: absoluteUrl(t.href),
        description: t.desc,
        position: i + 1,
      })),
    }),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      <header className="border-b border-[var(--border)] bg-gradient-to-b from-[var(--color-primary-500)]/[0.06] to-transparent">
        <div className="container-base py-8 md:py-12">
          <Breadcrumbs
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Cesantía' },
            ]}
          />
          <div className="mx-auto mt-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-600)]">
              Hub · reinserción laboral
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Me despidieron: qué hacer ahora en Chile
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--foreground-secondary)] md:text-lg">
              Ordena finiquito, plazos y cobertura. Luego prepara tu CV para postular mejor.
              Todo con herramientas gratuitas de {SITE_NAME} — sin registro para calcular.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-[var(--foreground-muted)]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-success-600)]" />
                Calculadoras gratis
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1">
                <ShieldAlert className="h-3.5 w-3.5 text-[var(--color-warning-600)]" />
                Estimaciones referenciales
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1">
                Fuentes DT · AFC · Código del Trabajo
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container-base py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          <section aria-labelledby="pasos-heading">
            <h2
              id="pasos-heading"
              className="text-xl font-bold text-[var(--foreground)] md:text-2xl"
            >
              Recorrido recomendado (4 pasos)
            </h2>
            <p className="mt-2 text-sm text-[var(--foreground-secondary)]">
              No necesitas hacerlo todo el mismo día. Prioriza dinero y formalidades; después la
              búsqueda de empleo.
            </p>
            <ol className="mt-6 space-y-4">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isExternal = 'external' in step && step.external;
                return (
                  <li
                    key={step.n}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm md:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[var(--color-primary-500)]/10 text-sm font-extrabold text-[var(--color-primary-700)]">
                        {step.n}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-[var(--color-primary-600)]" aria-hidden />
                          <h3 className="text-base font-semibold text-[var(--foreground)] md:text-lg">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                          {step.body}
                        </p>
                        {isExternal ? (
                          <a
                            href={step.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary-600)] hover:underline"
                          >
                            {step.cta}
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        ) : (
                          <Link
                            href={step.href}
                            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary-600)] hover:underline"
                          >
                            {step.cta}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="mt-12" aria-labelledby="tools-heading">
            <h2
              id="tools-heading"
              className="text-xl font-bold text-[var(--foreground)] md:text-2xl"
            >
              Herramientas y guías del clúster
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--color-primary-500)]/40 hover:shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-600)]">
                    {tool.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--foreground-muted)]">
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-6">
            <h2 className="text-lg font-bold text-[var(--foreground)]">
              Aviso importante (YMYL)
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-secondary)]">
              Los montos de las calculadoras son <strong>estimaciones referenciales</strong> según
              el Código del Trabajo y fuentes públicas. No sustituyen el finiquito firmado, la
              liquidación de la AFC ni asesoría de un abogado laboral. Si hay despido injustificado
              o montos en disputa, acude a la Inspección del Trabajo o a un profesional.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)]">
              Para el Seguro de Cesantía (cuenta individual y Fondo de Cesantía Solidario),
              consulta siempre el estado en{' '}
              <a
                href="https://www.afc.cl/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--color-primary-600)] hover:underline"
              >
                AFC Chile
              </a>{' '}
              y la normativa vigente.
            </p>
          </section>

          <div className="mt-10 space-y-4">
            <CrossDomainCta
              origen="finiquito"
              contentId="hub:cesantia"
              placement="after_result"
            />
            <p className="text-center text-xs text-[var(--foreground-muted)]">
              Lecturas en CVListo:{' '}
              <a
                href="https://cvlisto.cl/blog/me-despidieron-adaptar-cv-48-horas-chile"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--color-primary-600)] hover:underline"
              >
                CV en 48 horas
              </a>
              {' · '}
              <a
                href="https://cvlisto.cl/blog/cv-despues-despido-que-poner-chile"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--color-primary-600)] hover:underline"
              >
                Qué poner en el CV
              </a>
            </p>
          </div>

          <p className="mt-8 text-center text-xs text-[var(--foreground-muted)]">
            ¿Buscas otra herramienta?{' '}
            <Link href="/calculadoras" className="font-medium text-[var(--color-primary-600)] hover:underline">
              Ver todas las calculadoras
            </Link>
            {' · '}
            <Link href="/blog" className="font-medium text-[var(--color-primary-600)] hover:underline">
              Blog
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

