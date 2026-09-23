// ============================================
// Títulos y vigencia para indicadores en vivo
// ----------------------------------------------
// Decide si un valor de UTM/UF/dólar obtenido
// server-side está lo bastante fresco como para
// ponerlo en el <title> y en el bloque SSR de la
// página, y construye ese título.
//
// Zona horaria de referencia: America/Santiago
// (UTM se reajusta por mes calendario chileno).
// ============================================

import { formatCLP } from '@/lib/formatters';

export type LiveKind = 'utm' | 'uf' | 'dolar';

const TIME_ZONE = 'America/Santiago';
const MS_HOUR = 60 * 60 * 1000;

/**
 * Tolerancia a fechas "en el futuro". Las fechas solo-día de
 * BCentral se normalizan a las 12:00 UTC del día indicador, que
 * puede quedar hasta ~15 h por delante de `now` en Santiago.
 */
const FUTURE_TOLERANCE_MS = 24 * MS_HOUR;

/** Máxima antigüedad aceptable por indicador. */
const FRESHNESS_MS: Record<LiveKind, number> = {
  // La UF del día se publica con anticipación; 48 h cubre feriados.
  uf: 48 * MS_HOUR,
  // La UTM es mensual: se evalúa por mes calendario, no por horas.
  utm: 0,
  // El dólar observado no se actualiza fines de semana; 96 h los cubre.
  dolar: 96 * MS_HOUR,
};

export interface LiveValueInput {
  value: number;
  source: string;
  date?: string;
}

function toSantiagoParts(date: Date): { year: number; month: number; day: number } | null {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: TIME_ZONE,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).formatToParts(date);
    const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
    const year = get('year');
    const month = get('month');
    const day = get('day');
    if (!year || !month || !day) return null;
    return { year, month, day };
  } catch {
    return null;
  }
}

function parseDate(date: string | undefined): Date | null {
  if (!date) return null;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * ¿El valor está fresco para mostrarlo como "valor actual"?
 *
 * - `source === 'fallback'` nunca es fresco (es un snapshot estático).
 * - `value <= 0` o fecha faltante/inválida tampoco.
 * - UTM: el mes y año de `date` (en America/Santiago) deben coincidir
 *   con los de `now`.
 * - UF: `date` debe estar a menos de 48 h de `now`.
 * - Dólar: `date` debe estar a menos de 96 h de `now` (fines de semana).
 */
export function isLiveValueFresh(
  kind: LiveKind,
  input: LiveValueInput,
  now: Date,
): boolean {
  if (input.source === 'fallback') return false;
  if (!(input.value > 0)) return false;
  const date = parseDate(input.date);
  if (!date) return false;

  if (kind === 'utm') {
    const d = toSantiagoParts(date);
    const n = toSantiagoParts(now);
    if (!d || !n) return false;
    return d.year === n.year && d.month === n.month;
  }

  const ageMs = now.getTime() - date.getTime();
  if (ageMs < -FUTURE_TOLERANCE_MS) return false; // fecha futura sospechosa (>24 h adelante)
  return ageMs <= FRESHNESS_MS[kind];
}

export const MESES_ES_CL = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

export function formatCLP2(value: number): string {
  return `$${value.toLocaleString('es-CL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDDMMYYYY(date: Date): string {
  const parts = toSantiagoParts(date);
  if (!parts) return '';
  const dd = String(parts.day).padStart(2, '0');
  const mm = String(parts.month).padStart(2, '0');
  return `${dd}-${mm}-${parts.year}`;
}

/**
 * Título SEO con el valor en vivo. La plantilla del root layout
 * agrega " | CalculaChile". Devuelve `null` si la fecha no se
 * puede interpretar en America/Santiago.
 */
export function buildLiveValueTitle(
  kind: LiveKind,
  value: number,
  date: Date,
  _now: Date,
): string | null {
  const parts = toSantiagoParts(date);
  if (!parts) return null;

  if (kind === 'utm') {
    const mes = MESES_ES_CL[parts.month - 1];
    return `UTM ${mes} ${parts.year}: ${formatCLP(value)} | UTM a pesos`;
  }
  const fecha = `${String(parts.day).padStart(2, '0')}-${String(parts.month).padStart(2, '0')}-${parts.year}`;
  if (kind === 'uf') {
    return `UF hoy ${fecha}: ${formatCLP2(value)} | UF a pesos`;
  }
  return `Dólar hoy ${fecha}: ${formatCLP2(value)} | Dólar a pesos`;
}

export { formatDDMMYYYY, toSantiagoParts };
