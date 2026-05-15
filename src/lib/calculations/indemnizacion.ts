// ============================================
// Cálculo de Indemnización por Años de Servicio Chile 2026
// ============================================

import { INDEMNIZACION, UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface IndemnizacionInput {
  ultimoSueldo: number;
  añosTrabajados: number;
  incluyeGratificacion: boolean;
  gratificacionMensual?: number;
}

export interface IndemnizacionResult {
  ultimoSueldo: number;
  baseCalculo: number;
  añosTrabajados: number;
  añosIndemnizables: number;
  diasIndemnizacion: number;
  valorDia: number;
  indemnizacionTotal: number;
  topeDias: number;
  topeUF: number;
  topeMonto: number;
  aplicaTope: boolean;
}

/**
 * Calcula la indemnización por años de servicio según Art. 163 Código del Trabajo
 * 
 * La indemnización equivale a 30 días de la última remuneración mensual por cada año trabajado.
 * - Tope máximo: 11 años (330 días)
 * - Base de cálculo: último sueldo bruto (con gratificación si aplica)
 * - Tope imponible: 90 UF mensuales
 * 
 * @param input - Datos para el cálculo
 * @returns Desglose completo de la indemnización
 */
export function calculateIndemnizacion(input: IndemnizacionInput): IndemnizacionResult {
  const { ultimoSueldo, añosTrabajados, incluyeGratificacion, gratificacionMensual = 0 } = input;
  
  // Base de cálculo: sueldo + gratificación si aplica
  const baseCalculo = incluyeGratificacion ? ultimoSueldo + gratificacionMensual : ultimoSueldo;
  
  // Aplicar tope legal (Art. 172 CdT)
  const topeUF = INDEMNIZACION.tope_uf_mensual;
  const topeMonto = topeUF * UF.valor;
  const baseTopeada = Math.min(baseCalculo, topeMonto);
  
  // Años indemnizables (tope 11 años)
  const añosIndemnizables = Math.min(añosTrabajados, INDEMNIZACION.tope_años);
  
  // Días de indemnización (30 días por año)
  const diasIndemnizacion = añosIndemnizables * INDEMNIZACION.dias_por_año;
  const topeDias = INDEMNIZACION.tope_años * INDEMNIZACION.dias_por_año;
  
  // Valor por día
  const valorDia = baseTopeada / 30;
  
  // Indemnización total
  const indemnizacionTotal = valorDia * diasIndemnizacion;
  
  // Verificar si aplica tope
  const aplicaTope = añosTrabajados > INDEMNIZACION.tope_años || baseCalculo > topeMonto;
  
  return {
    ultimoSueldo,
    baseCalculo: Math.round(baseCalculo),
    añosTrabajados,
    añosIndemnizables,
    diasIndemnizacion,
    valorDia: Math.round(valorDia),
    indemnizacionTotal: Math.round(indemnizacionTotal),
    topeDias,
    topeUF,
    topeMonto: Math.round(topeMonto),
    aplicaTope,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function indemnizacionToResults(result: IndemnizacionResult): CalculatorResult[] {
  return [
    {
      label: 'Indemnización Total',
      value: result.indemnizacionTotal,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Días de Indemnización',
      value: result.diasIndemnizacion,
      format: 'days',
    },
    {
      label: 'Valor por Día',
      value: result.valorDia,
      format: 'CLP',
    },
    {
      label: 'Años Indemnizables',
      value: result.añosIndemnizables,
      format: 'number',
    },
    {
      label: 'Base de Cálculo',
      value: result.baseCalculo,
      format: 'CLP',
    },
    {
      label: 'Último Sueldo',
      value: result.ultimoSueldo,
      format: 'CLP',
    },
    {
      label: 'Tope (90 UF)',
      value: result.topeMonto,
      format: 'CLP',
    },
  ];
}
