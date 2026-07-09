// ============================================
// Coerción de inputs de calculadora (catálogo UI → motor)
// --------------------------------------------
// Un solo lugar para parsear valores que llegan como number | string | boolean
// desde PremiumCalculatorShell / adapters. Sin React, testeable.
// ============================================

/**
 * Convierte un valor desconocido a número finito.
 * Strings vacíos / NaN / null / undefined → fallback.
 */
export function coerceNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : fallback;
  }
  if (value === '' || value === null || value === undefined) {
    return fallback;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Interpreta booleans de formulario (boolean real o string "true"/"false").
 * Cualquier otro valor → fallback (default false).
 */
export function coerceBool(value: unknown, fallback = false): boolean {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return fallback;
}
