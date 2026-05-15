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

interface CategoryMeta {
  label: string;
  icon: typeof TrendingUp;
  description: string;
  /**
   * Clases para el ícono (texto + bg). Sólidas para garantizar contraste
   * AA en ambos modos. El fondo de la tarjeta queda neutro.
   */
  iconClass: string;
}

const CATEGORY_META: Partial<Record<Calculator['category'], CategoryMeta>> = {
  sueldo: {
    label: 'Sueldo y remuneraciones',
    icon: TrendingUp,
    description: 'Sueldo líquido, finiquito, horas extra, gratificación.',
    iconClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/15',
  },
  impuestos: {
    label: 'Impuestos',
    icon: Receipt,
    description: 'IVA, boleta de honorarios, segunda categoría, PPM.',
    iconClass: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/15',
  },
  beneficios: {
    label: 'Beneficios laborales',
    icon: Gift,
    description: 'Vacaciones, indemnizaciones, asignación familiar.',
    iconClass: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/15',
  },
  conversiones: {
    label: 'Conversores',
    icon: RefreshCw,
    description: 'UF a CLP, UTM a CLP, divisas y más.',
    iconClass: 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/15',
  },
  vivienda: {
    label: 'Vivienda',
    icon: Home,
    description: 'Crédito hipotecario, contribuciones, gastos comunes.',
    iconClass: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/15',
  },
  vehiculos: {
    label: 'Vehículos',
    icon: Car,
    description: 'Permiso de circulación, crédito automotriz, TAG.',
    iconClass: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/15',
  },
  pension: {
    label: 'Pensiones',
    icon: Landmark,
    description: 'Comparador AFP, simulador APV, PGU.',
    iconClass: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-500/15',
  },
  empresas: {
    label: 'Empresas',
    icon: Building2,
    description: 'Costo empleado, patente comercial, PPM.',
    iconClass: 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-500/15',
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
    <section className="section bg-[var(--background-secondary)]/50 border-y border-[var(--border)]">
      <div className="container-base">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="heading-display text-3xl md:text-4xl text-[var(--foreground)]">
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
                className="group flex flex-col h-full p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--color-primary-500)]/50 hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-grid h-10 w-10 place-items-center rounded-lg transition-transform group-hover:scale-105 ${meta.iconClass}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-600)] dark:group-hover:text-[var(--color-primary-400)] transition-colors">
                  {meta.label}
                </h3>
                <p className="mt-1 text-sm text-[var(--foreground-secondary)] leading-relaxed line-clamp-2">
                  {meta.description}
                </p>
                <p className="mt-4 text-xs font-medium text-[var(--foreground-muted)]">
                  {count} {count === 1 ? 'calculadora' : 'calculadoras'}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
