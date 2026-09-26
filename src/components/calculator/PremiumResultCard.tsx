'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { CalculatorResult } from '@/types/calculator';
import { formatCLP, formatUF, formatUTM, formatPercentage } from '@/lib/formatters';
import { Copy, Check, BarChart3, PieChart, TrendingUp, DollarSign, PiggyBank, Receipt } from 'lucide-react';
import PremiumResultChart, { type ChartSegment } from './PremiumResultChart';
import ExportMenu from './ExportMenu';

export interface PremiumResultCardProps {
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
 * Iconos predefinidos para diferentes tipos de resultados
 */
const RESULT_ICONS = {
  'CLP': DollarSign,
  'UF': Receipt,
  'UTM': Receipt,
  'percentage': TrendingUp,
  'days': PiggyBank,
  'number': PiggyBank,
};

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
  // Solo filas del mismo formato que el resultado principal:
  // mezclar conteos, % y CLP en un donut es engañoso (YMYL).
  const mainFormat = results.find((r) => r.highlight)?.format ?? 'CLP';
  const sourceResults = results.filter((r) => !r.highlight && r.format === mainFormat);

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
function PremiumResultRow({ result, index }: { result: CalculatorResult; index: number }) {
  const [copied, setCopied] = useState(false);
  const IconComponent = RESULT_ICONS[result.format] || PiggyBank;

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
        flex justify-between items-center px-4 sm:px-5 py-4 group
        ${result.highlight
          ? 'bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-primary-600)]/10 border-y border-[var(--color-primary-300)]/30'
          : 'hover:bg-[var(--background-secondary)]/40 border-b border-[var(--border)]/30'
        }
      `}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className={`
          p-2 rounded-lg shrink-0
          ${result.highlight
            ? 'bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] text-white shadow-md'
            : 'bg-[var(--background-secondary)]/60 text-[var(--foreground-secondary)]'
          }
        `}>
          <IconComponent className="w-4 h-4" />
        </div>
        <span className={`min-w-0 break-words text-sm ${result.highlight ? 'font-semibold text-[var(--foreground)]' : 'text-[var(--foreground-secondary)]'}`}>
          {result.label}
        </span>
        {result.highlight && (
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] text-white text-[10px] font-bold uppercase tracking-wide shadow-sm">
            Principal
          </span>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span
          className={`
            font-mono font-medium whitespace-nowrap
            ${result.highlight
              ? 'text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] text-lg sm:text-xl'
              : 'text-[var(--foreground)] dark:text-[var(--foreground-dark)] text-base'
            }
          `}
        >
          {formatValue(result.value, result.format)}
        </span>

        {/* Botón copiar */}
        <button
          onClick={handleCopy}
          className="hidden sm:inline-flex opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-[var(--background-secondary)]/50 transition-all border border-[var(--border)]/50"
          title="Copiar valor"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[var(--color-success-500)]" />
          ) : (
            <Copy className="w-4 h-4 text-[var(--foreground-secondary)]" />
          )}
        </button>
      </div>
    </motion.div>
  );
}

/**
 * PremiumResultCard - Componente premium para mostrar resultados de calculadoras
 *
 * Características:
 * - Muestra resultados con formato chileno (CLP, UF, UTM, etc.) con diseño premium
 * - Gráfico de distribución (donut/bar) automático o personalizado
 * - Exportación a PNG, copiar al portapapeles y compartir
 * - Copiar valores individuales
 * - Iconos temáticos para diferentes tipos de resultados
 * - Gradientes y efectos visuales premium
 */
export default function PremiumResultCard({ 
  results, 
  title, 
  animate = true,
  calculatorId,
  showChart = true,
  chartConfig,
}: PremiumResultCardProps) {
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
      className="w-full rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--surface)] shadow-sm"
      role="region"
      aria-label="Resultados del cálculo"
      aria-live="polite"
    >
      {/* Header */}
      {title && (
        <div className="bg-gradient-to-r from-[var(--color-primary-600)]/20 via-[var(--color-primary-700)]/15 to-[var(--color-primary-600)]/20 px-4 py-4 sm:px-6 sm:py-5 border-b border-[var(--border)]/50 flex flex-wrap justify-between items-center gap-3">
          <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-lg shadow-sm">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            {title}
          </h3>
          <div className="flex items-center gap-2">
            {/* Toggle gráfico */}
            {showChart && segments.length > 1 && (
              <button
                onClick={() => setShowChartState(!showChartState)}
                aria-label={showChartState ? 'Ocultar gráfico' : 'Mostrar gráfico'}
                className="text-xs text-[var(--foreground-secondary)] hover:text-[var(--foreground)] flex items-center justify-center gap-1 h-11 w-11 sm:h-auto sm:w-auto px-3 py-1.5 rounded-lg hover:bg-[var(--background-secondary)]/50 transition-all border border-[var(--border)]/50"
                title={showChartState ? 'Ocultar gráfico' : 'Mostrar gráfico'}
              >
                {showChartState ? (
                  <BarChart3 className="w-4 h-4" />
                ) : (
                  <PieChart className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{showChartState ? 'Gráfico' : 'Datos'}</span>
              </button>
            )}
            {/* Copiar todo */}
            <button
              onClick={handleCopyAll}
              aria-label="Copiar todos los resultados"
              className="text-xs text-[var(--foreground-secondary)] hover:text-[var(--foreground)] flex items-center justify-center gap-1 h-11 w-11 sm:h-auto sm:w-auto px-3 py-1.5 rounded-lg hover:bg-[var(--background-secondary)]/50 transition-all border border-[var(--border)]/50"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copiar</span>
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
        <div className="px-4 sm:px-6 pt-5 pb-2 bg-gradient-to-b from-transparent to-white/20 dark:to-slate-900/20">
          <PremiumResultChart
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
      <div className="divide-y divide-[var(--border)]/40">
        {results.map((result, index) => (
          <PremiumResultRow key={`${result.label}-${index}`} result={result} index={index} />
        ))}
      </div>
    </motion.div>
  );
}