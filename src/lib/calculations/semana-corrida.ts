// ============================================
// Semana corrida — Código del Trabajo, art. 45
// ============================================
// Fórmula verificada (Dirección del Trabajo):
//   semana corrida = (remuneración variable devengada en la semana
//     ÷ días que legalmente debió trabajar esa semana)
//     × (domingos + festivos de la semana)
//
// Con sueldo mensual más remuneración variable, el promedio se calcula
// solo con la parte variable devengada día a día (comisiones, trato).
// Se excluyen los pagos accesorios o extraordinarios (gratificaciones,
// aguinaldos, bonificaciones extraordinarias).
//
// Fuentes:
// - DT, consulta sobre semana corrida (últ. modificación 07-10-2021):
//   https://www.dt.gob.cl/portal/1628/w3-article-60203.html
// - Código del Trabajo, art. 45:
//   https://www.bcn.cl/leychile/navegar?idNorma=207436
// - Remuneraciones que se consideran:
//   https://dt.gob.cl/portal/1628/w3-article-95845.html
// ============================================

import type { CalculatorResult } from '@/types/calculator';
import { FERIADOS_NACIONALES_CALCULO } from '@/lib/feriados';

export const DT_SEMANA_CORRIDA_URL = 'https://www.dt.gob.cl/portal/1628/w3-article-60203.html';

export interface SemanaCorridaInput {
  /** Remuneración variable ganada en la semana en CLP (comisiones, trato). ≥ 0. */
  remuneracionVariableSemanal: number;
  /** Días que legalmente debió trabajar esa semana (1 a 6). Default: 5. */
  diasDebioTrabajar?: number;
  /** Domingos + festivos de la semana. Default: 1. ≥ 0. */
  domingosYFestivos?: number;
  /**
   * Opcional, 1 a 5. Si es > 1 estima el total del mes multiplicando
   * por semanas iguales a la ingresada.
   */
  semanasMes?: number;
  /**
   * Opcional. Solo informativo: se suma al total semanal estimado
   * (sueldo base + variable + semana corrida). No entra al promedio.
   */
  sueldoBaseSemanalOpcional?: number;
}

export interface SemanaCorridaResult {
  remuneracionVariableSemanal: number;
  diasDebioTrabajar: number;
  domingosYFestivos: number;
  /** Variable semanal ÷ días que debió trabajar (redondeado al peso). */
  promedioDiario: number;
  /** promedioDiario × (domingos + festivos), redondeado al peso. */
  semanaCorrida: number;
  /** Variable semanal + semana corrida. */
  totalVariableConCorrida: number;
  sueldoBaseSemanal: number;
  /** Sueldo base + variable + semana corrida. */
  totalSemanalEstimado: number;
  semanasMes: number;
  /** Variable semanal × semanasMes. */
  variableMensualEstimada: number;
  /** Semana corrida × semanasMes. */
  semanaCorridaMensualEstimada: number;
  /** (Variable + semana corrida) × semanasMes. */
  totalVariableMensualEstimado: number;
}

/**
 * Cuenta los feriados nacionales entre `fechaLunesIso` ('YYYY-MM-DD') y
 * los 6 días siguientes, saltando los domingos para no duplicarlos
 * (el domingo ya se cuenta en `domingosYFestivos`). Fecha inválida → 0.
 */
export function contarFestivosSemana(fechaLunesIso?: string): number {
  if (!fechaLunesIso || !/^\d{4}-\d{2}-\d{2}$/.test(fechaLunesIso)) return 0;
  const inicio = new Date(`${fechaLunesIso}T00:00:00Z`);
  if (Number.isNaN(inicio.getTime())) return 0;

  let count = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(inicio.getTime() + i * 86_400_000);
    if (d.getUTCDay() === 0) continue;
    if (FERIADOS_NACIONALES_CALCULO.has(d.toISOString().slice(0, 10))) count += 1;
  }
  return count;
}

/**
 * Calcula la semana corrida del art. 45 del Código del Trabajo:
 * por cada domingo y festivo de la semana se paga el promedio diario
 * de la remuneración variable devengada esa semana.
 */
export function calculateSemanaCorrida(input: SemanaCorridaInput): SemanaCorridaResult {
  const variable = input.remuneracionVariableSemanal;
  const dias = input.diasDebioTrabajar ?? 5;
  const domingosYFestivos = input.domingosYFestivos ?? 1;
  const semanasMes = input.semanasMes ?? 1;
  const sueldoBase = Math.max(0, input.sueldoBaseSemanalOpcional ?? 0);

  if (!Number.isFinite(variable) || variable < 0) {
    throw new Error('La remuneración variable semanal no puede ser negativa.');
  }
  if (!Number.isFinite(dias) || dias < 1 || dias > 6) {
    throw new Error('Los días que debió trabajar en la semana deben estar entre 1 y 6.');
  }
  if (!Number.isFinite(domingosYFestivos) || domingosYFestivos < 0) {
    throw new Error('Los domingos y festivos de la semana no pueden ser negativos.');
  }
  if (!Number.isFinite(semanasMes) || semanasMes < 1 || semanasMes > 5) {
    throw new Error('Las semanas del mes deben estar entre 1 y 5.');
  }

  const promedioDiario = variable / dias;
  const semanaCorrida = Math.round(promedioDiario * domingosYFestivos);
  const totalVariableConCorrida = Math.round(variable) + semanaCorrida;

  return {
    remuneracionVariableSemanal: Math.round(variable),
    diasDebioTrabajar: dias,
    domingosYFestivos,
    promedioDiario: Math.round(promedioDiario),
    semanaCorrida,
    totalVariableConCorrida,
    sueldoBaseSemanal: Math.round(sueldoBase),
    totalSemanalEstimado: Math.round(sueldoBase) + totalVariableConCorrida,
    semanasMes,
    variableMensualEstimada: Math.round(variable * semanasMes),
    semanaCorridaMensualEstimada: semanaCorrida * semanasMes,
    totalVariableMensualEstimado: totalVariableConCorrida * semanasMes,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function semanaCorridaToResults(result: SemanaCorridaResult): CalculatorResult[] {
  const rows: CalculatorResult[] = [
    {
      label: 'Semana corrida',
      value: result.semanaCorrida,
      format: 'CLP',
      highlight: true,
      note: {
        text: 'Por cada domingo y festivo de la semana se paga el promedio diario de lo que ganaste en comisiones o trato (parte variable). Se excluyen gratificaciones, aguinaldos y otros pagos accesorios o extraordinarios.',
        source: { name: 'Dirección del Trabajo — semana corrida (art. 45)', url: DT_SEMANA_CORRIDA_URL },
      },
    },
    { label: 'Promedio diario (parte variable)', value: result.promedioDiario, format: 'CLP' },
    { label: 'Variable + semana corrida', value: result.totalVariableConCorrida, format: 'CLP' },
  ];

  if (result.sueldoBaseSemanal > 0) {
    rows.push({ label: 'Sueldo base semanal', value: result.sueldoBaseSemanal, format: 'CLP' });
    rows.push({ label: 'Total semanal estimado', value: result.totalSemanalEstimado, format: 'CLP' });
  }

  if (result.semanasMes > 1) {
    rows.push({
      label: `Semana corrida estimada en ${result.semanasMes} semanas`,
      value: result.semanaCorridaMensualEstimada,
      format: 'CLP',
    });
    rows.push({
      label: 'Variable + semana corrida estimada en el mes',
      value: result.totalVariableMensualEstimado,
      format: 'CLP',
    });
  }

  return rows;
}
