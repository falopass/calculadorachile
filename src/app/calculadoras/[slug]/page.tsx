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
import { absoluteUrl } from '@/lib/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import CalculatorPageClient from './CalculatorPageClient';

interface CalculatorPageProps {
  params: Promise<{ slug: string }>;
}

// Generar rutas estáticas para SSG (todas las 40 calculadoras).
export async function generateStaticParams() {
  return calculators.map((calculator) => ({ slug: calculator.slug }));
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

export async function generateMetadata({
  params,
}: CalculatorPageProps): Promise<Metadata> {
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
  const nameAlreadyHasYear = /20\d{2}/.test(calculator.name);
  const titleClean = nameAlreadyHasYear
    ? `${calculator.name} — Calculadora gratuita`
    : `${calculator.name} — Calculadora gratuita 2026`;

  // Description enriquecida: si la del data es corta (<70 chars),
  // la complementamos con keywords y CTA. Si es larga, la usamos tal cual.
  const baseDesc = calculator.description.trim();
  const enrichedDesc =
    baseDesc.length < 80
      ? `${baseDesc} Cálculo en línea, gratis, sin registro. Valores oficiales actualizados a 2026.`
      : baseDesc;

  const categoryLabel = CATEGORY_NAMES[calculator.category] ?? calculator.category;

  const metadata = buildPageMetadata({
    path: `/calculadoras/${calculator.slug}`,
    title: titleClean,
    description: enrichedDesc,
    keywords: calculator.keywords ?? [calculator.name],
    publishedTime: '2026-01-01',
    modifiedTime: new Date().toISOString().slice(0, 10),
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

  return (
    <CalculatorPageClient calculator={calculator} canonicalUrl={canonicalUrl} />
  );
}
