import Link from 'next/link';
import {
  TrendingUp,
  Receipt,
  Gift,
  RefreshCw,
  Home,
  Car,
  Building2,
  Landmark,
  ArrowUpRight,
} from 'lucide-react';
import { calculators } from '@/data/calculators';
import type { Calculator } from '@/types/calculator';

const CATEGORY_META: Partial<
  Record<
    Calculator['category'],
    { label: string; icon: typeof TrendingUp; description: string; accent: string }
  >
> = {
  sueldo: {
    label: 'Sueldo y remuneraciones',
    icon: TrendingUp,
    description: 'Sueldo líquido, finiquito, horas extra, gratificación.',
    accent: 'from-emerald-500/15 to-teal-500/5',
  },
  impuestos: {
    label: 'Impuestos',
    icon: Receipt,
    description: 'IVA, boleta de honorarios, segunda categoría, PPM.',
    accent: 'from-blue-500/15 to-indigo-500/5',
  },
  beneficios: {
    label: 'Beneficios laborales',
    icon: Gift,
    description: 'Vacaciones, indemnizaciones, asignación familiar.',
    accent: 'from-purple-500/15 to-violet-500/5',
  },
  conversiones: {
    label: 'Conversores',
    icon: RefreshCw,
    description: 'UF a CLP, UTM a CLP, divisas y más.',
    accent: 'from-cyan-500/15 to-sky-500/5',
  },
  vivienda: {
    label: 'Vivienda',
    icon: Home,
    description: 'Crédito hipotecario, contribuciones, gastos comunes.',
    accent: 'from-orange-500/15 to-amber-500/5',
  },
  vehiculos: {
    label: 'Vehículos',
    icon: Car,
    description: 'Permiso de circulación, crédito automotriz, TAG.',
    accent: 'from-rose-500/15 to-red-500/5',
  },
  pension: {
    label: 'Pensiones',
    icon: Landmark,
    description: 'Comparador AFP, simulador APV, PGU.',
    accent: 'from-indigo-500/15 to-blue-500/5',
  },
  empresas: {
    label: 'Empresas',
    icon: Building2,
    description: 'Costo empleado, patente comercial, PPM.',
    accent: 'from-slate-500/15 to-zinc-500/5',
  },
};

export default function CategoriesGrid() {
  // Cuento calculadoras por categoría
  const counts = calculators.reduce<Record<string, number>>((acc, c) => {
    acc[c.category] = (acc[c.category] ?? 0) + 1;
    return acc;
  }, {});

  // Ordeno por cantidad descendente y filtro las que tenemos meta
  const ordered = (Object.keys(CATEGORY_META) as Calculator['category'][])
    .filter((cat) => counts[cat] > 0)
    .sort((a, b) => (counts[b] ?? 0) - (counts[a] ?? 0));

  return (
    <section className="section bg-[var(--background-secondary)]/50">
      <div className="container-base">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="heading-display text-3xl md:text-4xl">
            Explora por categoría
          </h2>
          <p className="mt-2 text-[var(--foreground-secondary)]">
            Calculadoras agrupadas por área para encontrar exactamente lo que buscas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {ordered.map((cat) => {
            const meta = CATEGORY_META[cat]!;
            const Icon = meta.icon;
            const count = counts[cat] ?? 0;
            return (
              <Link
                key={cat}
                href={`/calculadoras#${cat}`}
                className="group relative card overflow-hidden p-5 hover:border-[var(--border-hover)] hover:shadow-md transition-all"
              >
                <div
                  aria-hidden
                  className={`absolute inset-0 bg-gradient-to-br ${meta.accent} opacity-50 group-hover:opacity-100 transition-opacity`}
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] shadow-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">
                    {meta.label}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--foreground-secondary)] line-clamp-2">
                    {meta.description}
                  </p>
                  <p className="mt-3 text-xs font-medium text-[var(--foreground-muted)]">
                    {count} {count === 1 ? 'calculadora' : 'calculadoras'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
