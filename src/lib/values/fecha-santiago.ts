// ============================================
// Fecha actual en America/Santiago (el servidor corre en UTC).
// ============================================

const TIME_ZONE = 'America/Santiago';

export interface PartesFecha {
  year: number;
  month: number;
  day: number;
}

/** Año, mes (1-12) y día de `date` en la hora de Chile continental. */
export function partesSantiago(date: Date = new Date()): PartesFecha {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get('year'), month: get('month'), day: get('day') };
}

/** Año en curso en Chile. */
export function anioSantiago(date: Date = new Date()): number {
  return partesSantiago(date).year;
}
