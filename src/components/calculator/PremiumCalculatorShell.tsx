'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Calculator, CalculatorInput as CalculatorInputType, CalculatorResult } from '@/types/calculator';
import PremiumInputField from './PremiumInputField';
import SelectField from './SelectField';
import PremiumResultCard from './PremiumResultCard';
import PremiumLoadingIndicator from './PremiumLoadingIndicator';
import EmptyState from './EmptyState';
import HistoryPanel from './HistoryPanel';
import { useCalculationHistory } from '@/hooks/useCalculationHistory';
import { Calculator as CalculatorIcon, RotateCcw, CheckCircle2, AlertCircle, Zap, History, Sparkles } from 'lucide-react';
import LegalNote from './LegalNote';

export interface PremiumCalculatorShellProps {
  /** Datos de la calculadora */
  calculator: Calculator;
  /** Función de cálculo */
  calculateFn: (inputs: Record<string, unknown>) => CalculatorResult[];
}

/**
 * Toggle switch premium para inputs booleanos
 */
function PremiumBooleanToggle({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[var(--foreground-secondary)]">
        {label}
      </label>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`
          relative inline-flex items-center h-8 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
          ${value
            ? 'bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] text-white shadow-lg shadow-[var(--color-primary-500)]/30'
            : 'bg-gradient-to-r from-[var(--background-secondary)] to-[var(--border)] text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[var(--border-hover)]'
          }
          ${error ? 'ring-2 ring-[var(--color-error-500)]' : ''}
        `}
      >
        <span className="flex items-center gap-2">
          <CheckCircle2 className={`w-4 h-4 ${value ? 'opacity-100' : 'opacity-0'}`} />
          {value ? 'Sí' : 'No'}
        </span>
      </button>
      {error && (
        <p className="text-sm text-[var(--color-error-600)] flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Determina el prefijo según el label/id del input
 */
function getInputPrefix(input: CalculatorInputType): string | undefined {
  const label = input.label.toLowerCase();
  const id = input.id.toLowerCase();
  const text = `${label} ${id}`;
  
  // Prefijo $ para montos en CLP
  if (text.includes('sueldo') || text.includes('bruto') || text.includes('monto') ||
      text.includes('valor') || text.includes('último') || text.includes('ingreso') ||
      text.includes('precio') || text.includes('avalúo') || text.includes('capital') ||
      text.includes('deuda') || text.includes('arriendo') || text.includes('gasto') ||
      text.includes('ahorro') || text.includes('pie') || text.includes('mejoras') ||
      text.includes('cotización') || text.includes('gratificación') || text.includes('vacaciones') ||
      text.includes('indemnización') || text.includes('finiquito') || text.includes('pensión') ||
      text.includes('patente') || text.includes('permiso') || text.includes('multa') ||
      text.includes('tag') || text.includes('luz') || text.includes('contribución') ||
      text.includes('notaría') || text.includes('plusvalía') || text.includes('subsidio') ||
      text.includes('cae') || text.includes('crédito') || text.includes('dividendo') ||
      text.includes('cuota') || text.includes('total') || text.includes('neto') ||
      text.includes('líquido') || text.includes('base') || text.includes('ppm') ||
      text.includes('operación') || text.includes('renta') || text.includes('asignación') ||
      text.includes('bono') || text.includes('propina') || text.includes('cuenta') ||
      text.includes('costo') || text.includes('cargo') || text.includes('pago') ||
      text.includes('retención') || text.includes('descuento') || text.includes('salario') ||
      text.includes('remuneración') || text.includes('jornal') || text.includes('hora extra') ||
      text.includes('consumo') || text.includes('cargo fijo') || text.includes('energía')) {
    return '$';
  }
  
  return undefined;
}

/**
 * Determina el sufijo según el label/id del input
 */
function getInputSuffix(input: CalculatorInputType): string | undefined {
  const label = input.label.toLowerCase();
  const id = input.id.toLowerCase();
  const text = `${label} ${id}`;
  
  if (text.includes('uf')) return 'UF';
  if (text.includes('utm')) return 'UTM';
  if (text.includes('tasa') || text.includes('porcentaje') || text.includes('%')) return '%';
  if (text.includes('año') || text.includes('plazo')) return 'años';
  if (text.includes('mes')) return 'meses';
  if (text.includes('día') || text.includes('dia')) return 'días';
  if (text.includes('kwh')) return 'kWh';
  if (text.includes('hijo')) return 'hijos';
  
  return undefined;
}

/**
 * Formatea número con separador de miles chileno
 */
function formatNumber(value: number): string {
  if (value === 0) return '';
  return value.toLocaleString('es-CL');
}

/**
 * Parsea string formateado a número
 */
function parseNumber(value: string): number {
  const cleaned = value.replace(/\./g, '').replace(/,/g, '.');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Renderiza el input apropiado según el tipo
 */
function renderInput(
  input: CalculatorInputType,
  value: string | number | boolean,
  onChange: (id: string, value: string | number | boolean) => void,
  error?: string
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = input.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(input.id, newValue);
  };

  // Handler para input numérico con formato de miles
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Permitir que el usuario escriba libremente, el formato se aplica al perder foco
    const parsed = parseNumber(rawValue);
    onChange(input.id, parsed);
  };

  // Formatear al perder foco
  const handleNumberBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentValue = value as number;
    if (currentValue > 0) {
      e.target.value = formatNumber(currentValue);
    }
  };

  switch (input.type) {
    case 'boolean':
      return (
        <PremiumBooleanToggle
          key={input.id}
          label={input.label}
          value={value as boolean}
          onChange={(val) => onChange(input.id, val)}
          error={error}
        />
      );
    
    case 'select':
      return (
        <SelectField
          key={input.id}
          label={input.label}
          options={input.options || []}
          value={value as string}
          onChange={handleChange}
          required={input.required}
          error={error}
          placeholder={`Selecciona ${input.label.toLowerCase()}`}
        />
      );
    
    case 'number':
      return (
        <PremiumInputField
          key={input.id}
          label={input.label}
          type="text"
          value={value as number > 0 ? formatNumber(value as number) : ''}
          onChange={handleNumberChange}
          onBlur={handleNumberBlur}
          placeholder={input.placeholder}
          required={input.required}
          min={input.min}
          max={input.max}
          prefix={getInputPrefix(input)}
          suffix={getInputSuffix(input)}
          error={error}
        />
      );
    
    case 'text':
    default:
      return (
        <PremiumInputField
          key={input.id}
          label={input.label}
          type="text"
          value={value as string}
          onChange={handleChange}
          placeholder={input.placeholder}
          required={input.required}
          error={error}
        />
      );
  }
}

/**
 * PremiumCalculatorShell - Contenedor premium de calculadora
 *
 * Maneja el estado del formulario, validación y muestra resultados.
 * Incluye animaciones, soporte para inputs booleanos y mejor UX premium.
 */
export default function PremiumCalculatorShell({ calculator, calculateFn }: PremiumCalculatorShellProps) {
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Estado de los inputs
  const [inputValues, setInputValues] = useState<Record<string, string | number | boolean>>(() => {
    const initial: Record<string, string | number | boolean> = {};
    calculator.inputs.forEach((input) => {
      if (input.defaultValue !== undefined) {
        initial[input.id] = input.defaultValue as string | number | boolean;
      } else if (input.type === 'number') {
        initial[input.id] = 0;
      } else if (input.type === 'boolean') {
        initial[input.id] = false;
      } else if (input.type === 'select' && input.options?.length) {
        initial[input.id] = '';
      } else {
        initial[input.id] = '';
      }
    });
    return initial;
  });

  // Estado de errores
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Estado de resultados
  const [results, setResults] = useState<CalculatorResult[] | null>(null);
  
  // Estado de carga (para skeleton)
  const [isCalculating, setIsCalculating] = useState(false);

  // Track if form has been submitted at least once
  const [hasCalculated, setHasCalculated] = useState(false);

  // Estado del panel de historial
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  // Hook de historial de cálculos
  const { entries: historyEntries, addEntry, removeEntry, clearHistory } = useCalculationHistory(calculator.id);

  // Scroll a resultados cuando cambian
  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [results]);

  // Verificar si hay valores significativos en los inputs
  const hasSignificantValues = useMemo(() => {
    return calculator.inputs.some((input) => {
      const value = inputValues[input.id];
      if (input.type === 'number') return (value as number) > 0;
      if (input.type === 'select') return value !== '' && value !== undefined;
      if (input.type === 'boolean') return value === true;
      if (input.type === 'text') return (value as string).trim().length > 0;
      return false;
    });
  }, [inputValues, calculator.inputs]);

  // Manejar cambio de input
  const handleInputChange = useCallback((id: string, value: string | number | boolean) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
    // Limpiar error del campo modificado
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  }, [errors]);

  // Validar formulario
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    
    calculator.inputs.forEach((input) => {
      const value = inputValues[input.id];
      
      if (input.required && input.type !== 'boolean') {
        if (value === '' || value === undefined || value === null) {
          newErrors[input.id] = 'Este campo es requerido';
        } else if (input.type === 'number' && (value as number) <= 0) {
          newErrors[input.id] = 'El valor debe ser mayor a 0';
        } else if (input.type === 'select' && value === '') {
          newErrors[input.id] = 'Debes seleccionar una opción';
        }
      }
      
      if (input.min !== undefined && typeof value === 'number' && value < input.min) {
        newErrors[input.id] = `El valor mínimo es ${formatNumber(input.min)}`;
      }
      
      if (input.max !== undefined && typeof value === 'number' && value > input.max) {
        newErrors[input.id] = `El valor máximo es ${formatNumber(input.max)}`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [calculator.inputs, inputValues]);

  // Calcular resultados en tiempo real con useMemo
  const computedResults = useMemo(() => {
    if (!hasSignificantValues) return null;
    
    const isValid = validateForm();
    if (!isValid) return null;
    
    try {
      setIsCalculating(true);
      const calculatedResults = calculateFn(inputValues);
      setIsCalculating(false);
      return calculatedResults;
    } catch (error) {
      console.error('Error en cálculo:', error);
      setIsCalculating(false);
      return null;
    }
  }, [inputValues, calculateFn, hasSignificantValues, validateForm]);

  // Sincronizar resultados computados con estado y guardar en historial
  useEffect(() => {
    if (computedResults) {
      setResults(computedResults);
      setHasCalculated(true);
      
      // Guardar en historial
      const mainResult = computedResults.find(r => r.highlight);
      addEntry({
        calculatorId: calculator.id,
        calculatorName: calculator.name,
        inputs: inputValues as Record<string, unknown>,
        results: computedResults.map(r => ({ label: r.label, value: String(r.value) })),
        mainResult: mainResult ? { label: mainResult.label, value: String(mainResult.value) } : undefined,
      });
    }
  }, [computedResults, calculator.id, calculator.name, inputValues, addEntry]);

  // Limpiar formulario
  const handleReset = useCallback(() => {
    const initial: Record<string, string | number | boolean> = {};
    calculator.inputs.forEach((input) => {
      if (input.defaultValue !== undefined) {
        initial[input.id] = input.defaultValue as string | number | boolean;
      } else if (input.type === 'number') {
        initial[input.id] = 0;
      } else if (input.type === 'boolean') {
        initial[input.id] = false;
      } else {
        initial[input.id] = '';
      }
    });
    setInputValues(initial);
    setErrors({});
    setResults(null);
    setHasCalculated(false);
  }, [calculator.inputs]);

  return (
    <motion.div
      id="calculator-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[var(--surface)]/90 via-[var(--background)]/70 to-[var(--background-secondary)]/90 rounded-2xl shadow-2xl border border-[var(--border)]/50 overflow-hidden backdrop-blur-sm relative"
      role="form"
      aria-label={`Calculadora de ${calculator.name}`}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-16 w-24 h-24 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-28 h-28 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary-500)_0%,_transparent_70%)] opacity-5" />
      </div>
      {/* Header premium con mejor diseño visual */}
      <div className="bg-gradient-to-r from-[var(--color-primary-600)]/90 via-[var(--color-primary-700)]/90 to-[var(--color-primary-800)]/90 px-6 py-5 relative overflow-hidden">
        {/* Elementos decorativos más visibles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary-400)_0%,_transparent_70%)] opacity-20" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
        
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg shadow-[var(--color-primary-500)]/30">
            <CalculatorIcon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{calculator.name}</h1>
            <p className="text-[var(--color-primary-100)] text-sm mt-0.5">{calculator.description}</p>
          </div>
          {/* Badge de cálculo instantáneo */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-medium text-white">Premium</span>
          </div>
          {/* Botón de historial */}
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm shadow-sm"
            title="Ver historial de cálculos"
            aria-label="Ver historial de cálculos anteriores"
          >
            <History className="w-5 h-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
      
      {/* Contenido con mejor separación y diseño de grid */}
      <div className="p-6 relative">
        {/* Elementos decorativos internos más sutiles */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-indigo-400/5 to-cyan-400/5 rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-2xl -z-10" />
        
        {/* Grid para inputs principales (requeridos y con valor por defecto) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <AnimatePresence>
            {calculator.inputs.map((input, index) => {
              // Separar inputs requeridos y con valor por defecto de los opcionales
              const isEssential = input.required || input.defaultValue !== undefined;
              
              if (isEssential) {
                return (
                  <motion.div
                    key={input.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 dark:border-slate-600/50 shadow-sm shadow-black/5"
                  >
                    {renderInput(
                      input,
                      inputValues[input.id],
                      handleInputChange,
                      errors[input.id]
                    )}
                  </motion.div>
                );
              }
              return null;
            })}
          </AnimatePresence>
        </div>
        
        {/* Sección colapsable para inputs opcionales */}
        {calculator.inputs.filter(i => !i.required && i.defaultValue === undefined).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4"
          >
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/20 hover:bg-indigo-100/50 dark:hover:bg-indigo-800/30 transition-colors list-none border border-indigo-200/50 dark:border-indigo-700/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-open:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    Opciones avanzadas ({calculator.inputs.filter(i => !i.required && i.defaultValue === undefined).length} campos)
                  </span>
                </div>
                <span className="text-xs text-indigo-500 dark:text-indigo-400">Click para expandir</span>
              </summary>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-indigo-50/30 dark:bg-indigo-900/20 border border-indigo-200/30 dark:border-indigo-700/30 backdrop-blur-sm">
                {calculator.inputs
                  .filter(i => !i.required && i.defaultValue === undefined)
                  .map((input, index) => (
                    <motion.div
                      key={input.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-3 border border-white/50 dark:border-slate-600/50"
                    >
                      {renderInput(
                        input,
                        inputValues[input.id],
                        handleInputChange,
                        errors[input.id]
                      )}
                    </motion.div>
                  ))}
              </div>
            </details>
          </motion.div>
        )}
        
        {/* Error general */}
        <AnimatePresence>
          {errors._form && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl text-red-700 dark:text-red-300 text-sm flex items-center gap-2.5 backdrop-blur-sm"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {errors._form}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botones */}
        <div className="flex gap-3 mt-7">
          <motion.button
            type="button"
            onClick={handleReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-slate-700 dark:text-slate-300 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 border border-slate-300 dark:border-slate-500 transition-all duration-300 flex items-center justify-center gap-2.5 backdrop-blur-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Limpiar todo
          </motion.button>
        </div>
      </div>

      {/* Resultados o Empty State */}
      <AnimatePresence mode="wait">
        {!hasCalculated && !hasSignificantValues ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 pb-6"
          >
            <EmptyState calculatorId={calculator.id} />
          </motion.div>
        ) : isCalculating && !results ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 pb-6"
          >
            <PremiumLoadingIndicator isLoading={true} message="Calculando resultados..." variant="spinner" />
          </motion.div>
        ) : results ? (
          <motion.div
            key="results"
            ref={resultsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6 mt-6 bg-gradient-to-br from-[var(--color-primary-50)]/30 to-[var(--color-accent-50)]/30 rounded-2xl border border-[var(--color-primary-200)]/50 dark:border-[var(--color-primary-700)]/50 backdrop-blur-sm"
          >
            {/* Disclaimer legal para calculadoras de alto riesgo */}
            {(calculator.id === 'pension-alimenticia' || calculator.id === 'finiquito' ||
              calculator.id === 'indemnizacion-anos-servicio' || calculator.id === 'sueldo-liquido') && (
              <LegalNote type="legal">
                {calculator.id === 'pension-alimenticia' && (
                  <>
                    ⚠️ <strong>Aviso Legal:</strong> Esta calculadora proporciona una estimación basada en porcentajes generales.
                    El monto real de la pensión alimenticia lo determina un juez de familia considerando múltiples
                    factores: necesidades del menor, capacidad económica del obligado, nivel de vida anterior,
                    y circunstancias específicas de cada caso. Consulte con un abogado de familia para su situación particular.
                    <br /><br />
                    <strong>Base legal:</strong> Ley 14.908, Ley 19.968.
                  </>
                )}
                {calculator.id === 'finiquito' && (
                  <>
                    ⚠️ <strong>Aviso Legal:</strong> Esta calculadora proporciona una estimación general. El finiquito real depende
                    de la causal de término del contrato (art. 159-161 del Código del Trabajo), antigüedad,
                    remuneraciones, vacaciones pendientes, y otros factores específicos. Este cálculo no reemplaza
                    el asesoramiento de un abogado laboral. Consulte con la Dirección del Trabajo o un profesional
                    para su caso particular.
                    <br /><br />
                    <strong>Base legal:</strong> Código del Trabajo, Arts. 159-178.
                  </>
                )}
                {calculator.id === 'indemnizacion-anos-servicio' && (
                  <>
                    ⚠️ <strong>Aviso Legal:</strong> Esta calculadora proporciona una estimación basada en el Art. 163 del Código
                    del Trabajo. La indemnización real puede variar según la causal de despido, topes legales
                    (11 años, 30 días por año), remuneraciones variables, y circunstancias específicas.
                    Este cálculo no constituye asesoría legal. Consulte con un abogado laboral para su caso.
                    <br /><br />
                    <strong>Base legal:</strong> Código del Trabajo, Arts. 163, 168.
                  </>
                )}
                {calculator.id === 'sueldo-liquido' && (
                  <>
                    ⚠️ <strong>Aviso Legal:</strong> Esta calculadora proporciona una estimación del sueldo líquido basada en
                    descuentos legales estándar (AFP, salud, seguro de cesantía). El sueldo real puede variar
                    según convenios colectivos, descuentos adicionales, asignaciones familiares, bonos,
                    y otros factores específicos de su empleador. Consulte con su departamento de RRHH
                    o un contador para verificaciones exactas.
                    <br /><br />
                    <strong>Base legal:</strong> Código del Trabajo, DFL 150, Ley 21.630.
                  </>
                )}
              </LegalNote>
            )}
            <PremiumResultCard
              results={results || []}
              title="Resultados"
              calculatorId={calculator.id}
              showChart={true}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Panel de historial */}
      <HistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        entries={historyEntries}
        onSelectEntry={(entry) => {
          // Restaurar inputs del cálculo seleccionado
          setInputValues(entry.inputs as Record<string, string | number | boolean>);
          setIsHistoryOpen(false);
        }}
        onClearHistory={clearHistory}
        onDeleteEntry={removeEntry}
      />
    </motion.div>
  );
}