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
  /**
   * Tope imponible AFP/Salud 2026: 89,9 UF mensuales.
   * Fuente: Superintendencia de Pensiones, circular 9 enero 2026.
   * (Antes de la reforma este tope era 87,8 UF; en 2025 era 84,3 UF.)
   * Se ajusta anualmente por la variación real de las remuneraciones.
   */
  tope_imponible: 89.9,
};

export const SEGURO_CESANTIA = {
  contrato_indefinido: {
    trabajador: 0.6,
    /**
     * Aporte empleador a la cuenta individual de cesantía.
     * Reforma previsional (Ley 21.735) aumenta gradualmente el aporte
     * del empleador desde 1,5% (parte CIC) hasta 8,5% en 2033, sumado
     * al 0,8% del Fondo Solidario. Para el cálculo del seguro de
     * cesantía mantenemos el 2,4% original (1,6% CIC + 0,8% FCS) que
     * es la cifra correcta en este contexto. La nueva cotización
     * adicional de la reforma va a un seguro social separado, no al
     * seguro de cesantía.
     */
    empleador: 2.4,
  },
  contrato_plazo_fijo: {
    trabajador: 0,
    empleador: 3.0,
  },
  /** Tope imponible cesantía 2026: 134,9 UF (antes 119,9). */
  tope_imponible: 134.9,
};

/**
 * Tasa de cotización al nuevo Seguro Social Previsional creado por la
 * Ley 21.735 (reforma de pensiones). El empleador aporta un porcentaje
 * adicional sobre la base imponible que se incrementa gradualmente
 * cada agosto desde 2025 hasta 2033.
 *
 * Fuente: WTW / Superintendencia de Pensiones.
 */
export const SEGURO_SOCIAL_PREVISIONAL = {
  /** Calendario de tasas de aporte empleador (% sobre imponible). */
  calendario: [
    { vigenteDesde: '2025-08-01', tasa: 1.0 },
    { vigenteDesde: '2026-08-01', tasa: 1.75 },
    { vigenteDesde: '2027-08-01', tasa: 2.5 },
    { vigenteDesde: '2028-08-01', tasa: 3.25 },
    { vigenteDesde: '2029-08-01', tasa: 4.0 },
    { vigenteDesde: '2030-08-01', tasa: 4.75 },
    { vigenteDesde: '2031-08-01', tasa: 5.5 },
    { vigenteDesde: '2032-08-01', tasa: 6.25 },
    { vigenteDesde: '2033-08-01', tasa: 7.0 },
  ],
  /** Tasa vigente al cierre de Q2 2026 (segundo año del calendario). */
  tasaVigente2026: 1.0,
};

export const GRATIFICACION = {
  porcentaje: 25,
  tope_475_inm: 4.75,
};

export const HORAS_EXTRA = {
  recargo_normal: 50,
  recargo_domingo: 100,
  /** Máximo 2 horas extra diarias (Art. 31 CdT). */
  tope_diario: 2,
};

/**
 * Jornada laboral ordinaria vigente.
 *
 * Calendario Ley 21.561 ("Ley 40 horas"):
 *  - Hasta abril 2024: 45 h/semana (jornada histórica).
 *  - Abril 2024 – abril 2026: 44 h.
 *  - Abril 2026 – abril 2028: 42 h. ← VIGENTE.
 *  - Desde abril 2028: 40 h.
 *
 * Las calculadoras deben usar `JORNADA_LEGAL.actual` por defecto y
 * permitir al usuario seleccionar otra si tiene jornada especial.
 */
export const JORNADA_LEGAL = {
  /** Jornada vigente al consultar (mayo 2026 → 42h). */
  actual: 42,
  calendario: [
    { vigenteDesde: '1900-01-01', horas: 48 },
    { vigenteDesde: '2005-01-01', horas: 45 },
    { vigenteDesde: '2024-04-26', horas: 44 },
    { vigenteDesde: '2026-04-26', horas: 42 },
    { vigenteDesde: '2028-04-26', horas: 40 },
  ],
};

export const INDEMNIZACION = {
  dias_por_año: 30,
  tope_años: 11,
  /** Tope imponible 90 UF (Art. 172 CdT). */
  tope_uf_mensual: 90,
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
  afp_salud: 89.9, // UF — 2026 (Superintendencia de Pensiones)
  seguro_cesantia: 134.9, // UF — 2026
  gratificacion: 90, // UF (Art. 172 CdT)
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

// ============================================
// Tasas regulatorias adicionales 2026
// ============================================

/**
 * Mutual de Seguridad (Ley 16.744): cotización del empleador para
 * accidentes del trabajo y enfermedades profesionales.
 *  - Cotización básica: 0,90% sobre la remuneración imponible.
 *  - Cotización adicional: 0% – 3,4% según giro/siniestralidad.
 *
 * Para cálculos genéricos se usa solo la básica + un promedio
 * conservador para la adicional.
 */
export const MUTUAL = {
  basica: 0.9,
  adicional_promedio: 0.05, // referencial
  total_referencial: 0.95,
};

/**
 * Tasa Máxima Convencional (TMC) publicada mensualmente por la CMF.
 *
 * Aplica a operaciones de crédito de dinero según la Ley 18.010. El
 * valor varía por tipo de operación, plazo y monto. Estos son
 * promedios referenciales para mayo 2026.
 *
 * Fuente: CMF (cmfchile.cl), publicación mensual oficial.
 *
 * IMPORTANTE: actualizar mensualmente o reemplazar por API en vivo.
 */
export const TMC_2026_MAYO = {
  /** > 200 UF, plazo > 90 días — referencial mayo 2026. */
  no_reajustables_mayor_200uf: 9.5,
  /** 50 - 200 UF, plazo > 90 días. */
  no_reajustables_50_200uf: 22.5,
  /** Crédito en UF a más de un año plazo. */
  reajustables_uf_mayor_1_anio: 5.2,
  fuente: 'CMF — Norma General N°450 (referencia mayo 2026)',
};

/**
 * Calendario de tarifas de Boleta de Honorarios (Ley 21.578).
 * Calendario de retención progresiva 2025-2028.
 */
export const RETENCION_HONORARIOS_CALENDARIO = {
  2025: 14.5,
  2026: 15.25,
  2027: 16,
  2028: 17,
} as const;

/**
 * Tarifas referenciales del mercado para gastos comunes en
 * condominios. NO son legales — la Ley 21.442 fija prorrateo según
 * coeficiente de copropiedad, no precio por m².
 */
export const GASTOS_COMUNES_REFERENCIALES = {
  precio_m2_clp: 15000,
  estacionamiento_clp: 35000,
  piscina_clp: 15000,
  gimnasio_clp: 10000,
  conserje_24h_clp: 20000,
};

/**
 * Tarifas referenciales mercado de seguros vehiculares para crédito
 * automotriz. Solo para estimación.
 */
export const SEGURO_VEHICULAR = {
  /** Tasa mensual sobre el valor del vehículo. */
  tasa_mensual_porcentaje: 0.15,
};

/**
 * Crédito con Aval del Estado (CAE):
 * Tasa fija 2% anual desde reforma 2022 (Ley 21.477).
 * Garantía estatal: 90% del monto. Ley 20.027.
 */
export const CREDITO_CAE = {
  tasa_anual_legal: 2.0,
  garantia_estatal: 90,
};

/**
 * Tarifa BT1 elemento por elemento (post-Ley 21.667 de
 * descongelamiento de tarifas eléctricas, abril 2024).
 *
 * Fuente: CNE (Comisión Nacional de Energía) – Decreto Tarifario.
 *
 * Recargos por tipo de tarifa BT1 sobre la base residencial:
 */
export const TARIFA_BT1_RECARGOS = {
  bt1_residencial: 1.0,
  bt1_comercial: 1.2,
  bt1_industrial: 1.35,
};

/**
 * Ajuste por zona geográfica de la tarifa BT1.
 * Las tarifas reales varían por distribuidora.
 */
export const TARIFA_BT1_ZONA = {
  norte: 1.05,
  central: 1.0,
  sur: 1.1,
};

/**
 * Cargo fijo BT1 según tipo (CLP/mes, post-2024).
 */
export const TARIFA_BT1_CARGO_FIJO = {
  bt1_residencial: 2800,
  bt1_comercial: 3920,
  bt1_industrial: 5040,
};

/**
 * Subsidio de Agua Potable (Ley 18.778, DS 195/MOP).
 */
export const SUBSIDIO_AGUA_POTABLE = {
  /** Cobertura hasta 15 m³ de consumo. */
  tope_m3: 15,
  tramos: {
    tramo1: 60,
    tramo2: 40,
    tramo3: 25,
  },
  /** Tarifa promedio nacional referencia 2026. */
  tarifa_promedio_clp_m3: 1300,
};

/**
 * Recargos sobre las indemnizaciones del Art. 168 CdT cuando el
 * tribunal declara que el despido fue injustificado/indebido.
 */
export const RECARGO_ART_168 = {
  /** Necesidades de la empresa (Art. 161). */
  necesidades_empresa: 30,
  /** Causales no demostradas (Art. 159 N°4 - vencimiento de plazo). */
  causal_no_demostrada: 50,
  /** Falta de probidad / vías de hecho (Art. 160). */
  falta_probidad: 80,
  /** Aplicación indebida del Art. 161. */
  aplicacion_indebida: 100,
};

/**
 * Patente Comercial (DL 3063/1979 Art. 24).
 *  - Mínimo: 1 UTM ANUAL.
 *  - Máximo: 8.000 UTM ANUAL.
 */
export const PATENTE_COMERCIAL = {
  minimo_utm_anual: 1,
  maximo_utm_anual: 8000,
  tasas_comunales: {
    /** Tasas máximas que aplican municipios sobre capital propio (%). */
    rango_legal_min: 0.25,
    rango_legal_max: 0.5,
  },
};

/**
 * Permiso de circulación (Tabla SII / DFL 1 Tránsito).
 * Tasas progresivas en UTM sobre tasación fiscal.
 */
export const PERMISO_CIRCULACION = {
  tramos_utm: [
    { hasta_utm: 60, tasa: 1.0 },
    { hasta_utm: 120, tasa: 2.0 },
    { hasta_utm: 250, tasa: 3.0 },
    { hasta_utm: 400, tasa: 4.0 },
    { hasta_utm: Infinity, tasa: 4.5 },
  ],
  /** Vehículos > 20 años: 50% de descuento. */
  descuento_antiguedad_anios: 20,
  descuento_antiguedad_porcentaje: 50,
};

/**
 * Plusvalía inmobiliaria (Ley 21.210, Art. 17 N°8 LIR).
 */
export const PLUSVALIA_INMOBILIARIA = {
  /** Exención acumulada para vivienda habitacional. */
  exencion_uf: 8000,
  /** Tasa del impuesto único sustitutivo sobre el exceso. */
  tasa_impuesto_unico: 10,
};

/**
 * Pensión de alimentos (Ley 14.908 / Ley 21.389).
 */
export const PENSION_ALIMENTOS = {
  /** Mínimo legal por hijo como % del IMM. */
  minimo_imm_primer_hijo: 40,
  minimo_imm_hijo_adicional: 30,
  /** Porcentajes referenciales PJUD sobre el ingreso del alimentante. */
  porcentaje_primer_hijo: 40,
  porcentaje_hijo_adicional: 30,
  /** Tope: 50% del ingreso (Art. 7 Ley 14.908). */
  tope_ingreso: 50,
};

/**
 * Bono Bodas de Oro (Ley 20.506).
 */
export const BODAS_ORO = {
  anios_requeridos: 50,
};

/**
 * Multa de tránsito (Ley 18.290 Art. 196-204; Ley 20.770 "Ley
 * Emilia"; Ley 20.580 "Tolerancia Cero").
 */
export const MULTA_TRANSITO_UTM = {
  leve: 0.5,
  menos_grave: 1,
  grave: 2,
  gravisima: 4,
  gravisima_alcohol: 12,
  /** Recargo por reincidencia dentro de 12 meses (Art. 197). */
  recargo_reincidencia: 50,
};

/**
 * Operación Renta independientes - tasas referencial CAE.
 */
export const APV_REGIMEN_B = {
  /** Tope anual deducible Art. 42 bis LIR. */
  tope_uf_anual: 600,
};

/**
 * Recargo "ocasional" (sin TAG) sobre tarifa con TAG en autopistas.
 * El recargo real depende de cada concesionaria.
 */
export const TAG_RECARGO_SIN_TAG = 50;
