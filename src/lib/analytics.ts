/**
 * analytics.ts - Helper para Google Analytics 4 (GA4)
 *
 * Funciones para inicializar el script de gtag y enviar eventos.
 * Sólo se ejecutan en el navegador. Tipos en `src/types/gtag.d.ts`.
 */

type GtagEventParams = Record<string, string | number | boolean | undefined>;

/**
 * ID de medición GA4 de calculadorachile.cl (propiedad "CalculadoraChile").
 * NEXT_PUBLIC_GA_MEASUREMENT_ID tiene prioridad si está definida en el build.
 * Si falta, los builds de producción usan este ID fijo, para no depender de
 * las variables de Workers Builds; `next dev` queda sin GA para no ensuciar
 * la propiedad real.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
  (process.env.NODE_ENV === 'production' ? 'G-PHMWEP3S9T' : '');

/**
 * Misma regla que AdSenseLoader: no medir visitas propias o de prueba
 * (?noads=1, cookie cc_noads=1, navegador automatizado o Chrome headless),
 * para que los bots que auditan el sitio no ensucien GA4. ?noads=0 vuelve
 * a medir. Solo lee; la cookie la escribe y borra AdSenseLoader.
 */
export function analyticsBlocked(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const param = new URLSearchParams(window.location.search).get('noads');
    if (param === '1') return true;
    if (param === '0') return false;
    if (document.cookie.split('; ').includes('cc_noads=1')) return true;
    if (navigator.webdriver) return true;
    if (/HeadlessChrome/i.test(navigator.userAgent)) return true;
  } catch {
    // ante cualquier error, se comporta como una visita normal
  }
  return false;
}

/**
 * Inicializa Google Analytics 4 cargando gtag.js y configurando el ID.
 * Es idempotente: llamadas adicionales no recargan el script.
 */
export function initGA(measurementId: string): void {
  if (typeof window === 'undefined') return;
  if (window.gtagInitialized) return;
  window.gtagInitialized = true;

  // Inserta el script de gtag.js
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  // Cola de eventos previa al script (gtag standard pattern).
  // gtag.js solo procesa objetos `arguments`: si se empuja un array, lo
  // ignora y nunca envía /g/collect. Por eso no se usa `...args`.
  window.dataLayer = window.dataLayer || [];
  const gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  } as NonNullable<typeof window.gtag>;

  gtag('js', new Date());
  // El page_view lo envía GAProvider en cada cambio de ruta; sin
  // send_page_view: false la primera visita se contaría dos veces.
  gtag('config', measurementId, { send_page_view: false });

  // Expone gtag globalmente
  window.gtag = gtag;
}

/**
 * Envía un evento de pageview a GA4.
 */
export function pageview(url: string): void {
  if (typeof window === 'undefined') return;
  if (!window.gtag) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[analytics] gtag no inicializado; pageview ignorado');
    }
    return;
  }
  window.gtag('event', 'page_view', { page_path: url });
}

/**
 * Track de eventos personalizados.
 */
export function event(action: string, params?: GtagEventParams): void {
  if (typeof window === 'undefined') return;
  if (!GA_MEASUREMENT_ID) return;
  if (!window.gtag) return;
  window.gtag('event', action, params ?? {});
}

// Eventos predefinidos sugeridos
export const trackEvents = {
  /**
   * Usuario empieza a usar la calculadora (inputs significativos).
   * Embudo plan 90 días: calculator_started.
   */
  calculatorStarted: (calculatorId: string) =>
    event('calculator_started', { calculator_id: calculatorId }),

  /**
   * Cálculo exitoso con resultados (una vez por sesión de inputs).
   * Embudo plan 90 días: calculator_completed.
   * `calculator_used` se mantiene como alias histórico en GA4.
   */
  calculatorCompleted: (calculatorId: string) => {
    event('calculator_completed', { calculator_id: calculatorId });
    event('calculator_used', { calculator_id: calculatorId });
  },

  /** @deprecated Preferir calculatorCompleted; se mantiene por compat. */
  calculatorUsed: (calculatorId: string) =>
    event('calculator_used', { calculator_id: calculatorId }),

  calculationExported: (calculatorId: string, format: string) =>
    event('calculation_exported', { calculator_id: calculatorId, format }),
  resultCopied: (calculatorId: string) => event('result_copied', { calculator_id: calculatorId }),
  resultShared: (calculatorId: string, channel: 'native' | 'whatsapp' | 'copy-link') =>
    event('result_shared', { calculator_id: calculatorId, channel }),
  faqExpanded: (questionId: string) => event('faq_expanded', { question_id: questionId }),
  scenarioCompared: (calculatorId: string) =>
    event('scenario_compared', { calculator_id: calculatorId }),
  scenarioCount: (count: number) => event('scenario_count', { count }),

  /** CTA puente CalculaChile → CVListo visible en viewport / render */
  employmentCtaViewed: (params: {
    calculatorId: string;
    origin: string;
    position: string;
    message?: string;
  }) =>
    event('employment_cta_viewed', {
      calculator_id: params.calculatorId,
      origin: params.origin,
      position: params.position,
      message: params.message,
      destination: 'cvlisto',
    }),

  /** Clic en CTA hacia CVListo */
  employmentCtaClicked: (params: {
    calculatorId: string;
    origin: string;
    position: string;
    destination?: string;
    experiment?: string;
    message?: string;
    /** Qué enlace se clickeó dentro del CTA ('cv' | 'carta'). */
    link?: string;
  }) =>
    event('employment_cta_clicked', {
      calculator_id: params.calculatorId,
      origin: params.origin,
      position: params.position,
      destination: params.destination ?? 'cvlisto',
      experiment: params.experiment,
      message: params.message,
      link: params.link,
    }),

  /** CTA puente CalculaChile → Sitiazo visible en render */
  pymeCtaViewed: (params: { calculatorId: string; position: string }) =>
    event('pyme_cta_viewed', {
      calculator_id: params.calculatorId,
      position: params.position,
      destination: 'sitiazo',
    }),

  /** Clic en CTA hacia Sitiazo */
  pymeCtaClicked: (params: { calculatorId: string; position: string }) =>
    event('pyme_cta_clicked', {
      calculator_id: params.calculatorId,
      position: params.position,
      destination: 'sitiazo',
    }),
};
