'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type {
  Calculator,
  CalculatorInput as CalculatorInputType,
  CalculatorResult,
} from '@/types/calculator';
import PremiumInputField from './PremiumInputField';
import SelectField from './SelectField';
import PremiumResultCard from './PremiumResultCard';
import PremiumLoadingIndicator from './PremiumLoadingIndicator';
import EmptyState from './EmptyState';
import HistoryPanel from './HistoryPanel';
import { useCalculationHistory } from '@/hooks/useCalculationHistory';
import {
  Calculator as CalculatorIcon,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  History,
} from 'lucide-react';
import LegalNote from './LegalNote';

export interface PremiumCalculatorShellProps {
  calculator: Calculator;
  calculateFn: (inputs: Record<string, unknown>) => CalculatorResult[];
}

/* ============================================
   Helpers (puros)
   ============================================ */

function getInputPrefix(input: CalculatorInputType): string | undefined {
  const text = `${input.label} ${input.id}`.toLowerCase();
  const moneyKeywords = [
    'sueldo',
    'bruto',
    'monto',
    'valor',
    'último',
    'ingreso',
    'precio',
    'avalúo',
    'capital',
    'deuda',
    'arriendo',
    'gasto',
    'ahorro',
    'pie',
    'mejoras',
    'cotización',
    'gratificación',
    'vacaciones',
    'indemnización',
    'finiquito',
    'pensión',
    'patente',
    'permiso',
    'multa',
    'tag',
    'luz',
    'contribución',
    'notaría',
    'plusvalía',
    'subsidio',
    'cae',
    'crédito',
    'dividendo',
    'cuota',
    'total',
    'neto',
    'líquido',
    'base',
    'ppm',
    'operación',
    'renta',
    'asignación',
    'bono',
    'propina',
    'cuenta',
    'costo',
    'cargo',
    'pago',
    'retención',
    'descuento',
    'salario',
    'remuneración',
    'jornal',
    'hora extra',
    'consumo',
    'energía',
  ];
  if (moneyKeywords.some((k) => text.includes(k))) return '$';
  return undefined;
}

function getInputSuffix(input: CalculatorInputType): string | undefined {
  const text = `${input.label} ${input.id}`.toLowerCase();
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

const formatNumber = (value: number) =>
  value === 0 ? '' : value.toLocaleString('es-CL');

const parseNumber = (value: string) => {
  const cleaned = value.replace(/\./g, '').replace(/,/g, '.');
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
};

/* ============================================
   Toggle booleano
   ============================================ */

interface BooleanToggleProps {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
  error?: string;
}

function BooleanToggle({ label, value, onChange, error }: BooleanToggleProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[var(--foreground)]">
        {label}
      </label>
      <div className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1">
        <button
          type="button"
          onClick={() => onChange(true)}
          aria-pressed={value === true}
          className={`inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            value
              ? 'bg-[var(--color-primary-600)] text-white shadow-sm'
              : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)]'
          }`}
        >
          <CheckCircle2 className={`h-3.5 w-3.5 ${value ? 'opacity-100' : 'opacity-0'}`} />
          Sí
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          aria-pressed={value === false}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            !value
              ? 'bg-[var(--background-secondary)] text-[var(--foreground)]'
              : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)]'
          }`}
        >
          No
        </button>
      </div>
      {error && (
        <p className="text-sm text-[var(--color-error-600)] flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ============================================
   Render input por tipo
   ============================================ */

function renderInput(
  input: CalculatorInputType,
  value: string | number | boolean,
  onChange: (id: string, value: string | number | boolean) => void,
  error?: string,
) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const newValue =
      input.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(input.id, newValue);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(input.id, parseNumber(e.target.value));
  };

  const handleNumberBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const v = value as number;
    if (v > 0) e.target.value = formatNumber(v);
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
        <PremiumInputField
          key={input.id}
          label={input.label}
          type="text"
          inputMode="numeric"
          value={(value as number) > 0 ? formatNumber(value as number) : ''}
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

/* ============================================
   Shell principal
   ============================================ */

const RISKY_CALCULATOR_IDS = new Set([
  'pension-alimenticia',
  'finiquito',
  'indemnizacion-anos-servicio',
  'sueldo-liquido',
]);

/**
 * Shell del formulario de calculadora.
 *
 * Diseñado sobre los design tokens. Sin fondos forzados, sin
 * gradientes pesados detrás del texto. Cualquier color decorativo
 * está sólo en el ícono del header o en estados (focus, error).
 */
export default function PremiumCalculatorShell({
  calculator,
  calculateFn,
}: PremiumCalculatorShellProps) {
  const resultsRef = useRef<HTMLDivElement>(null);

  const [inputValues, setInputValues] = useState<
    Record<string, string | number | boolean>
  >(() => {
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
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [results, setResults] = useState<CalculatorResult[] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const {
    entries: historyEntries,
    addEntry,
    removeEntry,
    clearHistory,
  } = useCalculationHistory(calculator.id);

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [results]);

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

  const handleInputChange = useCallback(
    (id: string, value: string | number | boolean) => {
      setInputValues((prev) => ({ ...prev, [id]: value }));
      if (errors[id]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[id];
          return newErrors;
        });
      }
    },
    [errors],
  );

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

  const computedResults = useMemo(() => {
    if (!hasSignificantValues) return null;
    if (!validateForm()) return null;
    try {
      setIsCalculating(true);
      const calculated = calculateFn(inputValues);
      setIsCalculating(false);
      return calculated;
    } catch (error) {
      console.error('[Calculator] error:', error);
      setIsCalculating(false);
      return null;
    }
  }, [inputValues, calculateFn, hasSignificantValues, validateForm]);

  useEffect(() => {
    if (computedResults) {
      setResults(computedResults);
      setHasCalculated(true);
      const mainResult = computedResults.find((r) => r.highlight);
      addEntry({
        calculatorId: calculator.id,
        calculatorName: calculator.name,
        inputs: inputValues as Record<string, unknown>,
        results: computedResults.map((r) => ({
          label: r.label,
          value: String(r.value),
        })),
        mainResult: mainResult
          ? { label: mainResult.label, value: String(mainResult.value) }
          : undefined,
      });
    }
  }, [computedResults, calculator.id, calculator.name, inputValues, addEntry]);

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

  const optionalInputs = calculator.inputs.filter(
    (i) => !i.required && i.defaultValue === undefined,
  );
  const essentialInputs = calculator.inputs.filter(
    (i) => i.required || i.defaultValue !== undefined,
  );
  const isRiskyCalc = RISKY_CALCULATOR_IDS.has(calculator.id);

  return (
    <section
      id="calculator-form"
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm overflow-hidden"
      role="form"
      aria-label={`Calculadora de ${calculator.name}`}
    >
      {/* Header sobrio: solo ícono coloreado, fondo neutro */}
      <header className="flex items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--background-secondary)]/40 px-5 py-4 md:px-6 md:py-5">
        <div className="flex items-center gap-3 min-w-0">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-[var(--color-primary-100)] text-[var(--color-primary-600)] dark:bg-[var(--color-primary-500)]/15 dark:text-[var(--color-primary-400)]">
            <CalculatorIcon className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <div className="min-w-0">
            <h2 className="text-base md:text-lg font-semibold text-[var(--foreground)] truncate">
              {calculator.name}
            </h2>
            <p className="text-xs md:text-sm text-[var(--foreground-secondary)] truncate">
              Cálculo instantáneo, valores 2026
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsHistoryOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)] transition-colors"
          title="Ver historial de cálculos"
          aria-label="Ver historial de cálculos anteriores"
        >
          <History className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Historial</span>
        </button>
      </header>

      {/* Body */}
      <div className="p-5 md:p-6">
        {/* Inputs esenciales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {essentialInputs.map((input) => (
            <div key={input.id}>
              {renderInput(
                input,
                inputValues[input.id],
                handleInputChange,
                errors[input.id],
              )}
            </div>
          ))}
        </div>

        {/* Inputs opcionales colapsables */}
        {optionalInputs.length > 0 && (
          <details className="group mt-6 rounded-xl border border-[var(--border)] bg-[var(--background-secondary)]/30 overflow-hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors">
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 transition-transform group-open:rotate-90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.25}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                Opciones avanzadas ({optionalInputs.length})
              </span>
              <span className="text-xs text-[var(--foreground-muted)]">Mostrar/ocultar</span>
            </summary>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-[var(--border)] p-4 md:p-5 bg-[var(--surface)]">
              {optionalInputs.map((input) => (
                <div key={input.id}>
                  {renderInput(
                    input,
                    inputValues[input.id],
                    handleInputChange,
                    errors[input.id],
                  )}
                </div>
              ))}
            </div>
          </details>
        )}

        {/* Error global */}
        {errors._form && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-lg border border-[var(--color-error-200)] bg-[var(--color-error-50)] p-3 text-sm text-[var(--color-error-700)] dark:text-[var(--color-error-500)]"
          >
            <AlertCircle className="h-4 w-4 flex-none mt-0.5" />
            <span>{errors._form}</span>
          </div>
        )}

        {/* Acciones */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
            aria-label="Limpiar todos los campos"
          >
            <RotateCcw className="h-4 w-4" />
            Limpiar todo
          </button>
        </div>
      </div>

      {/* Resultados / Empty / Loading */}
      {!hasCalculated && !hasSignificantValues ? (
        <div className="border-t border-[var(--border)] bg-[var(--background-secondary)]/30 px-5 py-8 md:px-6 md:py-10">
          <EmptyState calculatorId={calculator.id} />
        </div>
      ) : isCalculating && !results ? (
        <div className="border-t border-[var(--border)] bg-[var(--background-secondary)]/30 px-5 py-8 md:px-6 md:py-10">
          <PremiumLoadingIndicator
            isLoading={true}
            message="Calculando resultados..."
            variant="spinner"
          />
        </div>
      ) : results ? (
        <div
          ref={resultsRef}
          className="border-t border-[var(--border)] bg-[var(--background-secondary)]/30 p-5 md:p-6"
        >
          {isRiskyCalc && (
            <div className="mb-5">
              <LegalNote type="legal">
                <strong>Aviso legal:</strong> Esta calculadora entrega una estimación
                referencial. Los valores reales pueden variar según convenios, causales
                de término del contrato o circunstancias particulares. Consulta con un
                profesional para tu caso concreto.
              </LegalNote>
            </div>
          )}
          <PremiumResultCard
            results={results || []}
            title="Resultados"
            calculatorId={calculator.id}
            showChart={true}
          />
        </div>
      ) : null}

      <HistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        entries={historyEntries}
        onSelectEntry={(entry) => {
          setInputValues(entry.inputs as Record<string, string | number | boolean>);
          setIsHistoryOpen(false);
        }}
        onClearHistory={clearHistory}
        onDeleteEntry={removeEntry}
      />
    </section>
  );
}
