// ============================================
// Cálculo de Multas de Tránsito en UTM Chile 2026
// ============================================

import { UTM } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type TipoMulta = 'leve' | 'menos_grave' | 'grave' | 'gravisima';

export interface MultasTransitoInput {
  tipoMulta: TipoMulta;
  cantidadMultas?: number;
}

export interface MultasTransitoResult {
  tipoMulta: TipoMulta;
  montoUTM: number;
  montoCLP: number;
  cantidadMultas: number;
  totalCLP: number;
}

/**
 * Montos de multas de tránsito expresados en UTM
 *
 * Los montos se expresan en UTM según la gravedad de la infracción.
 * Se utilizan los valores intermedios del rango establecido por la ley.
 *
 * Base legal: Ley 18.290 (Ley de Tránsito), Art. 196 y siguientes.
 *             Las infracciones gravísimas pueden llegar hasta 5 UTM.
 */
const MONTOS_MULTAS: Record<TipoMulta, number> = {
  leve: 0.5,       // 0,5 UTM
  menos_grave: 1,  // 1 UTM
  grave: 2,        // 1,5 a 3 UTM (usamos punto medio: 2)
  gravisima: 4,    // 3 a 5 UTM (usamos punto medio: 4)
} as const;

/**
 * Calcula el monto de multas de tránsito en CLP
 *
 * Convierte el monto de la multa desde UTM a CLP según el tipo de
 * infracción y la cantidad de multas acumuladas.
 *
 * @param input - Datos de la multa (tipo y cantidad)
 * @returns Desglose del monto de la multa en CLP
 */
export function calculateMultasTransito(input: MultasTransitoInput): MultasTransitoResult {
  const { tipoMulta, cantidadMultas = 1 } = input;

  // Validar cantidad
  const cantidadValida = Math.max(1, Math.round(cantidadMultas));

  // Monto en UTM según tipo de multa
  const montoUTM = MONTOS_MULTAS[tipoMulta];

  // Convertir a CLP usando valor UTM vigente
  const montoCLP = montoUTM * UTM.valor;

  // Total por todas las multas
  const totalCLP = montoCLP * cantidadValida;

  return {
    tipoMulta,
    montoUTM,
    montoCLP: Math.round(montoCLP),
    cantidadMultas: cantidadValida,
    totalCLP: Math.round(totalCLP),
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function multasTransitoToResults(result: MultasTransitoResult): CalculatorResult[] {
  return [
    {
      label: 'Total Multas',
      value: result.totalCLP,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Monto por Multa',
      value: result.montoCLP,
      format: 'CLP',
    },
    {
      label: 'Monto en UTM',
      value: result.montoUTM,
      format: 'UTM',
    },
    {
      label: 'Tipo de Multa',
      value: result.tipoMulta === 'leve' ? 1
        : result.tipoMulta === 'menos_grave' ? 2
        : result.tipoMulta === 'grave' ? 3
        : 4,
      format: 'number',
    },
    {
      label: 'Cantidad de Multas',
      value: result.cantidadMultas,
      format: 'number',
    },
  ];
}
