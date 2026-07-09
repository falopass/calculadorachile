import Link from 'next/link';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { calculators } from '@/data/calculators';

/**
 * Bloque home “Más buscadas” — pageviews de entrada + profundidad de sesión.
 * Orden basado en GSC (impresiones/clics) jul-2026, no en featured genérico.
 */
const POPULAR_SLUGS = [
  'calculadora-iva',
  'calculadora-patente-comercial',
  'calculadora-credito-cae',
  'calculadora-sueldo-liquido',
  'calculadora-vacaciones-proporcionales',
  'calculadora-permiso-circulacion',
  'calculadora-multas-transito',
  'calculadora-finiquito',
] as const;

const SHORT: Record<string, string> = {
  'calculadora-iva': 'IVA 19% neto/bruto',
  'calculadora-patente-comercial': 'Patente comercial',
  'calculadora-credito-cae': 'Simulador CAE',
  'calculadora-sueldo-liquido': 'Sueldo líquido',
  'calculadora-vacaciones-proporcionales': 'Vacaciones proporcionales',
  'calculadora-permiso-circulacion': 'Permiso de circulación',
  'calculadora-multas-transito': 'Multas de tránsito',
  'calculadora-finiquito': 'Finiquito',
};

export default function PopularCalculators() {
  const items = POPULAR_SLUGS.map((slug) => calculators.find((c) => c.slug === slug)).filter(
    Boolean,
  ) as typeof calculators;

  if (items.length === 0) return null;

  return (
    <section
      className="border-b border-[var(--border)] bg-[var(--background)]"
      aria-labelledby="popular-calcs-heading"
    >
      <div className="container-base py-8 md:py-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-primary-600)]">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden />
              Más buscadas
            </p>
            <h2
              id="popular-calcs-heading"
              className="mt-1 text-xl font-semibold tracking-[-0.02em] text-[var(--foreground)] md:text-2xl"
            >
              Calculadoras con más tráfico
            </h2>
            <p className="mt-1 text-sm text-[var(--foreground-secondary)]">
              Acceso directo a las herramientas que más se consultan en Chile.
            </p>
          </div>
          <Link
            href="/calculadoras"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary-600)] hover:underline"
          >
            Ver catálogo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((calc) => (
            <li key={calc.id}>
              <Link
                href={`/calculadoras/${calc.slug}`}
                className="group flex h-full flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-primary-500)]/40 hover:shadow-md"
              >
                <span className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-600)]">
                  {SHORT[calc.slug] ?? calc.name}
                </span>
                <span className="mt-1 line-clamp-2 text-xs leading-snug text-[var(--foreground-muted)]">
                  {calc.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
