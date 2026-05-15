// ============================================
// Cálculo de Operación Renta para Independientes Chile 2026
// ============================================

import {
  IMPUESTO_SEGUNDA_CATEGORIA_2026,
  UTM,
  RETENCION_HONORARIOS_CALENDARIO,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface OperacionRentaInput {
  ingresosAnuales: number;
  gastosAnuales: number;
  cotizacionesObligatorias: number;
  ahorroPrevisional?: number;
}

export interface OperacionRentaResult {
  rentaBruta: number;
  gastosDeducidos: number;
  cotizacionesDeducidas: number;
  ahorroPrevisionalDeducido: number;
  rentaTributable: number;
  rentaTributableUTA: number;
  impuesto: number;
  tasaEfectiva: number;
  retencionSugerida: number;
  tramoAplicado: string;
}

/**
 * Calcula la Operación Renta para trabajadores independientes.
 *
 * Bug histórico: la versión anterior aplicaba la tabla
 * `IMPUESTO_SEGUNDA_CATEGORIA` (mensual UTM) sobre `rentaTributableUTA`
 * (anual). Como esa tabla está expresada en UTM mensuales, aplicarla
 * a rentas anuales en UTA subestimaba el impuesto en ~12×.
 *
 * Fix: usar la tabla `IMPUESTO_SEGUNDA_CATEGORIA_2026` que sí está en
 * UTA (8/16/24/32/48/64/96 UTA) y calcular: impuesto = renta × tasa −
 * factor (todo en UTA), luego convertir a CLP.
 *
 * Base legal: Art. 42 N°2, 43 N°1 LIR.
 */
export function calculateOperacionRenta(input: OperacionRentaInput): OperacionRentaResult {
  const {
    ingresosAnuales,
    gastosAnuales,
    cotizacionesObligatorias,
    ahorroPrevisional = 0,
  } = input;

  const ingresos = Math.max(0, ingresosAnuales);
  const gastos = Math.max(0, Math.min(gastosAnuales, ingresos));
  const cotizaciones = Math.max(0, cotizacionesObligatorias);
  const ahorro = Math.max(0, ahorroPrevisional);

  const rentaBruta = ingresos;
  const rentaTributable = Math.max(0, rentaBruta - gastos - cotizaciones - ahorro);

  const valorUTA = UTM.valor * 12;
  const rentaTributableUTA = valorUTA > 0 ? rentaTributable / valorUTA : 0;

  // Tabla IMPUESTO_SEGUNDA_CATEGORIA_2026 — tramos en UTA (anual).
  let impuestoUTA = 0;
  let tramoAplicado = 'Exento';

  for (const tramo of IMPUESTO_SEGUNDA_CATEGORIA_2026.tramos) {
    if (
      rentaTributableUTA > tramo.limiteInferiorUTA &&
      rentaTributableUTA <= tramo.limiteSuperiorUTA
    ) {
      // Impuesto (UTA) = renta UTA × tasa − factor
      impuestoUTA = rentaTributableUTA * tramo.tasa - tramo.factor;
      impuestoUTA = Math.max(0, impuestoUTA);

      const desdeFmt = tramo.limiteInferiorUTA.toString();
      const hastaFmt =
        tramo.limiteSuperiorUTA === Infinity ? 'más' : tramo.limiteSuperiorUTA.toString();
      tramoAplicado = `Desde ${desdeFmt} hasta ${hastaFmt} UTA`;
      break;
    }
  }

  const impuesto = Math.max(0, Math.round(impuestoUTA * valorUTA));
  const tasaEfectiva = rentaBruta > 0 ? (impuesto / rentaBruta) * 100 : 0;

  // Retención sugerida según el calendario Ley 21.578 (año actual).
  const tasaRetencion = RETENCION_HONORARIOS_CALENDARIO[2026] ?? 15.25;
  const retencionSugerida = Math.round(rentaBruta * (tasaRetencion / 100));

  return {
    rentaBruta: Math.round(rentaBruta),
    gastosDeducidos: Math.round(gastos),
    cotizacionesDeducidas: Math.round(cotizaciones),
    ahorroPrevisionalDeducido: Math.round(ahorro),
    rentaTributable: Math.round(rentaTributable),
    rentaTributableUTA: Math.round(rentaTributableUTA * 100) / 100,
    impuesto,
    tasaEfectiva: Math.round(tasaEfectiva * 100) / 100,
    retencionSugerida,
    tramoAplicado,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function operacionRentaToResults(result: OperacionRentaResult): CalculatorResult[] {
  return [
    {
      label: 'Impuesto Anual',
      value: result.impuesto,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Renta Bruta',
      value: result.rentaBruta,
      format: 'CLP',
    },
    {
      label: 'Renta Tributable',
      value: result.rentaTributable,
      format: 'CLP',
    },
    {
      label: 'Renta Tributable (UTA)',
      value: result.rentaTributableUTA,
      format: 'number',
    },
    {
      label: 'Gastos Deducidos',
      value: result.gastosDeducidos,
      format: 'CLP',
    },
    {
      label: 'Cotizaciones Deducidas',
      value: result.cotizacionesDeducidas,
      format: 'CLP',
    },
    {
      label: 'Ahorro Previsional Deducido',
      value: result.ahorroPrevisionalDeducido,
      format: 'CLP',
    },
    {
      label: 'Tasa Efectiva',
      value: result.tasaEfectiva,
      format: 'percentage',
    },
    {
      label: `Retención Sugerida (${RETENCION_HONORARIOS_CALENDARIO[2026]}%)`,
      value: result.retencionSugerida,
      format: 'CLP',
    },
  ];
}
