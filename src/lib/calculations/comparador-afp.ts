// ============================================
// Comparador de Comisiones AFP Chile 2026
// ============================================

import { AFP, TOPE_IMPOSITIVO, UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface ComparadorAFPInput {
  sueldoBruto: number;
  afpActual: keyof typeof AFP;
  anosPension: number;
}

export interface DesgloseAFP {
  nombre: string;
  key: string;
  comision: number;
  sis: number;
  costoMensual: number;
  costoAnual: number;
  ahorroVsActual: number;
}

export interface ComparadorAFPResult {
  sueldoBruto: number;
  afpActual: string;
  anosPension: number;
  costoAnualActual: number;
  costoAnualMasBarata: number;
  ahorroAnual: number;
  ahorroTotalPeriodo: number;
  mejorAFP: string;
  desgloseAFP: DesgloseAFP[];
}

/**
 * Compara las comisiones de todas las AFP y calcula el ahorro potencial
 *
 * Cada AFP cobra una comisión mensual sobre el sueldo bruto imponible del
 * trabajador. La diferencia de comisiones entre AFP puede representar un
 * ahorro significativo a lo largo de los años de vida laboral.
 * Este comparador muestra el costo anual y el ahorro total proyectado.
 *
 * Base legal: DFL 3500/1980, Superintendencia de Pensiones
 *
 * @param input - Datos para la comparación de AFP
 * @returns Desglose comparativo de todas las AFP
 */
export function calculateComparadorAFP(input: ComparadorAFPInput): ComparadorAFPResult {
  const { sueldoBruto, afpActual, anosPension } = input;

  // Validar rangos
  const sueldo = Math.max(0, sueldoBruto);
  const anos = Math.max(1, Math.min(anosPension, 50));

  // Aplicar tope imponible (90 UF en 2026): la comisión solo se
  // cobra hasta el tope, no sobre el sueldo bruto total. Para sueldos
  // altos esto reduce significativamente la comisión real.
  const topeImponibleCLP = TOPE_IMPOSITIVO.afp_salud * UF.valor;
  const baseImponible = Math.min(sueldo, topeImponibleCLP);

  // Calcular desglose para cada AFP
  const desgloseAFP: DesgloseAFP[] = Object.entries(AFP).map(([key, data]) => {
    const costoMensual = baseImponible * (data.comision / 100);
    const costoAnual = costoMensual * 12;

    // Calcular ahorro vs AFP actual
    const costoAnualActual = baseImponible * (AFP[afpActual].comision / 100) * 12;
    const ahorroVsActual = costoAnualActual - costoAnual;

    return {
      nombre: data.nombre,
      key,
      comision: data.comision,
      sis: data.sis,
      costoMensual: Math.round(costoMensual),
      costoAnual: Math.round(costoAnual),
      ahorroVsActual: Math.round(ahorroVsActual),
    };
  });

  // Ordenar por costo anual (menor a mayor)
  desgloseAFP.sort((a, b) => a.costoAnual - b.costoAnual);

  // Encontrar la más barata
  const mejorAFP = desgloseAFP[0];

  // Costo anual de la AFP actual (con tope aplicado)
  const costoAnualActual = Math.round(baseImponible * (AFP[afpActual].comision / 100) * 12);

  // Costo anual de la más barata
  const costoAnualMasBarata = mejorAFP.costoAnual;

  // Ahorro anual vs la más barata
  const ahorroAnual = costoAnualActual - costoAnualMasBarata;

  // Ahorro total proyectado en el período
  const ahorroTotalPeriodo = ahorroAnual * anos;

  return {
    sueldoBruto: Math.round(sueldo),
    afpActual: AFP[afpActual].nombre,
    anosPension: anos,
    costoAnualActual,
    costoAnualMasBarata,
    ahorroAnual,
    ahorroTotalPeriodo: Math.round(ahorroTotalPeriodo),
    mejorAFP: mejorAFP.nombre,
    desgloseAFP,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function comparadorAFPToResults(result: ComparadorAFPResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  results.push({
    label: `Mejor AFP: ${result.mejorAFP}`,
    value: result.costoAnualMasBarata,
    format: 'CLP',
    highlight: true,
  });

  results.push({
    label: `Costo Anual ${result.afpActual}`,
    value: result.costoAnualActual,
    format: 'CLP',
  });

  results.push({
    label: 'Ahorro Anual',
    value: result.ahorroAnual,
    format: 'CLP',
  });

  results.push({
    label: `Ahorro Total (${result.anosPension} años)`,
    value: result.ahorroTotalPeriodo,
    format: 'CLP',
  });

  // Agregar desglose de cada AFP
  for (const afp of result.desgloseAFP) {
    results.push({
      label: `${afp.nombre} (${afp.comision}%)`,
      value: afp.costoAnual,
      format: 'CLP',
    });
  }

  return results;
}
