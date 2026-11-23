// ============================================
// Mes de revisión técnica por dígito de patente
// Decreto Supremo 156 del MTT, art. 7 (BCN/Ley Chile)
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export type TipoRevisionTecnica = 'particular-anual' | 'vehiculo-nuevo';

export interface RevisionTecnicaInput {
  /** Patente tal como aparece en el padrón (ej. "AB-CD-12", "GHJK56"). */
  patente: string;
  /** Periodicidad del vehículo: anual por dígito o primera revisión de vehículo nuevo. */
  tipoVehiculo: TipoRevisionTecnica;
}

export interface RevisionTecnicaResult {
  patenteNormalizada: string;
  digito: number | null;
  mes: string | null;
  mesAdelanto: string | null;
  esNuevo: boolean;
  error: 'vacio' | 'sin-digito' | null;
}

/**
 * Calendario por último dígito de la patente para vehículos de
 * revisión técnica anual (autos particulares). Marzo y diciembre no
 * tienen dígito asignado ("meses sin preferencia" según ChileAtiende).
 *
 * Fuente: Decreto Supremo 156 del Ministerio de Transportes, art. 7
 * (bcn.cl/leychile, idNorma 10183) y ChileAtiende ficha 23978.
 * La revisión puede realizarse también el mes inmediatamente anterior
 * sin que cambie su vigencia.
 */
const MES_POR_DIGITO: Record<number, { mes: string; mesAdelanto: string }> = {
  9: { mes: 'enero', mesAdelanto: 'diciembre del año anterior' },
  0: { mes: 'febrero', mesAdelanto: 'enero' },
  1: { mes: 'abril', mesAdelanto: 'marzo' },
  2: { mes: 'mayo', mesAdelanto: 'abril' },
  3: { mes: 'junio', mesAdelanto: 'mayo' },
  4: { mes: 'julio', mesAdelanto: 'junio' },
  5: { mes: 'agosto', mesAdelanto: 'julio' },
  6: { mes: 'septiembre', mesAdelanto: 'agosto' },
  7: { mes: 'octubre', mesAdelanto: 'septiembre' },
  8: { mes: 'noviembre', mesAdelanto: 'octubre' },
};

export function calculateRevisionTecnica(
  input: RevisionTecnicaInput,
): RevisionTecnicaResult {
  const patente = (input.patente ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const esNuevo = input.tipoVehiculo === 'vehiculo-nuevo';

  if (patente.length === 0) {
    return {
      patenteNormalizada: '',
      digito: null,
      mes: null,
      mesAdelanto: null,
      esNuevo,
      error: 'vacio',
    };
  }

  const ultimo = patente[patente.length - 1];
  if (!/[0-9]/.test(ultimo)) {
    return {
      patenteNormalizada: patente,
      digito: null,
      mes: null,
      mesAdelanto: null,
      esNuevo,
      error: 'sin-digito',
    };
  }

  const digito = Number(ultimo);
  const fila = MES_POR_DIGITO[digito];

  return {
    patenteNormalizada: patente,
    digito,
    mes: fila.mes,
    mesAdelanto: fila.mesAdelanto,
    esNuevo,
    error: null,
  };
}

export function revisionTecnicaToResults(
  result: RevisionTecnicaResult,
): CalculatorResult[] {
  if (result.error === 'vacio') {
    return [
      {
        label: 'Resultado',
        value: 0,
        format: 'text',
        textValue: 'Ingresa la patente para conocer tu mes.',
        highlight: true,
      },
    ];
  }

  if (result.error === 'sin-digito' || result.digito === null) {
    return [
      {
        label: 'Resultado',
        value: 0,
        format: 'text',
        textValue:
          'La patente debe terminar en un dígito (0-9), como ABCD-12.',
        highlight: true,
      },
    ];
  }

  const results: CalculatorResult[] = [
    {
      label: 'Último dígito de tu patente',
      value: result.digito,
      format: 'text',
      textValue: String(result.digito),
    },
    {
      label: 'Mes que te corresponde',
      value: 0,
      format: 'text',
      textValue: result.mes ?? '',
      highlight: true,
    },
    {
      label: 'También puedes ir en',
      value: 0,
      format: 'text',
      textValue: result.mesAdelanto ?? '',
      note: {
        text: 'La revisión se puede hacer el mes anterior al que corresponde sin que cambie su vigencia.',
        source: {
          name: 'DS 156 MTT, art. 7',
          url: 'https://www.bcn.cl/leychile/navegar?idNorma=10183',
        },
      },
    },
  ];

  if (result.esNuevo) {
    results.push({
      label: 'Primera revisión de vehículo nuevo',
      value: 0,
      format: 'text',
      textValue: 'Entre 36 y 48 meses desde la emisión del certificado',
      note: {
        text: 'Decreto 104 del MTT (DO 18-06-2026) sobre el DS 160: el plazo exacto depende del dígito de la patente; manda la fecha de vigencia de tu certificado.',
      },
    });
  } else {
    results.push({
      label: 'Aviso',
      value: 0,
      format: 'number',
      advisory: true,
      partial: true,
      note: {
        text: 'El calendario por dígito rige la revisión anual. Taxis, buses, camiones de carga, transporte escolar y vehículos a gas tienen otra periodicidad. Para saber si puedes circular hoy, revisa la vigencia de tu certificado en prt.cl o ChileAtiende.',
        source: {
          name: 'ChileAtiende — revisión técnica',
          url: 'https://www.chileatiende.gob.cl/fichas/23978-revision-tecnica-de-vehiculos-motorizados',
        },
      },
    });
  }

  return results;
}
