// ============================================
// Cálculo de Boleta de Honorarios Chile
// ============================================

import { BOLETA_HONORARIOS, UTM } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface BoletaHonorariosInput {
  montoBruto: number;
  retencionAutomatica?: boolean;
}

export interface BoletaHonorariosResult {
  montoBruto: number;
  retencion: number;
  montoLiquido: number;
  exento: boolean;
}

/**
 * Calcula la retención de boleta de honorarios
 */
export function calculateBoletaHonorarios(input: BoletaHonorariosInput): BoletaHonorariosResult {
  const { montoBruto, retencionAutomatica = true } = input;
  
  // Verificar si está exento (hasta 10 UTM mensuales)
  const limiteExento = BOLETA_HONORARIOS.exento_minimo * UTM.valor;
  const exento = montoBruto <= limiteExento;
  
  // Calcular retención
  let retencion = 0;
  if (retencionAutomatica && !exento) {
    retencion = montoBruto * (BOLETA_HONORARIOS.tasa_total / 100);
  }
  
  // Monto líquido
  const montoLiquido = montoBruto - retencion;
  
  return {
    montoBruto,
    retencion: Math.round(retencion),
    montoLiquido: Math.round(montoLiquido),
    exento,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function boletaHonorariosToResults(result: BoletaHonorariosResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];
  
  results.push({
    label: 'Monto Líquido',
    value: result.montoLiquido,
    format: 'CLP',
    highlight: true,
  });
  
  results.push({
    label: 'Monto Bruto',
    value: result.montoBruto,
    format: 'CLP',
  });
  
  if (result.exento) {
    results.push({
      label: 'Retención',
      value: 0,
      format: 'CLP',
    });
  } else {
    results.push({
      label: `Retención (${BOLETA_HONORARIOS.tasa_total}%)`,
      value: result.retencion,
      format: 'CLP',
    });
  }
  
  return results;
}
