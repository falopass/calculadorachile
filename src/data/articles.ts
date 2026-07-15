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
//   - Tipografía base (h2/h3/p/a): globals.css `.prose` — NO hay
//     @tailwindcss/typography; no uses prose-h2: de Tailwind.
//   - Tablas: <table><thead>…</thead><tbody>…</tbody></table>
//     (no inventar filas en .data-grid; ese es solo ul>li label/value).
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
  /**
   * Título SEO opcional que reemplaza a `title` en `<title>` y OG.
   * Útil para subir CTR sin alterar el H1 visible. Si se omite,
   * se usa `title`.
   */
  seoTitle?: string;
  /**
   * Descripción SEO opcional que reemplaza a `description` en meta
   * y OG. Si se omite, se usa `description`.
   */
  seoDescription?: string;
  /**
   * Fecha de última actualización (ISO YYYY-MM-DD). Se usa como
   * `dateModified` en Article schema y `lastmod` en el sitemap de
   * blog, lo que ayuda a Google a detectar frescura y reindexar.
   */
  updatedAt?: string;
  /**
   * FAQ embebido para la página del artículo. Se renderiza al final
   * del contenido y se inyecta como `FAQPage` en JSON-LD, capturando
   * rich results para preguntas reales detectadas en Search Console.
   */
  faq?: { question: string; answer: string }[];
}

export const articles: Article[] = [
  {
    slug: 'embargos-cae-tgr-2026-cuentas-bienes-raices',
    title:
      'Embargos por deuda CAE 2026: TGR, cuentas bancarias y bienes raíces (qué se sabe)',
    description:
      'Cómo la Tesorería cobró deudas CAE morosas en 2026: notificaciones, convenios, embargos de cuentas y bienes raíces, tramos de ingreso y debate legal. Fuentes TGR y guía práctica.',
    date: '2026-07-10',
    updatedAt: '2026-07-13',
    category: 'educacion',
    readingTime: 14,
    relatedGuia: 'credito-cae-educacion-chile',
    seoTitle: 'Embargos CAE 2026: TGR, cuentas y bienes raíces',
    seoDescription:
      'Embargos y retenciones por CAE moroso en 2026: cuentas, inmuebles, convenios TGR y tramo >$5 millones. Fuentes oficiales y qué hacer si te notifican.',
    keywords: [
      'embargo CAE 2026',
      'TGR embargos CAE',
      'embargo cuentas bancarias CAE',
      'embargo bienes raíces CAE',
      'deuda CAE Tesorería',
      'tgr.cl/cae',
      'convenio pago CAE TGR',
      'cobro fiscal CAE',
      'garantía estatal CAE mora',
      'remate judicial CAE',
    ],
    relatedCalculators: [
      'calculadora-credito-cae',
      'calculadora-uf-clp',
      'calculadora-sueldo-liquido',
      'calculadora-intereses-mora',
    ],
    faq: [
      {
        question: '¿Puede la TGR embargar mi cuenta por el CAE?',
        answer:
          'Según la Tesorería, cuando la deuda CAE está en mora y el Fisco ya asumió el cobro (garantía estatal pagada al banco), puede aplicar retenciones y embargos de activos financieros, incluidas cuentas bancarias, depósitos y fondos mutuos, conforme a la normativa que invoca. No aplica al CAE al día con el banco/Ingresa.',
      },
      {
        question: '¿También embargan bienes raíces?',
        answer:
          'Sí. El 4 de junio de 2026 la TGR informó el inicio de embargos sobre bienes raíces a deudores CAE que no regularizaron tras notificaciones, partiendo por Antofagasta, La Araucanía y Los Lagos, con extensión al resto del país, e incluso advirtió posible remate judicial si no se regulariza.',
      },
      {
        question: '¿Qué convenio CAE ofrece actualmente la TGR?',
        answer:
          'El portal de ayuda vigente de TGR informa convenios de 12, 18 o 24 cuotas para deudas morosas de al menos 1 UTM. Según el comportamiento en convenios anteriores, pie y cuota representan al menos 10%, 15% o 20% de los ingresos registrados, con mínimo de 1 UTM. El anuncio de abril dirigió cobro inmediato al tramo sobre $5 millones, pero no conviene convertir ese corte operativo en una prohibición legal permanente: consulta la oferta que aparece en tu expediente.',
      },
      {
        question: '¿Es lo mismo que el cobro de Ingresa o del banco?',
        answer:
          'No. Ingresa/banco administran el crédito vigente. La TGR actúa cuando la deuda ya es de cobro fiscal tras la garantía estatal. Identifica en la notificación quién es el acreedor antes de pagar o firmar.',
      },
      {
        question: '¿El cobro por la TGR es pacífico en tribunales?',
        answer:
          'No. En 2026 hubo decisiones contradictorias y luego fallos de cortes que respaldaron el procedimiento, además de cientos de recursos de protección declarados inadmisibles. Esa inadmisibilidad no necesariamente resuelve todas las defensas de fondo: también puede indicar que la protección no era la vía idónea. La notificación y el expediente deben ser revisados dentro de plazo por un profesional.',
      },
    ],
    content: `<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Qué es (y qué no es) este artículo</strong><p>Es una <strong>síntesis periodística y normativa de 2026</strong> a partir de comunicados de la <strong>Tesorería General de la República (TGR)</strong> y cobertura confiable. <strong>No es asesoría legal</strong> ni un listado de quién será embargado. Si recibiste notificación o retención, prioriza <a href="https://tgr.gob.cl" target="_blank" rel="noopener">TGR</a> / <a href="https://tgr.cl/cae" target="_blank" rel="noopener">tgr.cl/cae</a> y un abogado.</p></div></aside>

<p>En 2026, miles de personas con <strong>Crédito con Aval del Estado (CAE)</strong> en mora vieron algo que antes parecía lejano: la <strong>Tesorería</strong> cobrando como si el Estado fuera el acreedor — y, en etapas sucesivas, <strong>reteniendo fondos en cuentas</strong> y <strong>embargando bienes raíces</strong>. Si buscas <em>embargo CAE</em>, <em>TGR cuentas bancarias</em> o <em>embargo inmueble CAE</em>, este texto ordena la cronología, el mecanismo y las fuentes oficiales.</p>

<p>Para simular una <strong>cuota teórica</strong> (no un embargo), usa la <a href="/calculadoras/calculadora-credito-cae">calculadora / simulador CAE</a>. Para el régimen de pago y renegociación en Ingresa, ve también <a href="/blog/cae-renegociacion-condonacion-2026">CAE 2026: cuota, renegociación y condonación</a> y la <a href="/guias/credito-cae-educacion-chile">guía pillar del CAE</a>.</p>

<h2>1. La pregunta correcta: ¿deuda al banco o deuda al Fisco?</h2>
<p>El CAE nace como financiamiento estudiantil con <strong>garantía del Estado</strong> (marco de la <a href="https://www.bcn.cl/leychile/navegar?idNorma=240080" target="_blank" rel="noopener">Ley 20.027</a>). Mientras pagas al día, tu contraparte operativa suele ser el <strong>banco</strong> y/o <strong>Comisión Ingresa</strong>.</p>
<p>La situación cambia si hay <strong>mora grave</strong> y el banco <strong>hace efectiva la garantía</strong>:</p>
<ol class="steps">
<li>Dejas de pagar cuotas al acreedor bancario.</li>
<li>El <strong>Fisco paga al banco</strong> (o parte de la deuda) por la garantía.</li>
<li>El <strong>Estado pasa a ser acreedor</strong> de esa obligación.</li>
<li>La <strong>TGR</strong> cobra para recuperar recursos fiscales.</li>
</ol>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>No es “todo el CAE del país”</strong><p>Tener CAE <strong>no implica</strong> embargo. El foco de los comunicados TGR es la <strong>mora ya fiscalizada</strong> y la no regularización tras notificaciones. Un egresado al día con Ingresa no es el mismo caso que un moroso en cobro TGR.</p></div></aside>

<h2>2. Cronología 2026 (fuente TGR)</h2>
<table>
<thead>
<tr><th>Fecha</th><th>Hito (resumen)</th><th>Fuente</th></tr>
</thead>
<tbody>
<tr>
<td><strong>6 abr 2026</strong></td>
<td>TGR anuncia proceso de cobro de deudas CAE; stock de deuda del orden de <strong>$4 billones</strong> (dato 2025 en el comunicado) y <strong>+550 mil</strong> personas en mora. Cobro <strong>segmentado por ingresos</strong>.</td>
<td><a href="https://tgr.gob.cl/2026/04/06/tgr-inicia-proceso-de-cobro-a-deudores-cae-y-refuerza-alternativas-para-regularizar-su-situacion/noticias/" target="_blank" rel="noopener">TGR 6-abr</a></td>
</tr>
<tr>
<td><strong>1–6 abr 2026</strong></td>
<td><strong>Convenios</strong> para ingresos mensuales <strong>menores a $5 millones</strong> (deuda ≥ 1 UTM en el diseño anunciado). Canal <strong>tgr.cl/cae</strong>.</td>
<td>Mismo comunicado</td>
</tr>
<tr>
<td><strong>6 abr 2026</strong></td>
<td>Morosos con ingresos <strong>sobre $5 millones</strong>: cobro con acciones más directas, <strong>sin acceso a esos convenios</strong> (según el anuncio).</td>
<td>Mismo comunicado</td>
</tr>
<tr>
<td><strong>23 abr 2026</strong></td>
<td>Inicio de <strong>embargos y retenciones</strong> a tramo de mayores ingresos: cuentas, DAP, fondos mutuos; también inmuebles y vehículos. Universo inicial citado: <strong>1.340 casos</strong>.</td>
<td><a href="https://tgr.gob.cl/2026/04/23/tgr-inicia-embargos-y-retenciones-a-deudores-cae-con-ingresos-sobre-5-millones/noticias/" target="_blank" rel="noopener">TGR 23-abr</a></td>
</tr>
<tr>
<td><strong>4 jun 2026</strong></td>
<td>Inicio de <strong>embargos de bienes raíces</strong> a quienes no regularizaron. Primeras regiones: <strong>Antofagasta, La Araucanía, Los Lagos</strong>; extensión al resto del país. Advertencia de posible <strong>remate judicial</strong>.</td>
<td><a href="https://tgr.gob.cl/2026/06/04/tgr-inicia-embargos-de-bienes-raices-a-deudores-del-credito-con-aval-del-estado/noticias/" target="_blank" rel="noopener">TGR 4-jun</a></td>
</tr>
</tbody>
</table>
<p>En balances de recaudación de abril, la TGR reportó cifras del orden de <strong>más de $20 mil millones</strong> en estrategias de cobro 2026 hasta ese corte, <strong>más de 7.500 convenios</strong> y montos de regularización del mes de abril en miles de millones de pesos (detalle en el comunicado del 23 de abril).</p>

<h2>3. Qué bienes ha mencionado la TGR</h2>
<ul class="data-grid">
<li><span class="data-grid__label">Cuentas y dinero</span><span class="data-grid__value">Cuentas bancarias, retenciones</span></li>
<li><span class="data-grid__label">Inversiones</span><span class="data-grid__value">DAP, fondos mutuos y similares</span></li>
<li><span class="data-grid__label">Muebles relevantes</span><span class="data-grid__value">Vehículos (citados en abr-2026)</span></li>
<li><span class="data-grid__label">Inmuebles</span><span class="data-grid__value">Bienes raíces + posible remate</span></li>
</ul>
<p>La palabra “embargo” no significa que todos esos bienes hayan sido vendidos. Según el portal de ayuda de TGR, el embargo retiene bienes para impedir su libre disposición y garantizar una obligación demandada. En una cuenta puede materializarse como retención de fondos; en un vehículo o inmueble puede quedar una prohibición inscrita; el <strong>remate</strong> es una etapa posterior y no una consecuencia instantánea de la primera notificación.</p>

<table>
<thead><tr><th>Actuación</th><th>Qué ocurre</th><th>Qué revisar</th></tr></thead>
<tbody>
<tr><td>Compensación o retención tributaria</td><td>TGR aplica una devolución o crédito fiscal disponible a una deuda</td><td>Fundamento, período y detalle de la compensación</td></tr>
<tr><td>Embargo de cuenta o inversión</td><td>El tercero retenedor inmoviliza o entrega fondos según la orden</td><td>Resolución, monto, banco y origen de los fondos</td></tr>
<tr><td>Embargo de vehículo o inmueble</td><td>Restringe su disposición y garantiza la deuda</td><td>Inscripción, tasación, deuda actualizada y eventual exceso</td></tr>
<tr><td>Remate</td><td>El bien se realiza dentro del procedimiento para pagar la obligación</td><td>Resolución, fecha, publicaciones y defensas pendientes</td></tr>
</tbody>
</table>

<h3>¿El sueldo depositado sigue protegido?</h3>
<p>El artículo 57 del Código del Trabajo declara inembargables las remuneraciones y cotizaciones previsionales, salvo la parte que exceda de <strong>56 UF</strong> y excepciones como pensiones de alimentos. El artículo 445 del Código de Procedimiento Civil también remite a esa protección. Sin embargo, en la controversia CAE de 2026 se discutió si el dinero conserva su naturaleza remuneracional una vez abonado en una cuenta bancaria. TGR ha defendido que el depósito pasa a ser un activo financiero; deudores y parlamentarios han sostenido lo contrario.</p>
<p>Por esa disputa, una persona a la que retuvieron la cuenta donde recibe su sueldo no debería asumir ni que todo el saldo era intocable ni que la orden es inapelable. Debe reunir liquidaciones, cartolas que muestren el abono, resolución de embargo y movimientos posteriores. Esa trazabilidad permite plantear una defensa concreta; una captura de redes no prueba el origen del dinero.</p>

<h3>Bienes inembargables y pertenencias de terceros</h3>
<p>El artículo 445 contiene un listado de bienes protegidos, entre ellos determinadas remuneraciones, cotizaciones previsionales, elementos indispensables para el ejercicio personal del oficio y bienes básicos del hogar en los términos de la norma. La protección no cubre automáticamente toda pertenencia dentro de una vivienda.</p>
<p>Las consultas en comunidades mostraron otro problema recurrente: la diligencia llega al domicilio de un familiar donde el deudor ya no vive. TGR indica que un tercero afectado debe hacer valer su dominio mediante una <strong>tercería ante el tribunal civil</strong> en la segunda etapa del cobro. Facturas, contratos, transferencias, inventarios y certificados pueden acreditar propiedad; decir verbalmente “esto es de mi tía” puede no bastar.</p>

<h2>4. Tramos de ingreso: $5 millones y el relato de $3,5 millones</h2>
<p>En <strong>abril</strong>, la línea dura del comunicado oficial fue <strong>ingresos mensuales superiores a $5 millones</strong> (sin convenio de ese paquete).</p>
<p>En <strong>junio</strong>, la cobertura de prensa citó a autoridades indicando que el foco efectivo se había ampliado a rentas <strong>iguales o superiores a $3,5 millones</strong>, y reportó más de 1.500 embargos en un corte de ese mes. Son datos de priorización, no un piso de inmunidad: una persona bajo ese ingreso no obtiene por ello una declaración legal de incobrabilidad.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Ingresos según Operación Renta</strong><p>Los tramos de convenio se anclaron a información de renta (p. ej. Operación Renta del año anterior). Cesantía o falta de F22: la TGR indicó vías para acreditar situación en Oficina Virtual. Ver siempre el instructivo vigente en <strong>tgr.cl/cae</strong>.</p></div></aside>

<h3>Condiciones del convenio que hoy publica TGR</h3>
<p>La ficha operativa vigente permite crear un convenio para una deuda CAE morosa de al menos 1 UTM. Ofrece <strong>12, 18 o 24 cuotas</strong>, dependiendo del comportamiento de pago. Pie y cuotas equivalen, como mínimo, a 10%, 15% o 20% de los ingresos registrados según convenios anteriores, y ningún pago puede ser inferior a 1 UTM.</p>
<p>Esto obliga a separar el anuncio político de abril de la oferta que el sistema muestra hoy. El corte de $5 millones explicó quién recibió acciones directas en la primera fase; no reemplaza la evaluación individual ni las condiciones actuales del portal. Antes de aceptar, descarga la deuda neta, número de cuotas, pie, reajustes y efecto del incumplimiento.</p>

<h2>5. Debate legal: ¿crédito fiscal o crédito civil?</h2>
<p>Aquí no hay un “sí/no” simple en un solo tuit:</p>
<ul>
<li><strong>TGR y Gobierno</strong> sostienen que actúan con atribuciones legales para recuperar recursos fiscales ya desembolsados por la garantía (el Estado gasta cientos de millones de dólares al año cubriendo impagos a bancos, según declaraciones de Hacienda en prensa).</li>
<li><strong>Críticos</strong> argumentan que el CAE nace como crédito civil y que el procedimiento del Código Tributario no puede extenderse sin una habilitación inequívoca. También cuestionan la afectación de remuneraciones ya depositadas.</li>
<li>En mayo y junio se conocieron decisiones de distinto signo. La Corte de Apelaciones de Valparaíso rechazó recursos —entre ellos el Rol 3249-2026 citado por TGR— y consideró amparada la recuperación de fondos públicos. En Arica también se informaron resoluciones no uniformes.</li>
<li>La Corte Suprema declaró inadmisibles cientos de recursos de protección. Eso impide tramitar esas acciones, pero no equivale por sí solo a una sentencia general que decida cada excepción, tercería o alegación dentro del procedimiento ejecutivo.</li>
</ul>
<p><strong>Conclusión práctica:</strong> la TGR está cobrando y los fallos más recientes reforzaron su posición, pero la defensa no se resume en presentar un recurso de protección idéntico al de otra persona. Importan la forma de notificación, el título cobrado, la prescripción alegada, la propiedad del bien, el exceso del embargo y el origen de los fondos. Un fallo de prensa no reemplaza el expediente individual.</p>

<h2>6. Qué hacer si te notificaron o te retuvieron fondos</h2>
<ol class="steps">
<li><strong>Identifica al acreedor</strong> en la cartola o citación: ¿TGR, banco o Ingresa?</li>
<li><strong>Descarga el expediente</strong> de cobranza en TGR o solicítalo en la oficina que lleva la ejecución. No trabajes solo con el SMS o la carta inicial.</li>
<li><strong>Consulta la deuda</strong> en <a href="https://tgr.cl/cae" target="_blank" rel="noopener">tgr.cl/cae</a> y separa capital, reajustes, intereses, pagos y eventual convenio.</li>
<li><strong>Anota fecha y forma de notificación.</strong> El portal general de cobranza de TGR informa 10 días hábiles para oponer excepciones, contados desde el requerimiento personal o desde el primer embargo cuando la notificación fue por cédula. La regla aplicable debe revisarse en el expediente.</li>
<li><strong>Documenta el origen del bien.</strong> Para una cuenta, cartolas y liquidaciones; para una casa o vehículo, inscripción y gravámenes; para bienes de terceros, prueba de propiedad.</li>
<li><strong>Evalúa convenio y defensas por separado.</strong> Firmar un convenio puede tener efectos sobre la cobranza; no lo uses solo para ganar tiempo sin entender pie, cuotas e incumplimiento.</li>
<li><strong>Busca asesoría inmediata</strong> si hay dinero retenido, inmueble, vehículo o bienes ajenos. Las excepciones y tercerías tienen requisitos que una solicitud genérica en TGR no reemplaza.</li>
</ol>

<h3>Después de pagar: el embargo no se alza solo</h3>
<p>TGR advierte que el pago total no produce automáticamente el alzamiento. Debes solicitarlo expresamente y acreditar la extinción de la deuda. La ficha oficial indica un plazo de resolución esperado de hasta siete días hábiles, aunque la eliminación efectiva de una inscripción puede tardar más por el Conservador de Bienes Raíces, Registro de Vehículos u otra entidad.</p>
<p>Si los bienes retenidos exceden claramente lo necesario, TGR permite pedir <strong>disminución</strong>; si ofreces otro bien de igual o mayor valor y sin gravámenes, puedes solicitar <strong>sustitución</strong>. Suscribir un convenio suspende el cobro de la deuda incluida, pero no da por sí solo derecho al alzamiento: la propia TGR exige pago íntegro del convenio para solicitarlo.</p>

<h3>Vivienda familiar y exclusión temporal</h3>
<p>El portal de TGR contempla una exclusión temporal excepcional cuando continuar la ejecución puede dejar al deudor y su familia sin vivienda, el único bien embargado es el inmueble en que habitan y su valor no supera considerablemente el avalúo exento de contribuciones. Se exige acreditar la situación socioeconómica con informe social o Registro Social de Hogares y suele referirse a causas cercanas al remate. No es una condonación ni una protección automática de toda vivienda: pregunta si el mecanismo es admisible en tu expediente CAE y presenta antecedentes antes de la subasta.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Estafas</strong><p>No pagues a terceros que te escriban por WhatsApp “por el CAE”. Usa solo dominios oficiales (<strong>tgr.gob.cl</strong> / <strong>tgr.cl</strong>, <strong>ingresa.cl</strong>) y ClaveÚnica.</p></div></aside>

<h2>7. Cómo se relaciona con la calculadora de cuota</h2>
<p>La <a href="/calculadoras/calculadora-credito-cae">calculadora CAE de CalculaChile</a> estima un <strong>dividendo teórico (PMT)</strong> a tasa 2%, plazo, gracia y opcionalmente tu cuota como <strong>% del ingreso</strong> (comparación educativa con el tope del 10% del bruto en regímenes de la Ley 21.605). Eso sirve para planificar y entender órdenes de magnitud.</p>
<p><strong>No calcula:</strong> embargos, remates, montos de retención en cuenta, ni si estás en la nómina TGR. Esas son etapas de <strong>cobranza fiscal</strong>, no de simulación de arancel.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo educativo (no es tu caso TGR)</div><ul>
<li>Capital simulado $15.000.000 · tasa 2% · 180 meses → dividendo PMT del orden de cientos de miles de pesos (usa la calculadora con la UF del día).</li>
<li>Si tu bruto es $1.200.000, el 10% son $120.000: la calculadora te muestra si el PMT supera ese tope de referencia.</li>
<li>Si ya estás en cobro TGR, el número relevante es el de la <strong>cartola fiscal</strong>, no el PMT del blog.</li>
</ul><span class="total">Simula aquí · regulariza allá (Ingresa o TGR)</span></div>

<h2>8. Preguntas frecuentes de búsqueda</h2>
<p><strong>¿Me pueden quitar la casa por el CAE?</strong> La TGR ha embargado bienes raíces y comunicado que un proceso puede avanzar a remate si no hay regularización. Embargo no es pérdida inmediata: revisa expediente, inscripción, deuda, alternativas de pago y posible exclusión temporal antes de la fecha de subasta.</p>
<p><strong>¿Me pueden vaciar la cuenta del sueldo?</strong> TGR incluyó cuentas entre los activos financieros retenidos. El artículo 57 protege remuneraciones hasta 56 UF, pero en 2026 se discutió si esa calidad permanece después del depósito. Guarda cartolas y liquidaciones y reclama con fundamento individual; no supongas que el banco identificará por sí solo cada peso.</p>
<p><strong>¿Esto lo inventó solo el gobierno 2026?</strong> El CAE y la garantía estatal son anteriores. Lo que se intensificó en 2026, según comunicados y coberturas, es la <strong>estrategia de cobro TGR</strong> (segmentación, convenios, embargos de cuentas e inmuebles) bajo la administración vigente ese año.</p>

<h2>9. Fuentes oficiales y de contexto</h2>
<ul>
<li><a href="https://tgr.gob.cl/2026/04/06/tgr-inicia-proceso-de-cobro-a-deudores-cae-y-refuerza-alternativas-para-regularizar-su-situacion/noticias/" target="_blank" rel="noopener">TGR — inicio proceso de cobro CAE (6 abr 2026)</a></li>
<li><a href="https://tgr.gob.cl/2026/04/23/tgr-inicia-embargos-y-retenciones-a-deudores-cae-con-ingresos-sobre-5-millones/noticias/" target="_blank" rel="noopener">TGR — embargos y retenciones &gt;$5 millones (23 abr 2026)</a></li>
<li><a href="https://tgr.gob.cl/2026/06/04/tgr-inicia-embargos-de-bienes-raices-a-deudores-del-credito-con-aval-del-estado/noticias/" target="_blank" rel="noopener">TGR — embargos de bienes raíces (4 jun 2026)</a></li>
<li><a href="https://tgr.cl/cae" target="_blank" rel="noopener">Portal tgr.cl/cae</a> · <a href="https://www.ingresa.cl" target="_blank" rel="noopener">Ingresa</a></li>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=240080" target="_blank" rel="noopener">Ley 20.027 (CAE)</a> · <a href="https://www.bcn.cl/leychile/navegar?idNorma=1196118" target="_blank" rel="noopener">Ley 21.605</a> (reglas de pago / reprogramación según texto vigente)</li>
<li><a href="https://portal-ayuda.tgr.cl/ayuda/convenios-particulares/crear-convenio-de-pago-para-el-credito-de-educacion-superior-con-aval-del-estado-cae" target="_blank" rel="noopener">TGR — convenio de pago CAE</a> · <a href="https://portal-ayuda.tgr.cl/ayuda/embargos/solicitar-alzar-sustituir-o-disminuir-bienes-embargados-por-tgr" target="_blank" rel="noopener">alzamiento, sustitución y disminución</a></li>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=207436&idParte=8511896" target="_blank" rel="noopener">Código del Trabajo, artículo 57</a> · <a href="https://www.bcn.cl/leychile/navegar?idNorma=22740&idParte=8767318" target="_blank" rel="noopener">Código de Procedimiento Civil, artículo 445</a></li>
</ul>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Disclaimer YMYL</strong><p>Artículo informativo actualizado a julio 2026. No es dictamen de la TGR, Ingresa, MINEDUC ni un tribunal. Montos, tramos y plazos pueden cambiar. Prevalecen la notificación oficial y la normativa vigente. CalculaChile no gestiona embargos ni pagos.</p></div></aside>
<p>Para profundizar: <a href="/calculadoras/calculadora-credito-cae">simulador de cuota CAE</a> · <a href="/blog/cae-renegociacion-condonacion-2026">renegociación y condonación</a> · <a href="/guias/credito-cae-educacion-chile">guía CAE</a> · <a href="/calculadoras/calculadora-sueldo-liquido">sueldo líquido</a> (para contrastar carga de cuota vs ingreso).</p>`,
  },
  {
    slug: 'finiquito-2026-ejemplo-sueldo-minimo',
    title:
      'Finiquito 2026 con sueldo mínimo $553.553: ejemplos de despido y renuncia',
    description:
      'Cuánto puede dar un finiquito con sueldo base mínimo 2026 de $553.553: despido vs renuncia, gratificación mensual, vacaciones con calendario, descuento AFC y ejemplos auditables.',
    date: '2026-07-10',
    updatedAt: '2026-07-13',
    category: 'laboral',
    readingTime: 15,
    relatedGuia: 'finiquito-laboral-chile',
    seoTitle: 'Finiquito 2026 con sueldo mínimo $553.553: ejemplos',
    seoDescription:
      'Ejemplos de finiquito con IMM $553.553 (Ley 21.830): indemnización, aviso, vacaciones y renuncia. Plazo 10 días hábiles. Fuentes DT y Código del Trabajo.',
    keywords: [
      'finiquito 2026 sueldo mínimo',
      'finiquito con ingreso mínimo',
      'cuánto me toca de finiquito sueldo mínimo',
      'finiquito $553.553',
      'indemnización años de servicio sueldo mínimo',
      'finiquito renuncia vs despido',
      'plazo pago finiquito 10 días hábiles',
      'calcular finiquito Chile 2026',
    ],
    relatedCalculators: [
      'calculadora-finiquito',
      'calculadora-indemnizacion-anos-servicio',
      'calculadora-vacaciones-proporcionales',
      'calculadora-sueldo-liquido',
      'calculadora-gratificacion-legal',
    ],
    faq: [
      {
        question: '¿Cuánto finiquito me corresponde con el sueldo mínimo 2026?',
        answer:
          'No existe un monto único. Con sueldo base mínimo de $553.553, tres años computables y despido por necesidades de la empresa sin aviso, años de servicio más aviso suman $2.214.212 antes de vacaciones, remuneraciones pendientes y eventual imputación AFC. Si además recibías gratificación mensual u otra remuneración periódica que integra la base del artículo 172, el cálculo puede ser mayor.',
      },
      {
        question: '¿Si renuncio me pagan indemnización por años de servicio?',
        answer:
          'En la regla general del Código del Trabajo, la renuncia voluntaria no genera indemnización por años de servicio ni indemnización sustitutiva del aviso. Sí suelen liquidarse feriado/vacaciones pendientes o proporcionales y otros conceptos devengados. Confirma tu causal y contrato; no firmes un finiquito que no entiendas.',
      },
      {
        question: '¿Cuántos días tiene la empresa para pagar el finiquito?',
        answer:
          'Según la Dirección del Trabajo y el artículo 177 del Código del Trabajo (modificado por la Ley 20.684), el finiquito debe otorgarse y su pago ponerse a disposición del trabajador dentro de 10 días hábiles contados desde la separación. Solo si las partes lo acuerdan, el pago podría fraccionarse.',
      },
      {
        question: '¿El finiquito es lo mismo que el Seguro de Cesantía (AFC)?',
        answer:
          'No, pero pueden interactuar. Si el término es por artículo 161, el empleador puede imputar a la indemnización por años de servicio la parte de la Cuenta Individual formada por su aporte de 1,6%, certificada por AFC. No puede descontar el aporte de 0,6% del trabajador ni aplicar esa rebaja a sueldo, vacaciones o aviso previo.',
      },
      {
        question: '¿Hay tope si mi sueldo es el mínimo?',
        answer:
          'Con $553.553 brutos mensuales estás muy por debajo del tope de 90 UF que limita la base de la indemnización por años de servicio y del aviso previo (Art. 172 CdT). El tope de años (máximo 11 en la regla general) sí puede aplicar si llevas más de 11 años.',
      },
    ],
    content: `<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>IMM 2026 + finiquito</strong><p>Desde el <strong>1 de mayo de 2026</strong> el ingreso mínimo mensual para trabajadores de <strong>18 a 65 años</strong> es <strong>$553.553</strong> (Ley <strong>21.830</strong>; ficha de la <a href="https://www.dt.gob.cl/portal/1628/w3-article-60141.html" target="_blank" rel="noopener">Dirección del Trabajo</a>). Los ejemplos distinguen sueldo base, última remuneración para indemnizaciones y pagos pendientes: no son siempre la misma cifra.</p></div></aside>

<p>Si te despidieron o renunciaste ganando el sueldo mínimo, la pregunta suele ser la misma: <em>¿cuánto me tienen que pagar en el finiquito?</em> La respuesta no es un solo número: depende de la <strong>causal</strong>, la <strong>antigüedad</strong>, las <strong>vacaciones</strong> y lo que quede pendiente del mes. Aquí separas piezas legales y ves <strong>ejemplos con $553.553</strong>.</p>

<p>Mapa del clúster: hub <a href="/cesantia">/cesantia</a> · <a href="/blog/seguro-cesantia-finiquito-2026-afc">Seguro de Cesantía vs finiquito</a> · <a href="/blog/checklist-despues-despido-chile-2026">checklist post-despido</a> · <a href="/blog/sueldo-minimo-2026-calcular-liquido">sueldo mínimo líquido</a>.</p>

<h2>1. Qué va (y qué no va) en un finiquito</h2>
<p>El finiquito es el documento con el que se pone término al contrato y se liquidan, entre otros, conceptos como:</p>
<ul>
<li><strong>Remuneraciones pendientes</strong> (días del mes trabajados y no pagados).</li>
<li><strong>Feriado / vacaciones</strong> proporcionales o pendientes (Art. 67 y siguientes del Código del Trabajo; feriado legal general de 15 días hábiles al año).</li>
<li><strong>Indemnización por años de servicio</strong> (Art. 163), cuando la causal y la antigüedad la hacen exigible (caso típico de enseñanza: despido por necesidades de la empresa, Art. 161, con al menos un año de servicio).</li>
<li><strong>Indemnización sustitutiva del aviso previo</strong> (Art. 162): un mes de remuneración si, en las causales que lo exigen, el empleador no dio el aviso con al menos 30 días de anticipación.</li>
<li><strong>Gratificación u otros devengos</strong> solo si están pendientes. Si la gratificación fue anticipada y pagada mes a mes, no se suma otra vez todo el período en el finiquito; sí debe pagarse la cuota del último mes que aún se adeude.</li>
</ul>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No sumes todos los campos de una simulación</strong><p>La calculadora separa escenarios, pero hoy no conoce la fecha exacta necesaria para incorporar sábados, domingos y festivos al feriado proporcional. Tampoco puede saber si la gratificación ya fue anticipada. Úsala como control preliminar y rehace esas líneas con liquidaciones, fecha de término y calendario.</p></div></aside>

<h2>2. Ingreso mínimo 2026 que usamos de base</h2>
<table>
<thead>
<tr><th>Tramo</th><th>IMM (desde 1 may 2026)</th><th>Fuente</th></tr>
</thead>
<tbody>
<tr>
<td>Trabajadores <strong>18 a 65 años</strong></td>
<td><strong>$553.553</strong></td>
<td><a href="https://www.dt.gob.cl/portal/1628/w3-article-60141.html" target="_blank" rel="noopener">DT — ingreso mínimo</a> · Ley 21.830</td>
</tr>
<tr>
<td><strong>Menores de 18</strong> y <strong>mayores de 65</strong></td>
<td><strong>$412.938</strong></td>
<td>Misma ficha DT</td>
</tr>
<tr>
<td>Fines <strong>no remuneracionales</strong></td>
<td><strong>$356.815</strong></td>
<td>Misma ficha DT</td>
</tr>
</tbody>
</table>
<p>El monto de $553.553 es un <strong>sueldo base mínimo</strong>, no un líquido y tampoco necesariamente el total bruto. Una liquidación puede agregar gratificación, bonos, comisiones y asignaciones. Para las indemnizaciones de los artículos 163 y 162, el artículo 172 utiliza la última remuneración mensual con sus propias inclusiones y exclusiones; para vacaciones, el artículo 71 usa remuneración íntegra. No copies el líquido depositado como base.</p>

<h3>La jornada parcial cambia el mínimo, no elimina derechos</h3>
<p>El sueldo mínimo puede ser proporcional si la jornada parcial pactada es de hasta 30 horas semanales. Una jornada superior a 30 horas y menor que la ordinaria no habilita por sí sola a rebajar el IMM. En cualquier caso, el finiquito conserva vacaciones, remuneraciones y las indemnizaciones que correspondan a la causal; lo que cambia es la base real pactada y pagada.</p>

<h2>3. Plazo de pago: 10 días hábiles</h2>
<p>La <a href="https://www.dt.gob.cl/portal/1628/w3-article-109632.html" target="_blank" rel="noopener">Dirección del Trabajo</a> y el <strong>artículo 177</strong> del Código del Trabajo (modificado por la <a href="https://www.bcn.cl/leychile/navegar?idNorma=1053719" target="_blank" rel="noopener">Ley 20.684</a>) establecen que el finiquito debe <strong>otorgarse</strong> y su <strong>pago ponerse a disposición</strong> del trabajador dentro de <strong>10 días hábiles</strong> contados desde la separación. Solo si las partes lo acuerdan, podría pagarse en cuotas.</p>
<p>Si hay diferencias (causal, montos, cotizaciones), puedes reclamar en la Inspección del Trabajo aunque aún no venza ese plazo. Detalle práctico en el <a href="/blog/checklist-despues-despido-chile-2026">checklist después de un despido</a> y en ChileAtiende (<a href="https://www.chileatiende.gob.cl/fichas/33522-finiquito-de-termino-de-contrato-de-trabajo" target="_blank" rel="noopener">ficha de finiquito</a>).</p>

<h2>4. Topes que importan (y por qué el mínimo casi no choca con 90 UF)</h2>
<ul>
<li><strong>Base de cálculo de indemnización y aviso:</strong> la remuneración mensual para ese fin no puede superar <strong>90 UF</strong> del último día del mes anterior al pago (<a href="https://www.dt.gob.cl/portal/1628/w3-article-60604.html" target="_blank" rel="noopener">DT — tope 90 UF</a>, Art. 172 CdT). Con UF del orden de ~$40.800 (snapshot del sitio), 90 UF superan los $3,6 millones: un sueldo de <strong>$553.553 no se ve limitado</strong> por ese tope.</li>
<li><strong>Años de servicio:</strong> la regla general limita a <strong>11 años</strong> la indemnización legal de contratos iniciados después del 14 de agosto de 1981. Contratos anteriores y pactos convencionales requieren revisión aparte.</li>
<li><strong>Fracción de año:</strong> solo una fracción <strong>superior a seis meses</strong> agrega otro año. Seis meses exactos no cumplen esa condición.</li>
<li><strong>Antigüedad mínima:</strong> el pago legal del artículo 163 por necesidades de la empresa exige que el contrato haya estado vigente un año o más.</li>
</ul>

<h3>Qué integra la “última remuneración mensual”</h3>
<p>El artículo 172 comprende las cantidades que el trabajador recibía por sus servicios al terminar el contrato, incluidas cotizaciones de su cargo y regalías avaluadas. Excluye asignación familiar, horas extra y beneficios esporádicos o pagados una sola vez al año. Si la remuneración es variable, utiliza el promedio de los últimos tres meses calendario.</p>
<p>La periodicidad importa. La DT ha sostenido que una gratificación pagada todos los meses puede integrar la base de años de servicio y aviso previo por su carácter mensual, aunque la gratificación anual es una exclusión expresa. En cambio, esa gratificación mensual no se incorpora a la base del feriado proporcional, sin perjuicio de pagar la cuota del mes de término. La misma palabra produce tratamientos distintos según el concepto calculado.</p>

<h2>5. Ejemplo A: artículo 161, tres años y sin aviso</h2>
<p>Supuestos: sueldo y última remuneración mensual computable de $553.553; tres años exactos; necesidades de la empresa; el empleador no avisó con 30 días; sueldo del último mes ya pagado; vacaciones y gratificación pendientes se dejan fuera para no mezclarlas.</p>
<div class="numeric-example"><div class="numeric-example__title">Indemnizaciones brutas antes de AFC</div><ul>
<li>Años de servicio: 3 × $553.553 = <strong>$1.660.659</strong></li>
<li>Sustitutiva del aviso previo: 1 × $553.553 = <strong>$553.553</strong></li>
</ul><span class="total">Subtotal verificable: $2.214.212</span></div>
<p>Si hubo aviso válido con al menos 30 días, el segundo concepto desaparece y quedan $1.660.659. Si hay feriado o sueldo pendiente, se agregan por separado. Si el empleador aplica el artículo 13 de la Ley 19.728, puede descontar de los $1.660.659 solo su aporte CIC certificado por AFC; no se descuenta de los $553.553 del aviso.</p>

<h2>6. Ejemplo B: gratificación mensual que integra la base</h2>
<p>Supongamos sueldo base $553.553 más una gratificación mensual recurrente de $138.388, equivalente al 25% en este ejemplo y aún bajo el tope anual. Si las liquidaciones muestran que se pagaba todos los meses, la base de los artículos 162 y 163 puede llegar a $691.941.</p>
<div class="numeric-example"><div class="numeric-example__title">Mismos tres años, base mensual $691.941</div><ul>
<li>Años de servicio: 3 × $691.941 = <strong>$2.075.823</strong></li>
<li>Sustitutiva de aviso: <strong>$691.941</strong></li>
</ul><span class="total">Subtotal: $2.767.764 antes de AFC y otros haberes</span></div>
<p>No agregues después otros seis o doce meses de la misma gratificación: ya fue pagada como anticipo mensual y ya incidió en la base de indemnización. Solo se suma la cuota del último mes si quedó adeudada. Si la empresa usa otro sistema de gratificación o el beneficio es anual o esporádico, este ejemplo no aplica.</p>

<h2>7. Ejemplo C: renuncia y vacaciones con fecha real</h2>
<p>Una persona renuncia con efecto el lunes 31 de agosto de 2026, después de acumular seis meses desde su última anualidad. Tiene sueldo mensual fijo de $553.553 y no usó ese feriado. Se generan 7,5 días hábiles: 15 ÷ 12 × 6.</p>
<p>Contados desde el 1 de septiembre, esos 7,5 días atraviesan el sábado 5 y domingo 6. La compensación comprende <strong>9,5 días corridos</strong>. Con valor diario de $553.553 ÷ 30 = $18.451,77, el feriado proporcional es aproximadamente $175.292.</p>
<div class="numeric-example"><div class="numeric-example__title">Renuncia con agosto ya pagado</div><ul>
<li>Indemnización por años: <strong>$0</strong></li>
<li>Indemnización de aviso: <strong>$0</strong></li>
<li>Feriado proporcional: 9,5 × $18.451,77 ≈ <strong>$175.292</strong></li>
</ul><span class="total">Finiquito del ejemplo: $175.292</span></div>
<p>Si agosto no estaba pagado, se agregan $553.553 y los demás haberes devengados. Si el término ocurre cerca de un festivo o el feriado atraviesa más fines de semana, la cifra cambia. Esta es la razón por la que “7,5 × sueldo/30” subestima el pago.</p>

<h2>8. Finiquito ≠ Seguro de Cesantía</h2>
<p>Tras el término puedes solicitar giros en la <strong>AFC</strong>. El seguro no paga sueldos, vacaciones ni aviso previo. No obstante, en un despido por artículo 161 existe una interacción con los años de servicio: el empleador puede imputar la parte de la CIC formada por su aporte de 1,6%, con rentabilidad y costos, utilizando el certificado AFC. El 0,6% del trabajador nunca forma parte de esa rebaja.</p>
<ul>
<li><a href="/blog/seguro-cesantia-finiquito-2026-afc">Seguro de Cesantía y finiquito 2026</a></li>
<li><a href="/blog/como-cobrar-seguro-cesantia-afc-2026">Cómo cobrar el Seguro de Cesantía en la AFC</a></li>
<li>Hub <a href="/cesantia">Me despidieron / cesantía</a></li>
</ul>

<h2>9. Cómo simular tu caso (sin inventar números de redes)</h2>
<ol class="steps">
<li><strong>Junta liquidaciones</strong> de los últimos meses y la carta de término con causal.</li>
<li><strong>Obtén la base del artículo 172</strong> desde liquidaciones; no uses automáticamente el sueldo base ni el líquido.</li>
<li><strong>Anota antigüedad</strong>, fecha de última anualidad, fecha exacta de término y días de feriado no usados.</li>
<li><strong>Marca si hubo aviso de 30 días</strong> (si aplica a tu causal).</li>
<li><strong>Simula las indemnizaciones</strong> en la <a href="/calculadoras/calculadora-finiquito">calculadora de finiquito</a> y corrige vacaciones con el calendario.</li>
<li><strong>Revisa pagos previos</strong> para no duplicar gratificación, sueldo o bonos ya liquidados.</li>
<li><strong>Compara línea por línea</strong> con la propuesta de finiquito y el certificado AFC antes de firmar.</li>
</ol>

<h3>Firma y reserva de derechos</h3>
<p>El finiquito debe ponerse a disposición dentro de diez días hábiles, pero rapidez no significa renunciar a revisar. En Mi DT puedes aceptar, rechazar o aceptar con reserva según las opciones vigentes. La reserva debe individualizar la materia —causal, base de indemnización, vacaciones, descuento AFC u otra— y no debería impedir el pago de los montos no discutidos.</p>
<p>Si pretendes demandar por despido injustificado, la regla general es de 60 días hábiles desde la separación. El reclamo ante la Inspección suspende el cómputo, con máximo de 90 días hábiles. El plazo de diez días para entregar el finiquito no extiende esas acciones.</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Siguiente paso laboral</strong><p>Si el término del contrato abre una búsqueda de empleo, el hub <a href="/cesantia">/cesantia</a> ordena finiquito, AFC y reinserción. En las calculadoras laborales también hay un enlace a CVListo para revisar el match ATS de tu CV con una oferta real (sin inventar experiencia).</p></div></aside>

<ul>
<li><a href="https://www.dt.gob.cl/portal/1628/w3-article-60141.html" target="_blank" rel="noopener">DT — valor del ingreso mínimo mensual</a> (Ley 21.830).</li>
<li><a href="https://www.dt.gob.cl/portal/1628/w3-article-109632.html" target="_blank" rel="noopener">DT — plazo de finiquito y reclamo</a>.</li>
<li><a href="https://www.dt.gob.cl/portal/1628/w3-article-60604.html" target="_blank" rel="noopener">DT — tope 90 UF en indemnizaciones</a>.</li>
<li><a href="https://dt.gob.cl/portal/1628/w3-article-60200.html" target="_blank" rel="noopener">DT — cálculo de feriado proporcional con días inhábiles</a>.</li>
<li><a href="https://www.dt.gob.cl/portal/1628/w3-article-60204.html" target="_blank" rel="noopener">DT — gratificación mensual y base de feriado</a>.</li>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1053719" target="_blank" rel="noopener">BCN — Ley 20.684</a> (plazo 10 días hábiles).</li>
<li><a href="https://www.chileatiende.gob.cl/fichas/33522-finiquito-de-termino-de-contrato-de-trabajo" target="_blank" rel="noopener">ChileAtiende — finiquito de término de contrato</a>.</li>
</ul>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Alcance</strong><p>Artículo informativo verificado al 13 de julio de 2026. Los ejemplos aíslan variables y no sustituyen liquidaciones, contrato, certificado AFC ni asesoría laboral. La calculadora aún requiere fecha de término para reproducir con exactitud el calendario del feriado; esa limitación está registrada para corrección.</p></div></aside>
<p>Para profundizar: <a href="/guias/finiquito-laboral-chile">guía de finiquito laboral</a> · <a href="/calculadoras/calculadora-finiquito">calculadora de finiquito</a> · <a href="/cesantia">hub cesantía</a> · <a href="/blog/sueldo-minimo-2026-calcular-liquido">sueldo mínimo 2026</a>.</p>`,
  },
  {
    slug: 'seguro-cesantia-finiquito-2026-afc',
    title:
      'Seguro de Cesantía y finiquito 2026: cuándo pueden descontar AFC de la indemnización',
    description:
      'Qué parte del Seguro de Cesantía puede imputar el empleador al finiquito, cuándo procede el descuento AFC, cómo revisar el certificado y qué ocurre si el despido se declara injustificado.',
    date: '2026-07-10',
    updatedAt: '2026-07-13',
    category: 'laboral',
    readingTime: 16,
    relatedGuia: 'finiquito-laboral-chile',
    seoTitle: 'AFC y finiquito 2026: cuándo pueden descontar cesantía',
    seoDescription:
      'Revisa cuándo el empleador puede descontar aportes AFC de la indemnización, qué parte de la CIC no puede tocar y cómo impugnar un descuento indebido.',
    keywords: [
      'seguro de cesantía chile',
      'seguro de cesantía AFC 2026',
      'cuenta individual de cesantía',
      'fondo de cesantía solidario',
      'seguro cesantía vs finiquito',
      'descuento AFC finiquito',
      'aporte empleador AFC indemnización',
      'artículo 13 ley 19728',
      'cómo funciona AFC chile',
      'giros seguro de cesantía',
      'cotizaciones cesantía indefinido plazo fijo',
    ],
    relatedCalculators: [
      'calculadora-finiquito',
      'calculadora-indemnizacion-anos-servicio',
      'calculadora-vacaciones-proporcionales',
      'calculadora-sueldo-liquido',
      'calculadora-costo-empleado-pyme',
    ],
    faq: [
      {
        question: '¿El empleador puede descontar la AFC del finiquito?',
        answer:
          'Solo en casos específicos. Si el contrato termina por necesidades de la empresa o desahucio del artículo 161, el empleador puede imputar a la indemnización por años de servicio únicamente la parte de la CIC formada por sus aportes de 1,6%, con su rentabilidad y descontados los costos de administración. Debe respaldar el monto con el certificado de AFC. No puede descontar el aporte de 0,6% del trabajador ni usar esa imputación contra remuneraciones, vacaciones o aviso previo.',
      },
      {
        question: '¿Pueden descontar todo el saldo de mi Cuenta Individual de Cesantía?',
        answer:
          'No. En un contrato indefinido, la CIC también contiene el 0,6% aportado por el trabajador, y esa parte no puede imputarse a la indemnización. Tampoco se descuenta el 0,8% que el empleador destinó al Fondo de Cesantía Solidario. El monto válido es el que AFC identifica en su Certificado de Saldo Aporte Empleador para la imputación del artículo 13.',
      },
      {
        question: '¿Qué ocurre con el descuento AFC si el despido se declara injustificado?',
        answer:
          'La Corte Suprema ha sostenido que, si un tribunal declara injustificada la causal del artículo 161, desaparece el fundamento que permitía imputar el aporte del empleador y este debe restituir lo descontado, además de los efectos indemnizatorios que determine la sentencia. No ocurre automáticamente por reclamar: requiere acuerdo o resolución judicial aplicable al caso.',
      },
      {
        question: '¿Puedo cobrar el seguro si renuncié?',
        answer:
          'Sí puedes solicitar prestaciones con cargo a tu Cuenta Individual si estás cesante, acreditas la renuncia y reúnes las cotizaciones mínimas. La renuncia no habilita el Fondo de Cesantía Solidario y tampoco permite al empleador aplicar la imputación del artículo 13 a tu finiquito.',
      },
      {
        question: '¿Necesito el finiquito firmado para solicitar el Seguro de Cesantía?',
        answer:
          'No siempre. AFC admite distintos documentos para acreditar el término, según la causal: finiquito, carta de despido o renuncia, acta de comparendo, certificado de la Inspección del Trabajo o sentencia, entre otros. El documento debe cumplir los requisitos de validación de AFC. Revisa la alternativa exacta antes de retrasar innecesariamente la solicitud.',
      },
    ],
    content: `<p class="article-lead">El finiquito y el Seguro de Cesantía son pagos distintos, pero existe una interacción que suele quedar mal explicada: cuando el contrato termina por <strong>necesidades de la empresa o desahucio</strong>, el artículo 13 de la Ley 19.728 permite al empleador imputar una parte determinada de sus aportes a la indemnización por años de servicio. No puede descontar todo tu saldo AFC, no puede tocar el 0,6% que salió de tu remuneración y debe acreditar el cálculo con un certificado emitido por la administradora.</p>

<p>Esta guía explica cómo auditar ese descuento en 2026, qué cambia según la causal del término y qué hacer si el despido se impugna. El trámite operativo para cobrar —documentos, plazos y calendario de pagos— está desarrollado por separado en <a href="/blog/como-cobrar-seguro-cesantia-afc-2026">cómo solicitar el Seguro de Cesantía en AFC</a>.</p>

<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Respuesta corta</strong><p>Un renglón que diga simplemente “descuento AFC” no basta. Para un contrato indefinido terminado por artículo 161, la imputación legal corresponde a la parte de la CIC formada por el <strong>aporte de 1,6% del empleador</strong>, más su rentabilidad y menos los costos de administración. El aporte de <strong>0,6% del trabajador queda fuera</strong>. La Dirección del Trabajo indica que el empleador debe pedir a AFC el monto exacto.</p></div></aside>

<h2>Finiquito, CIC y Fondo Solidario: tres cuentas diferentes</h2>
<p>El <strong>finiquito</strong> documenta el término del contrato y liquida obligaciones del empleador: remuneraciones pendientes, feriado legal o proporcional, indemnización sustitutiva del aviso y años de servicio cuando la causal y la antigüedad lo permiten. Debe mostrar conceptos y montos, no una cifra global imposible de revisar.</p>
<p>La <strong>Cuenta Individual de Cesantía (CIC)</strong> es administrada por AFC y se forma con cotizaciones asociadas al trabajador. Sus recursos financian giros cuando la persona queda cesante y cumple los requisitos. El <strong>Fondo de Cesantía Solidario (FCS)</strong>, en cambio, complementa la cobertura si el saldo individual no alcanza y además se cumplen causal, densidad de cotizaciones y condiciones de búsqueda de empleo.</p>

<table>
<thead><tr><th>Concepto</th><th>Quién lo determina</th><th>Qué paga</th><th>Documento clave</th></tr></thead>
<tbody>
<tr><td>Finiquito</td><td>Empleador y trabajador; DT o tribunal si hay disputa</td><td>Obligaciones del término</td><td>Propuesta y finiquito ratificado</td></tr>
<tr><td>CIC</td><td>AFC según saldo y Ley 19.728</td><td>Giros con cargo a la cuenta individual</td><td>Cartola y resolución de solicitud</td></tr>
<tr><td>FCS</td><td>AFC, si se reúnen requisitos adicionales</td><td>Complemento para prestaciones con mínimos y máximos</td><td>Solicitud AFC y activación en BNE</td></tr>
<tr><td>Imputación artículo 13</td><td>AFC certifica; empleador aplica</td><td>Reduce solo la indemnización legal por años de servicio</td><td>Certificado de Saldo Aporte Empleador</td></tr>
</tbody>
</table>

<p>Por eso la frase “puedes cobrar ambas cosas” necesita una precisión: sí es posible recibir el finiquito y luego prestaciones de cesantía, pero la indemnización por años de servicio puede venir reducida por la imputación legal si se cumplen todos sus supuestos. Lo que no corresponde es presentar esa regla como una devolución total del seguro al empleador.</p>

<h2>La causal decide si existe el descuento</h2>
<table>
<thead><tr><th>Causal de término</th><th>Indemnización por años de servicio</th><th>Imputación AFC</th><th>Cobertura de cesantía</th></tr></thead>
<tbody>
<tr><td>Necesidades de la empresa o desahucio, artículo 161</td><td>Puede corresponder según antigüedad y reglas legales</td><td>Sí, limitada al aporte empleador certificado</td><td>CIC y posible FCS si reúne requisitos</td></tr>
<tr><td>Renuncia voluntaria</td><td>No existe indemnización legal por años de servicio</td><td>No procede por artículo 13</td><td>CIC posible; FCS no</td></tr>
<tr><td>Mutuo acuerdo</td><td>Solo la pactada, si existe</td><td>No procede la imputación legal del artículo 13</td><td>CIC posible; FCS no</td></tr>
<tr><td>Vencimiento del plazo, artículo 159 N.º 4</td><td>No hay indemnización legal general por años de servicio</td><td>No se aplica como si fuera artículo 161</td><td>CIC y eventual FCS bajo requisitos</td></tr>
<tr><td>Conclusión de obra o faena, artículo 159 N.º 5</td><td>Puede operar la indemnización especial por tiempo servido</td><td>Regla especial sobre aporte empleador de 2,8%</td><td>CIC y eventual FCS bajo requisitos</td></tr>
<tr><td>Causal disciplinaria, artículo 160</td><td>Normalmente no corresponde la indemnización legal</td><td>No existe una IAS a la cual aplicar artículo 13</td><td>CIC posible; la causal no está entre las comunes que habilitan FCS</td></tr>
</tbody>
</table>

<p>La Dirección del Trabajo ha señalado expresamente que la imputación no procede ante una <strong>renuncia voluntaria</strong>. Tampoco debe trasladarse por analogía a cualquier término solo porque el empleador pagó cotizaciones. La regla nace de una causal concreta y opera sobre una indemnización concreta.</p>

<p>En contratos por obra o faena, el artículo 13 contempla una variante: si el contrato termina válidamente por conclusión del trabajo o servicio que le dio origen y corresponde la indemnización especial de 2,5 días de remuneración por cada mes trabajado —aplicable bajo sus requisitos—, puede imputarse la parte de la CIC financiada con el aporte de 2,8% del empleador, con rentabilidad y costos. Antes de aceptar el cálculo hay que verificar que el contrato sea realmente por obra o faena, que la causal sea la correcta y que AFC haya certificado la suma.</p>

<h2>Qué permite exactamente el artículo 13</h2>
<p>En un contrato indefinido, el empleador cotiza 2,4% de la remuneración imponible al Seguro de Cesantía: <strong>1,6% va a la CIC</strong> y <strong>0,8% al FCS</strong>. El trabajador aporta otro 0,6% a su CIC. La imputación contra la indemnización por años de servicio considera solo el 1,6% de origen empleador acumulado para ese vínculo laboral, su rentabilidad, menos los costos de administración correspondientes.</p>

<ul>
<li><strong>Sí puede incluir:</strong> aporte CIC del empleador autorizado por la ley, rentabilidad asociada y ajuste por costos de administración.</li>
<li><strong>No puede incluir:</strong> el 0,6% descontado al trabajador, el aporte enviado al Fondo Solidario ni depósitos de otros empleadores.</li>
<li><strong>Solo se imputa contra:</strong> la indemnización por años de servicio que nace del término por artículo 161.</li>
<li><strong>No se mezcla con:</strong> sueldo adeudado, comisiones devengadas, feriado, indemnización sustitutiva del aviso previo u otros conceptos del finiquito.</li>
</ul>

<p>La expresión “aporte empleador” puede inducir a error: no significa todo lo pagado por la empresa al sistema. AFC ofrece precisamente el <a href="https://www.afc.cl/empleadores/sus-certificados/" target="_blank" rel="noopener">Certificado de Saldo Aporte Empleador para la imputación del artículo 13</a>. Ese certificado separa el monto atribuible a la relación laboral y evita que Recursos Humanos estime el descuento desde liquidaciones, una cartola parcial o una planilla propia.</p>

<h2>Ejemplo: cómo revisar una imputación sin confundir saldos</h2>
<p>Supongamos un contrato indefinido, remuneración mensual para la indemnización de $1.000.000 y cuatro años computables. El empleador invoca necesidades de la empresa. Para simplificar, no existen topes, fracciones de año ni indemnizaciones convencionales que cambien el ejemplo.</p>

<div class="numeric-example"><div class="numeric-example__title">Ejemplo ilustrativo de artículo 13</div><ul>
<li>Indemnización por años de servicio bruta: 4 × $1.000.000 = <strong>$4.000.000</strong></li>
<li>Saldo total visible en la CIC: <strong>$1.150.000</strong></li>
<li>Monto certificado por AFC como aporte empleador imputable: <strong>$850.000</strong></li>
<li>Indemnización por años de servicio después de imputación: $4.000.000 − $850.000 = <strong>$3.150.000</strong></li>
</ul><span class="total">La diferencia de $300.000 de la CIC no se descuenta solo por aparecer en la cuenta</span></div>

<p>El saldo total de $1.150.000 podría incluir aportes del trabajador, recursos ligados a empleadores anteriores o movimientos que no forman parte del certificado aplicable. El ejemplo tampoco autoriza rebajar los $850.000 de la indemnización de aviso, las vacaciones o el sueldo del último mes. Cada concepto debe quedar en una línea separada del finiquito.</p>

<p>Para aproximar la indemnización bruta antes de la imputación puedes usar la <a href="/calculadoras/calculadora-indemnizacion-anos-servicio">calculadora de años de servicio</a>. El certificado AFC y el finiquito real siguen mandando: la herramienta no conoce la composición histórica de tu CIC.</p>

<h2>Cómo auditar el certificado y el finiquito</h2>
<ol class="steps">
<li><strong>Lee la carta de término.</strong> Debe identificar la causal y los hechos que la sostienen. No revises el descuento aislado de esa carta.</li>
<li><strong>Calcula la indemnización bruta.</strong> Verifica remuneración base, años computables, fracción superior a seis meses y topes que correspondan.</li>
<li><strong>Pide el certificado AFC.</strong> Debe ser el de Saldo Aporte Empleador para artículo 13, no una captura de la cartola general.</li>
<li><strong>Compara el monto exacto.</strong> La línea descontada no debería superar el valor certificado ni involucrar aportes de otro vínculo.</li>
<li><strong>Separa los demás haberes.</strong> Revisa sueldo, feriado, aviso previo, bonos o comisiones sin restarles AFC.</li>
<li><strong>Guarda la evidencia.</strong> Carta, certificado, propuesta, liquidaciones, cartola AFC y comprobante de firma forman un expediente básico.</li>
</ol>

<p>Si el empleador no entrega el respaldo o la cifra no coincide, pide la corrección por escrito. Las dudas repetidas en foros laborales suelen formularse como “me quitaron mi AFC”, pero la pregunta verificable es otra: <em>¿qué causal se usó, cuál es la indemnización bruta y qué monto certificó AFC como aporte empleador?</em> Los foros sirvieron para detectar esa confusión; la respuesta legal proviene de la Ley 19.728, la DT y los tribunales.</p>

<h2>Qué ocurre si se declara injustificado el artículo 161</h2>
<p>La jurisprudencia laboral ha discutido qué pasa cuando el empleador aplicó artículo 161, descontó su aporte AFC y después un tribunal declaró injustificado el despido. La <a href="https://www.pjud.cl/prensa-y-comunicaciones/noticias-del-poder-judicial/78478" target="_blank" rel="noopener">Corte Suprema, en sentencia Rol 76.131-2021</a>, sostuvo que al perder sustento la causal también desaparece la base de la imputación y el empleador debe restituir lo descontado. No es una devolución automática de AFC: es una consecuencia que debe pedirse y resolverse en el caso.</p>

<p>También pueden operar los recargos del artículo 168 del Código del Trabajo sobre las indemnizaciones, según causal y sentencia. Por eso no conviene limitar un reclamo a “la cifra está mal” si la controversia real es que las necesidades de la empresa no existieron o no fueron acreditadas.</p>

<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Los plazos corren desde la separación</strong><p>La acción por despido injustificado tiene, como regla general, un plazo de <strong>60 días hábiles</strong>. Un reclamo ante la Inspección del Trabajo suspende el plazo, pero existe un límite máximo de <strong>90 días hábiles</strong>. No esperes el resultado de AFC para recién revisar la carta de término o buscar orientación jurídica.</p></div></aside>

<h2>Firmar el finiquito: pago, reserva y descuento AFC</h2>
<p>Antes de firmar, solicita una propuesta desglosada y contrástala con la carta. Si estás de acuerdo con parte de los montos pero discrepas de la causal, la base de cálculo o la imputación AFC, el artículo 177 permite formular una <strong>reserva de derechos</strong>; esa reserva no debería impedir el pago de las sumas no disputadas. Debe identificar con claridad qué materia se cuestiona. Un texto copiado de internet puede omitir precisamente el descuento o la causal que necesitas discutir.</p>

<p>El finiquito electrónico en Mi DT permite aceptar, rechazar o aceptar con reserva según el flujo vigente. En papel, lee antes de ratificar ante ministro de fe. Si el documento incluye renuncias amplias, hechos que no reconoces o un descuento sin certificado, obtén asesoría de la Inspección del Trabajo, la Corporación de Asistencia Judicial o un abogado laboral antes de cerrar la controversia.</p>

<p>El Seguro de Cesantía no siempre exige esperar un finiquito firmado. AFC admite documentos alternativos según la causal, como carta de despido, carta de renuncia ratificada, acta de comparendo, certificado de la Inspección del Trabajo o sentencia. Esto evita que una disputa sobre el finiquito paralice necesariamente todo el trámite previsional.</p>

<h2>Cuánto se cotiza y qué parte financia cada fondo</h2>
<p>En 2026 el tope imponible del Seguro de Cesantía es <strong>135,2 UF</strong>. Las tasas oficiales publicadas por AFC distinguen contrato y destino:</p>
<table>
<thead><tr><th>Contrato</th><th>Trabajador</th><th>Empleador a CIC</th><th>Empleador a FCS</th></tr></thead>
<tbody>
<tr><td>Indefinido</td><td>0,6%</td><td>1,6%</td><td>0,8%</td></tr>
<tr><td>Plazo fijo u obra/faena</td><td>0%</td><td>2,8%</td><td>0,2%</td></tr>
<tr><td>Casa particular</td><td>0%</td><td>2,2%</td><td>0,8%</td></tr>
</tbody>
</table>
<p>En casa particular, el empleador agrega un 1,11% destinado a la cuenta de indemnización en la AFP, por lo que su costo total relacionado llega a 4,11%. Esa cuenta indemnizatoria es distinta de la CIC y no debe mezclarse en una tabla de imputación general.</p>

<h2>CIC: requisitos y cálculo de giros</h2>
<p>Para cobrar con cargo a la CIC debes estar cesante, acreditar el término y reunir al menos <strong>10 cotizaciones</strong> si el contrato era indefinido o <strong>5 cotizaciones</strong> si era a plazo fijo o por obra. Pueden ser continuas o discontinuas y provenir de uno o más empleadores, contadas desde la afiliación o el último cobro hasta el mes de término.</p>

<p>Los giros aplican 70%, 60%, 45%, 40%, 35% y luego 30% sobre la remuneración promedio de referencia, hasta donde alcance el saldo. La base no es igual para todos: AFC considera las <strong>últimas 10 remuneraciones</strong> en contratos indefinidos o de casa particular y las <strong>últimas 5</strong> en contratos a plazo fijo u obra. Por eso una estimación que usa diez meses para cualquier contrato puede ser incorrecta.</p>

<p>La CIC puede solicitarse por cualquier causal de término, incluida renuncia o mutuo acuerdo, si se cumplen los requisitos. Eso no significa que todas las causales den acceso al FCS ni que una renuncia genere indemnización por años de servicio.</p>

<h2>Fondo Solidario: no se activa solo porque la CIC sea baja</h2>
<p>Para optar al FCS se requieren, entre otras condiciones, <strong>10 cotizaciones pagadas al fondo en los 24 meses anteriores</strong>, que las últimas tres sean continuas y con el mismo empleador, saldo CIC insuficiente para financiar las prestaciones y una causal involuntaria admitida. Entre las causales habituales están vencimiento del plazo, conclusión de obra, caso fortuito o fuerza mayor, necesidades de la empresa y procedimientos concursales del empleador. Renuncia y mutuo acuerdo no habilitan este fondo.</p>

<p>Además, el beneficiario debe activar su cuenta en la Bolsa Nacional de Empleo y cumplir las acciones exigidas. Los montos tienen pisos y topes que AFC actualiza; no se obtienen multiplicando el sueldo por un porcentaje sin revisar la tabla vigente. El detalle de documentos, cinco giros y calendario está en la <a href="/blog/como-cobrar-seguro-cesantia-afc-2026">guía operativa de cobro AFC</a>.</p>

<h2>Errores que cambian el resultado</h2>
<ul>
<li>Restar todo el saldo CIC en vez del aporte empleador certificado.</li>
<li>Aplicar artículo 13 a una renuncia, mutuo acuerdo o vencimiento de plazo.</li>
<li>Descontar AFC de vacaciones, remuneraciones o aviso previo.</li>
<li>Usar el 2,4% completo del empleador en un contrato indefinido, ignorando que 0,8% fue al FCS.</li>
<li>Confundir la cartola del trabajador con el certificado especial para el empleador.</li>
<li>Suponer que impugnar el despido devuelve inmediatamente el descuento.</li>
<li>Esperar el finiquito indefinidamente cuando AFC acepta otro documento válido.</li>
<li>Usar diez remuneraciones para calcular la referencia de un contrato a plazo fijo.</li>
<li>Creer que renunciar permite FCS porque sí permite retirar la CIC.</li>
</ul>

<h2>Checklist después del término</h2>
<ol class="steps">
<li>Guarda carta de término y revisa la causal citada.</li>
<li>Simula el finiquito bruto en la <a href="/calculadoras/calculadora-finiquito">calculadora de finiquito</a>.</li>
<li>Solicita el certificado de aporte empleador si aparece una imputación AFC.</li>
<li>Comprueba que el descuento afecte solo años de servicio y coincida con el certificado.</li>
<li>Decide si aceptarás, rechazarás o firmarás con una reserva específica.</li>
<li>Solicita el Seguro de Cesantía con el documento válido que tengas.</li>
<li>Si cuestionas causal o monto, reclama sin perder los plazos judiciales.</li>
<li>Arma un presupuesto con pagos AFC confirmados, no con el saldo total de la cartola.</li>
</ol>

<h2>Fuentes y criterio editorial</h2>
<p>Contenido verificado al 13 de julio de 2026 con la <a href="https://www.bcn.cl/leychile/navegar?idNorma=184979" target="_blank" rel="noopener">Ley 19.728 en LeyChile</a>, la respuesta vigente de la <a href="https://www.dt.gob.cl/portal/1628/w3-article-95307.html" target="_blank" rel="noopener">Dirección del Trabajo sobre imputación AFC</a>, el <a href="https://dt.gob.cl/legislacion/1624/w3-article-109220.html" target="_blank" rel="noopener">Ordinario 1916 de la DT</a>, el catálogo de <a href="https://www.afc.cl/empleadores/sus-certificados/" target="_blank" rel="noopener">certificados para empleadores de AFC</a>, la <a href="https://www.chileatiende.gob.cl/fichas/62932" target="_blank" rel="noopener">ficha oficial del Seguro de Cesantía</a> y la jurisprudencia publicada por el Poder Judicial. Noticias y foros se usaron para identificar controversias y preguntas reales; no sustituyen normas, dictámenes ni sentencias.</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Alcance</strong><p>Información general, no asesoría jurídica o previsional personalizada. Un instrumento colectivo, una indemnización convencional, una causal discutida o una sentencia pueden cambiar el resultado. Prevalecen tu contrato, los documentos del término, la normativa vigente y las decisiones de la autoridad competente.</p></div></aside>

<p>Continúa con la <a href="/guias/finiquito-laboral-chile">guía de finiquito laboral</a>, el <a href="/blog/checklist-despues-despido-chile-2026">checklist después del despido</a> o el <a href="/cesantia">hub de cesantía</a>.</p>`,
  },
  {
    slug: 'como-cobrar-seguro-cesantia-afc-2026',
    title: 'Cómo cobrar el Seguro de Cesantía en la AFC 2026: requisitos y pasos',
    description:
      'Paso a paso para solicitar el Seguro de Cesantía en Chile: documentos, cotizaciones mínimas, sucursal virtual AFC, giros y qué pasa si te contratan de nuevo.',
    date: '2026-07-10',
    updatedAt: '2026-07-10',
    category: 'laboral',
    readingTime: 17,
    relatedGuia: 'finiquito-laboral-chile',
    seoTitle: 'Cómo cobrar Seguro de Cesantía AFC 2026: pasos y requisitos',
    seoDescription:
      'Solicita el Seguro de Cesantía en AFC: documentos, 10 o 5 cotizaciones, sucursal virtual, giros mensuales y suspensión si vuelves a trabajar. Guía Chile 2026.',
    keywords: [
      'cómo cobrar seguro de cesantía',
      'solicitar AFC chile',
      'requisitos seguro cesantía 2026',
      'sucursal virtual AFC',
      'documentos cobro cesantía',
      'giros AFC sin finiquito',
      'cobrar cesantía plazo fijo',
    ],
    relatedCalculators: [
      'calculadora-finiquito',
      'calculadora-vacaciones-proporcionales',
      'calculadora-indemnizacion-anos-servicio',
      'calculadora-sueldo-liquido',
    ],
    faq: [
      {
        question: '¿Puedo cobrar el seguro sin finiquito firmado?',
        answer:
          'Sí es posible con otros documentos que acrediten el término: carta de despido, carta de renuncia, acta de comparendo, certificado de la Inspección del Trabajo o sentencia judicial. La AFC publica alternativas cuando aún no tienes finiquito. Revisa afc.cl antes de postergar la solicitud solo por ese papel.',
      },
      {
        question: '¿Dónde se solicita el cobro?',
        answer:
          'En la Sucursal Virtual de AFC con RUT y clave AFC o ClaveÚnica, o presencialmente en una sucursal. En línea debes cargar el documento de término completo y a color, revisar la simulación, elegir medio de pago y validar identidad con cédula vigente y reconocimiento facial.',
      },
      {
        question: '¿Qué pasa con los pagos si encuentro trabajo?',
        answer:
          'AFC suspende los pagos cuando el nuevo empleador informa el inicio laboral o paga la primera cotización. El saldo CIC no utilizado vuelve a la cuenta y no se pierde. Si la cotización posterior fue un bono pendiente del exempleador y sigues cesante, puedes aclararlo con el certificado que AFC solicita.',
      },
      {
        question: '¿Cuándo llega el primer pago del Seguro de Cesantía?',
        answer:
          'Si solicitaste antes de cumplir 30 días desde el término, se procesa el jueves siguiente a que se cumplan 30 días corridos. Si solicitaste después, se procesa el jueves siguiente a la aprobación. Para autodespido del artículo 171, el primer pago se realiza al menos 60 días después del término.',
      },
    ],
    content: `<p class="article-lead">Cobrar el Seguro de Cesantía no exige esperar siempre el finiquito, pero sí demostrar el término con un documento válido, tener las cotizaciones requeridas y escoger correctamente entre Cuenta Individual y Fondo Solidario. Una solicitud bien presentada recibe respuesta en hasta cinco días hábiles; el primer pago, sin embargo, se programa según los días transcurridos desde el término.</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Finiquito y AFC son pagos distintos</strong><p>El empleador paga remuneraciones, feriado e indemnizaciones que correspondan. AFC paga prestaciones con cargo a la Cuenta Individual de Cesantía y, si se cumplen filtros adicionales, al Fondo de Cesantía Solidario. Solicitar AFC no significa aceptar la causal ni renunciar a reclamar el finiquito.</p></div></aside>

<h2>1. Confirma la relación laboral y tu cartola</h2>
<p>Entra a la <a href="https://webafiliados.afc.cl/" target="_blank" rel="noopener">Sucursal Virtual de AFC</a> con RUT y ClaveÚnica o clave AFC. Revisa el empleador, tipo de contrato informado, fecha de afiliación, cotizaciones y saldo de la CIC. Si el sistema muestra una relación activa que ya terminó o faltan pagos, no inventes otra fecha para avanzar: guarda la cartola y solicita corrección.</p>
<p>El requisito principal es estar cesante respecto de la relación cuyo término se acredita. AFC aclara que una persona con dos empleos puede solicitar el beneficio por el contrato terminado aunque mantenga el otro, sujeto a sus reglas y saldo asociado. No debe confundirse con comenzar un nuevo empleo después de pedir el seguro, situación que suspende pagos.</p>

<h2>2. Elige el documento según la causal</h2>
<p>El finiquito ratificado es el respaldo más habitual, pero no el único. AFC admite documentos distintos según la forma de término:</p>
<ul>
<li>finiquito ratificado ante ministro de fe o finiquito electrónico de la DT;</li>
<li>carta de aviso o despido emitida y firmada por el empleador;</li>
<li>carta de renuncia con sus formalidades;</li>
<li>carta de mutuo acuerdo o autodespido;</li>
<li>acta de conciliación ante la Dirección del Trabajo;</li>
<li>certificado de la Inspección, sentencia judicial u otros documentos autorizados para casos específicos.</li>
</ul>
<p>El documento debe identificar trabajador y empleador, fecha de cese y causal. En la solicitud digital se carga completo, a color, con todas las páginas y caras, en PDF, JPG, JPEG o PNG, dentro del límite indicado por el portal. Una fotografía recortada, borrosa o sin la página de firmas puede producir rechazo aunque la causal sea correcta.</p>

<h3>Cuándo una carta no basta indefinidamente</h3>
<p>La ficha vigente de AFC señala que la carta de aviso o despido es válida para presentarla dentro de los 30 días siguientes al término, salvo contratos de menos de 30 días. Después debe complementarse con el finiquito y sus formalidades. Por eso “se puede cobrar siempre solo con la carta” también es un consejo incompleto.</p>
<p>Si no tienes ningún documento y desconoces el domicilio actual del exempleador, la Dirección del Trabajo dispone una <strong>declaración jurada de término para Seguro de Desempleo</strong>. No sirve para reescribir la causal a conveniencia; permite acreditar el término bajo sus requisitos.</p>

<h2>3. Verifica las cotizaciones de la Cuenta Individual</h2>
<table>
<thead><tr><th>Contrato terminado</th><th>Mínimo para usar CIC</th><th>Promedio base del primer giro</th></tr></thead>
<tbody>
<tr><td>Indefinido o trabajador de casa particular</td><td>10 cotizaciones</td><td>Últimas 10 remuneraciones</td></tr>
<tr><td>Plazo fijo, obra o servicio</td><td>5 cotizaciones</td><td>Últimas 5 remuneraciones</td></tr>
</tbody>
</table>
<p>Las cotizaciones para CIC pueden ser continuas o discontinuas y provenir de uno o más empleadores. Se cuentan desde la afiliación o desde el último cobro, según corresponda, hasta el término. No basta contar filas de la cartola: verifica que estén pagadas y pertenezcan al período utilizable.</p>
<p>La Cuenta Individual puede utilizarse sin importar si el término fue por despido, vencimiento, renuncia o mutuo acuerdo, siempre que se cumplan los demás requisitos. La causal sí importa para acceder al Fondo Solidario.</p>

<h2>4. Comprueba si puedes pedir Fondo de Cesantía Solidario</h2>
<p>El FCS complementa cuando el saldo de la CIC no alcanza para financiar al menos cinco pagos. No se activa automáticamente por tener poco dinero. AFC exige conjuntamente:</p>
<ul>
<li>10 cotizaciones pagadas en los 24 meses anteriores al despido;</li>
<li>las tres últimas continuas y con el mismo empleador;</li>
<li>para plazo fijo, obra o servicio, que las cotizaciones estén registradas antes del término;</li>
<li>causal involuntaria admitida por la Ley 19.728;</li>
<li>saldo CIC insuficiente para cinco pagos;</li>
<li>inscripción y certificación en la Bolsa Nacional de Empleo.</li>
</ul>
<p>Renuncia y mutuo acuerdo permiten usar CIC, pero no el FCS. En una solicitud que ofrece ambas opciones, revisa la simulación antes de escoger: Fondo Solidario tiene mínimos, máximos y obligaciones BNE; CIC usa tu saldo y puede continuar mientras alcance.</p>

<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>BNE no es un registro decorativo</strong><p>Si accedes al Fondo Solidario debes activar la cuenta, completar el currículum y participar en las acciones exigidas. La BNE reporta mensualmente el cumplimiento a AFC. No asistir a una capacitación o no certificarse puede suspender el pago.</p></div></aside>

<h2>5. Envía la solicitud en la Sucursal Virtual</h2>
<ol class="steps">
<li>Ingresa con RUT y clave AFC o ClaveÚnica.</li>
<li>Selecciona <strong>Seguro de Cesantía → Cobrar</strong> y la relación laboral terminada.</li>
<li>Escoge el tipo de documento y carga todas sus páginas.</li>
<li>Revisa la simulación: fondo, número estimado de pagos, montos y fechas.</li>
<li>Confirma datos personales y correo.</li>
<li>Elige depósito o efectivo. Para depósito, la cuenta debe corresponder al titular y no ser bipersonal.</li>
<li>Valida identidad con cédula vigente y reconocimiento facial.</li>
<li>Descarga o guarda el comprobante y revisa “Mis solicitudes de cobro”.</li>
</ol>
<p>AFC informa aprobación o rechazo por correo dentro de un máximo de cinco días hábiles. Ese plazo no significa que el dinero llegue al quinto día: la prestación respeta el calendario de treinta días desde el término. Si el reconocimiento facial, el documento o la plataforma impiden completar el proceso, puedes ir a sucursal con cédula y documento original.</p>

<h2>6. Fecha del primer pago</h2>
<p>Todos los pagos se procesan los jueves:</p>
<ul>
<li>Si solicitaste <strong>antes</strong> de cumplir 30 días corridos desde el término, el primer pago se procesa el jueves siguiente a que se cumplan esos 30 días.</li>
<li>Si solicitaste <strong>después</strong> de los 30 días, se procesa el jueves siguiente a la aprobación.</li>
<li>En autodespido o despido indirecto del artículo 171, el primero se realiza al menos 60 días corridos después del término.</li>
</ul>
<p>No existe un plazo máximo para solicitar mientras conserves la condición de cesante; el derecho no desaparece al día 31. Aun así, esperar retrasa el pago y puede complicar documentos cuya vigencia operativa es menor, como la carta de despido sin finiquito.</p>

<div class="numeric-example"><div class="numeric-example__title">Término un lunes 6 y solicitud el viernes 10</div><ul><li>La solicitud puede aprobarse dentro de cinco días hábiles.</li><li>Los 30 días corridos se cumplen el miércoles 5 del mes siguiente.</li><li>El primer pago se procesa el jueves posterior, según calendario informado por AFC.</li><li>Si existen feriados, se cuentan igualmente para completar los 30 días.</li></ul><span class="total">Aprobación y fecha de pago no son lo mismo</span></div>

<h2>7. Cómo se calculan los pagos</h2>
<p>En la CIC, el primer pago equivale a 70% del promedio de las últimas cinco remuneraciones para plazo fijo y de las últimas diez para indefinido. Los porcentajes siguientes bajan a 60%, 45%, 40%, 35% y 30%, mientras exista saldo y continúe la cesantía. El resultado efectivo puede ser menor al porcentaje teórico cuando el saldo no alcanza.</p>
<p>El Fondo Solidario usa porcentajes y topes legales. Para valores vigentes hasta el 28 de febrero de 2027, AFC publica:</p>
<table><thead><tr><th>Pago</th><th>Indefinido / casa particular</th><th>Plazo fijo / obra / servicio</th></tr></thead><tbody><tr><td>1</td><td>70%</td><td>60%</td></tr><tr><td>2</td><td>60%</td><td>40%</td></tr><tr><td>3</td><td>45%</td><td>35%</td></tr><tr><td>4</td><td>40%</td><td>30%</td></tr><tr><td>5</td><td>35%</td><td>30%</td></tr></tbody></table>
<p>Los montos mínimos y máximos se reajustan, por lo que no deben copiarse de una noticia antigua. Usa la simulación oficial del día. El FCS permite hasta diez pagos dentro de cinco años considerando las prestaciones utilizadas, no diez pagos garantizados por cada despido.</p>

<h2>8. Medio de pago y errores bancarios</h2>
<p>Puedes recibir depósito en CuentaRUT, cuenta vista, corriente o de ahorro, o efectivo en Servipag o BancoEstado. AFC no admite cuentas bipersonales. Si eliges efectivo tienes 60 días para cobrar; para autorizar a otra persona se requiere poder notarial aprobado por AFC.</p>
<p>Antes de confirmar depósito, revisa banco, tipo y número de cuenta. Una cuenta cerrada, bloqueada o de un tercero puede devolver el pago y mover la fecha. Si la plataforma permite modificar el medio antes del pago, el cambio queda sujeto a revisión; no asumas que editarlo el miércoles se reflejará el jueves.</p>

<h2>9. Qué hacer si rechazan la solicitud</h2>
<p>Ingresa a “Mis solicitudes de cobro” y lee la causal exacta. Los problemas operativos más frecuentes son documento incompleto, firma o ratificación ausente, fecha que no coincide, cédula vencida, cotizaciones insuficientes o relación laboral aún activa. Corrige el antecedente indicado; no envíes repetidamente el mismo archivo.</p>
<p>Si el rechazo parece incorrecto, ingresa un requerimiento en AFC con cartola, documento completo y explicación breve. Para cotizaciones impagas del empleador, también puede corresponder reclamo previsional. Una solicitud AFC rechazada no determina si el despido fue legal ni elimina un reclamo laboral.</p>

<h2>10. Nueva cotización y pagos suspendidos</h2>
<p>Si un nuevo empleador informa el inicio laboral o paga la primera cotización, AFC suspende automáticamente el beneficio porque ya no existe cesantía respecto del nuevo empleo. El saldo CIC no utilizado vuelve a la cuenta.</p>
<p>A veces la cotización posterior no es un nuevo trabajo: el exempleador puede pagar una comisión, bono u hora extra atrasada. AFC la interpreta preventivamente como relación activa. Si sigues cesante, solicita al exempleador el <strong>certificado aclaratorio</strong> y súbelo en “Seguro de Cesantía → Mis solicitudes de cobro”. AFC evaluará la reactivación.</p>
<p>El pago también puede suspenderse por incumplimiento BNE cuando se usa Fondo Solidario. Distingue la causal antes de reclamar: un certificado del exempleador no corrige una certificación laboral incumplida.</p>

<h2>11. Cobertura y presupuesto mientras recibes el seguro</h2>
<p>Mientras duran los pagos, el beneficio contempla cobertura de salud a través de Fonasa bajo sus reglas. Si estabas en Isapre, tienes cargas o tratamiento, consulta la continuidad específica. El Fondo Solidario también financia un aporte previsional conforme a la normativa aplicable.</p>
<p>Arma el presupuesto con las fechas y montos aprobados, no con el máximo del sitio. Separa finiquito, ahorro y AFC. Si una diferencia de finiquito está en reclamo, no la uses para prometer pagos mensuales. El <a href="/blog/checklist-despues-despido-chile-2026">checklist después del despido</a> ordena carta, plazos legales, salud y reinserción.</p>

<h2>Checklist final</h2>
<ul class="data-grid">
<li><span class="label">Relación laboral y cartola correctas</span><span class="value">Hecho / pendiente</span></li>
<li><span class="label">Documento completo y formal</span><span class="value">Hecho / pendiente</span></li>
<li><span class="label">CIC: 10 o 5 cotizaciones</span><span class="value">Cumple / no cumple</span></li>
<li><span class="label">FCS: 10 en 24 meses + causal + BNE</span><span class="value">Cumple / no cumple</span></li>
<li><span class="label">Simulación y fondo elegidos</span><span class="value">Revisado / pendiente</span></li>
<li><span class="label">Cuenta bancaria a nombre del titular</span><span class="value">Revisada / pendiente</span></li>
<li><span class="label">Comprobante y correo guardados</span><span class="value">Hecho / pendiente</span></li>
<li><span class="label">Fecha del primer jueves anotada</span><span class="value">Hecho / pendiente</span></li>
</ul>

<p>Para entender qué paga cada fondo, revisa <a href="/blog/seguro-cesantia-finiquito-2026-afc">Seguro de Cesantía versus finiquito</a>. Si el empleador aún no paga o discutirás la causal, consulta la <a href="/guias/finiquito-laboral-chile">guía de finiquito</a> y no dejes correr el plazo judicial.</p>

<h2>Fuentes oficiales consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con los <a href="https://www.afc.cl/mi-seguro-de-cesantia/requisitos-y-documentos/" target="_blank" rel="noopener">requisitos y documentos de AFC</a>, el trámite <a href="https://www.afc.cl/afiliados/quedo-cesante-o-esta-cobrando-su-seguro/como-y-donde-cobrar-el-seguro-de-cesantia/" target="_blank" rel="noopener">cómo y dónde cobrar</a>, las <a href="https://www.afc.cl/mi-seguro-de-cesantia/fechas-y-medios-de-pago/" target="_blank" rel="noopener">fechas y medios de pago</a>, las tablas de <a href="https://www.afc.cl/mi-seguro-de-cesantia/beneficios/" target="_blank" rel="noopener">beneficios vigentes</a>, la solución para <a href="https://www.afc.cl/mi-seguro-de-cesantia/pagos-suspendidos/" target="_blank" rel="noopener">pagos suspendidos</a> y la <a href="https://www.bcn.cl/leychile/navegar?idNorma=184979" target="_blank" rel="noopener">Ley 19.728</a>. Las consultas de foros se usaron para detectar fallas frecuentes de documentos y cotizaciones posteriores; no para definir requisitos.</p>`,
  },
  {
    slug: 'checklist-despues-despido-chile-2026',
    title: 'Checklist después de un despido en Chile 2026: finiquito, AFC y reinserción',
    description:
      'Qué hacer paso a paso tras un despido: finiquito, plazos, Seguro de Cesantía, presupuesto y cómo preparar el CV para volver a postular.',
    date: '2026-07-10',
    updatedAt: '2026-07-10',
    category: 'laboral',
    readingTime: 9,
    relatedGuia: 'finiquito-laboral-chile',
    seoTitle: 'Checklist despido Chile 2026: finiquito, cesantía y CV',
    seoDescription:
      'Después del despido: finiquito, 10 días hábiles, Seguro de Cesantía (AFC), cobertura y reinserción. Checklist práctico + calculadoras gratis.',
    keywords: [
      'checklist despido chile',
      'qué hacer después de un despido',
      'finiquito y seguro de cesantía',
      'me despidieron qué hago',
      'reinserción laboral chile 2026',
      'AFC cesantía checklist',
    ],
    relatedCalculators: [
      'calculadora-finiquito',
      'calculadora-indemnizacion-anos-servicio',
      'calculadora-vacaciones-proporcionales',
      'calculadora-sueldo-liquido',
    ],
    faq: [
      {
        question: '¿Cuánto plazo tiene el empleador para pagar el finiquito?',
        answer:
          'El artículo 177 del Código del Trabajo obliga al empleador a otorgar el finiquito y poner su pago a disposición dentro de diez días hábiles desde la separación. Ese plazo obliga al empleador; no obliga al trabajador a firmar sin revisar. Si no se cumple, puede ingresarse un reclamo en Mi DT o en la Inspección del Trabajo.',
      },
      {
        question: '¿El Seguro de Cesantía reemplaza al finiquito?',
        answer:
          'No. El finiquito es el pago final del empleador (días, vacaciones, indemnización según causal). El Seguro de Cesantía (AFC) es un beneficio previsional con cargo a tu cuenta individual y, en algunos casos, al Fondo de Cesantía Solidario. Son complementarios.',
      },
      {
        question: '¿Debo firmar el finiquito si no estoy de acuerdo con el monto?',
        answer:
          'Puedes rechazarlo o aceptar con una reserva de derechos clara y específica. En el finiquito electrónico la reserva no necesita aceptación del exempleador. La reserva no resuelve la disputa ni detiene los plazos judiciales, por lo que conviene asesorarse antes de ratificar conceptos controvertidos.',
      },
      {
        question: '¿Cuánto plazo tengo para reclamar un despido injustificado?',
        answer:
          'La acción judicial por despido injustificado, indebido o improcedente tiene un plazo de 60 días hábiles desde la separación. Un reclamo administrativo presentado dentro de ese período suspende el cómputo mientras se tramita, pero existe un límite absoluto de 90 días hábiles desde la separación. No debe esperarse el finiquito para obtener asesoría.',
      },
    ],
    content: `<p class="article-lead">Después de un despido corren tres relojes distintos: el empleador tiene diez días hábiles para poner el finiquito y su pago a disposición; la primera prestación AFC no se paga antes de cumplirse treinta días corridos desde el término, en el caso general; y una acción por despido injustificado caduca a los sesenta días hábiles, con un máximo de noventa si hubo reclamo administrativo. Ordenar documentos y fechas el primer día evita que un trámite tape otro.</p>

<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Si discutirás la causal, no esperes el finiquito</strong><p>El plazo judicial se cuenta desde la separación, no desde que pagan, ratificas o termina la conciliación. Un reclamo en la Inspección suspende el plazo mientras se tramita, pero nunca permite demandar después de 90 días hábiles desde la separación.</p></div></aside>

<h2>Primeras 24 horas: fija los hechos</h2>
<ol class="steps">
<li><strong>Anota fecha y forma de comunicación.</strong> Registra quién informó el término, a qué hora, si fue verbal, por correo, carta o portal, y cuál fue el último día efectivamente trabajado.</li>
<li><strong>Pide la carta de despido.</strong> Debe identificar la causal legal y, cuando corresponde, los hechos que la fundamentan. “Decisión de la empresa” no permite revisar por sí sola si se invocó necesidades de la empresa, una causal disciplinaria u otra.</li>
<li><strong>Guarda tus documentos personales.</strong> Contrato y anexos, liquidaciones, registro de asistencia disponible, vacaciones autorizadas, metas, comisiones, comprobantes de bonos y comunicaciones relevantes.</li>
<li><strong>No extraigas secretos de la empresa.</strong> Conservar evidencia laboral propia no autoriza copiar bases de clientes, código, credenciales ni información confidencial ajena.</li>
<li><strong>No firmes una renuncia o mutuo acuerdo para “agilizar”.</strong> Cambiar el documento de término puede afectar indemnizaciones y acceso al Fondo de Cesantía Solidario.</li>
</ol>
<p>Si el despido fue verbal y bloquean el acceso, deja constancia de lo ocurrido y consulta de inmediato en Mi DT o la Inspección. No intentes entrar por la fuerza ni alterar sistemas. Una cronología escrita el mismo día suele ser más útil que reconstruir recuerdos semanas después.</p>

<h2>Revisa la carta, la causal y las cotizaciones</h2>
<p>La causal define gran parte del finiquito. En términos generales, el artículo 161 —necesidades de la empresa o desahucio cuando procede— puede generar indemnización sustitutiva del aviso previo e indemnización por años de servicio si se cumplen sus requisitos. El vencimiento de plazo, conclusión de obra y causales disciplinarias tienen reglas diferentes. Que la carta cite un artículo no prueba que los hechos sean verdaderos o suficientes: esa calificación puede discutirse.</p>
<p>El empleador debe acompañar o poner a disposición antecedentes que acrediten el pago de las cotizaciones previsionales exigidas hasta el último día del mes anterior al despido. Revisa por separado:</p>
<ul>
<li>cartola AFP o del sistema previsional que corresponda;</li>
<li>cotizaciones de salud en Fonasa o Isapre;</li>
<li>movimientos de la Cuenta Individual de Cesantía en AFC;</li>
<li>períodos declarados pero no pagados y lagunas que no coincidan con licencias u otra explicación.</li>
</ul>
<p>Las cotizaciones impagas pueden dar lugar a la denominada nulidad del despido y al pago de remuneraciones hasta la convalidación, bajo las condiciones del artículo 162. No se activa simplemente marcando una casilla ni significa que la persona deba volver a trabajar. Es una acción con requisitos y plazos propios; si aparece deuda, busca asesoría laboral pronto.</p>

<h2>Calcula el finiquito por componentes, no con un porcentaje</h2>
<p>Un finiquito no equivale automáticamente a “un sueldo por año”. La liquidación puede contener remuneración pendiente, feriado legal o proporcional, indemnización sustitutiva del aviso, años de servicio, bonos o comisiones devengadas y otros conceptos contractuales. Cada componente usa su propia base.</p>
<ul>
<li><strong>Días trabajados:</strong> remuneración devengada hasta el término que aún no se pagó.</li>
<li><strong>Feriado:</strong> días pendientes y proporcionales, convertidos a calendario según las reglas laborales.</li>
<li><strong>Aviso previo:</strong> puede corresponder si se aplica el artículo 161 sin aviso de al menos treinta días.</li>
<li><strong>Años de servicio:</strong> normalmente exige contrato vigente por un año o más y una causal que dé derecho. Tiene límites legales y una base definida en el artículo 172.</li>
<li><strong>Variables:</strong> comisiones y remuneraciones variables pueden requerir promedios; no deben eliminarse solo porque el último mes fue incompleto.</li>
</ul>
<p>Usa la <a href="/calculadoras/calculadora-finiquito">calculadora de finiquito</a> como pauta de comparación y abre por separado la <a href="/calculadoras/calculadora-indemnizacion-anos-servicio">indemnización por años de servicio</a> y las <a href="/calculadoras/calculadora-vacaciones-proporcionales">vacaciones proporcionales</a>. Conserva los supuestos: fecha de ingreso, término, causal, remuneración base y días pendientes. Una cifra sin esos datos no permite reclamar una diferencia concreta.</p>

<div class="numeric-example"><div class="numeric-example__title">Hoja de revisión mínima</div><ul><li>Propuesta del empleador por cada concepto.</li><li>Estimación propia con documentos.</li><li>Diferencia en pesos y razón de la diferencia.</li><li>Conceptos aceptados.</li><li>Conceptos que se rechazan o reservan.</li></ul><span class="total">No mezcles todo en una sola cifra global</span></div>

<h2>El plazo de diez días hábiles no te obliga a firmar</h2>
<p>El artículo 177 obliga al empleador a otorgar el finiquito y poner su pago a disposición dentro de <strong>diez días hábiles contados desde la separación</strong>. La obligación es del empleador. El trabajador puede tomarse el tiempo necesario dentro de sus demás plazos legales para revisar y no pierde automáticamente sus derechos por no aceptar una propuesta el décimo día.</p>
<p>El documento debe identificar a las partes, fechas de inicio y término, causal, conceptos y montos. Un finiquito ratificado ante ministro de fe tiene fuerza importante respecto de lo acordado. Por eso existen tres respuestas razonables en el portal electrónico de la DT:</p>
<ul>
<li><strong>Aceptar sin reserva:</strong> solo si causal, períodos y montos están realmente conformes.</li>
<li><strong>Aceptar con reserva:</strong> permite recibir lo no discutido y dejar identificados los conceptos controvertidos.</li>
<li><strong>Rechazar:</strong> si faltan antecedentes, la propuesta cambia la causal o las diferencias no pueden aislarse.</li>
</ul>

<h3>Cómo escribir una reserva útil</h3>
<p>“Me reservo todos mis derechos” es menos informativo que nombrar el conflicto. Una reserva precisa puede indicar, por ejemplo, diferencias en base de cálculo del artículo 172, feriado de determinados períodos, comisión del mes, procedencia de recargo por despido injustificado o cotizaciones previsionales impagas. En el finiquito electrónico, la DT señala que esta reserva <strong>no necesita aceptación del exempleador</strong>.</p>
<p>La reserva no gana el caso, no crea una indemnización y no congela por sí sola los plazos. Si la controversia es relevante, redactarla con asesoría puede evitar que el texto contradiga la reclamación posterior.</p>

<h3>Pago en cuotas</h3>
<p>El pago fraccionado requiere acuerdo. Si se acepta, deja por escrito número de cuotas, montos, fechas, reajustes e intereses aplicables y una cláusula que permita exigir el saldo ante incumplimiento. Una promesa verbal de “pagar cuando haya caja” transforma una obligación clara en un problema probatorio.</p>

<h2>Reclamo administrativo y demanda: 60 no es igual a 90</h2>
<p>La persona que considera el despido injustificado, indebido o improcedente puede recurrir al tribunal laboral dentro de <strong>60 días hábiles</strong> desde la separación. Si presenta un reclamo administrativo dentro de ese plazo, el cómputo se suspende durante la tramitación y continúa después. Aun así, la ley impone un límite: no puede acudir al tribunal después de <strong>90 días hábiles</strong> desde la separación.</p>
<p>El reclamo ante la DT busca una audiencia de conciliación y puede ingresarse en Mi DT con ClaveÚnica o presencialmente. Conviene llevar:</p>
<ul>
<li>fecha de ingreso, término, jornada y función;</li>
<li>razón social, RUT y dirección del exempleador;</li>
<li>contrato, anexos, carta, liquidaciones y propuesta de finiquito;</li>
<li>cartolas previsionales y cálculo de las diferencias;</li>
<li>una cronología breve de los hechos.</li>
</ul>
<p>La Inspección no reemplaza al juez para declarar definitivamente injustificada una causal. Si la conciliación no resuelve o hay tutela de derechos fundamentales, nulidad, cuantías relevantes o hechos complejos, busca orientación de la Corporación de Asistencia Judicial, Defensoría Laboral, sindicato o abogado particular.</p>

<h2>Solicita el Seguro de Cesantía sin esperar el finiquito</h2>
<p>La AFC acepta distintos documentos válidos de término, incluida carta de despido, finiquito, carta de renuncia, acta de conciliación o documentos especiales según el caso. Si no tienes ninguno y desconoces el domicilio actual del empleador, existe una declaración jurada de término ante la DT que puede habilitar la solicitud.</p>
<p>El trámite en la Sucursal Virtual usa RUT, ClaveÚnica o clave AFC, cédula vigente para validación y el documento de término. La AFC informa aprobación o rechazo dentro de un máximo de cinco días hábiles. No existe un plazo para solicitar mientras mantengas la condición de cesante, pero postergarlo puede retrasar el flujo de caja. El primer pago se efectúa una vez cumplidos treinta días corridos desde el término, sujeto a aprobación y calendario; en autodespido hay una regla especial de sesenta días.</p>

<h3>Cuenta Individual de Cesantía</h3>
<ul>
<li>Contrato indefinido o de casa particular: al menos 10 cotizaciones desde el último cobro o afiliación, según corresponda.</li>
<li>Contrato a plazo fijo, por obra o servicio: al menos 5 cotizaciones.</li>
<li>La causal puede ser voluntaria o involuntaria para usar la CIC si se cumplen los demás requisitos.</li>
</ul>

<h3>Fondo de Cesantía Solidario</h3>
<p>El FCS no se entrega solo porque la CIC tenga saldo bajo. AFC exige 10 cotizaciones pagadas en los 24 meses previos, las tres últimas continuas con el mismo empleador, una causal involuntaria admitida, y que la CIC no alcance para financiar al menos cinco pagos. En contratos a plazo fijo, las cotizaciones requeridas deben estar registradas antes del término.</p>
<p>Además, debes activar y mantener la inscripción en la Bolsa Nacional de Empleo. La BNE indica completar el currículum dentro de las 96 horas y participar efectivamente en las oportunidades, entrevistas o capacitaciones comunicadas. Ignorar correos o mantener datos desactualizados puede afectar el beneficio.</p>
<p>Revisa saldo y simulación directamente en <a href="https://www.afc.cl/" target="_blank" rel="noopener">AFC Chile</a>. No sumes finiquito y cinco giros máximos como si ambos estuvieran garantizados: el número y monto dependen del fondo, saldo, remuneraciones, causal y continuidad de la cesantía.</p>

<h2>Salud, deudas y presupuesto de emergencia</h2>
<p>Mientras recibes prestaciones del Seguro de Cesantía existe cobertura de salud a través de Fonasa bajo las condiciones del beneficio. Si estabas en Isapre, ten cargas o tratamientos en curso, consulta por continuidad, cambio y deuda antes de asumir que el plan sigue igual. Guarda recetas, órdenes y certificados médicos necesarios sin copiar datos de otras personas.</p>
<p>Construye un presupuesto usando dinero confirmado:</p>
<ol class="steps">
<li>Suma saldo líquido disponible hoy.</li>
<li>Separa remuneración pendiente y monto de finiquito aceptado; deja la parte disputada fuera del presupuesto.</li>
<li>Agrega prestaciones AFC solo después de revisar la simulación y fecha.</li>
<li>Prioriza vivienda, alimentación, salud, servicios y transporte para entrevistas.</li>
<li>Contacta acreedores antes de caer en mora y revisa si un crédito tiene seguro de cesantía; no todos lo incluyen ni cubren todas las causales.</li>
</ol>
<p>Evita usar la indemnización completa para prepagar una deuda sin calcular cuántos meses de gastos esenciales quedan cubiertos. Una tasa alta importa, pero quedarse sin liquidez durante la búsqueda puede forzar crédito más caro.</p>

<h2>Reinserción desde la primera semana</h2>
<p>Buscar empleo no exige esperar el último giro. Empieza con una vacante objetivo y convierte el trabajo anterior en evidencia verificable: responsabilidades, herramientas, volumen, tiempos, mejoras y resultados que puedas sostener en entrevista. No inventes porcentajes ni proyectos confidenciales.</p>
<ul>
<li>Crea un CV base limpio y una versión ajustada a cada familia de cargos.</li>
<li>Usa las palabras técnicas del aviso solo cuando describan experiencia real.</li>
<li>Explica la salida en una frase neutral: cargo eliminado, término de proyecto o causal que puedas acreditar, sin convertir la entrevista en un litigio.</li>
<li>Registra empresa, cargo, fecha, versión de CV, contacto y siguiente paso.</li>
<li>Antes de aceptar, estima el <a href="/calculadoras/calculadora-sueldo-liquido">sueldo líquido</a> con AFP, salud y condiciones reales de la oferta.</li>
</ul>
<p>El puente con CVListo debe servir para revisar estructura y compatibilidad con filtros ATS, no para fabricar experiencia. Una optimización válida hace visible lo que ya hiciste y adapta prioridad y vocabulario al aviso.</p>

<h2>Checklist imprimible</h2>
<ul class="data-grid">
<li><span class="label">Carta, causal, hechos y fecha de separación</span><span class="value">Hecho / pendiente</span></li>
<li><span class="label">Contrato, anexos, liquidaciones y variables</span><span class="value">Hecho / pendiente</span></li>
<li><span class="label">Certificados AFP, salud y AFC revisados</span><span class="value">Hecho / pendiente</span></li>
<li><span class="label">Finiquito comparado por concepto</span><span class="value">Hecho / pendiente</span></li>
<li><span class="label">Reserva específica redactada si corresponde</span><span class="value">Hecho / pendiente</span></li>
<li><span class="label">Fecha límite judicial anotada</span><span class="value">Hecho / pendiente</span></li>
<li><span class="label">Reclamo DT ingresado si existe disputa</span><span class="value">Hecho / pendiente</span></li>
<li><span class="label">Solicitud AFC y BNE activadas</span><span class="value">Hecho / pendiente</span></li>
<li><span class="label">Presupuesto con ingresos confirmados</span><span class="value">Hecho / pendiente</span></li>
<li><span class="label">Primer CV adaptado y postulación registrada</span><span class="value">Hecho / pendiente</span></li>
</ul>

<p>Para profundizar, consulta la <a href="/guias/finiquito-laboral-chile">guía de finiquito laboral</a>, la explicación de <a href="/blog/seguro-cesantia-finiquito-2026-afc">CIC y Fondo Solidario</a>, el paso a paso para <a href="/blog/como-cobrar-seguro-cesantia-afc-2026">cobrar en AFC</a> y el <a href="/cesantia">hub de cesantía</a>.</p>

<h2>Fuentes oficiales consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con el texto vigente del <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">Código del Trabajo</a>, el trámite de la DT para <a href="https://www.dt.gob.cl/portal/1626/w3-article-125086.html" target="_blank" rel="noopener">ingresar un reclamo por despido</a>, sus instrucciones para la <a href="https://dt.gob.cl/portal/1626/w3-article-117245.html" target="_blank" rel="noopener">ratificación y reserva del finiquito</a>, la guía AFC sobre <a href="https://www.afc.cl/afiliados/quedo-cesante-o-esta-cobrando-su-seguro/como-y-donde-cobrar-el-seguro-de-cesantia/" target="_blank" rel="noopener">cómo y cuándo cobrar</a>, y los <a href="https://www.afc.cl/mi-seguro-de-cesantia/requisitos-y-documentos/" target="_blank" rel="noopener">requisitos de CIC y Fondo de Cesantía Solidario</a>. Consultas repetidas en foros laborales se usaron para priorizar dudas sobre reserva, carta, cotizaciones y plazos; no reemplazaron fuentes legales.</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Alcance</strong><p>Esta es información general para relaciones regidas por el Código del Trabajo. Estatutos públicos, fueros, tutela, accidentes, licencias, autodespido, subcontratación y cotizaciones impagas pueden requerir análisis jurídico inmediato.</p></div></aside>`,
  },
  {
    slug: 'permiso-circulacion-segunda-cuota-agosto-2026',
    title:
      'Segunda cuota del permiso de circulación 2026: plazo hasta el 31 de agosto',
    description:
      'Si pagaste el permiso de circulación en dos cuotas, la segunda vence el 31 de agosto de 2026. Fechas, qué necesitas y cómo estimar el monto antes de ir a la municipalidad.',
    date: '2026-07-09',
    updatedAt: '2026-07-13',
    category: 'vehiculos',
    readingTime: 15,
    seoTitle: 'Permiso de circulación 2ª cuota 2026: hasta el 31 de agosto',
    seoDescription:
      'Segunda cuota del permiso de circulación 2026: del 1 al 31 de agosto. Requisitos, multas por atraso y cómo estimar el valor. Fuente ChileAtiende.',
    keywords: [
      'permiso de circulación segunda cuota 2026',
      'permiso circulación agosto 2026',
      'segunda cuota permiso circulación',
      'permiso circulación plazo',
      'pagar permiso de circulación',
    ],
    relatedCalculators: [
      'calculadora-permiso-circulacion',
      'calculadora-multas-transito',
    ],
    faq: [
      {
        question: '¿Hasta cuándo se paga la segunda cuota del permiso 2026?',
        answer:
          'Para automóviles y los demás vehículos cuyo permiso anual venció el 31 de marzo, la segunda cuota se paga durante agosto y vence el 31 de agosto de 2026. Solo corresponde si en marzo se eligió pagar en dos cuotas.',
      },
      {
        question: '¿Puedo pagar la segunda cuota en cualquier municipalidad?',
        answer:
          'No. Las dos cuotas deben pagarse en la misma municipalidad. Usa el portal o caja del municipio donde se pagó la primera cuota. El cambio de comuna se gestiona para la inscripción o renovación bajo su procedimiento, no trasladando aisladamente la cuota de agosto.',
      },
      {
        question: '¿Qué pasa si no pago a tiempo?',
        answer:
          'La deuda sigue asociada al vehículo y la municipalidad aplicará los reajustes, intereses o recargos legales que correspondan. Circular sin el permiso vigente expone a fiscalización y sanciones. Solicita la liquidación atrasada al municipio; no calcules el recargo con una tasa inventada.',
      },
    ],
    content: `<p class="article-lead">La cuota de agosto no es simplemente “la otra mitad” del permiso pagado en marzo. La Ley de Rentas Municipales ordena dividir el impuesto en dos cuotas iguales, pero reajusta la segunda por la variación del IPC entre febrero y junio. Además, debe pagarse en la misma municipalidad de la primera cuota.</p>

<h2>Quién debe pagar durante agosto de 2026</h2>
<p>La segunda cuota corresponde a propietarios de automóviles particulares, motocicletas, station wagons y los demás vehículos comprendidos en el período ordinario que venció el 31 de marzo, cuando eligieron fraccionar el impuesto anual.</p>
<ul><li><strong>Primera cuota:</strong> dentro del período de renovación que termina el 31 de marzo.</li><li><strong>Segunda cuota:</strong> durante agosto, con vencimiento el 31 de agosto de 2026.</li><li><strong>Pago total en marzo:</strong> no genera otra cuota por el mismo permiso.</li></ul>
<p>El plazo de agosto no se aplica a todas las categorías. Taxis y buses renuevan en mayo y pagan su segunda cuota en junio; determinados vehículos de carga, locomoción colectiva y otros que renuevan en septiembre pagan la segunda en octubre. Revisa la clasificación del artículo 15 antes de trasladar el calendario de un automóvil a un camión o taxi.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Fecha confirmada por ley</strong><p>Para los vehículos cuyo permiso venció en marzo, el plazo legal es el mes de agosto. En 2026 el último día es lunes 31 de agosto. Un municipio puede habilitar pago antes, pero no reemplazar el vencimiento legal por una publicación informal.</p></div></aside>

<h2>Por qué la segunda cuota no es idéntica a la primera</h2>
<p>El artículo 15 establece dos cuotas iguales respecto del impuesto anual y ordena que la segunda se reajuste según la variación del Índice de Precios al Consumidor entre febrero y junio, ambos meses incluidos. Por eso el cobro de agosto puede ser un poco mayor que el comprobante de marzo.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo meramente ilustrativo</div><ul><li>Permiso anual determinado en marzo: $240.000</li><li>Primera cuota base: $120.000</li><li>Segunda cuota base: $120.000</li><li>Si el reajuste municipal aplicable fuera 2,4%: $2.880</li></ul><span class="total">Segunda cuota ilustrativa: $122.880</span></div>
<p>El 2,4% del ejemplo no sustituye la liquidación municipal. El INE informó que el IPC acumuló 2,8% entre enero y junio de 2026, pero la regla legal utiliza el período febrero-junio y su cálculo oficial. No corresponde copiar el acumulado anual completo ni sumar porcentajes mensuales sin respetar los índices.</p>

<h2>Dónde se paga: misma municipalidad</h2>
<p>La Biblioteca del Congreso resume expresamente que las dos cuotas deben pagarse en la misma municipalidad. Si la primera se pagó en Curicó, la cuota de agosto se paga allí o en los canales que esa municipalidad habilite. No debe elegirse otra comuna solo porque su portal funciona mejor.</p>
<p>El dueño puede solicitar un cambio de inscripción comunal cuando corresponda, pero es un procedimiento asociado al registro y pago del permiso, no un traslado improvisado del saldo ya fraccionado. Ante venta o cambio de domicilio, confirma la situación con el municipio de origen antes del vencimiento.</p>

<h2>Cómo localizar el municipio correcto</h2>
<ol class="steps"><li>Busca el comprobante de la primera cuota o el permiso 2026.</li><li>Identifica nombre de la municipalidad, patente y número de operación.</li><li>Entra escribiendo tú mismo el dominio municipal; evita enlaces de mensajes.</li><li>Busca “segunda cuota permiso de circulación 2026”.</li><li>Si el vehículo no aparece, contacta a tránsito o rentas municipales de esa comuna.</li></ol>
<p>Una cartola bancaria demuestra un pago, pero puede no mostrar la municipalidad o patente. Conserva también el comprobante municipal descargable.</p>

<h2>Qué datos suelen pedir</h2>
<p>Los portales normalmente identifican la deuda con placa patente y RUT del propietario; algunos solicitan número del permiso, correo o comprobante anterior. En caja presencial pueden pedir cédula, padrón o permiso de la primera cuota.</p>
<p>SOAP, revisión técnica, certificado de homologación y multas se verifican principalmente al renovar el permiso anual. No existe una regla general que obligue a presentar nuevamente todos esos documentos para pagar el saldo ya emitido. El municipio puede exigir antecedentes para resolver inconsistencias, pero no conviene afirmar que siempre debes comprar otro SOAP o repetir la revisión en agosto.</p>
<p>Si la revisión técnica o el SOAP vencieron después de marzo, debes renovarlos para circular legalmente por sus propias reglas, aunque el portal permita pagar la segunda cuota.</p>

<h2>Cómo se fijó el valor anual</h2>
<p>La municipalidad recauda, pero no inventa libremente el valor. Para vehículos livianos usados, el SII publica cada año la tasación fiscal por marca, modelo, versión y año. La Ley de Rentas Municipales aplica una escala progresiva y contempla un mínimo. Vehículos nuevos, de transporte y categorías especiales siguen reglas específicas.</p>
<p>La calculadora de CalculaChile entrega una aproximación a partir de datos ingresados. No puede reemplazar la tasación exacta del modelo ni el saldo ya registrado por el municipio. Para agosto, la fuente más precisa es la liquidación asociada a la primera cuota.</p>
<p>Si el modelo fue identificado incorrectamente en marzo, pagar la segunda cuota no necesariamente corrige la tasación. Reúne padrón, factura o antecedentes de versión y solicita una revisión municipal antes de pagar dos veces o dejar vencer el plazo. Una diferencia entre comunas no significa que cada una pueda ofrecer un precio promocional: puede revelar datos distintos, deuda previa o un error de registro.</p>

<h2>Compré o vendí el vehículo entre marzo y agosto</h2>
<p>La obligación de la segunda cuota pesa sobre el vehículo. En una compraventa debe verificarse si el permiso se pagó completo o quedó saldo. El contrato debería indicar quién asumirá ese pago, pero un acuerdo privado no borra la deuda que impide mantener el permiso al día.</p>
<p>Antes de comprar un usado, pide permiso 2026, comprobante de cuota y consulta municipal. Si vendiste y pactaste que el comprador pagaría en agosto, conserva el contrato y verifica que se regularice; no confíes solo en una promesa por mensajería.</p>

<h2>Vehículos comprados en parte del año</h2>
<p>La guía de Ley Fácil de BCN señala que los automóviles adquiridos entre el 1 de septiembre y el 31 de marzo pagan en una sola cuota. Otros vehículos nuevos pueden tener cálculo proporcional o reglas según fecha y categoría. No asumas que todo primer permiso admite las dos cuotas ordinarias.</p>
<p>Si la primera inscripción fue reciente, usa la factura, certificado de inscripción y liquidación municipal. El calendario del vehículo usado del mismo modelo no prueba tu deuda.</p>

<h2>Retirar el vehículo de circulación</h2>
<p>Dejar un auto estacionado o venderlo para desarme no elimina por sí solo la obligación. El artículo 15 permite comunicar por escrito a la unidad municipal que otorgó el permiso que el vehículo fue retirado de circulación, antes del vencimiento de la próxima renovación anual. Solo el aviso formal produce la excepción prevista por la ley.</p>
<p>Ese procedimiento no debe utilizarse como una anulación automática de una segunda cuota ya devengada. Pregunta al municipio qué períodos están pendientes y solicita comprobante de recepción del retiro.</p>

<h2>Qué ocurre después del 31 de agosto</h2>
<p>El municipio puede liquidar reajustes, intereses y recargos legales sobre el pago atrasado. La deuda permanece asociada al vehículo y reaparecerá al intentar renovar. Circular sin permiso vigente también puede generar una infracción de tránsito, retiro de circulación u otras consecuencias según fiscalización y resolución del Juzgado de Policía Local.</p>
<p>No uses la multa de tránsito como estimación del saldo municipal: son obligaciones distintas. Para regularizar, solicita al municipio la liquidación actualizada y paga por un canal verificable. Si existe una denuncia, revisa la citación y el tribunal competente.</p>

<h2>Señales de fraude en agosto</h2>
<ul><li>Mensajes que prometen “descuento por pronto pago” mediante transferencia a una persona.</li><li>Dominios parecidos al municipal con letras cambiadas.</li><li>Solicitud de clave bancaria, código de coordenadas o control remoto.</li><li>Cobro sin identificar patente, RUT, período y municipalidad.</li><li>Comprobante editable enviado solo por WhatsApp.</li></ul>
<p>Las municipalidades pueden contratar plataformas de pago, pero debes llegar a ellas desde el sitio oficial. Comprueba que el resultado muestre patente y cuota 2026 antes de autorizar.</p>

<h2>Checklist de pago</h2>
<ol class="steps"><li>Confirma que en marzo elegiste dos cuotas.</li><li>Identifica la municipalidad de la primera.</li><li>Consulta el saldo ajustado por patente y RUT.</li><li>Verifica que el cobro diga segunda cuota 2026.</li><li>Revisa monto base y reajuste; no exijas que sea idéntico a marzo.</li><li>Paga antes del 31 de agosto por canal oficial.</li><li>Descarga comprobante y permiso actualizado.</li><li>Comprueba que la operación figure pagada.</li><li>Revisa por separado SOAP y revisión técnica para seguir circulando.</li></ol>

<h2>Errores frecuentes</h2>
<ul><li>Pagar en una comuna distinta a la primera cuota.</li><li>Esperar exactamente el mismo monto de marzo.</li><li>Aplicar el IPC acumulado desde enero en vez del ajuste legal.</li><li>Confundir saldo municipal con una multa de tránsito.</li><li>Comprar un usado sin revisar la cuota pendiente.</li><li>Creer que no usar el auto extingue la deuda sin aviso.</li><li>Repetir SOAP o revisión solo porque se paga en agosto.</li><li>Usar enlaces recibidos por SMS sin validar el dominio.</li></ul>

<p>Consulta una referencia anual en la <a href="/calculadoras/calculadora-permiso-circulacion">calculadora de permiso de circulación</a> y revisa la vigencia técnica en la <a href="/blog/revision-tecnica-chile-2026-calendario-patente">guía de revisión 2026</a>. El saldo oficial sigue siendo el emitido por la municipalidad.</p>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con el <a href="https://www.bcn.cl/leychile/navegar?idNorma=18967" target="_blank" rel="noopener">artículo 15 de la Ley de Rentas Municipales</a>, la guía de <a href="https://www.bcn.cl/leyfacil/recurso/permiso-de-circulacion" target="_blank" rel="noopener">Ley Fácil sobre permiso de circulación</a>, la información de ChileAtiende y el <a href="https://www.ine.gob.cl/sala-de-prensa/prensa/general/noticia/2026/07/08/%C3%ADndice-de-precios-al-consumidor-%28ipc%29-de-junio-present%C3%B3-una-variaci%C3%B3n-mensual-de-0-0" target="_blank" rel="noopener">IPC de junio de 2026 del INE</a>. Las consultas en foros se usaron para identificar dudas sobre cambio de comuna, venta del auto y portales falsos; no como fuente legal.</p>`,
  },
  {
    slug: 'revision-tecnica-chile-2026-calendario-patente',
    title:
      'Revisión técnica Chile 2026: calendario por dígito de patente y requisitos',
    description:
      'Cuándo te toca la revisión técnica según el último dígito de la patente, qué se revisa, cómo consultar el estado y por qué la necesitas para el permiso de circulación.',
    date: '2026-07-10',
    updatedAt: '2026-07-10',
    category: 'vehiculos',
    readingTime: 14,
    seoTitle: 'Revisión técnica 2026: calendario por patente y requisitos',
    seoDescription:
      'Calendario de revisión técnica 2026 por dígito de patente, consulta en PRT, multas y vínculo con el permiso de circulación. Fuentes ChileAtiende y MTT/PRT.',
    keywords: [
      'revisión técnica 2026',
      'calendario revisión técnica patente',
      'cuándo me toca la revisión técnica',
      'revisión técnica por dígito',
      'PRT Chile',
      'revisión técnica y permiso de circulación',
    ],
    relatedCalculators: [
      'calculadora-permiso-circulacion',
      'calculadora-multas-transito',
    ],
    faq: [
      {
        question: '¿Cómo sé en qué mes me toca la revisión técnica?',
        answer:
          'Para un vehículo de revisión anual, el Decreto Supremo 156 relaciona el último dígito de la patente con un mes. ChileAtiende aclara que ese dígito da preferencia en algunas plantas. Para decidir si hoy puedes circular, revisa además la vigencia exacta de tu certificado o la consulta oficial por patente en PRT: no reemplaces ese dato por una tabla genérica.',
      },
      {
        question: '¿Puedo hacer la revisión técnica antes del mes que me toca?',
        answer:
          'Sí. El artículo 7 del Decreto Supremo 156 permite efectuar la revisión anual en el mes inmediatamente anterior al que corresponde por patente, sin afectar su vigencia. Si quieres anticiparla todavía más, confirma primero con la planta porque esa posibilidad no está garantizada por esa regla.',
      },
      {
        question: '¿Sirve la revisión técnica para el permiso de circulación?',
        answer:
          'Sí. El artículo 89 de la Ley de Tránsito impide a la municipalidad otorgar el permiso de circulación sin revisión técnica vigente o, cuando corresponde, sin certificado de homologación vigente. El SOAP y los demás requisitos del permiso son documentos distintos.',
      },
      {
        question: '¿Cuánto tiempo tengo para volver si mi vehículo fue rechazado?',
        answer:
          'ChileAtiende informa que tienes 15 días corridos para volver a la planta revisora, acreditar que corregiste los desperfectos y acceder a una tarifa rebajada. Conserva el certificado de rechazo: allí aparecen las fallas que deben reinspeccionarse.',
      },
      {
        question: '¿Cuándo hace su primera revisión técnica un auto nuevo en 2026?',
        answer:
          'El Decreto 104, publicado el 18 de junio de 2026, amplió de 24–36 a 36–48 meses el plazo para la primera revisión de los vehículos nuevos livianos y medianos cubiertos por un CHI-e, según el mes asociado al último dígito. No apliques el plazo de cuatro años a ciegas: revisa la vigencia del certificado de homologación emitido para tu vehículo, especialmente si fue comprado antes del cambio.',
      },
    ],
    content: `<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>El dígito no reemplaza tu certificado</strong><p>El calendario ordena la revisión anual y ChileAtiende lo presenta como una <strong>preferencia en algunas plantas</strong>. Para saber si hoy puedes circular, manda la fecha de vigencia del certificado o el resultado de la consulta oficial por patente. Si ambos datos no coinciden, no adivines: consulta a la planta o al MTT antes de usar el vehículo.</p></div></aside>

<p>La revisión técnica no es una formalidad que se “renueva junto con el permiso” por costumbre. Es la inspección que acredita, en una fecha determinada, que el vehículo cumplió las exigencias mecánicas, de seguridad y de emisiones aplicables. En 2026 conviven tres datos que se confunden con facilidad: el mes asociado al último dígito, la vigencia impresa en el certificado y, para vehículos nuevos, la vigencia del Certificado de Homologación Individual electrónico (CHI-e).</p>

<p>Esta guía separa esas reglas. También incorpora el cambio publicado el <strong>18 de junio de 2026</strong>, que amplió el plazo de primera revisión para vehículos nuevos livianos y medianos comprendidos en el régimen de homologación. El objetivo no es prometer que un auto “pasa”, sino ayudarte a llegar a la planta con los antecedentes correctos y a tomar una decisión verificable.</p>

<h2>Qué acredita la revisión técnica y por qué importa</h2>
<p>La ficha oficial de ChileAtiende señala que la inspección valida el estado del vehículo para circular por caminos públicos y contribuye a la protección ambiental. La planta revisa especialmente dirección, frenos, luces, llantas, neumáticos, estructura de chasis, suspensión, transmisión, combustión interna, escape y emisiones. También observa parabrisas y vidrios, carrocería, puertas, asientos, ventilación, espejos, bocina, limpiaparabrisas, elementos de seguridad, velocímetro e instrumentos.</p>

<p>Aprobar significa que el vehículo superó el procedimiento regulado ese día. <strong>No equivale a una garantía mecánica integral</strong>, no reemplaza la mantención preventiva y tampoco certifica que el auto no haya sufrido choques, reparaciones estructurales o adulteraciones. Esa distinción importa al comprar un usado: una revisión vigente es necesaria, pero no basta para evaluar la compra.</p>

<p>ChileAtiende califica como <strong>infracción grave</strong> conducir sin revisión técnica vigente. Además, el artículo 89 de la Ley de Tránsito establece que una municipalidad no puede otorgar el permiso de circulación a un vehículo sin revisión técnica vigente o sin certificado de homologación cuando este último sea la alternativa aplicable. Son documentos conectados, pero no idénticos.</p>

<h2>Calendario 2026 para vehículos de revisión anual</h2>
<p>El artículo 7 del Decreto Supremo 156 distribuye la revisión anual según el último dígito de la placa patente única. ChileAtiende, en su ficha actualizada el 25 de marzo de 2026, explica que ese dígito entrega <strong>preferencia en algunas plantas</strong>. Marzo y diciembre aparecen como meses <strong>sin preferencia</strong>; la fuente oficial no dice que estén reservados exclusivamente para rechazos o reinspecciones.</p>

<table>
<thead><tr><th>Último dígito</th><th>Mes asociado</th><th>Referencia operativa 2026</th></tr></thead>
<tbody>
<tr><td>9</td><td>Enero</td><td>Preferencia en algunas plantas</td></tr>
<tr><td>0</td><td>Febrero</td><td>Preferencia en algunas plantas</td></tr>
<tr><td>—</td><td>Marzo</td><td>Sin preferencia por dígito</td></tr>
<tr><td>1</td><td>Abril</td><td>Preferencia en algunas plantas</td></tr>
<tr><td>2</td><td>Mayo</td><td>Preferencia en algunas plantas</td></tr>
<tr><td>3</td><td>Junio</td><td>Preferencia en algunas plantas</td></tr>
<tr><td>4</td><td>Julio</td><td>Preferencia en algunas plantas</td></tr>
<tr><td>5</td><td>Agosto</td><td>Preferencia en algunas plantas</td></tr>
<tr><td>6</td><td>Septiembre</td><td>Preferencia en algunas plantas</td></tr>
<tr><td>7</td><td>Octubre</td><td>Preferencia en algunas plantas</td></tr>
<tr><td>8</td><td>Noviembre</td><td>Preferencia en algunas plantas</td></tr>
<tr><td>—</td><td>Diciembre</td><td>Sin preferencia por dígito</td></tr>
</tbody>
</table>

<p>Hay una regla útil para anticiparse: el mismo artículo permite hacer la revisión <strong>en el mes inmediatamente anterior</strong> al que corresponde por patente, sin que eso afecte su vigencia. Si tu patente termina en 5, por ejemplo, el mes asociado es agosto y la norma permite efectuarla también en julio. De ahí no se desprende una ventana general de 60 o 90 días; si quieres adelantarla más, pregunta a la planta antes de pagar o desplazarte.</p>

<h3>Qué dato usar cuando la tabla y el documento parecen contradecirse</h3>
<ol class="steps">
<li><strong>Mira el certificado:</strong> identifica su estado y fecha de vigencia, no solo el mes en que lo obtuviste.</li>
<li><strong>Consulta por patente:</strong> usa el servicio oficial enlazado por ChileAtiende en <a href="https://www.prt.cl/Paginas/RevisionTecnica.aspx" target="_blank" rel="noopener">prt.cl</a>. La consulta es gratuita.</li>
<li><strong>Revisa la categoría:</strong> taxis, vehículos de transporte, vehículos escuela y otros casos no necesariamente siguen la periodicidad anual de un automóvil particular.</li>
<li><strong>Confirma excepciones:</strong> una prórroga regional o una corrección administrativa debe estar respaldada por una resolución o por el sistema oficial, no por una captura difundida en redes sociales.</li>
</ol>

<p>En foros de conductores aparecen casos en que una municipalidad tarda en reflejar una revisión recién aprobada o en que una base muestra información incompleta. Esas experiencias sirven para detectar el problema, pero no prueban la vigencia legal. Conserva el certificado, guarda el comprobante y pide la corrección a la entidad correspondiente si el dato oficial no se actualiza.</p>

<h2>No todos los vehículos revisan una vez al año</h2>
<p>La regla anual cubre a los vehículos que no están en una categoría especial. ChileAtiende resume las periodicidades vigentes de la siguiente forma:</p>

<ul>
<li><strong>Cada seis meses:</strong> vehículos de transporte de personas con más de nueve asientos contando a quien conduce; vehículos de carga con capacidad superior a 1.750 kg, incluidos remolques y semirremolques; taxis; vehículos escuela; transporte escolar; y vehículos que usan GLP o GNC. También existen dos supuestos específicos para ciertos vehículos que circulan en la Región Metropolitana, definidos por fecha de inscripción y titularidad.</li>
<li><strong>Cada cuatro meses:</strong> transporte escolar de peso bruto total inferior a 3.860 kg con antigüedad superior a 15 años, y buses de transporte público urbano con antigüedad igual o superior a 20 años.</li>
<li><strong>Cada cuatro años:</strong> maquinarias automotrices como tractores, cosechadoras, bulldozers, palas mecánicas, cargadores frontales, motoniveladoras y retroexcavadoras.</li>
<li><strong>Cada año:</strong> los vehículos no incluidos en los grupos anteriores, que es donde normalmente cae el automóvil particular después de su primera revisión.</li>
</ul>

<p>Si el vehículo cambió de uso —por ejemplo, pasó a taxi, transporte escolar o quedó inscrito a nombre de una persona jurídica en un supuesto especial— no calcules la próxima inspección mirando solamente la antigua revisión. La clasificación puede cambiar la frecuencia y el tipo de planta.</p>

<h2>Autos nuevos: qué cambió en junio de 2026</h2>
<p>Un vehículo nuevo homologado puede usar el <strong>CHI-e vigente</strong> en lugar de la revisión técnica y de gases durante el período indicado por ese certificado. El Decreto 104 del Ministerio de Transportes, publicado en el Diario Oficial el 18 de junio de 2026, modificó el Decreto 160 y amplió el rango para efectuar la primera revisión de los vehículos nuevos livianos y medianos comprendidos: pasó de <strong>24–36 meses a 36–48 meses</strong> desde el mes de emisión del CHI-e, según el último dígito de la patente.</p>

<p>En lenguaje simple, el cambio agrega un año antes de la primera inspección para los certificados emitidos bajo la nueva regla. Sin embargo, “auto 2026” no basta para concluir que tiene cuatro años exactos. El rango depende del mes de emisión y del calendario de patente; además, taxis nuevos y transporte escolar mantienen reglas especiales y deben efectuar su primera revisión a los doce meses según el DS 156.</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Si compraste antes del 18 de junio</strong><p>No borres mentalmente la fecha de tu CHI-e por haber leído la noticia. Revisa el certificado electrónico concreto y consulta al emisor o al MTT si su vigencia no refleja el cambio. La guía no presume retroactividad para documentos ya emitidos.</p></div></aside>

<p>Otro detalle poco explicado es que la <strong>primera revisión técnica</strong> de un vehículo amparado por homologación tiene una vigencia de dos años conforme al DS 156. Después entra a la periodicidad que corresponda a su categoría. Por eso, homologación vigente, primera revisión y revisiones posteriores son etapas distintas.</p>

<h2>Documentos que pide la planta</h2>
<p>La lista oficial de ChileAtiende es más precisa que el consejo genérico de “llevar el padrón”. Considera los siguientes antecedentes:</p>

<ul>
<li><strong>Permiso de circulación:</strong> salvo vehículos nuevos, y solo cuando sea necesario obtener información que no figure en los demás documentos.</li>
<li><strong>Certificado de revisión técnica anterior:</strong> si se perdió, ChileAtiende permite presentar una declaración jurada simple.</li>
<li><strong>Certificado de anotaciones vigentes:</strong> se solicita si no presentas el certificado de emisiones contaminantes.</li>
<li><strong>Certificado de cumplimiento de normas de emisión.</strong></li>
<li><strong>Certificado anterior de emisiones contaminantes:</strong> no se exige a vehículos nuevos ni a los que realizan su primera revisión.</li>
</ul>

<p>Antes de salir, confirma en la planta si tu clase de vehículo requiere un antecedente adicional. Los precios varían por tipo de vehículo y por planta; ChileAtiende enlaza un listado oficial de lugares y tarifas. No existe un precio nacional único que esta guía pueda prometer para todo Chile. También el agendamiento cambia: algunas plantas reciben reserva y otras operan con modalidades diferentes.</p>

<h2>Checklist mecánico antes de ir: qué sí puedes comprobar</h2>
<p>Una revisión casera no sustituye la inspección ni permite diagnosticar frenos o emisiones con certeza. Sí evita rechazos básicos y ayuda a detectar que necesitas un taller antes de la PRT.</p>

<ul>
<li><strong>Luces:</strong> prueba bajas, altas, posición, freno, retroceso, intermitentes y luz de patente. Hazlo con otra persona o frente a una superficie donde puedas ver el reflejo.</li>
<li><strong>Neumáticos y llantas:</strong> busca cortes, deformaciones, desgaste irregular y elementos sueltos. La presión correcta mejora seguridad, pero no corrige un neumático agotado.</li>
<li><strong>Parabrisas, vidrios y espejos:</strong> revisa daños que afecten visibilidad, fijaciones, funcionamiento de alzavidrios cuando corresponda y estado de los espejos.</li>
<li><strong>Limpiaparabrisas y lavaparabrisas:</strong> verifica que barran sin dejar la zona crítica inutilizable y que exista líquido.</li>
<li><strong>Bocina, cinturones, puertas y asientos:</strong> comprueba funcionamiento, anclajes y cierres. No retires elementos de seguridad instalados para el vehículo.</li>
<li><strong>Escape y humo visible:</strong> un ruido anormal, fuga, testigo encendido o humo persistente justifica diagnóstico previo. Calentar el motor no repara una falla de emisiones.</li>
<li><strong>Frenos, dirección y suspensión:</strong> ruidos, tirones, vibración, recorrido anormal del pedal o pérdida de fluidos requieren taller. No esperes que la PRT sea el lugar donde descubrir una falla de seguridad grave.</li>
</ul>

<p>Evita trucos difundidos como inflar neumáticos fuera de especificación, desconectar testigos o agregar aditivos de última hora. Pueden ocultar síntomas por minutos, dañar componentes y no resuelven la causa del rechazo. La referencia correcta para mantenciones es el manual del fabricante y, cuando hay una falla, un diagnóstico profesional.</p>

<h2>Qué ocurre si el resultado es rechazado</h2>
<p>La planta entrega un certificado de rechazo con los desperfectos detectados. ChileAtiende informa que la siguiente revisión se concentra en comprobar que esas fallas fueron solucionadas y que tienes <strong>15 días corridos</strong> para regresar a la planta revisora y acceder a una tarifa rebajada. No es un plazo indefinido ni una autorización para circular con la inspección vencida.</p>

<ol class="steps">
<li>Lee el informe completo y separa fallas de seguridad, emisiones y observaciones visuales.</li>
<li>Pide al taller que trabaje sobre las causas exactas; entrega una copia del informe y conserva el original.</li>
<li>Vuelve dentro de los 15 días corridos si quieres usar la tarifa reducida informada por ChileAtiende.</li>
<li>Si no entiendes una causal, solicita que la planta la identifique en el manual de procedimientos. Una discusión en internet no sustituye ese registro.</li>
</ol>

<p>Las experiencias publicadas por conductores muestran que una falla aparentemente pequeña puede tener interpretaciones distintas si el vehículo fue modificado o si la pieza no corresponde a su configuración homologada. La respuesta práctica no es “probar suerte” sucesivamente, sino contrastar el informe con el manual oficial y reparar lo observado.</p>

<h2>Comprar un usado: cómo usar la revisión sin sobrevalorarla</h2>
<p>Antes de transferir un vehículo, consulta por patente el estado actual de su revisión y pide ver el certificado. Compara patente, identificación del vehículo, fecha y resultado. Si el vendedor solo muestra una foto recortada, consulta tú mismo en el canal oficial.</p>

<p>Una revisión aprobada no revela por sí sola todo el historial. En comunidades de autos se repiten dudas por kilometrajes mal ingresados, años faltantes en bases privadas y reparaciones de choque que no eran visibles a simple vista. Esos relatos no demuestran una falla del vehículo que estás mirando; sí justifican tres controles separados: informe registral y de multas, inspección mecánica independiente e inspección visual de estructura y pintura. Si una base privada contradice al certificado oficial, pide aclaración y no completes la compra mientras la identidad o la vigencia sigan dudosas.</p>

<h2>Relación con permiso de circulación, SOAP y multas</h2>
<p>Para un usado, ChileAtiende exige al renovar el permiso la revisión técnica y el análisis de gases vigentes, el permiso anterior, el padrón y el SOAP con vigencia al 31 de marzo del año siguiente. También deben resolverse las multas de tránsito impagas en la forma prevista para el trámite. La homologación sustituye a la revisión únicamente mientras está vigente y cuando corresponde al vehículo.</p>

<p>No confundas las fechas:</p>
<ul>
<li>La revisión vence según su certificado y categoría.</li>
<li>El SOAP tiene su propia vigencia.</li>
<li>El permiso de circulación de automóviles se paga normalmente en marzo, o en dos cuotas cuando se eligió esa modalidad.</li>
<li>La <a href="/blog/permiso-circulacion-segunda-cuota-agosto-2026">segunda cuota del permiso 2026</a> no renueva la revisión ni el SOAP.</li>
</ul>

<p>Puedes estimar el permiso en la <a href="/calculadoras/calculadora-permiso-circulacion">calculadora de permiso de circulación</a> y revisar referencias de sanciones en la <a href="/calculadoras/calculadora-multas-transito">calculadora de multas de tránsito</a>. Ambos resultados son orientativos: el certificado PRT, la municipalidad y el juzgado competente son quienes determinan el estado oficial.</p>

<h2>Cómo evitar sitios falsos y datos desactualizados</h2>
<ul>
<li>Parte desde <a href="https://www.chileatiende.gob.cl/fichas/86124-consultar-el-estado-de-la-revision-tecnica-de-un-vehiculo-motorizado" target="_blank" rel="noopener">ChileAtiende</a> o <a href="https://www.prt.cl" target="_blank" rel="noopener">prt.cl</a>, no desde un enlace recibido por SMS.</li>
<li>Verifica el dominio antes de ingresar patente, RUT o datos de pago. La consulta oficial de estado informada por ChileAtiende es gratuita.</li>
<li>No transfieras dinero para “reservar un cupo especial” fuera del sistema publicado por la planta.</li>
<li>Busca la planta y tarifa en el listado oficial; una publicidad en buscador puede aparecer antes que el resultado institucional.</li>
<li>Guarda certificado, comprobante de pago y certificado de rechazo si corresponde.</li>
</ul>

<h2>Fuentes y fecha de verificación</h2>
<p>Contenido revisado al <strong>13 de julio de 2026</strong>. Se priorizaron normas y fichas públicas; las conversaciones de usuarios se usaron solo para identificar preguntas y riesgos operativos, no para fijar requisitos.</p>
<ul>
<li><a href="https://www.chileatiende.gob.cl/fichas/23978-revision-tecnica-de-vehiculos-motorizados" target="_blank" rel="noopener">ChileAtiende — Revisión técnica de vehículos motorizados</a>, actualización del 25 de marzo de 2026: documentos, periodicidad, sistemas inspeccionados, calendario, rechazo y reinspección.</li>
<li><a href="https://www.chileatiende.gob.cl/fichas/86124-consultar-el-estado-de-la-revision-tecnica-de-un-vehiculo-motorizado" target="_blank" rel="noopener">ChileAtiende — Consulta oficial del estado de la revisión</a>, actualización del 19 de febrero de 2026.</li>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=10183&idParte=7139535" target="_blank" rel="noopener">BCN LeyChile — Decreto Supremo 156, artículo 7</a>: periodicidades, calendario y revisión en el mes anterior.</li>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1225262" target="_blank" rel="noopener">BCN LeyChile — Decreto 104 de 2026</a>: ampliación de 36 a 48 meses para la primera revisión bajo CHI-e.</li>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1007469" target="_blank" rel="noopener">BCN LeyChile — Ley de Tránsito, artículo 89</a>: relación entre revisión u homologación y permiso de circulación.</li>
<li><a href="https://www.chileatiende.gob.cl/fichas/9611-permiso-de-circulacion" target="_blank" rel="noopener">ChileAtiende — Permiso de circulación</a>: documentos exigidos para vehículos nuevos y usados.</li>
</ul>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Alcance</strong><p>Información general, no dictamen del MTT ni diagnóstico mecánico. Tarifas, cupos, concesionarios y prórrogas pueden variar por región. Si una resolución excepcional o tu certificado particular contradice esta guía, prevalece el antecedente oficial aplicable al vehículo.</p></div></aside>`,
  },
  {
    slug: 'cotizacion-empleador-3-5-agosto-2026-costo-pyme',
    title:
      'Cotización del empleador 3,5% desde agosto 2026: costo PYME sin duplicar el SIS',
    description:
      'Desde las remuneraciones de agosto de 2026 el aporte previsional total del empleador es 3,5% e incluye el SIS. Compara julio y agosto, calcula el costo real y evita contabilizar dos veces el seguro.',
    date: '2026-07-13',
    updatedAt: '2026-07-13',
    category: 'laboral',
    readingTime: 13,
    relatedGuia: 'sueldo-liquido-chile',
    seoTitle: 'Cotización empleador 3,5% agosto 2026: costo PYME y SIS',
    seoDescription:
      'Desde agosto 2026 el 3,5% patronal incluye SIS. Ejemplos con $800.000 y $1.500.000, diferencia frente a julio y pago en septiembre.',
    keywords: [
      'cotización empleador 3,5% 2026',
      'cotización adicional empleador',
      'Ley 21.735 cotización',
      'costo empleado Chile 2026',
      'reforma previsional empleador',
      'aportes del empleador pensiones',
    ],
    relatedCalculators: [
      'calculadora-costo-empleado-pyme',
      'calculadora-sueldo-liquido',
      'calculadora-comparador-afp',
    ],
    faq: [
      {
        question: '¿La cotización del 3,5% se descuenta del sueldo del trabajador?',
        answer:
          'No. La Ley 21.735 la establece de cargo del empleador. No se resta del sueldo líquido ni reemplaza el 10% y la comisión AFP que corresponden a la persona trabajadora. Sí forma parte del costo laboral de la empresa.',
      },
      {
        question: '¿Desde cuándo rige el 3,5%?',
        answer:
          'Aplica a las remuneraciones devengadas desde agosto de 2026 y se declara y paga en septiembre. El plazo electrónico habitual llega al día 13 del mes siguiente. No debe aplicarse a la remuneración de julio solo porque su pago material se realice en agosto.',
      },
      {
        question: '¿Se calcula sobre el sueldo bruto completo?',
        answer:
          'No necesariamente. Se calcula sobre la remuneración imponible para pensiones, con el tope previsional vigente de 90 UF en 2026. Asignaciones legalmente no imponibles no entran en la base; bonos o gratificación imponibles sí pueden entrar aunque se paguen con otro nombre.',
      },
      {
        question: '¿Debo sumar el SIS al 3,5% desde agosto de 2026?',
        answer:
          'No. Desde agosto de 2026 el 3,5% total ya incluye 2,5% destinado al Seguro Social, componente que financia el SIS y la compensación por expectativa de vida. Sumar además un SIS de 1,62% o 1,5% duplica el seguro y sobreestima el costo.',
      },
      {
        question: '¿Cuánto sube realmente el costo frente a julio de 2026?',
        answer:
          'En julio el bloque previsional patronal suma 2,62%: 1% de la reforma más SIS vigente de 1,62%. En agosto pasa a 3,5%, por lo que la diferencia comparable es 0,88% de la base imponible topada. Sobre $1.000.000, el aumento es $8.800 al mes, no $35.000.',
      },
    ],
    content: `<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>El 3,5% ya incluye el SIS</strong><p>Desde las remuneraciones de agosto de 2026 no corresponde sumar “3,5% de reforma” más otro 1,62% o 1,5% de Seguro de Invalidez y Sobrevivencia. El <strong>3,5% es el total previsional de cargo del empleador</strong> para esta etapa e incorpora el SIS dentro de su componente de 2,5% destinado al Seguro Social.</p></div></aside>

<p>El titular “la cotización del empleador sube a 3,5%” puede producir dos errores opuestos. Algunas empresas creen que deben descontarlo del sueldo; otras agregan el 3,5% completo a un presupuesto que ya contiene SIS. La Ley 21.735 no autoriza ninguna de esas operaciones. Es una cotización patronal, calculada sobre remuneración imponible, y desde agosto reorganiza dentro del mismo 3,5% un seguro que la empresa ya financiaba.</p>

<p>La forma correcta de presupuestar es comparar períodos equivalentes. Para la remuneración de julio de 2026, el empleador paga 1% de la reforma más el SIS vigente de 1,62%, totalizando 2,62% en este bloque. Para la remuneración de agosto, paga 3,5% total. Por tanto, el aumento mensual comparable es <strong>0,88 puntos porcentuales</strong> de la base imponible topada.</p>

<h2>Qué cambia y cuándo se paga</h2>
<p>La reforma previsional fue publicada el 26 de marzo de 2025. Su aporte patronal comenzó con 1% sobre las remuneraciones de agosto de 2025 y aumenta por etapas hasta llegar al total definido por la ley. El segundo hito entra en las <strong>remuneraciones devengadas en agosto de 2026</strong>, no en cualquier pago bancario efectuado durante ese mes.</p>

<table>
<thead><tr><th>Período de remuneración</th><th>Aporte reforma</th><th>SIS separado</th><th>Total previsional empleador</th></tr></thead>
<tbody>
<tr><td>Julio de 2026</td><td>1,00%</td><td>1,62%</td><td><strong>2,62%</strong></td></tr>
<tr><td>Agosto de 2026 a julio de 2027</td><td>Integrado en el total</td><td>No se suma aparte</td><td><strong>3,50%</strong></td></tr>
<tr><td>Diferencia comparable</td><td colspan="2">3,50% − 2,62%</td><td><strong>0,88%</strong></td></tr>
</tbody>
</table>

<p>Las cotizaciones de agosto se declaran y pagan en septiembre. La Superintendencia de Pensiones informa como regla general el día 10 del mes siguiente; por medios electrónicos el plazo se extiende hasta el día 13, incluso si cae sábado, domingo o festivo. La plataforma y el banco pueden imponer horarios operativos, así que no conviene preparar la nómina el último minuto.</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Ejemplo de corte</strong><p>Un sueldo de julio pagado el 2 de agosto sigue siendo remuneración de julio y usa las tasas de julio. Un sueldo devengado en agosto, aunque se pague al trabajador a fin de mes, usa el tramo de 3,5% y su cotización previsional se entera en septiembre.</p></div></aside>

<h2>Cómo se distribuye el 3,5%</h2>
<p>La tabla técnica de la Subsecretaría de Previsión Social para agosto de 2026 separa el total así:</p>

<ul>
<li><strong>0,1%</strong> va directamente a la cuenta de capitalización individual obligatoria administrada por la AFP de la persona trabajadora.</li>
<li><strong>0,9%</strong> corresponde a la Cotización con Rentabilidad Protegida (CRP), registrada a favor de la persona y reintegrada en su pensión conforme a las reglas de la Ley 21.735.</li>
<li><strong>2,5%</strong> ingresa al Fondo Autónomo de Protección Previsional para financiar el SIS y la compensación por diferencias de expectativa de vida.</li>
</ul>

<p>Ese último 2,5% puede desglosarse comunicacionalmente en 1,5% para SIS y 1% para compensación por expectativa de vida. Para la contabilidad de costo, lo decisivo es que ambos están dentro del 3,5%. El SIS deja de aparecer como el 1,62% separado que regía desde abril de 2026.</p>

<p>La CRP tampoco debe describirse simplemente como dinero “perdido” o un impuesto general. La ley la estructura como una cotización registrada y con reintegro en la pensión, con reajustes e intereses, bajo sus requisitos. Explicar su destino no cambia quién la paga: el empleador.</p>

<h2>Ejemplo 1: remuneración imponible de $800.000</h2>
<p>El ejemplo asume un mes completo, base imponible bajo el tope de 90 UF y una persona sujeta a la obligación. No incluye cesantía, accidentes del trabajo ni otras partidas patronales.</p>

<div class="numeric-example"><div class="numeric-example__title">Julio 2026: bloque previsional patronal</div><ul><li>Reforma: $800.000 × 1% = $8.000</li><li>SIS: $800.000 × 1,62% = $12.960</li></ul><span class="total">Total julio: $20.960</span></div>

<div class="numeric-example"><div class="numeric-example__title">Agosto 2026: 3,5% total</div><ul><li>Cuenta individual 0,1%: $800</li><li>CRP 0,9%: $7.200</li><li>Seguro Social 2,5%: $20.000</li></ul><span class="total">Total agosto: $28.000</span></div>

<p>La diferencia es <strong>$7.040 mensuales</strong>: $800.000 × 0,88%. Si se mantuvieran durante doce meses la misma base y las mismas tasas, el bloque de 3,5% sumaría $336.000 anuales y el aumento frente a una referencia constante de 2,62% sería $84.480. Eso es una proyección, no el gasto efectivo de todo 2026, porque el nuevo tramo comienza en agosto.</p>

<h2>Ejemplo 2: remuneración imponible de $1.500.000</h2>
<div class="numeric-example"><div class="numeric-example__title">Comparación julio–agosto</div><ul><li>Julio: $1.500.000 × 2,62% = $39.300</li><li>Agosto: $1.500.000 × 3,5% = $52.500</li><li>Aumento: $1.500.000 × 0,88% = $13.200</li></ul><span class="total">Costo previsional agosto: $52.500 · aumento mensual: $13.200</span></div>

<p>Decir que el “costo extra” es $52.500 sería incorrecto: antes de agosto la empresa ya destinaba $39.300 a reforma y SIS. Los $52.500 son el costo total del bloque desde agosto; el incremento marginal es $13.200.</p>

<h2>Ejemplo 3: una nómina PYME</h2>
<p>Para una nómina cuya suma de remuneraciones imponibles topadas sea $10.000.000:</p>

<ul>
<li>Total comparable en julio: $10.000.000 × 2,62% = <strong>$262.000</strong>.</li>
<li>Total desde agosto: $10.000.000 × 3,5% = <strong>$350.000</strong>.</li>
<li>Mayor provisión mensual: $10.000.000 × 0,88% = <strong>$88.000</strong>.</li>
</ul>

<p>La base agregada debe construirse trabajador por trabajador. No apliques un único porcentaje al gasto total del banco si allí mezclaste honorarios, asignaciones no imponibles, reembolsos, finiquitos o remuneraciones por encima del tope.</p>

<h2>Cuál es la base de cálculo</h2>
<p>La tasa se aplica a la <strong>remuneración imponible para pensiones</strong>. En 2026 el tope mensual para AFP, salud, SIS y este aporte es de 90 UF, según la Superintendencia de Pensiones. Como la UF cambia en pesos, el máximo en CLP debe calcularse con el valor aplicable al período y no copiarse de una planilla antigua.</p>

<ul>
<li><strong>Normalmente imponibles:</strong> sueldo base, comisiones, bonos remuneracionales, horas extra y gratificación pagada como remuneración.</li>
<li><strong>Normalmente no imponibles dentro de límites legales:</strong> asignaciones de movilización o colación razonables y reembolsos que realmente compensan gastos. El nombre contable no basta; importa su naturaleza.</li>
<li><strong>Sobre 90 UF:</strong> el exceso sobre el tope previsional no aumenta esta cotización, aunque puede seguir siendo remuneración para otros efectos.</li>
<li><strong>Jornada parcial:</strong> no existe una tasa menor por trabajar menos horas; cambia la base imponible, no el 3,5%.</li>
<li><strong>Dos empleadores:</strong> cada empleador mantiene sus obligaciones. Si se supera el tope conjunto, la regularización sigue reglas previsionales y no se resuelve omitiendo unilateralmente un pago.</li>
</ul>

<p>Para entender el tope y el valor UF del mes, revisa la guía de <a href="/blog/tope-imponible-2026">tope imponible 2026</a>. La <a href="/guias/sueldo-liquido-chile">guía de sueldo líquido</a> separa los haberes imponibles de las asignaciones que no integran la base.</p>

<h2>A quién se paga y qué casos requieren revisión</h2>
<p>La Subsecretaría de Previsión Social señala que la cotización al Seguro Social se paga por toda persona trabajadora dependiente respecto de quien una persona natural o jurídica tenga calidad de empleador. Incluye vínculos por contrato de trabajo y el acto administrativo equivalente del sector público.</p>

<p>La misma fuente identifica casos en que cesa la obligación al Seguro Social: cuando la persona se pensiona por vejez o invalidez total, cuando cumple 65 años o cuando está acogida válidamente a la exención del artículo 69 del DL 3.500. Esto no significa que desaparezcan automáticamente salud, accidentes, cesantía u otras obligaciones. La ficha de cada persona debe reflejar la causal y sus documentos; no marques “exento” solo por la fecha de nacimiento.</p>

<p>Quien emite boletas de honorarios no tiene empleador por esa renta. La participación del independiente en el Seguro Social es voluntaria bajo las reglas transitorias informadas por Previsión Social y no se convierte en un 3,5% que deba pagar quien recibe la boleta.</p>

<h2>Cómo integrarlo al costo total de contratación</h2>
<p>Desde agosto de 2026, una proyección básica del costo mensual debe sumar:</p>

<ol class="steps">
<li>Remuneraciones brutas y demás haberes pactados.</li>
<li>El <strong>3,5% previsional patronal</strong> sobre la base imponible topada, sin SIS separado.</li>
<li>Seguro de cesantía de cargo del empleador, según el tipo de contrato y su tope propio.</li>
<li>Cotización básica y adicional por accidentes del trabajo y enfermedades profesionales, según la entidad y el riesgo.</li>
<li>Otros costos que procedan: SANNA, beneficios pactados, provisión de vacaciones, indemnizaciones contractuales o cargas específicas.</li>
</ol>

<p>No uses el sueldo líquido como punto de partida. El líquido es lo que recibe la persona después de sus descuentos; el costo empresa parte de la remuneración bruta y agrega aportes patronales. Tampoco confundas el 0,1% que llega a la cuenta individual con la comisión AFP: la comisión sigue siendo un descuento distinto de cargo de la persona trabajadora.</p>

<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Calculadora en transición regulatoria</strong><p>La <a href="/calculadoras/calculadora-costo-empleado-pyme">calculadora de costo empleado</a> usa todavía el esquema separado de SIS anterior a agosto. No le sumes 3,5% completo: duplicarías el SIS. Para remuneraciones de agosto en adelante, usa el cálculo de esta guía o la liquidación de tu software/Previred hasta que la herramienta incorpore el selector de período.</p></div></aside>

<h2>Checklist para cerrar la remuneración de agosto</h2>
<ol class="steps">
<li><strong>Actualiza el software:</strong> verifica que el proveedor identifique remuneración agosto 2026, no solamente fecha de pago.</li>
<li><strong>Elimina el SIS separado:</strong> comprueba que el total previsional patronal sea 3,5% y no 3,5% + 1,62%.</li>
<li><strong>Revisa bases:</strong> valida imponibles, días trabajados, licencias, topes y exenciones persona por persona.</li>
<li><strong>Compara el archivo:</strong> contrasta el total del sistema con el cálculo independiente base × 3,5%; documenta diferencias por redondeo o topes.</li>
<li><strong>Sube la nómina electrónica:</strong> Previred puede exigir campos de jornada y otros datos del Seguro Social. No reutilices sin revisión el archivo del mes anterior.</li>
<li><strong>Concilia el pago:</strong> guarda planilla, comprobante y distribución por RUT. Un débito bancario no demuestra por sí solo que cada cotización quedó bien imputada.</li>
<li><strong>Revisa la liquidación:</strong> el 3,5% puede informarse como aporte empleador, pero no debe reducir el líquido.</li>
</ol>

<h2>Qué pasa si no se declara o paga</h2>
<p>La obligación no desaparece por falta de caja. La Superintendencia de Pensiones indica que, si el empleador está atrasado, debe declarar las cotizaciones no pagadas; esto se conoce como Declaración y No Pago. Una declaración no equivale a pago y la deuda genera cobranza, reajustes e intereses.</p>

<p>La SP informa además una multa de 0,75 UF por cada persona afectada cuando la declaración no se presenta oportunamente o es incompleta o errónea, junto con las demás consecuencias aplicables. Las deudas previsionales también pueden impedir recibir ciertos pagos públicos o recursos fiscales de fomento productivo. La noticia de julio de 2026 sobre el Sistema Único de Cobranza vuelve especialmente mala idea “dejar el mes pendiente” sin regularización.</p>

<h2>Errores detectados en preguntas y comunidades</h2>
<ul>
<li><strong>“Sube de 1% a 3,5%, entonces el costo aumenta 2,5 puntos”.</strong> Omite que en julio también se pagaba SIS 1,62%; la diferencia comparable es 0,88 puntos.</li>
<li><strong>“El SIS sigue aparte porque aparece en mi fórmula histórica”.</strong> Desde agosto está incorporado en el 3,5%.</li>
<li><strong>“Se descuenta 3,5% al trabajador”.</strong> Contradice el carácter patronal de la cotización.</li>
<li><strong>“Se aplica al total de transferencias de sueldos”.</strong> La base es la remuneración imponible topada, no el líquido ni todos los desembolsos.</li>
<li><strong>“Una persona parcial paga medio porcentaje”.</strong> La tasa no baja; baja la base si la remuneración imponible es menor.</li>
<li><strong>“Previred cuadró, por tanto mi contabilidad está bien”.</strong> El portal recauda la información enviada; una clasificación errónea de haberes o un RUT mal informado todavía requiere corrección.</li>
</ul>

<h2>Fuentes y fecha de comprobación</h2>
<p>Contenido verificado al <strong>13 de julio de 2026</strong>. Las noticias y discusiones de usuarios se usaron para detectar la confusión sobre el costo incremental y la duplicación del SIS; las tasas y obligaciones provienen de fuentes oficiales.</p>
<ul>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1212060" target="_blank" rel="noopener">BCN LeyChile — Ley 21.735</a>, creación del sistema mixto y Seguro Social Previsional.</li>
<li><a href="https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-10906.html" target="_blank" rel="noopener">Superintendencia de Pensiones — Cotización de cargo del empleador</a>, gradualidad y destino final.</li>
<li><a href="https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9908.html" target="_blank" rel="noopener">Superintendencia de Pensiones — Cotización previsional obligatoria</a>, SIS 1,62% desde abril de 2026, tope 90 UF, plazos y mora.</li>
<li><a href="https://previsionsocial.gob.cl/wp-content/uploads/2025/08/Nota-Tecnica-Reforma-de-Pensiones-Ley-N%C2%B021.735.pdf" target="_blank" rel="noopener">Subsecretaría de Previsión Social — Nota técnica de la reforma</a>, tabla de agosto de 2026: 0,1% + 0,9% + 2,5%.</li>
<li><a href="https://www.chileatiende.gob.cl/preguntas-frecuentes/nueva-cotizacion-empleadores" target="_blank" rel="noopener">ChileAtiende — Preguntas frecuentes para empleadores</a>, operación en Previred y casos excluidos.</li>
<li><a href="https://hacienda.gov.cl/noticias-y-eventos/noticias/implementacion-de-la-reforma-previsional-nueva-cotizacion-del-empleador-regira" target="_blank" rel="noopener">Ministerio de Hacienda — Implementación y calendario</a>.</li>
</ul>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Alcance</strong><p>Guía educativa para preparar presupuesto y control de nómina. La declaración definitiva depende de la situación de cada persona, las instrucciones vigentes de la SP, el archivo aceptado por Previred y la documentación laboral. Si tu software muestra 3,5% más SIS desde agosto, detén el cierre y pide corrección al proveedor.</p></div></aside>`,
  },
  {
    slug: 'aguinaldo-fiestas-patrias-2026-pensionados-sector-publico',
    title:
      'Aguinaldo de Fiestas Patrias 2026: montos para pensionados IPS y sector público',
    description:
      'Montos oficiales del aguinaldo de Fiestas Patrias 2026: pensionados IPS ($25.280 + cargas) y funcionarios del sector público ($91.682 / $63.645). Fechas de corte, ejemplos y diferencias con la gratificación.',
    date: '2026-07-10',
    updatedAt: '2026-07-10',
    category: 'beneficios',
    readingTime: 14,
    relatedGuia: 'familia-pension-alimenticia-chile',
    seoTitle: 'Aguinaldo Fiestas Patrias 2026: IPS $25.280 y sector público $91.682',
    seoDescription:
      'Aguinaldo septiembre 2026: pensionados IPS $25.280 + $12.969 por carga; sector público $91.682 o $63.645 según líquido de agosto. Fuentes ChileAtiende y Ley 21.806.',
    keywords: [
      'aguinaldo fiestas patrias 2026',
      'aguinaldo pensionados 2026',
      'aguinaldo sector público 2026',
      'aguinaldo IPS septiembre',
      'monto aguinaldo 18 septiembre 2026',
      'Ley 21.806 aguinaldo',
      'aguinaldo fiestas patrias cuánto pagan',
      'aguinaldo PGU 2026',
    ],
    relatedCalculators: [
      'calculadora-aguinaldo',
      'calculadora-sueldo-liquido',
      'calculadora-asignacion-familiar',
      'calculadora-pgu',
    ],
    faq: [
      {
        question: '¿Cuánto es el aguinaldo de Fiestas Patrias 2026 para pensionados?',
        answer:
          'Según ChileAtiende (ficha del IPS), el monto base es $25.280. Se incrementa en $12.969 por cada carga familiar acreditada al 31 de agosto de 2026. Se paga de forma automática con la pensión de septiembre y no es imponible ni tributable.',
      },
      {
        question: '¿Cuánto pagan de aguinaldo en el sector público en 2026?',
        answer:
          'Con la Ley 21.806, el aguinaldo de Fiestas Patrias 2026 es de $91.682 si la remuneración líquida de agosto es igual o inferior a $1.060.493, y de $63.645 si es superior (según los tramos y topes de la ley). Se paga con la remuneración de septiembre.',
      },
      {
        question: '¿Cuándo se paga el aguinaldo de Fiestas Patrias 2026?',
        answer:
          'En la práctica, con la liquidación de septiembre: en pensionados IPS, junto a la pensión de septiembre; en el sector público, con la remuneración de septiembre. El derecho de pensionados se evalúa al 31 de agosto de 2026. Las fechas exactas de depósito dependen de cada entidad pagadora (IPS, Capredena, Dipreca, servicio empleador, etc.).',
      },
      {
        question: '¿Hay que postular al aguinaldo de Fiestas Patrias?',
        answer:
          'No. Si cumples los requisitos, el pago es automático. No es un bono al que se postule en un portal separado. Debes tener cargas familiares bien acreditadas si quieres el incremento por carga (pensionados) y estar pensionado o en servicio al corte legal que corresponda.',
      },
      {
        question: '¿El aguinaldo es lo mismo que la gratificación legal?',
        answer:
          'No. El aguinaldo de Fiestas Patrias del Estado (funcionarios o pensionados de regímenes cubiertos) es un beneficio fijo por ley o ficha oficial. La gratificación legal del Código del Trabajo (Arts. 47 y 50) es otra figura, típica del sector privado, calculada sobre utilidades o el 25% con tope de 4,75 ingresos mínimos. Confundirlas genera montos y expectativas incorrectas.',
      },
      {
        question: '¿En el sector privado es obligatorio el aguinaldo de Fiestas Patrias?',
        answer:
          'No por una ley general de aguinaldo privado. ChileAtiende y la Dirección del Trabajo señalan que en el privado el aguinaldo es exigible solo si está en el contrato individual o en un convenio/contrato colectivo. Si no hay cláusula ni costumbre consolidada en el contrato, el empleador no está obligado a pagarlo como aguinaldo de Fiestas Patrias.',
      },
      {
        question: '¿El aguinaldo de pensionados tiene descuentos de AFP o impuestos?',
        answer:
          'ChileAtiende indica expresamente que este dinero no tiene descuentos, no se considera para impuestos (no es tributable) y no es imponible para cotizaciones previsionales ni de salud.',
      },
    ],
    content: `<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Dos beneficios distintos en septiembre</strong><p>En Chile el “aguinaldo de Fiestas Patrias” no es un solo monto nacional. Hay al menos dos regímenes que la gente confunde: (1) <strong>pensionados y pensionadas</strong> cubiertos por la ficha del <strong>IPS / ChileAtiende</strong>, y (2) <strong>trabajadoras y trabajadores del sector público</strong> bajo la <strong>Ley 21.806</strong> de reajuste. Los montos, el corte de derecho y quién paga son diferentes. Este artículo separa ambos casos con cifras 2026 y fuentes oficiales.</p></div></aside>

<p>Cada año, entre <strong>fines de agosto y mediados de septiembre</strong>, suben las búsquedas por <em>aguinaldo fiestas patrias 2026</em>, <em>cuánto pagan</em> y <em>cuándo cae</em>. El pico de interés suele concentrarse en la ventana del <strong>10 al 18 de septiembre</strong>, cuando ya se espera ver el abono en la liquidación de pensión o en el sueldo. Publicar y indexar con antelación ayuda a responder esas preguntas con fuentes, no con rumores de redes.</p>

<h2>Resumen rápido 2026 (tabla comparativa)</h2>
<table>
<thead>
<tr><th>Quién</th><th>Monto 2026</th><th>Corte / referencia</th><th>Cuándo se ve el pago</th><th>Fuente</th></tr>
</thead>
<tbody>
<tr>
<td><strong>Pensionados IPS y regímenes listados</strong></td>
<td><strong>$25.280</strong> base + <strong>$12.969</strong> por cada carga familiar acreditada al 31 ago 2026</td>
<td>Ser pensionado/a al <strong>31 de agosto de 2026</strong></td>
<td>Con la <strong>pensión de septiembre</strong> (automático)</td>
<td><a href="https://www.chileatiende.gob.cl/fichas/26553-aguinaldo-de-fiestas-patrias-para-pensionados-ips" target="_blank" rel="noopener">ChileAtiende 26553</a></td>
</tr>
<tr>
<td><strong>Sector público (funcionarios)</strong></td>
<td><strong>$91.682</strong> o <strong>$63.645</strong> según tramo de renta líquida de <strong>agosto</strong></td>
<td>Umbral tramo: líquido ago ≤ o &gt; <strong>$1.060.493</strong> (Ley 21.806 / reajuste 2026)</td>
<td>Con la <strong>remuneración de septiembre</strong></td>
<td>Ley <strong>21.806</strong> (D.O. 5 feb 2026); protocolo Hacienda–CUT/MSP</td>
</tr>
<tr>
<td><strong>Sector privado</strong></td>
<td>Lo que diga el <strong>contrato</strong> o el <strong>convenio colectivo</strong> (no hay tarifa legal única de aguinaldo FP)</td>
<td>Cláusula contractual / colectiva</td>
<td>Según pacto con el empleador</td>
<td>ChileAtiende (sección privado) · DT (gratificación ≠ aguinaldo)</td>
</tr>
</tbody>
</table>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No mezcles montos</strong><p>El <strong>$91.682</strong> del funcionario público <strong>no</strong> es el aguinaldo del pensionado IPS. El <strong>$25.280</strong> del IPS <strong>no</strong> es el aguinaldo del sector público. Si usas la calculadora del sitio, interpreta el resultado como <strong>base referencial del tramo 1 del sector público</strong> (o prorrateo), no como liquidación oficial del IPS.</p></div></aside>

<h2>1. Aguinaldo de Fiestas Patrias para pensionados (IPS / ChileAtiende) 2026</h2>
<p>ChileAtiende describe el beneficio como un <strong>monto de dinero</strong> que se recibe <strong>automáticamente con la pensión de septiembre</strong> si se cumplen los requisitos. No es un “postula aquí”.</p>

<h3>1.1 Montos oficiales 2026</h3>
<ul>
<li><strong>Base:</strong> <strong>$25.280</strong>.</li>
<li><strong>Incremento por carga:</strong> <strong>$12.969</strong> por cada persona causante de asignación familiar <strong>acreditada al 31 de agosto de 2026</strong>.</li>
<li><strong>Condición de derecho:</strong> estar pensionada o pensionado al <strong>31 de agosto de 2026</strong>.</li>
</ul>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo A — sin cargas acreditadas</div><ul><li>Base FP 2026</li></ul><span class="total">$25.280</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo B — 1 carga familiar acreditada al 31 ago</div><ul><li>Base $25.280 + 1 × $12.969</li></ul><span class="total">$38.249</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo C — 2 cargas acreditadas</div><ul><li>Base $25.280 + 2 × $12.969</li></ul><span class="total">$51.218</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo D — 3 cargas acreditadas</div><ul><li>Base $25.280 + 3 × $12.969</li></ul><span class="total">$64.187</span></div>

<h3>1.2 Quiénes pueden recibirlo (lista ChileAtiende)</h3>
<p>La ficha oficial indica que corresponde el aguinaldo si, al 31 de agosto de 2026, eres pensionada o pensionado de, entre otros:</p>
<ul>
<li><strong>IPS:</strong> <a href="/calculadoras/calculadora-pgu">PGU</a>, Pensión Básica Solidaria de Invalidez (PBSI) o Subsidio de Discapacidad (menores de 18, según ficha).</li>
<li>Ex cajas de previsión o ex Servicio de Seguro Social.</li>
<li><strong>ISL</strong> (Instituto de Seguridad Laboral).</li>
<li>Leyes de <strong>exonerados políticos</strong> (Ley 19.234).</li>
<li><strong>Mutualidades</strong> de empleadores (Ley 16.744).</li>
<li><strong>Dipreca</strong> y <strong>Capredena</strong>.</li>
<li>Pensiones de reparación (<strong>Ley Valech</strong>, <strong>Ley Rettig</strong>).</li>
<li>AFP o compañías de seguro <strong>si recibes PGU</strong>, o Aporte Previsional Solidario (vejez/invalidez), o pensiones mínimas con Garantía Estatal.</li>
</ul>
<p>Si tienes más de una pensión, subsidio o indemnización cubierta, ChileAtiende señala que <strong>igual puedes tener derecho a un aguinaldo</strong> (no “uno por cada pensión” de forma automática: la regla de pago la aplica el pagador; la ficha aclara el principio de derecho al beneficio aun con múltiples beneficios).</p>

<h3>1.3 Cargas familiares: cuándo sube el monto y cuándo no</h3>
<p>El incremento de <strong>$12.969</strong> exige carga <strong>acreditada</strong> al corte. Dos matices de la ficha oficial:</p>
<ul>
<li>Si el pago de la <strong>asignación familiar</strong> lo recibe <strong>otra persona</strong>, esa persona puede tener derecho al <strong>incremento</strong> del aguinaldo (la ficha lo indica expresamente).</li>
<li>Si recibes asignación familiar por cargas que son <strong>beneficiarias de una pensión de sobrevivencia</strong>, en general <strong>solo</strong> te corresponde el aguinaldo como pensionado/a (la base), <strong>sin</strong> el incremento de $12.969; el aumento sí puede operar si las cargas tienen pensión de <strong>orfandad</strong> (se tratan como carentes de renta, según la ficha).</li>
</ul>
<p>Para entender tramos de asignación familiar (otro beneficio, no el aguinaldo), usa la <a href="/calculadoras/calculadora-asignacion-familiar">calculadora de asignación familiar</a> y valida tu acreditación en el sistema del empleador o del IPS.</p>

<h3>1.4 Tributación e imponibilidad (pensionados)</h3>
<p>ChileAtiende es explícito: este dinero <strong>no tiene descuentos</strong>, <strong>no es tributable</strong> y <strong>no es imponible</strong> para cotizaciones previsionales ni de salud. Eso diferencia el aguinaldo IPS de un “sueldo extra” sujeto a AFP o impuesto único.</p>

<h3>1.5 Sanción si lo recibes sin derecho</h3>
<p>La misma ficha advierte: si recibes el aguinaldo <strong>sin que te corresponda</strong>, deberás devolver <strong>5 veces</strong> el monto, con posibles sanciones administrativas y penales. Por eso conviene revisar la liquidación de septiembre y no asumir el abono si no estás en la lista de regímenes o no cumples el corte del 31 de agosto.</p>

<h2>2. Aguinaldo de Fiestas Patrias del sector público 2026 (Ley 21.806)</h2>
<p>Los funcionarios y funcionarias del sector público incluidos en la ley de reajuste reciben un aguinaldo de Fiestas Patrias con <strong>montos fijos por tramo</strong>, no un porcentaje del sueldo. La <strong>Ley 21.806</strong> (publicada en el Diario Oficial el <strong>5 de febrero de 2026</strong>) fija el reajuste general y actualiza bonos y aguinaldos. El protocolo de acuerdo Gobierno–CUT/Mesa del Sector Público y comunicados de servicios públicos reproducen los mismos tramos de Fiestas Patrias 2026.</p>

<h3>2.1 Montos y tramos 2026</h3>
<table>
<thead>
<tr><th>Tramo</th><th>Condición (remuneración líquida de agosto 2026)</th><th>Monto aguinaldo FP</th></tr>
</thead>
<tbody>
<tr>
<td><strong>Tramo 1</strong></td>
<td>Igual o inferior a <strong>$1.060.493</strong></td>
<td><strong>$91.682</strong></td>
</tr>
<tr>
<td><strong>Tramo 2</strong></td>
<td>Superior a <strong>$1.060.493</strong> (con los topes de elegibilidad de la ley; el acuerdo menciona alineación con rentas de hasta ~$3.511.800 en la escala de beneficios)</td>
<td><strong>$63.645</strong></td>
</tr>
</tbody>
</table>
<p>Observa la lógica: el tramo de <strong>menor renta líquida</strong> recibe el <strong>monto más alto</strong> de aguinaldo. No es un error de tabla.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo E — funcionario con líquido de agosto $900.000</div><ul><li>Líquido ago ≤ $1.060.493 → tramo 1</li></ul><span class="total">Aguinaldo FP 2026: $91.682</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo F — funcionaria con líquido de agosto $1.200.000</div><ul><li>Líquido ago &gt; $1.060.493 → tramo 2</li></ul><span class="total">Aguinaldo FP 2026: $63.645</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo G — justo en el umbral $1.060.493</div><ul><li>Igual al techo del tramo 1 → tramo 1</li></ul><span class="total">Aguinaldo FP 2026: $91.682</span></div>

<h3>2.2 ¿Qué es “remuneración líquida de agosto”?</h3>
<p>Es el <strong>líquido del mes de agosto</strong> que usa tu servicio de personal/remuneraciones para clasificar el tramo del aguinaldo, según la definición de la ley y las instrucciones internas del servicio (no el bruto, no el promedio anual). Si tu liquidación de agosto ronda el umbral, un bono o descuento puntual puede empujarte de un tramo a otro: la clasificación la hace el empleador público con la norma, no esta guía.</p>
<p>Para estimar tu líquido de un mes “normal” (AFP, salud, cesantía trabajador, impuesto único) puedes usar la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>. El resultado es <strong>referencial</strong>: no reemplaza la liquidación oficial de tu servicio.</p>

<h3>2.3 Cuándo se paga en el sector público</h3>
<p>El pago del aguinaldo de Fiestas Patrias 2026 se asocia a la <strong>remuneración de septiembre</strong>. La fecha exacta del depósito (si el sueldo cae el 30, el 28 o un día hábil anterior) la define cada servicio o municipalidad. Planifica el flujo de caja de Fiestas Patrias con esa liquidación, no solo con el 18 de septiembre.</p>

<h3>2.4 Relación con el reajuste 3,4%</h3>
<p>La Ley 21.806 también fija el reajuste de remuneraciones del sector público en <strong>3,4%</strong> total, en dos tramos: <strong>2,0%</strong> desde el 1 de diciembre de 2025 y <strong>1,4%</strong> desde el 1 de junio de 2026. Los aguinaldos y varios bonos se actualizaron en el mismo cuerpo legal. Si comparas tu liquidación 2025 con 2026, verás el efecto del reajuste en el sueldo base <strong>y</strong> montos de aguinaldo distintos a los del año anterior.</p>

<h2>3. Sector privado: ¿existe “el” aguinaldo de Fiestas Patrias?</h2>
<p>ChileAtiende aclara que, para empleadores privados, <strong>otorgar aguinaldo no es una obligación legal general</strong>, a diferencia de figuras como la <strong>gratificación</strong> cuando corresponde según el Código del Trabajo. Puedes exigir aguinaldo de Fiestas Patrias en el privado si:</p>
<ul>
<li>Está en tu <strong>contrato de trabajo</strong>, o</li>
<li>Existe un <strong>contrato o convenio colectivo</strong> que lo incorpore.</li>
</ul>
<p>En esos casos sí es un derecho exigible frente al empleador. Si no hay cláusula, no inventes el monto del sector público ni el del IPS en la liquidación privada: son regímenes distintos.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Aguinaldo ≠ gratificación legal</strong><p>La <strong>gratificación legal</strong> (Arts. 47 y 50 del Código del Trabajo) se calcula sobre utilidades o con el sistema del 25% con tope de <strong>4,75 ingresos mínimos mensuales</strong>. Es independiente del aguinaldo de Fiestas Patrias del Estado. Profundiza en la <a href="/blog/como-funciona-gratificacion-legal">guía de gratificación legal</a> o en la <a href="/calculadoras/calculadora-gratificacion">calculadora de gratificación</a>.</p></div></aside>

<h2>4. Calendario práctico: agosto → septiembre 2026</h2>
<ol class="steps">
<li><strong>Hasta el 31 de agosto de 2026 (pensionados):</strong> corte de derecho. Revisa que tus cargas familiares estén acreditadas si esperas el +$12.969 por carga.</li>
<li><strong>Agosto (funcionarios públicos):</strong> el <strong>líquido de este mes</strong> define el tramo $91.682 vs $63.645.</li>
<li><strong>Septiembre:</strong> pago automático con pensión (IPS y regímenes) o con remuneración (sector público). Revisa la liquidación línea por línea.</li>
<li><strong>Ventana 10–18 de septiembre:</strong> mayor volumen de consultas y de gasto de Fiestas Patrias; ten el monto esperado claro con antelación.</li>
</ol>

<h2>5. Cómo verificar el abono en la liquidación</h2>
<ul>
<li><strong>Pensionados IPS:</strong> liquidación de pago de pensión/beneficio de septiembre; canales ChileAtiende / IPS (call center 101). Código de trámite de la ficha de aguinaldo: <strong>26553</strong>.</li>
<li><strong>Capredena / Dipreca / mutuales / otras:</strong> el pagador de tu pensión informa el abono; no asumas el mismo extracto que el IPS.</li>
<li><strong>Sector público:</strong> liquidación de remuneraciones de septiembre en tu portal de personal o unidad de remuneraciones. Busca la glosa de aguinaldo de Fiestas Patrias y el tramo aplicado.</li>
<li><strong>Privado con cláusula:</strong> liquidación de septiembre o el mes pactado; conserva contrato o convenio colectivo.</li>
</ul>

<h2>6. Errores frecuentes (y cómo evitarlos)</h2>
<ol class="steps">
<li><strong>Usar el monto del sector público para un pensionado IPS</strong> (o al revés). Son tablas distintas.</li>
<li><strong>Creer que hay que postular</strong> al aguinaldo de Fiestas Patrias del IPS o del SP. El pago es automático si cumples requisitos.</li>
<li><strong>Olvidar acreditar cargas</strong> antes del 31 de agosto y después reclamar el incremento de $12.969.</li>
<li><strong>Confundir aguinaldo con gratificación</strong> o con el bono de escolaridad / bono de vacaciones (otros montos de la Ley 21.806).</li>
<li><strong>Asumir que el privado “siempre” paga $91.682.</strong> Sin contrato o convenio, no hay tarifa legal de aguinaldo FP privado.</li>
<li><strong>No revisar la liquidación</strong> y gastar de más en Fiestas Patrias antes de confirmar el abono real.</li>
</ol>

<h2>7. Otros beneficios de la misma temporada (no confundir)</h2>
<table>
<thead>
<tr><th>Beneficio</th><th>Orden de magnitud 2026 (referencial)</th><th>Cuándo</th></tr>
</thead>
<tbody>
<tr>
<td>Aguinaldo Navidad pensionados IPS</td>
<td>Base <strong>$29.055</strong> + <strong>$16.415</strong>/carga (corte 30 nov 2026) — ficha ChileAtiende 30171</td>
<td>Diciembre</td>
</tr>
<tr>
<td>Aguinaldo Navidad sector público</td>
<td><strong>$71.206</strong> / <strong>$37.666</strong> según tramos (Ley 21.806)</td>
<td>Remuneración de diciembre</td>
</tr>
<tr>
<td>Bono de escolaridad (SP)</td>
<td><strong>$89.164</strong> en 2 cuotas de $44.582 (+ adicional en tramo bajo, según ley)</td>
<td>Marzo y junio</td>
</tr>
<tr>
<td>Gratificación legal (privado)</td>
<td>% de utilidades o 25% con tope 4,75 IMM — no es aguinaldo FP</td>
<td>Según cierre y política de la empresa</td>
</tr>
</tbody>
</table>
<p>En este sitio trataremos el aguinaldo de Navidad en piezas editoriales propias (#30 pensionados, #35 sector público del plan editorial). Hasta entonces, las fichas oficiales de ChileAtiende y el texto de la Ley 21.806 son la fuente de verdad.</p>

<h2>8. Estima y contrasta con la calculadora</h2>
<p>Puedes usar la <a href="/calculadoras/calculadora-aguinaldo">calculadora de aguinaldo</a> para ver el <strong>monto base del tramo 1 del sector público</strong> ($91.682 en Fiestas Patrias 2026) y un <strong>prorrateo por meses trabajados</strong> si tu caso o convenio lo permite. Limitaciones honestas del motor:</p>
<ul>
<li>No clasifica automáticamente tu tramo 1 vs 2 (no lee tu líquido oficial de agosto).</li>
<li>No calcula el paquete IPS de $25.280 + cargas (haz la suma de la sección 1 o revisa ChileAtiende).</li>
<li>No sustituye la liquidación de tu servicio, municipalidad, IPS, Capredena o Dipreca.</li>
</ul>
<p>Complementos útiles:</p>
<ul>
<li><a href="/calculadoras/calculadora-sueldo-liquido">Sueldo líquido</a> — para aproximar el líquido de agosto (tramo SP).</li>
<li><a href="/calculadoras/calculadora-asignacion-familiar">Asignación familiar</a> — contexto de cargas (no es el aguinaldo).</li>
<li><a href="/calculadoras/calculadora-pgu">PGU</a> — si tu pensión base es PGU y quieres entender el contexto previsional.</li>
<li><a href="/calculadoras/calculadora-gratificacion">Gratificación</a> — si lo que te pagan en la empresa privada es gratificación y no aguinaldo.</li>
</ul>

<h2>9. Fuentes oficiales (verificación YMYL)</h2>
<ul>
<li><a href="https://www.chileatiende.gob.cl/fichas/26553-aguinaldo-de-fiestas-patrias-para-pensionados-ips" target="_blank" rel="noopener">ChileAtiende — Aguinaldo de Fiestas Patrias para pensionados IPS</a> (base $25.280; +$12.969/carga al 31 ago 2026; pago con pensión de septiembre; no imponible ni tributable).</li>
<li><a href="https://www.chileatiende.gob.cl/fichas/30171-aguinaldo-de-navidad-para-pensionados-ips" target="_blank" rel="noopener">ChileAtiende — Aguinaldo de Navidad para pensionados IPS</a> (contexto; no es el de Fiestas Patrias).</li>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1221118" target="_blank" rel="noopener">Biblioteca del Congreso Nacional — Ley 21.806</a> (reajuste sector público 2026; aguinaldos y bonos).</li>
<li><a href="https://www.hacienda.cl/noticias-y-eventos/noticias/gobierno-y-cut-mesa-del-sector-publico-firman-protocolo-de-acuerdo-por-reajuste" target="_blank" rel="noopener">Ministerio de Hacienda — Protocolo de acuerdo reajuste 2025–2026</a> (tramos $91.682 / $63.645 y umbral $1.060.493).</li>
<li>Dirección del Trabajo — gratificaciones y beneficios laborales (para no confundir con aguinaldo privado).</li>
</ul>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Disclaimer YMYL</strong><p>Artículo informativo y educativo. Los montos y requisitos se tomaron de fichas y normas públicas vigentes al publicar (julio 2026). No es un dictamen del IPS, de la Contraloría, de tu servicio de personal ni de un abogado. Antes de gastar o reclamar, confirma tu liquidación y, si hay duda, la ficha ChileAtiende 26553, la Ley 21.806 o tu unidad de remuneraciones/previsión. Si la norma o la ficha se actualizan, prevalece el texto oficial.</p></div></aside>
<p>Para profundizar en beneficios familiares y contexto de cargas, revisa la <a href="/guias/familia-pension-alimenticia-chile">guía de familia y pensión alimenticia</a> y las calculadoras enlazadas. Si buscas el sueldo del mes que define el tramo público, parte por la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>.</p>`,
  },
  {
    slug: 'horas-extra-jornada-42-horas-chile-2026',
    title:
      'Horas extra con jornada de 42 horas: cómo calcularlas en Chile 2026',
    description:
      'Desde el 26 de abril de 2026 la jornada ordinaria máxima es 42 horas semanales (Ley 21.561). Cómo se calcula la hora ordinaria, el recargo legal del 50% y ejemplos en CLP con la calculadora de horas extra.',
    date: '2026-07-11',
    updatedAt: '2026-07-13',
    category: 'laboral',
    readingTime: 11,
    relatedGuia: 'horas-extra-chile',
    seoTitle: 'Horas extra Chile 2026: jornada 42 h y recargo 50%',
    seoDescription:
      'Jornada de 42 horas desde el 26-04-2026 (Ley 21.561). Cómo calcular horas extra con recargo mínimo 50%, valor hora y ejemplos. Fuente Dirección del Trabajo.',
    keywords: [
      'horas extra 42 horas 2026',
      'horas extraordinarias Chile',
      'recargo 50% horas extra',
      'jornada 42 horas Ley 21.561',
      'calcular horas extra sueldo',
      'Ley 40 horas etapa 2026',
      'valor hora extraordinaria',
    ],
    relatedCalculators: [
      'calculadora-horas-extra',
      'calculadora-sueldo-liquido',
      'calculadora-finiquito',
      'calculadora-costo-empleado-pyme',
    ],
    faq: [
      {
        question: '¿Cuál es la jornada semanal máxima en 2026?',
        answer:
          'Desde el 26 de abril de 2026 la jornada ordinaria máxima es de 42 horas semanales, según la gradualidad de la Ley 21.561 (conocida como Ley de 40 Horas). En 2024 bajó a 44; en 2028 baja a 40. Confirma en la Dirección del Trabajo y en tu contrato.',
      },
      {
        question: '¿Cuánto es el recargo de las horas extra?',
        answer:
          'El Código del Trabajo (Art. 32) fija un recargo legal mínimo del 50% sobre el valor de la hora ordinaria. Convenio o pacto puede ser más favorable, nunca menos. No existe un recargo nocturno automático distinto en la ley general.',
      },
      {
        question: '¿Cómo se calcula el valor de la hora ordinaria con 42 horas?',
        answer:
          'Para un sueldo mensual, la DT indica dividir el sueldo por 30, multiplicar por 28, dividir por 168 (42 horas por cuatro semanas) y aplicar el recargo de 50%. El factor directo para una hora extra es sueldo mensual × 0,0083333. Dividir por 42 × 4,33 no reproduce el procedimiento oficial.',
      },
      {
        question: '¿Pueden bajar mi sueldo porque bajó la jornada a 42 horas?',
        answer:
          'La reducción de jornada de la Ley 21.561 no autoriza por sí sola a rebajar la remuneración convenida para “compensar” menos horas. Ante dudas o cobros indebidos, consulta a la Dirección del Trabajo o a tu organización sindical.',
      },
      {
        question: '¿Hay tope de horas extra al día?',
        answer:
          'Como regla general, las horas extraordinarias no pueden exceder de dos por día (Art. 31 del Código del Trabajo), con las excepciones y regímenes especiales que la ley contempla. El exceso sobre la jornada ordinaria semanal debe tratarse como extraordinario y documentarse.',
      },
      {
        question: '¿Trabajar domingo o festivo se paga siempre con 100% de recargo?',
        answer:
          'No. La hora extraordinaria común tiene un piso de 50%. Domingos y festivos pueden generar descansos compensatorios, reglas especiales para comercio o un recargo contractual más favorable, pero no existe un 100% automático para todos los trabajadores.',
      },
      {
        question: '¿Se pueden cambiar horas extra por días libres?',
        answer:
          'Sí, mediante pacto escrito. La Ley 21.561 permite hasta cinco días hábiles adicionales por anualidad; cada hora extra equivale a una hora y media de feriado. Deben usarse dentro de seis meses, en días completos y con aviso de 48 horas. Sin pacto, corresponde el pago.',
      },
    ],
    content: `<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>La fórmula oficial no usa 4,33 semanas</strong><p>Para sueldo mensual y jornada de 42 horas, la Dirección del Trabajo indica dividir por 30, multiplicar por 28, dividir por 168 y luego aplicar 50%. El atajo es <strong>sueldo mensual × 0,0083333 por cada hora extra</strong>. Usar sueldo ÷ (42 × 4,33) produce otro monto.</p></div></aside>

<p>El 26 de abril de 2026 la jornada ordinaria máxima general bajó de 44 a 42 horas semanales. El cambio no solo acortó dos horas: elevó el valor de cada hora extraordinaria para quienes mantuvieron su sueldo mensual y obliga a revisar pactos, turnos y sistemas de asistencia. Una planilla que conserva el factor de 44 o 45 horas puede pagar menos aun cuando aplique correctamente el recargo de 50%.</p>

<p>Esta guía se concentra en la transición 2026. Para un conflicto real no basta multiplicar una cantidad: primero se debe establecer si existieron horas extraordinarias, cuál era la jornada pactada, qué sueldo integra la base y qué mostró el registro semanal.</p>

<h2>Calendario de reducción de la jornada</h2>
<table>
<thead><tr><th>Fecha</th><th>Máximo ordinario general</th><th>Situación</th></tr></thead>
<tbody>
<tr><td>26 de abril de 2024</td><td>44 horas semanales</td><td>Etapa anterior</td></tr>
<tr><td><strong>26 de abril de 2026</strong></td><td><strong>42 horas semanales</strong></td><td>Etapa vigente</td></tr>
<tr><td>26 de abril de 2028</td><td>40 horas semanales</td><td>Etapa final programada</td></tr>
</tbody>
</table>

<p>La Ley 21.561 prohíbe que esta reducción implique una disminución de remuneraciones. Si el sueldo pactado era $800.000 por la jornada anterior y la empresa aplicó las 42 horas legales, no puede rebajarlo unilateralmente para mantener el mismo valor horario. Las partes pueden haber pactado 40 horas antes de 2028; en ese caso, el exceso se analiza desde la jornada pactada menor, no recién desde 42.</p>

<h2>Qué cuenta como hora extraordinaria</h2>
<p>El artículo 30 del Código del Trabajo define la jornada extraordinaria como la que excede el máximo legal o el máximo pactado cuando este es menor. Sin embargo, marcar quince minutos después de la salida un día no prueba por sí solo quince minutos pagables. La DT analiza el tiempo efectivamente trabajado y, como regla, cierra la semana para comprobar el exceso sobre la jornada ordinaria.</p>

<ul>
<li>Si la jornada pactada es 42 horas, se compara el total semanal con 42.</li>
<li>Si el contrato pactó 40 horas, se compara con 40.</li>
<li>Atrasos, permisos o inasistencias dentro de la semana pueden incidir en el total.</li>
<li>Quedarse voluntariamente en el lugar sin trabajar no genera sobresueldo.</li>
<li>Si el empleador conoció y aceptó trabajo efectivo en exceso, puede existir hora extraordinaria aunque falte el pacto escrito.</li>
</ul>

<p>Cuando una semana comienza en un mes y termina en otro, la consulta oficial de la DT indica determinar las horas al cierre de la semana y pagarlas en el mes en que esta terminó. Cortar arbitrariamente el domingo por la fecha contable puede alterar el exceso.</p>

<h2>Pacto escrito, necesidad temporal y límite diario</h2>
<p>Las horas extraordinarias se pactan para necesidades o situaciones temporales de la empresa. El pacto debe constar por escrito y no puede durar más de tres meses, aunque puede renovarse por acuerdo si la necesidad temporal continúa. Una cláusula indefinida que convierte la falta permanente de dotación en “horas extra habituales” no satisface esa finalidad.</p>

<p>El artículo 31 permite hasta <strong>dos horas extraordinarias por día</strong> en faenas que no perjudiquen la salud. No corresponde transformar ese máximo diario en un supuesto “tope semanal automático de doce horas”: la distribución de la jornada, descansos y régimen aplicable también importan.</p>

<p>La falta de pacto no permite quedarse con trabajo gratis. El artículo 32 reconoce como extraordinarias las horas trabajadas en exceso con conocimiento del empleador. Correos, mensajes, conexión a sistemas, turnos, accesos y geolocalización pueden complementar el registro de asistencia; deben demostrar trabajo y conocimiento, no solo disponibilidad.</p>

<h2>Fórmula oficial para sueldo mensual y 42 horas</h2>
<p>La consulta de la DT actualizada el 28 de abril de 2026 entrega este procedimiento:</p>

<ol class="steps">
<li>Divide el sueldo mensual por 30 para obtener una referencia diaria.</li>
<li>Multiplica por 28 para llevarla a cuatro semanas.</li>
<li>Divide por 168, resultado de 42 horas × 4 semanas.</li>
<li>Multiplica la hora ordinaria por 1,5 para aplicar el recargo mínimo de 50%.</li>
</ol>

<p>La operación completa se simplifica así:</p>
<p><code>hora extra 42 h = sueldo mensual × 0,0083333</code></p>

<p>El factor incluye el recargo. No vuelvas a multiplicarlo por 1,5. Tampoco lo uses para 40, 44 o una jornada parcial sin recalcular el divisor.</p>

<div class="numeric-example"><div class="numeric-example__title">Sueldo mensual $800.000 · 10 horas extra</div><ul><li>$800.000 ÷ 30 × 28 ÷ 168 = $4.444,44 por hora ordinaria</li><li>$4.444,44 × 1,5 = $6.666,67 por hora extra</li><li>$6.666,67 × 10 = $66.666,70</li></ul><span class="total">Sobresueldo bruto aproximado: $66.667</span></div>

<div class="numeric-example"><div class="numeric-example__title">Sueldo mensual $1.200.000 · 8 horas extra</div><ul><li>$1.200.000 × 0,0083333 ≈ $10.000 por hora</li><li>$10.000 × 8 = $80.000</li></ul><span class="total">Sobresueldo bruto aproximado: $80.000</span></div>

<div class="numeric-example"><div class="numeric-example__title">Sueldo mínimo $553.553 · 10 horas extra</div><ul><li>$553.553 × 0,0083333 ≈ $4.612,94 por hora</li><li>$4.612,94 × 10 ≈ $46.129,40</li></ul><span class="total">Sobresueldo bruto aproximado: $46.129</span></div>

<h2>Cuánto cambió frente a la jornada de 44 horas</h2>
<p>Con el mismo método oficial, la hora extra de una jornada de 44 horas usa cuatro semanas de 176 horas. Para un sueldo mensual de $800.000:</p>

<table>
<thead><tr><th>Jornada</th><th>Hora extra aproximada</th><th>10 horas</th></tr></thead>
<tbody>
<tr><td>44 horas</td><td>$6.364</td><td>$63.636</td></tr>
<tr><td><strong>42 horas</strong></td><td><strong>$6.667</strong></td><td><strong>$66.667</strong></td></tr>
<tr><td>Diferencia</td><td>$303</td><td>$3.030</td></tr>
</tbody>
</table>

<p>El valor sube aproximadamente 4,76% porque la misma remuneración se distribuye en menos horas ordinarias. Si una liquidación posterior al 26 de abril conserva exactamente el valor anterior y no existe otra explicación contractual, pide el detalle del factor usado.</p>

<h2>Qué sueldo entra en la base</h2>
<p>El recargo se calcula sobre el <strong>sueldo convenido para la jornada ordinaria</strong>. No es correcto tomar sin análisis el total bruto de la liquidación. Gratificación, comisiones, colación, movilización y bonos no se agregan automáticamente como base del sobresueldo.</p>

<p>Si no existe sueldo convenido o es inferior al ingreso mínimo aplicable, el artículo 32 usa el ingreso mínimo como base. En remuneraciones diarias, semanales, por trato o mixtas hay procedimientos propios y puede intervenir la semana corrida.</p>

<h3>Persona remunerada semanalmente</h3>
<p>Para un sueldo semanal y jornada de 42 horas, la explicación de la DT es dividir por 42 y multiplicar por 1,5:</p>

<div class="numeric-example"><div class="numeric-example__title">Sueldo semanal $210.000</div><ul><li>Hora ordinaria: $210.000 ÷ 42 = $5.000</li><li>Hora extra: $5.000 × 1,5 = $7.500</li><li>4 horas extra: $30.000</li></ul><span class="total">Sobresueldo semanal bruto: $30.000</span></div>

<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>La DT publica un atajo inconsistente</strong><p>La consulta semanal actualizada el 29 de abril de 2026 también muestra el factor 0,0340909, pero ese número corresponde a dividir 1,5 por 44 y no reproduce su ejemplo de 42 horas. El procedimiento explicado entrega 1,5 ÷ 42 = <strong>0,0357143</strong>. Usa la división completa y conserva el respaldo mientras la página no sea corregida.</p></div></aside>

<h2>Domingos, festivos y trabajo nocturno</h2>
<p>El recargo mínimo general de la hora extraordinaria es 50%. No existe un 25% nocturno general ni un 100% automático para toda hora trabajada en domingo o festivo. En actividades exceptuadas del descanso dominical puede corresponder descanso compensatorio; trabajadores del comercio tienen reglas particulares; y un contrato o convenio colectivo puede mejorar el recargo.</p>

<p>El orden correcto es identificar el régimen de descanso, determinar si el tiempo fue ordinario o extraordinario y luego aplicar el recargo legal o contractual. Marcar una casilla “festivo = doble” sin esos pasos puede sobrepagar o subpagar.</p>

<h2>Compensación por días adicionales de feriado</h2>
<p>La Ley 21.561 permite pactar por escrito que las horas extra se compensen con días de feriado adicionales. La DT resume estas condiciones:</p>

<ul>
<li>Hasta cinco días hábiles adicionales por cada anualidad del contrato.</li>
<li>Cada hora extraordinaria equivale a una hora y media de feriado.</li>
<li>Los días se usan dentro de los seis meses siguientes al ciclo en que se originaron.</li>
<li>La persona avisa con 48 horas de anticipación.</li>
<li>Se utilizan días completos, no horas sueltas o medios días.</li>
</ul>

<p>Sin pacto de compensación, rige el pago. Tampoco es lo mismo devolver un permiso: ese tiempo no se considera extraordinario solo cuando el trabajador pidió el permiso por escrito y el empleador autorizó compensarlo.</p>

<h2>Pago, cotizaciones e indemnización</h2>
<p>Las horas extra se pagan junto con las remuneraciones ordinarias del período. Son imponibles y tributables, por lo que generan AFP, salud, cesantía e impuesto único hasta los topes aplicables. El líquido adicional será menor que el sobresueldo bruto de los ejemplos.</p>

<p>El artículo 172 excluye expresamente el sobresueldo de la base legal de indemnización por años de servicio. Esa exclusión no lo vuelve no imponible ni permite omitirlo del sueldo mensual. Son preguntas diferentes.</p>

<h2>Cómo auditar una liquidación después de abril de 2026</h2>
<ol class="steps">
<li>Reúne contrato, anexos, pacto de horas extra y distribución semanal.</li>
<li>Obtén el registro de asistencia completo, no una captura aislada.</li>
<li>Cierra cada semana y separa permisos, atrasos, licencias y descansos.</li>
<li>Identifica el sueldo que cumple la definición legal; no uses todo el bruto.</li>
<li>Aplica el factor de la jornada vigente o pactada.</li>
<li>Compara horas, valor unitario, recargo y mes de pago con la liquidación.</li>
<li>Comprueba que el sobresueldo figure en la base imponible.</li>
<li>Solicita por escrito la corrección y conserva la respuesta.</li>
</ol>

<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Calculadora en corrección</strong><p>La <a href="/calculadoras/calculadora-horas-extra">calculadora de horas extra</a> todavía usa 4,33 semanas y asigna un recargo general a festivos que no corresponde a todos los contratos. No la uses para reclamar o pagar hasta que el motor adopte la fórmula de la DT. Puedes reproducir manualmente los pasos de esta guía.</p></div></aside>

<h2>Fuentes y fecha de comprobación</h2>
<p>Contenido verificado al <strong>13 de julio de 2026</strong>. Las consultas en foros se utilizaron para identificar problemas de marcación, mensajes fuera de horario y recargos festivos; la regla legal proviene de las siguientes fuentes:</p>
<ul>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">BCN LeyChile — Código del Trabajo</a>, artículos 30 a 33 y 172.</li>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1191554" target="_blank" rel="noopener">BCN LeyChile — Ley 21.561</a>, reducción gradual y compensación por feriado.</li>
<li><a href="https://www.dt.gob.cl/portal/1628/w3-article-125909.html" target="_blank" rel="noopener">Dirección del Trabajo — gradualidad 44, 42 y 40 horas</a>.</li>
<li><a href="https://www.dt.gob.cl/portal/1628/w3-article-95182.html" target="_blank" rel="noopener">Dirección del Trabajo — cálculo para sueldo mensual</a>.</li>
<li><a href="https://www.dt.gob.cl/portal/1628/w3-article-60191.html" target="_blank" rel="noopener">Dirección del Trabajo — cálculo para sueldo semanal</a>.</li>
<li><a href="https://www.dt.gob.cl/portal/1628/w3-article-60176.html" target="_blank" rel="noopener">Dirección del Trabajo — determinación semanal y cambio de mes</a>.</li>
<li><a href="https://www.dt.gob.cl/legislacion/1624/w3-article-125738.html" target="_blank" rel="noopener">Dirección del Trabajo — días adicionales de feriado</a>.</li>
</ul>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Alcance</strong><p>Los ejemplos usan sueldo mensual fijo, jornada de 42 horas y recargo mínimo de 50%. Una jornada especial, contrato colectivo, remuneración mixta o exclusión válida del artículo 22 cambia el análisis. En caso de discrepancia, prevalecen el registro, el contrato y el criterio de la DT.</p></div></aside>`,
  },
  {
    slug: 'sueldo-minimo-2026-calcular-liquido',
    title:
      'Sueldo mínimo 2026 $553.553: cómo recalcular tu líquido y descuentos',
    description:
      'Desde el 1 de mayo de 2026 el ingreso mínimo mensual es $553.553 (18–65 años, Ley 21.830). Tramos por edad, descuentos legales y cómo estimar el sueldo líquido con la calculadora.',
    date: '2026-07-11',
    updatedAt: '2026-07-11',
    category: 'laboral',
    readingTime: 14,
    relatedGuia: 'sueldo-liquido-chile',
    seoTitle: 'Sueldo mínimo 2026 $553.553: líquido y descuentos',
    seoDescription:
      'IMM desde mayo 2026: $553.553 (18–65), $412.938 (<18 o >65) y $356.815 no remuneracional. Cómo estimar el líquido. Fuente DT y Ley 21.830.',
    keywords: [
      'sueldo mínimo 2026',
      'ingreso mínimo mensual 2026',
      'sueldo mínimo $553.553',
      'sueldo mínimo líquido Chile',
      'IMM mayo 2026',
      'Ley 21.830 sueldo mínimo',
      'calcular sueldo líquido mínimo',
    ],
    relatedCalculators: [
      'calculadora-sueldo-liquido',
      'calculadora-costo-empleado-pyme',
      'calculadora-finiquito',
      'calculadora-gratificacion',
    ],
    faq: [
      {
        question: '¿Cuánto es el sueldo mínimo en Chile en 2026?',
        answer:
          'Desde el 1 de mayo de 2026 es $553.553 para trabajadores mayores de 18 y hasta 65 años. Es $412.938 para menores de 18 y mayores de 65. Los $356.815 corresponden a fines no remuneracionales: no son un tercer sueldo mínimo para otro grupo de trabajadores.',
      },
      {
        question: '¿Cuánto líquido me queda con el sueldo mínimo 2026?',
        answer:
          'Con $553.553 imponibles, FONASA 7%, contrato indefinido y sin otros haberes o descuentos, el líquido de referencia va aproximadamente de $448.101 a $453.581 según la comisión AFP vigente. En un contrato a plazo fijo no se descuenta el 0,6% de cesantía al trabajador, por lo que el resultado sube. Gratificación, Isapre, cargas y descuentos personales cambian el depósito.',
      },
      {
        question: '¿Desde cuándo rige el $553.553?',
        answer:
          'Rige desde el 1 de mayo de 2026 aunque la Ley 21.830 se publicó el 22 de junio. La Dirección del Trabajo ordenó reliquidar las remuneraciones ya pagadas desde mayo cuando el sueldo base quedó bajo el nuevo mínimo, y regularizar también cotizaciones y gratificación que se vean afectadas.',
      },
      {
        question: '¿El sueldo mínimo es lo mismo que el sueldo líquido?',
        answer:
          'No. El ingreso mínimo es un piso de remuneración bruta (con las reglas del Código del Trabajo). El líquido es lo que recibes tras descuentos legales (AFP, salud, cesantía trabajador, IUSC si aplica) y otros pactados.',
      },
      {
        question: '¿Afecta gratificación, finiquito o asignación familiar?',
        answer:
          'Sí, de forma indirecta: varios topes y bases se anclan al IMM (por ejemplo el tope de gratificación del 4,75 IMM y tramos de asignación familiar reajustados por la misma ley). Al cambiar el IMM, conviene revisar calculadoras de gratificación, finiquito y asignación familiar.',
      },
      {
        question: '¿Se puede pagar un mínimo proporcional si trabajo menos de 42 horas?',
        answer:
          'Solo si la jornada pactada es parcial, es decir, de 30 horas semanales o menos. La DT indica multiplicar $553.553 por las horas semanales y dividir por 42. Si la jornada supera 30 horas, aunque sea menor que 42, corresponde el ingreso mínimo mensual completo.',
      },
      {
        question: '¿La gratificación mensual puede completar el sueldo mínimo?',
        answer:
          'Como regla general, no. La Dirección del Trabajo señala que la gratificación legal o convencional pagada mensualmente no puede usarse para enterar el sueldo base mínimo. Hay una excepción acotada para contratos de 30 días o menos y ciertas prórrogas que no exceden 60 días.',
      },
    ],
    content: `<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Valor vigente con efecto retroactivo</strong><p>El ingreso mínimo mensual es <strong>$553.553</strong> desde el <strong>1 de mayo de 2026</strong> para trabajadores mayores de 18 y hasta 65 años, aunque la Ley 21.830 fue publicada el 22 de junio. Si mayo o junio se pagaron con el mínimo anterior, corresponde reliquidar las diferencias y regularizar las cotizaciones asociadas.</p></div></aside>

<p>El sueldo mínimo no es el monto que necesariamente llega a la cuenta bancaria. Es un piso legal para el sueldo o la remuneración aplicable, antes de cotizaciones y descuentos. También puede ser solo una parte del total si la persona recibe gratificación, bonos, horas extra o asignaciones. Por eso dos trabajadores con el mismo sueldo base de $553.553 pueden tener líquidos distintos sin que uno de los cálculos sea automáticamente ilegal.</p>

<p>La revisión de preguntas en comunidades laborales muestra tres confusiones recurrentes: llamar “sueldo líquido mínimo” a los $553.553, usar la gratificación para rellenar un sueldo base inferior y prorratear el mínimo en cualquier jornada menor a 42 horas. Las tres requieren mirar la norma, no una regla de tres genérica.</p>

<h2>Montos oficiales desde el 1 de mayo de 2026</h2>
<table>
<thead><tr><th>Situación</th><th>Ingreso mínimo mensual</th><th>Qué significa</th></tr></thead>
<tbody>
<tr><td>Trabajadores <strong>mayores de 18 y hasta 65 años</strong></td><td><strong>$553.553</strong></td><td>Piso general de sueldo o remuneración según jornada y reglas del Código del Trabajo</td></tr>
<tr><td>Trabajadores <strong>menores de 18</strong> y <strong>mayores de 65 años</strong></td><td><strong>$412.938</strong></td><td>Piso especial por edad</td></tr>
<tr><td><strong>Fines no remuneracionales</strong></td><td><strong>$356.815</strong></td><td>Unidad de referencia legal; no es el sueldo de una tercera categoría de trabajadores</td></tr>
</tbody>
</table>

<p>La redacción exacta importa. La ley dice <strong>mayores de 18 años</strong>, no “desde los 18” sin matiz, y <strong>hasta 65 años</strong>. Si el caso está justo en el cumpleaños 18 o 65 y afecta una liquidación, conviene confirmar la aplicación con la Dirección del Trabajo en lugar de inferirla desde una tabla abreviada.</p>

<p>El monto de $553.553 no permanecerá fijo necesariamente durante 2027. La Ley 21.830 ordena reajustarlo desde el 1 de enero de 2027 por el IPC acumulado entre mayo y diciembre de 2026. También obliga al Ejecutivo a presentar un nuevo proyecto durante 2027 para un reajuste posterior. Este artículo no anticipa una cifra que todavía depende de inflación futura.</p>

<h2>Por qué la ley de junio se aplica desde mayo</h2>
<p>La Ley 21.830 fue publicada en el Diario Oficial el 22 de junio de 2026, pero fijó expresamente el inicio de los nuevos montos en el 1 de mayo. El Dictamen 307/28 de la Dirección del Trabajo reconoce ese efecto retroactivo y explica qué debe ocurrir cuando mayo ya estaba pagado.</p>

<ol class="steps">
<li>El empleador identifica a quienes fueron remunerados con base en el mínimo anterior o cuyo sueldo base quedó bajo $553.553.</li>
<li>Calcula la diferencia por mayo y, si corresponde, junio.</li>
<li>Emite una reliquidación comprensible, no un bono sin explicación.</li>
<li>Regulariza declaración y pago de cotizaciones de seguridad social sobre esas diferencias.</li>
<li>Revisa el efecto en anticipos o liquidación de gratificación del artículo 50.</li>
</ol>

<p>El ajuste no se resuelve pagando solo la diferencia líquida. El mayor sueldo base es remuneración imponible y modifica AFP, salud, cesantía y aportes patronales. Si el empleador depositó una diferencia sin corregir las cotizaciones, la regularización quedó incompleta.</p>

<h2>El mínimo exige revisar el sueldo base, no solo el total</h2>
<p>Para personas afectas a jornada ordinaria, el artículo 42 letra a) del Código del Trabajo define el sueldo base como el estipendio fijo en dinero pagado por períodos iguales. La DT concluye que desde mayo de 2026 no puede ser inferior a $553.553 en la jornada que da derecho al mínimo completo.</p>

<p>No basta que la suma de sueldo base, gratificación y bonos alcance esa cifra. La DT señala que, como regla general, <strong>la gratificación legal o convencional mensual no puede completar un sueldo base inferior al mínimo</strong>. La excepción se limita a contratos de 30 días o menos y a prórrogas que, sumadas al período inicial, no excedan 60 días.</p>

<div class="numeric-example"><div class="numeric-example__title">Ejemplo de estructura incorrecta</div><ul><li>Sueldo base: $450.000</li><li>Gratificación mensual: $120.000</li><li>Total imponible: $570.000</li></ul><span class="total">El total supera $553.553, pero el sueldo base sigue $103.553 bajo el mínimo general</span></div>

<p>Para una persona excluida de limitación de jornada puede no existir la misma obligación de pactar sueldo base, pero la DT mantiene el derecho a una remuneración de al menos el ingreso mínimo y tampoco permite completarla con gratificación mensual. Los casos de comisión, trato o remuneración variable requieren revisar la estructura completa y los ajustes garantizados por el Código.</p>

<h2>Jornada parcial: cuándo se puede pagar proporcional</h2>
<p>Desde abril de 2026 la jornada ordinaria máxima general es de 42 horas semanales. La consulta oficial de la DT distingue dos situaciones:</p>

<ul>
<li><strong>Hasta 30 horas semanales:</strong> es jornada parcial y el mínimo puede calcularse proporcionalmente.</li>
<li><strong>Más de 30 y menos de 42 horas:</strong> es una jornada intermedia. No se permite prorratear el IMM; corresponde el mínimo mensual completo.</li>
</ul>

<p>Para una jornada parcial válida, la fórmula publicada por la DT es:</p>
<p><code>mínimo proporcional = $553.553 × horas semanales pactadas ÷ 42</code></p>

<div class="numeric-example"><div class="numeric-example__title">Ejemplos de jornada parcial</div><ul><li>20 horas: $553.553 × 20 ÷ 42 = $263.596,67</li><li>30 horas: $553.553 × 30 ÷ 42 = $395.395</li><li>31 horas: ya supera el límite parcial; no se prorratea</li></ul><span class="total">20 h: $263.597 · 30 h: $395.395 · 31 h: $553.553</span></div>

<p>Estos valores son sueldo base bruto antes de cotizaciones. Si la jornada cambia durante el mes, hubo ausencias, licencia o ingreso a mitad de período, la liquidación requiere separar la proporcionalidad contractual de los días efectivamente remunerados.</p>

<h2>Cómo calcular el líquido de $553.553</h2>
<p>Para un trabajador dependiente con toda la remuneración imponible, FONASA y contrato indefinido, los descuentos personales habituales son:</p>

<ul>
<li><strong>10% AFP:</strong> $55.355,30.</li>
<li><strong>Comisión AFP:</strong> entre 0,46% y 1,45% según las tasas publicadas por la Superintendencia de Pensiones en julio de 2026.</li>
<li><strong>Salud 7%:</strong> $38.748,71. Un plan Isapre puede producir una diferencia adicional.</li>
<li><strong>Cesantía 0,6%:</strong> $3.321,32 cuando el contrato es indefinido. En plazo fijo esa parte no se descuenta al trabajador.</li>
<li><strong>Impuesto único:</strong> $0 en este escenario. En julio de 2026 el tramo exento llega a una renta líquida imponible de $967.261,50, muy por encima de la base tributaria resultante.</li>
</ul>

<h3>Escenario A: AFP Uno, FONASA y contrato indefinido</h3>
<div class="numeric-example"><div class="numeric-example__title">Comisión AFP 0,46%</div><ul><li>AFP obligatoria 10%: $55.355</li><li>Comisión 0,46%: $2.546</li><li>Salud 7%: $38.749</li><li>Cesantía 0,6%: $3.321</li><li>IUSC: $0</li></ul><span class="total">Líquido referencial: $453.581</span></div>

<h3>Escenario B: AFP ProVida, FONASA y contrato indefinido</h3>
<div class="numeric-example"><div class="numeric-example__title">Comisión AFP 1,45%</div><ul><li>AFP obligatoria 10%: $55.355</li><li>Comisión 1,45%: $8.027</li><li>Salud 7%: $38.749</li><li>Cesantía 0,6%: $3.321</li><li>IUSC: $0</li></ul><span class="total">Líquido referencial: $448.101</span></div>

<p>Así, un rango más realista para este caso simple es <strong>$448.101 a $453.581</strong>, no $553.553 y tampoco un “82% universal”. Si el contrato es a plazo fijo, elimina el 0,6% personal de cesantía: el rango sube aproximadamente a $451.422–$456.903.</p>

<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>El aporte patronal no baja el líquido</strong><p>El SIS vigente hasta julio y la cotización total de 3,5% que rige desde remuneraciones de agosto de 2026 son de cargo del empleador. No deben aparecer como descuento personal. Revisa el detalle en la guía de <a href="/blog/cotizacion-empleador-3-5-agosto-2026-costo-pyme">cotización patronal 3,5%</a>.</p></div></aside>

<h2>Por qué algunas personas reciben más que ese rango</h2>
<p>El ejemplo anterior considera solo sueldo base. En muchas liquidaciones hay otros conceptos:</p>

<ul>
<li><strong>Gratificación:</strong> si el empleador utiliza anticipos mensuales del sistema del artículo 50, puede pagar 25% de las remuneraciones con el tope legal. Es imponible y debe reliquidarse según corresponda.</li>
<li><strong>Horas extra, comisiones y bonos:</strong> aumentan haberes imponibles y sus cotizaciones.</li>
<li><strong>Asignación familiar:</strong> cuando corresponde, se suma como beneficio y no se confunde con sueldo base. La Ley 21.830 actualizó montos y tramos.</li>
<li><strong>Colación y movilización:</strong> pueden ser no imponibles si compensan razonablemente el gasto y no encubren remuneración.</li>
</ul>

<div class="numeric-example"><div class="numeric-example__title">Sueldo base mínimo + anticipo mensual de gratificación 25%</div><ul><li>Sueldo base: $553.553</li><li>Gratificación referencial: $138.388</li><li>Total imponible: $691.941</li><li>FONASA, contrato indefinido, sin IUSC</li></ul><span class="total">Líquido aproximado según AFP: $560.126 a $566.977</span></div>

<p>Ese 25% no es automático para toda empresa ni convierte cada anticipo en cálculo anual definitivo. La obligación, el sistema elegido y el tope de 4,75 IMM deben verificarse en la <a href="/blog/como-funciona-gratificacion-legal">guía de gratificación legal</a>.</p>

<h2>Por qué otras personas reciben menos</h2>
<ul>
<li>Plan Isapre por encima de la cotización legal.</li>
<li>Cuotas sindicales, APV, préstamos, anticipos o descuentos autorizados.</li>
<li>Ausencias injustificadas o ingreso/término durante el mes.</li>
<li>Embargos o retenciones judiciales dentro de sus reglas.</li>
<li>La liquidación separa un bono no devengado o una comisión que varió.</li>
</ul>

<p>Un depósito menor no demuestra por sí solo incumplimiento. Contrasta haberes, base imponible, AFP, salud, tipo de contrato, días pagados y cada descuento. Lo que sí es una señal clara es un sueldo base inferior al mínimo completo en una jornada de más de 30 horas, sin una excepción legal identificable.</p>

<h2>Qué cambia en gratificación, finiquito y otros cálculos</h2>
<ul>
<li><strong>Gratificación artículo 50:</strong> 4,75 × $553.553 entrega un tope anual de referencia de $2.629.376,75, redondeado al peso según la liquidación. La DT exige reliquidar las diferencias retroactivas que produzca el nuevo IMM.</li>
<li><strong>Horas extra:</strong> si el sueldo base aumenta, también puede aumentar el valor de la hora ordinaria usada para calcular el sobresueldo. No uses la liquidación anterior sin actualizar la base.</li>
<li><strong>Finiquito:</strong> días trabajados, feriado e indemnizaciones que utilicen la remuneración vigente pueden cambiar. El IMM no reemplaza los topes de 90 UF ni las reglas de causal.</li>
<li><strong>Asignación familiar y maternal:</strong> la Ley 21.830 actualizó tramos y montos desde mayo. No uses una tabla 2025.</li>
<li><strong>Costo empresa:</strong> la diferencia retroactiva genera también aportes patronales; no se limita al dinero entregado al trabajador.</li>
</ul>

<h2>Qué hacer si mayo o junio quedaron bajo el nuevo mínimo</h2>
<ol class="steps">
<li>Descarga contrato, anexos y liquidaciones desde mayo de 2026.</li>
<li>Identifica sueldo base, jornada semanal y tramo de edad; no mires solo el total haberes.</li>
<li>Calcula la diferencia bruta y solicita una reliquidación escrita al empleador.</li>
<li>Comprueba que la diferencia figure en cotizaciones AFP, salud y cesantía.</li>
<li>Si no hay corrección, usa el canal de consultas o denuncia de la Dirección del Trabajo. Conserva correos y comprobantes.</li>
</ol>

<p>Para simular, ingresa el bruto y tu AFP real en la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>. Si tu liquidación contiene gratificación, Isapre o descuentos especiales, replica cada dato; no ajustes el resultado hasta que “se parezca” al depósito.</p>

<h2>Fuentes y fecha de comprobación</h2>
<p>Contenido verificado al <strong>13 de julio de 2026</strong>. Las preguntas de foros y redes se usaron para detectar dudas sobre líquido, retroactividad y jornada parcial; no para fijar cifras.</p>
<ul>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1225354" target="_blank" rel="noopener">BCN LeyChile — Ley 21.830</a>, montos desde mayo y reajuste por IPC en enero de 2027.</li>
<li><a href="https://www.dt.gob.cl/legislacion/1624/w3-article-129410.html" target="_blank" rel="noopener">Dirección del Trabajo — Dictamen 307/28</a>, efecto retroactivo, reliquidación, cotizaciones y gratificación.</li>
<li><a href="https://www.dt.gob.cl/portal/1628/w3-article-60136.html" target="_blank" rel="noopener">Dirección del Trabajo — IMM y jornada parcial</a>, límite de 30 horas y fórmula sobre 42.</li>
<li><a href="https://www.dt.gob.cl/portal/1628/w3-article-95844.html" target="_blank" rel="noopener">Dirección del Trabajo — sueldo base y gratificación mensual</a>.</li>
<li><a href="https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9897.html" target="_blank" rel="noopener">Superintendencia de Pensiones — comisiones AFP vigentes</a>.</li>
<li><a href="https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026_art52.htm" target="_blank" rel="noopener">SII — tablas mensuales de Impuesto Único 2026</a>.</li>
</ul>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Alcance</strong><p>Los ejemplos redondean al peso y no sustituyen una liquidación oficial. Tu AFP, plan de salud, contrato, jornada, gratificación, días pagados y descuentos cambian el resultado. Ante una diferencia laboral, prevalecen la Ley 21.830, el Código del Trabajo y el pronunciamiento de la DT.</p></div></aside>`,
  },
  {
    slug: 'como-calcular-finiquito-chile',
    title: 'Cómo calcular tu finiquito en Chile 2026 paso a paso',
    description:
      'Guía paso a paso para calcular tu finiquito: indemnización, vacaciones proporcionales y gratificación. Con ejemplos en CLP y bases legales.',
    date: '2026-03-30',
    updatedAt: '2026-07-13',
    category: 'laboral',
    readingTime: 16,
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
    content: `<p class="article-lead">Un finiquito no se calcula con una sola fórmula. Es una cuenta final cuyo contenido depende de la causal de término, la fecha, las vacaciones, la estructura de remuneraciones y los pagos pendientes. La revisión correcta empieza en la carta de despido o renuncia, no en el total propuesto por el empleador.</p>

<h2>Qué es el finiquito y qué efectos produce</h2>
<p>El finiquito deja constancia del término de la relación laboral, la causal aplicada, los períodos trabajados y las sumas que las partes reconocen. Cuando cumple las formalidades del artículo 177 del Código del Trabajo puede tener poder liberatorio sobre las materias acordadas: lo firmado sin reserva puede cerrar reclamos respecto de conceptos incluidos.</p>
<p>Eso no significa que cualquier documento llamado “finiquito” borre todos los derechos. La eficacia depende de la ratificación, el contenido, el consentimiento y las materias efectivamente comprendidas. El trabajador puede aceptar con reserva de derechos, rechazar la propuesta electrónica o elegir la vía presencial ante ministro de fe.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Firmar no es obligatorio dentro de diez días</strong><p>El plazo obliga al empleador a otorgar el finiquito y poner su pago a disposición. La DT ha aclarado que no obliga al trabajador a firmar en ese mismo lapso. Primero revisa el documento y solicita el respaldo del cálculo.</p></div></aside>

<h2>Documentos que necesitas antes de calcular</h2>
<ul><li>Contrato de trabajo y anexos.</li><li>Carta de término, renuncia o acuerdo, con fecha y causal.</li><li>Últimas seis liquidaciones de remuneraciones.</li><li>Registro de vacaciones usadas y pendientes.</li><li>Comprobantes de bonos, comisiones y horas extra.</li><li>Certificados de cotizaciones de AFP, salud y AFC.</li><li>Oferta de finiquito y detalle de descuentos.</li><li>Instrumento colectivo o cláusula de indemnización especial, si existe.</li></ul>
<p>La carta debe indicar la causal legal y los hechos que la sustentan, además de informar el estado de cotizaciones y la modalidad presencial o electrónica. Una explicación genérica como “reestructuración” no reemplaza automáticamente los hechos exigidos para defender la causal.</p>

<h2>Paso 1: identifica la causal</h2>
<p>La causal decide qué indemnizaciones pueden aparecer. No todas las formas de término pagan un mes por año.</p>
<table><thead><tr><th>Causal</th><th>Contenido habitual, además de lo ya devengado</th></tr></thead><tbody><tr><td>Renuncia, art. 159 N.º 2</td><td>Remuneraciones pendientes y feriado compensable; sin años de servicio legales</td></tr><tr><td>Mutuo acuerdo, art. 159 N.º 1</td><td>Lo devengado más la indemnización que se pacte</td></tr><tr><td>Vencimiento de plazo, art. 159 N.º 4</td><td>Lo devengado y feriado; sin años por la sola causal</td></tr><tr><td>Conclusión de obra, art. 159 N.º 5</td><td>Puede aplicar indemnización especial por tiempo servido bajo el artículo 163; no se confunde con el mes por año general</td></tr><tr><td>Necesidades de la empresa, art. 161</td><td>Años de servicio si cumple antigüedad y aviso previo si no hubo 30 días</td></tr><tr><td>Causal disciplinaria, art. 160</td><td>Sin indemnización legal por años si está correctamente aplicada</td></tr></tbody></table>
<p>Un despido impugnado no se transforma por decisión unilateral del trabajador en “sin causa”. Los recargos del artículo 168 requieren acuerdo o sentencia. Si la causal es discutible, calcula el escenario pagado y el escenario reclamado por separado.</p>

<h2>Paso 2: calcula remuneraciones pendientes</h2>
<p>Incluye los días trabajados del último período aún no pagado, horas extra ya devengadas, comisiones cuyo hecho generador se cumplió, bonos contractuales y diferencias de meses anteriores. Para un sueldo mensual fijo, el valor diario suele obtenerse dividiendo por 30, pero no todos los conceptos variables siguen esa división.</p>
<div class="numeric-example"><div class="numeric-example__title">Sueldo mensual de $750.000 y término el día 12</div><ul><li>Valor diario: $750.000 ÷ 30 = $25.000</li><li>Días devengados del mes: 12</li><li>Sueldo pendiente: $300.000</li></ul><span class="total">Antes de cotizaciones e impuesto: $300.000</span></div>
<p>Revisa si el mes anterior fue pagado completo y si existe corte de asistencia distinto. Un anticipo ya recibido se descuenta una sola vez y debe figurar identificado.</p>

<h2>Paso 3: vacaciones pendientes y proporcionales</h2>
<p>El feriado no usado se compensa en dinero al terminar el contrato. Para la parte proporcional, la DT obtiene 1,25 días hábiles por mes y una fracción diaria. Después proyecta esos días desde el día siguiente al término y agrega sábados, domingos y festivos que incidan en el período. Por eso no es correcto multiplicar únicamente “meses × 1,25 × sueldo/30”.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo conceptual con 10 días hábiles proporcionales</div><ul><li>Se proyectan 10 días hábiles desde el día siguiente al término.</li><li>Si en el recorrido caen dos fines de semana, se incorporan cuatro días inhábiles.</li><li>Si además hay un festivo hábil, también se incorpora.</li><li>El período indemnizable podría sumar 15 días corridos.</li></ul><span class="total">La fecha de término cambia el resultado</span></div>
<p>La remuneración íntegra del feriado depende de si la remuneración es fija, variable o mixta. En remuneración variable se usa el promedio legal de los últimos tres meses trabajados. La <a href="/blog/vacaciones-proporcionales-guia">guía de vacaciones proporcionales</a> desarrolla el método y los casos de feriado progresivo.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>La calculadora necesita fecha</strong><p>Una estimación que no pregunta el día de término no puede incorporar fines de semana y festivos reales. Úsala solo como referencia hasta que esa variable esté implementada.</p></div></aside>

<h2>Paso 4: indemnización por años de servicio</h2>
<p>En necesidades de la empresa o desahucio legal, un contrato de un año o más da derecho a treinta días de la última remuneración mensual por cada año y fracción superior a seis meses. El máximo general es once años para contratos iniciados desde el 14 de agosto de 1981. La base mensual tiene tope de 90 UF del último día del mes anterior al pago.</p>
<p>La base del artículo 172 no es solo sueldo más gratificación. Incluye pagos mensuales por la prestación, como colación y movilización permanentes conforme a la doctrina vigente de la DT, y excluye horas extra, asignación familiar y pagos esporádicos o una vez al año. Para remuneraciones variables se promedian los últimos tres meses calendario pertinentes.</p>
<div class="numeric-example"><div class="numeric-example__title">Base computable $900.000 y 5 años 8 meses</div><ul><li>5 años completos</li><li>Fracción superior a 6 meses: suma 1</li><li>Años pagables: 6</li><li>$900.000 × 6 = $5.400.000</li></ul><span class="total">Años de servicio: $5.400.000</span></div>
<p>Consulta la <a href="/blog/calcular-indemnizacion-por-anos">guía de indemnización por años</a> para topes, causales y recargos judiciales.</p>

<h2>Paso 5: aviso previo</h2>
<p>Si el empleador aplica el artículo 161 y no entrega aviso escrito con al menos treinta días de anticipación, debe pagar la indemnización sustitutiva del aviso previo, equivalente a una última remuneración mensual bajo el artículo 172 y su tope de 90 UF.</p>
<p>No es un “mes adicional” para toda causal. En renuncia, plazo fijo o artículo 160 no se agrega por la sola falta de un aviso de treinta días. Cada causal tiene plazos distintos para que el empleador comunique el término.</p>

<h2>Gratificación y otros cierres anuales</h2>
<p>La gratificación legal es anual, aunque existan anticipos mensuales. Al terminar el contrato puede corresponder revisar la proporción devengada, los anticipos reajustados y la modalidad usada por el empleador. No añadas automáticamente “25% del último sueldo” al finiquito: el artículo 50 compara remuneraciones del ejercicio y tope proporcional.</p>
<p>Bonos anuales, participación, semana corrida o comisiones postergadas dependen de su cláusula y hecho generador. Si una venta se cerró antes del término pero la comisión se paga al cobrar al cliente, revisa el contrato y conserva la trazabilidad.</p>

<h2>Descuento del Seguro de Cesantía</h2>
<p>Cuando el contrato termina por artículo 161, la Ley N.º 19.728 permite imputar a la indemnización la parte del saldo de la Cuenta Individual de Cesantía formada por cotizaciones del empleador, con la rentabilidad correspondiente, bajo los requisitos legales. No se descuenta el aporte del trabajador.</p>
<p>Si un tribunal declara improcedente la causal, la procedencia de mantener esa imputación ha sido objeto de jurisprudencia judicial. No presentes el descuento como definitivo si estás impugnando el artículo 161: identifica la cifra y resérvala expresamente.</p>

<h2>Cotizaciones impagas y nulidad del despido</h2>
<p>La carta debe acompañar antecedentes que acrediten cotizaciones pagadas hasta el último día del mes anterior cuando corresponda. Si existen deudas previsionales, puede operar la nulidad del despido del artículo 162 y generarse obligación de pagar remuneraciones y prestaciones hasta la convalidación.</p>
<p>No basta que la liquidación muestre el descuento. Descarga certificados directamente de AFP, Fonasa o Isapre y AFC. La sanción no se calcula como una línea fija del finiquito; exige analizar deuda, períodos y convalidación.</p>

<h2>Ejemplo completo simplificado</h2>
<p>Supuestos: término inmediato por necesidades de la empresa, base artículo 172 de $900.000, 5 años y 8 meses, doce días trabajados con sueldo base de $750.000 y compensación de feriado ya determinada en $450.000.</p>
<div class="numeric-example"><div class="numeric-example__title">Cuenta final antes de descuentos y ajustes</div><ul><li>Sueldo pendiente: $300.000</li><li>Feriado compensado: $450.000</li><li>Años de servicio: $5.400.000</li><li>Aviso previo: $900.000</li><li>Subtotal: $7.050.000</li></ul><span class="total">Subtotal referencial: $7.050.000</span></div>
<p>Faltaría revisar gratificación, cotizaciones, impuesto de conceptos tributables, descuento AFC, bonos y un eventual recargo judicial. El ejemplo muestra por qué sumar “sueldo × años” no produce el finiquito completo.</p>

<h2>Plazo de diez días y pago en cuotas</h2>
<p>El empleador debe otorgar el finiquito y poner su pago a disposición dentro de diez días hábiles desde la separación, contados desde el día siguiente. El trabajador puede tomarse más tiempo para revisar y firmar. En el finiquito electrónico, después de aceptar con o sin reserva, el empleador tiene cinco días hábiles para efectuar el pago comprometido por la plataforma.</p>
<p>Las partes pueden acordar cuotas cumpliendo las reglas de reajustes, intereses y ratificación. El empleador no puede imponerlas. Si no paga una cuota, el documento ratificado puede servir para exigir el cumplimiento.</p>

<h2>Firma presencial, electrónica y reserva</h2>
<p>En Mi DT puedes rechazar, aceptar sin reserva o aceptar con reserva de derechos. La vía electrónica es voluntaria: también puedes optar por ministro de fe presencial. Una reserva útil identifica materias concretas, por ejemplo “diferencias en base del artículo 172 por colación y movilización; descuento AFC; feriado progresivo”.</p>
<p>Evita firmar “conforme, nada se adeuda” si discutirás el cálculo. Tampoco supongas que una reserva genérica resuelve cualquier conflicto. Si el monto o causal tiene impacto relevante, pide orientación antes de aceptar.</p>

<h2>Plazos para reclamar</h2>
<p>Los plazos dependen de la acción. Para reclamar judicialmente un despido injustificado, indebido, improcedente o indirecto, el plazo es de 60 días hábiles desde la separación. Un reclamo ante la Inspección del Trabajo lo suspende durante su tramitación, pero nunca permite demandar después de 90 días hábiles desde el despido.</p>
<p>Las acciones de cobro y prescripción de derechos tienen reglas diferentes. Por eso es incorrecto afirmar que toda diferencia del finiquito puede impugnarse simplemente “hasta dos años”. Identifica qué se reclama y no dejes vencer el plazo corto del despido mientras negocias.</p>

<h2>Checklist antes de firmar</h2>
<ol class="steps"><li>Comprueba fechas, empleador y causal.</li><li>Lee los hechos de la carta y conserva el sobre o comprobante.</li><li>Recalcula días trabajados y variables pendientes.</li><li>Proyecta el feriado desde la fecha real de término.</li><li>Revisa base y años indemnizables solo si la causal corresponde.</li><li>Confirma si hubo aviso de treinta días.</li><li>Audita gratificación, bonos y comisiones.</li><li>Identifica cada descuento, incluido AFC.</li><li>Descarga certificados previsionales.</li><li>Define una reserva específica si aceptarás con diferencias.</li><li>Controla los 60 días hábiles si impugnarás el despido.</li><li>Guarda finiquito, comprobante de pago y acta.</li></ol>

<p>Construye una estimación con la <a href="/calculadoras/calculadora-finiquito">calculadora de finiquito</a>, teniendo presente la limitación actual de fecha en vacaciones. Para casos de remuneración variable, continuidad laboral, fuero, cotizaciones impagas o causal discutida, la revisión profesional no es reemplazable por una simulación.</p>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con el <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">Código del Trabajo vigente</a>, las consultas de la DT sobre <a href="https://dt.gob.cl/portal/1628/w3-article-60613.html" target="_blank" rel="noopener">plazo para otorgar el finiquito</a> y <a href="https://dt.gob.cl/portal/1628/w3-article-60543.html" target="_blank" rel="noopener">formalidades de la carta</a>, el trámite oficial para <a href="https://dt.gob.cl/portal/1626/w3-article-117245.html" target="_blank" rel="noopener">ratificar con o sin reserva</a> y el método de la DT para vacaciones e indemnizaciones. Las experiencias compartidas en foros se usaron para identificar dudas sobre reserva, AFC y feriado; no como fuente legal.</p>`,
  },
  {
    slug: 'diferencia-sueldo-bruto-liquido',
    title: 'Diferencia entre sueldo bruto y líquido en Chile 2026',
    description:
      'Entiende la diferencia entre sueldo bruto y líquido. Descubre cuánto te descuentan por AFP, salud, cesantía e impuesto único en Chile.',
    date: '2026-03-30',
    updatedAt: '2026-07-13',
    category: 'laboral',
    readingTime: 15,
    relatedGuia: 'sueldo-liquido-chile',
    keywords: [
      'sueldo bruto líquido',
      'descuentos legales Chile',
      'AFP salud cesantía',
      'sueldo líquido 2026',
      'tope imponible 90 UF',
    ],
    relatedCalculators: [
      'calculadora-sueldo-liquido',
      'calculadora-costo-empleado-pyme',
      'calculadora-comparador-afp',
    ],
    content: `<p class="article-lead">“Bruto” y “líquido” no son dos porcentajes fijos. Entre ambos hay remuneraciones imponibles, asignaciones no imponibles, cotizaciones, impuesto y descuentos personales. Por eso dos trabajadores con el mismo total de haberes pueden recibir depósitos distintos. Esta guía permite reconstruir una liquidación 2026 sin usar el atajo engañoso de “restar 20%”.</p>

<h2>Sueldo base, total haberes, imponible y líquido</h2>
<p>En una conversación laboral se suele llamar sueldo bruto a todo lo ganado antes de descuentos. En una liquidación aparecen conceptos más precisos:</p>
<ul><li><strong>Sueldo base:</strong> estipendio fijo en dinero pagado por períodos iguales según el contrato. No necesariamente coincide con el total mensual.</li><li><strong>Haberes imponibles:</strong> remuneraciones sobre las que se calculan cotizaciones, como sueldo, gratificación mensual, comisiones, bonos remuneracionales y horas extra.</li><li><strong>Haberes no imponibles:</strong> asignaciones o reembolsos que realmente cumplen las condiciones legales, como una colación o movilización razonable. El nombre no basta para excluirlos.</li><li><strong>Total haberes:</strong> suma de imponibles y no imponibles antes de descuentos.</li><li><strong>Base tributable:</strong> monto sobre el cual se calcula el impuesto único después de las rebajas previsionales que permite la ley.</li><li><strong>Sueldo líquido:</strong> total haberes menos descuentos legales, contractuales o autorizados.</li></ul>
<p>Una oferta de “$900.000 líquidos” obliga a preguntar qué supuestos usó el empleador: AFP, Fonasa o Isapre, tipo de contrato, cargas, impuesto y bonos. Una oferta de “$900.000 brutos” también es ambigua si no aclara si incluye gratificación.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No existe un factor universal bruto → líquido</strong><p>El rango de 77% a 83% puede servir como intuición para algunos sueldos, pero falla con asignaciones no imponibles, Isapre, impuesto, topes previsionales, préstamos o pensión alimenticia. Para comprometer gastos usa una liquidación simulada concepto por concepto.</p></div></aside>

<h2>Las cotizaciones que reducen el líquido</h2>
<p>Para una persona dependiente no pensionada y con contrato indefinido, los descuentos previsionales habituales de cargo del trabajador son:</p>
<ul><li><strong>Pensión:</strong> 10% de la remuneración imponible destinado a la cuenta individual, más la comisión de la AFP.</li><li><strong>Salud:</strong> 7% para Fonasa o el precio que corresponda al contrato de Isapre. Si el plan cuesta más que la cotización legal, la diferencia también reduce el líquido.</li><li><strong>Seguro de Cesantía:</strong> 0,6% en contrato indefinido. En contratos a plazo fijo, por obra o servicio, la cotización ordinaria es de cargo del empleador.</li><li><strong>Impuesto único de segunda categoría:</strong> se aplica por tramos a la renta tributable mensual cuando supera el tramo exento.</li></ul>
<p>La comisión AFP vigente en julio de 2026 va desde 0,46% en AFP Uno hasta 1,45% en AFP Provida. Las demás son Capital 1,44%, Cuprum 1,44%, Habitat 1,27%, Modelo 0,58% y Planvital 1,16%. La comisión se cobra sobre la remuneración imponible hasta el tope, no sobre el saldo acumulado de la cuenta obligatoria.</p>
<p>Desde abril de 2026 la tasa vigente del Seguro de Invalidez y Sobrevivencia es 1,62%, pero para trabajadores dependientes es de cargo del empleador. No debe restarse otra vez del sueldo líquido. En internet se mezclan a menudo el costo previsional total del empleador con los descuentos del trabajador.</p>

<h2>Aportes del empleador que no se descuentan al trabajador</h2>
<p>El empleador paga cotizaciones adicionales por seguro de accidentes, SIS, seguro de cesantía y reforma previsional, según contrato y actividad. Desde agosto de 2025 hasta julio de 2026, el nuevo aporte previsional del empleador es 1% de la remuneración: 0,1% va a la cuenta individual y 0,9% al Fondo Autónomo de Protección Previsional. La tasa aumenta desde agosto de 2026 conforme al calendario legal.</p>
<p>Estos aportes elevan el costo de contratación, pero no autorizan rebajar el sueldo pactado ni aparecen como descuentos de cargo del trabajador. Si una liquidación resta “aporte empleador reforma” del líquido, solicita corrección y el fundamento.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Líquido y costo empresa son métricas distintas</strong><p>Un sueldo bruto de $1.000.000 no significa que la empresa gaste solo $1.000.000, ni que el trabajador reciba ese monto menos todas las cotizaciones del sistema. Parte de las cotizaciones se carga al empleador fuera del bruto pactado.</p></div></aside>

<h2>Topes imponibles 2026</h2>
<p>La Superintendencia de Pensiones fijó para 2026 un tope mensual de <strong>90 UF</strong> para cotizaciones obligatorias de pensiones, salud y accidentes del trabajo. Para Seguro de Cesantía el tope es <strong>135,2 UF</strong>. Rigen para remuneraciones desde febrero de 2026 conforme a la comunicación oficial; el período anterior usa el tope que le corresponda.</p>
<p>Los topes están expresados en UF, por lo que su valor en pesos cambia mensualmente. No debe publicarse un único monto en pesos como si fuera válido todo el año. Si la remuneración imponible supera 90 UF, pensión y salud se calculan hasta ese límite; cesantía puede seguir calculándose hasta 135,2 UF.</p>
<p>El excedente sobre el tope no se transforma en haber no imponible: sigue siendo remuneración, pero no genera esas cotizaciones por encima del máximo. El impuesto único utiliza sus propias reglas y no queda limitado a 90 UF.</p>

<h2>Cómo se calcula el impuesto único</h2>
<p>El impuesto único es progresivo. No se aplica la tasa máxima del tramo a toda la renta sin rebaja. La tabla mensual del SII expresa los límites en UTM y contempla una cantidad a rebajar. El primer tramo llega hasta 13,5 UTM y está exento; luego las tasas marginales son 4%, 8%, 13,5%, 23%, 30,4%, 35% y 40% según la base.</p>
<p>Como la UTM cambia cada mes, también cambia el límite en pesos. Para revisar una liquidación usa la circular o tabla del mes de pago, no una cifra aproximada copiada de otra fecha. Bonos, comisiones o una gratificación pueden hacer que un mes tenga impuesto aunque el sueldo base por sí solo esté bajo el límite.</p>
<p>La base tributable no es simplemente el total bruto. Primero se consideran las cotizaciones previsionales obligatorias aceptadas, respetando sus topes, y luego se aplica la tabla. APV y otros beneficios pueden cambiar el resultado bajo condiciones específicas.</p>

<h2>Ejemplo 1: $800.000 imponibles, Habitat y Fonasa</h2>
<p>Supuestos: contrato indefinido, remuneración imponible de $800.000, sin asignaciones no imponibles, AFP Habitat 1,27%, Fonasa, no pensionado y base bajo el tramo afecto a impuesto.</p>
<div class="numeric-example"><div class="numeric-example__title">Liquidación simplificada</div><ul><li>Pensión obligatoria 10%: $80.000</li><li>Comisión AFP 1,27%: $10.160</li><li>Salud 7%: $56.000</li><li>Seguro de Cesantía 0,6%: $4.800</li><li>Impuesto único: $0 bajo estos supuestos</li><li>Total descuentos: $150.960</li></ul><span class="total">Líquido estimado: $649.040</span></div>
<p>La conversión es 81,13%, pero no demuestra que todas las remuneraciones de $800.000 entreguen ese porcentaje. Con AFP Uno el líquido subiría $6.480 frente a Habitat; con un plan de Isapre de 3 UF o descuentos autorizados bajaría.</p>

<h2>Ejemplo 2: imponibles y no imponibles</h2>
<p>Supuestos: sueldo y bonos imponibles por $900.000, más $50.000 de movilización y $50.000 de colación que cumplen realmente carácter no imponible; AFP Uno, Fonasa, contrato indefinido y sin impuesto.</p>
<div class="numeric-example"><div class="numeric-example__title">Total haberes de $1.000.000</div><ul><li>Base imponible: $900.000</li><li>No imponibles: $100.000</li><li>Pensión 10%: $90.000</li><li>Comisión Uno 0,46%: $4.140</li><li>Salud 7%: $63.000</li><li>Cesantía 0,6%: $5.400</li><li>Total descuentos previsionales: $162.540</li></ul><span class="total">Líquido antes de otros descuentos: $837.460</span></div>
<p>Si alguien aplicara 18,06% a todo el millón obtendría otro resultado. La diferencia nace porque colación y movilización no entraron a la base. Si esos montos encubren remuneración y no compensan gastos reales, su clasificación puede ser fiscalizada.</p>

<h2>Gratificación: incluida no significa gratis</h2>
<p>En el sistema del artículo 50, la gratificación equivale al 25% de las remuneraciones del ejercicio con tope anual de 4,75 ingresos mínimos mensuales. Su determinación legal es anual, aunque muchas empresas pagan anticipos mensuales.</p>
<p>“$1.000.000 bruto incluida gratificación” significa que el total ofrecido ya incorpora esa línea; no es $1.000.000 más gratificación. El sueldo base debe respetar por sí mismo el ingreso mínimo aplicable y la estructura debe aparecer en contrato y liquidación. Revisa la <a href="/blog/como-funciona-gratificacion-legal">guía de gratificación 2026</a> para auditar el tope y los anticipos.</p>

<h2>Horas extra, bonos y comisiones</h2>
<p>Las horas extraordinarias, comisiones y bonos remuneracionales aumentan los haberes imponibles y pueden elevar cotizaciones e impuesto. El valor de hora extra se calcula sobre el sueldo, pero una vez devengado el sobresueldo se incorpora a la remuneración imponible del mes.</p>
<p>Una comisión variable no puede omitirse del imponible porque se pagó fuera de la fecha habitual. Si el empleador “líquida” un bono mediante transferencia separada sin registrarlo, conserva comprobantes y solicita la liquidación corregida.</p>

<h2>Otros descuentos que explican un líquido menor</h2>
<ul><li>Cuota o diferencia del plan de Isapre.</li><li>Crédito de caja de compensación.</li><li>Anticipos de sueldo.</li><li>Cuota sindical.</li><li>Ahorro previsional voluntario.</li><li>Pensión alimenticia ordenada judicialmente.</li><li>Descuentos autorizados por escrito dentro de los límites legales.</li><li>Ausencias o atrasos correctamente determinados.</li></ul>
<p>No todos tienen la misma prioridad ni límite. El artículo 58 regula descuentos obligatorios, autorizados y prohibidos. Un empleador no puede descontar unilateralmente pérdidas, herramientas o errores de caja sin fundamento y procedimiento.</p>

<h2>Cómo auditar tu liquidación</h2>
<ol class="steps"><li>Compara sueldo base, jornada y gratificación con el contrato.</li><li>Separa imponibles y no imponibles; cuestiona etiquetas inusuales.</li><li>Verifica la comisión de tu AFP en la fuente oficial del mes.</li><li>Aplica 10%, comisión, salud y cesantía a la base y tope correctos.</li><li>Confirma que aportes del empleador no reduzcan tu líquido.</li><li>Recalcula la base tributable y usa la tabla SII del mes.</li><li>Revisa horas extra, comisiones, bonos y ausencias.</li><li>Identifica cada descuento personal y su autorización.</li><li>Compara el líquido calculado con el depósito.</li><li>Guarda contrato, liquidación y comprobante; reclama por escrito la diferencia.</li></ol>

<h2>Qué conviene comparar al evaluar una oferta</h2>
<p>Pide una simulación con sueldo base, gratificación, bonos garantizados, asignaciones, jornada, AFP supuesta, sistema de salud y tipo de contrato. Distingue beneficios reales de reembolsos sujetos a rendición. Para comparar dos empleos, usa líquido anual esperado y no solo el mejor mes: bonos variables e impuesto pueden distorsionar una captura aislada.</p>
<p>Calcula tu caso con la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a> y revisa las comisiones con la <a href="/calculadoras/calculadora-comparador-afp">comparadora AFP</a>. Si la diferencia está en el costo de contratación, usa la <a href="/calculadoras/calculadora-costo-empleado-pyme">calculadora de costo empleador</a> sin mezclar aportes patronales con descuentos personales.</p>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con la información vigente de la <a href="https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9893.html" target="_blank" rel="noopener">Superintendencia de Pensiones sobre comisiones y SIS</a>, su comunicación oficial de <a href="https://www71.spensiones.cl/portal/institucional/594/articles-16921_recurso_1.pdf" target="_blank" rel="noopener">topes imponibles 2026</a>, el calendario de <a href="https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-10906.html" target="_blank" rel="noopener">cotización de cargo del empleador</a>, las <a href="https://www.sii.cl/normativa_legislacion/circulares/2026/indcir2026.htm" target="_blank" rel="noopener">tablas mensuales de impuesto único del SII</a> y los artículos 41, 42, 54 y 58 del Código del Trabajo. Las preguntas de comunidades se usaron para detectar confusiones entre “incluida gratificación”, costo empresa y líquido ofrecido; no como respaldo de tasas.</p>`,
  },
  {
    slug: 'guia-iva-chile-2026',
    title: 'Guía del IVA en Chile 2026: cómo calcularlo correctamente',
    description:
      'Guía completa sobre el IVA en Chile: qué es, cómo se calcula, quién lo paga, exenciones y cuándo aplica el 19%. Con ejemplos prácticos en CLP.',
    date: '2026-03-30',
    updatedAt: '2026-07-13',
    category: 'impuestos',
    readingTime: 14,
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
    content: `<p class="article-lead">Calcular 19% es la parte fácil del IVA. Lo difícil es determinar si la operación está gravada, qué documento corresponde, cuándo nace el débito y si una compra da derecho a crédito fiscal. Esta guía separa esas decisiones para evitar dos errores costosos: cobrar IVA donde existe una exención real o usar como crédito una factura que no cumple los requisitos.</p>

<h2>Qué es el IVA en Chile</h2>
<p>El Impuesto al Valor Agregado está regulado principalmente por el Decreto Ley N.º 825. Es un impuesto al consumo que se aplica, en términos generales, a ventas de bienes y prestaciones de servicios realizadas o utilizadas en Chile, además de importaciones y otros hechos que la ley equipara a una venta o servicio.</p>
<p>La tasa general vigente es <strong>19%</strong>. El vendedor o prestador afecto recarga el impuesto en la operación y lo incorpora a su débito fiscal. Quien compra para desarrollar una actividad afecta puede, bajo condiciones legales, utilizar el IVA soportado como crédito fiscal. El consumidor final no recupera ese impuesto y soporta económicamente el precio completo.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>No es una retención de honorarios</strong><p>La retención de una boleta de honorarios y el IVA son mecanismos diferentes. Una boleta de honorarios emitida por una persona natural por servicios personales normalmente no agrega 19%; aplica la retención o pago provisional correspondiente. Una boleta o factura de ventas y servicios afecta sí documenta IVA.</p></div></aside>

<h2>Cómo agregar o separar el 19%</h2>
<p>Si conoces el valor neto, el impuesto se calcula multiplicando por 0,19 y el total multiplicando por 1,19. Si solo conoces un precio final que ya incluye IVA, no debes restarle 19%: debes dividirlo por 1,19 para recuperar el neto.</p>
<ul><li><strong>IVA desde un neto:</strong> neto × 0,19.</li><li><strong>Total con IVA:</strong> neto × 1,19.</li><li><strong>Neto desde un total:</strong> total ÷ 1,19.</li><li><strong>IVA incluido:</strong> total − (total ÷ 1,19), equivalente a total × 19 ÷ 119.</li></ul>
<div class="numeric-example"><div class="numeric-example__title">Venta con precio neto de $100.000</div><ul><li>Neto: $100.000</li><li>IVA débito: $100.000 × 19% = $19.000</li><li>Total del documento: $119.000</li></ul><span class="total">El cliente paga $119.000</span></div>
<div class="numeric-example"><div class="numeric-example__title">Precio final de $100.000 con IVA incluido</div><ul><li>Neto: $100.000 ÷ 1,19 = $84.033,61</li><li>IVA incluido: $15.966,39</li><li>Redondeo del documento: según las reglas del sistema de emisión</li></ul><span class="total">No son $19.000 de IVA</span></div>
<p>Esta diferencia aparece a diario en cotizaciones. “$500.000 más IVA” significa $595.000 totales. “$500.000 IVA incluido” significa que el neto es aproximadamente $420.168. La oferta, orden de compra y factura deben expresar la misma convención.</p>

<h2>Débito fiscal, crédito fiscal y monto a pagar</h2>
<p>El débito fiscal reúne el IVA generado en las ventas y servicios afectos del período, con los ajustes que correspondan. El crédito fiscal es el IVA soportado en adquisiciones o servicios que cumplen los requisitos del artículo 23 y se relacionan con operaciones gravadas u otras que dan derecho a crédito.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo mensual simplificado</div><ul><li>Ventas netas: $2.000.000; débito fiscal: $380.000</li><li>Compras utilizables netas: $700.000; crédito fiscal: $133.000</li><li>Diferencia: $380.000 − $133.000 = $247.000</li></ul><span class="total">IVA determinado antes de otros ajustes: $247.000</span></div>
<p>Decir que la empresa “entera todo el IVA cobrado” omite el crédito fiscal. Tampoco todo IVA de compras se descuenta. Se debe contar con documentación tributaria válida, registrar la operación, vincularla al giro y respetar exclusiones. Gastos personales, operaciones ajenas a la actividad, documentos rechazados o adquisiciones destinadas a operaciones exentas pueden impedir o limitar el crédito.</p>
<p>Cuando existen simultáneamente ventas afectas y exentas puede corresponder una proporcionalidad del crédito de utilización común. No es correcto descontar el 100% sin clasificar el destino. En activos, vehículos, combustibles, supermercados y gastos con restricciones especiales, la revisión debe ser más cuidadosa.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Factura recibida no equivale a crédito automático</strong><p>Que el proveedor haya emitido una factura con IVA no resuelve si el comprador puede usarlo. Revisa la realidad de la operación, recepción del documento, relación con el giro, uso afecto o exento y restricciones del DL 825.</p></div></aside>

<h2>Cuándo una venta o servicio está afecto</h2>
<p>La calificación no se hace solo mirando el nombre comercial. Importan el hecho realizado, quién lo presta, dónde se presta o utiliza y si existe una exención expresa. Desde el 1 de enero de 2023, tras la Ley N.º 21.420, la definición de servicio dejó de depender de que la actividad estuviera en determinados números de la Ley sobre Impuesto a la Renta. Como regla general, las prestaciones remuneradas están afectas, salvo una exención aplicable.</p>
<p>Por eso “consultoría”, “desarrollo”, “marketing”, “mantención” o “asesoría” pueden tener tratamientos distintos según si los presta una persona natural con boleta de honorarios, una sociedad que cumple todos los requisitos de sociedad de profesionales o una empresa común. El tipo societario escrito en el nombre no basta.</p>

<h2>Exenciones: qué está verificado y qué no debe generalizarse</h2>
<p>Los artículos 12 y 13 del DL 825 contienen exenciones para operaciones y entidades determinadas. Una lista resumida sirve para orientarse, pero no reemplaza revisar el supuesto completo.</p>
<ul><li><strong>Servicios personales con boleta de honorarios:</strong> los ingresos del artículo 42 N.º 2 de la Ley sobre Impuesto a la Renta mantienen su tratamiento, por lo que una persona natural que presta personalmente el servicio no agrega IVA solo por esa prestación.</li><li><strong>Sociedades de profesionales:</strong> pueden estar exentas si cumplen condiciones sustantivas y de registro: sociedad de personas, objeto exclusivo profesional, socios habilitados que trabajan para ella y profesiones idénticas, afines o complementarias, entre otras. No basta constituir una SpA y llamarla “de profesionales”.</li><li><strong>Salud ambulatoria:</strong> la exención incorporada cubre prestaciones y procedimientos ambulatorios destinados a recuperar la salud, bajo los términos legales. No convierte en exento todo lo vendido por una clínica ni servicios con alojamiento, alimentación o componentes ajenos.</li><li><strong>Educación:</strong> la exención ampara ingresos de establecimientos educacionales por su actividad docente, con el alcance legal. Una capacitación comercial o una plataforma digital no queda exenta automáticamente por llamarse “curso”.</li><li><strong>Transporte de pasajeros y ciertas operaciones financieras o de seguros:</strong> existen exenciones específicas cuya redacción y sujeto deben comprobarse antes de facturar.</li><li><strong>Exportaciones:</strong> tienen reglas documentales y de calificación propias; en ciertos casos permiten recuperar IVA, por lo que no deben tratarse simplemente como una venta interna “sin impuesto”.</li></ul>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Los libros no tienen una exención general de IVA</strong><p>La venta de libros, diarios o revistas no debe incluirse en una lista general de exentos. En Chile, el hecho de que un producto sea cultural o educativo no elimina por sí solo el 19%.</p></div></aside>

<h2>Boleta, factura, documento exento y honorarios</h2>
<table><thead><tr><th>Documento</th><th>Uso típico</th><th>IVA</th></tr></thead><tbody><tr><td>Boleta de ventas y servicios afecta</td><td>Venta a consumidor final</td><td>Incluido en el total</td></tr><tr><td>Factura afecta</td><td>Operación entre contribuyentes o cuando procede factura</td><td>Neto e IVA separados</td></tr><tr><td>Boleta o factura no afecta o exenta</td><td>Operación cubierta por no afectación o exención</td><td>No agrega 19%</td></tr><tr><td>Boleta de honorarios electrónica</td><td>Servicio personal independiente de segunda categoría</td><td>No es IVA; opera retención o PPM</td></tr></tbody></table>
<p>Emitir un documento exento porque el cliente lo pidió no cambia la ley. Tampoco se corrige una operación afecta reemplazando la factura por una boleta de honorarios si la realidad corresponde a una empresa que vende servicios. El documento debe seguir al contribuyente y a la operación.</p>

<h2>Cuándo nace el débito y cómo afectan notas de crédito</h2>
<p>El momento en que se devenga el IVA depende del tipo de operación y de hechos como la emisión del documento, entrega del bien o percepción de la remuneración, según las reglas del artículo 9. No conviene asumir que siempre coincide con el abono bancario. En anticipos, servicios periódicos, importaciones o contratos de largo plazo se debe revisar el caso.</p>
<p>Una nota de crédito puede disminuir una venta por anulación, devolución, descuento u otra corrección admitida; una nota de débito puede aumentarla. No deben utilizarse para borrar una operación real ni alterar artificialmente un período. La referencia al documento original, el motivo y el registro contable deben ser coherentes.</p>

<h2>Formulario 29: plazo y revisión mensual</h2>
<p>El IVA se declara en el Formulario 29 por período tributario mensual. No existe un único “día 12” válido para todas las situaciones: el vencimiento cambia según si la declaración se presenta por internet, si existe pago, el medio utilizado y las extensiones vigentes. El SII publica un calendario tributario y contempla plazos diferentes, incluido un plazo posterior para determinadas declaraciones sin movimiento.</p>
<ol class="steps"><li>Concilia ventas, notas de crédito y débito con el Registro de Compras y Ventas.</li><li>Separa operaciones afectas, exentas, no afectas y exportaciones.</li><li>Revisa documentos recibidos y reclamos o aceptaciones pendientes.</li><li>Clasifica créditos utilizables, restringidos y de uso común.</li><li>Compara la propuesta del SII con tus documentos y contabilidad; no la aceptes sin revisar.</li><li>Incluye remanentes, ajustes y otros impuestos del F29 cuando correspondan.</li><li>Verifica el vencimiento exacto del mes en el calendario oficial antes de pagar.</li><li>Guarda respaldo de declaración, pago y conciliación.</li></ol>
<p>Aun sin ventas puede existir obligación de declarar. Omitir períodos genera observaciones y puede impedir trámites posteriores. Si descubriste un error después de enviar, la solución puede ser rectificar; no dupliques el ajuste en el mes siguiente sin determinar el procedimiento correcto.</p>

<h2>Errores que provocan diferencias con el SII</h2>
<ul><li>Restar 19% al precio final en vez de dividir por 1,19.</li><li>Confundir retención de honorarios con IVA.</li><li>Usar facturas personales o ajenas al giro como crédito.</li><li>Suponer que toda capacitación, salud o asesoría profesional es exenta.</li><li>Emitir documento exento sin acreditar el requisito legal.</li><li>No considerar una nota de crédito o registrarla en un período incorrecto.</li><li>Tratar la propuesta automática del F29 como una determinación infalible.</li><li>Aplicar el mismo vencimiento a todos los contribuyentes.</li></ul>

<h2>Cómo cotizar sin perder el margen</h2>
<p>Antes de enviar una cotización, indica expresamente “valor neto más IVA”, “IVA incluido” o “operación exenta”, según corresponda. Si tu precio objetivo disponible es $1.000.000 y la operación está afecta, cobrar $1.000.000 IVA incluido deja un neto aproximado de $840.336. La diferencia no es utilidad: corresponde al impuesto incorporado.</p>
<p>Calcula neto, IVA y total con la <a href="/calculadoras/calculadora-iva">calculadora de IVA</a>. Para distinguir IVA de la retención de independientes revisa la <a href="/guias/iva-boleta-honorarios-chile">guía de IVA y boleta de honorarios</a> y la <a href="/blog/boleta-honorarios-completo">guía práctica de boletas 2026</a>.</p>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con el <a href="https://www.bcn.cl/leychile/Navegar?idNorma=1210921" target="_blank" rel="noopener">texto vigente del DL 825 en Ley Chile</a>, la <a href="https://www.sii.cl/normativa_legislacion/circulares/2022/circu50.pdf" target="_blank" rel="noopener">Circular N.º 50 de 2022 del SII</a>, el especial oficial sobre <a href="https://www.sii.cl/destacados/iva_prestacion_servicios/" target="_blank" rel="noopener">IVA en la prestación de servicios</a> y las instrucciones del SII para <a href="https://www.sii.cl/siieduca/aprende-con-nosotros/docs/Declarar_Iva.pdf" target="_blank" rel="noopener">declarar IVA mediante F29</a>. Las dudas observadas en comunidades se usaron para priorizar ejemplos sobre precios con IVA y facturas rechazadas; no se utilizaron como fundamento tributario.</p>`,
  },
  {
    slug: 'todo-sobre-uf-chile',
    title: 'Todo sobre la UF en Chile: qué es y cómo se usa',
    description:
      'Guía completa sobre la Unidad de Fomento (UF) en Chile: qué es, cómo se actualiza, para qué se usa y cómo convertirla a pesos.',
    date: '2026-03-30',
    updatedAt: '2026-07-13',
    category: 'educacion-financiera',
    readingTime: 13,
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
    content: `<p class="article-lead">La Unidad de Fomento no es una moneda, una tasa de interés ni un cobro adicional: es una unidad de cuenta expresada en pesos que cambia con la inflación. Entender esa diferencia permite revisar correctamente un dividendo, un arriendo o una póliza y evita comparar montos de fechas distintas como si valieran lo mismo.</p>

<h2>Qué es la UF y por qué existe</h2>
<p>La <strong>Unidad de Fomento (UF)</strong> permite expresar una obligación en un valor que se reajusta con el Índice de Precios al Consumidor (IPC). El contrato conserva una cantidad fija de UF, mientras el equivalente en pesos cambia. Si una deuda es de 100 UF, seguirá siendo de 100 UF; lo que varía es cuántos pesos se necesitan para pagarla en una fecha determinada.</p>
<p>Su origen está en el <a href="https://www.bcn.cl/leychile/Navegar?idNorma=99246&idParte=9096971" target="_blank" rel="noopener">Decreto Supremo N.º 40 de 1967</a>. La norma introdujo las “unidades de fomento” para operaciones reajustables de instituciones financieras. El mecanismo fue modificado con el tiempo: hoy el Banco Central determina valores diarios usando la variación mensual del IPC informada por el Instituto Nacional de Estadísticas (INE).</p>
<ul class="data-grid"><li><span class="data-grid__label">UF al 13 de julio de 2026</span><span class="data-grid__value">$40.844,79</span></li><li><span class="data-grid__label">IPC junio 2026</span><span class="data-grid__value">0,0% mensual</span></li><li><span class="data-grid__label">Período de reajuste</span><span class="data-grid__value">Día 10 al día 9</span></li><li><span class="data-grid__label">Fuentes oficiales</span><span class="data-grid__value">BCCh, INE y SII</span></li></ul>
<p>El valor de $40.844,79 corresponde al 13 de julio de 2026 y se puede comprobar en la <a href="https://www.sii.cl/valores_y_fechas/uf/uf2026.htm" target="_blank" rel="noopener">tabla anual de UF del SII</a>. No debe copiarse ese valor para una operación de otra fecha. En una escritura, liquidación o contrato importa la fecha de conversión que las partes hayan definido.</p>

<h2>Cómo se calcula la UF, paso a paso</h2>
<p>El INE mide mensualmente el cambio de precios de una canasta representativa del consumo de los hogares urbanos. La canasta vigente tiene base anual 2023=100 y contiene bienes y servicios con distintas ponderaciones. El IPC no representa exactamente el gasto personal de cada hogar; es un indicador agregado y oficial.</p>
<p>Una vez publicado el IPC de un mes, el Banco Central distribuye esa variación mediante una tasa geométrica diaria. El ajuste se aplica <strong>desde el día 10 del mes siguiente hasta el día 9 del subsiguiente</strong>, ambos incluidos. Al terminar ese período, la variación acumulada de la UF coincide con el IPC mensual que sirvió de referencia.</p>
<ol class="steps">
<li>El INE observa precios y publica el IPC del mes terminado.</li>
<li>El Banco Central toma esa variación mensual, no el IPC acumulado del año.</li>
<li>La variación se distribuye entre todos los días calendario del período.</li>
<li>Se publican anticipadamente los valores diarios para convertir UF a pesos.</li>
</ol>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>La UF también tiene valor en sábados, domingos y festivos</strong><p>No se limita a días bancarios. La tabla oficial contiene un valor para cada día calendario. Puede repetirse cuando el IPC usado fue 0,0%, pero no porque sea fin de semana. En julio de 2026, por ejemplo, la UF quedó en $40.844,79 desde el día 9 debido al IPC de junio de 0,0%.</p></div></aside>
<p>El <a href="https://www.bcentral.cl/es/web/banco-central/preguntas-frecuentes" target="_blank" rel="noopener">Banco Central explica</a> tres escenarios: con IPC positivo la UF aumenta gradualmente; con IPC de 0,0% se mantiene; y con IPC negativo disminuye. Por eso es incorrecto afirmar que la UF siempre sube. En períodos deflacionarios puede bajar, aunque históricamente los aumentos sean más frecuentes.</p>

<h2>Qué ocurrió en junio y julio de 2026</h2>
<p>El <a href="https://www.ine.gob.cl/sala-de-prensa/prensa/general/noticia/2026/07/08/%C3%ADndice-de-precios-al-consumidor-%28ipc%29-de-junio-present%C3%B3-una-variaci%C3%B3n-mensual-de-0-0" target="_blank" rel="noopener">boletín del INE publicado el 8 de julio</a> informó que el IPC de junio fue 0,0% mensual, acumuló 2,8% durante 2026 y 4,3% en doce meses. Son tres mediciones distintas: la UF usa la variación <em>mensual</em> para el período diario siguiente; no suma de una vez la inflación anual.</p>
<p>Entre el 10 de junio y el 9 de julio la UF reflejó el IPC de mayo y avanzó desde $40.766,11 hasta $40.844,79. Desde el 10 de julio y hasta el 9 de agosto se mantiene en $40.844,79 porque la variación de junio fue cero. Este caso real muestra por qué conviene consultar la tabla y no estimar el valor a partir de un titular sobre inflación anual.</p>

<h2>Cómo convertir UF a pesos y pesos a UF</h2>
<p>La conversión no requiere una fórmula financiera compleja. Para pasar de UF a pesos se multiplica por el valor oficial del día. Para pasar de pesos a UF se divide por ese mismo valor. Mantén al menos dos decimales durante el cálculo y redondea los pesos solo al final, según lo que diga el documento o la institución.</p>
<div class="numeric-example"><div class="numeric-example__title">Conversiones al 13 de julio de 2026</div><ul><li>10 UF × $40.844,79 = <strong>$408.447,90</strong></li><li>50 UF × $40.844,79 = <strong>$2.042.239,50</strong></li><li>$1.000.000 ÷ $40.844,79 = <strong>24,4829 UF</strong></li><li>3.000 UF × $40.844,79 = <strong>$122.534.370</strong></li></ul><span class="total">El resultado cambia si cambia la fecha de conversión</span></div>
<p>Ejemplo práctico: un arriendo pactado en 10 UF no “sube de 10 a 10,1 UF” por inflación. Sigue en 10 UF. Lo que cambia es su pago en pesos. En cambio, un arriendo de $400.000 reajustable cada doce meses por IPC conserva su monto en pesos entre reajustes y aplica la variación acumulada cuando llega la fecha contractual.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Revisa qué día exige el contrato</strong><p>“UF del día de pago”, “UF del primer día del mes” y “UF del vencimiento” pueden producir resultados distintos. Si el documento no es claro, pide que la contraparte informe por escrito el valor y la fecha usados antes de pagar o firmar.</p></div></aside>

<h2>Dónde se usa la UF en Chile</h2>
<ul>
<li><strong>Créditos hipotecarios:</strong> capital y dividendos pueden expresarse en UF. La cuota en pesos cambia por la UF, además de los seguros u otros componentes definidos en el contrato.</li>
<li><strong>Arriendos:</strong> una renta fija en UF se convierte a pesos en cada vencimiento. No debe confundirse con un arriendo en pesos reajustable por IPC.</li>
<li><strong>Seguros:</strong> primas, deducibles y montos asegurados suelen fijarse en UF para conservar su valor real.</li>
<li><strong>Precios inmobiliarios:</strong> viviendas nuevas y usadas se publican frecuentemente en UF, lo que permite comparar valores reales entre fechas, pero obliga a convertir para conocer el desembolso en pesos.</li>
<li><strong>Topes, multas e indemnizaciones:</strong> distintas leyes usan UF. El número y la fecha aplicable dependen de cada norma; no existe un “tope UF” universal.</li>
<li><strong>Contratos de largo plazo:</strong> las partes pueden usar una unidad reajustable cuando necesitan proteger el poder adquisitivo del monto.</li>
</ul>

<h2>UF, IPC y UTM: no son equivalentes</h2>
<table><thead><tr><th>Indicador</th><th>Qué representa</th><th>Frecuencia</th><th>Uso habitual</th></tr></thead><tbody><tr><td>UF</td><td>Unidad de cuenta reajustada con IPC</td><td>Valor diario</td><td>Créditos, arriendos, seguros y topes</td></tr><tr><td>IPC</td><td>Variación de precios de una canasta</td><td>Publicación mensual</td><td>Medir inflación y reajustar contratos</td></tr><tr><td>UTM</td><td>Unidad tributaria mensual</td><td>Valor mensual</td><td>Impuestos, multas y trámites</td></tr></tbody></table>
<p>La UF utiliza el IPC como insumo, pero no es el IPC. La UTM también se reajusta, aunque tiene reglas y fines diferentes. Por eso no corresponde reemplazar una unidad por otra si el contrato o la ley identifica expresamente cuál debe aplicarse.</p>

<h2>Ventajas y costos de pactar en UF</h2>
<p>Para quien presta dinero o arrienda, la UF reduce el riesgo de que la inflación erosione el valor real de lo que recibirá. Para quien paga, hace visible el costo real del compromiso, pero introduce variación mensual en su flujo de caja en pesos. No es automáticamente “mejor” para todas las partes.</p>
<p>La frase “100 UF de hoy tendrán exactamente el mismo poder adquisitivo dentro de diez años” es demasiado absoluta. La UF sigue el IPC promedio y el gasto de una persona puede evolucionar de otra manera. También existen desfases: el IPC de un mes se incorpora durante el período siguiente. La formulación precisa es que la UF está diseñada para <strong>mantener una referencia de valor real ligada al IPC oficial</strong>.</p>
<p>En un crédito hipotecario, además, la UF no reemplaza los intereses. El saldo puede estar expresado en UF y a la vez devengar una tasa de interés. El dividendo en pesos puede cambiar por la conversión de UF, por seguros y por otras condiciones del contrato. Comparar solo la tasa o solo la cuota inicial no basta.</p>

<h2>Errores frecuentes al leer un monto en UF</h2>
<ol class="steps">
<li><strong>Usar el valor de hoy para una fecha pasada.</strong> Una escritura o multa puede exigir el valor vigente al día del acto, vencimiento o pago.</li>
<li><strong>Redondear antes de tiempo.</strong> Redondear cada factor puede generar diferencias relevantes en miles de UF.</li>
<li><strong>Creer que la UF siempre sube.</strong> Baja si el IPC mensual es negativo y se mantiene si es cero.</li>
<li><strong>Sumar IPC mensual de forma simple.</strong> Para un reajuste acumulado se deben comparar índices o componer variaciones; sumarlas puede distorsionar el resultado.</li>
<li><strong>Confundir reajuste con interés.</strong> La indexación conserva valor; el interés remunera el financiamiento. Pueden coexistir.</li>
<li><strong>Tomar una cifra de una noticia sin fecha.</strong> El valor oficial es diario y debe verificarse en una fuente institucional.</li>
</ol>

<h2>Checklist antes de firmar o pagar</h2>
<ul>
<li>Identifica la cantidad exacta de UF y si incluye o excluye IVA, seguros, gastos comunes u otros conceptos.</li>
<li>Confirma la fecha de conversión a pesos y la regla para días de pago atrasados.</li>
<li>Consulta el valor oficial en Banco Central o SII, no solo en un conversor comercial.</li>
<li>Guarda el contrato, la tabla consultada y el comprobante del cálculo.</li>
<li>En un crédito, revisa tasa, CAE, plazo, seguros, comisiones y costo total, no únicamente la UF.</li>
<li>En un arriendo, distingue entre renta en UF y renta en pesos con reajuste por IPC.</li>
</ul>
<p>Para comparar la UF con UTM, IPC y dólar, consulta la <a href="/guias/uf-utm-indicadores-chile">guía de indicadores chilenos</a>. Si ya conoces la fecha y el monto, usa la <a href="/calculadoras/calculadora-uf-clp">calculadora UF a CLP</a>; para una renta, revisa además la <a href="/calculadoras/calculadora-reajuste-arriendo">calculadora de reajuste de arriendo</a>.</p>

<h2>Fuentes y criterio de actualización</h2>
<p>Esta guía fue contrastada el 13 de julio de 2026 con la <a href="https://si3.bcentral.cl/estadisticas/Principal1/Metodologias/EMF/UF_IVP.pdf" target="_blank" rel="noopener">metodología de índices de reajustabilidad del Banco Central</a>, sus <a href="https://www.bcentral.cl/es/web/banco-central/preguntas-frecuentes" target="_blank" rel="noopener">preguntas frecuentes</a>, la <a href="https://www.sii.cl/valores_y_fechas/uf/uf2026.htm" target="_blank" rel="noopener">serie diaria 2026 del SII</a>, la <a href="https://www.ine.gob.cl/estadisticas-por-tema/precios-e-inflacion/indice-de-precios-al-consumidor" target="_blank" rel="noopener">página oficial del IPC</a> y el Decreto 40 conservado por BCN. Los valores diarios cambian; el método y las fuentes oficiales son la referencia para recalcular.</p>`,
  },
  {
    slug: 'boleta-honorarios-completo',
    title: 'Guía completa de boleta de honorarios en Chile 2026',
    description:
      'Todo sobre la boleta de honorarios: retención 15,25%, cómo emitirla, monto líquido y obligaciones tributarias para independientes.',
    date: '2026-03-30',
    updatedAt: '2026-07-13',
    category: 'impuestos',
    readingTime: 14,
    relatedGuia: 'iva-boleta-honorarios-chile',
    keywords: [
      'boleta honorarios',
      'retención 15.25%',
      'honorarios Chile',
      'independientes SII',
      'impuesto profesionales',
      'ley 21.133',
    ],
    relatedCalculators: [
      'calculadora-boleta-honorarios',
      'calculadora-operacion-renta',
      'calculadora-ppm',
    ],
    content: `<p class="article-lead">En 2026 la retención de una boleta de honorarios es 15,25% del monto bruto. Ese porcentaje es un pago provisional de impuesto que ayuda a financiar cotizaciones en la Operación Renta; no se divide jurídicamente en “10% de impuesto” y “5,25% previsional”. La liquidación real se hace al año siguiente con todos los ingresos, gastos, retenciones y reglas previsionales.</p>

<h2>Qué es una boleta de honorarios electrónica</h2>
<p>Es el documento tributario utilizado por personas que obtienen rentas de segunda categoría por servicios prestados de manera independiente. Identifica al emisor, receptor, fecha, descripción, monto bruto, retención o pago provisional y monto líquido. Se genera en el sistema del Servicio de Impuestos Internos.</p>
<p>Que exista una boleta no decide por sí solo si hay relación laboral. Si en los hechos existe subordinación y dependencia —horario impuesto, instrucciones, control, continuidad y otras señales—, usar honorarios puede encubrir un contrato de trabajo. La calificación depende de la realidad de la prestación, no solo del documento tributario.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Boleta de honorarios y boleta de ventas son documentos distintos</strong><p>La primera corresponde a rentas por servicios independientes de segunda categoría. La boleta de ventas y servicios documenta operaciones afectas o exentas de IVA de un negocio de primera categoría. No deben intercambiarse por conveniencia.</p></div></aside>

<h2>Retención vigente en 2026: 15,25%</h2>
<p>La Ley N.º 21.133 estableció un aumento gradual. El <a href="https://www.sii.cl/destacados/boletas_honorarios/" target="_blank" rel="noopener">SII confirmó</a> que desde el 1 de enero hasta el 31 de diciembre de 2026 la tasa es 15,25%:</p>
<table><thead><tr><th>Año de emisión</th><th>Retención o PPM</th><th>Cambio anual</th></tr></thead><tbody><tr><td>2025</td><td>14,50%</td><td>+0,75 punto</td></tr><tr><td><strong>2026</strong></td><td><strong>15,25%</strong></td><td>+0,75 punto</td></tr><tr><td>2027</td><td>16,00%</td><td>+0,75 punto</td></tr><tr><td>2028</td><td>17,00%</td><td>+1,00 punto</td></tr></tbody></table>
<div class="numeric-example"><div class="numeric-example__title">Boleta por $500.000 brutos en 2026</div><ul><li>Monto bruto: $500.000</li><li>Retención: $500.000 × 15,25% = $76.250</li><li>Líquido: $500.000 − $76.250 = $423.750</li></ul><span class="total">El receptor paga $423.750 y retiene $76.250</span></div>
<p>La cifra retenida no es el impuesto anual definitivo. Funciona como crédito o pago provisional. En la declaración anual se compara con el impuesto que resulte y con las cotizaciones obligatorias. Puede haber devolución, cero devolución o saldo por pagar.</p>

<h2>El error de separar 10% y 5,25%</h2>
<p>La tasa de 15,25% no contiene dos bolsillos predeterminados en cada boleta. Su aumento se diseñó para que las retenciones alcancen progresivamente a financiar protección social, pero la asignación efectiva ocurre en la Operación Renta según el régimen previsional y la situación de cada persona.</p>
<p>Por eso una boleta de $500.000 no prueba que exactamente $50.000 sean impuesto y $26.250 cotizaciones. El impuesto anual depende del Global Complementario, gastos y otros ingresos. Las cotizaciones dependen de renta imponible anual, topes, afiliación, cobertura y excepciones.</p>

<h2>Quién retiene y quién declara el PPM</h2>
<p>Al emitir, el sistema ofrece dos alternativas:</p>
<ol class="steps"><li><strong>El receptor retiene:</strong> una empresa o entidad obligada descuenta 15,25%, paga el líquido al emisor y entera la retención al Fisco. El emisor no declara ese PPM mensual.</li><li><strong>El emisor paga PPM:</strong> cuando el receptor no retiene, el independiente recibe el bruto y debe declarar y pagar 15,25% mediante Formulario 29.</li></ol>
<p>La <a href="https://www.sii.cl/preguntas_frecuentes/boleta_honorario_electr/001_120_0889.htm" target="_blank" rel="noopener">pregunta frecuente del SII actualizada en enero de 2026</a> describe ambas opciones. No es suficiente asumir que “persona natural nunca retiene” o que “toda empresa siempre retiene” sin revisar el tipo de receptor y la opción correcta del sistema.</p>
<div class="numeric-example"><div class="numeric-example__title">Boleta sin retención del receptor</div><ul><li>Honorario bruto cobrado: $500.000</li><li>El cliente paga: $500.000</li><li>PPM a cargo del emisor: $76.250</li></ul><span class="total">Disponible después de reservar PPM: $423.750</span></div>
<p>Si recibes el bruto, no significa que ganaste más. Reserva el PPM antes de usar el dinero y verifica el vencimiento mensual del F29. Pagar tarde puede generar reajustes, intereses y multas.</p>

<h2>Cuándo emitir la boleta</h2>
<p>La guía de nuevos contribuyentes del SII indica que debe emitirse al momento del pago del servicio y admite hasta 90 días posteriores a ese pago. Para una gestión ordenada y comprobable, conviene emitir cuando se percibe el honorario y no acumular documentos al cierre del año.</p>
<p>La fecha importa porque determina el año tributario, la tasa aplicable y la información que recibirá el SII. Una prestación realizada en diciembre pero pagada y documentada en enero puede tener tratamiento temporal distinto; revisa el criterio de percepción y tus contratos.</p>

<h2>Cómo emitir paso a paso</h2>
<ol class="steps"><li>Realiza inicio de actividades de segunda categoría y registra una actividad económica coherente con el servicio.</li><li>Ingresa a SII.cl con Clave Tributaria o ClaveÚnica.</li><li>Abre Servicios online → Boletas de honorarios electrónicas → Emisor.</li><li>Elige boleta, identifica al receptor y describe concretamente el servicio.</li><li>Indica monto bruto y selecciona quién efectuará la retención o PPM.</li><li>Revisa RUT, fecha, tasa y líquido antes de confirmar.</li><li>Descarga y guarda el documento junto con contrato, orden de compra y comprobante de pago.</li></ol>
<p>Evita descripciones vacías como “servicios varios”. Una descripción útil facilita acreditar qué se hizo, en qué período y para qué cliente. No incluyas datos personales innecesarios o sensibles.</p>

<h2>Cómo calcular desde un líquido acordado</h2>
<p>Si acordaste recibir una suma líquida y el receptor retiene 15,25%, no debes dividir el líquido por 0,1525. La parte que recibes representa 84,75% del bruto:</p>
<ul><li>Bruto = líquido ÷ 0,8475.</li><li>Retención = bruto × 0,1525.</li></ul>
<div class="numeric-example"><div class="numeric-example__title">Quiero recibir $500.000 líquidos</div><ul><li>Bruto: $500.000 ÷ 0,8475 = $589.970,50</li><li>Retención: $589.970,50 × 15,25% = $89.970,50</li><li>Líquido: $500.000</li></ul><span class="total">Boleta bruta, redondeada: $589.971</span></div>
<p>El redondeo del sistema puede producir un peso de diferencia. Si cotizas un proyecto, especifica si el precio ofrecido es bruto o líquido; “$500.000 por el trabajo” es ambiguo.</p>

<h2>Operación Renta: el desfase que debes entender</h2>
<p>Las boletas emitidas durante 2026 se incorporan, por regla general, en la <strong>Operación Renta 2027</strong>. La Operación Renta 2026 que se realizó en abril consideró ingresos y retenciones de 2025. Mezclar año calendario con año tributario lleva a proyectar mal la devolución.</p>
<p>En el Formulario 22 se consolidan honorarios, otros ingresos, retenciones, créditos y gastos. El impuesto resultante se calcula con la escala anual correspondiente. Las retenciones se imputan contra obligaciones tributarias y previsionales conforme al orden legal.</p>

<h2>Gastos presuntos o gastos efectivos</h2>
<p>Una persona natural de segunda categoría puede, cuando cumple los requisitos, rebajar gastos efectivos acreditados o usar la presunción de 30% de los ingresos brutos, con tope de 15 UTA. No se aplican ambos métodos a la misma base como si fueran acumulables.</p>
<p>En el Año Tributario 2026 el SII publicó un tope de 15 UTA equivalente a $12.517.560. Para las rentas obtenidas durante 2026 el valor en pesos se determinará con la UTA que corresponda al cierre del período, por lo que no debe copiarse el tope del AT 2026 a la declaración 2027.</p>
<p>Gastos efectivos exigen respaldo y relación con la generación de renta. Una compra personal no se transforma en gasto aceptado por haberse pagado desde la misma cuenta bancaria.</p>

<h2>Cotizaciones obligatorias para independientes</h2>
<p>La Ley N.º 21.133 vinculó la cotización anual de honorarios con la Operación Renta. La renta imponible anual se calcula, en términos generales, sobre 80% de las rentas brutas por honorarios del año anterior, con topes y reglas particulares. El SII determina montos y Tesorería transfiere a las instituciones previsionales.</p>
<p>La cobertura puede involucrar pensión, salud, Seguro de Invalidez y Sobrevivencia, accidentes del trabajo y enfermedades profesionales, y Seguro SANNA. No corresponde afirmar que la diferencia entre 10% y 15,25% se reparte directamente entre AFP, Fonasa y mutual.</p>
<p>La Subsecretaría de Previsión Social informa para 2026 dos opciones del período transitorio:</p>
<ul><li><strong>Cobertura total:</strong> cotiza sobre 100% de la renta imponible anual para obtener cobertura completa.</li><li><strong>Cobertura parcial:</strong> en 2026 cotiza salud y pensiones sobre 80% de la renta imponible anual, con menor cobertura; ATEP, SANNA y SIS mantienen reglas de cobertura total sobre la base señalada.</li></ul>
<p>La cobertura derivada de la Operación Renta se extiende normalmente desde el 1 de julio hasta el 30 de junio siguiente. La elección afecta licencias médicas, protección maternal y ahorro previsional; no debe decidirse solo para maximizar una devolución.</p>

<h2>Excepciones y situaciones que requieren revisión</h2>
<p>No todas las personas que emiten honorarios terminan con idéntica obligación previsional. Edad, pensión, afiliación, monto anual, cotizaciones simultáneas como dependiente y regímenes especiales pueden modificar el resultado. La plataforma del SII propone el cálculo, pero el contribuyente debe revisar antecedentes.</p>
<p>Si trabajas además con contrato, las remuneraciones dependientes y honorarios pueden combinarse para topes previsionales e impuesto anual. Si el cliente es extranjero, el servicio se presta fuera de Chile o existe retención en otro país, se requiere un análisis tributario específico.</p>

<h2>Anulación y corrección de errores</h2>
<p>Si emitiste con RUT, monto o receptor incorrecto, no reemplaces el PDF manualmente. Usa las opciones de anulación del SII y conserva la trazabilidad. La aceptación del receptor puede ser necesaria según el tipo y momento de la anulación. Si el pago ya ocurrió, coordina la corrección contable y tributaria con la contraparte.</p>
<p>Revisa mensualmente el registro de boletas emitidas y retenciones. Esperar hasta abril dificulta corregir documentos y acreditar pagos.</p>

<h2>Boleta no significa ausencia de derechos laborales</h2>
<p>En foros chilenos es frecuente la pregunta “¿pueden obligarme a boletear si tengo jefe y horario?”. La respuesta no se obtiene calculando retención. Si existe subordinación y dependencia, la Dirección del Trabajo o los tribunales pueden reconocer una relación laboral y sus efectos, aunque las partes hayan llamado “honorarios” al contrato.</p>
<p>Guarda correos, instrucciones, horarios, accesos, comprobantes y continuidad de pagos. Para organismos públicos existen reglas y jurisprudencia propias; busca asesoría antes de asumir que todo honorario genera automáticamente un contrato indefinido.</p>

<h2>Checklist mensual del independiente</h2>
<ul><li>Emitir por el servicio efectivamente pagado y con descripción verificable.</li><li>Confirmar si retiene el receptor o paga PPM el emisor.</li><li>Separar dinero para PPM, impuesto anual y cotizaciones.</li><li>Guardar contratos, boletas, pagos y gastos aceptables.</li><li>Conciliar boletas anuladas y retenciones en el portal SII.</li><li>Proyectar ingresos acumulados y no confundir líquido con utilidad disponible.</li><li>Revisar previsión y cobertura antes de la Operación Renta.</li></ul>

<p>Calcula un bruto o líquido con la <a href="/calculadoras/calculadora-boleta-honorarios">calculadora de boleta de honorarios</a>. Para la relación con IVA, PPM y declaración anual revisa la <a href="/guias/iva-boleta-honorarios-chile">guía tributaria de independientes</a> y la <a href="/calculadoras/calculadora-operacion-renta">calculadora de Operación Renta</a>.</p>

<h2>Fuentes consultadas</h2>
<p>Contenido actualizado al 13 de julio de 2026 con el <a href="https://www.sii.cl/destacados/boletas_honorarios/" target="_blank" rel="noopener">especial de boletas 2026 del SII</a>, sus <a href="https://www.sii.cl/ayudas/nuevos_contribuyentes/boleta-honorarios.html" target="_blank" rel="noopener">instrucciones para nuevos contribuyentes</a>, el Formulario 22 e instrucciones de Renta 2026, y la información de la <a href="https://previsionsocial.gob.cl/ley-honorarios/preguntas-frecuentes/" target="_blank" rel="noopener">Subsecretaría de Previsión Social</a>. Las consultas de comunidades se usaron para identificar dudas sobre bruto/líquido y falsa dependencia, no como fuente normativa.</p>`,
  },
  {
    slug: 'guia-horas-extra-chile',
    title: 'Guía completa de horas extra en Chile 2026',
    description:
      'Todo sobre horas extraordinarias en Chile: recargo 50%, tope máximo, cómo calcular el valor hora extra y qué dice el Código del Trabajo.',
    date: '2026-03-30',
    updatedAt: '2026-07-13',
    category: 'laboral',
    readingTime: 15,
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
    content: `<p class="article-lead">Desde el 26 de abril de 2026 la jornada ordinaria máxima general es de 42 horas semanales. Ese cambio elevó el valor de la hora extraordinaria para muchos sueldos mensuales, pero no creó un recargo automático de 100% para domingos ni autorizó jornadas ilimitadas. Para revisar un pago hay que separar jornada pactada, horas registradas, base salarial y recargo.</p>

<h2>Qué cuenta como hora extraordinaria</h2>
<p>El artículo 30 del Código del Trabajo define como jornada extraordinaria la que excede del máximo legal o del máximo pactado si este es menor. En 2026 el límite general es de 42 horas semanales; bajará a 40 horas el 26 de abril de 2028. Si el contrato pacta 40 horas en 2026, el análisis no comienza recién en 42: se compara con la jornada ordinaria pactada.</p>
<p>La existencia de una hora extra no depende únicamente de marcar después de la salida programada un día aislado. La Dirección del Trabajo indica que, como regla, debe terminar la semana para sumar el registro y determinar si se excedió la jornada semanal legal o convencional. Dentro de esa misma semana pueden incidir atrasos o inasistencias. Cuando la semana cruza dos meses, las eventuales horas extraordinarias se determinan al terminarla y se pagan en el mes en que concluyó.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No todo tiempo adicional es una hora extra pagable</strong><p>Quedarse voluntariamente sin trabajar, llegar antes por conveniencia o compensar un permiso bajo los requisitos legales no produce el mismo resultado. Sí puede existir hora extraordinaria sin pacto escrito cuando el exceso fue trabajado con conocimiento del empleador.</p></div></aside>

<h2>Requisitos del pacto y límite diario</h2>
<p>Las horas extraordinarias solo pueden pactarse para atender necesidades o situaciones temporales de la empresa. El pacto debe constar por escrito, describir esa necesidad y tener una vigencia transitoria no superior a tres meses. Puede renovarse por acuerdo de las partes si subsiste una situación temporal; no corresponde convertirlo en una cláusula anual genérica que normalice una dotación permanentemente insuficiente.</p>
<p>El artículo 31 permite trabajar hasta <strong>dos horas extraordinarias por día</strong> en faenas que, por su naturaleza, no perjudiquen la salud. No existe una regla general que permita elevar ese máximo a cuatro horas diarias mediante una autorización común de la DT. Los regímenes excepcionales de distribución y determinadas actividades tienen normas propias, pero no deben trasladarse a cualquier contrato.</p>
<p>Aunque falte el documento, el inciso segundo del artículo 32 reconoce como extraordinarias las horas trabajadas en exceso con conocimiento del empleador. Correos, mensajes, turnos, accesos, conexión a sistemas, geolocalización y el registro de asistencia pueden ser evidencia. El punto central es probar trabajo efectivo y conocimiento, no solo presencia.</p>

<h2>El recargo legal es 50%, no 100% automático</h2>
<p>La regla general es pagar cada hora extraordinaria con un recargo mínimo de <strong>50% sobre el sueldo convenido para la jornada ordinaria</strong>. Un contrato o instrumento colectivo puede establecer un porcentaje mayor. Si no existe sueldo convenido, o es inferior al ingreso mínimo mensual aplicable, el ingreso mínimo sirve como base para el recargo conforme al artículo 32.</p>
<p>Trabajar un domingo, festivo o de noche no duplica automáticamente el valor de la hora en todos los empleos. Puede existir descanso compensatorio, recargo sectorial, cláusula contractual o una regla especial para comercio u otra actividad. Para la hora extraordinaria común, el piso del Código sigue siendo 50%. Afirmar 100% sin leer el contrato y el régimen de jornada es incorrecto.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>El cálculo usa sueldo, no todo el bruto</strong><p>La base legal del sobresueldo es el sueldo. Bonos, comisiones, gratificación, colación o movilización no se suman automáticamente para obtener el valor hora. El resultado puede ser distinto si el contrato o convenio fijó una base más favorable.</p></div></aside>

<h2>Fórmula oficial para sueldo mensual y jornada de 42 horas</h2>
<p>La consulta oficial de la DT actualizada el 28 de abril de 2026 entrega el procedimiento para una persona con sueldo mensual y 42 horas semanales:</p>
<ol class="steps"><li>Divide el sueldo mensual por 30.</li><li>Multiplica el resultado por 28 para llevarlo a una referencia de cuatro semanas.</li><li>Divide por 168, que corresponde a 42 horas × 4 semanas.</li><li>Multiplica la hora ordinaria por 1,5 para aplicar el recargo mínimo.</li></ol>
<p>El resultado abreviado es <strong>sueldo mensual × 0,0083333</strong>. Ese factor ya incorpora el recargo de 50% y solo corresponde a la jornada semanal de 42 horas. No debe reutilizarse sin ajuste para una jornada de 40, 44 o una jornada parcial.</p>
<div class="numeric-example"><div class="numeric-example__title">Sueldo mensual de $800.000 y jornada de 42 horas</div><ul><li>$800.000 ÷ 30 × 28 ÷ 168 = $4.444,44 por hora ordinaria</li><li>$4.444,44 × 1,5 = $6.666,67 por hora extra</li><li>Atajo: $800.000 × 0,0083333 ≈ $6.666,64</li><li>10 horas: aproximadamente $66.667 brutos</li></ul><span class="total">Valor referencial por hora extra: $6.667</span></div>
<p>El método “sueldo ÷ 30 ÷ 8” entrega $3.333 de hora extra en este ejemplo y es erróneo para la jornada semanal de 42 horas. Mezcla un valor diario calendario con ocho horas sin reconstruir correctamente la remuneración semanal.</p>

<h2>Trabajador con sueldo semanal</h2>
<p>Para una persona remunerada semanalmente y contratada por 42 horas, la DT indica dividir el sueldo semanal por 42 para obtener la hora ordinaria y multiplicar por 1,5. Esa operación da un factor directo de aproximadamente <strong>0,0357143</strong> sobre el sueldo semanal para cada hora extraordinaria.</p>
<div class="numeric-example"><div class="numeric-example__title">Sueldo semanal de $210.000</div><ul><li>Hora ordinaria: $210.000 ÷ 42 = $5.000</li><li>Hora extra: $5.000 × 1,5 = $7.500</li><li>4 horas extra: $30.000</li></ul><span class="total">Sobresueldo semanal bruto: $30.000</span></div>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Inconsistencia detectada en la consulta oficial</strong><p>La página de la DT actualizada el 29 de abril de 2026 publica también el atajo 0,0340909, pero ese factor no reproduce su propio ejemplo de 42 horas: corresponde a 1,5 ÷ 44. El procedimiento explicado y la aritmética para 42 horas entregan 0,0357143. Mientras la DT no corrija la página, conviene usar la división completa y conservar el cálculo.</p></div></aside>
<p>En remuneración diaria, por hora, trato o sistemas mixtos pueden intervenir reglas de sueldo mínimo y semana corrida. No conviene convertir una remuneración variable completa en “sueldo” sin revisar cómo está pactada.</p>

<h2>Jornadas menores, parciales y personas excluidas del límite</h2>
<p>Si la jornada pactada es inferior al máximo, la definición legal considera extraordinario el exceso sobre lo pactado. Sin embargo, el factor matemático depende de la distribución y forma de remuneración. Una jornada parcial tiene reglas específicas y no se resuelve con el factor de 42 horas.</p>
<p>Quienes están válidamente excluidos de la limitación de jornada por el artículo 22 no generan horas extraordinarias del mismo modo, porque no tienen una jornada controlada. Esa exclusión es excepcional: el nombre del cargo, el teletrabajo o una cláusula no bastan si en la práctica existe fiscalización superior inmediata o control de horario. Si hay turnos, marcación o instrucciones temporales rígidas, corresponde revisar la validez de la exclusión.</p>

<h2>Registro de asistencia y prueba</h2>
<p>El empleador debe controlar asistencia y determinar las horas de trabajo mediante un sistema legal. Al cierre de cada semana se suma el tiempo registrado. Una liquidación que paga una cifra redonda sin mostrar horas, valor unitario ni período dificulta comprobar el cálculo.</p>
<ol class="steps"><li>Guarda contrato, anexos y pacto de horas extraordinarias.</li><li>Obtén copias del registro de asistencia de cada semana discutida.</li><li>Marca la jornada pactada y su distribución diaria.</li><li>Identifica permisos, atrasos, licencias, festivos y descansos.</li><li>Suma el tiempo semanal, no solo los minutos positivos de cada día.</li><li>Calcula el valor con el sueldo y factor correspondientes.</li><li>Compara cantidad y monto con la liquidación y cotizaciones.</li><li>Solicita por escrito una corrección si existe diferencia.</li></ol>
<p>Las instrucciones por WhatsApp o correo pueden acreditar conocimiento, pero evita depender de una sola captura sin fecha, remitente y contexto. Descarga respaldos de acceso o turnos antes de perder la cuenta corporativa.</p>

<h2>Pago, imposiciones e impuesto</h2>
<p>Las horas extraordinarias deben liquidarse y pagarse junto con las remuneraciones ordinarias del período. Son remuneración imponible y tributable: aumentan la base para AFP, salud, seguro de cesantía e impuesto único, hasta los topes que correspondan. Por eso el monto líquido adicional será menor que el sobresueldo bruto.</p>
<p>El sobresueldo no integra la base de la indemnización legal por años de servicio porque el artículo 172 excluye expresamente las horas extraordinarias. Eso no significa que dejen de ser imponibles durante la relación laboral ni que puedan omitirse de la liquidación.</p>

<h2>Compensar horas extra con días de feriado</h2>
<p>La Ley N.º 21.561 permite acordar por escrito que las horas extraordinarias se compensen por días adicionales de feriado. Se pueden pactar hasta cinco días hábiles por cada anualidad del contrato y cada hora extra equivale a una hora y media de feriado, manteniendo el recargo.</p>
<p>Los días deben utilizarse dentro de los seis meses siguientes al ciclo en que se originaron. La persona trabajadora avisa con 48 horas de anticipación y la compensación se usa en días completos, no en horas o medios días. Si no se solicitan oportunamente, corresponde el pago en la remuneración del período respectivo según la regla informada por la DT. Si el pacto de horas extra no dice que serán compensadas, rige el pago normal.</p>
<p>Esto es distinto de trabajar para devolver un permiso. Las horas destinadas a compensar un permiso no se consideran extraordinarias solo si el trabajador lo solicitó por escrito y el empleador lo autorizó. Un descuento o compensación impuesta unilateralmente no cumple esa condición.</p>

<h2>Domingos, festivos y comercio</h2>
<p>En actividades exceptuadas del descanso dominical puede corresponder un descanso compensatorio por el domingo o festivo trabajado. Además, ciertos trabajadores del comercio tienen recargos y descansos especiales. La coincidencia de reglas no autoriza multiplicar mecánicamente cada hora por dos: primero se determina la remuneración ordinaria o especial del día, luego si hubo exceso extraordinario y qué convenio aplica.</p>
<p>Si tu contrato indica “50% adicional”, “100% festivo” o una cláusula colectiva mejor, esa condición puede superar el piso legal. Conserva el instrumento: la calculadora general solo estima el mínimo común y no sustituye el pacto más favorable.</p>

<h2>Errores frecuentes al revisar horas extra</h2>
<ul><li>Usar el total bruto en vez del sueldo como base.</li><li>Dividir el sueldo mensual por 30 y por ocho.</li><li>Aplicar el factor de 42 horas a una jornada distinta.</li><li>Suponer recargo de 100% para todo domingo o festivo.</li><li>Contar solo días con exceso sin cerrar la semana.</li><li>Dar por válido un pacto permanente o anual sin necesidad temporal.</li><li>Afirmar que la falta de pacto elimina horas conocidas por el empleador.</li><li>Compensar con tiempo libre sin acuerdo escrito ni equivalencia de 1,5.</li><li>Confundir una cláusula de artículo 22 con ausencia real de control.</li></ul>

<p>Estima el pago con la <a href="/calculadoras/calculadora-horas-extra">calculadora de horas extra</a> y revisa el cambio específico en la <a href="/blog/horas-extra-jornada-42-horas-chile-2026">guía de jornada de 42 horas</a>. Si el registro no coincide con la liquidación, solicita el detalle al empleador y presenta una consulta o denuncia ante la Dirección del Trabajo.</p>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con el <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">Código del Trabajo vigente en Ley Chile</a>, las fórmulas de la Dirección del Trabajo para <a href="https://www.dt.gob.cl/portal/1628/w3-article-95182.html" target="_blank" rel="noopener">sueldo mensual</a> y <a href="https://www.dt.gob.cl/portal/1628/w3-article-60191.html" target="_blank" rel="noopener">sueldo semanal</a>, su criterio sobre <a href="https://www.dt.gob.cl/portal/1628/w3-article-60176.html" target="_blank" rel="noopener">determinación semanal cuando cambia el mes</a> y los dictámenes sobre <a href="https://www.dt.gob.cl/legislacion/1624/w3-article-125738.html" target="_blank" rel="noopener">compensación por días adicionales de feriado</a>. Las consultas de trabajadores en foros se usaron para detectar dudas sobre marcación, festivos y mensajes fuera de horario; no como prueba normativa.</p>`,
  },
  {
    slug: 'como-funciona-gratificacion-legal',
    title: 'Cómo funciona la gratificación legal en Chile 2026',
    seoTitle: 'Tope de Gratificación Legal 2026 en Chile: cálculo y monto',
    seoDescription:
      'Conoce el tope de gratificación legal 2026 en Chile, cómo se calcula (25% con tope 4,75 IMM) y cuándo corresponde pagarla.',
    description:
      'Explicación clara de la gratificación legal: 25% de remuneración, tope 4,75 IMM, quién tiene derecho y cómo se calcula mensual o anualmente.',
    date: '2026-03-30',
    updatedAt: '2026-07-13',
    category: 'laboral',
    readingTime: 14,
    relatedGuia: 'sueldo-liquido-chile',
    keywords: [
      'gratificación legal',
      '25% remuneración',
      '4.75 IMM',
      'aguinaldo legal',
      'Art. 47 Código del Trabajo',
      'tope gratificación legal 2026',
      'nuevo tope gratificación 2026',
    ],
    relatedCalculators: [
      'calculadora-gratificacion-legal',
      'calculadora-sueldo-liquido',
      'calculadora-costo-empleado-pyme',
    ],
    faq: [
      {
        question: '¿Cuál es el tope de gratificación legal 2026 en Chile?',
        answer:
          'En el sistema del artículo 50, el tope anual es 4,75 ingresos mínimos mensuales vigentes al 31 de diciembre del ejercicio. Con el IMM de $553.553 vigente desde mayo de 2026, la referencia anual es $2.629.377 y su doceava parte es $219.115. El cálculo definitivo es anual: los anticipos mensuales deben reliquidarse y no garantizan por sí solos que cada mes corresponda exactamente a esa doceava parte.',
      },
      {
        question: '¿Cómo se calcula la gratificación legal?',
        answer:
          'En el sistema más usado (Art. 50 del Código del Trabajo), la gratificación equivale al 25% de la remuneración mensual con tope de 4,75 IMM anuales. Por ejemplo, con sueldo base de $600.000: 25% × $600.000 = $150.000, que está bajo el tope mensual de $219.115, así que se paga $150.000. Con sueldo de $1.500.000: 25% = $375.000, que excede el tope, así que se paga $219.115.',
      },
      {
        question: '¿Quién tiene derecho a gratificación legal?',
        answer:
          'No depende de ganar menos de 4,75 IMM ni de tener remuneración variable. La obligación nace cuando el empleador cumple los requisitos del artículo 47: establecimiento o empresa —o cooperativa— obligado a llevar contabilidad y con utilidad o excedente líquido en el ejercicio; además debe perseguir fines de lucro, salvo las cooperativas. El contrato o convenio puede establecer una gratificación convencional más favorable.',
      },
      {
        question: '¿La gratificación se paga mensual o anual?',
        answer:
          'La gratificación legal es anual. Las partes pueden pactar anticipos mensuales y el empleador debe hacer la liquidación definitiva, reajustar los anticipos y pagar una eventual diferencia a más tardar en abril del año siguiente. Es remuneración imponible y tributable. Su tratamiento en una indemnización depende de la forma y periodicidad del pago, por lo que no debe asumirse automáticamente.',
      },
    ],
    content: `<p class="article-lead">La gratificación legal no es un aguinaldo ni un bono reservado a quienes ganan menos. Es una remuneración anual vinculada a las utilidades del empleador y puede cumplirse mediante dos sistemas distintos. Para revisar una liquidación hay que saber qué modalidad aplica, qué remuneraciones entran en la base y cómo se reliquidaron los anticipos.</p>

<h2>Qué es la gratificación legal</h2>
<p>Los artículos 46 a 52 del Código del Trabajo regulan la gratificación. El artículo 47 obliga a determinados empleadores que obtienen utilidades o excedentes líquidos a gratificar anualmente a sus trabajadores. El artículo 50 ofrece una forma alternativa de cumplir esa obligación: pagar el 25% de las remuneraciones devengadas durante el ejercicio, con un límite individual de 4,75 ingresos mínimos mensuales.</p>
<p>La expresión “legal” distingue este beneficio de una gratificación convencional. Una empresa puede pactar en el contrato individual, un instrumento colectivo o una política incorporada al vínculo una condición más favorable. Ese pacto debe leerse antes de aplicar la regla mínima del Código.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No es lo mismo que aguinaldo</strong><p>El aguinaldo de Fiestas Patrias o Navidad tiene otro origen. En el sector privado solo es obligatorio si fue pactado o se transformó en una cláusula tácita conforme a las circunstancias. Pagar un aguinaldo no sustituye automáticamente la gratificación legal.</p></div></aside>

<h2>Cuándo nace la obligación del empleador</h2>
<p>La <a href="https://www.dt.gob.cl/portal/1628/w3-article-60156.html" target="_blank" rel="noopener">Dirección del Trabajo</a> resume cuatro requisitos del artículo 47:</p>
<ul><li>Debe tratarse de un establecimiento minero, industrial, comercial, agrícola, otra empresa o una cooperativa.</li><li>Debe perseguir fines de lucro, requisito que no se exige a las cooperativas.</li><li>Debe estar obligado a llevar libros de contabilidad.</li><li>Debe obtener utilidad o excedente líquido en el ejercicio anual correspondiente.</li></ul>
<p>No basta con que una empresa tenga ventas o dinero en caja. La “utilidad líquida” tiene una determinación tributaria específica y se conoce al cerrar el ejercicio. Tampoco todos los empleadores sin fines de lucro quedan sujetos al mismo régimen. Ante una fundación, corporación, persona natural o régimen contable especial, se debe revisar la situación concreta.</p>
<p>El derecho no depende de que el trabajador tenga sueldo variable o gane menos que el tope. Esa afirmación, repetida en resúmenes de internet, confunde el límite de pago del artículo 50 con los requisitos para ser beneficiario. Un trabajador con remuneración alta puede tener derecho; simplemente su pago bajo el artículo 50 puede quedar topado.</p>

<h2>Los dos sistemas legales</h2>
<table><thead><tr><th>Modalidad</th><th>Base</th><th>Límite individual</th><th>Resultado</th></tr></thead><tbody><tr><td>Artículo 47</td><td>Al menos 30% de utilidad o excedente líquido</td><td>No usa el tope 4,75 IMM</td><td>Se distribuye proporcionalmente a lo devengado</td></tr><tr><td>Artículo 50</td><td>25% de remuneraciones del ejercicio</td><td>4,75 IMM por trabajador</td><td>El menor entre 25% y tope aplicable</td></tr></tbody></table>
<p>En el sistema del artículo 47, el 30% de la utilidad líquida se reparte en proporción a las remuneraciones devengadas por cada trabajador. La <a href="https://www.dt.gob.cl/portal/1628/w3-article-60160.html" target="_blank" rel="noopener">DT describe el procedimiento</a>: se obtiene un factor al relacionar la bolsa a repartir con el total de remuneraciones anuales consideradas y luego se aplica ese factor a la remuneración anual individual.</p>
<p>En el artículo 50, el empleador queda eximido de repartir el 30% si paga el 25% de lo devengado por cada persona durante el ejercicio, sujeto al tope. El cálculo es individual: dos trabajadores pueden recibir cifras distintas por remuneraciones, meses trabajados o jornada parcial.</p>

<h2>Tope de gratificación 2026</h2>
<p>La Ley N.º 21.830 fijó desde el 1 de mayo de 2026 un ingreso mínimo mensual de <strong>$553.553</strong> para trabajadores mayores de 18 y hasta 65 años. En el sistema del artículo 50, la DT utiliza el IMM vigente al 31 de diciembre del ejercicio para determinar el límite definitivo.</p>
<div class="numeric-example"><div class="numeric-example__title">Referencia anual 2026, modalidad artículo 50</div><ul><li>IMM: $553.553</li><li>Tope: 4,75 × $553.553 = $2.629.376,75</li><li>Redondeado al peso: $2.629.377</li><li>Doceava parte referencial: $219.114,73</li></ul><span class="total">Referencia mensual redondeada: $219.115</span></div>
<p>La doceava parte es útil para anticipos regulares, pero el derecho es anual. Una liquidación no se valida solo comprobando que cada mes diga $219.115. Deben considerarse el ejercicio completo, las remuneraciones efectivamente devengadas, los reajustes de anticipos y las reglas de proporcionalidad.</p>

<h2>Cómo calcular el artículo 50 sin simplificaciones engañosas</h2>
<ol class="steps"><li>Suma las remuneraciones computables devengadas entre el 1 de enero y el 31 de diciembre, o durante el tiempo efectivamente trabajado.</li><li>Reajusta las remuneraciones cuando corresponda conforme al artículo 50 y la doctrina administrativa.</li><li>Calcula el 25% de la base anual.</li><li>Calcula el tope de 4,75 IMM vigente al 31 de diciembre, ajustándolo por tiempo trabajado o jornada parcial cuando proceda.</li><li>Compara ambos resultados: corresponde el menor bajo esta modalidad.</li><li>Resta los anticipos mensuales debidamente reajustados y paga la diferencia, si existe.</li></ol>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo anual sin alcanzar el tope</div><ul><li>Remuneraciones computables del año: $7.200.000</li><li>25%: $1.800.000</li><li>Tope de referencia: $2.629.377</li></ul><span class="total">Gratificación anual: $1.800.000</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo anual que supera el tope</div><ul><li>Remuneraciones computables del año: $18.000.000</li><li>25%: $4.500.000</li><li>Tope de referencia: $2.629.377</li></ul><span class="total">Gratificación anual topada: $2.629.377</span></div>

<h2>Qué remuneraciones entran en la base</h2>
<p>La guía de <a href="https://www.dt.gob.cl/portal/1626/w3-article-99034.html" target="_blank" rel="noopener">gratificación legal de la DT</a> indica que, para el artículo 50, se consideran las contraprestaciones en dinero y las adicionales en especie avaluables en dinero recibidas como retribución por los servicios: sueldo, sobresueldo por horas extraordinarias, comisiones, participaciones y bonos remuneracionales, entre otros.</p>
<p>No todo pago de la liquidación es remuneración. Asignaciones razonables de movilización o colación, viáticos y devoluciones de gastos pueden quedar fuera conforme al artículo 41, siempre que tengan realmente ese carácter. Poner una etiqueta no basta: si un “bono de movilización” encubre pago por el trabajo, su tratamiento puede discutirse.</p>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Revisa la base, no solo el sueldo base</strong><p>Aplicar 25% únicamente al sueldo base puede omitir comisiones, horas extra o bonos que sí son remuneración. Compara las liquidaciones del año y clasifica cada concepto antes de calcular.</p></div></aside>

<h2>Pago mensual: técnicamente es un anticipo</h2>
<p>La gratificación legal se determina anualmente. Las partes pueden convenir anticipos mensuales en el contrato individual o colectivo. La <a href="https://www.dt.gob.cl/portal/1628/w3-article-60164.html" target="_blank" rel="noopener">DT señala</a> que luego debe efectuarse una liquidación para comprobar si los anticipos reajustados cubren el monto legal y pagar las diferencias a más tardar en abril del año siguiente.</p>
<p>Por eso la línea “gratificación mensual” en una liquidación no elimina la revisión anual. Si el ingreso mínimo aumentó durante el año, hubo remuneraciones variables o los anticipos no fueron reajustados correctamente, puede existir diferencia.</p>
<p>Para la reliquidación, la <a href="https://www.dt.gob.cl/portal/1628/w3-article-60162.html" target="_blank" rel="noopener">consulta oficial sobre anticipos</a> instruye reajustar por IPC los pagos mes a mes, sumarlos y compararlos con la obligación definitiva calculada con 4,75 IMM al 31 de diciembre.</p>

<h2>Meses incompletos, ingreso durante el año y licencias</h2>
<p>Si la relación laboral no cubre todo el ejercicio, el tope anual se aplica proporcionalmente al tiempo trabajado. También se calcula sobre las remuneraciones efectivamente devengadas. Esto es distinto de faltar algunos días dentro de un mes: la DT ha señalado que una ausencia reduce naturalmente la base remuneratoria, pero no convierte el tope anual en un límite diario.</p>
<p>En licencias médicas existe una regla especial. Si la gratificación se paga anualmente, debe considerarse el subsidio percibido durante la licencia y el empleador paga el beneficio correspondiente. Si hay anticipos mensuales, la entidad pagadora del subsidio puede asumir el componente durante ese período según el caso. No conviene resolverlo restando meses completos sin revisar liquidaciones y certificados.</p>

<h2>Jornada parcial en 2026</h2>
<p>El artículo 40 bis B permite reducir el tope de 4,75 IMM según la relación entre las horas pactadas en una jornada parcial y la jornada ordinaria. Desde el 26 de abril de 2026, la jornada ordinaria máxima es de 42 horas semanales por la Ley de 40 Horas.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo referencial: contrato de 21 horas semanales</div><ul><li>Proporción: 21 ÷ 42 = 50%</li><li>Tope anual general: $2.629.377</li><li>Tope parcial: $2.629.377 × 50% = $1.314.688,50</li></ul><span class="total">Tope proporcional redondeado: $1.314.689</span></div>
<p>La reducción se refiere al límite máximo, no a negar el beneficio. Además, “jornada parcial” tiene una definición legal: no todo horario menor a 42 horas autoriza automáticamente prorratear el ingreso mínimo o el tope de la misma manera.</p>

<h2>Gratificación garantizada, convencional y cláusulas del contrato</h2>
<p>Una gratificación convencional puede ser garantizada —se paga aunque no haya utilidad, si así fue pactado— o depender de condiciones. Si el contrato promete una suma o fórmula más favorable, el empleador no puede sustituirla unilateralmente por el mínimo legal. También puede haber instrumentos colectivos con reglas propias.</p>
<p>Lee expresiones como “anticipo”, “garantizada”, “artículo 50”, “4,75 IMM” y “incluida en la remuneración ofrecida”. Una oferta de “$1.000.000 bruto incluida gratificación” no es igual a “sueldo base $1.000.000 más gratificación”. La liquidación debe ser coherente con la estructura escrita y con el ingreso mínimo aplicable al sueldo base.</p>

<h2>¿Qué ocurre si la empresa tuvo pérdidas?</h2>
<p>La existencia de utilidad se determina al cierre del ejercicio. La DT sostiene que, si no hubo utilidad líquida y los pagos eran solo anticipos de gratificación legal, puede discutirse su recuperación bajo reglas y límites específicos. No procede un descuento unilateral e ilimitado del sueldo o finiquito.</p>
<p>Si el beneficio fue pactado como garantizado, el resultado puede ser distinto porque la obligación contractual no depende de la utilidad. Ante un descuento, revisa el texto del contrato, la autorización escrita y los límites del artículo 58 antes de firmar el finiquito.</p>

<h2>Cómo auditar tu liquidación</h2>
<ol class="steps"><li>Confirma si tu empleador está sujeto a gratificación y qué modalidad declaró.</li><li>Reúne contrato, anexos, instrumento colectivo y doce liquidaciones.</li><li>Separa remuneraciones de asignaciones no remuneracionales.</li><li>Suma la base anual y calcula 25% si corresponde el artículo 50.</li><li>Comprueba el IMM vigente al 31 de diciembre y la proporcionalidad aplicable.</li><li>Lista cada anticipo, su reajuste y la eventual diferencia.</li><li>Verifica cotizaciones e impuesto en las liquidaciones.</li><li>Solicita por escrito el detalle si la empresa solo entrega una cifra final.</li></ol>
<p>La gratificación es remuneración imponible y tributable. Afecta el sueldo líquido porque aumenta la base de cotizaciones e impuesto cuando corresponda. Su inclusión en una indemnización por término no debe afirmarse en bloque: depende de si el pago es mensual, anual, esporádico o garantizado y de las reglas del artículo 172.</p>

<h2>Errores frecuentes</h2>
<ul><li>Decir que solo tienen derecho quienes ganan menos de 4,75 IMM.</li><li>Aplicar 25% únicamente al sueldo base.</li><li>Confundir la doceava parte del tope con el cálculo legal definitivo.</li><li>Usar el ingreso mínimo de enero cuando la ley exige el vigente al 31 de diciembre.</li><li>No reajustar anticipos al hacer la liquidación anual.</li><li>Prorratear el tope por algunos días de ausencia como si fuera diario.</li><li>Confundir gratificación con aguinaldo o bono voluntario.</li><li>Suponer que toda empresa está obligada, incluso sin utilidad o sin los requisitos del artículo 47.</li></ul>

<p>Para estimar una situación concreta usa la <a href="/calculadoras/calculadora-gratificacion-legal">calculadora de gratificación legal</a> y contrasta el resultado con la <a href="/guias/sueldo-liquido-chile">guía de sueldo líquido</a>. Si existe controversia sobre utilidades, descuentos o cláusulas, presenta una consulta ante la Dirección del Trabajo o busca asesoría laboral.</p>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con el <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">Código del Trabajo en BCN</a>, la guía temática y consultas de la Dirección del Trabajo sobre artículos 47 y 50, la <a href="https://www.bcn.cl/leychile/navegar?idNorma=1225354" target="_blank" rel="noopener">Ley N.º 21.830</a> sobre ingreso mínimo y dictámenes sobre anticipos, jornada parcial y períodos incompletos. Las preguntas observadas en foros se utilizaron para detectar confusiones comunes, no como evidencia legal.</p>`,
  },
  {
    slug: 'calcular-indemnizacion-por-anos',
    title: 'Cómo calcular la indemnización por años de servicio',
    description:
      'Guía para calcular la indemnización: 30 días por año, tope 11 años, base 90 UF. Cuándo corresponde y cuándo no. Art. 163 Código del Trabajo.',
    date: '2026-03-30',
    updatedAt: '2026-07-13',
    category: 'laboral',
    readingTime: 16,
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
    content: `<p class="article-lead">La indemnización por años de servicio no se paga por cualquier término de contrato ni se calcula solo con el sueldo base. La causal, la antigüedad, la última remuneración mensual y dos topes legales cambian el resultado. También hay que separar esta indemnización del aviso previo, vacaciones, recargos judiciales y nulidad del despido.</p>

<h2>Qué es la indemnización por años de servicio</h2>
<p>El artículo 163 del Código del Trabajo establece una indemnización equivalente a treinta días de la última remuneración mensual por cada año de servicio y fracción superior a seis meses prestados continuamente al mismo empleador. Para los contratos iniciados desde el 14 de agosto de 1981, el límite general es 330 días de remuneración, equivalente a once años.</p>
<p>No es un ahorro que se acumule y pueda retirarse al finalizar cualquier relación laboral. La obligación legal ordinaria nace cuando el empleador termina un contrato de al menos un año invocando las causales del artículo 161: necesidades de la empresa, establecimiento o servicio, o desahucio en los casos en que la ley permite usarlo. También puede surgir por sentencia si otra causal fue declarada injustificada, indebida o improcedente.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Legal y pactada no son lo mismo</strong><p>Un contrato individual, colectivo o acuerdo de salida puede reconocer una indemnización convencional más favorable o pagadera en otras causales. En ese caso hay que aplicar el pacto válido, no asumir que todos los términos tienen la cobertura mínima del artículo 163.</p></div></aside>

<h2>Cuándo corresponde y cuándo no</h2>
<table><thead><tr><th>Forma de término</th><th>Regla general sobre años de servicio</th></tr></thead><tbody><tr><td>Necesidades de la empresa, art. 161</td><td>Corresponde si el contrato duró un año o más</td></tr><tr><td>Desahucio del empleador, cuando procede</td><td>Corresponde bajo el art. 163</td></tr><tr><td>Renuncia, art. 159 N.º 2</td><td>No corresponde legalmente, salvo pacto</td></tr><tr><td>Mutuo acuerdo, art. 159 N.º 1</td><td>Solo la suma que las partes acuerden</td></tr><tr><td>Vencimiento del plazo, art. 159 N.º 4</td><td>No corresponde por la sola causal</td></tr><tr><td>Conclusión del trabajo, art. 159 N.º 5</td><td>No corresponde por la sola causal</td></tr><tr><td>Caso fortuito o fuerza mayor, art. 159 N.º 6</td><td>No corresponde por la sola causal</td></tr><tr><td>Causal disciplinaria del art. 160</td><td>No corresponde si está bien aplicada; puede ordenarse si un tribunal la declara indebida</td></tr></tbody></table>
<p>La fuerza mayor exige un hecho inimputable, imprevisible e irresistible. Aunque una situación cumpla esos requisitos, el artículo 159 N.º 6 no concede automáticamente indemnización legal por años. Si la causal fue aplicada sin cumplirlos, el trabajador puede impugnarla judicialmente y el resultado cambia solo con el acuerdo o sentencia correspondiente.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>“Me despidieron” no basta para calcular</strong><p>Obtén la carta de término y verifica el artículo y numeral exactos. Dos personas con igual sueldo y antigüedad pueden recibir resultados distintos si una fue despedida por el artículo 161 y la otra por vencimiento de plazo.</p></div></aside>

<h2>Paso 1: contar años y la fracción</h2>
<p>Se cuenta el servicio continuo al mismo empleador desde el inicio del vínculo hasta la separación. Cada año completo vale treinta días. Solo una <strong>fracción superior a seis meses</strong> se redondea a un año adicional. Seis meses exactos no superan el umbral; seis meses y un día sí.</p>
<ul><li>3 años y 5 meses: se pagan 3 años.</li><li>3 años y 6 meses exactos: se pagan 3 años.</li><li>3 años, 6 meses y 1 día: se pagan 4 años.</li><li>10 años y 8 meses: se pagan 11 años.</li><li>14 años en un contrato iniciado en 2012: opera el tope general de 11 años.</li></ul>
<p>Licencias, feriado y otros períodos en que el contrato continúa vigente no borran la antigüedad. Si hubo finiquitos, cambio real de empleador, continuidad laboral discutida o transferencia de empresa, se necesita revisar documentos y la aplicación del artículo 4.</p>

<h2>Paso 2: determinar la última remuneración mensual</h2>
<p>El artículo 172 define una base más amplia que el sueldo base: comprende toda cantidad que la persona esté percibiendo por la prestación de sus servicios al terminar el contrato, incluidas cotizaciones de cargo del trabajador y regalías o especies avaluadas en dinero.</p>
<p>La Dirección del Trabajo incluye, cuando se pagan mensualmente y tienen permanencia, conceptos como sueldo, comisiones, bonos mensuales, semana corrida, gratificación mensual, colación, movilización, cheques restaurante, desgaste de herramientas y ciertos viáticos. La doctrina vigente de 1998 reconsideró el criterio antiguo que excluía colación y movilización: si son mensuales, deben examinarse para la base del artículo 172.</p>
<p>La ley excluye expresamente las horas extraordinarias, la asignación familiar legal y beneficios esporádicos o pagados una vez al año, como aguinaldos o gratificación anual. Una etiqueta en la liquidación no decide por sí sola. Un bono “extraordinario” pagado todos los meses puede ser permanente; un reembolso real y ocasional puede no representar contraprestación por servicios.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Colación y movilización mensuales</strong><p>No las elimines automáticamente del cálculo. La consulta vigente de la DT y el Dictamen N.º 4466/308 indican que procede incluir las asignaciones percibidas mensualmente para la indemnización legal y el aviso previo.</p></div></aside>

<h2>Remuneración variable y licencias</h2>
<p>Cuando la remuneración es variable, el inciso segundo del artículo 172 usa el promedio de lo percibido en los últimos tres meses calendario. Si hubo licencia médica durante parte de ese período, la DT indica considerar tres meses anteriores completos cubiertos con remuneración, para evitar que un mes incompleto distorsione la base.</p>
<p>En remuneración mixta se conserva el componente fijo y se calcula correctamente el variable conforme a su periodicidad. No se debe promediar todo el bruto si incluye pagos excluidos, ni escoger los tres mejores meses. Reúne al menos las últimas seis liquidaciones para identificar bonos permanentes, variables y meses afectados por licencia.</p>

<h2>Paso 3: aplicar el tope de 90 UF</h2>
<p>La remuneración mensual base no puede superar <strong>90 UF del último día del mes anterior al pago</strong>. Por eso no existe un único tope en pesos para todo 2026. Si el pago se realiza en agosto, se usa la UF del 31 de julio; si cambia el mes del pago, cambia la conversión.</p>
<p>El tope de 90 UF se aplica también a trabajadores contratados antes del 14 de agosto de 1981. La excepción histórica elimina el máximo de once años, no el límite mensual de la base. Para calcular, consulta el valor oficial de la UF de la fecha exigida y multiplica por 90; después compara ese resultado con la última remuneración determinada.</p>

<h2>Paso 4: multiplicar por los años pagables</h2>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo con 7 años y 8 meses</div><ul><li>Última remuneración mensual computable: $850.000</li><li>Antigüedad: 7 años y 8 meses</li><li>Fracción superior a 6 meses: suma un año</li><li>Años pagables: 8</li><li>$850.000 × 8 = $6.800.000</li></ul><span class="total">Indemnización por años: $6.800.000</span></div>
<p>Este ejemplo supone causal del artículo 161, contrato posterior a 1981, base inferior a 90 UF y ausencia de un pacto más favorable. No incluye aviso previo, vacaciones, remuneraciones pendientes, descuento del seguro de cesantía ni recargo judicial.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo afecto al tope de años</div><ul><li>Contrato iniciado en 2008 y terminado en 2026</li><li>Antigüedad real: 18 años</li><li>Máximo legal: 11 años</li><li>Base computable: $1.200.000</li><li>$1.200.000 × 11 = $13.200.000</li></ul><span class="total">Indemnización legal: $13.200.000</span></div>

<h2>Indemnización sustitutiva del aviso previo</h2>
<p>Cuando el empleador aplica el artículo 161 sin avisar por escrito con al menos treinta días de anticipación, debe pagar además una indemnización equivalente a la última remuneración mensual. Utiliza la base del artículo 172 y el mismo tope de 90 UF. No se multiplica por antigüedad.</p>
<p>Con los datos del primer ejemplo, un término inmediato por necesidades de la empresa podría sumar $850.000 por aviso previo a los $6.800.000 por años. Si el aviso se entregó correctamente con treinta días, no se agrega esa sustitución. Los otros componentes del finiquito se calculan aparte.</p>

<h2>Recargos cuando un tribunal declara injustificado el despido</h2>
<p>El recargo del artículo 168 no se activa solo porque el trabajador discrepe ni lo puede declarar la calculadora. Requiere una sentencia o un acuerdo que lo reconozca. El porcentaje se aplica a la indemnización por años de servicio, no indiscriminadamente a todo el finiquito.</p>
<table><thead><tr><th>Causal aplicada y desestimada</th><th>Aumento legal</th></tr></thead><tbody><tr><td>Artículo 161 aplicado improcedentemente</td><td>30%</td></tr><tr><td>Causales del artículo 159 injustificadas o despido sin causal legal</td><td>50%</td></tr><tr><td>Causales del artículo 160 aplicadas indebidamente</td><td>80%</td></tr><tr><td>Artículo 160 N.º 1, 5 o 6, además declarado carente de motivo plausible</td><td>100%</td></tr></tbody></table>
<p>La tabla corrige una confusión habitual: despedir sin invocar causal no lleva automáticamente un recargo de 100%; la letra b) del artículo 168 establece 50%. El 100% es una hipótesis agravada y específica para determinados numerales del artículo 160.</p>
<div class="numeric-example"><div class="numeric-example__title">Recargo de 30% sobre el primer ejemplo</div><ul><li>Indemnización por años: $6.800.000</li><li>30%: $2.040.000</li><li>Total años más recargo: $8.840.000</li></ul><span class="total">No incluye las demás prestaciones</span></div>

<h2>Cotizaciones impagas y nulidad del despido</h2>
<p>El empleador debe acreditar el pago íntegro de cotizaciones previsionales hasta el mes anterior al despido. Si están impagas, puede operar la sanción conocida como nulidad del despido: el término no produce el efecto de poner fin al contrato para esta consecuencia hasta que se convalida, y pueden adeudarse remuneraciones y prestaciones entre la separación y la comunicación que acredita el pago.</p>
<p>La nulidad no es una fórmula que se sume automáticamente a “un mes por año”. Requiere verificar cotizaciones, comunicación y situación procesal. Descarga certificados de AFP, salud y AFC; no te limites a la liquidación, porque esta puede mostrar un descuento que nunca fue enterado.</p>

<h2>Finiquito, pago y reserva de derechos</h2>
<p>El empleador debe poner el finiquito y su pago a disposición dentro de diez días hábiles desde la separación. Antes de firmar, compara carta de término, fechas, base, años, aviso, feriado, remuneraciones y descuentos. Un pago en cuotas de indemnizaciones requiere acuerdo y formalidades; no es una decisión unilateral del empleador.</p>
<p>Si existe una diferencia, una reserva de derechos específica puede permitir recibir lo no discutido sin renunciar a reclamar lo reservado. Redáctala identificando conceptos y períodos, no como una frase vaga. La eficacia concreta puede depender del documento y del conflicto, por lo que conviene asesorarse antes de firmar.</p>

<h2>Plazo para reclamar un despido</h2>
<p>La acción por despido injustificado, indebido, improcedente o indirecto debe presentarse dentro de <strong>60 días hábiles</strong> desde la separación. Un reclamo administrativo ante la Inspección del Trabajo suspende el plazo mientras se tramita, pero en ningún caso se puede acudir al tribunal después de 90 días hábiles desde el despido.</p>
<p>Presentar un reclamo ante la DT puede abrir una conciliación, pero no reemplaza la demanda si no hay acuerdo. El plazo es corto y su cómputo es legal; si se acerca el límite, busca orientación de la Defensoría Laboral o de un abogado.</p>

<h2>Checklist para auditar el cálculo</h2>
<ol class="steps"><li>Identifica causal y fecha de separación en la carta.</li><li>Calcula años completos y comprueba si la fracción supera seis meses.</li><li>Reúne contrato, anexos y últimas seis liquidaciones.</li><li>Clasifica pagos mensuales, variables, esporádicos y exclusiones legales.</li><li>Incluye colación, movilización y beneficios mensuales cuando corresponda.</li><li>Promedia remuneraciones variables con meses completos.</li><li>Consulta 90 UF del último día del mes anterior al pago.</li><li>Aplica el máximo de once años, salvo la excepción histórica.</li><li>Separa aviso previo y demás conceptos del finiquito.</li><li>No agregues recargo judicial sin sentencia o acuerdo.</li><li>Verifica certificados de cotizaciones.</li><li>Controla el plazo de 60 días hábiles si impugnarás.</li></ol>

<h2>Errores frecuentes</h2>
<ul><li>Creer que toda renuncia o mutuo acuerdo paga un mes por año.</li><li>Incluir fuerza mayor como causal indemnizable automática.</li><li>Excluir colación y movilización pese a su pago mensual.</li><li>Sumar horas extra o aguinaldos anuales a la base.</li><li>Usar la UF del día del despido en vez de la fecha legal del tope.</li><li>Redondear seis meses exactos como un año adicional.</li><li>Aplicar 100% a cualquier despido sin causal.</li><li>Confundir indemnización por años con aviso previo o vacaciones.</li><li>Firmar sin revisar cotizaciones ni reservar una diferencia concreta.</li></ul>

<p>Estima el componente principal con la <a href="/calculadoras/calculadora-indemnizacion-anos-servicio">calculadora de indemnización</a> y arma el término completo con la <a href="/calculadoras/calculadora-finiquito">calculadora de finiquito</a>. Para causales discutidas, continuidad laboral o remuneraciones complejas, el resultado es orientativo y debe revisarse profesionalmente.</p>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con los artículos 159 a 172 del <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">Código del Trabajo vigente en Ley Chile</a>, las consultas de la DT sobre <a href="https://www.dt.gob.cl/portal/1628/w3-article-60585.html" target="_blank" rel="noopener">conceptos incluidos en la última remuneración</a>, <a href="https://www.dt.gob.cl/portal/1628/w3-article-60604.html" target="_blank" rel="noopener">tope de 90 UF</a> y <a href="https://www.dt.gob.cl/portal/1626/w3-article-60603.html" target="_blank" rel="noopener">promedio variable con licencia</a>, además del trámite oficial de <a href="https://www.dt.gob.cl/portal/1626/w3-article-125086.html" target="_blank" rel="noopener">reclamo por despido y sus plazos</a>. Los relatos de foros se usaron para identificar errores recurrentes sobre colación, fuerza mayor y recargos; no para establecer derechos.</p>`,
  },
  {
    slug: 'reajuste-arriendo-uf-2026',
    title: 'Reajuste de arriendo por UF e IPC en Chile 2026',
    seoTitle: 'Reajuste de Arriendo por UF 2026: cómo calcularlo en Chile',
    seoDescription:
      'Aprende cómo calcular el reajuste de arriendo por UF o IPC en Chile, con ejemplo paso a paso, conversión a pesos y calculadora.',
    description:
      'Todo sobre el reajuste de arriendo: cuánto puede subir, UF vs IPC, qué dice tu contrato y cuándo puedes negociar.',
    date: '2026-03-30',
    updatedAt: '2026-07-13',
    category: 'vivienda',
    readingTime: 13,
    relatedGuia: 'comprar-vivienda-chile',
    keywords: [
      'reajuste arriendo',
      'IPC arriendo',
      'UF arriendo',
      'aumento arriendo Chile',
      'tope arriendo',
      'Ley 18.101',
      'reajuste arriendo UF 2026',
      'cómo calcular reajuste arriendo',
    ],
    relatedCalculators: [
      'calculadora-reajuste-arriendo',
      'calculadora-uf-clp',
      'calculadora-credito-hipotecario',
    ],
    faq: [
      {
        question: '¿Cómo se calcula el reajuste de arriendo por UF?',
        answer:
          'Si tu contrato está pactado en UF, el reajuste es automático y diario: el valor en UF se mantiene fijo y el pago en pesos varía según el valor de la UF de cada mes. Por ejemplo, si pagas 10 UF de arriendo y la UF sube de $40.000 a $40.500, tu arriendo pasa de $400.000 a $405.000 sin que el arrendador tenga que hacer ningún cálculo.',
      },
      {
        question: '¿Cómo se calcula el reajuste de arriendo por IPC?',
        answer:
          'Si tu arriendo está en pesos, el reajuste se calcula con el IPC acumulado del período definido en el contrato (usualmente 12 meses). Por ejemplo: arriendo $400.000 con IPC anual 4,5% → reajuste = $400.000 × 4,5% = $18.000 → nuevo arriendo $418.000. La frecuencia (anual, semestral) debe estar en el contrato.',
      },
      {
        question: '¿Cuánto puede subir el arriendo en Chile?',
        answer:
          'En los contratos urbanos habitacionales ordinarios no existe hoy un porcentaje general máximo de reajuste aplicable a todos los arriendos. Durante la vigencia del contrato manda la cláusula pactada: UF, IPC, frecuencia y fecha. Un monto nuevo que no se desprende del contrato requiere acuerdo de ambas partes; al vencer el plazo, el arrendador puede proponer otras condiciones y el arrendatario puede aceptarlas o rechazarlas.',
      },
      {
        question: '¿Puedo negarme al aumento de arriendo?',
        answer:
          'Puedes objetar por escrito un cobro que no corresponda a la cláusula vigente, pedir el cálculo y seguir pagando la suma no discutida según asesoría aplicable a tu caso. Los conflictos de arrendamiento urbano se conocen normalmente ante juzgados civiles. SERNAC solo resulta pertinente si existe una relación de consumo con un proveedor habitual; no es la vía automática para un arriendo entre dos particulares.',
      },
    ],
    content: `<p class="article-lead">Un reajuste de arriendo válido no se determina por costumbre ni por lo que “siempre cobra” una corredora. Se determina leyendo cuatro datos del contrato: unidad de la renta, índice pactado, período de cálculo y fecha de aplicación. Con eso se puede distinguir un reajuste correcto de una modificación unilateral.</p>

<h2>La regla práctica: primero identifica qué firmaste</h2>
<p>La <a href="https://www.bcn.cl/leychile/Navegar?idNorma=29526&idVersion=2022-02-12" target="_blank" rel="noopener">Ley N.º 18.101</a> regula los arriendos de bienes raíces urbanos y, en lo que no contempla, se aplica el Código Civil. La ley vigente no establece un reajuste automático por IPC para todas las rentas ni un porcentaje máximo general para cada aumento de un arriendo urbano habitacional. La obligación nace de lo pactado por las partes.</p>
<p>Esto exige separar dos situaciones. Durante un contrato vigente, la renta solo cambia conforme a la cláusula acordada o mediante un nuevo acuerdo. Al terminar el plazo, una parte puede proponer renovar con un precio distinto; la otra puede aceptar o rechazar. Que no exista un tope general no autoriza a reemplazar unilateralmente las condiciones de un contrato que aún está vigente.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Alcance de esta guía</strong><p>Se refiere a arriendos urbanos habitacionales ordinarios. Predios rústicos, viviendas sujetas a regímenes especiales, arriendos comerciales y relaciones de consumo con empresas pueden tener reglas o vías diferentes.</p></div></aside>

<h2>Arriendo en UF y arriendo reajustable por IPC no son lo mismo</h2>
<div class="comparison"><div class="comparison__header"><div>Renta expresada en UF</div><div>Renta expresada en pesos + IPC</div></div><div class="comparison__row"><div>La cantidad de UF permanece fija</div><div>El monto en pesos permanece fijo entre reajustes</div></div><div class="comparison__row"><div>Se convierte a pesos en la fecha pactada</div><div>Se aplica el IPC acumulado al llegar la fecha</div></div><div class="comparison__row"><div>Puede cambiar en pesos cada vencimiento</div><div>Suele cambiar semestral o anualmente</div></div><div class="comparison__row"><div>Requiere valor UF oficial del día</div><div>Requiere índice o calculadora oficial del INE</div></div></div>
<p>Si el contrato dice “10 UF mensuales, pagaderas según el valor de la UF del día 5”, cada mes se multiplican 10 UF por el valor oficial del día 5. No se aplica además el IPC, salvo que exista una cláusula adicional válida y clara. La UF ya incorpora la variación del IPC mediante el mecanismo diario del Banco Central.</p>
<p>Si dice “$400.000 reajustables cada doce meses según la variación del IPC”, la renta se mantiene en $400.000 hasta la fecha del reajuste. Entonces se calcula la variación entre los meses que el contrato identifica. La fecha de publicación del IPC y el mes de referencia son distintos: el dato de junio se publica en julio, por ejemplo.</p>

<h2>Cómo calcular un arriendo pactado en UF</h2>
<ol class="steps"><li>Ubica la cantidad de UF escrita en el contrato.</li><li>Identifica la fecha de conversión: día de pago, primer día del mes u otra.</li><li>Consulta el valor de ese día en la <a href="https://www.sii.cl/valores_y_fechas/uf/uf2026.htm" target="_blank" rel="noopener">tabla oficial del SII</a> o en Banco Central.</li><li>Multiplica cantidad de UF por valor diario y redondea al final.</li></ol>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo real al 13 de julio de 2026</div><ul><li>Renta pactada: 10 UF</li><li>UF del 13 de julio: $40.844,79</li><li>10 × $40.844,79 = $408.447,90</li></ul><span class="total">Pago en pesos, antes de otros cargos: $408.448</span></div>
<p>La UF del 13 de julio de 2026 es $40.844,79. Se mantiene en ese nivel durante el período iniciado el 10 de julio porque el <a href="https://www.ine.gob.cl/sala-de-prensa/prensa/general/noticia/2026/07/08/%C3%ADndice-de-precios-al-consumidor-%28ipc%29-de-junio-present%C3%B3-una-variaci%C3%B3n-mensual-de-0-0" target="_blank" rel="noopener">IPC de junio fue 0,0%</a>. Este dato sirve como ejemplo fechado, no como valor permanente.</p>

<h2>Cómo calcular el reajuste por IPC</h2>
<p>La forma más segura es usar la <a href="https://calculadoraipc.ine.cl/" target="_blank" rel="noopener">Calculadora IPC del INE</a>. El manual metodológico explica que la herramienta usa series empalmadas y mayor precisión interna que las tablas redondeadas. Debes ingresar el monto y los períodos inicial y final exigidos por la cláusula.</p>
<p>Si el contrato establece una variación de 4,5% para el período, la operación es:</p>
<div class="numeric-example"><div class="numeric-example__title">Arriendo de $400.000 con reajuste de 4,5%</div><ul><li>Factor: 1 + 4,5 ÷ 100 = 1,045</li><li>$400.000 × 1,045 = $418.000</li><li>Diferencia mensual: $18.000</li></ul><span class="total">Nueva renta: $418.000</span></div>
<p>No sumes variaciones mensuales redondeadas ni elimines los meses negativos. En foros chilenos aparecen conflictos donde el arrendador convierte un IPC negativo en cero o calcula cada mes por separado. Esa práctica puede producir un resultado distinto al IPC acumulado del período. La cláusula y la herramienta oficial deben prevalecer sobre una planilla informal.</p>

<h2>Qué revisar en la cláusula de reajuste</h2>
<ul><li><strong>Base:</strong> UF, IPC u otro indicador claramente identificable.</li><li><strong>Frecuencia:</strong> mensual, trimestral, semestral o anual.</li><li><strong>Período:</strong> qué meses se comparan y si existe desfase.</li><li><strong>Fecha efectiva:</strong> desde qué renta se aplica el nuevo monto.</li><li><strong>Redondeo:</strong> a peso, decena o centena, si fue acordado.</li><li><strong>Aviso:</strong> quién comunica el cálculo y con cuánta anticipación.</li><li><strong>Reajustes negativos:</strong> si la cláusula permite que la renta baje o establece un piso.</li></ul>
<p>Una redacción como “reajustable según IPC” deja preguntas abiertas. Una cláusula útil diría, por ejemplo, que el monto se reajustará cada doce meses por la variación acumulada del IPC informada por el INE entre meses específicos y que el arrendador enviará el cálculo antes del vencimiento.</p>

<h2>¿Puede aplicarse un aumento que no figura en el contrato?</h2>
<p>Durante el plazo vigente, una parte no debería reemplazar por sí sola el monto o la frecuencia pactados. Si el contrato fija reajuste anual, pasar a trimestral requiere una modificación aceptada por ambas partes. Si no existe cláusula de reajuste, el arrendador puede proponer una modificación, pero la propuesta no se transforma en obligación solo por haber sido enviada.</p>
<p>Al finalizar un contrato a plazo fijo, la situación cambia: el propietario puede ofrecer una renovación con otra renta y el arrendatario decidir si acepta. Es importante revisar las cláusulas de renovación automática y aviso, porque pueden determinar cuándo y cómo se comunica el término o la nueva propuesta.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No confundas reajuste con mora</strong><p>El artículo 21 de la Ley 18.101 dispone que los pagos o devoluciones atrasados se reajusten según la variación de la UF entre la fecha debida y la fecha efectiva. Esa regla sobre mora no convierte automáticamente toda renta mensual en UF.</p></div></aside>

<h2>Cobros retroactivos: depende de la obligación y de la evidencia</h2>
<p>Una duda recurrente en comunidades chilenas es si el propietario puede cobrar varios reajustes meses después de haber recibido pagos sin objeción. No existe una respuesta responsable sin leer la cláusula, los comprobantes y las comunicaciones. Que el cobro se haya comunicado tarde no elimina necesariamente una obligación automática; pero la conducta de las partes y la forma en que se aceptaron los pagos pueden ser relevantes.</p>
<p>Antes de pagar una diferencia retroactiva, pide una liquidación mes a mes que indique renta base, período IPC, factor, monto resultante y pagos imputados. Guarda transferencias y mensajes. Si la cifra es significativa o se amenaza con terminar el contrato, busca orientación jurídica: una calculadora verifica aritmética, no resuelve interpretación contractual.</p>

<h2>Qué hacer si el cálculo parece incorrecto</h2>
<ol class="steps"><li>Lee el contrato completo, incluidas renovación, término, mora y anexos.</li><li>Reproduce el cálculo con la fuente oficial y conserva captura o PDF.</li><li>Solicita por escrito la fórmula y el período usados por el arrendador o corredora.</li><li>Responde señalando la cláusula concreta y la diferencia detectada.</li><li>No dejes de pagar impulsivamente: separa el monto no discutido y pide asesoría sobre cómo proceder.</li><li>Si no hay acuerdo, consulta a la Corporación de Asistencia Judicial o a un abogado.</li></ol>
<p>Los conflictos de arrendamiento de predios urbanos se tramitan normalmente ante juzgados civiles. El <a href="https://www.chileatiende.gob.cl/fichas/76249-asesoria-juridica-para-terminar-un-contrato-de-arrendamiento" target="_blank" rel="noopener">servicio de orientación de ChileAtiende y la CAJ</a> explica el desahucio y permite solicitar asesoría a quienes cumplen sus requisitos.</p>
<p>SERNAC no es automáticamente competente en todo arriendo. La Ley del Consumidor exige una relación entre consumidor y proveedor que desarrolle habitualmente la actividad. Un conflicto entre un propietario particular y su arrendatario suele ser una relación civil; si interviene una empresa proveedora, la evaluación puede ser distinta.</p>

<h2>Desahucio y restitución: corrección de plazos</h2>
<p>En contratos mes a mes o de duración indefinida, el artículo 3 de la Ley 18.101 señala que el desahucio dado por el arrendador debe realizarse judicialmente o mediante notificación personal de notario. El plazo base es de <strong>dos meses</strong> desde la notificación y aumenta un mes por cada año completo de ocupación, con un máximo total de <strong>seis meses</strong>, no cuatro.</p>
<p>El arrendatario desahuciado puede restituir antes y paga renta solo hasta el día de devolución. Esta facultad no equivale a una regla universal que permita abandonar cualquier contrato a plazo fijo con treinta días de aviso. En contratos de plazo fijo mandan sus cláusulas y las reglas legales específicas.</p>
<p>La Ley N.º 21.461, conocida como “Devuélveme mi Casa”, incorporó un procedimiento monitorio para cobro de rentas y restitución. <a href="https://www.chileatiende.gob.cl/fichas/107794-ley-devuelveme-mi-casa" target="_blank" rel="noopener">ChileAtiende</a> resume sus requisitos. No autoriza desalojos de hecho: la restitución forzada requiere procedimiento judicial.</p>

<h2>Contexto 2026: proyectos sobre cobros en UF</h2>
<p>Durante 2026 reapareció el debate público sobre limitar cobros cotidianos en UF. La propia ficha de la Ley 18.101 en BCN enumera proyectos que buscan prohibir la UF en determinados arriendos o crear mayor transparencia. Debe distinguirse una moción o noticia de una norma vigente: mientras un proyecto no complete su tramitación y publicación, no modifica el contrato ni la ley actual.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Fecha de verificación</strong><p>Marco legal y valores revisados al 13 de julio de 2026. Si lees esta guía después, confirma si hubo una reforma a la Ley 18.101.</p></div></aside>

<h2>Checklist antes de firmar un nuevo arriendo</h2>
<ul><li>Exige contrato escrito y verifica quién está habilitado para arrendar.</li><li>Define renta, unidad, día de conversión y frecuencia de reajuste.</li><li>Evita cláusulas que mezclen UF e IPC sin explicar cómo interactúan.</li><li>Registra inventario, estado del inmueble, medidores y fotografías.</li><li>Separa renta, gastos comunes, servicios, comisión y garantía.</li><li>Define condiciones de devolución de garantía y descuentos acreditables.</li><li>Lee renovación, aviso de término, multas y solución de controversias.</li></ul>
<p>Para calcular una renta concreta usa la <a href="/calculadoras/calculadora-reajuste-arriendo">calculadora de reajuste de arriendo</a> y comprueba la UF en la <a href="/calculadoras/calculadora-uf-clp">calculadora UF a CLP</a>. Para decisiones de compra frente a arriendo, revisa la <a href="/guias/comprar-vivienda-chile">guía de vivienda en Chile</a>.</p>

<h2>Fuentes consultadas</h2>
<p>Investigación actualizada con el <a href="https://www.bcn.cl/leychile/Navegar/imprimir?idNorma=29526&idVersion=2022-02-12" target="_blank" rel="noopener">texto vigente de la Ley 18.101 en BCN</a>, la <a href="https://www.ine.gob.cl/docs/default-source/%C3%ADndice-de-precios-al-consumidor/metodologias/base-anual-2023-100/5---uso-calculadora-ipc.pdf" target="_blank" rel="noopener">guía de cálculo IPC del INE</a>, la serie oficial de UF del SII y las fichas de ChileAtiende sobre desahucio y procedimiento monitorio. Las discusiones de foros se usaron para identificar dudas recurrentes —alzas sorpresivas, retroactividad, meses negativos y frecuencia—, no como fuente jurídica.</p>`,
  },
  {
    slug: 'vacaciones-proporcionales-guia',
    title: 'Guía de vacaciones proporcionales en Chile 2026',
    description:
      'Cómo calcular tus vacaciones proporcionales al finiquito: días que te corresponden, valor por día y pago en el finiquito.',
    date: '2026-03-30',
    updatedAt: '2026-07-13',
    category: 'laboral',
    readingTime: 14,
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
    content: `<p class="article-lead">El feriado proporcional se calcula en dos etapas: primero se obtienen días hábiles acumulados y después se proyectan desde el día siguiente al término del contrato para incorporar los sábados, domingos y festivos comprendidos. Multiplicar solo 1,25 días por el sueldo diario deja fuera la segunda etapa y puede reducir indebidamente el finiquito.</p>

<h2>Qué son las vacaciones proporcionales</h2>
<p>El nombre jurídico es <strong>feriado proporcional</strong>. El artículo 73 del Código del Trabajo dispone que, si el contrato termina antes de que el trabajador complete una nueva anualidad, debe recibir una indemnización equivalente a la remuneración íntegra calculada en proporción al tiempo transcurrido desde la contratación o desde la última anualidad.</p>
<p>No importa por sí sola la causal de término: renuncia, vencimiento de plazo, mutuo acuerdo o despido pueden generar este componente si existe tiempo acumulado. Es diferente de la indemnización por años de servicio, que sí depende de causales y requisitos específicos.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Base legal correcta</strong><p>Los artículos 67 y 68 determinan feriado básico y progresivo; el artículo 71 define la remuneración íntegra; el artículo 73 regula la compensación cuando termina el contrato. El cálculo proporcional no proviene del artículo 70.</p></div></aside>

<h2>Cuántos días se acumulan por mes</h2>
<p>La regla general es de 15 días hábiles de feriado por cada año de servicio. Dividir 15 por 12 entrega <strong>1,25 días hábiles por mes</strong>. Para una fracción de mes, la Dirección del Trabajo divide ese factor por 30 y lo multiplica por los días de la fracción.</p>
<ul><li>Factor mensual general: 15 ÷ 12 = 1,25 días hábiles.</li><li>Factor diario: 1,25 ÷ 30 = 0,0416667 días hábiles.</li><li>Acumulación: meses completos × 1,25 + días restantes × 0,0416667.</li></ul>
<p>El período no siempre comienza en la fecha de contratación. Si el trabajador ya cumplió uno o más años y usó o devengó su feriado anual, el proporcional se cuenta desde la última anualidad hasta el término.</p>

<h2>El paso que suele omitirse: convertir a días indemnizables</h2>
<p>Los días obtenidos con 1,25 son <em>hábiles</em>. Para saber cuántos días se pagan, deben contarse en el calendario desde el día siguiente al término del contrato y agregarse los sábados, domingos y festivos que queden dentro de ese tramo. El resultado final son días corridos indemnizables.</p>
<p>La <a href="https://www.dt.gob.cl/portal/1628/w3-article-60200.html" target="_blank" rel="noopener">consulta oficial de la DT</a> entrega este ejemplo:</p>
<div class="numeric-example"><div class="numeric-example__title">Contrato del 15 de marzo al 17 de noviembre de 2021</div><ul><li>Tiempo acumulado: 8 meses y 2 días</li><li>8 × 1,25 = 10 días hábiles</li><li>2 × (1,25 ÷ 30) = 0,08 días hábiles</li><li>Total hábil: 10,08 días</li><li>Días inhábiles comprendidos: 4</li></ul><span class="total">Total a indemnizar: 14,08 días corridos</span></div>
<p>Por eso no existe una tabla universal que convierta nueve meses en una cifra final de pago: la cantidad de fines de semana y festivos depende de la fecha exacta de término. Dos trabajadores con la misma antigüedad y remuneración pueden tener una pequeña diferencia si sus contratos terminan en fechas distintas.</p>

<h2>Cómo calcular el valor diario</h2>
<p>La compensación debe ser equivalente a la <strong>remuneración íntegra</strong> del artículo 71. El método depende del sistema de pago:</p>
<table><thead><tr><th>Tipo de remuneración</th><th>Base para feriado</th><th>Valor diario referencial</th></tr></thead><tbody><tr><td>Fija</td><td>Sueldo</td><td>Sueldo mensual ÷ 30</td></tr><tr><td>Exclusivamente variable</td><td>Promedio de los últimos 3 meses trabajados</td><td>Promedio mensual ÷ 30</td></tr><tr><td>Mixta</td><td>Sueldo + promedio variable de 3 meses</td><td>Base mensual ÷ 30</td></tr></tbody></table>
<p>La remuneración variable incluye tratos, comisiones, primas y otros conceptos cuyo resultado no es constante. Deben usarse meses <em>trabajados</em>, no reemplazarlos automáticamente por meses sin variable debido a licencia o permiso. Situaciones con menos de tres meses de historia tienen criterios particulares en la doctrina de la DT.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>La gratificación mensual no integra esta base</strong><p>La DT ha resuelto que la gratificación legal o convencional pagada mensualmente no se incluye en el cálculo del feriado proporcional, porque el Código la define separadamente del sueldo. Esto no elimina la cuota de gratificación que corresponda en el mes de término.</p></div></aside>

<h2>Ejemplo de pago completo</h2>
<p>Supongamos una remuneración fija de $600.000 y que, después de contar desde la fecha de término, el resultado oficial sea 12,25 días corridos indemnizables:</p>
<div class="numeric-example"><div class="numeric-example__title">Remuneración fija de $600.000</div><ul><li>Valor diario: $600.000 ÷ 30 = $20.000</li><li>Días corridos indemnizables: 12,25</li><li>$20.000 × 12,25 = $245.000</li></ul><span class="total">Feriado proporcional: $245.000</span></div>
<p>Este ejemplo parte de una cifra de días ya convertida. Si se multiplicaran 8,75 días hábiles directamente por $20.000, se obtendrían $175.000 y se omitirían los días inhábiles contenidos. Esa era precisamente la falla del cálculo resumido anterior.</p>

<h2>Feriado básico, pendiente y proporcional</h2>
<ul><li><strong>Básico:</strong> descanso anual ya devengado tras más de un año de servicio, normalmente 15 días hábiles.</li><li><strong>Pendiente:</strong> feriado anual devengado que no se usó total o parcialmente.</li><li><strong>Proporcional:</strong> fracción acumulada desde la contratación o última anualidad hasta el término.</li><li><strong>Progresivo:</strong> días adicionales obtenidos por antigüedad bajo el artículo 68.</li></ul>
<p>Al terminar la relación pueden coexistir días pendientes y proporcionales. La liquidación debe mostrar cada componente o, al menos, permitir reconstruirlo. Durante la relación laboral, el feriado básico es descanso: no puede cambiarse por dinero. Solo al terminar se compensa lo pendiente.</p>

<h2>Vacaciones progresivas: la primera no nace a los 10 años</h2>
<p>El artículo 68 exige diez años de trabajo para uno o más empleadores, continuos o no, y luego concede un día adicional <strong>por cada tres nuevos años trabajados</strong>. Para el primer día progresivo se necesitan, por tanto, diez años base más tres años nuevos. Además, esos tres nuevos años deben vincularse al empleador actual conforme a la interpretación de la DT.</p>
<table><thead><tr><th>Situación acreditada</th><th>Días adicionales</th><th>Feriado básico general</th></tr></thead><tbody><tr><td>10 años base, sin 3 nuevos años</td><td>0</td><td>15 días</td></tr><tr><td>10 años base + 3 nuevos con actual empleador</td><td>1</td><td>16 días</td></tr><tr><td>10 años base + 6 nuevos con actual empleador</td><td>2</td><td>17 días</td></tr><tr><td>10 años base + 9 nuevos con actual empleador</td><td>3</td><td>18 días</td></tr></tbody></table>
<p>La ley no fija un máximo general de cinco días progresivos. La tabla antigua que detenía el beneficio en 20 días no tenía respaldo en el artículo 68. Lo que sí limita la norma es el reconocimiento de tiempo previo: solo pueden hacerse valer hasta diez años trabajados para empleadores anteriores.</p>
<p>Quien ha trabajado siempre para la misma empresa puede usar esa antigüedad para los diez años base y seguir acumulando cada bloque de tres años. Quien llega con diez años anteriores acreditados obtiene su primer progresivo tras tres años con el empleador actual, siempre que cumpla también el requisito del feriado básico.</p>

<h2>Cómo acreditar el feriado progresivo</h2>
<p>La <a href="https://www.dt.gob.cl/portal/1628/w3-article-60195.html" target="_blank" rel="noopener">Dirección del Trabajo</a> admite, entre otros medios, certificado de la Inspección del Trabajo, instrumentos públicos, sentencias, convenios, escrituras o certificados de cotizaciones previsionales de AFP. Si toda la antigüedad es con el empleador actual, se acredita con contrato y registros de ingreso.</p>
<p>La acreditación debe efectuarse antes de usar el feriado básico del año. Si se presenta tarde, la DT indica que no se pueden exigir retroactivamente los días progresivos que se habrían usado en períodos anteriores. Conviene ingresar el certificado por un canal que deje constancia de fecha y recepción.</p>
<p>A diferencia del feriado básico, el exceso progresivo sí puede negociarse individual o colectivamente para compensarlo en dinero. La suma no puede ser inferior a la remuneración íntegra que habría correspondido. Esa excepción no autoriza vender los 15 días básicos.</p>

<h2>Regiones con 20 días hábiles</h2>
<p>El artículo 67 reconoce 20 días hábiles de feriado anual a quienes prestan servicios en las regiones de Aysén, Magallanes y de la Antártica Chilena, y en la provincia de Palena. Para ellos el factor proporcional básico es:</p>
<div class="numeric-example"><div class="numeric-example__title">Factor especial de 20 días</div><ul><li>20 ÷ 12 = 1,6666667 días hábiles por mes</li><li>Factor diario: 1,6666667 ÷ 30 = 0,0555556</li></ul><span class="total">Luego también se agregan inhábiles según calendario</span></div>
<p>La regla depende del lugar donde se prestan servicios, no simplemente del domicilio personal o de la casa matriz. Modalidades remotas o traslados requieren revisar los hechos concretos.</p>

<h2>Acumulación: no se pierden los períodos por superar dos</h2>
<p>El artículo 70 permite acumular por acuerdo hasta dos períodos consecutivos. Cuando ya existen dos, el empleador debe otorgar al menos el primero antes de que se complete una tercera anualidad. La acumulación excesiva puede constituir infracción del empleador.</p>
<p>La doctrina vigente de 2024 y 2025 aclara que superar ese límite no hace desaparecer el derecho. Si por cualquier causa se acumularon más períodos, el trabajador conserva la totalidad y, al terminar el contrato, corresponde indemnizarlos. Durante la relación no pueden compensarse en dinero para corregir la acumulación: deben otorgarse como descanso.</p>

<h2>¿Prescriben las vacaciones pendientes?</h2>
<p>Decir simplemente que “nunca prescriben mientras exista contrato” es una simplificación riesgosa. El Código contiene reglas de prescripción de derechos laborales, pero la DT también sostiene que acumular más de dos períodos no provoca pérdida y que el empleador mantiene la obligación de otorgarlos. La respuesta concreta puede depender de fechas, reclamaciones y estado de la relación.</p>
<p>En vez de asumir una pérdida automática, reúne solicitudes de vacaciones, respuestas, cartolas y liquidaciones. Si hay varios períodos o una negativa sostenida, consulta a la Inspección del Trabajo antes de firmar una renuncia o finiquito sin reserva.</p>

<h2>Checklist para revisar el finiquito</h2>
<ol class="steps"><li>Confirma fecha de ingreso, última anualidad y fecha efectiva de término.</li><li>Identifica si corresponden 15 o 20 días básicos y si existen progresivos acreditados.</li><li>Calcula meses completos y fracción de mes.</li><li>Obtén días hábiles proporcionales con el factor correcto.</li><li>Proyéctalos desde el día siguiente al término y agrega sábados, domingos y festivos comprendidos.</li><li>Determina remuneración fija, variable o mixta según artículo 71.</li><li>Separa vacaciones pendientes de las proporcionales.</li><li>Comprueba que la gratificación no fue agregada indebidamente a la base ni omitida como cuota independiente.</li><li>Pide la hoja de cálculo y deja reserva de derechos si existe una diferencia no resuelta.</li></ol>

<h2>Errores habituales detectados en consultas reales</h2>
<ul><li>Pagar solo 1,25 × meses sin incorporar días inhábiles.</li><li>Contar desde una fecha distinta al día siguiente del término.</li><li>Usar sueldo base cuando existen comisiones variables computables.</li><li>Incluir gratificación mensual dentro del valor diario.</li><li>Otorgar el primer progresivo al cumplir exactamente diez años.</li><li>Aplicar un máximo ficticio de cinco días progresivos.</li><li>Usar factor 1,25 en zonas cuyo feriado básico es de 20 días.</li><li>Eliminar períodos acumulados porque superan el máximo permitido para acumular.</li></ul>
<p>Para el resto de los componentes revisa la <a href="/guias/finiquito-laboral-chile">guía de finiquito laboral</a>. Puedes estimar días y monto en la <a href="/calculadoras/calculadora-vacaciones-proporcionales">calculadora de vacaciones proporcionales</a>, pero contrasta el calendario y la base remuneracional con tus documentos.</p>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con el <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">Código del Trabajo</a>, la consulta oficial de la DT sobre <a href="https://www.dt.gob.cl/portal/1628/w3-article-60200.html" target="_blank" rel="noopener">cálculo del feriado proporcional</a>, pronunciamientos sobre remuneración íntegra, gratificación, progresivos y acumulación, incluido el Ordinario N.º 307 de 2025. Las dudas observadas en foros laborales se utilizaron para priorizar ejemplos y errores, no como fuente normativa.</p>`,
  },
  {
    slug: 'subsidios-minvu-2026-guia',
    title: 'Subsidios MINVU 2026: DS49, DS1, DS19 y arriendo',
    seoTitle: 'Subsidios MINVU 2026: DS49, DS1, DS19 y fechas',
    seoDescription:
      'Estado y requisitos de los subsidios MINVU 2026: DS49, DS1, DS19 y DS52, con ahorros, RSH, fechas oficiales y errores que pueden dejarte fuera.',
    description:
      'Qué subsidio habitacional corresponde en 2026, cómo cambian el ahorro, RSH y financiamiento entre DS49, DS1, DS19 y el subsidio de arriendo DS52.',
    date: '2026-05-16',
    updatedAt: '2026-07-13',
    category: 'vivienda',
    readingTime: 18,
    relatedGuia: 'comprar-vivienda-chile',
    keywords: [
      'subsidio MINVU 2026',
      'DS49 fondo solidario',
      'DS01 sectores medios',
      'DS19 integración social',
      'DFL2 vivienda económica',
      'serviu chile',
      'RSH 40% 70% 90%',
      'subsidio habitacional UF',
      'simulador subsidio vivienda',
      'subsidio ds49 2026',
    ],
    relatedCalculators: [
      'calculadora-subsidio-habitacional',
      'calculadora-credito-hipotecario',
      'calculadora-contribuciones',
    ],
    faq: [
      {
        question: '¿Qué subsidios MINVU hay en 2026?',
        answer:
          'Los programas no son equivalentes: DS49 apoya compra o construcción para familias vulnerables; DS1 tiene tres tramos para sectores medios; DS19 opera dentro de proyectos de integración y no es un bono universal; y DS52 apoya el arriendo. Al 13 de julio de 2026, el primer llamado DS1 ya cerró y el llamado regular DS52 está abierto hasta el 7 de agosto.',
      },
      {
        question: '¿Cómo simular mi subsidio de vivienda en Chile?',
        answer:
          'Primero identifica programa, modalidad, comuna, tramo del Registro Social de Hogares, ahorro disponible y precio de la vivienda. Los montos cambian por tramo, zona, precio, proyecto y llamado; una calculadora sirve como orientación, pero la resolución oficial del llamado y la evaluación del SERVIU determinan el beneficio.',
      },
      {
        question: '¿El subsidio DS49 requiere crédito hipotecario?',
        answer:
          'El DS49 está diseñado para entregar una solución habitacional sin deuda hipotecaria posterior. Sin embargo, compra de vivienda construida, construcción en sitio propio y proyectos colectivos tienen requisitos y aportes distintos. No se debe reducir todo DS49 a una tabla única de montos ni asumir que existe un llamado individual abierto.',
      },
      {
        question: '¿Cuándo se abren las postulaciones a subsidios MINVU 2026?',
        answer:
          'Cada programa publica llamados, cierres y modalidades distintas en minvu.gob.cl y en el SERVIU regional. El primer llamado nacional DS1 de 2026 cerró el 30 de junio. El DS52 regular está abierto del 7 de julio al 7 de agosto. Los procesos DS49 y las inscripciones DS19 pueden ser regionales, colectivos o ligados a proyectos; no existe una fecha semestral única para todos.',
      },
    ],
    content: `<p class="article-lead">“Subsidio de vivienda” no describe un solo trámite. El DS49 financia soluciones para familias vulnerables; el DS1 separa sectores medios en tres tramos; el DS19 organiza viviendas dentro de proyectos de integración; y el DS52 ayuda a pagar arriendo. Confundirlos puede hacer que una familia inmovilice el ahorro equivocado, espere una convocatoria inexistente o reserve una propiedad que no admite su beneficio.</p>

<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Estado comprobado al 13 de julio de 2026</strong><p>El primer llamado nacional DS1 de 2026 cerró el 30 de junio. El llamado regular al subsidio de arriendo DS52 está abierto entre el 7 de julio y el 7 de agosto. Los llamados DS49 dependen de modalidad, región y proyecto; varios procesos 2026 publicados por MINVU ya figuran cerrados. No pagues a un intermediario que ofrezca “cupos” fuera de un llamado oficial.</p></div></aside>

<h2>Comparación rápida: qué problema resuelve cada programa</h2>
<table>
<thead><tr><th>Programa</th><th>Para quién</th><th>Qué financia</th><th>Dato que suele confundirse</th></tr></thead>
<tbody>
<tr><td><strong>DS49</strong></td><td>Familias sin vivienda en situación de vulnerabilidad, con reglas especiales por modalidad.</td><td>Compra de vivienda construida o alternativas de construcción, normalmente sin deuda hipotecaria posterior.</td><td>No hay una postulación individual permanentemente abierta ni un monto único para todo DS49.</td></tr>
<tr><td><strong>DS1</strong></td><td>Familias de sectores medios sin vivienda, con ahorro y capacidad de completar el precio.</td><td>Compra nueva o usada y construcción en sitio propio, mediante tres tramos.</td><td>Que el llamado no exija preaprobación bancaria no significa que el banco financiará la compra después.</td></tr>
<tr><td><strong>DS19</strong></td><td>Familias de distintas realidades que acceden a unidades de un proyecto seleccionado.</td><td>Vivienda nueva en proyectos de integración social y territorial.</td><td>No es un bono plano de 200 UF que se suma libremente a cualquier DS1 o DS49.</td></tr>
<tr><td><strong>DS52</strong></td><td>Familias que pueden pagar parte de un arriendo y cumplen RSH, ingreso y ahorro.</td><td>Una parte mensual del arriendo durante la vigencia del beneficio.</td><td>Se puede postular más adelante a subsidios de compra; no reemplaza la propiedad de una vivienda.</td></tr>
<tr><td><strong>DFL2</strong></td><td>Propietarios de viviendas económicas que cumplen el decreto.</td><td>No financia una compra.</td><td>Es un régimen legal y tributario, no un subsidio MINVU al que se postule.</td></tr>
</tbody>
</table>

<h2>DS1 2026: tres tramos y un llamado que ya cerró</h2>
<p>El Subsidio para Sectores Medios DS1 permite comprar una vivienda nueva o usada o construir en sitio propio. En zona regular, los valores máximos usuales de adquisición son <strong>1.100 UF para Tramo 1, 1.600 UF para Tramo 2 y 2.200 UF para Tramo 3</strong>. Existen máximos superiores en zonas extremas y condiciones especiales que deben comprobarse en el llamado y en la comuna donde se aplicará el beneficio.</p>
<p>En el primer llamado nacional 2026, MINVU abrió tres vías escalonadas: postulación automática del 16 al 30 de junio, postulación en línea del 17 al 30 y formulario de atención ciudadana del 19 al 30. Todas están cerradas. Haber quedado fuera no habilita una inscripción tardía; corresponde revisar resultados, una eventual apelación fundada o esperar una nueva resolución oficial.</p>

<h3>RSH y ahorro exigidos en el primer llamado</h3>
<ul>
<li><strong>Tramo 1:</strong> hasta 60% del Registro Social de Hogares y 30 UF de ahorro para adquisición.</li>
<li><strong>Tramo 2:</strong> hasta 80% del RSH y 40 UF de ahorro para adquisición.</li>
<li><strong>Tramo 3:</strong> exige estar inscrito en el RSH; si el hogar supera el 90%, se aplica el tope de ingreso mensual familiar definido para el llamado. El ahorro de adquisición fue 80 UF.</li>
<li><strong>Personas mayores:</strong> en Tramos 1 y 2, el llamado 2026 permitió pertenecer hasta el 90% del RSH.</li>
<li><strong>Construcción en sitio propio o densificación:</strong> el ahorro fue 30 UF para Tramo 2 y 50 UF para Tramo 3.</li>
</ul>
<p>La cuenta de ahorro para la vivienda debía tener al menos doce meses de antigüedad. Para este proceso tuvo que estar abierta a más tardar el 30 de mayo de 2025, y el ahorro mínimo debía aparecer como saldo disponible al 29 de mayo de 2026. Depositar dinero después del corte no reparaba el incumplimiento.</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Preaprobación y financiamiento son cosas distintas</strong><p>El primer llamado 2026 no exigió una preaprobación de crédito hipotecario para postular. Sin embargo, al aplicar el subsidio, la familia debe completar el precio con ahorro, recursos propios o financiamiento cuando el subsidio no cubre todo. El banco puede rechazar el crédito por renta, carga financiera, antigüedad laboral, tasación o antecedentes comerciales.</p></div></aside>

<h3>Cómo evaluar una vivienda antes de reservar</h3>
<p>El valor máximo no es una recomendación de endeudamiento. Antes de pagar una reserva, confirma por escrito que el inmueble puede adquirirse con el tramo obtenido, que el precio y la tasación cumplen el límite y que el plazo de entrega calza con la vigencia del certificado. Revisa además gastos operacionales, diferencia de pie, seguros, dividendo en UF y capacidad de pago si la tasa cambia.</p>
<div class="numeric-example"><div class="numeric-example__title">Familia con DS1 Tramo 2</div><ul><li>Precio ofrecido: 1.550 UF.</li><li>Ahorro disponible: 70 UF.</li><li>Subsidio: debe obtenerse de la resolución y certificado, no de una tabla genérica.</li><li>Diferencia: precio menos ahorro y subsidio efectivo.</li><li>Crédito: sujeto a evaluación bancaria y tasación.</li></ul><span class="total">El tramo habilita un rango; no garantiza que cierre el financiamiento</span></div>

<h2>DS49: compra y construcción no son el mismo proceso</h2>
<p>El Fondo Solidario de Elección de Vivienda está orientado a familias sin vivienda en situación de vulnerabilidad. La alternativa individual de compra de vivienda construida permite adquirir una propiedad de hasta 950 UF bajo las reglas vigentes y sin deuda hipotecaria posterior. Las modalidades de construcción incluyen nuevos terrenos, pequeño condominio, construcción en sitio propio y densificación predial; varias requieren organización colectiva, terreno, proyecto y una Entidad Patrocinante.</p>
<p>En el caso general, se exige ser mayor de 18 años, tener cédula vigente, no ser propietario, integrar un núcleo acreditado en el RSH y pertenecer al 40% más vulnerable. La postulación unipersonal se reserva para excepciones como personas mayores, viudas, con discapacidad acreditada, indígenas o reconocidas en el Informe Valech. El ahorro mínimo usual es 10 UF, pero algunas postulaciones colectivas permiten integrantes de tramos superiores con ahorros mayores.</p>
<p>Por eso son incorrectas dos frases frecuentes:</p>
<ul>
<li>“Todo el que está en el 40% recibe 450 UF”: la selección considera puntaje, modalidad, proyecto, zona, cupos y aportes complementarios.</li>
<li>“Solo junto 10 UF y compro cualquier vivienda”: la propiedad, el vendedor, el precio y la documentación deben ser aprobados, y la convocatoria debe estar abierta.</li>
</ul>

<h3>Qué ocurrió con llamados DS49 en 2026</h3>
<p>MINVU ha publicado procesos específicos, incluidos llamados colectivos para construcción en nuevos terrenos, autoconstrucción asistida y condiciones especiales por región o catástrofe. No equivalen a un llamado individual nacional para comprar una casa del mercado. Algunas páginas oficiales muestran expresamente el estado <strong>cerrado</strong>; otras reciben proyectos de entidades, no postulaciones directas de familias.</p>
<p>Si una organización invita a incorporarse a un comité, solicita la resolución del llamado, el nombre de la Entidad Patrocinante, la situación jurídica del terreno y un comprobante de todo pago. No transfieras dinero a cuentas personales por “inscripción SERVIU”. La selección no se compra y un grupo organizado no garantiza subsidio.</p>

<h2>DS19: un programa ligado a proyectos, no un cupón adicional</h2>
<p>El DS19 busca integrar familias de distintos ingresos en proyectos nuevos bien localizados, con equipamiento y estándares definidos. Puede recibir a familias que ya tienen ciertos subsidios —como DS49 o DS1, según el tipo de cupo— y también a familias de sectores medios sin subsidio previo que cumplen las condiciones del programa y obtienen una unidad disponible.</p>
<p>Los montos y precios dependen del cupo, subsidio de origen, ubicación y año de selección del proyecto. Presentar “DS19 = 200 UF extra” como regla universal mezcla bonos del proyecto con el beneficio individual y puede generar una promesa falsa. El llamado especial 2026, por ejemplo, regula concursos para entidades desarrolladoras y contempla bonos asociados a la composición del proyecto; eso no convierte cada bono en dinero de libre disposición para el comprador.</p>

<h3>Cómo entra una familia a un proyecto DS19</h3>
<ul>
<li>Para cupos de familias de menores ingresos en proyectos seleccionados <strong>desde 2022</strong>, el nuevo sistema abre procesos públicos de inscripción en el sitio del SERVIU regional cuando el proyecto alcanza al menos 10% de avance real.</li>
<li>La persona ingresa con RUT y ClaveÚnica, escoge un proyecto disponible en su región y recibe comprobante. No puede participar simultáneamente en más de un proceso ni usar un subsidio obtenido en otra región.</li>
<li>La priorización considera, entre otros factores, antigüedad del subsidio, postulaciones hábiles anteriores, residencia comunal y ciertas condiciones familiares.</li>
<li>Para proyectos seleccionados antes de 2022, la orientación oficial aún contempla consultar disponibilidad directamente con la entidad desarrolladora.</li>
<li>En cupos de sectores medios, con o sin subsidio previo, la reserva y el financiamiento se coordinan con la inmobiliaria, pero siguen sujetos a requisitos del programa.</li>
</ul>
<p>Antes de firmar, verifica el proyecto en MINVU o SERVIU, pide el comprobante de inscripción, identifica el tipo de cupo y separa el precio de la vivienda de gastos operacionales. Una sala de ventas no puede reemplazar la resolución que acredita el proyecto.</p>

<h2>DS52: llamado de arriendo abierto hasta el 7 de agosto</h2>
<p>El llamado regular 2026 del subsidio de arriendo está abierto desde el 7 de julio hasta el 7 de agosto, en línea con ClaveÚnica o presencialmente en oficinas SERVIU. Entrega un total de 170 UF, aplicado mensualmente con un máximo general de 4,2 UF para arriendos de hasta 11 UF. En Arica y Parinacota, Tarapacá, Antofagasta, Atacama, Metropolitana, Aysén y Magallanes, el aporte mensual puede llegar a 4,9 UF y el arriendo a 13 UF.</p>
<p>Los requisitos anunciados incluyen:</p>
<ul>
<li>RSH hasta el 70% y una sola postulación por registro en el llamado.</li>
<li>Ahorro mínimo de 4 UF depositado, a más tardar, el día anterior a postular.</li>
<li>Ingreso familiar mensual entre 7 y 25 UF; el máximo aumenta 8 UF por cada integrante sobre tres.</li>
<li>Postular con cónyuge, conviviente o hijo, salvo personas de 60 años o más, que pueden postular solas.</li>
<li>Cédula vigente para chilenos y extranjeros.</li>
</ul>
<p>La familia paga una parte del arriendo y el Estado otra. El arrendador y el contrato deben cumplir el procedimiento del programa; recibir el subsidio no significa que MINVU entregue dinero libremente en la cuenta del beneficiario. Una ventaja importante es que después se puede postular a DS49 o DS1 si se cumplen sus condiciones.</p>

<h2>DFL2: por qué aparece en búsquedas de subsidios</h2>
<p>Una vivienda DFL2 es una vivienda económica de hasta 140 m² que cumple el decreto y conserva los beneficios que le correspondan. No existe una “postulación DFL2” para recibir dinero al comprar. Tampoco puede afirmarse que toda DFL2 paga la mitad de contribuciones por quince años o que toda herencia queda exenta: los beneficios dependen de la fecha, titularidad, superficie, antecedentes de recepción y reglas específicas.</p>
<p>Para personas naturales, la exención de rentas de arrendamiento está limitada a un máximo de dos viviendas DFL2 elegibles, normalmente las de adquisición más antigua. Esa regla tributaria no cambia el RSH ni agrega UF a un DS1, DS49 o DS19. Si quieres entender la venta posterior, revisa la guía de <a href="/blog/plusvalia-dfl2-vs-comun-chile">plusvalía DFL2 versus propiedad común</a>.</p>

<h2>Checklist antes del próximo llamado</h2>
<ol class="steps">
<li><strong>Define la solución:</strong> comprar usada, comprar nueva, construir, entrar a proyecto o arrendar. Eso determina el programa.</li>
<li><strong>Revisa el RSH completo:</strong> domicilio, integrantes e ingresos deben reflejar la realidad. Una solicitud de actualización pendiente no garantiza cambio antes del corte.</li>
<li><strong>Abre temprano la cuenta correcta:</strong> para DS1 se exige antigüedad. Evita giros después de la fecha de corte y guarda cartola.</li>
<li><strong>Calcula en UF:</strong> ahorro, precio, subsidio y crédito se expresan en UF. Convertir todo una vez a pesos oculta que el monto cambia diariamente.</li>
<li><strong>Comprueba que no exista propiedad:</strong> revisa también restricciones para cónyuge, conviviente y núcleo declarado.</li>
<li><strong>Obtén ClaveÚnica y cédula vigente:</strong> no esperes al último día para recuperar acceso.</li>
<li><strong>Lee la resolución exacta:</strong> la ficha permanente del programa orienta; el llamado fija fechas, cortes, documentos y excepciones.</li>
<li><strong>Guarda comprobante:</strong> captura, folio y cartola sirven para reclamar un error; una pantalla informal no acredita postulación.</li>
</ol>

<h2>Señales de fraude y errores vistos en consultas reales</h2>
<ul>
<li>Prometer selección por orden de llegada cuando el proceso usa puntaje o priorización.</li>
<li>Cobrar por “activar” un subsidio directamente en una inmobiliaria.</li>
<li>Usar logos de MINVU en perfiles que piden transferencia a una persona.</li>
<li>Confundir un concurso para constructoras con una postulación familiar.</li>
<li>Reservar una vivienda antes de comprobar tramo, precio máximo y proyecto.</li>
<li>Retirar el ahorro después del corte porque la plataforma ya mostró una propuesta.</li>
<li>Suponer que el RSH reemplaza la evaluación de ingresos o la evaluación bancaria.</li>
<li>Publicar montos en pesos sin fecha ni valor de UF.</li>
</ul>

<p>Usa la <a href="/calculadoras/calculadora-subsidio-habitacional">calculadora de subsidio habitacional</a> como filtro inicial y contrasta el resultado con la resolución del llamado. Si necesitarás deuda, prueba distintos escenarios en la <a href="/calculadoras/calculadora-credito-hipotecario">calculadora de crédito hipotecario</a>; el subsidio reduce el monto por financiar, pero no elimina seguros, gastos ni riesgo de variación de la UF.</p>

<h2>Fuentes oficiales consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con el anuncio MINVU del <a href="https://www.minvu.gob.cl/noticia/minvu-anuncia-la-apertura-del-primer-llamado-de-2026-al-subsidio-para-sectores-medios/" target="_blank" rel="noopener">primer llamado DS1 de 2026</a>, las fichas permanentes de <a href="https://www.minvu.gob.cl/beneficio/vivienda/subsidio-habitacional-comprar-una-vivienda-de-hasta-1100-uf-ds1/" target="_blank" rel="noopener">DS1 Tramo 1</a> y <a href="https://www.minvu.gob.cl/beneficio/vivienda/subsidio-para-construir-una-vivienda-de-hasta-950-uf-ds49/" target="_blank" rel="noopener">construcción DS49</a>, la información para familias del <a href="https://www.minvu.gob.cl/beneficio/vivienda/informacion-para-familias-con-o-sin-subsidio-interesadas-en-incorporarse-a-proyectos-ds-19/" target="_blank" rel="noopener">programa DS19</a>, su <a href="https://www.minvu.gob.cl/nuevo-sistema-de-inscripcion-programa-de-integracion-social-y-territorial-ds19/" target="_blank" rel="noopener">sistema público de inscripción</a> y el anuncio del <a href="https://www.minvu.gob.cl/noticia/minvu-anuncia-la-proxima-apertura-del-llamado-al-subsidio-de-arriendo-de-2026/" target="_blank" rel="noopener">DS52 regular 2026</a>. Los comentarios de foros y redes se usaron para detectar fraudes, confusiones de fechas y problemas de financiamiento; los requisitos y cifras se tomaron de MINVU y SERVIU.</p>`,
  },
  {
    slug: 'comparativa-comisiones-afp-2026',
    title: 'Comparativa de comisiones AFP 2026: cuál te conviene',
    seoTitle: 'Comisiones AFP 2026 Chile: la más barata y la más cara',
    seoDescription:
      'Compara las comisiones AFP 2026 en Chile. Revisa cuál AFP cobra menos, cuál cobra más y cuánto impacta en tu sueldo líquido.',
    description:
      'Análisis de las 7 AFP en 2026: comisión, rentabilidad histórica y SIS. Cuánto ahorras al año cambiándote de AFP cara a la más barata.',
    date: '2026-05-16',
    updatedAt: '2026-07-13',
    category: 'previsional',
    readingTime: 15,
    relatedGuia: 'afp-pension-chile',
    keywords: [
      'comisión AFP 2026',
      'cambiar de AFP',
      'AFP Uno 0.46%',
      'AFP Modelo 0.58%',
      'rentabilidad AFP',
      'tope imponible AFP',
      'tasa AFP 10%',
      'AFP más barata Chile',
      'AFP más cara Chile',
      'comisiones AFP 2026 Chile',
    ],
    relatedCalculators: [
      'calculadora-comparador-afp',
      'calculadora-sueldo-liquido',
      'calculadora-cotizacion-independientes',
    ],
    faq: [
      {
        question: '¿Cuál es la AFP más barata en Chile 2026?',
        answer:
          'En julio de 2026, AFP Uno cobra la comisión más baja sobre la remuneración imponible: 0,46%. Le sigue AFP Modelo con 0,58%. La más alta es AFP Provida con 1,45%. Para una remuneración imponible de $1.000.000 bajo el tope, la diferencia entre Uno y Provida es $9.900 mensuales.',
      },
      {
        question: '¿Cuál es la AFP más cara en Chile?',
        answer:
          'En julio de 2026, AFP Provida cobra 1,45% de la remuneración imponible; Capital y Cuprum cobran 1,44%. La comisión reduce el sueldo líquido, mientras el 10% obligatorio se deposita en la cuenta individual. No corresponde capitalizar automáticamente la diferencia de comisión como una pérdida de pensión, porque no se descuenta del 10% ahorrado.',
      },
      {
        question: '¿Conviene cambiarse de AFP por comisión?',
        answer:
          'Una comisión menor aumenta el líquido con un ahorro conocido, pero no basta para decidir. Compara comisión, rentabilidad real del mismo fondo y período, calidad de servicio y tu situación previsional. La rentabilidad futura no está garantizada y se aplica al saldo acumulado, mientras la comisión se aplica a la remuneración imponible mensual.',
      },
      {
        question: '¿Cómo me cambio de AFP en Chile?',
        answer:
          'El trámite es gratuito y se realiza con la AFP de destino, no en PreviRed. Puede hacerse virtualmente con la Clave de Seguridad para Traspaso entregada por la AFP actual, o presencialmente suscribiendo la Orden de Traspaso y los documentos exigidos. Después conviene verificar que las cotizaciones ingresen correctamente.',
      },
    ],
    content: `<p class="article-lead">Elegir AFP no es escoger entre siete cuentas idénticas. La comisión afecta el sueldo líquido de forma conocida; la rentabilidad afecta un saldo acumulado mucho mayor, pero es variable; y la calidad de servicio importa al pedir certificados, resolver rezagos o pensionarse. Esta comparación usa tasas oficiales de julio de 2026 y no promete cuál administradora tendrá mejores resultados futuros.</p>

<h2>Comisiones AFP vigentes en julio de 2026</h2>
<p>La comisión por depósito de cotizaciones se aplica como porcentaje de la remuneración imponible mensual. Se descuenta junto con el 10% obligatorio, pero tiene un destino diferente: el 10% se abona a la cuenta individual y la comisión remunera a la administradora.</p>
<table><thead><tr><th>AFP</th><th>Comisión</th><th>10% + comisión</th><th>Comisión sobre $1.000.000</th></tr></thead><tbody><tr><td><strong>Uno</strong></td><td>0,46%</td><td>10,46%</td><td>$4.600</td></tr><tr><td>Modelo</td><td>0,58%</td><td>10,58%</td><td>$5.800</td></tr><tr><td>Planvital</td><td>1,16%</td><td>11,16%</td><td>$11.600</td></tr><tr><td>Habitat</td><td>1,27%</td><td>11,27%</td><td>$12.700</td></tr><tr><td>Capital</td><td>1,44%</td><td>11,44%</td><td>$14.400</td></tr><tr><td>Cuprum</td><td>1,44%</td><td>11,44%</td><td>$14.400</td></tr><tr><td><strong>Provida</strong></td><td>1,45%</td><td>11,45%</td><td>$14.500</td></tr></tbody></table>
<p>La diferencia máxima es 0,99 puntos porcentuales. Con una remuneración imponible de $1.000.000, Uno cobra $9.900 menos al mes que Provida: $118.800 en doce meses si la remuneración y las tasas no cambian. Esa cifra no equivale a un sueldo extra; representa 11,88% de un sueldo de $1.000.000.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Fecha de corte</strong><p>Las AFP pueden modificar comisiones bajo reglas de aviso. Esta tabla fue comprobada el 13 de julio de 2026. Para una decisión posterior, consulta el comparador vigente de la Superintendencia.</p></div></aside>

<h2>Qué reduce el líquido y qué aumenta el ahorro</h2>
<p>Con imponible de $1.000.000 en Uno, se descuentan $100.000 para la cuenta obligatoria y $4.600 de comisión. En Provida se depositan igualmente $100.000 y se cobran $14.500. Cambiar a una comisión menor mejora el líquido, pero no deposita automáticamente la diferencia en la cuenta previsional.</p>
<p>Por eso es incorrecto afirmar que una comisión alta, capitalizada por treinta años, se transforma directamente en varios millones menos de pensión. Solo existiría capitalización de la diferencia si la persona ahorra o invierte ese mayor líquido. La pensión también depende de saldo inicial, cotizaciones, lagunas, rentabilidad, edad, remuneraciones, beneficiarios y modalidad.</p>

<h2>Ejemplos de ahorro por comisión</h2>
<div class="numeric-example"><div class="numeric-example__title">Pasar de Capital a Uno con imponible de $1.500.000</div><ul><li>Capital 1,44%: $21.600 al mes</li><li>Uno 0,46%: $6.900 al mes</li><li>Diferencia mensual: $14.700</li><li>Diferencia anual constante: $176.400</li></ul><span class="total">Mayor líquido anual estimado: $176.400</span></div>
<div class="numeric-example"><div class="numeric-example__title">Pasar de Habitat a Modelo con imponible de $800.000</div><ul><li>Habitat 1,27%: $10.160</li><li>Modelo 0,58%: $4.640</li><li>Diferencia mensual: $5.520</li><li>Diferencia anual: $66.240</li></ul><span class="total">Supone 12 meses con igual imponible</span></div>
<p>No proyectes una cifra nominal por treinta años como si fuera poder de compra actual. Remuneración, topes, empleo y comisiones cambian. El ahorro mensual verificable es más útil que una suma futura sin supuestos explícitos.</p>

<h2>Comisión y rentabilidad actúan sobre bases distintas</h2>
<p>La comisión mensual se aplica a la remuneración imponible. La rentabilidad se aplica al saldo del fondo, que puede ser mucho mayor que un sueldo. Una diferencia pequeña y sostenida de rentabilidad puede superar el ahorro de comisión para alguien con saldo alto; para quien recién comienza, la comisión pesa relativamente más en su flujo mensual.</p>
<p>Esto no permite escoger mirando la AFP que ganó el último año. La Superintendencia advierte que la rentabilidad es variable y nada garantiza que los resultados pasados se repitan. La comparación debe usar el <strong>mismo tipo de fondo y el mismo período</strong>, preferentemente plazos largos y rentabilidad real.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Evita rankings de un mes</strong><p>Una AFP puede encabezar un fondo durante un período y quedar detrás en otro. Cambiarse persiguiendo el último resultado no controla el retorno futuro.</p></div></aside>

<h2>Qué mirar además del precio</h2>
<ul><li><strong>Rentabilidad real:</strong> mismo fondo, período y fuente oficial.</li><li><strong>Calidad de servicio:</strong> tiempos de respuesta, canales, reclamos y disponibilidad.</li><li><strong>Trámites próximos:</strong> APV, pensión, certificados, beneficiarios, rezagos o cobranza.</li><li><strong>Seguridad:</strong> autenticación, alertas y manejo de solicitudes.</li><li><strong>Saldo y horizonte:</strong> cambian la importancia relativa de costo y rentabilidad.</li><li><strong>Fondo elegido:</strong> cambiar de AFP no equivale a cambiar de tipo de fondo.</li></ul>
<p>La herramienta <a href="https://www.spensiones.cl/infoydec" target="_blank" rel="noopener">Infórmate y Decide</a> reúne costo, rentabilidad y calidad de servicio. Es mejor base que publicidad, recomendaciones de vendedores o capturas de redes sociales.</p>

<h2>Tope imponible y sueldos altos</h2>
<p>En 2026 el tope para pensión es 90 UF mensuales. La comisión se calcula hasta esa base, cuyo equivalente en pesos depende de la UF del período. Dos trabajadores sobre el tope pagan la misma comisión absoluta en una AFP durante ese mes, aunque sus remuneraciones totales sean distintas.</p>
<p>El Seguro de Cesantía usa un tope diferente de 135,2 UF, pero no cambia la comisión AFP. Revisa la <a href="/blog/tope-imponible-2026">guía de topes imponibles</a> antes de aplicar una cifra en pesos fija durante todo el año.</p>

<h2>El SIS no sirve para ordenar las AFP</h2>
<p>Desde abril de 2026 la tasa vigente del Seguro de Invalidez y Sobrevivencia es 1,62% de la remuneración imponible. Para trabajadores dependientes es de cargo del empleador y no varía según la AFP. No debe sumarse a la comisión descontada al trabajador ni presentarse como ventaja comercial.</p>
<p>Para independientes y cotizantes voluntarios el financiamiento y período pueden diferir. No extrapoles la liquidación de un dependiente a una boleta de honorarios u Operación Renta.</p>

<h2>Cómo se relaciona con la reforma previsional</h2>
<p>La nueva cotización de cargo del empleador no reemplazó el 10% ni la comisión que paga el trabajador. Entre agosto de 2025 y julio de 2026 el aporte adicional es 1%: 0,1% se destina a la cuenta individual y 0,9% al Fondo Autónomo de Protección Previsional. El calendario aumenta gradualmente la cotización patronal en los años siguientes.</p>
<p>Ese 1% no convierte una AFP cara en barata y tampoco se suma completo al saldo administrado por la AFP. Para comparar administradoras sigue usándose la comisión sobre remuneración imponible publicada por la Superintendencia. En la liquidación, además, el aporte es costo del empleador: descontarlo del líquido del trabajador sería improcedente.</p>
<p>La reforma también incorpora prestaciones y mecanismos del Seguro Social que dependen de historia de cotizaciones y requisitos propios. No deben atribuirse a la rentabilidad o servicio de una AFP particular. Si una publicidad mezcla comisión, PGU, beneficio por años cotizados y aporte patronal en una sola proyección, separa cada componente y comprueba su fuente.</p>

<h2>Nuevos afiliados desde octubre de 2025</h2>
<p>Quienes ingresan por primera vez al sistema entre el 1 de octubre de 2025 y el 30 de septiembre de 2027 deben afiliarse a AFP Uno, adjudicataria de la licitación con 0,46%, y permanecer 24 meses. La obligación se suspende si la AFP aumenta la comisión o aparece otra con una comisión menor, bajo las condiciones legales.</p>
<p>La restricción no obliga a afiliados antiguos a trasladarse. Tampoco significa que la autoridad haya declarado a Uno como la de mayor rentabilidad: la licitación de nuevos afiliados se relaciona con la comisión.</p>

<h2>Cómo cambiarse realmente de AFP</h2>
<p>El trámite no se realiza en PreviRed. La Superintendencia establece estas vías:</p>
<ol class="steps"><li>Compara comisión, rentabilidad y servicio en la fuente oficial.</li><li>Para el canal virtual, solicita a tu AFP actual la Clave de Seguridad para Traspaso.</li><li>Ingresa al canal de la AFP de destino y suscribe la Orden de Traspaso.</li><li>Completa el documento informativo de costo y la declaración jurada exigida.</li><li>Para vía presencial, acude a una agencia de la AFP de destino con identificación.</li><li>Guarda comprobantes y verifica que las cotizaciones posteriores se acrediten correctamente.</li></ol>
<p>El traspaso es gratuito. No entregues claves a vendedores ni aceptes regalos o pagos por cambiarte: la orden incorpora una declaración sobre prohibición de compensación económica. Confirma siempre que estás en un dominio oficial.</p>

<h2>Qué ocurre con el saldo</h2>
<p>El saldo obligatorio se transfiere entre administradoras dentro del sistema. Cambiar de AFP no es retirar fondos ni reinicia la historia previsional. Descarga cartolas antes y después para comprobar saldo, bonos, cotizaciones y posibles rezagos.</p>
<p>AFP y fondo son decisiones diferentes. Puedes mantener el tipo de fondo al trasladarte o realizar otra operación bajo las reglas vigentes. No hagas ambos cambios simultáneamente sin entender cuál explica una eventual diferencia.</p>

<h2>Checklist para decidir sin promesas</h2>
<ol class="steps"><li>Confirma tu remuneración imponible y si alcanza el tope.</li><li>Calcula comisión mensual actual y alternativa.</li><li>Compara rentabilidad real del mismo fondo en varios períodos.</li><li>Revisa calidad de servicio y reclamos oficiales.</li><li>Considera saldo, horizonte y trámites próximos.</li><li>Verifica restricciones de nuevo afiliado.</li><li>Descarga cartola y revisa cotizaciones impagas o rezagos.</li><li>Tramita solo por un canal oficial.</li><li>Comprueba la acreditación posterior.</li></ol>

<h2>Errores frecuentes</h2>
<ul><li>Confundir comisión obligatoria con comisión de APV o Cuenta 2.</li><li>Decir que la diferencia de comisión entra a la cuenta individual.</li><li>Comparar rentabilidad de fondos o períodos distintos.</li><li>Prometer que la más barata siempre dará mejor pensión.</li><li>Proyectar treinta años sin inflación ni cambios de tasas.</li><li>Tramitar el cambio en una plataforma que no corresponde.</li><li>Sumar SIS al descuento del dependiente.</li><li>No verificar el primer pago después del traspaso.</li></ul>

<p>Calcula la diferencia de líquido con la <a href="/calculadoras/calculadora-comparador-afp">comparadora de AFP</a> y revisa el efecto en la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>. La herramienta estima costos; no predice rentabilidad ni recomienda una administradora.</p>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con la tabla de <a href="https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9893.html" target="_blank" rel="noopener">comisiones y SIS de la Superintendencia de Pensiones</a>, su comparador <a href="https://www.spensiones.cl/infoydec" target="_blank" rel="noopener">Infórmate y Decide</a>, las instrucciones oficiales para el <a href="https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9915.html" target="_blank" rel="noopener">traspaso a otra AFP</a> y el calendario de <a href="https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-10906.html" target="_blank" rel="noopener">cotización de cargo del empleador</a>. Las opiniones de foros se usaron para identificar dudas sobre claves, vendedores y rentabilidad reciente; ninguna se usó para recomendar una AFP.</p>`,
  },
  {
    slug: 'plusvalia-dfl2-vs-comun-chile',
    title: 'Plusvalía DFL2 vs común: ¿cuándo pagas impuesto al vender?',
    description:
      'Cómo tributa la ganancia al vender un inmueble en Chile: requisitos del cupo vitalicio de 8.000 UF, costo reajustado, mejoras y diferencias reales del DFL2.',
    date: '2026-05-16',
    updatedAt: '2026-07-13',
    category: 'vivienda',
    readingTime: 16,
    relatedGuia: 'comprar-vivienda-chile',
    keywords: [
      'plusvalía DFL2',
      'plusvalía vivienda común',
      'mayor valor enajenación inmueble',
      'art 17 N°8 LIR',
      'ley 21.210 plusvalía',
      'exención 8000 UF',
      'impuesto único 10%',
    ],
    relatedCalculators: [
      'calculadora-plusvalia',
      'calculadora-credito-hipotecario',
      'calculadora-contribuciones',
    ],
    content: `<p>Vender una propiedad por más de lo que costó no significa, por sí solo, que el impuesto sea el 10% de la diferencia ni que una vivienda DFL2 quede automáticamente exenta. En Chile, el resultado depende de <strong>quién vende, cuándo adquirió y vendió, a quién se la vende, cómo determinó el costo tributario y cuánto del cupo vitalicio de 8.000 UF ya utilizó</strong>. El régimen principal está en el artículo 17 N° 8 letra b) de la Ley sobre Impuesto a la Renta (LIR).</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Lo esencial antes de calcular</strong><p>El DFL2 no crea una exención especial para la ganancia de la venta. Una persona natural que cumple los requisitos puede tratar hasta 8.000 UF de mayor valor acumulado como ingreso no renta, sea el inmueble DFL2 o no. El exceso no siempre paga obligatoriamente 10%: bajo las condiciones legales puede existir una elección entre Impuesto Global Complementario e impuesto único sustitutivo de 10%.</p></div></aside>

<h2>Qué es el mayor valor tributario</h2>
<p>En conversación cotidiana se llama plusvalía a la diferencia entre el precio de compra y el precio de venta. Para impuestos, esa resta es incompleta. El <strong>mayor valor</strong> se obtiene comparando el precio de enajenación con el costo tributario reconocido: valor de adquisición reajustado y, cuando corresponde, mejoras que aumentaron el valor del inmueble, fueron incorporadas a él y cumplen las exigencias de respaldo e información del SII.</p>
<p>El reajuste importa especialmente si la propiedad se mantuvo durante años. Comparar $100 millones pagados una década atrás con $180 millones recibidos hoy exagera la ganancia real, porque omite inflación. Tampoco deben restarse sin análisis todos los gastos de una remodelación: una boleta o factura ayuda a probar el desembolso, pero no convierte automáticamente una reparación, decoración o mantención en mejora aceptada para el costo tributario.</p>

<div class="numeric-example"><div class="numeric-example__title">Ejemplo pedagógico de costo tributario</div><ul><li>Precio de venta: $180.000.000.</li><li>Precio histórico de compra: $100.000.000.</li><li>Costo de adquisición reajustado, supuesto para el ejemplo: $132.000.000.</li><li>Mejoras aceptadas y reajustadas, supuesto: $8.000.000.</li><li>Mayor valor preliminar: $180.000.000 − $140.000.000 = $40.000.000.</li></ul><span class="total">La base no sería la diferencia bruta de $80 millones</span></div>
<p>Este ejemplo no reemplaza el cálculo del SII: el período exacto de reajuste, el valor de las mejoras y el tratamiento de gastos deben acreditarse con los antecedentes de la operación.</p>

<h2>Quién puede usar el cupo de 8.000 UF</h2>
<p>El beneficio no está reservado a una “vivienda principal” ni depende de que el inmueble tenga recepción DFL2. Según la guía de Operación Renta del SII, puede aplicar a la enajenación de bienes raíces situados en Chile efectuada por una <strong>persona natural domiciliada o residente en Chile</strong>, siempre que se cumplan las condiciones legales. Entre ellas, el inmueble no debe estar asignado a una empresa individual que determine renta efectiva y la venta no debe realizarse a una parte relacionada en los términos del artículo 17 N° 8.</p>
<p>También se revisa el tiempo entre adquisición y venta:</p>
<ul>
<li>Debe transcurrir <strong>más de un año</strong> para terrenos, casas, departamentos, oficinas y otros inmuebles en el caso general.</li>
<li>El plazo aumenta a <strong>más de cuatro años</strong> cuando se trata de subdivisión de terrenos urbanos o rurales o de venta de edificios por pisos o departamentos, según los supuestos definidos por la ley.</li>
<li>Una venta anticipada no se arregla llamando DFL2 al inmueble: cambia el tratamiento del mayor valor y requiere revisar la tributación aplicable.</li>
</ul>
<p>La relación con el comprador es otro filtro. El asistente del SII menciona, entre otros, ventas al cónyuge o conviviente civil, ascendientes y descendientes, además de operaciones con sociedades en las que existe participación o relación legal. Una compraventa dentro de la familia o con una empresa propia, por tanto, no debe simularse con la regla general de un tercero independiente.</p>

<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>La fecha de adquisición puede cambiar el régimen</strong><p>El asistente de Renta 2026 del SII encuadra esta regla para inmuebles adquiridos desde el 1 de enero de 2004. Los adquiridos antes de esa fecha tienen normas transitorias y alternativas históricas que no conviene resumir con una fórmula automática. Si la escritura es anterior a 2004, revisa el caso con el SII o un asesor tributario antes de prometer una exención.</p></div></aside>

<h2>Cómo funciona el límite vitalicio de 8.000 UF</h2>
<p>Las 8.000 UF son un <strong>límite acumulado durante la vida del contribuyente</strong>, considerando todas las ventas que usaron el beneficio. No son 8.000 UF por propiedad, por año, por matrimonio ni por declaración. El SII mantiene información de los mayores valores declarados, pero el vendedor debe comprobar que los datos y el remanente sean correctos.</p>
<p>Para el Año Tributario 2026, correspondiente a operaciones e ingresos del año comercial 2025, el SII informó como referencia que 8.000 UF al 31 de diciembre de 2025 equivalían a <strong>$317.823.680</strong>. Esa cifra en pesos no sirve como valor fijo para ventas futuras: la conversión se determina con la UF que corresponda conforme a las instrucciones del año de la operación.</p>

<div class="numeric-example"><div class="numeric-example__title">Tres ventas y un solo cupo</div><ul><li>Primera venta: mayor valor tributario de 2.500 UF; remanente, 5.500 UF.</li><li>Segunda venta: mayor valor tributario de 4.000 UF; remanente, 1.500 UF.</li><li>Tercera venta: mayor valor tributario de 2.200 UF.</li><li>Parte cubierta por el remanente: 1.500 UF.</li><li>Exceso potencialmente afecto: 700 UF.</li></ul><span class="total">El análisis tributario se concentra en el exceso de 700 UF</span></div>
<p>Incluso en este ejemplo hay que verificar que las tres ventas cumplan plazos, independencia entre las partes y las demás condiciones. Si una operación no entra al régimen, no basta con ubicarla cronológicamente dentro del cupo.</p>

<h2>¿El exceso siempre paga impuesto único de 10%?</h2>
<p>No. Para la persona natural que cumple el régimen, el mayor valor que supera el saldo de 8.000 UF puede quedar afecto al <strong>Impuesto Global Complementario</strong> o, si se cumplen las condiciones, al <strong>impuesto único y sustitutivo de 10%</strong>. La elección y el momento en que se reconoce el ingreso dependen de la forma de pago y de las instrucciones de la Operación Renta correspondiente.</p>
<p>Decir “toda venta paga 10%” produce dos errores opuestos: puede cobrar impuesto sobre una parte cubierta por el cupo, o puede ocultar que una venta a relacionado, una operación empresarial o una enajenación que no respetó el plazo tiene otra tributación. La tasa tampoco debe aplicarse sobre el precio total, sino sobre el mayor valor afecto correctamente determinado.</p>

<h2>DFL2 versus propiedad común: la diferencia real</h2>
<p>El Decreto con Fuerza de Ley N° 2 de 1959 establece beneficios para viviendas económicas de hasta 140 m² que cumplen sus requisitos y cuya calidad consta en los antecedentes del inmueble. Esos beneficios no sustituyen el artículo 17 N° 8 de la LIR al vender.</p>
<table>
<thead><tr><th>Pregunta</th><th>Propiedad común</th><th>Vivienda DFL2 elegible</th></tr></thead>
<tbody>
<tr><td>¿Tiene cupo especial de plusvalía?</td><td>No; puede usar la regla general si cumple.</td><td>No; usa la misma regla general si cumple.</td></tr>
<tr><td>¿Las 8.000 UF son solo para vivienda?</td><td>No necesariamente; la norma cubre bienes raíces situados en Chile bajo sus requisitos.</td><td>Tampoco; la calidad DFL2 no crea el cupo.</td></tr>
<tr><td>¿El arriendo tiene el mismo tratamiento?</td><td>La renta se declara según las reglas generales.</td><td>Una persona natural puede mantener el beneficio de renta para un máximo de dos viviendas DFL2 elegibles, normalmente las más antiguas.</td></tr>
<tr><td>¿Contribuciones y herencia son siempre gratis?</td><td>No.</td><td>No debe afirmarse así: los beneficios dependen de requisitos, antigüedad, titular y normas específicas.</td></tr>
</tbody>
</table>
<p>Desde las modificaciones asociadas a la Ley 21.420, la exención por rentas de arrendamiento DFL2 está limitada para personas naturales a dos viviendas elegibles. El SII señala que se consideran las de adquisición más antigua. Esa ventaja de arriendo es distinta del impuesto al vender: una persona puede tener renta DFL2 exenta y, años después, generar un mayor valor afecto si agotó las 8.000 UF o incumple otra condición.</p>

<h2>Qué cambia si vende una sociedad</h2>
<p>Una SpA, sociedad limitada u otra persona jurídica <strong>no usa el cupo personal de 8.000 UF</strong>. La utilidad entra al régimen tributario de la empresa y su carga final depende, entre otros factores, del régimen de renta, los créditos asociados y la forma en que los propietarios retiren o distribuyan resultados. Por eso no existe un porcentaje total universal que pueda reemplazar la contabilidad de la sociedad.</p>
<p>También merece revisión una propiedad comprada personalmente pero explotada o asignada a una empresa individual. La titularidad inscrita no es el único dato: el tratamiento contable y tributario puede sacar la operación del supuesto pensado para una persona natural ajena a actividad empresarial.</p>

<h2>Documentos que conviene ordenar antes de publicar o firmar</h2>
<ol class="steps">
<li><strong>Escritura de adquisición e inscripción:</strong> permiten probar fecha, precio, titularidad y calidad del inmueble.</li>
<li><strong>Escritura o borrador de venta:</strong> identifica precio, comprador, pagos en cuotas y posibles relaciones entre las partes.</li>
<li><strong>Antecedentes de mejoras:</strong> permisos, recepciones, contratos, comprobantes tributarios y pagos. Una carpeta de facturas sin vínculo con una mejora incorporada puede ser insuficiente.</li>
<li><strong>Historial del cupo:</strong> declaraciones de renta y ventas anteriores en que se utilizó ingreso no renta.</li>
<li><strong>Certificado o escritura DFL2:</strong> sirve para beneficios propios del régimen, no para inventar una exención de plusvalía.</li>
<li><strong>Información de la contraparte:</strong> ayuda a detectar parentesco, participación societaria u otra relación antes de calcular.</li>
</ol>

<h2>Cómo se informa en Operación Renta</h2>
<p>La venta se revisa en el Formulario 22 del año tributario siguiente al año comercial de la operación. El SII dispone un asistente para la enajenación de bienes raíces y utiliza información de declaraciones juradas, notarías y registros, pero la propuesta no libera al contribuyente de corregir datos incompletos. En el Recuadro N° 2 del Formulario 22 se informan antecedentes como precio de enajenación, costo de adquisición y mejoras, de acuerdo con las instrucciones vigentes.</p>
<p>No existe una regla general que obligue a “adjuntar tres documentos” en cada declaración ni una garantía de que el sistema descontará todo correctamente sin intervención. Los respaldos deben conservarse y entregarse si el SII los solicita. Si hubo cuotas, permuta, copropiedad, herencia previa, usufructo, adquisición anterior a 2004 o una parte relacionada, conviene obtener una revisión profesional antes de presentar.</p>

<h2>Errores frecuentes que cambian el resultado</h2>
<ul>
<li>Usar precio de compra histórico sin reajustarlo.</li>
<li>Contar gastos de mantención como mejoras aceptadas.</li>
<li>Aplicar 8.000 UF por cada propiedad.</li>
<li>Creer que el DFL2 está exento por el solo texto de la escritura.</li>
<li>Ignorar ventas antiguas que ya consumieron parte del cupo.</li>
<li>Aplicar 10% al precio de venta en vez del mayor valor afecto.</li>
<li>Tratar una venta al hijo o a la propia sociedad como operación entre independientes.</li>
<li>Suponer que la sociedad puede usar el cupo del socio.</li>
<li>Convertir 8.000 UF a pesos con un valor de UF visto en una noticia o buscador.</li>
</ul>

<p>Para una primera estimación, usa la <a href="/calculadoras/calculadora-plusvalia">calculadora de plusvalía</a> con el costo reajustado y el saldo real de beneficio, no solo con los precios de las escrituras. Si estás evaluando la compra antes de vender, complementa con la <a href="/calculadoras/calculadora-credito-hipotecario">calculadora de crédito hipotecario</a> y la <a href="/calculadoras/calculadora-contribuciones">calculadora de contribuciones</a>. Ninguna simulación puede decidir por sí sola si una mejora fue aceptada o si existe relación tributaria.</p>

<h2>Fuentes oficiales consultadas</h2>
<p>Contenido revisado al 13 de julio de 2026 con el <a href="https://www.sii.cl/destacados/renta/2026/personas/documents/pap_venta_bienes_raices_2026.pdf" target="_blank" rel="noopener">asistente del SII para venta de bienes raíces, Renta 2026</a>, la <a href="https://www.sii.cl/servicios_online/renta/guia_practica_renta_2026.pdf" target="_blank" rel="noopener">Guía Práctica de Declaración de Renta 2026</a>, la respuesta del SII sobre el <a href="https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_3802.htm" target="_blank" rel="noopener">límite acumulado de 8.000 UF</a>, las instrucciones del <a href="https://www.sii.cl/servicios_online/renta/2026/rentaform.html" target="_blank" rel="noopener">Formulario 22 de 2026</a>, la FAQ sobre <a href="https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_8484.htm" target="_blank" rel="noopener">rentas de viviendas DFL2</a> y el texto vigente de la <a href="https://www.bcn.cl/leychile/navegar?idNorma=6368" target="_blank" rel="noopener">Ley sobre Impuesto a la Renta</a>. Las dudas repetidas en foros inmobiliarios se usaron solo para detectar errores de interpretación; las reglas y cifras provienen de fuentes oficiales.</p>`,
  },
  {
    slug: 'cae-renegociacion-condonacion-2026',
    title: 'CAE en 2026: rebajar cuota, suspender y regularizar mora',
    description:
      'Qué hacer con el CAE según estés al día, con cuota alta, cesante, moroso o en TGR: rebaja al 10%, suspensión, reprogramación y estado del FES.',
    date: '2026-05-16',
    updatedAt: '2026-07-13',
    category: 'educacion',
    readingTime: 18,
    relatedGuia: 'credito-cae-educacion-chile',
    keywords: [
      'CAE 2026',
      'simulador CAE 2026',
      'calculadora CAE',
      'cuota CAE',
      'reprograma CAE',
      'renegociar CAE',
      'condonación CAE',
      'INGRESA',
      'tasa CAE 2%',
      'pago contingente al ingreso CAE',
    ],
    relatedCalculators: [
      'calculadora-credito-cae',
      'calculadora-uf-clp',
      'calculadora-sueldo-liquido',
      'calculadora-credito-hipotecario',
    ],
    content: `<p class="article-lead">“Renegociar el CAE” puede significar cuatro trámites diferentes. Una persona al día pero con cuota alta solicita rebaja al 10% de la renta; una persona cesante pide suspensión; quien acumula cuotas impagas revisa Reprograma CAE con su acreedor; y quien ya tiene garantía pagada debe identificar qué parte está en el banco, la institución educacional o Tesorería. El primer paso no es simular: es ubicar la deuda.</p>

<h2>Diagnóstico: en qué estado está tu CAE</h2>
<table><thead><tr><th>Situación</th><th>Herramienta principal</th><th>Dónde se gestiona</th></tr></thead><tbody><tr><td>Al día, cuota mayor a 10% de renta</td><td>Rebaja por seis meses renovables</td><td>Comisión Ingresa</td></tr><tr><td>Cesante o sin ingresos suficientes</td><td>Suspensión por seis meses renovables</td><td>Comisión Ingresa</td></tr><tr><td>Al menos dos cuotas impagas</td><td>Reprogramación de mora, si el portal confirma elegibilidad</td><td>Reprograma CAE / acreedores</td></tr><tr><td>Garantía estatal pagada y deuda fiscal</td><td>Convenio CAE</td><td>Tesorería General de la República</td></tr><tr><td>Al día y con ahorro disponible</td><td>Prepago total o parcial</td><td>Banco administrador</td></tr></tbody></table>
<p>Entra primero a “Mi Crédito CAE” para ver banco, desembolsos, calendario y estado de garantías. Luego revisa la Cuenta Única Tributaria en TGR si aparece deuda fiscal. Una misma persona puede tener más de un acreedor: el pago de la garantía no necesariamente elimina todos los montos cobrados por el banco.</p>

<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No uses el proyecto FES como estado de cuenta</strong><p>Al 13 de julio de 2026, la propuesta de reorganización y condonación del Boletín 17.169-04 no es una ley vigente. No congela cuotas, no borra mora y no autoriza a dejar de pagar.</p></div></aside>

<h2>Si estás al día pero la cuota es demasiado alta</h2>
<p>La cuota CAE no queda automáticamente limitada al 10% del sueldo. Debes solicitar el beneficio en contingencia.ingresa.cl y acreditar la renta bruta del período indicado. Comisión Ingresa compara la cuota normal con 10% del promedio de renta bruta mensual de los últimos doce meses.</p>
<ul>
<li>Si 10% de la renta es menor que la cuota, se asigna la cuota rebajada.</li>
<li>El Estado subsidia la diferencia y no la agrega al final del crédito.</li>
<li>La rebaja dura seis meses y requiere una nueva solicitud para renovarse.</li>
<li>El formulario está disponible todo el año; el inicio depende de si se envía antes o después del día 15.</li>
<li>Hay que seguir pagando la cuota informada dentro del plazo bancario.</li>
</ul>

<div class="numeric-example"><div class="numeric-example__title">Cuota normal $165.000 y renta promedio $950.000</div><ul><li>10% de renta: $95.000.</li><li>Cuota aprobada: $95.000 durante seis meses.</li><li>Diferencia mensual cubierta por el Estado: $70.000.</li><li>Saldo diferido por esa diferencia: $0.</li></ul><span class="total">La rebaja es subsidio, no postergación</span></div>
<p>Si tu cuota normal ya es inferior a 10% de la renta, Ingresa mantiene el monto menor. Si no tienes ingresos en los últimos seis meses, o el promedio es igual o inferior a la cuota, corresponde evaluar suspensión, no forzar una postulación de rebaja.</p>

<h2>Si estás cesante: suspensión antes de 45 días de mora</h2>
<p>La suspensión no es automática cuando termina un contrato. Debes acreditar cesantía o desempleo y la insuficiencia de ingresos del grupo familiar. La solicitud puede requerir antecedentes del cónyuge o conviviente. Para acceder, debes estar al día o tener una mora no superior a 45 días corridos desde la última cuota pagada.</p>
<ul>
<li>Se concede por seis meses, renovables por períodos iguales mediante una nueva solicitud.</li>
<li>No existe el máximo general de 24 meses que señalaba la versión anterior.</li>
<li>Las cuotas suspendidas pasan al final del calendario con igual valor en UF.</li>
<li>No generan intereses por el período de suspensión.</li>
<li>No pueden suspenderse otra vez, pero después pueden rebajarse al 10% de la renta.</li>
</ul>
<p>Si encuentras trabajo durante el semestre aprobado, el beneficio se mantiene hasta completar el período según Ingresa. Anota cuándo recomienza el pago y tramita con anticipación una rebaja si el nuevo ingreso no soporta la cuota normal.</p>

<h2>Si tienes dos o más cuotas impagas: Reprograma CAE</h2>
<p>Comisión Ingresa sigue dirigiendo en 2026 a Reprograma CAE a deudores con al menos dos cuotas impagas, incluidos casos con demanda o garantía pagada. La información oficial describe la posibilidad de quedar al día pagando una cuota, sin cobrar intereses moratorios ni gastos de cobranza dentro de ese proceso, y recuperar beneficios de pago.</p>
<p>No lo confundas con una condonación del capital ni con un descuento universal de “hasta 50%”. Antes de aceptar:</p>
<ol class="steps"><li>Ingresa por el dominio oficial enlazado desde Comisión Ingresa.</li><li>Revisa quiénes son los acreedores y qué saldo incluye el contrato.</li><li>Comprueba monto de la cuota de activación y vencimiento.</li><li>Lee el nuevo calendario completo, no solo la primera cuota.</li><li>Confirma qué registros y acciones se regularizan.</li><li>Guarda contrato, comprobante y confirmación final.</li></ol>
<p>La cuenta pública 2025 de Comisión Ingresa describe este mecanismo como un proceso extraordinario iniciado en 2020. Debido a su origen y a que las condiciones operativas pueden cambiar, no pagues basándote solo en una nota antigua: verifica que el portal te reconozca como elegible y que el contrato corresponda a tu deuda actual.</p>

<h2>Si la garantía fue pagada: separa cada acreedor</h2>
<p>Ante mora prolongada, el banco puede solicitar que paguen las garantías. El Estado y, según la situación académica, la institución de educación superior cubren porcentajes y pasan a ser acreedores por las sumas pagadas. Tesorería se subroga en la parte estatal; el banco puede conservar otras obligaciones no cubiertas.</p>
<p>Las cuotas que fueron suspendidas por cesantía tienen un tratamiento particular: Ingresa explica que la garantía no las cubre porque el Fisco financió esa suspensión, y el banco puede encargarse de cobrarlas posteriormente. Por eso una cartola bancaria después de aparecer deuda en TGR no prueba necesariamente doble cobro. Pide desglose por origen, período y acreedor.</p>

<h2>Convenio CAE en Tesorería</h2>
<p>TGR permite crear convenios para personas naturales con deuda CAE morosa de al menos 1 UTM y sin exclusiones. El convenio puede ser de 12, 18 o 24 cuotas según comportamiento de pago. La cuota considera al menos 10%, 15% o 20% de los ingresos registrados, y pie y cuota no pueden ser inferiores a 1 UTM.</p>
<p>Si la renta registrada no refleja una cesantía actual, se pueden presentar antecedentes como finiquito o certificados previsionales para pedir una cuota menor, sujeto a evaluación. Un convenio se activa al pagar el pie; solicitarlo sin pagar no suspende por sí solo la cobranza.</p>
<p>Antes de suscribirlo revisa:</p>
<ul>
<li>deuda neta total incluida;</li>
<li>pie y fecha límite;</li>
<li>número de cuotas y porcentaje de ingreso;</li>
<li>causales de caducidad según el convenio;</li>
<li>efecto sobre acciones judiciales ya iniciadas;</li>
<li>qué deuda queda fuera y quién la cobra.</li>
</ul>
<p>El convenio suspende acciones mientras está vigente, pero no alza automáticamente un embargo ya inscrito. TGR señala que el alzamiento requiere pagar íntegramente la deuda. Si el convenio caduca, puede reactivarse la cobranza.</p>

<h2>Retención de devolución de renta</h2>
<p>Ingresa informa que TGR puede retener excedentes de devolución de impuestos de beneficiarios morosos o con garantía pagada y aplicarlos a cuotas impagas. No existe en esa explicación un porcentaje universal de 50%. Si queda remanente después de cubrir cuotas, se retira según el procedimiento informado por el banco administrador.</p>
<p>Revisa el detalle en “Mi Crédito CAE” durante el segundo semestre: cuántas cuotas se cubrieron, monto aplicado y eventual remanente. Una devolución retenida no demuestra que toda la deuda quedó saldada.</p>

<h2>Prepagar no es renegociar y sí puede tener comisión</h2>
<p>Un deudor al día puede prepagar en el banco. El abono parcial debe alcanzar al menos 10% del saldo, incluidos intereses y comisiones. El banco descuenta intereses devengados y una comisión equivalente a 1,5 meses de interés sobre el capital prepagado; el resto reduce capital.</p>
<p>Después se puede mantener el plazo con cuota menor o mantener cuota para acortar plazo. Solicita una liquidación escrita: un abono de $1 millón no reduce necesariamente el capital en $1 millón. Además, prepagar una deuda UF + 2% ofrece un ahorro real conocido, pero usar todo el fondo de emergencia puede ser perjudicial si el ingreso es inestable.</p>
<p>La <a href="/calculadoras/calculadora-credito-cae">calculadora CAE</a> compara tasa y plazo, pero no incorpora el contrato escalonado, mora ni comisión de prepago. Usa la cifra del banco para decidir.</p>

<h2>FES y condonación: estado real al 13 de julio de 2026</h2>
<p>El Boletín N° 17.169-04 propone reemplazar el CAE y otros créditos por un instrumento público, junto con un plan de reorganización y condonación. La propuesta describe condonación inicial, mensual y por pago anticipado según situación académica y de pago. Sigue siendo proyecto en tramitación y su diseño puede cambiar.</p>
<p>No están vigentes las afirmaciones “50% para quien pagó cinco años”, “total a los diez años” o “saldo eliminado a las 240 cuotas”. Tampoco hay un formulario actual para pedir esa condonación. El sitio FES de Mineduc advierte que sus respuestas corresponden al diseño del proyecto.</p>
<p>Una eventual aprobación necesitaría ley publicada, fechas de entrada, reglamento o instrucciones y proceso de adhesión. Hasta entonces, dejar de pagar puede generar mora, pérdida de beneficios, retención de devolución y cobranza.</p>

<h2>Qué consecuencias están verificadas y cuáles no</h2>
<p>Las fuentes oficiales verificadas describen cobranza bancaria, pago de garantías, subrogación de TGR, retención de devolución de renta, acciones judiciales y posibles embargos. La versión anterior afirmaba además que la mora impedía renovar pasaporte o licencia de conducir y que bastaban seis pagos para salir de un registro. No encontramos respaldo oficial para esas reglas y fueron eliminadas.</p>
<p>Desde abril de 2026 funciona el Registro de Deuda Consolidada de la CMF. Si necesitas conocer qué obligaciones reportan las entidades financieras, descarga tu informe personal en “Conoce tu Deuda” con ClaveÚnica y compáralo con Ingresa y TGR. No pagues a un tercero por “borrar DICOM” sin identificar qué registro contiene la obligación.</p>

<h2>Plan de acción por prioridad</h2>
<ol class="steps"><li><strong>Hoy:</strong> identifica banco, cuota vencida, días de mora, garantías y deuda TGR.</li><li><strong>Antes de 45 días:</strong> si estás cesante, solicita suspensión con antecedentes completos.</li><li><strong>Al día con ingreso bajo:</strong> pide la rebaja al 10% y programa renovación a seis meses.</li><li><strong>Dos o más cuotas:</strong> revisa elegibilidad y contrato en Reprograma CAE.</li><li><strong>Deuda fiscal:</strong> simula convenio TGR y calcula el pie antes de aceptar.</li><li><strong>Cobranza judicial:</strong> conserva notificaciones y obtén asesoría; no ignores plazos.</li><li><strong>Proyecto FES:</strong> monitorea el boletín, pero no lo incluyas como ingreso o condonación confirmada.</li></ol>

<h2>Fuentes oficiales consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con las recomendaciones de <a href="https://portal.ingresa.cl/como-pagar/como-pagar-el-cae/recomendaciones-para-pagar/" target="_blank" rel="noopener">pago y Reprograma CAE de Comisión Ingresa</a>, la explicación de <a href="https://portal.ingresa.cl/preguntas-frecuentes/pago-del-credito-rebaja-cuotas-al-10-de-la-renta/" target="_blank" rel="noopener">rebaja al 10% de la renta</a>, las reglas de <a href="https://cesantia.ingresa.cl/docs/pfrecuentes.html" target="_blank" rel="noopener">suspensión por cesantía</a>, el trámite TGR para <a href="https://portal-ayuda.tgr.cl/ayuda/convenios-particulares/crear-convenio-de-pago-para-el-credito-de-educacion-superior-con-aval-del-estado-cae" target="_blank" rel="noopener">crear convenio CAE</a>, la <a href="https://www.bcn.cl/leychile/navegar?idNorma=240080" target="_blank" rel="noopener">Ley 20.027</a> y el estado legislativo del Boletín 17.169-04. Los relatos de foros se usaron para detectar confusiones sobre TGR, doble acreedor y condonación; no como fuente de beneficios.</p>`,
  },
  {
    slug: 'tope-imponible-2026',
    title: 'Tope imponible 90 UF: qué es y por qué importa en 2026',
    seoTitle: 'Tope Imponible 2026 en Chile: AFP, salud y cesantía',
    seoDescription:
      'Revisa el tope imponible 2026 para AFP, salud y seguro de cesantía, con valores en UF, equivalente en pesos y ejemplos.',
    description:
      'Qué es el tope imponible AFP/salud (90 UF en 2026), cómo se ajusta cada año y por qué reduce las cotizaciones efectivas para sueldos altos.',
    date: '2026-05-16',
    updatedAt: '2026-07-13',
    category: 'previsional',
    readingTime: 15,
    relatedGuia: 'sueldo-liquido-chile',
    keywords: [
      'tope imponible 90 UF',
      'tope cesantía 135.2 UF',
      'imponible AFP salud',
      'D.L. 3500 art 16',
      'sueldo alto Chile',
      'cotización tope',
      'remuneración tope',
      'tope imponible 2026',
      'tope imponible julio 2026',
    ],
    relatedCalculators: [
      'calculadora-sueldo-liquido',
      'calculadora-comparador-afp',
      'calculadora-cotizacion-independientes',
      'calculadora-costo-empleado-pyme',
    ],
    faq: [
      {
        question: '¿Cuál es el tope imponible 2026 en Chile?',
        answer:
          'Para remuneraciones desde febrero de 2026, el tope mensual es 90 UF para pensiones, salud y accidentes del trabajo. El Seguro de Cesantía usa 135,2 UF. El equivalente en pesos cambia con la UF del período, por lo que no existe una cifra CLP única para todo 2026.',
      },
      {
        question: '¿Cómo afecta el tope imponible a mi sueldo líquido?',
        answer:
          'Bajo 90 UF, pensión y salud se calculan sobre toda la remuneración imponible. Sobre 90 UF, esos descuentos se topan, pero cesantía puede seguir hasta 135,2 UF y el impuesto único no usa esos topes. El resultado exacto depende de la UF, AFP, salud, contrato y descuentos del mes.',
      },
      {
        question: '¿Cuándo se actualiza el tope imponible?',
        answer:
          'La Superintendencia lo determina anualmente según la variación del Índice de Remuneraciones Reales del INE. Para 2026 informó 90 UF y 135,2 UF, aplicables desde las remuneraciones de febrero. Si la variación relevante es negativa, la legislación mantiene el valor; no lo reduce automáticamente.',
      },
      {
        question: '¿El tope imponible aplica a trabajadores independientes?',
        answer:
          'Sí, pero su cálculo anual no debe reducirse siempre a dividir por doce. En Operación Renta se considera generalmente 80% de los honorarios brutos del año anterior, topes anuales y cobertura total o parcial. Deben usarse las instrucciones del año tributario correspondiente.',
      },
    ],
    content: `<p class="article-lead">El tope imponible no limita tu sueldo ni el impuesto a la renta. Limita la base sobre la que se calculan determinadas cotizaciones. En 2026 existen al menos dos máximos relevantes: 90 UF para pensión, salud y accidentes del trabajo, y 135,2 UF para Seguro de Cesantía. Confundirlos produce liquidaciones incorrectas en remuneraciones altas.</p>

<h2>Qué significa “tope imponible”</h2>
<p>La remuneración imponible reúne los pagos afectos a cotizaciones: sueldo, gratificación, comisiones, horas extra y bonos remuneracionales, entre otros. El tope es la cantidad máxima de esa base que se utiliza para una cotización específica. La parte que excede sigue siendo remuneración y puede pagar impuesto; simplemente queda fuera de ciertas cotizaciones obligatorias.</p>
<p>Para remuneraciones desde febrero de 2026, la Superintendencia informó:</p>
<ul class="data-grid"><li><span class="data-grid__label">Pensiones, salud y accidentes</span><span class="data-grid__value">90 UF mensuales</span></li><li><span class="data-grid__label">Seguro de Cesantía</span><span class="data-grid__value">135,2 UF mensuales</span></li><li><span class="data-grid__label">Unidad</span><span class="data-grid__value">UF del período</span></li><li><span class="data-grid__label">Vigencia 2026</span><span class="data-grid__value">Remuneraciones desde febrero</span></li></ul>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No congeles el equivalente en pesos</strong><p>Noventa UF no tienen el mismo valor en enero y julio. Una guía que publica $3,67 millones como tope para todo 2026 queda desactualizada aunque las 90 UF sigan vigentes.</p></div></aside>

<h2>Qué cotización usa cada máximo</h2>
<table><thead><tr><th>Concepto</th><th>Tope 2026</th><th>Quién lo financia habitualmente</th></tr></thead><tbody><tr><td>10% cuenta individual AFP</td><td>90 UF</td><td>Trabajador</td></tr><tr><td>Comisión AFP</td><td>90 UF</td><td>Trabajador</td></tr><tr><td>Salud legal 7%</td><td>90 UF</td><td>Trabajador</td></tr><tr><td>SIS dependientes</td><td>90 UF</td><td>Empleador</td></tr><tr><td>Accidentes del trabajo</td><td>90 UF</td><td>Empleador</td></tr><tr><td>Seguro de Cesantía</td><td>135,2 UF</td><td>Trabajador y/o empleador según contrato</td></tr></tbody></table>
<p>La tabla resume el régimen común. Pensionados que continúan trabajando, trabajadores de casa particular, independientes y regímenes especiales pueden tener reglas distintas. El precio de un plan Isapre que supera la cotización legal tampoco queda explicado solo con el 7% topado.</p>

<h2>Cómo convertir el tope a pesos</h2>
<p>Primero identifica el valor de UF que corresponde al período de remuneración y pago previsional. Luego multiplica:</p>
<ul><li>Tope pensión y salud = UF aplicable × 90.</li><li>Tope cesantía = UF aplicable × 135,2.</li></ul>
<p>Como ilustración, con la UF de $40.844,79 del 13 de julio de 2026, 90 UF equivalen a $3.676.031 y 135,2 UF a aproximadamente $5.522.215. Es una fotografía de ese día, no el valor normativo en pesos para todos los pagos de julio.</p>
<div class="numeric-example"><div class="numeric-example__title">Remuneración imponible de $5.000.000</div><ul><li>Base pensión/salud ilustrativa: $3.676.031</li><li>Base cesantía ilustrativa: $5.000.000, porque está bajo 135,2 UF del ejemplo</li><li>Base de impuesto: se determina con reglas tributarias, no se topa en 90 UF</li></ul><span class="total">Se usan dos bases previsionales distintas</span></div>

<h2>Ejemplo con AFP Habitat y Fonasa</h2>
<p>Supuestos: remuneración imponible de $5.000.000, contrato indefinido, AFP Habitat con comisión 1,27%, Fonasa, UF ilustrativa anterior y persona no pensionada.</p>
<div class="numeric-example"><div class="numeric-example__title">Descuentos del trabajador antes de impuesto</div><ul><li>Cuenta individual 10% sobre $3.676.031: $367.603</li><li>Comisión 1,27% sobre $3.676.031: $46.685</li><li>Salud 7% sobre $3.676.031: $257.322</li><li>Cesantía 0,6% sobre $5.000.000: $30.000</li><li>Total previsional estimado: $701.610</li></ul><span class="total">Después debe calcularse impuesto único</span></div>
<p>Si se aplicara por error 90 UF también a cesantía, se descontarían cerca de $22.056 en vez de $30.000. Si se aplicaran porcentajes previsionales sobre los $5 millones completos, se cobraría de más en pensión y salud.</p>

<h2>El porcentaje efectivo cae, pero no es una bonificación</h2>
<p>Sobre el tope, el descuento de pensión deja de crecer aunque aumente el sueldo. Por eso su porcentaje respecto del bruto total disminuye. Esto no significa que la persona reciba un beneficio especial: también deja de generar ahorro obligatorio sobre el exceso.</p>
<p>La brecha entre ingreso y base previsional puede afectar la tasa de reemplazo futura. APV u otros ahorros pueden ayudar, pero no existe una recomendación universal de usar régimen A o B. La elección depende de impuestos, horizonte, liquidez, costos y riesgo; una guía general no puede prometer mantener el nivel de vida.</p>

<h2>Seguro de Cesantía: por qué se calcula aparte</h2>
<p>El máximo de 135,2 UF es mayor que el previsional. En contratos indefinidos, el trabajador aporta normalmente 0,6% y el empleador financia componentes adicionales. En contratos a plazo o por obra, el aporte ordinario es de cargo del empleador según la Ley N.º 19.728.</p>
<p>El tope más alto permite que cotizaciones de cesantía continúen en un tramo donde pensión y salud ya se detuvieron. No demuestra por sí solo cuánto podrá retirar una persona: las prestaciones dependen de saldo, causal, número de cotizaciones y acceso al Fondo de Cesantía Solidario.</p>

<h2>Impuesto único no usa el tope de 90 UF</h2>
<p>El impuesto único de segunda categoría se calcula sobre una base tributable y una tabla mensual en UTM. Las cotizaciones obligatorias aceptadas reducen esa base bajo las reglas tributarias, pero el excedente salarial sobre 90 UF no queda exento de impuesto por superar el máximo previsional.</p>
<p>Este punto explica por qué un sueldo alto puede dejar de aumentar sus descuentos AFP y, al mismo tiempo, entrar en un tramo marginal mayor de impuesto. Para reconstruir el líquido se calculan primero haberes e imponibles, luego previsión y finalmente la tabla SII del mes.</p>

<h2>Cómo se determina cada año</h2>
<p>El artículo 16 del DL N.º 3.500 vincula el reajuste a la variación del Índice de Remuneraciones Reales del INE. La Superintendencia calcula y comunica los máximos. Si la variación relevante es negativa, los valores se mantienen; no bajan automáticamente como afirmaba el resumen anterior.</p>
<table><thead><tr><th>Año</th><th>Pensión/salud</th><th>Cesantía</th></tr></thead><tbody><tr><td>2023</td><td>83,4 UF</td><td>125,1 UF</td></tr><tr><td>2024</td><td>84,3 UF</td><td>126,5 UF</td></tr><tr><td>2025</td><td>87,8 UF</td><td>131,9 UF</td></tr><tr><td><strong>2026</strong></td><td><strong>90 UF</strong></td><td><strong>135,2 UF</strong></td></tr></tbody></table>
<p>El comunicado 2026 se publicó el 10 de febrero y aplica los nuevos máximos desde remuneraciones de febrero, pagadas previsionalmente en marzo. Para remuneraciones de enero no debe aplicarse retroactivamente el tope nuevo.</p>
<p>En enero de 2026 rigió transitoriamente un máximo de 89,9 UF para pensión, salud y accidentes, fijado por la Resolución Exenta N.º 27. La Resolución Exenta N.º 237 dejó ese acto sin efecto desde febrero y estableció las 90 UF definitivas. No corresponde volver al tope 2025 de 87,8 UF para liquidar enero de 2026.</p>

<h2>Dos empleadores y pagos en exceso</h2>
<p>El límite es por persona y período, no un máximo independiente que pueda agotarse completo con cada empleador. Si alguien recibe simultáneamente remuneraciones de dos o más empleadores, las bases deben coordinarse y sumarse para no superar el tope aplicable. También se consideran rentas independientes concurrentes bajo las reglas previsionales.</p>
<p>Cuando se enteran cotizaciones sobre una base superior pueden existir pagos en exceso y un procedimiento de regularización o devolución. No conviene simplemente ordenar a uno de los empleadores que deje de cotizar: la distribución sigue reglas y prioridades, y una omisión puede afectar salud, SIS o cobertura. Informa la situación, conserva ambas liquidaciones y solicita instrucciones a las instituciones previsionales.</p>
<p>Las gratificaciones que corresponden a varios meses también pueden requerir una distribución por los períodos a los que pertenecen. Cargarlas completas al mes de pago y aplicar un solo tope puede distorsionar la cotización.</p>

<h2>Trabajadores independientes</h2>
<p>En honorarios, la renta imponible anual suele partir del 80% de los honorarios brutos del año calendario anterior. La Operación Renta calcula cotizaciones, cobertura y topes anuales conforme a instrucciones del año tributario. Además, la persona puede optar por cobertura total o parcial durante el período transitorio cuando cumple los requisitos.</p>
<p>Dividir siempre “renta anual × 80% ÷ 12” y toparel resultado mensual es una simplificación insuficiente. La declaración anual considera límites, meses de cobertura, retenciones, gastos y exclusiones. Por ejemplo, las boletas emitidas durante 2026 se relacionan en general con la Operación Renta 2027, no con la liquidación mensual de un dependiente en julio de 2026.</p>
<p>Revisa la <a href="/blog/boleta-honorarios-completo">guía de boleta de honorarios</a> antes de trasladar estos topes a un independiente.</p>

<h2>Haberes no imponibles y falsa planificación</h2>
<p>Superar el tope no autoriza reclasificar sueldo como colación, movilización o viático. Esos conceptos quedan fuera de la base solo si responden realmente a su naturaleza y monto razonable. Dividir artificialmente la remuneración puede generar deuda previsional, intereses, multas y diferencias laborales.</p>
<p>Tampoco puede pactarse que el trabajador renuncie a cotizar bajo el tope. Las cotizaciones obligatorias son de orden público. Una estructura de compensación debe revisarse por su realidad, no solo por los nombres de la liquidación.</p>

<h2>Cómo auditar una liquidación sobre el tope</h2>
<ol class="steps"><li>Suma únicamente los haberes imponibles reales.</li><li>Busca la UF aplicable al período.</li><li>Convierte 90 UF y 135,2 UF por separado.</li><li>Usa el menor entre remuneración imponible y cada tope.</li><li>Aplica 10%, comisión AFP y salud sobre la base de 90 UF.</li><li>Aplica cesantía sobre su base de 135,2 UF y según contrato.</li><li>Separa aportes del empleador de descuentos del trabajador.</li><li>Calcula después la base e impuesto único.</li><li>Compara con Previred, certificados y liquidación.</li><li>Solicita corrección escrita si una tasa usó el máximo equivocado.</li></ol>

<h2>Errores frecuentes</h2>
<ul><li>Usar un equivalente CLP fijo durante todo 2026.</li><li>Aplicar 90 UF a Seguro de Cesantía.</li><li>Aplicar 135,2 UF a AFP o salud.</li><li>Creer que el exceso queda libre de impuesto.</li><li>Restar aportes del empleador al líquido.</li><li>Aplicar el tope 2026 a remuneraciones de enero.</li><li>Suponer que un ISR negativo reduce automáticamente el máximo.</li><li>Tratar el cálculo anual del independiente como doce liquidaciones iguales.</li></ul>

<p>Simula una liquidación con la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a> y compara comisiones con la <a href="/calculadoras/calculadora-comparador-afp">comparadora AFP</a>. Verifica siempre la UF y el período usados por la herramienta.</p>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado al 13 de julio de 2026 con el <a href="https://www71.spensiones.cl/portal/institucional/594/w3-article-16921.html" target="_blank" rel="noopener">comunicado oficial de topes 2026 de la Superintendencia de Pensiones</a>, la consulta de la DT sobre el <a href="https://www.dt.gob.cl/portal/1628/w3-article-118076.html" target="_blank" rel="noopener">cambio de 89,9 a 90 UF</a>, el <a href="https://www.bcn.cl/leychile/navegar?idNorma=7147" target="_blank" rel="noopener">DL N.º 3.500, artículo 16</a> y las instrucciones de Previsión Social para honorarios. Las preguntas de foros se usaron para detectar confusiones sobre cesantía, impuesto y valor UF; no como fuente de tasas.</p>`,
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
