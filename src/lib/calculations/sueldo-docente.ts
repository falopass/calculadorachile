// ============================================
// Cálculo de Sueldo Docente (Carrera Docente) Chile 2026
// ============================================
// Base legal y montos (verificados 2026-11-22):
// - VMHC desde 01-06-2026: $19.992 (prebásica/básica/especial) y $21.034
//   (media HC y TP). Fuente: Dirección del Trabajo, consulta hora cronológica
//   docente (dt.gob.cl art. 61527); Ley 21.806 (reajuste +2,0% dic-2025 y
//   +1,4% jun-2026). RBMN = VMHC × horas de contrato (Estatuto Docente art. 35).
// - Asignación de experiencia (bienios): 3,38% del RBMN el primer bienio y
//   3,33% por cada bienio adicional, tope 50% a los 15 bienios
//   (DFL 1/1996 Mineduc; ayudamineduc.cl / escalas municipales 2026).
// - Asignación por Tramo de Desarrollo Profesional (art. 49 Estatuto Docente):
//   componente experiencia (misma fórmula de bienios) + componente de
//   progresión (máx. para 44 h y 15 bienios, prorrateado) + componente fijo
//   (Avanzado/Expertos, prorrateado por jornada). Valores jun-2026 publicados
//   por CPEIP (cpeip.cl; cruces con escalas DAEM 2026 y ayudamineduc).
// - BRP (Ley 20.158 / art. 54 Estatuto Docente): componente base por título
//   $351.263 y complemento por mención $117.091, tope 30 h (proporcional).
//   Montos jun-2026 (escalas DAEM 2026 × 1,014 reajuste Ley 21.806).
// - Asignación por alta concentración de alumnos prioritarios (art. 50):
//   >=60%: 20% de la asignación de tramo + fijo $66.128; Avanzado/Expertos
//   con >=80%: 20% + fijo $156.871; rural 45–60%: 10% del tramo.
//   Fuente: ayudamineduc.cl, montos jun-2026.
// Descuentos (AFP, salud, AFC, impuesto) se delegan a `sueldo-liquido.ts`.
// ============================================

import { AFP } from '@/lib/values/constants';
import { calculateSueldoLiquido } from './sueldo-liquido';
import type { CalculatorResult } from '@/types/calculator';

/** Valor mínimo de la hora cronológica docente, vigente desde 01-06-2026 (DT). */
export const VMHC_2026 = {
  basica: 19_992,
  media: 21_034,
} as const;

export const JORNADA_MAX_HORAS = 44;
export const BIENIOS_MAX = 15;
/** La BRP se paga con tope de 30 horas semanales (art. 54 Estatuto Docente). */
export const BRP_HORAS_TOPE = 30;

export type TramoDocente =
  | 'sin-tramo'
  | 'acceso'
  | 'inicial'
  | 'temprano'
  | 'avanzado'
  | 'experto1'
  | 'experto2';

/** Componente de progresión, máximo para 44 h y 15 bienios (jun-2026). */
export const TRAMO_PROGRESION_MAX: Record<Exclude<TramoDocente, 'sin-tramo'>, number> = {
  acceso: 19_774,
  inicial: 19_774,
  temprano: 65_162,
  avanzado: 131_142,
  experto1: 491_641,
  experto2: 1_058_032,
};

/** Componente fijo, máximo para 44 h (jun-2026). Solo tramos altos. */
export const TRAMO_FIJO_MAX: Partial<Record<TramoDocente, number>> = {
  avanzado: 136_111,
  experto1: 189_045,
  experto2: 287_346,
};

/** BRP mensual máxima a 30 h (jun-2026). */
export const BRP_2026 = {
  titulo: 351_263,
  mencion: 117_091,
} as const;

/** Montos fijos de la asignación por alumnos prioritarios a 44 h (jun-2026). */
export const PRIORITARIOS_2026 = {
  fijo60: 66_128,
  fijo80: 156_871,
} as const;

export type EscenarioPrioritarios =
  | 'ninguno'
  | 'rural45'
  | 'urbana60'
  | 'avanzada80';

export interface SueldoDocenteInput {
  horasBasica: number;
  horasMedia: number;
  tramo: TramoDocente;
  bienios: number;
  brpTitulo: boolean;
  brpMencion: boolean;
  concentracionPrioritarios: EscenarioPrioritarios;
  afp: keyof typeof AFP;
  saludTipo: 'fonasa' | 'isapre';
  isapreMonto?: number;
  contratoIndefinido?: boolean;
  valorUF?: number;
  valorUTM?: number;
}

export interface SueldoDocenteResult {
  horasAplicadas: number;
  haberes: {
    rbmn: number;
    asignacionExperiencia: number;
    tramoExperiencia: number;
    tramoProgresion: number;
    tramoFijo: number;
    brpTitulo: number;
    brpMencion: number;
    alumnosPrioritarios: number;
  };
  totalHaberes: number;
  asignacionTramo: number;
  descuentos: {
    afp: number;
    salud: number;
    seguroCesantia: number;
    impuesto: number;
  };
  totalDescuentos: number;
  liquido: number;
}

/** Porcentaje del RBMN por bienios: 3,38% el primero + 3,33% c/u, tope 50%. */
export function porcentajeBienios(bienios: number): number {
  const n = Math.max(0, Math.min(Math.trunc(bienios), BIENIOS_MAX));
  if (n === 0) return 0;
  return Math.min(3.38 + 3.33 * (n - 1), 50);
}

const TRAMOS_ALTOS: TramoDocente[] = ['avanzado', 'experto1', 'experto2'];

export function calculateSueldoDocente(input: SueldoDocenteInput): SueldoDocenteResult {
  const hBasica = Math.max(0, Math.min(input.horasBasica, JORNADA_MAX_HORAS));
  const hMedia = Math.max(0, Math.min(input.horasMedia, JORNADA_MAX_HORAS));
  const horas = Math.min(hBasica + hMedia, JORNADA_MAX_HORAS);
  const factorJornada = horas / JORNADA_MAX_HORAS;

  const rbmn = Math.round(hBasica * VMHC_2026.basica + hMedia * VMHC_2026.media);

  const pct = porcentajeBienios(input.bienios) / 100;
  const bienios = Math.max(0, Math.min(Math.trunc(input.bienios), BIENIOS_MAX));

  // Asignación de experiencia (bienios), aplica a todo profesional de la educación.
  const asignacionExperiencia = Math.round(rbmn * pct);

  // Asignación por tramo (art. 49): solo docentes incorporados a Carrera Docente.
  const enCarrera = input.tramo !== 'sin-tramo';
  const tramoExperiencia = enCarrera ? Math.round(rbmn * pct) : 0;
  const tramoProgresion =
    enCarrera && input.tramo !== 'sin-tramo'
      ? Math.round(
          TRAMO_PROGRESION_MAX[input.tramo] * factorJornada * (bienios / BIENIOS_MAX),
        )
      : 0;
  const tramoFijo = enCarrera
    ? Math.round((TRAMO_FIJO_MAX[input.tramo] ?? 0) * factorJornada)
    : 0;
  const asignacionTramo = tramoExperiencia + tramoProgresion + tramoFijo;

  // BRP (art. 54): proporcional a horas con tope de 30. La mención exige título.
  const factorBrp = Math.min(horas, BRP_HORAS_TOPE) / BRP_HORAS_TOPE;
  const brpTitulo = input.brpTitulo ? Math.round(BRP_2026.titulo * factorBrp) : 0;
  const brpMencion =
    input.brpTitulo && input.brpMencion ? Math.round(BRP_2026.mencion * factorBrp) : 0;

  // Asignación por alta concentración de alumnos prioritarios (art. 50).
  let alumnosPrioritarios = 0;
  const escenario =
    input.concentracionPrioritarios === 'avanzada80' && !TRAMOS_ALTOS.includes(input.tramo)
      ? 'urbana60' // el monto fijo adicional exige tramo Avanzado/Experto
      : input.concentracionPrioritarios;
  if (escenario === 'urbana60') {
    alumnosPrioritarios =
      Math.round(asignacionTramo * 0.2) + Math.round(PRIORITARIOS_2026.fijo60 * factorJornada);
  } else if (escenario === 'avanzada80') {
    alumnosPrioritarios =
      Math.round(asignacionTramo * 0.2) + Math.round(PRIORITARIOS_2026.fijo80 * factorJornada);
  } else if (escenario === 'rural45') {
    alumnosPrioritarios = Math.round(asignacionTramo * 0.1);
  }

  const totalHaberes =
    rbmn +
    asignacionExperiencia +
    asignacionTramo +
    brpTitulo +
    brpMencion +
    alumnosPrioritarios;

  // Descuentos legales con la misma lógica del sueldo líquido (AFP, salud,
  // seguro de cesantía e impuesto único de segunda categoría).
  const liquidacion = calculateSueldoLiquido({
    sueldoBruto: totalHaberes,
    afp: input.afp,
    saludTipo: input.saludTipo,
    isapreMonto: input.isapreMonto ?? 0,
    contratoIndefinido: input.contratoIndefinido ?? true,
    valorUF: input.valorUF,
    valorUTM: input.valorUTM,
  });

  return {
    horasAplicadas: horas,
    haberes: {
      rbmn,
      asignacionExperiencia,
      tramoExperiencia,
      tramoProgresion,
      tramoFijo,
      brpTitulo,
      brpMencion,
      alumnosPrioritarios,
    },
    totalHaberes,
    asignacionTramo,
    descuentos: {
      afp: liquidacion.descuentos.afp,
      salud: liquidacion.descuentos.salud,
      seguroCesantia: liquidacion.descuentos.seguroCesantia,
      impuesto: liquidacion.descuentos.impuesto,
    },
    totalDescuentos: liquidacion.totalDescuentos,
    liquido: liquidacion.liquido,
  };
}

export function sueldoDocenteToResults(result: SueldoDocenteResult): CalculatorResult[] {
  const r: CalculatorResult[] = [
    {
      label: 'Sueldo líquido estimado',
      value: result.liquido,
      format: 'CLP',
      highlight: true,
      note: {
        text: 'Estimación con valores legales jun-2026; no reemplaza tu liquidación ni incluye bonos locales, zona, responsabilidad ni asignación familiar.',
      },
    },
    { label: 'Total haberes (sueldo bruto)', value: result.totalHaberes, format: 'CLP' },
    { label: 'Total descuentos', value: result.totalDescuentos, format: 'CLP' },
    { label: 'Sueldo base (RBMN)', value: result.haberes.rbmn, format: 'CLP' },
    {
      label: 'Asignación de experiencia (bienios)',
      value: result.haberes.asignacionExperiencia,
      format: 'CLP',
    },
    {
      label: 'Asignación por tramo',
      value: result.asignacionTramo,
      format: 'CLP',
      note: {
        text: 'Experiencia + progresión + componente fijo, art. 49 Estatuto Docente.',
      },
    },
  ];

  if (result.haberes.brpTitulo > 0 || result.haberes.brpMencion > 0) {
    r.push({
      label: 'BRP (título + mención)',
      value: result.haberes.brpTitulo + result.haberes.brpMencion,
      format: 'CLP',
      note: { text: 'Tope de 30 horas semanales, art. 54 Estatuto Docente.' },
    });
  }
  if (result.haberes.alumnosPrioritarios > 0) {
    r.push({
      label: 'Asignación alumnos prioritarios',
      value: result.haberes.alumnosPrioritarios,
      format: 'CLP',
    });
  }

  r.push(
    { label: 'AFP (10% + comisión)', value: result.descuentos.afp, format: 'CLP' },
    { label: 'Salud (7%)', value: result.descuentos.salud, format: 'CLP' },
    {
      label: 'Seguro cesantía',
      value: result.descuentos.seguroCesantia,
      format: 'CLP',
    },
    { label: 'Impuesto 2ª categoría', value: result.descuentos.impuesto, format: 'CLP' },
  );

  return r;
}
