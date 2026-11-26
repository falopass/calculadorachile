// ============================================
// Guía /guias/ppm-pagos-provisionales-mensuales-chile
// ----------------------------------------------
// Demanda GSC (export 25-oct a 21-nov-2026): consulta "ppm" con
// 92 impresiones y posición media 28; el cluster tributario de
// PPM no tiene pieza dedicada (la calculadora es la única página).
// Tasas y reglas verificadas en preguntas frecuentes y oficios
// del SII (noviembre 2026); ejemplos calculados con calculatePPM.
// ============================================

import type { Guia } from './guias';
import { formatCLP } from '@/lib/formatters';
import { getRetencionHonorarios, formatTasa as tasaHonorarios } from '@/lib/values/honorarios-anio';
import { calculatePPM } from '@/lib/calculations/ppm';

const SII_FAQ_TASA_VARIABLE =
  'https://www.sii.cl/preguntas_frecuentes/renta/001_002_0700.htm';
const SII_FAQ_TASAS_PPM =
  'https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_0695.htm';
const SII_FAQ_INGRESOS_BRUTOS =
  'https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_2171.htm';
const SII_FAQ_TASA_MAXIMA =
  'https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_1557.htm';
const SII_FAQ_BASE_PPM =
  'https://www.sii.cl/preguntas_frecuentes/impuestos_mensuales/001_130_1908.htm';
const SII_GUIA_F29 = 'https://www.sii.cl/pagina/iva/guia_f29.htm';
const SII_PLAZOS_F29 =
  'https://www.sii.cl/preguntas_frecuentes/impuestos_mensuales/001_130_1060.htm';
const SII_HONORARIOS_CALENDARIO =
  'https://www.sii.cl/destacados/boletas_honorarios/aumento_gradual.html';
const BCN_LIR_ART84 =
  'https://www.bcn.cl/leychile/navegar?idNorma=6374&tipoVersion=0';

const ext = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
const int = (href: string, text: string) => `<a href="${href}">${text}</a>`;

const TASA_HON_2026 = getRetencionHonorarios(2026);
const TASA_HON_2027 = getRetencionHonorarios(2027);
const TASA_HON_2028 = getRetencionHonorarios(2028);

const EJ_COMERCIO = calculatePPM({
  ingresosBrutosAnuales: 24_000_000,
  actividad: 'comercio',
});
const EJ_PROFESIONAL = calculatePPM({
  ingresosBrutosAnuales: 12_000_000,
  actividad: 'profesional',
});
const EJ_TRANSPORTE = calculatePPM({
  ingresosBrutosAnuales: 24_000_000,
  actividad: 'transporte',
});

export const guiaPpm: Guia = {
  slug: 'ppm-pagos-provisionales-mensuales-chile',
  title: 'PPM en Chile: qué son, quién paga y cómo se calcula el pago provisional mensual',
  intent: '¿Qué es el PPM, qué tasa me corresponde y cómo lo calculo y declaro?',
  description:
    `Guía del pago provisional mensual (PPM) en Chile: quién lo paga, tasas por actividad (comercio, transporte 0,3%, talleres, Pro Pyme, honorarios ${tasaHonorarios(TASA_HON_2026)} en 2026), cálculo sobre ingresos brutos y declaración en el F29.`,
  category: 'tributario',
  categoryLabel: 'Impuestos y SII',
  keywords: [
    'ppm',
    'que es el ppm',
    'pago provisional mensual',
    'ppm chile',
    'tasa ppm',
    'calcular ppm',
    'ppm formulario 29',
    'ppm independientes',
    'ppm primera categoria',
    'suspension de ppm',
  ],
  publishedAt: '2026-11-26',
  updatedAt: '2026-11-26',
  readingTime: 13,
  embedCalculatorId: 'ppm',
  sections: [
    {
      id: 'resumen',
      title: 'Resumen',
      level: 2,
      html: `<p><em>Publicado el 26 de noviembre de 2026.</em></p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Alcance YMYL</strong><p>Esta guía explica las reglas generales del pago provisional mensual (PPM) con fuentes del Servicio de Impuestos Internos (SII) verificadas en noviembre de 2026. La tasa exacta de tu empresa es la que el SII calcula en tu propuesta de Formulario 29; los ejemplos usan tasas de referencia y no reemplazan asesoría tributaria.</p></div></aside>
<p>El <strong>PPM (pago provisional mensual)</strong> es un <strong>anticipo del impuesto anual a la renta</strong> que se declara y paga mes a mes en el <strong>Formulario 29</strong>. No es un impuesto adicional: cada PPM se acumula como crédito y se descuenta del impuesto que determinas en tu declaración anual (Formulario 22). Si pagaste más de lo que correspondía, la diferencia te la devuelve el SII en Operación Renta.</p>
<p>La base del PPM son los <strong>ingresos brutos del mes, sin IVA y sin deducir gastos</strong> (${ext(SII_FAQ_INGRESOS_BRUTOS, 'SII, preguntas frecuentes')}). La tasa depende de tu actividad y régimen: empresas con renta efectiva usan una <strong>tasa variable que el SII recalcula cada abril</strong>; hay tasas fijas para transportistas (0,3%), talleres artesanales (1,5% o 3%), regímenes Pro Pyme (0,2% a 0,5%) y una <strong>retención de honorarios de ${tasaHonorarios(TASA_HON_2026)} en 2026</strong> que funciona como PPM para los independientes. Estima tu caso con la ${int('/calculadoras/calculadora-ppm', 'calculadora de PPM')}.</p>`,
    },
    {
      id: 'que-es-ppm',
      title: 'Qué es el PPM y por qué existe',
      level: 2,
      html: `<p>El impuesto a la renta en Chile se cobra una vez al año, en abril, pero al Fisco no le conviene esperar doce meses para recaudar. El PPM es el mecanismo que reparte esa recaudación durante el año: cada mes el contribuyente entrega un porcentaje de sus ingresos brutos y, al declarar la renta anual, esos pagos se imputan como crédito contra el impuesto definitivo.</p>
<p>La base legal es el ${ext(BCN_LIR_ART84, 'artículo 84 de la Ley sobre Impuesto a la Renta')}, que obliga a los contribuyentes con declaración anual a efectuar pagos provisionales mensuales por los ingresos que perciban o devenguen. En la práctica el PPM convive con el IVA dentro del mismo formulario mensual, el <strong>F29</strong>, que también concentra retenciones y otros impuestos de período mensual.</p>
<p>Tres ideas ordenan todo el sistema:</p>
<ul>
<li><strong>Es un anticipo, no un tributo final.</strong> Un PPM no se "pierde": se resta del impuesto anual. Por eso una empresa con pérdida tributaria puede suspenderlo en ciertas condiciones.</li>
<li><strong>Se calcula sobre ingresos brutos.</strong> La base son las ventas o ingresos del mes sin IVA, sin rebajar costos ni gastos, como precisa el ${ext(SII_FAQ_BASE_PPM, 'SII')}.</li>
<li><strong>La tasa depende del régimen.</strong> Hay tasas fijas legales, tasas variables que el SII recalcula y tasas propias de regímenes especiales como Pro Pyme.</li>
</ul>`,
    },
    {
      id: 'quien-paga-ppm',
      title: 'Quién está obligado a pagar PPM',
      level: 2,
      html: `<p>La obligación alcanza a casi todo contribuyente que declara impuesto anual a la renta, pero la forma del pago cambia según la fuente del ingreso:</p>
<h3>Primera Categoría (empresas)</h3>
<p>Las empresas que determinan renta efectiva —comercio, servicios, construcción, industria— pagan PPM mensual sobre los ingresos brutos del mes. La tasa es la que aparece en su propuesta de F29: el SII la recalcula cada año a partir del promedio ponderado de los porcentajes aplicados el año anterior, ajustado según la diferencia entre los pagos provisionales y el impuesto de Primera Categoría del ejercicio (${ext(SII_FAQ_TASA_VARIABLE, 'SII, tasa variable del PPM')}).</p>
<p>Una empresa que inicia actividades todavía no tiene un año anterior para recalcular, por lo que aplica una tasa inicial de referencia mientras no exista tasa variable determinable; el SII ha precisado que esa primera tasa puede ser del 1% (${ext(SII_FAQ_TASAS_PPM, 'SII, tasas de PPM')}).</p>
<h3>Segunda Categoría (honorarios e independientes)</h3>
<p>Los trabajadores independientes a honorarios no hacen una declaración mensual propia: su "PPM" es la <strong>retención</strong> que el emisor de la boleta sufre o que declara el pagador. En 2026 esa tasa es <strong>${tasaHonorarios(TASA_HON_2026)}</strong> del honorario bruto, según el calendario gradual de la Ley 21.133, que sube a ${tasaHonorarios(TASA_HON_2027)} en 2027 y ${tasaHonorarios(TASA_HON_2028)} en 2028 (${ext(SII_HONORARIOS_CALENDARIO, 'calendario del SII')}). Detalle de la retención en la ${int('/guias/iva-boleta-honorarios-chile', 'guía de boleta de honorarios')}.</p>
<h3>Regímenes y actividades con tasa fija</h3>
<ul>
<li><strong>Transportistas de carga y pasajeros en renta presunta:</strong> 0,3% sobre ingresos brutos.</li>
<li><strong>Talleres artesanales:</strong> 1,5% o 3% según el caso.</li>
<li><strong>Pro Pyme Transparente (art. 14 D):</strong> 0,2% o 0,5% según el nivel de ingresos.</li>
<li><strong>Régimen Pro Pyme general con rebaja transitoria (art. 14 D N° 3):</strong> 0,125% o 0,25% entre 2025 y 2027, según los ingresos.</li>
<li><strong>Mineros afectos al royalty:</strong> porcentaje sobre ventas de productos mineros, o 0,3% cuando la tasa variable no puede determinarse.</li>
</ul>
<p>La lista completa y sus condiciones aparecen en las ${ext(SII_FAQ_TASAS_PPM, 'preguntas frecuentes del SII')}.</p>`,
    },
    {
      id: 'tasas-ppm-2026',
      title: 'Tasas de PPM vigentes en 2026',
      level: 2,
      html: `<p>No existe "la" tasa de PPM: existe la tuya, que depende del régimen tributario y, para renta efectiva, del historial de tu empresa. El panorama vigente:</p>
<table>
<thead><tr><th>Situación</th><th>Tasa de PPM</th></tr></thead>
<tbody>
<tr><td>Empresa en renta efectiva (régimen general)</td><td>Variable: la recalcula el SII cada abril con el promedio ponderado del año anterior ajustado</td></tr>
<tr><td>Primera Categoría sin historial (inicio de actividades)</td><td>Referencia 1% hasta que exista tasa variable</td></tr>
<tr><td>Transporte de carga y pasajeros (renta presunta)</td><td>0,3%</td></tr>
<tr><td>Talleres artesanales</td><td>1,5% o 3%</td></tr>
<tr><td>Pro Pyme Transparente</td><td>0,2% o 0,5% según ingresos</td></tr>
<tr><td>Pro Pyme con rebaja transitoria (2025–2027)</td><td>0,125% o 0,25%</td></tr>
<tr><td>Honorarios (retención que actúa como PPM)</td><td>${tasaHonorarios(TASA_HON_2026)} en 2026, sube a ${tasaHonorarios(TASA_HON_2028)} en 2028</td></tr>
<tr><td>Explotadores mineros con royalty</td><td>Porcentaje sobre ventas o 0,3%</td></tr>
</tbody>
</table>
<p>Hay un techo legal: la tasa de PPM <strong>nunca puede superar la tasa vigente del Impuesto de Primera Categoría</strong>, aunque la fórmula de recálculo arroje un porcentaje mayor (${ext(SII_FAQ_TASA_MAXIMA, 'SII, tasa máxima de PPM')}).</p>
<p>Para una empresa con contabilidad completa, la tasa variable se construye así: se toma el promedio ponderado de los porcentajes aplicados a los ingresos brutos mensuales del año anterior y se aumenta o disminuye en la diferencia porcentual entre los PPM actualizados y el impuesto de Primera Categoría efectivamente determinado. El resultado rige de abril a marzo del año siguiente, y es la tasa que aparece prellenada en la propuesta del F29.</p>`,
    },
    {
      id: 'como-se-calcula',
      title: 'Cómo se calcula el PPM del mes',
      level: 2,
      html: `<p>La cuenta mensual es directa:</p>
<ol class="steps">
<li><strong>Toma los ingresos brutos del mes</strong> percibidos o devengados, sin IVA. No deduzcas gastos, sueldos ni costo de ventas.</li>
<li><strong>Multiplica por tu tasa de PPM</strong> (la de tu propuesta F29 o la tasa fija de tu actividad).</li>
<li><strong>Declara y paga en el F29</strong> del mes siguiente dentro del plazo legal.</li>
</ol>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo 1 — comercio, tasa de referencia 1%</div><ul><li>Ingresos brutos anuales estimados: ${formatCLP(EJ_COMERCIO.baseTributable)}</li><li>PPM anual: ${formatCLP(EJ_COMERCIO.ppmAnual)}</li><li>PPM mensual promedio: ${formatCLP(EJ_COMERCIO.ppmMensual)}</li></ul><span class="total">Si el mes vendió $2.000.000 sin IVA, el PPM de ese mes es $20.000.</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo 2 — transportista en renta presunta (0,3%)</div><ul><li>Ingresos brutos anuales: ${formatCLP(EJ_TRANSPORTE.baseTributable)}</li><li>PPM anual: ${formatCLP(EJ_TRANSPORTE.ppmAnual)}</li><li>PPM mensual promedio: ${formatCLP(EJ_TRANSPORTE.ppmMensual)}</li></ul></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo 3 — honorarios, retención ${tasaHonorarios(TASA_HON_2026)}</div><ul><li>Honorarios brutos anuales: ${formatCLP(EJ_PROFESIONAL.baseTributable)}</li><li>Retención total del año (PPM): ${formatCLP(EJ_PROFESIONAL.ppmAnual)}</li><li>Promedio mensual retenido: ${formatCLP(EJ_PROFESIONAL.ppmMensual)}</li></ul><span class="total">La retención se aplica por boleta, no por mes: cada pago descuenta su ${tasaHonorarios(TASA_HON_2026)}.</span></div>
<p>Para otros escenarios usa la ${int('/calculadoras/calculadora-ppm', 'calculadora de PPM')}, que estima el monto anual y mensual según tu actividad.</p>`,
    },
    {
      id: 'declarar-f29',
      title: 'Cómo y cuándo se declara en el Formulario 29',
      level: 2,
      html: `<p>El PPM se declara en el mismo <strong>Formulario 29</strong> donde van el IVA y las retenciones del mes, dentro de la sección de pagos provisionales (líneas específicas según el tipo de contribuyente: Primera Categoría, segunda categoría, transportistas, talleres artesanales, etc.). La ${ext(SII_GUIA_F29, 'guía del F29 del SII')} detalla cada código.</p>
<p>El plazo general es el <strong>día 12 del mes siguiente</strong>; quienes declaran por internet y pagan con medios electrónicos tienen <strong>prórroga hasta el día 20</strong> (${ext(SII_PLAZOS_F29, 'plazos del SII')}). Declarar tarde o con monto menor genera intereses y multas, y el F29 observado puede requerir rectificatoria.</p>
<p>Tres prácticas que evitan problemas:</p>
<ul>
<li>Revisa cada mes que la <strong>tasa prellenada</strong> sea la vigente de tu empresa; tras el recálculo de abril cambia.</li>
<li>Si el mes no tuvo ingresos, declara igual con PPM en cero: la obligación de presentar el F29 no desaparece por falta de ventas.</li>
<li>Guarda el comprobante: los PPM declarados son el respaldo del crédito que pedirás en la F22.</li>
</ul>`,
    },
    {
      id: 'suspension-reliquidacion',
      title: 'Suspensión por pérdida y reliquidación de la tasa',
      level: 2,
      html: `<p>Cuando la empresa determina <strong>pérdida tributaria</strong>, pagar un anticipo de un impuesto que no existiría carece de sentido: el artículo 84 y la doctrina del SII (Circular 16/1991, reafirmada en el Oficio 885/2023) permiten <strong>suspender los PPM por los trimestres posteriores a aquel en que se determina pérdida</strong>. La suspensión no es automática ni definitiva: si en un trimestre posterior se genera utilidad, hay que <strong>reanudar los pagos con la tasa vigente del período</strong>.</p>
<p>En el sentido contrario, si tu negocio creció y la tasa del año pasado quedó baja, el propio contribuyente puede <strong>aumentar voluntariamente la tasa</strong> en su F29. Lo que no se puede es bajarla por debajo de la tasa determinada por el recálculo oficial, salvo suspensión por pérdida. Una empresa que proyecta un año malo pero sin pérdida arrastra la tasa anterior hasta el siguiente recálculo de abril.</p>
<p>También existe la suspensión especial por inversiones en zonas de beneficio (arts. 1° bis de las leyes 19.420 y 19.606, Arica y Austral), con topes que el propio F29 registra en sus códigos de suspensión.</p>`,
    },
    {
      id: 'ppm-f22-devolucion',
      title: 'Cómo se recupera el PPM en la declaración anual',
      level: 2,
      html: `<p>En abril, al llenar la <strong>F22</strong>, los PPM del año se suman como crédito contra el impuesto anual (Primera Categoría, Global Complementario o el régimen que corresponda). Tres desenlaces posibles:</p>
<ul>
<li><strong>PPM menor que el impuesto:</strong> pagas la diferencia en abril.</li>
<li><strong>PPM igual al impuesto:</strong> saldo cero.</li>
<li><strong>PPM mayor que el impuesto:</strong> queda un saldo a favor que se solicita como <strong>devolución</strong> en la misma declaración.</li>
</ul>
<p>Es el mecanismo detrás de buena parte de las "devoluciones de impuestos" de Operación Renta: la retención de honorarios y los PPM empresariales suelen superar el impuesto definitivo, sobre todo con rentas bajas o con gastos presumidos altos. Si esperas devolución, revisa la ${int('/guias/operacion-renta-2027-checklist', 'checklist de Operación Renta')} y prepara tu CuentaRUT o cuenta bancaria para el depósito.</p>
<p>Para un independiente la lógica es idéntica: la retención acumulada en el año se compara con el impuesto anual y el excedente vuelve. Por eso mantener boletas y certificados de retención ordenados es tan importante como declarar a tiempo.</p>`,
    },
    {
      id: 'preguntas-frecuentes',
      title: 'Preguntas frecuentes',
      level: 2,
      html: `<h3>¿El PPM es un impuesto aparte del impuesto a la renta?</h3>
<p>No. Es un anticipo: todo lo pagado como PPM se resta del impuesto anual en la F22, y el excedente se devuelve.</p>
<h3>¿Qué pasa si no vendí nada en un mes?</h3>
<p>Debes declarar el F29 igual, con PPM en cero. No declarar es infracción aunque no haya impuesto a pagar.</p>
<h3>¿Puedo dejar de pagar PPM si voy con pérdidas?</h3>
<p>Solo si hay pérdida tributaria determinada según las reglas del SII (suspensión por trimestres, con obligación de reanudar si aparece utilidad). No basta con "ir mal": la suspensión exige pérdida tributaria formal.</p>
<h3>¿La retención de mi boleta de honorarios es un PPM?</h3>
<p>Funciona como tal: es el pago a cuenta de tu impuesto anual. En 2026 retiene el ${tasaHonorarios(TASA_HON_2026)} del bruto y en abril se compensa contra tu Global Complementario.</p>
<h3>¿Dónde veo mi tasa de PPM exacta?</h3>
<p>En la propuesta de tu Formulario 29 en el sitio del SII. Para empresas en renta efectiva el SII la recalcula cada abril; para regímenes especiales aplica la tasa fija o de rango correspondiente.</p>`,
    },
    {
      id: 'enlaces',
      title: 'Calculadoras y lecturas relacionadas',
      level: 2,
      html: `<ul>
<li>${int('/calculadoras/calculadora-ppm', 'Calculadora de PPM')}</li>
<li>${int('/calculadoras/calculadora-iva', 'Calculadora de IVA')}</li>
<li>${int('/calculadoras/calculadora-boleta-honorarios', 'Calculadora de boleta de honorarios')}</li>
<li>${int('/guias/iva-boleta-honorarios-chile', 'Guía de IVA y boleta de honorarios')}</li>
<li>${int('/guias/empresas-pymes-chile', 'Guía de empresas y PYMEs en Chile')}</li>
<li>${int('/guias/operacion-renta-2027-checklist', 'Checklist Operación Renta')}</li>
<li>${int('/blog/formulario-29-iva-mensual-plazos-2026', 'Formulario 29: qué declara y sus plazos')}</li>
</ul>`,
    },
  ],
  relatedCalculators: [
    'calculadora-ppm',
    'calculadora-iva',
    'calculadora-boleta-honorarios',
    'calculadora-costo-empleado-pyme',
  ],
  relatedArticles: [
    'formulario-29-iva-mensual-plazos-2026',
    'boleta-honorarios-retencion-15-25-2026',
  ],
  sources: [
    { label: 'SII — ¿Qué ingresos se consideran para determinar los PPM?', url: SII_FAQ_INGRESOS_BRUTOS },
    { label: 'SII — ¿El PPM es igual para todos los contribuyentes de Primera Categoría?', url: SII_FAQ_TASAS_PPM },
    { label: 'SII — Recálculo del IDPC para la tasa variable de PPM', url: SII_FAQ_TASA_VARIABLE },
    { label: 'SII — Tasa máxima de PPM', url: SII_FAQ_TASA_MAXIMA },
    { label: 'SII — Guía del Formulario 29', url: SII_GUIA_F29 },
    { label: 'SII — Plazos del Formulario 29', url: SII_PLAZOS_F29 },
    { label: 'SII — Calendario de retención de honorarios, Ley 21.133', url: SII_HONORARIOS_CALENDARIO },
    { label: 'Ley sobre Impuesto a la Renta, art. 84 (BCN)', url: BCN_LIR_ART84 },
  ],
};
