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
 * agrega " | CalculaChile", salvo en la UF: su página usa
 * `title.absolute` (TITLE_SIN_SUFIJO en calculadoras/[slug]/page.tsx).
 * Devuelve `null` si la fecha no se puede interpretar en America/Santiago.
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
    // E-049: mes + valor desde el indicador vivo (no se queda en "noviembre"
    // cuando el 01-12 cambie la UTM). ≤60 caracteres con valores habituales.
    const mes = MESES_ES_CL[parts.month - 1];
    return `UTM ${mes} ${parts.year}: ${formatCLP(value)} y conversión a pesos`;
  }
  const fecha = `${String(parts.day).padStart(2, '0')}-${String(parts.month).padStart(2, '0')}-${parts.year}`;
  if (kind === 'uf') {
    return `UF hoy ${fecha}: ${formatCLP2(value)} | Tabla UF a pesos`;
  }
  return `Dólar hoy ${fecha}: ${formatCLP2(value)} | Dólar a pesos`;
}

/**
 * Meta description con el valor en vivo (solo UTM por ahora).
 * Devuelve `null` para otros indicadores o si la fecha no se interpreta.
 */
export function buildLiveValueDescription(
  kind: LiveKind,
  value: number,
  date: Date,
): string | null {
  if (kind !== 'utm') return null;
  const parts = toSantiagoParts(date);
  if (!parts) return null;
  const mes = MESES_ES_CL[parts.month - 1];
  // Base dinámica; el aviso del mes siguiente (si el SII ya lo publicó) lo
  // agrega buildLiveValueDescriptionWithCalendar cuando hay tabla.
  return `UTM de ${mes} de ${parts.year}: ${formatCLP(value)} (SII). Convierte UTM a pesos, multas, UTM vs UTA y UF, y qué mes usar.`;
}

/**
 * Meta UTM con eventual mención del mes siguiente si está en la tabla SII
 * del año (p. ej. diciembre ya publicado en noviembre).
 */
export function buildLiveValueDescriptionWithCalendar(
  kind: LiveKind,
  value: number,
  date: Date,
  calendar: Record<number, number> | null | undefined,
): string | null {
  const base = buildLiveValueDescription(kind, value, date);
  if (!base || kind !== 'utm' || !calendar) return base;
  const parts = toSantiagoParts(date);
  if (!parts) return base;
  const nextMonth = parts.month === 12 ? 1 : parts.month + 1;
  const nextYear = parts.month === 12 ? parts.year + 1 : parts.year;
  // Solo anunciamos el mes siguiente del mismo año calendario de la tabla.
  if (nextYear !== parts.year) return base;
  const nextVal = calendar[nextMonth];
  if (!(nextVal > 0)) return base;
  const nextName = MESES_ES_CL[nextMonth - 1];
  const extra = ` ${nextName.charAt(0).toUpperCase() + nextName.slice(1)}: ${formatCLP(nextVal)}.`;
  const combined = base + extra;
  return combined.length <= 155 ? combined : base;
}

export { formatDDMMYYYY, toSantiagoParts };
