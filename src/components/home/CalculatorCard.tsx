import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
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
  Landmark
} from 'lucide-react';
import type { Calculator } from '@/types/calculator';

export interface CalculatorCardProps {
  /** Datos de la calculadora */
  calculator: Calculator;
  /** Índice para animación escalonada */
  index?: number;
}

/**
 * Obtiene el ícono según la categoría
 */
function getCategoryIcon(category: Calculator['category']): React.ReactNode {
  const icons: Record<Calculator['category'], React.ReactNode> = {
    sueldo: <TrendingUp className="w-6 h-6" />,
    impuestos: <Receipt className="w-6 h-6" />,
    beneficios: <Gift className="w-6 h-6" />,
    conversiones: <RefreshCw className="w-6 h-6" />,
    familia: <Users className="w-6 h-6" />,
    vivienda: <Home className="w-6 h-6" />,
    vehiculos: <Car className="w-6 h-6" />,
    empresas: <Building2 className="w-6 h-6" />,
    servicios: <ConciergeBell className="w-6 h-6" />,
    pension: <Landmark className="w-6 h-6" />,
    educacion: <GraduationCap className="w-6 h-6" />,
    hogar: <Lightbulb className="w-6 h-6" />,
  };
  return icons[category];
}

/**
 * Obtiene el gradiente según la categoría
 */
function getCategoryGradient(category: Calculator['category']): string {
  const gradients: Record<Calculator['category'], string> = {
    sueldo: 'from-emerald-500 to-teal-600',
    impuestos: 'from-blue-500 to-indigo-600',
    beneficios: 'from-purple-500 to-violet-600',
    conversiones: 'from-orange-500 to-amber-600',
    familia: 'from-pink-500 to-rose-600',
    vivienda: 'from-cyan-500 to-teal-600',
    vehiculos: 'from-red-500 to-orange-600',
    empresas: 'from-slate-500 to-gray-600',
    servicios: 'from-amber-500 to-yellow-600',
    pension: 'from-indigo-500 to-blue-600',
    educacion: 'from-teal-500 to-emerald-600',
    hogar: 'from-lime-500 to-green-600',
  };
  return gradients[category];
}

/**
 * Obtiene el color de fondo del icono según la categoría
 */
function getCategoryBg(category: Calculator['category']): string {
  const bgs: Record<Calculator['category'], string> = {
    sueldo: 'bg-emerald-500/10',
    impuestos: 'bg-blue-500/10',
    beneficios: 'bg-purple-500/10',
    conversiones: 'bg-orange-500/10',
    familia: 'bg-pink-500/10',
    vivienda: 'bg-cyan-500/10',
    vehiculos: 'bg-red-500/10',
    empresas: 'bg-slate-500/10',
    servicios: 'bg-amber-500/10',
    pension: 'bg-indigo-500/10',
    educacion: 'bg-teal-500/10',
    hogar: 'bg-lime-500/10',
  };
  return bgs[category];
}

/**
 * CalculatorCard - Tarjeta moderna de calculadora con animaciones
 * 
 * Características:
 * - Diseño glassmorphism
 * - Animaciones con Framer Motion
 * - Hover effects sofisticados
 * - Gradientes dinámicos por categoría
 * 
 * @example
 * <CalculatorCard calculator={calculators[0]} index={0} />
 */
export default function CalculatorCard({ calculator, index = 0 }: CalculatorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/calculadoras/${calculator.slug}`}
        className="group block relative h-full"
        aria-label={`Calculadora de ${calculator.name}`}
      >
        {/* Card Container */}
        <div className="relative h-full overflow-hidden rounded-2xl bg-[var(--surface)] border border-[var(--border)] transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-xl hover:shadow-[var(--color-primary-500)]/5">
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(calculator.category)} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
          
          {/* Top accent line */}
          <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${getCategoryGradient(calculator.category)}`} />

          {/* Content */}
          <div className="p-5 flex flex-col h-full">
            {/* Header with icon */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${getCategoryBg(calculator.category)} flex items-center justify-center text-[var(--foreground)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                {getCategoryIcon(calculator.category)}
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getCategoryGradient(calculator.category)} flex items-center justify-center shadow-md`}>
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-600)] transition-colors mb-2 text-base leading-tight">
              {calculator.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--foreground-secondary)] line-clamp-2 mb-4 leading-relaxed flex-grow">
              {calculator.description}
            </p>

            {/* Footer with category badge */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border)]/50">
              <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getCategoryGradient(calculator.category)} text-white capitalize shadow-sm`}>
                {calculator.category}
              </span>
              
              <span className="text-xs font-medium text-[var(--foreground-muted)] group-hover:text-[var(--color-primary-500)] transition-colors flex items-center gap-1">
                Calcular
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </div>
          </div>

          {/* Shine effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
