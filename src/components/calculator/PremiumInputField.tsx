'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import Tooltip from '@/components/ui/Tooltip';

export interface PremiumInputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
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
 * Campo de entrada para formularios de calculadora.
 *
 * Sólido sobre design tokens (sin glassmorphism, sin colores hardcoded).
 * - Texto: var(--foreground)
 * - Borde y fondo: var(--surface) / var(--border)
 * - Error: var(--color-error-*)
 * - Focus ring: var(--color-primary-500)
 *
 * Soporta prefijo (ej. "$") y sufijo (ej. "UF") con espaciado correcto.
 */
const PremiumInputField = forwardRef<HTMLInputElement, PremiumInputFieldProps>(
  function PremiumInputField(
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
    ref,
  ) {
    const inputId =
      id || `input-${label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
    const hasError = Boolean(error);
    const ariaErrorId = hasError ? `${inputId}-error` : undefined;
    const ariaHelperId = !hasError && helperText ? `${inputId}-helper` : undefined;

    return (
      <div className={`space-y-1.5 ${containerClassName}`}>
        <div className="flex items-center gap-1.5">
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-[var(--foreground)]"
          >
            {label}
            {inputProps.required && (
              <span
                className="text-[var(--color-error-500)] ml-0.5"
                aria-hidden="true"
              >
                *
              </span>
            )}
          </label>
          {tooltip && <Tooltip content={tooltip} position="top" iconOnly />}
        </div>

        <div className="relative">
          {prefix && (
            <span
              aria-hidden
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--foreground-muted)] pointer-events-none"
            >
              {prefix}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`block w-full min-h-11 rounded-lg border bg-[var(--surface)] py-2.5 text-base sm:text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed ${
              prefix ? 'pl-7' : 'pl-3'
            } ${suffix ? 'pr-12' : 'pr-3'} ${
              hasError
                ? 'border-[var(--color-error-500)] focus:border-[var(--color-error-500)] focus:ring-[var(--color-error-500)]/20'
                : 'border-[var(--border)] hover:border-[var(--border-hover)] focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)]/20'
            }`}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-errormessage={ariaErrorId}
            aria-describedby={ariaErrorId ?? ariaHelperId}
            {...inputProps}
          />

          {suffix && (
            <span
              aria-hidden
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--foreground-muted)] pointer-events-none"
            >
              {suffix}
            </span>
          )}
        </div>

        {hasError && (
          <p
            id={ariaErrorId}
            role="alert"
            className="flex items-center gap-1 text-xs font-medium text-[var(--color-error-600)]"
          >
            <AlertCircle className="h-3.5 w-3.5" />
            {error}
          </p>
        )}

        {!hasError && helperText && (
          <p id={ariaHelperId} className="text-xs text-[var(--foreground-muted)]">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

export default PremiumInputField;
