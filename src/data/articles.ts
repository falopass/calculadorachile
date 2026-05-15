// ============================================
// Blog — artículos cortos y prácticos
// ----------------------------------------------
// Cada artículo apunta a una intención de búsqueda específica con
// un formato más conciso que las guías pillar (800-1500 palabras).
// Sirve como puerta de entrada a las calculadoras y a las guías.
//
// Convenciones:
//   - HTML serializado con clases ".callout", ".numeric-example",
//     ".data-grid", ".steps" definidas en globals.css.
//   - Cada artículo cierra con un párrafo "Para profundizar…" que
//     enlaza a la guía pillar correspondiente.
// ============================================

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  keywords: string[];
  content: string;
  relatedCalculators: string[];
  /** Slug de la guía pillar relacionada (opcional). */
  relatedGuia?: string;
  /** Tiempo de lectura estimado (minutos). */
  readingTime?: number;
}

export const articles: Article[] = [
  {
    slug: 'como-calcular-finiquito-chile',
    title: 'Cómo calcular tu finiquito en Chile 2026 paso a paso',
    description:
      'Guía paso a paso para calcular tu finiquito: indemnización, vacaciones proporcionales y gratificación. Con ejemplos en CLP y bases legales.',
    date: '2026-03-30',
    category: 'laboral',
    readingTime: 8,
    relatedGuia: 'finiquito-laboral-chile',
    keywords: [
      'finiquito Chile',
      'calcular finiquito',
      'indemnización años servicio',
      'vacaciones proporcionales',
      'Código del Trabajo',
      'art 161',
    ],
    relatedCalculators: [
      'calculadora-finiquito',
      'calculadora-indemnizacion-anos-servicio',
      'calculadora-vacaciones-proporcionales',
    ],
    content: `<h2>¿Qué es el finiquito?</h2>
<p>El finiquito es el documento legal que pone término a la relación laboral entre empleador y trabajador. Detalla los pagos finales que corresponden al trabajador según la causal de término. Está regulado por los artículos 9, 159 a 163, 168, 172 y 177 del Código del Trabajo.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Validez del finiquito</strong><p>Para tener fuerza liberatoria debe firmarse ante ministro de fe (notario, inspector del trabajo) y pagarse en su totalidad en el acto. Sin estas formalidades, el trabajador puede impugnar diferencias hasta 2 años después.</p></div></aside>

<h2>Componentes del finiquito</h2>
<p>Un finiquito puede incluir uno o más de los siguientes conceptos, según la causal de término:</p>
<ul>
<li><strong>Sueldo devengado:</strong> días trabajados del último mes no pagados.</li>
<li><strong>Vacaciones proporcionales:</strong> días de feriado legal calculados proporcionalmente a los meses trabajados.</li>
<li><strong>Vacaciones pendientes:</strong> días de vacaciones de años anteriores que no se tomaron.</li>
<li><strong>Indemnización por años de servicio:</strong> 30 días por cada año (despido sin causa o mutuo acuerdo con indemnización).</li>
<li><strong>Indemnización sustitutiva del aviso:</strong> 1 mes adicional si despiden sin avisar 30 días antes.</li>
<li><strong>Gratificación proporcional:</strong> parte proporcional de la gratificación anual.</li>
</ul>

<h2>Cálculo de la indemnización por años de servicio</h2>
<p>Según el Art. 163 del Código del Trabajo: 30 días de la última remuneración mensual por cada año de servicio o fracción superior a 6 meses. La base incluye sueldo + gratificación, excluye colación y movilización (Art. 172).</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: sueldo $800.000, 5 años</div><ul><li>Indemnización = $800.000 × 5 años</li><li>Tope: 11 años (este caso está bajo)</li><li>Base máxima: 90 UF (este caso está bajo)</li></ul><span class="total">Total indemnización: $4.000.000</span></div>

<h2>Cálculo de las vacaciones proporcionales</h2>
<p>Se calculan dividiendo los 15 días hábiles anuales entre 12 meses, dando 1,25 días por mes trabajado. El valor de cada día se obtiene dividiendo el sueldo mensual por 30.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: sueldo $600.000, 8 meses</div><ul><li>Días proporcionales: 8 × 1,25 = 10 días</li><li>Valor del día: $600.000 ÷ 30 = $20.000</li></ul><span class="total">Total vacaciones: $200.000</span></div>

<h2>¿Tengo derecho a indemnización si renuncio?</h2>
<p>No. La indemnización por años de servicio solo corresponde cuando el empleador pone término al contrato (despido injustificado, necesidades de la empresa, o mutuo acuerdo con indemnización). Si renuncias voluntariamente, solo recibes días trabajados y vacaciones.</p>

<h2>Plazo de pago</h2>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>10 días hábiles</strong><p>El empleador tiene un plazo de 10 días hábiles desde la separación del trabajador para pagar el finiquito. Si no paga, puedes reclamar en la Inspección del Trabajo, demandar judicialmente (prescripción 2 años) y exigir intereses según la TMC.</p></div></aside>

<h2>Bases legales</h2>
<ul>
<li>Art. 159 al 163 del Código del Trabajo (causales y consecuencias)</li>
<li>Art. 67 al 70 (vacaciones)</li>
<li>Art. 172 (base de cálculo, excluye colación y movilización)</li>
<li>Art. 177 (formalidades del finiquito)</li>
<li>Ley 21.133 (trabajadores independientes)</li>
</ul>
<p>Para el detalle completo con todos los casos especiales, lee la <a href="/guias/finiquito-laboral-chile">guía de finiquito laboral en Chile 2026</a> o calcula tu caso específico con la <a href="/calculadoras/calculadora-finiquito">calculadora de finiquito</a>.</p>
<p>Fuentes: <a href="https://www.bcn.cl" target="_blank" rel="noopener">Biblioteca del Congreso Nacional (BCN)</a>, <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>.</p>`,
  },
  {
    slug: 'diferencia-sueldo-bruto-liquido',
    title: 'Diferencia entre sueldo bruto y líquido en Chile 2026',
    description:
      'Entiende la diferencia entre sueldo bruto y líquido. Descubre cuánto te descuentan por AFP, salud, cesantía e impuesto único en Chile.',
    date: '2026-03-30',
    category: 'laboral',
    readingTime: 7,
    relatedGuia: 'sueldo-liquido-chile',
    keywords: [
      'sueldo bruto líquido',
      'descuentos legales Chile',
      'AFP salud cesantía',
      'sueldo líquido 2026',
      'tope imponible 89.9 UF',
    ],
    relatedCalculators: [
      'calculadora-sueldo-liquido',
      'calculadora-costo-empleado-pyme',
      'calculadora-comparador-afp',
    ],
    content: `<h2>¿Qué es el sueldo bruto?</h2>
<p>El sueldo bruto es el monto total que el empleador acuerda pagarte antes de cualquier descuento legal. Es el número que aparece en tu contrato de trabajo. No es lo que llega a tu cuenta bancaria.</p>

<h2>¿Qué es el sueldo líquido?</h2>
<p>El sueldo líquido es el dinero que efectivamente recibes en tu cuenta después de todos los descuentos legales obligatorios. Es el monto real con el que cuentas para tus gastos mensuales.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Diferencia típica</strong><p>El factor de conversión bruto → líquido oscila entre 77% y 83% según AFP, sistema de salud y si caes en tramos de impuesto único. De cada $1 millón bruto, recibes $770.000 a $830.000 líquidos.</p></div></aside>

<h2>Descuentos legales obligatorios</h2>
<p>Los descuentos suman aproximadamente 17%-20% del sueldo bruto:</p>
<ul>
<li><strong>Cotización AFP (10% + comisión):</strong> el 10% va a tu cuenta de capitalización individual. La comisión varía entre 0,46% (AFP Uno) y 1,45% (ProVida).</li>
<li><strong>Cotización de salud (7%):</strong> a FONASA o tu Isapre. Si tu plan de Isapre cuesta más del 7%, pagas el costo total del plan.</li>
<li><strong>Seguro de cesantía (0,6%):</strong> solo en contratos indefinidos. El empleador aporta 2,4% adicional (3% para contratos plazo fijo, todo del empleador).</li>
<li><strong>Impuesto único de segunda categoría:</strong> solo si tu base tributable supera 13,5 UTM mensuales (~$952.880 con UTM mayo 2026).</li>
</ul>

<h2>Ejemplo práctico 2026</h2>
<div class="numeric-example"><div class="numeric-example__title">Sueldo bruto $800.000, AFP Habitat (1,27%), FONASA</div><ul><li>AFP (11,27%): $800.000 × 11,27% = $90.160</li><li>Salud FONASA (7%): $800.000 × 7% = $56.000</li><li>Seguro cesantía (0,6%): $800.000 × 0,6% = $4.800</li><li>Impuesto único: $0 (base tributable bajo 13,5 UTM)</li><li>Total descuentos: $150.960</li></ul><span class="total">Sueldo líquido: $649.040</span></div>

<h2>El tope imponible 2026</h2>
<p>Las cotizaciones se calculan sobre la remuneración imponible, con tope de <strong>89,9 UF</strong> mensuales (~$3.626.566 con UF mayo 2026). Si ganas más, las cotizaciones se calculan solo hasta ese tope. Esto reduce el porcentaje efectivo de descuento para sueldos altos.</p>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Cesantía tiene tope distinto</strong><p>El seguro de cesantía tiene tope imponible 134,9 UF (más alto que AFP/Salud). Esto puede confundir al revisar liquidaciones de sueldos altos.</p></div></aside>

<h2>La gratificación legal</h2>
<p>La gratificación legal equivale al 25% de tu remuneración mensual con tope anual de 4,75 ingresos mínimos mensuales. La mayoría de empleadores la pagan mensualmente incluida en el sueldo bruto, pero técnicamente es un haber distinto.</p>
<p>Para profundizar en cada concepto y casos especiales (Isapre con plan UF, sueldos sobre el tope, bonos no imponibles), lee la <a href="/guias/sueldo-liquido-chile">guía de sueldo líquido en Chile 2026</a>. O calcula tu caso con la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>.</p>
<p>Fuentes: <a href="https://www.spensiones.cl" target="_blank" rel="noopener">Superintendencia de Pensiones</a>, <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, <a href="https://www.sii.cl" target="_blank" rel="noopener">SII</a>.</p>`,
  },
  {
    slug: 'guia-iva-chile-2026',
    title: 'Guía del IVA en Chile 2026: cómo calcularlo correctamente',
    description:
      'Guía completa sobre el IVA en Chile: qué es, cómo se calcula, quién lo paga, exenciones y cuándo aplica el 19%. Con ejemplos prácticos en CLP.',
    date: '2026-03-30',
    category: 'impuestos',
    readingTime: 7,
    relatedGuia: 'iva-boleta-honorarios-chile',
    keywords: [
      'IVA Chile',
      'impuesto valor agregado',
      '19% IVA',
      'calcular IVA',
      'precio neto bruto',
      'exenciones IVA',
    ],
    relatedCalculators: [
      'calculadora-iva',
      'calculadora-boleta-honorarios',
      'calculadora-costo-empleado-pyme',
    ],
    content: `<h2>¿Qué es el IVA?</h2>
<p>El Impuesto al Valor Agregado (IVA) es un tributo indirecto del 19% que se aplica a la venta de bienes muebles, prestación de servicios e importaciones en Chile. Fue instaurado en 1974 (DL 825) y su tasa actual se mantiene en 19% desde 2003.</p>

<h2>¿Cómo se calcula?</h2>
<p>Hay dos operaciones fundamentales:</p>
<ul>
<li><strong>Agregar IVA:</strong> precio neto × 1,19 = precio bruto.</li>
<li><strong>Quitar IVA:</strong> precio bruto ÷ 1,19 = precio neto.</li>
</ul>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: producto neto $100.000</div><ul><li>Precio neto: $100.000</li><li>IVA (19%): $19.000</li><li>Precio bruto facturado: $119.000</li></ul><span class="total">Cliente paga $119.000 — empresa entera $19.000 al SII</span></div>

<h2>¿Quién paga el IVA?</h2>
<p>El consumidor final es quien realmente paga el IVA. Los vendedores y prestadores de servicios actúan como agentes retenedores: cobran el IVA al cliente y luego lo declaran y pagan al Servicio de Impuestos Internos (SII).</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Mecanismo de débito y crédito fiscal</strong><p>Una empresa cobra IVA en sus ventas (débito fiscal) y paga IVA en sus compras (crédito fiscal). En el F29 mensual declara la diferencia: si débito &gt; crédito, paga; si crédito &gt; débito, lo arrastra al mes siguiente.</p></div></aside>

<h2>Bienes y servicios exentos</h2>
<p>El artículo 12 del DL 825 lista los exentos:</p>
<ul>
<li>Servicios profesionales prestados por personas naturales (van con boleta de honorarios)</li>
<li>Servicios de educación</li>
<li>Salud prestada por hospitales y clínicas</li>
<li>Transporte público de pasajeros</li>
<li>Seguros de vida y salud</li>
<li>Venta de libros, diarios y revistas</li>
<li>Servicios financieros (créditos, depósitos)</li>
<li>Exportaciones</li>
</ul>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Cambio Ley 21.420 (2023)</strong><p>Desde el 1 de enero de 2023, los servicios profesionales prestados por <em>sociedades</em> sí están afectos a IVA, salvo que se constituyan como sociedad de profesionales clasificada en 2da categoría.</p></div></aside>

<h2>IVA en boletas y facturas</h2>
<p>Las boletas de venta incluyen el IVA en el precio final. Las facturas separan el valor neto del IVA, lo que es importante para empresas que pueden recuperar el crédito fiscal.</p>

<h2>Declaración mensual</h2>
<p>Los contribuyentes deben declarar el IVA mensualmente en el Formulario 29 del SII, dentro de los primeros 12 días del mes siguiente. La declaración incluye débito fiscal (IVA cobrado) y crédito fiscal (IVA pagado en compras).</p>
<p>Para profundizar y ver el detalle de la boleta de honorarios, lee la <a href="/guias/iva-boleta-honorarios-chile">guía de IVA y boleta de honorarios</a> o calcula con la <a href="/calculadoras/calculadora-iva">calculadora de IVA</a>.</p>
<p>Fuentes: <a href="https://www.sii.cl" target="_blank" rel="noopener">Servicio de Impuestos Internos</a>, DL 825 sobre Impuesto a las Ventas y Servicios.</p>`,
  },
  {
    slug: 'todo-sobre-uf-chile',
    title: 'Todo sobre la UF en Chile: qué es y cómo se usa',
    description:
      'Guía completa sobre la Unidad de Fomento (UF) en Chile: qué es, cómo se actualiza, para qué se usa y cómo convertirla a pesos.',
    date: '2026-03-30',
    category: 'educacion-financiera',
    readingTime: 6,
    relatedGuia: 'uf-utm-indicadores-chile',
    keywords: [
      'UF Chile',
      'Unidad de Fomento',
      'valor UF',
      'convertir UF CLP',
      'UF inflación',
      'reajuste UF diario',
    ],
    relatedCalculators: [
      'calculadora-uf-clp',
      'calculadora-reajuste-arriendo',
      'calculadora-credito-hipotecario',
    ],
    content: `<h2>¿Qué es la UF?</h2>
<p>La Unidad de Fomento (UF) es una unidad de cuenta reajustable según la inflación, creada en Chile en 1967. Su valor se actualiza diariamente según la variación del Índice de Precios al Consumidor (IPC) del mes anterior. Se usa para mantener el valor real del dinero en contratos y transacciones de largo plazo.</p>
<ul class="data-grid"><li><span class="data-grid__label">Valor UF mayo 2026</span><span class="data-grid__value">$40.340</span></li><li><span class="data-grid__label">Reajuste</span><span class="data-grid__value">Diario por IPC</span></li><li><span class="data-grid__label">Origen</span><span class="data-grid__value">Decreto 40 de 1967</span></li><li><span class="data-grid__label">Calcula</span><span class="data-grid__value">Banco Central</span></li></ul>

<h2>¿Cuánto vale la UF?</h2>
<p>En mayo 2026 la UF vale aproximadamente $40.340 pesos chilenos. El Banco Central de Chile publica los valores con un día de anticipación. Los fines de semana y festivos mantiene el valor del último día hábil.</p>

<h2>¿Para qué se usa?</h2>
<ul>
<li><strong>Créditos hipotecarios:</strong> dividendos en UF, pago en pesos varía mes a mes.</li>
<li><strong>Arriendos:</strong> muchos contratos están en UF para protección contra inflación.</li>
<li><strong>Seguros:</strong> pólizas suelen expresarse en UF.</li>
<li><strong>Multas y sanciones:</strong> algunas multas SII y judiciales se calculan en UF.</li>
<li><strong>Contratos de largo plazo:</strong> cualquier contrato que necesite mantener su valor real.</li>
<li><strong>Topes legales:</strong> AFP/Salud (89,9 UF) y cesantía (134,9 UF) son topes mensuales.</li>
</ul>

<h2>¿Cómo convertir UF a pesos?</h2>
<div class="numeric-example"><div class="numeric-example__title">Conversiones rápidas con UF $40.340</div><ul><li>50 UF × $40.340 = <strong>$2.017.000</strong></li><li>$1.000.000 ÷ $40.340 = <strong>24,79 UF</strong></li><li>3.000 UF (vivienda típica) × $40.340 = <strong>$121.020.000</strong></li></ul><span class="total">Usa siempre el valor de la UF del día específico</span></div>

<h2>¿Por qué es mejor que pesos para contratos largos?</h2>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Protección contra inflación</strong><p>La UF se reajusta con la inflación, por lo que 100 UF de hoy tendrán el mismo poder adquisitivo dentro de 10 años. Si firmas un contrato en pesos, la inflación erosiona el valor real con el tiempo. Por eso los créditos hipotecarios y arriendos altos están en UF.</p></div></aside>

<h2>¿Quién la calcula?</h2>
<p>El Banco Central de Chile es la institución encargada de calcular y publicar el valor diario de la UF, según la variación del IPC que publica el INE. Los valores oficiales están en <a href="https://www.bcentral.cl/inicio/indicadores" target="_blank" rel="noopener">bcentral.cl/indicadores</a>.</p>
<p>Para ver la UF junto con UTM, IPC, dólar y otros indicadores en una guía completa, lee <a href="/guias/uf-utm-indicadores-chile">UF, UTM e IPC en Chile</a>. Para conversiones rápidas usa la <a href="/calculadoras/calculadora-uf-clp">calculadora UF a CLP</a>.</p>
<p>Fuentes: <a href="https://www.bcentral.cl" target="_blank" rel="noopener">Banco Central de Chile</a>, <a href="https://www.ine.gob.cl" target="_blank" rel="noopener">INE</a>.</p>`,
  },
  {
    slug: 'boleta-honorarios-completo',
    title: 'Guía completa de boleta de honorarios en Chile 2026',
    description:
      'Todo sobre la boleta de honorarios: retención 15,25%, cómo emitirla, monto líquido y obligaciones tributarias para independientes.',
    date: '2026-03-30',
    category: 'impuestos',
    readingTime: 8,
    relatedGuia: 'iva-boleta-honorarios-chile',
    keywords: [
      'boleta honorarios',
      'retención 15.25%',
      'honorarios Chile',
      'independientes SII',
      'impuesto profesionales',
      'Ley 21.578',
    ],
    relatedCalculators: [
      'calculadora-boleta-honorarios',
      'calculadora-operacion-renta',
      'calculadora-ppm',
    ],
    content: `<h2>¿Qué es la boleta de honorarios?</h2>
<p>La boleta de honorarios electrónica es un documento tributario que emiten las personas naturales por servicios profesionales o técnicos prestados de forma independiente, sin relación laboral con el cliente. Se emite electrónicamente a través del sitio del SII desde 2017.</p>

<h2>Retención 2026: 15,25%</h2>
<p>La <strong>Ley 21.578 de 2023</strong> estableció un calendario progresivo de retención. En 2026, la retención total es del 15,25% del monto bruto:</p>
<table>
<thead><tr><th>Año</th><th>Retención total</th><th>Impuesto renta</th><th>Cotización previsional</th></tr></thead>
<tbody>
<tr><td>2025</td><td>14,5%</td><td>10%</td><td>4,5%</td></tr>
<tr><td><strong>2026</strong></td><td><strong>15,25%</strong></td><td>10%</td><td>5,25%</td></tr>
<tr><td>2027</td><td>16%</td><td>10%</td><td>6%</td></tr>
<tr><td>2028</td><td>17%</td><td>10%</td><td>7%</td></tr>
</tbody>
</table>
<div class="numeric-example"><div class="numeric-example__title">Boleta bruta $500.000 en 2026</div><ul><li>Bruto: $500.000</li><li>Retención (15,25%): $76.250</li><li>— Impuesto renta (10%): $50.000</li><li>— Cotización previsional (5,25%): $26.250</li></ul><span class="total">Líquido recibido: $423.750</span></div>

<h2>¿Quiénes pueden emitir?</h2>
<p>Toda persona natural que preste servicios profesionales o técnicos de forma independiente: abogados, contadores, diseñadores, programadores, consultores, profesores particulares, y cualquier profesional que no tenga relación laboral con su cliente.</p>

<h2>¿Cómo se emite?</h2>
<ol class="steps">
<li>Ingresa a <a href="https://www.sii.cl" target="_blank" rel="noopener">sii.cl</a> con tu RUT y clave tributaria.</li>
<li>Ve a "Servicios Online" → "Emisión de Documentos" → "Boleta de Honorarios Electrónica".</li>
<li>Ingresa los datos del pagador (RUT y razón social), monto y descripción del servicio.</li>
<li>El sistema calcula automáticamente la retención y emite la boleta en PDF.</li>
<li>El SII envía copia al pagador automáticamente.</li>
</ol>

<h2>¿Estoy exento de retención?</h2>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Persona natural no retiene</strong><p>Si emites a una persona natural (no a una empresa), no hay retención y tú declaras y pagas directamente. Si emites a una empresa, la retención es obligatoria y la empresa la entera al SII al mes siguiente.</p></div></aside>
<p>También hay exenciones especiales para personas que cotizan poco al año o pensionados que pueden eximirse de la cotización previsional con declaración jurada anual.</p>

<h2>¿Qué pasa en la Operación Renta?</h2>
<p>La retención del 15,25% es un pago provisional. En tu declaración anual (Formulario 22 en abril) se calcula el impuesto real considerando todos tus ingresos del año, gastos presuntos (30%, tope 15 UTA) o gastos efectivos. Si pagaste de más, recibes devolución; si pagaste de menos, debes la diferencia.</p>

<h2>Cotizaciones obligatorias para independientes</h2>
<p>La Ley 21.133 estableció la cotización obligatoria para honorarios independientes, que se paga de forma anual en la Operación Renta. La porción "previsional" del 5,25% (en 2026) se descompone en AFP, salud (FONASA o Isapre), SIS y Mutual de Seguridad.</p>
<p>Para ver el detalle completo de la operación renta de independientes y cómo optimizar, lee la <a href="/guias/iva-boleta-honorarios-chile">guía de IVA y boleta de honorarios</a>. Calcula tu líquido con la <a href="/calculadoras/calculadora-boleta-honorarios">calculadora de boleta de honorarios</a>.</p>
<p>Fuentes: <a href="https://www.sii.cl" target="_blank" rel="noopener">SII</a>, Ley 21.578, Ley sobre Impuesto a la Renta.</p>`,
  },
  {
    slug: 'guia-horas-extra-chile',
    title: 'Guía completa de horas extra en Chile 2026',
    description:
      'Todo sobre horas extraordinarias en Chile: recargo 50%, tope máximo, cómo calcular el valor hora extra y qué dice el Código del Trabajo.',
    date: '2026-03-30',
    category: 'laboral',
    readingTime: 6,
    relatedGuia: 'sueldo-liquido-chile',
    keywords: [
      'horas extra Chile',
      'horas extraordinarias',
      'recargo 50%',
      'tope horas extra',
      'Código del Trabajo',
      'art 30 32',
    ],
    relatedCalculators: [
      'calculadora-horas-extra',
      'calculadora-sueldo-liquido',
      'calculadora-costo-empleado-pyme',
    ],
    content: `<h2>¿Qué son las horas extra?</h2>
<p>Las horas extraordinarias son aquellas que se trabajan fuera de la jornada laboral ordinaria, con un máximo de 2 horas diarias. Solo pueden pactarse para atender necesidades o situaciones temporales (Art. 30 del Código del Trabajo).</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Pacto escrito (Art. 32)</strong><p>Las horas extra deben pactarse por escrito entre empleador y trabajador. Sin pacto, el trabajador no está obligado a quedarse después de su jornada. El empleador debe llevar un registro detallado del tiempo trabajado.</p></div></aside>

<h2>¿Cuánto se paga?</h2>
<p>Las horas extra se pagan con un recargo del <strong>50%</strong> sobre el valor de la hora ordinaria (Art. 32). Si trabajas en domingo o festivos, el recargo es del <strong>100%</strong>.</p>

<h2>Cálculo del valor hora extra</h2>
<p>Fórmula:</p>
<ul>
<li><strong>Valor hora ordinaria</strong> = sueldo bruto ÷ 30 ÷ horas diarias de jornada (típicamente 8).</li>
<li><strong>Valor hora extra</strong> = valor hora ordinaria × 1,50 (o × 2,00 en domingo/festivo).</li>
</ul>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: sueldo $600.000, jornada 8 horas</div><ul><li>Valor hora ordinaria: $600.000 ÷ 30 ÷ 8 = <strong>$2.500</strong></li><li>Valor hora extra (50%): $2.500 × 1,5 = <strong>$3.750</strong></li><li>Hora extra domingo (100%): $2.500 × 2 = <strong>$5.000</strong></li></ul><span class="total">10 horas extra/mes ≈ $37.500 adicionales</span></div>

<h2>Tope de horas extra</h2>
<p>No puedes trabajar más de 2 horas extra diarias. En casos calificados y con autorización de la Dirección del Trabajo, se puede extender hasta 4 horas diarias en períodos temporales (estacionalidad).</p>

<h2>¿Afectan las cotizaciones?</h2>
<p>Sí. Las horas extra son haber imponible y están afectas a cotizaciones previsionales (AFP, salud, seguro de cesantía) e impuesto único de segunda categoría. Se deben declarar en la planilla de remuneraciones del mes correspondiente.</p>

<h2>¿Puedo negarme a hacer horas extra?</h2>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Las horas extra son voluntarias</strong><p>El empleador no puede obligarte a trabajar horas extra sin pacto previo. Si firmaste un pacto general anual, puedes desistir con aviso razonable. Las represalias por negarse a horas extra constituyen práctica antisindical o despido injustificado.</p></div></aside>

<h2>Reducción de jornada (Ley 21.561)</h2>
<p>La Ley 40 horas (Ley 21.561 de 2023) reduce gradualmente la jornada ordinaria de 45 a 40 horas semanales:</p>
<ul>
<li><strong>Abril 2024</strong>: 44 horas semanales.</li>
<li><strong>Abril 2026</strong>: 42 horas semanales.</li>
<li><strong>Abril 2028</strong>: 40 horas semanales.</li>
</ul>
<p>Esto NO reduce el sueldo y aumenta el valor de la hora ordinaria, lo que indirectamente sube el valor de las horas extra. Calcula tu hora extra con la <a href="/calculadoras/calculadora-horas-extra">calculadora de horas extra</a>.</p>
<p>Fuentes: <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, <a href="https://www.bcn.cl" target="_blank" rel="noopener">BCN</a>, Código del Trabajo Arts. 30-32, Ley 21.561.</p>`,
  },
  {
    slug: 'como-funciona-gratificacion-legal',
    title: 'Cómo funciona la gratificación legal en Chile 2026',
    description:
      'Explicación clara de la gratificación legal: 25% de remuneración, tope 4,75 IMM, quién tiene derecho y cómo se calcula mensual o anualmente.',
    date: '2026-03-30',
    category: 'laboral',
    readingTime: 6,
    relatedGuia: 'sueldo-liquido-chile',
    keywords: [
      'gratificación legal',
      '25% remuneración',
      '4.75 IMM',
      'aguinaldo legal',
      'Art. 47 Código del Trabajo',
    ],
    relatedCalculators: [
      'calculadora-gratificacion-legal',
      'calculadora-sueldo-liquido',
      'calculadora-costo-empleado-pyme',
    ],
    content: `<h2>¿Qué es la gratificación legal?</h2>
<p>La gratificación legal es un beneficio obligatorio que el empleador debe pagar a los trabajadores cuando la empresa registra utilidad líquida. Está regulado por los artículos 47 a 50 del Código del Trabajo.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Dos sistemas (Art. 47 y Art. 50)</strong><p>El empleador puede elegir entre:<br><strong>A.</strong> 30% de utilidad líquida del ejercicio, repartida proporcionalmente.<br><strong>B.</strong> 25% de la remuneración mensual, tope 4,75 IMM al año.<br>La inmensa mayoría de empresas elige el sistema B (más predecible).</p></div></aside>

<h2>¿Quién tiene derecho?</h2>
<p>Tienen derecho los trabajadores que devenguen remuneraciones variables o que ganen menos de 4,75 IMM (ingresos mínimos mensuales) anuales. En 2026, con sueldo mínimo de $575.000, el tope anual es $2.731.875 (≈$227.656 mensuales).</p>

<h2>¿Cómo se calcula?</h2>
<p>En el sistema B (Art. 50, el más usado):</p>
<ul>
<li><strong>Cálculo mensual</strong>: 25% del sueldo del mes, hasta el tope mensual de 4,75 IMM ÷ 12.</li>
<li><strong>Tope mensual 2026</strong>: $2.731.875 ÷ 12 = <strong>$227.656</strong>.</li>
</ul>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo 1: sueldo base $600.000</div><ul><li>25% × $600.000 = $150.000</li><li>Está bajo el tope de $227.656</li></ul><span class="total">Gratificación mensual: $150.000</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo 2: sueldo base $1.500.000</div><ul><li>25% × $1.500.000 = $375.000</li><li>Excede tope de $227.656 → se aplica tope</li></ul><span class="total">Gratificación mensual (topada): $227.656</span></div>

<h2>¿Mensual o anual?</h2>
<p>El empleador puede pagarla mensualmente (anticipo, lo más común) o en un pago anual liquidado en abril. El sistema mensual hace que la mayoría de los trabajadores reciba gratificación incluida en su sueldo bruto.</p>

<h2>¿Puede ser mayor?</h2>
<p>Sí. El empleador puede pagar una gratificación superior a la legal por contrato individual o convenio colectivo. Muchas empresas pagan gratificaciones adicionales en septiembre o diciembre, además de la legal mensual.</p>

<h2>Implicaciones del cálculo de gratificación</h2>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Por qué importa para tu sueldo neto</strong><p>La gratificación es haber imponible: cotiza para AFP, salud y cesantía. También se considera para calcular la base de la indemnización por años de servicio en el finiquito. Por eso entender si tu sueldo bruto incluye gratificación o no es clave al firmar contrato.</p></div></aside>
<p>Para ver cómo se integra con el cálculo de sueldo líquido, lee la <a href="/guias/sueldo-liquido-chile">guía de sueldo líquido en Chile</a>. Calcula tu gratificación específica con la <a href="/calculadoras/calculadora-gratificacion-legal">calculadora de gratificación legal</a>.</p>
<p>Fuentes: <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, Código del Trabajo Arts. 47-50.</p>`,
  },
  {
    slug: 'calcular-indemnizacion-por-anos',
    title: 'Cómo calcular la indemnización por años de servicio',
    description:
      'Guía para calcular la indemnización: 30 días por año, tope 11 años, base 90 UF. Cuándo corresponde y cuándo no. Art. 163 Código del Trabajo.',
    date: '2026-03-30',
    category: 'laboral',
    readingTime: 7,
    relatedGuia: 'finiquito-laboral-chile',
    keywords: [
      'indemnización años servicio',
      'Art. 163',
      'despido injustificado',
      '30 días por año',
      'tope 11 años',
      'recargo art 168',
    ],
    relatedCalculators: [
      'calculadora-indemnizacion-anos-servicio',
      'calculadora-finiquito',
      'calculadora-intereses-mora',
    ],
    content: `<h2>¿Qué es la indemnización por años de servicio?</h2>
<p>Es una compensación económica que el empleador debe pagar al trabajador cuando despide invocando "necesidades de la empresa" (Art. 161) o cuando el despido se declara judicialmente injustificado. Equivale a <strong>30 días de remuneración por cada año de servicio o fracción superior a 6 meses</strong>, con tope de 11 años (330 días). Está regulada por el Art. 163 del Código del Trabajo.</p>

<h2>¿Cuándo corresponde?</h2>
<ul>
<li>Despido por necesidades de la empresa (Art. 161, con aviso previo o pago sustitutivo).</li>
<li>Despido injustificado declarado por tribunal (con recargo del Art. 168).</li>
<li>Mutuo acuerdo con indemnización pactada.</li>
<li>Casos fortuitos o fuerza mayor (Art. 159 N°6) — en algunos casos.</li>
</ul>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Renuncia: NO corresponde</strong><p>Si renuncias voluntariamente (Art. 159 N°2), no recibes indemnización por años de servicio. Solo días trabajados, vacaciones proporcionales y vacaciones pendientes.</p></div></aside>

<h2>¿Cómo se calcula?</h2>
<p>Indemnización = última remuneración × años de servicio. La base incluye sueldo + gratificación. No incluye colación ni movilización (Art. 172).</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: sueldo $700.000, 8 años</div><ul><li>Indemnización = $700.000 × 8 = <strong>$5.600.000</strong></li><li>Bajo tope 11 años ✓</li><li>Base 19,9 UF, bajo 90 UF ✓</li></ul><span class="total">Total: $5.600.000</span></div>

<h2>Topes legales</h2>
<ul>
<li><strong>Máximo 11 años</strong>: 330 días de remuneración (incluso si trabajaste 20 años, solo se pagan 11). Excepción: contratos anteriores al 14/08/1981 no tienen tope.</li>
<li><strong>Base máxima 90 UF mensuales</strong> (≈$3.626.566 con UF mayo 2026).</li>
</ul>

<h2>Recargo por despido injustificado (Art. 168)</h2>
<p>Si el tribunal declara que el despido fue injustificado, indebido o improcedente, la indemnización se incrementa con un recargo:</p>
<table>
<thead><tr><th>Causal invocada y desestimada</th><th>Recargo</th></tr></thead>
<tbody>
<tr><td>Necesidades de la empresa (Art. 161)</td><td>30%</td></tr>
<tr><td>Conducta poco apropiada (Art. 160)</td><td>50%</td></tr>
<tr><td>Falta de probidad u otros graves (Art. 160)</td><td>80%</td></tr>
<tr><td>Despido sin invocar causal</td><td>100%</td></tr>
</tbody>
</table>

<h2>Indemnización sustitutiva del aviso (Art. 162)</h2>
<p>Si el empleador no avisa con 30 días de anticipación cuando invoca el Art. 161, debe pagar adicionalmente <strong>una remuneración mensual</strong> como sustitución del aviso.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Ley Bustos: nulidad del despido</strong><p>Si el empleador no había pagado las cotizaciones previsionales al despido, el contrato se considera vigente hasta el pago. El trabajador recibe las remuneraciones del período entre despido y convalidación, no solo el finiquito.</p></div></aside>
<p>Para el detalle completo del finiquito incluyendo todos los componentes, lee la <a href="/guias/finiquito-laboral-chile">guía de finiquito laboral</a>. Calcula tu indemnización específica con la <a href="/calculadoras/calculadora-indemnizacion-anos-servicio">calculadora de indemnización</a>.</p>
<p>Fuentes: <a href="https://www.bcn.cl" target="_blank" rel="noopener">BCN</a>, <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, Código del Trabajo Art. 161-168, 172, 177.</p>`,
  },
  {
    slug: 'reajuste-arriendo-uf-2026',
    title: 'Reajuste de arriendo por UF e IPC en Chile 2026',
    description:
      'Todo sobre el reajuste de arriendo: cuánto puede subir, UF vs IPC, qué dice tu contrato y cuándo puedes negociar.',
    date: '2026-03-30',
    category: 'vivienda',
    readingTime: 6,
    relatedGuia: 'comprar-vivienda-chile',
    keywords: [
      'reajuste arriendo',
      'IPC arriendo',
      'UF arriendo',
      'aumento arriendo Chile',
      'tope arriendo',
      'Ley 18.101',
    ],
    relatedCalculators: [
      'calculadora-reajuste-arriendo',
      'calculadora-uf-clp',
      'calculadora-credito-hipotecario',
    ],
    content: `<h2>¿Cuánto puede subir el arriendo?</h2>
<p>No hay un tope legal de aumento. El reajuste depende de lo que establezca el contrato de arriendo. Si está pactado en UF, se reajusta automáticamente con la variación de la UF. Si está en pesos, se reajusta según el IPC acumulado del período pactado en el contrato.</p>

<h2>Arriendo en UF vs pesos</h2>
<div class="comparison">
<div class="comparison__header"><div>Arriendo en UF</div><div>Arriendo en pesos</div></div>
<div class="comparison__row"><div>Reajuste automático diario</div><div>Reajuste por IPC acumulado</div></div>
<div class="comparison__row"><div>Pago en pesos varía mes a mes</div><div>Pago en pesos fijo entre reajustes</div></div>
<div class="comparison__row"><div>Valor real estable</div><div>Valor real cae si no se reajusta</div></div>
<div class="comparison__row"><div>Predecible para arrendador</div><div>Predecible para arrendatario</div></div>
<div class="comparison__row"><div>Común en oficinas y propiedades altas</div><div>Común en arriendos económicos</div></div>
</div>

<h2>Ejemplo de reajuste por IPC</h2>
<div class="numeric-example"><div class="numeric-example__title">Arriendo $400.000, IPC anual 4,5%</div><ul><li>Arriendo actual: $400.000</li><li>IPC últimos 12 meses: 4,5%</li><li>Reajuste: $400.000 × 4,5% = $18.000</li></ul><span class="total">Nuevo arriendo: $418.000</span></div>

<h2>¿Puedo negarme al aumento?</h2>
<p>Si el contrato establece el reajuste y se calcula correctamente según ese contrato, no puedes negarte. Si el aumento es abusivo o no está en el contrato, puedes negociar o recurrir al Tribunal de Policía Local o SERNAC.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Sin cláusula = sin reajuste</strong><p>Si tu contrato no incluye cláusula de reajuste, el arrendador no puede aumentar unilateralmente el canon. Debe esperar a renegociar contrato (típicamente al año) y proponerte un nuevo monto, que tú puedes aceptar o no.</p></div></aside>

<h2>Frecuencia del reajuste</h2>
<p>Debe estar definida en el contrato. Lo más común:</p>
<ul>
<li><strong>Anual</strong>: lo más usual en arriendos en pesos.</li>
<li><strong>Cada 6 meses</strong>: usado a veces para arriendos largos.</li>
<li><strong>Mensual (UF)</strong>: automático en arriendos pactados en UF.</li>
</ul>

<h2>Renovación de contrato y desalojo</h2>
<p>La <strong>Ley 18.101 (Arrendamiento de Inmuebles Urbanos)</strong> protege al arrendatario:</p>
<ul>
<li>Si el contrato es a plazo fijo, termina automáticamente al vencer.</li>
<li>Si es indefinido, requiere desahucio con 2 meses de anticipación, que puede ampliarse a 4 meses según los años de tenencia.</li>
<li>El arrendatario puede dejar la propiedad antes con aviso de 30 días, pagando arriendo proporcional.</li>
</ul>
<p>Para el panorama completo (compra de vivienda, subsidios, contribuciones), lee la <a href="/guias/comprar-vivienda-chile">guía de comprar vivienda en Chile</a>. Calcula tu reajuste con la <a href="/calculadoras/calculadora-reajuste-arriendo">calculadora de reajuste de arriendo</a>.</p>
<p>Fuentes: <a href="https://www.sernac.cl" target="_blank" rel="noopener">SERNAC</a>, Ley 18.101 (Arrendamiento de Inmuebles Urbanos).</p>`,
  },
  {
    slug: 'vacaciones-proporcionales-guia',
    title: 'Guía de vacaciones proporcionales en Chile 2026',
    description:
      'Cómo calcular tus vacaciones proporcionales al finiquito: días que te corresponden, valor por día y pago en el finiquito.',
    date: '2026-03-30',
    category: 'laboral',
    readingTime: 5,
    relatedGuia: 'finiquito-laboral-chile',
    keywords: [
      'vacaciones proporcionales',
      'feriado proporcional',
      'días vacaciones',
      'finiquito vacaciones',
      'Art. 67',
      'vacaciones progresivas',
    ],
    relatedCalculators: [
      'calculadora-vacaciones-proporcionales',
      'calculadora-finiquito',
      'calculadora-indemnizacion-anos-servicio',
    ],
    content: `<h2>¿Qué son las vacaciones proporcionales?</h2>
<p>Son los días de feriado legal que te corresponden por el tiempo trabajado en el año en que termina tu contrato. Se calculan y pagan en el finiquito. Están reguladas por los Arts. 67 y 70 del Código del Trabajo.</p>

<h2>¿Cuántos días me corresponden?</h2>
<p>El feriado anual chileno es de <strong>15 días hábiles</strong> por año trabajado. Para vacaciones proporcionales, se dividen entre 12 meses, dando <strong>1,25 días por cada mes trabajado</strong>:</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: 9 meses trabajados</div><ul><li>Días proporcionales: 9 × 1,25 = <strong>11,25 días</strong></li></ul><span class="total">Días que se pagan en el finiquito: 11,25 hábiles</span></div>

<h2>¿Cuánto vale cada día?</h2>
<p>El valor de cada día se calcula dividiendo tu sueldo mensual por 30:</p>
<ul>
<li><strong>Valor día</strong> = sueldo bruto ÷ 30</li>
<li><strong>Total vacaciones</strong> = días proporcionales × valor día</li>
</ul>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: sueldo $600.000, 7 meses trabajados</div><ul><li>Días proporcionales: 7 × 1,25 = 8,75</li><li>Valor del día: $600.000 ÷ 30 = $20.000</li></ul><span class="total">Total vacaciones: $175.000</span></div>

<h2>Vacaciones pendientes vs proporcionales</h2>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Diferencia clave</strong><p>Las <strong>proporcionales</strong> son del año en curso (1,25 × meses). Las <strong>pendientes</strong> son días no tomados de años anteriores. Ambas se pagan en el finiquito al mismo valor por día. Las pendientes no prescriben mientras dure la relación laboral.</p></div></aside>

<h2>Vacaciones progresivas (Art. 68)</h2>
<p>Después de <strong>10 años de trabajo</strong> (continuos o no, con cualquier empleador), tienes derecho a días adicionales: +1 día por cada 3 nuevos años, con un máximo de 5 días extra (total 20 días hábiles anuales). Para hacer valer este derecho debes presentar al empleador un certificado de cotizaciones del IPS o AFP que acredite tus años de cotización.</p>
<table>
<thead><tr><th>Años cotizados (cualquier empleador)</th><th>Días anuales</th></tr></thead>
<tbody>
<tr><td>0 a 9 años</td><td>15 días</td></tr>
<tr><td>10 a 12 años</td><td>16 días</td></tr>
<tr><td>13 a 15 años</td><td>17 días</td></tr>
<tr><td>16 a 18 años</td><td>18 días</td></tr>
<tr><td>19 a 21 años</td><td>19 días</td></tr>
<tr><td>22+ años</td><td>20 días</td></tr>
</tbody>
</table>

<h2>Días hábiles vs corridos</h2>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Hábiles, no corridos</strong><p>Los 15 días anuales son <em>hábiles</em> (lunes a viernes, sin feriados). Si tomas vacaciones por 3 semanas continuas, son aproximadamente 15 días hábiles. Algunos finiquitos calculan mal usando días corridos: revisa siempre.</p></div></aside>
<p>Para el detalle completo del finiquito y cómo se integran con la indemnización, lee la <a href="/guias/finiquito-laboral-chile">guía de finiquito laboral</a>. Calcula tus vacaciones específicas con la <a href="/calculadoras/calculadora-vacaciones-proporcionales">calculadora de vacaciones proporcionales</a>.</p>
<p>Fuentes: <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, Código del Trabajo Arts. 67, 68, 70.</p>`,
  },
];

// ============================================
// Helpers
// ============================================

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedCalculators(article: Article): string[] {
  return article.relatedCalculators;
}
