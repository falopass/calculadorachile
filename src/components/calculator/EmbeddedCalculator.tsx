'use client';

import Link from 'next/link';
import { Calculator } from 'lucide-react';
import type { Calculator as CalculatorType } from '@/types/calculator';
import PremiumCalculatorShell from '@/components/calculator/PremiumCalculatorShell';
import { useCalculationFn } from '@/lib/hooks/useCalculationFn';

interface EmbeddedCalculatorProps {
  /** Calculadora resuelta server-side (evita enviar el catálogo completo al cliente). */
  calculator: CalculatorType;
}

/**
 * Calculadora completa embebida en artículos del blog y guías.
 * Si el módulo no carga, no renderiza nada (la página editorial queda intacta).
 */
export default function EmbeddedCalculator({ calculator }: EmbeddedCalculatorProps) {
  const { calculateFn, missing } = useCalculationFn(calculator.id);

  if (missing) return null;

  return (
    <section
      className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-6 md:p-8"
      aria-label={`Calculadora: ${calculator.name}`}
    >
      <div className="mb-5 flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]">
          <Calculator className="h-5 w-5" />
        </div>
        <h2 className="min-w-0 break-words text-lg font-bold text-[var(--foreground)] sm:text-xl">
          Calcula tu caso: {calculator.name}
        </h2>
      </div>

      {calculateFn ? (
        <PremiumCalculatorShell calculator={calculator} calculateFn={calculateFn} />
      ) : (
        <p className="text-sm text-[var(--foreground-secondary)]" aria-live="polite">
          Cargando calculadora…
        </p>
      )}

      <p className="mt-5 text-sm">
        <Link
          href={`/calculadoras/${calculator.slug}`}
          className="font-medium text-[var(--accent)] hover:underline"
        >
          Abrir la calculadora completa
        </Link>
      </p>
    </section>
  );
}
