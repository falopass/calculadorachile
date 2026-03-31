// Cliente de la API del Banco Central de Chile
// Documentación: https://si3.bcentral.cl/Siete/es/Siete/API
// API REST: https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx

import { BCENTRAL_CODES } from './codigos';
import type { BCentralSerieResponse, ValorBCentral } from './types';

const BCENTRAL_API = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';

// Credenciales desde variables de entorno
const BCENTRAL_USER = process.env.BCENTRAL_USER || '';
const BCENTRAL_PASS = process.env.BCENTRAL_PASS || '';

/**
 * Obtiene datos de la API del BCentral usando el endpoint GetSeries
 * 
 * @param codigo - Código de la serie estadística
 * @param desde - Fecha inicial (YYYY-MM-DD)
 * @param hasta - Fecha final (YYYY-MM-DD)
 * @returns Array de valores con fecha y valor
 */
export async function fetchBCentral(
  codigo: string,
  desde?: string,
  hasta?: string
): Promise<ValorBCentral[]> {
  if (!BCENTRAL_USER || !BCENTRAL_PASS) {
    console.warn('BCentral API: Credenciales no configuradas. Usando fallback.');
    return [];
  }

  // Usar fechas por defecto si no se proporcionan (últimos 30 días)
  const defaultHasta = new Date().toISOString().split('T')[0];
  const defaultDesde = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const params = new URLSearchParams({
    user: BCENTRAL_USER,
    pass: BCENTRAL_PASS,
    function: 'GetSeries',
    timeseries: codigo,
    firstdate: desde || defaultDesde,
    lastdate: hasta || defaultHasta,
  });

  const url = `${BCENTRAL_API}?${params.toString()}`;
  
  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache por 1 hora (ISR)
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'CalculaChile/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`BCentral API error: ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await response.text();
    console.error(`[BCentral] Non-JSON response: ${text.substring(0, 200)}`);
    return [];
  }

  const data = await response.json() as BCentralSerieResponse;
  
  if (data.Codigo !== 0 || !data.Series?.Obs?.length) {
    return [];
  }

  return data.Series.Obs
    .filter(obs => obs.statusCode === 'OK')
    .map((obs) => {
      // Convertir fecha de DD-MM-YYYY a YYYY-MM-DD
      const [day, month, year] = obs.indexDateString.split('-');
      const fechaISO = `${year}-${month}-${day}`;
      
      return {
        fecha: fechaISO,
        valor: parseFloat(obs.value.replace(',', '.')),
      };
    });
}

/**
 * Obtiene el último valor disponible de una serie
 */
export async function fetchLatestValue(codigo: string): Promise<number | null> {
  const values = await fetchBCentral(codigo);
  return values.length > 0 ? values[values.length - 1].valor : null;
}

/**
 * Obtiene todos los valores actuales (UF, UTM, Dólar)
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
