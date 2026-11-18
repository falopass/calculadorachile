import { describe, expect, it } from 'vitest';
import { buildShareQuery, parseShareQuery } from '../share-state';
import type { CalculatorInput } from '@/types/calculator';
import { getCalculatorBySlug } from '@/data/calculators';

const inputs: CalculatorInput[] = [
  { id: 'sueldo', label: 'Sueldo', type: 'number', min: 0, max: 100_000_000 },
  { id: 'afp', label: 'AFP', type: 'select', options: [{ value: 'modelo', label: 'Modelo' }] },
  { id: 'gratificacion', label: 'Gratificación', type: 'boolean' },
  { id: 'fecha', label: 'Fecha', type: 'text' },
];
const initial = { sueldo: 0, afp: '', gratificacion: false, fecha: '' };

describe('share-state', () => {
  it('ida y vuelta conserva los valores y omite los iniciales', () => {
    const values = { sueldo: 1_200_000, afp: 'modelo', gratificacion: true, fecha: '' };
    const query = buildShareQuery(inputs, values, initial);
    expect(query).toBe('?sueldo=1200000&afp=modelo&gratificacion=1');
    expect(parseShareQuery(query, inputs)).toEqual({
      sueldo: 1_200_000,
      afp: 'modelo',
      gratificacion: true,
    });
  });

  it('sin cambios no agrega query', () => {
    expect(buildShareQuery(inputs, initial, initial)).toBe('');
  });

  it('descarta parámetros ajenos y valores inválidos', () => {
    const search = '?utm_source=x&noads=1&sueldo=abc&afp=inexistente&gratificacion=si';
    expect(parseShareQuery(search, inputs)).toEqual({});
    expect(parseShareQuery('?sueldo=-5', inputs)).toEqual({});
    expect(parseShareQuery('?sueldo=999999999999', inputs)).toEqual({});
  });

  it('comparte fechas sin enviar ni cargar los datos del subsidio maternal por URL', () => {
    const calculator = getCalculatorBySlug('calculadora-prenatal-postnatal')!;
    const dates = { fechaProbableParto: '2027-03-15' };
    const query = buildShareQuery(
      calculator.inputs,
      { ...dates, promedioReciente: '900.000', promedioHistorico: '600.000', ipcAcumulado: '5' },
      {},
    );
    expect(query).toBe('?fechaProbableParto=2027-03-15');
    expect(
      parseShareQuery(`${query}&promedioReciente=900000&promedioHistorico=600000&ipcAcumulado=5`, calculator.inputs),
    ).toEqual(dates);
  });
});
