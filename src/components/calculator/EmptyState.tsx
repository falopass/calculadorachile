import { Calculator, Lightbulb } from 'lucide-react';

interface EmptyStateProps {
  /** ID de calculadora (reservado para tracking/analytics futuras). */
  calculatorId: string;
}

/**
 * Estado vacío del shell de una calculadora.
 *
 * Mensaje sobrio antes de tener resultados. Los colores siguen los
 * tokens (`--color-warning-*`, `--foreground-*`, `--surface`) y se
 * comportan correctamente en modo oscuro.
 */
export default function EmptyState(_: EmptyStateProps) {
  return (
    <div className="text-center py-2">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-100)] text-[var(--color-primary-600)] dark:bg-[var(--color-primary-500)]/15 dark:text-[var(--color-primary-400)] mb-4">
        <Calculator className="h-6 w-6" strokeWidth={2} />
      </span>

      <h3 className="text-base font-semibold text-[var(--foreground)] mb-1">
        Calcula al instante
      </h3>

      <p className="mx-auto max-w-md text-sm text-[var(--foreground-secondary)] leading-relaxed">
        Completa los campos de arriba y los resultados aparecerán automáticamente,
        sin necesidad de hacer clic en ningún botón.
      </p>

      <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-warning-200)] bg-[var(--color-warning-50)] px-3 py-1.5 text-xs">
        <Lightbulb className="h-3.5 w-3.5 text-[var(--color-warning-600)] flex-none" />
        <span className="text-[var(--color-warning-700)] dark:text-[var(--color-warning-500)] font-medium">
          Resultados en tiempo real mientras escribes
        </span>
      </div>
    </div>
  );
}
