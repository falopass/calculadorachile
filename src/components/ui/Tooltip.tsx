'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

export interface TooltipProps {
  /** Contenido del tooltip */
  content: string;
  /** Posición del tooltip */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Children que activan el tooltip */
  children?: ReactNode;
  /** Mostrar solo icono de información */
  iconOnly?: boolean;
  /** Clases adicionales */
  className?: string;
}

/**
 * Tooltip - Componente de ayuda contextual
 * 
 * Muestra información adicional al hacer hover o focus.
 * Soporta múltiples posiciones y modo solo icono.
 */
export default function Tooltip({
  content,
  position = 'top',
  children,
  iconOnly = false,
  className = '',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Calcular posición del tooltip
  useEffect(() => {
    if (!isVisible || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = rect.left + rect.width / 2 + scrollX;
        y = rect.top + scrollY - 8;
        break;
      case 'bottom':
        x = rect.left + rect.width / 2 + scrollX;
        y = rect.bottom + scrollY + 8;
        break;
      case 'left':
        x = rect.left + scrollX - 8;
        y = rect.top + rect.height / 2 + scrollY;
        break;
      case 'right':
        x = rect.right + scrollX + 8;
        y = rect.top + rect.height / 2 + scrollY;
        break;
    }

    setTooltipPosition({ x, y });
  }, [isVisible, position]);

  // Posiciones de transform para el tooltip
  const transformOrigin = {
    top: 'bottom center',
    bottom: 'top center',
    left: 'right center',
    right: 'left center',
  }[position];

  const translate = {
    top: '-translate-x-1/2 -translate-y-full',
    bottom: '-translate-x-1/2',
    left: '-translate-x-full -translate-y-1/2',
    right: '-translate-y-1/2',
  }[position];

  if (iconOnly) {
    return (
      <div
        ref={triggerRef}
        className={`relative inline-flex items-center ${className}`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        role="tooltip"
        aria-label={content}
      >
        {children || (
          <Info className="w-4 h-4 text-[var(--foreground-muted)] cursor-help hover:text-[var(--color-primary-500)] transition-colors" />
        )}
        
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={`absolute z-50 ${translate}`}
              style={{
                left: position === 'top' || position === 'bottom' ? '50%' : position === 'right' ? 'calc(100% + 8px)' : undefined,
                top: position === 'left' || position === 'right' ? '50%' : undefined,
                bottom: position === 'top' ? 'calc(100% + 8px)' : undefined,
                right: position === 'left' ? 'calc(100% + 8px)' : undefined,
              }}
            >
              <div className="px-3 py-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] shadow-lg text-sm text-[var(--foreground)] max-w-xs whitespace-normal">
                {content}
                {/* Flecha */}
                <div
                  className={`absolute w-2 h-2 bg-[var(--surface-elevated)] border border-[var(--border)] rotate-45 ${
                    position === 'top'
                      ? 'bottom-[-5px] left-1/2 -translate-x-1/2 border-t-0 border-l-0'
                      : position === 'bottom'
                      ? 'top-[-5px] left-1/2 -translate-x-1/2 border-b-0 border-r-0'
                      : position === 'left'
                      ? 'right-[-5px] top-1/2 -translate-y-1/2 border-l-0 border-t-0'
                      : 'left-[-5px] top-1/2 -translate-y-1/2 border-r-0 border-b-0'
                  }`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      ref={triggerRef}
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      role="tooltip"
      aria-label={content}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 ${translate}`}
            style={{
              left: position === 'top' || position === 'bottom' ? '50%' : position === 'right' ? 'calc(100% + 8px)' : undefined,
              top: position === 'left' || position === 'right' ? '50%' : position === 'bottom' ? 'calc(100% + 8px)' : undefined,
              bottom: position === 'top' ? 'calc(100% + 8px)' : undefined,
              right: position === 'left' ? 'calc(100% + 8px)' : undefined,
            }}
          >
            <div className="px-3 py-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] shadow-lg text-sm text-[var(--foreground)] max-w-xs whitespace-normal">
              {content}
              {/* Flecha */}
              <div
                className={`absolute w-2 h-2 bg-[var(--surface-elevated)] border border-[var(--border)] rotate-45 ${
                  position === 'top'
                    ? 'bottom-[-5px] left-1/2 -translate-x-1/2 border-t-0 border-l-0'
                    : position === 'bottom'
                    ? 'top-[-5px] left-1/2 -translate-x-1/2 border-b-0 border-r-0'
                    : position === 'left'
                    ? 'right-[-5px] top-1/2 -translate-y-1/2 border-l-0 border-t-0'
                    : 'left-[-5px] top-1/2 -translate-y-1/2 border-r-0 border-b-0'
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
