export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  keywords: string[];
  content: string;
  relatedCalculators: string[];
}

export const articles: Article[] = [
  {
    slug: 'como-calcular-finiquito-chile',
    title: 'Cómo Calcular tu Finiquito en Chile 2026',
    description: 'Guía paso a paso para calcular tu finiquito: indemnización, vacaciones proporcionales y gratificación. Con ejemplos en CLP y bases legales.',
    date: '2026-03-30',
    category: 'laboral',
    keywords: ['finiquito Chile', 'calcular finiquito', 'indemnización', 'vacaciones proporcionales', 'Código del Trabajo'],
    relatedCalculators: ['calculadora-finiquito', 'calculadora-indemnizacion-anos-servicio', 'calculadora-vacaciones-proporcionales'],
    content: `<h2>¿Qué es el Finiquito?</h2>
<p>El finiquito es el documento legal que pone término a la relación laboral entre empleador y trabajador. Detalla los pagos finales que corresponden al trabajador según la causal de término. Está regulado por el Código del Trabajo chileno.</p>

<h2>Componentes del Finiquito</h2>
<p>Un finiquito puede incluir uno o más de los siguientes conceptos, dependiendo de la causal de término:</p>
<ul>
<li><strong>Sueldo devengado:</strong> Días trabajados del último mes no pagados.</li>
<li><strong>Vacaciones proporcionales:</strong> Días de feriado legal no tomados, calculados proporcionalmente a los meses trabajados.</li>
<li><strong>Vacaciones pendientes:</strong> Días de vacaciones de años anteriores que no se tomaron.</li>
<li><strong>Indemnización por años de servicio:</strong> 30 días de remuneración por cada año trabajado (solo en despido o mutuo acuerdo con indemnización).</li>
<li><strong>Gratificación proporcional:</strong> Parte proporcional de la gratificación anual.</li>
</ul>

<h2>¿Cómo se Calcula la Indemnización?</h2>
<p>Según el Art. 163 del Código del Trabajo, la indemnización equivale a 30 días de la última remuneración mensual por cada año de servicio. La base de cálculo incluye sueldo y gratificación, pero excluye colación y movilización.</p>
<p><strong>Ejemplo:</strong> Si ganabas $800.000 brutos mensuales y trabajaste 5 años, tu indemnización sería: $800.000 × 5 = $4.000.000.</p>
<p>El tope máximo es de 11 años (330 días) y la base no puede exceder 90 UF mensuales.</p>

<h2>¿Cómo se Calculan las Vacaciones Proporcionales?</h2>
<p>Se calculan dividiendo los 15 días hábiles anuales entre 12 meses, dando 1,25 días por mes trabajado. El valor de cada día se obtiene dividiendo el sueldo mensual por 30.</p>
<p><strong>Ejemplo:</strong> Con sueldo de $600.000 y 8 meses trabajados: 8 × 1,25 = 10 días. Valor día = $600.000 ÷ 30 = $20.000. Total vacaciones = $200.000.</p>

<h2>¿Tengo Derecho a Indemnización si Renuncio?</h2>
<p>No. La indemnización por años de servicio solo corresponde cuando el empleador pone término al contrato (despido injustificado, necesidades de la empresa, o mutuo acuerdo con indemnización). Si renuncias voluntariamente, solo recibes días trabajados y vacaciones.</p>

<h2>Plazo de Pago</h2>
<p>El empleador tiene un plazo de 10 días hábiles desde la separación del trabajador para pagar el finiquito. El pago puede ser en cuotas solo si hay acuerdo entre las partes.</p>

<h2>Bases Legales</h2>
<ul>
<li>Art. 159 al 163 del Código del Trabajo</li>
<li>Art. 67 al 70 (vacaciones)</li>
<li>Ley 21.133 (trabajadores independientes)</li>
</ul>

<p>Fuentes: <a href="https://www.bcn.cl" target="_blank" rel="noopener">Biblioteca del Congreso Nacional (BCN)</a>, <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>.</p>`,
  },
  {
    slug: 'diferencia-sueldo-bruto-liquido',
    title: 'Diferencia entre Sueldo Bruto y Líquido en Chile 2026',
    description: 'Entiende la diferencia entre sueldo bruto y líquido. Descubre cuánto te descuentan por AFP, salud y seguro de cesantía en Chile.',
    date: '2026-03-30',
    category: 'laboral',
    keywords: ['sueldo bruto líquido', 'descuentos legales Chile', 'AFP salud cesantía', 'sueldo líquido 2026'],
    relatedCalculators: ['calculadora-sueldo-liquido', 'calculadora-costo-empleado-pyme', 'calculadora-comparador-afp'],
    content: `<h2>¿Qué es el Sueldo Bruto?</h2>
<p>El sueldo bruto es el monto total que el empleador acuerda pagarte antes de cualquier descuento legal. Es el número que aparece en tu contrato de trabajo. Sin embargo, no es lo que llega a tu cuenta bancaria.</p>

<h2>¿Qué es el Sueldo Líquido?</h2>
<p>El sueldo líquido es el dinero que efectivamente recibes en tu cuenta después de todos los descuentos legales obligatorios. Es el monto real con el que cuentas para tus gastos mensuales.</p>

<h2>¿Cuáles son los Descuentos Legales?</h2>
<p>Los descuentos obligatorios suman aproximadamente un 18-20% de tu sueldo bruto:</p>
<ul>
<li><strong>Cotización AFP (10% + comisión):</strong> El 10% va a tu cuenta de capitalización individual. La comisión varía entre 0,49% (AFP Uno) y 1,45% (ProVida) según la AFP que elijas.</li>
<li><strong>Cotización de Salud (7%):</strong> Para FONASA o tu Isapre. El mínimo es 7% del sueldo imponible.</li>
<li><strong>Seguro de Cesantía (0,6%):</strong> Solo para contratos indefinidos. El empleador aporta 2,4% adicional.</li>
<li><strong>Impuesto de Segunda Categoría:</strong> Solo si tu sueldo supera los tramos exentos (aprox. $800.000 mensuales).</li>
</ul>

<h2>Ejemplo Práctico 2026</h2>
<p>Con un sueldo bruto de $800.000 en AFP Habitat (comisión 1,27%) con FONASA:</p>
<ul>
<li>AFP: $800.000 × 11,27% = $90.160</li>
<li>Salud FONASA: $800.000 × 7% = $56.000</li>
<li>Seguro Cesantía: $800.000 × 0,6% = $4.800</li>
<li><strong>Total descuentos: $150.960</strong></li>
<li><strong>Sueldo líquido: $649.040</strong></li>
</ul>

<h2>¿Qué es el Tope Imponible?</h2>
<p>Las cotizaciones se calculan sobre el sueldo imponible, que tiene un tope máximo de UF 144,7 mensuales (aprox. $5.445.000 en 2026). Si ganas más, las cotizaciones solo se calculan hasta ese monto.</p>

<h2>La Gratificación</h2>
<p>La gratificación legal equivale al 25% de tu remuneración mensual con tope de 4,75 UTA anuales. Muchos empleadores la pagan mensualmente incluida en el sueldo bruto.</p>

<p>Fuentes: <a href="https://www.spensiones.cl" target="_blank" rel="noopener">Superintendencia de Pensiones</a>, <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>.</p>`,
  },
  {
    slug: 'guia-iva-chile-2026',
    title: 'Guía del IVA en Chile 2026: Todo lo que Necesitas Saber',
    description: 'Guía completa sobre el IVA en Chile: qué es, cómo se calcula, quién lo paga y cuándo aplica el 19%. Con ejemplos prácticos en CLP.',
    date: '2026-03-30',
    category: 'impuestos',
    keywords: ['IVA Chile', 'impuesto valor agregado', '19% IVA', 'calcular IVA', 'precio neto bruto'],
    relatedCalculators: ['calculadora-iva', 'calculadora-boleta-honorarios', 'calculadora-costo-empleado-pyme'],
    content: `<h2>¿Qué es el IVA?</h2>
<p>El Impuesto al Valor Agregado (IVA) es un tributo indirecto del 19% que se aplica a la venta de bienes muebles, prestación de servicios e importaciones en Chile. Fue instaurado en 1974 y su tasa actual se mantiene en 19% desde 2003.</p>

<h2>¿Cómo se Calcula?</h2>
<p>Hay dos operaciones fundamentales:</p>
<ul>
<li><strong>Agregar IVA:</strong> Precio neto × 1,19 = Precio bruto. Ejemplo: $100.000 × 1,19 = $119.000.</li>
<li><strong>Quitar IVA:</strong> Precio bruto ÷ 1,19 = Precio neto. Ejemplo: $119.000 ÷ 1,19 = $100.000.</li>
</ul>

<h2>¿Quién Paga el IVA?</h2>
<p>El consumidor final es quien realmente paga el IVA. Los vendedores y prestadores de servicios actúan como agentes retenedores: cobran el IVA al cliente y luego lo declaran y pagan al Servicio de Impuestos Internos (SII).</p>

<h2>Bienes y Servicios Exentos</h2>
<p>No todos los productos y servicios pagan IVA. Algunos exentos incluyen:</p>
<ul>
<li>Servicios de educación</li>
<li>Servicios de salud prestados por hospitales y clínicas</li>
<li>Transporte público de pasajeros</li>
<li>Seguros de vida y salud</li>
<li>Venta de libros, diarios y revistas</li>
<li>Servicios financieros (créditos, depósitos)</li>
</ul>

<h2>IVA en Boletas y Facturas</h2>
<p>Las boletas de venta incluyen el IVA en el precio final. Las facturas separan el valor neto del IVA, lo que es importante para empresas que pueden recuperar el crédito fiscal.</p>

<h2>Declaración de IVA</h2>
<p>Los contribuyentes deben declarar el IVA mensualmente en el Formulario 29 del SII, dentro de los primeros 12 días del mes siguiente. La declaración incluye débito fiscal (IVA cobrado) y crédito fiscal (IVA pagado en compras).</p>

<p>Fuentes: <a href="https://www.sii.cl" target="_blank" rel="noopener">Servicio de Impuestos Internos (SII)</a>, Código Tributario.</p>`,
  },
  {
    slug: 'todo-sobre-uf-chile',
    title: 'Todo sobre la UF en Chile: Qué Es y Cómo Se Usa',
    description: 'Guía completa sobre la Unidad de Fomento (UF) en Chile: qué es, cómo se actualiza, para qué se usa y cómo convertirla a pesos.',
    date: '2026-03-30',
    category: 'educacion-financiera',
    keywords: ['UF Chile', 'Unidad de Fomento', 'valor UF', 'convertir UF CLP', 'UF inflación'],
    relatedCalculators: ['calculadora-uf-clp', 'calculadora-reajuste-arriendo', 'calculadora-credito-hipotecario'],
    content: `<h2>¿Qué es la UF?</h2>
<p>La Unidad de Fomento (UF) es una unidad de cuenta reajustada según la inflación, creada en Chile en 1967. Su valor se actualiza diariamente según la variación del Índice de Precios al Consumidor (IPC) del mes anterior. Se usa para mantener el valor real del dinero en contratos y transacciones de largo plazo.</p>

<h2>¿Cuánto Vale la UF?</h2>
<p>En marzo 2026, la UF vale aproximadamente $37.600 pesos chilenos. El Banco Central de Chile publica los valores con un día de anticipación. Los fines de semana y festivos mantiene el valor del último día hábil.</p>

<h2>¿Para Qué se Usa?</h2>
<ul>
<li><strong>Créditos hipotecarios:</strong> Los dividendos se expresan en UF.</li>
<li><strong>Arriendos:</strong> Muchos contratos de arriendo están en UF para proteger contra la inflación.</li>
<li><strong>Seguros:</strong> Las pólizas de seguro suelen expresarse en UF.</li>
<li><strong>Multas y sanciones:</strong> Algunas multas se calculan en UF.</li>
<li><strong>Contratos de largo plazo:</strong> Cualquier contrato que necesite mantener su valor real en el tiempo.</li>
</ul>

<h2>¿Cómo se Convierte UF a Pesos?</h2>
<p>Simplemente multiplica la cantidad de UF por el valor actual. Ejemplo: 50 UF × $37.600 = $1.880.000.</p>
<p>Para convertir pesos a UF: divide el monto en pesos por el valor de la UF. Ejemplo: $1.000.000 ÷ $37.600 = 26,60 UF.</p>

<h2>¿Por Qué es Mejor que Pesos para Contratos Largos?</h2>
<p>La UF se reajusta con la inflación, por lo que 100 UF de hoy tendrán el mismo poder adquisitivo dentro de 10 años. Si firmas un contrato en pesos, la inflación erosiona el valor real de ese contrato con el tiempo.</p>

<h2>¿Quién Calcula la UF?</h2>
<p>El Banco Central de Chile es la institución encargada de calcular y publicar el valor diario de la UF, según la variación del IPC que publica el INE (Instituto Nacional de Estadísticas).</p>

<p>Fuentes: <a href="https://www.bcentral.cl" target="_blank" rel="noopener">Banco Central de Chile</a>, <a href="https://www.ine.gob.cl" target="_blank" rel="noopener">INE</a>.</p>`,
  },
  {
    slug: 'boleta-honorarios-completo',
    title: 'Guía Completa de Boleta de Honorarios en Chile 2026',
    description: 'Todo sobre la boleta de honorarios: retención 15,25%, cómo emitirla, monto líquido y obligaciones tributarias para independientes.',
    date: '2026-03-30',
    category: 'impuestos',
    keywords: ['boleta honorarios', 'retención 15.25%', 'honorarios Chile', 'independientes SII', 'impuesto profesionales'],
    relatedCalculators: ['calculadora-boleta-honorarios', 'calculadora-operacion-renta', 'calculadora-ppm'],
    content: `<h2>¿Qué es la Boleta de Honorarios?</h2>
<p>La boleta de honorarios es un documento tributario que emiten las personas naturales por servicios profesionales o técnicos prestados de forma independiente, sin relación laboral con el cliente. Se emite electrónicamente a través del sitio del SII.</p>

<h2>¿Cuánto es la Retención?</h2>
<p>La retención total es del 15,25% del monto bruto, que incluye:</p>
<ul>
<li>10% de impuesto de primera categoría</li>
<li>5% de impuesto global complementario (crédito)</li>
<li>0,25% de cotización de solidaridad</li>
</ul>
<p><strong>Ejemplo:</strong> Por una boleta de $500.000 brutos, la retención es $76.250 y recibes $423.750 líquidos.</p>

<h2>¿Quiénes Pueden Emitir?</h2>
<p>Toda persona natural que preste servicios profesionales o técnicos de forma independiente: abogados, contadores, diseñadores, programadores, consultores, profesores particulares, y cualquier profesional que no tenga relación laboral con su cliente.</p>

<h2>¿Cómo se Emite?</h2>
<ol>
<li>Ingresa a <a href="https://www.sii.cl" target="_blank" rel="noopener">sii.cl</a> con tu RUT y clave tributaria.</li>
<li>Ve a "Servicios Online" → "Emisión de Documentos" → "Boleta de Honorarios Electrónica"</li>
<li>Ingresa los datos del pagador (RUT y razón social), monto y descripción del servicio.</li>
<li>El sistema calcula automáticamente la retención.</li>
</ol>

<h2>¿Estoy Exento de Retención?</h2>
<p>Sí, si tus honorarios brutos mensuales no superan las 10 UTM (aprox. $679.000 en 2026). En ese caso, la boleta se emite sin retención.</p>

<h2>¿Qué Pasa en la Declaración de Renta?</h2>
<p>La retención del 15,25% es un pago provisional. En tu declaración anual (Formulario 22), se calcula el impuesto real. Si pagaste de más, recibes devolución. Si pagaste de menos, debes la diferencia.</p>

<p>Fuentes: <a href="https://www.sii.cl" target="_blank" rel="noopener">SII</a>, Ley sobre Impuesto a la Renta.</p>`,
  },
  {
    slug: 'guia-horas-extra-chile',
    title: 'Guía Completa de Horas Extra en Chile 2026',
    description: 'Todo sobre horas extraordinarias en Chile: recargo 50%, tope máximo, cómo calcular el valor hora extra y qué dice el Código del Trabajo.',
    date: '2026-03-30',
    category: 'laboral',
    keywords: ['horas extra Chile', 'horas extraordinarias', 'recargo 50%', 'tope horas extra', 'Código del Trabajo'],
    relatedCalculators: ['calculadora-horas-extra', 'calculadora-sueldo-liquido', 'calculadora-costo-empleado-pyme'],
    content: `<h2>¿Qué son las Horas Extra?</h2>
<p>Las horas extraordinarias son aquellas que se trabajan fuera de la jornada laboral ordinaria, con un máximo de 2 horas diarias. Solo pueden pactarse para atender necesidades o situaciones temporales, según el Art. 30 del Código del Trabajo.</p>

<h2>¿Cuánto se Paga?</h2>
<p>Las horas extra se pagan con un recargo del 50% sobre el valor de la hora ordinaria (Art. 32 del Código del Trabajo). Si trabajas en domingo o festivos, el recargo es del 100%.</p>

<h2>¿Cómo se Calcula el Valor de la Hora Extra?</h2>
<p>Valor hora ordinaria = Sueldo bruto ÷ 30 ÷ 8 (para jornada de 8 horas diarias).</p>
<p>Valor hora extra = Valor hora ordinaria × 1,50 (o × 2,00 en domingo/festivo).</p>
<p><strong>Ejemplo:</strong> Con sueldo de $600.000: Hora normal = $600.000 ÷ 30 ÷ 8 = $2.500. Hora extra = $2.500 × 1,5 = $3.750.</p>

<h2>Tope de Horas Extra</h2>
<p>No puedes trabajar más de 2 horas extra diarias. En casos calificados y con autorización de la Dirección del Trabajo, se puede extender a 4 horas diarias. El empleador debe llevar un registro detallado.</p>

<h2>¿Afectan las Cotizaciones?</h2>
<p>Sí. Las horas extra están afectas a cotizaciones previsionales (AFP, salud, seguro de cesantía). Se deben declarar en la misma planilla de remuneraciones.</p>

<h2>¿Puedo Negarme a Hacer Horas Extra?</h2>
<p>Las horas extra son voluntarias para el trabajador. El empleador no puede obligarte, pero puede ofrecerte un acuerdo. Si no hay pacto escrito, no estás obligado a quedarte después de tu jornada.</p>

<p>Fuentes: <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, <a href="https://www.bcn.cl" target="_blank" rel="noopener">BCN</a>, Código del Trabajo Arts. 30-32.</p>`,
  },
  {
    slug: 'como-funciona-gratificacion-legal',
    title: 'Cómo Funciona la Gratificación Legal en Chile 2026',
    description: 'Explicación clara de la gratificación legal: 25% de remuneración, tope 4,75 UTA, quién tiene derecho y cómo se calcula mensual o anualmente.',
    date: '2026-03-30',
    category: 'laboral',
    keywords: ['gratificación legal', '25% remuneración', '4.75 UTA', 'aguinaldo legal', 'Art. 47 Código del Trabajo'],
    relatedCalculators: ['calculadora-gratificacion-legal', 'calculadora-sueldo-liquido', 'calculadora-costo-empleado-pyme'],
    content: `<h2>¿Qué es la Gratificación Legal?</h2>
<p>La gratificación legal es un beneficio obligatorio que el empleador debe pagar a los trabajadores, regulado por el Art. 47 del Código del Trabajo. Corresponde al 25% de la remuneración mensual con un tope anual de 4,75 UTA.</p>

<h2>¿Quién Tiene Derecho?</h2>
<p>Tienen derecho todos los trabajadores que devenguen remuneraciones variables o que ganen menos de 4,75 UTA anuales. En 2026, 4,75 UTA equivale a aproximadamente $3.867.300 anuales ($322.275 mensuales).</p>

<h2>¿Cómo se Calcula?</h2>
<p>Se calcula de dos formas y se paga la que resulte MAYOR:</p>
<ul>
<li><strong>25% de la remuneración mensual:</strong> Con tope de 4,75 UTA al año. Es la más común.</li>
<li><strong>4,75% del ingreso mínimo anual:</strong> Una alternativa que casi nunca se aplica porque es menor.</li>
</ul>
<p><strong>Ejemplo:</strong> Con sueldo de $600.000 mensuales: Gratificación = $600.000 × 25% = $150.000 mensuales.</p>

<h2>¿Mensual o Anual?</h2>
<p>El empleador puede pagarla mensualmente (anticipo) o en un pago anual. Si es anual, debe liquidarse en abril de cada año. Lo más común es pagarla mensualmente junto con el sueldo.</p>

<h2>¿Puede Ser Mayor?</h2>
<p>Sí. El empleador puede pagar una gratificación superior a la legal, ya sea por contrato individual o convenio colectivo. Muchas empresas pagan gratificaciones adicionales en septiembre o diciembre.</p>

<p>Fuentes: <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, Código del Trabajo Arts. 47-50.</p>`,
  },
  {
    slug: 'calcular-indemnizacion-por-anos',
    title: 'Cómo Calcular la Indemnización por Años de Servicio',
    description: 'Guía para calcular la indemnización: 30 días por año, tope 11 años, base 90 UF. Cuándo corresponde y cuándo no. Art. 163 Código del Trabajo.',
    date: '2026-03-30',
    category: 'laboral',
    keywords: ['indemnización años servicio', 'Art. 163', 'despido injustificado', '30 días por año', 'tope 11 años'],
    relatedCalculators: ['calculadora-indemnizacion-anos-servicio', 'calculadora-finiquito', 'calculadora-intereses-mora'],
    content: `<h2>¿Qué es la Indemnización por Años de Servicio?</h2>
<p>Es una compensación económica que el empleador debe pagar al trabajador cuando despide sin causa justificada. Equivale a 30 días de remuneración por cada año de servicio, con un tope de 11 años (330 días). Está regulada por el Art. 163 del Código del Trabajo.</p>

<h2>¿Cuándo Corresponde?</h2>
<ul>
<li>Despido injustificado (sin causa)</li>
<li>Despido por necesidades de la empresa (con aviso previo)</li>
<li>Mutuo acuerdo con indemnización pactada</li>
<li>Casos fortuitos o fuerza mayor</li>
</ul>
<p><strong>No corresponde si renuncias voluntariamente.</strong></p>

<h2>¿Cómo se Calcula?</h2>
<p>Indemnización = Último sueldo bruto × Años de servicio.</p>
<p>La base incluye sueldo y gratificación. No incluye colación ni movilización.</p>
<p><strong>Ejemplo:</strong> Sueldo de $700.000, 8 años trabajados: $700.000 × 8 = $5.600.000.</p>

<h2>Topes Legales</h2>
<ul>
<li><strong>Máximo 11 años:</strong> 330 días de remuneración.</li>
<li><strong>Base máxima:</strong> 90 UF mensuales (aprox. $3.384.000 en 2026).</li>
</ul>

<h2>Indemnización Sustitutiva</h2>
<p>Si el empleador no pagó el seguro de cesantía, la indemnización aumenta en un 30% por cada año (indemnización sustitutiva del Art. 164).</p>

<p>Fuentes: <a href="https://www.bcn.cl" target="_blank" rel="noopener">BCN</a>, <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, Código del Trabajo Art. 163-164.</p>`,
  },
  {
    slug: 'reajuste-arriendo-uf-2026',
    title: 'Reajuste de Arriendo por UF e IPC en Chile 2026',
    description: 'Todo sobre el reajuste de arriendo: cuánto puede subir, UF vs IPC, qué dice tu contrato y cuándo puedes negociar.',
    date: '2026-03-30',
    category: 'vivienda',
    keywords: ['reajuste arriendo', 'IPC arriendo', 'UF arriendo', 'aumento arriendo Chile', 'tope arriendo'],
    relatedCalculators: ['calculadora-reajuste-arriendo', 'calculadora-uf-clp', 'calculadora-credito-hipotecario'],
    content: `<h2>¿Cuánto Puede Subir el Arriendo?</h2>
<p>No hay un tope legal de aumento. El reajuste depende de lo que establezca el contrato de arriendo. Si está en UF, se reajusta automáticamente con la variación de la UF. Si está en pesos, se reajusta según el IPC acumulado del período.</p>

<h2>Arriendo en UF vs Pesos</h2>
<ul>
<li><strong>En UF:</strong> El valor se ajusta diariamente. Tu pago en pesos cambia mes a mes pero el valor en UF se mantiene constante. Es predecible en términos reales.</li>
<li><strong>En pesos:</strong> El reajuste se negocia según el IPC acumulado. Se aplica en la fecha que indica el contrato (generalmente anual).</li>
</ul>

<h2>Ejemplo de Reajuste por IPC</h2>
<p>Si tu arriendo es $300.000 y el IPC anual fue 4,5%: Nuevo arriendo = $300.000 × 1,045 = $313.500.</p>

<h2>¿Puedo Negarme al Aumento?</h2>
<p>Si el contrato establece el reajuste y se calcula correctamente, no puedes negarte. Si el aumento es abusivo o no está en el contrato, puedes negociar o recurrir al Tribunal de Policía Local o SERNAC.</p>

<h2>Frecuencia del Reajuste</h2>
<p>Debe estar en el contrato. Lo más común es anual, pero puede ser cada 6 meses o mensual. Sin cláusula de reajuste, el arrendador no puede aumentar unilateralmente.</p>

<p>Fuentes: <a href="https://www.sernac.cl" target="_blank" rel="noopener">SERNAC</a>, Ley 18.101 (Arrendamiento de Inmuebles Urbanos).</p>`,
  },
  {
    slug: 'vacaciones-proporcionales-guia',
    title: 'Guía de Vacaciones Proporcionales en Chile 2026',
    description: 'Cómo calcular tus vacaciones proporcionales al finiquito: días que te corresponden, valor por día y pago en el finiquito.',
    date: '2026-03-30',
    category: 'laboral',
    keywords: ['vacaciones proporcionales', 'feriado proporcional', 'días vacaciones', 'finiquito vacaciones', 'Art. 67'],
    relatedCalculators: ['calculadora-vacaciones-proporcionales', 'calculadora-finiquito', 'calculadora-indemnizacion-anos-servicio'],
    content: `<h2>¿Qué son las Vacaciones Proporcionales?</h2>
<p>Son los días de feriado legal que te corresponden por el tiempo trabajado en el año en que termina tu contrato. Se calculan y pagan en el finiquito. Están reguladas por el Art. 67 y 70 del Código del Trabajo.</p>

<h2>¿Cómo se Calculan?</h2>
<p>Se dividen los 15 días hábiles anuales entre 12 meses, dando 1,25 días por cada mes trabajado:</p>
<p>Días proporcionales = Meses trabajados × 1,25</p>
<p><strong>Ejemplo:</strong> Si trabajaste 9 meses: 9 × 1,25 = 11,25 días de vacaciones.</p>

<h2>¿Cuánto Vale Cada Día?</h2>
<p>El valor de cada día se calcula dividiendo tu sueldo mensual por 30:</p>
<p>Valor día = Sueldo bruto ÷ 30</p>
<p>Total vacaciones = Días proporcionales × Valor día</p>
<p><strong>Ejemplo:</strong> Sueldo $600.000, 7 meses: Días = 8,75. Valor día = $20.000. Total = $175.000.</p>

<h2>Vacaciones Pendientes</h2>
<p>Si tienes días de vacaciones de años anteriores sin tomar, también se pagan en el finiquito. Se suman a las vacaciones proporcionales.</p>

<h2>Vacaciones Progresivas</h2>
<p>Después de 10 años de trabajo (continuos o no), tienes derecho a días adicionales: +1 día por cada 3 nuevos años, con un máximo de 5 días extra (total 20 días hábiles).</p>

<p>Fuentes: <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, <a href="https://www.bcn.cl" target="_blank" rel="noopener">BCN</a>, Código del Trabajo Arts. 67-70.</p>`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getRelatedCalculators(article: Article): string[] {
  return article.relatedCalculators;
}
