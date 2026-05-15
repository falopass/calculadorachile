// API Route: Proxy para indicadores económicos chilenos.
// GET /api/values → UF, UTM, Dólar actualizados.
//
// Estrategia:
//   1. Si hay credenciales BCentral, intentamos esa fuente primero
//      (fuente oficial, granularidad por serie).
//   2. Si BCentral falla o devuelve campos `null`, completamos los
//      huecos con Mindicador.cl (público, sin credenciales).
//   3. Si Mindicador también falla, caemos a FALLBACK_VALUES estáticos.
//
// Cache:
//   - `revalidate = 3600` para Next Data Cache.
//   - `Cache-Control: s-maxage=3600, stale-while-revalidate=86400`
//     para CDNs / browsers.

import { NextResponse } from 'next/server';
import { fetchAllCurrentValues } from '@/lib/api/bcentral';
import { fetchMindicadorValores } from '@/lib/api/mindicador';
import { FALLBACK_VALUES } from '@/lib/values/fallback';

const ONE_HOUR = 60 * 60;
const ONE_DAY = 24 * ONE_HOUR;

// Next.js exige que `revalidate` sea un literal numérico parseable
// estáticamente (no acepta expresiones).
export const revalidate = 3600;

/** Origen de cada campo en la respuesta. */
type Source = 'bcentral' | 'mindicador' | 'fallback';

interface ValuesResponse {
  uf: number;
  utm: number;
  dolar: { observado: number; venta: number };
  updatedAt: string;
  /** Fuente "predominante" (la que entregó UF). Compatible con la API anterior. */
  source: Source;
  /** Detalle por campo: útil para diagnóstico. */
  freshness: {
    uf: Source;
    utm: Source;
    dolarObservado: Source;
    dolarVenta: Source;
  };
}

function buildResponse(payload: ValuesResponse) {
  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': `public, s-maxage=${ONE_HOUR}, stale-while-revalidate=${ONE_DAY}`,
      'CDN-Cache-Control': `public, s-maxage=${ONE_HOUR}`,
    },
  });
}

export async function GET() {
  // 1. BCentral (oficial, requiere credenciales)
  let bcentral: Awaited<ReturnType<typeof fetchAllCurrentValues>> = {
    uf: null,
    utm: null,
    dolar: { observado: null, venta: null },
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
  ): { value: T; source: Source } => {
    if (bcentralVal != null) return { value: bcentralVal, source: 'bcentral' };
    if (mindicadorVal != null)
      return { value: mindicadorVal, source: 'mindicador' };
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

  // La "fuente predominante" sigue la del UF, que es la más visible.
  const predominantSource: Source = uf.source;

  return buildResponse({
    uf: uf.value,
    utm: utm.value,
    dolar: {
      observado: dolarObs.value,
      venta: venta.value,
    },
    updatedAt: new Date().toISOString(),
    source: predominantSource,
    freshness: {
      uf: uf.source,
      utm: utm.source,
      dolarObservado: dolarObs.source,
      dolarVenta: venta.source,
    },
  });
}
