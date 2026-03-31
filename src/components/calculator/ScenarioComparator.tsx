'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft, TrendingDown, TrendingUp, Plus, Trash2, Zap } from 'lucide-react';
import { formatCLP } from '@/lib/formatters';

// ============================================
// Tipos para el comparador de escenarios
// ============================================

export interface ScenarioInput {
  id: string;
  label: string;
  type: 'number' | 'select';
  options?: { value: string; label: string }[];
  defaultValue?: number | string;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
}

export interface ScenarioResult {
  label: string;
  value: number;
  format?: 'CLP' | 'number' | 'percent';
  highlight?: boolean;
}

export interface Scenario {
  id: string;
  name: string;
  color: string;
  inputs: Record<string, number | string>;
  results: ScenarioResult[] | null;
}

export interface ScenarioComparatorProps {
  title: string;
  description: string;
  inputs: ScenarioInput[];
  calculateFn: (inputs: Record<string, number | string>) => ScenarioResult[];
  maxScenarios?: number;
}

// ============================================
// Colores predefinidos para escenarios
// ============================================

const SCENARIO_COLORS = [
  { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-500', light: 'bg-blue-50', ring: 'ring-blue-500' },
  { bg: 'bg-emerald-500', border: 'border-emerald-500', text: 'text-emerald-500', light: 'bg-emerald-50', ring: 'ring-emerald-500' },
  { bg: 'bg-purple-500', border: 'border-purple-500', text: 'text-purple-500', light: 'bg-purple-50', ring: 'ring-purple-500' },
  { bg: 'bg-amber-500', border: 'border-amber-500', text: 'text-amber-500', light: 'bg-amber-50', ring: 'ring-amber-500' },
];

// ============================================
// Componente principal
// ============================================

export default function ScenarioComparator({
  title,
  description,
  inputs,
  calculateFn,
  maxScenarios = 2,
}: ScenarioComparatorProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: 'scenario-1',
      name: 'Escenario 1',
      color: SCENARIO_COLORS[0].bg,
      inputs: inputs.reduce((acc, input) => {
        acc[input.id] = input.defaultValue ?? (input.type === 'number' ? 0 : '');
        return acc;
      }, {} as Record<string, number | string>),
      results: null,
    },
    {
      id: 'scenario-2',
      name: 'Escenario 2',
      color: SCENARIO_COLORS[1].bg,
      inputs: inputs.reduce((acc, input) => {
        acc[input.id] = input.defaultValue ?? (input.type === 'number' ? 0 : '');
        return acc;
      }, {} as Record<string, number | string>),
      results: null,
    },
  ]);

  const [activeTab, setActiveTab] = useState<'inputs' | 'results'>('inputs');

  // Calcular resultados para todos los escenarios
  const handleCalculate = useCallback(() => {
    setScenarios((prev) =>
      prev.map((scenario) => {
        try {
          const results = calculateFn(scenario.inputs);
          return { ...scenario, results };
        } catch (error) {
          console.error(`Error calculando ${scenario.name}:`, error);
          return { ...scenario, results: null };
        }
      })
    );
    setActiveTab('results');
  }, [calculateFn]);

  // Actualizar input de un escenario
  const handleInputChange = useCallback(
    (scenarioId: string, inputId: string, value: number | string) => {
      setScenarios((prev) =>
        prev.map((scenario) =>
          scenario.id === scenarioId
            ? { ...scenario, inputs: { ...scenario.inputs, [inputId]: value } }
            : scenario
        )
      );
    },
    []
  );

  // Agregar nuevo escenario
  const addScenario = useCallback(() => {
    if (scenarios.length >= maxScenarios) return;

    const colorIndex = scenarios.length % SCENARIO_COLORS.length;
    setScenarios((prev) => [
      ...prev,
      {
        id: `scenario-${Date.now()}`,
        name: `Escenario ${prev.length + 1}`,
        color: SCENARIO_COLORS[colorIndex].bg,
        inputs: inputs.reduce((acc, input) => {
          acc[input.id] = input.defaultValue ?? (input.type === 'number' ? 0 : '');
          return acc;
        }, {} as Record<string, number | string>),
        results: null,
      },
    ]);
  }, [scenarios.length, maxScenarios, inputs]);

  // Eliminar escenario
  const removeScenario = useCallback(
    (scenarioId: string) => {
      if (scenarios.length <= 2) return;
      setScenarios((prev) => prev.filter((s) => s.id !== scenarioId));
    },
    [scenarios.length]
  );

  // Formatear número según tipo
  const formatValue = useCallback((value: number, format?: string): string => {
    switch (format) {
      case 'CLP':
        return formatCLP(value);
      case 'percent':
        return `${value.toFixed(2)}%`;
      default:
        return value.toLocaleString('es-CL');
    }
  }, []);

  // Obtener color del escenario por índice
  const getScenarioColor = (index: number) => SCENARIO_COLORS[index % SCENARIO_COLORS.length];

  // Determinar el mejor valor (menor o mayor según contexto)
  const getBestValue = useCallback(
    (resultIndex: number): string | null => {
      const values = scenarios
        .map((s) => s.results?.[resultIndex]?.value ?? 0)
        .filter((v) => v !== 0);

      if (values.length === 0) return null;

      const min = Math.min(...values);
      const max = Math.max(...values);

      // Para resultados con label que contiene "ahorro" o "mejor", el mayor es mejor
      const label = scenarios[0]?.results?.[resultIndex]?.label?.toLowerCase() ?? '';
      const higherIsBetter =
        label.includes('ahorro') ||
        label.includes('mejor') ||
        label.includes('ganancia') ||
        label.includes('beneficio');

      return higherIsBetter ? String(max) : String(min);
    },
    [scenarios]
  );

  return (
    <div className="bg-[var(--surface)] rounded-2xl shadow-xl border border-[var(--border)] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-primary-600)] via-[var(--color-primary-700)] to-[var(--color-primary-800)] px-6 py-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ArrowRightLeft className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <p className="text-[var(--color-primary-100)] text-sm">{description}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('inputs')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'inputs'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/15'
              }`}
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Configurar
              </span>
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'results'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/15'
              }`}
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Comparar
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'inputs' ? (
            <motion.div
              key="inputs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Escenarios */}
              <div className="grid gap-6">
                {scenarios.map((scenario, scenarioIndex) => {
                  const color = getScenarioColor(scenarioIndex);
                  return (
                    <div
                      key={scenario.id}
                      className={`rounded-xl border-2 ${color.border} p-5 relative`}
                    >
                      {/* Header del escenario */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${color.bg}`} />
                          <h3 className="font-semibold text-[var(--foreground)]">
                            {scenario.name}
                          </h3>
                        </div>
                        {scenarios.length > 2 && (
                          <button
                            onClick={() => removeScenario(scenario.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                            title="Eliminar escenario"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Inputs del escenario */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {inputs.map((input) => (
                          <div key={`${scenario.id}-${input.id}`} className="space-y-1.5">
                            <label className="block text-sm font-medium text-[var(--foreground-secondary)]">
                              {input.label}
                            </label>
                            <div className="relative">
                              {input.prefix && (
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)] text-sm">
                                  {input.prefix}
                                </span>
                              )}
                              {input.type === 'select' ? (
                                <select
                                  value={scenario.inputs[input.id] as string}
                                  onChange={(e) =>
                                    handleInputChange(scenario.id, input.id, e.target.value)
                                  }
                                  className={`w-full rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${color.ring} ${
                                    input.prefix ? 'pl-8' : ''
                                  } ${input.suffix ? 'pr-10' : ''}`}
                                >
                                  <option value="">Seleccionar...</option>
                                  {input.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type="number"
                                  value={scenario.inputs[input.id] as number}
                                  onChange={(e) =>
                                    handleInputChange(
                                      scenario.id,
                                      input.id,
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  min={input.min}
                                  max={input.max}
                                  className={`w-full rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${color.ring} ${
                                    input.prefix ? 'pl-8' : ''
                                  } ${input.suffix ? 'pr-10' : ''}`}
                                />
                              )}
                              {input.suffix && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)] text-sm">
                                  {input.suffix}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 mt-6">
                {scenarios.length < maxScenarios && (
                  <button
                    onClick={addScenario}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-[var(--border)] text-[var(--foreground-secondary)] hover:border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar escenario
                  </button>
                )}
                <button
                  onClick={handleCalculate}
                  className="ml-auto px-6 py-2.5 rounded-xl bg-[var(--color-primary-500)] text-white font-semibold hover:bg-[var(--color-primary-600)] transition-colors flex items-center gap-2"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  Comparar escenarios
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Tabla comparativa */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left py-3 px-4 text-sm font-medium text-[var(--foreground-secondary)]">
                        Resultado
                      </th>
                      {scenarios.map((scenario, index) => {
                        const color = getScenarioColor(index);
                        return (
                          <th key={scenario.id} className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${color.bg}`} />
                              <span className="text-sm font-medium text-[var(--foreground)]">
                                {scenario.name}
                              </span>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios[0]?.results?.map((result, resultIndex) => {
                      const bestValue = getBestValue(resultIndex);
                      return (
                        <tr
                          key={resultIndex}
                          className={`border-b border-[var(--border)] ${
                            result.highlight ? 'bg-[var(--color-primary-50)]/50' : ''
                          }`}
                        >
                          <td className="py-3 px-4 text-sm text-[var(--foreground-secondary)]">
                            {result.label}
                          </td>
                          {scenarios.map((scenario, scenarioIndex) => {
                            const color = getScenarioColor(scenarioIndex);
                            const value = scenario.results?.[resultIndex]?.value ?? 0;
                            const isBest = String(value) === bestValue && bestValue !== null;

                            return (
                              <td key={scenario.id} className="py-3 px-4 text-center">
                                <div
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                                    isBest
                                      ? `${color.light} ${color.text}`
                                      : 'text-[var(--foreground)]'
                                  }`}
                                >
                                  {isBest &&
                                    (result.label.toLowerCase().includes('ahorro') ||
                                    result.label.toLowerCase().includes('mejor') ? (
                                      <TrendingUp className="w-3.5 h-3.5" />
                                    ) : (
                                      <TrendingDown className="w-3.5 h-3.5" />
                                    ))}
                                  {formatValue(value, result.format)}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Botón para volver a configurar */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setActiveTab('inputs')}
                  className="px-4 py-2 rounded-lg text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                >
                  ← Volver a configurar escenarios
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
