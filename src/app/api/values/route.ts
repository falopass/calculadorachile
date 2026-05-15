// API Route: Proxy para la API del BCentral
// GET /api/values - Obtiene UF, UTM, Dólar actualizados
//
// Estrategia de cache:
// - Next.js cachea la respuesta `revalidate` segundos (ISR/Data Cache).
// - Además seteamos `Cache-Control` con `s-maxage` y `stale-while-revalidate`
//   para CDNs frente al edge.

import { NextResponse } from 'next/server';
import { fetchAllCurrentValues } from '@/lib/api/bcentral';
import { FALLBACK_VALUES } from '@/lib/values/fallback';

const ONE_HOUR = 60 * 60;
const ONE_DAY = 24 * ONE_HOUR;

// Next.js exige que `revalidate` sea un literal numérico parseable
// estáticamente (no acepta expresiones). 3600 = 1 hora.
export const revalidate = 3600;

interface ValuesResponse {
  uf: number;
  utm: number;
  dolar: { observado: number; venta: number };
  updatedAt: string;
  source: 'bcentral' | 'fallback';
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
  try {
    const values = await fetchAllCurrentValues();

    // Si todos los campos volvieron, marcamos como fuente bcentral.
    const allFresh =
      values.uf != null &&
      values.utm != null &&
      values.dolar.observado != null &&
      values.dolar.venta != null;

    return buildResponse({
      uf: values.uf ?? FALLBACK_VALUES.uf,
      utm: values.utm ?? FALLBACK_VALUES.utm,
      dolar: {
        observado: values.dolar.observado ?? FALLBACK_VALUES.dolar.observado,
        venta: values.dolar.venta ?? FALLBACK_VALUES.dolar.venta,
      },
      updatedAt: new Date().toISOString(),
      source: allFresh ? 'bcentral' : 'fallback',
    });
  } catch (error) {
    console.error('[BCentral API] Error fetching values:', error);

    return buildResponse({
      uf: FALLBACK_VALUES.uf,
      utm: FALLBACK_VALUES.utm,
      dolar: {
        observado: FALLBACK_VALUES.dolar.observado,
        venta: FALLBACK_VALUES.dolar.venta,
      },
      updatedAt: FALLBACK_VALUES.asOf,
      source: 'fallback',
    });
  }
}
