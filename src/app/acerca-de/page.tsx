// ============================================
// /acerca-de — Acerca de CalculaChile + Autor
// ----------------------------------------------
// Página unificada que fusiona la antigua /acerca-de
// (descripción del proyecto) y /equipo (perfil del autor, ahora fusionada).
//
// Cumple E-E-A-T para YMYL:
//   - Identifica al humano detrás del contenido (Person schema).
//   - Lista credenciales, expertise y enlaces verificables (sameAs).
//   - Declaración de independencia editorial y metodología.
//   - El Person schema inyecta @id = AUTHOR_ID para que Article
//     y Learning lo referencien sin duplicar el nodo.
// ============================================

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  BookOpen,
  Sparkles,
  Code2,
  Scale,
  FileCheck,
} from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import {
  personSchema,
  webPageSchema,
  breadcrumbSchema,
  organizationSchema,
} from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, SITE_NAME } from '@/lib/site';
import { AUTHOR } from '@/lib/seo/author';

const PAGE_TITLE = `Acerca de ${SITE_NAME}`;
const PAGE_DESC = `${SITE_NAME} es un sitio independiente creado y mantenido por ${AUTHOR.name}, ingeniero de software en Curicó, Chile. Calculadoras transparentes y gratuitas basadas en fuentes oficiales del SII, Banco Central y Dirección del Trabajo.`;

export const metadata: Metadata = buildPageMetadata({
  path: '/acerca-de',
  title: PAGE_TITLE,
  description: PAGE_DESC,
  ogType: 'profile',
  keywords: [
    'acerca de calculachile',
    'autor calculachile',
    'diego sebastián',
    'editor calculadora chile',
    'calculadoras chilenas',
    'independencia editorial',
    'fuentes oficiales chile',
  ],
});

const principles = [
  {
    icon: Scale,
    title: 'Cita siempre la fuente legal',
    kind: 'legal' as const,
    body: 'Cada cálculo de impacto legal o tributario cita el artículo específico de la ley, la circular del SII o la resolución de la Superintendencia que lo respalda. No confiamos en lo que diga otro sitio: vamos a la fuente primaria (BCN, SII, DT, Banco Central).',
  },
  {
    icon: FileCheck,
    title: 'Tests para cada calculadora',
    kind: 'success' as const,
    body: 'Las calculadoras críticas tienen tests unitarios en Vitest que validan la fórmula contra ejemplos publicados por la autoridad. Si una calculadora no tiene tests, no entra a producción para los conceptos donde la regla cambia (topes imponibles, jornadas parciales, recargos especiales).',
  },
  {
    icon: Code2,
    title: 'Open source y revisión pública',
    kind: 'tip' as const,
    body: 'Todo el código está en GitHub. Si encuentras un error en una fórmula o un dato desactualizado, abre un issue o un pull request — y te responderé el mismo día. Prefiero corregir un error a defenderlo.',
  },
  {
    icon: ShieldCheck,
    title: 'No es asesoría profesional',
    kind: 'warning' as const,
    body: 'CalculaChile entrega resultados referenciales basados en fórmulas oficiales. Para trámites formales (despido, declaración de impuestos, compra de propiedad) consulta con un abogado, contador o asesor previsional. La ley puede cambiar entre actualizaciones del sitio.',
  },
];

export default function AcercaDePage() {
  const url = absoluteUrl('/acerca-de');

  const schemas = [
    organizationSchema(),
    personSchema(),
    webPageSchema({
      url,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      subType: 'AboutPage',
      datePublished: '2026-07-02',
      dateModified: '2026-07-03',
      breadcrumb: [
        { name: 'Inicio', path: '/' },
        { name: 'Acerca de' },
      ],
      mainEntity: { '@id': AUTHOR.id },
      speakableSelectors: ['[data-speakable="name"]', '[data-speakable="bio"]'],
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Acerca de' },
    ]),
  ];

  return (
    <>
      <JsonLd id="about-schemas" data={schemas} />

      <div className="container-base py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Acerca de' },
          ]}
        />

        <div className="max-w-3xl mx-auto">
          {/* ============================================
              HERO — Avatar + identidad + bio corta
              ============================================ */}
          <header className="mb-12 md:mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
              <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[var(--accent)] flex items-center justify-center text-white text-3xl md:text-4xl font-bold font-mono shadow-lg">
                DS
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--accent)]/20 mb-3">
                  <Sparkles className="w-3 h-3" />
                  Editor y desarrollador
                </span>
                <h1
                  className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--foreground)] mb-2 leading-tight"
                  data-speakable="name"
                >
                  {AUTHOR.name}
                </h1>
                <p className="text-base md:text-lg text-[var(--foreground-secondary)]">
                  {AUTHOR.jobTitle}
                </p>
              </div>
            </div>

            <p
              className="text-lg md:text-xl text-[var(--foreground-secondary)] leading-relaxed mt-4 pt-5 border-t border-[var(--border)]"
              data-speakable="bio"
            >
              {AUTHOR.bioShort}
            </p>
          </header>

          {/* ============================================
              SOBRE EL PROYECTO — Qué es CalculaChile
              ============================================ */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold tracking-[-0.01em] text-[var(--foreground)] mb-4">
              Qué es {SITE_NAME}
            </h2>
            <div
              className="prose prose-lg max-w-none
                prose-p:text-[var(--foreground-secondary)] prose-p:leading-relaxed
                prose-strong:text-[var(--foreground)]
                prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline
                prose-li:text-[var(--foreground-secondary)]"
              dangerouslySetInnerHTML={{ __html: AUTHOR.bioLongHtml }}
            />
          </section>

          {/* ============================================
              INDEPENDENCIA EDITORIAL + METODOLOGÍA
              ============================================ */}
          <section className="mb-12 space-y-6">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.01em] text-[var(--foreground)] mb-3">
                Independencia editorial
              </h2>
              <p className="text-base text-[var(--foreground-secondary)] leading-relaxed">
                {SITE_NAME} no pertenece al Gobierno de Chile ni a instituciones como
                SII, Dirección del Trabajo, IPS, CMF, Banco Central, MINVU o SERNAC.
                Cada calculadora indica las fuentes oficiales consultadas y la fecha
                de actualización para que cualquier persona pueda verificar los datos.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.01em] text-[var(--foreground)] mb-3">
                Metodología
              </h2>
              <p className="text-base text-[var(--foreground-secondary)] leading-relaxed">
                La metodología de cada herramienta es: identificar la norma o fuente
                oficial vigente, convertirla en fórmula, probar casos numéricos,
                documentar supuestos y publicar limitaciones. Cuando una materia
                requiere interpretación legal, tributaria o financiera personalizada,
                la página lo indica expresamente.
              </p>
            </div>
          </section>

          {/* ============================================
              CREDENCIALES + EXPERTISE — dos tarjetas
              ============================================ */}
          <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="flex items-center gap-2 text-base font-semibold text-[var(--foreground)] mb-3">
                <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
                Credenciales
              </h2>
              <ul className="space-y-2 text-sm text-[var(--foreground-secondary)]">
                {AUTHOR.credentials.map((cred) => (
                  <li key={cred} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)] flex-shrink-0"
                    />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="flex items-center gap-2 text-base font-semibold text-[var(--foreground)] mb-3">
                <BookOpen className="w-4 h-4 text-[var(--accent)]" />
                Áreas de expertise
              </h2>
              <ul className="space-y-2 text-sm text-[var(--foreground-secondary)]">
                {AUTHOR.expertise.map((area) => (
                  <li key={area} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)] flex-shrink-0"
                    />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ============================================
              PRINCIPIOS EDITORIALES — Callouts
              ============================================ */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold tracking-[-0.01em] text-[var(--foreground)] mb-4">
              Principios editoriales
            </h2>
            <div className="space-y-4">
              {principles.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="flex items-start gap-3 p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-[var(--accent-muted)] grid place-items-center text-[var(--accent)]">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
                        {p.title}
                      </h3>
                      <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ============================================
              CTA — Explar el contenido
              ============================================ */}
          <section className="rounded-2xl bg-[var(--accent-muted)] border border-[var(--accent)]/20 p-6 md:p-8 text-center">
            <h2 className="text-lg md:text-xl font-semibold text-[var(--foreground)] mb-2">
              Lee mi trabajo en {SITE_NAME}
            </h2>
            <p className="text-sm md:text-base text-[var(--foreground-secondary)] mb-5 max-w-xl mx-auto">
              Cada guía, calculadora y artículo del blog pasa por los filtros
              que describí arriba. Si encuentras algo que no cuadra, avísame.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/guias"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors duration-150"
              >
                Ver guías
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border-strong)] text-[var(--foreground)] text-sm font-medium hover:bg-[var(--surface-muted)] transition-colors duration-150"
              >
                Ver blog
              </Link>
              <Link
                href="/calculadoras"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border-strong)] text-[var(--foreground-secondary)] text-sm font-medium hover:bg-[var(--surface-muted)] transition-colors duration-150"
              >
                Ver calculadoras
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
