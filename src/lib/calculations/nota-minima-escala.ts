// ============================================
// Calculadora de escala de notas / nota mínima (E-034)
// --------------------------------------------
// Escala 1,0–7,0, un decimal y aprobación 4,0: Decreto 67/2018, art. 8.
// La EXIGENCIA (60% por defecto) NO la fija el decreto: la define cada
// establecimiento o docente; por eso es un input editable.
// Fórmula lineal por tramos:
//   p < e·P  → nota = mín + (aprob − mín) · p / (e·P)
//   p ≥ e·P  → nota = aprob + (máx − aprob) · (p − e·P) / (P − e·P)
// ============================================

import { ESCALA_NOTAS, EXIGENCIA_POR_DEFECTO } from '@/lib/values/educacion';
import type { CalculatorResult } from '@/types/calculator';
import { aproximar } from './promedio-notas';

export interface NotaEscalaInput {
  puntajeMaximo: number;
  puntajeObtenido: number;
  /** Exigencia en % (ej. 60). */
  exigencia: number;
  notaMinima: number;
  notaMaxima: number;
  notaAprobacion: number;
}

export interface NotaEscalaResult {
  nota: number;
  notaExacta: number;
  puntajeAprobacion: number;
  porcentajeLogro: number;
  aprueba: boolean;
}

export function notaDesdePuntaje(input: NotaEscalaInput, puntaje: number): number {
  const { puntajeMaximo: P, notaMinima: mn, notaMaxima: mx, notaAprobacion: ap } = input;
  const corte = (input.exigencia / 100) * P;
  if (puntaje < corte) return mn + ((ap - mn) * puntaje) / corte;
  if (P === corte) return mx;
  return ap + ((mx - ap) * (puntaje - corte)) / (P - corte);
}

export function calculateNotaEscala(raw: Partial<NotaEscalaInput> & { puntajeMaximo: number }): NotaEscalaResult {
  const input: NotaEscalaInput = {
    puntajeObtenido: raw.puntajeObtenido ?? 0,
    exigencia: raw.exigencia && raw.exigencia > 0 ? raw.exigencia : EXIGENCIA_POR_DEFECTO,
    notaMinima: raw.notaMinima && raw.notaMinima > 0 ? raw.notaMinima : ESCALA_NOTAS.minima,
    notaMaxima: raw.notaMaxima && raw.notaMaxima > 0 ? raw.notaMaxima : ESCALA_NOTAS.maxima,
    notaAprobacion:
      raw.notaAprobacion && raw.notaAprobacion > 0 ? raw.notaAprobacion : ESCALA_NOTAS.aprobacion,
    puntajeMaximo: raw.puntajeMaximo,
  };
  if (!(input.puntajeMaximo > 0)) throw new Error('El puntaje máximo debe ser mayor a 0.');
  if (input.puntajeObtenido < 0 || input.puntajeObtenido > input.puntajeMaximo) {
    throw new Error('El puntaje obtenido debe estar entre 0 y el puntaje máximo.');
  }
  if (input.exigencia <= 0 || input.exigencia > 100) {
    throw new Error('La exigencia debe estar entre 1% y 100%.');
  }
  if (!(input.notaMinima < input.notaAprobacion && input.notaAprobacion < input.notaMaxima)) {
    throw new Error('Debe cumplirse: nota mínima < nota de aprobación < nota máxima.');
  }

  const notaExacta = notaDesdePuntaje(input, input.puntajeObtenido);
  const nota = aproximar(notaExacta, 1);
  return {
    nota,
    notaExacta: aproximar(notaExacta, 4),
    puntajeAprobacion: aproximar((input.exigencia / 100) * input.puntajeMaximo, 2),
    porcentajeLogro: aproximar((input.puntajeObtenido / input.puntajeMaximo) * 100, 2),
    aprueba: nota >= input.notaAprobacion,
  };
}

export function notaEscalaToResults(r: NotaEscalaResult): CalculatorResult[] {
  return [
    {
      label: 'Nota obtenida (aproximada a un decimal)',
      value: r.nota,
      format: 'number',
      highlight: true,
      note: {
        text: 'Escala de 1,0 a 7,0 con un decimal y aprobación con 4,0 (Decreto 67/2018, art. 8). La exigencia la define tu establecimiento.',
        source: {
          name: 'Decreto 67/2018 Mineduc',
          url: 'https://www.bcn.cl/leychile/navegar?idNorma=1127255',
        },
      },
    },
    { label: 'Puntaje mínimo para la nota de aprobación', value: r.puntajeAprobacion, format: 'number' },
    { label: 'Porcentaje de logro', value: r.porcentajeLogro, format: 'percentage' },
    { label: 'Nota exacta (sin aproximar)', value: r.notaExacta, format: 'number' },
  ];
}
