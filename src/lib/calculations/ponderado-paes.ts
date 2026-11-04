// ============================================
// Simulador de puntaje ponderado PAES — Admisión 2027 (E-035)
// --------------------------------------------
// DEMRE: Ponderado = Σ (puntaje de cada factor × su ponderación).
//   https://demre.cl/paes/factores-seleccion/
// Factores: NEM, Ranking, Competencia Lectora, M1, electiva (Historia y
// Cs. Sociales o Ciencias; si rinde ambas se usa la mayor) y M2.
// NEM: promedio de 1° a 4° medio con 2 decimales → tabla oficial por grupo.
//   https://demre.cl/paes/factores-seleccion/notas-ensenanza-media
// Ranking (Admisión 2027): Ri = PROM + (NEM − PROM)(1000 − PROM)/(MAX − PROM)
//   https://demre.cl/paes/factores-seleccion/puntaje-ranking
// Las ponderaciones dependen de cada carrera: las ingresa el usuario.
// ============================================

import { NEM_MAX, NEM_MIN, NEM_TABLAS_2027, type GrupoNem } from '@/lib/values/nem-tablas-2027';
import { PAES } from '@/lib/values/educacion';
import type { CalculatorResult } from '@/types/calculator';
import { aproximar } from './promedio-notas';

/** Promedio NEM: promedio de los promedios anuales, a 2 decimales (DEMRE). */
export function promedioNem(anuales: number[]): number {
  const v = anuales.filter((n) => n > 0);
  if (v.length === 0) return 0;
  return aproximar(v.reduce((s, n) => s + n, 0) / v.length, 2);
}

/** Convierte el promedio NEM (4,00–7,00) a puntaje con la tabla oficial 2027. */
export function puntajeNem(promedio: number, grupo: GrupoNem): number {
  const p = aproximar(promedio, 2);
  if (p < NEM_MIN || p > NEM_MAX) {
    throw new Error('El promedio NEM debe estar entre 4,00 y 7,00.');
  }
  return NEM_TABLAS_2027[grupo][Math.round((p - NEM_MIN) * 100)];
}

/**
 * Puntaje ranking de un nivel (DEMRE, Admisión 2027). Todos los valores en
 * escala NEM (100–1.000): nem del estudiante, prom y max del establecimiento.
 */
export function rankingNivel(nem: number, prom: number, max: number): number {
  if (nem <= prom) return nem;
  if (nem >= max) return PAES.puntajeMaximo;
  return prom + ((nem - prom) * (PAES.puntajeMaximo - prom)) / (max - prom);
}

/** Ranking final: promedio de los 4 niveles. */
export function puntajeRanking(niveles: { nem: number; prom: number; max: number }[]): number {
  if (niveles.length === 0) throw new Error('Faltan niveles para calcular el ranking.');
  const s = niveles.reduce((acc, n) => acc + rankingNivel(n.nem, n.prom, n.max), 0);
  return aproximar(s / niveles.length, 2);
}

export interface PonderadoPaesInput {
  grupoNem: GrupoNem;
  /** Promedio NEM con 2 decimales; si es 0 se calcula desde `anuales`. */
  promedioNem: number;
  anuales: number[];
  /** Puntaje ranking si el estudiante lo conoce; 0 = se asume igual al NEM. */
  ranking: number;
  lectora: number;
  m1: number;
  m2: number;
  historia: number;
  ciencias: number;
  /** Ponderaciones en % de la carrera. */
  pesos: { nem: number; ranking: number; lectora: number; m1: number; m2: number; electiva: number };
}

export interface PonderadoPaesResult {
  ponderado: number;
  promedioNem: number;
  puntajeNem: number;
  puntajeRanking: number;
  rankingAsumido: boolean;
  electiva: number;
  sumaPesos: number;
}

function validarPuntaje(nombre: string, v: number) {
  if (v !== 0 && (v < PAES.puntajeMinimo || v > PAES.puntajeMaximo)) {
    throw new Error(`El puntaje de ${nombre} debe estar entre 100 y 1.000.`);
  }
}

export function calculatePonderadoPaes(input: PonderadoPaesInput): PonderadoPaesResult {
  const p = input.pesos;
  const sumaPesos = aproximar(p.nem + p.ranking + p.lectora + p.m1 + p.m2 + p.electiva, 4);
  if (Object.values(p).some((x) => x < 0)) throw new Error('Las ponderaciones no pueden ser negativas.');
  if (Math.abs(sumaPesos - 100) > 0.001) {
    throw new Error(`Las ponderaciones deben sumar 100% (hoy suman ${sumaPesos.toLocaleString('es-CL')}%).`);
  }
  if (p.m2 > 0 && p.m2 < PAES.pesoMinimoM2) {
    throw new Error('Si la carrera exige M2, su ponderación es de al menos 5%.');
  }

  const prom = input.promedioNem > 0 ? aproximar(input.promedioNem, 2) : promedioNem(input.anuales);
  if (prom === 0) throw new Error('Ingresa tu promedio NEM o tus promedios de 1° a 4° medio.');
  const pNem = puntajeNem(prom, input.grupoNem);

  for (const [n, v] of [
    ['Competencia Lectora', input.lectora],
    ['M1', input.m1],
    ['M2', input.m2],
    ['Historia y Ciencias Sociales', input.historia],
    ['Ciencias', input.ciencias],
    ['ranking', input.ranking],
  ] as const) validarPuntaje(n, v);

  const electiva = Math.max(input.historia, input.ciencias);
  if (p.lectora > 0 && input.lectora === 0) throw new Error('Falta tu puntaje de Competencia Lectora.');
  if (p.m1 > 0 && input.m1 === 0) throw new Error('Falta tu puntaje de M1.');
  if (p.m2 > 0 && input.m2 === 0) throw new Error('La carrera pondera M2: ingresa tu puntaje de M2.');
  if (p.electiva > 0 && electiva === 0) {
    throw new Error('La carrera pondera una prueba electiva: ingresa Historia o Ciencias.');
  }

  const rankingAsumido = input.ranking === 0;
  const pRanking = rankingAsumido ? pNem : input.ranking;

  const ponderado =
    (pNem * p.nem +
      pRanking * p.ranking +
      input.lectora * p.lectora +
      input.m1 * p.m1 +
      input.m2 * p.m2 +
      electiva * p.electiva) /
    100;

  return {
    ponderado: aproximar(ponderado, 2),
    promedioNem: prom,
    puntajeNem: pNem,
    puntajeRanking: pRanking,
    rankingAsumido,
    electiva,
    sumaPesos,
  };
}

export function ponderadoPaesToResults(r: PonderadoPaesResult): CalculatorResult[] {
  return [
    {
      label: 'Puntaje ponderado estimado',
      value: r.ponderado,
      format: 'number',
      highlight: true,
      note: {
        text: 'Suma de cada puntaje por su ponderación, como indica el DEMRE. Las ponderaciones son las que ingresaste para tu carrera.',
        source: { name: 'DEMRE — Factores de selección', url: 'https://demre.cl/paes/factores-seleccion/' },
      },
    },
    {
      label: 'Puntaje NEM (tabla oficial Admisión 2027)',
      value: r.puntajeNem,
      format: 'number',
      note: {
        text: `Promedio NEM usado: ${r.promedioNem.toLocaleString('es-CL', { minimumFractionDigits: 2 })}.`,
        source: {
          name: 'DEMRE — Tabla de transformación NEM',
          url: 'https://demre.cl/paes/factores-seleccion/tabla-transformacion-nem',
        },
      },
    },
    {
      label: r.rankingAsumido ? 'Puntaje ranking (asumido igual al NEM)' : 'Puntaje ranking',
      value: r.puntajeRanking,
      format: 'number',
      note: r.rankingAsumido
        ? {
            text: 'Si no ingresas tu ranking se usa tu puntaje NEM como estimación conservadora: según la fórmula del DEMRE, el ranking de cada nivel no es menor que el NEM de ese nivel.',
            source: {
              name: 'DEMRE — Puntaje ranking',
              url: 'https://demre.cl/paes/factores-seleccion/puntaje-ranking',
            },
          }
        : undefined,
    },
    { label: 'Prueba electiva considerada (la mayor)', value: r.electiva, format: 'number' },
  ];
}
