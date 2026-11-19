import type { CalculatorResult } from '@/types/calculator';

export interface AutoElectricoVsBencinaInput {
  kmMensuales: number;
  rendimientoKmL: number;
  precioBencina: number;
  consumoKwh100km: number;
  precioKwh: number;
}

export interface AutoElectricoVsBencinaResult {
  costoKmBencina: number;
  costoKmElectrico: number;
  costoMensualBencina: number;
  costoMensualElectrico: number;
  ahorroMensual: number;
  ahorroAnual: number;
  porcentajeAhorro: number;
}

/** Precios y consumos declarados por el usuario; CLP al entero solo al final. */
export function calculateAutoElectricoVsBencina(
  input: AutoElectricoVsBencinaInput,
): AutoElectricoVsBencinaResult {
  const km = Math.max(0, input.kmMensuales);
  const rendimiento = Math.max(0, input.rendimientoKmL);
  const bencinaKm = rendimiento > 0 ? Math.max(0, input.precioBencina) / rendimiento : 0;
  const electricoKm = (Math.max(0, input.consumoKwh100km) / 100) * Math.max(0, input.precioKwh);
  const bencinaMes = bencinaKm * km;
  const electricoMes = electricoKm * km;
  const diferencia = bencinaMes - electricoMes;

  return {
    costoKmBencina: Math.round(bencinaKm),
    costoKmElectrico: Math.round(electricoKm),
    costoMensualBencina: Math.round(bencinaMes),
    costoMensualElectrico: Math.round(electricoMes),
    ahorroMensual: Math.round(diferencia),
    ahorroAnual: Math.round(diferencia * 12),
    porcentajeAhorro: bencinaMes > 0 ? Math.round((diferencia / bencinaMes) * 1000) / 10 : 0,
  };
}

export function autoElectricoVsBencinaToResults(
  result: AutoElectricoVsBencinaResult,
): CalculatorResult[] {
  return [
    {
      label: 'Diferencia mensual (bencina − eléctrico)',
      value: result.ahorroMensual,
      format: 'CLP',
      highlight: true,
      note: {
        text: 'Positiva: ahorro con eléctrico. Negativa: el eléctrico cuesta más. Solo energía, no costo total de propiedad.',
      },
    },
    { label: 'Costo por km bencina', value: result.costoKmBencina, format: 'CLP' },
    { label: 'Costo por km eléctrico', value: result.costoKmElectrico, format: 'CLP' },
    { label: 'Costo mensual bencina', value: result.costoMensualBencina, format: 'CLP' },
    { label: 'Costo mensual eléctrico', value: result.costoMensualElectrico, format: 'CLP' },
    { label: 'Diferencia anual (bencina − eléctrico)', value: result.ahorroAnual, format: 'CLP' },
    {
      label: 'Ahorro respecto de bencina (%)',
      value: result.porcentajeAhorro,
      format: 'percentage',
      note: {
        text: 'Un porcentaje negativo indica mayor costo eléctrico. Si el costo mensual de bencina es cero, se muestra 0% por convención; no es un ahorro calculable.',
      },
    },
  ];
}
