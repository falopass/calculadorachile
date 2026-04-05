'use client';

import { memo } from 'react';
import '@/components/calculator/calculator-background-styles.css';

/**
 * CalculatorBackground - Fondo decorativo para páginas de calculadoras
 *
 * Agrega gradientes, blobs y patrones para hacer las páginas
 * más visualmente atractivas sin distraer del contenido principal.
 */
const CalculatorBackground = memo(function CalculatorBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }} aria-hidden="true">
      {/* Gradiente base con colores más vibrantes y visibles */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-cyan-100 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900" />
      
      {/* Patrón de puntos más visible */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #818cf8 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Blob superior izquierdo - más grande y visible */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-indigo-300/40 to-purple-300/40 dark:from-indigo-600/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse-soft animate-float" />
      
      {/* Blob superior derecho */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-gradient-to-br from-cyan-300/35 to-indigo-300/35 dark:from-cyan-600/25 dark:to-indigo-600/25 rounded-full blur-3xl animate-pulse-soft animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Blob inferior izquierdo */}
      <div className="absolute -bottom-32 -left-24 w-[450px] h-[450px] bg-gradient-to-br from-purple-300/30 to-pink-300/30 dark:from-purple-600/20 dark:to-pink-600/20 rounded-full blur-3xl animate-pulse-soft animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Blob inferior derecho */}
      <div className="absolute -bottom-24 -right-32 w-[550px] h-[550px] bg-gradient-to-br from-indigo-300/30 to-cyan-300/30 dark:from-indigo-600/20 dark:to-cyan-600/20 rounded-full blur-3xl animate-pulse-soft animate-float" style={{ animationDelay: '3s' }} />
      
      {/* Líneas decorativas más visibles */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />
      <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/25 to-transparent" />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      
      {/* Círculos decorativos más visibles */}
      <div className="absolute top-16 left-1/4 w-4 h-4 rounded-full bg-indigo-400/50 animate-pulse-soft" />
      <div className="absolute top-32 right-1/3 w-5 h-5 rounded-full bg-purple-400/40 animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-24 left-1/3 w-4 h-4 rounded-full bg-cyan-400/50 animate-pulse-soft" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-16 right-1/4 w-6 h-6 rounded-full bg-indigo-400/35 animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-12 w-3 h-3 rounded-full bg-pink-400/45 animate-pulse-soft" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-12 w-3 h-3 rounded-full bg-emerald-400/45 animate-pulse-soft" style={{ animationDelay: '2.5s' }} />
    </div>
  );
});

export default CalculatorBackground;
