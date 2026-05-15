'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useLiveValues, type ValuesSource } from '@/lib/hooks/useLiveValues';
import { FALLBACK_VALUES } from '@/lib/values/fallback';

export interface ValuesContextType {
  uf: number;
  utm: number;
  dolar: { observado: number; venta: number };
  loading: boolean;
  source: ValuesSource;
  lastUpdated: string | null;
}

const ValuesContext = createContext<ValuesContextType | null>(null);

/**
 * Provider para valores en tiempo real (UF/UTM/dólar).
 *
 * Sólo debería montarse en rutas que realmente consumen los valores
 * (ej. /calculadoras). En el root layout dispararía fetches
 * innecesarios en blog, legales y FAQ.
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
 * Hook para consumir valores en cualquier componente cliente.
 *
 * Fuera de `<ValuesProvider>` devuelve los fallback estáticos (sin
 * disparar fetch). Permite que componentes compartidos rendericen
 * en páginas sin provider sin explotar.
 */
export function useValues(): ValuesContextType {
  const ctx = useContext(ValuesContext);
  if (ctx) return ctx;

  return {
    uf: FALLBACK_VALUES.uf,
    utm: FALLBACK_VALUES.utm,
    dolar: { ...FALLBACK_VALUES.dolar },
    loading: false,
    source: 'fallback',
    lastUpdated: FALLBACK_VALUES.asOf,
  };
}
