'use client';

import { useLiveValues } from '@/lib/hooks/useLiveValues';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * LiveValuesIndicator - Muestra valores actuales de UF, UTM y Dólar
 * 
 * Se puede colocar en el header o en la página de inicio.
 * Muestra indicador de fuente (BCentral o fallback) y última actualización.
 */
export default function LiveValuesIndicator() {
  const { uf, utm, dolar, loading, error, lastUpdated, source, refresh } = useLiveValues();

  const formatUF = (value: number) => {
    return `$${Math.round(value).toLocaleString('es-CL')}`;
  };

  const formatUTM = (value: number) => {
    return `$${Math.round(value).toLocaleString('es-CL')}`;
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Sin actualizar';
    const date = new Date(dateStr);
    return date.toLocaleString('es-CL', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">
            Valores Oficiales
          </h3>
          {source === 'bcentral' ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-success-50)] text-[var(--color-success-600)] text-xs font-medium">
              <CheckCircle2 className="w-3 h-3" />
              BCentral
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-warning-50)] text-[var(--color-warning-600)] text-xs font-medium">
              <AlertCircle className="w-3 h-3" />
              Fallback
            </span>
          )}
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="p-1.5 rounded-lg hover:bg-[var(--background-secondary)] transition-colors disabled:opacity-50"
          aria-label="Actualizar valores"
        >
          <RefreshCw className={`w-4 h-4 text-[var(--foreground-muted)] ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* UF */}
        <div className="text-center p-2 rounded-lg bg-[var(--background-secondary)]">
          <p className="text-[10px] text-[var(--foreground-muted)] uppercase font-medium">UF</p>
          <p className="text-sm font-bold text-[var(--foreground)]">{formatUF(uf)}</p>
        </div>

        {/* UTM */}
        <div className="text-center p-2 rounded-lg bg-[var(--background-secondary)]">
          <p className="text-[10px] text-[var(--foreground-muted)] uppercase font-medium">UTM</p>
          <p className="text-sm font-bold text-[var(--foreground)]">{formatUTM(utm)}</p>
        </div>

        {/* Dólar Observado */}
        <div className="text-center p-2 rounded-lg bg-[var(--background-secondary)]">
          <p className="text-[10px] text-[var(--foreground-muted)] uppercase font-medium">Dólar Obs.</p>
          <p className="text-sm font-bold text-[var(--foreground)]">${dolar.observado}</p>
        </div>

        {/* Dólar Venta */}
        <div className="text-center p-2 rounded-lg bg-[var(--background-secondary)]">
          <p className="text-[10px] text-[var(--foreground-muted)] uppercase font-medium">Dólar Venta</p>
          <p className="text-sm font-bold text-[var(--foreground)]">${dolar.venta}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-[var(--foreground-muted)]">
        <span>Actualizado: {formatDate(lastUpdated)}</span>
        {error && (
          <span className="text-[var(--color-error-500)]">Error: {error}</span>
        )}
      </div>
    </div>
  );
}
