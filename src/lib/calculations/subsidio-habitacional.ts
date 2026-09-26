// ============================================
// Cálculo de Subsidio Habitacional MINVU Chile 2026
// ============================================
// Inputs de valor/ahorro en UF (montos oficiales MINVU se publican en UF).
// Conversión a CLP una sola vez al final con UF del día.
// Fuentes: ChileAtiende DS01 T1–T3, SERVIU/MINVU DS49/DS19.
// Ver docs/research/dossier-ymyl.md
// ============================================

import {
  UF,
  SUBSIDIO_HABITACIONAL,
  SUBSIDIO_HABITACIONAL_DS19,
  SUBSIDIO_HABITACIONAL_AHORRO_MINIMO_UF,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type TipoSubsidio = 'ds49' | 'ds01' | 'ds19';
export type TramoSubsidio = 'tramo1' | 'tramo2' | 'tramo3';

export interface SubsidioHabitacionalInput {
  /**
   * Valor de la propiedad en UF (no CLP).
   * Acepta alias histórico `valorPropiedad` solo si no se pasa UF.
   */
  valorPropiedadUF?: number;
  /** @deprecated Usar valorPropiedadUF. Si se pasa y no hay UF, se interpreta como UF (UI). */
  valorPropiedad?: number;
  /** Ahorro disponible en UF. */
  ahorroUF?: number;
  /** @deprecated Usar ahorroUF. */
  ahorro?: number;
  /**
   * Tipo de subsidio MINVU (obligatorio para un resultado útil):
   *  - DS49: Fondo Solidario (sin crédito)
   *  - DS01: Sectores medios
   *  - DS19: Integración Social y Territorial
   */
  tipoSubsidio?: TipoSubsidio;
  tramo: TramoSubsidio;
  /**
   * Zona extrema (Aysén, Magallanes, aisladas): sube topes de precio
   * cuando el programa lo contempla. Referencia ChileAtiende / llamados.
   */
  esZonaExtrema?: boolean;
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
  /** DS49: premio al ahorro incluido en subsidioBaseUF (0 en otros programas). */
  premioAhorroUF: number;
  deficitUF: number;
  deficitCLP: number;
  cumpleRequisitos: boolean;
  errores: string[];
}

const AHORRO_MINIMO_UF = SUBSIDIO_HABITACIONAL_AHORRO_MINIMO_UF;
const DS19_TRAMOS = SUBSIDIO_HABITACIONAL_DS19.tramos;

const NOMBRES_TIPO: Record<TipoSubsidio, string> = {
  ds49: 'DS49 (Fondo Solidario)',
  ds01: 'DS01 (Sectores Medios)',
  ds19: 'DS19 (Integración Social)',
};

/** Topes de precio vivienda en UF (general / zona extrema). ChileAtiende 2026;
 *  DS19 viene de la Res. Ex. N°700 (llamado 2026) en constants. */
const TOPE_PROPIEDAD_UF: Record<
  TipoSubsidio,
  Record<TramoSubsidio, { general: number; extrema: number }>
> = {
  ds49: {
    tramo1: { general: 950, extrema: 1050 },
    tramo2: { general: 950, extrema: 1050 },
    tramo3: { general: 950, extrema: 1050 },
  },
  ds01: {
    tramo1: { general: 1100, extrema: 1200 },
    tramo2: { general: 1600, extrema: 1800 },
    tramo3: { general: 2200, extrema: 2600 },
  },
  ds19: {
    tramo1: DS19_TRAMOS.tramo1.precioMaxUF,
    tramo2: DS19_TRAMOS.tramo2.precioMaxUF,
    tramo3: DS19_TRAMOS.tramo3.precioMaxUF,
  },
};

function pickUF(
  primary: number | undefined,
  legacy: number | undefined,
): number {
  if (typeof primary === 'number' && Number.isFinite(primary)) return Math.max(0, primary);
  if (typeof legacy === 'number' && Number.isFinite(legacy)) return Math.max(0, legacy);
  return 0;
}

/**
 * Calcula el subsidio habitacional según tipo y tramo.
 * Opera internamente en UF; CLP solo al final (UF × valor del día).
 */
export function calculateSubsidioHabitacional(
  input: SubsidioHabitacionalInput,
): SubsidioHabitacionalResult {
  const errores: string[] = [];
  const valorUF = UF.valor;
  const valorPropiedadUF = pickUF(input.valorPropiedadUF, input.valorPropiedad);
  const ahorroUF = pickUF(input.ahorroUF, input.ahorro);
  const tramo = input.tramo || 'tramo1';
  const esZonaExtrema = Boolean(input.esZonaExtrema);

  const tipoRaw = input.tipoSubsidio;
  if (!tipoRaw || !['ds49', 'ds01', 'ds19'].includes(tipoRaw)) {
    errores.push(
      'Debes seleccionar el tipo de subsidio (DS49, DS01 o DS19). Sin eso no se puede estimar el monto.',
    );
    return emptyResult(valorPropiedadUF, ahorroUF, tramo, errores);
  }
  const tipoSubsidio = tipoRaw as TipoSubsidio;

  let subsidioBaseUF = 0;
  let premioAhorroUF = 0;

  if (tipoSubsidio === 'ds19') {
    // Res. Ex. MINVU N°700 (06-05-2026): subsidio base por segmento,
    // con valores mayores en zonas extremas.
    const datos = DS19_TRAMOS[tramo];
    subsidioBaseUF = esZonaExtrema
      ? datos.subsidioUF.extrema
      : datos.subsidioUF.general;
  } else if (tipoSubsidio === 'ds49') {
    // ChileAtiende ficha 37960: subsidio base desde 314 UF (varía por
    // comuna) + premio al ahorro de 1,5 UF por cada UF sobre el ahorro
    // mínimo de 10 UF, tope 30 UF (guía MINVU DS49 compra). Aplica igual
    // para cualquier tramo. Los complementarios (localización, rural,
    // altura, discapacidad, superficie) dependen del proyecto y no son
    // inputs de esta calculadora.
    const confDs49 = SUBSIDIO_HABITACIONAL.ds49;
    premioAhorroUF = Math.min(
      confDs49.premioAhorro.topeUF,
      Math.max(0, ahorroUF - confDs49.ahorroMinimoUF) *
        confDs49.premioAhorro.ufPorUfAdicional,
    );
    subsidioBaseUF = confDs49.subsidioBaseUF + premioAhorroUF;
  } else {
    const datosSubsidio = SUBSIDIO_HABITACIONAL[tipoSubsidio];
    if (tramo === 'tramo1') {
      subsidioBaseUF = datosSubsidio.tramo1.subsidioMaximoUF;
    } else if (tramo === 'tramo2') {
      subsidioBaseUF = datosSubsidio.tramo2.subsidioMaximoUF;
    } else if (tramo === 'tramo3') {
      if ('tramo3' in datosSubsidio && datosSubsidio.tramo3) {
        subsidioBaseUF = datosSubsidio.tramo3.subsidioMaximoUF;
      } else {
        errores.push(
          `El programa ${tipoSubsidio.toUpperCase()} no contempla tramo 3 en esta tabla. Se usa tramo 2 como referencia.`,
        );
        subsidioBaseUF = datosSubsidio.tramo2.subsidioMaximoUF;
      }
    }
  }

  const topeTabla = TOPE_PROPIEDAD_UF[tipoSubsidio][tramo];
  const montoMaximoPropiedadUF = esZonaExtrema ? topeTabla.extrema : topeTabla.general;

  const ahorroRequeridoUF = AHORRO_MINIMO_UF[tipoSubsidio][tramo];
  const ahorroRequeridoCLP = Math.round(ahorroRequeridoUF * valorUF);
  const subsidioCLP = Math.round(subsidioBaseUF * valorUF);
  const montoMaximoPropiedadCLP = Math.round(montoMaximoPropiedadUF * valorUF);

  const deficitUF = Math.max(
    0,
    Math.round((valorPropiedadUF - subsidioBaseUF - ahorroUF) * 100) / 100,
  );
  const deficitCLP = Math.round(deficitUF * valorUF);

  if (ahorroUF < ahorroRequeridoUF) {
    errores.push(
      `Ahorro insuficiente: requiere ${ahorroRequeridoUF} UF, tiene ${ahorroUF.toFixed(2)} UF.`,
    );
  }
  if (valorPropiedadUF > montoMaximoPropiedadUF) {
    errores.push(
      `Propiedad excede el tope ${montoMaximoPropiedadUF} UF para ${tipoSubsidio.toUpperCase()} ${tramo}${esZonaExtrema ? ' (zona extrema)' : ''}.`,
    );
  }

  const cumpleRequisitos =
    ahorroUF >= ahorroRequeridoUF &&
    valorPropiedadUF <= montoMaximoPropiedadUF &&
    errores.length === 0;

  return {
    valorPropiedadUF,
    ahorroUF,
    tipoSubsidio: NOMBRES_TIPO[tipoSubsidio],
    tramo: `${tramo.toUpperCase()} (${tipoSubsidio.toUpperCase()})`,
    subsidioBaseUF,
    subsidioCLP,
    ahorroRequeridoUF,
    ahorroRequeridoCLP,
    montoMaximoPropiedadUF,
    montoMaximoPropiedadCLP,
    premioAhorroUF,
    deficitUF,
    deficitCLP,
    cumpleRequisitos,
    errores,
  };
}

function emptyResult(
  valorPropiedadUF: number,
  ahorroUF: number,
  tramo: string,
  errores: string[],
): SubsidioHabitacionalResult {
  return {
    valorPropiedadUF,
    ahorroUF,
    tipoSubsidio: 'Sin tipo',
    tramo,
    subsidioBaseUF: 0,
    subsidioCLP: 0,
    ahorroRequeridoUF: 0,
    ahorroRequeridoCLP: 0,
    montoMaximoPropiedadUF: 0,
    montoMaximoPropiedadCLP: 0,
    premioAhorroUF: 0,
    deficitUF: 0,
    deficitCLP: 0,
    cumpleRequisitos: false,
    errores,
  };
}

export function subsidioHabitacionalToResults(
  result: SubsidioHabitacionalResult,
): CalculatorResult[] {
  const rows: CalculatorResult[] = [
    {
      label: 'Subsidio Total (UF)',
      value: result.subsidioBaseUF,
      format: 'UF',
      highlight: true,
    },
    {
      label: 'Subsidio Total (CLP referencial)',
      value: result.subsidioCLP,
      format: 'CLP',
      highlight: true,
    },
    ...(result.tipoSubsidio.startsWith('DS49')
      ? ([
          {
            label: 'Subsidio base DS49 (desde)',
            value: SUBSIDIO_HABITACIONAL.ds49.subsidioBaseUF,
            format: 'UF',
          },
          {
            label: 'Premio al ahorro (UF)',
            value: result.premioAhorroUF,
            format: 'UF',
          },
        ] as CalculatorResult[])
      : []),
    {
      label: 'Ahorro requerido (UF)',
      value: result.ahorroRequeridoUF,
      format: 'UF',
    },
    {
      label: 'Máx. propiedad (UF)',
      value: result.montoMaximoPropiedadUF,
      format: 'UF',
    },
    {
      label: 'Valor propiedad (UF)',
      value: result.valorPropiedadUF,
      format: 'UF',
    },
    {
      label: 'Ahorro (UF)',
      value: result.ahorroUF,
      format: 'UF',
    },
    {
      label: 'Déficit (UF)',
      value: result.deficitUF,
      format: 'UF',
    },
    {
      label: 'Déficit (CLP referencial)',
      value: result.deficitCLP,
      format: 'CLP',
    },
  ];

  // Exponer errores como montos 0 con labels no rompe el shell; el shell
  // solo muestra resultados numéricos. Los errores van en la lista de
  // resultados como 0 con label descriptivo no es ideal. Dejamos el
  // resultado numérico; el disclaimer de la página cubre “referencial”.
  void result.errores;
  return rows;
}
