'use client';

import { useMemo, useState } from 'react';
import { Wallet } from 'lucide-react';

import { formatCLP } from '@/lib/formatters';
import { calculateFinancialCoverage } from '@/lib/financial-coverage';

const INPUT_CLASS_NAME =
  'mt-1.5 block min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20';

function parseAmount(value: string): number {
  if (!value.trim()) return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function FinancialCoverageTool() {
  const [severance, setSeverance] = useState('');
  const [savings, setSavings] = useState('');
  const [monthlySpend, setMonthlySpend] = useState('');

  const result = useMemo(
    () =>
      calculateFinancialCoverage({
        severanceCLP: parseAmount(severance),
        savingsCLP: parseAmount(savings),
        monthlyEssentialSpendCLP: parseAmount(monthlySpend),
      }),
    [monthlySpend, savings, severance],
  );

  const monthsLabel = result.months.toLocaleString('es-CL', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <section
      className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm md:p-6"
      aria-labelledby="coverage-tool-heading"
    >
      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[var(--color-primary-500)]/10 text-[var(--color-primary-600)]">
          <Wallet className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-600)]">
            Herramienta referencial
          </p>
          <h2
            id="coverage-tool-heading"
            className="mt-1 text-xl font-bold text-[var(--foreground)] md:text-2xl"
          >
            ¿Cuántos meses puedes cubrir?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-secondary)]">
            Suma el finiquito que estimas recibir y tus ahorros, y compáralos con tus gastos
            esenciales mensuales.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-semibold text-[var(--foreground)]">
          Finiquito estimado (CLP)
          <input
            className={INPUT_CLASS_NAME}
            type="number"
            min="0"
            step="1000"
            inputMode="numeric"
            value={severance}
            onChange={(event) => setSeverance(event.currentTarget.value)}
            placeholder="0"
            aria-describedby="coverage-note"
          />
        </label>
        <label className="text-sm font-semibold text-[var(--foreground)]">
          Ahorros disponibles (CLP)
          <input
            className={INPUT_CLASS_NAME}
            type="number"
            min="0"
            step="1000"
            inputMode="numeric"
            value={savings}
            onChange={(event) => setSavings(event.currentTarget.value)}
            placeholder="0"
            aria-describedby="coverage-note"
          />
        </label>
        <label className="text-sm font-semibold text-[var(--foreground)]">
          Gasto esencial mensual (CLP)
          <input
            className={INPUT_CLASS_NAME}
            type="number"
            min="1"
            step="1000"
            inputMode="numeric"
            value={monthlySpend}
            onChange={(event) => setMonthlySpend(event.currentTarget.value)}
            placeholder="500000"
            aria-describedby="coverage-note"
            required
          />
        </label>
      </div>

      <div
        className="mt-5 rounded-xl border border-[var(--color-primary-500)]/20 bg-[var(--color-primary-500)]/[0.06] p-4"
        aria-live="polite"
      >
        {result.isValid ? (
          <>
            <p className="text-sm font-semibold text-[var(--foreground-secondary)]">
              Cobertura estimada
            </p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
              {monthsLabel} meses
            </p>
            <p className="mt-1 text-sm text-[var(--foreground-secondary)]">
              Recursos considerados: {formatCLP(result.totalResourcesCLP)}.
            </p>
          </>
        ) : (
          <p className="text-sm font-medium text-[var(--foreground-secondary)]">
            Indica un gasto esencial mensual mayor que $0 para estimar la cobertura.
          </p>
        )}
      </div>

      <p id="coverage-note" className="mt-3 text-xs leading-relaxed text-[var(--foreground-muted)]">
        Estimación simple: (finiquito + ahorros) ÷ gasto esencial mensual. No incluye pagos futuros
        de AFC, deudas, impuestos ni nuevos ingresos. Verifica tu caso con AFC Chile y conserva un
        margen para gastos extraordinarios.
      </p>
    </section>
  );
}
