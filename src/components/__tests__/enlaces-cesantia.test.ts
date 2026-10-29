import * as React from 'react';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeAll, describe, expect, it } from 'vitest';

// Vitest compila JSX en modo clásico (tsconfig "jsx": "preserve"), así que
// los componentes necesitan `React` global. Se importan después de definirlo.
(globalThis as unknown as { React: typeof React }).React = React;

let CalculatorEditorial: typeof import('@/components/calculator/CalculatorEditorial').default;

beforeAll(async () => {
  CalculatorEditorial = (await import('@/components/calculator/CalculatorEditorial')).default;
});

const SIMULADOR = 'href="/calculadoras/calculadora-seguro-cesantia"';
const GUIA = 'href="/blog/como-cobrar-seguro-cesantia-afc-2026"';

function editorial(calculatorId: string) {
  return renderToStaticMarkup(
    createElement(CalculatorEditorial, { calculatorId, position: 'bottom' }),
  );
}

describe('Enlaces internos hacia el clúster cesantía', () => {
  it('finiquito enlaza al simulador y a la guía con anclas descriptivas', () => {
    const html = editorial('finiquito');
    expect(html).toContain('Después del finiquito: cobra el seguro de cesantía');
    expect(html).toContain(`${SIMULADOR}`);
    expect(html).toContain(`${GUIA}`);
    expect(html).toContain('simula cuánto te paga el seguro de cesantía');
    expect(html).toContain('cómo cobrar el seguro de cesantía en la AFC');
  });

  it('indemnización por años de servicio enlaza al simulador, la guía y el finiquito', () => {
    const html = editorial('indemnizacion-anos-servicio');
    expect(html).toContain('Si te despidieron: seguro de cesantía');
    expect(html).toContain(SIMULADOR);
    expect(html).toContain(GUIA);
    expect(html).toContain('href="/calculadoras/calculadora-finiquito"');
  });
});
