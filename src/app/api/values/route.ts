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
//   - `force-dynamic`: la regeneración ISR no consultaba las fuentes en
//     vivo (los fetch de contexto estático enrutan al Data Cache, que
//     fallaba en el Worker) y la entrada salía con respaldo. La respuesta
//     se sigue cacheando una hora en CDN vía `Cache-Control`/`CDN-Cache-Control`.
//   - `memoGet` deduplica ráfagas a 30 s dentro del isolate.

import { NextResponse } from 'next/server';
import { getCurrentValues, type ValuesResponse } from '@/lib/api/current-values';

const ONE_HOUR = 60 * 60;
const ONE_DAY = 24 * ONE_HOUR;

export const dynamic = 'force-dynamic';

function buildResponse(payload: ValuesResponse) {
  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': `public, s-maxage=${ONE_HOUR}, stale-while-revalidate=${ONE_DAY}`,
      'CDN-Cache-Control': `public, s-maxage=${ONE_HOUR}`,
    },
  });
}

export async function GET() {
  const { values } = await getCurrentValues({ live: true });
  return buildResponse(values);
}
