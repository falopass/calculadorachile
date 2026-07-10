// ============================================
// Cálculo de Multas de Tránsito en UTM Chile 2026
// ============================================

import { UTM, MULTA_TRANSITO_UTM } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

/**
 * Claves del catálogo: categorías legales + infracciones frecuentes
 * mapeadas a un valor referencial en UTM (punto medio / referencia
 * educativa del tramo). El JPL puede fijar otro monto dentro del rango.
 */
export type TipoMulta =
  | 'leve'
  | 'menos_grave'
  | 'grave'
  | 'gravisima'
  | 'gravisima_alcohol'
  // Infracciones frecuentes (valores de referencia del tramo)
  | 'estacionar_prohibido'
  | 'no_cinturon'
  | 'celular_manos_libres'
  | 'luz_roja'
  | 'exceso_velocidad_leve'
  | 'exceso_velocidad_grave'
  | 'sin_revision_tecnica'
  | 'sin_soap'
  | 'sin_licencia'
  | 'ebriedad_alcohol';

export interface MultasTransitoInput {
  tipoMulta: TipoMulta;
  cantidadMultas?: number;
  /** Reincidencia dentro de 12 meses: recargo del 50% (Art. 197). */
  esReincidente?: boolean;
}

export interface MultasTransitoResult {
  tipoMulta: TipoMulta;
  categoriaLegal: string;
  descripcion: string;
  montoUTM: number;
  montoCLP: number;
  cantidadMultas: number;
  totalCLP: number;
  recargoReincidencia: number;
  valorUTM: number;
}

interface MultaDef {
  utm: number;
  categoria: string;
  label: string;
}

/**
 * Montos referenciales en UTM.
 * Categorías base: MULTA_TRANSITO_UTM (constantes del sitio).
 * Infracciones específicas: mismo tramo legal + etiqueta pedagógica.
 */
const MULTA_DEFS: Record<TipoMulta, MultaDef> = {
  leve: {
    utm: MULTA_TRANSITO_UTM.leve,
    categoria: 'Leve',
    label: 'Infracción leve (tramo genérico)',
  },
  menos_grave: {
    utm: MULTA_TRANSITO_UTM.menos_grave,
    categoria: 'Menos grave',
    label: 'Infracción menos grave (tramo genérico)',
  },
  grave: {
    utm: MULTA_TRANSITO_UTM.grave,
    categoria: 'Grave',
    label: 'Infracción grave (tramo genérico)',
  },
  gravisima: {
    utm: MULTA_TRANSITO_UTM.gravisima,
    categoria: 'Gravísima',
    label: 'Infracción gravísima (tramo genérico)',
  },
  gravisima_alcohol: {
    utm: MULTA_TRANSITO_UTM.gravisima_alcohol,
    categoria: 'Gravísima (alcohol)',
    label: 'Conducir bajo influencia / ebriedad (ref. Ley Emilia / tolerancia cero)',
  },
  estacionar_prohibido: {
    utm: MULTA_TRANSITO_UTM.leve,
    categoria: 'Leve',
    label: 'Estacionar en lugar prohibido / zona restricción',
  },
  no_cinturon: {
    utm: MULTA_TRANSITO_UTM.menos_grave,
    categoria: 'Menos grave',
    label: 'No usar cinturón de seguridad',
  },
  celular_manos_libres: {
    utm: MULTA_TRANSITO_UTM.grave,
    categoria: 'Grave',
    label: 'Usar celular al volante (sin manos libres)',
  },
  luz_roja: {
    utm: MULTA_TRANSITO_UTM.grave,
    categoria: 'Grave',
    label: 'No respetar luz roja / señal Pare',
  },
  exceso_velocidad_leve: {
    utm: MULTA_TRANSITO_UTM.menos_grave,
    categoria: 'Menos grave',
    label: 'Exceso de velocidad (tramo moderado, ref.)',
  },
  exceso_velocidad_grave: {
    utm: MULTA_TRANSITO_UTM.gravisima,
    categoria: 'Gravísima',
    label: 'Exceso de velocidad grave / temerario (ref.)',
  },
  sin_revision_tecnica: {
    utm: MULTA_TRANSITO_UTM.grave,
    categoria: 'Grave',
    label: 'Circular sin revisión técnica vigente',
  },
  sin_soap: {
    utm: MULTA_TRANSITO_UTM.grave,
    categoria: 'Grave',
    label: 'Circular sin SOAP vigente',
  },
  sin_licencia: {
    utm: MULTA_TRANSITO_UTM.gravisima,
    categoria: 'Gravísima',
    label: 'Conducir sin licencia / con licencia suspendida (ref.)',
  },
  ebriedad_alcohol: {
    utm: MULTA_TRANSITO_UTM.gravisima_alcohol,
    categoria: 'Gravísima (alcohol)',
    label: 'Alcohol / sustancias al conducir (ref. 12 UTM + otras sanciones)',
  },
};

const RECARGO_REINCIDENCIA = MULTA_TRANSITO_UTM.recargo_reincidencia / 100;

/**
 * Estima multa de tránsito en CLP a partir de UTM.
 * Base: Ley 18.290 Art. 196 y ss.; reincidencia Art. 197.
 * El monto exacto lo fija el Juzgado de Policía Local.
 */
export function calculateMultasTransito(
  input: MultasTransitoInput,
): MultasTransitoResult {
  const { tipoMulta, cantidadMultas = 1, esReincidente = false } = input;
  const def = MULTA_DEFS[tipoMulta] ?? MULTA_DEFS.leve;
  const cantidadValida = Math.max(1, Math.round(cantidadMultas));
  const valorUTM = UTM.valor;
  const montoUTM = def.utm;

  let montoCLP = montoUTM * valorUTM;
  const recargoReincidencia = esReincidente
    ? Math.round(montoCLP * RECARGO_REINCIDENCIA)
    : 0;
  if (esReincidente) {
    montoCLP += recargoReincidencia;
  }

  const totalCLP = montoCLP * cantidadValida;

  return {
    tipoMulta,
    categoriaLegal: def.categoria,
    descripcion: def.label,
    montoUTM,
    montoCLP: Math.round(montoCLP),
    cantidadMultas: cantidadValida,
    totalCLP: Math.round(totalCLP),
    recargoReincidencia,
    valorUTM,
  };
}

export function multasTransitoToResults(result: MultasTransitoResult): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Total a pagar (estimado)',
      value: result.totalCLP,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Monto por infracción',
      value: result.montoCLP,
      format: 'CLP',
    },
    {
      label: 'Monto en UTM (referencia)',
      value: result.montoUTM,
      format: 'UTM',
    },
    {
      label: 'UTM del día (sitio)',
      value: result.valorUTM,
      format: 'CLP',
    },
    {
      label: `Categoría: ${result.categoriaLegal}`,
      value: result.montoUTM,
      format: 'UTM',
    },
    {
      label: 'Cantidad de multas',
      value: result.cantidadMultas,
      format: 'number',
    },
  ];

  if (result.recargoReincidencia > 0) {
    results.push({
      label: 'Recargo reincidencia 50% (por unidad)',
      value: result.recargoReincidencia,
      format: 'CLP',
    });
  }

  return results;
}
