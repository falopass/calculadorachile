'use client';

import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

interface PremiumLoadingIndicatorProps {
  isLoading: boolean;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  variant?: 'spinner' | 'progress' | 'pulse';
}

/**
 * PremiumLoadingIndicator - Indicador de carga premium
 * 
 * Proporciona una experiencia visual elegante durante la carga de cálculos
 */
export default function PremiumLoadingIndicator({
  isLoading,
  size = 'md',
  message = 'Calculando...',
  variant = 'spinner',
}: PremiumLoadingIndicatorProps) {
  if (!isLoading) return null;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const spinnerVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
  };

  if (variant === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <motion.div
          variants={spinnerVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="mb-3"
        >
          <Sparkles className={`${sizeClasses[size]} text-[var(--color-primary-500)]`} />
        </motion.div>
        <p className="text-sm text-[var(--foreground-secondary)]">{message}</p>
      </div>
    );
  }

  if (variant === 'progress') {
    return (
      <div className="py-6 px-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-[var(--background-secondary)] rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)]"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            />
          </div>
          <Sparkles className={`${sizeClasses[size]} text-[var(--color-primary-500)]`} />
        </div>
        <p className="text-xs text-[var(--foreground-secondary)] mt-2 text-center">{message}</p>
      </div>
    );
  }

  // Variante pulse
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-3"
      >
        <Sparkles className={`${sizeClasses[size]} text-[var(--color-primary-500)]`} />
      </motion.div>
      <p className="text-sm text-[var(--foreground-secondary)]">{message}</p>
    </div>
  );
}