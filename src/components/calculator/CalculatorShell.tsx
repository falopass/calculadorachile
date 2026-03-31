'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Calculator, CalculatorInput as CalculatorInputType, CalculatorResult } from '@/types/calculator';
import InputField from './InputField';
import SelectField from './SelectField';
import ResultCard from './ResultCard';
import ResultSkeleton from './ResultSkeleton';
import EmptyState from './EmptyState';
import HistoryPanel from './HistoryPanel';
import { useCalculationHistory } from '@/hooks/useCalculationHistory';
import { Calculator as CalculatorIcon, RotateCcw, CheckCircle2, AlertCircle, Zap, History } from 'lucide-react';

export interface CalculatorShellProps {
  /** Datos de la calculadora */
  calculator: Calculator;
  /** Función de cálculo */
  calculateFn: (inputs: Record<string, unknown>) => CalculatorResult[];
}

/**
 * Toggle switch para inputs booleanos
 */
function BooleanToggle({
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
            ? 'bg-[var(--color-primary-500)] text-white shadow-md shadow-[var(--color-primary-500)]/20'
            : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[var(--border-hover)]'
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
        <BooleanToggle
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
        <InputField
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
        <InputField
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
 * CalculatorShell - Contenedor principal de calculadora
 *
 * Maneja el estado del formulario, validación y muestra resultados.
 * Incluye animaciones, soporte para inputs booleanos y mejor UX.
 */
export default function CalculatorShell({ calculator, calculateFn }: CalculatorShellProps) {
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
      className="bg-[var(--surface)] rounded-2xl shadow-xl border border-[var(--border)] overflow-hidden"
      role="form"
      aria-label={`Calculadora de ${calculator.name}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-primary-600)] via-[var(--color-primary-700)] to-[var(--color-primary-800)] px-6 py-5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <CalculatorIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{calculator.name}</h1>
            <p className="text-[var(--color-primary-100)] text-sm mt-0.5">{calculator.description}</p>
          </div>
          {/* Badge de cálculo instantáneo */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-medium text-white">Instantáneo</span>
          </div>
          {/* Botón de historial */}
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="Ver historial de cálculos"
            aria-label="Ver historial de cálculos anteriores"
          >
            <History className="w-5 h-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Formulario */}
      <div className="p-6">
        <div className="grid gap-5">
          <AnimatePresence>
            {calculator.inputs.map((input, index) => (
              <motion.div
                key={input.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {renderInput(
                  input,
                  inputValues[input.id],
                  handleInputChange,
                  errors[input.id]
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Error general */}
        <AnimatePresence>
          {errors._form && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-3 bg-[var(--color-error-50)] border border-[var(--color-error-200)] rounded-lg text-[var(--color-error-600)] text-sm flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errors._form}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botones */}
        <div className="flex gap-3 mt-6">
          <motion.button
            type="button"
            onClick={handleReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-6 rounded-xl font-semibold text-[var(--foreground-secondary)] bg-[var(--background-secondary)] hover:bg-[var(--border)] border border-[var(--border)] transition-all duration-200 flex items-center justify-center gap-2"
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
            <ResultSkeleton />
          </motion.div>
        ) : results ? (
          <motion.div
            key="results"
            ref={resultsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            <ResultCard
              results={results}
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
