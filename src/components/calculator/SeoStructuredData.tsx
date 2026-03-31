'use client';

import type { Calculator } from '@/types/calculator';

interface SeoStructuredDataProps {
  calculator: Calculator;
  url: string;
}

/**
 * Genera datos estructurados Schema.org para calculadoras
 * 
 * Incluye:
 * - SoftwareApplication: Datos de la calculadora
 * - FAQPage: Preguntas frecuentes
 * - BreadcrumbList: Navegación
 */
export function generateCalculatorSchema(calculator: Calculator, url: string) {
  // Schema.org SoftwareApplication
  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: calculator.name,
    description: calculator.description,
    url: url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CLP',
    },
    author: {
      '@type': 'Organization',
      name: 'CalculaChile',
      url: 'https://calculachile.cl',
    },
    keywords: calculator.keywords?.join(', '),
  };

  // Schema.org FAQPage si hay preguntas frecuentes
  let faqPage = null;
  if (calculator.faq && calculator.faq.length > 0) {
    faqPage = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: calculator.faq.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  // Schema.org BreadcrumbList
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://calculachile.cl/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calculadoras',
        item: 'https://calculachile.cl/calculadoras',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: calculator.name,
        item: url,
      },
    ],
  };

  return {
    softwareApplication,
    faqPage,
    breadcrumbList,
  };
}

/**
 * Componente que inyecta los datos estructurados en el head de la página
 */
export default function SeoStructuredData({ calculator, url }: SeoStructuredDataProps) {
  const schemas = generateCalculatorSchema(calculator, url);

  return (
    <>
      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.softwareApplication),
        }}
      />

      {/* FAQPage Schema */}
      {schemas.faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas.faqPage),
          }}
        />
      )}

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbList),
        }}
      />
    </>
  );
}