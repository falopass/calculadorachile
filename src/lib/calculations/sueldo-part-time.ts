// ============================================
// Cálculo de Sueldo Part-Time Chile 2026
// Ingreso mínimo proporcional a jornadas ≤ 30 horas
// ============================================

import { INGRESO_MINIMO, JORNADA_LEGAL } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface SueldoPartTimeInput {
  /** Horas semanales pactadas (1–42). */
  horasSemanales: number;
  /** Sueldo mensual pactado en CLP. 0 = no informado. */
  sueldoPactado?: number;
}

export interface SueldoPartTimeResult {
  horasSemanales: number;
  /** Jornada parcial (≤ 30 h): el IMM puede pagarse proporcional. */
  esJornadaParcial: boolean;
  /** Jornada intermedia (> 30 y < 42 h): debe pagarse el IMM íntegro. */
  esJornadaIntermedia: boolean;
  /** Mínimo legal mensual aplicable a la jornada. */
  minimoLegal: number;
  sueldoPactado: number;
  cumpleMinimo: boolean;
  /** Cuánto falta para el mínimo legal (0 si cumple o no informó). */
  diferencia: number;
  /** Valor hora ordinaria según sueldo base y jornada. */
  valorHora: number;
  baseCalculo: string;
}

/**
 * Estima el sueldo mínimo legal para jornadas parciales.
 *
 * Regla (Dirección del Trabajo): si la jornada pactada es de 30 horas
 * semanales o menos, el ingreso mínimo mensual puede pagarse en forma
 * proporcional (IMM × horas / 42). Si la jornada es superior a 30 e
 * inferior a 42 horas ("jornada intermedia"), el trabajador debe
 * percibir el ingreso mínimo mensual íntegro.
 *
 * Valor hora: misma fórmula legal que horas-extra:
 * (sueldo / 30 × 28) / (horas semanales × 4).
 */
export function calculateSueldoPartTime(
  input: SueldoPartTimeInput,
): SueldoPartTimeResult {
  const horas = Math.min(
    JORNADA_LEGAL.actual,
    Math.max(0, input.horasSemanales ?? 0),
  );
  const pactado = Math.max(0, input.sueldoPactado ?? 0);
  const imm = INGRESO_MINIMO.mensual;
  const jornadaMax = JORNADA_LEGAL.actual;

  const esJornadaParcial = horas > 0 && horas <= 30;
  const esJornadaIntermedia = horas > 30 && horas < jornadaMax;
  const minimoLegal =
    esJornadaParcial || horas === 0
      ? Math.round((imm * horas) / jornadaMax)
      : imm;

  const cumpleMinimo = pactado === 0 || pactado >= minimoLegal;
  const diferencia = pactado > 0 ? Math.max(0, minimoLegal - pactado) : 0;

  const sueldoBase = pactado > 0 ? pactado : minimoLegal;
  const valorHora =
    horas > 0 ? Math.round(((sueldoBase / 30) * 28) / (horas * 4)) : 0;

  const baseCalculo = esJornadaParcial
    ? `IMM proporcional: $${imm.toLocaleString('es-CL')} × ${horas} h / ${jornadaMax} h = $${minimoLegal.toLocaleString('es-CL')}.`
    : esJornadaIntermedia
      ? `Jornada intermedia (${horas} h, más de 30 y menos de ${jornadaMax}): corresponde el ingreso mínimo íntegro.`
      : `Jornada ordinaria completa (${jornadaMax} h): corresponde el ingreso mínimo íntegro.`;

  return {
    horasSemanales: horas,
    esJornadaParcial,
    esJornadaIntermedia,
    minimoLegal,
    sueldoPactado: pactado,
    cumpleMinimo,
    diferencia,
    valorHora,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function sueldoPartTimeToResults(
  result: SueldoPartTimeResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: result.esJornadaParcial
        ? 'Ingreso mínimo proporcional'
        : 'Ingreso mínimo legal aplicable',
      value: result.minimoLegal,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Valor hora ordinaria',
      value: result.valorHora,
      format: 'CLP',
    },
    {
      label: 'Horas semanales',
      value: result.horasSemanales,
      format: 'number',
    },
  ];

  if (result.sueldoPactado > 0) {
    results.push({
      label: 'Sueldo pactado',
      value: result.sueldoPactado,
      format: 'CLP',
    });
    if (!result.cumpleMinimo) {
      results.push({
        label: 'Diferencia bajo el mínimo legal',
        value: result.diferencia,
        format: 'CLP',
      });
    }
  }

  return results;
}
