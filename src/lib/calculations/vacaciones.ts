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

// Feriados nacionales de 2026 y, desde el 20-10-2026, también de 2027
// (el nombre se mantiene por compatibilidad).
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
  // ===== 2027 (Vigía YMYL, BCN, 20-10-2026) =====
  '2027-03-26', // vie · Viernes Santo (Pascua 28-03-2027) · Ley 2.977 · confirmar con calendario oficial gob.cl 2027
  '2027-03-27', // sáb · Sábado Santo · Ley 2.977 · confirmar con calendario oficial gob.cl 2027
  '2027-05-01', // sáb · Día del Trabajo · CT art. 34 · irrenunciable
  '2027-05-21', // vie · Glorias Navales · Ley 2.977
  '2027-06-21', // lun · Pueblos Indígenas (solsticio) · Ley 21.357 · https://www.bcn.cl/leychile/navegar?idNorma=1161743 · confirmar con calendario oficial gob.cl 2027
  '2027-06-28', // lun · San Pedro y San Pablo (29-06 martes → lunes) · Ley 19.668
  '2027-07-16', // vie · Virgen del Carmen · Ley 20.148
  '2027-08-15', // dom · Asunción de la Virgen · Ley 2.977
  '2027-09-17', // vie · Feriado adicional Fiestas Patrias · Ley 20.983 · https://www.bcn.cl/leychile/navegar?idNorma=1098384
  '2027-09-18', // sáb · Independencia Nacional · irrenunciable
  '2027-09-19', // dom · Glorias del Ejército · irrenunciable
  '2027-10-11', // lun · Encuentro de Dos Mundos (12-10 martes → lunes) · Ley 19.668
  '2027-10-31', // dom · Iglesias Evangélicas · Ley 20.299
  '2027-11-01', // lun · Todos los Santos · Ley 2.977
  '2027-12-08', // mié · Inmaculada Concepción · Ley 2.977
  '2027-12-25', // sáb · Navidad · irrenunciable
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
  if (fraccion > 0) {
    // DT ORD. 826/13 (05-03-2007): https://www.dt.gob.cl/legislacion/1624/w3-article-94453.html
    // La fracción de día que no cabe antes de un sábado, domingo o festivo
    // pasa al día hábil siguiente; los días inhábiles intermedios se pagan.
    const siguiente = new Date(cursor);
    siguiente.setUTCDate(siguiente.getUTCDate() + 1);
    while (!esHabilParaFeriado(siguiente)) {
      corridos += 1;
      siguiente.setUTCDate(siguiente.getUTCDate() + 1);
    }
  }
  return corridos + fraccion;
}

/**
 * Calcula 1,25 días hábiles por mes completo y 1,25/30 por día adicional.
 * Para indemnizar al terminar el contrato, proyecta esos días desde el día
 * siguiente al término e incorpora sábados, domingos y feriados nacionales.
 * Si la fracción de día no cabe antes de un día inhábil, pasa al día hábil
 * siguiente y los inhábiles intermedios se pagan (DT, ORD. 826/13).
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
