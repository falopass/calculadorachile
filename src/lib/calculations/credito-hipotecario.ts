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
  /**
   * Mes en que se hace el prepago (1..plazoMeses). Default 12 (al
   * cumplirse el primer año, escenario más típico). Se usa para
   * estimar los intereses ahorrados sobre el saldo prepagado.
   */
  mesPrepago?: number;
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
  /** Seguros mensuales (referenciales del primer mes) */
  segurosMensuales?: {
    desgravamen: number;
    incendio: number;
    total: number;
  };
  /** Comisión de administración mensual */
  comisionAdministracion?: number;
  /** CAE (Carga Anual Equivalente, % anual basado en TIR mensual) */
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
 * Tasa típica de mercado para seguro de desgravamen (% mensual sobre
 * saldo insoluto). En Chile las aseguradoras cobran entre 0,02% y
 * 0,05% mensual del saldo.
 *
 * Nota: el bug anterior usaba 0,1% del *dividendo* (no del saldo), lo
 * que daba un cobro plano e irreal.
 */
const SEGURO_DESGRAVAMEN_TASA_MENSUAL_SALDO = 0.0003; // 0,03% mensual sobre saldo

/**
 * Tasa típica de mercado para seguro de incendio (% mensual sobre el
 * monto del crédito original, NO sobre el saldo).
 */
const SEGURO_INCENDIO_TASA_MENSUAL = 0.00015; // 0,015% mensual sobre monto

/**
 * Comisión típica de administración (% mensual sobre saldo).
 */
const COMISION_ADMIN_TASA_MENSUAL_SALDO = 0.0005; // 0,05% mensual sobre saldo

/**
 * Calcula la TIR mensual de un flujo de caja por bisección.
 *
 * Para un crédito hipotecario:
 *   - flujos[0] = +monto neto recibido (negativo si hay costos
 *                 iniciales descontados)
 *   - flujos[k] = -pago del mes k (dividendo + seguros + comisiones)
 *
 * La TIR es la tasa mensual r tal que:
 *   Σ flujo_k / (1+r)^k = 0
 *
 * Se usa bisección porque es robusta para flujos hipotecarios
 * típicos (todos los pagos negativos después del desembolso) y no
 * requiere derivada. Newton-Raphson puede divergir si el guess
 * inicial está lejos.
 *
 * @returns Tasa mensual o `null` si no converge en 100 iteraciones.
 */
function calcularTIRMensual(flujos: number[]): number | null {
  const npv = (rate: number): number => {
    let sum = 0;
    for (let k = 0; k < flujos.length; k++) {
      sum += flujos[k] / Math.pow(1 + rate, k);
    }
    return sum;
  };

  // Búsqueda binaria: NPV es monótonamente decreciente con r para
  // flujos hipotecarios (1 entrada positiva, N salidas negativas).
  let low = -0.99 / 12; // tasa mensual mínima realista
  let high = 1.0; // 100% mensual como techo absurdo
  let npvLow = npv(low);
  const npvHigh = npv(high);

  // Si los signos no encierran 0, no hay raíz en el intervalo.
  if (npvLow * npvHigh > 0) return null;

  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const npvMid = npv(mid);
    if (Math.abs(npvMid) < 1e-9 || (high - low) < 1e-10) {
      return mid;
    }
    if (npvMid * npvLow > 0) {
      low = mid;
      npvLow = npvMid;
    } else {
      high = mid;
    }
  }
  return (low + high) / 2;
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
    montoPrepago = 0,
    mesPrepago = 12
  } = input;
  void tipoTasa;
  void periodoGraciaMeses;

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

  // Redondeo a 2 decimales UF: todos los derivados (totalPago, CLP,
  // intereses, costoTotal) se calculan SOBRE este valor redondeado para
  // que el resultado sea internamente consistente. Antes los derivados
  // usaban el valor sin redondear y los expuestos quedaban
  // inconsistentes (ej: dividendoMensualUF * plazoMeses ≠ totalPagoUF).
  dividendoMensualUF = Math.round(dividendoMensualUF * 100) / 100;

  // Calcular capacidad de endeudamiento (máximo 25% del ingreso)
  let capacidadEndeudamiento: number | undefined;
  if (ingresoMensual > 0) {
    capacidadEndeudamiento = ingresoMensual * 0.25; // 25% del ingreso
  }

  // ============================================
  // Construcción del flujo mensual real (con seguros sobre saldo)
  // ----------------------------------------------
  // Antes:
  //   - desgravamen = 0,1% del dividendo (plano)
  //   - incendio = 0,05% del dividendo (plano)
  //   - Total pagado se sumaba (dividendo + seguro_plano) × n
  //
  // Ahora:
  //   - desgravamen = 0,03% mensual SOBRE EL SALDO INSOLUTO (decrece)
  //   - incendio = 0,015% mensual sobre el monto original (constante)
  //   - comisión = 0,05% mensual sobre saldo (decrece)
  //
  // Esto es más realista y permite calcular un CAE veraz.
  // ============================================

  type FilaAmortizacion = NonNullable<CreditoHipotecarioResult['tablaAmortizacion']>[number];
  const tabla: FilaAmortizacion[] = [];
  let saldo = montoFinanciarUF;
  let desgravamenPrimerMes = 0;
  let incendioPrimerMes = 0;
  let comisionPrimerMes = 0;
  // Sumas para reportar valores agregados al usuario.
  let sumaSeguros = 0;
  let sumaComisiones = 0;
  let sumaIntereses = 0;

  // Flujos para CAE: el banco entrega +montoFinanciarUF en t=0 y el
  // deudor paga (-(dividendo + seguros + comisión)) cada mes.
  const flujosCAE: number[] = [montoFinanciarUF];

  for (let mes = 1; mes <= plazoMeses; mes++) {
    const interes = saldo * tasaMensual;
    const capital = dividendoMensualUF - interes;
    const nuevoSaldo = saldo - capital;

    const desgravamen = incluyeSeguroDesgravamen
      ? saldo * SEGURO_DESGRAVAMEN_TASA_MENSUAL_SALDO
      : 0;
    const incendio = incluyeSeguroIncendio
      ? montoUF * SEGURO_INCENDIO_TASA_MENSUAL
      : 0;
    const comision = incluyeComisionAdministracion
      ? saldo * COMISION_ADMIN_TASA_MENSUAL_SALDO
      : 0;
    const totalSeguros = desgravamen + incendio;

    if (mes === 1) {
      desgravamenPrimerMes = desgravamen;
      incendioPrimerMes = incendio;
      comisionPrimerMes = comision;
    }

    sumaSeguros += totalSeguros;
    sumaComisiones += comision;
    sumaIntereses += interes;

    flujosCAE.push(-(dividendoMensualUF + totalSeguros + comision));

    if (calcularTablaAmortizacion) {
      tabla.push({
        mes,
        saldoInicial: Math.round(saldo * 100) / 100,
        dividendo: Math.round(dividendoMensualUF * 100) / 100,
        interes: Math.round(interes * 100) / 100,
        capital: Math.round(capital * 100) / 100,
        seguro: Math.round(totalSeguros * 100) / 100,
        saldoFinal: Math.round(nuevoSaldo * 100) / 100,
      });
    }

    saldo = nuevoSaldo;
  }

  // Seguros del PRIMER mes (los reportamos como referencia visible).
  // Los meses siguientes el desgravamen y la comisión bajan con el saldo.
  let segurosMensuales = undefined as
    | { desgravamen: number; incendio: number; total: number }
    | undefined;
  if (incluyeSeguroDesgravamen || incluyeSeguroIncendio) {
    const desgravamenRound = Math.round(desgravamenPrimerMes * 10000) / 10000;
    const incendioRound = Math.round(incendioPrimerMes * 10000) / 10000;
    segurosMensuales = {
      desgravamen: desgravamenRound,
      incendio: incendioRound,
      total: Math.round((desgravamenRound + incendioRound) * 10000) / 10000,
    };
  }

  // Comisión de administración del primer mes.
  let comisionAdministracion: number | undefined;
  if (incluyeComisionAdministracion) {
    comisionAdministracion = Math.round(comisionPrimerMes * 10000) / 10000;
  }

  // ============================================
  // CAE real por TIR (Carga Anual Equivalente)
  // ----------------------------------------------
  // El CAE legal en Chile (Ley 19.496 + Reglamento de transparencia
  // de costos del SERNAC/CMF) es la tasa anual EFECTIVA que iguala
  // el valor presente de los pagos (incluyendo seguros y comisiones
  // que el banco exige) al monto entregado.
  //
  // Antes se usaba (totalPagado/principal)^(1/n) - 1, que sobreestima
  // el CAE porque ignora la temporalidad (un peso pagado al mes 360
  // pesa lo mismo que uno pagado al mes 1).
  //
  // Ahora calculamos la TIR mensual por bisección y la convertimos
  // a tasa anual efectiva: CAE = (1 + r_mensual)^12 - 1.
  // ============================================
  let cae: number | undefined;
  if (calcularCAE) {
    const tirMensual = calcularTIRMensual(flujosCAE);
    if (tirMensual != null) {
      const caeAnual = Math.pow(1 + tirMensual, 12) - 1;
      cae = Math.round(caeAnual * 100 * 100) / 100; // % con 2 decimales
    } else {
      // Fallback: si TIR no converge (caso anómalo), aproximamos.
      const totalPagadoConCargos =
        (dividendoMensualUF + (segurosMensuales?.total ?? 0) +
          (comisionAdministracion ?? 0)) *
        plazoMeses;
      const caeAprox =
        Math.pow(totalPagadoConCargos / montoFinanciarUF, 1 / plazoAnos) - 1;
      cae = Math.round(caeAprox * 100 * 100) / 100;
    }
  }

  // Calcular gastos notariales
  let gastosNotariales: number | undefined;
  if (calcularGastosNotariales) {
    // Aproximadamente 1-2% del monto del crédito
    gastosNotariales = montoUF * 0.015 * valorUF; // 1.5% promedio en UF convertido a CLP
  }

  // Tabla de amortización (ya construida arriba si se solicitó)
  const tablaAmortizacion = calcularTablaAmortizacion ? tabla : undefined;

  // Simular prepago si se solicita
  let ahorroPrepago: number | undefined;
  if (simularPrepago && montoPrepago > 0) {
    // Ahorro de intereses por prepago "puntual": calcular intereses
    // ahorrados sobre el saldo prepagado a lo largo del resto del
    // plazo. Aproximación: monto_prepago × tasa_mensual × meses_restantes.
    //
    // mesPrepago es 1-indexed (mes 1 = primer mes). El usuario puede
    // pasar cualquier mes en (0, plazoMeses); fuera del rango se
    // recorta para evitar valores negativos o triviales.
    const mesPrepagoValido = Math.max(
      1,
      Math.min(Math.round(mesPrepago), plazoMeses - 1),
    );
    const mesesRestantes = plazoMeses - mesPrepagoValido;
    ahorroPrepago = montoPrepago * tasaMensual * mesesRestantes;
  }

  // Totales
  const totalPagoUF = dividendoMensualUF * plazoMeses;
  const totalInteresesUF = totalPagoUF - montoFinanciarUF;
  const costoTotal = totalPagoUF / montoFinanciarUF;
  void sumaSeguros;
  void sumaComisiones;
  void sumaIntereses;

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
    dividendoMensualUF,
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
    cae: cae !== undefined ? cae : undefined,
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

  // Incluir seguros si aplica (referenciales del primer mes)
  if (result.segurosMensuales) {
    results.push({
      label: 'Seguro Desgravamen Mes 1 (UF, sobre saldo)',
      value: result.segurosMensuales.desgravamen,
      format: 'UF',
    });

    results.push({
      label: 'Seguro Incendio Mensual (UF)',
      value: result.segurosMensuales.incendio,
      format: 'UF',
    });

    results.push({
      label: 'Total Seguros Mes 1 (UF)',
      value: result.segurosMensuales.total,
      format: 'UF',
    });
  }

  // Incluir comisión de administración si aplica
  if (result.comisionAdministracion !== undefined) {
    results.push({
      label: 'Comisión Administración Mes 1 (UF, sobre saldo)',
      value: result.comisionAdministracion,
      format: 'UF',
    });
  }

  // Incluir CAE si aplica
  if (result.cae !== undefined) {
    results.push({
      label: 'CAE (Carga Anual Equivalente, TIR)',
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
