// @vitest-environment jsdom

import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Calculator, CalculatorResult } from '@/types/calculator';
import { loadCalculationFn } from '@/lib/calculations/load-calculator';

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
  {
    label: 'Total de prueba',
    value: Number(inputs.precioUSD) + 0.4242,
    format: 'number',
    highlight: true,
  },
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
    localStorage.clear();
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

  it('muestra el calendario durante el ingreso de datos sin guardar borradores', async () => {
    const { default: PremiumCalculatorShell } = await import('../PremiumCalculatorShell');
    const prenatal = getCalculatorBySlug('calculadora-prenatal-postnatal')!;
    const calcularPrenatal = (await loadCalculationFn('prenatal-postnatal'))!;
    await act(async () => {
      root.render(React.createElement(PremiumCalculatorShell, {
        calculator: prenatal,
        calculateFn: calcularPrenatal,
      }));
    });

    async function escribir(placeholder: string, value: string) {
      const input = container.querySelector<HTMLInputElement>(`input[placeholder="${placeholder}"]`)!;
      await act(async () => {
        setInputValue(input, value);
        vi.advanceTimersByTime(500);
      });
    }

    const historial = () => localStorage.getItem('calculachile_history') ?? '[]';
    await escribir('2027-03-15', '2027-03-15');
    const soloFechas = historial();
    expect(JSON.parse(soloFechas)).toHaveLength(1);
    await escribir('Ej.: 900.000', '900000');
    expect(container.textContent).toContain('42 84 84');
    expect(historial()).toBe(soloFechas);
    await escribir('Ej.: 800.000', '600000');
    expect(historial()).toBe(soloFechas);
    await escribir('Ej.: 2,5', '5');
    expect(container.textContent).toContain('4851000');
    expect(JSON.parse(historial())).toHaveLength(2);
  });

  it('calcula días administrativos sin uso y con cero en cualquiera de los campos', async () => {
    const { default: PremiumCalculatorShell } = await import('../PremiumCalculatorShell');
    const administrativos = getCalculatorBySlug('calculadora-dias-administrativos')!;
    const calcular = (await loadCalculationFn('dias-administrativos'))!;
    await act(async () => {
      root.render(React.createElement(PremiumCalculatorShell, {
        calculator: administrativos,
        calculateFn: calcular,
      }));
    });
    expect(container.textContent).toContain('0 6');
    const fields = container.querySelectorAll<HTMLInputElement>('input');
    for (const [completos, medios, resultado] of [['2', '0', '2 4'], ['0', '3', '1.5 4.5']]) {
      await act(async () => {
        setInputValue(fields[0], completos);
        setInputValue(fields[1], medios);
      });
      await act(async () => { vi.advanceTimersByTime(500); });
      expect(container.textContent).toContain(resultado);
      expect(container.textContent).not.toContain('El valor debe ser mayor a 0');
    }
  });

  it('conserva 2.0 como dos días y rechaza fracciones de uso administrativo', async () => {
    const { default: PremiumCalculatorShell } = await import('../PremiumCalculatorShell');
    const administrativos = getCalculatorBySlug('calculadora-dias-administrativos')!;
    const calcular = (await loadCalculationFn('dias-administrativos'))!;
    await act(async () => {
      root.render(React.createElement(PremiumCalculatorShell, {
        calculator: administrativos,
        calculateFn: calcular,
      }));
    });
    const fields = container.querySelectorAll<HTMLInputElement>('input');
    for (const field of fields) {
      await act(async () => { setInputValue(field, '2.0'); });
      await act(async () => { vi.advanceTimersByTime(500); });
    }
    expect(container.textContent).toContain('3 3');
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      await act(async () => { setInputValue(fields[0], '2.5'); });
      await act(async () => { vi.advanceTimersByTime(500); });
      expect(container.textContent).toContain('deben ser enteros no negativos');
      expect(container.textContent).not.toContain('3 3');
    } finally {
      consoleError.mockRestore();
    }
  });
});
