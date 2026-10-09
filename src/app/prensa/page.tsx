import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Newspaper } from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import DisclaimerYMYL from '@/components/DisclaimerYMYL';
import JsonLd from '@/components/seo/JsonLd';
import { getCurrentValues, type CurrentValues } from '@/lib/api/current-values';
import { formatCLP } from '@/lib/formatters';
import { formatCLP2 } from '@/lib/seo/live-value-title';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME } from '@/lib/site';
import { FALLBACK_VALUES } from '@/lib/values/fallback';
import {
  GRATIFICACION,
  INGRESO_MINIMO,
  TOPE_IMPOSITIVO,
  getSeguroSocialPrevisionalVigente,
} from '@/lib/values/constants';

// Mismo ciclo que /api/values: los indicadores se refrescan cada hora.
export const revalidate = 3600;

const PAGE_TITLE = 'Sala de prensa: UF, UTM, sueldo mínimo y topes vigentes';
const PAGE_DESCRIPTION =
  'Valores vigentes en una sola página citable: UF, UTM, dólar observado, sueldo mínimo, topes imponibles en pesos y tope de gratificación, con fuente y fecha.';

export const metadata: Metadata = buildPageMetadata({
  path: '/prensa',
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'UF hoy',
    'UTM vigente',
    'sueldo mínimo 2026',
    'tope imponible en pesos',
    'datos para prensa Chile',
    'indicadores económicos Chile',
  ],
});

interface DataRow {
  label: string;
  value: string;
  detail: string;
  source: { name: string; url: string };
}

const SANTIAGO_DATE: Intl.DateTimeFormatOptions = {
  timeZone: 'America/Santiago',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

function formatSantiagoDate(iso: string | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('es-CL', SANTIAGO_DATE);
}

/** Valores en vivo con el mismo respaldo de /api/values; nunca lanza. */
async function getValues(): Promise<CurrentValues | null> {
  try {
    return await getCurrentValues();
  } catch {
    return null;
  }
}

function formatUFNumber(value: number): string {
  return value.toLocaleString('es-CL', { maximumFractionDigits: 1 });
}

export default async function PrensaPage() {
  const live = await getValues();
  const uf = live?.values.uf ?? FALLBACK_VALUES.uf;
  const utm = live?.values.utm ?? FALLBACK_VALUES.utm;
  const dolar = live?.values.dolar.observado ?? FALLBACK_VALUES.dolar.observado;
  const consultedAt =
    formatSantiagoDate(live?.values.updatedAt) ?? formatSantiagoDate(FALLBACK_VALUES.asOf);
  const dateOf = (iso: string | undefined) =>
    formatSantiagoDate(iso ?? FALLBACK_VALUES.asOf) ?? consultedAt;

  const topeGratificacionAnual = Math.round(INGRESO_MINIMO.mensual * GRATIFICACION.tope_475_inm);
  const tasaEmpleador = getSeguroSocialPrevisionalVigente();

  const indicadores: DataRow[] = [
    {
      label: 'Unidad de Fomento (UF)',
      value: formatCLP2(uf),
      detail: `Valor del ${dateOf(live?.dates.uf)}.`,
      source: {
        name: 'Banco Central de Chile',
        url: 'https://si3.bcentral.cl/indicadoressiete/secure/indicadoresdiarios.aspx',
      },
    },
    {
      label: 'Unidad Tributaria Mensual (UTM)',
      value: formatCLP(utm),
      detail: `Valor vigente al ${dateOf(live?.dates.utm)}.`,
      source: {
        name: 'Banco Central de Chile',
        url: 'https://www.bcentral.cl/areas/estadisticas/estadisticas-de-precios/utm',
      },
    },
    {
      label: 'Dólar observado',
      value: formatCLP2(dolar),
      detail: `Valor del ${dateOf(live?.dates.dolar)}.`,
      source: {
        name: 'Banco Central de Chile',
        url: 'https://si3.bcentral.cl/indicadoressiete/secure/indicadoresdiarios.aspx',
      },
    },
  ];

  const laborales: DataRow[] = [
    {
      label: 'Sueldo mínimo (18 a 65 años)',
      value: formatCLP(INGRESO_MINIMO.mensual),
      detail: 'Ingreso mínimo mensual vigente desde el 1 de mayo de 2026 (Ley 21.830).',
      source: {
        name: 'Dirección del Trabajo',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-60141.html',
      },
    },
    {
      label: 'Sueldo mínimo (menores de 18 y mayores de 65)',
      value: formatCLP(INGRESO_MINIMO.menor_18_mayor_65),
      detail: 'Ingreso mínimo mensual para trabajadores menores de 18 o mayores de 65 años.',
      source: {
        name: 'Dirección del Trabajo',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-60141.html',
      },
    },
    {
      label: `Tope imponible AFP y salud (${formatUFNumber(TOPE_IMPOSITIVO.afp_salud)} UF)`,
      value: formatCLP(TOPE_IMPOSITIVO.afp_salud * uf),
      detail: 'Remuneración máxima sobre la que se cotiza para pensión y salud, en pesos con la UF de esta página.',
      source: {
        name: 'Dirección del Trabajo',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-118076.html',
      },
    },
    {
      label: `Tope imponible seguro de cesantía (${formatUFNumber(TOPE_IMPOSITIVO.seguro_cesantia)} UF)`,
      value: formatCLP(TOPE_IMPOSITIVO.seguro_cesantia * uf),
      detail: 'Remuneración máxima sobre la que se cotiza al seguro de cesantía, en pesos con la UF de esta página.',
      source: {
        name: 'Dirección del Trabajo',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-118077.html',
      },
    },
    {
      label: 'Tope de gratificación legal (4,75 ingresos mínimos)',
      value: `${formatCLP(topeGratificacionAnual)} al año`,
      detail: `Equivale a ${formatCLP(Math.round(topeGratificacionAnual / 12))} al mes cuando se paga el 25% mensual (art. 50 del Código del Trabajo).`,
      source: {
        name: 'Dirección del Trabajo',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-60156.html',
      },
    },
    {
      label: 'Cotización del empleador (reforma de pensiones)',
      value: `${tasaEmpleador.toLocaleString('es-CL')}%`,
      detail: 'Porcentaje de la remuneración imponible de cargo del empleador vigente hoy según el calendario de la Ley 21.735.',
      source: {
        name: 'ChileAtiende',
        url: 'https://www.chileatiende.gob.cl/fichas/130987-aportes-del-empleador-al-sistema-de-pensiones',
      },
    },
  ];

  const url = absoluteUrl('/prensa');
  const schemas = [
    webPageSchema({
      url,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      datePublished: '2026-10-08',
      dateModified: '2026-10-08',
    }),
    breadcrumbSchema([{ name: 'Inicio', path: '/' }, { name: 'Prensa' }]),
  ];

  const cita = `${SITE_NAME} (calculadorachile.cl/prensa), con datos de [fuente oficial del indicador], consultado el ${consultedAt}.`;

  return (
    <>
      <JsonLd id="prensa-schemas" data={schemas} />

      <div className="container-base py-8 md:py-12">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Prensa' }]} />

        <article className="mx-auto max-w-3xl">
          <header className="border-b border-[var(--border)] pb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
              Sala de prensa
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] md:text-4xl">
              Valores vigentes para citar: UF, UTM, sueldo mínimo y topes
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--foreground-secondary)]">
              Los indicadores y montos legales que usan las calculadoras de {SITE_NAME}, en una sola
              página, con su fuente oficial y la fecha de cada dato.
            </p>
            {consultedAt && (
              <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
                Actualizado el <time dateTime={live?.values.updatedAt ?? FALLBACK_VALUES.asOf}>{consultedAt}</time>
              </p>
            )}
          </header>

          <DataSection title="Indicadores económicos" rows={indicadores} />
          <DataSection title="Sueldo mínimo, topes y cotizaciones" rows={laborales} />

          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
              Cómo citar
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--foreground-secondary)]">
              Puedes usar estos valores citando la fuente oficial de cada dato y, si te sirve, esta
              página. Texto sugerido:
            </p>
            <blockquote className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--foreground)]">
              Fuente: {cita}
            </blockquote>
            <p className="mt-4 leading-relaxed text-[var(--foreground-secondary)]">
              Incluye siempre la fecha: la UF cambia todos los días, la UTM cada mes y el dólar
              observado cada día hábil. Esta página consulta esos indicadores cada hora: primero el
              Banco Central de Chile y, si no responde, Mindicador o el respaldo diario del sitio. Los montos legales (sueldo mínimo, topes y tasas) se revisan cuando cambia
              la ley o la autoridad publica un nuevo valor.
            </p>
          </section>

          <section className="mt-12 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent-muted)] p-6">
            <div className="flex gap-3">
              <Newspaper
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
                aria-hidden="true"
              />
              <div>
                <h2 className="text-base font-semibold text-[var(--foreground)]">
                  Consultas de periodistas
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                  Si necesitas un cálculo de ejemplo o detectas un dato desactualizado, escríbenos
                  con el enlace y la fecha que estás usando.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Prensa%20CalculaChile`}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </section>

          <DisclaimerYMYL
            organismo="la autoridad competente (Banco Central, Dirección del Trabajo o Superintendencia de Pensiones)"
            className="mt-10"
          />

          <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-[var(--border)] pt-7 text-sm font-medium">
            <Link href="/metodologia" className="text-[var(--accent)] hover:underline">
              Metodología y correcciones
            </Link>
            <Link
              href="/calculadoras/calculadora-uf-clp"
              className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:underline"
            >
              Conversor UF a pesos
            </Link>
            <Link
              href="/calculadoras/calculadora-sueldo-liquido"
              className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:underline"
            >
              Calculadora de sueldo líquido
            </Link>
          </nav>
        </article>
      </div>
    </>
  );
}

function DataSection({ title, rows }: { title: string; rows: DataRow[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
        {title}
      </h2>
      <dl className="mt-5 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 p-5 sm:grid-cols-[1fr_auto] sm:gap-x-6">
            <dt className="text-sm font-medium text-[var(--foreground-secondary)]">{row.label}</dt>
            <dd className="font-mono text-lg font-semibold tabular-nums text-[var(--foreground)] sm:row-span-2 sm:self-center sm:text-right">
              {row.value}
            </dd>
            <dd className="text-sm leading-relaxed text-[var(--foreground-muted)]">
              {row.detail}{' '}
              <a
                href={row.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                Fuente: {row.source.name}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
