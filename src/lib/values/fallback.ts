// ============================================
// Valores de fallback unificados
// ----------------------------------------------
// Se usan cuando NINGUNA de las fuentes externas
// (BCentral o Mindicador) responde. Fuente única
// para route /api/values, useLiveValues y
// ValuesContext.
//
// Mantener actualizado mensualmente. Última
// revisión: 14/05/2026 (valores Mindicador).
// ============================================

export const FALLBACK_VALUES = {
  uf: 40324.06, // UF al 14/05/2026
  utm: 70588, // UTM Mayo 2026
  dolar: {
    observado: 889.19, // Dólar observado 14/05/2026
    venta: 895, // Dólar venta estimado (~+0.65%)
  },
  /**
   * Fecha de los valores fallback en ISO. Se usa como `lastUpdated`
   * cuando no hay datos frescos de fuentes externas.
   */
  asOf: '2026-05-14T00:00:00.000Z',
} as const;

export type FallbackValues = typeof FALLBACK_VALUES;
