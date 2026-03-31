'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';
import type { Calculator as CalculatorType } from '@/types/calculator';

export interface RelatedCalculatorsProps {
  /** Lista de calculadoras relacionadas */
  calculators: CalculatorType[];
  /** Título de la sección */
  title?: string;
}

/**
 * RelatedCalculators - Calculadoras relacionadas al final de cada página
 * 
 * Muestra cards horizontales con scroll para explorar más herramientas.
 * Ayuda al cross-linking y retención de usuarios.
 */
export default function RelatedCalculators({
  calculators,
  title = 'También te puede interesar',
}: RelatedCalculatorsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!calculators.length) return null;

  // Colores por categoría
  const categoryColors: Record<string, string> = {
    'sueldo': 'from-[var(--color-primary-500)] to-[var(--color-primary-600)]',
    'impuestos': 'from-[var(--color-error-500)] to-[var(--color-error-600)]',
    'beneficios': 'from-[var(--color-success-500)] to-[var(--color-success-600)]',
    'conversiones': 'from-[var(--color-accent-500)] to-[var(--color-accent-600)]',
    'vivienda': 'from-[var(--color-warning-500)] to-[var(--color-warning-600)]',
    'vehiculos': 'from-[var(--color-primary-400)] to-[var(--color-primary-500)]',
    'familia': 'from-[var(--color-error-400)] to-[var(--color-error-500)]',
    'empresas': 'from-[var(--color-accent-400)] to-[var(--color-accent-500)]',
    'pension': 'from-[var(--color-primary-600)] to-[var(--color-primary-700)]',
    'educacion': 'from-[var(--color-success-400)] to-[var(--color-success-500)]',
    'hogar': 'from-[var(--color-warning-400)] to-[var(--color-warning-500)]',
    'servicios': 'from-[var(--color-primary-300)] to-[var(--color-primary-400)]',
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="mt-12"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-500)]/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-[var(--color-primary-500)]" />
        </div>
        <h2 className="text-xl font-bold text-[var(--foreground)]">{title}</h2>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {calculators.map((calc, index) => {
          const gradientClass = categoryColors[calc.category] || 'from-[var(--color-primary-500)] to-[var(--color-primary-600)]';
          
          return (
            <motion.div
              key={calc.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-64 snap-start"
            >
              <Link
                href={`/calculadoras/${calc.slug}`}
                className="group block h-full bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--border-hover)] hover:shadow-lg transition-all duration-200"
              >
                {/* Gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${gradientClass}`} />
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--foreground)] text-sm mb-1.5 group-hover:text-[var(--color-primary-500)] transition-colors line-clamp-2">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)] line-clamp-2 mb-3">
                    {calc.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-primary-500)] group-hover:gap-2.5 transition-all">
                    <span>Usar calculadora</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
