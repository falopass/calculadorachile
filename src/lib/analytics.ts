/**
 * analytics.ts - Helper para Google Analytics 4 (GA4)
 *
 * Funciones para inicializar el script de gtag y enviar eventos.
 * Sólo se ejecutan en el navegador. Tipos en `src/types/gtag.d.ts`.
 */

type GtagEventParams = Record<string, string | number | boolean | undefined>;

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

  // Cola de eventos previa al script (gtag standard pattern)
  window.dataLayer = window.dataLayer || [];
  const gtag: typeof window.gtag = function gtag(...args) {
    window.dataLayer!.push(args);
  };

  gtag('js', new Date());
  gtag('config', measurementId);

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
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;
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
  resultCopied: (calculatorId: string) =>
    event('result_copied', { calculator_id: calculatorId }),
  faqExpanded: (questionId: string) =>
    event('faq_expanded', { question_id: questionId }),
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
  }) =>
    event('employment_cta_clicked', {
      calculator_id: params.calculatorId,
      origin: params.origin,
      position: params.position,
      destination: params.destination ?? 'cvlisto',
      experiment: params.experiment,
      message: params.message,
    }),
};
