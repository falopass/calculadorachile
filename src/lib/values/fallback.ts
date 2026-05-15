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

/**
 * Si el snapshot todavía no tiene EUR (versiones previas), derivamos
 * un valor razonable a partir del dólar con un premium histórico de
 * ~1.08. La derivación solo se usa para el fallback estático; en
 * runtime el valor "real" viene del snapshot diario.
 */
const EUR_PREMIUM_VS_USD_FALLBACK = 1.08;

const snapshotEuro = (snapshot as { euro?: number }).euro;
const fallbackEuro =
  typeof snapshotEuro === 'number' && snapshotEuro > 0
    ? snapshotEuro
    : Math.round(snapshot.dolarObservado * EUR_PREMIUM_VS_USD_FALLBACK * 100) / 100;

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
  /** Paridad EUR/CLP (Euro observado). */
  euro: fallbackEuro,
  /** ISO date del último valor (lo reportado por la fuente). */
  asOf: snapshot.asOf,
  /** Cuándo se generó el snapshot (build-time). */
  generatedAt: snapshot.generatedAt,
  /** De dónde vino cada métrica. Útil para diagnóstico. */
  sources: snapshot.sources,
} as const;

export type FallbackValues = typeof FALLBACK_VALUES;
