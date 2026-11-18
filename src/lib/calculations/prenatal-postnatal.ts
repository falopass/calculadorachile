// ============================================
// Prenatal, postnatal y postnatal parental — fechas y subsidio
// Base legal: Código del Trabajo arts. 195, 196, 197 bis y 201
// (LeyChile idNorma 207436). Postnatal desde el día del parto
// y prenatal desde la 6ª semana antes de la fecha probable
// (SUSESO, Compendio de licencias médicas).
// ============================================

import type { CalculatorResult } from '@/types/calculator';
import { CALENDARIO_INGRESO_MINIMO, type TramoIngresoMinimo } from '@/lib/values/constants';

export const DIAS_PRENATAL = 42;
export const DIAS_POSTNATAL = 84;
export const DIAS_POSTNATAL_PREMATURO = 126;
export const DIAS_EXTRA_POR_HIJO = 7;
export const DIAS_PARENTAL_COMPLETA = 84;
export const DIAS_PARENTAL_MEDIA = 126;
export const DIAS_AVISO_MEDIA_JORNADA = 30;

const DIA_MS = 86_400_000;
const DFL_44_URL = 'https://www.bcn.cl/leychile/navegar?idNorma=4252';

interface SubsidioMaternalInput {
  /** Promedio mensual neto de los tres meses con ingresos más próximos. */
  promedioReciente: number;
  /** Promedio mensual neto del período del tope; cero si no hubo ingresos. */
  promedioHistorico: number;
  /** Variación acumulada en puntos porcentuales (p. ej. 4,2 para 4,2%). */
  ipcAcumulado: number;
}

interface SubsidioMaternalResult {
  diarioInicial: number;
  prenatal: number;
  postnatal: number;
  parental: number;
  total: number;
}

type CalendarioMinimo = readonly Pick<TramoIngresoMinimo, 'vigente_desde' | 'no_remuneracional'>[];

export interface PrenatalPostnatalInput {
  /** Fecha probable de parto (AAAA-MM-DD). */
  fechaProbableParto: string;
  /** Fecha real del parto si ya ocurrió (AAAA-MM-DD). */
  fechaParto?: string;
  /** Parto antes de iniciada la semana 33 o bebé de menos de 1.500 g. */
  prematuroOBajoPeso?: boolean;
  /** Número de hijos nacidos en el parto. */
  numeroHijos?: number;
  /** Postnatal parental a media jornada (18 semanas). */
  mediaJornada?: boolean;
  subsidio?: SubsidioMaternalInput;
}

export interface PrenatalPostnatalResult {
  partoReal: boolean;
  inicioPrenatal: string;
  finPrenatal: string | null;
  diasPrenatal: number;
  inicioPostnatal: string;
  finPostnatal: string;
  diasPostnatal: number;
  inicioParental: string;
  finParental: string;
  diasParental: number;
  mediaJornada: boolean;
  limiteAvisoMediaJornada: string;
  finFuero: string;
  subsidio?: SubsidioMaternalResult;
  avisoSubsidio?: string;
}

function parseFecha(valor: string | undefined, campo: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((valor ?? '').trim());
  if (!m) throw new Error(`${campo}: usa el formato AAAA-MM-DD (por ejemplo, 2027-03-15).`);
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  if (d.getUTCMonth() !== Number(m[2]) - 1) throw new Error(`${campo}: la fecha no existe.`);
  return d;
}

const sumarDias = (d: Date, dias: number) => new Date(d.getTime() + dias * DIA_MS);
const iso = (d: Date) => d.toISOString().slice(0, 10);

function sumarUnAnio(d: Date): Date {
  const r = new Date(Date.UTC(d.getUTCFullYear() + 1, d.getUTCMonth(), d.getUTCDate()));
  // 29-02 + 1 año → 28-02 (no 01-03).
  return r.getUTCMonth() !== d.getUTCMonth() ? sumarDias(r, -r.getUTCDate()) : r;
}

export function formatFechaCL(isoFecha: string): string {
  const [a, m, d] = isoFecha.split('-');
  return `${d}-${m}-${a}`;
}

function calcularSubsidio(
  input: SubsidioMaternalInput,
  fechas: PrenatalPostnatalResult,
  calendario: CalendarioMinimo,
): SubsidioMaternalResult | string {
  const { promedioReciente, promedioHistorico, ipcAcumulado } = input;
  if (!Number.isFinite(promedioReciente) || promedioReciente <= 0) {
    return 'Ingresa un promedio neto reciente mayor a cero.';
  }
  if (!Number.isFinite(promedioHistorico) || promedioHistorico < 0) {
    return 'Ingresa el promedio neto para el tope, o 0 si no hubo ingresos en ese período.';
  }
  if (!Number.isFinite(ipcAcumulado) || ipcAcumulado <= -100) {
    return 'Ingresa la variación acumulada del IPC en porcentaje (por ejemplo, 3,2).';
  }

  const primeraLicencia = fechas.diasPrenatal ? fechas.inicioPrenatal : fechas.inicioPostnatal;
  if (!calendario.length || primeraLicencia < calendario[0].vigente_desde) {
    return 'No contamos con el ingreso mínimo de esa fecha para estimar el subsidio.';
  }

  // DFL 44, arts. 8 y 16: el promedio histórico ya divide por 1, 2 o 3 meses con ingresos.
  const topeMensual = promedioHistorico * (1 + ipcAcumulado / 100) * 1.1;
  const baseMensual = Math.min(promedioReciente, topeMensual);
  // Art. 17 y SUSESO 22123-2012: el piso también se aplica después de rebajar a media jornada.
  const mensualPonderado = (minimo: number, proporcion: number) =>
    Math.max(baseMensual * proporcion, minimo / 2);

  function totalTramo(inicio: string, dias: number, proporcion = 1): number {
    const inicioMs = Date.parse(inicio);
    const finMs = inicioMs + dias * DIA_MS;
    // El mínimo cambia desde su fecha de vigencia, aunque el subsidio ya haya iniciado.
    const total = calendario.reduce((suma, tramo, i) => {
      const desde = Math.max(inicioMs, Date.parse(tramo.vigente_desde));
      const siguiente = calendario[i + 1];
      const hasta = siguiente ? Math.min(finMs, Date.parse(siguiente.vigente_desde)) : finMs;
      return (
        suma + (Math.max(0, hasta - desde) / DIA_MS) * mensualPonderado(tramo.no_remuneracional, proporcion)
      );
    }, 0);
    // Divide al final para preservar los medios pesos al redondear por etapa.
    return Math.round(total / 30);
  }

  const minimoInicial = calendario.reduce(
    (minimo, tramo) => (primeraLicencia >= tramo.vigente_desde ? tramo.no_remuneracional : minimo),
    0,
  );
  const prenatal = totalTramo(fechas.inicioPrenatal, fechas.diasPrenatal);
  const postnatal = totalTramo(fechas.inicioPostnatal, fechas.diasPostnatal);
  const parental = totalTramo(
    fechas.inicioParental,
    fechas.diasParental,
    fechas.mediaJornada ? 0.5 : 1,
  );

  return {
    diarioInicial: Math.round(mensualPonderado(minimoInicial, 1) / 30),
    prenatal,
    postnatal,
    parental,
    total: prenatal + postnatal + parental,
  };
}

export function calculatePrenatalPostnatal(
  input: PrenatalPostnatalInput,
  calendario: CalendarioMinimo = CALENDARIO_INGRESO_MINIMO,
): PrenatalPostnatalResult {
  const fpp = parseFecha(input.fechaProbableParto, 'Fecha probable de parto');
  const partoReal = Boolean(input.fechaParto && input.fechaParto.trim());
  const parto = partoReal ? parseFecha(input.fechaParto, 'Fecha del parto') : fpp;
  const hijos = Math.round(input.numeroHijos ?? 1);
  if (!Number.isFinite(hijos) || hijos < 1 || hijos > 8) {
    throw new Error('El número de hijos del parto debe estar entre 1 y 8.');
  }

  const inicioPrenatal = sumarDias(fpp, -DIAS_PRENATAL);
  // Prenatal corre hasta el día anterior al parto: se prorroga si el parto se atrasa
  // y se acorta si se adelanta (art. 196 inc. 2).
  const diasPrenatal = Math.max(
    0,
    Math.round((parto.getTime() - inicioPrenatal.getTime()) / DIA_MS),
  );

  // Prematuro y múltiple no se suman: rige el más largo (art. 196 inc. 6).
  const diasPostnatal = Math.max(
    input.prematuroOBajoPeso ? DIAS_POSTNATAL_PREMATURO : DIAS_POSTNATAL,
    DIAS_POSTNATAL + (hijos - 1) * DIAS_EXTRA_POR_HIJO,
  );
  const finPostnatal = sumarDias(parto, diasPostnatal - 1);

  const mediaJornada = Boolean(input.mediaJornada);
  const diasParental = mediaJornada ? DIAS_PARENTAL_MEDIA : DIAS_PARENTAL_COMPLETA;
  const inicioParental = sumarDias(finPostnatal, 1);

  const fechas: PrenatalPostnatalResult = {
    partoReal,
    inicioPrenatal: iso(inicioPrenatal),
    finPrenatal: diasPrenatal > 0 ? iso(sumarDias(parto, -1)) : null,
    diasPrenatal,
    inicioPostnatal: iso(parto),
    finPostnatal: iso(finPostnatal),
    diasPostnatal,
    inicioParental: iso(inicioParental),
    finParental: iso(sumarDias(inicioParental, diasParental - 1)),
    diasParental,
    mediaJornada,
    limiteAvisoMediaJornada: iso(sumarDias(finPostnatal, -DIAS_AVISO_MEDIA_JORNADA)),
    finFuero: iso(sumarUnAnio(finPostnatal)),
  };
  if (!input.subsidio) return fechas;
  const estimacion = calcularSubsidio(input.subsidio, fechas, calendario);
  return typeof estimacion === 'string'
    ? { ...fechas, avisoSubsidio: estimacion }
    : { ...fechas, subsidio: estimacion };
}

const CT_URL = 'https://www.bcn.cl/leychile/navegar?idNorma=207436';
const SUSESO_SUBSIDIO_URL = 'https://www.suseso.gob.cl/622/w3-propertyvalue-771668.html';

function notaPeriodosSubsidio(r: PrenatalPostnatalResult): string {
  const inicio = new Date(r.diasPrenatal ? r.inicioPrenatal : r.inicioPostnatal);
  const mes = (offset: number) => {
    const d = new Date(Date.UTC(inicio.getUTCFullYear(), inicio.getUTCMonth() + offset, 1));
    return `${String(d.getUTCMonth() + 1).padStart(2, '0')}/${d.getUTCFullYear()}`;
  };
  return `Para estimar el subsidio, busca los 3 meses con ingresos más próximos dentro de cada período: promedio reciente, ${mes(-6)} a ${mes(-1)}; promedio para el tope, ${mes(-13)} a ${mes(-8)}. En la calculadora del IPC del INE usa ${mes(-9)} como mes inicial y ${mes(-2)} como mes final.`;
}

export function prenatalPostnatalToResults(r: PrenatalPostnatalResult): CalculatorResult[] {
  const f = formatFechaCL;
  const periodos = notaPeriodosSubsidio(r);
  const notaSubsidio = {
    text: r.avisoSubsidio ? `${r.avisoSubsidio} ${periodos}` : periodos,
    source: { name: 'SUSESO — Cálculo de subsidios maternales', url: SUSESO_SUBSIDIO_URL },
  };
  const results: CalculatorResult[] = [
    {
      label: `Postnatal: ${f(r.inicioPostnatal)} al ${f(r.finPostnatal)}`,
      value: r.diasPostnatal,
      format: 'days',
      highlight: true,
      note: {
        text: r.partoReal
          ? 'Calculado desde la fecha real del parto.'
          : 'Estimado con la fecha probable de parto: el postnatal se cuenta desde el día real del parto, así que estas fechas se mueven si el parto se adelanta o se atrasa.',
        source: { name: 'Código del Trabajo, arts. 195 y 196 (BCN)', url: CT_URL },
      },
    },
    {
      label: `Postnatal parental ${r.mediaJornada ? 'a media jornada' : 'a jornada completa'}: ${f(r.inicioParental)} al ${f(r.finParental)}`,
      value: r.diasParental,
      format: 'days',
      highlight: true,
    },
  ];
  results.unshift({
    label: r.finPrenatal
      ? `Prenatal: ${f(r.inicioPrenatal)} al ${f(r.finPrenatal)}`
      : `Prenatal: el parto ocurrió antes del ${f(r.inicioPrenatal)}, fecha en que comenzaba`,
    value: r.diasPrenatal,
    format: 'days',
    highlight: Boolean(r.finPrenatal),
    partial: Boolean(r.avisoSubsidio),
    note: notaSubsidio,
  });
  results.push(
    {
      label: `Último día para avisar media jornada (carta certificada): ${f(r.limiteAvisoMediaJornada)}`,
      value: DIAS_AVISO_MEDIA_JORNADA,
      format: 'days',
      note: {
        text: 'Para tomar el postnatal parental a media jornada debes avisar al empleador por carta certificada, con copia a la Inspección del Trabajo, con al menos 30 días de anticipación al término del postnatal. Sin aviso, se toma a jornada completa.',
        source: { name: 'Código del Trabajo, art. 197 bis (BCN)', url: CT_URL },
      },
    },
    {
      label: `Fuero maternal hasta el ${f(r.finFuero)}`,
      value: Math.round((Date.parse(r.finFuero) - Date.parse(r.inicioPostnatal)) / DIA_MS) + 1,
      format: 'days',
      note: {
        text: 'Días desde el parto. El fuero dura desde el embarazo hasta un año después de terminado el postnatal, sin contar el postnatal parental; un postnatal suplementario por enfermedad lo extiende.',
        source: { name: 'Código del Trabajo, art. 201 (BCN)', url: CT_URL },
      },
    },
  );
  if (r.subsidio) {
    results.unshift(
      {
        label: 'Subsidio maternal total estimado',
        value: r.subsidio.total,
        format: 'CLP',
        highlight: true,
        note: {
          text: 'Para trabajadoras dependientes del sector privado con un solo empleador y licencias maternales continuas. No verifica si tienes derecho al subsidio ni proyecta reajustes del ingreso mínimo. No incluye sueldo por media jornada.',
          source: { name: 'DFL N.º 44, arts. 8, 16 y 17 (BCN)', url: DFL_44_URL },
        },
      },
      {
        label: 'Subsidio diario al inicio de la licencia',
        value: r.subsidio.diarioInicial,
        format: 'CLP',
      },
      { label: 'Subsidio prenatal', value: r.subsidio.prenatal, format: 'CLP' },
      { label: 'Subsidio postnatal', value: r.subsidio.postnatal, format: 'CLP' },
      {
        label: `Subsidio postnatal parental${r.mediaJornada ? ' a media jornada' : ''}`,
        value: r.subsidio.parental,
        format: 'CLP',
      },
    );
  }
  return results;
}
