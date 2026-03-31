'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  /** Etiqueta del campo */
  label: string;
  /** Opciones del select */
  options: SelectOption[];
  /** Texto de ayuda debajo del campo */
  helperText?: string;
  /** Mensaje de error */
  error?: string;
  /** Placeholder para la opción por defecto */
  placeholder?: string;
  /** Clases adicionales para el contenedor */
  containerClassName?: string;
}

/**
 * SelectField - Componente de select reutilizable
 * 
 * Diseñado para formularios de calculadoras chilenas.
 * Soporta opciones con labels y values.
 * 
 * @example
 * // Select para AFP
 * <SelectField
 *   label="AFP"
 *   options={[
 *     { value: 'capital', label: 'Capital' },
 *     { value: 'cuprum', label: 'Cuprum' },
 *     { value: 'habitat', label: 'Habitat' },
 *   ]}
 *   required
 * />
 * 
 * @example
 * // Select con error
 * <SelectField
 *   label="Sistema de Salud"
 *   options={[
 *     { value: 'fonasa', label: 'FONASA' },
 *     { value: 'isapre', label: 'Isapre' },
 *   ]}
 *   error="Debes seleccionar una opción"
 * />
 */
const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      label,
      options,
      helperText,
      error,
      containerClassName = '',
      id,
      placeholder = 'Selecciona una opción',
      ...selectProps
    },
    ref
  ) => {
    const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
    
    return (
      <div className={`space-y-2 ${containerClassName}`}>
        <label
          htmlFor={selectId}
          className="block text-sm font-semibold text-[var(--foreground)] transition-colors"
        >
          {label}
          {selectProps.required && <span className="text-[var(--color-error-500)] ml-1" aria-hidden="true">*</span>}
        </label>
        
        <div className="relative group">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full px-4 py-3 pr-11 border rounded-xl appearance-none bg-[var(--surface)]
              text-[var(--foreground)]
              transition-all duration-200 ease-in-out
              hover:border-[var(--border-hover)]
              focus:outline-none focus:ring-2 focus:ring-offset-0
              ${error
                ? 'border-[var(--color-error-400)] focus:border-[var(--color-error-500)] focus:ring-[var(--color-error-400)]/30'
                : 'border-[var(--border)] focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)]/30'
              }
              disabled:bg-[var(--background-secondary)] disabled:cursor-not-allowed disabled:opacity-60
              dark:focus:ring-offset-[var(--surface)]
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            {...selectProps}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Arrow icon */}
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--foreground-muted)] transition-colors group-focus-within:text-[var(--color-primary-500)]">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="flex items-center gap-1.5 text-[var(--color-error-500)] text-sm animate-fade-in" role="alert">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span id={`${selectId}-error`}>{error}</span>
          </div>
        )}
        
        {/* Helper text */}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="text-sm text-[var(--foreground-muted)] transition-colors">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';

export default SelectField;
