'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { CalculatorResult } from '@/types/calculator';
import { formatCLP, formatUF, formatUTM, formatPercentage } from '@/lib/formatters';
import { Copy, Check, BarChart3, PieChart } from 'lucide-react';
import ResultChart, { type ChartSegment } from './ResultChart';
import ExportMenu from './ExportMenu';

export interface ResultCardProps {
  /** Resultados a mostrar */
  results: CalculatorResult[];
  /** Título de la tarjeta */
  title?: string;
  /** Mostrar animación de aparición */
  animate?: boolean;
  /** ID de la calculadora para exportación */
  calculatorId?: string;
  /** Mostrar gráfico de distribución */
  showChart?: boolean;
  /** Configuración del gráfico */
  chartConfig?: {
    /** Segmentos para el gráfico (si no se proporcionan, se generan automáticamente) */
    segments?: ChartSegment[];
    /** Tipo de gráfico */
    type?: 'donut' | 'bar';
    /** Título del gráfico */
    title?: string;
  };
}

/**
 * Formatea un valor según su tipo
 */
function formatValue(value: number, format: CalculatorResult['format']): string {
  switch (format) {
    case 'CLP':
      return formatCLP(value);
    case 'UF':
      return formatUF(value);
    case 'UTM':
      return formatUTM(value);
    case 'percentage':
      return formatPercentage(value);
    case 'days':
      return `${value} días`;
    case 'number':
    default:
      return value.toLocaleString('es-CL');
  }
}

/**
 * Colores predefinidos para segmentos del gráfico
 */
const CHART_COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#ef4444', '#f97316',
  '#f59e0b', '#eab308', '#84cc16', '#22c55e',
  '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#2563eb',
];

/**
 * Convierte formato de CalculatorResult a formato de ChartSegment
 */
function resultFormatToChartFormat(format: CalculatorResult['format']): ChartSegment['format'] {
  if (format === 'CLP') return 'CLP';
  if (format === 'percentage') return 'percentage';
  return 'number';
}

/**
 * Genera segmentos automáticos a partir de resultados
 * Excluye resultados highlight y agrupa los demás
 */
function generateChartSegments(results: CalculatorResult[]): ChartSegment[] {
  // Filtrar resultados que no sean highlight para el gráfico
  const nonHighlightResults = results.filter(r => !r.highlight);
  const sourceResults = nonHighlightResults.length > 0 ? nonHighlightResults : results;
  
  return sourceResults.slice(0, 6).map((result, index) => ({
    label: result.label,
    value: result.value,
    color: CHART_COLORS[index % CHART_COLORS.length],
    format: resultFormatToChartFormat(result.format),
  }));
}

/**
 * Fila individual de resultado con opción de copiar
 */
function ResultRow({ result, index }: { result: CalculatorResult; index: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `${result.label}: ${formatValue(result.value, result.format)}`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`
        flex justify-between items-center px-4 py-3.5 group
        ${result.highlight
          ? 'bg-gradient-to-r from-[var(--color-primary-50)] to-[var(--color-primary-100)]/50 border-y-2 border-[var(--color-primary-200)]'
          : 'hover:bg-[var(--background-secondary)]/50 border-b border-[var(--border)]/50'
        }
      `}
    >
      <div className="flex items-center gap-2">
        <span className={`text-sm ${result.highlight ? 'font-semibold text-[var(--foreground)]' : 'text-[var(--foreground-secondary)]'}`}>
          {result.label}
        </span>
        {result.highlight && (
          <span className="px-2 py-0.5 rounded-full bg-[var(--color-primary-500)] text-white text-[10px] font-bold uppercase tracking-wide">
            Principal
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <span
          className={`
            font-mono
            ${result.highlight ? 'text-[var(--color-primary-600)] text-xl font-bold' : 'text-[var(--foreground)] text-sm'}
          `}
        >
          {formatValue(result.value, result.format)}
        </span>
        
        {/* Botón copiar */}
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[var(--border)] transition-all"
          title="Copiar valor"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-[var(--color-success-500)]" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
          )}
        </button>
      </div>
    </motion.div>
  );
}

/**
 * ResultCard - Componente para mostrar resultados de calculadoras
 *
 * Características:
 * - Muestra resultados con formato chileno (CLP, UF, UTM, etc.)
 * - Gráfico de distribución (donut/bar) automático o personalizado
 * - Exportación a PNG, copiar al portapapeles y compartir
 * - Copiar valores individuales
 */
export default function ResultCard({ 
  results, 
  title, 
  animate = true,
  calculatorId,
  showChart = true,
  chartConfig,
}: ResultCardProps) {
  const [showChartState, setShowChartState] = useState(true);

  // Generar segmentos automáticos si no se proporcionan
  const autoSegments = useMemo(() => generateChartSegments(results), [results]);
  const segments = chartConfig?.segments || autoSegments;

  // Obtener resultado principal para exportación
  const mainResult = results.find(r => r.highlight);
  const exportResults = results
    .filter(r => !r.highlight)
    .map(r => ({ label: r.label, value: formatValue(r.value, r.format) }));

  if (!results || results.length === 0) {
    return null;
  }

  const handleCopyAll = async () => {
    const text = results.map(r => `${r.label}: ${formatValue(r.value, r.format)}`).join('\n');
    await navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20, scale: 0.98 } : {}}
      animate={animate ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full rounded-xl border border-[var(--border)] overflow-hidden shadow-lg bg-[var(--surface)]"
      role="region"
      aria-label="Resultados del cálculo"
      aria-live="polite"
    >
      {/* Header */}
      {title && (
        <div className="bg-gradient-to-r from-[var(--background-secondary)] to-[var(--surface)] px-5 py-4 border-b border-[var(--border)] flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success-500)] animate-pulse" />
            {title}
          </h3>
          <div className="flex items-center gap-2">
            {/* Toggle gráfico */}
            {showChart && segments.length > 1 && (
              <button
                onClick={() => setShowChartState(!showChartState)}
                className="text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-[var(--border)] transition-all"
                title={showChartState ? 'Ocultar gráfico' : 'Mostrar gráfico'}
              >
                {showChartState ? (
                  <BarChart3 className="w-3.5 h-3.5" />
                ) : (
                  <PieChart className="w-3.5 h-3.5" />
                )}
              </button>
            )}
            {/* Copiar todo */}
            <button
              onClick={handleCopyAll}
              className="text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-[var(--border)] transition-all"
            >
              <Copy className="w-3.5 h-3.5" />
              Copiar todo
            </button>
            {/* Exportar */}
            {calculatorId && (
              <ExportMenu
                title={title}
                results={exportResults}
                mainResult={mainResult ? { label: mainResult.label, value: formatValue(mainResult.value, mainResult.format) } : undefined}
                calculatorId={calculatorId}
              />
            )}
          </div>
        </div>
      )}

      {/* Gráfico de distribución */}
      {showChartState && showChart && segments.length > 1 && (
        <div className="px-5 pt-4">
          <ResultChart
            segments={segments}
            type={chartConfig?.type || 'donut'}
            title={chartConfig?.title || 'Distribución'}
            centerValue={mainResult ? {
              value: mainResult.value,
              label: mainResult.label,
              format: (v: number) => formatValue(v, mainResult.format),
            } : undefined}
          />
        </div>
      )}

      {/* Resultados */}
      <div className="divide-y divide-[var(--border)]/50">
        {results.map((result, index) => (
          <ResultRow key={`${result.label}-${index}`} result={result} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
