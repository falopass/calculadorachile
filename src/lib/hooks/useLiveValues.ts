'use client';

import { useState, useEffect, useCallback } from 'react';
import { FALLBACK_VALUES } from '@/lib/values/fallback';

export type ValuesSource = 'bcentral' | 'mindicador' | 'fallback';

export interface LiveValues {
  uf: number;
  utm: number;
  dolar: { observado: number; venta: number };
  /** Paridad EUR/CLP (Euro observado). */
  euro: number;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  /** Día (AAAA-MM-DD) al que corresponde `uf`, si la API lo informa. */
  ufFecha?: string;
  source: ValuesSource;
  /** Detalle por campo: útil para diagnóstico. */
  freshness?: {
    uf: ValuesSource;
    utm: ValuesSource;
    dolarObservado: ValuesSource;
    dolarVenta: ValuesSource;
    euro?: ValuesSource;
  };
}

/**
 * Hook para obtener valores actualizados de UF / UTM / dólar / euro.
 *
 * Bajo el capó pega a `/api/values`, que a su vez consulta BCentral
 * (si hay credenciales) y Mindicador.cl como fallback. Si ambas
 * fuentes fallan, devuelve los valores estáticos de
 * `FALLBACK_VALUES`.
 *
 * Por defecto **no hace polling** (UF cambia 1 vez al día). Si una
 * pantalla específica necesita refresco activo, pasar `pollIntervalMs`.
 */
export function useLiveValues(options: {
  pollIntervalMs?: number;
  /**
   * Valores pre-hidratados por el servidor (SSR): el bloque renderiza el
   * dato real en el HTML inicial en vez del respaldo empaquetado, y el
   * fetch de montaje lo refresca igual que antes. Sin `initial`, el
   * comportamiento es idéntico al anterior (fallback + fetch al montar).
   */
  initial?: Partial<LiveValues>;
} = {}) {
  const { pollIntervalMs = 0, initial } = options;

  const [data, setData] = useState<LiveValues>({
    uf: initial?.uf ?? FALLBACK_VALUES.uf,
    utm: initial?.utm ?? FALLBACK_VALUES.utm,
    dolar: initial?.dolar ? { ...initial.dolar } : { ...FALLBACK_VALUES.dolar },
    euro: initial?.euro ?? FALLBACK_VALUES.euro,
    loading: true,
    error: null,
    lastUpdated: initial?.lastUpdated ?? null,
    ufFecha: initial?.ufFecha,
    source: initial?.source ?? 'fallback',
    freshness: initial?.freshness,
  });

  const fetchValues = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch('/api/values', { signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = (await response.json()) as {
        uf: number;
        utm: number;
        dolar: { observado: number; venta: number };
        euro?: number;
        updatedAt: string;
        ufFecha?: string;
        source: ValuesSource;
        freshness?: LiveValues['freshness'];
      };
      setData((prev) => {
        // La API puede servir una entrada cacheada con la UF del día
        // anterior justo al cambiar de día; un seed SSR más fresco no se
        // retrocede: prevalece el ufFecha mayor.
        const fetchedUfOlder =
          prev.ufFecha != null && json.ufFecha != null && json.ufFecha < prev.ufFecha;
        return {
          uf: fetchedUfOlder ? prev.uf : json.uf,
          utm: json.utm,
          dolar: json.dolar,
          euro: json.euro && json.euro > 0 ? json.euro : FALLBACK_VALUES.euro,
          loading: false,
          error: null,
          // Al conservar la UF del seed se conserva también su fecha y su
          // fuente: el valor visible no se atribuye a la fuente de la
          // respuesta más vieja.
          lastUpdated: fetchedUfOlder ? prev.lastUpdated : json.updatedAt,
          ufFecha: fetchedUfOlder ? prev.ufFecha : json.ufFecha,
          source: fetchedUfOlder ? prev.source : json.source,
          freshness: fetchedUfOlder
            ? { ...json.freshness, uf: prev.freshness?.uf ?? prev.source }
            : json.freshness,
        };
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
