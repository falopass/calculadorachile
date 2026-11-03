// ============================================
// Feriados nacionales de Chile (fuente única).
// ----------------------------------------------
// E-027: la calculadora de vacaciones y la guía /guias/feriados-chile-2027
// leen esta lista. La guía publica solo los registros `verificado`; la
// calculadora mantiene su comportamiento previo (usa todos).
//
// Cuando gob.cl publique el calendario oficial 2027, re-verificar todas las
// fechas y pasar las `pendiente` a `verificado` (o corregirlas), y luego
// reconstruir el sitio.
// ============================================

export const BCN_LEY_2977 = 'https://www.bcn.cl/leychile/navegar?idNorma=23639';
export const BCN_LEY_19973 = 'https://www.bcn.cl/leychile/navegar?idNorma=230132';
export const BCN_LEY_19668 = 'https://www.bcn.cl/leychile/navegar?idNorma=160270';
export const BCN_LEY_20983 = 'https://www.bcn.cl/leychile/navegar?idNorma=1098384';
export const BCN_LEY_20299 = 'https://www.bcn.cl/leychile/navegar?idNorma=279294';
export const BCN_LEY_21357 = 'https://www.bcn.cl/leychile/navegar?idNorma=1161743';
export const BCN_LEY_20663 = 'https://www.bcn.cl/leychile/navegar?idNorma=1050508';
export const DT_TRASLADO_LUNES = 'https://www.dt.gob.cl/portal/1628/w3-article-60252.html';
export const DT_IRRENUNCIABLES = 'https://www.dt.gob.cl/portal/1628/w3-article-95017.html';
export const GOB_FERIADOS_2026 =
  'https://www.gob.cl/noticias/feriados-2026-revisa-cuantos-habra-y-cuales-son-irrenunciables/';

export type EstadoFeriado = 'verificado' | 'pendiente';

export interface Feriado {
  /** AAAA-MM-DD */
  fecha: string;
  nombre: string;
  /** Norma que lo establece o lo traslada. */
  norma: string;
  url: string;
  /** Irrenunciable para trabajadores del comercio (Ley 19.973, art. 2). */
  irrenunciable: boolean;
  /** `pendiente`: la ley fija la regla pero falta la fecha oficial del año. */
  estado: EstadoFeriado;
}

export interface FeriadoRegional {
  fecha: string;
  territorio: string;
  norma: string;
  url: string;
}

/** 2026: lista que ya usaba la calculadora de vacaciones (gob.cl, Feriados 2026). */
export const FERIADOS_2026: string[] = [
  '2026-01-01',
  '2026-04-03',
  '2026-04-04',
  '2026-05-01',
  '2026-05-21',
  '2026-06-21',
  '2026-06-29',
  '2026-07-16',
  '2026-08-15',
  '2026-09-18',
  '2026-09-19',
  '2026-10-12',
  '2026-10-31',
  '2026-11-01',
  '2026-12-08',
  '2026-12-25',
];

export const FERIADOS_2027: Feriado[] = [
  { fecha: '2027-01-01', nombre: 'Año Nuevo', norma: 'Ley 2.977', url: BCN_LEY_2977, irrenunciable: true, estado: 'verificado' },
  // Pascua 28-03-2027: la ley fija la regla, falta el calendario oficial 2027.
  { fecha: '2027-03-26', nombre: 'Viernes Santo', norma: 'Ley 2.977', url: BCN_LEY_2977, irrenunciable: false, estado: 'pendiente' },
  { fecha: '2027-03-27', nombre: 'Sábado Santo', norma: 'Ley 2.977', url: BCN_LEY_2977, irrenunciable: false, estado: 'pendiente' },
  { fecha: '2027-05-01', nombre: 'Día Nacional del Trabajo', norma: 'Ley 19.973', url: BCN_LEY_19973, irrenunciable: true, estado: 'verificado' },
  { fecha: '2027-05-21', nombre: 'Día de las Glorias Navales', norma: 'Ley 2.977', url: BCN_LEY_2977, irrenunciable: false, estado: 'verificado' },
  // Día del solsticio de invierno: SHOA aún no publica 2027.
  { fecha: '2027-06-21', nombre: 'Día Nacional de los Pueblos Indígenas', norma: 'Ley 21.357', url: BCN_LEY_21357, irrenunciable: false, estado: 'pendiente' },
  { fecha: '2027-06-28', nombre: 'San Pedro y San Pablo (se traslada del martes 29)', norma: 'Ley 19.668', url: BCN_LEY_19668, irrenunciable: false, estado: 'verificado' },
  { fecha: '2027-07-16', nombre: 'Virgen del Carmen', norma: 'Ley 20.148', url: DT_TRASLADO_LUNES, irrenunciable: false, estado: 'verificado' },
  { fecha: '2027-08-15', nombre: 'Asunción de la Virgen', norma: 'Ley 2.977', url: BCN_LEY_2977, irrenunciable: false, estado: 'verificado' },
  { fecha: '2027-09-17', nombre: 'Feriado adicional de Fiestas Patrias', norma: 'Ley 20.983', url: BCN_LEY_20983, irrenunciable: false, estado: 'verificado' },
  { fecha: '2027-09-18', nombre: 'Independencia Nacional', norma: 'Ley 2.977', url: BCN_LEY_2977, irrenunciable: true, estado: 'verificado' },
  { fecha: '2027-09-19', nombre: 'Día de las Glorias del Ejército', norma: 'Ley 2.977', url: BCN_LEY_2977, irrenunciable: true, estado: 'verificado' },
  { fecha: '2027-10-11', nombre: 'Encuentro de Dos Mundos (se traslada del martes 12)', norma: 'Ley 19.668', url: BCN_LEY_19668, irrenunciable: false, estado: 'verificado' },
  { fecha: '2027-10-31', nombre: 'Día de las Iglesias Evangélicas y Protestantes', norma: 'Ley 20.299', url: BCN_LEY_20299, irrenunciable: false, estado: 'verificado' },
  { fecha: '2027-11-01', nombre: 'Día de Todos los Santos', norma: 'Ley 2.977', url: BCN_LEY_2977, irrenunciable: false, estado: 'verificado' },
  { fecha: '2027-12-08', nombre: 'Inmaculada Concepción', norma: 'Ley 2.977', url: BCN_LEY_2977, irrenunciable: false, estado: 'verificado' },
  { fecha: '2027-12-25', nombre: 'Navidad', norma: 'Ley 2.977', url: BCN_LEY_2977, irrenunciable: true, estado: 'verificado' },
];

export const FERIADOS_REGIONALES_2027: FeriadoRegional[] = [
  { fecha: '2027-06-07', territorio: 'Región de Arica y Parinacota', norma: 'Ley 20.663', url: BCN_LEY_20663 },
  { fecha: '2027-08-20', territorio: 'comunas de Chillán y Chillán Viejo', norma: 'Ley 20.768', url: GOB_FERIADOS_2026 },
];

/**
 * Días que la calculadora de vacaciones trata como inhábiles. Incluye las
 * fechas `pendiente` para no cambiar el cálculo existente.
 */
export const FERIADOS_NACIONALES_CALCULO: ReadonlySet<string> = new Set([
  ...FERIADOS_2026,
  ...FERIADOS_2027.map((f) => f.fecha),
]);

/** Solo los feriados con fecha verificada (los que se publican). */
export function feriadosPublicables(lista: Feriado[] = FERIADOS_2027): Feriado[] {
  return lista.filter((f) => f.estado === 'verificado');
}

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function utc(fecha: string): Date {
  return new Date(`${fecha}T00:00:00Z`);
}

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function diaSemana(fecha: string): string {
  return DIAS[utc(fecha).getUTCDay()];
}

/** '2027-09-17' → '17 de septiembre'. */
export function fechaLarga(fecha: string): string {
  const d = utc(fecha);
  return `${d.getUTCDate()} de ${MESES[d.getUTCMonth()]}`;
}

export interface FinDeSemanaLargo {
  desde: string;
  hasta: string;
  dias: number;
  feriados: Feriado[];
}

/**
 * Fines de semana largos: tramos de 3 o más días seguidos sin trabajo
 * (sábado, domingo o feriado de la lista) que incluyen al menos un feriado.
 */
export function finesDeSemanaLargos(lista: Feriado[]): FinDeSemanaLargo[] {
  const porFecha = new Map(lista.map((f) => [f.fecha, f]));
  const libre = (d: Date) => {
    const dow = d.getUTCDay();
    return dow === 0 || dow === 6 || porFecha.has(iso(d));
  };
  const vistos = new Set<string>();
  const out: FinDeSemanaLargo[] = [];
  for (const f of [...lista].sort((a, b) => a.fecha.localeCompare(b.fecha))) {
    if (vistos.has(f.fecha)) continue;
    const ini = utc(f.fecha);
    while (libre(new Date(ini.getTime() - 86_400_000))) ini.setTime(ini.getTime() - 86_400_000);
    const fin = utc(f.fecha);
    while (libre(new Date(fin.getTime() + 86_400_000))) fin.setTime(fin.getTime() + 86_400_000);
    const dias = Math.round((fin.getTime() - ini.getTime()) / 86_400_000) + 1;
    const tramo: Feriado[] = [];
    for (let d = new Date(ini); d <= fin; d = new Date(d.getTime() + 86_400_000)) {
      const k = iso(d);
      vistos.add(k);
      const fer = porFecha.get(k);
      if (fer) tramo.push(fer);
    }
    if (dias >= 3) out.push({ desde: iso(ini), hasta: iso(fin), dias, feriados: tramo });
  }
  return out;
}
