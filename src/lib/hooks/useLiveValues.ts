'use client';

import { useState, useEffect, useCallback } from 'react';
import { FALLBACK_VALUES } from '@/lib/values/fallback';

export type ValuesSource = 'bcentral' | 'mindicador' | 'fallback';

export interface LiveValues {
  uf: number;
  utm: number;
  dolar: { observado: number; venta: number };
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  source: ValuesSource;
  /** Detalle por campo: útil para diagnóstico. */
  freshness?: {
    uf: ValuesSource;
    utm: ValuesSource;
    dolarObservado: ValuesSource;
    dolarVenta: ValuesSource;
  };
}

/**
 * Hook para obtener valores actualizados de UF / UTM / dólar.
 *
 * Bajo el capó pega a `/api/values`, que a su vez consulta BCentral
 * (si hay credenciales) y Mindicador.cl como fallback. Si ambas
 * fuentes fallan, devuelve los valores estáticos de
 * `FALLBACK_VALUES`.
 *
 * Por defecto **no hace polling** (UF cambia 1 vez al día). Si una
 * pantalla específica necesita refresco activo, pasar `pollIntervalMs`.
 */
export function useLiveValues(options: { pollIntervalMs?: number } = {}) {
  const { pollIntervalMs = 0 } = options;

  const [data, setData] = useState<LiveValues>({
    uf: FALLBACK_VALUES.uf,
    utm: FALLBACK_VALUES.utm,
    dolar: { ...FALLBACK_VALUES.dolar },
    loading: true,
    error: null,
    lastUpdated: null,
    source: 'fallback',
  });

  const fetchValues = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch('/api/values', { signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = (await response.json()) as {
        uf: number;
        utm: number;
        dolar: { observado: number; venta: number };
        updatedAt: string;
        source: ValuesSource;
        freshness?: LiveValues['freshness'];
      };
      setData({
        uf: json.uf,
        utm: json.utm,
        dolar: json.dolar,
        loading: false,
        error: null,
        lastUpdated: json.updatedAt,
        source: json.source,
        freshness: json.freshness,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setData((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        source: 'fallback',
      }));
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchValues(controller.signal);

    let interval: ReturnType<typeof setInterval> | undefined;
    if (pollIntervalMs > 0) {
      interval = setInterval(() => fetchValues(controller.signal), pollIntervalMs);
    }

    return () => {
      controller.abort();
      if (interval) clearInterval(interval);
    };
  }, [fetchValues, pollIntervalMs]);

  return {
    ...data,
    refresh: () => fetchValues(),
  };
}
