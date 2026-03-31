// API Route: Proxy para la API del BCentral
// GET /api/values - Obtiene UF, UTM, Dólar actualizados

import { NextResponse } from 'next/server';
import { fetchAllCurrentValues } from '@/lib/api/bcentral';

// Valores de fallback si la API del BCentral falla
// Actualizados al 31 de Marzo 2026
const FALLBACK_VALUES = {
  uf: 39841.72,        // UF 31/03/2026
  utm: 69889,          // UTM Marzo 2026
  dolar: {
    observado: 931.57, // Dólar observado 30/03/2026
    venta: 960,        // Dólar venta estimado
  },
};

export const revalidate = 3600; // Revalidar cada hora

export async function GET() {
  try {
    const values = await fetchAllCurrentValues();

    // Si algún valor es null, usar fallback
    const response = {
      uf: values.uf ?? FALLBACK_VALUES.uf,
      utm: values.utm ?? FALLBACK_VALUES.utm,
      dolar: {
        observado: values.dolar.observado ?? FALLBACK_VALUES.dolar.observado,
        venta: values.dolar.venta ?? FALLBACK_VALUES.dolar.venta,
      },
      updatedAt: new Date().toISOString(),
      source: (values.uf && values.utm) ? 'bcentral' : 'fallback',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[BCentral API] Error fetching values:', error);
    
    // Retornar valores de fallback en caso de error
    return NextResponse.json({
      ...FALLBACK_VALUES,
      updatedAt: new Date().toISOString(),
      source: 'fallback',
    });
  }
}
