// ============================================
// Calculadora de promedio de notas (E-033)
// --------------------------------------------
// Escala 1,0–7,0 y aprobación 4,0: Decreto 67/2018 Mineduc, art. 8.
// El número de notas y sus ponderaciones las define cada docente
// (art. 9); la aproximación del promedio la define el reglamento
// de evaluación de cada establecimiento (por eso es configurable).
// ============================================

import { ESCALA_NOTAS } from '@/lib/values/educacion';
import type { CalculatorResult } from '@/types/calculator';

export type RedondeoPromedio = 'decima' | 'centesima';

export interface PromedioNotasInput {
  /** Notas de 1,0 a 7,0; 0 = casilla vacía. */
  notas: number[];
  /** Ponderación en % de cada nota (misma posición); 0 = sin ponderación. */
  pesos: number[];
  /** Aproximación a mostrar: a la décima (5,45 → 5,5) o a la centésima. */
  redondeo: RedondeoPromedio;
  /** Nota que se quiere alcanzar (por defecto 4,0). */
  notaObjetivo: number;
}

export interface PromedioNotasResult {
  /** Promedio exacto (sin aproximar) de las notas ingresadas. */
  promedioExacto: number;
  /** Promedio aproximado según `redondeo`. */
  promedio: number;
  cantidadNotas: number;
  ponderado: boolean;
  /** Suma de ponderaciones ingresadas (100 si el promedio es simple). */
  pesoAcumulado: number;
  aprueba: boolean;
  /**
   * Nota necesaria en el porcentaje que falta para llegar a la nota
   * objetivo. Solo existe si el promedio es ponderado y los pesos suman
   * menos de 100%.
   */
  notaNecesaria: number | null;
  pesoPendiente: number;
}

/** Redondeo "hacia arriba desde 5" a n decimales, robusto a coma flotante. */
export function aproximar(valor: number, decimales: number): number {
  const f = 10 ** decimales;
  return Math.round(valor * f + 1e-9) / f;
}

export function calculatePromedioNotas(input: PromedioNotasInput): PromedioNotasResult {
  const pares = input.notas
    .map((nota, i) => ({ nota, peso: input.pesos[i] ?? 0 }))
    .filter((p) => p.nota > 0);

  if (pares.length === 0) {
    throw new Error('Ingresa al menos una nota.');
  }
  for (const { nota, peso } of pares) {
    if (nota < ESCALA_NOTAS.minima || nota > ESCALA_NOTAS.maxima) {
      throw new Error('Cada nota debe estar entre 1,0 y 7,0.');
    }
    if (peso < 0 || peso > 100) {
      throw new Error('Cada ponderación debe estar entre 0% y 100%.');
    }
  }

  const ponderado = pares.some((p) => p.peso > 0);
  let promedioExacto: number;
  let pesoAcumulado = 100;

  if (!ponderado) {
    promedioExacto = pares.reduce((s, p) => s + p.nota, 0) / pares.length;
  } else {
    if (pares.some((p) => p.peso <= 0)) {
      throw new Error('Si usas ponderaciones, asigna un % a cada nota ingresada.');
    }
    pesoAcumulado = aproximar(pares.reduce((s, p) => s + p.peso, 0), 4);
    if (pesoAcumulado > 100) {
      throw new Error('Las ponderaciones no pueden sumar más de 100%.');
    }
    promedioExacto = pares.reduce((s, p) => s + p.nota * p.peso, 0) / pesoAcumulado;
  }

  const decimales = input.redondeo === 'centesima' ? 2 : 1;
  const promedio = aproximar(promedioExacto, decimales);
  const pesoPendiente = aproximar(100 - pesoAcumulado, 4);

  let notaNecesaria: number | null = null;
  if (ponderado && pesoPendiente > 0) {
    const objetivo = input.notaObjetivo > 0 ? input.notaObjetivo : ESCALA_NOTAS.aprobacion;
    const acumulado = (promedioExacto * pesoAcumulado) / 100;
    notaNecesaria = aproximar((objetivo - acumulado) / (pesoPendiente / 100), 2);
  }

  return {
    promedioExacto: aproximar(promedioExacto, 4),
    promedio,
    cantidadNotas: pares.length,
    ponderado,
    pesoAcumulado,
    aprueba: promedio >= ESCALA_NOTAS.aprobacion,
    notaNecesaria,
    pesoPendiente,
  };
}

export function promedioNotasToResults(r: PromedioNotasResult): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: r.ponderado && r.pesoPendiente > 0
        ? `Promedio parcial (${r.pesoAcumulado.toLocaleString('es-CL')}% evaluado)`
        : 'Promedio de notas',
      value: r.promedio,
      format: 'number',
      highlight: true,
      note: {
        text: r.aprueba
          ? 'Aprobado: la nota mínima de aprobación es 4,0 (Decreto 67/2018, art. 8).'
          : 'Bajo 4,0: la nota mínima de aprobación es 4,0 (Decreto 67/2018, art. 8).',
        source: {
          name: 'Decreto 67/2018 Mineduc',
          url: 'https://www.bcn.cl/leychile/navegar?idNorma=1127255',
        },
      },
    },
    { label: 'Promedio exacto (sin aproximar)', value: r.promedioExacto, format: 'number' },
    { label: 'Notas consideradas', value: r.cantidadNotas, format: 'number' },
  ];
  if (r.notaNecesaria !== null) {
    results.push({
      label: `Nota que necesitas en el ${r.pesoPendiente.toLocaleString('es-CL')}% restante`,
      value: r.notaNecesaria,
      format: 'number',
      note: {
        text:
          r.notaNecesaria > 7
            ? 'Supera 7,0: con lo que falta no alcanzas la nota objetivo.'
            : r.notaNecesaria < 1
              ? 'Menor que 1,0: ya tienes asegurada la nota objetivo.'
              : 'Calculada sobre el promedio exacto, antes de aproximar.',
      },
    });
  }
  return results;
}
