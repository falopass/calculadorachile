'use client';

import { useMemo } from 'react';
import { useLiveValues } from '@/lib/hooks/useLiveValues';
import { INGRESO_MINIMO } from '@/lib/values/constants';

/**
 * OfficialValuesBlock — Bloque 1 de la home.
 *
 * Es lo primero que ve el usuario: los valores oficiales del día en
 * grilla horizontal (UF, UTM, dólar observado, ingreso mínimo 2026).
 * Cada monto se muestra en Geist Mono 500, grande, con la fecha de
 * actualización debajo.
 *
 * Client island: usa `useLiveValues()` directo (no hay ValuesProvider
 * en el root layout, igual que el LiveValuesStrip anterior). Hidrata
 * con fallback estático y refresca desde /api/values al montar.
 *
 * No hardcodea montos: UF/UTM/dólar vienen del hook, el ingreso mínimo
 * de `INGRESO_MINIMO` (constante oficial del proyecto).
 */
export default function OfficialValuesBlock() {
  const { uf, utm, dolar, lastUpdated, source } = useLiveValues();

  const updatedLabel = useMemo(() => {
    if (!lastUpdated) return 'actualizado hoy';
    try {
      return new Date(lastUpdated).toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return 'actualizado hoy';
    }
  }, [lastUpdated]);

  const sourceLabel = useMemo(() => {
    if (source === 'bcentral') return 'Banco Central de Chile';
    if (source === 'mindicador') return 'Mindicador / fuentes oficiales';
    return 'Valores oficiales de respaldo';
  }, [source]);

  const items = [
    { label: 'UF', value: formatCLP(uf, 2) },
    { label: 'UTM', value: formatCLP(utm) },
    { label: 'Dólar observado', value: formatCLP(dolar.observado, 2) },
    { label: 'Ingreso mínimo 2026', value: formatCLP(INGRESO_MINIMO.mensual) },
  ];

  return (
    <section className="border-b border-[var(--border)]">
      <div className="container-base py-8 md:py-10">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--foreground-muted)]">
          Valores oficiales
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[var(--foreground)] md:text-5xl">
          Calculadoras chilenas 2026
        </h1>

        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="bg-[var(--surface)] p-5 md:p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--foreground-muted)]">
                {item.label}
              </p>
              <p className="mt-3 font-mono text-3xl font-medium tracking-[-0.03em] text-[var(--foreground)] md:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-xs text-[var(--foreground-muted)]">
                {updatedLabel}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-3 text-xs text-[var(--foreground-muted)]">
          {sourceLabel} — {updatedLabel}
        </p>
      </div>
    </section>
  );
}

function formatCLP(value: number, decimals = 0) {
  return `$${value.toLocaleString('es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}
