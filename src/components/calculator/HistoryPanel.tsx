'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { History, Clock, Trash2, X, ChevronRight, RotateCcw } from 'lucide-react';
import type { HistoryEntry } from '@/hooks/useCalculationHistory';

export interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  entries: HistoryEntry[];
  onSelectEntry: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
  onDeleteEntry: (id: string) => void;
}

/**
 * HistoryPanel - Panel lateral deslizable con historial de cálculos
 * 
 * Muestra los cálculos anteriores con fecha, inputs principales y resultados.
 * Permite recuperar cualquier cálculo anterior.
 */
export default function HistoryPanel({
  isOpen,
  onClose,
  entries,
  onSelectEntry,
  onClearHistory,
  onDeleteEntry,
}: HistoryPanelProps) {
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return date.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' });
  };

  const getMainInput = (inputs: Record<string, unknown>): string => {
    // Intentar obtener el input principal (sueldo, monto, etc.)
    const priorityKeys = ['sueldoBruto', 'monto', 'ultimoSueldo', 'arriendoActual', 'valorVehiculo'];
    for (const key of priorityKeys) {
      if (inputs[key]) {
        const val = inputs[key] as number;
        if (typeof val === 'number' && val > 0) {
          return `$${val.toLocaleString('es-CL')}`;
        }
      }
    }
    return Object.values(inputs).slice(0, 2).join(', ');
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[var(--surface)] border-l border-[var(--border)] z-[201] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-500)]/10 flex items-center justify-center">
              <History className="w-4 h-4 text-[var(--color-primary-500)]" />
            </div>
            <h3 className="font-semibold text-[var(--foreground)]">Historial</h3>
            <span className="text-xs text-[var(--foreground-muted)] bg-[var(--background-secondary)] px-2 py-0.5 rounded-full">
              {entries.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--background-secondary)] transition-colors"
            aria-label="Cerrar historial"
          >
            <X className="w-4 h-4 text-[var(--foreground-muted)]" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-64px)]">
          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <Clock className="w-12 h-12 text-[var(--foreground-muted)] mb-4" />
              <p className="text-sm font-medium text-[var(--foreground)] mb-1">Sin historial</p>
              <p className="text-xs text-[var(--foreground-muted)]">
                Tus cálculos aparecerán aquí automáticamente
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]/50">
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group p-4 hover:bg-[var(--background-secondary)] transition-colors cursor-pointer"
                  onClick={() => onSelectEntry(entry)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-3.5 h-3.5 text-[var(--foreground-muted)] flex-shrink-0" />
                        <span className="text-xs text-[var(--foreground-muted)]">
                          {formatDate(entry.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[var(--foreground)] truncate">
                        {getMainInput(entry.inputs as Record<string, unknown>)}
                      </p>
                      {entry.mainResult && (
                        <p className="text-xs text-[var(--color-primary-500)] font-semibold mt-0.5">
                          {entry.mainResult.label}: {entry.mainResult.value}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteEntry(entry.id);
                        }}
                        className="p-1.5 rounded hover:bg-[var(--color-error-50)] text-[var(--foreground-muted)] hover:text-[var(--color-error-500)] transition-colors"
                        aria-label="Eliminar entrada"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-[var(--foreground-muted)]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {entries.length > 0 && (
          <div className="p-4 border-t border-[var(--border)]">
            <button
              onClick={onClearHistory}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium text-[var(--color-error-500)] hover:bg-[var(--color-error-50)] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Limpiar todo el historial
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
