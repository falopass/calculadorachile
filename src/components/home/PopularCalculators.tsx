import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { calculators } from '@/data/calculators';
import CalculatorCard from './CalculatorCard';

/**
 * Selección de calculadoras más usadas.
 * Server Component: todo el cómputo se hace en build time.
 */
export default function PopularCalculators() {
  // Selección curada de las que más uso tienen
  // Usamos los slugs reales (con prefijo `calculadora-`) tal como
  // los expone src/data/calculators.ts. Cualquier inconsistencia aquí
  // genera 404 en producción.
  const popularSlugs = [
    'calculadora-sueldo-liquido',
    'calculadora-finiquito',
    'calculadora-uf-clp',
    'calculadora-iva',
    'calculadora-credito-hipotecario',
    'calculadora-horas-extra',
    'calculadora-vacaciones-proporcionales',
    'calculadora-boleta-honorarios',
  ];

  const popular = popularSlugs
    .map((slug) => calculators.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <section className="section">
      <div className="container-base">
        <div className="flex items-end justify-between gap-4 mb-8 md:mb-10">
          <div>
            <h2 className="heading-display text-3xl md:text-4xl">
              Las más usadas
            </h2>
            <p className="mt-2 text-[var(--foreground-secondary)]">
              Calculadoras que resuelven dudas reales todos los días.
            </p>
          </div>
          <Link
            href="/calculadoras"
            className="hidden sm:inline-flex btn-ghost text-sm"
          >
            Ver todas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popular.map((calc, i) => (
            <CalculatorCard key={calc.id} calculator={calc} index={i} />
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link href="/calculadoras" className="btn-secondary">
            Ver todas las calculadoras
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
