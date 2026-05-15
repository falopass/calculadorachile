'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useLiveValues } from '@/lib/hooks/useLiveValues';
import { FALLBACK_VALUES } from '@/lib/values/fallback';

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
 * Provider para valores en tiempo real (UF/UTM/dólar) del BCentral.
 *
 * Sólo debería montarse en rutas que realmente consumen los valores
 * (ej. /calculadoras). Para evitar peticiones innecesarias en blog,
 * legales o FAQ, no lo coloques en el root layout.
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
 * Hook para consumir valores del BCentral.
 *
 * Si se usa fuera de `<ValuesProvider>` devuelve los valores de fallback
 * unificados (sin disparar fetch). Esto permite que componentes
 * compartidos no exploten al renderizarse en páginas sin provider.
 */
export function useValues(): ValuesContextType {
  const context = useContext(ValuesContext);
  if (context) return context;

  return {
    uf: FALLBACK_VALUES.uf,
    utm: FALLBACK_VALUES.utm,
    dolar: { ...FALLBACK_VALUES.dolar },
    loading: false,
    source: 'fallback',
    lastUpdated: FALLBACK_VALUES.asOf,
  };
}
