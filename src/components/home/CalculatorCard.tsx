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

const ACCENT: Record<Calculator['category'], string> = {
  sueldo: 'text-emerald-500 bg-emerald-500/10',
  impuestos: 'text-blue-500 bg-blue-500/10',
  beneficios: 'text-purple-500 bg-purple-500/10',
  conversiones: 'text-cyan-500 bg-cyan-500/10',
  familia: 'text-pink-500 bg-pink-500/10',
  vivienda: 'text-orange-500 bg-orange-500/10',
  vehiculos: 'text-rose-500 bg-rose-500/10',
  empresas: 'text-slate-500 bg-slate-500/10',
  servicios: 'text-amber-500 bg-amber-500/10',
  pension: 'text-indigo-500 bg-indigo-500/10',
  educacion: 'text-teal-500 bg-teal-500/10',
  hogar: 'text-lime-500 bg-lime-500/10',
};

/**
 * Tarjeta minimalista y consistente para una calculadora.
 * Server Component compatible (sin framer-motion). El fade-in se hace por CSS
 * usando `animate-fade-up` con un retardo basado en index.
 */
export default function CalculatorCard({ calculator, index = 0 }: CalculatorCardProps) {
  const Icon = ICON[calculator.category];
  const accent = ACCENT[calculator.category];

  return (
    <Link
      href={`/calculadoras/${calculator.slug}`}
      className="group relative flex flex-col h-full p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] hover:shadow-md transition-all duration-200 animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
      aria-label={`Ir a la calculadora de ${calculator.name}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`inline-grid h-9 w-9 place-items-center rounded-lg ${accent} transition-transform group-hover:scale-110`}
        >
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <ArrowUpRight className="h-4 w-4 text-[var(--foreground-muted)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </div>

      <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-600)] transition-colors leading-snug">
        {calculator.name}
      </h3>

      <p className="mt-1.5 text-xs text-[var(--foreground-secondary)] leading-relaxed line-clamp-2 flex-1">
        {calculator.description}
      </p>
    </Link>
  );
}
