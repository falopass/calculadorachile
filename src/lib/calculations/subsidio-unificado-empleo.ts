// ============================================
// Cálculo de Subsidio Unificado de Empleo (SUE) — Ley 21.808
// Vigente desde el 01-10-2026
// ============================================

import { SUBSIDIO_UNIFICADO_EMPLEO } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type GrupoPrioritarioSUE =
  | 'joven-18-24'
  | 'mujer-25-54'
  | 'mayor-55'
  | 'discapacidad'
  | 'ninguno';

export type TipoVinculoSUE =
  | 'dependiente'
  | 'independiente'
  | 'sector-publico'
  | 'pensionado';

export interface SubsidioUnificadoEmpleoInput {
  /** Renta bruta mensual pactada (CLP). */
  rentaBruta: number;
  /** Tipo de vínculo laboral de la persona trabajadora. */
  tipoVinculo: TipoVinculoSUE;
  /** Grupo prioritario de la persona trabajadora. */
  grupoPrioritario: GrupoPrioritarioSUE;
  /**
   * 6 meses de desempleo continuos u 8 discontinuos en los 18 meses
   * anteriores a la postulación.
   */
  desempleoPrevio: boolean;
  /** Hogar dentro del 40% más vulnerable según RSH (no aplica a PcD). */
  rsh40: boolean;
}

export interface SubsidioUnificadoEmpleoResult {
  rentaBruta: number;
  grupoPrioritario: GrupoPrioritarioSUE;
  cumpleRequisitos: boolean;
  /** Aporte mensual del Estado a la persona trabajadora. */
  aporteTrabajador: number;
  /** Aporte mensual del Estado a la empresa (informativo). */
  aporteEmpresa: number;
  /** Pago provisional mensual al trabajador (90%; se reliquida anualmente). */
  pagoProvisionalMensual: number;
  duracionMeses: number;
  totalEstimadoTrabajador: number;
  motivosNoAplica: string[];
  baseCalculo: string;
}

const SUE = SUBSIDIO_UNIFICADO_EMPLEO;

/**
 * Estima el aporte mensual del Subsidio Unificado de Empleo
 * (Ley 21.808, primer año: PV 10% trabajador / 20% empresa).
 *
 * Tramos sobre el IMM del subsidio ($529.000):
 *  - RB ≤ 1,25 IMM: trabajador PV × min(RB, IMM); empresa PV × RB.
 *  - 1,25 IMM < RB ≤ 2,25 IMM: fórmulas decrecientes de los arts.
 *    18 y 10; el aporte del trabajador tiene piso de 2,5% del IMM.
 *  - RB > 2,25 IMM: sin subsidio ese mes.
 */
export function calculateSubsidioUnificadoEmpleo(
  input: SubsidioUnificadoEmpleoInput,
): SubsidioUnificadoEmpleoResult {
  const rb = Math.max(0, input.rentaBruta ?? 0);
  const grupo = input.grupoPrioritario;
  const esPcD = grupo === 'discapacidad';

  const imm = SUE.immSubsidioCLP;
  const tramoA = imm * SUE.tramoA_IMM; // 661.250
  const tope = imm * SUE.tope_IMM; // 1.190.250
  const pisoTrabajador = Math.round(
    (SUE.pisoTrabajadorPctIMM / 100) * imm,
  ); // 13.225

  const motivosNoAplica: string[] = [];
  // Requisitos personales: si fallan, el subsidio no existe para ese caso.
  const motivosElegibilidad: string[] = [];
  if (input.tipoVinculo === 'sector-publico') {
    motivosElegibilidad.push(
      'El subsidio beneficia solo a personas trabajadoras y empresas del sector privado (Ley 21.808, art. 1).',
    );
  } else if (input.tipoVinculo === 'pensionado') {
    motivosElegibilidad.push(
      'Las personas mayores de 65 años pensionadas por vejez no pueden acceder al subsidio (Ley 21.808).',
    );
  } else if (input.tipoVinculo === 'independiente') {
    motivosElegibilidad.push(
      'Las personas trabajadoras independientes reciben el subsidio en un solo pago anual en agosto, no en pagos mensuales; esta calculadora estima solo el caso dependiente (Ley 21.808, art. 20).',
    );
  }
  if (grupo === 'ninguno') {
    motivosElegibilidad.push(
      'El subsidio exige pertenecer a un grupo prioritario (jóvenes 18–24, mujeres 25–54, personas desde 55 o personas con discapacidad inscritas en el RND).',
    );
  }
  if (input.desempleoPrevio !== true) {
    motivosElegibilidad.push(
      'Se requiere 6 meses de desempleo continuos u 8 discontinuos en los 18 meses anteriores a la postulación.',
    );
  }
  if (!esPcD && input.rsh40 !== true) {
    motivosElegibilidad.push(
      'El primer año exige que el hogar esté dentro del 40% más vulnerable según RSH (no aplica a personas con discapacidad).',
    );
  }
  motivosNoAplica.push(...motivosElegibilidad);
  if (rb <= 0) {
    motivosNoAplica.push('Ingrese la renta bruta mensual pactada.');
  } else if (rb > tope) {
    motivosNoAplica.push(
      `La renta bruta supera 2,25 IMM del subsidio ($${tope.toLocaleString('es-CL')}): no hay aporte ese mes.`,
    );
  }

  // Sin requisitos no hay subsidio: los aportes quedan en 0 y el
  // motivo se expone en baseCalculo y en la nota del resultado.
  const elegible = motivosNoAplica.length === 0;
  let aporteTrabajador = 0;
  let aporteEmpresa = 0;
  if (elegible && rb > 0 && rb <= tope) {
    if (rb <= tramoA) {
      aporteTrabajador = (SUE.pvTrabajador / 100) * Math.min(rb, imm);
      aporteEmpresa = (SUE.pvEmpresa / 100) * rb;
    } else {
      aporteTrabajador =
        (SUE.pvTrabajador / 100) * imm -
        (SUE.pvTrabajador / 100) * (rb - tramoA);
      aporteEmpresa =
        (SUE.pvEmpresa / 100) * tramoA -
        ((SUE.pvEmpresa / 100) * SUE.tramoA_IMM) * (rb - tramoA);
    }
    // Piso legal: el aporte del trabajador nunca es inferior a 2,5% del IMM.
    aporteTrabajador = Math.max(aporteTrabajador, pisoTrabajador);
    aporteTrabajador = Math.round(aporteTrabajador);
    aporteEmpresa = Math.max(0, Math.round(aporteEmpresa));
  }

  const cumpleRequisitos =
    motivosNoAplica.length === 0 && aporteTrabajador > 0;

  // Un mes sobre el tope no se paga pero sí cuenta para la duración;
  // solo los requisitos personales o la falta de renta la anulan.
  const duracionMeses =
    motivosElegibilidad.length === 0 && rb > 0
      ? esPcD
        ? SUE.duracionMesesPcD
        : SUE.duracionMeses
      : 0;
  const pagoProvisionalMensual = cumpleRequisitos
    ? Math.round(aporteTrabajador * 0.9)
    : 0;
  const totalEstimadoTrabajador = cumpleRequisitos
    ? aporteTrabajador * duracionMeses
    : 0;

  const baseCalculo = cumpleRequisitos
    ? `Primer año (PV ${SUE.pvTrabajador}% trabajador / ${SUE.pvEmpresa}% empresa) sobre renta bruta $${rb.toLocaleString('es-CL')}, con IMM del subsidio $${imm.toLocaleString('es-CL')} y piso de $${pisoTrabajador.toLocaleString('es-CL')}. Parámetros fijados por el Decreto 273 exento de Hacienda (DO 01-10-2026).`
    : motivosNoAplica.join(' ');

  return {
    rentaBruta: Math.round(rb),
    grupoPrioritario: grupo,
    cumpleRequisitos,
    aporteTrabajador,
    aporteEmpresa,
    pagoProvisionalMensual,
    duracionMeses,
    totalEstimadoTrabajador,
    motivosNoAplica,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function subsidioUnificadoEmpleoToResults(
  result: SubsidioUnificadoEmpleoResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Aporte mensual trabajador',
      value: result.aporteTrabajador,
      format: 'CLP',
      highlight: true,
      ...(result.motivosNoAplica.length > 0
        ? {
            note: {
              text: `No califica: ${result.motivosNoAplica.join(' ')}`,
              source: {
                name: 'Ley 21.808 — Biblioteca del Congreso Nacional',
                url: 'https://www.bcn.cl/leychile/navegar?idNorma=1222281',
              },
            },
          }
        : {}),
    },
    {
      label: 'Pago provisional mensual (90%, reliquida anual)',
      value: result.pagoProvisionalMensual,
      format: 'CLP',
    },
    {
      label: 'Aporte mensual a la empresa (informativo)',
      value: result.aporteEmpresa,
      format: 'CLP',
    },
    {
      label: 'Meses de duración',
      value: result.duracionMeses,
      format: 'number',
    },
    {
      label: 'Total estimado trabajador',
      value: result.totalEstimadoTrabajador,
      format: 'CLP',
    },
  ];

  return results;
}
