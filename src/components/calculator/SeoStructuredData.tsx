// ============================================
// SEO Structured Data — calculadora individual
// ----------------------------------------------
// Reemplaza la versión antigua que reimplementaba schemas locales.
// Ahora delega a los generadores compartidos en src/lib/seo/schema.ts:
//   - SoftwareApplication enriquecido (featureList, dates)
//   - FAQPage si la calculadora tiene FAQs
//   - BreadcrumbList con ruta completa
//   - HowTo con 3 pasos genéricos para guiar al usuario
//
// Todo se inyecta vía el componente JsonLd compartido.
// ============================================

'use client';

import type { Calculator } from '@/types/calculator';
import {
  softwareApplicationSchema,
  faqPageSchema,
  breadcrumbSchema,
  howToSchema,
} from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';

interface SeoStructuredDataProps {
  calculator: Calculator;
  url: string;
}

/** Etiquetas legibles de cada categoría para los breadcrumbs. */
const CATEGORY_LABELS: Record<Calculator['category'], string> = {
  sueldo: 'Sueldo y remuneraciones',
  impuestos: 'Impuestos y tributos',
  beneficios: 'Beneficios laborales',
  conversiones: 'Conversores',
  familia: 'Familia y dependientes',
  vivienda: 'Vivienda y hogar',
  vehiculos: 'Vehículos y transporte',
  empresas: 'Empresas y PYMEs',
  servicios: 'Servicios',
  pension: 'Pensiones y previsión',
  educacion: 'Educación',
  hogar: 'Hogar y servicios',
};

/**
 * Construye un featureList a partir de los inputs declarados en la
 * calculadora (los nombres son indicativos del alcance funcional).
 */
function deriveFeatures(calculator: Calculator): string[] {
  const baseFeatures = [
    'Cálculo en tiempo real',
    'Valores oficiales actualizados a 2026',
    'Sin registro ni descargas',
    'Resultados con desglose detallado',
  ];

  // Si la calculadora tiene 5+ inputs, asume escenarios avanzados.
  if (calculator.inputs.length >= 5) {
    baseFeatures.push('Escenarios personalizados');
  }
  // Si tiene FAQ con 5+ items, marca como "documentada".
  if (calculator.faq && calculator.faq.length >= 5) {
    baseFeatures.push('Preguntas frecuentes integradas');
  }
  return baseFeatures;
}

/**
 * Componente que inyecta los structured data de una calculadora.
 *
 * Es un Client Component porque se monta dentro de
 * `CalculatorPageClient` (que es 'use client'). Igualmente Next.js
 * serializa los `<script>` en el HTML inicial.
 */
export default function SeoStructuredData({
  calculator,
  url,
}: SeoStructuredDataProps) {
  const categoryLabel = CATEGORY_LABELS[calculator.category] ?? calculator.category;

  const schemas: Record<string, unknown>[] = [
    softwareApplicationSchema({
      name: calculator.name,
      description: calculator.description,
      url,
      features: deriveFeatures(calculator),
      keywords: calculator.keywords,
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Calculadoras', path: '/calculadoras' },
      { name: categoryLabel, path: `/calculadoras#${calculator.category}` },
      { name: calculator.name },
    ]),
    howToSchema({
      name: `Cómo usar la calculadora de ${calculator.name.toLowerCase()}`,
      description: `Pasos para calcular ${calculator.name.toLowerCase()} en CalculaChile usando valores oficiales actualizados a 2026.`,
      url,
      totalTime: 'PT1M',
      steps: [
        {
          name: 'Ingresa tus datos',
          text: 'Completa los campos del formulario con la información solicitada (sueldos, montos, plazos, etc.). Los campos obligatorios están marcados.',
        },
        {
          name: 'Revisa los resultados automáticos',
          text: 'El cálculo se ejecuta en tiempo real a medida que escribes. No necesitas presionar un botón "calcular".',
        },
        {
          name: 'Interpreta el desglose',
          text: 'Cada resultado incluye su desglose con bases legales, valores oficiales empleados y referencias a artículos del Código del Trabajo, SII u otras normativas.',
        },
      ],
      tools: ['Navegador web moderno', 'Datos del cálculo (sueldo, montos, fechas)'],
    }),
  ];

  if (calculator.faq && calculator.faq.length > 0) {
    schemas.push(faqPageSchema(calculator.faq));
  }

  return <JsonLd id={`calc-${calculator.id}`} data={schemas} />;
}
