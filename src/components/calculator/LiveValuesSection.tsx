'use client';

import { memo } from 'react';
import { TrendingUp, Wifi } from 'lucide-react';
import { useValues } from '@/lib/context/ValuesContext';
import { INGRESO_MINIMO } from '@/lib/values/constants';

const formatCLP = (n: number, decimals = 0) =>
  n.toLocaleString('es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const formatDateTime = (iso: string | null) => {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleString('es-CL', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return null;
  }
};

const SOURCE_LABEL = {
  bcentral: 'En vivo · BCentral',
  mindicador: 'En vivo · Mindicador',
  fallback: 'Fuente oficial',
} as const;

/**
 * Sección compacta con UF, UTM, dólar e ingreso mínimo.
 * Diseñada para ir dentro del shell de una calculadora.
 */
const LiveValuesSection = memo(function LiveValuesSection() {
  const { uf, utm, dolar, loading, source, lastUpdated } = useValues();
  const updated = formatDateTime(lastUpdated);
  const isLive = source === 'bcentral' || source === 'mindicador';

  const items = [
    { label: 'UF', value: loading ? '…' : `$${formatCLP(uf, 2)}` },
    { label: 'UTM', value: loading ? '…' : `$${formatCLP(utm)}` },
    { label: 'Dólar', value: loading ? '…' : `$${formatCLP(dolar.observado, 2)}` },
    { label: 'Ing. Mínimo', value: `$${formatCLP(INGRESO_MINIMO.mensual)}` },
  ];

  return (
    <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--background-secondary)]/50">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
          <TrendingUp className="h-3.5 w-3.5 text-[var(--color-primary-500)]" />
          Valores oficiales 2026
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
          <Wifi
            className={`h-3 w-3 ${
              isLive ? 'text-[var(--color-success-500)]' : 'text-[var(--foreground-muted)]'
            }`}
          />
          {SOURCE_LABEL[source]}
          {updated && <span className="hidden sm:inline opacity-60">· {updated}</span>}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[var(--border)]">
        {items.map((it) => (
          <div key={it.label} className="px-4 py-3">
            <div className="text-[10px] font-medium uppercase tracking-wide text-[var(--foreground-muted)]">
              {it.label}
            </div>
            <div className="mt-0.5 text-sm font-semibold tabular-nums text-[var(--foreground)]">
              {it.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default LiveValuesSection;
