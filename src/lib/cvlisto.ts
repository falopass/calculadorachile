/**
 * Puente CalculaChile → CVListo
 *
 * URLs, allowlist de calculadoras y copy contextual para CTAs post-resultado.
 * No hardcodear enlaces a CVListo fuera de este módulo.
 */

export const CVLISTO_BASE_URL = 'https://cvlisto.cl';
export const CVLISTO_LANDING_PATH = '/desde-calculachile';

/** Calculadoras donde el CTA de reinserción / postulación tiene sentido. */
export const CVLISTO_CTA_CALCULATOR_IDS = [
  'finiquito',
  'indemnizacion-anos-servicio',
  'vacaciones-proporcionales',
  'sueldo-liquido',
  'boleta-honorarios',
] as const;

export type CvlistoCalculatorId = (typeof CVLISTO_CTA_CALCULATOR_IDS)[number];

export type CvlistoPlacement =
  | 'after_result'
  | 'below_guide'
  | 'blog_footer'
  | 'guia_footer';

export type CvlistoOrigen =
  | 'finiquito'
  | 'indemnizacion'
  | 'vacaciones'
  | 'sueldo'
  | 'honorarios'
  | 'default';

export interface CvlistoCtaCopy {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  origen: CvlistoOrigen;
}

const ORIGEN_BY_CALCULATOR: Record<CvlistoCalculatorId, CvlistoOrigen> = {
  finiquito: 'finiquito',
  'indemnizacion-anos-servicio': 'indemnizacion',
  'vacaciones-proporcionales': 'vacaciones',
  'sueldo-liquido': 'sueldo',
  'boleta-honorarios': 'honorarios',
};

const COPY_BY_ORIGEN: Record<CvlistoOrigen, CvlistoCtaCopy> = {
  finiquito: {
    eyebrow: 'Siguiente paso · reinserción',
    title: 'Tu siguiente ingreso comienza con una postulación mejor preparada',
    body: 'Revisa gratis si tu CV cubre los requisitos de la oferta a la que quieres postular. Score ATS y una mejora incluida al registrarte con Google.',
    ctaLabel: 'Analizar mi CV gratis',
    origen: 'finiquito',
  },
  indemnizacion: {
    eyebrow: 'Siguiente paso · reinserción',
    title: 'Ya estimaste tu indemnización. Prepara tu próxima postulación',
    body: 'Compara tu CV con una vacante real y detecta requisitos que faltan, sin inventar experiencia.',
    ctaLabel: 'Analizar mi CV gratis',
    origen: 'indemnizacion',
  },
  vacaciones: {
    eyebrow: 'Siguiente paso · planificar salida',
    title: 'Suma este monto a tu plan y prepara el CV con tiempo',
    body: 'Si estás cerrando un ciclo laboral, adapta tu currículum a la oferta que quieres antes de postular.',
    ctaLabel: 'Preparar mi CV gratis',
    origen: 'vacaciones',
  },
  sueldo: {
    eyebrow: '¿Es una oferta de trabajo?',
    title: 'Ya conoces el sueldo. ¿Tu CV cumple lo que pide la vacante?',
    body: 'Pega la oferta y revisa gratis el match ATS. Ideal si estás evaluando un cambio o una contraoferta.',
    ctaLabel: 'Comparar mi CV con la oferta',
    origen: 'sueldo',
  },
  honorarios: {
    eyebrow: 'Contrato vs honorarios · postulación',
    title: 'Ya calculaste la boleta. ¿Tu CV habla el idioma de la vacante?',
    body: 'Si comparas condiciones o te postulas a un cargo, revisa gratis el match ATS sin inventar experiencia.',
    ctaLabel: 'Analizar mi CV gratis',
    origen: 'honorarios',
  },
  default: {
    eyebrow: 'Herramienta de empleo',
    title: 'Adapta tu CV a cada oferta real',
    body: 'Score ATS y una optimización gratis al registrarte. Hecho para el mercado laboral chileno.',
    ctaLabel: 'Analizar mi CV gratis',
    origen: 'default',
  },
};

export function isCvlistoCtaCalculator(id: string): id is CvlistoCalculatorId {
  return (CVLISTO_CTA_CALCULATOR_IDS as readonly string[]).includes(id);
}

export function getCvlistoOrigenForCalculator(calculatorId: string): CvlistoOrigen {
  if (isCvlistoCtaCalculator(calculatorId)) {
    return ORIGEN_BY_CALCULATOR[calculatorId];
  }
  return 'default';
}

export function getCvlistoCtaCopy(calculatorId: string): CvlistoCtaCopy {
  const origen = getCvlistoOrigenForCalculator(calculatorId);
  return COPY_BY_ORIGEN[origen];
}

export function getCvlistoCtaCopyByOrigen(origen: string): CvlistoCtaCopy {
  if (origen in COPY_BY_ORIGEN) {
    return COPY_BY_ORIGEN[origen as CvlistoOrigen];
  }
  return COPY_BY_ORIGEN.default;
}

/** Guías pillar donde el CTA laboral aporta valor. */
export const CVLISTO_CTA_GUIA_SLUGS = [
  'finiquito-laboral-chile',
  'sueldo-liquido-chile',
  'iva-boleta-honorarios-chile',
] as const;

const ORIGEN_BY_GUIA: Record<string, CvlistoOrigen> = {
  'finiquito-laboral-chile': 'finiquito',
  'sueldo-liquido-chile': 'sueldo',
  'iva-boleta-honorarios-chile': 'honorarios',
};

/**
 * Detecta si un artículo/guía debe mostrar CTA a CVListo y con qué origen.
 * Prioriza calculadoras relacionadas, luego guía pillar, luego categoría laboral.
 */
export function resolveCvlistoContentOrigen(input: {
  relatedCalculators?: string[];
  relatedGuia?: string;
  category?: string;
  guiaSlug?: string;
}): CvlistoOrigen | null {
  if (input.guiaSlug && ORIGEN_BY_GUIA[input.guiaSlug]) {
    return ORIGEN_BY_GUIA[input.guiaSlug];
  }

  const calcs = input.relatedCalculators ?? [];
  for (const slug of calcs) {
    if (slug.includes('finiquito')) return 'finiquito';
    if (slug.includes('indemnizacion')) return 'indemnizacion';
    if (slug.includes('vacaciones')) return 'vacaciones';
    if (slug.includes('sueldo')) return 'sueldo';
    if (slug.includes('honorarios') || slug.includes('boleta')) return 'honorarios';
  }

  if (input.relatedGuia && ORIGEN_BY_GUIA[input.relatedGuia]) {
    return ORIGEN_BY_GUIA[input.relatedGuia];
  }

  const cat = (input.category ?? '').toLowerCase();
  if (cat === 'laboral' || cat === 'empleo' || cat === 'beneficios') {
    return 'default';
  }

  return null;
}

export interface BuildCvlistoUrlOptions {
  origen: CvlistoOrigen | string;
  placement: CvlistoPlacement;
  calculatorId?: string;
  /** Variante de experimento, p.ej. FIN_CTA_01_B */
  experiment?: string;
}

/**
 * Construye la URL de landing en CVListo con UTM y contexto de origen.
 */
export function buildCvlistoUrl(options: BuildCvlistoUrlOptions): string {
  const { origen, placement, calculatorId, experiment } = options;
  const url = new URL(CVLISTO_LANDING_PATH, CVLISTO_BASE_URL);

  url.searchParams.set('origen', origen);
  url.searchParams.set('utm_source', 'calculachile');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'ecosistema_laboral');
  url.searchParams.set(
    'utm_content',
    calculatorId ? `${calculatorId}_${placement}` : `${origen}_${placement}`,
  );
  url.searchParams.set('posicion', placement);

  if (calculatorId) {
    url.searchParams.set('calc', calculatorId);
  }
  if (experiment) {
    url.searchParams.set('exp', experiment);
  }

  return url.toString();
}
