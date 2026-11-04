// ============================================
// Días hábiles en Chile (E-040)
// --------------------------------------------
// Dos regímenes de cómputo según la materia:
//
// - Administrativo/laboral (incluirSabados = false): son inhábiles los
//   sábados, domingos y festivos; el plazo corre desde el día siguiente
//   a la notificación/publicación y, si el último día es inhábil, se
//   prorroga al primer día hábil siguiente.
//   Fuente: Ley 19.880, art. 25 — BCN_LEY_19880.
//
// - Judicial (incluirSabados = true): "son días hábiles los no feriados"
//   (CPC art. 59), por lo que el sábado SÍ cuenta; solo se suspenden
//   los términos durante los días feriados (CPC art. 66): domingos y
//   festivos legales.
//   Fuente: Código de Procedimiento Civil, arts. 59 y 66 — BCN_CPC.
//
// Feriados: fuente única en src/lib/feriados.ts (2026 verificado;
// 2027 mezcla verificado/pendiente mientras gob.cl no publique el
// calendario oficial). Los feriados `pendiente` dentro del rango se
// reportan en `feriadosPendientesEnRango` y se advierten en `note`.
// ============================================

import type { CalculatorResult } from '@/types/calculator';
import {
  BCN_LEY_2977,
  FERIADOS_2026,
  FERIADOS_2027,
  FERIADOS_NACIONALES_CALCULO,
} from '@/lib/feriados';

const BCN_LEY_19880 = 'https://www.bcn.cl/leychile/navegar?idNorma=210676';
const BCN_CPC = 'https://www.bcn.cl/leychile/navegar?idNorma=22740';

export type ModoDiasHabiles = 'entre-fechas' | 'sumar-dias';

export interface DiasHabilesInput {
  /** 'entre-fechas' cuenta hábiles; 'sumar-dias' proyecta el vencimiento. */
  modo?: ModoDiasHabiles;
  /** Fecha de inicio del plazo en formato YYYY-MM-DD (día cero: no se cuenta). */
  fechaInicio: string;
  /** Fecha de término YYYY-MM-DD (inclusive). Requerida en 'entre-fechas'. */
  fechaFin?: string;
  /** Días hábiles a sumar (>= 1). Requerido en 'sumar-dias'. */
  diasASumar?: number;
  /** false = administrativo (lun–vie); true = judicial (lun–sáb). */
  incluirSabados: boolean;
}

export interface DiasHabilesResult {
  modo: ModoDiasHabiles;
  incluirSabados: boolean;
  fechaInicio: string;
  /** Solo en 'entre-fechas'. */
  fechaFin?: string;
  /** Solo en 'sumar-dias': fecha en que vence el plazo (YYYY-MM-DD). */
  fechaVencimiento?: string;
  diasHabiles: number;
  diasCorridos: number;
  diasInhabiles: number;
  /** Sábados+domingos (administrativo) o solo domingos (judicial). */
  finesDeSemana: number;
  /** Feriados nacionales dentro del rango evaluado (YYYY-MM-DD). */
  feriadosEnRango: string[];
  /** Feriados 2027 con `estado === 'pendiente'` dentro del rango. */
  feriadosPendientesEnRango: string[];
  /** true si el rango sale de los años con calendario de feriados cargado. */
  fueraDeCoberturaFeriados: boolean;
}

const MS_DIA = 86_400_000;
/** Límites anti-bucle: plazos reales nunca se acercan a estos valores. */
const MAX_RANGO_DIAS = 36_600; // ~100 años
const MAX_DIAS_A_SUMAR = 10_000;

const DIAS_SEMANA = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
];

const NOMBRE_POR_FECHA = new Map(FERIADOS_2027.map((f) => [f.fecha, f.nombre]));
const PENDIENTES_2027 = new Set(
  FERIADOS_2027.filter((f) => f.estado === 'pendiente').map((f) => f.fecha),
);
const ANOS_CON_FERIADOS = [
  ...FERIADOS_2026.map((f) => Number(f.slice(0, 4))),
  ...FERIADOS_2027.map((f) => Number(f.fecha.slice(0, 4))),
];
const ANO_MIN_FERIADOS = Math.min(...ANOS_CON_FERIADOS);
const ANO_MAX_FERIADOS = Math.max(...ANOS_CON_FERIADOS);

/** Parsea YYYY-MM-DD en UTC; rechaza formatos y fechas imposibles (30-02). */
function parseFechaISO(fecha: string | undefined): Date | null {
  if (typeof fecha !== 'string') return null;
  const f = fecha.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(f)) return null;
  const d = new Date(`${f}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== f) return null;
  return d;
}

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function esHabil(d: Date, incluirSabados: boolean): boolean {
  const dow = d.getUTCDay();
  if (dow === 0) return false; // domingo siempre inhábil
  if (dow === 6 && !incluirSabados) return false; // sábado solo inhábil en administrativo
  return !FERIADOS_NACIONALES_CALCULO.has(iso(d));
}

interface Recorrido {
  diasHabiles: number;
  finesDeSemana: number;
  feriadosEnRango: string[];
  feriadosPendientesEnRango: string[];
  fueraDeCobertura: boolean;
}

/** Recorre la ventana (desdeExclusive, hastaInclusive] clasificando cada día. */
function recorrerVentana(
  desdeExclusive: Date,
  hastaInclusive: Date,
  incluirSabados: boolean,
): Recorrido {
  const out: Recorrido = {
    diasHabiles: 0,
    finesDeSemana: 0,
    feriadosEnRango: [],
    feriadosPendientesEnRango: [],
    fueraDeCobertura: false,
  };
  for (let t = desdeExclusive.getTime() + MS_DIA; t <= hastaInclusive.getTime(); t += MS_DIA) {
    const d = new Date(t);
    const clave = iso(d);
    const ano = d.getUTCFullYear();
    if (ano < ANO_MIN_FERIADOS || ano > ANO_MAX_FERIADOS) out.fueraDeCobertura = true;
    const dow = d.getUTCDay();
    if (FERIADOS_NACIONALES_CALCULO.has(clave)) {
      out.feriadosEnRango.push(clave);
      if (PENDIENTES_2027.has(clave)) out.feriadosPendientesEnRango.push(clave);
    } else if (dow === 0 || (dow === 6 && !incluirSabados)) {
      out.finesDeSemana += 1;
    } else {
      out.diasHabiles += 1;
    }
  }
  return out;
}

function diffDias(hasta: Date, desde: Date): number {
  return Math.round((hasta.getTime() - desde.getTime()) / MS_DIA);
}

/** '2027-03-26' → 'viernes 26-03-2027'. */
function fechaConDia(fecha: string): string {
  const d = new Date(`${fecha}T00:00:00Z`);
  const [a, m, dia] = fecha.split('-');
  return `${DIAS_SEMANA[d.getUTCDay()]} ${dia}-${m}-${a}`;
}

/**
 * Cuenta o proyecta días hábiles según el cómputo legal chileno.
 *
 * En ambos modos el día de inicio no se cuenta (art. 25 Ley 19.880:
 * los plazos se computan desde el día siguiente). En 'entre-fechas'
 * el último día sí se cuenta si es hábil.
 */
export function calculateDiasHabiles(input: DiasHabilesInput): DiasHabilesResult {
  const modo: ModoDiasHabiles = input.modo === 'sumar-dias' ? 'sumar-dias' : 'entre-fechas';
  const incluirSabados = input.incluirSabados === true;
  const inicio = parseFechaISO(input.fechaInicio);
  if (!inicio) {
    throw new Error('Ingresa una fecha de inicio válida en formato AAAA-MM-DD.');
  }

  if (modo === 'entre-fechas') {
    const fin = parseFechaISO(input.fechaFin);
    if (!fin) {
      throw new Error('Ingresa una fecha de término válida en formato AAAA-MM-DD.');
    }
    if (fin.getTime() < inicio.getTime()) {
      throw new Error('La fecha de término debe ser igual o posterior a la fecha de inicio.');
    }
    if (diffDias(fin, inicio) > MAX_RANGO_DIAS) {
      throw new Error('El período máximo a evaluar es de 100 años.');
    }
    const r = recorrerVentana(inicio, fin, incluirSabados);
    const diasCorridos = diffDias(fin, inicio);
    return {
      modo,
      incluirSabados,
      fechaInicio: input.fechaInicio.trim(),
      fechaFin: input.fechaFin?.trim(),
      diasHabiles: r.diasHabiles,
      diasCorridos,
      diasInhabiles: diasCorridos - r.diasHabiles,
      finesDeSemana: r.finesDeSemana,
      feriadosEnRango: r.feriadosEnRango,
      feriadosPendientesEnRango: r.feriadosPendientesEnRango,
      fueraDeCoberturaFeriados: r.fueraDeCobertura,
    };
  }

  const n = input.diasASumar;
  if (typeof n !== 'number' || !Number.isInteger(n) || n < 1 || n > MAX_DIAS_A_SUMAR) {
    throw new Error('Ingresa los días hábiles a sumar (entre 1 y 10.000).');
  }
  const cursor = new Date(inicio);
  let contados = 0;
  while (contados < n) {
    cursor.setTime(cursor.getTime() + MS_DIA);
    if (esHabil(cursor, incluirSabados)) contados += 1;
  }
  const r = recorrerVentana(inicio, cursor, incluirSabados);
  const diasCorridos = diffDias(cursor, inicio);
  return {
    modo,
    incluirSabados,
    fechaInicio: input.fechaInicio.trim(),
    fechaVencimiento: iso(cursor),
    diasHabiles: r.diasHabiles,
    diasCorridos,
    diasInhabiles: diasCorridos - r.diasHabiles,
    finesDeSemana: r.finesDeSemana,
    feriadosEnRango: r.feriadosEnRango,
    feriadosPendientesEnRango: r.feriadosPendientesEnRango,
    fueraDeCoberturaFeriados: r.fueraDeCobertura,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[].
 * La fecha de vencimiento va en el label porque `value` es numérica.
 */
export function diasHabilesToResults(result: DiasHabilesResult): CalculatorResult[] {
  const notaComputo: CalculatorResult['note'] = result.incluirSabados
    ? {
        text: 'Cómputo judicial: el sábado es día hábil; solo se suspenden los términos durante los días feriados (domingos y festivos legales). El plazo corre desde el día siguiente a la fecha de inicio.',
        source: { name: 'Código de Procedimiento Civil, arts. 59 y 66 (BCN)', url: BCN_CPC },
      }
    : {
        text: 'Cómputo administrativo/laboral: son inhábiles sábados, domingos y festivos. El plazo se computa desde el día siguiente a la notificación o publicación; si el último día es inhábil, se prorroga al primer día hábil siguiente.',
        source: { name: 'Ley 19.880, art. 25 (BCN)', url: BCN_LEY_19880 },
      };

  const advertencias: string[] = [];
  if (result.feriadosPendientesEnRango.length > 0) {
    const detalle = result.feriadosPendientesEnRango
      .map((f) => `${NOMBRE_POR_FECHA.get(f) ?? 'Feriado'} (${f})`)
      .join(', ');
    advertencias.push(
      `El rango incluye feriados 2027 aún sin fecha oficial confirmada: ${detalle}. La ley fija la regla pero falta el calendario oficial; verifícalos antes de usar este resultado.`,
    );
  }
  if (result.fueraDeCoberturaFeriados) {
    advertencias.push(
      `El calendario de feriados cargado cubre ${ANO_MIN_FERIADOS}–${ANO_MAX_FERIADOS}; fuera de esos años solo se descontaron fines de semana.`,
    );
  }
  const notaFeriados: CalculatorResult['note'] =
    advertencias.length > 0
      ? {
          text: advertencias.join(' '),
          source: { name: 'Ley 2.977 — feriados de Chile (BCN)', url: BCN_LEY_2977 },
        }
      : undefined;

  const filaFinDeSemana: CalculatorResult = {
    label: result.incluirSabados ? 'Domingos inhábiles' : 'Sábados y domingos inhábiles',
    value: result.finesDeSemana,
    format: 'days',
  };
  const filaFeriados: CalculatorResult = {
    label: 'Feriados en el período',
    value: result.feriadosEnRango.length,
    format: 'days',
    ...(notaFeriados ? { note: notaFeriados } : {}),
  };

  if (result.modo === 'sumar-dias' && result.fechaVencimiento) {
    return [
      {
        label: `Vence el ${fechaConDia(result.fechaVencimiento)}`,
        value: result.diasHabiles,
        format: 'days',
        highlight: true,
        note: notaComputo,
      },
      { label: 'Días corridos hasta el vencimiento', value: result.diasCorridos, format: 'days' },
      filaFinDeSemana,
      filaFeriados,
    ];
  }

  return [
    {
      label: 'Días hábiles',
      value: result.diasHabiles,
      format: 'days',
      highlight: true,
      note: notaComputo,
    },
    { label: 'Días corridos del período', value: result.diasCorridos, format: 'days' },
    filaFinDeSemana,
    filaFeriados,
  ];
}
