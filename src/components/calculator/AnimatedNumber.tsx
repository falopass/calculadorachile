'use client';

import { useState, useEffect, useRef } from 'react';

export interface AnimatedNumberProps {
  /** Valor final a animar */
  value: number;
  /** Duración de la animación en ms */
  duration?: number;
  /** Formateador del valor */
  formatFn?: (value: number) => string;
  /** Clases CSS adicionales */
  className?: string;
  /** Decimales para redondear */
  decimals?: number;
}

/**
 * AnimatedNumber - Componente que anima números desde 0 hasta el valor final
 * 
 * Usa @react-spring/web para animaciones suaves con física real.
 * Si no está disponible, fallback a animación CSS pura.
 * 
 * @example
 * <AnimatedNumber value={800000} formatFn={(v) => `$${v.toLocaleString('es-CL')}`} />
 */
export default function AnimatedNumber({
  value,
  duration = 600,
  formatFn,
  className = '',
  decimals = 0,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevValueRef = useRef(0);

  useEffect(() => {
    // Si el valor es el mismo, no animar
    if (value === prevValueRef.current) return;
    
    const startValue = prevValueRef.current;
    const endValue = value;
    const startTime = performance.now();
    
    prevValueRef.current = value;
    setIsAnimating(true);

    // Easing function: ease-out cubic
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      const currentValue = startValue + (endValue - startValue) * easedProgress;
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  // Formatear valor para display
  const formattedValue = formatFn
    ? formatFn(displayValue)
    : decimals > 0
      ? displayValue.toFixed(decimals).replace('.', ',')
      : Math.round(displayValue).toLocaleString('es-CL');

  return (
    <span className={`inline-block tabular-nums ${className}`}>
      {formattedValue}
      {isAnimating && (
        <span className="inline-block w-1.5 h-4 ml-0.5 bg-[var(--color-primary-500)] animate-pulse opacity-50" />
      )}
    </span>
  );
}
