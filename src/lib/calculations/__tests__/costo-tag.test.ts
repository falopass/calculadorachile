// ============================================
// Tests de costo TAG (autopistas concesionadas)
// ----------------------------------------------
// Verifica las tarifas por categoría de vehículo, el recargo +50%
// por usuario sin TAG y el costo mensual/anual.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateCostoTag } from '../costo-tag';
import { TAG_RUTAS, TAG_RECARGO_SIN_TAG } from '@/lib/values/constants';

describe('calculateCostoTag', () => {
  it('Santiago–Rancagua categoría 1 usa la tarifa de TAG_RUTAS', () => {
    const r = calculateCostoTag({
      peajes: 'santiago_rancagua',
      viajesMes: 10,
      tieneConvenio: true,
      categoria: 1,
    });
    expect(r.costoPorViaje).toBe(TAG_RUTAS['santiago-rancagua'].categoria1);
  });

  it('categoría 2 (camioneta) cuesta más que categoría 1 (auto)', () => {
    const auto = calculateCostoTag({
      peajes: 'santiago_valparaiso',
      viajesMes: 5,
      categoria: 1,
    });
    const camioneta = calculateCostoTag({
      peajes: 'santiago_valparaiso',
      viajesMes: 5,
      categoria: 2,
    });
    expect(camioneta.costoPorViaje).toBeGreaterThan(auto.costoPorViaje);
  });

  it('sin TAG aplica recargo +50% sobre la tarifa con TAG', () => {
    const r = calculateCostoTag({
      peajes: 'santiago_rancagua',
      viajesMes: 10,
      tieneConvenio: false,
      categoria: 1,
    });
    const conTag = TAG_RUTAS['santiago-rancagua'].categoria1;
    expect(r.costoPorViajeSinTag).toBe(
      Math.round(conTag * (1 + TAG_RECARGO_SIN_TAG / 100)),
    );
    expect(r.costoPorViaje).toBe(r.costoPorViajeSinTag);
  });

  it('costoMensual = costoPorViaje × viajesMes', () => {
    const r = calculateCostoTag({
      peajes: 'santiago_rancagua',
      viajesMes: 8,
      tieneConvenio: true,
      categoria: 1,
    });
    expect(r.costoMensual).toBe(r.costoPorViaje * 8);
  });

  it('costoAnual = costoMensual × 12', () => {
    const r = calculateCostoTag({
      peajes: 'santiago_rancagua',
      viajesMes: 4,
      tieneConvenio: true,
      categoria: 1,
    });
    expect(r.costoAnual).toBe(r.costoMensual * 12);
  });

  it('viajes negativos se acotan a 0', () => {
    const r = calculateCostoTag({
      peajes: 'santiago_rancagua',
      viajesMes: -5,
    });
    expect(r.viajesMes).toBe(0);
    expect(r.costoMensual).toBe(0);
  });

  it('ahorro anual por usar TAG > 0 cuando hay convenio', () => {
    const r = calculateCostoTag({
      peajes: 'santiago_valparaiso',
      viajesMes: 6,
      tieneConvenio: true,
      categoria: 1,
    });
    expect(r.ahorroPorTagAnual).toBeGreaterThan(0);
  });

  it('ahorro anual = 0 cuando NO hay convenio (paga la tarifa más alta)', () => {
    const r = calculateCostoTag({
      peajes: 'santiago_valparaiso',
      viajesMes: 6,
      tieneConvenio: false,
    });
    expect(r.ahorroPorTagAnual).toBe(0);
  });

  it('urbano_santiago usa la tarifa urbana por categoría', () => {
    const auto = calculateCostoTag({
      peajes: 'urbano_santiago',
      viajesMes: 20,
      categoria: 1,
    });
    const camion = calculateCostoTag({
      peajes: 'urbano_santiago',
      viajesMes: 20,
      categoria: 3,
    });
    expect(camion.costoPorViaje).toBeGreaterThan(auto.costoPorViaje);
  });
});
