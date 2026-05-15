// ============================================
// CONSTANTES CHILE 2026 - Actualizar anualmente
// ============================================

export const INGRESO_MINIMO = {
  mensual: 539000,        // Ingreso mínimo mensual (desde 01/01/2026, Ley 21.630)
  menor_18_mayor_65: 402082,  // Trabajadores menores de 18 y mayores de 65 años
  no_remuneracional: 347434,  // Fines no remuneracionales
  jornal: 26950,          // Ingreso mínimo diario (539000 / 20 días)
  hora: 3593,             // Ingreso mínimo por hora (539000 / 150 horas)
  zona_extrema: 571340,   // Zona extrema (Magallanes, Aysén) - 6% adicional aprox.
};

// Estos valores son sólo de referencia para cálculos que NO usan
// el hook `useValues()` (donde sí se obtiene el valor en vivo).
// Mantener sincronizados con `lib/values/fallback.ts`.
// Última revisión: 14/05/2026 (Mindicador.cl).
export const UF = {
  valor: 40324.06,        // Valor UF 14/05/2026 (Fuente: BCentral / Mindicador)
  fecha_actualizacion: '2026-05-14',
};

export const UTM = {
  valor: 70588,           // Valor UTM mayo 2026 (Fuente: BCentral)
  mes: 'mayo',
  año: 2026,
};

export const DOLAR = {
  observado: 889.19,      // Dólar observado 14/05/2026 (Fuente: BCentral / Mindicador)
  venta: 895,             // Dólar venta (estimado +0.65%)
  fecha_actualizacion: '2026-05-14',
};

export const AFP = {
  capital: { nombre: 'Capital', comision: 1.44, sis: 1.15 },
  cuprum: { nombre: 'Cuprum', comision: 1.44, sis: 1.15 },
  habitat: { nombre: 'Habitat', comision: 1.27, sis: 1.15 },
  modelo: { nombre: 'Modelo', comision: 0.58, sis: 1.15 },
  planvital: { nombre: 'PlanVital', comision: 1.16, sis: 1.15 },
  provida: { nombre: 'ProVida', comision: 1.45, sis: 1.15 },
  uno: { nombre: 'Uno', comision: 0.46, sis: 1.15 },  // 0.46% según spensiones.cl
};

export const SALUD = {
  fonasa: {
    tasa: 7,              // 7% del imponible
    tramos: {
      a: { nombre: 'A', cotizacion: 0 },      // Sin cotización adicional
      b: { nombre: 'B', cotizacion: 0 },      // Sin cotización adicional
      c: { nombre: 'C', cotizacion: 0.0067 }, // +0.67%
      d: { nombre: 'D', cotizacion: 0.0204 }, // +2.04%
    },
  },
  isapre: {
    tasa_minima: 7,       // Mínimo 7%
    // Las isapres tienen planes específicos por persona
  },
  tope_imponible: 141.8,  // UF
};

export const SEGURO_CESANTIA = {
  contrato_indefinido: {
    trabajador: 0.6,      // 0.6%
    empleador: 2.4,       // 2.4%
  },
  contrato_plazo_fijo: {
    trabajador: 0,        // 0%
    empleador: 3.0,       // 3%
  },
  tope_imponible: 117.2,  // UF
};

export const GRATIFICACION = {
  porcentaje: 25,         // 25% de remuneración
  tope_475_inm: 4.75,     // 4.75 ingresos mínimos
};

export const HORAS_EXTRA = {
  recargo_normal: 50,     // 50% recargo
  recargo_domingo: 100,   // 100% recargo domingo/festivo
  tope_semanal: 2,        // Máximo 2 horas extra diarias (promedio semanal)
};

export const INDEMNIZACION = {
  dias_por_año: 30,       // 30 días por año
  tope_años: 11,          // Máximo 11 años
};

export const VACACIONES = {
  dias_anuales: 15,       // 15 días hábiles
  dias_progresivos: 1,    // +1 día por cada 3 años después del 10° año
  tope_progresivos: 5,    // Máximo 5 días adicionales
};

export const PENSION_ALIMENTICIA = {
  tramos: [
    { min: 0, max: 1, porcentaje: 40 },      // 1 hijo: 40%
    { min: 1, max: 4, porcentaje: 30 },      // 2-4 hijos: 30% por hijo
    { min: 4, max: Infinity, porcentaje: 30 }, // 5+ hijos: 30% por hijo
  ],
};

export const IVA = {
  tasa: 19,               // 19%
};

export const BOLETA_HONORARIOS = {
  tasa_base: 10,          // 10% retención base
  tasa_adicional: 5.25,   // 5.25% adicional (total 15.25%)
  tasa_total: 15.25,      // 15.25% total
  exento_minimo: 10,      // Exento hasta 10 UTM mensuales
};

export const TOPE_IMPOSITIVO = {
  afp_salud: 141.8,       // UF
  seguro_cesantia: 117.2, // UF
  gratificacion: 90,      // UF
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

// ===========================================
// UTA (Unidad Tributaria Anual)
// ===========================================
// UTA = 12 x UTM
export const UTA_2026 = UTM.valor * 12; // ~$847.056 con UTM mayo 2026

// ===========================================
// Subsidio Habitacional DS49 / DS01
// ===========================================
export const SUBSIDIO_HABITACIONAL = {
  ds49: {
    montoMaximoUF: 450, // Valor aproximado en UF
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

// ===========================================
// Subsidio al Agua Potable
// ===========================================
export const SUBSIDIO_AGUA = {
  montoMaximoCLP: 14000, // Aproximado mensual
  porcentajeSubsidio: 0.60, // 60% del consumo
  tramos: [
    { consumoMaximoM3: 15, subsidio: 0.60 },
    { consumoMaximoM3: 25, subsidio: 0.40 },
  ],
};

// ===========================================
// Costo TAG (Telepeaje)
// ===========================================
export const TAG_RUTAS = {
  'santiago-rancagua': {
    categoria1: 3500, // Auto liviano
    categoria2: 5200, // Camión 2 ejes
    categoria3: 7800, // Camión 3+ ejes
  },
  'santiago-valparaiso': {
    categoria1: 4200,
    categoria2: 6300,
    categoria3: 9500,
  },
  'santiago-losandes': {
    categoria1: 3800,
    categoria2: 5700,
    categoria3: 8600,
  },
};

// ===========================================
// Tarifa Eléctrica BT1 (Residencial)
// ===========================================
export const TARIFA_BT1 = {
  cargoFijoCLP: 2800, // Cargo fijo mensual aproximado
  precioEnergiaCLPKWh: 180, // Precio por kWh (promedio)
  tramosConsumo: [
    { maximoKWh: 150, precioCLPKWh: 160 },
    { maximoKWh: 300, precioCLPKWh: 180 },
    { maximoKWh: Infinity, precioCLPKWh: 220 },
  ],
};

// ===========================================
// Bono Bodas de Oro (Ley 21.674)
// ===========================================
export const BONO_BODAS_ORO = {
  montoCLP: 150000, // Monto aproximado
  requisitos: [
    'Tener 65 años o más',
    'Estar casado o en unión civil',
    'Pertenecer al 80% de menores ingresos',
  ],
};

// ===========================================
// PGU (Pensión Garantizada Universal)
// ===========================================
export const PGU_2026 = {
  // Reforma previsional: montos diferenciados por edad
  montoMaximo65a81CLP: 231732,   // 65-81 años (feb 2026)
  montoMaximo82MasCLP: 250275,   // 82+ años (feb 2026)
  edadMinima: 65,
  tramos: [
    { ingresoMaximoCLP: 789139, pguCompleta: true },    // Pensión base hasta $789.139
    { ingresoMaximoCLP: 1252602, pguCompleta: false },  // $789.139 - $1.252.602 (variable)
  ],
};

// ===========================================
// Asignación Familiar
// ===========================================
export const ASIGNACION_FAMILIAR_2026 = {
  // Ley 21.751: Reducido de 5 a 3 tramos desde enero 2026
  tramoA: { ingresoMaximoCLP: 631976, montoPorCargaCLP: 22007 },   // Hasta $631.976
  tramoB: { ingresoMaximoCLP: 923067, montoPorCargaCLP: 13505 },   // $631.977 - $923.067
  tramoC: { ingresoMaximoCLP: 1439668, montoPorCargaCLP: 4267 },   // $923.068 - $1.439.668
};

// ===========================================
// Impuesto Segunda Categoría 2026
// ===========================================
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

// ===========================================
// Aguinaldo
// ===========================================
export const AGUINALDO_2026 = {
  fiestas_patrias: 35000,  // Monto para aguinaldo de Fiestas Patrias
  navidad: 35000,          // Monto para aguinaldo de Navidad
  escolar: 20000,          // Monto para aguinaldo escolar
};
