import { describe, it, expect } from 'vitest';
import { loadCalculationFn } from '../load-calculator';
import { NOTA_FERIADO_DIAS_HABILES } from '../finiquito';

const base = {
  ultimoSueldo: 800000,
  añosTrabajados: 3,
  mesesTrabajados: 4,
  causaTermino: 'necesidades_empresa',
  incluyeAvisoPrevio: true,
  tieneGratificacion: false,
};

describe('finiquito: feriado proporcional según fecha de término', () => {
  it('con fecha (20-10-2026) proyecta a 7 días corridos = $186.667 y no muestra la nota', async () => {
    const fn = await loadCalculationFn('finiquito');
    const results = fn!({ ...base, fechaTermino: '2026-10-20' });
    const feriado = results.find((r) => r.label.startsWith('Vacaciones proporcionales'));
    expect(feriado?.label).toBe('Vacaciones proporcionales (7 días corridos)');
    expect(feriado?.value).toBe(186667);
    expect(feriado?.note).toBeUndefined();
    expect(results.some((r) => r.note)).toBe(false);
  });

  it('sin fecha mantiene el cálculo en días hábiles ($133.333) y muestra la nota de la DT', async () => {
    const fn = await loadCalculationFn('finiquito');
    for (const fechaTermino of [undefined, '', '   ']) {
      const results = fn!({ ...base, fechaTermino });
      const feriado = results.find((r) => r.label.startsWith('Vacaciones proporcionales'));
      expect(feriado?.label).toBe('Vacaciones proporcionales (5 días)');
      expect(feriado?.value).toBe(133333);
      expect(feriado?.note).toEqual(NOTA_FERIADO_DIAS_HABILES);
    }
  });

  it('la nota tiene el texto aprobado, el enlace interno y la fuente DT', () => {
    const n = NOTA_FERIADO_DIAS_HABILES;
    expect(`${n.text}${n.linkText}${n.textAfter}`).toBe(
      'Este monto está en días hábiles. La Dirección del Trabajo ordena contarlos desde el día siguiente al término y sumar sábados, domingos y festivos, así que el monto real es mayor. Calcula el exacto en la calculadora de vacaciones proporcionales.',
    );
    expect(n.href).toBe('/calculadoras/calculadora-vacaciones-proporcionales');
    expect(n.source?.url).toBe('https://www.dt.gob.cl/portal/1628/w3-article-60200.html');
  });
});
