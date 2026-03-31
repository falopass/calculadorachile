/**
 * analytics.ts - Helper para Google Analytics 4 (GA4)
 *
 * Funciones para inicializar el script de gtag y enviar eventos
 * de pageview. Solo se ejecutan en el navegador.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Inicializa Google Analytics 4 cargando el script de gtag.js
 * y configurando el measurement ID.
 *
 * @param measurementId - ID de medicion de GA4 (formato G-XXXXXXXXXX)
 */
export function initGA(measurementId: string): void {
  if (typeof window === 'undefined') return;

  // Evita inicializar multiples veces
  if ((window as any).gtagInitialized) return;
  (window as any).gtagInitialized = true;

  // Inserta el script de gtag.js
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  // Inicializa la capa de datos y configura el ID de medicion
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', measurementId);

  // Expone gtag globalmente para otros modulos
  (window as any).gtag = gtag;
}

/**
 * Envia un evento de pageview a Google Analytics 4.
 *
 * @param url - Ruta de la pagina visitada (ej. /calculadora-sueldo-liquido)
 */
export function pageview(url: string): void {
  if (typeof window === 'undefined') return;

  if (!(window as any).gtag) {
    console.error('gtag no esta inicializado. Llama a initGA() primero.');
    return;
  }

  (window as any).gtag('event', 'page_view', {
    page_path: url,
  });
}
