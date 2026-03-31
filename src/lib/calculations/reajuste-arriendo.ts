// ============================================
// Cálculo de Reajuste de Arriendo por UF/IPC Chile 2026
// ============================================

import { UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface ReajusteArriendoInput {
  arriendoActual: number;
  arriendoEnUF: boolean;
  variacionIPC: number; // Porcentaje de variación IPC anual
  mesesDesdeUltimoReajuste: number;
}

export interface ReajusteArriendoResult {
  arriendoActual: number;
  arriendoActualUF: number;
  variacionIPC: number;
  mesesDesdeUltimoReajuste: number;
  factorReajuste: number;
  nuevoArriendoCLP: number;
  nuevoArriendoUF: number;
  incrementoMensual: number;
  incrementoPorcentual: number;
  valorUF: number;
}

/**
 * Calcula el reajuste de arriendo según IPC o variación de UF
 * 
 * En Chile, los contratos de arriendo generalmente se reajustan anualmente
 * según la variación del IPC o se expresan en UF para mantener el valor real.
 * 
 * Base legal: Ley 18.101 (Arrendamiento de Predios Urbanos)
 * 
 * @param input - Datos para el cálculo del reajuste
 * @returns Desglose completo del reajuste
 */
export function calculateReajusteArriendo(input: ReajusteArriendoInput): ReajusteArriendoResult {
  const { arriendoActual, arriendoEnUF, variacionIPC, mesesDesdeUltimoReajuste } = input;
  
  const valorUF = UF.valor;
  
  // Convertir a CLP si está en UF
  const arriendoActualCLP = arriendoEnUF ? arriendoActual * valorUF : arriendoActual;
  const arriendoActualUF = arriendoEnUF ? arriendoActual : arriendoActual / valorUF;
  
  // Factor de reajuste basado en IPC
  const factorReajuste = 1 + (variacionIPC / 100);
  
  // Calcular nuevo arriendo
  const nuevoArriendoCLP = arriendoActualCLP * factorReajuste;
  const nuevoArriendoUF = nuevoArriendoCLP / valorUF;
  
  // Incremento
  const incrementoMensual = nuevoArriendoCLP - arriendoActualCLP;
  const incrementoPorcentual = ((nuevoArriendoCLP / arriendoActualCLP) - 1) * 100;
  
  return {
    arriendoActual: Math.round(arriendoActualCLP),
    arriendoActualUF: Math.round(arriendoActualUF * 100) / 100,
    variacionIPC,
    mesesDesdeUltimoReajuste,
    factorReajuste,
    nuevoArriendoCLP: Math.round(nuevoArriendoCLP),
    nuevoArriendoUF: Math.round(nuevoArriendoUF * 100) / 100,
    incrementoMensual: Math.round(incrementoMensual),
    incrementoPorcentual: Math.round(incrementoPorcentual * 100) / 100,
    valorUF,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function reajusteArriendoToResults(result: ReajusteArriendoResult): CalculatorResult[] {
  return [
    {
      label: 'Nuevo Arriendo',
      value: result.nuevoArriendoCLP,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Nuevo Arriendo (UF)',
      value: result.nuevoArriendoUF,
      format: 'UF',
      highlight: true,
    },
    {
      label: 'Incremento Mensual',
      value: result.incrementoMensual,
      format: 'CLP',
    },
    {
      label: 'Incremento Porcentual',
      value: result.incrementoPorcentual,
      format: 'percentage',
    },
    {
      label: 'Arriendo Actual',
      value: result.arriendoActual,
      format: 'CLP',
    },
    {
      label: 'Variación IPC',
      value: result.variacionIPC,
      format: 'percentage',
    },
    {
      label: 'Valor UF',
      value: result.valorUF,
      format: 'CLP',
    },
  ];
}
