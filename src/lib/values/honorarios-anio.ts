// ============================================
// E-028: año y tasa de la boleta de honorarios según la fecha.
// La tasa es la del año comercial de emisión de la boleta (SII FAQ
// 001.140.3611.013). Calendario: RETENCION_HONORARIOS_CALENDARIO (Ley 21.133).
// ============================================

import { RETENCION_HONORARIOS_CALENDARIO } from './constants';
import { partesSantiago } from './fecha-santiago';

export type AnioHonorarios = keyof typeof RETENCION_HONORARIOS_CALENDARIO;

const ANIOS = Object.keys(RETENCION_HONORARIOS_CALENDARIO)
  .map(Number)
  .sort((a, b) => a - b) as AnioHonorarios[];

/** Limita un año al rango del calendario (antes del primero → primero; después del último → último). */
export function anioEnCalendario(anio: number): AnioHonorarios {
  if (anio <= ANIOS[0]) return ANIOS[0];
  if (anio >= ANIOS[ANIOS.length - 1]) return ANIOS[ANIOS.length - 1];
  return (ANIOS.includes(anio as AnioHonorarios) ? anio : ANIOS[0]) as AnioHonorarios;
}

/** "15,25%" / "16%". */
export function formatTasa(tasa: number): string {
  return `${tasa.toLocaleString('es-CL', { maximumFractionDigits: 2 })}%`;
}

export interface ContextoHonorarios {
  /** Año en curso en Chile, dentro del calendario. */
  anio: AnioHonorarios;
  tasa: number;
  /** Año siguiente si está en el calendario; si no, null. */
  siguiente: AnioHonorarios | null;
  tasaSiguiente: number | null;
  /**
   * Dic (E-053 / Diego): título dual «anio y siguiente» y se ofrece el
   * año siguiente en el selector. Nunca adelanta la tasa por defecto.
   */
  modoCambioDeAnio: boolean;
  /**
   * Año preseleccionado en el selector: siempre el año vigente hasta
   * el 01-01. El siguiente solo se ofrece como opción desde el 01-12.
   */
  anioSelector: AnioHonorarios;
}

export function contextoHonorarios(date: Date = new Date()): ContextoHonorarios {
  const { year, month } = partesSantiago(date);
  const anio = anioEnCalendario(year);
  const sig = (anio + 1) as AnioHonorarios;
  const siguiente = sig in RETENCION_HONORARIOS_CALENDARIO && year === anio ? sig : null;
  // Dual title + opción del año siguiente: desde diciembre (Diego).
  // Noviembre NO adelanta el default ni el título dual.
  const modoCambioDeAnio = month === 12 && siguiente !== null;
  return {
    anio,
    tasa: RETENCION_HONORARIOS_CALENDARIO[anio],
    siguiente,
    tasaSiguiente: siguiente ? RETENCION_HONORARIOS_CALENDARIO[siguiente] : null,
    modoCambioDeAnio,
    // Siempre el año vigente: la tasa legal depende del año de emisión.
    anioSelector: anio,
  };
}
