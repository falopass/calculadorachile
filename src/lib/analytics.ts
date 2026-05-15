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
};
