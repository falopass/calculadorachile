'use client';

import { motion } from 'framer-motion';
import { formatCLP, formatPercentage } from '@/lib/formatters';
import { TrendingUp, PieChart, BarChart3 } from 'lucide-react';

export interface ChartSegment {
  label: string;
  value: number;
  color: string;
  format: 'CLP' | 'percentage' | 'number';
}

export interface PremiumResultChartProps {
  segments: ChartSegment[];
  type?: 'donut' | 'bar';
  title?: string;
  centerValue?: {
    value: number;
    label: string;
    format: (value: number) => string;
  };
}

/**
 * PremiumResultChart - Componente premium para gráficos de resultados
 * 
 * Visualización elegante de datos con animaciones y efectos visuales premium
 */
export default function PremiumResultChart({ 
  segments, 
  type = 'donut', 
  title = 'Distribución', 
  centerValue 
}: PremiumResultChartProps) {
  if (segments.length === 0) return null;

  if (type === 'bar') {
    return <PremiumBarChart segments={segments} title={title} />;
  }

  return <PremiumDonutChart segments={segments} title={title} centerValue={centerValue} />;
}

/**
 * Gráfico de dona premium con animaciones
 */
function PremiumDonutChart({ 
  segments, 
  title, 
  centerValue 
}: {
  segments: ChartSegment[];
  title: string;
  centerValue?: PremiumResultChartProps['centerValue'];
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const radius = 80;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius;
  
  let cumulativePercentage = 0;
  
  return (
    <div className="flex flex-col items-center">
      <h4 className="text-sm font-medium text-[var(--foreground-secondary)] mb-4 flex items-center gap-2">
        <PieChart className="w-4 h-4" />
        {title}
      </h4>
      
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200" className="w-40 h-40">
          {/* Círculo base gris claro */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={strokeWidth}
          />
          
          {/* Segmentos animados */}
          {segments.map((segment, index) => {
            const percentage = (segment.value / total) * 100;
            const segmentLength = (percentage / 100) * circumference;
            const strokeDashoffset = circumference * -0.25 - cumulativePercentage * circumference;
            cumulativePercentage += percentage / 100;
            
            return (
              <motion.circle
                key={`${segment.label}-${index}`}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference * -0.25 }}
                animate={{ strokeDashoffset }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                style={{
                  transformOrigin: "100px 100px",
                }}
              />
            );
          })}
        </svg>
        
        {/* Valor central opcional */}
        {centerValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-[var(--foreground)]">
                {centerValue.format(centerValue.value)}
              </div>
              <div className="text-xs text-[var(--foreground-secondary)]">
                {centerValue.label}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Leyenda */}
      <div className="mt-6 space-y-2 max-h-40 overflow-y-auto">
        {segments.map((segment, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-[var(--foreground-secondary)]">{segment.label}</span>
            </div>
            <span className="font-medium text-[var(--foreground)]">
              {segment.format === 'CLP' 
                ? formatCLP(segment.value) 
                : segment.format === 'percentage' 
                  ? formatPercentage(segment.value) 
                  : segment.value.toLocaleString('es-CL')}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * Gráfico de barras premium con animaciones
 */
function PremiumBarChart({ segments, title }: { segments: ChartSegment[]; title: string }) {
  const maxValue = Math.max(...segments.map(s => s.value), 1);
  
  return (
    <div className="w-full">
      <h4 className="text-sm font-medium text-[var(--foreground-secondary)] mb-4 flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        {title}
      </h4>
      
      <div className="space-y-3">
        {segments.map((segment, index) => {
          const percentage = (segment.value / maxValue) * 100;
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--foreground-secondary)]">{segment.label}</span>
                <span className="font-medium text-[var(--foreground)]">
                  {segment.format === 'CLP' 
                    ? formatCLP(segment.value) 
                    : segment.format === 'percentage' 
                      ? formatPercentage(segment.value) 
                      : segment.value.toLocaleString('es-CL')}
                </span>
              </div>
              
              <div className="w-full bg-[var(--background-secondary)] rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}