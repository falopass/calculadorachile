// ============================================
// Generadores Schema.org (JSON-LD)
// ----------------------------------------------
// Funciones puras que devuelven el objeto JSON-LD
// listo para inyectar como <script type="application/ld+json">.
//
// Schemas implementados (vocabulario oficial schema.org):
//   - Organization
//   - WebSite (con potentialAction: SearchAction)
//   - WebPage / AboutPage / ContactPage
//   - BreadcrumbList
//   - Article / BlogPosting (para blog)
//   - CollectionPage / ItemList (para listados)
//   - SoftwareApplication (calculadoras)
//   - HowTo (instrucciones paso a paso)
//   - FAQPage / Question / Answer
//
// Cada función está tipada con `Record<string, unknown>` para que
// TypeScript no impida agregar campos opcionales sin pelear con
// tipos estrictos de schema.org.
// ============================================

import { SITE_NAME, SITE_URL, absoluteUrl, CONTACT_EMAIL } from '@/lib/site';

/** Identificadores estables para nodos referenciables (`@id`). */
export const SCHEMA_IDS = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  logo: `${SITE_URL}/#logo`,
} as const;

/**
 * Organization — entidad detrás del sitio. Se inyecta una vez en el
 * layout raíz y todos los demás schemas la referencian por `@id`.
 */
export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SCHEMA_IDS.organization,
    name: SITE_NAME,
    alternateName: 'Calcula Chile',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': SCHEMA_IDS.logo,
      url: absoluteUrl('/logo.png'),
      width: 512,
      height: 512,
      caption: SITE_NAME,
    },
    image: { '@id': SCHEMA_IDS.logo },
    description:
      'Plataforma chilena con más de 40 calculadoras laborales, tributarias y financieras. Sueldo líquido, finiquito, UF, UTM, IVA, créditos, subsidios y más.',
    email: CONTACT_EMAIL,
    foundingDate: '2025',
    areaServed: { '@type': 'Country', name: 'Chile' },
    knowsAbout: [
      'Cálculo de sueldo líquido en Chile',
      'Indemnización por años de servicio',
      'Boleta de honorarios',
      'IVA Chile',
      'Crédito hipotecario',
      'Reajuste de arriendo por UF',
      'Cotizaciones previsionales AFP',
      'Permiso de circulación',
    ],
    sameAs: [
      'https://twitter.com/calculachile',
      'https://github.com/falopass/calculadorachile',
      'https://linkedin.com/company/calculachile',
    ],
  };
}

/**
 * WebSite — vincula al sitio con su Organization y declara una
 * SearchAction para que Google pueda exponer un cuadro de búsqueda
 * en los resultados (sitelinks searchbox).
 */
export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    url: SITE_URL,
    name: SITE_NAME,
    description: 'Calculadoras laborales, tributarias y financieras de Chile.',
    inLanguage: 'es-CL',
    publisher: { '@id': SCHEMA_IDS.organization },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/calculadoras?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * BreadcrumbList — uno por página con navegación jerárquica.
 *
 * Recibe un array de pares [nombre, path]; el último puede omitir
 * `path` si es la página actual (Google también acepta sin URL en el
 * último item).
 */
export function breadcrumbSchema(
  items: ReadonlyArray<{ name: string; path?: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

/**
 * WebPage genérico para páginas que no caen en una categoría más
 * específica (legales, FAQ, guías, etc.). Permite `subType` para
 * casos como `AboutPage`, `ContactPage`, `FAQPage`.
 *
 * Soporta `mainEntity` para anclar la página a su entidad principal
 * (por ejemplo, una `SoftwareApplication` en la página de una
 * calculadora) y `primaryImageOfPage` para la imagen OG dinámica.
 */
export function webPageSchema(args: {
  url: string;
  name: string;
  description: string;
  subType?: 'AboutPage' | 'ContactPage' | 'FAQPage' | 'CollectionPage' | 'WebPage';
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: ReadonlyArray<{ name: string; path?: string }>;
  /**
   * Referencia a la entidad principal de la página (por ID con `@id`
   * o por objeto inline). En calculadoras, apuntar al `@id` del
   * SoftwareApplication para que Google entienda que esa es la
   * "cosa" central de la página.
   */
  mainEntity?: Record<string, unknown> | { '@id': string };
  /** URL absoluta de la imagen principal (1200x630). */
  primaryImageOfPage?: string;
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': args.subType ?? 'WebPage',
    '@id': `${args.url}#webpage`,
    url: args.url,
    name: args.name,
    description: args.description,
    inLanguage: 'es-CL',
    isPartOf: { '@id': SCHEMA_IDS.website },
    publisher: { '@id': SCHEMA_IDS.organization },
  };
  if (args.datePublished) schema.datePublished = args.datePublished;
  if (args.dateModified) schema.dateModified = args.dateModified;
  if (args.breadcrumb && args.breadcrumb.length > 0) {
    schema.breadcrumb = breadcrumbSchema(args.breadcrumb);
  }
  if (args.mainEntity) schema.mainEntity = args.mainEntity;
  if (args.primaryImageOfPage) {
    schema.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: args.primaryImageOfPage,
      width: 1200,
      height: 630,
    };
  }
  return schema;
}

/**
 * Article / BlogPosting — usar para posts del blog.
 *
 * Incluye author como Organization (no fingimos un humano), publisher
 * (el mismo SITE), mainEntityOfPage para anclar al canonical, y
 * dateModified que es lo que Google realmente usa para frescura.
 */
export function articleSchema(args: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
  /** Lista de URLs internas mencionadas en el artículo. */
  mentions?: string[];
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.headline.slice(0, 110), // Google trunca >110 chars
    description: args.description,
    url: args.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': args.url,
    },
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: {
      '@type': 'Organization',
      '@id': SCHEMA_IDS.organization,
      name: args.authorName ?? SITE_NAME,
    },
    publisher: { '@id': SCHEMA_IDS.organization },
    inLanguage: 'es-CL',
    isAccessibleForFree: true,
  };

  if (args.imageUrl) {
    schema.image = {
      '@type': 'ImageObject',
      url: args.imageUrl,
      width: 1200,
      height: 630,
    };
  } else {
    // Fallback al OG image global para que Google siempre tenga thumbnail.
    schema.image = {
      '@type': 'ImageObject',
      url: absoluteUrl('/og-image.png'),
      width: 1200,
      height: 630,
    };
  }

  if (args.keywords && args.keywords.length > 0) {
    schema.keywords = args.keywords.join(', ');
  }
  if (args.articleSection) schema.articleSection = args.articleSection;
  if (args.wordCount) schema.wordCount = args.wordCount;
  if (args.mentions && args.mentions.length > 0) {
    schema.mentions = args.mentions.map((url) => ({
      '@type': 'Thing',
      url,
    }));
  }

  return schema;
}

/**
 * CollectionPage + ItemList — para `/calculadoras` y `/blog` (índices).
 *
 * Cada item del ItemList lleva nombre, URL y opcionalmente descripción.
 * Esto le permite a Google entender la estructura del listado y
 * potencialmente mostrar carruseles de resultados (sitelinks).
 */
export function collectionPageSchema(args: {
  url: string;
  name: string;
  description: string;
  items: ReadonlyArray<{
    name: string;
    url: string;
    description?: string;
    position?: number;
  }>;
  breadcrumb?: ReadonlyArray<{ name: string; path?: string }>;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${args.url}#collectionpage`,
    url: args.url,
    name: args.name,
    description: args.description,
    inLanguage: 'es-CL',
    isPartOf: { '@id': SCHEMA_IDS.website },
    publisher: { '@id': SCHEMA_IDS.organization },
    ...(args.breadcrumb ? { breadcrumb: breadcrumbSchema(args.breadcrumb) } : {}),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: args.items.length,
      itemListElement: args.items.map((item, idx) => ({
        '@type': 'ListItem',
        position: item.position ?? idx + 1,
        url: item.url,
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
      })),
    },
  };
}

/**
 * SoftwareApplication — calculadoras individuales.
 *
 * Versión enriquecida de la previa: agrega `featureList` derivada de
 * los inputs y `aggregateRating` opcional. Mantiene retrocompat con
 * el schema anterior pero con más detalle.
 *
 * El `@id` se calcula como `<url>#software` para que otros schemas
 * puedan referenciarlo (por ejemplo, `WebPage.mainEntity`).
 */
export function softwareApplicationSchema(args: {
  name: string;
  description: string;
  url: string;
  features?: string[];
  keywords?: string[];
  datePublished?: string;
  dateModified?: string;
  /** URL absoluta de imagen OG (1200x630). Mejora el thumbnail en SERPs. */
  imageUrl?: string;
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${args.url}#software`,
    name: args.name,
    description: args.description,
    url: args.url,
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Calculator',
    operatingSystem: 'Any (Web Browser)',
    browserRequirements: 'Requires JavaScript. Modern browsers supported.',
    inLanguage: 'es-CL',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CLP',
      availability: 'https://schema.org/InStock',
    },
    author: { '@id': SCHEMA_IDS.organization },
    publisher: { '@id': SCHEMA_IDS.organization },
  };

  if (args.features && args.features.length > 0) {
    schema.featureList = args.features.join(', ');
  }
  if (args.keywords && args.keywords.length > 0) {
    schema.keywords = args.keywords.join(', ');
  }
  if (args.imageUrl) {
    schema.image = {
      '@type': 'ImageObject',
      url: args.imageUrl,
      width: 1200,
      height: 630,
    };
  }
  if (args.datePublished) schema.datePublished = args.datePublished;
  if (args.dateModified) schema.dateModified = args.dateModified;

  return schema;
}

/**
 * LearningResource — recurso educativo (ideal para guías pillar).
 *
 * Google reconoce `LearningResource` como subtipo de `CreativeWork`
 * y le da preferencia para snippets educativos. Sirve como SEGUNDO
 * schema en /guias/[slug] junto al `Article` clásico, no como
 * reemplazo: cada uno cubre un caso (Article para Google News, etc.;
 * LearningResource para Discover educativo / "About this result").
 */
export function learningResourceSchema(args: {
  url: string;
  name: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  /** Tema principal — etiqueta legible (ej. "Sueldo y derechos laborales"). */
  about?: string;
  /** Texto que el lector debe entender después de leer (objetivo). */
  teaches?: string;
  /** Nivel del recurso. `Beginner` por default. */
  educationalLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  /** Tiempo estimado de lectura en formato ISO 8601 (ej. PT12M). */
  timeRequired?: string;
  /** Audiencia (ej. "trabajadores en Chile"). */
  audience?: string;
  keywords?: string[];
  imageUrl?: string;
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    url: args.url,
    name: args.name,
    description: args.description,
    inLanguage: 'es-CL',
    isAccessibleForFree: true,
    learningResourceType: 'Guide',
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    educationalLevel: args.educationalLevel ?? 'Beginner',
    author: { '@id': SCHEMA_IDS.organization },
    publisher: { '@id': SCHEMA_IDS.organization },
  };
  if (args.about) schema.about = { '@type': 'Thing', name: args.about };
  if (args.teaches) schema.teaches = args.teaches;
  if (args.timeRequired) schema.timeRequired = args.timeRequired;
  if (args.audience) {
    schema.audience = { '@type': 'Audience', audienceType: args.audience };
  }
  if (args.keywords && args.keywords.length > 0) {
    schema.keywords = args.keywords.join(', ');
  }
  if (args.imageUrl) {
    schema.image = {
      '@type': 'ImageObject',
      url: args.imageUrl,
      width: 1200,
      height: 630,
    };
  }
  return schema;
}

/**
 * HowTo — instrucciones paso a paso para usar una calculadora o
 * realizar un cálculo (ej. "Cómo calcular el finiquito").
 *
 * Google lo usa para enriquecer SERPs con pasos visibles. Cada step
 * debe tener un nombre y un text descriptivo.
 */
export function howToSchema(args: {
  name: string;
  description: string;
  url?: string;
  totalTime?: string; // formato ISO 8601 PT2M
  steps: ReadonlyArray<{ name: string; text: string; url?: string }>;
  supplies?: string[];
  tools?: string[];
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: args.name,
    description: args.description,
    inLanguage: 'es-CL',
    step: args.steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.name,
      text: step.text,
      ...(step.url ? { url: step.url } : {}),
    })),
  };

  if (args.url) schema.url = args.url;
  if (args.totalTime) schema.totalTime = args.totalTime;
  if (args.supplies && args.supplies.length > 0) {
    schema.supply = args.supplies.map((name) => ({
      '@type': 'HowToSupply',
      name,
    }));
  }
  if (args.tools && args.tools.length > 0) {
    schema.tool = args.tools.map((name) => ({
      '@type': 'HowToTool',
      name,
    }));
  }

  return schema;
}

/**
 * FAQPage — un objeto con N preguntas. El consumidor decide si lo
 * inyecta solo en la página FAQ del sitio o también en calculadoras
 * con FAQs propios.
 */
export function faqPageSchema(
  items: ReadonlyArray<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'es-CL',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Helper: serializa un schema a un string JSON sin saltos de línea
 * extra (Google los acepta pero pesan en KB), y escapa caracteres
 * que rompen `dangerouslySetInnerHTML` dentro de un `<script>`:
 *  - `</`  → `<\/`  (evita cierre prematuro del tag)
 *  - `<!--`, `-->` → escapados (evita comentarios)
 */
export function serializeSchema(schema: unknown): string {
  return JSON.stringify(schema)
    .replace(/<\/(script)/gi, '<\\/$1')
    .replace(/<!--/g, '<\\!--')
    .replace(/-->/g, '--\\>');
}
