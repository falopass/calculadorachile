'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface PremiumAnimationWrapperProps {
  children: React.ReactNode;
  type?: 'fadeIn' | 'slideIn' | 'scaleIn' | 'stagger';
  delay?: number;
  duration?: number;
  className?: string;
  animateOnce?: boolean;
}

/**
 * PremiumAnimationWrapper - Componente envoltorio para animaciones premium
 * 
 * Proporciona animaciones suaves y elegantes para elementos de la interfaz
 */
export default function PremiumAnimationWrapper({
  children,
  type = 'fadeIn',
  delay = 0,
  duration = 0.5,
  className = '',
  animateOnce = true,
}: PremiumAnimationWrapperProps) {
  const getAnimationProps = () => {
    const baseProps = {
      initial: {},
      animate: {},
      exit: {},
      transition: {
        duration,
        delay,
        ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number], // Cubic bezier smooth
      },
    };

    switch (type) {
      case 'fadeIn':
        return {
          ...baseProps,
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
      
      case 'slideIn':
        return {
          ...baseProps,
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 20 },
        };
      
      case 'scaleIn':
        return {
          ...baseProps,
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
        };
      
      case 'stagger':
        return {
          ...baseProps,
          initial: { opacity: 0, y: 20 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: {
              ...baseProps.transition,
              staggerChildren: 0.05,
            }
          },
          exit: { opacity: 0, y: 20 },
        };
      
      default:
        return baseProps;
    }
  };

  const animationProps = getAnimationProps();

  return (
    <motion.div
      className={className}
      initial={animationProps.initial}
      animate={animationProps.animate}
      exit={animationProps.exit}
      transition={animationProps.transition}
      viewport={{ once: animateOnce }}
    >
      {children}
    </motion.div>
  );
}

/**
 * PremiumStaggerContainer - Contenedor para animaciones escalonadas
 * 
 * Permite animar múltiples elementos hijos con un efecto escalonado
 */
export function PremiumStaggerContainer({
  children,
  className = '',
  delay = 0.05,
  duration = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        transition: {
          staggerChildren: delay,
          duration,
        }
      }}
      exit={{ opacity: 0 }}
      viewport={{ once: true }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: index * delay }
          }}
          exit={{ opacity: 0, y: 10 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * PremiumFloatingElement - Elemento con animación flotante sutil
 * 
 * Ideal para elementos decorativos o de énfasis
 */
export function PremiumFloatingElement({
  children,
  className = '',
  duration = 4,
  amplitude = 10,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  amplitude?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}