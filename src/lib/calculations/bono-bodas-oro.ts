// ============================================
// Cálculo de Bono Bodas de Oro Chile 2026
// Beneficio por 20+ años de cotizaciones previsionales
// ============================================

import { BONO_BODAS_ORO } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface BonoBodasOroInput {
  anosTrabajados: number;
  esPublico: boolean;
  sueldoBruto: number;
}

export interface BonoBodasOroResult {
  anosTrabajados: number;
  aplica: boolean;
  montoBono: number;
  baseCalculo: string;
  tipo: string;
}

/**
 * Calcula el Bono Bodas de Oro según años trabajados y sector.
 * El monto del bono se basa en los valores definidos en las constantes.
 * Ley 21.674 y normativa vigente.
 */
export function calculateBonoBodasOro(input: BonoBodasOroInput): BonoBodasOroResult {
  const { anosTrabajados, esPublico, sueldoBruto } = input;

  // Validar rangos
  const anos = Math.max(0, Math.round(anosTrabajados));
  const sueldo = Math.max(0, sueldoBruto);

  // Requisito mínimo: 20 años
  const aplica = anos >= 20;

  if (!aplica) {
    return {
      anosTrabajados: anos,
      aplica: false,
      montoBono: 0,
      baseCalculo: 'No aplica (requiere mínimo 20 años)',
      tipo: esPublico ? 'Sector Público' : 'Sector Privado',
    };
  }

  let montoBono: number;
  let baseCalculo: string;

  if (esPublico) {
    // Sector público: 1 remuneración por cada año después de 20 años
    const anosExcedentes = anos - 20;
    montoBono = Math.round(sueldo * anosExcedentes);
    baseCalculo = `${anosExcedentes} remuneraciones (1 por año sobre 20 años)`;
  } else {
    // Sector privado: usar el monto fijo definido en las constantes
    // Nota: El bono bodas de oro en el sector privado no es automático y depende de convenios colectivos
    // Por simplicidad, usaremos el monto fijo como referencia
    montoBono = BONO_BODAS_ORO.montoCLP;
    baseCalculo = `Monto fijo de $${BONO_BODAS_ORO.montoCLP.toLocaleString('es-CL')} (referencia sector privado)`;
  }

  return {
    anosTrabajados: anos,
    aplica: true,
    montoBono,
    baseCalculo,
    tipo: esPublico ? 'Sector Público' : 'Sector Privado',
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function bonoBodasOroToResults(result: BonoBodasOroResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  if (result.aplica) {
    results.push({ label: 'Monto del Bono', value: result.montoBono, format: 'CLP', highlight: true });
    results.push({ label: 'Años Trabajados', value: result.anosTrabajados, format: 'number' });
    results.push({ label: 'Tipo de Sector', value: result.tipo === 'Sector Público' ? 1 : 0, format: 'number' });
  } else {
    results.push({ label: 'No Aplica', value: 0, format: 'CLP', highlight: true });
    results.push({ label: 'Años Trabajados', value: result.anosTrabajados, format: 'number' });
  }

  return results;
}
