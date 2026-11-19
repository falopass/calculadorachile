// ============================================
// Plan editorial #39: guía /guias/preparacion-operacion-renta-2027-checklist
// ----------------------------------------------
// Texto revisado el 17-11-2026. Solo usa fechas publicadas por el SII
// (Res. Ex. N.º 135 de 2026) y reglas de la Ley sobre Impuesto a la
// Renta. El calendario del F22 2027 y de devoluciones aún no existe:
// se declara como pendiente. Tasas de retención desde constants.ts.
// ============================================

import type { Guia } from './guias';
import { RETENCION_HONORARIOS_CALENDARIO } from '@/lib/values/constants';

const SII_RES_135 = 'https://www.sii.cl/normativa_legislacion/resoluciones/2026/reso135.pdf';
const BCN_LIR = 'https://www.bcn.cl/leychile/navegar?idNorma=6368';
const SII_RENTA_2026 = 'https://www.sii.cl/destacados/renta/2026/';
const SII_HOME = 'https://www.sii.cl';

const ext = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
const int = (href: string, text: string) => `<a href="${href}">${text}</a>`;

const pct = (n: number) => `${String(n).replace('.', ',')}%`;
const RET_2026 = pct(RETENCION_HONORARIOS_CALENDARIO[2026]);
const RET_2027 = pct(RETENCION_HONORARIOS_CALENDARIO[2027]);

export const guiaOperacionRenta2027: Guia = {
  slug: 'preparacion-operacion-renta-2027-checklist',
  title: 'Operación Renta 2027: checklist para prepararte desde ahora',
  intent:
    '¿Qué tengo que revisar y juntar antes de la Operación Renta 2027 y qué fechas ya fijó el SII?',
  description:
    'Checklist de la Operación Renta 2027 (año tributario 2027, rentas de 2026): fechas de declaraciones juradas ya fijadas por el SII, qué falta publicar y qué revisar si eres dependiente, honorarios o pyme.',
  category: 'tributario',
  categoryLabel: 'Impuestos y SII',
  keywords: [
    'operación renta 2027',
    'declaración de renta 2027',
    'año tributario 2027',
    'calendario declaraciones juradas 2027',
    'devolución de impuestos 2027',
    'checklist operación renta',
    'boletas de honorarios renta 2027',
  ],
  publishedAt: '2026-11-17',
  updatedAt: '2026-11-17',
  readingTime: 11,
  embedCalculatorId: 'operacion-renta',
  sections: [
    {
      id: 'resumen',
      title: 'Resumen',
      level: 2,
      html: `<p><em>Actualizado el 17 de noviembre de 2026.</em></p>
<p>La Operación Renta 2027 corresponde al <strong>año tributario 2027</strong>: en abril de 2027 se declaran las rentas que obtuviste entre el 1 de enero y el 31 de diciembre de 2026. El plazo de abril lo fija el ${ext(BCN_LIR, 'artículo 69 de la Ley sobre Impuesto a la Renta')}, no una resolución anual, por eso se puede planificar con meses de anticipación.</p>
<p>Lo que el SII ya publicó para 2027 es el calendario de <strong>declaraciones juradas</strong> que presentan empleadores, bancos, AFP, corredoras y otras entidades (${ext(SII_RES_135, 'Resolución Exenta N.º 135, del 2 de octubre de 2026')}). Esas declaraciones son las que alimentan la propuesta de tu Formulario 22. Lo que <strong>todavía no está publicado</strong> al 17 de noviembre de 2026: el calendario del Formulario 22 para 2027 (fechas de propuesta y de envío dentro de abril) y el calendario de pagos de devoluciones.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Cómo leer esta guía</strong><p>Separamos lo que está en una norma o resolución vigente de lo que el SII anuncia cada año en su sitio de Operación Renta. Cuando el SII publique el calendario de 2027, actualizaremos esta página. Hasta entonces, cualquier fecha exacta de propuesta o devolución que veas en otros sitios es una estimación.</p></div></aside>`,
    },
    {
      id: 'publicado',
      title: 'Lo que el SII ya fijó para el año tributario 2027',
      level: 2,
      html: `<p>La Resolución Exenta N.º 135 fija los vencimientos de las declaraciones juradas del año tributario 2027. No son declaraciones que presente la mayoría de las personas, pero explican por qué tu propuesta de renta está completa recién a fines de marzo: tu empleador, tu banco o tu AFP tienen plazo hasta esas fechas para informar al SII.</p>
<table>
<caption>Vencimientos de declaraciones juradas, año tributario 2027 (SII, Res. Ex. N.º 135 de 2026)</caption>
<thead><tr><th scope="col">Vence</th><th scope="col">Declaraciones juradas (formularios)</th></tr></thead>
<tbody>
<tr><td>1 de febrero</td><td>1959</td></tr>
<tr><td>1 de marzo</td><td>1966</td></tr>
<tr><td>3 de marzo</td><td>1811, 1822, 1834, 1891, 1900, 1902, 1903</td></tr>
<tr><td>9 de marzo</td><td>1896, 1898, 1957</td></tr>
<tr><td>16 de marzo</td><td>1870, 1871, 1873, 1890; 1948 (sociedades anónimas abiertas)</td></tr>
<tr><td>22 de marzo</td><td>1922 (sociedades administradoras de fondos)</td></tr>
<tr><td>23 de marzo</td><td>1812, 1832, 1862, 1895, 1897, 1899, 1904, 1909, 1914, 1919, 1932, 1949, 1955</td></tr>
<tr><td>24 de marzo</td><td>1828, 1835, 1874, 1889, 1894; 1948 (sociedades con socios personas jurídicas)</td></tr>
<tr><td>29 de marzo</td><td>1829, 1840, 1841, 1843, 1879, 1887, 1933, 1943, 1944, 1947, 1948 y 1953, 1956, 1965; 1922 (bancos y corredores)</td></tr>
<tr><td>5 de mayo</td><td>1962</td></tr>
<tr><td>14 de mayo</td><td>1837</td></tr>
<tr><td>Junto con el Formulario 22</td><td>1947 y 1948 (empresarios individuales)</td></tr>
<tr><td>30 de junio</td><td>1847, 1866, 1867, 1907, 1913, 1926, 1929, 1930, 1937, 1945, 1946, 1950, 1951, 1952, 1958, 1960, 1961, 1963, 1964</td></tr>
<tr><td>30 de julio</td><td>1959 (segundo vencimiento)</td></tr>
</tbody>
</table>
<p>Las fechas y los números de formulario están en la resolución; el contenido de cada declaración está en las instrucciones del SII para cada formulario.</p>
<p>Para las personas, dos fechas de esa tabla importan: el <strong>29 de marzo de 2027</strong>, cuando vencen la 1887 (sueldos que pagó tu empleador) y la 1879 (retenciones de honorarios). Si un empleador o una empresa a la que le emitiste boletas no informa a tiempo, tu propuesta puede salir incompleta.</p>`,
    },
    {
      id: 'ley',
      title: 'Lo que dice la ley y no cambia de un año a otro',
      level: 2,
      html: `<ul>
<li><strong>Plazo.</strong> La declaración anual se presenta en abril de cada año por las rentas del año anterior (${ext(BCN_LIR, 'art. 69 LIR')}). Hay excepciones, por ejemplo para quienes terminan giro o tienen rentas esporádicas.</li>
<li><strong>Más de un empleador a la vez.</strong> Si en 2026 recibiste sueldos de más de un empleador <em>simultáneamente</em>, debes reliquidar el impuesto único sumando todas esas rentas y aplicando la escala anual según la UTM de diciembre (${ext(BCN_LIR, 'art. 47 LIR')}). Es el caso más común de quien termina pagando impuesto en abril sin esperarlo.</li>
<li><strong>Devoluciones.</strong> El saldo a favor lo devuelve la Tesorería dentro de los 30 días siguientes al vencimiento del plazo normal de declaración, reajustado por IPC; si declaras fuera de plazo, dentro del mes siguiente al de tu declaración (${ext(BCN_LIR, 'art. 97 LIR')}). En la práctica, el SII publica cada año fechas de pago más tempranas según el día en que declares; las de 2027 aún no están publicadas.</li>
<li><strong>Escala del Global Complementario.</strong> Se expresa en UTA. Para el año tributario 2027 se usa la UTA de diciembre de 2026 (12 veces la UTM de ese mes), que el SII publica a fines de noviembre o en diciembre de 2026.</li>
</ul>`,
    },
    {
      id: 'falta',
      title: 'Lo que todavía no está publicado',
      level: 2,
      html: `<p>Al 17 de noviembre de 2026 no encontramos en el sitio del SII:</p>
<ul>
<li>El <strong>calendario del Formulario 22 2027</strong>: desde qué día de marzo o abril estará la propuesta y desde cuándo se puede enviar. En 2026 el SII lo anunció en su ${ext(SII_RENTA_2026, 'sitio de Operación Renta 2026')}.</li>
<li>El <strong>calendario de devoluciones 2027</strong> por fecha de envío.</li>
<li>El <strong>Formulario 22 2027 y sus instrucciones</strong>, que pueden traer códigos nuevos por cambios legales de 2026.</li>
<li>La <strong>UTM y UTA de diciembre de 2026</strong>, que definen los tramos de la escala.</li>
</ul>
<p>Nada de esto impide prepararse: los documentos que necesitas y las decisiones que puedes tomar antes del 31 de diciembre no dependen de esas fechas.</p>`,
    },
    {
      id: 'antes-diciembre',
      title: 'Antes del 31 de diciembre de 2026',
      level: 2,
      html: `<p>Algunas decisiones solo cuentan si se toman dentro del año calendario que se declara:</p>
<ul>
<li><strong>Ahorro previsional voluntario (APV) régimen B.</strong> Los aportes hechos hasta el 31 de diciembre de 2026 rebajan la base del año tributario 2027. Si eres dependiente, el empleador o la AFP ya lo informan; si eres independiente, el aporte directo debe estar hecho dentro del año.</li>
<li><strong>Pagos provisionales voluntarios.</strong> Si ya sabes que tendrás impuesto a pagar (por ejemplo, por dos empleadores simultáneos), puedes pedir a uno de ellos que retenga más, como permite el ${ext(BCN_LIR, 'art. 88 LIR')}. No reduce el impuesto, pero evita juntar el monto en abril.</li>
<li><strong>Boletas de honorarios pendientes.</strong> Las boletas se imputan al año en que se perciben. Si emites una boleta el 30 de diciembre y la pagan en enero, revisa con tu contador en qué año corresponde.</li>
<li><strong>Datos de tu cuenta.</strong> Actualiza en el SII la cuenta bancaria para devoluciones y tu correo. Es la causa más frecuente de devoluciones retenidas.</li>
</ul>`,
    },
    {
      id: 'dependientes',
      title: 'Checklist si eres trabajador dependiente',
      level: 2,
      html: `<ul>
<li>Revisa si en 2026 tuviste <strong>dos empleadores al mismo tiempo</strong>, aunque fuera un mes. Si fue así, la declaración es obligatoria y probablemente tendrás diferencia a pagar. La ${int('/calculadoras/calculadora-impuesto-segunda-categoria', 'calculadora de impuesto de segunda categoría')} sirve para ver cuánto te retuvo cada uno.</li>
<li>Si tuviste <strong>un solo empleador</strong> todo el año y no tuviste otras rentas, normalmente no estás obligado a declarar. Igual conviene revisar la propuesta si tienes APV, dividendos hipotecarios con beneficio de intereses o créditos que puedan generar devolución.</li>
<li>Pide a tu empleador el <strong>certificado de sueldos</strong> (el que respalda la declaración jurada 1887) si no te llega por correo antes de abril.</li>
<li>Si cambiaste de trabajo en 2026 sin superposición de meses, no hay reliquidación obligatoria por ese motivo.</li>
</ul>`,
    },
    {
      id: 'honorarios',
      title: 'Checklist si emitiste boletas de honorarios',
      level: 2,
      html: `<ul>
<li>Las boletas de 2026 tuvieron una retención de <strong>${RET_2026}</strong>. Esa retención es un adelanto: en abril se compara con el impuesto y con las cotizaciones previsionales que corresponden a tus honorarios, y el resultado puede ser devolución o pago. La retención de las boletas que emitas en 2027 sube a ${RET_2027} y se verá en la Operación Renta 2028. Revisa el ${int('/blog/boleta-honorarios-retencion-15-25-2026', `calendario de retención de honorarios: ${RET_2027} desde enero de 2027 según la Ley 21.133`)}.</li>
<li>Haz el cálculo antes de abril con la ${int('/calculadoras/calculadora-operacion-renta', 'calculadora de Operación Renta')} y la ${int('/calculadoras/calculadora-cotizacion-independientes', 'calculadora de cotización de independientes')}. Si tus honorarios fueron tu único ingreso, la devolución suele ser menor que la retención total porque parte se destina a cotizaciones.</li>
<li>Revisa que cada empresa que te pagó haya emitido boletas de prestación de terceros o haya retenido; esas retenciones las informa en la declaración jurada 1879, que vence el 29 de marzo de 2027.</li>
<li>Si emitiste boletas sin retención (por ejemplo, a personas naturales), en abril tendrás que pagar el impuesto y las cotizaciones de esas rentas. Los ${int('/calculadoras/calculadora-ppm', 'pagos provisionales mensuales')} evitan concentrar ese pago.</li>
<li>Para el detalle del cálculo de una boleta, usa la ${int('/calculadoras/calculadora-boleta-honorarios', 'calculadora de boleta de honorarios')} y la ${int('/guias/iva-boleta-honorarios-chile', 'guía de IVA y boletas de honorarios')}.</li>
</ul>`,
    },
    {
      id: 'pymes',
      title: 'Checklist si tienes una pyme o empresa individual',
      level: 2,
      html: `<ul>
<li>Anota en tu calendario las declaraciones juradas que te corresponden según la tabla anterior. Si pagaste sueldos en 2026, la 1887 vence el 29 de marzo; si pagaste honorarios con retención, la 1879 vence el mismo día.</li>
<li>Si eres empresario individual, las declaraciones 1947 y 1948 se presentan junto con el Formulario 22, según la resolución.</li>
<li>Cuadra los PPM pagados en 2026 con los registros del SII antes de abril.</li>
<li>Pide a tu contador que confirme el régimen tributario de la empresa para 2026 y si hubo cambios de régimen que afecten la declaración.</li>
</ul>`,
    },
    {
      id: 'abril',
      title: 'En abril de 2027, cuando abra el proceso',
      level: 2,
      html: `<ol>
<li>Entra con tu RUT y Clave Tributaria al ${ext(SII_HOME, 'sitio del SII')} y revisa la propuesta línea por línea. No la aceptes sin mirar las rentas y retenciones informadas.</li>
<li>Compara cada renta con tus certificados. Si falta un empleador o una retención, contacta primero a quien debió informarla.</li>
<li>Si declaras antes del 30 de abril y tienes saldo a favor, la ley te asegura la devolución dentro de los 30 días siguientes al cierre del plazo; el SII suele anunciar fechas anteriores por tramos.</li>
<li>Si tienes impuesto a pagar, revisa las opciones que el SII anuncie para 2027; hasta que se publiquen, no las des por hechas.</li>
<li>Guarda el comprobante del Formulario 22 y revisa el estado de tu declaración en las semanas siguientes. Si queda observada, el SII indica qué revisar.</li>
</ol>`,
    },
    {
      id: 'errores',
      title: 'Errores frecuentes',
      level: 2,
      html: `<ul>
<li><strong>Confundir año comercial y año tributario.</strong> La Operación Renta 2027 es sobre lo ganado en 2026.</li>
<li><strong>Esperar devolución automática teniendo dos empleadores.</strong> Si fueron simultáneos, la reliquidación suele dar diferencia a pagar.</li>
<li><strong>Tomar fechas de devolución de un año anterior como si fueran las de 2027.</strong> Cambian cada año.</li>
<li><strong>Olvidar los honorarios sin retención.</strong> Aunque la plataforma no los muestre en la propuesta, debes declararlos.</li>
</ul>
<p>Para entender el impuesto mensual de un sueldo, revisa la ${int('/guias/sueldo-liquido-chile', 'guía de sueldo líquido')}.</p>`,
    },
  ],
  relatedCalculators: [
    'calculadora-operacion-renta',
    'calculadora-boleta-honorarios',
    'calculadora-impuesto-segunda-categoria',
    'calculadora-cotizacion-independientes',
    'calculadora-ppm',
  ],
  relatedArticles: [],
  sources: [
    {
      label: 'SII, Resolución Exenta N.º 135 de 2026 (declaraciones juradas AT 2027)',
      url: SII_RES_135,
    },
    { label: 'BCN, Ley sobre Impuesto a la Renta (arts. 47, 69, 88 y 97)', url: BCN_LIR },
    { label: 'SII, Operación Renta 2026', url: SII_RENTA_2026 },
  ],
};
