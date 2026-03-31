'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useLiveValues } from '@/lib/hooks/useLiveValues';

export interface ValuesContextType {
  uf: number;
  utm: number;
  dolar: { observado: number; venta: number };
  loading: boolean;
  source: 'bcentral' | 'fallback';
  lastUpdated: string | null;
}

const ValuesContext = createContext<ValuesContextType | null>(null);

/**
 * Provider para valores en tiempo real del BCentral
 */
export function ValuesProvider({ children }: { children: ReactNode }) {
  const { uf, utm, dolar, loading, lastUpdated, source } = useLiveValues();

  return (
    <ValuesContext.Provider value={{ uf, utm, dolar, loading, source, lastUpdated }}>
      {children}
    </ValuesContext.Provider>
  );
}

/**
 * Hook para consumir valores del BCentral
 */
export function useValues(): ValuesContextType {
  const context = useContext(ValuesContext);
  if (!context) {
    // Fallback si no hay provider - Valores actualizados Marzo 2026
    return {
      uf: 39841.72,        // UF 31/03/2026
      utm: 69889,          // UTM Marzo 2026
      dolar: { observado: 931.57, venta: 960 }, // Dólar 30/03/2026
      loading: false,
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
    };
  }
  return context;
}
