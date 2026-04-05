'use client';

import { ReactNode, memo } from 'react';

interface CalculatorPageLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  calculatorId: string;
}

/**
 * CalculatorPageLayout - Layout principal para páginas de calculadoras
 *
 * Proporciona un layout visualmente atractivo con:
 * - Fondo decorativo con gradientes y blobs dinámicos
 * - Header con título y descripción
 * - Contenido principal con espaciado adecuado
 * - Jerarquía visual clara
 */
const CalculatorPageLayout = memo(function CalculatorPageLayout({
  children,
  title,
  description,
  calculatorId
}: CalculatorPageLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900">
      {/* Fondo decorativo con gradientes y patrones más dinámicos */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Gradiente principal más dinámico y visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 via-purple-100/40 to-cyan-100/50 dark:from-indigo-900/60 dark:via-purple-900/50 dark:to-cyan-900/60" />
        
        {/* Patrón de puntos más visible */}
        <div 
          className="absolute inset-0 opacity-30 dark:opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Blobs decorativos más grandes y con animación mejorada */}
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/25 to-purple-400/20 dark:from-indigo-600/30 dark:to-purple-600/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-gradient-to-br from-cyan-400/20 to-indigo-400/25 dark:from-cyan-600/25 dark:to-indigo-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '1s' }} />
        <div className="absolute bottom-10 left-1/4 w-[350px] h-[350px] bg-gradient-to-br from-purple-400/20 to-pink-400/15 dark:from-purple-600/25 dark:to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '14s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-emerald-400/15 to-cyan-400/20 dark:from-emerald-600/20 dark:to-cyan-600/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '11s', animationDelay: '3s' }} />
        
        {/* Elementos geométricos decorativos */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 border-2 border-indigo-300/40 rotate-45 blur-sm animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 border-2 border-cyan-300/40 rotate-12 blur-sm animate-pulse" style={{ animationDuration: '9s', animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-10 w-16 h-16 border-2 border-purple-300/35 rotate-90 blur-sm animate-pulse" style={{ animationDuration: '7s', animationDelay: '2.5s' }} />
      </div>
      
      {/* Contenido principal con mejor estructura y diseño */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header de la calculadora con mejor diseño y más contraste */}
        <div className="mb-8 md:mb-10">
          <div className="bg-gradient-to-r from-indigo-600/20 via-purple-500/20 to-cyan-500/20 dark:from-indigo-500/30 dark:via-purple-500/30 dark:to-cyan-500/30 rounded-2xl p-6 md:p-8 border border-indigo-200/60 dark:border-indigo-700/60 backdrop-blur-md shadow-xl shadow-indigo-500/10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-4xl">{description}</p>
          </div>
        </div>
        
        {/* Contenido principal con mejor contraste y diseño */}
        <main className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl border border-gray-200/70 dark:border-slate-700/70 shadow-2xl shadow-black/10 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
});

export default CalculatorPageLayout;
