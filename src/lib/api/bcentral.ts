// Cliente de la API del Banco Central de Chile
// Documentación: https://si3.bcentral.cl/Siete/es/Siete/API
// API REST: https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx

import { BCENTRAL_CODES } from './codigos';
import type { BCentralSerieResponse, ValorBCentral } from './types';

const BCENTRAL_API = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';

// Timeout para no colgar el route handler si BCentral está lento.
const FETCH_TIMEOUT_MS = 5_000;

// Credenciales desde variables de entorno
const BCENTRAL_USER = process.env.BCENTRAL_USER || '';
const BCENTRAL_PASS = process.env.BCENTRAL_PASS || '';

/** Resumen compacto de un error de red: name + cause.code cuando existen. */
function describeError(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  const cause = (error as { cause?: { code?: string } }).cause;
  return cause?.code ? `${error.name} (${cause.code})` : error.name;
}

/**
 * Obtiene datos de la API del BCentral usando el endpoint GetSeries.
 *
 * @param codigo - Código de la serie estadística
 * @param desde - Fecha inicial (YYYY-MM-DD)
 * @param hasta - Fecha final (YYYY-MM-DD)
 * @returns Array de valores con fecha y valor (vacío si la API falla)
 */
export async function fetchBCentral(
  codigo: string,
  desde?: string,
  hasta?: string,
): Promise<ValorBCentral[]> {
  if (!BCENTRAL_USER || !BCENTRAL_PASS) {
    console.warn('[BCentral] Credenciales no configuradas. Devolviendo vacío.');
    return [];
  }

  // Por defecto: últimos 30 días para asegurar al menos un dato.
  const today = new Date();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    user: BCENTRAL_USER,
    pass: BCENTRAL_PASS,
    function: 'GetSeries',
    timeseries: codigo,
    firstdate: desde ?? thirtyDaysAgo.toISOString().split('T')[0],
    lastdate: hasta ?? today.toISOString().split('T')[0],
  });

  const url = `${BCENTRAL_API}?${params.toString()}`;

  let response: Response;
  try {
    response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache 1h en Data Cache de Next
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        Accept: 'application/json',
        'User-Agent': 'CalculaChile/1.0',
      },
    });
  } catch (error) {
    // Timeout o network error → no rompemos al caller.
    // Log compacto sin la URL: las credenciales viajan en el query string.
    console.error(`[BCentral] Network error para ${codigo}: ${describeError(error)}`);
    return [];
  }

  if (!response.ok) {
    console.error(`[BCentral] HTTP ${response.status} para serie ${codigo}`);
    return [];
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    const text = await response.text().catch(() => '');
    console.error(`[BCentral] Respuesta no-JSON: ${text.slice(0, 200)}`);
    return [];
  }

  let data: BCentralSerieResponse;
  try {
    data = (await response.json()) as BCentralSerieResponse;
  } catch (error) {
    console.error(`[BCentral] JSON inválido para ${codigo}:`, error);
    return [];
  }

  if (data.Codigo !== 0 || !data.Series?.Obs?.length) {
    return [];
  }

  return data.Series.Obs.filter((obs) => obs.statusCode === 'OK').map((obs) => {
    // Fecha: DD-MM-YYYY → YYYY-MM-DD
    const [day, month, year] = obs.indexDateString.split('-');
    return {
      fecha: `${year}-${month}-${day}`,
      valor: parseFloat(obs.value.replace(',', '.')),
    };
  });
}

/**
 * Elige la última observación con fecha ≤ `today` (YYYY-MM-DD).
 * La UF se publica con anticipación (hasta el día 9 del mes
 * siguiente), así que la serie puede traer observaciones con
 * fecha futura respecto a hoy en America/Santiago; esas no son
 * el "valor actual".
 */
export function pickLatestNotFuture(
  values: ValorBCentral[],
  today: string,
): ValorBCentral | null {
  const past = values.filter(
    (v) => v.fecha <= today && Number.isFinite(v.valor),
  );
  return past.length > 0 ? past[past.length - 1] : null;
}

/** Fecha de hoy en America/Santiago como YYYY-MM-DD. */
function todaySantiago(now: Date): string {
  return now.toLocaleDateString('en-CA', { timeZone: 'America/Santiago' });
}

/**
 * Devuelve el último valor disponible de una serie (o `null`).
 */
export async function fetchLatestValue(codigo: string): Promise<number | null> {
  const values = await fetchBCentral(codigo);
  const last = pickLatestNotFuture(values, todaySantiago(new Date()));
  return last ? last.valor : null;
}

/**
 * Igual que `fetchLatestValue` pero conserva la fecha del último dato
 * (YYYY-MM-DD). Útil para decidir si un valor sigue vigente.
 */
export async function fetchLatestEntry(
  codigo: string,
): Promise<{ valor: number; fecha: string } | null> {
  const values = await fetchBCentral(codigo);
  const last = pickLatestNotFuture(values, todaySantiago(new Date()));
  return last ? { valor: last.valor, fecha: last.fecha } : null;
}

/**
 * Obtiene UF, UTM, Dólar observado/venta y Euro en paralelo.
 * Cada serie devuelve `null` si su request individual falló.
 */
export async function fetchAllCurrentValues() {
  const [uf, utm, dolarObs, dolarVta, euro] = await Promise.all([
    fetchLatestEntry(BCENTRAL_CODES.UF_DIARIO),
    fetchLatestEntry(BCENTRAL_CODES.UTM_MENSUAL),
    fetchLatestEntry(BCENTRAL_CODES.DOLAR_OBSERVADO),
    fetchLatestEntry(BCENTRAL_CODES.DOLAR_VENTA),
    fetchLatestEntry(BCENTRAL_CODES.EURO_OBSERVADO),
  ]);

  return {
    uf: uf?.valor ?? null,
    utm: utm?.valor ?? null,
    dolar: {
      observado: dolarObs?.valor ?? null,
      venta: dolarVta?.valor ?? null,
    },
    euro: euro?.valor ?? null,
    fechas: {
      uf: uf?.fecha ?? null,
      utm: utm?.fecha ?? null,
      dolar: dolarObs?.fecha ?? null,
    },
  };
}
