// API Route: Proxy para indicadores económicos chilenos.
// GET /api/values → UF, UTM, Dólar, Euro actualizados.
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
import { getCurrentValues, type ValuesResponse } from '@/lib/api/current-values';

const ONE_HOUR = 60 * 60;
const ONE_DAY = 24 * ONE_HOUR;

// Next.js exige que `revalidate` sea un literal numérico parseable
// estáticamente (no acepta expresiones).
export const revalidate = 3600;

function buildResponse(payload: ValuesResponse) {
  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': `public, s-maxage=${ONE_HOUR}, stale-while-revalidate=${ONE_DAY}`,
      'CDN-Cache-Control': `public, s-maxage=${ONE_HOUR}`,
    },
  });
}

export async function GET() {
  const { values } = await getCurrentValues();
  return buildResponse(values);
}
