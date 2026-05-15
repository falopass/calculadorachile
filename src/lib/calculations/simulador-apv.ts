// ============================================
// Simulador de Ahorro Previsional Voluntario (APV) Chile 2026
// ============================================

import { UF, UTM, IMPUESTO_SEGUNDA_CATEGORIA_2026 } from '@/lib/values/constants';
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
 * Tope anual de APV para beneficio tributario en UF (Régimen B).
 * Base legal: Art. 42 bis LIR.
 */
const TOPE_ANUAL_APV_UF = 600;

/**
 * Calcula la simulación de Ahorro Previsional Voluntario (APV).
 *
 * Bug histórico: la versión anterior obtenía la tasa marginal aplicando
 * la tabla `IMPUESTO_SEGUNDA_CATEGORIA` (mensual UTM) sobre la renta
 * anual en UTA. Eso daba tasas marginales subestimadas para sueldos
 * medios-altos.
 *
 * Fix: usar `IMPUESTO_SEGUNDA_CATEGORIA_2026` (en UTA) para obtener la
 * tasa marginal a partir de la renta anual del trabajador.
 *
 * Base legal: Art. 42 bis LIR, DFL 3500/1980.
 */
export function calculateSimuladorAPV(input: SimuladorAPVInput): SimuladorAPVResult {
  const { sueldoBruto, montoMensualAPV, rentabilidadAnual, anosAhorro } = input;

  const sueldo = Math.max(0, sueldoBruto);
  const montoMensual = Math.max(0, montoMensualAPV);
  const rentabilidad = Math.max(0, Math.min(rentabilidadAnual, 100));
  const anos = Math.max(1, Math.min(anosAhorro, 50));

  // Tope anual 600 UF (Régimen B)
  const aporteAnualCLP = montoMensual * 12;
  const topeAnualCLP = TOPE_ANUAL_APV_UF * UF.valor;
  const aportaTopeUF = aporteAnualCLP > topeAnualCLP;

  const totalMeses = anos * 12;
  const totalAportado = montoMensual * totalMeses;

  // Valor futuro de una anualidad: VF = C * [((1 + r)^n - 1) / r]
  let ahorroAcumulado: number;
  if (rentabilidad === 0) {
    ahorroAcumulado = totalAportado;
  } else {
    const tasaMensual = rentabilidad / 100 / 12;
    ahorroAcumulado =
      montoMensual * ((Math.pow(1 + tasaMensual, totalMeses) - 1) / tasaMensual);
  }

  const rendimientoGanado = ahorroAcumulado - totalAportado;

  // Tasa marginal del Impuesto de Segunda Categoría usando tabla UTA.
  const rentaAnual = sueldo * 12;
  const valorUTA = UTM.valor * 12;
  const rentaUTA = valorUTA > 0 ? rentaAnual / valorUTA : 0;

  let tasaMarginal = 0;
  for (const tramo of IMPUESTO_SEGUNDA_CATEGORIA_2026.tramos) {
    if (
      rentaUTA > tramo.limiteInferiorUTA &&
      rentaUTA <= tramo.limiteSuperiorUTA
    ) {
      tasaMarginal = tramo.tasa * 100; // tramo.tasa viene como decimal (0.04 → 4%)
      break;
    }
  }

  // Beneficio tributario anual: aporte deducible × tasa marginal.
  const aporteDeducibleAnual = Math.min(aporteAnualCLP, topeAnualCLP);
  const beneficioTributarioAnual = Math.round(
    aporteDeducibleAnual * (tasaMarginal / 100),
  );
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
