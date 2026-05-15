'use client';

import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { FALLBACK_VALUES } from '@/lib/values/fallback';
import { INGRESO_MINIMO } from '@/lib/values/constants';

interface ValuesPayload {
  uf: number;
  utm: number;
  dolar: { observado: number; venta: number };
  source: 'bcentral' | 'fallback';
  updatedAt: string;
}

const formatCLP = (n: number, decimals = 0) =>
  n.toLocaleString('es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/**
 * Tira de valores en vivo (UF, UTM, dólar, ingreso mínimo).
 * Hidrata con fallback estático y luego refresca desde /api/values.
 */
export default function LiveValuesStrip() {
  const [data, setData] = useState<ValuesPayload>({
    uf: FALLBACK_VALUES.uf,
    utm: FALLBACK_VALUES.utm,
    dolar: { ...FALLBACK_VALUES.dolar },
    source: 'fallback',
    updatedAt: FALLBACK_VALUES.asOf,
  });

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/values', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json: ValuesPayload) => setData(json))
      .catch(() => {
        /* mantener fallback */
      });
    return () => controller.abort();
  }, []);

  const items = [
    { label: 'UF', value: `$${formatCLP(data.uf, 2)}`, hint: 'Hoy' },
    { label: 'UTM', value: `$${formatCLP(data.utm)}`, hint: 'Mes' },
    { label: 'Dólar', value: `$${formatCLP(data.dolar.observado, 2)}`, hint: 'Observado' },
    { label: 'Ing. Mínimo', value: `$${formatCLP(INGRESO_MINIMO.mensual)}`, hint: '2026' },
  ];

  return (
    <div className="card-elevated overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-[var(--border)] bg-[var(--background-secondary)]/60">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-[var(--color-primary-500)]" />
          <span className="text-sm font-semibold text-[var(--foreground)]">
            Valores oficiales hoy
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              data.source === 'bcentral'
                ? 'bg-[var(--color-success-500)] animate-pulse-soft'
                : 'bg-[var(--foreground-muted)]'
            }`}
          />
          {data.source === 'bcentral' ? 'En vivo · Banco Central' : 'Última actualización oficial'}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[var(--border)]">
        {items.map((it) => (
          <div key={it.label} className="px-5 py-4">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[var(--foreground-muted)]">
              {it.label}
              <span className="text-[10px] font-normal normal-case opacity-60">{it.hint}</span>
            </div>
            <div className="mt-1 text-lg font-semibold text-[var(--foreground)] tabular-nums">
              {it.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
