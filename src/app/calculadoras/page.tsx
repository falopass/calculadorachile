import type { Metadata } from 'next';
import Link from 'next/link';
import { calculators } from '@/data/calculators';
import type { Calculator } from '@/types/calculator';
import { absoluteUrl } from '@/lib/site';
import CalculatorsCatalog from '@/components/home/CalculatorsCatalog';

export const metadata: Metadata = {
  title: 'Todas las calculadoras de Chile',
  description: `Catálogo completo de ${calculators.length}+ calculadoras laborales, tributarias y financieras de Chile. Sueldo líquido, finiquito, UF, IVA, créditos y más.`,
  alternates: { canonical: absoluteUrl('/calculadoras') },
  openGraph: {
    title: 'Todas las calculadoras de Chile | CalculaChile',
    description: `${calculators.length}+ calculadoras gratuitas, precisas y actualizadas a 2026.`,
    url: absoluteUrl('/calculadoras'),
    type: 'website',
  },
};

const CATEGORY_LABELS: Record<Calculator['category'], string> = {
  sueldo: 'Sueldo y remuneraciones',
  impuestos: 'Impuestos',
  beneficios: 'Beneficios laborales',
  conversiones: 'Conversores',
  familia: 'Familia',
  vivienda: 'Vivienda',
  vehiculos: 'Vehículos',
  empresas: 'Empresas',
  servicios: 'Servicios',
  pension: 'Pensiones',
  educacion: 'Educación',
  hogar: 'Hogar',
};

export default function CalculadorasPage() {
  // Build-time: agrupo por categoría en el orden natural
  const grouped = calculators.reduce<
    Record<Calculator['category'], Calculator[]>
  >(
    (acc, calc) => {
      (acc[calc.category] ??= []).push(calc);
      return acc;
    },
    {} as Record<Calculator['category'], Calculator[]>,
  );

  const categoryOrder = (Object.keys(grouped) as Calculator['category'][]).sort(
    (a, b) => grouped[b].length - grouped[a].length,
  );

  const groups = categoryOrder.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat] ?? cat,
    items: grouped[cat],
  }));

  return (
    <>
      {/* Hero del catálogo */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div
          aria-hidden
          className="absolute inset-0 bg-grid opacity-[0.04]"
        />
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-[var(--color-primary-500)]/10 blur-[100px]"
        />
        <div className="container-base relative pt-12 pb-10 md:pt-16 md:pb-12">
          <nav aria-label="Migas de pan" className="mb-6 text-xs">
            <ol className="flex items-center gap-1.5 text-[var(--foreground-muted)]">
              <li>
                <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
                  Inicio
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[var(--foreground)] font-medium">Calculadoras</li>
            </ol>
          </nav>

          <h1 className="heading-display text-3xl md:text-5xl">
            Todas las <span className="text-gradient">calculadoras</span>
          </h1>
          <p className="mt-3 text-base md:text-lg text-[var(--foreground-secondary)] max-w-2xl">
            {calculators.length} herramientas gratuitas para sueldo, impuestos, vivienda,
            pensiones y más. Datos oficiales actualizados a 2026.
          </p>
        </div>
      </section>

      <CalculatorsCatalog groups={groups} />
    </>
  );
}
