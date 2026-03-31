'use client';

import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll - Sistema de scroll suave con Lenis
 *
 * Características:
 * - Scroll suave tipo iOS
 * - Configuración optimizada para rendimiento
 * - Soporte para keyboard navigation
 * - Lerp (linear interpolation) configurable
 */
export default function SmoothScroll({
  children
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window === 'undefined') return;

    // Inicializar Lenis con configuración optimizada
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      __experimental__naiveDimensions: false,
    });

    lenisRef.current = lenis;

    // RequestAnimationFrame loop para mejor rendimiento
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

/**
 * Hook para obtener la instancia de Lenis
 */
export function useLenis() {
  return useCallback(() => {
    if (typeof window !== 'undefined') {
      return (window as unknown as { lenis?: Lenis }).lenis;
    }
    return null;
  }, []);
}

/**
 * Componente para scroll a una sección específica
 */
export function ScrollToSection({
  target,
  children,
  offset = 80
}: {
  target: string;
  children: React.ReactNode;
  offset?: number;
}) {
  const handleClick = useCallback(() => {
    const lenisInstance = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(target, { offset, duration: 1.2 });
    } else {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [target, offset]);

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {children}
    </div>
  );
}
