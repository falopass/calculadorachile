// ============================================
// Horas extraordinarias de trabajadores con sueldo mensual
// ============================================

import {
  AFP_OBLIGATORIA_PCT,
  HORAS_EXTRA,
  JORNADA_LEGAL,
  SALUD,
  SEGURO_CESANTIA,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface HorasExtraInput {
  sueldoBruto: number;
  horasExtra: number;
  jornadaSemanal?: 40 | 42 | 44 | 45;
  /** Un pacto puede mejorar el 50%; valores inferiores se elevan al mínimo legal. */
  recargoPersonalizado?: number;
  sueldoVariable?: boolean;
  sueldoPromedio3Meses?: number;
  calcularImpactoCotizaciones?: boolean;
  mostrarTopeLegal?: boolean;
}

export interface HorasExtraResult {
  sueldoBaseCalculo: number;
  horasExtra: number;
  valorHoraNormal: number;
  valorHoraExtra: number;
  recargo: number;
  totalHorasExtra: number;
  totalAPagar: number;
  impactoCotizaciones?: {
    afp: number;
    salud: number;
    seguroCesantia: number;
    total: number;
  };
  topeLegalDiario?: number;
  jornadaSemanal: number;
}

/**
 * Fórmula DT para sueldo mensual:
 *
 * valor hora ordinaria = (sueldo / 30 × 28) / (jornada semanal × 4)
 * valor hora extra = valor hora ordinaria × 1,5
 *
 * No aplica un recargo automático distinto por domingo, festivo o noche. Un
 * contrato o convenio puede pactar un porcentaje superior al mínimo de 50%.
 */
export function calculateHorasExtra(input: HorasExtraInput): HorasExtraResult {
  const jornadaSemanal = input.jornadaSemanal ?? (JORNADA_LEGAL.actual as 42);
  const sueldoBaseCalculo = Math.max(
    0,
    input.sueldoVariable && (input.sueldoPromedio3Meses ?? 0) > 0
      ? input.sueldoPromedio3Meses ?? 0
      : input.sueldoBruto,
  );
  const horasExtra = Math.max(0, input.horasExtra);
  const valorHoraNormalExacto =
    jornadaSemanal > 0
      ? ((sueldoBaseCalculo / 30) * 28) / (jornadaSemanal * 4)
      : 0;
  const recargo = Math.max(
    HORAS_EXTRA.recargo_normal,
    input.recargoPersonalizado ?? HORAS_EXTRA.recargo_normal,
  );
  const valorHoraExtraExacto = valorHoraNormalExacto * (1 + recargo / 100);
  const totalHorasExtra = valorHoraExtraExacto * horasExtra;

  let impactoCotizaciones: HorasExtraResult['impactoCotizaciones'];
  if (input.calcularImpactoCotizaciones) {
    const afp = totalHorasExtra * (AFP_OBLIGATORIA_PCT / 100);
    const salud = totalHorasExtra * (SALUD.fonasa.tasa / 100);
    const seguroCesantia =
      totalHorasExtra * (SEGURO_CESANTIA.contrato_indefinido.trabajador / 100);
    impactoCotizaciones = { afp, salud, seguroCesantia, total: afp + salud + seguroCesantia };
  }

  return {
    sueldoBaseCalculo: Math.round(sueldoBaseCalculo),
    horasExtra,
    valorHoraNormal: Math.round(valorHoraNormalExacto),
    valorHoraExtra: Math.round(valorHoraExtraExacto),
    recargo,
    totalHorasExtra: Math.round(totalHorasExtra),
    totalAPagar: Math.round(sueldoBaseCalculo + totalHorasExtra),
    impactoCotizaciones,
    topeLegalDiario: input.mostrarTopeLegal ? HORAS_EXTRA.tope_diario : undefined,
    jornadaSemanal,
  };
}

export function horasExtraToResults(result: HorasExtraResult): CalculatorResult[] {
  const results: CalculatorResult[] = [
    { label: 'Total sueldo más horas extra', value: result.totalAPagar, format: 'CLP', highlight: true },
    { label: `Pago por ${result.horasExtra} horas extra`, value: result.totalHorasExtra, format: 'CLP' },
    { label: 'Base mensual usada', value: result.sueldoBaseCalculo, format: 'CLP' },
    { label: 'Valor hora ordinaria', value: result.valorHoraNormal, format: 'CLP' },
    { label: `Valor hora extra (+${result.recargo}%)`, value: result.valorHoraExtra, format: 'CLP' },
    { label: 'Jornada semanal', value: result.jornadaSemanal, format: 'number' },
  ];

  if (result.impactoCotizaciones) {
    results.push({
      label: 'Descuentos previsionales estimados sobre horas extra',
      value: result.impactoCotizaciones.total,
      format: 'CLP',
    });
  }
  if (result.topeLegalDiario !== undefined) {
    results.push({ label: 'Máximo legal por día', value: result.topeLegalDiario, format: 'number' });
  }
  return results;
}
