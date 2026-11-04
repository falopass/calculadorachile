// ============================================
// Puntaje NEM y Ranking — Admisión 2027 (E-036)
// --------------------------------------------
// NEM: promedio de 1° a 4° medio a 2 decimales → tabla oficial DEMRE
// por grupo (A, B o C).
//   https://demre.cl/paes/factores-seleccion/notas-ensenanza-media
// Ranking: por cada nivel, Ri = PROM + (NEM − PROM)(1000 − PROM)/(MAX − PROM),
// con PROM y MAX históricos del establecimiento (3 generaciones anteriores);
// el ranking final es el promedio de los niveles.
//   https://demre.cl/paes/factores-seleccion/puntaje-ranking
// Sin datos del establecimiento se usa el NEM como estimación conservadora:
// según la fórmula del DEMRE el ranking de cada nivel nunca es menor que el
// NEM de ese nivel. Nunca es el ranking oficial.
// ============================================

import { NEM_MAX, NEM_MIN, type GrupoNem } from '@/lib/values/nem-tablas-2027';
import { PAES } from '@/lib/values/educacion';
import type { CalculatorResult } from '@/types/calculator';
import { promedioNem, puntajeNem, puntajeRanking, rankingNivel } from './ponderado-paes';
import { aproximar } from './promedio-notas';

export interface PuntajeNemRankingInput {
  /** Grupo de la tabla NEM según tipo de enseñanza (DEMRE). */
  grupoNem: GrupoNem;
  /** Promedios de 1° a 4° medio (4,0–7,0); 0 = casilla vacía. Si al menos una es > 0 se promedian las > 0. */
  prom1: number;
  prom2: number;
  prom3: number;
  prom4: number;
  /**
   * Promedio histórico de las 3 generaciones anteriores del colegio.
   * Nota 4,0–7,0 → se convierte con la tabla NEM; 100–1.000 → puntaje
   * directo; 0/undefined → no se usa.
   */
  promColegio?: number;
  /** Máximo histórico de las 3 generaciones anteriores; mismas reglas que `promColegio`. */
  maxColegio?: number;
}

export interface PuntajeNemRankingResult {
  grupoNem: GrupoNem;
  /** Niveles con promedio ingresado (1–4). */
  nivelesIngresados: number;
  /** Promedio NEM a 2 decimales (DEMRE). */
  promedioNem: number;
  /** Puntaje NEM según la tabla oficial Admisión 2027 del grupo. */
  puntajeNem: number;
  /** Puntaje ranking: promedio del ranking de cada nivel ingresado. */
  puntajeRanking: number;
  /**
   * true cuando no hay datos válidos del establecimiento: el ranking se
   * estima igual al NEM (conservador). Nunca es el ranking oficial del DEMRE.
   */
  rankingConservador: boolean;
  /** PROM del establecimiento en escala puntaje (si se ingresó). */
  puntajePromColegio?: number;
  /** MAX del establecimiento en escala puntaje (si se ingresó). */
  puntajeMaxColegio?: number;
}

/**
 * Convierte un dato histórico del colegio a escala puntaje: una nota
 * 4,0–7,0 pasa por la tabla NEM del grupo; un valor 100–1.000 ya es
 * puntaje; 0/undefined significa "no se usa".
 */
function puntajeColegio(valor: number | undefined, grupo: GrupoNem): number {
  if (valor === undefined || valor <= 0) return 0;
  if (valor >= NEM_MIN && valor <= NEM_MAX) return puntajeNem(valor, grupo);
  if (valor >= PAES.puntajeMinimo && valor <= PAES.puntajeMaximo) return Math.round(valor);
  throw new Error(
    'Los datos históricos del colegio deben ser notas entre 4,0 y 7,0 o puntajes entre 100 y 1.000.',
  );
}

export function calculatePuntajeNemRanking(input: PuntajeNemRankingInput): PuntajeNemRankingResult {
  const anuales = [input.prom1, input.prom2, input.prom3, input.prom4];
  const ingresadas = anuales.filter((n) => n > 0);
  if (ingresadas.length === 0) {
    throw new Error('Ingresa al menos un promedio anual de enseñanza media.');
  }
  if (ingresadas.some((n) => n < NEM_MIN || n > NEM_MAX)) {
    throw new Error('Cada promedio anual debe estar entre 4,0 y 7,0.');
  }

  const prom = promedioNem(anuales);
  const pNem = puntajeNem(prom, input.grupoNem);

  const pProm = puntajeColegio(input.promColegio, input.grupoNem);
  const pMax = puntajeColegio(input.maxColegio, input.grupoNem);

  // Solo con PROM y MAX válidos (MAX > PROM) se aplica la fórmula DEMRE.
  const conDatosColegio = pProm > 0 && pMax > pProm;
  const pRanking = conDatosColegio
    ? puntajeRanking(
        ingresadas.map((n) => ({
          nem: puntajeNem(aproximar(n, 2), input.grupoNem),
          prom: pProm,
          max: pMax,
        })),
      )
    : pNem;

  return {
    grupoNem: input.grupoNem,
    nivelesIngresados: ingresadas.length,
    promedioNem: prom,
    puntajeNem: pNem,
    puntajeRanking: pRanking,
    rankingConservador: !conDatosColegio,
    puntajePromColegio: pProm > 0 ? pProm : undefined,
    puntajeMaxColegio: pMax > 0 ? pMax : undefined,
  };
}

export function puntajeNemRankingToResults(r: PuntajeNemRankingResult): CalculatorResult[] {
  const fuenteRanking = {
    name: 'DEMRE — Puntaje ranking',
    url: 'https://demre.cl/paes/factores-seleccion/puntaje-ranking',
  };
  const results: CalculatorResult[] = [
    {
      label: r.rankingConservador ? 'Puntaje ranking (estimación conservadora)' : 'Puntaje ranking estimado',
      value: r.puntajeRanking,
      format: 'number',
      highlight: true,
      note: r.rankingConservador
        ? {
            text: 'Sin datos históricos de tu colegio se usa tu puntaje NEM como estimación conservadora: según la fórmula del DEMRE, el ranking de cada nivel es igual o mayor que el NEM de ese nivel. No es el ranking oficial.',
            source: fuenteRanking,
          }
        : {
            text: 'Promedio del ranking de cada nivel con la fórmula Ri = PROM + (NEM − PROM)(1000 − PROM)/(MAX − PROM) y los datos históricos que ingresaste. El ranking oficial lo publica el DEMRE al rendir la PAES.',
            source: fuenteRanking,
          },
    },
    {
      label: 'Puntaje NEM (tabla oficial Admisión 2027)',
      value: r.puntajeNem,
      format: 'number',
      note: {
        text: 'Promedio NEM usado: ' +
          r.promedioNem.toLocaleString('es-CL', { minimumFractionDigits: 2 }) +
          ', grupo ' + r.grupoNem.toUpperCase() + '.',
        source: {
          name: 'DEMRE — Tabla de transformación NEM',
          url: 'https://demre.cl/paes/factores-seleccion/tabla-transformacion-nem',
        },
      },
    },
    { label: 'Promedio NEM (1° a 4° medio)', value: r.promedioNem, format: 'number' },
    { label: 'Niveles considerados', value: r.nivelesIngresados, format: 'number' },
  ];
  if (!r.rankingConservador && r.puntajePromColegio !== undefined && r.puntajeMaxColegio !== undefined) {
    results.push({
      label: 'PROM histórico del colegio (escala puntaje)',
      value: r.puntajePromColegio,
      format: 'number',
    });
    results.push({
      label: 'MAX histórico del colegio (escala puntaje)',
      value: r.puntajeMaxColegio,
      format: 'number',
    });
  }
  return results;
}
