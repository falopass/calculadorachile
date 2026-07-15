// ============================================
// Feriado proporcional al término del contrato
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface VacacionesInput {
  sueldoBruto: number;
  mesesTrabajados: number;
  diasTrabajadosUltimoMes?: number;
  diasVacacionesPendientes?: number;
  /** Fecha de término en formato YYYY-MM-DD. */
  fechaTermino?: string;
}

export interface VacacionesResult {
  sueldoBruto: number;
  diasHabilesProporcionales: number;
  diasHabilesPendientes: number;
  diasHabilesTotales: number;
  diasCorridosIndemnizables: number;
  valorDiaCorrida: number;
  totalVacaciones: number;
  calendarioAplicado: boolean;
}

const FERIADOS_NACIONALES_2026 = new Set([
  '2026-01-01',
  '2026-04-03',
  '2026-04-04',
  '2026-05-01',
  '2026-05-21',
  '2026-06-21',
  '2026-06-29',
  '2026-07-16',
  '2026-08-15',
  '2026-09-18',
  '2026-09-19',
  '2026-10-12',
  '2026-10-31',
  '2026-11-01',
  '2026-12-08',
  '2026-12-25',
  '2027-01-01',
]);

function parseFecha(fecha?: string): Date | null {
  if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return null;
  const date = new Date(`${fecha}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function claveFecha(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function esHabilParaFeriado(date: Date): boolean {
  const dia = date.getUTCDay();
  return dia !== 0 && dia !== 6 && !FERIADOS_NACIONALES_2026.has(claveFecha(date));
}

function proyectarDiasCorridos(fechaTermino: Date, diasHabiles: number): number {
  const enteros = Math.floor(diasHabiles);
  const fraccion = diasHabiles - enteros;
  const cursor = new Date(fechaTermino);
  let habilesContados = 0;
  let corridos = 0;

  while (habilesContados < enteros) {
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    corridos += 1;
    if (esHabilParaFeriado(cursor)) habilesContados += 1;
  }
  return corridos + fraccion;
}

/**
 * Calcula 1,25 días hábiles por mes completo y 1,25/30 por día adicional.
 * Para indemnizar al terminar el contrato, proyecta esos días desde el día
 * siguiente al término e incorpora sábados, domingos y feriados nacionales.
 * No incorpora feriados regionales ni extraordinarios.
 */
export function calculateVacaciones(input: VacacionesInput): VacacionesResult {
  const sueldoBruto = Math.max(0, input.sueldoBruto);
  const meses = Math.max(0, input.mesesTrabajados);
  const diasUltimoMes = Math.min(30, Math.max(0, input.diasTrabajadosUltimoMes ?? 0));
  const diasHabilesProporcionales = meses * 1.25 + diasUltimoMes * (1.25 / 30);
  const diasHabilesPendientes = Math.max(0, input.diasVacacionesPendientes ?? 0);
  const diasHabilesTotales = diasHabilesProporcionales + diasHabilesPendientes;
  const fechaTermino = parseFecha(input.fechaTermino);
  const diasCorridosIndemnizables = fechaTermino
    ? proyectarDiasCorridos(fechaTermino, diasHabilesTotales)
    : diasHabilesTotales;
  const valorDiaCorrida = sueldoBruto / 30;

  return {
    sueldoBruto: Math.round(sueldoBruto),
    diasHabilesProporcionales: Math.round(diasHabilesProporcionales * 100) / 100,
    diasHabilesPendientes: Math.round(diasHabilesPendientes * 100) / 100,
    diasHabilesTotales: Math.round(diasHabilesTotales * 100) / 100,
    diasCorridosIndemnizables: Math.round(diasCorridosIndemnizables * 100) / 100,
    valorDiaCorrida: Math.round(valorDiaCorrida),
    totalVacaciones: Math.round(diasCorridosIndemnizables * valorDiaCorrida),
    calendarioAplicado: fechaTermino !== null,
  };
}

export function vacacionesToResults(result: VacacionesResult): CalculatorResult[] {
  return [
    { label: 'Indemnización estimada', value: result.totalVacaciones, format: 'CLP', highlight: true },
    { label: 'Días corridos indemnizables', value: result.diasCorridosIndemnizables, format: 'days' },
    { label: 'Días hábiles proporcionales', value: result.diasHabilesProporcionales, format: 'days' },
    { label: 'Días hábiles pendientes', value: result.diasHabilesPendientes, format: 'days' },
    { label: 'Valor por día corrido', value: result.valorDiaCorrida, format: 'CLP' },
  ];
}
