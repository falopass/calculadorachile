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
  default: ({ results, showChart }: { results: CalculatorResult[]; showChart: boolean }) =>
    React.createElement('div', { 'data-show-chart': String(showChart) }, results.map((r) => String(r.value)).join(' ')),
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

  async function renderElectrico(values: string[]) {
    const { default: PremiumCalculatorShell } = await import('../PremiumCalculatorShell');
    const ev = getCalculatorBySlug('auto-electrico-vs-bencina')!;
    const calculate = vi.fn((await loadCalculationFn(ev.id))!);
    await act(async () => {
      root.render(React.createElement(PremiumCalculatorShell, { calculator: ev, calculateFn: calculate }));
    });
    for (const [index, value] of values.entries()) {
      const input = container.querySelector<HTMLInputElement>(`input[placeholder="${ev.inputs[index].placeholder}"]`)!;
      await act(async () => {
        setInputValue(input, value);
        vi.advanceTimersByTime(500);
      });
    }
    return calculate;
  }

  it.each(['.', ','])('acepta decimales con %s en la comparación de autos', async (separator) => {
    const calculate = await renderElectrico(['1000.5', '12.5', '1200.5', '18.5', '200.5'].map(value => value.replace('.', separator)));
    expect(calculate).toHaveBeenLastCalledWith(expect.objectContaining({
      kmMensuales: 1000.5,
      rendimientoKmL: 12.5,
      precioBencina: 1200.5,
      consumoKwh100km: 18.5,
      precioKwh: 200.5,
    }));
  });

  it.each([
    { prices: ['1200', '0'], difference: 120000 },
    { prices: ['0', '200'], difference: -40000 },
  ])('acepta precios cero en la comparación: $prices', async ({ prices, difference }) => {
    const calculate = await renderElectrico(['1000', '10', prices[0], '20', prices[1]]);
    expect(calculate).toHaveBeenCalled();
    expect(container.textContent).toContain(String(difference));
    expect(container.textContent).not.toContain('El valor debe ser mayor a 0');
    expect(container.querySelector('details')).toBeNull();
  });

  it.each([2, 4])('exige el precio %s y retira resultados si se borra un cero explícito', async (index) => {
    const values = ['1000', '10', '1200', '20', '200'];
    values[index] = '';
    const calculate = await renderElectrico(values);
    expect(calculate).not.toHaveBeenCalled();
    expect(container.querySelector('[data-show-chart]')).toBeNull();
    const ev = getCalculatorBySlug('auto-electrico-vs-bencina')!;
    const input = container.querySelector<HTMLInputElement>(`input[placeholder="${ev.inputs[index].placeholder}"]`)!;
    await act(async () => {
      setInputValue(input, '0');
      vi.advanceTimersByTime(500);
    });
    expect(calculate).toHaveBeenCalled();
    expect(container.querySelector('[data-show-chart]')).not.toBeNull();
    await act(async () => {
      input.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    });
    expect(input.value).toBe('0');
    await act(async () => {
      setInputValue(input, '');
      vi.advanceTimersByTime(500);
    });
    expect(container.querySelector('[data-show-chart]')).toBeNull();
    expect(container.textContent).toContain('Este campo es requerido');
  });

  it('no grafica costos unitarios junto con mensuales, anuales y diferencias negativas', async () => {
    await renderElectrico(['1000', '10', '1200', '20', '800']);
    expect(container.querySelector('[data-show-chart="false"]')?.textContent).toContain('-480000');
    expect(container.querySelector('[data-show-chart="true"]')).toBeNull();
  });

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

  it('permite activar líquido a bruto desde el primer control visible', async () => {
    const { default: PremiumCalculatorShell } = await import('../PremiumCalculatorShell');
    const sueldo = getCalculatorBySlug('calculadora-sueldo-liquido')!;
    const calcular = vi.fn((await loadCalculationFn('sueldo-liquido'))!);
    await act(async () => {
      root.render(React.createElement(PremiumCalculatorShell, { calculator: sueldo, calculateFn: calcular }));
    });
    const opcion = Array.from(container.querySelectorAll('label')).find((label) =>
      label.textContent === 'Calcular sueldo bruto desde el líquido',
    )!;
    expect(opcion.closest('details')).toBeNull();
    await act(async () => {
      opcion.parentElement!.querySelector('button')!.click();
      setInputValue(container.querySelector('input')!, '1000000');
      const selects = container.querySelectorAll('select');
      selects[0].value = 'habitat';
      selects[0].dispatchEvent(new Event('change', { bubbles: true }));
      selects[1].value = 'fonasa';
      selects[1].dispatchEvent(new Event('change', { bubbles: true }));
    });
    await act(async () => { vi.advanceTimersByTime(500); });
    const resultados = calcular.mock.results.at(-1)!.value as CalculatorResult[];
    const bruto = resultados.find((r) => r.highlight)!;
    expect(bruto.label).toBe('Sueldo bruto necesario');
    expect(bruto.value).toBeGreaterThan(1_000_000);
    expect(container.textContent).toContain(String(bruto.value));
    await escribirPrecio('0');
    expect(container.textContent).not.toContain(String(bruto.value));
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
});
