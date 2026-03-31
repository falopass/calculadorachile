'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * CustomCursor - Cursor personalizado interactivo optimizado
 *
 * Características:
 * - Sigue al cursor con física suave (spring)
 * - Cambia de tamaño según el contexto (hover en links, botones)
 * - Ocultamiento automático en dispositivos táctiles
 * - Rendimiento optimizado sin GSAP
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  // Motion values para posición suave
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring physics para movimiento fluido - optimizado
  const springConfig = { damping: 30, stiffness: 350, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  // Detectar elementos interactivos
  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.closest('[role="button"]') ||
      target.dataset.cursor
    ) {
      setIsHovering(true);
      
      const cursorDataText = target.dataset.cursorText ||
                            target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      if (cursorDataText) {
        setCursorText(cursorDataText);
      }
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setCursorText('');
  }, []);

  useEffect(() => {
    // Detectar si es dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Throttle para mejor rendimiento
    let ticking = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Usar event delegation para mejor rendimiento
    document.addEventListener('mouseover', handleMouseEnter, true);
    document.addEventListener('mouseout', handleMouseLeave, true);

    // Ocultar cursor nativo
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter, true);
      document.removeEventListener('mouseout', handleMouseLeave, true);
      document.body.style.cursor = 'auto';
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave]);

  // No renderizar en SSR o dispositivos táctiles
  if (typeof window === 'undefined') return null;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return null;
  if (!isVisible) return null;

  return (
    <>
      {/* Cursor principal - punto central */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.15, type: 'tween' }}
          className="w-2 h-2 bg-white rounded-full"
        />
      </motion.div>

      {/* Cursor exterior - anillo */}
      <motion.div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isHovering ? 0.6 : 0.4,
          }}
          transition={{ duration: 0.2, type: 'tween' }}
          className="relative flex items-center justify-center"
        >
          {/* Anillo exterior */}
          <motion.div
            animate={{
              width: isHovering ? '48px' : '32px',
              height: isHovering ? '48px' : '32px',
            }}
            transition={{ duration: 0.2, type: 'tween' }}
            className="absolute border border-white/50 rounded-full"
          />
          
          {/* Texto del cursor (para casos especiales) */}
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute text-[9px] font-bold text-white uppercase tracking-wider whitespace-nowrap"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
