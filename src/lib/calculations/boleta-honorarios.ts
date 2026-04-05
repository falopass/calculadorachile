// ============================================
// Cálculo de Boleta de Honorarios Chile
// ============================================

import { BOLETA_HONORARIOS, UTM, UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface BoletaHonorariosInput {
  montoBruto: number;
  retencionAutomatica?: boolean;
  ano?: 2025 | 2026 | 2027 | 2028; // Año para la tasa de retención
  calculoInverso?: boolean; // De líquido a bruto
  incluyeCotizaciones?: boolean; // Cotizaciones previsionales Ley 21.133
  incluyePrestamoSolidario?: boolean; // Préstamo solidario SII (+3%)
  moneda?: 'CLP' | 'UF'; // Mostrar resultados en CLP o UF
  calcularPPM?: boolean; // Calcular PPM asociado
  calcularCostoEmpleador?: boolean; // Calcular costo para el pagador
  afp?: string; // AFP para cotizaciones
  salud?: string; // Sistema de salud para cotizaciones
}

export interface BoletaHonorariosResult {
  montoBruto: number;
  retencion: number;
  montoLiquido: number;
  exento: boolean;
  tasaRetencion: number; // Porcentaje de retención aplicado
  ano: number; // Año del cálculo
  cotizaciones: {
    afp: number;
    salud: number;
    seguroCesantia: number;
    total: number;
  };
  ppmAsociado: number; // PPM mensual estimado
  costoEmpleador: number; // Costo total para el pagador
  montoUF?: number; // Monto en UF si se selecciona esta moneda
}

/**
 * Calcula la retención de boleta de honorarios
 */
export function calculateBoletaHonorarios(input: BoletaHonorariosInput): BoletaHonorariosResult {
  const {
    montoBruto,
    retencionAutomatica = true,
    ano = 2026,
    calculoInverso = false,
    incluyeCotizaciones = false,
    incluyePrestamoSolidario = false,
    moneda = 'CLP',
    calcularPPM = false,
    calcularCostoEmpleador = false,
    afp = 'prevision',
    salud = 'salud'
  } = input;
  
  // Definir tasa de retención según el año
  let tasaRetencion = BOLETA_HONORARIOS.tasa_total;
  switch (ano) {
    case 2025:
      tasaRetencion = 14.5; // 14.5% en 2025
      break;
    case 2026:
      tasaRetencion = 15.25; // 15.25% en 2026
      break;
    case 2027:
      tasaRetencion = 16; // 16% en 2027
      break;
    case 2028:
      tasaRetencion = 17; // 17% en 2028
      break;
  }
  
  // Ajustar tasa si incluye préstamo solidario
  if (incluyePrestamoSolidario) {
    tasaRetencion += 3; // +3% por préstamo solidario
  }
  
  // Verificar si está exento (hasta 10 UTM mensuales)
  const limiteExento = BOLETA_HONORARIOS.exento_minimo * UTM.valor;
  const exento = montoBruto <= limiteExento;
  
  // Calcular retención
  let retencion = 0;
  if (retencionAutomatica && !exento) {
    retencion = montoBruto * (tasaRetencion / 100);
  }
  
  // Calcular cotizaciones previsionales si aplica
  let cotizaciones = {
    afp: 0,
    salud: 0,
    seguroCesantia: 0,
    total: 0
  };
  
  if (incluyeCotizaciones) {
    // Base imponible para cotizaciones es el 80% del monto bruto
    const baseImponible = montoBruto * 0.8;
    
    // Cotización AFP (10% + comisión)
    cotizaciones.afp = baseImponible * 0.10; // 10% base
    
    // Cotización salud (7%)
    cotizaciones.salud = baseImponible * 0.07;
    
    // Seguro de cesantía (1.15%)
    cotizaciones.seguroCesantia = baseImponible * 0.0115;
    
    cotizaciones.total = cotizaciones.afp + cotizaciones.salud + cotizaciones.seguroCesantia;
  }
  
  // Monto líquido después de retención
  let montoLiquido = montoBruto - retencion;
  
  // Si incluye cotizaciones, estas también se descuentan del líquido
  if (incluyeCotizaciones) {
    montoLiquido -= cotizaciones.total;
  }
  
  // Calcular PPM si aplica
  let ppmAsociado = 0;
  if (calcularPPM) {
    // PPM es 10% para profesionales
    ppmAsociado = montoBruto * 0.10;
  }
  
  // Calcular costo para el empleador si aplica
  let costoEmpleador = 0;
  if (calcularCostoEmpleador) {
    // Costo para el empleador es el monto bruto más posibles cotizaciones patronales
    costoEmpleador = montoBruto;
  }
  
  // Convertir a UF si se selecciona esta moneda
  let montoUF: number | undefined;
  if (moneda === 'UF') {
    montoUF = montoBruto / UF.valor;
  }
  
  return {
    montoBruto,
    retencion: Math.round(retencion),
    montoLiquido: Math.round(montoLiquido),
    exento,
    tasaRetencion,
    ano,
    cotizaciones,
    ppmAsociado: Math.round(ppmAsociado),
    costoEmpleador: Math.round(costoEmpleador),
    montoUF: montoUF ? Math.round(montoUF * 100) / 100 : undefined
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function boletaHonorariosToResults(result: BoletaHonorariosResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];
  
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
  
  if (result.exento) {
    results.push({
      label: 'Retención',
      value: 0,
      format: 'CLP',
    });
  } else {
    results.push({
      label: `Retención (${result.tasaRetencion}%)`,
      value: result.retencion,
      format: 'CLP',
    });
  }
  
  // Incluir cotizaciones si aplica
  if (result.cotizaciones.total > 0) {
    results.push({
      label: 'Cotización AFP',
      value: result.cotizaciones.afp,
      format: 'CLP',
    });
    
    results.push({
      label: 'Cotización Salud',
      value: result.cotizaciones.salud,
      format: 'CLP',
    });
    
    results.push({
      label: 'Seguro de Cesantía',
      value: result.cotizaciones.seguroCesantia,
      format: 'CLP',
    });
    
    results.push({
      label: 'Total Cotizaciones',
      value: result.cotizaciones.total,
      format: 'CLP',
    });
  }
  
  // Incluir PPM si aplica
  if (result.ppmAsociado > 0) {
    results.push({
      label: 'PPM Asociado (10%)',
      value: result.ppmAsociado,
      format: 'CLP',
    });
  }
  
  // Incluir costo para el empleador si aplica
  if (result.costoEmpleador > 0) {
    results.push({
      label: 'Costo Total para Empleador',
      value: result.costoEmpleador,
      format: 'CLP',
    });
  }
  
  // Incluir monto en UF si aplica
  if (result.montoUF !== undefined) {
    results.push({
      label: 'Monto Bruto en UF',
      value: result.montoUF,
      format: 'UF',
    });
  }
  
  return results;
}
