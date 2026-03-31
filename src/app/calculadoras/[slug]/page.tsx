import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { calculators, getCalculatorBySlug } from '@/data/calculators';
import CalculatorPageClient from './CalculatorPageClient';

interface CalculatorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generar rutas estáticas para SSG
export async function generateStaticParams() {
  return calculators.map((calculator) => ({
    slug: calculator.slug,
  }));
}

// Nombres legibles para categorías
const CATEGORY_NAMES: Record<string, string> = {
  'sueldo': 'Sueldo y Remuneraciones',
  'impuestos': 'Impuestos y Tributos',
  'beneficios': 'Beneficios Laborales',
  'conversiones': 'Conversores de Moneda',
  'vivienda': 'Vivienda y Hogar',
  'vehiculos': 'Vehículos y Transporte',
  'familia': 'Familia y Dependientes',
  'empresas': 'Empresas y PYMEs',
  'pension': 'Pensiones y Jubilación',
  'educacion': 'Educación',
  'hogar': 'Hogar y Servicios',
  'servicios': 'Servicios',
};

// Generar metadata dinámica con SEO completo
export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);
  
  if (!calculator) {
    return {
      title: 'Calculadora no encontrada | CalculaChile',
      description: 'La calculadora que buscas no existe o ha sido removida.',
      robots: { index: false, follow: false },
    };
  }
  
  const categoryName = CATEGORY_NAMES[calculator.category] || calculator.category;
  const canonicalUrl = `https://calculachile.cl/calculadoras/${calculator.slug}`;
  
  return {
    title: `${calculator.name} - Calculadora Gratuita | CalculaChile`,
    description: calculator.description,
    keywords: calculator.keywords?.join(', ') || calculator.name,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${calculator.name} - Calculadora Gratuita | CalculaChile`,
      description: calculator.description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'CalculaChile',
      locale: 'es_CL',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${calculator.name} | CalculaChile`,
      description: calculator.description,
    },
    category: categoryName,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);
  
  if (!calculator) {
    notFound();
  }
  
  const canonicalUrl = `https://calculachile.cl/calculadoras/${calculator.slug}`;
  
  return <CalculatorPageClient calculator={calculator} canonicalUrl={canonicalUrl} />;
}
