import Link from 'next/link';
import {
  ArrowUpRight,
  TrendingUp,
  Receipt,
  Gift,
  RefreshCw,
  Users,
  Home,
  Car,
  Building2,
  ConciergeBell,
  GraduationCap,
  Lightbulb,
  Landmark,
} from 'lucide-react';
import type { Calculator } from '@/types/calculator';

export interface CalculatorCardProps {
  calculator: Calculator;
  /** Para fade-in escalonado (opcional). */
  index?: number;
}

const ICON: Record<Calculator['category'], typeof TrendingUp> = {
  sueldo: TrendingUp,
  impuestos: Receipt,
  beneficios: Gift,
  conversiones: RefreshCw,
  familia: Users,
  vivienda: Home,
  vehiculos: Car,
  empresas: Building2,
  servicios: ConciergeBell,
  pension: Landmark,
  educacion: GraduationCap,
  hogar: Lightbulb,
};

/**
 * Color del ícono por categoría. Sólido (no `/10`) para garantizar
 * contraste WCAG AA tanto en light como en dark mode.
 *
 * Usamos clases Tailwind con valor 600 (light) y 400 (dark) que
 * el motor de Tailwind ya soporta nativamente para `dark:`.
 */
const ICON_COLOR: Record<Calculator['category'], string> = {
  sueldo: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/15',
  impuestos: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/15',
  beneficios: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/15',
  conversiones: 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/15',
  familia: 'text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-500/15',
  vivienda: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/15',
  vehiculos: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/15',
  empresas: 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-500/15',
  servicios: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/15',
  pension: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-500/15',
  educacion: 'text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-500/15',
  hogar: 'text-lime-600 dark:text-lime-400 bg-lime-100 dark:bg-lime-500/15',
};

/**
 * Tarjeta de calculadora.
 *
 * - Fondo sólido (var(--surface)) — sin gradientes que afecten legibilidad.
 * - Texto siempre con tokens (`var(--foreground)` / `var(--foreground-secondary)`)
 *   que cumplen contraste AA en ambos modos.
 * - El color de categoría va sólo en el ícono, evitando texto sobre tinte.
 */
export default function CalculatorCard({ calculator, index = 0 }: CalculatorCardProps) {
  const Icon = ICON[calculator.category];
  const iconClass = ICON_COLOR[calculator.category];

  return (
    <Link
      href={`/calculadoras/${calculator.slug}`}
      className="group relative flex flex-col h-full p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--color-primary-500)]/50 hover:shadow-md transition-all duration-200 animate-fade-up focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]/40"
      style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
      aria-label={`Ir a la calculadora de ${calculator.name}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`inline-grid h-9 w-9 place-items-center rounded-lg transition-transform group-hover:scale-105 ${iconClass}`}
        >
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <ArrowUpRight className="h-4 w-4 text-[var(--foreground-muted)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </div>

      <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-600)] dark:group-hover:text-[var(--color-primary-400)] transition-colors leading-snug">
        {calculator.name}
      </h3>

      <p className="mt-1.5 text-xs text-[var(--foreground-secondary)] leading-relaxed line-clamp-2 flex-1">
        {calculator.description}
      </p>
    </Link>
  );
}
