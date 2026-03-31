// ============================================
// Cálculo de Subsidio Habitacional DS49/DS01 Chile 2026
// ============================================

import { UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface SubsidioHabitacionalInput {
  valorPropiedad: number;
  ahorro: number;
  tramo: 'tramo1' | 'tramo2' | 'tramo3';
  esZonaExtrema?: boolean;
}

export interface SubsidioHabitacionalResult {
  valorPropiedadUF: number;
  ahorroUF: number;
  tramo: string;
  subsidioBaseUF: number;
  bonoZonaExtremaUF: number;
  subsidioTotalUF: number;
  subsidioCLP: number;
  ahorroRequeridoUF: number;
  ahorroRequeridoCLP: number;
  montoMaximoPropiedadUF: number;
  montoMaximoPropiedadCLP: number;
  deficitUF: number;
  deficitCLP: number;
  cumpleRequisitos: boolean;
}

/**
 * Parámetros de los tramos del subsidio habitacional
 * Base legal: DS49 (Viviendas nuevas) y DS01 (Viviendas usadas)
 */
const TRAMOS_SUBSIDIO = {
  tramo1: {
    label: 'Tramo 1',
    subsidioBase: 500,      // UF
    maxPropiedad: 2400,     // UF
    ahorroRequerido: 40,    // UF mínimo
    bonoZonaExtrema: 100,   // UF adicional
  },
  tramo2: {
    label: 'Tramo 2',
    subsidioBase: 400,      // UF
    maxPropiedad: 2000,     // UF
    ahorroRequerido: 80,    // UF mínimo
    bonoZonaExtrema: 80,    // UF adicional
  },
  tramo3: {
    label: 'Tramo 3',
    subsidioBase: 300,      // UF
    maxPropiedad: 1600,     // UF
    ahorroRequerido: 120,   // UF mínimo
    bonoZonaExtrema: 60,    // UF adicional
  },
};

/**
 * Calcula el subsidio habitacional según tramo y condiciones
 *
 * El subsidio habitacional es un aporte del Estado para facilitar la compra
 * de vivienda. El monto depende del tramo, la zona y el ahorro acumulado.
 * Los tramos varían en monto base, máximo de propiedad y ahorro requerido.
 * Zonas extremas (Magallanes, Aysén, Arica) reciben un bono adicional.
 *
 * Base legal: DS49 (Viviendas nuevas), DS01 (Viviendas usadas), MINVU
 *
 * @param input - Datos para el cálculo del subsidio habitacional
 * @returns Desglose completo del subsidio y requisitos
 */
export function calculateSubsidioHabitacional(
  input: SubsidioHabitacionalInput
): SubsidioHabitacionalResult {
  const {
    valorPropiedad,
    ahorro,
    tramo,
    esZonaExtrema = false,
  } = input;

  // Validar rangos
  const propiedad = Math.max(0, valorPropiedad);
  const ahorroVal = Math.max(0, ahorro);

  const valorUF = UF.valor;

  // Obtener datos del tramo
  const datosTramo = TRAMOS_SUBSIDIO[tramo];

  // Convertir a UF
  const valorPropiedadUF = Math.round((propiedad / valorUF) * 100) / 100;
  const ahorroUF = Math.round((ahorroVal / valorUF) * 100) / 100;

  // Subsidio base + bono zona extrema
  const subsidioBaseUF = datosTramo.subsidioBase;
  const bonoZonaExtremaUF = esZonaExtrema ? datosTramo.bonoZonaExtrema : 0;
  const subsidioTotalUF = subsidioBaseUF + bonoZonaExtremaUF;

  // Convertir subsidio a CLP
  const subsidioCLP = Math.round(subsidioTotalUF * valorUF);

  // Ahorro requerido
  const ahorroRequeridoUF = datosTramo.ahorroRequerido;
  const ahorroRequeridoCLP = Math.round(ahorroRequeridoUF * valorUF);

  // Monto máximo de propiedad
  const montoMaximoPropiedadUF = datosTramo.maxPropiedad;
  const montoMaximoPropiedadCLP = Math.round(montoMaximoPropiedadUF * valorUF);

  // Calcular déficit (lo que falta para comprar = propiedad - subsidio - ahorro)
  const deficitUF = Math.max(0, Math.round((valorPropiedadUF - subsidioTotalUF - ahorroUF) * 100) / 100);
  const deficitCLP = Math.round(deficitUF * valorUF);

  // Verificar cumplimiento de requisitos básicos
  const cumpleRequisitos =
    ahorroUF >= ahorroRequeridoUF &&
    valorPropiedadUF <= montoMaximoPropiedadUF;

  return {
    valorPropiedadUF,
    ahorroUF,
    tramo: datosTramo.label,
    subsidioBaseUF,
    bonoZonaExtremaUF,
    subsidioTotalUF,
    subsidioCLP,
    ahorroRequeridoUF,
    ahorroRequeridoCLP,
    montoMaximoPropiedadUF,
    montoMaximoPropiedadCLP,
    deficitUF,
    deficitCLP,
    cumpleRequisitos,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function subsidioHabitacionalToResults(result: SubsidioHabitacionalResult): CalculatorResult[] {
  return [
    {
      label: 'Subsidio Total',
      value: result.subsidioCLP,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Subsidio Total (UF)',
      value: result.subsidioTotalUF,
      format: 'UF',
      highlight: true,
    },
    {
      label: 'Déficit (UF)',
      value: result.deficitUF,
      format: 'UF',
    },
    {
      label: 'Déficit',
      value: result.deficitCLP,
      format: 'CLP',
    },
    {
      label: 'Ahorro Requerido (UF)',
      value: result.ahorroRequeridoUF,
      format: 'UF',
    },
    {
      label: 'Máx. Propiedad (UF)',
      value: result.montoMaximoPropiedadUF,
      format: 'UF',
    },
    {
      label: 'Valor Propiedad (UF)',
      value: result.valorPropiedadUF,
      format: 'UF',
    },
    {
      label: 'Ahorro (UF)',
      value: result.ahorroUF,
      format: 'UF',
    },
  ];
}
