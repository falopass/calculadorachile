'use client';

import { useState, useEffect, useCallback } from 'react';

export interface LiveValues {
  uf: number;
  utm: number;
  dolar: { observado: number; venta: number };
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  source: 'bcentral' | 'fallback';
}

const DEFAULT_VALUES: Omit<LiveValues, 'loading' | 'error' | 'lastUpdated' | 'source'> = {
  uf: 39841.72,        // UF 31/03/2026
  utm: 69889,          // UTM Marzo 2026
  dolar: { observado: 931.57, venta: 960 }, // Dólar 30/03/2026
};

/**
 * useLiveValues - Hook para obtener valores actualizados del BCentral
 * 
 * Obtiene UF, UTM y Dólar desde la API del BCentral vía proxy local.
 * Usa valores de fallback si la API falla.
 * 
 * @example
 * const { uf, utm, dolar, loading } = useLiveValues();
 */
export function useLiveValues() {
  const [data, setData] = useState<LiveValues>({
    ...DEFAULT_VALUES,
    loading: true,
    error: null,
    lastUpdated: null,
    source: 'fallback',
  });

  const fetchValues = useCallback(async () => {
    try {
      const response = await fetch('/api/values');
      if (!response.ok) throw new Error('Error al obtener valores');
      
      const json = await response.json();
      setData({
        uf: json.uf,
        utm: json.utm,
        dolar: json.dolar,
        loading: false,
        error: null,
        lastUpdated: json.updatedAt,
        source: json.source,
      });
    } catch (error) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        source: 'fallback',
      }));
    }
  }, []);

  useEffect(() => {
    fetchValues();
    // Actualizar cada 30 minutos
    const interval = setInterval(fetchValues, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchValues]);

  return {
    ...data,
    refresh: fetchValues,
  };
}
