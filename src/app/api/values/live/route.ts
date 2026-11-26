// GET /api/values/live → mismos indicadores que /api/values pero sin caché
// ISR: cada request llama getCurrentValues() en vivo. Sirve como health
// check real de la cadena BCentral → Mindicador → fallback (el campo
// `health` del payload reporta per-field freshness y allFallback).
//
// `Cache-Control: no-store` para que ni CDN ni browsers guarden la
// respuesta — el diagnóstico debe medir la generación actual.

import { NextResponse } from 'next/server';
import { getCurrentValues } from '@/lib/api/current-values';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { values } = await getCurrentValues();
  return NextResponse.json(values, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
