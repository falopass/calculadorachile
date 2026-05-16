// ============================================
// Equipo / Sobre el autor — /equipo
// ----------------------------------------------
// Página que cumple un rol crítico de E-E-A-T en YMYL:
//   - Identifica al humano detrás del contenido (Person schema).
//   - Lista credenciales, expertise y enlaces verificables.
//   - Linkea a las redes sociales (sameAs) para que Google pueda
//     correlacionar la identidad cross-domain.
//
// El Person schema inyectado acá tiene `@id` = AUTHOR_ID, el mismo
// que usa `articleSchema()` para referenciarlo desde /blog y /guias.
// Sin esta página, esa referencia quedaría "huérfana" (apuntaría a
// un nodo que no existe). Con esta página, Google puede seguir el
// `@id` y enriquecer el byline en SERPs.
// ============================================

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Mail,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  Sparkles,
} from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import Callout from '@/components/ui/Callout';
import JsonLd from '@/components/seo/JsonLd';
import {
  personSchema,
  webPageSchema,
  breadcrumbSchema,
} from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME } from '@/lib/site';
import { AUTHOR } from '@/lib/seo/author';

const PAGE_TITLE = `Equipo de ${SITE_NAME} — quién está detrás del sitio`;
const PAGE_DESC = `${AUTHOR.name} es el editor jefe y desarrollador de ${SITE_NAME}. Conoce su trayectoria, sus credenciales y los principios editoriales que guían cada calculadora y guía publicada.`;

export const metadata: Metadata = buildPageMetadata({
  path: '/equipo',
  title: PAGE_TITLE,
  description: PAGE_DESC,
  ogType: 'profile',
  keywords: [
    'autor calculachile',
    'equipo calculachile',
    'diego sebastián',
    'editor calculadora chile',
    'experiencia laboral chile',
    'créditos editoriales',
  ],
});

// Iconos de marca (lucide 1.7 los retiró). Inline SVG simple para
// Twitter/X, GitHub y LinkedIn — replican los del Footer para
// consistencia visual.
const TwitterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.51 11.51 0 0 1 6.003 0c2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// Mapeo de URL → icono / etiqueta legible para los enlaces sociales.
function classifySameAs(
  url: string,
): { Icon: () => React.JSX.Element; label: string } {
  if (url.includes('twitter.com') || url.includes('x.com')) {
    return { Icon: TwitterIcon, label: 'Twitter / X' };
  }
  if (url.includes('linkedin.com')) {
    return { Icon: LinkedinIcon, label: 'LinkedIn' };
  }
  if (url.includes('github.com')) {
    return { Icon: GithubIcon, label: 'GitHub' };
  }
  return {
    Icon: () => <ExternalLink className="w-4 h-4" />,
    label: 'Sitio web',
  };
}

export default function EquipoPage() {
  const url = absoluteUrl('/equipo');

  // Schemas inyectados:
  //   - Person (con @id estable que referencian Article y Learning)
  //   - WebPage subType ProfilePage para señalizar el tipo de página
  //   - BreadcrumbList con la ruta /equipo
  const schemas = [
    personSchema(),
    webPageSchema({
      url,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      subType: 'ProfilePage',
      breadcrumb: [
        { name: 'Inicio', path: '/' },
        { name: 'Equipo' },
      ],
      mainEntity: { '@id': AUTHOR.id },
      // Speakable para asistentes de voz: nombre y bio resumida.
      speakableSelectors: ['[data-speakable="name"]', '[data-speakable="bio"]'],
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Equipo' },
    ]),
  ];

  return (
    <>
      <JsonLd id="equipo-schemas" data={schemas} />

      <div className="container-base py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Equipo' },
          ]}
        />

        <div className="max-w-3xl mx-auto">
          {/* Header con avatar e identidad del autor */}
          <header className="mb-10 md:mb-14">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
              {/*
                Avatar grande con iniciales sobre gradiente del sitio.
                Sustituye una foto real (que el autor podrá agregar
                en el futuro reemplazando AUTHOR.imageUrl).
              */}
              <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg">
                DS
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] border border-[var(--color-primary-500)]/20 mb-3">
                  <Sparkles className="w-3 h-3" />
                  Equipo editorial
                </span>
                <h1
                  className="heading-display text-3xl md:text-4xl text-[var(--foreground)] mb-2 leading-tight"
                  data-speakable="name"
                >
                  {AUTHOR.name}
                </h1>
                <p className="text-base md:text-lg text-[var(--foreground-secondary)]">
                  {AUTHOR.jobTitle}
                </p>
              </div>
            </div>

            {/* Bio corta como subtítulo speakable */}
            <p
              className="text-lg md:text-xl text-[var(--foreground-secondary)] leading-relaxed mt-4 pt-5 border-t border-[var(--border)]"
              data-speakable="bio"
            >
              {AUTHOR.bioShort}
            </p>
          </header>

          {/* Bio extensa */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              Mi historia con CalculaChile
            </h2>
            <div
              className="prose prose-lg max-w-none
                prose-p:text-[var(--foreground-secondary)] prose-p:leading-relaxed
                prose-strong:text-[var(--foreground)]
                prose-a:text-[var(--color-primary-600)] prose-a:no-underline hover:prose-a:underline
                prose-li:text-[var(--foreground-secondary)]"
              dangerouslySetInnerHTML={{ __html: AUTHOR.bioLongHtml }}
            />
          </section>

          {/* Credenciales y expertise — dos columnas */}
          <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="flex items-center gap-2 text-base font-semibold text-[var(--foreground)] mb-3">
                <ShieldCheck className="w-4 h-4 text-[var(--color-success-500)]" />
                Credenciales
              </h2>
              <ul className="space-y-2 text-sm text-[var(--foreground-secondary)]">
                {AUTHOR.credentials.map((cred) => (
                  <li key={cred} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-success-500)] flex-shrink-0"
                    />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="flex items-center gap-2 text-base font-semibold text-[var(--foreground)] mb-3">
                <BookOpen className="w-4 h-4 text-[var(--color-primary-500)]" />
                Áreas de expertise
              </h2>
              <ul className="space-y-2 text-sm text-[var(--foreground-secondary)]">
                {AUTHOR.expertise.map((area) => (
                  <li key={area} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-primary-500)] flex-shrink-0"
                    />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Principios editoriales — usa el componente <Callout> */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              Principios editoriales
            </h2>
            <div className="space-y-4">
              <Callout kind="legal" title="Cita siempre la fuente legal">
                <p>
                  Cada cálculo de impacto legal o tributario cita el artículo
                  específico de la ley, la circular del SII o la resolución de
                  la Superintendencia que lo respalda. No confiamos en lo que
                  diga otro sitio: vamos a la fuente primaria (BCN, SII, DT,
                  Banco Central).
                </p>
              </Callout>
              <Callout kind="success" title="Tests para cada calculadora">
                <p>
                  Las calculadoras críticas tienen tests unitarios en Vitest
                  que validan la fórmula contra ejemplos publicados por la
                  autoridad. Si una calculadora no tiene tests, no entra a
                  producción para los conceptos donde la regla cambia (topes
                  imponibles, jornadas parciales, recargos especiales).
                </p>
              </Callout>
              <Callout kind="tip" title="Open source y revisión pública">
                <p>
                  Todo el código está en{' '}
                  <a
                    href="https://github.com/falopass/calculadorachile"
                    target="_blank"
                    rel="noopener"
                  >
                    GitHub
                  </a>
                  . Si encuentras un error en una fórmula o un dato
                  desactualizado, abre un issue o un pull request — y te
                  responderé el mismo día. Prefiero corregir un error a
                  defenderlo.
                </p>
              </Callout>
              <Callout kind="warning" title="No es asesoría profesional">
                <p>
                  CalculaChile entrega resultados referenciales basados en
                  fórmulas oficiales. Para trámites formales (despido,
                  declaración de impuestos, compra de propiedad) consulta con
                  un abogado, contador o asesor previsional. La ley puede
                  cambiar entre actualizaciones del sitio.
                </p>
              </Callout>
            </div>
          </section>

          {/* Redes / sameAs — datos verificables externamente */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              Verifícame
            </h2>
            <p className="text-sm text-[var(--foreground-secondary)] mb-4">
              Estos enlaces te permiten validar mi identidad fuera de este
              sitio. Si quieres reportar un error, comentar una calculadora o
              proponer un nuevo cálculo, escríbeme directamente.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AUTHOR.sameAs.map((href) => {
                const { Icon, label } = classifySameAs(href);
                return (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--color-primary-500)]/40 hover:shadow-sm transition-all"
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-[var(--background-secondary)] grid place-items-center text-[var(--foreground-secondary)] group-hover:text-[var(--color-primary-600)] transition-colors">
                      <Icon />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--color-primary-600)] transition-colors">
                        {label}
                      </div>
                      <div className="text-xs text-[var(--foreground-muted)] truncate">
                        {href.replace(/^https?:\/\//, '')}
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--foreground-muted)] flex-shrink-0" />
                  </a>
                );
              })}
              <a
                href={`mailto:${AUTHOR.email}`}
                className="group flex items-center gap-3 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--color-primary-500)]/40 hover:shadow-sm transition-all"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-[var(--background-secondary)] grid place-items-center text-[var(--foreground-secondary)] group-hover:text-[var(--color-primary-600)] transition-colors">
                  <Mail className="w-4 h-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--color-primary-600)] transition-colors">
                    Email directo
                  </div>
                  <div className="text-xs text-[var(--foreground-muted)] truncate">
                    {AUTHOR.email}
                  </div>
                </div>
              </a>
            </div>
          </section>

          {/* CTA — explorar el contenido del autor */}
          <section className="rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)]/[0.08] to-[var(--color-accent-500)]/[0.04] border border-[var(--color-primary-500)]/20 p-6 md:p-8 text-center">
            <h2 className="text-lg md:text-xl font-bold text-[var(--foreground)] mb-2">
              Lee mi trabajo en {SITE_NAME}
            </h2>
            <p className="text-sm md:text-base text-[var(--foreground-secondary)] mb-5 max-w-xl mx-auto">
              Cada guía, calculadora y artículo del blog pasa por los tres
              filtros que describí arriba. Si encuentras algo que no cuadra,
              avísame en el email de arriba.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/guias"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary-600)] text-white text-sm font-medium hover:bg-[var(--color-primary-500)] transition-all"
              >
                Ver guías profundas
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] text-sm font-medium hover:border-[var(--color-primary-500)]/40 hover:bg-[var(--surface)] transition-all"
              >
                Ver blog
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground-secondary)] text-sm font-medium hover:border-[var(--color-primary-500)]/40 hover:bg-[var(--surface)] transition-all"
              >
                Contactar
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
