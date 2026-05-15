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

const MINDICADOR_API = 'https://mindicador.cl/api';
const FETCH_TIMEOUT_MS = 5_000;

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
  /** ISO date del último valor de UF (la fuente fresca por defecto). */
  asOf: string | null;
}

/**
 * Fetch a Mindicador con timeout y manejo defensivo de errores.
 * Nunca lanza: si falla, devuelve `null` en cada campo.
 */
export async function fetchMindicadorValores(): Promise<MindicadorValores> {
  const empty: MindicadorValores = {
    uf: null,
    utm: null,
    dolar: null,
    asOf: null,
  };

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
    console.error('[Mindicador] Network error:', error);
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

  const safeNumber = (v: unknown) =>
    typeof v === 'number' && Number.isFinite(v) ? v : null;

  return {
    uf: safeNumber(data.uf?.valor),
    utm: safeNumber(data.utm?.valor),
    dolar: safeNumber(data.dolar?.valor),
    asOf: data.uf?.fecha ?? data.dolar?.fecha ?? data.fecha ?? null,
  };
}
