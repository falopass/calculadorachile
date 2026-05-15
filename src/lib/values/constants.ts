// ============================================
// CONSTANTES CHILE 2026
// ----------------------------------------------
// Los valores monetarios diarios (UF, UTM, dólar)
// vienen de `snapshot.json`, que se actualiza
// automáticamente por GitHub Action.
//
// Las constantes regulatorias (tasas AFP, tramos
// de impuesto, topes legales, etc.) se mantienen
// aquí. Actualizar manualmente cuando cambie la
// ley o circular del SII / Superintendencia.
// ============================================

import snapshot from './snapshot.json';

export const INGRESO_MINIMO = {
  mensual: 539000, // Ingreso mínimo mensual (desde 01/01/2026, Ley 21.630)
  menor_18_mayor_65: 402082,
  no_remuneracional: 347434,
  jornal: 26950, // 539000 / 20 días
  hora: 3593, // 539000 / 150 horas
  zona_extrema: 571340, // Magallanes, Aysén
};

// ============================================
// Indicadores económicos (auto-actualizados)
// ============================================
//
// Estos objetos exponen el último snapshot. Para acceder al valor
// en vivo dentro de componentes React, usar `useValues()` que va
// a /api/values y prefiere fuentes externas si responden.

export const UF = {
  valor: snapshot.uf,
  fecha_actualizacion: snapshot.asOf.split('T')[0],
};

export const UTM = {
  valor: snapshot.utm,
  fecha_actualizacion: snapshot.asOf.split('T')[0],
};

export const DOLAR = {
  observado: snapshot.dolarObservado,
  venta: Math.round(snapshot.dolarObservado * 1.0065 * 100) / 100,
  fecha_actualizacion: snapshot.asOf.split('T')[0],
};

// ============================================
// Constantes regulatorias (manuales)
// ============================================

export const AFP = {
  capital: { nombre: 'Capital', comision: 1.44, sis: 1.15 },
  cuprum: { nombre: 'Cuprum', comision: 1.44, sis: 1.15 },
  habitat: { nombre: 'Habitat', comision: 1.27, sis: 1.15 },
  modelo: { nombre: 'Modelo', comision: 0.58, sis: 1.15 },
  planvital: { nombre: 'PlanVital', comision: 1.16, sis: 1.15 },
  provida: { nombre: 'ProVida', comision: 1.45, sis: 1.15 },
  uno: { nombre: 'Uno', comision: 0.46, sis: 1.15 },
};

export const SALUD = {
  fonasa: {
    tasa: 7,
    tramos: {
      a: { nombre: 'A', cotizacion: 0 },
      b: { nombre: 'B', cotizacion: 0 },
      c: { nombre: 'C', cotizacion: 0.0067 },
      d: { nombre: 'D', cotizacion: 0.0204 },
    },
  },
  isapre: {
    tasa_minima: 7,
  },
  tope_imponible: 141.8, // UF
};

export const SEGURO_CESANTIA = {
  contrato_indefinido: {
    trabajador: 0.6,
    empleador: 2.4,
  },
  contrato_plazo_fijo: {
    trabajador: 0,
    empleador: 3.0,
  },
  tope_imponible: 117.2, // UF
};

export const GRATIFICACION = {
  porcentaje: 25,
  tope_475_inm: 4.75,
};

export const HORAS_EXTRA = {
  recargo_normal: 50,
  recargo_domingo: 100,
  tope_semanal: 2,
};

export const INDEMNIZACION = {
  dias_por_año: 30,
  tope_años: 11,
};

export const VACACIONES = {
  dias_anuales: 15,
  dias_progresivos: 1,
  tope_progresivos: 5,
};

export const PENSION_ALIMENTICIA = {
  tramos: [
    { min: 0, max: 1, porcentaje: 40 },
    { min: 1, max: 4, porcentaje: 30 },
    { min: 4, max: Infinity, porcentaje: 30 },
  ],
};

export const IVA = {
  tasa: 19,
};

export const BOLETA_HONORARIOS = {
  tasa_base: 10,
  tasa_adicional: 5.25,
  /** Tasa total 2026 según Ley 21.578 (calendario 14,5% → 17%). */
  tasa_total: 15.25,
  exento_minimo: 10, // UTM mensuales
  /** Calendario completo Ley 21.578 (cotizaciones independientes). */
  calendario: {
    2025: 14.5,
    2026: 15.25,
    2027: 16,
    2028: 17,
  },
};

export const TOPE_IMPOSITIVO = {
  afp_salud: 141.8, // UF
  seguro_cesantia: 117.2, // UF
  gratificacion: 90, // UF
};

export const IMPUESTO_SEGUNDA_CATEGORIA = {
  tramos: [
    { desde: 0, hasta: 13.5, exento: 0, factor: 0, rebaja: 0 },
    { desde: 13.5, hasta: 30, exento: 13.5, factor: 0.04, rebaja: 0 },
    { desde: 30, hasta: 50, exento: 30, factor: 0.08, rebaja: 1.2 },
    { desde: 50, hasta: 70, exento: 50, factor: 0.135, rebaja: 3.95 },
    { desde: 70, hasta: 90, exento: 70, factor: 0.23, rebaja: 10.25 },
    { desde: 90, hasta: 120, exento: 90, factor: 0.304, rebaja: 16.9 },
    { desde: 120, hasta: 310, exento: 120, factor: 0.35, rebaja: 22.42 },
    { desde: 310, hasta: Infinity, exento: 310, factor: 0.40, rebaja: 37.92 },
  ],
};

// UTA = 12 × UTM (derivado del snapshot)
export const UTA_2026 = UTM.valor * 12;

// ============================================
// Subsidio Habitacional DS49 / DS01
// ============================================
export const SUBSIDIO_HABITACIONAL = {
  ds49: {
    montoMaximoUF: 450,
    tramo1: { ingresoMaximoUF: 12, subsidioMaximoUF: 450 },
    tramo2: { ingresoMaximoUF: 18, subsidioMaximoUF: 380 },
    tramo3: { ingresoMaximoUF: 24, subsidioMaximoUF: 310 },
  },
  ds01: {
    montoMaximoUF: 650,
    tramo1: { ingresoMaximoUF: 15, subsidioMaximoUF: 650 },
    tramo2: { ingresoMaximoUF: 22, subsidioMaximoUF: 520 },
  },
};

// ============================================
// Subsidio al Agua Potable
// ============================================
export const SUBSIDIO_AGUA = {
  montoMaximoCLP: 14000,
  porcentajeSubsidio: 0.6,
  tramos: [
    { consumoMaximoM3: 15, subsidio: 0.6 },
    { consumoMaximoM3: 25, subsidio: 0.4 },
  ],
};

// ============================================
// Costo TAG (Telepeaje) - aproximado
// ============================================
export const TAG_RUTAS = {
  'santiago-rancagua': { categoria1: 3500, categoria2: 5200, categoria3: 7800 },
  'santiago-valparaiso': { categoria1: 4200, categoria2: 6300, categoria3: 9500 },
  'santiago-losandes': { categoria1: 3800, categoria2: 5700, categoria3: 8600 },
};

// ============================================
// Tarifa Eléctrica BT1 (Residencial) - aproximado 2026
// Tras Ley 21.667 (descongelamiento de tarifas), las tarifas BT1
// están entre $165 y $220 /kWh promedio según consumo y zona.
// ============================================
export const TARIFA_BT1 = {
  cargoFijoCLP: 2800,
  precioEnergiaCLPKWh: 180,
  tramosConsumo: [
    { maximoKWh: 150, precioCLPKWh: 165 },
    { maximoKWh: 300, precioCLPKWh: 185 },
    { maximoKWh: Infinity, precioCLPKWh: 220 },
  ],
};

// ============================================
// Bono Bodas de Oro (Ley 20.506)
// Beneficio único entregado a parejas que cumplen 50 años de
// matrimonio. Pago fijo por cada cónyuge, reajustado por el IPS.
// ============================================
export const BONO_BODAS_ORO = {
  /** Monto por cada cónyuge (reajuste IPS 2026, aprox.). */
  montoPorConyugeCLP: 372135,
  /** Monto total para el matrimonio (≈ 2 × monto por cónyuge). */
  montoTotalCLP: 744270,
  requisitos: [
    'Cumplir 50 años de matrimonio',
    'Ambos cónyuges vivos al momento del pago',
    'Pertenecer al 80% más vulnerable según RSH',
    'Residir en Chile',
  ],
};

// ============================================
// PGU 2026 (Ley 21.735, reajuste IPC febrero 2026)
// La PGU sube progresivamente hasta $250.000 según Ley 21.735.
// En febrero 2026 se reajustó por IPC 2025 (aprox. +4%).
// ============================================
export const PGU_2026 = {
  /** PGU base 65-81 años (febrero 2026, post-reajuste IPC). */
  montoMaximo65a81CLP: 240931,
  /** PGU mayorada 82+ años. */
  montoMaximo82MasCLP: 260286,
  edadMinima: 65,
  tramos: [
    /** Pensión base hasta este monto: PGU completa. */
    { ingresoMaximoCLP: 820704, pguCompleta: true },
    /** Pensión base hasta este monto: PGU se reduce linealmente a 0. */
    { ingresoMaximoCLP: 1302705, pguCompleta: false },
  ],
};

// ============================================
// Asignación Familiar 2026 (Ley 21.751)
// ============================================
export const ASIGNACION_FAMILIAR_2026 = {
  tramoA: { ingresoMaximoCLP: 631976, montoPorCargaCLP: 22007 },
  tramoB: { ingresoMaximoCLP: 923067, montoPorCargaCLP: 13505 },
  tramoC: { ingresoMaximoCLP: 1439668, montoPorCargaCLP: 4267 },
};

// ============================================
// Impuesto 2ª Categoría 2026 (alternativa por UTA)
// ============================================
export const IMPUESTO_SEGUNDA_CATEGORIA_2026 = {
  tramos: [
    { limiteInferiorUTA: 0, limiteSuperiorUTA: 8, tasa: 0, factor: 0 },
    { limiteInferiorUTA: 8, limiteSuperiorUTA: 16, tasa: 0.04, factor: 0 },
    { limiteInferiorUTA: 16, limiteSuperiorUTA: 24, tasa: 0.08, factor: 0.64 },
    { limiteInferiorUTA: 24, limiteSuperiorUTA: 32, tasa: 0.135, factor: 1.96 },
    { limiteInferiorUTA: 32, limiteSuperiorUTA: 48, tasa: 0.23, factor: 4.92 },
    { limiteInferiorUTA: 48, limiteSuperiorUTA: 64, tasa: 0.30, factor: 8.44 },
    { limiteInferiorUTA: 64, limiteSuperiorUTA: 96, tasa: 0.35, factor: 11.64 },
    { limiteInferiorUTA: 96, limiteSuperiorUTA: Infinity, tasa: 0.40, factor: 16.44 },
  ],
};

// ============================================
// Aguinaldo
// ============================================
export const AGUINALDO_2026 = {
  fiestas_patrias: 35000,
  navidad: 35000,
  escolar: 20000,
};
