'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  Receipt,
  Gift,
  RefreshCw,
  Users,
  Home,
  Car,
  Building2,
  Sparkles,
  ChevronRight,
  ConciergeBell,
  GraduationCap,
  Lightbulb,
  Landmark
} from 'lucide-react';
import type { Calculator } from '@/types/calculator';
import CalculatorCard from './CalculatorCard';

export interface CalculatorGridProps {
  /** Lista de calculadoras a mostrar */
  calculators: Calculator[];
  /** Título de la sección */
  title?: string;
  /** Descripción de la sección */
  description?: string;
  /** ID para anclas */
  id?: string;
}

/**
 * Agrupa calculadoras por categoría
 */
function groupByCategory(calculators: Calculator[]): Record<Calculator['category'], Calculator[]> {
  return calculators.reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = [];
    }
    acc[calc.category].push(calc);
    return acc;
  }, {} as Record<Calculator['category'], Calculator[]>);
}

/**
 * Nombres legibles de categorías
 */
const categoryLabels: Record<Calculator['category'], string> = {
  sueldo: 'Sueldo y Remuneraciones',
  impuestos: 'Impuestos',
  beneficios: 'Beneficios Laborales',
  conversiones: 'Conversiones',
  familia: 'Familia y Pensiones',
  vivienda: 'Vivienda',
  vehiculos: 'Vehículos',
  empresas: 'Empresas y PYME',
  servicios: 'Servicios',
  pension: 'Pensiones',
  educacion: 'Educación',
  hogar: 'Hogar',
};

/**
 * Iconos de categorías
 */
const categoryIcons: Record<Calculator['category'], React.ReactNode> = {
  sueldo: <TrendingUp className="w-5 h-5" />,
  impuestos: <Receipt className="w-5 h-5" />,
  beneficios: <Gift className="w-5 h-5" />,
  conversiones: <RefreshCw className="w-5 h-5" />,
  familia: <Users className="w-5 h-5" />,
  vivienda: <Home className="w-5 h-5" />,
  vehiculos: <Car className="w-5 h-5" />,
  empresas: <Building2 className="w-5 h-5" />,
  servicios: <ConciergeBell className="w-5 h-5" />,
  pension: <Landmark className="w-5 h-5" />,
  educacion: <GraduationCap className="w-5 h-5" />,
  hogar: <Lightbulb className="w-5 h-5" />,
};

/**
 * Colores de categorías
 */
const categoryColors: Record<Calculator['category'], string> = {
  sueldo: 'text-emerald-500',
  impuestos: 'text-blue-500',
  beneficios: 'text-purple-500',
  conversiones: 'text-orange-500',
  familia: 'text-pink-500',
  vivienda: 'text-cyan-500',
  vehiculos: 'text-red-500',
  empresas: 'text-slate-500',
  servicios: 'text-amber-500',
  pension: 'text-indigo-500',
  educacion: 'text-teal-500',
  hogar: 'text-lime-500',
};

/**
 * CalculatorGrid - Grid moderno de calculadoras con animaciones
 * 
 * Características:
 * - Animaciones de entrada escalonadas
 * - Agrupación visual por categoría
 * - Diseño responsive
 * - Efectos hover sofisticados
 * 
 * @example
 * <CalculatorGrid
 *   calculators={calculators}
 *   title="Nuestras Calculadoras"
 *   id="calculadoras"
 * />
 */
export default function CalculatorGrid({
  calculators,
  title = 'Calculadoras',
  description,
  id,
}: CalculatorGridProps) {
  const grouped = groupByCategory(calculators);
  const categories = Object.keys(grouped) as Calculator['category'][];

  return (
    <section id={id} className="section relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[var(--color-primary-500)] rounded-full blur-[150px] opacity-5 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[var(--color-accent-500)] rounded-full blur-[150px] opacity-5 pointer-events-none" />

      <div className="container-base relative">
        {/* Header de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-600)] text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Herramientas Gratuitas
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
            {title}
          </h2>
          
          {description && (
            <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto text-base md:text-lg">
              {description}
            </p>
          )}
        </motion.div>

        {/* Calculadoras por categoría */}
        <div className="space-y-12 md:space-y-16">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <div className={`w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center ${categoryColors[category]} shadow-sm`}>
                  {categoryIcons[category]}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-[var(--foreground)]">
                  {categoryLabels[category]}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
                <span className="text-sm text-[var(--foreground-muted)] whitespace-nowrap">
                  {grouped[category].length} {grouped[category].length === 1 ? 'herramienta' : 'herramientas'}
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {grouped[category].map((calculator, cardIndex) => (
                  <CalculatorCard
                    key={calculator.id}
                    calculator={calculator}
                    index={cardIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 md:mt-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/5 to-[var(--color-accent-500)]/5 border border-[var(--border)]">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-[var(--foreground)]">
                ¿No encuentras lo que buscas?
              </p>
              <p className="text-sm text-[var(--foreground-secondary)]">
                Estamos constantemente agregando nuevas calculadoras
              </p>
            </div>
            <a
              href="/contacto"
              className="btn-primary whitespace-nowrap"
            >
              Solicitar calculadora
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
