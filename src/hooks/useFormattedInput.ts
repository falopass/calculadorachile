'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

export interface FormattedInputOptions {
  /** Valor inicial */
  initialValue?: number;
  /** Valor mínimo permitido */
  min?: number;
  /** Valor máximo permitido */
  max?: number;
  /** Prefijo (ej: "$") */
  prefix?: string;
  /** Sufijo (ej: "UF") */
  suffix?: string;
  /** ¿Permitir decimales? */
  allowDecimals?: boolean;
  /** Número de decimales */
  decimalPlaces?: number;
  /** Función de validación personalizada */
  validate?: (value: number) => string | null;
}

export interface FormattedInputResult {
  /** Valor formateado para mostrar en el input */
  displayValue: string;
  /** Valor numérico real para cálculos */
  rawValue: number;
  /** Handler onChange para el input */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Función para setear valor directamente */
  setValue: (value: number) => void;
  /** Error de validación actual */
  error: string | null;
  /** ¿Está el input enfocado? */
  isFocused: boolean;
  /** Handler onFocus */
  onFocus: () => void;
  /** Handler onBlur */
  onBlur: () => void;
}

/**
 * useFormattedInput - Hook para formatear inputs numéricos en tiempo real
 *
 * Características:
 * - Formateo automático con separador de miles chileno (.)
 * - Validación en tiempo real con min/max
 * - Soporte para prefijo/sufijo
 * - Manejo de foco (limpia al enfocar, formatea al desenfocar)
 *
 * @example
 * const { displayValue, rawValue, onChange, error } = useFormattedInput({
 *   initialValue: 500000,
 *   min: 0,
 *   max: 10000000,
 *   prefix: '$',
 * });
 */
export function useFormattedInput(options: FormattedInputOptions = {}): FormattedInputResult {
  const {
    initialValue = 0,
    min,
    max,
    allowDecimals = false,
    decimalPlaces = 0,
    validate,
  } = options;

  const [rawValue, setRawValue] = useState<number>(initialValue);
  const [displayValue, setDisplayValue] = useState<string>(
    formatNumber(initialValue, allowDecimals, decimalPlaces)
  );
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Formatear número con separador de miles chileno
  function formatNumber(value: number, decimals: boolean = false, places: number = 0): string {
    if (value === 0) return '';
    if (decimals && places > 0) {
      return value.toLocaleString('es-CL', { minimumFractionDigits: places, maximumFractionDigits: places });
    }
    return value.toLocaleString('es-CL');
  }

  // Parsear string formateado a número
  function parseNumber(value: string): number {
    // Eliminar puntos de miles y convertir coma decimal a punto
    const cleaned = value.replace(/\./g, '').replace(/,/g, '.');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }

  // Validar valor
  const validateValue = useCallback((value: number): string | null => {
    if (min !== undefined && value < min) {
      return `El valor mínimo es ${min.toLocaleString('es-CL')}`;
    }
    if (max !== undefined && value > max) {
      return `El valor máximo es ${max.toLocaleString('es-CL')}`;
    }
    if (validate) {
      return validate(value);
    }
    return null;
  }, [min, max, validate]);

  // Manejar cambio en el input
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Permitir vacío o solo signo negativo
    if (inputValue === '' || inputValue === '-') {
      setDisplayValue(inputValue);
      setRawValue(0);
      setError(null);
      return;
    }
    
    // Patrón: solo permitir números, puntos y coma decimal
    const allowedPattern = allowDecimals ? /[^0-9.,-]/g : /[^0-9.-]/g;
    const cleaned = inputValue.replace(allowedPattern, '');
    
    // Parsear y formatear
    const parsed = parseNumber(cleaned);
    setRawValue(parsed);
    setDisplayValue(cleaned); // Mostrar lo que escribe el usuario sin formatear mientras escribe
    
    // Validar en tiempo real
    const validationError = validateValue(parsed);
    setError(validationError);
  }, [allowDecimals, validateValue]);

  // Formatear al perder foco
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setDisplayValue(formatNumber(rawValue, allowDecimals, decimalPlaces));
  }, [rawValue, allowDecimals, decimalPlaces]);

  // Limpiar al ganar foco
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (rawValue !== 0) {
      // Mostrar el número sin formato para facilitar edición
      setDisplayValue(rawValue.toString().replace(/\./g, ''));
    }
  }, [rawValue]);

  // Actualizar display cuando cambia rawValue externamente
  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatNumber(rawValue, allowDecimals, decimalPlaces));
    }
  }, [rawValue, allowDecimals, decimalPlaces, isFocused]);

  // Setear valor directamente
  const setValue = useCallback((value: number) => {
    setRawValue(value);
    setDisplayValue(formatNumber(value, allowDecimals, decimalPlaces));
    const validationError = validateValue(value);
    setError(validationError);
  }, [allowDecimals, decimalPlaces, validateValue]);

  return {
    displayValue,
    rawValue,
    onChange: handleChange,
    setValue,
    error,
    isFocused,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };
}

/**
 * Hook para formatear un valor específico (no estado interno)
 * Útil para formatear valores existentes sin estado
 */
export function useNumberFormatter(value: number, decimals: boolean = false, places: number = 0): string {
  const [formatted, setFormatted] = useState('');
  
  useEffect(() => {
    if (value === 0) {
      setFormatted('');
    } else if (decimals && places > 0) {
      setFormatted(value.toLocaleString('es-CL', { minimumFractionDigits: places, maximumFractionDigits: places }));
    } else {
      setFormatted(value.toLocaleString('es-CL'));
    }
  }, [value, decimals, places]);
  
  return formatted;
}
