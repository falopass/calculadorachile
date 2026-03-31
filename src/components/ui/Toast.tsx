'use client';

import { useState, useCallback, createContext, useContext, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Hook para usar el sistema de toasts
 * 
 * @example
 * const toast = useToast();
 * toast.success('Guardado', 'El cálculo se guardó correctamente');
 * toast.error('Error', 'No se pudo calcular');
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe usarse dentro de ToastProvider');
  }
  return context;
}

/**
 * Provider del sistema de toasts
 * Debe envolver la aplicación o el layout principal
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss
    const duration = toast.duration ?? 3000;
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const success = useCallback((title: string, message?: string) => {
    addToast({ type: 'success', title, message });
  }, [addToast]);

  const error = useCallback((title: string, message?: string) => {
    addToast({ type: 'error', title, message, duration: 5000 });
  }, [addToast]);

  const warning = useCallback((title: string, message?: string) => {
    addToast({ type: 'warning', title, message });
  }, [addToast]);

  const info = useCallback((title: string, message?: string) => {
    addToast({ type: 'info', title, message });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, warning, info }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

/**
 * Container que renderiza todos los toasts activos
 */
function ToastContainer() {
  const context = useContext(ToastContext);
  if (!context) return null;

  const { toasts, removeToast } = context;

  return (
    <div
      className="fixed bottom-4 right-4 z-[400] flex flex-col gap-2 max-w-[400px] w-full pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Item individual de toast
 */
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle2 className="w-5 h-5 text-[var(--color-success-500)]" />,
    error: <XCircle className="w-5 h-5 text-[var(--color-error-500)]" />,
    warning: <AlertCircle className="w-5 h-5 text-[var(--color-warning-500)]" />,
    info: <Info className="w-5 h-5 text-[var(--color-primary-500)]" />,
  };

  const borderColors: Record<ToastType, string> = {
    success: 'border-l-[var(--color-success-500)]',
    error: 'border-l-[var(--color-error-500)]',
    warning: 'border-l-[var(--color-warning-500)]',
    info: 'border-l-[var(--color-primary-500)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`pointer-events-auto bg-[var(--surface-elevated)] border border-[var(--border)] border-l-4 ${borderColors[toast.type]} rounded-xl shadow-lg overflow-hidden`}
      role="alert"
    >
      <div className="flex items-start gap-3 p-4">
        {icons[toast.type]}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-[var(--foreground)]">{toast.title}</p>
          {toast.message && (
            <p className="text-xs text-[var(--foreground-secondary)] mt-0.5">{toast.message}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded hover:bg-[var(--background-secondary)] transition-colors"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4 text-[var(--foreground-muted)]" />
        </button>
      </div>
      {/* Progress bar para auto-dismiss */}
      {toast.duration && toast.duration > 0 && (
        <motion.div
          className={`h-0.5 ${
            toast.type === 'success'
              ? 'bg-[var(--color-success-500)]'
              : toast.type === 'error'
              ? 'bg-[var(--color-error-500)]'
              : toast.type === 'warning'
              ? 'bg-[var(--color-warning-500)]'
              : 'bg-[var(--color-primary-500)]'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: toast.duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  );
}
