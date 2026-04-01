// ============================================
// Cálculo de Operación Renta para Independientes Chile 2026
// ============================================

import { IMPUESTO_SEGUNDA_CATEGORIA, UTM } from '@/lib/values/constants';
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
}

/**
 * Calcula la Operación Renta para trabajadores independientes
 *
 * Los trabajadores independientes deben declarar sus rentas anuales y pagar
 * impuesto de segunda categoría según tramos progresivos. Pueden deducir
 * gastos, cotizaciones previsionales y ahorro previsional voluntario.
 *
 * Base legal: Art. 42 N°2 LIR, Art. 43 N°1 LIR
 *
 * @param input - Datos para el cálculo de Operación Renta
 * @returns Desglose completo del impuesto anual
 */
export function calculateOperacionRenta(input: OperacionRentaInput): OperacionRentaResult {
  const {
    ingresosAnuales,
    gastosAnuales,
    cotizacionesObligatorias,
    ahorroPrevisional = 0,
  } = input;

  // Validar rangos
  const ingresos = Math.max(0, ingresosAnuales);
  const gastos = Math.max(0, Math.min(gastosAnuales, ingresos));
  const cotizaciones = Math.max(0, cotizacionesObligatorias);
  const ahorro = Math.max(0, ahorroPrevisional);

  // Calcular renta tributable (renta bruta menos deducciones)
  const rentaBruta = ingresos;
  const gastosDeducidos = gastos;
  const cotizacionesDeducidas = cotizaciones;
  const ahorroPrevisionalDeducido = ahorro;

  const rentaTributable = Math.max(0, rentaBruta - gastosDeducidos - cotizacionesDeducidas - ahorroPrevisionalDeducido);

  // Convertir a UTA (UTA = UTM * 12)
  const valorUTA = UTM.valor * 12;
  const rentaTributableUTA = rentaTributable / valorUTA;

  // Aplicar tramos progresivos de impuesto de segunda categoría
  let impuesto = 0;
  for (const tramo of IMPUESTO_SEGUNDA_CATEGORIA.tramos) {
    if (rentaTributableUTA > tramo.desde && rentaTributableUTA <= tramo.hasta) {
      const exentoUTA = tramo.exento;
      const factor = tramo.factor;
      const rebaja = tramo.rebaja;

      // (Renta en UTA - exento) * factor - rebaja = impuesto en UTA
      const impuestoUTA = ((rentaTributableUTA - exentoUTA) * factor) - rebaja;
      impuesto = Math.max(0, impuestoUTA * valorUTA);
      break;
    }
  }

  // Tasa efectiva de impuesto sobre renta bruta
  const tasaEfectiva = rentaBruta > 0 ? (impuesto / rentaBruta) * 100 : 0;

  // Retención sugerida: para boletas de honorarios, típicamente 15.25% de la base imponible
  // (10% de impuesto + 5.25% adicional según reforma tributaria)
  const retencionSugerida = rentaBruta * 0.1525;

  return {
    rentaBruta: Math.round(rentaBruta),
    gastosDeducidos: Math.round(gastosDeducidos),
    cotizacionesDeducidas: Math.round(cotizacionesDeducidas),
    ahorroPrevisionalDeducido: Math.round(ahorroPrevisionalDeducido),
    rentaTributable: Math.round(rentaTributable),
    rentaTributableUTA: Math.round(rentaTributableUTA * 100) / 100,
    impuesto: Math.round(impuesto),
    tasaEfectiva: Math.round(tasaEfectiva * 100) / 100,
    retencionSugerida: Math.round(retencionSugerida),
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
      label: 'Retención Sugerida (15.25%)',
      value: result.retencionSugerida,
      format: 'CLP',
    },
  ];
}
