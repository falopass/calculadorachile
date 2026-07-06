// ============================================
// LastReviewed — badge de fecha de actualización
// ----------------------------------------------
// Muestra "Actualizado: julio de 2026" con <time> semántico.
// Sutil pero legible: refuerza E-E-A-T sin distraer del cálculo.
// ============================================

import { formatDateMonthYear } from '@/lib/formatters';

interface LastReviewedProps {
  /** Fecha ISO (YYYY-MM-DD) de la última revisión real. */
  date: string;
  /** Clase extra para integración con el layout. */
  className?: string;
}

export default function LastReviewed({ date, className = '' }: LastReviewedProps) {
  return (
    <time
      dateTime={date}
      className={`text-xs text-[var(--foreground-muted)] ${className}`}
      itemProp="dateModified"
    >
      Actualizado: {formatDateMonthYear(date)}
    </time>
  );
}