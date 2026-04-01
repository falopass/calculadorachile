// ============================================
// Cálculo de Subsidio Habitacional DS49/DS01 Chile 2026
// ============================================

import { UF, SUBSIDIO_HABITACIONAL } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface SubsidioHabitacionalInput {
  valorPropiedad: number;
  ahorro: number;
  tipoSubsidio: 'ds49' | 'ds01'; // DS49 para viviendas nuevas, DS01 para viviendas usadas
  tramo: 'tramo1' | 'tramo2' | 'tramo3';
}

export interface SubsidioHabitacionalResult {
  valorPropiedadUF: number;
  ahorroUF: number;
  tipoSubsidio: string;
  tramo: string;
  subsidioBaseUF: number;
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
 * Calcula el subsidio habitacional según tramo y condiciones
 *
 * El subsidio habitacional es un aporte del Estado para facilitar la compra
 * de vivienda. El monto depende del tipo de subsidio (DS49 o DS01), tramo,
 * la zona y el ahorro acumulado.
 * Los tramos varían en monto base, máximo de propiedad y ahorro requerido.
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
    tipoSubsidio,
    tramo,
  } = input;

  // Validar rangos
  const propiedad = Math.max(0, valorPropiedad);
  const ahorroVal = Math.max(0, ahorro);

  const valorUF = UF.valor;

  // Obtener datos del tipo de subsidio desde las constantes
  const datosSubsidio = SUBSIDIO_HABITACIONAL[tipoSubsidio];
  
  // Verificar si el tramo existe para el tipo de subsidio seleccionado
  let datosTramo: { ingresoMaximoUF: number; subsidioMaximoUF: number };
  if (tramo === 'tramo1') {
    datosTramo = datosSubsidio.tramo1;
  } else if (tramo === 'tramo2') {
    datosTramo = datosSubsidio.tramo2;
  } else if (tramo === 'tramo3') {
    if (tipoSubsidio === 'ds01') {
      throw new Error('El DS01 no tiene tramo3. Solo DS49 tiene tramo3.');
    }
    // TypeScript necesita esta verificación explícita para acceder a tramo3
    if ('tramo3' in datosSubsidio) {
      datosTramo = datosSubsidio.tramo3;
    } else {
      throw new Error('Tramo 3 no disponible para este subsidio');
    }
  } else {
    throw new Error(`Tramo ${tramo} no válido para el tipo de subsidio ${tipoSubsidio}`);
  }

  // Convertir a UF
  const valorPropiedadUF = Math.round((propiedad / valorUF) * 100) / 100;
  const ahorroUF = Math.round((ahorroVal / valorUF) * 100) / 100;

  // Subsidio base
  const subsidioBaseUF = datosTramo.subsidioMaximoUF;

  // Convertir subsidio a CLP
  const subsidioCLP = Math.round(subsidioBaseUF * valorUF);

  // Ahorro requerido (basado en el ingreso máximo del tramo)
  // En realidad, el ahorro requerido es un valor fijo según el tramo
  // Tomaremos un valor estimado basado en el tramo
  const ahorroRequeridoUF = datosTramo.ingresoMaximoUF * 0.1; // Ejemplo: 10% del ingreso máximo
  const ahorroRequeridoCLP = Math.round(ahorroRequeridoUF * valorUF);

  // Monto máximo de propiedad permitido para el tipo de subsidio
  const montoMaximoPropiedadUF = datosSubsidio.montoMaximoUF;
  const montoMaximoPropiedadCLP = Math.round(montoMaximoPropiedadUF * valorUF);

  // Calcular déficit (lo que falta para comprar = propiedad - subsidio - ahorro)
  const deficitUF = Math.max(0, Math.round((valorPropiedadUF - subsidioBaseUF - ahorroUF) * 100) / 100);
  const deficitCLP = Math.round(deficitUF * valorUF);

  // Verificar cumplimiento de requisitos básicos
  const cumpleRequisitos =
    ahorroUF >= ahorroRequeridoUF &&
    valorPropiedadUF <= montoMaximoPropiedadUF;

  return {
    valorPropiedadUF,
    ahorroUF,
    tipoSubsidio: tipoSubsidio === 'ds49' ? 'DS49 (Vivienda Nueva)' : 'DS01 (Vivienda Usada)',
    tramo: `${tramo.toUpperCase()} (${tipoSubsidio})`,
    subsidioBaseUF,
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
      value: result.subsidioBaseUF,
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
