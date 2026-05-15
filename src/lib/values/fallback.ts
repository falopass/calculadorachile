// ============================================
// Valores de fallback unificados
// ----------------------------------------------
// Se usan cuando la API del Banco Central no
// responde. Fuente única para route /api/values,
// useLiveValues y ValuesContext.
// ============================================

export const FALLBACK_VALUES = {
  uf: 39841.72, // UF al 31/03/2026
  utm: 69889, // UTM Marzo 2026
  dolar: {
    observado: 931.57, // Dólar observado 30/03/2026
    venta: 960, // Dólar venta estimado
  },
  /**
   * Fecha de los valores fallback en ISO. Se usa como `lastUpdated`
   * cuando no hay datos frescos de BCentral.
   */
  asOf: '2026-03-31T00:00:00.000Z',
} as const;

export type FallbackValues = typeof FALLBACK_VALUES;
