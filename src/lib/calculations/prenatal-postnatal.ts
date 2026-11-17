// ============================================
// Prenatal, postnatal y postnatal parental — fechas
// Base legal: Código del Trabajo arts. 195, 196, 197 bis y 201
// (LeyChile idNorma 207436). Postnatal desde el día del parto
// y prenatal desde la 6ª semana antes de la fecha probable
// (SUSESO, Compendio de licencias médicas).
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export const DIAS_PRENATAL = 42;
export const DIAS_POSTNATAL = 84;
export const DIAS_POSTNATAL_PREMATURO = 126;
export const DIAS_EXTRA_POR_HIJO = 7;
export const DIAS_PARENTAL_COMPLETA = 84;
export const DIAS_PARENTAL_MEDIA = 126;
export const DIAS_AVISO_MEDIA_JORNADA = 30;

const DIA_MS = 86_400_000;

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

export function calculatePrenatalPostnatal(input: PrenatalPostnatalInput): PrenatalPostnatalResult {
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
  const diasPrenatal = Math.max(0, Math.round((parto.getTime() - inicioPrenatal.getTime()) / DIA_MS));

  // Prematuro y múltiple no se suman: rige el más largo (art. 196 inc. 6).
  const diasPostnatal = Math.max(
    input.prematuroOBajoPeso ? DIAS_POSTNATAL_PREMATURO : DIAS_POSTNATAL,
    DIAS_POSTNATAL + (hijos - 1) * DIAS_EXTRA_POR_HIJO,
  );
  const finPostnatal = sumarDias(parto, diasPostnatal - 1);

  const mediaJornada = Boolean(input.mediaJornada);
  const diasParental = mediaJornada ? DIAS_PARENTAL_MEDIA : DIAS_PARENTAL_COMPLETA;
  const inicioParental = sumarDias(finPostnatal, 1);

  return {
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
}

const CT_URL = 'https://www.bcn.cl/leychile/navegar?idNorma=207436';

export function prenatalPostnatalToResults(r: PrenatalPostnatalResult): CalculatorResult[] {
  const f = formatFechaCL;
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
  if (r.finPrenatal) {
    results.unshift({
      label: `Prenatal: ${f(r.inicioPrenatal)} al ${f(r.finPrenatal)}`,
      value: r.diasPrenatal,
      format: 'days',
      highlight: true,
    });
  } else {
    results.unshift({
      label: `Prenatal: el parto ocurrió antes del ${f(r.inicioPrenatal)}, fecha en que comenzaba`,
      value: 0,
      format: 'days',
    });
  }
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
  return results;
}
