'use client';

import { useEffect, useState } from 'react';
import { loadCalculationFn, type CalculateFn } from '@/lib/calculations/load-calculator';
import { useValues } from '@/lib/context/ValuesContext';

/**
 * Carga perezosa del adaptador de cálculo de una calculadora del
 * catálogo, con UF/UTM en vivo inyectados desde `useValues()`.
 *
 * Devuelve `{ calculateFn: null, missing: false }` mientras carga;
 * `missing: true` si el id no está cableado o la carga falló.
 */
export function useCalculationFn(calculatorId: string): {
  calculateFn: CalculateFn | null;
  missing: boolean;
} {
  const { uf, utm } = useValues();
  const [calculateFn, setCalculateFn] = useState<CalculateFn | null>(null);
  const [missing, setMissing] = useState(false);

  // Al cambiar de calculadora, limpia el fn para mostrar skeleton (no al
  // refrescar UF: ahí se intercambia el adapter en caliente).
  useEffect(() => {
    setCalculateFn(null);
    setMissing(false);
  }, [calculatorId]);

  // Carga perezosa del módulo + inyección de UF/UTM en vivo.
  useEffect(() => {
    let cancelled = false;

    loadCalculationFn(calculatorId, {
      valorUF: uf > 0 ? uf : undefined,
      valorUTM: utm > 0 ? utm : undefined,
    })
      .then((fn) => {
        if (cancelled) return;
        if (fn) {
          setCalculateFn(() => fn);
          setMissing(false);
        } else {
          setCalculateFn(null);
          setMissing(true);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setCalculateFn(null);
        setMissing(true);
      });

    return () => {
      cancelled = true;
    };
  }, [calculatorId, uf, utm]);

  return { calculateFn, missing };
}
