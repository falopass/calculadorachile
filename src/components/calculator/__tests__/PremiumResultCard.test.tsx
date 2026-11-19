import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { formatDays } from '@/lib/formatters';
import PremiumResultCard from '../PremiumResultCard';

Object.assign(globalThis, { React });

vi.mock('../ExportMenu', () => ({ default: () => null }));
vi.mock('../PremiumResultChart', () => ({ default: () => null }));

describe('formato chileno de días', () => {
  it.each([0, 1, 6, 30, 365, 1000])('conserva la salida entera para %s días', (days) => {
    expect(formatDays(days)).toBe(`${days} días`);
  });

  it('usa coma decimal para fracciones sin redondearlas', () => {
    expect(formatDays(0.5)).toBe('0,5 días');
    expect(formatDays(2.75)).toBe('2,75 días');
  });

  it('muestra medios días con coma en la tarjeta de resultados', () => {
    const html = renderToStaticMarkup(
      <PremiumResultCard animate={false} showChart={false} results={[
        { label: 'Días disponibles', value: 0.5, format: 'days', highlight: true },
        { label: 'Días usados', value: 6, format: 'days' },
      ]} />,
    );
    expect(html).toContain('0,5 días');
    expect(html).toContain('6 días');
    expect(html).not.toContain('0.5 días');
  });
});
