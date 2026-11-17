// ============================================
// Artículos del carril de contenido 2027 (sueldo mínimo enero 2027,
// verano en auto, compras internacionales). Se integran al final de
// `articleCatalog` en articles.ts. Datos revisados el 17-11-2026.
// ============================================

import type { Article } from './articles';

const LEY_21830 = 'https://www.bcn.cl/leychile/navegar?idNorma=1225354';
const INE_IPC = 'https://www.ine.gob.cl/estadisticas-por-tema/precios-e-inflacion/indice-de-precios-al-consumidor';
const INE_BOLETIN = (archivo: string) =>
  `https://www.ine.gob.cl/docs/default-source/%C3%ADndice-de-precios-al-consumidor/boletines/espa%C3%B1ol/2026/${archivo}.pdf`;
const INE_ABRIL = INE_BOLETIN('boletin-%C3%ADndice-de-precios-al-consumidor-abril-2026');
const INE_OCTUBRE = INE_BOLETIN('boletin-%C3%ADndice-de-precios-al-consumidor-octubre-2026');
const DT_60141 = 'https://www.dt.gob.cl/portal/1628/w3-article-60141.html';

const ext = (url: string, texto: string) =>
  `<a href="${url}" target="_blank" rel="noopener">${texto}</a>`;

export const ARTICULOS_2027: Article[] = [
  // Plan editorial #42
  {
    slug: 'sueldo-minimo-2027-reajuste-simular-liquido',
    title: 'Sueldo mínimo enero 2027: cómo se calcula el reajuste por IPC y qué falta para conocer el monto',
    description:
      'La Ley 21.830 reajusta el sueldo mínimo desde el 1 de enero de 2027 según el IPC acumulado entre mayo y diciembre de 2026. Qué dice la ley, cuánto va del IPC y cuándo se conocerá el monto oficial.',
    date: '2026-11-17',
    updatedAt: '2026-11-17',
    category: 'laboral',
    readingTime: 9,
    relatedGuia: 'sueldo-liquido-chile',
    seoTitle: 'Sueldo mínimo enero 2027: reajuste por IPC y monto',
    seoDescription:
      'El sueldo mínimo sube el 1 de enero de 2027 según el IPC de mayo a diciembre de 2026 (Ley 21.830). IPC parcial publicado por el INE, qué falta y cuándo sale el decreto con el monto.',
    keywords: [
      'sueldo mínimo 2027',
      'sueldo mínimo enero 2027',
      'reajuste sueldo mínimo 2027',
      'ingreso mínimo 2027 IPC',
      'ley 21.830 reajuste enero',
      'cuánto será el sueldo mínimo 2027',
    ],
    relatedCalculators: [
      'calculadora-sueldo-liquido',
      'calculadora-sueldo-part-time',
      'calculadora-gratificacion-legal',
      'calculadora-asignacion-familiar',
    ],
    faq: [
      {
        question: '¿Cuánto será el sueldo mínimo en enero de 2027?',
        answer:
          'Todavía no hay un monto oficial. La Ley 21.830 ordena reajustar los $553.553 vigentes según la variación del IPC entre el 1 de mayo y el 31 de diciembre de 2026, y el monto exacto lo fijará un decreto del Ministerio de Hacienda que debe dictarse a más tardar el 15 de enero de 2027. Con el IPC publicado hasta octubre, la variación parcial es de 1,7%, pero faltan noviembre y diciembre.',
      },
      {
        question: '¿Desde cuándo rige el nuevo sueldo mínimo?',
        answer:
          'Desde el 1 de enero de 2027, aunque el decreto con el monto se publique después de esa fecha (la ley da plazo hasta el 15 de enero). Si la remuneración de enero se paga antes de conocer el monto, el empleador debe pagar la diferencia cuando el valor quede fijado.',
      },
      {
        question: '¿Qué pasa si el IPC de mayo a diciembre es negativo?',
        answer:
          'La ley no trata ese caso de forma expresa: habla de reajustar "conforme a la variación acumulada". Con el IPC publicado hasta octubre la variación es positiva (1,7%), así que el escenario de una baja es improbable, pero el monto final solo lo confirma el decreto.',
      },
      {
        question: '¿Sube también el mínimo para menores de 18 y mayores de 65?',
        answer:
          'Sí. El artículo 6 de la Ley 21.830 sube en la misma proporción el ingreso mínimo de menores de 18 y mayores de 65 ($412.938), el de fines no remuneracionales ($356.815) y los tramos de ingreso de la asignación familiar y del subsidio familiar.',
      },
    ],
    sources: [
      { label: 'BCN, Ley 21.830 (reajuste del ingreso mínimo)', url: LEY_21830 },
      { label: 'INE, boletín IPC octubre 2026', url: INE_OCTUBRE },
      { label: 'INE, boletín IPC abril 2026', url: INE_ABRIL },
      { label: 'INE, Índice de Precios al Consumidor', url: INE_IPC },
      { label: 'Dirección del Trabajo, ingreso mínimo mensual', url: DT_60141 },
    ],
    content: `<p class="article-lead">El sueldo mínimo de Chile va a cambiar el <strong>1 de enero de 2027</strong>, pero a mediados de noviembre de 2026 nadie puede decir todavía cuál será el monto. La ${ext(LEY_21830, 'Ley 21.830')} no fijó una cifra para enero: ordenó reajustar los <strong>$553.553</strong> vigentes según lo que suba el IPC entre mayo y diciembre de 2026. Con los datos que el INE ya publicó, la variación acumulada de mayo a octubre es de <strong>1,7%</strong>. Faltan noviembre y diciembre, y falta el decreto de Hacienda que pondrá el número oficial.</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Fecha de corte: 17 de noviembre de 2026</strong><p>Este artículo usa el IPC publicado por el INE hasta octubre de 2026 (boletín del 6 de noviembre). El IPC de noviembre se conocerá en diciembre y el de diciembre a comienzos de enero de 2027. Cuando se publique el decreto con el monto, actualizaremos esta página y las calculadoras.</p></div></aside>

<p>Qué revisamos para escribir esto: el texto de la Ley 21.830 publicado en el Diario Oficial el 22 de junio de 2026, los boletines mensuales del IPC del INE de abril a octubre de 2026 y la información de la Dirección del Trabajo sobre el ingreso mínimo. No incluimos proyecciones de bancos ni de la Encuesta de Expectativas del Banco Central: la ley no las usa, y un pronóstico no es el monto.</p>

<h2 id="que-dice-la-ley">Qué dice exactamente la Ley 21.830</h2>

<p>La ley tiene siete artículos y uno transitorio. Para el reajuste de enero importan tres:</p>

<ul>
<li><strong>Artículo 1.</strong> Desde el 1 de mayo de 2026 el ingreso mínimo para trabajadores de 18 a 65 años es de $553.553. En el inciso segundo agrega: "A contar del 1 de enero de 2027, reajústese el ingreso mínimo mensual (...) conforme a la variación acumulada por el Índice de Precios al Consumidor, determinada e informada por el Instituto Nacional de Estadísticas entre el 1 de mayo de 2026 y el 31 de diciembre de 2026".</li>
<li><strong>Artículo 6.</strong> Desde la misma fecha suben "en la misma proporción" el ingreso mínimo de menores de 18 y mayores de 65 ($412.938), el de fines no remuneracionales ($356.815) y los tramos de ingreso de la asignación familiar y del subsidio familiar. Para eso, a más tardar el <strong>15 de enero de 2027</strong> debe dictarse un decreto supremo del Ministerio de Hacienda, firmado también por el Ministro del Trabajo, con los valores resultantes.</li>
<li><strong>Artículo 7.</strong> A más tardar en junio de 2027 el Presidente debe enviar al Congreso un nuevo proyecto de reajuste para que rija desde el 1 de julio de 2027, consultando al Consejo Superior Laboral.</li>
</ul>

<p>En otras palabras, enero de 2027 no es una negociación nueva entre Gobierno, Congreso y la CUT. Es una actualización automática por inflación, con la regla ya escrita. La negociación de fondo queda para el proyecto que debe ingresar a mediados de 2027.</p>

<h2 id="como-se-calcula">Cómo se calcula el reajuste por IPC</h2>

<p>El IPC mide cuánto cambian, mes a mes, los precios de una canasta de bienes y servicios de los hogares. El INE publica cada mes un índice (base 2023 = 100) y tres variaciones: la mensual, la acumulada en el año y la de doce meses. Ninguna de esas tres coincide con el periodo de la ley, que parte en mayo.</p>

<p>La forma estándar de obtener la variación de un periodo es dividir el índice del último mes por el del mes anterior al inicio, y restar uno. Para mayo a diciembre de 2026, eso sería el índice de diciembre dividido por el de abril. Con un ejemplo de cuentas:</p>

<ul>
<li>Índice de abril de 2026: <strong>112,18</strong> (${ext(INE_ABRIL, 'INE, boletín de abril')}).</li>
<li>Índice de octubre de 2026: <strong>114,13</strong> (${ext(INE_OCTUBRE, 'INE, boletín de octubre')}).</li>
<li>Variación mayo–octubre: 114,13 ÷ 112,18 − 1 = <strong>1,74%</strong>.</li>
</ul>

<p>Ese 1,74% es <strong>parcial</strong>. El número que usará el decreto incluye además noviembre y diciembre. Tampoco sabemos todavía cómo redondeará el decreto el resultado: la ley no lo dice, y en otros reajustes los montos se han fijado en pesos enteros.</p>

<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Una interpretación, no el dato oficial</strong><p>Comparar el índice de diciembre con el de abril es nuestra lectura de "variación acumulada entre el 1 de mayo y el 31 de diciembre". Es la forma habitual de calcular una variación de periodo, pero quien la determina es el INE y quien fija el monto es el decreto de Hacienda. Si el decreto usa otro método, prevalece el decreto.</p></div></aside>

<h2 id="ipc-mes-a-mes">El IPC de 2026 mes a mes</h2>

<p>Estas son las variaciones que el INE publicó para los meses que cuentan para el reajuste. La columna de acumulado en el año sirve para cruzar los datos: entre abril (2,7%) y octubre (4,5%) hay la misma diferencia que muestran los índices.</p>

<div class="table-wrap"><table>
<caption>IPC 2026, meses del periodo de la Ley 21.830 (INE, base 2023 = 100)</caption>
<thead><tr><th scope="col">Mes</th><th scope="col">Variación mensual</th><th scope="col">Acumulado en el año</th><th scope="col">Estado</th></tr></thead>
<tbody>
<tr><td>Abril (referencia)</td><td>1,3%</td><td>2,7%</td><td>Publicado (índice 112,18)</td></tr>
<tr><td>Mayo</td><td>0,2%</td><td>2,8%</td><td>Publicado</td></tr>
<tr><td>Junio</td><td>0,0%</td><td>2,8%</td><td>Publicado</td></tr>
<tr><td>Julio</td><td>0,1%</td><td>2,9%</td><td>Publicado</td></tr>
<tr><td>Agosto</td><td>0,6%</td><td>3,6%</td><td>Publicado</td></tr>
<tr><td>Septiembre</td><td>0,4%</td><td>4,0%</td><td>Publicado</td></tr>
<tr><td>Octubre</td><td>0,5%</td><td>4,5%</td><td>Publicado (índice 114,13)</td></tr>
<tr><td>Noviembre</td><td>—</td><td>—</td><td>Se publica en diciembre de 2026</td></tr>
<tr><td>Diciembre</td><td>—</td><td>—</td><td>Se publica en enero de 2027</td></tr>
</tbody>
</table></div>

<p>Abril aparece en la tabla solo como punto de partida: su alza de 1,3% ocurrió antes del 1 de mayo y no entra en el reajuste. Es uno de los meses con más inflación del año, por eso el 4,5% acumulado en 2026 es bastante mayor que el 1,74% que cuenta para el sueldo mínimo. Confundir ambas cifras es el error más común en las estimaciones que circulan.</p>

<h2 id="escenarios">Escenarios: cuánto cambiaría según el IPC que falta</h2>

<p>La tabla siguiente no es una proyección. Muestra qué pasaría con el ingreso mínimo si noviembre y diciembre sumaran distintas variaciones, aplicando la cuenta de la sección anterior a los $553.553. Los montos están redondeados al peso y sirven para dimensionar, no para pagar sueldos.</p>

<div class="table-wrap"><table>
<caption>Ejercicio hipotético: ingreso mínimo de enero de 2027 según el IPC de noviembre y diciembre (no oficial)</caption>
<thead><tr><th scope="col">IPC noviembre + diciembre (supuesto)</th><th scope="col">Variación mayo–diciembre</th><th scope="col">Ingreso mínimo resultante</th><th scope="col">Alza mensual</th></tr></thead>
<tbody>
<tr><td>0,0%</td><td>1,74%</td><td>$563.175</td><td>$9.622</td></tr>
<tr><td>0,5%</td><td>2,25%</td><td>$566.000 aprox.</td><td>$12.400 aprox.</td></tr>
<tr><td>1,0%</td><td>2,76%</td><td>$568.800 aprox.</td><td>$15.300 aprox.</td></tr>
</tbody>
</table></div>

<p>La cuenta de la primera fila es 553.553 × 114,13 ÷ 112,18. Las otras dos multiplican además por 1,005 y 1,010. Si el IPC de esos dos meses fuese negativo, el resultado bajaría de la primera fila. La ley no dice qué hacer si la variación total llegara a ser negativa; con 1,74% ya acumulado, ese caso requeriría una caída de precios inusual en dos meses.</p>

<h2 id="a-quien-afecta">A quién le cambia algo en enero</h2>

<p>El ingreso mínimo no es solo el piso de los contratos de jornada completa. Muchos otros montos se calculan sobre él, y todos se moverán con el decreto:</p>

<ul>
<li><strong>Jornadas parciales.</strong> Con 30 horas semanales o menos, el mínimo es proporcional: ingreso mínimo × horas ÷ 42. La <a href="/calculadoras/calculadora-sueldo-part-time">calculadora de sueldo part time</a> toma el monto vigente.</li>
<li><strong>Gratificación legal.</strong> El tope anual del artículo 50 del Código del Trabajo es de 4,75 ingresos mínimos, con el valor vigente al 31 de diciembre del año respectivo. Para la gratificación de 2026 importa el monto de diciembre de 2026 ($553.553); el nuevo valor de enero cuenta para el tope de 2027. Puedes revisar el efecto en la <a href="/calculadoras/calculadora-gratificacion-legal">calculadora de gratificación</a>.</li>
<li><strong>Menores de 18 y mayores de 65.</strong> Su mínimo ($412.938) sube en la misma proporción.</li>
<li><strong>Asignación familiar y subsidio familiar.</strong> Los montos por carga no se reajustan con este decreto, pero sí los tramos de ingreso que definen quién recibe cuánto (artículo 6). Quien hoy está cerca del límite de un tramo podría cambiar de tramo. La <a href="/calculadoras/calculadora-asignacion-familiar">calculadora de asignación familiar</a> usa los tramos vigentes.</li>
<li><strong>Fines no remuneracionales.</strong> El ingreso mínimo de $356.815 se usa como unidad en el mínimo diario de los subsidios por licencia médica y en otras normas no laborales. También sube en la misma proporción.</li>
<li><strong>Trabajadoras de casa particular.</strong> Ganan como mínimo el ingreso mínimo general, puertas adentro o puertas afuera con jornada completa.</li>
</ul>

<h2 id="liquido">Qué pasa con el sueldo líquido</h2>

<p>El reajuste es sobre el sueldo bruto. Al líquido llegan los mismos descuentos de siempre: cotización de AFP (10% más la comisión de tu administradora), 7% de salud y, con contrato indefinido, 0,6% de seguro de cesantía. Con el ingreso mínimo actual y Fonasa, el líquido queda en torno a 81% del bruto; el detalle por AFP está en el artículo del <a href="/blog/sueldo-minimo-2026-calcular-liquido">sueldo mínimo 2026 y su líquido</a>. Cuando salga el decreto podrás ingresar el nuevo bruto en la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>.</p>

<p>Hay un detalle que conviene revisar en la liquidación de enero: el aporte del empleador al Seguro Social Previsional de la Ley 21.735 (3,5% desde agosto de 2026) se calcula sobre la remuneración imponible y lo paga el empleador. No se descuenta del líquido, pero sí sube el costo total de contratar, que es lo que la <a href="/calculadoras/calculadora-costo-empleado-pyme">calculadora de costo de un empleado</a> permite revisar.</p>

<h2 id="calendario">Calendario de lo que falta</h2>

<div class="table-wrap"><table>
<caption>Hitos del reajuste de enero de 2027</caption>
<thead><tr><th scope="col">Fecha</th><th scope="col">Hito</th><th scope="col">Estado al 17-11-2026</th></tr></thead>
<tbody>
<tr><td>6 de noviembre de 2026</td><td>INE publica el IPC de octubre (0,5% mensual)</td><td>Ocurrido</td></tr>
<tr><td>Diciembre de 2026</td><td>INE publica el IPC de noviembre</td><td>Pendiente</td></tr>
<tr><td>1 de enero de 2027</td><td>Rige el ingreso mínimo reajustado</td><td>Fijado por ley</td></tr>
<tr><td>Comienzos de enero de 2027</td><td>INE publica el IPC de diciembre</td><td>Pendiente</td></tr>
<tr><td>A más tardar el 15 de enero de 2027</td><td>Decreto de Hacienda con los montos</td><td>Pendiente</td></tr>
<tr><td>A más tardar junio de 2027</td><td>Proyecto de ley para el reajuste de julio de 2027</td><td>Pendiente</td></tr>
</tbody>
</table></div>

<p>La consecuencia práctica de este calendario es que el sueldo de enero, que muchas empresas pagan el último día hábil del mes, se calcula con el decreto ya publicado si Hacienda lo dicta dentro del plazo. Si un empleador paga antes de conocer el monto, o lo paga con el valor anterior, corresponde liquidar la diferencia y ajustar las cotizaciones de ese mes.</p>

<h2 id="que-hacer">Qué conviene hacer ahora</h2>

<p><strong>Si eres trabajador o trabajadora con sueldo mínimo:</strong> en tu liquidación de enero de 2027 el sueldo base debería ser el monto del decreto, no $553.553. Si tu contrato fija un sueldo base igual al mínimo, el cambio es automático por ley; no necesitas firmar un anexo.</p>

<p><strong>Si eres empleador o llevas remuneraciones:</strong> deja preparado el cálculo de enero con el monto como variable y no con una estimación. El costo adicional por trabajador con sueldo mínimo será, en el escenario de la primera fila de la tabla, de unos $9.600 brutos al mes más las cotizaciones de cargo del empleador. Revisa también los contratos part time de 30 horas o menos, porque su piso proporcional cambia en la misma proporción.</p>

<p><strong>Si pagas o recibes una pensión de alimentos fijada en ingresos mínimos:</strong> la Ley 14.908 fija el piso de la pensión para un hijo en 40% del ingreso mínimo remuneracional, de modo que ese piso también sube desde enero. La <a href="/calculadoras/calculadora-pension-alimenticia">calculadora de pensión alimenticia</a> toma el valor vigente.</p>

<p>La pregunta que queda abierta es la de julio. El reajuste de enero solo compensa la inflación de ocho meses; el artículo 7 obliga al Gobierno a presentar en junio de 2027 un proyecto para un nuevo reajuste desde el 1 de julio. Ese monto sí se discutirá en el Congreso y todavía no tiene propuesta.</p>`,
  },
];
