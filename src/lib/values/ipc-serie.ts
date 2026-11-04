// ============================================
// Serie oficial del IPC — INE, base anual 2023=100
// ----------------------------------------------
// Índice general mensual verificado en la Base de
// Datos Estadísticos del Banco Central de Chile
// (serie IPC_G_2023) y en el Boletín Estadístico
// INE N° 335 (08-10-2026, IPC de septiembre 2026).
//
// Actualización: cuando el INE publique el boletín
// mensual, agregar el mes nuevo a IPC_SERIE_2023 y
// mover IPC_ULTIMO_MES / IPC_FECHA_PUBLICACION.
// ============================================

/**
 * IPC índice general mensual, base anual 2023 = 100.
 * Clave 'YYYY-MM'. La serie parte en diciembre 2023,
 * mes base de empalme de la serie anterior.
 */
export const IPC_SERIE_2023: Record<string, number> = {
  '2023-12': 101.04,
  '2024-01': 101.72,
  '2024-02': 102.32,
  '2024-03': 102.70,
  '2024-04': 103.24,
  '2024-05': 103.52,
  '2024-06': 103.42,
  '2024-07': 104.19,
  '2024-08': 104.45,
  '2024-09': 104.54,
  '2024-10': 105.56,
  '2024-11': 105.83,
  '2024-12': 105.62,
  '2025-01': 106.74,
  '2025-02': 107.16,
  '2025-03': 107.70,
  '2025-04': 107.91,
  '2025-05': 108.12,
  '2025-06': 107.68,
  '2025-07': 108.62,
  '2025-08': 108.66,
  '2025-09': 109.14,
  '2025-10': 109.19,
  '2025-11': 109.47,
  '2025-12': 109.26,
  '2026-01': 109.71,
  '2026-02': 109.70,
  '2026-03': 110.75,
  '2026-04': 112.18,
  '2026-05': 112.37,
  '2026-06': 112.35,
  '2026-07': 112.45,
  '2026-08': 113.15,
  '2026-09': 113.59,
};

/** Último mes publicado por el INE en la serie. */
export const IPC_ULTIMO_MES = '2026-09';

/** Fecha ISO del boletín que publicó `IPC_ULTIMO_MES`. */
export const IPC_FECHA_PUBLICACION = '2026-10-08';

/** Calculadora oficial del IPC del INE. */
export const IPC_FUENTE_URL = 'https://calculadoraipc.ine.cl/';

/** Metodología oficial INE: uso de la calculadora del IPC. */
export const IPC_METODOLOGIA_URL =
  'https://www.ine.gob.cl/docs/default-source/%C3%ADndice-de-precios-al-consumidor/metodologias/base-anual-2023-100/5---uso-calculadora-ipc.pdf';

const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

/** '2026-09' → 'Septiembre 2026' (sin zonas horarias). */
function etiquetaPeriodo(mes: string): string {
  const [anio, m] = mes.split('-');
  const nombre = MESES[Number(m) - 1];
  return `${nombre.charAt(0).toUpperCase()}${nombre.slice(1)} ${anio}`;
}

export interface IpcPeriodo {
  /** 'YYYY-MM', clave de `IPC_SERIE_2023`. */
  value: string;
  /** 'Mes AAAA', p. ej. 'Septiembre 2026'. */
  label: string;
}

/** Períodos disponibles en la serie, ordenados, para selects de la UI. */
export const IPC_PERIODOS: IpcPeriodo[] = Object.keys(IPC_SERIE_2023)
  .sort()
  .map((value) => ({ value, label: etiquetaPeriodo(value) }));

export interface VariacionIpcMeses {
  /** Índice INE del mes inicial. */
  indiceInicial: number;
  /** Índice INE del mes final. */
  indiceFinal: number;
  /** indiceFinal / indiceInicial. */
  factor: number;
  /** (factor - 1) × 100, sin redondear. */
  variacionExactaPct: number;
  /** Variación a 1 decimal, convención de publicación del INE. */
  variacionRedondeadaPct: number;
}

/**
 * Índice del mes o `undefined` si no está en la serie.
 * Usa hasOwnProperty: claves como '__proto__' o 'toString'
 * no son meses válidos aunque el acceso devuelva un valor.
 */
export function ipcIndiceMes(mes: string): number | undefined {
  return Object.prototype.hasOwnProperty.call(IPC_SERIE_2023, mes)
    ? IPC_SERIE_2023[mes]
    : undefined;
}

/**
 * Variación del IPC entre dos meses de la serie oficial INE.
 * Lanza error si alguno de los meses no existe en la serie.
 */
export function variacionIpcEntreMeses(
  mesInicial: string,
  mesFinal: string,
): VariacionIpcMeses {
  const indiceInicial = ipcIndiceMes(mesInicial);
  const indiceFinal = ipcIndiceMes(mesFinal);
  if (indiceInicial === undefined || indiceFinal === undefined) {
    throw new Error(
      `Período fuera de la serie IPC INE (base 2023=100): '${mesInicial}' → '${mesFinal}'. ` +
        `Rango disponible: ${IPC_PERIODOS[0].value} → ${IPC_ULTIMO_MES}.`,
    );
  }
  const factor = indiceFinal / indiceInicial;
  return {
    indiceInicial,
    indiceFinal,
    factor,
    variacionExactaPct: (factor - 1) * 100,
    variacionRedondeadaPct: Math.round(((indiceFinal / indiceInicial) - 1) * 1000) / 10,
  };
}
