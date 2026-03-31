// ============================================
// Cálculo de Sueldo Líquido Chile 2026
// ============================================

import { AFP, SALUD, SEGURO_CESANTIA, TOPE_IMPOSITIVO, IMPUESTO_SEGUNDA_CATEGORIA, UTM, UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface SueldoLiquidoInput {
  sueldoBruto: number;
  afp: keyof typeof AFP;
  saludTipo: 'fonasa' | 'isapre';
  saludTramo?: 'A' | 'B' | 'C' | 'D';
  isapreMonto?: number; // Monto adicional de isapre en UF
  contratoIndefinido?: boolean;
}

export interface SueldoLiquidoResult {
  bruto: number;
  liquido: number;
  descuentos: {
    afp: number;
    sis: number;
    salud: number;
    seguroCesantia: number;
    impuesto: number;
  };
  totalDescuentos: number;
}

/**
 * Calcula el tope imponible en CLP
 */
function calcularTopeImponible(topeUF: number, valorUF: number): number {
  return topeUF * valorUF;
}

/**
 * Calcula la cotización AFP
 */
function calcularAFP(imponible: number, afpKey: keyof typeof AFP, valorUF: number): number {
  const afpData = AFP[afpKey];
  if (!afpData) return 0;
  
  const tope = calcularTopeImponible(TOPE_IMPOSITIVO.afp_salud, valorUF);
  const imponibleTopeado = Math.min(imponible, tope);
  
  return imponibleTopeado * (afpData.comision / 100);
}

/**
 * Calcula el SIS (Seguro de Invalidez y Sobrevivencia)
 */
function calcularSIS(imponible: number, afpKey: keyof typeof AFP, valorUF: number): number {
  const afpData = AFP[afpKey];
  if (!afpData) return 0;
  
  const tope = calcularTopeImponible(TOPE_IMPOSITIVO.afp_salud, valorUF);
  const imponibleTopeado = Math.min(imponible, tope);
  
  return imponibleTopeado * (afpData.sis / 100);
}

/**
 * Calcula la cotización de salud (FONASA o Isapre)
 */
function calcularSalud(
  imponible: number,
  saludTipo: 'fonasa' | 'isapre',
  saludTramo: 'A' | 'B' | 'C' | 'D',
  isapreMonto: number,
  valorUF: number
): number {
  const tope = calcularTopeImponible(TOPE_IMPOSITIVO.afp_salud, valorUF);
  const imponibleTopeado = Math.min(imponible, tope);
  
  if (saludTipo === 'fonasa') {
    // FONASA: 7% base + cotización adicional según tramo
    const tasaBase = SALUD.fonasa.tasa / 100;
    const tramoData = SALUD.fonasa.tramos[saludTramo.toLowerCase() as keyof typeof SALUD.fonasa.tramos];
    const tasaAdicional = tramoData?.cotizacion || 0;
    
    return imponibleTopeado * (tasaBase + tasaAdicional);
  } else {
    // Isapre: mínimo 7% o el monto del plan en UF
    const minimo7porciento = imponibleTopeado * 0.07;
    const montoPlanUF = isapreMonto || 0;
    const montoPlanCLP = montoPlanUF * valorUF;
    
    return Math.max(minimo7porciento, montoPlanCLP);
  }
}

/**
 * Calcula el seguro de cesantía (S AFC)
 */
function calcularSeguroCesantia(
  imponible: number,
  contratoIndefinido: boolean,
  valorUF: number
): number {
  const tope = calcularTopeImponible(TOPE_IMPOSITIVO.seguro_cesantia, valorUF);
  const imponibleTopeado = Math.min(imponible, tope);
  
  if (contratoIndefinido) {
    return imponibleTopeado * (SEGURO_CESANTIA.contrato_indefinido.trabajador / 100);
  }
  // Contrato a plazo fijo: el trabajador no aporta
  return 0;
}

/**
 * Calcula el impuesto de segunda categoría
 */
function calcularImpuestoSegundaCategoria(
  imponible: number,
  valorUTM: number
): number {
  // Convertir imponible a UTM para aplicar tramos
  const imponibleUTM = imponible / valorUTM;
  
  for (const tramo of IMPUESTO_SEGUNDA_CATEGORIA.tramos) {
    if (imponibleUTM > tramo.desde && imponibleUTM <= tramo.hasta) {
      const exentoUTM = tramo.exento;
      const factor = tramo.factor;
      const rebaja = tramo.rebaja;
      
      // (Renta exenta en UTM * factor) - rebaja en UTM
      const impuestoUTM = ((imponibleUTM - exentoUTM) * factor) - rebaja;
      
      // Convertir de vuelta a CLP
      return Math.max(0, impuestoUTM * valorUTM);
    }
  }
  
  return 0;
}

/**
 * Calcula el sueldo líquido completo
 */
export function calculateSueldoLiquido(input: SueldoLiquidoInput): SueldoLiquidoResult {
  const {
    sueldoBruto,
    afp,
    saludTipo,
    saludTramo = 'A',
    isapreMonto = 0,
    contratoIndefinido = true,
  } = input;
  
  // Valor UF desde constantes centralizadas
  const valorUF = UF.valor;
  const valorUTM = UTM.valor;
  
  // Calcular cada descuento
  const descuentoAFP = calcularAFP(sueldoBruto, afp, valorUF);
  const descuentoSIS = calcularSIS(sueldoBruto, afp, valorUF);
  const descuentoSalud = calcularSalud(sueldoBruto, saludTipo, saludTramo, isapreMonto, valorUF);
  const descuentoSeguroCesantia = calcularSeguroCesantia(sueldoBruto, contratoIndefinido, valorUF);
  
  // Base tributable para impuesto (sueldo - cotizaciones obligatorias)
  const baseTributable = sueldoBruto - descuentoAFP - descuentoSalud - descuentoSeguroCesantia;
  const impuesto = calcularImpuestoSegundaCategoria(baseTributable, valorUTM);
  
  // Total descuentos
  const totalDescuentos = descuentoAFP + descuentoSIS + descuentoSalud + descuentoSeguroCesantia + impuesto;
  
  // Sueldo líquido
  const liquido = sueldoBruto - totalDescuentos;
  
  return {
    bruto: sueldoBruto,
    liquido: Math.round(liquido),
    descuentos: {
      afp: Math.round(descuentoAFP),
      sis: Math.round(descuentoSIS),
      salud: Math.round(descuentoSalud),
      seguroCesantia: Math.round(descuentoSeguroCesantia),
      impuesto: Math.round(impuesto),
    },
    totalDescuentos: Math.round(totalDescuentos),
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function sueldoLiquidoToResults(result: SueldoLiquidoResult): CalculatorResult[] {
  return [
    { label: 'Sueldo Líquido', value: result.liquido, format: 'CLP', highlight: true },
    { label: 'Sueldo Bruto', value: result.bruto, format: 'CLP' },
    { label: 'Descuento AFP', value: result.descuentos.afp, format: 'CLP' },
    { label: 'Seguro Invalidez (SIS)', value: result.descuentos.sis, format: 'CLP' },
    { label: 'Descuento Salud', value: result.descuentos.salud, format: 'CLP' },
    { label: 'Seguro Cesantía', value: result.descuentos.seguroCesantia, format: 'CLP' },
    { label: 'Impuesto 2ª Categoría', value: result.descuentos.impuesto, format: 'CLP' },
    { label: 'Total Descuentos', value: result.totalDescuentos, format: 'CLP' },
  ];
}
