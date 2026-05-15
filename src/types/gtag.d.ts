// Tipos globales para Google Analytics 4 (gtag.js)
// Documentación: https://developers.google.com/tag-platform/gtagjs/reference

export {};

type GtagCommand = 'config' | 'event' | 'js' | 'set' | 'consent';

type GtagParams =
  | Record<string, string | number | boolean | undefined>
  | Date
  | string;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, ...args: GtagParams[]) => void;
    /**
     * Marca interna usada por `initGA` para evitar inicializar gtag múltiples
     * veces en una misma sesión.
     */
    gtagInitialized?: boolean;
  }
}
