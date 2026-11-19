// ============================================
// Artículos del carril de contenido 2027 (sueldo mínimo enero 2027,
// verano en auto, compras internacionales). Se integran al final de
// `articleCatalog` en articles.ts. Datos revisados el 17-11-2026.
// ============================================

import type { Article } from './articles';
import { formatCLP } from '@/lib/formatters';
import { calculateCostoViaje } from '@/lib/calculations/costo-viaje';
import { calculateCostoTag } from '@/lib/calculations/costo-tag';

const LEY_21830 = 'https://www.bcn.cl/leychile/navegar?idNorma=1225354';
const INE_IPC =
  'https://www.ine.gob.cl/estadisticas-por-tema/precios-e-inflacion/indice-de-precios-al-consumidor';
const INE_BOLETIN = (archivo: string) =>
  `https://www.ine.gob.cl/docs/default-source/%C3%ADndice-de-precios-al-consumidor/boletines/espa%C3%B1ol/2026/${archivo}.pdf`;
const INE_ABRIL = INE_BOLETIN('boletin-%C3%ADndice-de-precios-al-consumidor-abril-2026');
const INE_OCTUBRE = INE_BOLETIN('boletin-%C3%ADndice-de-precios-al-consumidor-octubre-2026');
const DT_60141 = 'https://www.dt.gob.cl/portal/1628/w3-article-60141.html';

const ENAP_INFORME = 'https://www.enap.cl/files/get/3322';
const BENCINA_EN_LINEA = 'https://www.bencinaenlinea.cl';
const MOP_PEAJES = 'https://concesiones.mop.gob.cl/peajes-y-porticos/';
const MOP_RUTA_68 = 'https://concesiones.mop.gob.cl/uploads/sites/4/2026/01/RUTA-68.pdf';
const MOP_TALCA_CHILLAN =
  'https://concesiones.mop.gob.cl/uploads/sites/4/2026/01/TALCA-CHILLAN.pdf';

// Ejemplo rotulado del artículo de verano: el precio por litro NO es oficial.
const VIAJE_KM = 120;
const VIAJE_RENDIMIENTO = 12;
const VIAJE_PRECIO_EJEMPLO = 1500;
const VIAJE_PEAJE_TRAMO = 5000;
const VIAJE_PASAJEROS = 4;
const VIAJE = calculateCostoViaje({
  distanciaKm: VIAJE_KM,
  rendimientoKmL: VIAJE_RENDIMIENTO,
  precioCombustible: VIAJE_PRECIO_EJEMPLO,
  peajes: VIAJE_PEAJE_TRAMO,
  pasajeros: VIAJE_PASAJEROS,
  idaYVuelta: true,
});
// Alza ENAP del 11-11-2026 (gasolinas 93 y 97) aplicada a los litros del ejemplo.
const VIAJE_ALZA_ENAP = Math.round((VIAJE.distanciaTotal / VIAJE_RENDIMIENTO) * 38.7);
const TAG_TARIFA_EJEMPLO = 1000;
const TAG_PASADAS = 40;
const TAG = calculateCostoTag({ tarifaPorPaso: TAG_TARIFA_EJEMPLO, pasadasMes: TAG_PASADAS });

const SII_IVA_BIENES = 'https://www.sii.cl/destacados/iva_bienes/';
const ADUANA_DESDE_CUANDO =
  'https://www.aduana.cl/desde-cuando-y-a-quien-aplica/aduana/2025-10-20/120230.html';
const ADUANA_QUE_ES = 'https://www.aduana.cl/que-es-el-iva-digital/aduana/2025-10-20/160103.html';
const ADUANA_BASE_CALCULO =
  'https://www.aduana.cl/cuando-debo-pagar-impuestos-si-compro-online-desde-el-extranjero/aduana/2022-06-29/121824.html';

const ext = (url: string, texto: string) =>
  `<a href="${url}" target="_blank" rel="noopener">${texto}</a>`;

export const ARTICULOS_2027: Article[] = [
  {
    slug: 'cuanto-dinero-llevar-viaje-verano-2027',
    title: 'Cuánto dinero llevar a Argentina, Brasil, Perú, Colombia, México y Bolivia en verano 2027',
    description:
      'Arma tu presupuesto de verano 2027 en moneda local: efectivo, tarjetas y conversores para Argentina, Brasil, Perú, Colombia, México y Bolivia.',
    date: '2026-11-19',
    updatedAt: '2026-11-19',
    category: 'educacion-financiera',
    readingTime: 8,
    keywords: ['cuánto dinero llevar', 'verano 2027', 'presupuesto viaje desde Chile', 'efectivo o tarjeta en el extranjero'],
    relatedCalculators: [
      'peso-argentino-a-chileno',
      'real-brasileno-a-peso-chileno',
      'sol-peruano-a-peso-chileno',
      'peso-colombiano-a-peso-chileno',
      'peso-mexicano-a-peso-chileno',
      'boliviano-a-peso-chileno',
      'calculadora-costo-viaje',
    ],
    sources: [{
      label: 'Banco Central de Chile: tipos de cambio nominales, pesos por unidad de moneda extranjera',
      url: 'https://si3.bcentral.cl/siete/ES/Siete/Cuadro/CAP_TIPO_CAMBIO/MN_TIPO_CAMBIO4/TCB_520_TIPO_CAMBIO_NOMINAL',
    }],
    faq: [
      {
        question: '¿Cuánto efectivo llevo si el alojamiento ya está pagado?',
        answer: 'Separa los gastos pendientes que el proveedor solo acepta en efectivo y una reserva para imprevistos. No vuelvas a sumar el alojamiento prepagado ni retires todo el presupuesto del viaje sin revisar cómo podrás pagar en destino.',
      },
      {
        question: '¿El conversor muestra lo que cobrará mi tarjeta?',
        answer: 'No. La conversión es una referencia, no una cotización de compra o venta ni una promesa del cargo final. Confirma con el emisor la moneda de facturación, el tipo de cambio aplicable y las comisiones.',
      },
      {
        question: '¿Puedo usar el presupuesto de Argentina para los demás países?',
        answer: 'No conviene trasladar un monto entre destinos solo convirtiendo monedas. Cotiza alojamiento, comidas, transporte y actividades en cada ciudad y convierte el total de su moneda local a pesos chilenos por separado.',
      },
    ],
    content: `
<p class="article-lead">Para saber cuánto dinero llevar a Argentina, Brasil, Perú, Colombia, México o Bolivia en el verano 2027, suma lo que todavía debes pagar en destino, separa una reserva y decide qué parte necesitarás en efectivo. No hay un monto diario universal: una reserva con comidas incluidas y un recorrido por varias ciudades necesitan presupuestos distintos.</p>

<p>Esta pauta está pensada para viajes desde Chile entre diciembre de 2026 y marzo de 2027. Es un método de planificación, no una lista de precios turísticos ni una predicción cambiaria. No publicamos tarifas por país sin respaldo ni equivalencias fijas en pesos chilenos. Los conversores usan el valor de referencia del BCCh correspondiente a la fecha que muestran, desde una instantánea diaria de datos; no son cotizaciones en tiempo real ni necesariamente del día de tu consulta.</p>

<h2>Cómo calcular el dinero que falta para el viaje</h2>
<p>Parte por las cotizaciones de tus propias reservas, expresadas en la moneda en que se cobrarán. Anota alojamiento pendiente, alimentación no incluida, traslados, excursiones y compras previstas. Al lado de cada gasto, marca si está pagado, si admite tarjeta y cuándo se cobra. Una garantía o bloqueo de tarjeta no debe confundirse con un pago definitivo: pregunta al alojamiento cómo lo gestionará.</p>
<p><strong>Presupuesto pendiente = alojamiento por pagar + alimentación + transporte + actividades + compras + reserva personal.</strong> Define esa reserva según los riesgos de tu itinerario, sin tratarla como una tarifa obligatoria. Si viajas acompañado, distingue los gastos compartidos de los individuales; dividir una habitación entre viajeros no significa dividir también las entradas o las comidas.</p>
<p>Para estimar alimentación, arma un menú diario con precios que puedas consultar y multiplícalo por los días que realmente comerás fuera. Haz lo mismo con los trayectos de transporte y las actividades que quieres reservar. Guarda la fecha y las condiciones de cada cotización. Si falta un precio, déjalo identificado como pendiente: poner cero puede hacer parecer suficiente un presupuesto incompleto.</p>

<h2>Conversores por país: calcula en la moneda del destino</h2>
<p>El <a href="https://si3.bcentral.cl/siete/ES/Siete/Cuadro/CAP_TIPO_CAMBIO/MN_TIPO_CAMBIO4/TCB_520_TIPO_CAMBIO_NOMINAL" target="_blank" rel="noopener">Banco Central de Chile publica tipos de cambio nominales en pesos por unidad de moneda extranjera</a>. Úsalos como referencia de comparación, no como oferta de una casa de cambio. En cada calculadora revisa la fecha y la procedencia del dato antes de decidir; una referencia guardada no debe interpretarse como una cotización ejecutable del momento.</p>

<h3>Argentina: presupuesto en pesos argentinos (ARS)</h3>
<p>Separa las reservas cotizadas en otra moneda de los gastos que pagarás en pesos argentinos. Antes de cerrar un alojamiento o una excursión, pide que te confirmen la moneda, el importe final y las condiciones de pago. Evita construir el presupuesto suponiendo que todos los proveedores convertirán tus dólares de la misma forma.</p>
<p>Suma lo pendiente en ARS y usa el <a href="/calculadoras/peso-argentino-a-chileno">conversor de peso argentino a peso chileno</a>. Para decidir entre efectivo y tarjeta, compara lo que recibirás o pagarás realmente, con los cargos incluidos. No damos por garantizado un tipo de cambio especial para turistas ni una ventaja permanente de un medio de pago.</p>

<h3>Brasil: presupuesto en reales (BRL)</h3>
<p>Cotiza en reales el alojamiento, los traslados y las actividades de la ciudad o playa elegida. Si un prestador propone un pago por aplicación o transferencia, confirma antes de reservar que puedes utilizarlo con tu cuenta y tus documentos. No bases todo el viaje en un método que todavía no has podido habilitar.</p>
<p>Convierte el total con el <a href="/calculadoras/real-brasileno-a-peso-chileno">conversor de real brasileño a peso chileno</a>. Lleva identificadas alternativas para pagar el traslado de llegada y el alojamiento si falla tu método principal. Es una precaución de planificación, no una afirmación de que todos los comercios acepten o rechacen tarjetas extranjeras.</p>

<h3>Perú: presupuesto en soles (PEN)</h3>
<p>Arma una cuenta distinta para ciudad, excursiones y desplazamientos entre destinos. Si contratas un paquete, pide el detalle de lo incluido: comidas, entradas y traslados que no estén cubiertos deberán quedar en tu presupuesto pendiente. Confirma también la moneda del cobro si la publicidad y la reserva muestran monedas diferentes.</p>
<p>Usa el <a href="/calculadoras/sol-peruano-a-peso-chileno">conversor de sol peruano a peso chileno</a> para dimensionar el total en CLP. Reserva efectivo para los gastos que tus proveedores confirmen que no podrás pagar con tarjeta, en vez de asumir una proporción fija válida para todo Perú.</p>

<h3>Colombia: presupuesto en pesos colombianos (COP)</h3>
<p>Anota siempre el código COP junto a los montos: tanto Chile como Colombia usan la palabra peso. Revisa los ceros y el separador de miles al copiar cotizaciones. Una confusión de moneda puede alterar mucho más el presupuesto que una diferencia pequeña entre alternativas de cambio.</p>
<p>Ingresa el total en el <a href="/calculadoras/peso-colombiano-a-peso-chileno">conversor de peso colombiano a peso chileno</a>. Si visitas varias ciudades, separa los traslados largos de la movilidad cotidiana para no olvidar pasajes que todavía no están comprados. Consulta al alojamiento qué opciones tendrás para pagar al llegar.</p>

<h3>México: presupuesto en pesos mexicanos (MXN)</h3>
<p>Comprueba si la cotización está en MXN o en USD antes de compararla con otra. En un alojamiento con servicios incluidos, revisa cuáles quedan fuera del paquete y cómo se cobran los traslados. Una excursión opcional no debe desaparecer de la cuenta solo porque la estadía ya esté pagada.</p>
<p>Convierte los gastos en MXN con el <a href="/calculadoras/peso-mexicano-a-peso-chileno">conversor de peso mexicano a peso chileno</a>. Mantén aparte cualquier gasto contratado en dólares; cambiar la etiqueta de moneda en una planilla no convierte el importe. Pide el total final al proveedor antes de comprometer el pago.</p>

<h3>Bolivia: presupuesto en bolivianos (BOB)</h3>
<p>Para recorridos organizados, solicita por escrito qué cubre el precio y qué deberás pagar durante la ruta. Confirma con el operador cómo se abonan los gastos pendientes y dónde podrás acceder a efectivo. No supongas que podrás resolver un retiro durante una excursión sin haberlo consultado.</p>
<p>El <a href="/calculadoras/boliviano-a-peso-chileno">conversor de boliviano a peso chileno</a> sirve para comparar el presupuesto en BOB con tus ahorros en Chile. Contrasta esa referencia con la cotización real que te ofrezcan y conserva el comprobante de cambio. No presupuestes con una cotización informal que nadie se ha comprometido a entregar.</p>

<h2>Efectivo o tarjeta: separa disponibilidad y costo</h2>
<p>El presupuesto total no equivale al efectivo que debes llevar encima. Aparta los pagos que requieren billetes y revisa cómo repondrás dinero durante el viaje. Pregunta a tu banco por habilitación internacional, límites, moneda de facturación y cargos por compras o retiros. Consulta también cómo bloquear la tarjeta desde el extranjero y conserva esos datos fuera del teléfono principal.</p>
<p>Si un terminal ofrece convertir la compra a pesos chilenos, revisa el importe y las condiciones antes de aceptar. Compara esa propuesta con las condiciones de tu emisor, sin dar por hecho que una opción siempre será más barata. Para los cajeros, revisa los cargos informados antes de confirmar y considera que puede haber costos de más de una entidad.</p>

<h2>Dónde cambiar y qué comparar</h2>
<p>Antes de viajar, consulta alternativas formales y verifica su autorización ante el regulador local que corresponda. Compara cuánto dinero local recibirás finalmente por el mismo monto entregado, después de comisiones. Pregunta si la cotización está disponible para la operación que quieres hacer y pide comprobante; un cartel o una publicación no bastan para conocer el costo final.</p>
<p>No afirmamos que cambiar en Chile, en el aeropuerto o en el centro sea siempre mejor. Prioriza resolver la llegada de manera segura y luego compara alternativas sin transportar más efectivo del que necesitas. Las denominaciones que acepta cada proveedor y la disponibilidad de billetes también conviene confirmarlas, no presumirlas.</p>

<h2>Si vas en auto desde Chile</h2>
<p>Calcula por separado combustible, peajes y estacionamiento. La <a href="/calculadoras/calculadora-costo-viaje">calculadora de costo de viaje</a> ayuda a estimar combustible y peajes con distancia, rendimiento y precios que tú ingreses. El precio del combustible por litro y los peajes se ingresan en pesos chilenos (CLP): convierte cada precio extranjero a CLP con el conversor del país correspondiente antes de ingresarlo. No obtiene automáticamente tarifas extranjeras ni sustituye la revisión de documentación para cruzar la frontera. Evita sumar de nuevo los trayectos que ya incluiste en otra parte de la planilla.</p>

<h2>Si el presupuesto no cuadra: qué ajustar primero</h2>
<p>Cuando el total convertido supera lo que puedes destinar al viaje, no recortes todos los gastos por igual. Separa los compromisos ya pagados y los que aún puedes mover: una excursión opcional o una noche menos en una ciudad son más fáciles de ajustar que un vuelo o un alojamiento con penalización por cancelación. Pregunta al proveedor las condiciones antes de decidir.</p>
<p>La reserva personal es la última partida en sacrificarse: si la eliminas, cualquier imprevisto (un traslado que falla, un medicamento, una comida no prevista) terminará financiado con deuda o con un cambio de tarjeta con comisiones. Si aún así no alcanza, revisa primero los gastos en moneda extranjera que puedes re-cotizar, porque una reserva hecha hace meses puede haber cambiado de precio en la moneda local.</p>
<p>Vuelve a correr los números con los precios vigentes y con el conversor del país: un presupuesto que cuadraba en octubre puede no cuadrar en enero, tanto por los precios locales como por la referencia del tipo de cambio. Contenido verificado el 19 de noviembre de 2026 contra la publicación del Banco Central de Chile sobre tipos de cambio nominales.</p>

<h2>Antes de cerrar la maleta</h2>
<p>Revisa las reglas vigentes de declaración de dinero en las aduanas de Chile, del destino y de cualquier tránsito. Este artículo no publica umbrales ni promete exenciones o devoluciones de impuestos: deben confirmarse en la autoridad competente antes de salir. Tampoco confundas una obligación de declarar con el presupuesto recomendado para vacaciones.</p>
<p>Actualiza tus cotizaciones, vuelve a convertir los gastos pendientes y deja disponible el dinero de pagos que vencerán en Chile mientras estés fuera. La decisión final es concreta: cuánto falta por pagar, en qué moneda y con qué medio podrás hacerlo. Si alguna de esas respuestas sigue pendiente, resuélvela con el proveedor o el banco antes de comprar más efectivo.</p>`,
  },
  // Plan editorial #24
  {
    slug: 'cotizacion-independientes-2026-boleta',
    title: 'Cotización de independientes: Operación Renta 2027 y retención del 16%',
    description:
      'Las boletas de 2026 financian cotizaciones en la Operación Renta 2027. Base del 80%, cobertura parcial del 90%, seguros, exenciones y diferencias con la retención del 16% de 2027.',
    date: '2026-11-19',
    updatedAt: '2026-11-19',
    category: 'pension',
    readingTime: 12,
    relatedGuia: 'preparacion-operacion-renta-2027-checklist',
    keywords: [
      'cotización independientes 2026',
      'cotizaciones honorarios Operación Renta 2027',
      'boletas retención 16% 2027',
      'cobertura parcial independientes 2027',
      'Ley 21.133',
    ],
    relatedCalculators: ['calculadora-boleta-honorarios', 'calculadora-cotizacion-independientes'],
    sources: [
      {
        label: 'SII — calendario de retención de boletas de honorarios',
        url: 'https://www.sii.cl/destacados/boletas_honorarios/',
      },
      {
        label: 'Subsecretaría de Previsión Social — Ley 21.133 y coberturas',
        url: 'https://previsionsocial.gob.cl/wp-content/uploads/2026/05/05-FICHA-QUE-DICE-LA-LEY.pdf',
      },
      {
        label: 'Subsecretaría de Previsión Social — preguntas frecuentes de honorarios',
        url: 'https://previsionsocial.gob.cl/ley-honorarios/preguntas-frecuentes/',
      },
      {
        label: 'SII — gradualidad: 90% de la base en el año tributario 2027',
        url: 'https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_8401.htm',
      },
      {
        label: 'SP — cobertura y tasas del SIS para independientes',
        url: 'https://www.spensiones.cl/portal/institucional/594/w3-article-10100.html',
      },
      {
        label: 'SII — Guía Práctica de Declaración de Renta 2026 (SIS 1,5%)',
        url: 'https://www.sii.cl/servicios_online/renta/guia_practica_renta_2026.pdf',
      },
      {
        label: 'SP — tope imponible definitivo de 2026',
        url: 'https://www.spensiones.cl/portal/institucional/594/w3-article-16921.html',
      },
      {
        label: 'SP — base anual y límite vigente al cierre del año de las rentas',
        url: 'https://www.spensiones.cl/portal/institucional/594/w3-article-10107.html',
      },
      {
        label: 'SP — Compendio: independientes y cotización voluntaria de la Ley 21.735',
        url: 'https://www.spensiones.cl/portal/compendio/596/w3-propertyvalue-3614.html',
      },
      {
        label: 'SP — NCG 350: Seguro Social Previsional e independientes',
        url: 'https://www.spensiones.cl/apps/GetFile.php?id=003&namefile=NCG-SP%2FNP0000350.pdf',
      },
      {
        label: 'SII — guía práctica: salud, ahorro previsional y seguros',
        url: 'https://www.sii.cl/servicios_online/renta/2024/guia_practica.pdf',
      },
      {
        label: 'Consejo Consultivo Previsional — orden de pago y saldos insolutos',
        url: 'https://previsionsocial.gob.cl/wp-content/uploads/2026/02/Documento_Independientes_CCP_VF.pdf',
      },
    ],
    content: `
<p>Si emites boletas de honorarios, la retención no es una devolución asegurada: también financia tu seguridad social. En abril de 2027 se liquidarán los ingresos de 2026, cuyas boletas llevan una retención del <strong>15,25%</strong>. El <strong>16%</strong> corresponde a las boletas emitidas desde el 1 de enero de 2027 y se conciliará en la Operación Renta 2028. Confundir esos dos calendarios puede dejarte esperando dinero que se destinará a cotizaciones.</p>

<p>Esta explicación revisa la obligación de cotizar por honorarios, los seguros incluidos y la elección de cobertura para preparar la Operación Renta 2027. <strong>Fecha de corte: 19 de noviembre de 2026, Chile.</strong> Se apoya en documentos del SII, la Superintendencia de Pensiones y la Subsecretaría de Previsión Social. No adelanta fechas específicas de vencimiento o devolución del Formulario 22 de 2027: no se verificó un calendario oficial de ese proceso en las fuentes consultadas.</p>

<h2>Dos años comerciales, dos declaraciones distintas</h2>

<p>El ${ext('https://www.sii.cl/destacados/boletas_honorarios/', 'calendario del SII')} distingue el año en que se emite la boleta del año en que se presenta la declaración anual. La tasa de retención sube de 15,25% en 2026 a 16% en 2027. Ese porcentaje se aplica al honorario bruto de la boleta, no a la base previsional reducida. Tampoco representa una tasa única de AFP, salud y seguros: es una retención que después entra en la liquidación tributaria y previsional.</p>

<p>Por eso, al revisar tu propuesta de renta de abril de 2027 debes buscar los honorarios percibidos durante 2026 y sus antecedentes, no aplicarles retroactivamente el 16%. Para presupuestar los pagos que recibirás durante 2027, en cambio, sí corresponde considerar la nueva retención. La <a href="/calculadoras/calculadora-boleta-honorarios">calculadora de boleta de honorarios</a> permite comparar bruto, retención y líquido seleccionando el año de emisión. Ese líquido describe lo que recibes por la boleta, no una pensión futura ni una devolución garantizada.</p>

<h2>Quién debe cotizar y qué exenciones conviene revisar</h2>

<p>La Ley 21.133 organiza la incorporación de quienes trabajan a honorarios a los regímenes de seguridad social. La ${ext('https://previsionsocial.gob.cl/ley-honorarios/preguntas-frecuentes/', 'Subsecretaría de Previsión Social')} señala como obligados a quienes emiten boletas por <strong>cinco o más ingresos mínimos mensuales en el año calendario</strong>, cumplen la condición de edad y no están en las situaciones de excepción que describe. No basta mirar una boleta aislada o un mes sin actividad: hay que reconstruir el ingreso anual.</p>

<p>La regla etaria tiene una fecha fija: están exentos por este concepto los hombres que tenían 55 años o más y las mujeres que tenían 50 años o más <strong>al 1 de enero de 2018</strong>. Cumplir esas edades ahora no crea automáticamente una exención. Es una diferencia decisiva para quien comienza a emitir boletas después de haber trabajado con contrato.</p>

<p>También deben revisarse las situaciones de personas pensionadas y de afiliación a los regímenes del IPS, Dipreca o Capredena según las condiciones oficiales. Si percibes honorarios bajo el umbral anual, la Subsecretaría contempla cotización voluntaria. No publicamos un umbral en pesos para las rentas de 2026: antes de decidir si estás exento debes contrastar el ingreso mínimo aplicable al cierre del año y la propuesta del SII. Una exención de la obligación anual no equivale a tener cobertura médica o de accidentes sin cotizar.</p>

<p>Tener contrato y emitir boletas al mismo tiempo tampoco te libera por sí solo. El SII considera las remuneraciones y los honorarios para determinar cuánto espacio queda bajo el límite imponible anual. Si ya cotizaste como dependiente hasta el máximo, la situación es distinta de la de alguien que trabajó con contrato solo algunos meses o por un sueldo menor al tope. Guarda los certificados de remuneraciones y cotizaciones: sirven para revisar esa combinación.</p>

<h2>La base es el 80% de los honorarios, con un límite anual</h2>

<p>La base imponible previsional corresponde al <strong>80% de los honorarios brutos anuales</strong>. No es el dinero líquido que quedó después de retener ni el saldo de tu cuenta bancaria. Tampoco se reemplaza por el gasto que declaras para determinar el impuesto a la renta: la base de cotizaciones tiene su propia regla. La ${ext('https://www.spensiones.cl/portal/institucional/594/w3-article-10107.html', 'Superintendencia de Pensiones')} explica que el límite superior es el tope imponible mensual multiplicado por doce, vigente al 31 de diciembre del año al que corresponden las rentas.</p>

<p>Para 2026, la SP publicó un ${ext('https://www.spensiones.cl/portal/institucional/594/w3-article-16921.html', 'tope definitivo de 90 UF mensuales')} para AFP, salud y accidentes del trabajo. Su equivalente anual es <strong>1.080 UF</strong>, resultado de multiplicar 90 por doce. En la Operación Renta 2027 importan las rentas de 2026 y el límite de ese año; no corresponde sustituirlo automáticamente por un eventual tope de 2027. No fijamos aquí su conversión final a pesos porque la UF de cierre de 2026 aún es futura a la fecha de esta revisión.</p>

<p>Si tienes ingresos altos o mezcla de sueldo y honorarios, no multipliques simplemente tu boleta por todas las tasas. Primero debes revisar la base anual y cuánto del límite consumieron las remuneraciones. La aplicación del tope evita tratar como imponible una parte de la renta que ya excede el máximo legal; el detalle final debe contrastarse con la información previsional utilizada por el SII.</p>

<h2>Qué financian las cotizaciones: no es solo AFP y Fonasa</h2>

<p>El ahorro para pensión contempla el <strong>10% de la renta imponible</strong> destinado a la cuenta individual, más la comisión de la AFP correspondiente. La salud considera el <strong>7% legal</strong> para Fonasa o Isapre. La ${ext('https://www.sii.cl/servicios_online/renta/2024/guia_practica.pdf', 'guía práctica del SII')} explica ambos componentes; sus montos, tasas de seguros y ejemplos de años anteriores no deben trasladarse como valores vigentes a 2027. Si el precio de tu plan de Isapre supera la cotización que se entera, la diferencia debe pagarse directamente a la institución.</p>

<p>El <strong>Seguro de Invalidez y Sobrevivencia (SIS) sí incluye a independientes que cotizan</strong>. No debe confundirse con el ahorro para vejez ni omitirse porque en una liquidación de sueldo dependiente lo financia el empleador. La ${ext('https://www.spensiones.cl/portal/institucional/594/w3-article-10100.html', 'SP distingue expresamente las tasas por período y modalidad')}: informa 1,78% desde agosto de 2026 para la cotización vigente, pero señala 1,49% para independientes que cotizan mediante retención en el año tributario 2026. La ${ext('https://www.sii.cl/servicios_online/renta/guia_practica_renta_2026.pdf', 'Guía Práctica de Renta 2026 del SII')}, que determina el monto en la Operación Renta, usa 1,5% de la base imponible de cotizaciones. Esa diferencia impide presentar el 1,78% como tasa anual ya confirmada del F22 de 2027.</p>

<p>También están el <strong>Seguro de Accidentes del Trabajo y Enfermedades Profesionales (ATEP), de la Ley 16.744</strong>, y el <strong>Seguro de Acompañamiento de Niños y Niñas (SANNA)</strong>. No usamos una tasa única para todos estos seguros: el monto debe revisarse según las reglas y antecedentes de la institución correspondiente. La ${ext('https://previsionsocial.gob.cl/wp-content/uploads/2026/05/05-FICHA-QUE-DICE-LA-LEY.pdf', 'ficha oficial de la Ley 21.133')} enumera SIS, ATEP, SANNA, salud y pensiones. Un presupuesto que solo sume AFP y salud deja fuera prestaciones y obligaciones reales.</p>

<h2>Seguro Social de la reforma: no sumar el aporte patronal por defecto</h2>

<p>La Ley 21.735 no permite copiar sin más el aporte del empleador a una persona que emite boletas. El ${ext('https://www.spensiones.cl/portal/compendio/596/w3-propertyvalue-3614.html', 'Compendio de la SP')} distingue al independiente obligado de quien cotiza voluntariamente e indica que el primero puede enterar voluntariamente las cotizaciones del artículo 15 de esa ley. Eso no transforma el SIS obligatorio en un seguro opcional.</p>

<p>La ${ext('https://www.spensiones.cl/apps/GetFile.php?id=003&namefile=NCG-SP%2FNP0000350.pdf', 'Norma de Carácter General 350 de la SP')} desarrolla esa distinción y advierte que existen además reglas obligatorias del artículo 17 y del artículo cuadragésimo sexto transitorio. Por tanto, no corresponde afirmar que toda disposición de la reforma es voluntaria ni agregar al ejemplo el escalón patronal de trabajadores dependientes como si fuera una obligación uniforme por honorarios. Antes de hacer un aporte adicional, revisa con tu AFP o el IPS la modalidad y el período aplicable; aquí no se anticipa una liquidación individual bajo esas reglas.</p>

<h2>Cobertura parcial en Renta 2027: el 90% de otra base, no del bruto</h2>

<p>La opción de cobertura parcial sigue contemplada para el año tributario 2027. La ${ext('https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_8401.htm', 'tabla de gradualidad del SII')} establece que la base optativa equivale al <strong>90% de la base imponible total</strong>. Para salud y pensiones eso significa aplicar el 90% sobre el 80% de los honorarios, respetando los límites que correspondan. No significa cotizar sobre el 90% de cada boleta ni recibir de vuelta el 10% restante de la retención.</p>

<p>La reducción no se extiende a todo: <strong>SIS, ATEP y SANNA se cotizan con cobertura completa</strong>, según la ficha de Previsión Social. En cambio, una base menor para salud puede reducir los subsidios por incapacidad laboral y maternales. La comparación no debe limitarse a cuánto dinero queda disponible después de declarar. También hay que mirar con qué renta se calcularían las prestaciones si necesitas una licencia.</p>

<p>La gradualidad llega al 100% en el año tributario 2028. En ese punto deja de existir una base reducida por esta opción. Antes de aceptar la propuesta de 2027, compara los detalles de ambas alternativas y no asumas que la diferencia de devolución será igual a la del año anterior: cambian la retención acumulada, la fracción de base y tus propios ingresos.</p>

<h2>Cómo pasan las retenciones del F22 a las instituciones</h2>

<p>El SII determina las cotizaciones con los antecedentes tributarios y la información de las instituciones previsionales. La TGR realiza el pago a las entidades correspondientes con cargo al monto disponible para devolución. No eres tú quien debe repartir manualmente cada retención entre AFP, salud y mutual al emitir una boleta. Al declarar el Formulario 22 debes revisar los honorarios, las retenciones informadas, las instituciones y la opción de cobertura.</p>

<p>Según la regla anual descrita por la Subsecretaría, las cotizaciones pagadas en la Operación Renta 2027 dan cobertura desde el <strong>1 de julio de 2027 hasta el 30 de junio de 2028</strong>. La SP también describe ese período para el SIS. Es una proyección de la regla vigente, no un calendario de devolución del SII. El ahorro para pensiones, por su parte, se asocia al año en que se generaron las rentas.</p>

<p>El orden de aplicación importa si los recursos son limitados. El ${ext('https://previsionsocial.gob.cl/wp-content/uploads/2026/02/Documento_Independientes_CCP_VF.pdf', 'Consejo Consultivo Previsional')} describe esta prioridad: SIS; accidentes del trabajo y enfermedades profesionales; SANNA; salud; pensiones y comisión de administración; y saldos insolutos de pensiones anteriores. El documento explica que durante la gradualidad pueden generarse saldos insolutos de pensiones. Por eso, una retención insuficiente no autoriza a concluir que todo quedó pagado ni que todos los seguros desaparecen automáticamente.</p>

<p>Si el cálculo muestra diferencias, separa el impuesto anual del saldo previsional. Revisa el comprobante de cotizaciones y consulta con el SII y tu AFP cómo se determinó y regulariza el saldo específico; no lo reemplaces por un pago mensual supuesto ni confundas ese saldo con el precio pendiente de la Isapre. La Subsecretaría advierte que las cotizaciones mensuales voluntarias no se descuentan automáticamente de la obligación anual por honorarios. Conserva los respaldos antes de pagar dos veces el mismo concepto por una interpretación equivocada.</p>

<h2>Ejemplo hipotético: honorarios brutos anuales de $12.000.000</h2>

<p>Supongamos que una persona percibe <strong>$12.000.000 brutos durante 2026</strong>, no tiene remuneraciones dependientes, no está exenta y todos sus honorarios llevan la retención del 15,25%. Es un ejercicio aritmético, sin reajustes ni una propuesta real del SII. El monto está por debajo del tope y permite separar las bases sin necesitar una UF de cierre que aún no conocemos.</p>

<ul>
<li>Retención nominal acumulada: $12.000.000 × 15,25% = <strong>$1.830.000</strong>.</li>
<li>Base imponible total: $12.000.000 × 80% = <strong>$9.600.000</strong>.</li>
<li>Base reducida para salud y pensiones en Renta 2027: $9.600.000 × 90% = <strong>$8.640.000</strong>.</li>
<li>Salud legal sobre base total: $9.600.000 × 7% = <strong>$672.000</strong>; sobre base parcial: $8.640.000 × 7% = <strong>$604.800</strong>.</li>
<li>Ahorro de pensión, antes de comisión AFP: <strong>$960.000</strong> con base total o <strong>$864.000</strong> con base parcial.</li>
</ul>

<p>Faltan la comisión AFP, SIS, ATEP y SANNA; los seguros conservan la base completa aunque se elija cobertura parcial. Para SIS debe aplicarse la tasa anual del proceso respectivo (1,5% en la Operación Renta 2026 según el SII), no trasladar automáticamente una tasa mensual. Tampoco hemos determinado el impuesto anual ni otros créditos. En consecuencia, <strong>$1.830.000 no es una devolución proyectada</strong> y la resta entre retención, salud y ahorro no es un saldo final disponible.</p>

<p>La <a href="/calculadoras/calculadora-cotizacion-independientes">calculadora de cotización de independientes</a> sirve como apoyo orientativo, no como liquidación del F22. Incluye el SIS con la última tasa anual publicada por el SII (1,5% de la base imponible, Operación Renta 2026), pero no SANNA ni la opción parcial: revisa el alcance y cada componente. Para organizar documentos y el resto de tus ingresos, continúa con la <a href="/guias/preparacion-operacion-renta-2027-checklist">guía de preparación de la Operación Renta 2027</a>.</p>

<h2>Qué revisar antes de aceptar la propuesta</h2>

<p>Reúne el resumen anual de boletas, certificados de remuneraciones si trabajaste con contrato y antecedentes de AFP, Fonasa o Isapre y organismo de seguridad laboral. Al abrir la propuesta, contrasta el bruto anual y las retenciones antes de mirar la devolución. Luego revisa la base imponible, el tope utilizado y la opción de cobertura. Si hay una exención, asegúrate de que corresponda a tu situación y no a una edad interpretada con la fecha equivocada.</p>

<p>Después del proceso, verifica la recepción de los pagos en las instituciones: la declaración y la cartola previsional no son el mismo documento. Si empiezas a emitir boletas en 2027, tampoco asumas cobertura inmediata por la mera retención de la primera boleta. La protección anual tiene un desfase; la Subsecretaría contempla pagos voluntarios para cubrir el período de inicio. El siguiente paso útil es revisar tu cobertura efectiva, no gastar una devolución que todavía no ha sido determinada.</p>

<p><em>Contenido informativo: no reemplaza la declaración del SII ni asesoría tributaria o previsional individual. Los valores futuros, la tasa anual SIS aplicable a Renta 2027 y el calendario específico del proceso deben contrastarse con las publicaciones oficiales correspondientes.</em></p>`,
  },
  // Plan editorial #42
  {
    slug: 'sueldo-minimo-2027-reajuste-simular-liquido',
    title:
      'Sueldo mínimo enero 2027: cómo se calcula el reajuste por IPC y qué falta para conocer el monto',
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

<div class="table-scroll"><table>
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

<div class="table-scroll"><table>
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

<div class="table-scroll"><table>
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
  // Temporada verano 2027: viajar en auto
  {
    slug: 'cuanto-cuesta-viajar-en-auto-verano-bencina-peajes-tag',
    title: 'Cuánto cuesta viajar en auto este verano: bencina, peajes y TAG paso a paso',
    description:
      'Cómo calcular el costo real de un viaje en auto en Chile: litros según rendimiento, precio de la bencina en tu zona, peajes 2026 publicados por el MOP y TAG. Con ejemplo rotulado y calculadoras.',
    date: '2026-11-17',
    updatedAt: '2026-11-17',
    category: 'vehiculos',
    readingTime: 9,
    relatedGuia: 'vehiculos-chile-permiso-multas',
    embedCalculatorId: 'costo-viaje',
    seoTitle: 'Cuánto cuesta viajar en auto: bencina, peajes y TAG',
    seoDescription:
      'Calcula el costo de un viaje en auto este verano: bencina según rendimiento y precio local, peajes MOP 2026 y TAG. Ejemplo paso a paso y cómo dividir el gasto entre pasajeros.',
    keywords: [
      'cuánto cuesta viajar en auto',
      'costo viaje en auto chile',
      'calcular bencina viaje',
      'peajes ruta 5 2026',
      'costo peajes vacaciones',
      'viaje en auto verano 2027',
    ],
    relatedCalculators: [
      'calculadora-costo-viaje',
      'calculadora-costo-tag',
      'calculadora-permiso-circulacion',
      'calculadora-credito-automotriz',
    ],
    faq: [
      {
        question: '¿Cómo calculo cuánta bencina gasto en un viaje?',
        answer:
          'Divide los kilómetros totales (ida y vuelta) por el rendimiento de tu auto en km por litro y multiplica por el precio del litro en tu zona. Un auto que rinde 12 km/l necesita 20 litros para 240 km. El precio del día por bencinera lo informa la Comisión Nacional de Energía en bencinaenlinea.cl.',
      },
      {
        question: '¿Dónde veo el precio oficial de los peajes?',
        answer:
          'La Dirección General de Concesiones del MOP publica los tarifarios de cada concesión, por categoría de vehículo y horario. Los vigentes al 17-11-2026 son las tarifas 2026; las concesiones los actualizan cada año, por lo que conviene revisarlos antes de viajar en enero o febrero.',
      },
      {
        question: '¿Existe un precio oficial único de la bencina?',
        answer:
          'No. ENAP informa cada semana cuánto cambia su precio mayorista, pero aclara que no fija el precio final: cada estación de servicio lo define. Por eso la calculadora pide que ingreses el precio que ves en tu zona.',
      },
    ],
    sources: [
      { label: 'ENAP, informe semanal de precios (11-11-2026)', url: ENAP_INFORME },
      { label: 'CNE, Bencina en Línea (precios por estación)', url: BENCINA_EN_LINEA },
      { label: 'MOP, Dirección General de Concesiones: peajes y pórticos', url: MOP_PEAJES },
      { label: 'MOP, tarifas 2026 Ruta 68', url: MOP_RUTA_68 },
      { label: 'MOP, tarifas 2026 Talca–Chillán (Ruta 5 Sur)', url: MOP_TALCA_CHILLAN },
    ],
    content: `<p class="article-lead">El costo de un viaje en auto se arma con tres cosas: la <strong>bencina</strong>, que depende de los kilómetros, del rendimiento del auto y del precio en tu zona; los <strong>peajes</strong> de carretera, que el MOP publica por concesión, y el <strong>TAG</strong> de las autopistas urbanas y de los pórticos sin barrera. Ninguno de los tres tiene un número único para todo Chile, pero los tres se pueden calcular antes de salir con datos oficiales.</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Datos revisados el 17 de noviembre de 2026</strong><p>Los precios de la bencina cambian cada semana y los peajes se actualizan una vez al año. Las cifras de este artículo son las vigentes a esta fecha o ejemplos rotulados como tales. Antes de viajar, revisa el precio del día y el tarifario de tu ruta en los enlaces oficiales.</p></div></aside>

<h2 id="formula">La fórmula en una línea</h2>

<p>Costo del viaje = (kilómetros totales ÷ rendimiento en km/l) × precio del litro + peajes de ida + peajes de vuelta. Si viajan varias personas, se divide el total por el número de pasajeros. Es exactamente lo que hace la <a href="/calculadoras/calculadora-costo-viaje">calculadora de costo de viaje en auto</a>.</p>

<p>Los tres datos que más mueven el resultado son la distancia, el rendimiento y el precio. Vale la pena obtener cada uno bien:</p>

<ul>
<li><strong>Distancia.</strong> Usa la que entrega tu aplicación de mapas para la ruta que realmente vas a tomar, no la distancia en línea recta. Suma los desvíos que ya tengas planeados: ir a la playa todos los días desde la cabaña también cuenta.</li>
<li><strong>Rendimiento.</strong> El dato del fabricante suele ser optimista. Si tu auto tiene computador de a bordo, usa el promedio en carretera. Si no, llena el estanque, anota el kilometraje, recorre al menos 200 km y vuelve a llenar: kilómetros recorridos ÷ litros cargados es tu rendimiento real. Con el auto cargado, aire acondicionado y subidas, el consumo aumenta.</li>
<li><strong>Precio del litro.</strong> No hay un precio oficial único. La Comisión Nacional de Energía publica el precio informado por cada estación en ${ext(BENCINA_EN_LINEA, 'Bencina en Línea')}. Busca el precio en tu comuna y en el destino, porque en zonas extremas o rurales suele ser distinto.</li>
</ul>

<h2 id="ejemplo">Un ejemplo completo, con cifras de ejemplo</h2>

<p>Supongamos un viaje de <strong>${VIAJE_KM} km por tramo, ida y vuelta</strong>, en un auto que rinde <strong>${VIAJE_RENDIMIENTO} km/l</strong>, con <strong>${formatCLP(VIAJE_PEAJE_TRAMO)} de peajes por tramo</strong> y <strong>${VIAJE_PASAJEROS} pasajeros</strong>. Para el precio usamos <strong>${formatCLP(VIAJE_PRECIO_EJEMPLO)} por litro</strong>. Ese precio es un <strong>ejemplo</strong> para hacer la cuenta, no el precio oficial de ninguna zona: reemplázalo por el que veas en Bencina en Línea.</p>

<div class="table-scroll"><table>
<caption>Ejemplo rotulado: viaje de ${VIAJE_KM} km por tramo (precio de bencina y peajes de ejemplo)</caption>
<thead><tr><th scope="col">Concepto</th><th scope="col">Cálculo</th><th scope="col">Resultado</th></tr></thead>
<tbody>
<tr><td>Distancia total</td><td>${VIAJE_KM} km × 2</td><td>${VIAJE.distanciaTotal} km</td></tr>
<tr><td>Litros</td><td>${VIAJE.distanciaTotal} ÷ ${VIAJE_RENDIMIENTO} km/l</td><td>${VIAJE.litros.toLocaleString('es-CL')} litros</td></tr>
<tr><td>Bencina</td><td>${VIAJE.litros.toLocaleString('es-CL')} l × ${formatCLP(VIAJE_PRECIO_EJEMPLO)}</td><td>${formatCLP(VIAJE.costoCombustible)}</td></tr>
<tr><td>Peajes</td><td>${formatCLP(VIAJE_PEAJE_TRAMO)} × 2 tramos</td><td>${formatCLP(VIAJE.costoPeajes)}</td></tr>
<tr><td><strong>Total</strong></td><td></td><td><strong>${formatCLP(VIAJE.costoTotal)}</strong></td></tr>
<tr><td>Por pasajero</td><td>÷ ${VIAJE_PASAJEROS}</td><td>${formatCLP(VIAJE.costoPorPasajero)}</td></tr>
<tr><td>Por kilómetro</td><td>÷ ${VIAJE.distanciaTotal} km</td><td>${formatCLP(VIAJE.costoPorKm)}</td></tr>
</tbody>
</table></div>

<p>Dos lecturas útiles de esta tabla. Primero, la bencina pesa mucho más que los peajes en un viaje de esta distancia. Segundo, el cálculo no incluye desgaste del auto, neumáticos ni mantención.</p>

<h2 id="precio-bencina">Por qué el precio de la bencina cambia cada semana</h2>

<p>ENAP publica cada miércoles un informe con la variación de su precio mayorista para la semana siguiente. En el ${ext(ENAP_INFORME, 'informe del 11 de noviembre de 2026')}, anunció un alza de <strong>$38,7 por litro</strong> en las gasolinas de 93 y 97 octanos y de <strong>$41,9 por litro</strong> en el diésel desde el jueves 12 de noviembre. ENAP aclara en el mismo informe que no fija ni regula el precio final: cada distribuidor y estación lo define.</p>

<p>Para un viaje, lo práctico es medir cuánto te afecta una variación de ese tamaño. En el ejemplo anterior, con ${VIAJE.litros.toLocaleString('es-CL')} litros, una diferencia de $38,7 por litro cambia el costo de la bencina en ${formatCLP(VIAJE_ALZA_ENAP)}. Es poco en un solo viaje, pero si vas a recorrer varios miles de kilómetros en el verano, cargar donde el litro está más barato sí hace diferencia.</p>

<h2 id="peajes">Peajes: dónde ver la tarifa oficial de tu ruta</h2>

<p>Las carreteras concesionadas cobran peajes en plazas troncales (sobre la ruta principal) y laterales (en accesos y salidas). La Dirección General de Concesiones del MOP publica un tarifario por concesión en ${ext(MOP_PEAJES, 'Peajes y pórticos')}, con la tarifa por categoría de vehículo y, en algunas rutas, por horario.</p>

<p>Como referencia, en los tarifarios 2026 publicados por el MOP:</p>

<ul>
<li>En la ${ext(MOP_RUTA_68, 'Ruta 68 (Santiago–Valparaíso–Viña del Mar)')}, para autos y camionetas la plaza troncal figura en <strong>$2.700</strong> en horario normal y <strong>$4.000</strong> en horario punta, y las laterales en $1.100.</li>
<li>En la concesión ${ext(MOP_TALCA_CHILLAN, 'Talca–Chillán de la Ruta 5 Sur')}, la plaza troncal para autos y camionetas figura en <strong>$3.300</strong> y las laterales en $800.</li>
</ul>

<p>Estas cifras son de los tarifarios 2026. Las concesiones reajustan sus tarifas una vez al año, normalmente a comienzos de enero, así que para un viaje en enero o febrero de 2027 revisa el tarifario actualizado. En viajes largos por la Ruta 5 pasas por varias concesiones: suma las plazas troncales de cada una en el sentido de tu viaje y no olvides que la vuelta se paga de nuevo.</p>

<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Horario punta en la salida de vacaciones</strong><p>Varias concesiones aplican tarifa punta en fines de semana largos y en las salidas y regresos de Santiago. En la Ruta 68 la diferencia entre normal y punta es de $1.300 por plaza para un auto. Revisa en el tarifario qué días y horas cuentan como punta.</p></div></aside>

<h2 id="tag">TAG: autopistas urbanas y pórticos sin barrera</h2>

<p>En las autopistas urbanas de Santiago y en los pórticos de flujo libre no hay caseta: el cobro se hace con el dispositivo TAG y cada concesionaria factura por pasada según su tarifario, que suele distinguir horario base, punta y saturación. Si vives en una ciudad con autopistas urbanas, el TAG del viaje se mezcla con el de todo el mes.</p>

<p>Para estimar el gasto mensual, la <a href="/calculadoras/calculadora-costo-tag">calculadora de presupuesto TAG</a> multiplica la tarifa por pasada que consultes en el tarifario de tu autopista por el número de pasadas, y suma cargos fijos si tu contrato los tiene. Como ejemplo con cifras inventadas para la cuenta: ${TAG_PASADAS} pasadas al mes a ${formatCLP(TAG_TARIFA_EJEMPLO)} cada una suman ${formatCLP(TAG.costoMensual)} al mes y ${formatCLP(TAG.costoAnual)} al año.</p>

<p>Si no tienes TAG y vas a usar una autopista urbana o un pórtico sin barrera, revisa en el sitio de la concesionaria las alternativas para usuarios ocasionales antes de entrar. Circular sin un medio de pago habilitado genera cobros posteriores.</p>

<h2 id="antes-de-salir">Qué anotar antes de salir</h2>

<p>Si el viaje es largo, cinco minutos de preparación evitan sorpresas. Una lista que sirve para cualquier ruta:</p>

<ol>
<li><strong>La ruta exacta y sus concesiones.</strong> En la aplicación de mapas, revisa por qué carreteras pasas. Cada concesión tiene su propio tarifario en el sitio del MOP; anota las plazas troncales en el sentido de tu viaje.</li>
<li><strong>El horario de salida.</strong> Si sales en un día o franja de tarifa punta, usa esa tarifa en el cálculo. Salir unas horas antes o después puede bajar el peaje y el tiempo de viaje.</li>
<li><strong>El precio del litro en tres puntos.</strong> Origen, mitad de camino y destino. Si hay diferencias grandes, planifica dónde cargar.</li>
<li><strong>El rendimiento con carga.</strong> Con el auto lleno, maletas y aire acondicionado, descuenta entre 10% y 20% al rendimiento habitual como margen prudente. Es un supuesto nuestro para no quedar corto, no una cifra técnica.</li>
<li><strong>Los pórticos urbanos del destino.</strong> Si vas a una ciudad con autopistas con TAG, revisa si tu dispositivo funciona ahí; los TAG son interoperables entre concesionarias, pero conviene confirmar que tu contrato esté vigente.</li>
</ol>

<h2 id="consumo">Cómo bajar el gasto en bencina en carretera</h2>

<p>El consumo de un auto en carretera depende sobre todo de la velocidad y del peso. Algunas medidas que no requieren cálculos:</p>

<ul>
<li><strong>Velocidad constante.</strong> Acelerar y frenar de forma repetida consume más que mantener una velocidad pareja. El control crucero ayuda en tramos planos.</li>
<li><strong>Menos peso y menos resistencia.</strong> Un portaequipaje sobre el techo aumenta la resistencia al aire. Si no lo usas, sácalo.</li>
<li><strong>Neumáticos con la presión correcta.</strong> La presión recomendada para carga completa suele estar en la puerta del conductor o en el manual.</li>
<li><strong>Aire acondicionado con criterio.</strong> En carretera, las ventanas abiertas también aumentan la resistencia; a alta velocidad, el aire acondicionado puede ser la mejor opción.</li>
</ul>

<p>Cada una de estas medidas cambia poco por sí sola. Juntas, en un viaje de varios cientos de kilómetros, se notan en el estanque. Para medir el efecto, repite el cálculo con el rendimiento que obtengas al volver.</p>

<h2 id="otros-costos">Lo que no entra en la cuenta, pero conviene recordar</h2>

<ul>
<li><strong>Estacionamiento en destino.</strong> En zonas de playa el estacionamiento pagado puede superar el costo diario de la bencina.</li>
<li><strong>Revisión técnica y permiso de circulación.</strong> Viajar con la revisión vencida expone a multa. El permiso de circulación 2027 se paga en marzo; puedes estimarlo con la <a href="/calculadoras/calculadora-permiso-circulacion">calculadora de permiso de circulación</a>.</li>
<li><strong>Mantención antes de salir.</strong> Presión de neumáticos, aceite y refrigerante influyen en el rendimiento y en la seguridad.</li>
<li><strong>Combustible en zonas aisladas.</strong> En carreteras australes o del altiplano hay tramos largos sin estaciones. Consulta en Bencina en Línea dónde están las estaciones de tu ruta.</li>
</ul>

<h2 id="dividir">Cómo dividir el gasto entre quienes viajan</h2>
<p>Si el viaje cruza la frontera, compara el presupuesto con los conversores de <a href="/calculadoras/peso-argentino-a-chileno">peso argentino</a>, <a href="/calculadoras/boliviano-a-peso-chileno">boliviano</a> y <a href="/calculadoras/sol-peruano-a-peso-chileno">sol peruano</a>. Para otros destinos de la región también puedes convertir <a href="/calculadoras/real-brasileno-a-peso-chileno">reales brasileños</a>, <a href="/calculadoras/peso-colombiano-a-peso-chileno">pesos colombianos</a> o <a href="/calculadoras/peso-mexicano-a-peso-chileno">pesos mexicanos</a>. Son referencias de cambio, no precios finales ni cotizaciones de casas de cambio.</p>

<p>La forma más simple es dividir bencina y peajes en partes iguales. Si alguien se suma solo a la ida o se baja antes, una alternativa justa es dividir por kilómetros: el costo por kilómetro del ejemplo (${formatCLP(VIAJE.costoPorKm)}) multiplicado por los kilómetros que hizo cada persona, repartido entre quienes iban en el auto en ese tramo. La <a href="/calculadoras/calculadora-costo-viaje">calculadora de costo de viaje</a> entrega el costo por pasajero y por kilómetro.</p>`,
  },
  // Temporada Navidad 2026: compras internacionales
  {
    slug: 'impuestos-compras-temu-aliexpress-shein-navidad',
    title: 'Compras en Temu, AliExpress y Shein para Navidad: qué impuestos pagas y cuándo',
    description:
      'Desde el 25 de octubre de 2025 las compras en plataformas extranjeras de hasta US$500 pagan IVA de 19%. Cuándo lo cobra la plataforma, cuándo se paga en Aduanas y qué cambia sobre US$500.',
    date: '2026-11-17',
    updatedAt: '2026-11-17',
    category: 'impuestos',
    readingTime: 8,
    relatedGuia: 'iva-boleta-honorarios-chile',
    seoTitle: 'Impuestos compras Temu, AliExpress y Shein: IVA y arancel',
    seoDescription:
      'Compras internacionales de hasta US$500 pagan IVA 19%, cobrado por la plataforma si está inscrita en el SII. Sobre US$500, IVA más arancel de 6%. Ejemplos y cómo calcularlo para Navidad.',
    keywords: [
      'impuesto compras temu',
      'iva aliexpress chile',
      'impuesto shein chile',
      'compras internacionales iva 19%',
      'compras sobre 500 dólares aduana',
      'iva digital compras extranjero',
    ],
    relatedCalculators: [
      'calculadora-compras-internacionales',
      'calculadora-conversor-divisas',
      'calculadora-iva',
    ],
    faq: [
      {
        question: '¿Cuánto impuesto pago por una compra en Temu, AliExpress o Shein?',
        answer:
          'Si la compra es de hasta US$500, pagas IVA de 19%. Si la plataforma está inscrita en el SII, lo cobra al momento de pagar y la compra entra al país exenta de arancel. Si supera US$500, además del IVA pagas arancel aduanero de 6%, en la importación.',
      },
      {
        question: '¿Sigue existiendo la franquicia de US$41?',
        answer:
          'No para compras hechas desde el 25 de octubre de 2025. Según Aduanas, solo las compras hechas antes de esa fecha, aunque llegaran después, mantenían la regla anterior que liberaba de impuestos a las compras de menos de US$41.',
      },
      {
        question: '¿Cómo sé si la plataforma está inscrita en el SII?',
        answer:
          'El SII publica la nómina de plataformas y comercios extranjeros inscritos en su sitio de IVA a la venta remota de bienes. Si la plataforma está en la lista, el IVA debería aparecer en el total al pagar.',
      },
      {
        question: '¿Qué pasa si la plataforma no cobró el IVA?',
        answer:
          'El impuesto se paga en la importación, según el procedimiento de Aduanas, normalmente a través de Correos de Chile o de la empresa de courier que trae el paquete. El SII advierte que comprar en plataformas inscritas hace más expedita la entrega.',
      },
    ],
    sources: [
      { label: 'SII, IVA a la venta remota de bienes (hasta US$500)', url: SII_IVA_BIENES },
      { label: 'Aduanas, IVA digital: desde cuándo y a quién aplica', url: ADUANA_DESDE_CUANDO },
      { label: 'Aduanas, ¿qué es el IVA digital?', url: ADUANA_QUE_ES },
      { label: 'Aduanas, base de cálculo de arancel e IVA (valor CIF)', url: ADUANA_BASE_CALCULO },
    ],
    content: `<p class="article-lead">Si este año compras regalos de Navidad en Temu, AliExpress, Shein u otra tienda extranjera, el precio final ya no es el mismo que hace dos diciembres. Desde el <strong>25 de octubre de 2025</strong>, toda compra internacional de bienes de hasta <strong>US$500</strong> paga <strong>IVA de 19%</strong>, y la franquicia que liberaba las compras de menos de US$41 dejó de aplicarse. Lo que cambia según la plataforma es <em>quién</em> te cobra el impuesto y <em>cuándo</em>.</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Revisado el 17 de noviembre de 2026</strong><p>Este artículo resume lo que publican el ${ext(SII_IVA_BIENES, 'SII')} y el ${ext(ADUANA_DESDE_CUANDO, 'Servicio Nacional de Aduanas')}. No reemplaza la información de cada plataforma sobre sus cargos de envío ni la de la empresa de courier.</p></div></aside>

<h2 id="regla">La regla en tres casos</h2>

<div class="table-scroll"><table>
<caption>Impuestos de compras internacionales de bienes desde el 25-10-2025 (SII y Aduanas)</caption>
<thead><tr><th scope="col">Caso</th><th scope="col">IVA 19%</th><th scope="col">Arancel aduanero</th><th scope="col">Cuándo se paga</th></tr></thead>
<tbody>
<tr><td>Hasta US$500, plataforma inscrita en el SII</td><td>Sí</td><td>Exenta</td><td>Al pagar la compra, incluido en el total</td></tr>
<tr><td>Hasta US$500, plataforma no inscrita</td><td>Sí</td><td>Según Aduanas</td><td>En la importación, antes de recibir el paquete</td></tr>
<tr><td>Más de US$500</td><td>Sí</td><td>6%</td><td>En la importación, según el procedimiento de Aduanas</td></tr>
</tbody>
</table></div>

<p>La regla aplica a bienes nuevos o usados enviados al país por correo (Correos de Chile) o por courier, comprados por personas o empresas, según ${ext(ADUANA_DESDE_CUANDO, 'Aduanas')}. El SII publica la nómina de plataformas y comercios inscritos en su ${ext(SII_IVA_BIENES, 'sitio sobre IVA a la venta remota de bienes')}: antes de comprar, revisa si la tienda aparece ahí.</p>

<h2 id="inscrita">Si la plataforma está inscrita</h2>

<p>Es el caso más simple. La plataforma suma el 19% de IVA a la compra cuando el destino es Chile, lo declara y lo paga al SII, y al llegar el paquete la importación queda exenta de arancel y de IVA a la importación. El SII destaca que, si el IVA se cobró en la compra, la importación se realiza en forma más expedita.</p>

<p>En la práctica, el precio que ves en el carrito antes de pagar debería incluir el IVA o mostrarlo como una línea aparte. Si ves un total sin impuesto en una plataforma que está en la nómina del SII, revisa la dirección de envío y el país configurado en tu cuenta.</p>

<h2 id="no-inscrita">Si la plataforma no está inscrita</h2>

<p>La compra se hace sin IVA, pero eso no significa que no lo pagues: el impuesto se cobra al importar el producto, según el procedimiento de Aduanas. Normalmente quien gestiona ese pago es Correos de Chile o la empresa de courier que trae el paquete, que te avisa del monto y puede cobrar un cargo por el servicio. Como ese cargo lo define cada empresa, no lo incluimos en los ejemplos.</p>

<h2 id="sobre-500">Si la compra supera US$500</h2>

<p>Sobre US$500, además del IVA corresponde arancel aduanero de 6%, y el pago se hace en la importación. Según ${ext(ADUANA_BASE_CALCULO, 'Aduanas')}, el arancel se paga sobre el valor CIF (precio del producto más flete y seguro) y el IVA sobre el valor CIF más el arancel. Por eso, en una compra grande, el impuesto total es algo mayor que 6% + 19%.</p>

<p>Una idea que circula es dividir una compra grande en varios pedidos para quedar bajo US$500. Ten presente que la regla de Aduanas se refiere a la compra, y que dividir pedidos puede aumentar los cargos de envío. No hay un cálculo que sirva para todos: depende de la plataforma y del courier.</p>

<h2 id="ejemplos">Ejemplos de cuentas</h2>

<p>Los montos siguientes están en dólares para no depender del tipo de cambio del día. Para pasarlos a pesos, usa el dólar que te cobre tu tarjeta o el valor del día en el <a href="/calculadoras/calculadora-conversor-divisas">conversor de divisas</a>.</p>

<div class="table-scroll"><table>
<caption>Ejemplos ilustrativos (montos en US$, sin cargos de courier)</caption>
<thead><tr><th scope="col">Compra</th><th scope="col">Arancel</th><th scope="col">IVA</th><th scope="col">Total con impuestos</th></tr></thead>
<tbody>
<tr><td>US$40 en plataforma inscrita</td><td>Exenta</td><td>US$7,60</td><td>US$47,60</td></tr>
<tr><td>US$150 en plataforma inscrita</td><td>Exenta</td><td>US$28,50</td><td>US$178,50</td></tr>
<tr><td>US$600 con flete y seguro incluidos</td><td>US$36,00 (6%)</td><td>US$120,84 (19% de US$636)</td><td>US$756,84</td></tr>
</tbody>
</table></div>

<p>El primer ejemplo es el cambio más visible para quien compraba regalos pequeños: antes de octubre de 2025, una compra de US$40 entraba sin impuestos por la franquicia de US$41. Ahora paga lo mismo que una compra en Chile.</p>

<p>Para hacer la cuenta con tu propio carrito, usa la <a href="/calculadoras/calculadora-compras-internacionales">calculadora de impuestos de compras internacionales</a>. Si solo quieres separar el IVA de un precio, la <a href="/calculadoras/calculadora-iva">calculadora de IVA</a> lo hace en ambos sentidos.</p>

<h2 id="navidad">Checklist para compras de Navidad</h2>
<p>Si comparas precios publicados en monedas latinoamericanas, conviértelos a pesos chilenos con los conversores de <a href="/calculadoras/peso-colombiano-a-peso-chileno">peso colombiano</a>, <a href="/calculadoras/peso-mexicano-a-peso-chileno">peso mexicano</a>, <a href="/calculadoras/boliviano-a-peso-chileno">boliviano</a>, <a href="/calculadoras/peso-argentino-a-chileno">peso argentino</a>, <a href="/calculadoras/real-brasileno-a-peso-chileno">real brasileño</a> o <a href="/calculadoras/sol-peruano-a-peso-chileno">sol peruano</a>. La conversión es referencial: no incluye comisiones de pago, envío ni impuestos de importación.</p>

<ul>
<li><strong>Revisa si la tienda está en la nómina del SII.</strong> Si está, el IVA va en el total y el paquete no debería tener cobros extra de impuestos al llegar.</li>
<li><strong>Compara el precio final con el de tiendas en Chile.</strong> Con el IVA incluido, la diferencia con el comercio local se reduce, y la devolución de un producto comprado en el extranjero suele ser más lenta.</li>
<li><strong>Calcula los plazos de envío.</strong> Diciembre es el mes con más envíos del año. Si el regalo es para el 24, revisa el plazo estimado antes de pagar.</li>
<li><strong>Guarda el comprobante con el IVA.</strong> Si Aduanas o el courier te piden acreditar que pagaste el impuesto en la compra, ese comprobante lo demuestra.</li>
<li><strong>Cuidado con cobros por mensaje.</strong> Si recibes un SMS o correo pidiendo pagar "impuestos" de un paquete por un enlace, verifica directamente en el sitio de Correos de Chile o del courier antes de pagar.</li>
</ul>

<h2 id="pesos">Cómo pasar la cuenta a pesos</h2>

<p>Las plataformas extranjeras muestran el precio en dólares o lo convierten a pesos con su propio tipo de cambio. Si pagas con tarjeta de crédito, el banco aplica su tipo de cambio al facturar, que puede ser distinto del dólar observado del Banco Central. Por eso el monto en pesos de tu estado de cuenta casi nunca coincide exacto con el que viste en el carrito.</p>

<p>Ejemplo con un tipo de cambio de <strong>$950 por dólar</strong>, que es un <strong>supuesto</strong> para la cuenta y no el valor del día: la compra de US$150 en plataforma inscrita, con IVA, suma US$178,50, es decir <strong>$169.575</strong>. Si la tienda no está inscrita, el IVA de US$28,50 (unos $27.075 al mismo cambio) se paga al recibir el paquete, más el cargo que cobre el courier por gestionarlo.</p>

<p>Para el valor real, revisa el dólar del día en el <a href="/calculadoras/calculadora-conversor-divisas">conversor de divisas</a> y el tipo de cambio que informa tu banco.</p>

<h2 id="permisos">Productos que pueden quedar retenidos por otras razones</h2>

<p>Pagar el IVA no es lo único que revisa Aduanas. Algunos productos necesitan autorización de otros servicios para entrar al país, como alimentos, semillas o productos de origen animal o vegetal, que controla el SAG, y medicamentos o suplementos, que pueden requerir autorización sanitaria. Si un regalo entra en alguna de esas categorías, revisa en el sitio de Aduanas qué productos requieren permisos antes de comprarlo, porque un paquete retenido puede no llegar a tiempo para Navidad.</p>

<h2 id="devoluciones">Devoluciones y compras para revender</h2>

<p>Antes de pagar, lee la política de devoluciones de la plataforma. Devolver un producto al extranjero suele tener costo de envío y plazos largos, y no todas las tiendas reembolsan de la misma forma. Si el IVA se cobró en la compra, pregunta a la plataforma si el reembolso incluye ese impuesto; la respuesta depende de cada tienda y no la regula este artículo.</p>

<p>Las reglas de este artículo son las de compras de personas para uso propio. Aduanas distingue las compras ocasionales sin carácter comercial de las importaciones para vender. Si compras en cantidad para revender en Chile, revisa con Aduanas o con un agente de aduanas el procedimiento de importación que corresponde, porque puede incluir otros trámites y obligaciones tributarias.</p>

<h2 id="errores">Errores frecuentes en diciembre</h2>

<ul>
<li><strong>Calcular con la franquicia antigua.</strong> La regla de los US$41 ya no aplica a compras hechas desde el 25 de octubre de 2025.</li>
<li><strong>Sumar 19% sobre el precio sin envío en una compra sobre US$500.</strong> En ese caso la base incluye flete y seguro, y el IVA se calcula después de sumar el arancel.</li>
<li><strong>Pensar que una plataforma no inscrita es más barata.</strong> El IVA se paga igual, al recibir el paquete, y puede sumarse un cargo de gestión del courier.</li>
<li><strong>No considerar el tipo de cambio de la tarjeta.</strong> Una diferencia de pocos pesos por dólar se nota en un carrito de varios regalos.</li>
<li><strong>Comprar tarde.</strong> Los plazos de envío internacional se alargan en diciembre; un precio más bajo no sirve si el regalo llega después del 25.</li>
</ul>

<h2 id="servicios">¿Y las suscripciones digitales?</h2>

<p>Netflix, Spotify, aplicaciones y otros servicios digitales prestados desde el extranjero pagan IVA desde 2020, por una regla distinta a la de los bienes físicos. Lo que cambió en octubre de 2025 es la compra de <strong>bienes</strong>: ropa, juguetes, electrónica y todo lo que llega en un paquete.</p>`,
  },
];
