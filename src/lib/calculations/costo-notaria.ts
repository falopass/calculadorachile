// ============================================
// Cálculo de Costo Notaría Compraventa Inmueble Chile 2026
// ============================================

import { UTM } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface CostoNotariaInput {
  valorPropiedad: number;
  tipo: 'compraventa' | 'hipoteca' | 'donacion' | 'testamento';
  notariaAdicional?: boolean;
}

export interface CostoNotariaResult {
  valorPropiedad: number;
  tipo: string;
  costoNotarial: number;
  derechosRegistrales: number;
  impuestoTimbres: number;
  notariaAdicional: boolean;
  costoTotal: number;
}

/**
 * Costos notariales mínimos y máximos en CLP
 */
const COSTO_NOTARIAL_MIN = 50000;
const COSTO_NOTARIAL_MAX = 2000000;
const COSTO_NOTARIAL_MIN_HIPOTECA = 100000;

/**
 * Derechos registrales mínimos
 */
const DERECHOS_REGISTRALES_MIN = 30000;

/**
 * Tasa de impuesto de timbres y estampillas para mutuos hipotecarios.
 * 0,066% mensual con tope 0,8% anual (DL 3475 Art. 1 N°3).
 * La compraventa de inmuebles está EXENTA (Art. 24 N°6).
 */
const TASA_TIMBRES_HIPOTECA_ANUAL = 0.8;
void TASA_TIMBRES_HIPOTECA_ANUAL;

/**
 * Porcentaje adicional por notaría adicional (copias, trámites extra)
 */
const RECARGO_NOTARIA_ADICIONAL = 0.15;

/**
 * Calcula el costo notarial según tipo de trámite y valor de la propiedad
 *
 * Los aranceles notariales se calculan como un porcentaje del valor de la
 * propiedad, con montos mínimos y máximos establecidos por ley.
 * Se suman los derechos registrales y el impuesto de timbres según corresponda.
 *
 * Base legal: Arancel de Notarios (DFL 292/1931), Ley de Timbres (DL 3475/1980)
 *
 * @param input - Datos para el cálculo de costos notariales
 * @returns Desglose completo de los costos notariales
 */
export function calculateCostoNotaria(input: CostoNotariaInput): CostoNotariaResult {
  const {
    valorPropiedad,
    tipo,
    notariaAdicional = false,
  } = input;

  // Validar rango
  const valor = Math.max(0, valorPropiedad);

  // Calcular costo notarial base según tipo
  let costoNotarial = 0;
  let impuestoTimbres = 0;

  switch (tipo) {
    case 'compraventa': {
      // Compraventa: 0.2% a 0.5% del valor según rango progresivo
      if (valor <= 500000000) {
        costoNotarial = valor * 0.005;
      } else if (valor <= 1000000000) {
        costoNotarial = valor * 0.003;
      } else {
        costoNotarial = valor * 0.002;
      }
      costoNotarial = Math.max(COSTO_NOTARIAL_MIN, Math.min(costoNotarial, COSTO_NOTARIAL_MAX));

      // Compraventa de inmuebles: EXENTA del impuesto de timbres
      // (Art. 24 N°6 DL 3475/1980). El bug anterior aplicaba 0,2%
      // sobre el valor, lo que era incorrecto.
      impuestoTimbres = 0;
      break;
    }
    case 'hipoteca': {
      // Hipoteca: 0.3% del monto, mínimo $100.000
      costoNotarial = Math.max(COSTO_NOTARIAL_MIN_HIPOTECA, valor * 0.003);
      // Mutuo hipotecario: paga impuesto de timbres y estampillas.
      // Tasa 0,066% por mes hasta tope 0,8% anual (DL 3475 Art. 1 N°3).
      // Aproximación práctica: 0,8% del monto del mutuo.
      impuestoTimbres = valor * 0.008;
      break;
    }
    case 'donacion': {
      // Donación: similar a compraventa con mínimo elevado
      costoNotarial = Math.max(100000, valor * 0.004);
      costoNotarial = Math.min(costoNotarial, COSTO_NOTARIAL_MAX);
      impuestoTimbres = 0;
      break;
    }
    case 'testamento': {
      // Testamento: tarifa fija según UTM
      costoNotarial = Math.round(2 * UTM.valor);
      impuestoTimbres = 0;
      break;
    }
  }

  // Derechos registrales: 0.2% del valor, mínimo $30.000
  const derechosRegistrales = Math.max(DERECHOS_REGISTRALES_MIN, valor * 0.002);

  // Recargo por notaría adicional (copias autorizadas, trámites extra)
  if (notariaAdicional) {
    costoNotarial = Math.round(costoNotarial * (1 + RECARGO_NOTARIA_ADICIONAL));
  }

  // Costo total
  const costoTotal = Math.round(costoNotarial) + Math.round(derechosRegistrales) + Math.round(impuestoTimbres);

  // Etiqueta legible del tipo
  const tipoLabels: Record<string, string> = {
    compraventa: 'Compraventa',
    hipoteca: 'Hipoteca',
    donacion: 'Donación',
    testamento: 'Testamento',
  };

  return {
    valorPropiedad: Math.round(valor),
    tipo: tipoLabels[tipo],
    costoNotarial: Math.round(costoNotarial),
    derechosRegistrales: Math.round(derechosRegistrales),
    impuestoTimbres: Math.round(impuestoTimbres),
    notariaAdicional,
    costoTotal,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function costoNotariaToResults(result: CostoNotariaResult): CalculatorResult[] {
  return [
    {
      label: 'Costo Total',
      value: result.costoTotal,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Costo Notarial',
      value: result.costoNotarial,
      format: 'CLP',
    },
    {
      label: 'Derechos Registrales',
      value: result.derechosRegistrales,
      format: 'CLP',
    },
    {
      label: 'Impuesto Timbres',
      value: result.impuestoTimbres,
      format: 'CLP',
    },
    {
      label: 'Valor Propiedad',
      value: result.valorPropiedad,
      format: 'CLP',
    },
    {
      label: 'Tipo de Trámite',
      value: 0,
      format: 'number',
    },
  ];
}
