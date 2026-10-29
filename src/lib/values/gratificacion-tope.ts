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
  /** Fecha desde la que rige el IMM, en texto ("1 de mayo de 2026"). */
  vigenteDesdeTexto: string;
  /** `INGRESO_MINIMO.vigente_desde` (AAAA-MM-DD). */
  vigenteDesde: string;
  /** Ley que fija el IMM (`INGRESO_MINIMO.ley`, p. ej. "21.830"). */
  ley: string;
  /** Tope anual redondeado al peso: 4,75 × IMM. */
  anual: number;
  /** Tope mensual redondeado al peso: 4,75 × IMM ÷ 12. */
  mensual: number;
  /** Sueldo bruto mensual (al peso, hacia arriba) desde el que el 25% llega al tope. */
  umbral: number;
}

const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

/** "2026-05-01" → "1 de mayo de 2026" (sin zonas horarias). */
function fechaLarga(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} de ${MESES[m - 1]} de ${y}`;
}

export function topeGratificacion(imm: number = INGRESO_MINIMO.mensual): TopeGratificacion {
  const anualExacto = imm * GRATIFICACION.tope_475_inm;
  const mensualExacto = anualExacto / 12;
  return {
    imm,
    anio: Number(INGRESO_MINIMO.vigente_desde.slice(0, 4)),
    vigenteDesde: INGRESO_MINIMO.vigente_desde,
    ley: INGRESO_MINIMO.ley,
    vigenteDesdeTexto: fechaLarga(INGRESO_MINIMO.vigente_desde),
    anual: Math.round(anualExacto),
    mensual: Math.round(mensualExacto),
    umbral: Math.ceil(mensualExacto / (GRATIFICACION.porcentaje / 100)),
  };
}
