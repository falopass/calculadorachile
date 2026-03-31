'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Download, TrendingDown, PieChart } from 'lucide-react';
import { formatCLP, formatUF } from '@/lib/formatters';

// ============================================
// Tipos para la tabla de amortización
// ============================================

export interface AmortizationRow {
  mes: number;
  cuota: number;
  capital: number;
  intereses: number;
  saldo: number;
  acumuladoCapital: number;
  acumuladoIntereses: number;
}

export interface AmortizationTableProps {
  /** Monto del crédito en UF */
  montoUF: number;
  /** Pie en UF */
  pieUF?: number;
  /** Plazo en años */
  plazoAnos: number;
  /** Tasa de interés anual (%) */
  tasaAnual: number;
  /** Valor actual de la UF */
  valorUF?: number;
  /** Título de la tabla */
  title?: string;
  /** Número máximo de filas a mostrar inicialmente */
  initialRows?: number;
}

// ============================================
// Función para calcular la tabla de amortización
// ============================================

function calculateAmortizationSchedule(
  montoUF: number,
  pieUF: number,
  plazoAnos: number,
  tasaAnual: number
): AmortizationRow[] {
  const montoFinanciarUF = Math.max(0, montoUF - pieUF);
  const plazoMeses = plazoAnos * 12;
  const tasaMensual = tasaAnual / 100 / 12;

  // Calcular cuota usando amortización francesa
  let cuota: number;
  if (tasaMensual === 0) {
    cuota = montoFinanciarUF / plazoMeses;
  } else {
    const factor = Math.pow(1 + tasaMensual, plazoMeses);
    cuota = montoFinanciarUF * (tasaMensual * factor) / (factor - 1);
  }

  const schedule: AmortizationRow[] = [];
  let saldo = montoFinanciarUF;
  let acumuladoCapital = 0;
  let acumuladoIntereses = 0;

  for (let mes = 1; mes <= plazoMeses; mes++) {
    // Calcular intereses del mes
    const intereses = saldo * tasaMensual;
    
    // Calcular capital de la cuota
    const capital = cuota - intereses;
    
    // Actualizar saldo
    saldo = Math.max(0, saldo - capital);
    acumuladoCapital += capital;
    acumuladoIntereses += intereses;

    schedule.push({
      mes,
      cuota: Math.round(cuota * 100) / 100,
      capital: Math.round(capital * 100) / 100,
      intereses: Math.round(intereses * 100) / 100,
      saldo: Math.round(saldo * 100) / 100,
      acumuladoCapital: Math.round(acumuladoCapital * 100) / 100,
      acumuladoIntereses: Math.round(acumuladoIntereses * 100) / 100,
    });
  }

  return schedule;
}

// ============================================
// Componente principal
// ============================================

export default function AmortizationTable({
  montoUF,
  pieUF = 0,
  plazoAnos,
  tasaAnual,
  valorUF = 38000,
  title = 'Tabla de Amortización',
  initialRows = 12,
}: AmortizationTableProps) {
  const [showAll, setShowAll] = useState(false);
  const [showChart, setShowChart] = useState(false);

  // Calcular el cronograma de amortización
  const schedule = useMemo(
    () => calculateAmortizationSchedule(montoUF, pieUF, plazoAnos, tasaAnual),
    [montoUF, pieUF, plazoAnos, tasaAnual]
  );

  // Calcular totales
  const totals = useMemo(() => {
    const totalPagado = schedule.reduce((sum, row) => sum + row.cuota, 0);
    const totalIntereses = schedule.reduce((sum, row) => sum + row.intereses, 0);
    const totalCapital = schedule.reduce((sum, row) => sum + row.capital, 0);

    return {
      totalPagado: Math.round(totalPagado * 100) / 100,
      totalIntereses: Math.round(totalIntereses * 100) / 100,
      totalCapital: Math.round(totalCapital * 100) / 100,
    };
  }, [schedule]);

  // Determinar filas a mostrar
  const displayRows = showAll ? schedule : schedule.slice(0, initialRows);
  const hasMoreRows = schedule.length > initialRows;

  // Calcular porcentaje de intereses vs capital
  const interesPorcentaje = (totals.totalIntereses / totals.totalPagado) * 100;
  const capitalPorcentaje = (totals.totalCapital / totals.totalPagado) * 100;

  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-800)] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="text-[var(--color-primary-100)] text-sm">
                {plazoAnos * 12} cuotas • {tasaAnual}% anual
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowChart(!showChart)}
            className={`p-2 rounded-lg transition-colors ${
              showChart
                ? 'bg-white/20 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
            title="Ver gráfico de distribución"
          >
            <PieChart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Resumen de totales */}
      <div className="p-6 border-b border-[var(--border)]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[var(--background-secondary)] rounded-xl p-4">
            <p className="text-sm text-[var(--foreground-muted)] mb-1">Monto financiado</p>
            <p className="text-lg font-semibold text-[var(--foreground)]">
              {formatUF(montoUF - pieUF)}
            </p>
            <p className="text-xs text-[var(--foreground-muted)]">
              {formatCLP((montoUF - pieUF) * valorUF)}
            </p>
          </div>
          <div className="bg-[var(--background-secondary)] rounded-xl p-4">
            <p className="text-sm text-[var(--foreground-muted)] mb-1">Total intereses</p>
            <p className="text-lg font-semibold text-[var(--color-error-600)]">
              {formatUF(totals.totalIntereses)}
            </p>
            <p className="text-xs text-[var(--foreground-muted)]">
              {interesPorcentaje.toFixed(1)}% del total
            </p>
          </div>
          <div className="bg-[var(--background-secondary)] rounded-xl p-4">
            <p className="text-sm text-[var(--foreground-muted)] mb-1">Total a pagar</p>
            <p className="text-lg font-semibold text-[var(--foreground)]">
              {formatUF(totals.totalPagado)}
            </p>
            <p className="text-xs text-[var(--foreground-muted)]">
              {formatCLP(totals.totalPagado * valorUF)}
            </p>
          </div>
          <div className="bg-[var(--background-secondary)] rounded-xl p-4">
            <p className="text-sm text-[var(--foreground-muted)] mb-1">Cuota mensual</p>
            <p className="text-lg font-semibold text-[var(--color-primary-600)]">
              {formatUF(schedule[0]?.cuota || 0)}
            </p>
            <p className="text-xs text-[var(--foreground-muted)]">
              {formatCLP((schedule[0]?.cuota || 0) * valorUF)}
            </p>
          </div>
        </div>

        {/* Barra de distribución */}
        {showChart && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <div className="h-4 rounded-full overflow-hidden flex">
              <div
                className="bg-[var(--color-primary-500)] h-full transition-all duration-500"
                style={{ width: `${capitalPorcentaje}%` }}
                  title={`Capital: ${capitalPorcentaje.toFixed(1)}%`}
                />
                <div
                  className="bg-[var(--color-error-500)] h-full transition-all duration-500"
                  style={{ width: `${interesPorcentaje}%` }}
                  title={`Intereses: ${interesPorcentaje.toFixed(1)}%`}
                />
            </div>
            <div className="flex justify-between mt-2 text-xs text-[var(--foreground-muted)]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary-500)]" />
                Capital: {capitalPorcentaje.toFixed(1)}%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--color-error-500)]" />
                Intereses: {interesPorcentaje.toFixed(1)}%
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Tabla de amortización */}
      <div className="overflow-x-auto" role="region" aria-label="Tabla de amortización del crédito">
        <table className="w-full">
          <caption className="sr-only">
            Cronograma de amortización del crédito mostrando cuota, capital, intereses y saldo por mes
          </caption>
          <thead>
            <tr className="bg-[var(--background-secondary)]">
              <th scope="col" className="text-left py-3 px-4 text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                #
              </th>
              <th scope="col" className="text-right py-3 px-4 text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                Cuota
              </th>
              <th scope="col" className="text-right py-3 px-4 text-xs font-medium text-[var(--color-primary-600)] uppercase tracking-wider">
                Capital
              </th>
              <th scope="col" className="text-right py-3 px-4 text-xs font-medium text-[var(--color-error-600)] uppercase tracking-wider">
                Intereses
              </th>
              <th scope="col" className="text-right py-3 px-4 text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                Saldo
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {displayRows.map((row, index) => (
                <motion.tr
                  key={row.mes}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.01 }}
                  className={`border-b border-[var(--border)] hover:bg-[var(--background-secondary)] transition-colors ${
                    index % 12 === 11 ? 'bg-[var(--color-primary-50)]/50' : ''
                  }`}
                >
                  <td className="py-2 px-4 text-sm text-[var(--foreground-muted)]">
                    {row.mes}
                    {index % 12 === 11 && (
                      <span className="ml-2 text-xs text-[var(--color-primary-600)]">(año {Math.floor(index / 12) + 1})</span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-sm text-right font-medium text-[var(--foreground)]">
                    {formatUF(row.cuota)}
                  </td>
                  <td className="py-2 px-4 text-sm text-right text-[var(--color-primary-600)]">
                    {formatUF(row.capital)}
                  </td>
                  <td className="py-2 px-4 text-sm text-right text-[var(--color-error-600)]">
                    {formatUF(row.intereses)}
                  </td>
                  <td className="py-2 px-4 text-sm text-right text-[var(--foreground-muted)]">
                    {formatUF(row.saldo)}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Botón para mostrar más */}
      {hasMoreRows && (
        <div className="p-4 border-t border-[var(--border)] text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] transition-colors"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Ver menos
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Ver las {schedule.length - initialRows} cuotas restantes
              </>
            )}
          </button>
        </div>
      )}

      {/* Nota informativa */}
      <div className="p-4 bg-[var(--background-secondary)] border-t border-[var(--border)]">
        <p className="text-xs text-[var(--foreground-muted)]">
          * Esta tabla muestra la amortización basada en el sistema francés (cuota fija). 
          Los valores en UF se mantienen constantes, pero el valor en CLP varía según el valor de la UF.
        </p>
      </div>
    </div>
  );
}