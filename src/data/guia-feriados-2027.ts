// ============================================
// E-027: guía /guias/feriados-chile-2027
// ----------------------------------------------
// Todo el calendario, los conteos y los fines de semana largos se generan
// desde src/lib/feriados.ts. Solo se publican las fechas `verificado`; las
// `pendiente` (Semana Santa y Pueblos Indígenas) no aparecen hasta que
// gob.cl publique el calendario oficial 2027. No menciona elecciones.
// ============================================

import type { Guia } from './guias';
import {
  BCN_LEY_19668,
  BCN_LEY_19973,
  BCN_LEY_20299,
  BCN_LEY_20663,
  BCN_LEY_20768,
  BCN_LEY_20983,
  BCN_LEY_21357,
  BCN_LEY_2977,
  DT_IRRENUNCIABLES,
  DT_TRASLADO_LUNES,
  FERIADOS_2027,
  FERIADOS_REGIONALES_2027,
  GOB_FERIADOS_2026,
  diaSemana,
  fechaLarga,
  feriadosPublicables,
  finesDeSemanaLargos,
} from '@/lib/feriados';

const DT_VACACIONES_ART_67_70 = 'https://www.dt.gob.cl/legislacion/1624/w3-article-103605.html';
const a = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;

const publicados = feriadosPublicables(FERIADOS_2027);
const irrenunciables = publicados.filter((f) => f.irrenunciable);
const largos = finesDeSemanaLargos(publicados);
const hayPendientes = FERIADOS_2027.some((f) => f.estado === 'pendiente');
const f17sep = publicados.find((f) => f.fecha === '2027-09-17');

const conDia = (fecha: string) => `${diaSemana(fecha)} ${fechaLarga(fecha)}`;
const listaY = (xs: string[]) =>
  xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} y ${xs[xs.length - 1]}`;

const filasCalendario = publicados
  .map(
    (f) =>
      `<tr><td>${fechaLarga(f.fecha)}</td><td>${diaSemana(f.fecha)}</td><td>${f.nombre}</td><td>${
        f.irrenunciable ? 'Sí' : 'No'
      }</td><td>${a(f.url, f.norma)}</td></tr>`,
  )
  .join('\n');

const filasLargos = largos
  .map(
    (l) =>
      `<tr><td>${conDia(l.desde)} al ${conDia(l.hasta)}</td><td>${l.dias}</td><td>${l.feriados
        .map((f) => f.nombre)
        .join(', ')}</td></tr>`,
  )
  .join('\n');

const notaPendientes = hayPendientes
  ? `<p>Las fechas de Semana Santa (Viernes y Sábado Santo, ${a(BCN_LEY_2977, 'Ley 2.977')}) y del Día Nacional de los Pueblos Indígenas (${a(BCN_LEY_21357, 'Ley 21.357')}) dependen del calendario de cada año y se agregarán cuando el Gobierno publique el calendario oficial de feriados 2027.</p>`
  : '';

export const guiaFeriados2027: Guia = {
  slug: 'feriados-chile-2027',
  title: 'Feriados 2027 en Chile: calendario completo',
  intent: '¿Qué días son feriado en Chile en 2027?',
  description:
    'Revisa los feriados de 2027 en Chile: fechas, día de la semana, cuáles son irrenunciables, los fines de semana largos y los feriados regionales.',
  category: 'laboral',
  categoryLabel: 'Laboral y sueldo',
  keywords: [
    'feriados 2027 chile',
    'feriados irrenunciables 2027',
    'fines de semana largos 2027',
    'calendario feriados 2027',
    'feriado 17 de septiembre 2027',
  ],
  publishedAt: '2026-11-03',
  updatedAt: '2026-11-03',
  readingTime: 5,
  sections: [
    {
      id: 'resumen',
      title: 'Resumen',
      level: 2,
      html: `<p><em>Actualizado el 3 de noviembre de 2026</em></p>
<p>En 2027 Chile tiene <strong>${publicados.length} feriados nacionales con fecha confirmada</strong> por ley, de los cuales <strong>${irrenunciables.length} son irrenunciables</strong> para los trabajadores del comercio, y <strong>${largos.length} fines de semana largos</strong> con esas fechas (${a(BCN_LEY_2977, 'Ley 2.977')}; ${a(DT_IRRENUNCIABLES, 'Dirección del Trabajo')}).</p>
${notaPendientes}`,
    },
    {
      id: 'calendario',
      title: 'Calendario de feriados 2027',
      level: 2,
      html: `<table>
<caption>Feriados nacionales 2027 con fecha confirmada${hayPendientes ? ' (sin Semana Santa ni Pueblos Indígenas, pendientes del calendario oficial)' : ''}.</caption>
<thead><tr><th>Fecha</th><th>Día</th><th>Feriado</th><th>Irrenunciable</th><th>Norma</th></tr></thead>
<tbody>
${filasCalendario}
</tbody>
</table>`,
    },
    {
      id: 'irrenunciables',
      title: 'Feriados irrenunciables 2027',
      level: 2,
      html: `<p>Son feriados obligatorios e irrenunciables para los trabajadores del comercio el 1 de enero, el 1 de mayo, el 18 y 19 de septiembre y el 25 de diciembre (${a(BCN_LEY_19973, 'Ley 19.973, art. 2')}). En 2027 caen así: ${listaY(irrenunciables.map((f) => conDia(f.fecha)))}.</p>
<p>Quienes tienen derecho a ellos <strong>no pueden trabajar esos días, aunque se les ofrezca un recargo</strong> (${a(DT_IRRENUNCIABLES, 'DT')}).</p>
<p>No se aplican a quienes trabajan en clubes, restaurantes, cines, espectáculos en vivo, discotecas, pubs y cabarets, locales comerciales de aeropuertos y aeródromos civiles públicos, casinos y otros lugares de juego autorizados, bencineras y sus tiendas de conveniencia, ni farmacias de urgencia o de turno. Aun así, esos trabajadores tienen derecho a descansar en estos días una vez cada dos años con un mismo empleador, es decir, un año por medio (${a(DT_IRRENUNCIABLES, 'DT')}).</p>`,
    },
    {
      id: 'fines-de-semana-largos',
      title: 'Fines de semana largos 2027',
      level: 2,
      html: `<p>Con las fechas confirmadas, 2027 tiene ${largos.length} fines de semana largos de tres días o más:</p>
<table>
<thead><tr><th>Fin de semana</th><th>Días</th><th>Feriado</th></tr></thead>
<tbody>
${filasLargos}
</tbody>
</table>
${hayPendientes ? '<p>Esta tabla se actualizará cuando se confirmen las fechas de Semana Santa y del Día de los Pueblos Indígenas.</p>' : ''}`,
    },
    {
      id: 'por-que-cambian-de-dia',
      title: 'Por qué algunos feriados cambian de día',
      level: 2,
      html: `<ul>
<li><strong>San Pedro y San Pablo (29 de junio) y Encuentro de Dos Mundos (12 de octubre)</strong> se trasladan al lunes cuando caen martes, miércoles o jueves (${a(BCN_LEY_19668, 'Ley 19.668')}; ${a(DT_TRASLADO_LUNES, 'DT')}). En 2027 ambos caen martes, por eso se celebran el ${conDia('2027-06-28')} y el ${conDia('2027-10-11')}.</li>
<li><strong>Día de las Iglesias Evangélicas y Protestantes (31 de octubre)</strong> se traslada a un viernes solo cuando cae martes o miércoles (${a(BCN_LEY_20299, 'Ley 20.299')}). En 2027 cae ${diaSemana('2027-10-31')}, así que no se mueve.</li>
<li><strong>17 de septiembre</strong>: es feriado cuando el 18 y el 19 de septiembre caen sábado y domingo (${a(BCN_LEY_20983, 'Ley 20.983')}). En 2027 el 18 cae ${diaSemana('2027-09-18')}.</li>
<li><strong>Día Nacional de los Pueblos Indígenas</strong>: se celebra el día del solsticio de invierno de cada año (${a(BCN_LEY_21357, 'Ley 21.357')}).</li>
</ul>`,
    },
    {
      id: 'feriados-regionales',
      title: 'Feriados regionales 2027',
      level: 2,
      html: `<p>Estos feriados rigen solo en su territorio y no cuentan como feriados nacionales:</p>
<ul>
${FERIADOS_REGIONALES_2027.map(
  (r) => `<li><strong>${conDia(r.fecha)}</strong>: ${r.territorio} (${a(r.url, r.norma)}).</li>`,
).join('\n')}
</ul>`,
    },
    {
      id: 'feriados-y-vacaciones',
      title: '¿Cómo afectan los feriados a tus vacaciones?',
      level: 2,
      html: `<p>Las vacaciones se cuentan en días hábiles: los domingos y feriados no se descuentan, y el sábado siempre se considera inhábil para el feriado legal (${a(DT_VACACIONES_ART_67_70, 'DT, arts. 67 a 70 del Código del Trabajo')}). Por eso, si tus vacaciones incluyen un feriado que cae de lunes a viernes, se alargan en un día corrido. Un feriado que cae sábado o domingo no agrega días, porque esos días ya no se descuentan. La <a href="/calculadoras/calculadora-vacaciones-proporcionales">calculadora de vacaciones proporcionales</a> usa esta misma lista de feriados.</p>`,
    },
    {
      id: 'preguntas-frecuentes',
      title: 'Preguntas frecuentes',
      level: 2,
      html: `<h3>¿Cuáles son los feriados irrenunciables?</h3>
<p>El 1 de enero, el 1 de mayo, el 18 y 19 de septiembre y el 25 de diciembre. Son irrenunciables para los trabajadores del comercio, con excepciones como restaurantes, cines, bencineras y farmacias de turno (${a(DT_IRRENUNCIABLES, 'DT')}).</p>
<h3>¿Hoy es feriado irrenunciable?</h3>
<p>Solo si hoy es una de esas cinco fechas. En 2027 son: ${listaY(irrenunciables.map((f) => conDia(f.fecha)))}.</p>
${
  f17sep
    ? `<h3>¿El 17 de septiembre de 2027 es feriado?</h3>
<p>Sí. El ${conDia(f17sep.fecha)} es feriado nacional porque el 18 y el 19 de septiembre caen sábado y domingo (${a(BCN_LEY_20983, 'Ley 20.983')}). No es uno de los feriados irrenunciables de la Ley 19.973.</p>`
    : ''
}`,
    },
  ],
  relatedCalculators: ['calculadora-vacaciones-proporcionales', 'calculadora-finiquito'],
  relatedArticles: [],
  sources: [
    { label: 'BCN, Ley 2.977 (feriados legales)', url: BCN_LEY_2977 },
    { label: 'BCN, Ley 19.973 (feriados irrenunciables)', url: BCN_LEY_19973 },
    { label: 'DT, feriados obligatorios e irrenunciables del comercio', url: DT_IRRENUNCIABLES },
    { label: 'BCN, Ley 19.668 (traslado al lunes)', url: BCN_LEY_19668 },
    { label: 'DT, traslado de feriados y Virgen del Carmen', url: DT_TRASLADO_LUNES },
    { label: 'BCN, Ley 20.983 (17 de septiembre)', url: BCN_LEY_20983 },
    { label: 'BCN, Ley 20.299 (Iglesias Evangélicas)', url: BCN_LEY_20299 },
    { label: 'BCN, Ley 21.357 (Pueblos Indígenas)', url: BCN_LEY_21357 },
    { label: 'BCN, Ley 20.663 (Arica y Parinacota)', url: BCN_LEY_20663 },
    { label: 'BCN, Ley 20.768 (Chillán y Chillán Viejo)', url: BCN_LEY_20768 },
    { label: 'gob.cl, Feriados 2026 (feriados regionales)', url: GOB_FERIADOS_2026 },
  ],
};
