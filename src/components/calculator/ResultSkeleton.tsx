'use client';

import { motion } from 'framer-motion';

/**
 * ResultSkeleton - Skeleton loading para resultados de calculadora
 * 
 * Muestra un estado de carga elegante mientras se calculan los resultados.
 * Usa animación shimmer para indicar actividad.
 */
export default function ResultSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden"
      role="status"
      aria-label="Calculando resultados..."
    >
      {/* Header del skeleton */}
      <div className="bg-gradient-to-r from-[var(--background-secondary)] to-[var(--surface)] px-6 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--border)] animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-32 bg-[var(--border)] rounded-md animate-pulse" />
            <div className="h-3 w-48 bg-[var(--border)]/60 rounded-md animate-pulse" />
          </div>
        </div>
      </div>

      {/* Filas del skeleton */}
      <div className="p-4 space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex justify-between items-center px-4 py-3.5 rounded-lg bg-[var(--background-secondary)]/50"
          >
            <div className="h-4 w-24 bg-[var(--border)] rounded-md animate-pulse" />
            <div className="h-5 w-20 bg-[var(--border)] rounded-md animate-pulse" />
          </motion.div>
        ))}
      </div>

      {/* Resultado principal destacado */}
      <div className="px-4 pb-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 rounded-xl bg-gradient-to-r from-[var(--color-primary-50)] to-[var(--color-primary-100)]/50 border border-[var(--color-primary-200)]"
        >
          <div className="flex justify-between items-center">
            <div className="h-4 w-28 bg-[var(--color-primary-200)] rounded-md animate-pulse" />
            <div className="h-7 w-32 bg-[var(--color-primary-300)] rounded-md animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <span className="sr-only">Calculando resultados...</span>
    </motion.div>
  );
}
