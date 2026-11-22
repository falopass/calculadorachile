// ============================================
// Beneficio por Años Cotizados (BAC) — Reforma de Pensiones
// ChileAtiende ficha 130450 / NCG 350 Superintendencia de Pensiones
// ============================================

import { BENEFICIO_ANOS_COTIZADOS, UF, mesesMinimosMujerBAC } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type SexoBAC = 'mujer' | 'hombre';

export interface BeneficioAnosCotizadosInput {
  /** Sexo legal de la persona (define el mínimo de meses exigidos). */
  sexo: SexoBAC;
  /** Edad cumplida a la fecha de referencia. */
  edad: number;
  /**
   * Total de meses cotizados (continuos o discontinuos) en el Fondo
   * Autónomo de Protección Previsional.
   */
  mesesCotizados: number;
  /** Pensionada por vejez o invalidez en AFP o compañía de seguros (D.L. 3.500). */
  pensionadoAfp: boolean;
  /** Titular de pensión de retiro en Capredena o Dipreca (montepío no descarta). */
  pensionRetiroCapredenaDipreca: boolean;
  /** Fecha de referencia (define el mínimo vigente para mujeres). Default: hoy. */
  fecha?: Date;
  /** Valor UF en vivo (API); si falta, se usa el respaldo local. */
  valorUF?: number;
}

export interface BeneficioAnosCotizadosResult {
  aplica: boolean;
  /** Meses exigidos según sexo y fecha de referencia. */
  mesesMinimosExigidos: number;
  /** Meses efectivamente computados (máximo 300). */
  mesesComputables: number;
  /** Años cotizados computados (con fracción; paga proporcional). */
  anosComputables: number;
  /** Beneficio mensual en UF (tope 2,5). */
  beneficioUF: number;
  /** Beneficio mensual estimado en CLP según la UF aplicada. */
  beneficioCLP: number;
  valorUF: number;
  motivosNoAplica: string[];
  baseCalculo: string;
}

const B = BENEFICIO_ANOS_COTIZADOS;

/**
 * Estima el Beneficio por Años Cotizados (BAC).
 *
 * Reglas (ChileAtiende ficha 130450):
 *  - 0,1 UF mensuales por cada 12 meses cotizados, tope 2,5 UF.
 *  - Se computan a lo más 300 meses (25 años), continuos o discontinuos.
 *  - Requiere 65+ años, pensión de vejez o invalidez en AFP/seguros
 *    (D.L. 3.500) y no ser titular de pensión de retiro en Capredena
 *    o Dipreca.
 *  - Mínimos: 240 meses hombres; mujeres 120, subiendo 12 meses cada
 *    24 meses desde enero-2028 hasta 180 en enero-2036 (NCG 350).
 */
export function calculateBeneficioAnosCotizados(
  input: BeneficioAnosCotizadosInput,
): BeneficioAnosCotizadosResult {
  const edad = Math.max(0, Math.round(input.edad ?? 0));
  const meses = Math.max(0, Math.round(input.mesesCotizados ?? 0));
  const valorUF = input.valorUF && input.valorUF > 0 ? input.valorUF : UF.valor;
  const fecha = input.fecha ?? new Date();

  const mesesMinimos =
    input.sexo === 'mujer' ? mesesMinimosMujerBAC(fecha).meses : B.mesesMinimosHombre;

  const motivosNoAplica: string[] = [];

  if (!input.pensionadoAfp) {
    motivosNoAplica.push(
      'El beneficio requiere estar pensionada/o por vejez o invalidez en una AFP o compañía de seguros de vida (D.L. N° 3.500).',
    );
  }
  if (input.pensionRetiroCapredenaDipreca) {
    motivosNoAplica.push(
      'Quienes reciben pensión de retiro en Capredena o Dipreca no tienen derecho al beneficio (las pensiones de montepío no descartan).',
    );
  }
  if (edad < B.edadMinima) {
    motivosNoAplica.push(`Se exige tener ${B.edadMinima} años o más (declaraste ${edad}).`);
  }
  if (meses < mesesMinimos) {
    motivosNoAplica.push(
      `Se exigen al menos ${mesesMinimos} meses cotizados (${Math.floor(mesesMinimos / 12)} años) ${input.sexo === 'mujer' ? 'para las mujeres al año de referencia' : 'para los hombres'}; declaraste ${meses}.`,
    );
  }

  const aplica = motivosNoAplica.length === 0;
  const mesesComputables = Math.min(meses, B.mesesMaximos);
  // NCG 350, cap. III.3.a: los meses que no completan un año pagan
  // beneficio proporcional (meses cotizados ÷ 12).
  const anosComputables = aplica ? mesesComputables / 12 : 0;
  const beneficioUF = aplica
    ? Math.round(Math.min(anosComputables * B.ufPorAno, B.topeUF) * 100) / 100
    : 0;
  const beneficioCLP = Math.round(beneficioUF * valorUF);

  const baseCalculo = aplica
    ? `${mesesComputables} meses computables ÷ 12 = ${anosComputables.toLocaleString('es-CL', { maximumFractionDigits: 2 })} año(s) × ${B.ufPorAno} UF = ${beneficioUF.toLocaleString('es-CL')} UF mensuales ($${beneficioCLP.toLocaleString('es-CL')} con UF $${Math.round(valorUF).toLocaleString('es-CL')}).${meses > B.mesesMaximos ? ' Se aplicó el máximo de 300 meses computables.' : ''}`
    : motivosNoAplica.join(' ');

  return {
    aplica,
    mesesMinimosExigidos: mesesMinimos,
    mesesComputables: aplica ? mesesComputables : 0,
    anosComputables,
    beneficioUF,
    beneficioCLP,
    valorUF,
    motivosNoAplica,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function beneficioAnosCotizadosToResults(
  result: BeneficioAnosCotizadosResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  if (result.aplica) {
    results.push({
      label: 'Beneficio mensual estimado',
      value: result.beneficioCLP,
      format: 'CLP',
      highlight: true,
    });
    results.push({
      label: 'Equivalente en UF (mensual)',
      value: result.beneficioUF,
      format: 'UF',
    });
    results.push({
      label: 'Años cotizados computados',
      value: Math.round(result.anosComputables * 100) / 100,
      format: 'number',
    });
    results.push({
      label: 'Meses computados (máx. 300)',
      value: result.mesesComputables,
      format: 'number',
    });
  } else {
    results.push({
      label: 'No cumple los requisitos',
      value: 0,
      format: 'CLP',
      highlight: true,
    });
  }

  results.push({
    label: 'Meses cotizados mínimos exigidos',
    value: result.mesesMinimosExigidos,
    format: 'number',
  });

  return results;
}
