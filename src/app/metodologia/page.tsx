import type { Metadata } from 'next';
import Link from 'next/link';
import { CircleAlert, FileSearch, Mail, Scale, ShieldCheck } from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME } from '@/lib/site';

const PAGE_TITLE = 'Metodología, fuentes y correcciones';
const PAGE_DESCRIPTION =
  'Cómo CalculaChile investiga, actualiza y corrige sus calculadoras y contenidos: fuentes oficiales, supuestos, límites y canal público de correcciones.';

export const metadata: Metadata = buildPageMetadata({
  path: '/metodologia',
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'metodología CalculaChile',
    'fuentes oficiales calculadoras Chile',
    'correcciones CalculaChile',
    'criterio editorial finanzas Chile',
  ],
});

const steps = [
  {
    title: 'Ubicamos la regla aplicable',
    body: 'Priorizamos leyes, reglamentos, dictámenes, fichas de ChileAtiende y publicaciones de organismos como SII, Dirección del Trabajo, Superintendencias, Banco Central, CMF, IPS y BCN. Una publicación de prensa puede ayudar a detectar un cambio, pero no sustituye la fuente que lo respalda.',
  },
  {
    title: 'Separamos dato, cálculo y alcance',
    body: 'La página debe distinguir qué valor usa, qué operación realiza y qué antecedente no puede conocer. Por ejemplo, una calculadora puede estimar descuentos previsionales, pero no comprobar por sí sola una cotización impaga, una cláusula de contrato o una resolución administrativa.',
  },
  {
    title: 'Documentamos supuestos y límites',
    body: 'Cada herramienta indexable explica su metodología, muestra sus fuentes y advierte los casos que necesitan revisión oficial o profesional. No presentamos una estimación referencial como certificado, liquidación, declaración ni aprobación de un beneficio.',
  },
  {
    title: 'Actualizamos cuando cambia el contexto',
    body: 'Los indicadores que usa el sitio se consultan en fuentes públicas y tienen respaldo si una fuente temporal no responde. Las tasas, topes, tramos, calendarios y textos legales se revisan al cambiar la norma o antes de publicar contenido estacional.',
  },
];

export default function MetodologiaPage() {
  const url = absoluteUrl('/metodologia');
  const schemas = [
    webPageSchema({
      url,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      datePublished: '2026-08-12',
      dateModified: '2026-08-12',
      subType: 'AboutPage',
    }),
    breadcrumbSchema([{ name: 'Inicio', path: '/' }, { name: 'Metodología y correcciones' }]),
  ];

  return (
    <>
      <JsonLd id="methodology-schemas" data={schemas} />

      <div className="container-base py-8 md:py-12">
        <Breadcrumbs
          items={[{ label: 'Inicio', href: '/' }, { label: 'Metodología y correcciones' }]}
        />

        <article className="mx-auto max-w-3xl">
          <header className="border-b border-[var(--border)] pb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
              Transparencia editorial
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] md:text-4xl">
              Cómo trabajamos las fuentes, los cálculos y las correcciones
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--foreground-secondary)]">
              {SITE_NAME} es un proyecto independiente. Las calculadoras entregan estimaciones para
              entender un caso, no reemplazan una liquidación, resolución, certificado ni asesoría
              profesional. Esta página explica el estándar que exigimos antes de publicar o corregir
              una herramienta.
            </p>
          </header>

          <section className="mt-10 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent-muted)] p-6">
            <div className="flex gap-3">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
                aria-hidden="true"
              />
              <div>
                <h2 className="text-base font-semibold text-[var(--foreground)]">
                  Independencia y alcance
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                  No somos parte de SII, IPS, ChileAtiende, una AFP, una municipalidad ni otro
                  organismo público. Las menciones a esas instituciones son enlaces a la fuente que
                  una persona puede consultar. La respuesta de la autoridad competente prevalece
                  sobre cualquier estimación de este sitio.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
              El proceso de una calculadora o artículo
            </h2>
            <ol className="mt-6 space-y-5">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--foreground)]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 leading-relaxed text-[var(--foreground-secondary)]">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <FileSearch className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
              <h2 className="mt-3 text-base font-semibold text-[var(--foreground)]">
                Qué puedes comprobar
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                <li>La fecha de revisión de la página.</li>
                <li>Las fuentes oficiales enlazadas.</li>
                <li>La metodología, los supuestos y las limitaciones visibles.</li>
                <li>La diferencia entre estimación y trámite real.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <Scale className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
              <h2 className="mt-3 text-base font-semibold text-[var(--foreground)]">
                Cuándo no basta una calculadora
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                Si tu caso depende de una carta de despido, contrato, deuda, declaración tributaria,
                pensión, subsidio, resolución o antecedentes que el sitio no puede verificar, usa la
                herramienta solo como orientación y confirma con la institución o profesional que
                corresponda.
              </p>
            </div>
          </section>

          <section id="reportar-correccion" className="mt-12">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
              Cómo reportar un error o una fuente desactualizada
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--foreground-secondary)]">
              Una corrección útil incluye la URL, el dato o resultado que parece incorrecto, la
              fecha aplicable y el enlace a la fuente oficial. Revisamos primero los errores que
              puedan cambiar un monto, requisito, plazo o decisión económica. Si el antecedente es
              dudoso, preferimos advertir la limitación antes que publicar una certeza sin respaldo.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Correcci%C3%B3n%20CalculaChile`}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Reportar una corrección
            </a>
          </section>

          <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-6">
            <div className="flex gap-3">
              <CircleAlert
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--warning)]"
                aria-hidden="true"
              />
              <div>
                <h2 className="text-base font-semibold text-[var(--foreground)]">
                  Publicidad y resultados
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                  La eventual publicidad del sitio no cambia fórmulas, fuentes ni el orden de los
                  resultados. El contenido patrocinado, si alguna vez existiera, se identificará
                  como tal. No cobramos por alterar una estimación ni por priorizar una respuesta.
                </p>
              </div>
            </div>
          </section>

          <nav className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-t border-[var(--border)] pt-7 text-sm font-medium">
            <Link href="/acerca-de" className="text-[var(--accent)] hover:underline">
              Conoce al editor y desarrollador
            </Link>
            <Link
              href="/privacidad"
              className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:underline"
            >
              Política de privacidad
            </Link>
            <Link
              href="/terminos"
              className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:underline"
            >
              Términos de uso
            </Link>
          </nav>
        </article>
      </div>
    </>
  );
}
