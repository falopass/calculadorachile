// ============================================
// Rangos de multas de tránsito en Chile
// ============================================

import { MULTA_TRANSITO_UTM, UTM } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type TipoMulta =
  | 'leve'
  | 'menos_grave'
  | 'grave'
  | 'gravisima'
  | 'estacionar_prohibido'
  | 'no_cinturon'
  | 'celular'
  | 'luz_roja'
  | 'exceso_hasta_10'
  | 'exceso_11_a_20'
  | 'exceso_mas_20'
  | 'sin_revision_tecnica'
  | 'sin_soap'
  | 'sin_licencia';

type Categoria = keyof typeof MULTA_TRANSITO_UTM;

export interface MultasTransitoInput {
  tipoMulta: TipoMulta;
  cantidadMultas?: number;
  /** 0: sin reincidencia; 1: doble; 2 o más: triple. */
  reincidenciasPrevias?: number;
}

export interface MultasTransitoResult {
  tipoMulta: TipoMulta;
  categoriaLegal: Categoria;
  descripcion: string;
  minimoUTM: number;
  maximoUTM: number;
  minimoCLP: number;
  maximoCLP: number;
  cantidadMultas: number;
  multiplicadorReincidencia: number;
  totalMinimoCLP: number;
  totalMaximoCLP: number;
  valorUTM: number;
}

const DEFINICIONES: Record<TipoMulta, { categoria: Categoria; descripcion: string }> = {
  leve: { categoria: 'leve', descripcion: 'Infracción leve genérica' },
  menos_grave: { categoria: 'menos_grave', descripcion: 'Infracción menos grave genérica' },
  grave: { categoria: 'grave', descripcion: 'Infracción grave genérica' },
  gravisima: { categoria: 'gravisima', descripcion: 'Infracción gravísima genérica' },
  estacionar_prohibido: {
    categoria: 'menos_grave',
    descripcion: 'Estacionar o detenerse en un lugar prohibido',
  },
  no_cinturon: { categoria: 'grave', descripcion: 'No usar cinturón de seguridad' },
  celular: {
    categoria: 'gravisima',
    descripcion: 'Manipular un teléfono u otro dispositivo durante la conducción',
  },
  luz_roja: { categoria: 'gravisima', descripcion: 'No detenerse ante luz roja o señal PARE' },
  exceso_hasta_10: {
    categoria: 'menos_grave',
    descripcion: 'Exceder hasta en 10 km/h el límite',
  },
  exceso_11_a_20: {
    categoria: 'grave',
    descripcion: 'Exceder entre 11 y 20 km/h el límite',
  },
  exceso_mas_20: {
    categoria: 'gravisima',
    descripcion: 'Exceder en más de 20 km/h el límite',
  },
  sin_revision_tecnica: {
    categoria: 'grave',
    descripcion: 'Circular sin revisión técnica vigente',
  },
  sin_soap: { categoria: 'grave', descripcion: 'Circular sin SOAP vigente' },
  sin_licencia: {
    categoria: 'gravisima',
    descripcion: 'Conducir sin haber obtenido licencia',
  },
};

/**
 * Convierte a pesos el rango legal del artículo 201 de la Ley 18.290.
 * Para infracciones graves, la reincidencia se considera dentro de dos años;
 * para gravísimas, dentro de tres. Una reincidencia duplica la multa y una
 * nueva reincidencia la triplica. El JPL fija el monto y otras sanciones.
 */
export function calculateMultasTransito(
  input: MultasTransitoInput,
): MultasTransitoResult {
  const definicion = DEFINICIONES[input.tipoMulta] ?? DEFINICIONES.leve;
  const rango = MULTA_TRANSITO_UTM[definicion.categoria];
  const cantidadMultas = Math.max(1, Math.round(input.cantidadMultas ?? 1));
  const reincidencias = Math.max(0, Math.round(input.reincidenciasPrevias ?? 0));
  const admiteReincidencia =
    definicion.categoria === 'grave' || definicion.categoria === 'gravisima';
  const multiplicadorReincidencia = !admiteReincidencia
    ? 1
    : reincidencias >= 2
      ? 3
      : reincidencias === 1
        ? 2
        : 1;
  const minimoUTM = rango.minimo * multiplicadorReincidencia;
  const maximoUTM = rango.maximo * multiplicadorReincidencia;
  const minimoCLP = Math.round(minimoUTM * UTM.valor);
  const maximoCLP = Math.round(maximoUTM * UTM.valor);

  return {
    tipoMulta: input.tipoMulta,
    categoriaLegal: definicion.categoria,
    descripcion: definicion.descripcion,
    minimoUTM,
    maximoUTM,
    minimoCLP,
    maximoCLP,
    cantidadMultas,
    multiplicadorReincidencia,
    totalMinimoCLP: minimoCLP * cantidadMultas,
    totalMaximoCLP: maximoCLP * cantidadMultas,
    valorUTM: UTM.valor,
  };
}

export function multasTransitoToResults(result: MultasTransitoResult): CalculatorResult[] {
  return [
    { label: 'Mínimo total estimado', value: result.totalMinimoCLP, format: 'CLP', highlight: true },
    { label: 'Máximo total estimado', value: result.totalMaximoCLP, format: 'CLP', highlight: true },
    { label: 'Mínimo por infracción', value: result.minimoUTM, format: 'UTM' },
    { label: 'Máximo por infracción', value: result.maximoUTM, format: 'UTM' },
    { label: 'Multiplicador por reincidencia', value: result.multiplicadorReincidencia, format: 'number' },
    { label: 'Cantidad de infracciones', value: result.cantidadMultas, format: 'number' },
  ];
}
