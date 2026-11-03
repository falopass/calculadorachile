// ============================================
// UF para respuestas rápidas SSR
// ----------------------------------------------
// Algunas páginas sin bloque de valor en vivo necesitan la UF del día en
// su respuesta rápida (p. ej. el tope de 90 UF de la indemnización). Usan
// la misma fuente que la calculadora de UF (`getCurrentValues`:
// BCentral → Mindicador → snapshot) y el snapshot solo como respaldo.
// ============================================

import type { CurrentValues } from '@/lib/api/current-values';
import { FALLBACK_VALUES } from '@/lib/values/fallback';

/** Slugs cuya respuesta rápida usa la UF del día (sin bloque de valor en vivo). */
export const LIVE_UF_QUICK_ANSWER_SLUGS: ReadonlySet<string> = new Set([
  'calculadora-indemnizacion-anos-servicio',
]);

/**
 * UF y su fecha para la respuesta rápida: la del dato en vivo si existe; si
 * no, la del snapshot con su propia fecha.
 */
export function ufParaRespuestaRapida(live: CurrentValues | null): { uf: number; ufFecha: string } {
  const uf = live?.values.uf;
  if (uf && uf > 0) {
    return { uf, ufFecha: live?.dates.uf ?? FALLBACK_VALUES.asOf };
  }
  return { uf: FALLBACK_VALUES.uf, ufFecha: FALLBACK_VALUES.asOf };
}
