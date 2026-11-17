// ============================================
// Impuesto a la herencia por asignación — Ley 16.271 art. 2
// (texto refundido DFL 1/2000 Justicia, LeyChile idNorma 172986).
// Tabla en UTM con UTA = 12 UTM: SII, preguntas frecuentes de herencias.
// ============================================

import { UF, UTM } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type ParentescoHerencia = 'directo' | 'colateral' | 'otro';

/** Tramos en UTA (art. 2 inc. 1). */
export const TRAMOS_HERENCIA_UTA: ReadonlyArray<{ hasta: number; tasa: number }> = [
  { hasta: 80, tasa: 0.01 },
  { hasta: 160, tasa: 0.025 },
  { hasta: 320, tasa: 0.05 },
  { hasta: 480, tasa: 0.075 },
  { hasta: 640, tasa: 0.1 },
  { hasta: 800, tasa: 0.15 },
  { hasta: 1200, tasa: 0.2 },
  { hasta: Infinity, tasa: 0.25 },
];

/** Parte exenta en UTA (art. 2 incs. 2 y 4). */
export const EXENCION_HERENCIA_UTA: Record<ParentescoHerencia, number> = {
  directo: 50,
  colateral: 5,
  otro: 0,
};
/** Recargo sobre el impuesto (art. 2 inc. 5). */
export const RECARGO_HERENCIA: Record<ParentescoHerencia, number> = {
  directo: 0,
  colateral: 0.2,
  otro: 0.4,
};
/** Rebaja Registro Nacional de Discapacidad (art. 2 inc. final, Ley 21.210). */
export const REBAJA_DISCAPACIDAD = 0.3;
export const TOPE_REBAJA_DISCAPACIDAD_UF = 8000;

export interface ImpuestoHerenciaInput {
  /** Asignación líquida que recibe el heredero, en pesos. */
  asignacionLiquida: number;
  parentesco: ParentescoHerencia;
  /** Heredero inscrito en el Registro Nacional de Discapacidad. */
  discapacidad?: boolean;
  /** UTM vigente al fallecimiento. Default: snapshot. */
  valorUTM?: number;
  valorUF?: number;
}

export interface ImpuestoHerenciaResult {
  valorUTM: number;
  exentoCLP: number;
  afectoCLP: number;
  impuestoEscalaUTM: number;
  recargo: number;
  rebajaUTM: number;
  impuestoUTM: number;
  impuestoCLP: number;
  tasaEfectiva: number;
}

export function calculateImpuestoHerencia(input: ImpuestoHerenciaInput): ImpuestoHerenciaResult {
  const { asignacionLiquida, parentesco } = input;
  const valorUTM = input.valorUTM && input.valorUTM > 0 ? input.valorUTM : UTM.valor;
  const valorUF = input.valorUF && input.valorUF > 0 ? input.valorUF : UF.valor;
  if (!Number.isFinite(asignacionLiquida) || asignacionLiquida < 0) {
    throw new Error('La asignación líquida debe ser un monto en pesos mayor o igual a cero.');
  }
  if (!(parentesco in EXENCION_HERENCIA_UTA))
    throw new Error('Selecciona el parentesco con el causante.');

  const valorUTA = valorUTM * 12;
  const asignacionUTA = asignacionLiquida / valorUTA;
  const afectoUTA = Math.max(0, asignacionUTA - EXENCION_HERENCIA_UTA[parentesco]);

  let desde = 0;
  let escalaUTA = 0;
  for (const { hasta, tasa } of TRAMOS_HERENCIA_UTA) {
    if (afectoUTA <= desde) break;
    escalaUTA += (Math.min(afectoUTA, hasta) - desde) * tasa;
    desde = hasta;
  }

  const recargo = RECARGO_HERENCIA[parentesco];
  const conRecargoUTM = escalaUTA * 12 * (1 + recargo);
  const rebajaUTM = input.discapacidad
    ? Math.min(
        conRecargoUTM * REBAJA_DISCAPACIDAD,
        (TOPE_REBAJA_DISCAPACIDAD_UF * valorUF) / valorUTM,
      )
    : 0;
  const impuestoUTM = Math.round((conRecargoUTM - rebajaUTM) * 100) / 100;
  const impuestoCLP = Math.round(impuestoUTM * valorUTM);
  const afectoCLP = Math.round(afectoUTA * valorUTA);

  return {
    valorUTM,
    exentoCLP: asignacionLiquida - afectoCLP,
    afectoCLP,
    impuestoEscalaUTM: Math.round(escalaUTA * 12 * 100) / 100,
    recargo,
    rebajaUTM: Math.round(rebajaUTM * 100) / 100,
    impuestoUTM,
    impuestoCLP,
    tasaEfectiva:
      asignacionLiquida > 0 ? Math.round((impuestoCLP / asignacionLiquida) * 10000) / 100 : 0,
  };
}

const LEY_URL = 'https://www.bcn.cl/leychile/navegar?idNorma=172986';
const SII_URL = 'https://www.sii.cl/preguntas_frecuentes/herencias/001_160_6164.htm';

export function impuestoHerenciaToResults(r: ImpuestoHerenciaResult): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Impuesto a la herencia estimado',
      value: r.impuestoCLP,
      format: 'CLP',
      highlight: true,
      note: {
        text: 'El impuesto se fija en UTM según la UTM del mes del fallecimiento y se paga con la UTM del mes en que pagas. Plazo para declarar y pagar: dos años desde el fallecimiento.',
        source: { name: 'Ley 16.271, arts. 2 y 50 (BCN)', url: LEY_URL },
      },
    },
    { label: 'Impuesto en UTM', value: r.impuestoUTM, format: 'UTM' },
    { label: 'Parte exenta de tu asignación', value: r.exentoCLP, format: 'CLP' },
    { label: 'Monto afecto a la escala', value: r.afectoCLP, format: 'CLP' },
    {
      label: 'Impuesto según escala, antes de recargo (UTM)',
      value: r.impuestoEscalaUTM,
      format: 'UTM',
      note: {
        text: 'Escala progresiva de 1 % a 25 % en UTA, aplicada desde el primer tramo.',
        source: { name: 'SII — cálculo del impuesto a la herencia', url: SII_URL },
      },
    },
  ];
  if (r.recargo > 0)
    results.push({ label: 'Recargo por parentesco', value: r.recargo * 100, format: 'percentage' });
  if (r.rebajaUTM > 0)
    results.push({ label: 'Rebaja por discapacidad (UTM)', value: r.rebajaUTM, format: 'UTM' });
  results.push(
    { label: 'Tasa efectiva sobre tu asignación', value: r.tasaEfectiva, format: 'percentage' },
    { label: 'UTM usada', value: r.valorUTM, format: 'CLP' },
  );
  return results;
}
