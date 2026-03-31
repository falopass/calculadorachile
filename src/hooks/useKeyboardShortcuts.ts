'use client';

import { useEffect, useCallback } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
  preventDefault?: boolean;
}

interface UseKeyboardShortcutsOptions {
  /** Habilitar/deshabilitar shortcuts */
  enabled?: boolean;
  /** Lista de shortcuts */
  shortcuts: KeyboardShortcut[];
}

/**
 * useKeyboardShortcuts - Hook para gestionar atajos de teclado
 * 
 * Soporta combinaciones con Ctrl, Shift, Alt.
 * Se desactiva automáticamente cuando el foco está en inputs.
 * 
 * @example
 * useKeyboardShortcuts({
 *   shortcuts: [
 *     { key: 'Enter', callback: handleCalculate },
 *     { key: 'Escape', callback: handleReset },
 *     { key: 's', ctrlKey: true, callback: handleSave },
 *   ],
 * });
 */
export function useKeyboardShortcuts({
  enabled = true,
  shortcuts,
}: UseKeyboardShortcutsOptions) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return;

    // No activar en inputs, textareas o contentEditable
    const target = e.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' || 
                    target.tagName === 'TEXTAREA' || 
                    target.tagName === 'SELECT' ||
                    target.isContentEditable;

    // Permitir Escape siempre
    if (e.key === 'Escape') {
      const escapeShortcut = shortcuts.find(s => s.key === 'Escape');
      if (escapeShortcut) {
        if (escapeShortcut.preventDefault) e.preventDefault();
        escapeShortcut.callback();
        return;
      }
    }

    // Para otros shortcuts, ignorar si está en input
    if (isInput) return;

    for (const shortcut of shortcuts) {
      if (shortcut.key === 'Escape') continue; // Ya manejado arriba

      const matchesKey = e.key.toLowerCase() === shortcut.key.toLowerCase();
      const matchesCtrl = !!shortcut.ctrlKey === e.ctrlKey || !!shortcut.ctrlKey === e.metaKey;
      const matchesShift = !!shortcut.shiftKey === e.shiftKey;
      const matchesAlt = !!shortcut.altKey === e.altKey;

      if (matchesKey && matchesCtrl && matchesShift && matchesAlt) {
        if (shortcut.preventDefault) e.preventDefault();
        shortcut.callback();
        break;
      }
    }
  }, [enabled, shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

/**
 * Hook para keyboard shortcuts específicos de calculadoras
 */
export function useCalculatorShortcuts({
  onCalculate,
  onReset,
  onSave,
  onCopy,
}: {
  onCalculate?: () => void;
  onReset?: () => void;
  onSave?: () => void;
  onCopy?: () => void;
}) {
  useKeyboardShortcuts({
    shortcuts: [
      ...(onCalculate ? [{ key: 'Enter', callback: onCalculate, preventDefault: true }] : []),
      ...(onReset ? [{ key: 'Escape', callback: onReset }] : []),
      ...(onSave ? [{ key: 's', ctrlKey: true, callback: onSave, preventDefault: true }] : []),
      ...(onCopy ? [{ key: 'c', ctrlKey: true, shiftKey: true, callback: onCopy, preventDefault: true }] : []),
    ],
  });
}
