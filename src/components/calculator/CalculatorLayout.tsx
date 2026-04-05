'use client';

import { ReactNode, memo } from 'react';
import CalculatorBackground from './CalculatorBackground';

interface CalculatorLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

/**
 * CalculatorLayout - Layout principal para páginas de calculadoras
 * 
 * Proporciona un layout visualmente atractivo con:
 * - Fondo decorativo con gradientes y blobs
 * - Header con título y descripción
 * - Contenido principal con espaciado adecuado
 * - Jerarquía visual clara
 */
const CalculatorLayout = memo(function CalculatorLayout({ 
  children, 
  title, 
  description 
}: CalculatorLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden">
      {/* Fondo decorativo */}
      <CalculatorBackground />
      
      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header de la calculadora */}
        <div className="mb-8 md:mb-10">
          <div className="bg-gradient-to-r from-[var(--color-primary-600)]/10 to-[var(--color-accent-600)]/10 rounded-2xl p-6 md:p-8 border border-[var(--border)]/50 backdrop-blur-sm">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">{title}</h1>
            <p className="text-base md:text-lg text-[var(--foreground-secondary)] max-w-3xl">{description}</p>
          </div>
        </div>
        
        {/* Contenido principal */}
        <main className="bg-[var(--surface)] rounded-2xl border border-[var(--border)]/50 shadow-xl overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
});

export default CalculatorLayout;