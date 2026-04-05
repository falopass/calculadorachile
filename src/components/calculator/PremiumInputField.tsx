'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { AlertCircle, Info } from 'lucide-react';
import Tooltip from '@/components/ui/Tooltip';

export interface PremiumInputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
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
  /** Indica si el campo está enfocado */
  focused?: boolean;
}

/**
 * PremiumInputField - Componente de campo de entrada premium
 * 
 * Diseñado para formularios de calculadoras chilenas con un estilo más premium.
 * Soporta prefijos/sufijos para CLP, UF, UTM, etc.
 * 
 * @example
 * // Input para sueldo en CLP
 * <PremiumInputField
 *   label="Sueldo Bruto"
 *   type="number"
 *   prefix="$"
 *   placeholder="500.000"
 *   helperText="Ingresa tu sueldo bruto mensual"
 * />
 */
const PremiumInputField = forwardRef<HTMLInputElement, PremiumInputFieldProps>(
  (
    {
      label,
      helperText,
      error,
      prefix,
      suffix,
      containerClassName = '',
      tooltip,
      focused = false,
      id,
      ...inputProps
    },
    ref
  ) => {
    const inputId = id || `premium-input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    
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
        
        <div className={`
          relative group rounded-xl p-0.5
          ${focused 
            ? 'bg-gradient-to-r from-[var(--color-primary-500)]/30 via-[var(--color-primary-400)]/30 to-[var(--color-primary-300)]/30'
            : 'bg-gradient-to-r from-[var(--border)]/50 via-[var(--border)]/30 to-[var(--border)]/50'
          }
          transition-all duration-300
        `}>
          <div className={`
            bg-[var(--surface)] rounded-xl
            transition-all duration-300
            group-hover:bg-[var(--background-secondary)]
            ${error 
              ? 'ring-2 ring-[var(--color-error-400)]/50' 
              : 'group-focus-within:ring-2 group-focus-within:ring-[var(--color-primary-400)]/50'
            }
          `}>
            {prefix && (
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)] text-sm font-medium pointer-events-none transition-all duration-300 group-focus-within:text-[var(--color-primary-500)]">
                {prefix}
              </span>
            )}
            
            <input
              ref={ref}
              id={inputId}
              className={`
                w-full px-4 py-3 rounded-xl
                bg-transparent
                text-[#0f172a] dark:text-[#f8fafc] placeholder:text-[#94a3b8] dark:placeholder:text-[#64748b]
                font-medium
                transition-all duration-300 ease-in-out
                focus:outline-none
                ${prefix ? 'pl-10' : ''}
                ${suffix ? 'pr-14' : ''}
                disabled:cursor-not-allowed disabled:opacity-60
                premium-input
              `}
              aria-invalid={error ? 'true' : 'false'}
              aria-errormessage={error ? `${inputId}-error` : undefined}
              aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
              {...inputProps}
            />
            
            {suffix && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)] text-sm font-medium pointer-events-none transition-all duration-300 group-focus-within:text-[var(--color-primary-500)]">
                {suffix}
              </span>
            )}
          </div>
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

PremiumInputField.displayName = 'PremiumInputField';

export default PremiumInputField;