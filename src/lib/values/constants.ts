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
import tmcSnapshot from './tmc-snapshot.json';

export const INGRESO_MINIMO = {
  mensual: 553553, // Ingreso mínimo mensual (desde 01/05/2026, Ley 21.830)
  menor_18_mayor_65: 412938, // Menores de 18 y mayores de 65
  no_remuneracional: 356815, // Fines no remuneracionales
  jornal: 27678, // 553553 / 20 días
  hora: 3690, // 553553 / 150 horas
  zona_extrema: 586766, // Magallanes, Aysén (106% del nacional)
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

/**
 * Paridad EUR/CLP (Euro observado).
 *
 * El snapshot diario incluye el valor desde mindicador.cl/euro y/o
 * la serie del Banco Central F072.CLP.EUR.N.O.D. Si por alguna razón
 * el snapshot no tiene EUR (versiones previas), se deriva del dólar
 * con un premium histórico de ~1.08 como respaldo.
 */
const EUR_PREMIUM_VS_USD_FALLBACK = 1.08;
const snapshotEuro = (snapshot as { euro?: number }).euro;

export const EURO = {
  valor:
    typeof snapshotEuro === 'number' && snapshotEuro > 0
      ? snapshotEuro
      : Math.round(snapshot.dolarObservado * EUR_PREMIUM_VS_USD_FALLBACK * 100) / 100,
  fecha_actualizacion: snapshot.asOf.split('T')[0],
};

// ============================================
// Constantes regulatorias (manuales)
// ============================================

export const AFP = {
  // SIS 1,62% desde remuneraciones de abril 2026 (Oficio Ord. N° 7429 SP
  // del 14-abr-2026, Superintendencia de Pensiones). Antes 1,15%.
  capital: { nombre: 'Capital', comision: 1.44, sis: 1.62 },
  cuprum: { nombre: 'Cuprum', comision: 1.44, sis: 1.62 },
  habitat: { nombre: 'Habitat', comision: 1.27, sis: 1.62 },
  modelo: { nombre: 'Modelo', comision: 0.58, sis: 1.62 },
  planvital: { nombre: 'PlanVital', comision: 1.16, sis: 1.62 },
  provida: { nombre: 'ProVida', comision: 1.45, sis: 1.62 },
  uno: { nombre: 'Uno', comision: 0.46, sis: 1.62 },
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
   * Tope imponible AFP/Salud 2026: 90 UF mensuales.
   * Fuente: Superintendencia de Pensiones, Res. Exenta 237 (feb 2026).
   * (Antes de la reforma este tope era 87,8 UF; en 2025 era 84,3 UF.
   * En enero 2026 fue 89,9 UF; desde el 1 de febrero 2026 es 90 UF.)
   * Se ajusta anualmente por la variación real de las remuneraciones.
   */
  tope_imponible: 90,
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
  /** Tope imponible cesantía 2026: 135,2 UF desde feb 2026
   * (Res. Exenta N° 236 del 10-02-2026, Superintendencia de Pensiones).
   * Histórico: 135,1 UF (ene 2026) → 135,2 UF (desde feb 2026). */
  tope_imponible: 135.2,
};

/**
 * Tasa de cotización al nuevo Seguro Social Previsional creado por la
 * Ley 21.735 (reforma de pensiones). El empleador aporta un porcentaje
 * adicional sobre la base imponible que se incrementa gradualmente
 * cada 1° de agosto desde 2025 hasta 2033.
 *
 * Fuente: WTW / Superintendencia de Pensiones.
 *
 * Para evitar tener que actualizar manualmente la tasa cada agosto,
 * el código debe llamar siempre a `getSeguroSocialPrevisionalVigente()`
 * (definido más abajo en este archivo). El alias `tasaVigente2026` se
 * mantiene **solo** por compatibilidad con código que aún consulta
 * directamente el valor — apunta dinámicamente a la tasa vigente
 * según la fecha del sistema, así también se actualiza solo.
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
  /**
   * Tasa vigente — alias dinámico que apunta al primer escalón del
   * calendario que está en vigor a la fecha actual. Antes era
   * `tasaVigente2026: 1.0` (constante, requería actualización manual
   * cada agosto). Ahora se calcula con `getSeguroSocialPrevisionalVigente()`,
   * que también es la fuente preferida para nuevo código.
   *
   * @deprecated Usa `getSeguroSocialPrevisionalVigente(fecha)`.
   */
  get tasaVigente2026(): number {
    return getSeguroSocialPrevisionalVigente();
  },
};

/**
 * Devuelve la tasa de aporte del Seguro Social Previsional (Ley 21.735)
 * vigente en la fecha indicada.
 *
 * El calendario sube cada 1° de agosto desde 2025 hasta 2033. Si la
 * fecha es anterior a 2025-08-01, retorna 0 (la tasa entra en vigor
 * con el primer escalón). Si la fecha es posterior a 2033-08-01,
 * retorna la tasa máxima (7,0%).
 *
 * @param fecha Fecha para la cual obtener la tasa. Default: ahora.
 * @returns Tasa porcentual (1.0 = 1%, 1.75 = 1,75%).
 *
 * @example
 *   getSeguroSocialPrevisionalVigente(new Date('2026-07-31'))  // 1.0
 *   getSeguroSocialPrevisionalVigente(new Date('2026-08-01'))  // 1.75
 *   getSeguroSocialPrevisionalVigente(new Date('2034-01-01'))  // 7.0
 */
export function getSeguroSocialPrevisionalVigente(
  fecha: Date = new Date(),
): number {
  const t = fecha.getTime();

  // El calendario está ordenado cronológicamente. Buscamos el último
  // escalón cuyo `vigenteDesde` sea <= a la fecha solicitada.
  let tasa = 0;
  for (const escalon of SEGURO_SOCIAL_PREVISIONAL.calendario) {
    if (new Date(escalon.vigenteDesde).getTime() <= t) {
      tasa = escalon.tasa;
    } else {
      break;
    }
  }
  return tasa;
}

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
  afp_salud: 90, // UF — 2026 (Superintendencia de Pensiones, Res. 237)
  seguro_cesantia: 135.2, // UF — 2026 (Res. Exenta N° 236, 10-02-2026)
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
 * valor varía por tipo de operación, plazo y monto.
 *
 * Fuente: CMF (cmfchile.cl), publicación mensual en el Diario Oficial.
 *
 * El snapshot `tmc-snapshot.json` se actualiza por el GitHub Action
 * (best-effort scraping del portal CMF). Si la CMF cambia el formato
 * del HTML, el último snapshot válido se mantiene como fallback.
 */
const tmcTramos = (tmcSnapshot as { tramos?: Record<string, number> }).tramos ?? {};

export const TMC_VIGENTE = {
  /** > 5.000 UF, plazo > 90 días. */
  no_reajustables_mayor_5000uf:
    tmcTramos.no_reajustables_mayor_5000uf_mayor_90d ?? 6.5,
  /** > 200 UF y ≤ 5.000 UF, plazo > 90 días — referencia hipotecaria/consumo. */
  no_reajustables_mayor_200uf:
    tmcTramos.no_reajustables_mayor_200uf_menor_5000uf_mayor_90d ?? 9.5,
  /** 50 - 200 UF, plazo > 90 días. */
  no_reajustables_50_200uf:
    tmcTramos.no_reajustables_50_200uf_mayor_90d ?? 22.5,
  /** ≤ 50 UF, plazo > 90 días — créditos de menor monto. */
  no_reajustables_menor_50uf:
    tmcTramos.no_reajustables_menor_50uf_mayor_90d ?? 38.4,
  /** Reajustables UF, plazo > 1 año. */
  reajustables_uf_mayor_1_anio: tmcTramos.reajustables_uf_mayor_1_anio ?? 5.2,
  /** Reajustables UF, plazo < 1 año. */
  reajustables_uf_menor_1_anio: tmcTramos.reajustables_uf_menor_1_anio ?? 4.8,
  asOf: tmcSnapshot.asOf,
  vigenteDesde: tmcSnapshot.vigenteDesde,
  fuente: tmcSnapshot.fuente,
};

/**
 * Alias por compatibilidad: el código existente importa `TMC_2026_MAYO`.
 * Apunta al snapshot mensual vigente (no es necesariamente mayo 2026,
 * pero conservamos el nombre para no romper imports). Los nuevos
 * usos deben preferir `TMC_VIGENTE`.
 */
export const TMC_2026_MAYO = {
  no_reajustables_mayor_200uf: TMC_VIGENTE.no_reajustables_mayor_200uf,
  no_reajustables_50_200uf: TMC_VIGENTE.no_reajustables_50_200uf,
  reajustables_uf_mayor_1_anio: TMC_VIGENTE.reajustables_uf_mayor_1_anio,
  fuente: TMC_VIGENTE.fuente,
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
 * Permiso de circulación.
 *
 * Base legal: Ley 17.235 (Impuesto Territorial), DFL 1 (Ley de
 * Tránsito) y la **Tabla de Tasación de Vehículos** que el SII
 * publica anualmente (Resolución Exenta).
 *
 * El cálculo real es:
 *   permiso = tasacion_SII × tasa_progresiva (según tramos en UTM)
 *
 * Los tramos cambian todos los años. `PERMISO_CIRCULACION_TABLA_SII`
 * mantiene un calendario por año fiscal; `PERMISO_CIRCULACION` apunta
 * al año vigente (alias por compatibilidad con código existente).
 */
export const PERMISO_CIRCULACION_TABLA_SII = {
  /**
   * Tabla SII vigente por año (publicación anual del SII /
   * Tesorería). Si un año no está cargado, se usa el último
   * disponible como fallback.
   */
  2025: {
    fuente: 'SII Resolución Exenta N°6/2025 (Tabla anual de tasación)',
    tramos_utm: [
      { hasta_utm: 60, tasa: 1.0 },
      { hasta_utm: 120, tasa: 2.0 },
      { hasta_utm: 250, tasa: 3.0 },
      { hasta_utm: 400, tasa: 4.0 },
      { hasta_utm: Infinity, tasa: 4.5 },
    ],
    descuento_antiguedad_anios: 20,
    descuento_antiguedad_porcentaje: 50,
  },
  2026: {
    fuente: 'SII Resolución Exenta N°5/2026 (Tabla anual de tasación)',
    tramos_utm: [
      { hasta_utm: 60, tasa: 1.0 },
      { hasta_utm: 120, tasa: 2.0 },
      { hasta_utm: 250, tasa: 3.0 },
      { hasta_utm: 400, tasa: 4.0 },
      { hasta_utm: Infinity, tasa: 4.5 },
    ],
    descuento_antiguedad_anios: 20,
    descuento_antiguedad_porcentaje: 50,
  },
} as const;

/** Año fiscal vigente para el permiso de circulación. */
export const PERMISO_CIRCULACION_ANIO_VIGENTE = 2026;

/**
 * Permiso de circulación vigente (alias).
 *
 * Apunta al año fiscal definido en `PERMISO_CIRCULACION_ANIO_VIGENTE`.
 * Cuando el SII publique la tabla del próximo año, se agrega al
 * objeto `PERMISO_CIRCULACION_TABLA_SII` y se incrementa el año
 * vigente — sin tocar las calculadoras.
 */
export const PERMISO_CIRCULACION = (() => {
  const tabla = PERMISO_CIRCULACION_TABLA_SII as Record<
    number,
    {
      fuente: string;
      tramos_utm: ReadonlyArray<{ hasta_utm: number; tasa: number }>;
      descuento_antiguedad_anios: number;
      descuento_antiguedad_porcentaje: number;
    }
  >;
  const anio = PERMISO_CIRCULACION_ANIO_VIGENTE;
  const vigente =
    tabla[anio] ??
    tabla[Math.max(...Object.keys(tabla).map(Number).filter((n) => n <= anio))];
  return {
    tramos_utm: vigente.tramos_utm,
    descuento_antiguedad_anios: vigente.descuento_antiguedad_anios,
    descuento_antiguedad_porcentaje: vigente.descuento_antiguedad_porcentaje,
    anio_vigente: anio,
    fuente: vigente.fuente,
  };
})();

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


// ============================================
// Tasa AFP obligatoria (10%)
// ----------------------------------------------
// Cotización obligatoria a la cuenta individual
// del trabajador (D.L. 3500 Art. 17). Es la
// misma para dependientes e independientes y se
// suma a la comisión variable de cada AFP.
//
// Centralizada aquí para evitar el "10" mágico
// repetido en sueldo-liquido, costo-empleado,
// cotizacion-independientes y horas-extra.
// ============================================
export const AFP_OBLIGATORIA_PCT = 10;

// ============================================
// Conversión semanas → mes (4.33)
// ----------------------------------------------
// 52 semanas / 12 meses = 4,333... Se usa para
// derivar horas mensuales a partir de jornada
// semanal en horas-extra y otros cálculos
// laborales.
// ============================================
export const SEMANAS_POR_MES = 4.33;

// ============================================
// Distribución de la retención de honorarios
// (Ley 21.578 — calendario por año)
// ----------------------------------------------
// La retención total se descompone en:
//   - Impuesto a la renta (PPM)
//   - AFP (escalonado)
//   - Salud 7%
//   - Seguro de Invalidez y Sobrevivencia
//   - Seguro de Accidentes del Trabajo
//
// La suma de los componentes debe igualar la
// tasa total del año correspondiente. Estos
// porcentajes los publica la Subsecretaría de
// Previsión Social cada año.
//
// Fuente: Subsecretaría de Previsión Social,
//   "Calendario Ley 21.133/21.578 cotizaciones
//   independientes 2025-2028".
// ============================================
export const RETENCION_HONORARIOS_DISTRIBUCION = {
  2025: {
    total: 14.5,
    impuesto_renta: 10.0,
    afp: 0.5,
    salud: 1.75,
    sis: 1.52,
    accidentes_trabajo: 0.73,
  },
  2026: {
    total: 15.25,
    impuesto_renta: 10.0,
    afp: 0.62,
    salud: 2.18,
    sis: 1.52,
    accidentes_trabajo: 0.93,
  },
  2027: {
    total: 16.0,
    impuesto_renta: 10.0,
    afp: 0.74,
    salud: 2.61,
    sis: 1.52,
    accidentes_trabajo: 1.13,
  },
  2028: {
    total: 17.0,
    impuesto_renta: 10.0,
    afp: 0.86,
    salud: 3.05,
    sis: 1.52,
    accidentes_trabajo: 1.57,
  },
} as const;

export type AnioRetencionHonorarios =
  keyof typeof RETENCION_HONORARIOS_DISTRIBUCION;

// ============================================
// Aranceles notariales (DFL 292/1931)
// ----------------------------------------------
// Tarifas referenciales para el cálculo del costo
// de escritura pública según tipo de trámite. Los
// notarios fijan rangos dentro del DFL 292; estos
// valores son promedios de mercado 2026.
//
// Mínimos y máximos en CLP, tasas en porcentaje
// sobre el valor de la operación.
// ============================================
export const ARANCEL_NOTARIOS = {
  /** Mínimo absoluto a cobrar por escritura. */
  costo_minimo_clp: 50000,
  /** Máximo absoluto (corte para escrituras grandes). */
  costo_maximo_clp: 2000000,
  /** Mínimo específico para mutuos hipotecarios. */
  hipoteca_minimo_clp: 100000,
  /** Mínimo específico para escrituras de donación. */
  donacion_minimo_clp: 100000,
  /** Derechos del Conservador de Bienes Raíces (mínimo). */
  derechos_registrales_minimo_clp: 30000,
  /** Tasa de derechos registrales (% sobre el valor). */
  derechos_registrales_tasa: 0.2,
  /** Recargo por copias autorizadas / trámites adicionales. */
  recargo_notaria_adicional: 15,
  /**
   * Tasas progresivas para escritura de compraventa
   * de inmuebles (% sobre el valor según tramos en CLP).
   */
  compraventa_tramos: [
    { hasta_clp: 500_000_000, tasa: 0.5 },
    { hasta_clp: 1_000_000_000, tasa: 0.3 },
    { hasta_clp: Infinity, tasa: 0.2 },
  ],
  /** Tasa para mutuos hipotecarios (% sobre el monto). */
  hipoteca_tasa: 0.3,
  /** Tasa para escrituras de donación (% sobre el valor). */
  donacion_tasa: 0.4,
  /** Testamentos: tarifa fija en UTM. */
  testamento_utm: 2,
  /**
   * Impuesto de Timbres y Estampillas para mutuos
   * hipotecarios (DL 3475 Art. 1 N°3): 0,066% mensual,
   * tope 0,8% anual. La compraventa de inmuebles está
   * EXENTA (Art. 24 N°6).
   */
  timbres_hipoteca_anual: 0.8,
} as const;

// ============================================
// Contribuciones de bienes raíces
// (Ley 17.235 — Impuesto Territorial)
// ----------------------------------------------
// El SII fija las tasas anuales según destino.
// Las propiedades habitacionales tienen un
// descuento de 0,025 puntos sobre la tasa, y
// quedan exentas si el avalúo no supera 225,96
// UTM (Art. 2° bis DL 3063).
//
// Los semestres de pago son abril y septiembre.
// ============================================
export const CONTRIBUCIONES_BIENES_RAICES = {
  tasas_anuales: {
    habitacional: 0.93,
    comercial: 1.2,
    industrial: 1.2,
    sitio_eriado: 2.0,
    agrario: 0.5,
  },
  /** Descuento (en puntos porcentuales) para uso habitacional. */
  descuento_habitacional: 0.025,
  /** Exención habitacional (avalúo ≤ 225,96 UTM). */
  exencion_habitacional_utm: 225.96,
} as const;

// ============================================
// Tarifas TAG urbano (Santiago)
// ----------------------------------------------
// Promedio horario punta + valle para autopistas
// urbanas (Costanera Norte, Vespucio, Autopista
// del Sol, Acceso Sur). Por categoría de vehículo
// (1 auto/moto, 2 camioneta, 3 camión).
// Fuente: tarifarios públicos de las concesionarias.
// ============================================
export const TAG_URBANO_SANTIAGO = {
  categoria1: 1200,
  categoria2: 1800,
  categoria3: 2700,
} as const;

// ============================================
// Permiso de circulación: descuentos por tipo
// ----------------------------------------------
// La tabla SII fija una sola progresión en UTM.
// La práctica administrativa es aplicar 50% de
// rebaja a motocicletas y taxis (vehículos con
// uso especializado y/o tasación reducida).
// ============================================
export const PERMISO_CIRCULACION_DESCUENTOS_VEHICULO = {
  motocicleta: 0.5,
  taxi: 0.5,
  automovil: 1.0,
  camion: 1.0,
  bus: 1.0,
  carga: 1.0,
} as const;

// ============================================
// PPM — Presunción de gastos profesionales
// (Art. 50 inciso 3° LIR)
// ----------------------------------------------
// Cuando el profesional 2da categoría no declara
// gastos efectivos, puede deducir el 30% de sus
// ingresos como presunción, con tope de 15 UTA
// anuales.
// ============================================
export const PPM_PRESUNCION = {
  /** Porcentaje de presunción de gastos (Art. 50 LIR). */
  porcentaje: 30,
  /** Tope anual de la presunción en UTA. */
  tope_uta: 15,
} as const;

// ============================================
// Crédito automotriz — gastos asociados
// ----------------------------------------------
// Gastos operacionales típicos (comisiones,
// inscripción, seguros obligatorios) usados para
// estimar la CAE simple cuando el usuario no
// entrega un valor explícito. Referencial.
// ============================================
export const CREDITO_AUTOMOTRIZ = {
  /** Default % gastos asociados sobre el monto del crédito. */
  gastos_asociados_default: 2,
} as const;

// ============================================
// Subsidio habitacional — DS19 + ahorro mínimo
// ----------------------------------------------
// Complementa SUBSIDIO_HABITACIONAL (DS49 / DS01)
// con DS19 (Integración Social y Territorial,
// MINVU) y los montos de ahorro mínimo legales
// para postular a cada DS y tramo.
//
// Los ahorros son fijos por decreto (NO derivados
// del ingreso, como asumía la versión anterior).
// ============================================
export const SUBSIDIO_HABITACIONAL_DS19 = {
  monto_max_propiedad_uf: 2200,
  tramos: {
    tramo1: { ingresoMaximoUF: 25, subsidioMaximoUF: 800 },
    tramo2: { ingresoMaximoUF: 40, subsidioMaximoUF: 500 },
    tramo3: { ingresoMaximoUF: 60, subsidioMaximoUF: 200 },
  },
} as const;

/**
 * Ahorro mínimo en UF requerido para postular,
 * por tipo de subsidio y tramo. Montos fijos
 * según decreto MINVU (no son % del ingreso).
 *
 *  - DS49 (Fondo Solidario, vivienda nueva): 10 UF
 *  - DS01 tramo 1 (Sectores Medios): 30 UF
 *  - DS01 tramo 2: 50 UF
 *  - DS01 tramo 3: 80 UF
 *  - DS19 tramo 1: 80 UF
 *  - DS19 tramos 2-3: 100 UF
 */
export const SUBSIDIO_HABITACIONAL_AHORRO_MINIMO_UF = {
  ds49: { tramo1: 10, tramo2: 10, tramo3: 10 },
  ds01: { tramo1: 30, tramo2: 50, tramo3: 80 },
  ds19: { tramo1: 80, tramo2: 100, tramo3: 100 },
} as const;
