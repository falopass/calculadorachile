'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * useFocusTrap - Hook para atrapar el foco dentro de un elemento
 * 
 * Útil para modales, paneles laterales y otros elementos que necesitan
 * mantener el foco dentro de sí mismos durante la navegación.
 * 
 * Cumple con WCAG 2.1 - Guideline 2.4.3 (Focus Order)
 * y Guideline 2.4.7 (Focus Visible)
 * 
 * @example
 * const { focusRef, restoreFocus } = useFocusTrap(isOpen);
 * 
 * return (
 *   <div ref={focusRef} role="dialog" aria-modal="true">
 *     {/* contenido del modal *\/}
 *   </div>
 * );
 */
export function useFocusTrap(
  isActive: boolean,
  options?: {
    /** Selector de elementos enfocables (por defecto: elementos estándar de formulario y enlaces) */
    focusableSelector?: string;
    /** Callback cuando se cierra el modal para restaurar el foco */
    onClose?: () => void;
  }
) {
  const focusableSelector = options?.focusableSelector || 
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Guardar el elemento que tenía el foco antes de abrir
  useEffect(() => {
    if (isActive) {
      // Guardar referencia al elemento activo
      previousFocusRef.current = document.activeElement as HTMLElement;
    } else if (previousFocusRef.current) {
      // Restaurar foco cuando se cierra
      // Usar setTimeout para asegurar que el elemento aún existe
      setTimeout(() => {
        previousFocusRef.current?.focus();
        previousFocusRef.current = null;
      }, 0);
    }
  }, [isActive]);

  // Atrapear el foco dentro del contenedor
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelector);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Enfocar el primer elemento cuando se abre
    if (firstElement) {
      // Pequeño delay para asegurar que el modal está renderizado
      setTimeout(() => {
        firstElement.focus();
      }, 10);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab: ir al elemento anterior
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab: ir al siguiente elemento
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, focusableSelector]);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    containerRef.current = node;
  }, []);

  return {
    focusRef: setRef,
    restoreFocus: () => {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    },
  };
}

/**
 * useFocusVisible - Hook para detectar si el foco es visible
 * 
 * Útil para mostrar indicadores de foco personalizados
 */
export function useFocusVisible() {
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) {
        setIsFocusVisible(true);
      }
    };

    const handleMouseDown = () => {
      setIsFocusVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isFocusVisible;
}

// Necesitamos importar useState
import { useState } from 'react';

export default useFocusTrap;