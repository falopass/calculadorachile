// ============================================
// Valores económicos actuales (server-side)
// ----------------------------------------------
// Lógica compartida entre `GET /api/values` y las
// páginas SSR que necesitan UF/UTM/dólar frescos
// (ej. conversores con valor en el HTML).
//
// Prioridad por campo: BCentral → Mindicador →
// FALLBACK_VALUES (snapshot diario del repo).
// ============================================

import { fetchAllCurrentValues } from './bcentral';
import { fetchMindicadorValores } from './mindicador';
import { FALLBACK_VALUES } from '@/lib/values/fallback';

/** Origen de cada campo en la respuesta. */
export type ValuesSource = 'bcentral' | 'mindicador' | 'fallback';

export interface ValuesResponse {
  uf: number;
  utm: number;
  dolar: { observado: number; venta: number };
  /** Paridad EUR/CLP (Euro observado). */
  euro: number;
  updatedAt: string;
  /** Fuente "predominante" (la que entregó UF). Compatible con la API anterior. */
  source: ValuesSource;
  /** Detalle por campo: útil para diagnóstico. */
  freshness: {
    uf: ValuesSource;
    utm: ValuesSource;
    dolarObservado: ValuesSource;
    dolarVenta: ValuesSource;
    euro: ValuesSource;
  };
  /** Salud del pipeline de valores. Los consumidores UI la ignoran. */
  health?: ValuesHealth;
}

export interface ValuesHealth {
  /** ISO del snapshot de fallback que está en uso (o null si no hay). */
  snapshotAsOf: string | null;
  /** Horas desde `snapshotAsOf`, 1 decimal. null si falta o es inválido. */
  snapshotAgeHours: number | null;
  /** Snapshot más viejo que SNAPSHOT_STALE_HOURS (o sin fecha). */
  stale: boolean;
  /** Todos los campos salieron del fallback estático. */
  allFallback: boolean;
  /** `stale` o (todo en fallback y snapshot con más de ALL_FALLBACK_ALERT_HOURS). */
  alert: boolean;
}

/** Horas de antigüedad del snapshot que lo declaran obsoleto. */
export const SNAPSHOT_STALE_HOURS = 48;
/** Horas de antigüedad que alertan cuando todas las fuentes cayeron al fallback. */
export const ALL_FALLBACK_ALERT_HOURS = 24;

/**
 * Evalúa la frescura del pipeline de valores a partir del detalle por
 * campo (`freshness`) y la fecha del snapshot estático.
 *
 * Pensado para telemetría server-side: el resultado se adjunta como
 * `values.health` y, cuando `alert` es true, se loguea una vez por
 * request. Pura y determinista (inyectar `now` en tests).
 */
export function getValuesHealth(
  freshness: ValuesResponse['freshness'],
  snapshotAsOf: string | undefined,
  now = new Date(),
): ValuesHealth {
  const asOfMs = snapshotAsOf ? Date.parse(snapshotAsOf) : NaN;
  const snapshotAgeHours = Number.isFinite(asOfMs)
    ? Math.round(((now.getTime() - asOfMs) / 3_600_000) * 10) / 10
    : null;

  const stale = snapshotAgeHours === null || snapshotAgeHours > SNAPSHOT_STALE_HOURS;
  const allFallback = Object.values(freshness).every((s) => s === 'fallback');
  const alert =
    stale ||
    (allFallback &&
      snapshotAgeHours !== null &&
      snapshotAgeHours > ALL_FALLBACK_ALERT_HOURS);

  return {
    snapshotAsOf: snapshotAsOf ?? null,
    snapshotAgeHours,
    stale,
    allFallback,
    alert,
  };
}

export interface CurrentValues {
  /** Contrato exacto que expone `GET /api/values`. */
  values: ValuesResponse;
  /** Fecha del dato según la fuente que lo entregó (ISO). Solo uso interno. */
  dates: { uf?: string; utm?: string; dolar?: string };
  /** Fuente por indicador, alineada con `dates`. */
  indicatorSources: { uf: ValuesSource; utm: ValuesSource; dolar: ValuesSource };
}

/**
 * Normaliza una fecha de indicador para compararla en America/Santiago.
 *
 * BCentral entrega solo el día (`YYYY-MM-DD`); `new Date('2026-09-23')`
 * cae a medianoche UTC, que en Santiago es el día anterior (21:00 del
 * 22-09). Para no correr la fecha, un valor "solo fecha" se convierte al
 * instante `YYYY-MM-DDT12:00:00.000Z`, que sigue siendo el mismo día
 * calendario en America/Santiago. Los instantes ISO completos (ej. los de
 * Mindicador `2026-09-23T03:00:00.000Z`) se devuelven sin cambios.
 */
export function normalizeIndicatorDate(
  date: string | null | undefined,
): string | undefined {
  if (!date) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return `${date}T12:00:00.000Z`;
  }
  return date;
}

/**
 * Obtiene UF, UTM, dólar y euro con la misma estrategia del route
 * handler: BCentral (si hay credenciales) → Mindicador → fallback.
 *
 * Nunca lanza: cada fetch externo ya devuelve `null` ante error.
 */
export async function getCurrentValues(): Promise<CurrentValues> {
  // 1. BCentral (oficial, requiere credenciales)
  let bcentral: Awaited<ReturnType<typeof fetchAllCurrentValues>> = {
    uf: null,
    utm: null,
    dolar: { observado: null, venta: null },
    euro: null,
    fechas: { uf: null, utm: null, dolar: null },
  };
  try {
    bcentral = await fetchAllCurrentValues();
  } catch (error) {
    console.error('[/api/values] BCentral error:', error);
  }

  // 2. Mindicador (siempre lo pedimos para tener un respaldo listo;
  //    el caché de Next deduplica si ya se solicitó esta hora).
  const mindicador = await fetchMindicadorValores();

  // 3. Resolver cada campo con prioridad bcentral → mindicador → fallback
  const pick = <T>(
    bcentralVal: T | null | undefined,
    mindicadorVal: T | null | undefined,
    fallback: T,
  ): { value: T; source: ValuesSource } => {
    if (bcentralVal != null) return { value: bcentralVal, source: 'bcentral' };
    if (mindicadorVal != null) return { value: mindicadorVal, source: 'mindicador' };
    return { value: fallback, source: 'fallback' };
  };

  const uf = pick(bcentral.uf, mindicador.uf, FALLBACK_VALUES.uf);
  const utm = pick(bcentral.utm, mindicador.utm, FALLBACK_VALUES.utm);
  const dolarObs = pick(
    bcentral.dolar.observado,
    mindicador.dolar,
    FALLBACK_VALUES.dolar.observado,
  );
  // Dólar venta: BCentral lo entrega separado, Mindicador no.
  // Si BCentral falla, derivamos venta a partir del observado de
  // Mindicador con un margen conservador del 0.65% (típico spread).
  const venta = pick(
    bcentral.dolar.venta,
    mindicador.dolar != null ? Math.round(mindicador.dolar * 1.0065 * 100) / 100 : null,
    FALLBACK_VALUES.dolar.venta,
  );
  // Euro: BCentral expone serie diaria oficial; Mindicador la replica.
  const euro = pick(bcentral.euro, mindicador.euro, FALLBACK_VALUES.euro);

  // Fecha del dato según la fuente ganadora por indicador. Si el valor
  // vino del fallback estático, usamos la fecha del snapshot.
  const pickDate = (
    source: ValuesSource,
    bcentralFecha: string | null,
    mindicadorFecha: string | null,
  ): string | undefined => {
    if (source === 'bcentral') return bcentralFecha ?? undefined;
    if (source === 'mindicador') return mindicadorFecha ?? mindicador.asOf ?? undefined;
    return FALLBACK_VALUES.asOf;
  };

  const freshness = {
    uf: uf.source,
    utm: utm.source,
    dolarObservado: dolarObs.source,
    dolarVenta: venta.source,
    euro: euro.source,
  };
  const health = getValuesHealth(freshness, FALLBACK_VALUES.asOf);
  if (health.alert) {
    // Telemetría: un log por request cuando el pipeline está degradado.
    // Sin credenciales ni URLs: solo orígenes por campo y edad del snapshot.
    console.error('[values-alert]', JSON.stringify({ ...health, sources: freshness }));
  }

  return {
    values: {
      uf: uf.value,
      utm: utm.value,
      dolar: {
        observado: dolarObs.value,
        venta: venta.value,
      },
      euro: euro.value,
      updatedAt: new Date().toISOString(),
      // La "fuente predominante" sigue la del UF, que es la más visible.
      source: uf.source,
      freshness,
      health,
    },
    dates: {
      uf: normalizeIndicatorDate(
        pickDate(uf.source, bcentral.fechas.uf, mindicador.fechas.uf),
      ),
      utm: normalizeIndicatorDate(
        pickDate(utm.source, bcentral.fechas.utm, mindicador.fechas.utm),
      ),
      dolar: normalizeIndicatorDate(
        pickDate(dolarObs.source, bcentral.fechas.dolar, mindicador.fechas.dolar),
      ),
    },
    indicatorSources: {
      uf: uf.source,
      utm: utm.source,
      dolar: dolarObs.source,
    },
  };
}
