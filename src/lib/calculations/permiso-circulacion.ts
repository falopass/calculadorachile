// ============================================
// Cálculo de Permiso de Circulación Chile 2026
// ============================================

import { UTM, INGRESO_MINIMO
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface PermisoCirculacionInput {
  valorVehiculo: number;
  tipoVehiculo: 'automovil' | 'motocicleta' | 'carga' | 'bus' | 'taxi' | 'camion';
  antiguedadVehiculo: number;
  esZonaCarga: boolean;
  esPrimeraVez: boolean;
}

export interface PermisoCirculacionResult {
  valorVehiculo: number;
  tipoVehiculo: string;
  antiguedadVehiculo: number;
  factorAntiguedad: number;
  montoBase: number;
  descuentoAntiguedad: number;
  recargoZonaCarga: number;
  recargoPrimeraVez: number;
  permisoTotal: number;
  valorUTM: number;
}

/**
 * Calcula el permiso de circulación según tipo de vehículo
 * 
 * El permiso de circulación es un impuesto anual que deben pagar los personas propietarias de vehículos
 * para circular en vías públicas. El monto depende del tipo de vehículo y su valor.
 * 
 * Base legal: Ley de Tránsito y Municipalidades
 * 
 * @param input - Datos para el cálculo del permiso
 * @returns Desglose completo del permiso de circulación
 */
export function calculatePermisoCirculacion(input: PermisoCirculacionInput): PermisoCirculacionResult {
  const { valorVehiculo, tipoVehiculo, antiguedadVehiculo, esZonaCarga, esPrimeraVez } = input;
  
  const valorUTM = UTM.valor;
  
  // Factores según tipo de vehículo (en UTM)
  const factoresPorTipo: Record<string, number> = {
    automovil: 2.5, // 2.5 UTM por cada $1 millón de valor
    motocicleta: 0.5, // 0.5 UTM por cada $1 millón de valor
    carga: 1.0, // 1.0 UTM por cada $1 millón de valor
    bus: 0.5, // 0.5 UTM por cada $1 millón de valor
    taxi: 0.1, // 0.1 UTM por cada $1 millón de valor
    camion: 1.0, // 1.0 UTM por cada $1 millón de valor
  };
  
  // Obtener factor según tipo
  const factorBase = factoresPorTipo[tipoVehiculo] || 2.5;
  
  // Calcular monto base en UTM
  const montoBaseUTM = (valorVehiculo / 1000000) * factorBase;
  const montoBase = montoBaseUTM * valorUTM;
  
  // Descuento por antigüedadad (hasta 50% para vehículos > 20 años)
  let factorAntiguedad = 0;
  if (antiguedadVehiculo >= 20) {
    factorAntiguedad = 0.5; // 50% de descuento
  }
  
  const descuentoAntiguedad = montoBase * factorAntiguedad;
  
  // Recargo zona de carga (aproximadamente 20%)
  const recargoZonaCarga = esZonaCarga ? montoBase * 0.2 : 0;
  
  // Recargo primera vez (aproximadamente 50%)
  const recargoPrimeraVez = esPrimeraVez ? montoBase * 0.5 : 0;
  
  // Permiso total
  const permisoTotal = montoBase - descuentoAntiguedad + recargoZonaCarga + recargoPrimeraVez;
  
  return {
    valorVehiculo,
    tipoVehiculo,
    antiguedadVehiculo,
    factorAntiguedad,
    montoBase: Math.round(montoBase),
    descuentoAntiguedad: Math.round(descuentoAntiguedad),
    recargoZonaCarga: Math.round(recargoZonaCarga),
    recargoPrimeraVez: Math.round(recargoPrimeraVez),
    permisoTotal: Math.round(permisoTotal),
    valorUTM,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function permisoCirculacionToResults(result: PermisoCirculacionResult): CalculatorResult[] {
  return [
    {
      label: 'Permiso Total',
      value: result.permisoTotal,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Monto Base',
      value: result.montoBase,
      format: 'CLP',
    },
    {
      label: 'Descuento Antigüedad',
      value: result.descuentoAntiguedad,
      format: 'CLP',
    },
    {
      label: 'Recargo Zona Carga',
      value: result.recargoZonaCarga,
      format: 'CLP',
    },
    {
      label: 'Recargo Primera Vez',
      value: result.recargoPrimeraVez,
      format: 'CLP',
    },
    {
      label: 'Valor Vehículo',
      value: result.valorVehiculo,
      format: 'CLP',
    },
    {
      label: 'Antigüedad',
      value: result.antiguedadVehiculo,
      format: 'number',
    },
  ];
}
