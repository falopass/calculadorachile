'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export interface ChartSegment {
  label: string;
  value: number;
  color: string;
  format?: 'CLP' | 'percentage' | 'number';
}

export interface ResultChartProps {
  /** Datos para el gráfico */
  segments: ChartSegment[];
  /** Tipo de gráfico */
  type?: 'donut' | 'bar';
  /** Título del gráfico */
  title?: string;
  /** Valor total a mostrar en el centro (donut) */
  centerValue?: { value: number; label: string; format?: (v: number) => string };
}

/**
 * ResultChart - Componente de gráficos para resultados de calculadora
 * 
 * Soporta gráficos donut y bar con SVG puro.
 * Sin dependencias externas.
 */
export default function ResultChart({
  segments,
  type = 'donut',
  title,
  centerValue,
}: ResultChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const formatValue = (value: number, format: string = 'CLP'): string => {
    switch (format) {
      case 'CLP':
        return `$${Math.round(value).toLocaleString('es-CL')}`;
      case 'percentage':
        return `${value.toFixed(1).replace('.', ',')}%`;
      default:
        return value.toLocaleString('es-CL');
    }
  };

  const total = segments.reduce((sum, s) => sum + s.value, 0);

  if (type === 'donut') {
    return (
      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4">
        {title && (
          <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4">{title}</h4>
        )}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* SVG Donut Chart */}
          <div className="relative w-40 h-40 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {segments.map((segment, index) => {
                const percentage = total > 0 ? segment.value / total : 0;
                const circumference = 2 * Math.PI * 35;
                const strokeDasharray = `${circumference * percentage} ${circumference * (1 - percentage)}`;
                const strokeDashoffset = segments
                  .slice(0, index)
                  .reduce((offset, s) => {
                    const p = total > 0 ? s.value / total : 0;
                    return offset - circumference * p;
                  }, 0);

                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke={segment.color}
                    strokeWidth={hoveredIndex === index ? 10 : 8}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.5 : 1,
                    }}
                  />
                );
              })}
            </svg>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {centerValue ? (
                <>
                  <span className="text-lg font-bold text-[var(--foreground)]">
                    {centerValue.format ? centerValue.format(centerValue.value) : centerValue.value.toLocaleString('es-CL')}
                  </span>
                  <span className="text-[10px] text-[var(--foreground-muted)]">{centerValue.label}</span>
                </>
              ) : (
                <span className="text-xs text-[var(--foreground-muted)]">Total</span>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-2 min-w-0">
            {segments.map((segment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between gap-2 p-2 rounded-lg transition-colors ${
                  hoveredIndex === index ? 'bg-[var(--background-secondary)]' : ''
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="text-sm text-[var(--foreground)] truncate">{segment.label}</span>
                </div>
                <span className="text-sm font-semibold text-[var(--foreground)] tabular-nums">
                  {formatValue(segment.value, segment.format)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Bar Chart
  return (
    <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4">
      {title && (
        <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4">{title}</h4>
      )}
      <div className="space-y-3">
        {segments.map((segment, index) => {
          const percentage = total > 0 ? (segment.value / total) * 100 : 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[var(--foreground)]">{segment.label}</span>
                <span className="text-sm font-semibold text-[var(--foreground)] tabular-nums">
                  {formatValue(segment.value, segment.format)}
                </span>
              </div>
              <div className="h-2.5 bg-[var(--background-secondary)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
