'use client';

import { useCallback } from 'react';

/**
 * SkipLinks - Enlaces de navegación rápida para accesibilidad
 * 
 * Proporciona atajos de teclado para usuarios que navegan con teclado,
 * permitiéndoles saltar al contenido principal o a la calculadora.
 * 
 * Cumple con WCAG 2.1 - Guideline 2.4.1 (Bypass Blocks)
 */
export default function SkipLinks() {
  const handleSkipToMain = useCallback((e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const main = document.getElementById('main-content');
      if (main) {
        main.focus();
        main.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleSkipToCalculator = useCallback((e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const calculator = document.getElementById('calculator-form');
      if (calculator) {
        calculator.focus();
        calculator.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById('main-content');
          if (main) {
            main.focus();
            main.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onKeyDown={handleSkipToMain}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-primary-600)] focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-400)] focus:ring-offset-2"
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 9999,
        }}
      >
        Saltar al contenido principal
      </a>

      {/* Skip to calculator (only shown on calculator pages) */}
      <a
        href="#calculator-form"
        onClick={(e) => {
          e.preventDefault();
          const calculator = document.getElementById('calculator-form');
          if (calculator) {
            calculator.focus();
            calculator.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onKeyDown={handleSkipToCalculator}
        className="sr-only focus:not-sr-only focus:fixed focus:top-16 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-primary-600)] focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-400)] focus:ring-offset-2"
        style={{
          position: 'fixed',
          top: '4rem',
          left: '1rem',
          zIndex: 9999,
        }}
      >
        Saltar a la calculadora
      </a>
    </>
  );
}