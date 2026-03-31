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

export const UF = {
  valor: 39841.72,        // Valor UF 31/03/2026 (Fuente: BCentral)
  fecha_actualizacion: '2026-03-31',
};

export const UTM = {
  valor: 69889,           // Valor UTM marzo 2026 (Fuente: BCentral)
  mes: 'marzo',
  año: 2026,
};

export const DOLAR = {
  observado: 931.57,      // Dólar observado 30/03/2026 (Fuente: BCentral)
  venta: 960,             // Dólar venta (estimado)
  fecha_actualizacion: '2026-03-31',
};

export const AFP = {
  capital: { nombre: 'Capital', comision: 1.44, sis: 1.15 },
  cuprum: { nombre: 'Cuprum', comision: 1.44, sis: 1.15 },
  habitat: { nombre: 'Habitat', comision: 1.27, sis: 1.15 },
  modelo: { nombre: 'Modelo', comision: 0.58, sis: 1.15 },
  planvital: { nombre: 'PlanVital', comision: 1.16, sis: 1.15 },
  provida: { nombre: 'ProVida', comision: 1.45, sis: 1.15 },
  uno: { nombre: 'Uno', comision: 0.49, sis: 1.15 },
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
    { min: 0, max: 2, porcentaje: 40 },      // 1-2 hijos: 40%
    { min: 2, max: 4, porcentaje: 45 },      // 3-4 hijos: 45%
    { min: 4, max: Infinity, porcentaje: 50 }, // 5+ hijos: 50%
  ],
  minimo_por_hijo: 10000,  // Mínimo $10.000 por hijo
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
