import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it, vi } from 'vitest';
import { calculatePrenatalPostnatal, prenatalPostnatalToResults } from '@/lib/calculations/prenatal-postnatal';
import type { ExportMenuProps } from '../ExportMenu';

const exportMenu = vi.hoisted(() => vi.fn<(props: ExportMenuProps) => null>(() => null));
vi.mock('../ExportMenu', () => ({ default: exportMenu }));

it('exporta el total estimado sin perder el prenatal destacado ni las otras fechas', async () => {
  Object.assign(globalThis, { React });
  const { default: PremiumResultCard } = await import('../PremiumResultCard');
  const results = prenatalPostnatalToResults(calculatePrenatalPostnatal({
    fechaProbableParto: '2027-03-15',
    subsidio: { promedioReciente: 900_000, promedioHistorico: 600_000, ipcAcumulado: 5 },
  }));
  renderToStaticMarkup(React.createElement(PremiumResultCard, {
    calculatorId: 'prenatal-postnatal',
    results,
    showChart: false,
    title: 'Resultados',
  }));
  expect(exportMenu.mock.lastCall?.[0]).toMatchObject({
    mainResult: { label: 'Subsidio maternal total estimado', value: '$4.851.000' },
    results: results.slice(1).map(({ label }) => ({ label })),
  });
});
