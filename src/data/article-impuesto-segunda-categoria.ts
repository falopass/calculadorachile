import type { Article } from './articles';

const SII_TABLAS = 'https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm';
const SII_NOVIEMBRE = 'https://www.sii.cl/normativa_legislacion/circulares/2026/circu39.pdf';
const SII_BASE = 'https://www.sii.cl/normativa_legislacion/circulares/2020/circu19.pdf';
const SII_RELIQUIDACION =
  'https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_2712.htm';
const SP_COTIZACIONES = 'https://www.spensiones.cl/portal/institucional/594/w3-article-12683.html';
const SP_COMISIONES = 'https://www.spensiones.cl/apps/GetFile.php?id=001&namefile=CAFP2423.pdf';
const CHILEATIENDE_FONASA = 'https://www.chileatiende.gob.cl/fichas/9715-afiliacion-a-fonasa';
const DT_CESANTIA = 'https://www.dt.gob.cl/portal/1628/w3-article-95306.html';

export const articuloImpuestoSegundaCategoria: Article = {
  slug: 'impuesto-segunda-categoria-2026-ejemplo',
  title: 'Impuesto de segunda categoría 2026: cómo calcularlo con la tabla del SII',
  description:
    'Revisa el tramo exento y calcula el impuesto de segunda categoría de tu sueldo con un ejemplo de noviembre de 2026: base tributable, factor y rebaja del SII.',
  seoTitle: 'Impuesto de segunda categoría 2026: tabla SII y ejemplo',
  date: '2026-11-18',
  updatedAt: '2026-11-18',
  category: 'impuestos',
  readingTime: 8,
  keywords: [
    'impuesto de segunda categoría',
    'impuesto único 2026',
    'tabla SII mensual',
    'renta líquida imponible',
    'impuesto al sueldo',
  ],
  relatedCalculators: ['impuesto-segunda-categoria', 'sueldo-liquido'],
  relatedGuia: 'sueldo-liquido-chile',
  sources: [
    { label: 'SII — Tablas de Impuesto Único de Segunda Categoría 2026', url: SII_TABLAS },
    { label: 'SII — Circular 39: tabla de noviembre de 2026', url: SII_NOVIEMBRE },
    { label: 'SII — Circular 19: cotizaciones que pueden rebajarse', url: SII_BASE },
    { label: 'SII — Cuándo corresponde reliquidar el impuesto', url: SII_RELIQUIDACION },
    { label: 'Superintendencia de Pensiones — Cotizaciones previsionales', url: SP_COTIZACIONES },
    { label: 'Superintendencia de Pensiones — Circular 2423: comisiones AFP', url: SP_COMISIONES },
    { label: 'ChileAtiende — Cotización a Fonasa', url: CHILEATIENDE_FONASA },
    { label: 'Dirección del Trabajo — Cotizaciones al Seguro de Cesantía', url: DT_CESANTIA },
  ],
  content: `
<p class="article-lead">Si en noviembre de 2026 tuviste un sueldo imponible de $2.000.000, no corresponde aplicar directamente el 4% al bruto. En el ejemplo de esta nota, después de las cotizaciones queda una base tributable de $1.622.600. Al aplicar el factor y la rebaja de la tabla mensual del Servicio de Impuestos Internos (SII), el impuesto resulta en $25.786,40 antes del redondeo. El tramo exento de ese mes llega hasta $977.940 de <em>base tributable</em>, no de sueldo bruto.</p>
<p>El cálculo usa la <a href="${SII_NOVIEMBRE}" target="_blank" rel="noopener">tabla mensual de noviembre de 2026 de la Circular 39 del SII</a>. Sirve para revisar una liquidación de sueldo dependiente pagado mensualmente. Aunque los montos en pesos cambian con el mes, puedes repetir el procedimiento con la tabla de tu período. Esta nota no calcula boletas de honorarios, pensiones ni una declaración anual.</p>

<h2>Qué monto de tu liquidación entra en la tabla</h2>
<p>El Impuesto Único de Segunda Categoría (IUSC) se aplica a rentas del trabajo dependiente, entre otras rentas del artículo 42 N.º 1 de la Ley sobre Impuesto a la Renta. En una liquidación ordinaria, el empleador calcula el impuesto y lo retiene del sueldo si corresponde. Si la renta queda en el tramo exento, no hay retención de IUSC por ese pago, pero eso no significa que desaparezcan las cotizaciones.</p>
<p>Para revisar el impuesto, distingue estos tres montos de tu liquidación:</p>
<ul>
<li><strong>Remuneración imponible:</strong> es el punto de partida para las cotizaciones del ejemplo. No es necesariamente el total de haberes: ese total puede incluir asignaciones como colación y movilización que, cuando cumplen los requisitos para excluirse, no forman parte de la remuneración imponible.</li>
<li><strong>Renta líquida imponible o base tributable:</strong> la cifra que busca la tabla del SII. En este caso se obtiene al restar de la remuneración afecta las cotizaciones deducibles de cargo del trabajador: pensión, salud y Seguro de Cesantía cuando corresponde, conforme a la <a href="${SII_BASE}" target="_blank" rel="noopener">Circular 19 del SII</a>. Si tu liquidación ya informa la base tributable, no vuelvas a descontar las cotizaciones.</li>
<li><strong>Líquido a pagar:</strong> el monto final de la liquidación. Puede incluir haberes no imponibles y reflejar el impuesto y otros descuentos. Un anticipo de sueldo o una cuota de préstamo puede reducir lo que recibes sin reducir por sí solo la base del impuesto.</li>
</ul>
<p>Los topes de cotización limitan los descuentos previsionales según sus propias reglas. No significan que el sueldo que exceda esos topes esté exento de impuesto. Si tu liquidación incluye ítems especiales o no muestra la base tributable, pide al empleador el detalle de los haberes afectos y los descuentos que usó. Restar toda la columna de descuentos al total de haberes no reemplaza ese desglose.</p>

<h2>Cómo leer la tabla mensual de noviembre de 2026</h2>
<p>En las <a href="${SII_TABLAS}" target="_blank" rel="noopener">tablas 2026 del SII</a>, elige el mes que estás revisando y busca las filas marcadas <strong>Mensual</strong>. El SII también publica filas para otros períodos de pago, con límites y rebajas diferentes. Los tres primeros tramos mensuales de noviembre bastan para seguir los ejemplos de esta nota:</p>
<table class="article-table">
<caption>Primeros tramos mensuales del IUSC, noviembre de 2026</caption>
<thead><tr><th scope="col">Renta líquida imponible desde</th><th scope="col">Hasta</th><th scope="col">Factor</th><th scope="col">Cantidad a rebajar</th></tr></thead>
<tbody>
<tr><td>—</td><td>$977.940,00</td><td>Exento</td><td>—</td></tr>
<tr><td>$977.940,01</td><td>$2.173.200,00</td><td>0,04</td><td>$39.117,60</td></tr>
<tr><td>$2.173.200,01</td><td>$3.622.000,00</td><td>0,08</td><td>$126.045,60</td></tr>
</tbody>
</table>
<p>Primero ubica tu base tributable entre «Desde» y «Hasta». Si cae en un tramo afecto, multiplica <em>la base completa</em> por el factor de esa fila y resta la cantidad a rebajar de la misma fila. La rebaja ya incorpora el efecto de los tramos inferiores. Por eso no tienes que deducir primero el umbral exento ni descontar cada rebaja de la tabla por separado. Si tu base excede el último monto mostrado aquí, sigue en la tabla completa del SII.</p>
<p>El tramo exento mensual llega a 13,5 unidades tributarias mensuales (UTM). La UTM de noviembre fue de $72.440, según la Circular 39: al multiplicarla por 13,5 obtienes $977.940. Para calcular en pesos puedes tomar directamente la fila publicada por el SII, sin convertir tu sueldo a UTM ni redondear esa conversión.</p>

<h2>Ejemplo paso a paso: sueldo imponible de $2.000.000</h2>
<p>Imagina un sueldo de noviembre con un solo empleador, contrato indefinido sujeto al Seguro de Cesantía, AFP Habitat y Fonasa. Para simplificar, toda la remuneración del ejemplo es afecta, las cotizaciones se calculan sobre el monto completo porque no alcanza los topes y no hay otros haberes ni rebajas especiales. El bruto imponible de $2.000.000 es un supuesto, no una cifra oficial de sueldos.</p>
<p>El trabajador aporta <a href="${SP_COTIZACIONES}" target="_blank" rel="noopener">10% a la cuenta individual AFP</a>; en Habitat se suma una <a href="${SP_COMISIONES}" target="_blank" rel="noopener">comisión de 1,27%</a>. Se descuenta, además, el <a href="${CHILEATIENDE_FONASA}" target="_blank" rel="noopener">7% de Fonasa</a> y el <a href="${DT_CESANTIA}" target="_blank" rel="noopener">0,6% de cesantía a cargo del trabajador</a> del ejemplo. No se restan los aportes que paga el empleador con cargo propio.</p>
<div class="numeric-example">
<div class="numeric-example__title">De la remuneración a la retención de noviembre</div>
<ol>
<li><strong>Cotizaciones:</strong> AFP $225.400 + Fonasa $140.000 + cesantía $12.000 = $377.400.</li>
<li><strong>Base tributable:</strong> $2.000.000 − $377.400 = $1.622.600.</li>
<li><strong>Factor y rebaja:</strong> la base está entre $977.940,01 y $2.173.200,00. Corresponden 0,04 y $39.117,60.</li>
<li><strong>Impuesto:</strong> $1.622.600 × 0,04 − $39.117,60 = $64.904,00 − $39.117,60 = $25.786,40.</li>
</ol>
<span class="total">Impuesto mensual estimado al peso: $25.786</span>
</div>
<p>El 4% identifica el factor del tramo, no la fracción del bruto ni de la base que se retiene. La retención de este ejemplo representa cerca del 1,59% de la base tributable, o 1,29% si la comparas con el sueldo bruto imponible. Son dos denominadores distintos. La columna del SII llamada «Tasa de impuesto efectiva, máxima por cada tramo de renta» tampoco sustituye el cálculo: indica el máximo del tramo, no la tasa personal de todos quienes caen en él.</p>

<h2>Qué pasa si una comisión te hace subir de tramo</h2>
<p>Para aislar el efecto, supón que otro trabajador tiene una <em>base tributable</em> de $2.200.000 en noviembre después de sus cotizaciones, incluida una comisión ordinaria afecta del mes. Ya no corresponde la fila de factor 0,04: la base supera los $2.173.200 y entra a la de factor 0,08. El cálculo es $2.200.000 × 0,08 − $126.045,60 = $49.954,40.</p>
<p>Subir de tramo no significa volver a gravar todos los pesos anteriores al nuevo porcentaje. En el límite del tramo anterior, $2.173.200 de base, el impuesto era $47.810,40. Los $26.800 de base por encima de ese límite suman $2.144 de impuesto, que equivalen al 8% de ese exceso. La diferencia entre ambas rebajas hace que la fórmula del SII entregue ese mismo resultado sin dividir manualmente la renta en tramos.</p>
<p>Esta comparación vale para una comisión del período usada como ejemplo. Si la liquidación incluye un pago retroactivo o un ajuste de remuneraciones de otros meses, no des por hecho que debes sumar todo a la base del mes en que viste el depósito. Pide el detalle del período al que corresponde el pago y cómo se determinó la retención.</p>

<h2>Por qué el mismo sueldo puede dar otro impuesto en diciembre</h2>
<p>El umbral en UTM se mantiene en los dos meses, pero cambia su valor en pesos. La tabla mensual de diciembre de 2026 publicada por el SII indica un tramo exento hasta $982.827 y una rebaja de $39.313,08 para la fila de factor 0,04. Si solo cambiara la tabla y mantuvieras la base de $1.622.600, el impuesto de diciembre sería $25.590,92 antes del redondeo. La diferencia nace de la rebaja en pesos del mes; el factor sigue siendo 0,04 en los dos casos.</p>
<p>Si comparas liquidaciones, revisa por separado si cambió la base (por ejemplo, por sueldo variable), si cambió la fila que le corresponde y si cambió la tabla del mes. Cerca de la exención, una base que permanece idéntica puede quedar de un lado u otro del límite cuando cambia la UTM. El monto en pesos mencionado en una nota de noviembre no sirve como umbral fijo para todo 2026.</p>

<h2>Cómo contrastar la retención con la calculadora</h2>
<p>En la <a href="/calculadoras/calculadora-impuesto-segunda-categoria">calculadora de impuesto de segunda categoría</a>, escribe el <strong>bruto imponible</strong> en «Sueldo Bruto Mensual»: $2.000.000 para el primer caso, no $1.622.600. La herramienta ya rebaja las cotizaciones bajo los supuestos de AFP Habitat, Fonasa y contrato indefinido. Revisa primero «Base tributable mensual» y luego «Impuesto Mensual». Si pegas la base en lugar del bruto, la herramienta restará cotizaciones por segunda vez y la comparación no servirá.</p>
<p>La calculadora usa su UTM de referencia y no permite seleccionar un mes histórico. Los $25.786 corresponden a noviembre con UTM de $72.440; cuando cambia la UTM de referencia, no esperes que la herramienta repita esa cifra. Para cotejar un período pasado, conserva la base de tu liquidación y usa las filas mensuales del SII de ese período. Si tu AFP, salud o contrato difieren de los supuestos del ejemplo, puedes estimar esas cotizaciones con la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>.</p>

<h2>Retención mensual y reliquidación anual no son lo mismo</h2>
<p>El descuento de la liquidación corresponde a un pago mensual. La cifra anual que proyecta la calculadora al indicar meses trabajados multiplica ese impuesto mensual estimado por el número de meses: no suma liquidaciones reales ni aplica la escala anual. Por ejemplo, si tu sueldo cambió durante el año, una sola base mensual no representa lo que percibiste ni lo que te retuvieron en cada período.</p>
<p>El <a href="${SII_RELIQUIDACION}" target="_blank" rel="noopener">SII distingue entre reliquidación obligatoria y voluntaria</a>. Si recibiste rentas afectas de dos empleadores o pagadores simultáneamente, revisa la obligación de reliquidar: las retenciones se pudieron calcular por separado, mientras que la reliquidación considera las rentas del año en conjunto. Si tuviste un solo empleador, solo ese tipo de renta y no estás obligado a declarar el Global Complementario, el SII contempla la opción de reliquidar voluntariamente. Haber trabajado parte del año o haber recibido bonos variables puede hacer útil revisar esa opción; no garantiza devolución. Si también emitiste boletas de honorarios, no uses la tabla de sueldos para calcular la retención de la boleta ni para cerrar tu impuesto anual.</p>
<p>Para revisar una diferencia en tu retención, empieza por pedir la base tributable que usó el empleador y confirma mes, factor y rebaja antes de compararla con el cálculo. Si tu duda es anual, reúne las liquidaciones y revisa la <a href="/guias/preparacion-operacion-renta-2027-checklist">guía de preparación de la Operación Renta 2027</a>. Para identificar cada concepto de la liquidación, consulta la <a href="/guias/sueldo-liquido-chile">guía de sueldo líquido en Chile</a>.</p>

<aside class="callout callout--warning"><div class="callout__body"><strong>Alcance del ejemplo</strong><p>Contenido informativo, no asesoría tributaria. Los resultados son referenciales. Para una diferencia concreta, contrasta tu liquidación con la tabla oficial del período y consulta a tu empleador o a un profesional tributario si hay partidas especiales.</p></div></aside>
`,
};
