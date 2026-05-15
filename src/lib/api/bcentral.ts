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
    // Timeout o network error → no rompemos al caller
    console.error(`[BCentral] Network error para ${codigo}:`, error);
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
 * Devuelve el último valor disponible de una serie (o `null`).
 */
export async function fetchLatestValue(codigo: string): Promise<number | null> {
  const values = await fetchBCentral(codigo);
  if (values.length === 0) return null;
  const last = values[values.length - 1].valor;
  return Number.isFinite(last) ? last : null;
}

/**
 * Obtiene UF, UTM, Dólar observado y venta en paralelo.
 * Cada serie devuelve `null` si su request individual falló.
 */
export async function fetchAllCurrentValues() {
  const [uf, utm, dolarObs, dolarVta] = await Promise.all([
    fetchLatestValue(BCENTRAL_CODES.UF_DIARIO),
    fetchLatestValue(BCENTRAL_CODES.UTM_MENSUAL),
    fetchLatestValue(BCENTRAL_CODES.DOLAR_OBSERVADO),
    fetchLatestValue(BCENTRAL_CODES.DOLAR_VENTA),
  ]);

  return {
    uf,
    utm,
    dolar: {
      observado: dolarObs,
      venta: dolarVta,
    },
  };
}
