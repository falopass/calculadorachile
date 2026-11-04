// ============================================
// Cálculo de Boleta de Honorarios Chile
// ============================================

import {
  BOLETA_HONORARIOS,
  UF,
  RETENCION_HONORARIOS_CALENDARIO,
  RETENCION_HONORARIOS_DISTRIBUCION,
  type AnioRetencionHonorarios,
} from '@/lib/values/constants';
import { contextoHonorarios } from '@/lib/values/honorarios-anio';
import type { CalculatorResult } from '@/types/calculator';

export interface BoletaHonorariosInput {
  /**
   * Dirección del cálculo. En 'bruto-a-liquido' (default) `montoBruto` es el
   * bruto de la boleta; en 'liquido-a-bruto' `montoBruto` es el líquido
   * deseado y el bruto se obtiene dividiendo por (1 − tasa).
   */
  modo?: 'bruto-a-liquido' | 'liquido-a-bruto';
  montoBruto: number;
  retencionAutomatica?: boolean;
  /** Año del calendario de tasas (Ley 21.133 — aumento gradual). */
  ano?: 2025 | 2026 | 2027 | 2028;
  /**
   * Si true, se expone desglose informativo de la retención.
   * Nunca descuenta cotizaciones adicionales al líquido.
   */
  desgloseCotizaciones?: boolean;
  moneda?: 'CLP' | 'UF';
  calcularPPM?: boolean;
  calcularCostoEmpleador?: boolean;
  /** UF en vivo (UI). Default: snapshot `UF.valor`. */
  valorUF?: number;
  /** UTM en vivo (UI). Ya no se usa en el cálculo (no existe exención de 10 UTM). */
  valorUTM?: number;
}

export interface BoletaHonorariosResult {
  /** Dirección usada: 'bruto-a-liquido' por defecto. */
  modo: 'bruto-a-liquido' | 'liquido-a-bruto';
  montoBruto: number;
  /** Retención del SII (impuesto + cotizaciones futuras). */
  retencion: number;
  /** Monto efectivo que recibe el trabajador (bruto - retención). */
  montoLiquido: number;
  tasaRetencion: number;
  ano: number;
  mostrarDesglose: boolean;
  /**
   * Desglose informativo de qué financia la retención del SII.
   * Estos montos NO se descuentan adicionalmente del líquido.
   */
  desgloseRetencion: {
    impuestoRenta: number;
    afp: number;
    salud: number;
    seguroInvalidezSobrevivencia: number;
    accidentesTrabajo: number;
  };
  ppmAsociado: number;
  costoEmpleador: number;
  montoUF?: number;
}

/**
 * Calcula la retención de boleta de honorarios.
 *
 * Bug histórico: la versión anterior descontaba cotizaciones (AFP 7%,
 * salud 7%, etc.) del bruto adicionales a la retención del 15,25%.
 * Eso es doble contabilidad. Bajo la Ley 21.133 la retención YA
 * financia cotizaciones que se liquidan en la Operación Renta.
 * El trabajador recibe `bruto − retención`.
 *
 * Tasas anuales: RETENCION_HONORARIOS_CALENDARIO (SII, aumento gradual Ley 21.133).
 *
 * E-028: se eliminó la "exención bajo 10 UTM". No existe en el SII: el
 * monto mínimo de una boleta es $1 (FAQ 001.140.2667.010) y no hay monto
 * mínimo de PPM (FAQ 001.140.2668.012). Toda boleta lleva la tasa del año,
 * como retención del receptor o como PPM del emisor.
 */
export function calculateBoletaHonorarios(input: BoletaHonorariosInput): BoletaHonorariosResult {
  const {
    modo = 'bruto-a-liquido',
    montoBruto,
    retencionAutomatica = true,
    ano = contextoHonorarios().anio,
    desgloseCotizaciones = false,
    moneda = 'CLP',
    calcularPPM = false,
    calcularCostoEmpleador = false,
  } = input;

  const monto = Math.max(0, montoBruto);

  // Tasa según año (Ley 21.133) — calendario en constants.
  const tasaRetencion = RETENCION_HONORARIOS_CALENDARIO[ano] ?? BOLETA_HONORARIOS.tasa_total;

  const valorUF = input.valorUF ?? UF.valor;

  // E-039: en 'liquido-a-bruto' el monto ingresado es el líquido deseado y el
  // bruto de la boleta se obtiene dividiendo por (1 − tasa). Con retención
  // manual (retencionAutomatica=false) el bruto a emitir es el mismo monto.
  const bruto =
    modo === 'liquido-a-bruto' && retencionAutomatica
      ? Math.round(monto / (1 - tasaRetencion / 100))
      : monto;

  // Retención efectiva (sin exención: no existe un monto exento en el SII).
  const retencion = retencionAutomatica ? bruto * (tasaRetencion / 100) : 0;

  // Monto líquido = bruto − retención. Las cotizaciones se financian con
  // la retención dentro del proceso de Operación Renta; no se descuentan
  // adicionalmente.
  const montoLiquido = bruto - retencion;

  const distribucion =
    RETENCION_HONORARIOS_DISTRIBUCION[ano as AnioRetencionHonorarios] ??
    RETENCION_HONORARIOS_DISTRIBUCION[2026];
  const desgloseRetencion = {
    impuestoRenta: Math.round(bruto * (distribucion.impuesto_renta / 100)),
    afp: Math.round(bruto * (distribucion.afp / 100)),
    salud: Math.round(bruto * (distribucion.salud / 100)),
    seguroInvalidezSobrevivencia: Math.round(bruto * (distribucion.sis / 100)),
    accidentesTrabajo: Math.round(bruto * (distribucion.accidentes_trabajo / 100)),
  };

  const ppmAsociado = calcularPPM
    ? Math.round(bruto * (distribucion.impuesto_renta / 100))
    : 0;

  const costoEmpleador = calcularCostoEmpleador ? bruto : 0;
  const montoUF = moneda === 'UF' ? Math.round((bruto / valorUF) * 100) / 100 : undefined;

  return {
    modo,
    montoBruto: Math.round(bruto),
    retencion: Math.round(retencion),
    montoLiquido: Math.round(montoLiquido),
    tasaRetencion,
    ano,
    mostrarDesglose: Boolean(desgloseCotizaciones),
    desgloseRetencion,
    ppmAsociado,
    costoEmpleador,
    montoUF,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function boletaHonorariosToResults(result: BoletaHonorariosResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  if (result.modo === 'liquido-a-bruto') {
    results.push({
      label: 'Monto Bruto (a emitir en la boleta)',
      value: result.montoBruto,
      format: 'CLP',
      highlight: true,
    });
    results.push({
      label: 'Monto Líquido (a recibir)',
      value: result.montoLiquido,
      format: 'CLP',
    });
  } else {
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
  }

  {
    results.push({
      label: `Retención ${result.ano} (${result.tasaRetencion}%)`,
      value: result.retencion,
      format: 'CLP',
    });

    // Solo si el usuario pidió desglose informativo (no es descuento extra).
    if (result.mostrarDesglose) {
      results.push({
        label: '— Impuesto Renta (est. dentro de retención)',
        value: result.desgloseRetencion.impuestoRenta,
        format: 'CLP',
      });
      results.push({
        label: '— Salud (est. dentro de retención)',
        value: result.desgloseRetencion.salud,
        format: 'CLP',
      });
      results.push({
        label: '— AFP (est. dentro de retención)',
        value: result.desgloseRetencion.afp,
        format: 'CLP',
      });
      results.push({
        label: '— SIS (est. dentro de retención)',
        value: result.desgloseRetencion.seguroInvalidezSobrevivencia,
        format: 'CLP',
      });
      results.push({
        label: '— Accidentes del trabajo (est. dentro de retención)',
        value: result.desgloseRetencion.accidentesTrabajo,
        format: 'CLP',
      });
    }
  }

  if (result.ppmAsociado > 0) {
    results.push({
      label: 'PPM Asociado',
      value: result.ppmAsociado,
      format: 'CLP',
    });
  }

  if (result.costoEmpleador > 0) {
    results.push({
      label: 'Costo Total para Pagador',
      value: result.costoEmpleador,
      format: 'CLP',
    });
  }

  if (result.montoUF !== undefined) {
    results.push({
      label: 'Monto Bruto en UF',
      value: result.montoUF,
      format: 'UF',
    });
  }

  return results;
}
