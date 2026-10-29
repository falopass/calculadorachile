// ============================================
// Tope de gratificación legal (art. 50 CdT)
// ----------------------------------------------
// 4,75 ingresos mínimos mensuales al año, con el IMM vigente al 31-12 del
// año respectivo (DT, https://www.dt.gob.cl/portal/1626/w3-article-99034.html).
// Los textos (title, meta, FAQ, metodología, quick answer) leen estos montos:
// cambian solos cuando se actualice INGRESO_MINIMO.
// ============================================

import { INGRESO_MINIMO, GRATIFICACION } from '@/lib/values/constants';

export interface TopeGratificacion {
  /** Ingreso mínimo mensual usado. */
  imm: number;
  /** Año del ingreso mínimo vigente (de `INGRESO_MINIMO.vigente_desde`). */
  anio: number;
  /** Tope anual redondeado al peso: 4,75 × IMM. */
  anual: number;
  /** Tope mensual redondeado al peso: 4,75 × IMM ÷ 12. */
  mensual: number;
  /** Sueldo bruto mensual desde el que el 25% llega al tope. */
  umbral: number;
}

export function topeGratificacion(imm: number = INGRESO_MINIMO.mensual): TopeGratificacion {
  const anualExacto = imm * GRATIFICACION.tope_475_inm;
  const mensualExacto = anualExacto / 12;
  return {
    imm,
    anio: Number(INGRESO_MINIMO.vigente_desde.slice(0, 4)),
    anual: Math.round(anualExacto),
    mensual: Math.round(mensualExacto),
    umbral: Math.round(mensualExacto / (GRATIFICACION.porcentaje / 100)),
  };
}
