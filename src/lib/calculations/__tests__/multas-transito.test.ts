import { describe, expect, it } from 'vitest';
import { UTM } from '@/lib/values/constants';
import { calculateMultasTransito } from '../multas-transito';

describe('calculateMultasTransito', () => {
  it('devuelve rangos legales y no puntos medios inventados', () => {
    expect(calculateMultasTransito({ tipoMulta: 'leve' }).minimoUTM).toBe(0.2);
    expect(calculateMultasTransito({ tipoMulta: 'leve' }).maximoUTM).toBe(0.5);
    expect(calculateMultasTransito({ tipoMulta: 'grave' }).minimoUTM).toBe(1);
    expect(calculateMultasTransito({ tipoMulta: 'grave' }).maximoUTM).toBe(1.5);
    expect(calculateMultasTransito({ tipoMulta: 'gravisima' }).minimoUTM).toBe(1.5);
    expect(calculateMultasTransito({ tipoMulta: 'gravisima' }).maximoUTM).toBe(3);
  });

  it('celular, luz roja y conducir sin haber obtenido licencia son gravísimas', () => {
    expect(calculateMultasTransito({ tipoMulta: 'celular' }).categoriaLegal).toBe('gravisima');
    expect(calculateMultasTransito({ tipoMulta: 'luz_roja' }).categoriaLegal).toBe('gravisima');
    expect(calculateMultasTransito({ tipoMulta: 'sin_licencia' }).categoriaLegal).toBe('gravisima');
  });

  it('clasifica el exceso según kilómetros sobre el límite', () => {
    expect(calculateMultasTransito({ tipoMulta: 'exceso_hasta_10' }).categoriaLegal).toBe('menos_grave');
    expect(calculateMultasTransito({ tipoMulta: 'exceso_11_a_20' }).categoriaLegal).toBe('grave');
    expect(calculateMultasTransito({ tipoMulta: 'exceso_mas_20' }).categoriaLegal).toBe('gravisima');
  });

  it('primera reincidencia grave duplica y la siguiente triplica', () => {
    const doble = calculateMultasTransito({ tipoMulta: 'grave', reincidenciasPrevias: 1 });
    const triple = calculateMultasTransito({ tipoMulta: 'grave', reincidenciasPrevias: 2 });
    expect(doble.multiplicadorReincidencia).toBe(2);
    expect(doble.minimoUTM).toBe(2);
    expect(triple.multiplicadorReincidencia).toBe(3);
    expect(triple.maximoUTM).toBe(4.5);
  });

  it('no aplica multiplicador automático a infracciones leves o menos graves', () => {
    const result = calculateMultasTransito({
      tipoMulta: 'menos_grave',
      reincidenciasPrevias: 2,
    });
    expect(result.multiplicadorReincidencia).toBe(1);
  });

  it('convierte los extremos del rango a CLP con la UTM del sitio', () => {
    const result = calculateMultasTransito({ tipoMulta: 'grave' });
    expect(result.minimoCLP).toBe(Math.round(UTM.valor));
    expect(result.maximoCLP).toBe(Math.round(UTM.valor * 1.5));
  });

  it('cantidad de infracciones multiplica ambos extremos', () => {
    const result = calculateMultasTransito({ tipoMulta: 'leve', cantidadMultas: 3 });
    expect(result.totalMinimoCLP).toBe(result.minimoCLP * 3);
    expect(result.totalMaximoCLP).toBe(result.maximoCLP * 3);
  });
});
