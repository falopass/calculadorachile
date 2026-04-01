'use client';

import { useRef, useMemo, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Clock,
  ArrowRight,
  Sparkles,
  Home,
  Car,
  Building2,
  GraduationCap,
  Heart,
  Wrench
} from 'lucide-react';
import type { Calculator as CalculatorType } from '@/types/calculator';

/**
 * Mapeo de categorías a iconos
 */
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'sueldo': DollarSign,
  'impuestos': TrendingUp,
  'beneficios': Clock,
  'conversiones': Calculator,
  'familia': Heart,
  'vivienda': Home,
  'vehiculos': Car,
  'empresas': Building2,
  'pension': TrendingUp,
  'educacion': GraduationCap,
  'hogar': Wrench,
  'servicios': Calculator,
};

/**
 * Configuración del grid asimétrico corregida
 */
const GRID_LAYOUT = [
  { col: 'col-span-2', row: 'row-span-2', size: 'large' as const },
  { col: 'col-span-1', row: 'row-span-1', size: 'small' as const },
  { col: 'col-span-1', row: 'row-span-1', size: 'small' as const },
  { col: 'col-span-2', row: 'row-span-1', size: 'wide' as const },
  { col: 'col-span-1', row: 'row-span-1', size: 'small' as const },
  { col: 'col-span-1', row: 'row-span-1', size: 'small' as const },
  { col: 'col-span-2', row: 'row-span-1', size: 'wide' as const },
  { col: 'col-span-1', row: 'row-span-2', size: 'tall' as const },
  { col: 'col-span-1', row: 'row-span-1', size: 'small' as const },
  { col: 'col-span-1', row: 'row-span-1', size: 'small' as const },
  { col: 'col-span-2', row: 'row-span-1', size: 'wide' as const },
  { col: 'col-span-1', row: 'row-span-1', size: 'small' as const },
];

/**
 * Esquemas de colores por categoría
 */
const CATEGORY_COLORS: Record<string, { from: string; to: string; accent: string }> = {
  'sueldo': { from: '#6366f1', to: '#8b5cf6', accent: '#a5b4fc' },
  'impuestos': { from: '#dc2626', to: '#f43f5e', accent: '#fda4af' },
  'beneficios': { from: '#059669', to: '#10b981', accent: '#6ee7b7' },
  'conversiones': { from: '#0891b2', to: '#06b6d4', accent: '#67e8f9' },
  'familia': { from: '#ec4899', to: '#f472b6', accent: '#fbcfe8' },
  'vivienda': { from: '#d97706', to: '#f59e0b', accent: '#fcd34d' },
  'vehiculos': { from: '#7c3aed', to: '#8b5cf6', accent: '#c4b5fd' },
  'empresas': { from: '#0891b2', to: '#06b6d4', accent: '#67e8f9' },
  'pension': { from: '#6366f1', to: '#8b5cf6', accent: '#a5b4fc' },
  'educacion': { from: '#059669', to: '#10b981', accent: '#6ee7b7' },
  'hogar': { from: '#d97706', to: '#f59e0b', accent: '#fcd34d' },
  'servicios': { from: '#7c3aed', to: '#8b5cf6', accent: '#c4b5fd' },
};

/**
 * Badge labels por categoría
 */
const CATEGORY_BADGES: Record<string, string> = {
  'sueldo': 'Popular',
  'impuestos': 'Esencial',
  'beneficios': 'Importante',
  'conversiones': 'Útil',
  'familia': 'Nuevo',
  'vivienda': 'Destacado',
  'vehiculos': 'Práctico',
  'empresas': 'PYME',
  'pension': 'Futuro',
  'educacion': 'CAE',
  'hogar': 'Hogar',
  'servicios': 'Servicio',
};

/**
 * BentoGrid - Grid asimétrico estilo Apple/Awwwards
 *
 * Optimizado para rendimiento y accesibilidad.
 */
export default function BentoGrid({
  calculators
}: {
  calculators: CalculatorType[]
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  // Mostrar todas las 48 calculadoras
  const displayCalculators = useMemo(() => calculators.slice(0, 48), [calculators]);
  const [showAll, setShowAll] = useState(false);
  const visibleCalculators = showAll ? displayCalculators : displayCalculators.slice(0, 24);

  return (
    <>
      <div
        ref={containerRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[minmax(140px,auto)]"
        role="list"
        aria-label="Lista de calculadoras disponibles"
      >
        {visibleCalculators.map((calc, index) => {
        const layout = GRID_LAYOUT[index % GRID_LAYOUT.length];
        const isLarge = layout.size === 'large';
        const isWide = layout.size === 'wide';
        const isTall = layout.size === 'tall';
        
        return (
          <motion.div
            key={calc.slug}
            role="listitem"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: Math.min(index * 0.04, 0.8),
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={`${layout.col} ${layout.row} group relative`}
          >
            <Link
              href={`/calculadoras/${calc.slug}`}
              className="block h-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2 focus:ring-offset-[#0f172a] rounded-2xl"
              aria-label={`Calculadora: ${calc.name}. ${calc.description}`}
            >
              <BentoCard
                calculator={calc}
                isLarge={isLarge}
                isWide={isWide}
                isTall={isTall}
                index={index}
              />
            </Link>
          </motion.div>
        );
      })}
      </div>
      
      {/* Botón "Ver todas" */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0f172a]"
          aria-expanded={showAll}
        >
          {showAll ? 'Ver menos calculadoras' : 'Ver todas las calculadoras'}
        </button>
      </div>
    </>
  );
}

/**
 * Card individual del Bento Grid - Optimizada con React.memo
 */
const BentoCard = function BentoCard({
  calculator,
  isLarge,
  isWide,
  isTall,
  index
}: {
  calculator: CalculatorType;
  isLarge: boolean;
  isWide: boolean;
  isTall: boolean;
  index: number;
}) {
  // Usar colores por categoría en lugar de índice
  const colors = CATEGORY_COLORS[calculator.category] || CATEGORY_COLORS['servicios'];
  const IconComponent = CATEGORY_ICONS[calculator.category] || Calculator;
  const badgeLabel = CATEGORY_BADGES[calculator.category] || 'Calculadora';

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="relative h-full w-full overflow-hidden rounded-2xl"
    >
      {/* Fondo con gradiente por categoría */}
      <div
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
        style={{
          background: `linear-gradient(135deg, ${colors.from}dd 0%, ${colors.to}cc 100%)`,
        }}
      />
      
      {/* Efecto de glassmorphism en hover */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />

      {/* Contenido */}
      <div className="relative h-full p-4 md:p-5 flex flex-col justify-between z-10">
        {/* Header con icono */}
        <div className="flex items-start justify-between">
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
            <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          
          {/* Badge de categoría */}
          {(isLarge || isWide) && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] md:text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              {badgeLabel}
            </div>
          )}
        </div>

        {/* Título y descripción */}
        <div className="mt-auto">
          <h3 className={`font-bold text-white leading-tight ${
            isLarge ? 'text-lg md:text-xl' : isWide ? 'text-base md:text-lg' : 'text-sm md:text-base'
          }`}>
            {calculator.name}
          </h3>
          
          {(isLarge || isWide || isTall) && (
            <p className="text-white/75 text-xs md:text-sm line-clamp-2 mt-1 mb-2">
              {calculator.description}
            </p>
          )}

          {/* CTA con flecha */}
          <div className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
            <span>Calcular</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Borde en hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/25 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

/**
 * Variante minimalista del Bento Grid
 */
export function BentoGridMinimal({
  calculators
}: {
  calculators: CalculatorType[]
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {calculators.map((calc, index) => (
        <motion.div
          key={calc.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
        >
          <Link
            href={`/calculadoras/${calc.slug}`}
            className="block p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
          >
            <h3 className="text-base font-semibold text-white mb-1.5">{calc.name}</h3>
            <p className="text-white/60 text-sm line-clamp-2">{calc.description}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
