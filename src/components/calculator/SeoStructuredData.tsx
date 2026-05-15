// ============================================
// SEO Structured Data — calculadora individual
// ----------------------------------------------
// Schemas inyectados en cada página /calculadoras/[slug]:
//
//   1. SoftwareApplication enriquecido (con @id, image, featureList)
//   2. WebPage que apunta a la SoftwareApplication como mainEntity
//      (mejora la comprensión de Google de qué es la "cosa" central
//      de la página).
//   3. BreadcrumbList con ruta completa.
//   4. HowTo personalizado por calculadora — pasos derivados de los
//      inputs reales y del primer FAQ. Antes los pasos eran genéricos
//      e idénticos para las 40 calculadoras, lo que Google podría
//      tratar como contenido duplicado/template.
//   5. FAQPage si la calculadora tiene FAQs.
//
// Si hay una guía pillar relacionada, se incluye como `isPartOf` y
// se referencia desde el `WebPage.relatedLink` para reforzar el
// linking semántico calculadora → guía.
// ============================================

'use client';

import type { Calculator } from '@/types/calculator';
import {
  softwareApplicationSchema,
  faqPageSchema,
  breadcrumbSchema,
  howToSchema,
  webPageSchema,
} from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';

interface SeoStructuredDataProps {
  calculator: Calculator;
  url: string;
  /** URL absoluta de la imagen OG dinámica (1200x630). */
  imageUrl?: string;
  /** Si hay una guía pillar relacionada, su URL absoluta. */
  guideUrl?: string;
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
 * Trunca un string al límite indicado, cortando en el último espacio
 * para evitar palabras partidas. Útil porque `HowToStep.text` debe
 * ser conciso para que Google muestre los pasos en SERPs.
 */
function clamp(text: string, limit = 200): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= limit) return flat;
  const truncated = flat.slice(0, limit);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '…';
}

/**
 * Genera 4 pasos personalizados para el HowTo de cada calculadora.
 *
 * Estrategia (cascada):
 *   1. Paso 1 ("ingresa los datos") — describe los 2-3 primeros inputs
 *      requeridos por su label real.
 *   2. Paso 2 ("ajusta opciones") — sólo si la calculadora tiene
 *      inputs opcionales o booleanos, los menciona.
 *   3. Paso 3 ("revisa el resultado") — usa la primera respuesta del
 *      FAQ como contexto explicativo, si existe; si no, fallback
 *      genérico.
 *   4. Paso 4 ("interpreta con bases legales") — fallback que apunta
 *      a las preguntas frecuentes.
 *
 * Los pasos resultantes son únicos por calculadora (label de inputs,
 * label de opciones, primera respuesta FAQ), no plantilla.
 */
function buildHowToSteps(calculator: Calculator): {
  name: string;
  text: string;
}[] {
  const steps: { name: string; text: string }[] = [];

  // Paso 1: inputs requeridos
  const requiredInputs = calculator.inputs
    .filter((i) => i.required)
    .slice(0, 3);
  if (requiredInputs.length > 0) {
    const labels = requiredInputs.map((i) => `“${i.label}”`).join(', ');
    steps.push({
      name: `Ingresa los datos de ${calculator.name.toLowerCase()}`,
      text: clamp(
        `Completa los campos obligatorios: ${labels}. Los valores se ingresan en pesos chilenos (CLP) salvo que el campo indique otra unidad como UF o porcentaje.`,
      ),
    });
  } else {
    steps.push({
      name: 'Ingresa tus datos',
      text: clamp(
        `Completa los campos del formulario con la información solicitada para calcular ${calculator.name.toLowerCase()}.`,
      ),
    });
  }

  // Paso 2: opciones avanzadas (sólo si hay)
  const optionalInputs = calculator.inputs.filter(
    (i) => !i.required && (i.type === 'boolean' || i.type === 'select'),
  );
  if (optionalInputs.length > 0) {
    const sample = optionalInputs.slice(0, 2).map((i) => `“${i.label}”`);
    steps.push({
      name: 'Ajusta las opciones avanzadas',
      text: clamp(
        `Si tu caso lo requiere, configura opciones adicionales como ${sample.join(' y ')}. Estas opciones permiten reflejar escenarios particulares (régimen, tramo, contrato, etc.).`,
      ),
    });
  }

  // Paso 3: revisa el resultado, con contexto del primer FAQ si existe
  if (calculator.faq && calculator.faq.length > 0) {
    const firstFaq = calculator.faq[0];
    steps.push({
      name: 'Revisa el resultado en tiempo real',
      text: clamp(
        `El cálculo se ejecuta automáticamente. ${firstFaq.answer}`,
        220,
      ),
    });
  } else {
    steps.push({
      name: 'Revisa el resultado en tiempo real',
      text: clamp(
        'El cálculo se ejecuta automáticamente a medida que escribes. Cada resultado incluye su desglose detallado.',
      ),
    });
  }

  // Paso 4: bases legales / docs
  steps.push({
    name: 'Consulta las bases legales del cálculo',
    text: clamp(
      `Bajo la calculadora encontrarás un FAQ con las normativas que respaldan el cálculo (Código del Trabajo, SII, Banco Central). Cada resultado de ${calculator.name.toLowerCase()} cita su fuente oficial para que puedas verificarlo.`,
    ),
  });

  return steps;
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
  imageUrl,
  guideUrl,
}: SeoStructuredDataProps) {
  const categoryLabel =
    CATEGORY_LABELS[calculator.category] ?? calculator.category;

  const softwareSchema = softwareApplicationSchema({
    name: calculator.name,
    description: calculator.description,
    url,
    features: deriveFeatures(calculator),
    keywords: calculator.keywords,
    imageUrl,
  });

  const webPage = webPageSchema({
    url,
    name: calculator.name,
    description: calculator.description,
    breadcrumb: [
      { name: 'Inicio', path: '/' },
      { name: 'Calculadoras', path: '/calculadoras' },
      { name: categoryLabel, path: `/calculadoras#${calculator.category}` },
      { name: calculator.name },
    ],
    // Anclamos la "cosa" principal de la página al SoftwareApplication
    // emitido aquí mismo (mismo @id) para que Google entienda que la
    // calculadora ES la entidad central de la página.
    mainEntity: { '@id': `${url}#software` },
    primaryImageOfPage: imageUrl,
  });

  // Si hay una guía pillar relacionada, la referenciamos como
  // recurso relacionado y como subjectOf del software.
  if (guideUrl) {
    webPage.relatedLink = [guideUrl];
    softwareSchema.subjectOf = { '@type': 'CreativeWork', url: guideUrl };
  }

  const schemas: Record<string, unknown>[] = [
    softwareSchema,
    webPage,
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Calculadoras', path: '/calculadoras' },
      { name: categoryLabel, path: `/calculadoras#${calculator.category}` },
      { name: calculator.name },
    ]),
    howToSchema({
      name: `Cómo calcular ${calculator.name.toLowerCase()} en Chile`,
      description: `Pasos para usar la calculadora de ${calculator.name.toLowerCase()} con valores oficiales 2026.`,
      url,
      totalTime: 'PT2M',
      steps: buildHowToSteps(calculator),
      tools: ['Navegador web moderno', 'Datos del cálculo'],
    }),
  ];

  if (calculator.faq && calculator.faq.length > 0) {
    schemas.push(faqPageSchema(calculator.faq));
  }

  return <JsonLd id={`calc-${calculator.id}`} data={schemas} />;
}
