// ============================================
// Valores de fallback unificados
// ----------------------------------------------
// Se usan cuando NINGUNA de las fuentes externas
// (BCentral o Mindicador) responde en runtime.
//
// La fuente de verdad es `snapshot.json`, que
// se actualiza diariamente por el GitHub Action
// `.github/workflows/update-values.yml`.
//
// NO hardcodear valores aquí: si tocas este
// archivo a mano, se sobrescribirán cuando el
// action vuelva a correr.
// ============================================

import snapshot from './snapshot.json';

export const FALLBACK_VALUES = {
  uf: snapshot.uf,
  utm: snapshot.utm,
  dolar: {
    observado: snapshot.dolarObservado,
    // El "venta" del BCentral es ~+0.65% sobre el observado en
    // condiciones normales. Mindicador no expone esa serie así
    // que la derivamos.
    venta: Math.round(snapshot.dolarObservado * 1.0065 * 100) / 100,
  },
  /** ISO date del último valor (lo reportado por la fuente). */
  asOf: snapshot.asOf,
  /** Cuándo se generó el snapshot (build-time). */
  generatedAt: snapshot.generatedAt,
  /** De dónde vino cada métrica. Útil para diagnóstico. */
  sources: snapshot.sources,
} as const;

export type FallbackValues = typeof FALLBACK_VALUES;
