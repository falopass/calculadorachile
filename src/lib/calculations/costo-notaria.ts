// ============================================
// Cálculo de Costo Notaría Compraventa Inmueble Chile 2026
// ============================================

import { UTM, ARANCEL_NOTARIOS } from '@/lib/values/constants';
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
 * Calcula el costo notarial según tipo de trámite y valor de la propiedad.
 *
 * Todos los aranceles, mínimos, máximos y tasas vienen de
 * `ARANCEL_NOTARIOS` en constants.ts (Arancel de Notarios DFL 292/1931
 * + Ley de Timbres DL 3475/1980).
 *
 * Reglas:
 *  - Compraventa de inmuebles: tasa progresiva 0,5% / 0,3% / 0,2%.
 *    EXENTA del impuesto de timbres (DL 3475 Art. 24 N°6).
 *  - Mutuo hipotecario: 0,3% notarial + impuesto de timbres 0,8%
 *    anual (DL 3475 Art. 1 N°3).
 *  - Donación: 0,4% notarial, sin impuesto de timbres.
 *  - Testamento: tarifa fija 2 UTM, sin impuesto de timbres.
 */
export function calculateCostoNotaria(input: CostoNotariaInput): CostoNotariaResult {
  const {
    valorPropiedad,
    tipo,
    notariaAdicional = false,
  } = input;

  const valor = Math.max(0, valorPropiedad);

  let costoNotarial = 0;
  let impuestoTimbres = 0;

  switch (tipo) {
    case 'compraventa': {
      // Tasa progresiva por tramos (definidos en ARANCEL_NOTARIOS).
      let tasa = ARANCEL_NOTARIOS.compraventa_tramos[
        ARANCEL_NOTARIOS.compraventa_tramos.length - 1
      ].tasa;
      for (const tramo of ARANCEL_NOTARIOS.compraventa_tramos) {
        if (valor <= tramo.hasta_clp) {
          tasa = tramo.tasa;
          break;
        }
      }
      costoNotarial = valor * (tasa / 100);
      costoNotarial = Math.max(
        ARANCEL_NOTARIOS.costo_minimo_clp,
        Math.min(costoNotarial, ARANCEL_NOTARIOS.costo_maximo_clp),
      );
      // Compraventa de inmuebles: EXENTA del impuesto de timbres.
      impuestoTimbres = 0;
      break;
    }
    case 'hipoteca': {
      costoNotarial = Math.max(
        ARANCEL_NOTARIOS.hipoteca_minimo_clp,
        valor * (ARANCEL_NOTARIOS.hipoteca_tasa / 100),
      );
      // Mutuo hipotecario: 0,066% mensual hasta tope 0,8% anual.
      // Aproximación práctica: 0,8% del monto del mutuo.
      impuestoTimbres = valor * (ARANCEL_NOTARIOS.timbres_hipoteca_anual / 100);
      break;
    }
    case 'donacion': {
      costoNotarial = Math.max(
        ARANCEL_NOTARIOS.donacion_minimo_clp,
        valor * (ARANCEL_NOTARIOS.donacion_tasa / 100),
      );
      costoNotarial = Math.min(costoNotarial, ARANCEL_NOTARIOS.costo_maximo_clp);
      impuestoTimbres = 0;
      break;
    }
    case 'testamento': {
      // Tarifa fija expresada en UTM.
      costoNotarial = Math.round(ARANCEL_NOTARIOS.testamento_utm * UTM.valor);
      impuestoTimbres = 0;
      break;
    }
  }

  // Derechos registrales del Conservador de Bienes Raíces.
  const derechosRegistrales = Math.max(
    ARANCEL_NOTARIOS.derechos_registrales_minimo_clp,
    valor * (ARANCEL_NOTARIOS.derechos_registrales_tasa / 100),
  );

  // Recargo por copias autorizadas / trámites adicionales.
  if (notariaAdicional) {
    costoNotarial = Math.round(
      costoNotarial * (1 + ARANCEL_NOTARIOS.recargo_notaria_adicional / 100),
    );
  }

  const costoTotal =
    Math.round(costoNotarial) +
    Math.round(derechosRegistrales) +
    Math.round(impuestoTimbres);

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
