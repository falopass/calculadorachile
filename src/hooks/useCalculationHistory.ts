'use client';

import { useState, useEffect, useCallback } from 'react';

export interface HistoryEntry {
  id: string;
  calculatorId: string;
  calculatorName?: string;
  inputs: Record<string, unknown>;
  results: { label: string; value: string }[];
  mainResult?: { label: string; value: string };
  timestamp: number;
}

interface UseCalculationHistoryReturn {
  entries: HistoryEntry[];
  addEntry: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
  removeEntry: (id: string) => void;
  clearHistory: () => void;
  getEntry: (id: string) => HistoryEntry | undefined;
  isLoading: boolean;
}

const MAX_ENTRIES = 50;
const STORAGE_KEY = 'calculachile_history';

/**
 * useCalculationHistory - Hook para gestionar historial de cálculos
 * 
 * Guarda automáticamente cada cálculo en localStorage.
 * Permite recuperar, eliminar y limpiar historial.
 * 
 * @example
 * const { entries, addEntry, clearHistory } = useCalculationHistory('sueldo-liquido');
 * 
 * // Agregar al historial
 * addEntry({ calculatorId: 'sueldo-liquido', inputs: {...}, results: [...] });
 * 
 * // Recuperar un cálculo anterior
 * const entry = getEntry(entryId);
 */
export function useCalculationHistory(calculatorId?: string): UseCalculationHistoryReturn {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar historial desde localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as HistoryEntry[];
        // Filtrar por calculatorId si se proporciona
        const filtered = calculatorId
          ? parsed.filter(e => e.calculatorId === calculatorId)
          : parsed;
        // Deduplicar por id: si el storage tiene entradas con el mismo
        // id (por colisión de Math.random en versiones anteriores o
        // race conditions), nos quedamos con la más reciente.
        const seen = new Set<string>();
        const deduped = filtered
          .sort((a, b) => b.timestamp - a.timestamp)
          .filter(e => {
            if (seen.has(e.id)) return false;
            seen.add(e.id);
            return true;
          })
          .slice(0, MAX_ENTRIES);
        setEntries(deduped);
      }
    } catch (e) {
      console.error('Error loading history:', e);
    } finally {
      setIsLoading(false);
    }
  }, [calculatorId]);

  // Guardar en localStorage
  const saveToStorage = useCallback((allEntries: HistoryEntry[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allEntries));
    } catch (e) {
      console.error('Error saving history:', e);
    }
  }, []);

  // Agregar entrada al historial
  const addEntry = useCallback((entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: generateId(),
      timestamp: Date.now(),
    };

    setEntries(prev => {
      const updated = [newEntry, ...prev].slice(0, MAX_ENTRIES);
      // Guardar todas las entradas (no solo las filtradas)
      const allStored = localStorage.getItem(STORAGE_KEY);
      const allEntries = allStored ? JSON.parse(allStored) as HistoryEntry[] : [];
      const allUpdated = [newEntry, ...allEntries].slice(0, MAX_ENTRIES);
      saveToStorage(allUpdated);
      return updated;
    });
  }, [saveToStorage]);

  // Eliminar entrada
  const removeEntry = useCallback((id: string) => {
    setEntries(prev => {
      const updated = prev.filter(e => e.id !== id);
      // Actualizar storage
      const allStored = localStorage.getItem(STORAGE_KEY);
      const allEntries = allStored ? JSON.parse(allStored) as HistoryEntry[] : [];
      const allUpdated = allEntries.filter(e => e.id !== id);
      saveToStorage(allUpdated);
      return updated;
    });
  }, [saveToStorage]);

  // Limpiar historial
  const clearHistory = useCallback(() => {
    setEntries([]);
    if (calculatorId) {
      // Solo eliminar entradas de esta calculadora
      const allStored = localStorage.getItem(STORAGE_KEY);
      const allEntries = allStored ? JSON.parse(allStored) as HistoryEntry[] : [];
      const remaining = allEntries.filter(e => e.calculatorId !== calculatorId);
      saveToStorage(remaining);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [calculatorId, saveToStorage]);

  // Obtener entrada por ID
  const getEntry = useCallback((id: string) => {
    return entries.find(e => e.id === id);
  }, [entries]);

  return {
    entries,
    addEntry,
    removeEntry,
    clearHistory,
    getEntry,
    isLoading,
  };
}

/**
 * Genera un ID único para cada entrada del historial.
 *
 * Usa `crypto.randomUUID()` cuando está disponible (todos los
 * navegadores modernos). Fallback a timestamp + random para
 * entornos sin crypto.randomUUID (navegadores muy antiguos).
 */
function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
