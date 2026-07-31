import type { CalculatorMethodology as Methodology } from '@/types/calculator';

interface CalculatorMethodologyProps {
  methodology: Methodology;
}

export default function CalculatorMethodology({ methodology }: CalculatorMethodologyProps) {
  return (
    <section
      className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:mt-10 md:p-7"
      aria-labelledby="calculator-methodology-title"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary-600)]">
          Metodología
        </p>
        <h2
          id="calculator-methodology-title"
          className="mt-1 text-xl font-semibold text-[var(--foreground)] md:text-2xl"
        >
          Cómo se obtiene este resultado
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
          {methodology.summary}
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">Pasos del cálculo</h3>
          <ol className="mt-3 space-y-3">
            {methodology.calculationSteps.map((step, index) => (
              <li
                key={step}
                className="flex gap-3 text-sm leading-relaxed text-[var(--foreground-secondary)]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)] text-xs font-semibold text-[var(--accent)]">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Supuestos</h3>
            <ul className="mt-2 space-y-2">
              {methodology.assumptions.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-relaxed text-[var(--foreground-secondary)]"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Limitaciones</h3>
            <ul className="mt-2 space-y-2">
              {methodology.limitations.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-relaxed text-[var(--foreground-secondary)]"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-warning-500)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {methodology.workedExample && (
        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] p-4 md:p-5">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">
            {methodology.workedExample.title}
          </h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground-muted)]">
                Datos
              </p>
              <ul className="mt-2 space-y-1 text-sm text-[var(--foreground-secondary)]">
                {methodology.workedExample.inputs.map((input) => (
                  <li key={input}>{input}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground-muted)]">
                Desarrollo
              </p>
              <ol className="mt-2 space-y-1 text-sm text-[var(--foreground-secondary)]">
                {methodology.workedExample.development.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
          <p className="mt-4 border-t border-[var(--border)] pt-3 text-sm font-medium text-[var(--foreground)]">
            {methodology.workedExample.result}
          </p>
        </div>
      )}
    </section>
  );
}
