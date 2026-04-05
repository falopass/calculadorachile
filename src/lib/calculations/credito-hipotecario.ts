// ============================================
// Simulador de Crédito Hipotecario Chile 2026
// ============================================

import { UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface CreditoHipotecarioInput {
  /** Monto del crédito en UF */
  montoUF: number;
  /** Plazo del crédito en años (típicamente 20-30) */
  plazoAnos: number;
  /** Tasa de interés anual en porcentaje (ej: 4.5 para 4.5%) */
  tasaAnual: number;
  /** Pie en UF (opcional) */
  pieUF?: number;
  /** Ingreso mensual para capacidad de endeudamiento */
  ingresoMensual?: number;
  /** Tipo de tasa: fija, variable o mixta */
  tipoTasa?: 'fija' | 'variable' | 'mixta';
  /** Incluir seguro de desgravamen */
  incluyeSeguroDesgravamen?: boolean;
  /** Incluir seguro de incendio */
  incluyeSeguroIncendio?: boolean;
  /** Incluir comisión de administración */
  incluyeComisionAdministracion?: boolean;
  /** Período de gracia en meses */
  periodoGraciaMeses?: number;
  /** Calcular tabla de amortización */
  calcularTablaAmortizacion?: boolean;
  /** Calcular CAE (Carga Anual Equivalente) */
  calcularCAE?: boolean;
  /** Calcular gastos notariales */
  calcularGastosNotariales?: boolean;
  /** Simular prepago */
  simularPrepago?: boolean;
  /** Monto de prepago */
  montoPrepago?: number;
}

export interface CreditoHipotecarioResult {
  /** Monto del crédito solicitado en UF */
  montoUF: number;
  /** Pie pagado en UF */
  pieUF: number;
  /** Monto a financiar en UF (monto - pie) */
  montoFinanciarUF: number;
  /** Tasa de interés anual */
  tasaAnual: number;
  /** Plazo en años */
  plazoAnos: number;
  /** Plazo total en meses */
  plazoMeses: number;
  /** Dividendo mensual en UF */
  dividendoMensualUF: number;
  /** Dividendo mensual en CLP */
  dividendoMensualCLP: number;
  /** Monto financiado en CLP */
  montoFinanciarCLP: number;
  /** Total pagado durante el crédito en UF */
  totalPagoUF: number;
  /** Total pagado durante el crédito en CLP */
  totalPagoCLP: number;
  /** Total de intereses pagados en UF */
  totalInteresesUF: number;
  /** Multiplicador: cuántas veces se paga sobre el monto financiado */
  costoTotal: number;
  /** Valor UF usado para la conversión */
  valorUF: number;
  /** Capacidad de endeudamiento */
  capacidadEndeudamiento?: number;
  /** Seguros mensuales */
  segurosMensuales?: {
    desgravamen: number;
    incendio: number;
    total: number;
  };
  /** Comisión de administración mensual */
  comisionAdministracion?: number;
  /** CAE (Carga Anual Equivalente) */
  cae?: number;
  /** Gastos notariales y de inscripción */
  gastosNotariales?: number;
  /** Tabla de amortización */
  tablaAmortizacion?: Array<{
    mes: number;
    saldoInicial: number;
    dividendo: number;
    interes: number;
    capital: number;
    seguro: number;
    saldoFinal: number;
  }>;
  /** Ahorro por prepago */
  ahorroPrepago?: number;
}

/**
 * Calcula el dividendo mensual y costo total de un crédito hipotecario
 * usando el sistema de amortización francés (cuota fija).
 *
 * Fórmula del dividendo (PMT):
 *   PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
 *   donde:
 *     P = monto a financiar
 *     r = tasa mensual (tasa anual / 12 / 100)
 *     n = plazo total en meses
 *
 * En Chile los créditos hipotecarios se expresan en UF y el dividendo
 * se ajusta mensualmente según el valor de la UF.
 *
 * Base legal: Ley General de Bancos, Título VIII (Créditos Hipotecarios);
 *             Norma de la Comisión para el Mercado Financiero (CMF).
 *
 * @param input - Datos del crédito hipotecario
 * @returns Desglose completo del crédito hipotecario
 */
export function calculateCreditoHipotecario(input: CreditoHipotecarioInput): CreditoHipotecarioResult {
  const {
    montoUF,
    plazoAnos,
    tasaAnual,
    pieUF = 0,
    ingresoMensual = 0,
    tipoTasa = 'fija',
    incluyeSeguroDesgravamen = false,
    incluyeSeguroIncendio = false,
    incluyeComisionAdministracion = false,
    periodoGraciaMeses = 0,
    calcularTablaAmortizacion = false,
    calcularCAE = false,
    calcularGastosNotariales = false,
    simularPrepago = false,
    montoPrepago = 0
  } = input;

  const valorUF = UF.valor;

  // Validaciones de rango
  if (montoUF < 0) {
    throw new Error('El monto en UF no puede ser negativo');
  }
  if (plazoAnos < 1 || plazoAnos > 50) {
    throw new Error('El plazo debe estar entre 1 y 50 años');
  }
  if (tasaAnual < 0 || tasaAnual > 100) {
    throw new Error('La tasa anual debe estar entre 0% y 100%');
  }
  if (pieUF < 0) {
    throw new Error('El pie no puede ser negativo');
  }
  if (pieUF >= montoUF) {
    throw new Error('El pie no puede ser igual o mayor al monto del crédito');
  }

  // Monto a financiar (crédito - pie)
  const montoFinanciarUF = montoUF - pieUF;

  // Plazo total en meses
  const plazoMeses = plazoAnos * 12;

  // Tasa mensual expresada como decimal
  const tasaMensual = tasaAnual / 100 / 12;

  // Cálculo del dividendo usando amortización francesa
  let dividendoMensualUF: number;

  if (tasaMensual === 0) {
    // Sin interés: dividendo es simplemente la división del capital
    dividendoMensualUF = montoFinanciarUF / plazoMeses;
  } else {
    // PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
    const factor = Math.pow(1 + tasaMensual, plazoMeses);
    dividendoMensualUF = montoFinanciarUF * (tasaMensual * factor) / (factor - 1);
  }

  // Calcular capacidad de endeudamiento (máximo 25% del ingreso)
  let capacidadEndeudamiento: number | undefined;
  if (ingresoMensual > 0) {
    capacidadEndeudamiento = ingresoMensual * 0.25; // 25% del ingreso
  }

  // Calcular seguros mensuales
  let segurosMensuales = undefined;
  if (incluyeSeguroDesgravamen || incluyeSeguroIncendio) {
    segurosMensuales = {
      desgravamen: incluyeSeguroDesgravamen ? dividendoMensualUF * 0.001 : 0, // 0.1% típico
      incendio: incluyeSeguroIncendio ? dividendoMensualUF * 0.0005 : 0, // 0.05% típico
      total: 0
    };
    segurosMensuales.total = segurosMensuales.desgravamen + segurosMensuales.incendio;
  }

  // Calcular comisión de administración
  let comisionAdministracion: number | undefined;
  if (incluyeComisionAdministracion) {
    comisionAdministracion = dividendoMensualUF * 0.001; // 0.1% típico
  }

  // Calcular CAE (Carga Anual Equivalente)
  let cae: number | undefined;
  if (calcularCAE) {
    // Fórmula simplificada de CAE: (Total pagado / Monto financiado)^(1/n) - 1
    const totalPagadoConSeguros = (dividendoMensualUF + (segurosMensuales?.total || 0)) * plazoMeses;
    cae = Math.pow(totalPagadoConSeguros / montoFinanciarUF, 1/plazoAnos) - 1;
    cae = cae * 100; // Convertir a porcentaje
  }

  // Calcular gastos notariales
  let gastosNotariales: number | undefined;
  if (calcularGastosNotariales) {
    // Aproximadamente 1-2% del monto del crédito
    gastosNotariales = montoUF * 0.015 * valorUF; // 1.5% promedio en UF convertido a CLP
  }

  // Calcular tabla de amortización si se solicita
  let tablaAmortizacion: CreditoHipotecarioResult['tablaAmortizacion'] | undefined;
  if (calcularTablaAmortizacion) {
    tablaAmortizacion = [];
    let saldo = montoFinanciarUF;
    
    for (let mes = 1; mes <= plazoMeses; mes++) {
      // Interés del mes
      const interes = saldo * tasaMensual;
      
      // Capital pagado (dividendo - interés)
      const capital = dividendoMensualUF - interes;
      
      // Nuevo saldo
      const nuevoSaldo = saldo - capital;
      
      // Seguro del mes
      const seguro = segurosMensuales ? segurosMensuales.total : 0;
      
      tablaAmortizacion.push({
        mes,
        saldoInicial: Math.round(saldo * 100) / 100,
        dividendo: Math.round(dividendoMensualUF * 100) / 100,
        interes: Math.round(interes * 100) / 100,
        capital: Math.round(capital * 100) / 100,
        seguro: Math.round(seguro * 100) / 100,
        saldoFinal: Math.round(nuevoSaldo * 100) / 100
      });
      
      saldo = nuevoSaldo;
    }
  }

  // Simular prepago si se solicita
  let ahorroPrepago: number | undefined;
  if (simularPrepago && montoPrepago > 0) {
    // Calcular ahorro aproximado en intereses por prepago
    // Simplificación: reducir el saldo y recalcular intereses restantes
    const mesesRestantes = plazoMeses - 12; // Asumiendo prepago después de 1 año
    const interesesOriginalesRestantes = (dividendoMensualUF * mesesRestantes) - (montoFinanciarUF - (montoFinanciarUF / plazoMeses * 12));
    const nuevoSaldo = montoFinanciarUF - montoPrepago;
    const interesesNuevosRestantes = (dividendoMensualUF * mesesRestantes) - (nuevoSaldo - (nuevoSaldo / plazoMeses * 12));
    ahorroPrepago = interesesOriginalesRestantes - interesesNuevosRestantes;
  }

  // Totales
  const totalPagoUF = dividendoMensualUF * plazoMeses;
  const totalInteresesUF = totalPagoUF - montoFinanciarUF;
  const costoTotal = totalPagoUF / montoFinanciarUF;

  // Conversiones a CLP
  const montoFinanciarCLP = montoFinanciarUF * valorUF;
  const dividendoMensualCLP = dividendoMensualUF * valorUF;
  const totalPagoCLP = totalPagoUF * valorUF;

  return {
    montoUF: Math.round(montoUF * 100) / 100,
    pieUF: Math.round(pieUF * 100) / 100,
    montoFinanciarUF: Math.round(montoFinanciarUF * 100) / 100,
    tasaAnual: Math.round(tasaAnual * 100) / 100,
    plazoAnos,
    plazoMeses,
    dividendoMensualUF: Math.round(dividendoMensualUF * 100) / 100,
    dividendoMensualCLP: Math.round(dividendoMensualCLP),
    montoFinanciarCLP: Math.round(montoFinanciarCLP),
    totalPagoUF: Math.round(totalPagoUF * 100) / 100,
    totalPagoCLP: Math.round(totalPagoCLP),
    totalInteresesUF: Math.round(totalInteresesUF * 100) / 100,
    costoTotal: Math.round(costoTotal * 100) / 100,
    valorUF,
    capacidadEndeudamiento,
    segurosMensuales,
    comisionAdministracion,
    cae: cae ? Math.round(cae * 100) / 100 : undefined,
    gastosNotariales,
    tablaAmortizacion,
    ahorroPrepago: ahorroPrepago ? Math.round(ahorroPrepago) : undefined
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function creditoHipotecarioToResults(result: CreditoHipotecarioResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  results.push({
    label: 'Dividendo Mensual (CLP)',
    value: result.dividendoMensualCLP,
    format: 'CLP',
    highlight: true,
  });

  results.push({
    label: 'Dividendo Mensual (UF)',
    value: result.dividendoMensualUF,
    format: 'UF',
    highlight: true,
  });

  results.push({
    label: 'Monto a Financiar (UF)',
    value: result.montoFinanciarUF,
    format: 'UF',
  });

  results.push({
    label: 'Monto a Financiar (CLP)',
    value: result.montoFinanciarCLP,
    format: 'CLP',
  });

  results.push({
    label: 'Total Intereses (UF)',
    value: result.totalInteresesUF,
    format: 'UF',
  });

  results.push({
    label: 'Total a Pagar (UF)',
    value: result.totalPagoUF,
    format: 'UF',
  });

  results.push({
    label: 'Total a Pagar (CLP)',
    value: result.totalPagoCLP,
    format: 'CLP',
  });

  results.push({
    label: 'Costo Total (multiplicador)',
    value: result.costoTotal,
    format: 'number',
  });

  results.push({
    label: 'Tasa Anual',
    value: result.tasaAnual,
    format: 'percentage',
  });

  results.push({
    label: 'Plazo (meses)',
    value: result.plazoMeses,
    format: 'number',
  });

  results.push({
    label: 'Pie (UF)',
    value: result.pieUF,
    format: 'UF',
  });

  results.push({
    label: 'Valor UF',
    value: result.valorUF,
    format: 'CLP',
  });

  // Incluir capacidad de endeudamiento si aplica
  if (result.capacidadEndeudamiento !== undefined) {
    results.push({
      label: 'Capacidad de Endeudamiento (25% ingreso)',
      value: result.capacidadEndeudamiento,
      format: 'CLP',
    });
  }

  // Incluir seguros si aplica
  if (result.segurosMensuales) {
    results.push({
      label: 'Seguro Desgravamen Mensual (UF)',
      value: result.segurosMensuales.desgravamen,
      format: 'UF',
    });

    results.push({
      label: 'Seguro Incendio Mensual (UF)',
      value: result.segurosMensuales.incendio,
      format: 'UF',
    });

    results.push({
      label: 'Total Seguros Mensuales (UF)',
      value: result.segurosMensuales.total,
      format: 'UF',
    });
  }

  // Incluir comisión de administración si aplica
  if (result.comisionAdministracion !== undefined) {
    results.push({
      label: 'Comisión Administración Mensual (UF)',
      value: result.comisionAdministracion,
      format: 'UF',
    });
  }

  // Incluir CAE si aplica
  if (result.cae !== undefined) {
    results.push({
      label: 'CAE (Carga Anual Equivalente)',
      value: result.cae,
      format: 'percentage',
    });
  }

  // Incluir gastos notariales si aplica
  if (result.gastosNotariales !== undefined) {
    results.push({
      label: 'Gastos Notariales Aproximados',
      value: result.gastosNotariales,
      format: 'CLP',
    });
  }

  // Incluir ahorro por prepago si aplica
  if (result.ahorroPrepago !== undefined) {
    results.push({
      label: 'Ahorro Aproximado por Prepago',
      value: result.ahorroPrepago,
      format: 'UF',
    });
  }

  return results;
}
