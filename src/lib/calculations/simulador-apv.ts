// ============================================
// Simulador de Ahorro Previsional Voluntario (APV) Chile 2026
// ============================================

import { UF, UTM, IMPUESTO_SEGUNDA_CATEGORIA } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface SimuladorAPVInput {
  sueldoBruto: number;
  montoMensualAPV: number;
  rentabilidadAnual: number;
  anosAhorro: number;
}

export interface SimuladorAPVResult {
  sueldoBruto: number;
  montoMensualAPV: number;
  rentabilidadAnual: number;
  anosAhorro: number;
  totalAportado: number;
  rendimientoGanado: number;
  ahorroAcumulado: number;
  beneficioTributarioAnual: number;
  totalBeneficioTributario: number;
  tasaMarginal: number;
  aportaTopeUF: boolean;
}

/**
 * Tope anual de APV para beneficio tributario en UF
 * Base legal: Art. 42 bis LIR
 */
const TOPE_ANUAL_APV_UF = 600;

/**
 * Calcula la simulación de Ahorro Previsional Voluntario (APV)
 *
 * El APV permite ahorrar voluntariamente para la pensión con beneficios
 * tributarios. Los aportes reducen la base tributable hasta 600 UF anuales.
 * El ahorro acumulado se calcula con interés compuesto usando la fórmula
 * de valor futuro de una anualidad: VF = C * [((1+r)^n - 1) / r]
 * donde C es el depósito mensual, r es la tasa mensual y n es el total de meses.
 *
 * Base legal: Art. 42 bis LIR, DFL 3500/1980
 *
 * @param input - Datos para la simulación de APV
 * @returns Desglose completo de la simulación APV
 */
export function calculateSimuladorAPV(input: SimuladorAPVInput): SimuladorAPVResult {
  const {
    sueldoBruto,
    montoMensualAPV,
    rentabilidadAnual,
    anosAhorro,
  } = input;

  // Validar rangos
  const sueldo = Math.max(0, sueldoBruto);
  const montoMensual = Math.max(0, montoMensualAPV);
  const rentabilidad = Math.max(0, Math.min(rentabilidadAnual, 100));
  const anos = Math.max(1, Math.min(anosAhorro, 50));

  // Verificar si el aporte anual supera el tope de 600 UF
  const aporteAnualCLP = montoMensual * 12;
  const topeAnualCLP = TOPE_ANUAL_APV_UF * UF.valor;
  const aportaTopeUF = aporteAnualCLP > topeAnualCLP;

  // Total aportado en el período
  const totalMeses = anos * 12;
  const totalAportado = montoMensual * totalMeses;

  // Calcular ahorro acumulado con interés compuesto
  // VF = C * [((1 + r)^n - 1) / r]
  let ahorroAcumulado: number;
  if (rentabilidad === 0) {
    // Sin rentabilidad, el acumulado es simplemente la suma de aportes
    ahorroAcumulado = totalAportado;
  } else {
    const tasaMensual = rentabilidad / 100 / 12;
    ahorroAcumulado = montoMensual * ((Math.pow(1 + tasaMensual, totalMeses) - 1) / tasaMensual);
  }

  // Rendimiento ganado
  const rendimientoGanado = ahorroAcumulado - totalAportado;

  // Calcular tasa marginal del impuesto de segunda categoría
  const rentaAnual = sueldo * 12;
  const valorUTA = UTM.valor * 12;
  const rentaUTA = rentaAnual / valorUTA;

  let tasaMarginal = 0;
  for (const tramo of IMPUESTO_SEGUNDA_CATEGORIA.tramos) {
    if (rentaUTA > tramo.desde && rentaUTA <= tramo.hasta) {
      tasaMarginal = tramo.factor * 100;
      break;
    }
  }

  // Beneficio tributario anual: aporte mensual * tasa marginal * 12
  const aporteDeducibleAnual = Math.min(aporteAnualCLP, topeAnualCLP);
  const beneficioTributarioAnual = Math.round(aporteDeducibleAnual * (tasaMarginal / 100));

  // Total beneficio tributario en todo el período
  const totalBeneficioTributario = beneficioTributarioAnual * anos;

  return {
    sueldoBruto: Math.round(sueldo),
    montoMensualAPV: Math.round(montoMensual),
    rentabilidadAnual: Math.round(rentabilidad * 100) / 100,
    anosAhorro: anos,
    totalAportado: Math.round(totalAportado),
    rendimientoGanado: Math.round(rendimientoGanado),
    ahorroAcumulado: Math.round(ahorroAcumulado),
    beneficioTributarioAnual,
    totalBeneficioTributario,
    tasaMarginal: Math.round(tasaMarginal * 100) / 100,
    aportaTopeUF,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function simuladorAPVToResults(result: SimuladorAPVResult): CalculatorResult[] {
  return [
    {
      label: 'Ahorro Acumulado',
      value: result.ahorroAcumulado,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Total Aportado',
      value: result.totalAportado,
      format: 'CLP',
    },
    {
      label: 'Rendimiento Ganado',
      value: result.rendimientoGanado,
      format: 'CLP',
    },
    {
      label: 'Beneficio Tributario Anual',
      value: result.beneficioTributarioAnual,
      format: 'CLP',
    },
    {
      label: `Beneficio Tributario Total (${result.anosAhorro} años)`,
      value: result.totalBeneficioTributario,
      format: 'CLP',
    },
    {
      label: 'Tasa Marginal',
      value: result.tasaMarginal,
      format: 'percentage',
    },
    {
      label: 'Aporte Mensual APV',
      value: result.montoMensualAPV,
      format: 'CLP',
    },
    {
      label: 'Rentabilidad Anual',
      value: result.rentabilidadAnual,
      format: 'percentage',
    },
  ];
}
