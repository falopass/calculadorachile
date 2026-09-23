// ============================================
// Calculadora individual — /calculadoras/[slug]
// ----------------------------------------------
// Server Component que resuelve el slug, genera metadata SEO
// optimizada (sin double-branding) y delega el render al
// CalculatorPageClient (que monta el shell + structured data).
// ============================================

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { calculators, getCalculatorBySlug } from '@/data/calculators';
import { seoOverrides } from '@/data/seo-overrides';
import { absoluteUrl } from '@/lib/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { getGuiaForCalculator } from '@/lib/seo/calculator-guia-map';
import { getCurrentValues, type CurrentValues } from '@/lib/api/current-values';
import { FALLBACK_VALUES } from '@/lib/values/fallback';
import { formatCLP } from '@/lib/formatters';
import {
  buildLiveValueTitle,
  isLiveValueFresh,
  toSantiagoParts,
  MESES_ES_CL,
  formatCLP2,
  formatDDMMYYYY,
  type LiveKind,
} from '@/lib/seo/live-value-title';
import { getQuickAnswer } from '@/data/calculator-quick-answers';
import { calculateUTMCLP } from '@/lib/calculations/utm-clp';
import { calculateUFCLP } from '@/lib/calculations/uf-clp';
import CalculatorPageClient, { type LiveValueBlock } from './CalculatorPageClient';

interface CalculatorPageProps {
  params: Promise<{ slug: string }>;
}

// Regenera las páginas de calculadoras cada hora: los conversores
// con valor en vivo (UTM/UF/dólar) llevan el dato en el HTML.
export const revalidate = 3600;

// Generar rutas estáticas para SSG (catálogo activo: 39 calculadoras).
export async function generateStaticParams() {
  return calculators.map((calculator) => ({ slug: calculator.slug }));
}

/** Slugs cuyo HTML muestra el valor vigente del indicador. */
const LIVE_SLUG_KIND: Record<string, LiveKind> = {
  'calculadora-utm-clp': 'utm',
  'calculadora-uf-clp': 'uf',
  'calculadora-conversor-divisas': 'dolar',
};

/** Valores en vivo solo para los slugs de LIVE_SLUG_KIND; nunca lanza. */
async function getLiveContext(slug: string): Promise<CurrentValues | null> {
  if (!(slug in LIVE_SLUG_KIND)) return null;
  try {
    return await getCurrentValues();
  } catch {
    return null;
  }
}

interface LiveIndicator {
  value: number;
  source: string;
  date?: string;
}

function extractLiveIndicator(
  kind: LiveKind,
  live: CurrentValues | null,
): LiveIndicator | null {
  if (!live) return null;
  if (kind === 'utm') {
    return { value: live.values.utm, source: live.indicatorSources.utm, date: live.dates.utm };
  }
  if (kind === 'uf') {
    return { value: live.values.uf, source: live.indicatorSources.uf, date: live.dates.uf };
  }
  return {
    value: live.values.dolar.observado,
    source: live.indicatorSources.dolar,
    date: live.dates.dolar,
  };
}

/** Construye el bloque SSR con el valor vigente y sus equivalencias. */
function buildLiveValueBlock(
  kind: LiveKind,
  indicator: LiveIndicator,
): LiveValueBlock | null {
  const dateObj = indicator.date ? new Date(indicator.date) : null;
  if (!dateObj || Number.isNaN(dateObj.getTime())) return null;
  const parts = toSantiagoParts(dateObj);
  if (!parts) return null;

  const sourceLabel =
    indicator.source === 'bcentral' ? 'Banco Central de Chile' : 'mindicador.cl';
  const fecha = formatDDMMYYYY(dateObj);

  let heading: string;
  let rows: { label: string; value: string }[];

  if (kind === 'utm') {
    const mes = MESES_ES_CL[parts.month - 1];
    heading = `Valor UTM ${mes} ${parts.year}: ${formatCLP(indicator.value)}`;
    rows = [1, 5, 10, 12, 50].map((n) => ({
      label: n === 12 ? '12 UTM (1 UTA)' : `${n} UTM`,
      value: formatCLP(
        Math.round(
          calculateUTMCLP({ monto: n, direccion: 'utm-a-clp', valorUTM: indicator.value })
            .montoConvertido,
        ),
      ),
    }));
  } else if (kind === 'uf') {
    heading = `Valor UF hoy (${fecha}): ${formatCLP2(indicator.value)}`;
    rows = [1, 10, 90, 1000].map((n) => ({
      label: `${n.toLocaleString('es-CL')} UF`,
      value: formatCLP(
        Math.round(
          calculateUFCLP({ monto: n, direccion: 'uf-a-clp', valorUF: indicator.value })
            .montoConvertido,
        ),
      ),
    }));
  } else {
    heading = `Dólar observado hoy (${fecha}): ${formatCLP2(indicator.value)}`;
    rows = [1, 10, 100, 1000].map((n) => ({
      label: `US$${n.toLocaleString('es-CL')}`,
      value: formatCLP(Math.round(n * indicator.value)),
    }));
  }

  return {
    kind,
    value: indicator.value,
    heading,
    date: fecha,
    sourceLabel,
    rows,
  };
}

// Etiquetas legibles para la categoría OG.
const CATEGORY_NAMES: Record<string, string> = {
  sueldo: 'Sueldo y Remuneraciones',
  impuestos: 'Impuestos y Tributos',
  beneficios: 'Beneficios Laborales',
  conversiones: 'Conversores de Moneda',
  vivienda: 'Vivienda y Hogar',
  vehiculos: 'Vehículos y Transporte',
  familia: 'Familia y Dependientes',
  empresas: 'Empresas y PYMEs',
  pension: 'Pensiones y Jubilación',
  educacion: 'Educación',
  hogar: 'Hogar y Servicios',
  servicios: 'Servicios',
};

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    return buildPageMetadata({
      path: `/calculadoras/${slug}`,
      title: 'Calculadora no encontrada',
      description: 'La calculadora que buscas no existe o ha sido movida.',
      noIndex: true,
    });
  }

  // El root layout ya añade " | CalculaChile" como template. Pasamos
  // un título limpio que indica beneficio (gratuito) sin
  // duplicar el branding ni el año si ya está en el nombre.
  // Si la calculadora declara `seoTitle`, se usa ese (override) en
  // vez del generado, para subir CTR en páginas con tracción real.
  // Prioridad: seoOverrides (global) > calculator.seoTitle > generado.
  const override = seoOverrides[calculator.slug];
  const generatedTitle = (() => {
    const nameAlreadyHasYear = /20\d{2}/.test(calculator.name);
    return nameAlreadyHasYear
      ? `${calculator.name} — Calculadora gratuita`
      : `${calculator.name} — Calculadora gratuita 2026`;
  })();
  let titleClean = override?.seoTitle ?? calculator.seoTitle ?? generatedTitle;

  // Título con valor en vivo para los conversores (solo si el dato
  // está fresco; si no, queda el override estático).
  const kind = LIVE_SLUG_KIND[calculator.slug];
  if (kind) {
    const live = await getLiveContext(calculator.slug);
    const indicator = extractLiveIndicator(kind, live);
    if (
      indicator &&
      indicator.date &&
      isLiveValueFresh(kind, indicator, new Date())
    ) {
      const liveTitle = buildLiveValueTitle(
        kind,
        indicator.value,
        new Date(indicator.date),
        new Date(),
      );
      if (liveTitle) titleClean = liveTitle;
    }
  }

  // Description enriquecida: si la del data es corta (<70 chars),
  // la complementamos con keywords y CTA. Si es larga, la usamos tal cual.
  // Prioridad: seoOverrides (global) > calculator.seoDescription > description.
  const baseDesc = (
    override?.seoDescription ??
    calculator.seoDescription ??
    calculator.description
  ).trim();
  const enrichedDesc =
    baseDesc.length < 80
      ? `${baseDesc} Cálculo referencial en línea, gratis y sin registro. Revisa fuentes, supuestos y limitaciones.`
      : baseDesc;

  const categoryLabel = CATEGORY_NAMES[calculator.category] ?? calculator.category;

  // OG image dinámica generada por opengraph-image.tsx en esta misma
  // ruta. Next la sirve en `<canonical>/opengraph-image`.
  const ogImageUrl = absoluteUrl(`/calculadoras/${calculator.slug}/opengraph-image`);

  const metadata = buildPageMetadata({
    path: `/calculadoras/${calculator.slug}`,
    title: titleClean,
    description: enrichedDesc,
    keywords: calculator.keywords ?? [calculator.name],
    publishedTime: '2026-01-01',
    modifiedTime: calculator.lastReviewed,
    ogImage: {
      url: ogImageUrl,
      alt: `${calculator.name} — Calculadora gratuita CalculaChile`,
      width: 1200,
      height: 630,
    },
    noIndex: calculator.noIndex === true,
  });

  // `category` es un campo top-level útil para algunos crawlers
  // (Apple News, Pinterest). Lo añadimos sin pisar otros campos.
  metadata.category = categoryLabel;
  return metadata;
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) notFound();

  const canonicalUrl = absoluteUrl(`/calculadoras/${calculator.slug}`);
  const ogImageUrl = absoluteUrl(`/calculadoras/${calculator.slug}/opengraph-image`);
  const relatedGuia = getGuiaForCalculator(calculator);
  const guideUrl = relatedGuia ? absoluteUrl(`/guias/${relatedGuia.slug}`) : undefined;

  // Valor en vivo (solo conversores; fresco o se omite el bloque).
  let liveValue: LiveValueBlock | undefined;
  const kind = LIVE_SLUG_KIND[calculator.slug];
  let live: CurrentValues | null = null;
  if (kind) {
    live = await getLiveContext(calculator.slug);
    const indicator = extractLiveIndicator(kind, live);
    if (indicator && isLiveValueFresh(kind, indicator, new Date())) {
      liveValue = buildLiveValueBlock(kind, indicator) ?? undefined;
    }
  }

  // Quick answer (answer-first) para las calculadoras hero. Las páginas
  // sin valor en vivo usan el snapshot local: cero fetches extra.
  const quickAnswer = getQuickAnswer(calculator.id, {
    uf: live?.values.uf ?? FALLBACK_VALUES.uf,
    utm: live?.values.utm ?? FALLBACK_VALUES.utm,
  });

  return (
    <CalculatorPageClient
      calculator={calculator}
      canonicalUrl={canonicalUrl}
      ogImageUrl={ogImageUrl}
      guideUrl={guideUrl}
      guideTitle={relatedGuia?.title}
      guideReadingTime={relatedGuia?.readingTime}
      liveValue={liveValue}
      quickAnswer={quickAnswer}
    />
  );
}
