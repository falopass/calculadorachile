// ============================================
// Ingreso mínimo mensual (IMM) Chile
// Ley 21.830 y calendario de la Dirección del Trabajo
// ============================================

import {
  INGRESO_MINIMO,
  JORNADA_LEGAL,
  AFP_OBLIGATORIA_PCT,
  SALUD,
  SEGURO_CESANTIA,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type TipoIngresoMinimo =
  | 'general'
  | 'menor18-mayor65'
  | 'no-remuneracional'
  | 'zona-extrema'
  | 'jornal';

export interface SueldoMinimoInput {
  /** Horas semanales pactadas (0–42). */
  horasSemanales: number;
  /** Tipo de ingreso mínimo legal. */
  tipoIngreso: TipoIngresoMinimo;
  /** Incluir estimación de líquido con descuentos legales mínimos. */
  incluirLiquidoEstimado?: boolean;
}

export interface SueldoMinimoResult {
  horasSemanales: number;
  tipoIngreso: TipoIngresoMinimo;
  /** Monto mensual de referencia del tramo (antes de proporcional). */
  montoBase: number;
  /** Bruto mínimo aplicable a la jornada. */
  bruto: number;
  esJornadaParcial: boolean;
  esJornadaIntermedia: boolean;
  /** Líquido estimado (bruto − 10% AFP − 7% salud − 0,6% AFC). */
  liquidoEstimado: number | null;
  valorHora: number;
  esJornal: boolean;
  baseCalculo: string;
}

/**
 * Bruto mínimo legal por tipo de trabajador.
 *
 * Fuentes: Ley 21.830 (Diario Oficial 22-06-2026) y tabla de la
 * Dirección del Trabajo (w3-article-60141). Tramo vigente desde
 * 01-05-2026: general $553.553; menor 18/mayor 65 $412.938; ingreso
 * mínimo con fines no remuneracionales $356.815; jornal $27.678/día;
 * zona extrema $586.766.
 *
 * Regla de proporcionalidad (Dirección del Trabajo): con jornada de
 * 30 horas semanales o menos el mínimo puede pagarse proporcional
 * (monto × horas / jornada máxima); entre 30 y la jornada máxima
 * corresponde el mínimo íntegro.
 *
 * Líquido estimado: solo descuentos legales mínimos del trabajador
 * dependiente con contrato indefinido: AFP obligatoria 10%,
 * salud 7% (cotización legal FONASA/mínimo isapre) y AFC 0,6%.
 * Sin comisión variable de AFP ni impuesto (al IMM no le alcanza el
 * tramo de segunda categoría global complementario).
 */
export function calculateSueldoMinimo(
  input: SueldoMinimoInput,
): SueldoMinimoResult {
  const jornadaMax = JORNADA_LEGAL.actual;
  const horas = Math.min(jornadaMax, Math.max(0, input.horasSemanales ?? 0));
  const tipo = input.tipoIngreso ?? 'general';

  const montoBase =
    tipo === 'menor18-mayor65'
      ? INGRESO_MINIMO.menor_18_mayor_65
      : tipo === 'no-remuneracional'
        ? INGRESO_MINIMO.no_remuneracional
        : tipo === 'zona-extrema'
          ? INGRESO_MINIMO.zona_extrema
          : tipo === 'jornal'
            ? INGRESO_MINIMO.jornal
            : INGRESO_MINIMO.mensual;

  const esJornal = tipo === 'jornal';
  const esJornadaParcial = horas > 0 && horas <= 30;
  const esJornadaIntermedia = horas > 30 && horas < jornadaMax;

  const bruto = esJornal
    ? montoBase // el jornal es un valor diario, no mensual
    : esJornadaParcial || horas === 0
      ? Math.round((montoBase * horas) / jornadaMax)
      : montoBase;

  const incluirLiquido = input.incluirLiquidoEstimado !== false && !esJornal;
  const tasaDescuentos =
    (AFP_OBLIGATORIA_PCT +
      SALUD.fonasa.tasa +
      SEGURO_CESANTIA.contrato_indefinido.trabajador) /
    100;
  const liquidoEstimado = incluirLiquido
    ? Math.round(bruto * (1 - tasaDescuentos))
    : null;

  const valorHora =
    esJornal || horas === 0
      ? 0
      : Math.round(((bruto / 30) * 28) / (horas * 4));

  const nombreTipo: Record<TipoIngresoMinimo, string> = {
    general: 'ingreso mínimo mensual general',
    'menor18-mayor65': 'ingreso para menores de 18 y mayores de 65',
    'no-remuneracional': 'ingreso mínimo con fines no remuneracionales',
    'zona-extrema': 'gratificación mínima por zona extrema',
    jornal: 'sueldo mínimo jornal (valor diario)',
  };

  const baseCalculo = esJornal
    ? `Valor diario de referencia: $${montoBase.toLocaleString('es-CL')} por jornada.`
    : esJornadaParcial
      ? `Jornada parcial (${horas} h ≤ 30 h): $${montoBase.toLocaleString('es-CL')} × ${horas} / ${jornadaMax} = $${bruto.toLocaleString('es-CL')}.`
      : esJornadaIntermedia
        ? `Jornada intermedia (${horas} h, más de 30 y menos de ${jornadaMax}): corresponde el mínimo íntegro de $${montoBase.toLocaleString('es-CL')}.`
        : `Jornada completa (${jornadaMax} h): corresponde el ${nombreTipo[tipo]} íntegro.`;

  return {
    horasSemanales: horas,
    tipoIngreso: tipo,
    montoBase,
    bruto,
    esJornadaParcial,
    esJornadaIntermedia,
    liquidoEstimado,
    valorHora,
    esJornal,
    baseCalculo,
  };
}

export function sueldoMinimoToResults(
  result: SueldoMinimoResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: result.esJornal
        ? 'Sueldo mínimo por jornada'
        : result.esJornadaParcial
          ? 'Sueldo mínimo proporcional (bruto)'
          : 'Sueldo mínimo bruto',
      value: result.bruto,
      format: 'CLP',
      highlight: true,
      note: {
        text: result.baseCalculo,
        source: {
          name: 'Dirección del Trabajo — ingreso mínimo',
          url: 'https://www.dt.gob.cl/portal/1628/w3-article-60141.html',
        },
      },
    },
  ];

  if (result.liquidoEstimado !== null) {
    results.push({
      label: 'Líquido estimado',
      value: result.liquidoEstimado,
      format: 'CLP',
      note: {
        text: 'Descuenta solo lo legal mínimo: 10% AFP, 7% salud y 0,6% seguro de cesantía (contrato indefinido). Sin comisión AFP; al mínimo no le alcanza el tramo de impuesto.',
      },
    });
  }

  if (!result.esJornal && result.valorHora > 0) {
    results.push({
      label: 'Valor hora ordinaria referencial',
      value: result.valorHora,
      format: 'CLP',
    });
  }

  results.push({
    label: 'Horas semanales consideradas',
    value: result.horasSemanales,
    format: 'number',
  });

  return results;
}
