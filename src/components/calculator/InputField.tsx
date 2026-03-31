'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import Tooltip from '@/components/ui/Tooltip';

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  /** Etiqueta del campo */
  label: string;
  /** Texto de ayuda debajo del campo */
  helperText?: string;
  /** Mensaje de error */
  error?: string;
  /** Prefijo (ej: "$") */
  prefix?: string;
  /** Sufijo (ej: "UF") */
  suffix?: string;
  /** Clases adicionales para el contenedor */
  containerClassName?: string;
  /** Tooltip de ayuda contextual */
  tooltip?: string;
}

/**
 * InputField - Componente de campo de entrada moderno
 * 
 * Diseñado para formularios de calculadoras chilenas.
 * Soporta prefijos/sufijos para CLP, UF, UTM, etc.
 * 
 * @example
 * // Input para sueldo en CLP
 * <InputField
 *   label="Sueldo Bruto"
 *   type="number"
 *   prefix="$"
 *   placeholder="500.000"
 *   helperText="Ingresa tu sueldo bruto mensual"
 * />
 */
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      helperText,
      error,
      prefix,
      suffix,
      containerClassName = '',
      tooltip,
      id,
      ...inputProps
    },
    ref
  ) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    
    return (
      <div className={`space-y-2 ${containerClassName}`}>
        <div className="flex items-center gap-2">
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-[var(--foreground)] transition-colors"
          >
            {label}
            {inputProps.required && (
              <span className="text-[var(--color-error-500)] ml-1" aria-hidden="true">*</span>
            )}
          </label>
          {tooltip && (
            <Tooltip content={tooltip} position="top" iconOnly />
          )}
        </div>
        
        <div className="relative group">
          {prefix && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)] text-sm font-medium pointer-events-none transition-colors group-focus-within:text-[var(--color-primary-500)]">
              {prefix}
            </span>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-3 rounded-xl
              bg-[var(--surface)] border
              text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]
              transition-all duration-200 ease-in-out
              hover:border-[var(--border-hover)]
              focus:outline-none focus:ring-2 focus:ring-offset-0
              ${prefix ? 'pl-10' : ''}
              ${suffix ? 'pr-14' : ''}
              ${error
                ? 'border-[var(--color-error-400)] focus:border-[var(--color-error-500)] focus:ring-[var(--color-error-400)]/30'
                : 'border-[var(--border)] focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)]/30'
              }
              disabled:bg-[var(--background-secondary)] disabled:cursor-not-allowed disabled:opacity-60
              dark:focus:ring-offset-[var(--surface)]
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-errormessage={error ? `${inputId}-error` : undefined}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...inputProps}
          />
          
          {suffix && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)] text-sm font-medium pointer-events-none transition-colors group-focus-within:text-[var(--color-primary-500)]">
              {suffix}
            </span>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <div className="flex items-center gap-1.5 text-[var(--color-error-500)] text-sm animate-fade-in" role="alert">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span id={`${inputId}-error`}>{error}</span>
          </div>
        )}
        
        {/* Helper text */}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-[var(--foreground-muted)] transition-colors">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
