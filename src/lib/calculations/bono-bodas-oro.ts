// ============================================
// Cálculo de Bono Bodas de Oro Chile 2026
// Beneficio por 20+ años de cotizaciones previsionales
// ============================================

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
 * Sector privado: 1 remuneración a los 20 años, 2 a los 25, 2 a los 30
 * (sujetos a negociación colectiva, valores de referencia).
 * Sector público: regulado por ley, 1 remuneración por año después de 20 años.
 * Ley 18.708 y normativa del sector público.
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
    // Sector privado: montos de referencia según tramos
    if (anos >= 30) {
      montoBono = Math.round(sueldo * 2);
      baseCalculo = '2 remuneraciones (30+ años)';
    } else if (anos >= 25) {
      montoBono = Math.round(sueldo * 2);
      baseCalculo = '2 remuneraciones (25-29 años)';
    } else {
      montoBono = Math.round(sueldo * 1);
      baseCalculo = '1 remuneración (20-24 años)';
    }
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
    results.push({ label: 'Base de Cálculo', value: 0, format: 'number' });
  } else {
    results.push({ label: 'No Aplica', value: 0, format: 'CLP', highlight: true });
    results.push({ label: 'Años Trabajados', value: result.anosTrabajados, format: 'number' });
  }

  return results;
}
