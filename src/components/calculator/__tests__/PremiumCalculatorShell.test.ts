// @vitest-environment jsdom

import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Calculator, CalculatorResult } from '@/types/calculator';

Object.assign(globalThis, { React, IS_REACT_ACT_ENVIRONMENT: true });

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) =>
    React.createElement('a', { href }, children),
}));

// La tarjeta real depende de ToastProvider; aquí solo importa si el resultado sigue a la vista.
vi.mock('../PremiumResultCard', () => ({
  default: ({ results }: { results: CalculatorResult[] }) =>
    React.createElement('div', null, results.map((r) => String(r.value)).join(' ')),
}));

// El historial conserva cálculos anteriores a propósito; queda fuera de esta prueba.
vi.mock('../HistoryPanel', () => ({ default: () => null }));

import { getCalculatorBySlug } from '@/data/calculators';

const calculator = getCalculatorBySlug('calculadora-compras-internacionales') as Calculator;
const calculateFn = (inputs: Record<string, unknown>): CalculatorResult[] => [
  { label: 'Total de prueba', value: Number(inputs.precioUSD) + 0.4242, highlight: true },
];

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

describe('PremiumCalculatorShell: resultados obsoletos', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.useFakeTimers();
    Element.prototype.scrollIntoView = vi.fn();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.useRealTimers();
  });

  async function escribirPrecio(value: string) {
    // El primer campo del catálogo es el valor de los productos (precioUSD).
    const input = container.querySelector<HTMLInputElement>('input');
    if (!input) throw new Error('No se encontró el campo del precio');
    await act(async () => {
      setInputValue(input, value);
      vi.advanceTimersByTime(500);
    });
  }

  it('retira el resultado anterior cuando el dato pasa a ser inválido', async () => {
    // Import diferido: los componentes usan el runtime JSX clásico y necesitan React global.
    const { default: PremiumCalculatorShell } = await import('../PremiumCalculatorShell');
    await act(async () => {
      root.render(React.createElement(PremiumCalculatorShell, { calculator, calculateFn }));
    });

    await escribirPrecio('1000');
    expect(container.textContent).toContain('1000.4242');

    await escribirPrecio('0');
    expect(container.textContent).not.toContain('1000.4242');
    expect(container.textContent).toContain('El valor debe ser mayor a 0');
  });
});
