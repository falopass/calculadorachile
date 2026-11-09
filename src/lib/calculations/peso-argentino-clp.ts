// ============================================
// Peso argentino ↔ CLP (E-050)
// --------------------------------------------
// Tasa: BCCh F072.CLP.ARS.N.O.D (referencial).
// Gate: si source=fallback o la observación tiene
// más de 3 días hábiles, NO se presenta como «hoy».
// ============================================

import { PESO_ARGENTINO } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type DireccionARS = 'ars_a_clp' | 'clp_a_ars';

export interface PesoArgentinoClpInput {
  monto: number;
  direccion: DireccionARS;
  /** Si se entrega (>0), anula la tasa del snapshot solo para el cálculo. */
  tasaPersonalizada?: number;
}

export interface PesoArgentinoClpResult {
  monto: number;
  direccion: DireccionARS;
  tasaCambio: number;
  resultado: number;
  resultadoEnCLP: boolean;
  /** true si la tasa salió del snapshot/constante y no de una tasa personalizada. */
  usoTasaSitio: boolean;
  /** false → no decir «hoy» en UI/title. */
  presentableComoHoy: boolean;
  etiquetaTasa: string;
}

const TIME_ZONE = 'America/Santiago';

function toSantiagoYmd(d: Date): { y: number; m: number; day: number; dow: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value;
  const y = Number(get('year'));
  const m = Number(get('month'));
  const day = Number(get('day'));
  const wd = get('weekday') ?? 'Mon';
  const dowMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { y, m, day, dow: dowMap[wd] ?? 1 };
}

function parseYmd(ymd: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12));
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatDDMMYYYY(ymd: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!m) return ymd;
  return `${m[3]}-${m[2]}-${m[1]}`;
}

/** Días hábiles (lun–vie, America/Santiago) estrictamente posteriores a `fromYmd` hasta `now`. */
export function businessDaysSince(fromYmd: string, now: Date = new Date()): number {
  const start = parseYmd(fromYmd);
  if (!start) return Number.POSITIVE_INFINITY;
  const startParts = toSantiagoYmd(start);
  const nowParts = toSantiagoYmd(now);
  const startUtc = Date.UTC(startParts.y, startParts.m - 1, startParts.day);
  const nowUtc = Date.UTC(nowParts.y, nowParts.m - 1, nowParts.day);
  if (nowUtc <= startUtc) return 0;
  let count = 0;
  for (let t = startUtc + 86_400_000; t <= nowUtc; t += 86_400_000) {
    const dow = new Date(t).getUTCDay(); // 0=Sun … aligned because we use UTC noon dates
    if (dow !== 0 && dow !== 6) count += 1;
  }
  return count;
}

/**
 * E-050: presentable como «hoy» solo si la fuente no es fallback y la
 * observación tiene ≤ 3 días hábiles de antigüedad.
 */
export function isPesoArgentinoPresentableComoHoy(
  source: string,
  observedYmd: string,
  now: Date = new Date(),
): boolean {
  if (source === 'fallback' || source === 'unknown' || !source) return false;
  if (!(PESO_ARGENTINO.valor > 0)) return false;
  return businessDaysSince(observedYmd, now) <= 3;
}

export function etiquetaTasaPesoArgentino(
  presentableComoHoy: boolean,
  observedYmd: string,
): string {
  if (presentableComoHoy) {
    return 'Tipo de cambio nominal referencial del Banco Central de Chile (serie F072.CLP.ARS.N.O.D), observación reciente.';
  }
  return `Valor referencial del ${formatDDMMYYYY(observedYmd)} (BCCh serie F072.CLP.ARS.N.O.D). No presentar como cotización del día en curso; la fuente del snapshot puede ser de respaldo o la observación tiene más de 3 días hábiles.`;
}

function tasaSitio(): number {
  const v = PESO_ARGENTINO.valor;
  return v && v > 0 ? v : 0;
}

export function calculatePesoArgentinoClp(
  input: PesoArgentinoClpInput,
): PesoArgentinoClpResult {
  const monto = Math.max(0, input.monto);
  const hasCustom =
    input.tasaPersonalizada !== undefined && input.tasaPersonalizada !== null;
  if (hasCustom && !(input.tasaPersonalizada! > 0)) {
    throw new Error(
      'No hay tipo de cambio ARS/CLP disponible. Revisa el valor del Banco Central e inténtalo de nuevo.',
    );
  }
  const personalizada = hasCustom ? input.tasaPersonalizada! : null;
  const tasa = personalizada ?? tasaSitio();
  if (!(tasa > 0)) {
    throw new Error(
      'No hay tipo de cambio ARS/CLP disponible. Revisa el valor del Banco Central e inténtalo de nuevo.',
    );
  }

  let resultado: number;
  let resultadoEnCLP: boolean;
  if (input.direccion === 'ars_a_clp') {
    resultado = Math.round(monto * tasa);
    resultadoEnCLP = true;
  } else {
    resultado = Number((monto / tasa).toFixed(2));
    resultadoEnCLP = false;
  }

  const presentableComoHoy =
    personalizada != null
      ? true // tasa del usuario: no afirmamos «hoy» del BCCh en la etiqueta de sitio
      : isPesoArgentinoPresentableComoHoy(
          PESO_ARGENTINO.fuente_snapshot,
          PESO_ARGENTINO.fecha_actualizacion,
        );

  // Con tasa personalizada no hablamos de «hoy» del BCCh.
  const presentable =
    personalizada != null
      ? false
      : presentableComoHoy;

  return {
    monto,
    direccion: input.direccion,
    tasaCambio: Math.round(tasa * 10000) / 10000,
    resultado,
    resultadoEnCLP,
    usoTasaSitio: personalizada == null,
    presentableComoHoy: presentable,
    etiquetaTasa:
      personalizada != null
        ? 'Tasa personalizada ingresada por el usuario (no es la del Banco Central).'
        : etiquetaTasaPesoArgentino(
            presentable,
            PESO_ARGENTINO.fecha_actualizacion,
          ),
  };
}

export function pesoArgentinoClpToResults(
  r: PesoArgentinoClpResult,
): CalculatorResult[] {
  return [
    {
      label: 'Resultado',
      value: r.resultado,
      format: r.resultadoEnCLP ? 'CLP' : 'number',
      highlight: true,
    },
    {
      label: 'Tipo de cambio usado (CLP por 1 ARS)',
      value: r.tasaCambio,
      format: 'number',
      note: {
        text: r.etiquetaTasa,
        source: {
          name: 'BCCh — tipo de cambio nominal ARS',
          url: 'https://si3.bcentral.cl/siete/ES/Siete/Cuadro/CAP_TIPO_CAMBIO/MN_TIPO_CAMBIO4/TCB_520_TIPO_CAMBIO_NOMINAL?idSerie=F072.CLP.ARS.N.O.D',
        },
      },
    },
  ];
}

/** Title/meta: nunca «hoy» si el gate E-050 falla. */
export function seoPesoArgentino(now: Date = new Date()): {
  seoTitle: string;
  seoDescription: string;
} {
  const fresh = isPesoArgentinoPresentableComoHoy(
    PESO_ARGENTINO.fuente_snapshot,
    PESO_ARGENTINO.fecha_actualizacion,
    now,
  );
  if (fresh) {
    return {
      seoTitle: 'Peso argentino a chileno: tipo de cambio BCCh',
      seoDescription:
        'Convierte pesos argentinos a CLP con el tipo de cambio nominal del Banco Central (serie F072.CLP.ARS.N.O.D). Bidireccional y con ejemplos.',
    };
  }
  const f = formatDDMMYYYY(PESO_ARGENTINO.fecha_actualizacion);
  return {
    seoTitle: 'Peso argentino a chileno: tipo de cambio BCCh',
    seoDescription: `Convierte ARS↔CLP con el tipo de cambio nominal referencial del BCCh (valor del ${f}, serie F072.CLP.ARS.N.O.D). Bidireccional.`,
  };
}
