// ============================================
// Cliente Mindicador.cl
// ----------------------------------------------
// Fuente pública (sin credenciales) de indicadores
// económicos chilenos. La usamos como **fallback**
// del Banco Central: si BCentral falla o no hay
// credenciales configuradas, traemos los datos
// desde aquí.
//
// Documentación: https://mindicador.cl/
// ============================================

import { withDeadline } from './deadline';

const MINDICADOR_API = 'https://mindicador.cl/api';
const FETCH_TIMEOUT_MS = 5_000;
/** Plazo total (conexión + cuerpo) aunque el fetch ignore el signal. */
const DEADLINE_MS = FETCH_TIMEOUT_MS + 1_000;

/** Resumen compacto de un error de red: name + cause.code cuando existen. */
function describeError(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  const cause = (error as { cause?: { code?: string } }).cause;
  return cause?.code ? `${error.name} (${cause.code})` : error.name;
}

/**
 * Respuesta del endpoint raíz /api: trae el último valor de cada
 * indicador. La UF y el dólar son diarios; la UTM es mensual.
 */
interface MindicadorIndicator {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: string;
  valor: number;
}

interface MindicadorResponse {
  version: string;
  fecha: string;
  uf?: MindicadorIndicator;
  utm?: MindicadorIndicator;
  dolar?: MindicadorIndicator;
  euro?: MindicadorIndicator;
}

export interface MindicadorValores {
  uf: number | null;
  utm: number | null;
  /** Dólar observado del día. Mindicador no expone "venta" separado. */
  dolar: number | null;
  /** Euro del día (paridad EUR/CLP). */
  euro: number | null;
  /** ISO date del último valor de UF (la fuente fresca por defecto). */
  asOf: string | null;
  /** Fecha reportada por cada indicador (ISO completo tal como lo entrega la API). */
  fechas: {
    uf: string | null;
    utm: string | null;
    dolar: string | null;
  };
}

/**
 * Caché en memoria de corta duración + deduplicación de la promesa en
 * vuelo. Durante `next build` muchas páginas llaman a esta función en
 * paralelo; sin dedup cada una abre su propia conexión a mindicador.cl
 * (y si el sitio responde ECONNRESET son decenas de reintentos).
 * La Data Cache de Next no cubre ese caso porque el fetch falla antes
 * de cachearse. 30 s alcanza para cubrir un build o una ráfaga de
 * requests sin retener datos obsoletos en runtime.
 */
const MEMO_TTL_MS = 30_000;
let cachedResult: { at: number; valores: MindicadorValores } | null = null;
let inFlight: Promise<MindicadorValores> | null = null;

/**
 * Fetch a Mindicador con timeout y manejo defensivo de errores.
 * Nunca lanza: si falla, devuelve `null` en cada campo.
 * Llamadas concurrentes comparten una sola request y el resultado
 * (incluido el vacío por error) se reutiliza durante MEMO_TTL_MS.
 */
export async function fetchMindicadorValores(): Promise<MindicadorValores> {
  if (cachedResult && Date.now() - cachedResult.at < MEMO_TTL_MS) {
    return cachedResult.valores;
  }
  if (inFlight) return inFlight;
  inFlight = withDeadline(requestMindicadorValores(), DEADLINE_MS, emptyValores(), () =>
    console.error(`[Mindicador] Sin respuesta en ${DEADLINE_MS} ms; se usa el respaldo.`),
  )
    .then((valores) => {
      cachedResult = { at: Date.now(), valores };
      return valores;
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

function emptyValores(): MindicadorValores {
  return {
    uf: null,
    utm: null,
    dolar: null,
    euro: null,
    asOf: null,
    fechas: { uf: null, utm: null, dolar: null },
  };
}

async function requestMindicadorValores(): Promise<MindicadorValores> {
  const empty = emptyValores();

  let response: Response;
  try {
    response = await fetch(MINDICADOR_API, {
      // Cache 1h en Data Cache de Next (mismo TTL que BCentral)
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        Accept: 'application/json',
        'User-Agent': 'CalculaChile/1.0 (+https://calculadorachile.cl)',
      },
    });
  } catch (error) {
    console.error(`[Mindicador] Network error: ${describeError(error)}`);
    return empty;
  }

  if (!response.ok) {
    console.error(`[Mindicador] HTTP ${response.status}`);
    return empty;
  }

  let data: MindicadorResponse;
  try {
    data = (await response.json()) as MindicadorResponse;
  } catch (error) {
    console.error('[Mindicador] JSON inválido:', error);
    return empty;
  }

  const safeNumber = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : null);

  return {
    uf: safeNumber(data.uf?.valor),
    utm: safeNumber(data.utm?.valor),
    dolar: safeNumber(data.dolar?.valor),
    euro: safeNumber(data.euro?.valor),
    asOf: data.uf?.fecha ?? data.dolar?.fecha ?? data.fecha ?? null,
    fechas: {
      uf: data.uf?.fecha ?? null,
      utm: data.utm?.fecha ?? null,
      dolar: data.dolar?.fecha ?? null,
    },
  };
}
