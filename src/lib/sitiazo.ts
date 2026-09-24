/**
 * Puente CalculaChile → Sitiazo
 *
 * URLs, allowlist de calculadoras pyme y copy contextual para CTAs
 * post-resultado. No hardcodear enlaces a Sitiazo fuera de este módulo.
 */

export const SITIAZO_BASE_URL = 'https://sitiazo.cl';

/** Calculadoras donde el CTA "página web para tu pyme" tiene sentido. */
export const SITIAZO_CTA_CALCULATOR_IDS = [
  'patente-comercial',
  'iva',
] as const;

export type SitiazoCalculatorId = (typeof SITIAZO_CTA_CALCULATOR_IDS)[number];

export type SitiazoPlacement = 'after_result' | 'blog_footer' | 'guia_footer';

export interface SitiazoCtaCopy {
  title: string;
  body: string;
  ctaLabel: string;
}

const COPY_BY_CALCULATOR: Record<SitiazoCalculatorId, SitiazoCtaCopy> = {
  'patente-comercial': {
    title: '¿Estás abriendo o formalizando tu negocio?',
    body: 'Si además necesitas que tus clientes te encuentren en Google, Sitiazo diseña páginas web para pymes chilenas.',
    ctaLabel: 'Ver cómo trabaja Sitiazo',
  },
  iva: {
    title: '¿Vendes con boleta o factura?',
    body: 'Si tu negocio todavía depende solo de Instagram o WhatsApp, Sitiazo diseña páginas web para pymes chilenas.',
    ctaLabel: 'Ver cómo trabaja Sitiazo',
  },
};

export function isSitiazoCtaCalculator(id: string): id is SitiazoCalculatorId {
  return (SITIAZO_CTA_CALCULATOR_IDS as readonly string[]).includes(id);
}

export function getSitiazoCtaCopy(calculatorId: string): SitiazoCtaCopy | null {
  if (!isSitiazoCtaCalculator(calculatorId)) return null;
  return COPY_BY_CALCULATOR[calculatorId];
}

/**
 * Construye la URL de Sitiazo con UTM y contexto de origen.
 * `key` es el calculatorId o el contentId (`blog_<slug>` / `guia_<slug>`).
 */
export function buildSitiazoUrl(
  key: string,
  placement: SitiazoPlacement = 'after_result',
): string {
  const url = new URL('/', SITIAZO_BASE_URL);
  url.searchParams.set('utm_source', 'calculachile');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'ecosistema_pymes');
  url.searchParams.set('utm_content', `${key}_${placement}`);
  return url.toString();
}
