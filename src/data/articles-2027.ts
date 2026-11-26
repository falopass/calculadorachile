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
const LEY_21735 = 'https://www.bcn.cl/leychile/navegar?idNorma=1212060';
const LEY_21561 = 'https://www.bcn.cl/leychile/navegar?idNorma=1191554';

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
    title:
      'Cuánto dinero llevar a Argentina, Brasil, Perú, Colombia, México y Bolivia en verano 2027',
    description:
      'Arma tu presupuesto de verano 2027 en moneda local: efectivo, tarjetas y conversores para Argentina, Brasil, Perú, Colombia, México y Bolivia.',
    date: '2026-11-19',
    updatedAt: '2026-11-19',
    category: 'educacion-financiera',
    readingTime: 8,
    keywords: [
      'cuánto dinero llevar',
      'verano 2027',
      'presupuesto viaje desde Chile',
      'efectivo o tarjeta en el extranjero',
    ],
    relatedCalculators: [
      'peso-argentino-a-chileno',
      'real-brasileno-a-peso-chileno',
      'sol-peruano-a-peso-chileno',
      'peso-colombiano-a-peso-chileno',
      'peso-mexicano-a-peso-chileno',
      'boliviano-a-peso-chileno',
      'calculadora-costo-viaje',
    ],
    sources: [
      {
        label:
          'Banco Central de Chile: tipos de cambio nominales, pesos por unidad de moneda extranjera',
        url: 'https://si3.bcentral.cl/siete/ES/Siete/Cuadro/CAP_TIPO_CAMBIO/MN_TIPO_CAMBIO4/TCB_520_TIPO_CAMBIO_NOMINAL',
      },
    ],
    faq: [
      {
        question: '¿Cuánto efectivo llevo si el alojamiento ya está pagado?',
        answer:
          'Separa los gastos pendientes que el proveedor solo acepta en efectivo y una reserva para imprevistos. No vuelvas a sumar el alojamiento prepagado ni retires todo el presupuesto del viaje sin revisar cómo podrás pagar en destino.',
      },
      {
        question: '¿El conversor muestra lo que cobrará mi tarjeta?',
        answer:
          'No. La conversión es una referencia, no una cotización de compra o venta ni una promesa del cargo final. Confirma con el emisor la moneda de facturación, el tipo de cambio aplicable y las comisiones.',
      },
      {
        question: '¿Puedo usar el presupuesto de Argentina para los demás países?',
        answer:
          'No conviene trasladar un monto entre destinos solo convirtiendo monedas. Cotiza alojamiento, comidas, transporte y actividades en cada ciudad y convierte el total de su moneda local a pesos chilenos por separado.',
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
    embedCalculatorId: 'cotizacion-independientes',
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
    embedCalculatorId: 'sueldo-liquido',
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
  {
    slug: 'que-cambia-sueldo-2027-reajuste-cotizacion-empleador',
    embedCalculatorId: 'sueldo-liquido',
    title:
      'Qué cambia en tu sueldo en 2027: reajuste del mínimo en enero, cotización del empleador en agosto y lo que no cambia',
    description:
      'Línea de tiempo 2027 del sueldo en Chile: reajuste automático del ingreso mínimo en enero por IPC, proyecto para julio y alza de la cotización del empleador a 4,25% en agosto. Qué cambia en tu liquidación y qué no.',
    date: '2026-11-26',
    updatedAt: '2026-11-26',
    category: 'laboral',
    readingTime: 9,
    relatedGuia: 'sueldo-liquido-chile',
    seoTitle: 'Qué cambia en tu sueldo en 2027: fechas y montos confirmados',
    seoDescription:
      'Todo lo confirmado para el sueldo en 2027: reajuste del sueldo mínimo en enero por IPC (Ley 21.830), cotización del empleador de 3,5% a 4,25% en agosto (Ley 21.735) y qué no cambia.',
    keywords: [
      'qué cambia en el sueldo 2027',
      'cambios sueldo 2027 Chile',
      'cotización empleador 2027',
      'reajuste sueldo 2027',
      'ley 21.735 agosto 2027',
      'sueldo mínimo 2027 qué cambia',
    ],
    relatedCalculators: [
      'calculadora-sueldo-liquido',
      'calculadora-costo-empleado-pyme',
      'calculadora-gratificacion-legal',
      'calculadora-asignacion-familiar',
    ],
    faq: [
      {
        question: '¿El sueldo líquido baja en 2027 por la reforma de pensiones?',
        answer:
          'No. El alza de agosto de 2027 (de 3,5% a 4,25% de la remuneración imponible) es una cotización de cargo del empleador según la Ley 21.735. No se descuenta de la liquidación del trabajador: los descuentos del trabajador siguen siendo el 10% de AFP más comisión, 7% de salud y 0,6% de seguro de cesantía en contrato indefinido.',
      },
      {
        question: '¿Cuánto será el sueldo mínimo en enero de 2027?',
        answer:
          'No hay un monto oficial todavía. La Ley 21.830 ordena reajustar los $553.553 según el IPC acumulado entre mayo y diciembre de 2026, y el monto lo fijará un decreto del Ministerio de Hacienda que debe dictarse a más tardar el 15 de enero de 2027. Cualquier cifra publicada antes del decreto es una estimación.',
      },
      {
        question: '¿La jornada baja a 40 horas en 2027?',
        answer:
          'No. La reducción de la jornada de la Ley 21.561 tiene su siguiente y última etapa el 26 de abril de 2028. Durante todo 2027 la jornada máxima legal sigue siendo de 42 horas semanales, vigente desde el 26 de abril de 2026.',
      },
      {
        question: '¿Qué parte de la cotización del empleador mejora mi pensión?',
        answer:
          'Del 4,25% vigente desde agosto de 2027, el 0,25% va a tu cuenta de capitalización individual y el 1,5% es una Cotización con Rentabilidad Protegida registrada a tu favor y reintegrada en tu pensión. El 2,5% restante financia el seguro social y la compensación por expectativa de vida.',
      },
    ],
    sources: [
      { label: 'BCN LeyChile — Ley 21.830 (reajuste del ingreso mínimo)', url: LEY_21830 },
      {
        label: 'BCN LeyChile — Ley 21.735 (reforma de pensiones, artículo cuarto transitorio)',
        url: LEY_21735,
      },
      { label: 'BCN LeyChile — Ley 21.561 (reducción gradual de la jornada)', url: LEY_21561 },
      { label: 'INE, boletín IPC octubre 2026', url: INE_OCTUBRE },
      { label: 'Dirección del Trabajo, ingreso mínimo mensual', url: DT_60141 },
    ],
    content: `<p class="article-lead">El año 2027 trae tres hitos confirmados por ley para el sueldo en Chile: el reajuste automático del ingreso mínimo en enero, un nuevo reajuste que se negociará para julio y el alza de la cotización del empleador en agosto. Ninguno de ellos está definido aún en montos completos —el ingreso mínimo de enero espera su decreto y el de julio su proyecto de ley—, pero las fechas y las reglas ya están escritas. Esta es la línea de tiempo, con lo que cambia en la liquidación y lo que se mantiene igual.</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Fecha de corte: 26 de noviembre de 2026</strong><p>Este artículo usa el texto de la ${ext(LEY_21830, 'Ley 21.830')}, el artículo cuarto transitorio de la ${ext(LEY_21735, 'Ley 21.735')} y el IPC del INE publicado hasta octubre de 2026. Cuando salga el decreto con el monto de enero actualizaremos esta página.</p></div></aside>

<h2 id="enero-reajuste-minimo">Enero: el sueldo mínimo se reajusta por IPC</h2>

<p>El 1 de enero de 2027 el ingreso mínimo mensual deja de ser $553.553. La Ley 21.830 ordena reajustarlo "conforme a la variación acumulada por el Índice de Precios al Consumidor, determinada e informada por el Instituto Nacional de Estadísticas entre el 1 de mayo de 2026 y el 31 de diciembre de 2026". A mediados de noviembre la variación parcial de mayo a octubre es de 1,7%, pero faltan dos meses y, sobre todo, falta el decreto: el Ministerio de Hacienda tiene plazo hasta el <strong>15 de enero de 2027</strong> para fijar los valores oficiales.</p>

<p>Por eso no publicamos un monto estimado como si fuera real. Cualquier cifra que circule antes del decreto —incluidas las nuestras— es una proyección. Lo que sí se puede hacer hoy es simular escenarios con la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a> ingresando el bruto que estimes, o revisar el detalle del cálculo del reajuste en el artículo sobre el <a href="/blog/sueldo-minimo-2027-reajuste-simular-liquido">reajuste del sueldo mínimo de enero 2027</a>.</p>

<p>El decreto de enero no mueve solo el mínimo general. En la misma proporción suben:</p>

<ul>
<li><strong>El mínimo de menores de 18 y mayores de 65 años</strong> ($412.938 vigente) y el ingreso mínimo para fines no remuneracionales ($356.815), que se usa entre otras cosas en el piso diario de los subsidios por licencia médica.</li>
<li><strong>Los tramos de ingreso de la asignación familiar y del subsidio familiar</strong>, según el artículo 6 de la ley. En la asignación familiar, quien hoy está cerca del límite de un tramo puede cambiar de tramo y recibir un monto distinto por carga. La <a href="/calculadoras/calculadora-asignacion-familiar">calculadora de asignación familiar</a> usa los tramos vigentes.</li>
<li><strong>El piso de las jornadas parciales</strong> de 30 horas o menos, que es proporcional al mínimo, y la remuneración mínima de las trabajadoras de casa particular.</li>
</ul>

<h2 id="gratificacion">El tope de la gratificación legal también se mueve</h2>

<p>La gratificación del artículo 50 del Código del Trabajo —25% de las remuneraciones— tiene un tope anual de <strong>4,75 ingresos mínimos mensuales</strong>, calculado con el valor vigente al 31 de diciembre del año respectivo. En la práctica: para la gratificación de 2026 manda el monto de diciembre de 2026 ($553.553), y la gratificación de 2027 usará el valor que rija al cierre de ese año, que incorporará tanto el reajuste de enero como el eventual reajuste de julio. Quienes ganan sobre el tope verán aumentar su gratificación máxima sin que cambie su sueldo base. Puedes revisar tu caso en la <a href="/calculadoras/calculadora-gratificacion-legal">calculadora de gratificación legal</a>.</p>

<h2 id="julio-proyecto">Julio: un segundo reajuste que sí se negocia</h2>

<p>El artículo 7 de la Ley 21.830 obliga al Presidente a enviar al Congreso, a más tardar en junio de 2027, un proyecto de ley para un nuevo reajuste del ingreso mínimo que regiría desde el <strong>1 de julio de 2027</strong>, previa consulta al Consejo Superior Laboral. A diferencia del reajuste de enero —automático por inflación—, este es una negociación política: no existe propuesta de monto y no la habrá hasta que el proyecto ingrese. Si ves en los primeros meses de 2027 cifras atribuidas al "sueldo mínimo de julio", son aspiraciones o propuestas de negociación, no valores oficiales.</p>

<h2 id="agosto-cotizacion">Agosto: la cotización del empleador sube a 4,25%</h2>

<p>Desde las remuneraciones devengadas en <strong>agosto de 2027</strong>, la cotización previsional de cargo del empleador de la Ley 21.735 sube de 3,5% a <strong>4,25%</strong> de la remuneración imponible, según la letra c) del artículo cuarto transitorio. El desglose queda así:</p>

<div class="table-scroll"><table>
<caption>Composición de la cotización del empleador, Ley 21.735</caption>
<thead><tr><th scope="col">Componente</th><th scope="col">Ago-2026 a jul-2027</th><th scope="col">Desde ago-2027</th></tr></thead>
<tbody>
<tr><td>Capitalización individual del trabajador</td><td>0,1%</td><td>0,25%</td></tr>
<tr><td>Cotización con Rentabilidad Protegida (CRP)</td><td>0,9%</td><td>1,5%</td></tr>
<tr><td>Seguro social y compensación por expectativa de vida</td><td>2,5%</td><td>2,5%</td></tr>
<tr><td><strong>Total empleador</strong></td><td><strong>3,5%</strong></td><td><strong>4,25%</strong></td></tr>
</tbody>
</table></div>

<p>Ojo con un error de redondeo que circula: algunos resúmenes informativos hablan de 4,5% para esta etapa. El texto legal y las presentaciones técnicas de la Subsecretaría de Previsión Social dicen 4,25%, que es la suma exacta de los tres componentes. Para presupuestar o liquidar, usa 4,25%.</p>

<p>Lo más importante para el trabajador es lo que <strong>no</strong> pasa: esta cotización no se descuenta del sueldo líquido. Es un costo del empleador, igual que el mutual o el seguro de accidentes. Lo que sí cambia para ti es que una parte mayor de ese aporte queda registrada a tu favor: 0,25% va directo a tu cuenta de capitalización individual y 1,5% es CRP, que se reintegra en tu pensión con su rentabilidad protegida. Tu liquidación seguirá mostrando los mismos descuentos de siempre —10% de AFP más la comisión de la administradora, 7% de salud y, en contrato indefinido, 0,6% de seguro de cesantía— y tu líquido no baja por esta ley.</p>

<p>Para el empleador el efecto es directo en el costo laboral: por cada $1.000.000 de remuneración imponible, el aporte patronal sube $7.500 mensuales frente al esquema de 3,5%. La <a href="/calculadoras/calculadora-costo-empleado-pyme">calculadora de costo de un empleado</a> permite revisar la composición de ese costo con los parámetros vigentes, y el detalle de la etapa actual está en el artículo sobre la <a href="/blog/cotizacion-empleador-3-5-agosto-2026-costo-pyme">cotización del empleador de 3,5%</a>.</p>

<h2 id="lo-que-no-cambia">Lo que no cambia en 2027</h2>

<p>Buena parte de las dudas sobre "el sueldo 2027" vienen de cambios que no existen ese año:</p>

<ul>
<li><strong>La jornada no baja a 40 horas.</strong> La ${ext(LEY_21561, 'Ley 21.561')} (la "ley de 40 horas") reduce la jornada en etapas: pasó de 45 a 44 horas en 2024 y a <strong>42 horas el 26 de abril de 2026</strong>. La última baja, a 40 horas, rige recién el <strong>26 de abril de 2028</strong>. Durante todo 2027 la jornada máxima legal sigue siendo 42 horas semanales, con la exigencia vigente de distribuirla por escrito según la Dirección del Trabajo.</li>
<li><strong>Los descuentos del trabajador no cambian.</strong> El 10% de AFP, el 7% de salud y el 0,6% de seguro de cesantía no tienen modificaciones programadas para 2027.</li>
<li><strong>El tope imponible no tiene un cambio legal nuevo programado para 2027.</strong> Se mantiene el mecanismo vigente de los años anteriores.</li>
</ul>

<h2 id="calendario">Calendario completo del sueldo en 2027</h2>

<div class="table-scroll"><table>
<caption>Hitos confirmados y pendientes del sueldo en 2027</caption>
<thead><tr><th scope="col">Fecha</th><th scope="col">Hito</th><th scope="col">Estado al 26-11-2026</th></tr></thead>
<tbody>
<tr><td>1 de enero de 2027</td><td>Rige el ingreso mínimo reajustado por IPC may–dic 2026</td><td>Fijado por ley; monto pendiente</td></tr>
<tr><td>A más tardar el 15 de enero de 2027</td><td>Decreto de Hacienda con el monto de enero, mínimos especiales y tramos de asignación familiar</td><td>Pendiente</td></tr>
<tr><td>Durante 2027</td><td>Jornada máxima legal: 42 horas semanales (sin cambio)</td><td>Vigente</td></tr>
<tr><td>A más tardar junio de 2027</td><td>Proyecto de ley para reajuste del ingreso mínimo</td><td>Pendiente</td></tr>
<tr><td>1 de julio de 2027</td><td>Entrada en vigencia del nuevo reajuste, según lo que apruebe el Congreso</td><td>Pendiente</td></tr>
<tr><td>Agosto de 2027</td><td>Cotización del empleador sube de 3,5% a 4,25% de la remuneración imponible</td><td>Fijado por ley</td></tr>
</tbody>
</table></div>

<h2 id="que-revisar">Qué conviene revisar en tu liquidación de 2027</h2>

<p><strong>Si ganas el sueldo mínimo o cerca de él:</strong> en la liquidación de enero el sueldo base debería reflejar el monto del decreto, aunque el decreto salga después del 1 de enero —en ese caso corresponde reliquidar la diferencia—. Si tu contrato remunera con el mínimo, el reajuste opera por ley y no necesitas firmar un anexo.</p>

<p><strong>Si recibes asignación familiar:</strong> revisa tu tramo en enero con los nuevos límites de ingreso. Un reajuste de tramos puede moverte a un tramo distinto aunque tu renta no cambie.</p>

<p><strong>Si tu gratificación topa con el límite legal:</strong> el tope de 4,75 ingresos mínimos se calcula con el valor de diciembre de 2027, que incluirá el reajuste de enero y, si el Congreso lo aprueba, el reajuste de julio. Vale la pena simularlo cuando salgan los montos.</p>

<p><strong>Si eres empleador:</strong> presupuesta desde agosto un costo previsional de 4,25% por trabajador, no 3,5%, y cuida no duplicar el seguro social: los 2,5% destinados al seguro ya están dentro de la cotización. Y prepara enero con el monto del ingreso mínimo como variable, no con una estimación.</p>

<p>En resumen: 2027 no es un año de un solo reajuste, sino del reajuste automático de enero, la negociación de un segundo reajuste para julio y un hito previsional que sale del bolsillo del empleador. Las fechas ya están en la ley; los montos se irán confirmando entre enero y junio, y aquí los actualizaremos apenas sean oficiales.</p>

<p>Este artículo es orientación general: no sustituye tu liquidación de sueldo, tu contrato ni una asesoría laboral o previsional. Las simulaciones de las calculadoras son referenciales y usan los valores vigentes informados en cada una.</p>`,
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
    embedCalculatorId: 'compras-internacionales',
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
  {
    slug: 'cambiar-devolver-regalos-navidad-retracto-sernac',
    seoTitle: 'Cambiar o devolver un regalo de Navidad: derechos',
    title:
      'Cambios y devoluciones de regalos de Navidad: derecho a retracto, ticket de cambio y garantía legal',
    description:
      'Qué derechos tienes para cambiar o devolver un regalo en Chile según SERNAC: retracto de 10 días solo en compras online, ticket de cambio en tienda física y garantía legal de 6 meses si el producto falla.',
    date: '2026-11-26',
    updatedAt: '2026-11-26',
    category: 'educacion-financiera',
    readingTime: 9,
    keywords: [
      'cambiar regalo navidad',
      'devolución regalos chile',
      'derecho a retracto compras online',
      'ticket de cambio',
      'garantía legal 6x3 sernac',
      'cambios y devoluciones navidad',
    ],
    relatedCalculators: ['calculadora-dias-habiles', 'calculadora-compras-internacionales'],
    sources: [
      {
        label: 'SERNAC — Garantía legal: las 3 alternativas dentro de 6 meses',
        url: 'https://www.sernac.cl/portal/618/w3-propertyvalue-8062.html',
      },
      {
        label: 'SERNAC — Tus derechos en el comercio electrónico (derecho a retracto)',
        url: 'https://www.sernac.cl/portal/604/w3-propertyvalue-20982.html',
      },
      {
        label: 'Ley Chile — Ley 19.496 (DFL 3), artículo 3 bis: derecho a retracto',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1160403&idParte=10239814',
      },
      {
        label: 'Ley Chile — Decreto 52, reglamento del derecho a retracto',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1206144',
      },
      {
        label: 'SERNAC — Garantía legal en los regalos de Navidad',
        url: 'https://www.sernac.cl/portal/604/w3-article-87910.html',
      },
    ],
    faq: [
      {
        question:
          '¿Puedo devolver un regalo comprado en una tienda física solo porque no me gustó?',
        answer:
          'En general no. En compras presenciales no existe derecho a retracto cuando pudiste ver y tomar el producto: ahí solo hay cambio por gusto o talla si el comercio ofreció una política voluntaria (ticket de cambio). La excepción: la ley también permite retracto en ventas celebradas en el establecimiento cuando el consumidor no tuvo acceso directo al bien antes de comprar.',
      },
      {
        question: '¿Cuánto tiempo tengo para ejercer el derecho a retracto en una compra online?',
        answer:
          'Dentro de los 10 días siguientes a la recepción del producto en el domicilio declarado (90 días si el proveedor nunca envió la confirmación escrita del contrato). Para servicios, 10 días desde la contratación —o 90 días sin confirmación escrita— y siempre antes de que empiece la prestación. El producto debe devolverse sin uso y, por regla general, con su embalaje original en buen estado.',
      },
      {
        question: '¿La tienda puede negarse al retracto?',
        answer:
          'Solo si informó la exclusión antes de la compra, de manera destacada y de fácil acceso, o si el bien entra en las excepciones del Decreto 52: productos que por su naturaleza no pueden devolverse o se deterioran rápido, bienes hechos a medida del consumidor, y bienes de uso personal cuyo sello de higiene fue abierto tras la entrega cuando eso genera un riesgo sanitario.',
      },
      {
        question: '¿Quién hace el trámite si el regalo lo compró otra persona?',
        answer:
          'Quien recibe el regalo puede ejercer los derechos presentando el ticket de cambio, la boleta o un comprobante de pago que acredite la compra, como el voucher o el estado de cuenta de la tarjeta. Pide a quien regaló alguno de esos documentos.',
      },
      {
        question: '¿La garantía legal sirve si el regalo no me quedó la talla?',
        answer:
          'No. La garantía legal cubre productos defectuosos, incompletos o no aptos para su uso, no el gusto ni la talla. Para eso existe el ticket de cambio voluntario de la tienda o, en compras a distancia, el derecho a retracto.',
      },
      {
        question: '¿Dónde reclamo si la empresa no responde?',
        answer:
          'Primero reclama directamente a la empresa. Si no resuelve, puedes ingresar el reclamo en el sitio de SERNAC (sernac.cl), que ofrece mediación, y como última instancia demandar ante el Juzgado de Policía Local correspondiente.',
      },
    ],
    content: `<p class="article-lead">Si el regalo de Navidad no sirve, vino defectuoso o no era lo que esperabas, lo que puedes hacer depende de <strong>cómo se compró</strong>: el derecho a retracto de 10 días aplica solo a compras por internet, teléfono u otros medios a distancia; en tienda física el cambio por gusto o talla es una política voluntaria del comercio (el "ticket de cambio"); y si el producto falla, la garantía legal da 6 meses para pedir reparación gratuita, cambio o devolución del dinero, en la tienda física o online por igual.</p>
<p>Este artículo revisa las tres reglas según el texto vigente de la Ley del Consumidor (Ley 19.496), el reglamento del derecho a retracto (Decreto 52 del Ministerio de Economía) y las fichas del SERNAC. Fecha de corte: 26 de noviembre de 2026. No cubre las políticas comerciales de cada tienda —cada una define sus plazos y condiciones de cambio voluntario— ni las devoluciones de plataformas extranjeras, que siguen sus propias reglas.</p>

<h2>Primero: ¿qué regla aplica a tu caso?</h2>
<p>Antes de ir a la tienda, identifica la situación. Las tres reglas se confunden todo el tiempo y no son intercambiables:</p>
<table>
<thead><tr><th>Situación</th><th>Regla que aplica</th><th>Plazo</th></tr></thead>
<tbody>
<tr><td>Compraron el regalo online, por teléfono o por catálogo, y no lo quieres</td><td>Derecho a retracto (art. 3 bis, Ley 19.496)</td><td>10 días desde que se recibió el producto</td></tr>
<tr><td>Compraron en tienda física, con acceso directo al producto, y quieres otra talla, otro color o otra cosa</td><td>Cambio voluntario ("ticket de cambio")</td><td>El que la tienda haya ofrecido</td></tr>
<tr><td>El producto salió defectuoso, incompleto o no sirve para su uso</td><td>Garantía legal</td><td>6 meses desde la entrega (perecibles: el plazo impreso, máx. 7 días)</td></tr>
</tbody>
</table>
<p>La distinción importa porque los requisitos son distintos: el retracto pide el producto sin uso y con embalaje; la garantía legal es justamente para productos que fallaron; y el ticket de cambio es la única vía para "no me gustó" en una compra presencial.</p>

<h2>Derecho a retracto: 10 días, solo en compras a distancia</h2>
<p>El <a href="https://www.bcn.cl/leychile/navegar?idNorma=1160403&idParte=10239814" target="_blank" rel="noopener">artículo 3 bis de la Ley 19.496</a> permite arrepentirse de una compra celebrada por medios electrónicos, o cuando se aceptó una oferta enviada por catálogos, avisos u otra forma de comunicación a distancia. En regalos de Navidad es la regla clave: gran parte de las compras de diciembre se hacen en línea.</p>
<p>Los puntos que fija la norma y el SERNAC:</p>
<ul>
<li><strong>Plazo.</strong> 10 días desde la recepción del producto en el domicilio declarado al comprar. Para servicios, 10 días desde la contratación, y siempre antes de que comience la prestación. Si el proveedor no envió la confirmación escrita del contrato, el plazo para ponerle término se extiende a 90 días.</li>
<li><strong>Estado del producto.</strong> Debe devolverse sin uso, con el embalaje original en buen estado, manuales y certificados de garantía. Una lavadora ya instalada o un computador usado más allá de la inspección razonable pierde el retracto. Si el proveedor informó previamente el valor del embalaje, la ley permite restituir ese valor en vez del embalaje mismo.</li>
<li><strong>Exclusiones informadas.</strong> El proveedor puede excluir el retracto solo si lo informó antes de la compra, de manera destacada y de fácil acceso. Un aviso genérico posterior o escondido no basta.</li>
<li><strong>Excepciones del reglamento.</strong> El <a href="https://www.bcn.cl/leychile/navegar?idNorma=1206144" target="_blank" rel="noopener">Decreto 52</a> lista los casos en que excepcionalmente no hay retracto: bienes que por su naturaleza no pueden devolverse, perecibles o que caducan en menos de 10 días, productos confeccionados a medida del consumidor, y bienes de uso personal cuyo sello de higiene el consumidor abrió o retiró tras la entrega cuando eso genera un riesgo sanitario.</li>
<li><strong>Compra presencial sin acceso directo.</strong> En ciertos casos el retracto también cubre compras celebradas en el establecimiento cuando el consumidor no tuvo posibilidad de acceder directamente al bien antes de la compra (letra c del art. 3 bis).</li>
<li><strong>Devolución del dinero.</strong> Ejercido el retracto, el proveedor debe restituir el precio pagado conforme a la ley; revisa con la tienda cómo y en qué plazo procesa el reembolso.</li>
</ul>
<p>Para Navidad 2026 la cuenta práctica es esta: si el regalo se recibió el 24 de diciembre, el décimo día corrido cae el domingo 3 de enero de 2027: ese es el vencimiento del retracto, no una fecha aproximada. No es una fecha límite de cambio de la tienda, es un plazo legal para arrepentirse de la compra completa.</p>

<h2>Compra en tienda física: el ticket de cambio no es un derecho, es una promesa</h2>
<p>En la compra presencial común —en la que pudiste ver y tomar el producto— no existe derecho a retracto (la excepción legal es la compra sin acceso directo al bien, descrita más arriba). Si la chaqueta no quedó la talla o el regalo no gustó, la ley no obliga al comercio a cambiarlo: el cambio "a todo evento" es una oferta voluntaria que la empresa puede dar o no dar, y si la da, debe respetar sus propias condiciones (plazo, estado del producto, documento requerido).</p>
<p>Por eso el ticket de cambio es el documento estrella de diciembre. SERNAC lo describe como un acto voluntario de la empresa que permite cambiar el producto en un tiempo establecido, y es donde sí aplican el gusto o la talla. Además, sirve como comprobante de la compra para ejercer la garantía legal si el producto falla después.</p>
<p>Recomendación concreta para quien regala: pide el ticket de cambio al comprar y entrégalo con el regalo. Sin ese papel, quien recibe un regalo comprado en tienda tiene pocas opciones cuando no le queda, porque no fue parte del contrato de compra.</p>
<p>Una advertencia útil: los carteles o boletas que dicen "sin cambio ni devolución" en productos de oferta o liquidación <strong>no eliminan la garantía legal</strong>. SERNAC es explícito: esos letreros no valen para productos que salen defectuosos. Solo pierden la garantía los productos vendidos como "segunda selección" o "hechos con materiales usados", y únicamente si el comercio lo informó antes de la compra.</p>

<h2>Garantía legal: 6 meses si el regalo viene malo</h2>
<p>Si el regalo salió defectuoso —el juguete no enciende, al electrodoméstico le faltan piezas, la prenda vino con una falla—, la regla es otra y es mucho más fuerte. Según la <a href="https://www.sernac.cl/portal/618/w3-propertyvalue-8062.html" target="_blank" rel="noopener">ficha de garantía legal del SERNAC</a>, dentro de los primeros seis meses desde la entrega del producto, el consumidor elige entre tres alternativas:</p>
<ul>
<li><strong>Devolución del dinero.</strong></li>
<li><strong>Cambio del producto.</strong></li>
<li><strong>Reparación gratuita.</strong></li>
</ul>
<p>La elección es del consumidor, no de la tienda. Aplica a productos nuevos que salieron defectuosos, incompletos, no aptos para el uso destinado, o que ya fueron reparados y la falla persiste o aparece una nueva. Si eliges reparación, el tiempo que dura la reparación <strong>suspende</strong> el plazo de 6 meses: la garantía no corre mientras el producto está en el servicio técnico.</p>
<p>Puntos que las tiendas no pueden exigir:</p>
<ul>
<li>No pueden condicionar la garantía a presentar la caja o el embalaje original, ni cobrar por no tenerlos.</li>
<li>No pueden limitar el número o tipo de sucursales, ni los horarios, para ejercer el derecho.</li>
<li>No pueden obligarte a pasar primero por un servicio técnico para "evaluar" si aceptan el reclamo.</li>
</ul>
<p>La garantía se ejerce contra el vendedor con las tres opciones. El fabricante y el importador también responden, pero solo por reparación o cambio del producto, no por devolución del dinero. La reparación gratuita se les puede pedir directamente aunque el vendedor siga atendiendo; el cambio se les exige cuando el vendedor no está disponible, por ejemplo por término de giro.</p>
<p>Una precisión de plazo: para productos perecibles y de uso o consumo breve, la garantía legal corre por el plazo impreso en el producto o su envoltorio; si no figura, el máximo es de siete días. La regla de los 6 meses es para el resto de los bienes nuevos.</p>
<p>Y al revés del retracto: la garantía legal <strong>no aplica</strong> cuando el producto simplemente no gustó o no quedó la talla. Usarla para "devolver porque no me tincó" desgasta el reclamo; para eso está el ticket de cambio o el retracto online.</p>

<h2>Si el regalo lo compró otra persona: qué documento necesitas</h2>
<p>Los derechos del consumidor se ejercen con un comprobante de la compra. SERNAC acepta como acreditación la boleta, el voucher del banco, el estado de cuenta de la tarjeta o el ticket de cambio. Si recibiste un regalo defectuoso y no tienes el comprobante, pídelo a quien lo compró: sin ese documento, la tienda puede negar el gestión.</p>
<p>En compras online el comprobante suele ser la boleta electrónica que llegó al correo del comprador. Vale la pena que quien regala avise o reenvíe ese correo, sobre todo en electrónica y juguetes, donde la garantía legal es la vía probable.</p>

<h2>Regalos comprados en plataformas extranjeras</h2>
<p>Temu, AliExpress, Shein y similares no operan con el retracto chileno tal cual: cada plataforma tiene su propia política de devolución, con plazos y costos de envío internacional que suelen hacer la devolución lenta y cara. Antes de reclamar por esa vía, revisa la política de devoluciones de la plataforma. El detalle de cómo se cobran los impuestos de esas compras está en nuestro artículo sobre <a href="/blog/impuestos-compras-temu-aliexpress-shein-navidad">impuestos de compras internacionales en Temu, AliExpress y Shein</a>.</p>

<h2>Plazos prácticos para esta Navidad</h2>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo hipotético: regalo comprado online para el 24</div><ul><li>El producto llega al domicilio el 22 de diciembre.</li><li>Derecho a retracto: ejercible dentro de los 10 días corridos siguientes a la recepción —vence el viernes 1 de enero de 2027—, si la tienda no lo excluyó al vender.</li><li>Si el producto falla al abrirse: garantía legal de 6 meses, con reparación, cambio o devolución a elección del consumidor.</li><li>Si solo no gustó: depende de la política de cambio que la tienda haya ofrecido.</li></ul></div>
<p>Ten presente que el retracto se cuenta en días corridos desde la recepción, no en días hábiles: no lo calcules excluyendo domingos ni feriados, o llegarás a una fecha posterior al vencimiento legal. La <a href="/calculadoras/calculadora-dias-habiles">calculadora de días hábiles</a> sirve para otros plazos (contratos, despidos, feriados), pero no para este cómputo legal.</p>

<h2>Cómo reclamar si la tienda no responde</h2>
<ol class="steps">
<li><strong>Reúne el comprobante.</strong> Boleta, voucher, estado de cuenta o ticket de cambio. En retracto online, guarda además el registro del pedido y de la entrega.</li>
<li><strong>Reclama primero a la empresa.</strong> Expón el caso y la opción que eliges (en garantía legal: reparación, cambio o devolución del dinero).</li>
<li><strong>Ingresa el reclamo en SERNAC.</strong> En sernac.cl se presenta el reclamo ante la plataforma de reclamos; SERNAC ofrece mediación entre consumidor y empresa.</li>
<li><strong>Demanda si no hay acuerdo.</strong> La última instancia es el Juzgado de Policía Local. La ley contempla además mecanismos colectivos a través del SERNAC para casos que afectan a muchos consumidores.</li>
</ol>

<h2>Errores frecuentes de enero</h2>
<ul>
<li><strong>Confundir retracto con garantía.</strong> El retracto es para arrepentirse de una compra a distancia dentro de 10 días; la garantía es para productos defectuosos dentro de 6 meses. Requisitos y resultados distintos.</li>
<li><strong>Exigir cambio por gusto en tienda física como derecho.</strong> No lo es: depende de la política voluntaria del comercio.</li>
<li><strong>Aceptar el letrero "sin cambio ni devolución" para un producto fallado.</strong> No vale: la garantía legal rige igual, incluso en liquidaciones.</li>
<li><strong>Pagar o aceptar que cobren por no tener la caja.</strong> El embalaje original no es requisito para la garantía legal. Para el retracto sí se pide en buen estado, salvo que el proveedor haya informado antes de la compra el valor del embalaje, en cuyo caso se puede restituir ese valor.</li>
<li><strong>Dejar pasar los 10 días.</strong> En compras online el retracto vence rápido: la primera semana de enero es el momento de decidir.</li>
</ul>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado el 26 de noviembre de 2026 con las fichas del <a href="https://www.sernac.cl/portal/618/w3-propertyvalue-8062.html" target="_blank" rel="noopener">SERNAC sobre garantía legal</a> y de <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-20982.html" target="_blank" rel="noopener">derechos en el comercio electrónico (retracto)</a>, el artículo 3 bis de la <a href="https://www.bcn.cl/leychile/navegar?idNorma=1160403" target="_blank" rel="noopener">Ley 19.496</a> y el <a href="https://www.bcn.cl/leychile/navegar?idNorma=1206144" target="_blank" rel="noopener">Decreto 52 del Ministerio de Economía</a> en Ley Chile.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Disclaimer YMYL</strong><p>Artículo informativo. No reemplaza la resolución del SERNAC ni un fallo judicial. Las políticas de cambio voluntario de cada comercio prevalecen en sus propios términos; ante un caso concreto, verifica siempre la fuente oficial.</p></div></aside>`,
  },
  {
    slug: 'permisos-con-goce-de-sueldo-chile',
    embedCalculatorId: 'dias-habiles',
    title: 'Permisos con goce de sueldo en Chile: matrimonio, nacimiento, duelo y exámenes médicos',
    description:
      'Qué permisos pagados obliga la ley chilena: 5 días hábiles por matrimonio o unión civil, 5 días por nacimiento, 10 días por muerte de un hijo y medio día anual para exámenes preventivos. Texto vigente del Código del Trabajo y cómo pedirlos.',
    date: '2026-11-26',
    category: 'laboral',
    readingTime: 9,
    relatedGuia: 'vacaciones-feriado-legal-chile',
    keywords: [
      'permisos con goce de sueldo chile',
      'permiso por matrimonio días',
      'permiso por nacimiento padre',
      'permiso por fallecimiento familiar',
      'artículo 66 código del trabajo',
      'permiso para exámenes médicos',
    ],
    relatedCalculators: [
      'calculadora-dias-habiles',
      'calculadora-vacaciones-proporcionales',
      'calculadora-sueldo-liquido',
    ],
    faq: [
      {
        question: '¿El empleador puede negarse a darme un permiso del artículo 66?',
        answer:
          'No. Son derechos irrenunciables para cualquier trabajador con contrato, independiente del tiempo de servicio. Lo único que el empleador puede pedir es la acreditación que la propia ley exige (por ejemplo, el certificado de defunción fetal). Si se niega o te descuenta los días, el camino es la denuncia ante la Inspección del Trabajo.',
      },
      {
        question: '¿Los días de permiso se descuentan de las vacaciones?',
        answer:
          'No. Los permisos por matrimonio, unión civil y duelo son adicionales al feriado anual: la ley lo dice expresamente. No se trata de días de feriado ni de horas administrativas, por lo que no reducen tus 15 días hábiles de vacaciones.',
      },
      {
        question: '¿Los días "corridos" incluyen sábado, domingo y festivos?',
        answer:
          'Sí. La Dirección del Trabajo ha precisado que los 10 días por muerte de un hijo y los 7 por la del cónyuge o conviviente civil son días corridos: se cuentan sin interrupción desde el fallecimiento, incluyendo fines de semana y feriados. Los permisos de 7 y 4 días, en cambio, son días hábiles.',
      },
      {
        question: '¿El "día administrativo" es un derecho legal?',
        answer:
          'No como tal. El Código del Trabajo no consagra un día administrativo remunerado: ese beneficio existe solo si está en tu contrato, en un convenio colectivo o en el reglamento interno de la empresa (los funcionarios públicos sí lo tienen por ley). Revisa tu contrato antes de pedirlo como derecho.',
      },
    ],
    content: `<p class="article-lead">El Código del Trabajo chileno obliga al empleador a pagar varios permisos que mucha gente no pide porque cree que "salen de las vacaciones". No salen: por matrimonio o unión civil son 5 días hábiles continuos; por el nacimiento de un hijo, 5 días para el padre; por la muerte de un hijo, 10 días corridos; por la del cónyuge o conviviente civil, 7; por la de un hermano, padre o madre, 4 días hábiles. Todos son adicionales al feriado anual, valen desde el primer día de contrato y no pueden cambiarse por dinero.</p>
<p>Este artículo revisa el texto vigente del Código del Trabajo (artículos 66, 66 bis, 195 y 207 bis) y las consultas publicadas por la Dirección del Trabajo (DT). Fecha de corte: 26 de noviembre de 2026. Ojo con el detalle: la escala de días del artículo 66 viene de las leyes 21.371 (2021) y 21.441 (2022), y la Ley 21.797 (2026) reforzó el fuero laboral asociado —buena parte de lo que circula en internet aún repite la escala antigua de 7 y 3 días—. Aquí va la vigente.</p>

<h2>Matrimonio o unión civil: 5 días hábiles continuos</h2>
<p>El <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">artículo 207 bis del Código del Trabajo</a> (agregado por la Ley 21.042, en 2017) da a todo trabajador que contrae matrimonio o celebra un acuerdo de unión civil <strong>cinco días hábiles continuos de permiso pagado</strong>, adicionales a las vacaciones e independientes del tiempo de servicio. Vale igual para el matrimonio civil que para el AUC y corre incluso si llevas una semana en la empresa.</p>
<p>Tú eliges cuándo usarlo: el día de la celebración y los días hábiles inmediatamente anteriores o posteriores. Las obligaciones son dos y las fija la misma norma: avisar al empleador —preferentemente por escrito— con <strong>30 días de anticipación</strong> y presentar el certificado del Registro Civil dentro de los <strong>30 días siguientes</strong> a la celebración. Si no avisas a tiempo, la DT admite que el empleador programe la fecha, pero no que elimine el derecho.</p>

<h2>Nacimiento o adopción: 5 días para el padre</h2>
<p>El artículo 195 del Código del Trabajo entrega al padre <strong>cinco días de permiso pagado</strong> por el nacimiento de un hijo. A diferencia del permiso por matrimonio, aquí hay dos formas de usarlo y la ley te deja elegir:</p>
<ul>
<li><strong>Continuo:</strong> desde el momento del parto, excluyendo el descanso semanal.</li>
<li><strong>Distribuido:</strong> repartido dentro del primer mes desde el nacimiento.</li>
</ul>
<p>Si no lo usas dentro de ese primer mes, se pierde: no se acumula ni se compensa. La <a href="https://www.bcn.cl/api-leyfacil/servicio/ObtenerGuiaPublicadaHTML?uri=permiso-laboral-por-nacimiento" target="_blank" rel="noopener">guía de Ley Fácil de la Biblioteca del Congreso Nacional</a> precisa que el permiso cubre también a los padres adoptivos; en ese caso el plazo corre desde la resolución judicial que otorga el cuidado personal del menor, por lo que conviene pedirlo apenas se notifique y no esperar la sentencia definitiva de adopción. Además, puedes pedir al empleador —con 30 días de anticipación— tomar el feriado anual inmediatamente después de este permiso.</p>
<p>La madre tiene un régimen distinto y más largo: seis semanas de prenatal, doce de postnatal y el permiso postnatal parental de doce semanas a jornada completa (o dieciocho a media jornada, con medio subsidio). Ese permiso parental se puede compartir: si la madre lo está usando, puede traspasar al padre —siempre que ambos sean trabajadores— hasta seis semanas a jornada completa, o doce semanas a media jornada si optó por la modalidad de dieciocho, siempre en el tramo final del período.</p>

<h2>Duelo: la escala del artículo 66 (texto vigente 2026)</h2>
<p>El <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">artículo 66 del Código del Trabajo</a> regula el permiso pagado por fallecimiento de familiares cercanos. La escala vigente según el texto actual de Ley Chile es esta:</p>
<table>
<thead><tr><th>Fallecimiento de</th><th>Permiso pagado</th></tr></thead>
<tbody>
<tr><td>Un hijo o una hija</td><td>10 días corridos</td></tr>
<tr><td>Cónyuge o conviviente civil</td><td>7 días corridos</td></tr>
<tr><td>Un hijo en período de gestación</td><td>7 días hábiles</td></tr>
<tr><td>Hermano, padre o madre</td><td>4 días hábiles</td></tr>
</tbody>
</table>
<p>Las reglas comunes son importantes y suelen ser el punto de conflicto:</p>
<ul>
<li><strong>Corren desde el día del fallecimiento.</strong> No puedes guardarlos para después; en defunción fetal parten desde que se acredita la muerte con el certificado correspondiente.</li>
<li><strong>"Corridos" incluye fines de semana y festivos.</strong> La DT lo ha dicho en dictamen: los 10 y los 7 días corridos se contabilizan sin interrupción. Los de 7 y 4 días, en cambio, son "hábiles": cuentan los días en que normalmente prestas servicios —incluido el sábado si tu jornada lo considera— y no el descanso semanal ni los festivos.</li>
<li><strong>No dependen de la antigüedad.</strong> Son "independientemente del tiempo de servicio": aplican con un contrato vigente, indefinido o plazo fijo.</li>
<li><strong>No se compensan en dinero.</strong> Ni durante la relación laboral ni al término; la ley lo prohíbe expresamente.</li>
<li><strong>Protección extra por muerte del hijo, del cónyuge o del conviviente civil:</strong> un mes de fuero laboral desde el fallecimiento —en contrato plazo fijo u obra, hasta el término del contrato si éste vence antes—. Mientras rige, el empleador no puede despedirte sin autorización judicial previa, aun invocando una causal legal.</li>
</ul>
<p>La ley no exige presentar el certificado de defunción para hacer efectivo el permiso general —a diferencia de la defunción fetal, que sí lo requiere—, pero en la práctica conviene entregarlo para evitar disputas.</p>

<h2>Exámenes preventivos: medio día al año</h2>
<p>El <strong>artículo 66 bis</strong> otorga medio día de permiso, una vez al año, para realizarse exámenes de mamografía y próstata, pudiendo incluir otras prestaciones de medicina preventiva como el papanicolau. Aplica a contratos de más de treinta días (en plazo fijo, a partir del día 30 de celebrado), puede complementarse además con el tiempo de traslado de ida y vuelta según la lejanía del centro de salud, y el período se considera trabajado para todos los efectos legales —tampoco se puede compensar en dinero—.</p>
<p>Aquí el aviso es más corto: debes informar al empleador con <strong>una semana de anticipación</strong> y presentar después los comprobantes que acrediten que te hiciste el examen en la fecha indicada. Si un convenio colectivo ya contempla un permiso análogo, se entiende cumplida la obligación legal.</p>

<h2>Lo que no está en la lista</h2>
<p>Dos confusiones frecuentes. Primero: el llamado <strong>"día administrativo"</strong> no existe en el Código del Trabajo para el sector privado. Es un beneficio de contrato o convenio colectivo (en el sector público sí es legal); si tu contrato no lo trae, no puedes exigirlo, aunque sí negociarlo. Segundo: el <strong>permiso sin goce de sueldo</strong> no es un derecho: requiere acuerdo entre las partes y no suspende el contrato, pero suspende la remuneración —y sin remuneración en el período no se generan cotizaciones obligatorias—.</p>
<p>El Código contempla además otros permisos remunerados que aquí no se detallan porque responden a situaciones distintas: emergencias como bombero voluntario, vocales de mesa en elecciones, actividades sindicales, licencias médicas y el descanso maternal completo. Para las vacaciones propiamente tales —15 días hábiles al año, más los progresivos por antigüedad— está la <a href="/guias/vacaciones-feriado-legal-chile">guía del feriado legal</a>.</p>

<h2>Cómo pedir el permiso (y qué hacer si se niegan)</h2>
<ol class="steps">
<li><strong>Identifica la causal y los días.</strong> Revisa la tabla: matrimonio/AUC, nacimiento, duelo o examen preventivo, y si los días son hábiles o corridos.</li>
<li><strong>Avisa con el plazo legal.</strong> 30 días para matrimonio/AUC, una semana para exámenes preventivos. Para nacimiento y duelo la ley no fija aviso previo: el hecho mismo gatilla el derecho.</li>
<li><strong>Junta el comprobante.</strong> Certificado de matrimonio o AUC, de nacimiento o defunción, o el comprobante del examen médico.</li>
<li><strong>Si el empleador se niega o descuenta días, denuncia.</strong> Ante la Inspección del Trabajo; la <a href="https://www.dt.gob.cl/portal/1628/w3-article-94883.html" target="_blank" rel="noopener">DT</a> responde consultas por escrito y sus dictámenes aclaran la interpretación.</li>
</ol>

<h2>Resumen de permisos pagados legales</h2>
<table>
<thead><tr><th>Causal</th><th>Días</th><th>Tipo de día</th><th>Norma</th></tr></thead>
<tbody>
<tr><td>Matrimonio o unión civil</td><td>5</td><td>Hábiles continuos</td><td>Art. 207 bis</td></tr>
<tr><td>Nacimiento o adopción (padre)</td><td>5</td><td>Continuos o en el primer mes</td><td>Art. 195</td></tr>
<tr><td>Muerte de un hijo</td><td>10</td><td>Corridos + fuero 1 mes</td><td>Art. 66</td></tr>
<tr><td>Muerte del cónyuge o conviviente</td><td>7</td><td>Corridos + fuero 1 mes</td><td>Art. 66</td></tr>
<tr><td>Muerte de hijo en gestación</td><td>7</td><td>Hábiles</td><td>Art. 66</td></tr>
<tr><td>Muerte de hermano, padre o madre</td><td>4</td><td>Hábiles</td><td>Art. 66</td></tr>
<tr><td>Examen preventivo (mamografía, próstata, pap)</td><td>Medio día/año</td><td>Hábil</td><td>Art. 66 bis</td></tr>
</tbody>
</table>
<p>En temporada de vacaciones estos permisos se suelen combinar con el feriado anual: el permiso por matrimonio seguido de vacaciones, o los días de nacimiento encadenados al feriado si lo pides con 30 días de anticipación. Son acumulables entre sí porque responden a hechos distintos.</p>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado el 26 de noviembre de 2026 con el texto vigente del <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">Código del Trabajo</a> (artículos 66, 66 bis, 195 y 207 bis) en Ley Chile, las consultas de la Dirección del Trabajo sobre <a href="https://www.dt.gob.cl/portal/1628/w3-article-94883.html" target="_blank" rel="noopener">permiso por muerte de un hijo</a> y <a href="https://dt.gob.cl/portal/1628/w3-article-103884.html" target="_blank" rel="noopener">permiso por matrimonio o unión civil</a>, y la guía de <a href="https://www.bcn.cl/api-leyfacil/servicio/ObtenerGuiaPublicadaHTML?uri=permiso-laboral-por-nacimiento" target="_blank" rel="noopener">Ley Fácil BCN sobre permisos laborales por nacimiento, matrimonio y duelo</a>.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Disclaimer YMYL</strong><p>Artículo informativo. No reemplaza un dictamen de la Dirección del Trabajo ni asesoría legal. Ante un caso concreto —especialmente si el empleador no reconoce el permiso—, prevalece lo que resuelva la Inspección del Trabajo.</p></div></aside>
<p>Para profundizar en descansos, revisa la <a href="/guias/vacaciones-feriado-legal-chile">guía del feriado legal</a>, la <a href="/guias/feriados-chile-2027">guía de feriados 2027</a> y la <a href="/calculadoras/calculadora-vacaciones-proporcionales">calculadora de vacaciones proporcionales</a>.</p>`,
    sources: [
      {
        label: 'Ley Chile — Código del Trabajo (arts. 66, 66 bis, 195 y 207 bis)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=207436',
      },
      {
        label: 'Dirección del Trabajo — Permiso por muerte de un hijo',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-94883.html',
      },
      {
        label: 'Dirección del Trabajo — Permiso por matrimonio o unión civil',
        url: 'https://dt.gob.cl/portal/1628/w3-article-103884.html',
      },
      {
        label: 'BCN Ley Fácil — Permiso laboral por nacimiento, matrimonio, unión civil o duelo',
        url: 'https://www.bcn.cl/api-leyfacil/servicio/ObtenerGuiaPublicadaHTML?uri=permiso-laboral-por-nacimiento',
      },
    ],
  },
  // Plan editorial #40 — permiso de circulación 2027 (ventana ene–mar)
  {
    slug: 'permiso-circulacion-2027-calcular-plazo',
    embedCalculatorId: 'permiso-circulacion',
    title: 'Permiso de circulación 2027: cuándo se paga, plazos y cuotas por tipo de vehículo',
    description:
      'Calendario del permiso de circulación 2027: autos hasta el 31 de marzo, taxis y buses en mayo, carga en septiembre. Segunda cuota de agosto, eléctricos al 50% y requisitos para renovar.',
    date: '2026-11-26',
    updatedAt: '2026-11-26',
    category: 'vehiculos',
    readingTime: 12,
    seoTitle: 'Permiso de circulación 2027: fechas, plazos y cuotas',
    seoDescription:
      'Calendario 2027 del permiso de circulación: pago hasta el 31 de marzo para autos, cuotas, SOAP, revisión técnica y rebaja del 50% para eléctricos. Fuente: Ley de Rentas Municipales y SII.',
    keywords: [
      'permiso de circulación 2027',
      'cuándo se paga el permiso de circulación',
      'permiso circulación 2027 plazo',
      'segunda cuota permiso circulación 2027',
      'calendario permiso de circulación',
      'renovar permiso de circulación',
    ],
    relatedCalculators: [
      'calculadora-permiso-circulacion',
      'calculadora-multas-transito',
      'calculadora-costo-tag',
    ],
    relatedGuia: 'vehiculos-chile-permiso-multas',
    faq: [
      {
        question: '¿Hasta cuándo se paga el permiso de circulación 2027?',
        answer:
          'Para autos, camionetas, motos y furgones, hasta el miércoles 31 de marzo de 2027 (la renovación abre el 1 de febrero). Taxis y buses pagan en mayo; camiones, remolques de carga y maquinaria, en septiembre.',
      },
      {
        question: '¿Puedo pagar el permiso 2027 en dos cuotas?',
        answer:
          'Sí, si no tienes deudas municipales pendientes. La primera cuota (50%) se paga dentro del plazo ordinario —hasta el 31 de marzo para autos— y la segunda en agosto para esos vehículos (junio para taxis/buses, octubre para carga), reajustada por el IPC del período legal.',
      },
      {
        question: '¿Qué cambia en 2027 para los autos eléctricos?',
        answer:
          'La rebaja del impuesto para eléctricos, híbridos enchufables y cero emisiones baja de 75% a 50% desde el 1 de febrero de 2027: en el permiso 2027 pagarán la mitad del impuesto, no un cuarto como en 2026. El SII aplica el descuento automáticamente.',
      },
      {
        question: '¿Qué pasa si no pago el permiso a tiempo?',
        answer:
          'El vehículo queda con deuda municipal reajustable con intereses, y circular con el permiso vencido es una infracción de tránsito que puede terminar en multa o retiro de circulación. Para regularizar pide la liquidación atrasada a la municipalidad; no estimes el recargo por tu cuenta.',
      },
    ],
    content: `<p class="article-lead">El permiso de circulación 2027 de autos, camionetas, motos y furgones se paga entre el 1 de febrero y el miércoles 31 de marzo de 2027. Puedes pagarlo de una vez o en dos cuotas —la segunda vence el 31 de agosto— y este año trae un cambio relevante: los eléctricos e híbridos enchufables pasan a pagar el 50% del impuesto, no el 25% como en 2026.</p>
<p>Este calendario viene del artículo 15 de la Ley de Rentas Municipales (DL 3.063), no de un aviso municipal: los plazos son por ley y se repiten cada año con las mismas ventanas. Las fechas concretas de portales de pago en línea las confirma cada municipalidad —y la Tesorería General para el pago electrónico centralizado—, pero el vencimiento legal es el que aparece abajo. Fecha de corte: 26 de noviembre de 2026.</p>

<h2>Calendario 2027 por tipo de vehículo</h2>
<table>
<thead><tr><th>Vehículo</th><th>Pago total o 1ª cuota</th><th>2ª cuota</th></tr></thead>
<tbody>
<tr><td>Autos, camionetas, motos, station wagons, furgones y remolques hasta 1.750 kg</td><td>1 feb – 31 mar 2027</td><td>Agosto (hasta el 31)</td></tr>
<tr><td>Taxis, buses y transporte colectivo de pasajeros</td><td>Mayo (hasta el 31)</td><td>Junio (hasta el 30)</td></tr>
<tr><td>Camiones, tractocamiones, remolques sobre 1.750 kg y maquinaria</td><td>Septiembre (hasta el 30)</td><td>Octubre (hasta el 31)</td></tr>
</tbody>
</table>
<p>Tres precisiones del mismo artículo 15 que suelen generar dudas:</p>
<ul>
<li><strong>La segunda cuota no es optativa ni nueva:</strong> solo existe si pagaste la primera en el plazo ordinario eligiendo el fraccionamiento. Quien pagó el total no tiene cuota pendiente en agosto.</li>
<li><strong>Ambas cuotas se pagan en la misma municipalidad.</strong> No puedes pagar la segunda en otra comuna porque el portal te resulte más cómodo.</li>
<li><strong>La segunda cuota se reajusta por IPC.</strong> Para autos, el artículo ordena actualizarla según la variación del IPC entre febrero y junio, por lo que el comprobante de agosto será algo mayor que la mitad de marzo. No apliques el IPC acumulado del año ni un porcentaje inventado: la cifra válida es la de la liquidación municipal.</li>
</ul>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>El vencimiento es legal, no comercial</strong><p>El 31 de marzo de 2027 cae miércoles. Algunos municipios habilitan pago en línea desde enero, pero la fecha que cuenta es la de la ley: pagar "tarde pero dentro del portal" igual puede dejar deuda si venció el plazo del artículo 15.</p></div></aside>

<h2>Vehículos comprados entre septiembre de 2026 y marzo de 2027</h2>
<p>Los autos adquiridos entre el 1 de septiembre de 2026 y el 31 de marzo de 2027 pagan su primer permiso en <strong>una sola cuota</strong>, dentro del período ordinario. No hay fraccionamiento para ese primer pago: si compraste un auto en diciembre o enero, presupuesta el monto completo desde ya. Ojo con un matiz práctico: "pagar dentro del período ordinario" no significa que puedas circular sin permiso hasta marzo — el vehículo debe inscribirse y obtener su permiso al adquirirlo para poder circular; la cuota única define <em>cómo</em> se paga ese primer impuesto, no una licencia para usar el auto sin él. Son dos trámites distintos que conviene no confundir: el permiso del año de compra (necesario ya) y la renovación anual de marzo siguiente, que pagarás con el resto de los vehículos. El cálculo proporcional por meses de uso lo determina la municipalidad según la fecha de inscripción, no el mes de la compraventa en el contrato.</p>
<p>Si compraste un usado, verifica antes de pagar que el permiso del año anterior esté al día: la deuda sigue al vehículo, no al antiguo dueño. Una promesa de "yo lo pago después" en el contrato no libera la obligación ante la municipalidad.</p>

<h2>Eléctricos e híbridos enchufables: la rebaja baja a 50% en 2027</h2>
<p>La Ley 21.505 de electromovilidad estableció una rebaja escalonada del impuesto para vehículos eléctricos, híbridos con recarga exterior y otros calificados como cero emisiones por el Ministerio de Energía, con año de fabricación 2021 en adelante. El tramo que corre desde el <strong>1 de febrero de 2027 y hasta el 31 de enero de 2029</strong> deja la rebaja en <strong>50%</strong>: estos vehículos pagan la mitad del impuesto en el permiso 2027.</p>
<table>
<thead><tr><th>Período de pago</th><th>Rebaja</th><th>Pagan del impuesto</th></tr></thead>
<tbody>
<tr><td>1 feb 2023 – 31 ene 2025</td><td>100%</td><td>0%</td></tr>
<tr><td>1 feb 2025 – 31 ene 2027</td><td>75%</td><td>25%</td></tr>
<tr><td><strong>1 feb 2027 – 31 ene 2029</strong></td><td><strong>50%</strong></td><td><strong>50%</strong></td></tr>
<tr><td>1 feb 2029 – 31 ene 2031</td><td>25%</td><td>75%</td></tr>
<tr><td>Desde el 1 feb 2031</td><td>0%</td><td>100%</td></tr>
</tbody>
</table>
<p>El descuento lo calcula el propio SII en la tasación, no hay que solicitarlo. Un híbrido autorrecargable que no se enchufa no accede al beneficio. Si comparas un eléctrico usado con uno a bencina, calcula el permiso con la rebaja del año en que vas a pagar —depende de la fecha de pago, no del año del auto—.</p>

<h2>Qué necesitas para renovar el permiso 2027</h2>
<p>Para un vehículo ya inscrito, la municipalidad típicamente exige:</p>
<ul>
<li>Permiso de circulación del año anterior.</li>
<li>Revisión técnica vigente (la que corresponda según el dígito de tu patente; el calendario 2027 se publica por resolución) <strong>o</strong> el certificado de homologación, cuando el vehículo lo requiera — ChileAtiende los presenta como alternativas según el caso, no como dos exigencias simultáneas.</li>
<li>SOAP vigente.</li>
<li>Sin multas del Juzgado de Policía Local pendientes ni deudas municipales asociadas.</li>
</ul>
<p>Para un vehículo nuevo se agrega la factura de compra y el trámite de primera inscripción, que puede hacerse en cualquier municipalidad —no necesariamente la de tu domicilio—. Si quieres cambiar de comuna en la renovación, el cambio se gestiona como parte del trámite de inscripción; consulta antes si tu municipio de destino lo permite en línea.</p>

<h2>Cómo se calcula el valor del permiso</h2>
<p>La municipalidad recauda, pero el impuesto sale de la <strong>tasación fiscal</strong> que el SII publica cada año por marca, modelo, versión y año del vehículo, más una escala progresiva de la Ley de Rentas Municipales con un mínimo legal. Los vehículos de carga y transporte no siguen esa escala: para ellos el SII fija montos en UTM por categoría —el permiso de un taxi es de 1 UTM al año, sin considerar ninguna "capacidad" —y si el taxi es eléctrico elegible, la rebaja de electromovilidad también aplica sobre esa tarifa base, por lo que en 2027 pagaría la mitad—, así que el cálculo de un camión o un taxi no se estima con la lógica de un auto particular. Por eso dos autos del mismo año pueden pagar distinto en la misma comuna —y por eso una diferencia entre comunas suele indicar tasación o deuda distinta, no un "precio municipal".</p>
<p>La <a href="/calculadoras/calculadora-permiso-circulacion">calculadora de permiso de circulación</a> de CalculaChile entrega una aproximación con los datos que ingreses: sirve para presupuestar, pero estima con las reglas de su propia metodología —entre ellas la rebaja del tramo vigente al configurarla— y no elige el año de pago. Para un eléctrico o híbrido enchufable elegible (año de fabricación 2021 en adelante), ajusta mentalmente al 50% del impuesto base en 2027; un eléctrico anterior a 2021 no tiene rebaja. La cifra que manda es la liquidación municipal, que incluye reajustes, deudas anteriores y la categoría exacta que el registro tenga para tu patente. Si el modelo fue identificado incorrectamente en la inscripción, pide revisión con padrón y factura antes de pagar.</p>

<h2>Si pagaste en dos cuotas: qué esperar en agosto de 2027</h2>
<p>Para los vehículos del período de marzo, la segunda cuota vence el <strong>martes 31 de agosto de 2027</strong>. Es el mismo 50% reajustado por la variación del IPC entre febrero y junio de 2027, y se paga en la municipalidad donde pagaste la primera. El detalle del mecanismo está en nuestro artículo de la <a href="/blog/permiso-circulacion-segunda-cuota-agosto-2026">segunda cuota del permiso 2026</a>: el procedimiento es el mismo, solo cambian las fechas y el reajuste de cada año.</p>

<h2>Qué pasa si dejas vencer el plazo</h2>
<p>La deuda queda asociada al vehículo y la municipalidad aplica reajustes e intereses legales; reaparecerá al intentar renovar el año siguiente o al transferir. Circular con el permiso vencido es además una infracción que puede terminar en multa y retiro del vehículo de circulación por resolución del Juzgado de Policía Local. Son dos obligaciones distintas: la multa de tránsito no estima el saldo municipal ni viceversa.</p>
<p>Si retiraste el vehículo de circulación definitivamente —siniestro, desarme—, el artículo 15 permite avisarlo por escrito a la unidad municipal que otorgó el permiso antes del vencimiento de la próxima renovación. Solo ese aviso formal exime de los períodos siguientes; dejar el auto guardado sin trámite no elimina la deuda.</p>

<h2>Errores frecuentes</h2>
<ul>
<li>Pagar la segunda cuota en una comuna distinta a la primera.</li>
<li>Esperar que la segunda cuota sea idéntica a la de marzo (lleva reajuste IPC).</li>
<li>Creer que un auto comprado en diciembre puede pagar su primer permiso en dos cuotas: paga una sola.</li>
<li>Asumir que un eléctrico sigue exento al 100%: desde febrero de 2027 paga el 50% del impuesto.</li>
<li>Comprar un usado sin revisar la deuda del permiso: el saldo queda pegado a la patente.</li>
<li>Usar enlaces de SMS o correos para pagar: entra escribiendo tú mismo el dominio oficial de la municipalidad.</li>
</ul>

<h2>Checklist antes del 31 de marzo de 2027</h2>
<ol class="steps">
<li>Revisa la revisión técnica: qué mes le toca a tu dígito de patente y que esté vigente.</li>
<li>Verifica el SOAP vigente para la fecha de pago.</li>
<li>Consulta deudas municipales o multas JPL pendientes asociadas a la patente.</li>
<li>Liquida el valor estimado con la <a href="/calculadoras/calculadora-permiso-circulacion">calculadora de permiso de circulación</a> para presupuestar.</li>
<li>Decide si pagas total o en dos cuotas antes de emitir el comprobante de marzo.</li>
<li>Paga por el canal oficial que indique tu municipalidad (su portal de tránsito o el sistema de pago que ella haya convenido), escribiendo el dominio tú mismo.</li>
<li>Descarga y guarda el permiso 2027 y el comprobante de pago.</li>
<li>Si elegiste cuotas, agenda el 31 de agosto de 2027 en la misma municipalidad.</li>
</ol>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado el 26 de noviembre de 2026 con el <a href="https://www.bcn.cl/leychile/navegar?idNorma=18967" target="_blank" rel="noopener">artículo 15 del Decreto Ley 3.063 de Rentas Municipales</a>, la guía de <a href="https://www.bcn.cl/leyfacil/recurso/permiso-de-circulacion" target="_blank" rel="noopener">Ley Fácil de la BCN sobre permiso de circulación</a>, la <a href="https://www.bcn.cl/leychile/navegar?idNorma=1184572" target="_blank" rel="noopener">Ley 21.505 de electromovilidad</a> y el calendario de rebajas para vehículos cero emisiones publicado por el <a href="https://www.sii.cl" target="_blank" rel="noopener">Servicio de Impuestos Internos</a>. Los días de semana de cada vencimiento corresponden al calendario 2027.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Disclaimer YMYL</strong><p>Artículo informativo. El monto exacto, la liquidación atrasada y los requisitos documentales específicos los emite cada municipalidad y el SII; ante una diferencia, prevalece la liquidación oficial.</p></div></aside>
<p>Para estimar tu monto usa la <a href="/calculadoras/calculadora-permiso-circulacion">calculadora de permiso de circulación</a>, revisa el detalle de la <a href="/blog/permiso-circulacion-segunda-cuota-agosto-2026">segunda cuota de agosto</a> y la <a href="/guias/vehiculos-chile-permiso-multas">guía de vehículos y multas</a>.</p>`,
    sources: [
      {
        label: 'Ley Chile — DL 3.063 Rentas Municipales, art. 15',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=18967',
      },
      {
        label: 'BCN Ley Fácil — Permiso de circulación',
        url: 'https://www.bcn.cl/leyfacil/recurso/permiso-de-circulacion',
      },
      {
        label: 'Ley Chile — Ley 21.505 (electromovilidad)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1184572',
      },
      { label: 'Servicio de Impuestos Internos', url: 'https://www.sii.cl' },
    ],
  },
  {
    slug: 'feriado-judicial-febrero-2027',
    embedCalculatorId: 'dias-habiles',
    title:
      'Feriado judicial en febrero de 2027: ya no existe, los tribunales funcionan y los plazos corren normal',
    description:
      'El feriado judicial fue suprimido por la Ley 20.774 y no aplica desde febrero de 2015. En febrero de 2027 los tribunales funcionan, los plazos civiles, laborales y penales corren con normalidad y el juez puede estar de vacaciones sin que eso suspenda tu causa.',
    date: '2026-11-26',
    category: 'laboral',
    readingTime: 8,
    relatedGuia: 'feriados-chile-2027',
    seoTitle: 'Feriado judicial febrero 2027: fue suprimido, los plazos corren',
    seoDescription:
      'No hay feriado judicial en febrero de 2027: la Ley 20.774 lo eliminó en 2014. Los tribunales funcionan y los plazos procesales corren todo el mes. Qué cambió y qué revisar si tienes causa.',
    keywords: [
      'feriado judicial febrero 2027',
      'feriado judicial 2027 chile',
      'hay feriado judicial en febrero',
      'plazos judiciales febrero',
      'tribunales cierran en febrero',
      'ley 20.774 feriado judicial',
    ],
    relatedCalculators: [
      'calculadora-dias-habiles',
      'calculadora-dias-administrativos',
      'calculadora-trabajo-en-feriado',
    ],
    faq: [
      {
        question: '¿Hay feriado judicial en febrero de 2027?',
        answer:
          'No. El feriado judicial fue suprimido por la Ley 20.774, publicada en el Diario Oficial el 4 de septiembre de 2014, y dejó de aplicarse en febrero de 2015. Desde entonces, todos los tribunales del país funcionan durante febrero y los plazos procesales corren con normalidad.',
      },
      {
        question: '¿Los plazos judiciales se suspenden en febrero?',
        answer:
          'No. Desde 2015 los plazos corren todo el año, incluido febrero. En juicios civiles se excluyen solo los feriados legales (domingos y festivos; los sábados cuentan como hábiles según el art. 66 del Código de Procedimiento Civil), y febrero de 2027 no tiene feriados legales nacionales. Un plazo fatal que venza en febrero se pierde igual que en cualquier otro mes.',
      },
      {
        question: '¿Los tribunales cierran en febrero?',
        answer:
          'No cierran. Los juzgados de letras tramitan causas todo el mes y la Corte Suprema puede dictar cada diciembre un auto acordado que determina cuántas salas suyas y de las Cortes de Apelaciones operan en febrero siguiente (art. 315 del Código Orgánico de Tribunales). Lo que sí ocurre es que jueces y funcionarios toman su feriado anual de un mes durante el año, muchas veces en verano, por lo que la atención puede ser más lenta.',
      },
      {
        question: '¿El feriado judicial afecta mi sueldo o mis vacaciones como trabajador?',
        answer:
          'No. El feriado judicial nunca fue un feriado laboral: era un receso interno del Poder Judicial. Como trabajador, febrero es un mes normal: tu feriado legal de 15 días hábiles se rige por el Código del Trabajo y no tiene relación con el calendario de los tribunales.',
      },
      {
        question: '¿La Tesorería también tiene feriado en febrero?',
        answer:
          'Es una institución distinta con un régimen propio: la Tesorería General de la República publica en tgr.cl su calendario de atención y de plazos de pago de febrero (contribuciones, multas, patentes). Ese régimen no depende del Poder Judicial ni del feriado judicial.',
      },
    ],
    content: `<p class="article-lead">Si buscas si hay <strong>feriado judicial en febrero de 2027</strong>, la respuesta directa es <strong>no</strong>: ese receso fue suprimido por la <a href="https://www.bcn.cl/leychile/navegar?idNorma=1064893" target="_blank" rel="noopener">Ley 20.774</a> y dejó de aplicarse en febrero de 2015. En febrero de 2027 los tribunales de todo el país funcionan, las causas se tramitan y los plazos procesales corren con normalidad, incluidos los plazos fatales que pueden cerrar un recurso para siempre.</p>
<p>Este artículo explica qué era el feriado judicial, qué cambió la Ley 20.774, cómo se cuentan los plazos durante febrero y qué revisar si tienes una causa abierta o un trámite en un tribunal. Fecha de corte: 26 de noviembre de 2026. No cubre el régimen de atención de la Tesorería General de la República en febrero, que es una norma distinta y también se menciona al final.</p>

<h2>El feriado judicial fue suprimido: qué hizo la Ley 20.774</h2>
<p>Hasta 2014, febrero era un mes de receso casi total para parte del sistema judicial. La <a href="https://obtienearchivo.bcn.cl/obtienearchivo?id=recursoslegales%2F10221.3%2F44980%2F2%2FFicha_feriado_judicial.pdf" target="_blank" rel="noopener">ficha de la Biblioteca del Congreso Nacional</a> lo describe así: la Corte Suprema y las Cortes de Apelaciones funcionaban solo con las llamadas "salas de verano", los juzgados de letras con competencia civil suspendían su funcionamiento y magistrados y funcionarios tomaban vacaciones durante todo el mes. Los tribunales de garantía, los orales en lo penal y los de familia, trabajo, tributarios y ambientales ya estaban excluidos y seguían operando.</p>
<p>La <a href="https://www.bcn.cl/leychile/navegar?idNorma=1064893" target="_blank" rel="noopener">Ley 20.774</a>, publicada en el Diario Oficial el 4 de septiembre de 2014, terminó con ese esquema. Su objeto declarado en el propio texto es "dar continuidad al servicio de administración de justicia en todos los tribunales ordinarios del país": a partir de febrero de 2015 el feriado judicial ya no se aplica en <strong>ningún</strong> tribunal del Poder Judicial. Los juzgados civiles deben seguir tramitando las causas durante febrero.</p>
<p>La reforma nació de un diagnóstico conocido: febrero concentraba el receso justo cuando no todos los servicios podían detenerse. Ya antes de 2015 la justicia penal —tribunales de garantía y orales en lo penal— funcionaba todo el mes, igual que los Tribunales de Familia, del Trabajo, Tributarios y Aduaneros y Ambientales, porque sus propias leyes los habían excluido del feriado. Lo que la Ley 20.774 hizo fue extender esa continuidad a la Corte Suprema, las Cortes de Apelaciones y los juzgados de letras con competencia civil, que eran los que aún se tomaban el mes.</p>
<p>La ley también reordenó las vacaciones del personal judicial. El artículo 313 del <a href="https://www.bcn.cl/leychile/navegar?idNorma=25563" target="_blank" rel="noopener">Código Orgánico de Tribunales</a> quedó con un "feriado anual de un mes" para jueces y funcionarios, pero ya no amarrado a febrero: pueden tomarlo en cualquier época del año e incluso dividirlo. Para que las vacaciones no dejen tribunales desguarnecidos, el juez y el secretario de un mismo juzgado de letras no pueden tomar feriado al mismo tiempo, y tampoco pueden hacerlo simultáneamente dos o más miembros de un tribunal colegiado ni dos o más jueces de una misma comuna o agrupación de comunas cuando eso perjudique el servicio.</p>

<h2>Plazos en febrero de 2027: corren normal</h2>
<p>Este es el punto que más daño hace cuando se confunde. Como ya no existe feriado judicial, <strong>ningún plazo judicial o administrativo se suspende por el solo hecho de ser febrero</strong>. Un vencimiento que cae en febrero de 2027 se pierde igual que uno de junio.</p>
<ul>
<li><strong>Juicios civiles.</strong> Los plazos de días se suspenden solo en feriados legales —salvo que el tribunal ordene expresamente contarlos, como permite la misma norma— (art. 66 del <a href="https://www.bcn.cl/leychile/navegar?idNorma=22740" target="_blank" rel="noopener">Código de Procedimiento Civil</a>): se excluyen domingos y festivos, y los sábados cuentan como hábiles. Los plazos fatales (art. 64) no se perdonan: vencido el plazo, se pierde el recurso.</li>
<li><strong>Juicios laborales.</strong> El Código del Trabajo lo regula expresamente: los términos de días del procedimiento laboral se suspenden durante los feriados (art. 435 del <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">Código del Trabajo</a>), con el mismo cómputo de lunes a sábado.</li>
<li><strong>Juicios de familia.</strong> Aplican la regla civil en forma supletoria: los plazos de días corren de lunes a sábado excluyendo feriados.</li>
<li><strong>Juicios penales.</strong> Todos los días son hábiles para los plazos (art. 14 del <a href="https://www.bcn.cl/leychile/navegar?idNorma=176595" target="_blank" rel="noopener">Código Procesal Penal</a>); solo si el último día cae en feriado se amplía al siguiente hábil.</li>
<li><strong>Procedimientos administrativos.</strong> Se rigen por la Ley 19.880, que excluye sábados, domingos y festivos. Tampoco reconocen febrero como mes especial.</li>
</ul>
<p>Y aquí el dato práctico para 2027: febrero <strong>no tiene ningún feriado legal nacional</strong> en Chile. Los 28 días del mes son computables según la regla de cada procedimiento, sin interrupción de mitad de mes ni "salas de verano". El calendario completo de feriados del año está en la <a href="/guias/feriados-chile-2027">guía de feriados de Chile 2027</a>.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo hipotético: plazo civil de 5 días notificado en enero</div><ul><li>Una parte es notificada de una resolución el jueves 28 de enero de 2027 con un plazo de 5 días.</li><li>El plazo corre desde el día siguiente: viernes 29, sábado 30, lunes 1, martes 2 y miércoles 3 de febrero (domingo 31 se excluye como feriado legal).</li><li>Vence a la medianoche del <strong>miércoles 3 de febrero de 2027</strong>. Que el juez esté de vacaciones o que "antes había feriado judicial" no lo extiende.</li></ul></div>

<h2>Lo que sí sigue existiendo en febrero</h2>
<p>Que el feriado judicial se haya eliminado no significa que febrero sea un mes idéntico a los demás dentro del Poder Judicial. Tres cosas continúan:</p>
<p><strong>Salas habilitadas por auto acordado.</strong> El artículo 315 del Código Orgánico de Tribunales habilita a la Corte Suprema a dictar cada diciembre un auto acordado que determina cuántas salas suyas y de las Cortes de Apelaciones funcionarán en febrero siguiente. Esas salas pueden conocer de las apelaciones en que otra sala haya decretado orden de no innovar. Los autos acordados se publican en el compendio de la Corte Suprema (<a href="https://autoacordados.pjud.cl/" target="_blank" rel="noopener">autoacordados.pjud.cl</a>); si se dicta uno para febrero de 2027, corresponde a diciembre de 2026.</p>
<p><strong>Vacaciones del personal.</strong> Muchos jueces y funcionarios siguen tomando su mes de feriado anual en verano por costumbre y por calendario escolar. En la práctica eso puede hacer algunos trámites más lentos o cambiar al juez que ve tu causa (el secretario subroga), pero no suspende plazos ni cierra la repartición.</p>
<p><strong>Audiencias y resoluciones programadas.</strong> La agenda de febrero se llena igual que la de otros meses: los juzgados pueden fijar audiencias, dictar resoluciones y practicar notificaciones. Si te citan a una audiencia en febrero, la inasistencia tiene las mismas consecuencias que en cualquier mes.</p>
<p><strong>Suspensión del procedimiento de común acuerdo.</strong> La propia Ley 20.774 dejó una válvula distinta al feriado: las partes de un juicio civil pueden suspender el procedimiento de común acuerdo hasta dos veces por instancia, con un máximo de 90 días en cada instancia, y también ante la Corte Suprema si hay recursos de queja o casación pendientes. Es una suspensión pactada y formal —no automática por calendario— y se pide al tribunal.</p>

<h2>Si tienes una causa o trámite en febrero de 2027</h2>
<ol class="steps">
<li><strong>Asume que el tribunal está abierto.</strong> Revisa tu causa en la Oficina Judicial Virtual (oficinajudicial.pjud.cl) como cualquier otro mes: las notificaciones y resoluciones se emiten igual.</li>
<li><strong>Recomputa tus vencimientos sin contar febrero como suspendido.</strong> La <a href="/calculadoras/calculadora-dias-habiles">calculadora de días hábiles</a> descuenta feriados y, si activas la opción de cómputo judicial ("¿Contar los sábados como días hábiles?"), cuenta de lunes a sábado; para plazos fatales o procesales, confirma el cómputo con tu abogado porque cada procedimiento tiene reglas propias.</li>
<li><strong>Si tu abogado está de vacaciones, el plazo corre igual.</strong> El feriado del profesional no detiene el cómputo; coordina reemplazo o revisión del expediente antes de enero.</li>
<li><strong>Para trámites ante la Tesorería, revisa su calendario aparte.</strong> La TGR publica en tgr.cl su propio régimen de atención y plazos de febrero; confunde mucho porque se le llama también "feriado", pero es otra institución y otra norma.</li>
</ol>

<h2>Distinciones que se confunden en la búsqueda</h2>
<p><strong>No es un feriado laboral.</strong> El feriado judicial nunca fue un día de descanso para trabajadores: era un receso interno de los tribunales. Si trabajas en comercio o cualquier empresa, febrero es un mes hábil normal. Tu feriado legal de vacaciones (15 días hábiles por año trabajado) es una institución del Código del Trabajo y no se toca aquí.</p>
<p><strong>No es el feriado bancario.</strong> El 31 de diciembre los bancos no atienden por la Ley 21.791, una regla anual de un solo día. No tiene relación con febrero ni con los tribunales.</p>
<p><strong>No es el régimen de la Tesorería.</strong> La TGR rige su atención y sus plazos de pago de febrero por una norma propia (contribuciones, patentes, multas). Si tu trámite es tributario o municipal, la referencia es tgr.cl, no el Poder Judicial.</p>

<h2>Errores frecuentes</h2>
<ul>
<li><strong>Dejar un recurso "para marzo porque en febrero no corre".</strong> Corre desde 2015: un plazo fatal perdido en febrero no tiene vuelta.</li>
<li><strong>Creer que la causa se congela si el juez está de vacaciones.</strong> El secretario subroga y la tramitación continúa; las notificaciones siguen llegando.</li>
<li><strong>Mezclar febrero judicial con el régimen de Tesorería.</strong> Son normas distintas: los tribunales no suspenden; lo que la TGR disponga para febrero se publica aparte en tgr.cl.</li>
<li><strong>Descontar sábados al contar plazos civiles.</strong> En procedimiento civil y laboral el sábado es día hábil para el cómputo; solo se excluyen domingos y festivos.</li>
</ul>

<h2>Fuentes consultadas</h2>
<p>Contenido verificado el 26 de noviembre de 2026 con el texto vigente de la <a href="https://www.bcn.cl/leychile/navegar?idNorma=1064893" target="_blank" rel="noopener">Ley 20.774</a> (que suprime el feriado judicial), los artículos 313 y 315 del <a href="https://www.bcn.cl/leychile/navegar?idNorma=25563" target="_blank" rel="noopener">Código Orgánico de Tribunales</a>, los artículos 64 y 66 del <a href="https://www.bcn.cl/leychile/navegar?idNorma=22740" target="_blank" rel="noopener">Código de Procedimiento Civil</a>, el artículo 14 del <a href="https://www.bcn.cl/leychile/navegar?idNorma=176595" target="_blank" rel="noopener">Código Procesal Penal</a>, la <a href="https://obtienearchivo.bcn.cl/obtienearchivo?id=recursoslegales%2F10221.3%2F44980%2F2%2FFicha_feriado_judicial.pdf" target="_blank" rel="noopener">ficha "Fin del feriado judicial" de la BCN</a> y el <a href="https://autoacordados.pjud.cl/" target="_blank" rel="noopener">compendio de autos acordados de la Corte Suprema</a>.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Disclaimer YMYL</strong><p>Artículo informativo. El cómputo exacto de un plazo depende del procedimiento y de la resolución que lo fija; confirma siempre el vencimiento en tu expediente o con un abogado antes de actuar.</p></div></aside>
<p>Para el resto del calendario del año —feriados nacionales, irrenunciables y fines de semana largos— revisa la <a href="/guias/feriados-chile-2027">guía de feriados de Chile 2027</a>.</p>`,
    sources: [
      {
        label: 'Ley Chile — Ley 20.774 (suprime feriado judicial)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1064893',
      },
      {
        label: 'Ley Chile — Código Orgánico de Tribunales (arts. 313 y 315)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=25563',
      },
      {
        label: 'Ley Chile — Código de Procedimiento Civil (arts. 64 y 66)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=22740',
      },
      {
        label: 'Ley Chile — Código Procesal Penal (art. 14)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=176595',
      },
      {
        label: 'Ley Chile — Código del Trabajo (art. 435)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=207436',
      },
      {
        label: 'BCN — Ficha: Fin del feriado judicial',
        url: 'https://obtienearchivo.bcn.cl/obtienearchivo?id=recursoslegales%2F10221.3%2F44980%2F2%2FFicha_feriado_judicial.pdf',
      },
      {
        label: 'Corte Suprema — Compendio de autos acordados',
        url: 'https://autoacordados.pjud.cl/',
      },
    ],
  },
  {
    slug: 'revision-tecnica-chile-2027-calendario-patente',
    embedCalculatorId: 'permiso-circulacion',
    title: 'Calendario de revisión técnica 2027 por dígito de patente',
    description:
      'En qué mes te toca la revisión técnica en 2027 según el último dígito de tu patente, en qué mes puedes adelantarla, si hay prórrogas y qué revisar si tu certificado dice otra fecha.',
    date: '2026-11-26',
    updatedAt: '2026-11-26',
    category: 'vehiculos',
    readingTime: 13,
    relatedGuia: 'vehiculos-chile-permiso-multas',
    seoTitle: 'Revisión técnica 2027: calendario por dígito de patente',
    seoDescription:
      'Busca el último dígito de tu patente y mira el mes que te toca la revisión técnica en 2027. Calendario completo, mes de adelanto, prórrogas y consulta oficial gratis.',
    keywords: [
      'revisión técnica 2027',
      'calendario revisión técnica 2027',
      'revisión técnica por dígito 2027',
      'cuándo me toca la revisión técnica 2027',
      'revisión técnica patente 2027',
      'PRT Chile',
      'revisión técnica y permiso de circulación',
    ],
    relatedCalculators: ['calculadora-permiso-circulacion', 'calculadora-multas-transito'],
    faq: [
      {
        question: '¿En qué mes me toca la revisión técnica en 2027 según mi patente?',
        answer:
          'Depende del último dígito: 9 en enero, 0 en febrero, 1 en abril, 2 en mayo, 3 en junio, 4 en julio, 5 en agosto, 6 en septiembre, 7 en octubre y 8 en noviembre. Marzo y diciembre no tienen dígito asignado. Es la regla del artículo 7 del Decreto Supremo 156 para vehículos de revisión anual.',
      },
      {
        question: '¿Puedo hacer la revisión técnica 2027 antes del mes que me toca?',
        answer:
          'Sí, en el mes inmediatamente anterior, sin que cambie su vigencia (artículo 7 del Decreto Supremo 156). Por ejemplo, las patentes terminadas en 9 pueden hacer en diciembre de 2026 la revisión que les corresponde en enero de 2027.',
      },
      {
        question: '¿Hay prórroga de la revisión técnica en 2027?',
        answer:
          'Al 26 de noviembre de 2026, el MTT no ha publicado ninguna prórroga para 2027. Solo vale una prórroga respaldada por un decreto o una resolución del Ministerio de Transportes; las que circulan por redes sociales sin decreto no existen.',
      },
      {
        question: '¿Qué pasa si se me pasó el mes de mi revisión?',
        answer:
          'La revisión vence según la fecha de tu certificado. Si está vencida, debes hacerla antes de volver a circular: conducir sin revisión técnica vigente es una infracción grave y sin ella no puedes renovar el permiso de circulación.',
      },
      {
        question: '¿Cuándo hace su primera revisión técnica un auto nuevo en 2027?',
        answer:
          'Los vehículos nuevos livianos y medianos con CHI-e la hacen entre 36 y 48 meses desde la emisión del certificado, según el último dígito de la patente. Así lo fijó el Decreto 104 del MTT (Diario Oficial del 18-06-2026), que modificó el Decreto Supremo 160. Revisa la vigencia que figura en tu certificado.',
      },
      {
        question: '¿Dónde consulto gratis el estado de mi revisión técnica?',
        answer:
          'En el servicio oficial de ChileAtiende "Consultar el estado de la revisión técnica de un vehículo motorizado" o en prt.cl, ingresando la patente. Es gratis y muestra la vigencia real de tu certificado.',
      },
      {
        question: '¿Cuánto tiempo tengo para volver a la planta si me rechazaron?',
        answer:
          '15 días corridos para volver con las fallas corregidas y pagar una tarifa rebajada, según ChileAtiende. Ese plazo no te permite circular con la revisión vencida.',
      },
    ],
    content: `<p class="article-lead">En 2027 la revisión técnica anual se hace en el mes que corresponde al <strong>último dígito de la patente</strong>: 9 en enero, 0 en febrero, 1 en abril, 2 en mayo, 3 en junio, 4 en julio, 5 en agosto, 6 en septiembre, 7 en octubre y 8 en noviembre. Marzo y diciembre no tienen dígito asignado, y puedes hacer la revisión también en el mes anterior al que corresponde sin que cambie su vigencia (<a href="https://www.bcn.cl/leychile/navegar?idNorma=10183" target="_blank" rel="noopener">Decreto Supremo 156, art. 7</a>). <strong>Al 26 de noviembre de 2026 no hay prórrogas anunciadas para 2027</strong>.</p>
<p>Este es el calendario completo de 2027, con el mes de adelanto que permite la misma norma, las periodicidades que no son anuales, los documentos que pide la planta y dónde consultar gratis el estado real de tu certificado. Si tu patente termina en 8, su mes de 2026 era noviembre; las terminadas en 9 pueden hacer en diciembre de 2026 la revisión que les corresponde en enero, porque la norma permite adelantarla un mes.</p>

<h2>Calendario de revisión técnica 2027 por dígito de patente</h2>
<table>
<thead>
<tr>
<th>Último dígito de la patente</th>
<th>Mes que corresponde en 2027</th>
<th>También puedes ir en</th>
</tr>
</thead>
<tbody>
<tr><td>9</td><td>Enero</td><td>Diciembre de 2026</td></tr>
<tr><td>0</td><td>Febrero</td><td>Enero</td></tr>
<tr><td>—</td><td>Marzo</td><td>—</td></tr>
<tr><td>1</td><td>Abril</td><td>Marzo</td></tr>
<tr><td>2</td><td>Mayo</td><td>Abril</td></tr>
<tr><td>3</td><td>Junio</td><td>Mayo</td></tr>
<tr><td>4</td><td>Julio</td><td>Junio</td></tr>
<tr><td>5</td><td>Agosto</td><td>Julio</td></tr>
<tr><td>6</td><td>Septiembre</td><td>Agosto</td></tr>
<tr><td>7</td><td>Octubre</td><td>Septiembre</td></tr>
<tr><td>8</td><td>Noviembre</td><td>Octubre</td></tr>
<tr><td>—</td><td>Diciembre</td><td>—</td></tr>
</tbody>
</table>
<p>Fuente: <a href="https://www.bcn.cl/leychile/navegar?idNorma=10183" target="_blank" rel="noopener">Decreto Supremo 156 del Ministerio de Transportes, art. 7</a>, y <a href="https://www.chileatiende.gob.cl/fichas/23978-revision-tecnica-de-vehiculos-motorizados" target="_blank" rel="noopener">ChileAtiende</a>, que presenta marzo y diciembre como meses “sin preferencia”. Este calendario rige para los vehículos de <strong>revisión anual</strong>, como el auto particular. Taxis, buses, camiones de carga, transporte escolar y vehículos a gas tienen otra periodicidad (<a href="#no-todos-anual">ver más abajo</a>).</p>
<p>El calendario no se fija de nuevo cada año: es una regla permanente del artículo 7 del Decreto Supremo 156, y en 2027 se repite el mismo orden mientras el MTT no lo modifique (el propio artículo le permite hacerlo “cuando las circunstancias así lo hagan aconsejable”).</p>

<h2>El dato que manda: la vigencia de tu certificado</h2>
<p>La tabla dice en qué mes <em>corresponde</em> hacer la revisión, pero el documento que habilita a circular es el <strong>certificado de revisión técnica con su fecha de vigencia</strong>. Tres consecuencias prácticas:</p>
<ul>
<li><strong>Si tu mes ya pasó y el certificado venció</strong>, no circules hasta revisarlo. Conducir sin revisión técnica vigente es una <strong>infracción grave</strong> según <a href="https://www.chileatiende.gob.cl/fichas/23978-revision-tecnica-de-vehiculos-motorizados" target="_blank" rel="noopener">ChileAtiende</a>; estima la sanción en pesos en la <a href="/calculadoras/calculadora-multas-transito">calculadora de multas de tránsito</a>.</li>
<li><strong>Si adelantaste la revisión</strong> al mes anterior, la nueva vigencia se cuenta según el certificado emitido, no según la tabla.</li>
<li><strong>Si hay una prórroga</strong> publicada como decreto del MTT, la vigencia se extiende según lo que diga ese decreto, no lo que indique el mes calendario.</li>
</ul>
<p>Revisa tu estado gratis por patente en el <a href="https://www.chileatiende.gob.cl/fichas/86124-consultar-el-estado-de-la-revision-tecnica-de-un-vehiculo-motorizado" target="_blank" rel="noopener">servicio oficial de ChileAtiende</a> o en <a href="https://www.prt.cl/Paginas/RevisionTecnica.aspx" target="_blank" rel="noopener">prt.cl</a>.</p>

<h2>Prórrogas de la revisión técnica en 2027</h2>
<p>Al 26 de noviembre de 2026, el Ministerio de Transportes <strong>no ha publicado ninguna prórroga para 2027</strong>. Las prórrogas existen —en 2026 el Decreto 129 del MTT extendió hasta el 30 de septiembre los certificados de los dígitos 4 y 5 en la Región de Coquimbo y la provincia del Huasco por la catástrofe de las lluvias—, pero son excepcionales y siempre se publican como decreto o resolución. Si el MTT anuncia una para 2027, la agregaremos aquí con su decreto. Desconfía de prórrogas que circulan en redes sociales sin respaldo normativo.</p>

<h2 id="no-todos-anual">No todos los vehículos revisan una vez al año</h2>
<p>Según el artículo 7 del Decreto Supremo 156 y <a href="https://www.chileatiende.gob.cl/fichas/23978-revision-tecnica-de-vehiculos-motorizados" target="_blank" rel="noopener">ChileAtiende</a>, en 2027 la periodicidad es:</p>
<ul>
<li><strong>Cada seis meses:</strong> vehículos de transporte de personas con más de nueve asientos contando el del conductor; vehículos de carga con capacidad para más de 1.750 kg, sus remolques y semirremolques; taxis; vehículos escuela; transporte escolar; vehículos que usan GLP o GNC; y dos casos de la Región Metropolitana definidos por fecha de inscripción y titularidad.</li>
<li><strong>Cada cuatro meses:</strong> transporte escolar de peso bruto total inferior a 3.860 kg con más de 15 años de antigüedad, y buses de transporte público urbano de 20 años o más.</li>
<li><strong>Cada cuatro años:</strong> maquinaria automotriz como tractores, cosechadoras, bulldozers y retroexcavadoras.</li>
<li><strong>Cada año:</strong> el resto, donde normalmente cae el auto particular, según la tabla de arriba.</li>
</ul>
<p>Los taxis nuevos y el transporte escolar nuevo deben hacer su primera revisión a los doce meses de la emisión de su Certificado de Homologación Individual electrónico (CHI-e).</p>

<h2>Autos nuevos en 2027: primera revisión a los 36–48 meses</h2>
<p>Un vehículo nuevo homologado puede circular con su <strong>CHI-e vigente</strong> en lugar de la revisión técnica durante el período que indica ese certificado. El <strong>Decreto 104 del MTT, publicado en el Diario Oficial el 18 de junio de 2026, modificó el Decreto Supremo 160</strong> y amplió el plazo de la primera revisión de los vehículos nuevos livianos y medianos de 24–36 meses a <strong>36–48 meses</strong> desde el mes de emisión del CHI-e, según el último dígito de la patente (<a href="https://www.bcn.cl/leychile/navegar?idNorma=1225262" target="_blank" rel="noopener">Ley Chile</a>; <a href="https://mtt.gob.cl/vehiculos-livianos-medianos-y-motocicletas-mtt-extiende-el-periodo-para-realizar-la-primera-revision-tecnica-de-36-a-48-meses/" target="_blank" rel="noopener">MTT</a>). En la práctica, un auto comprado en 2023 o 2024 puede tener su primera revisión dentro de 2027 según el mes y dígito que indique su certificado; revisa la vigencia que figura en él.</p>

<h2>Documentos que pide la planta</h2>
<p>Según <a href="https://www.chileatiende.gob.cl/fichas/23978-revision-tecnica-de-vehiculos-motorizados" target="_blank" rel="noopener">ChileAtiende</a>:</p>
<ul>
<li><strong>Permiso de circulación:</strong> salvo vehículos nuevos, y solo si hace falta un dato que no está en los otros documentos.</li>
<li><strong>Certificado de revisión técnica anterior:</strong> si lo perdiste, sirve una declaración jurada simple.</li>
<li><strong>Certificado de anotaciones vigentes:</strong> si no presentas el certificado de emisiones contaminantes.</li>
<li><strong>Certificado de cumplimiento de normas de emisión.</strong></li>
<li><strong>Certificado anterior de emisiones contaminantes:</strong> no se exige a vehículos nuevos ni en la primera revisión.</li>
</ul>
<p>El precio lo fija cada planta según el tipo de vehículo; ChileAtiende enlaza el listado oficial de plantas y tarifas.</p>

<h2>Si te rechazan</h2>
<p>La planta entrega un certificado de rechazo con las fallas detectadas. Tienes <strong>15 días corridos</strong> para volver a la planta, acreditar que corregiste los desperfectos y acceder a una <strong>tarifa rebajada</strong> (<a href="https://www.chileatiende.gob.cl/fichas/23978-revision-tecnica-de-vehiculos-motorizados" target="_blank" rel="noopener">ChileAtiende</a>). Ese plazo no te autoriza a circular con la revisión vencida.</p>

<h2>Errores frecuentes al calcular tu fecha en 2027</h2>
<ul>
<li><strong>Confundir el dígito con el mes.</strong> La patente que termina en 9 va en enero, no en septiembre: el dígito no es el mes.</li>
<li><strong>Creer que marzo y diciembre son meses de revisión.</strong> No tienen dígito asignado: marzo atiende adelantos del dígito 1 y diciembre los del 9, pero eso no impide una revisión atrasada u otra periodicidad en esas fechas.</li>
<li><strong>Guiarse solo por la tabla.</strong> Lo que manda es la fecha de vigencia del certificado; una prórroga la extiende.</li>
<li><strong>Asumir que todo vehículo revisa una vez al año.</strong> Taxis, buses, transporte escolar, vehículos a gas y maquinaria tienen otra periodicidad.</li>
<li><strong>Confiar en una prórroga de redes sociales.</strong> Solo vale la que está publicada como decreto o resolución del MTT.</li>
</ul>

<h2>Revisión técnica y permiso de circulación 2027</h2>
<p>La municipalidad no puede otorgar el permiso de circulación a un vehículo sin revisión técnica vigente o, cuando corresponde, sin certificado de homologación vigente (<a href="https://www.bcn.cl/leychile/navegar?idNorma=1007469" target="_blank" rel="noopener">Ley de Tránsito, art. 89</a>). La revisión, el SOAP y el permiso tienen fechas propias: renovar uno no renueva los otros. El permiso se renueva en marzo (hasta el 31) para los vehículos particulares y en abril para los de carga y transporte, así que para gran parte de las patentes la revisión ya debe estar al día antes de ese trámite. Estima su valor en la <a href="/calculadoras/calculadora-permiso-circulacion">calculadora de permiso de circulación</a>.</p>

<h2>Fuentes y fecha de verificación</h2>
<p>Contenido verificado al 26 de noviembre de 2026:</p>
<ul>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=10183" target="_blank" rel="noopener">Decreto Supremo 156 del MTT (revisiones técnicas), versión vigente en Ley Chile</a>: calendario por dígito, mes precedente, periodicidades y facultad del MTT para modificar el calendario (<a href="https://www.bcn.cl/leychile/navegar?idNorma=10183&idParte=7139535" target="_blank" rel="noopener">artículo 7</a>). Última modificación publicada: Decreto 129 del 28-07-2026.</li>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1225262" target="_blank" rel="noopener">Decreto 104 del MTT, que modifica el DS 160, Diario Oficial del 18-06-2026</a> y <a href="https://mtt.gob.cl/vehiculos-livianos-medianos-y-motocicletas-mtt-extiende-el-periodo-para-realizar-la-primera-revision-tecnica-de-36-a-48-meses/" target="_blank" rel="noopener">noticia del MTT</a>: primera revisión a los 36–48 meses.</li>
<li><a href="https://www.chileatiende.gob.cl/fichas/23978-revision-tecnica-de-vehiculos-motorizados" target="_blank" rel="noopener">ChileAtiende: Revisión técnica de vehículos motorizados</a> y <a href="https://www.chileatiende.gob.cl/fichas/86124-consultar-el-estado-de-la-revision-tecnica-de-un-vehiculo-motorizado" target="_blank" rel="noopener">Consulta del estado de la revisión</a>.</li>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1007469" target="_blank" rel="noopener">Ley de Tránsito, art. 89</a>.</li>
<li><a href="https://www.chileatiende.gob.cl/fichas/9611-permiso-de-circulacion" target="_blank" rel="noopener">ChileAtiende: Permiso de circulación</a>.</li>
<li><a href="https://www.prt.cl/Paginas/RevisionTecnica.aspx" target="_blank" rel="noopener">PRT: consulta oficial de revisión técnica</a>.</li>
</ul>

<aside class="callout callout--info">
<span class="callout__icon" aria-hidden="true">ℹ️</span>
<div class="callout__body">
<strong>Alcance</strong>
<p>Información general, no un dictamen del MTT ni un diagnóstico mecánico. Si tu certificado o una resolución excepcional dice algo distinto, prevalece el documento oficial de tu vehículo.</p>
</div>
</aside>`,
    sources: [
      {
        label: 'Ley Chile — Decreto Supremo 156 del MTT (revisiones técnicas)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=10183',
      },
      {
        label: 'Ley Chile — Decreto 104 del MTT (primera revisión 36–48 meses)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1225262',
      },
      {
        label: 'ChileAtiende — Revisión técnica de vehículos motorizados',
        url: 'https://www.chileatiende.gob.cl/fichas/23978-revision-tecnica-de-vehiculos-motorizados',
      },
      {
        label: 'ChileAtiende — Consultar el estado de la revisión técnica',
        url: 'https://www.chileatiende.gob.cl/fichas/86124-consultar-el-estado-de-la-revision-tecnica-de-un-vehiculo-motorizado',
      },
      {
        label: 'ChileAtiende — Permiso de circulación',
        url: 'https://www.chileatiende.gob.cl/fichas/9611-permiso-de-circulacion',
      },
      {
        label: 'Ley Chile — Ley de Tránsito, art. 89',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1007469',
      },
      {
        label: 'PRT — Consulta oficial de revisión técnica',
        url: 'https://www.prt.cl/Paginas/RevisionTecnica.aspx',
      },
    ],
  },
  {
    slug: 'reforma-pensiones-2027-que-cambia',
    title:
      'Reforma de pensiones 2027: licitación de stock AFP, PGU para 65+ y lo que cambia en agosto',
    description:
      'Los tres hitos de la Ley 21.735 en 2027: primera licitación del 10% del stock de afiliados AFP, PGU al monto máximo para todas las personas de 65+ en septiembre y cotización del empleador de 4,25% en agosto.',
    date: '2026-11-26',
    updatedAt: '2026-11-26',
    category: 'previsional',
    readingTime: 10,
    relatedGuia: 'afp-pension-chile',
    seoTitle: 'Reforma de pensiones 2027: licitación de stock AFP y PGU para 65+',
    seoDescription:
      'Qué pasa con la reforma previsional en 2027: licitación del 10% del stock de afiliados AFP (llamado hasta agosto), PGU al monto máximo para 65+ desde septiembre y solicitud anticipada en junio.',
    keywords: [
      'reforma de pensiones 2027',
      'licitación stock afiliados AFP 2027',
      'PGU 65 años septiembre 2027',
      'licitación AFP 10% afiliados',
      'ley 21.735 hitos 2027',
      'PGU solicitud anticipada junio 2027',
    ],
    relatedCalculators: [
      'calculadora-comparador-afp',
      'calculadora-simulador-pension-afp',
      'calculadora-pgu',
    ],
    faq: [
      {
        question: '¿La licitación de stock me obliga a cambiarme de AFP?',
        answer:
          'No necesariamente. La Superintendencia seleccionará de forma aleatoria un 10% de los afiliados no pensionados y solo ese grupo verá traspasada la administración de su cuenta a la AFP adjudicataria, que se define por la comisión más baja ofertada. Si no quedas seleccionado, tu AFP sigue igual.',
      },
      {
        question:
          '¿Cuándo recibirán todas las personas de 65 años o más el monto máximo de la PGU?',
        answer:
          'Desde septiembre de 2027, según el calendario de ChileAtiende: el monto máximo ($250.275 más el reajuste por IPC) se extiende a quienes tengan 65 años o más y derecho a PGU. Hasta entonces el monto máximo aplica a los 75 años o más, y quienes tienen entre 65 y 81 acceden a un tope menor.',
      },
      {
        question: '¿Quiénes pueden hacer la solicitud anticipada de la PGU en junio de 2027?',
        answer:
          'Las personas beneficiarias de leyes de reparación, pensiones de gracia y exoneradas de DIPRECA y CAPREDENA que en septiembre de 2027 tengan 65 años o más y cumplan los requisitos. Quienes hagan la solicitud anticipada podrían comenzar a recibir el beneficio desde septiembre.',
      },
      {
        question: '¿La cotización del empleador de 4,25% se descuenta del sueldo?',
        answer:
          'No. El alza de 3,5% a 4,25% de la remuneración imponible desde agosto de 2027 es de cargo del empleador según el artículo cuarto transitorio de la Ley 21.735. No aparece como descuento en la liquidación del trabajador ni reduce el sueldo líquido.',
      },
    ],
    sources: [
      {
        label: 'BCN LeyChile — Ley 21.735 (reforma de pensiones, artículo cuarto transitorio)',
        url: LEY_21735,
      },
      {
        label:
          'Superintendencia de Pensiones — Consejo Asesor para la licitación de stock (calendario)',
        url: 'https://www.spensiones.gob.cl/portal/institucional/594/w3-article-17005.html',
      },
      {
        label: 'ChileAtiende — Reforma de Pensiones: hitos y fechas importantes',
        url: 'https://www.chileatiende.gob.cl/reformadepensiones/fechas-clave',
      },
      {
        label: 'ChileAtiende — Aumento de la Pensión Garantizada Universal (PGU)',
        url: 'https://www.chileatiende.gob.cl/fichas/130457-aumento-de-la-pension-garantizada-universal-pgu',
      },
      {
        label: 'Gob.cl — Reforma de Pensiones: calendario completo',
        url: 'https://www.gob.cl/noticias/que-viene-ahora-reforma-pensiones-conoce-calendario-informate-cuando-aumentan-jubilaciones/',
      },
    ],
    content: `<p class="article-lead">El año 2027 concentra tres hitos de la reforma previsional de la ${ext(LEY_21735, 'Ley 21.735')}: la primera licitación del stock de afiliados de las AFP, la extensión del monto máximo de la Pensión Garantizada Universal a todas las personas de 65 años o más en septiembre, y el alza de la cotización de cargo del empleador a 4,25% en agosto. Las fechas ya están escritas en la ley y en los calendarios oficiales; esto es lo que cambia, para quién y cuándo.</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Fecha de corte: 26 de noviembre de 2026</strong><p>Revisado contra la Ley 21.735, el calendario de licitación informado por la Superintendencia de Pensiones y las fechas clave de ChileAtiende. Las licitaciones y los procesos de solicitud pueden recibir regulación adicional durante 2027; actualizaremos esta página cuando se publique.</p></div></aside>

<h2 id="licitacion-stock">Agosto: primera licitación del 10% del stock de afiliados</h2>

<p>La reforma introduce un mecanismo nuevo: someter a licitación la administración de las cuentas de un grupo de afiliados ya existentes. El objetivo declarado es aumentar la competencia entre las administradoras y bajar las comisiones. Según el calendario informado por la ${ext('https://www.spensiones.gob.cl/portal/institucional/594/w3-article-17005.html', 'Superintendencia de Pensiones')}, el <strong>plazo máximo para realizar el primer llamado a licitación es agosto de 2027</strong>, la adjudicación de la cartera debería efectuarse en <strong>diciembre de 2027</strong> y el traspaso de los afiliados seleccionados se concretaría en <strong>junio de 2028</strong>.</p>

<p>Cómo funciona el mecanismo, según lo informado por la Superintendencia:</p>

<ul>
<li><strong>Universo:</strong> el 10% de las personas afiliadas no pensionadas, seleccionadas de forma aleatoria. No es un sorteo voluntario ni un cambio que se solicita: la Superintendencia elige el grupo.</li>
<li><strong>Qué se licita:</strong> la administración de las cuentas de ese grupo. La AFP que oferte la comisión más baja se adjudica la cartera por el período que fijen las bases.</li>
<li><strong>Qué falta por regular:</strong> antes de las fechas, la Superintendencia debe definir las condiciones de participación, el detalle de la selección aleatoria y cómo se informará a las personas seleccionadas. Para eso creó un Consejo Asesor, que sesionó por primera vez en abril de 2026.</li>
</ul>

<p>Si quedas seleccionado, tu cuenta pasará a administrarse por la adjudicataria cuando se concrete el traspaso: no eliges AFP en ese proceso, pero conservas la libertad general de cambiarte de AFP por las reglas habituales (permanencia mínima, solicitud de pensión en curso o las excepciones que la ley permite). El detalle práctico de cambiarse está en la guía de <a href="/guias/afp-pension-chile">AFP y pensión</a>.</p>

<h3>No confundir con la licitación de nuevos afiliados</h3>

<p>Son dos mecanismos distintos. La licitación de <strong>nuevos afiliados</strong> ya está en marcha: quienes ingresan por primera vez al sistema entre el 1 de octubre de 2025 y el 30 de septiembre de 2027 se afilian obligatoriamente a la adjudicataria vigente (AFP Uno, con 0,46% de comisión), con permanencia general de 24 meses. La licitación de <strong>stock</strong>, en cambio, toma un 10% de las personas que ya están afiliadas y no están pensionadas. Una no reemplaza a la otra: la de stock es adicional y periódica.</p>

<p>Para comparar lo que pagas hoy por administración, el <a href="/calculadoras/calculadora-comparador-afp">comparador de comisiones AFP</a> muestra las comisiones vigentes de las administradoras y cuánto varía el saldo acumulado entre una cara y una barata, y la guía de <a href="/guias/afp-mas-barata-comisiones-chile">comisiones de las AFP</a> desarrolla el criterio de comparación.</p>

<h2 id="pgu-65-mas">Septiembre: la PGU llega al monto máximo para todos los 65+</h2>

<p>La Pensión Garantizada Universal se ha ido ampliando por tramos de edad. Hoy el monto máximo ($250.275, reajustado por IPC) aplica a las personas de 75 años o más desde septiembre de 2026, y quienes tienen entre 65 y 81 años acceden a un tope menor ($231.732 según la ficha de ChileAtiende). En <strong>septiembre de 2027</strong> el esquema se cierra: el monto máximo pasa a cubrir a <strong>todas las personas de 65 años o más</strong> que tengan derecho a la PGU, según el <a href="https://www.chileatiende.gob.cl/reformadepensiones/fechas-clave" target="_blank" rel="noopener">calendario de hitos de ChileAtiende</a>.</p>

<p>Para quienes ya reciben PGU, los aumentos por tramo de edad se han aplicado de forma automática. Si cumples 65 años en 2027, el patrón aplicado hasta ahora es que el acceso o el aumento corre desde el mes del cumpleaños, pero confirma tu caso con la consulta por RUN y fecha de nacimiento que habilita ChileAtiende, o en la <a href="/calculadoras/calculadora-pgu">calculadora de PGU</a>, que estima el monto según edad y pensión base.</p>

<h3>Junio y septiembre: nuevos grupos entran a la PGU</h3>

<p>El mismo calendario abre el beneficio a grupos que antes quedaban fuera del sistema de protección social de la vejez:</p>

<ul>
<li><strong>Junio de 2027 — solicitud anticipada:</strong> las personas beneficiarias de leyes de reparación, pensiones de gracia y exoneradas de DIPRECA y CAPREDENA que en septiembre de 2027 tengan 65 años o más podrán solicitar anticipadamente la PGU, si cumplen los requisitos. Quienes hagan la solicitud anticipada podrían comenzar a recibir el beneficio desde septiembre.</li>
<li><strong>Septiembre de 2027 — montepiadas de DIPRECA y CAPREDENA:</strong> podrán solicitar un monto proporcional para alcanzar el valor que tenga la PGU en esa fecha.</li>
<li><strong>Septiembre de 2027 — beneficiarios de APSV:</strong> el IPS notificará a quienes reciben el Aporte Previsional Solidario de Vejez si les conviene renunciar a ese beneficio y solicitar la PGU.</li>
</ul>

<p>"Tener derecho" no es automático para estos grupos: la solicitud revisa requisitos como la residencia y las reglas de focalización. El monto máximo es un tope, no el valor que cada persona recibirá; el detalle del acceso por etapas está en la <a href="https://www.chileatiende.gob.cl/fichas/130457-aumento-de-la-pension-garantizada-universal-pgu" target="_blank" rel="noopener">ficha oficial del aumento de la PGU</a>.</p>

<h2 id="cotizacion-empleador">Agosto: la cotización del empleador sube a 4,25%</h2>

<p>El tercer hito también es de agosto: la cotización previsional de cargo del empleador pasa de 3,5% a <strong>4,25%</strong> de la remuneración imponible en las remuneraciones devengadas desde ese mes (letra c) del artículo cuarto transitorio). El desglose queda en 0,25% a capitalización individual, 1,5% a la Cotización con Rentabilidad Protegida registrada a favor del trabajador y 2,5% al seguro social y compensación por expectativa de vida. Es un costo del empleador: <strong>no se descuenta del sueldo líquido</strong> y tu liquidación no cambia por esta ley. El detalle de lo que mueve y lo que no en la remuneración está en el artículo sobre <a href="/blog/que-cambia-sueldo-2027-reajuste-cotizacion-empleador">lo que cambia en el sueldo en 2027</a>.</p>

<h2 id="calendario">Calendario de la reforma en 2027</h2>

<div class="table-scroll"><table>
<caption>Hitos de la Ley 21.735 en 2027 y lo que sigue</caption>
<thead><tr><th scope="col">Fecha</th><th scope="col">Hito</th><th scope="col">Estado al 26-11-2026</th></tr></thead>
<tbody>
<tr><td>Junio de 2027</td><td>Solicitud anticipada de PGU para nuevos grupos (reparación, gracia, exonerados DIPRECA/CAPREDENA) que cumplen 65 años en septiembre</td><td>Fijado por calendario oficial</td></tr>
<tr><td>A más tardar agosto de 2027</td><td>Primer llamado a licitación del 10% del stock de afiliados no pensionados</td><td>Plazo fijado por ley; regulación pendiente</td></tr>
<tr><td>Agosto de 2027</td><td>Cotización de cargo del empleador sube de 3,5% a 4,25% de la remuneración imponible</td><td>Fijado por ley</td></tr>
<tr><td>Septiembre de 2027</td><td>PGU al monto máximo ($250.275 + IPC) para todas las personas de 65+; inicio de solicitudes para nuevos grupos y montepiadas DIPRECA/CAPREDENA; notificación IPS a beneficiarios de APSV</td><td>Fijado por calendario oficial</td></tr>
<tr><td>Diciembre de 2027</td><td>Adjudicación de la cartera licitada del stock de afiliados</td><td>Fecha estimada por la Superintendencia</td></tr>
<tr><td>Junio de 2028</td><td>Traspaso efectivo de los afiliados seleccionados a la AFP adjudicataria</td><td>Fecha estimada por la Superintendencia</td></tr>
</tbody>
</table></div>

<h2 id="que-conviene-hacer">Qué conviene revisar según tu caso</h2>

<p><strong>Si estás afiliado y trabajando:</strong> no tienes trámite por la licitación de stock. Si te toca el 10% aleatorio, la Superintendencia lo informará por los canales que regule. Lo que sí conviene hoy es conocer cuánto pagas de comisión: el <a href="/calculadoras/calculadora-comparador-afp">comparador AFP</a> permite ver si tu administradora es de las caras o las baratas, porque ese es exactamente el criterio que usará la licitación.</p>

<p><strong>Si tienes 64 años o vas a cumplir 65:</strong> revisa desde junio de 2027 si entras en la solicitud anticipada (solo si perteneces a los nuevos grupos) y verifica en septiembre tu acceso al monto máximo. El <a href="/calculadoras/calculadora-simulador-pension-afp">simulador de pensión AFP</a> proyecta tu pensión con los componentes de la reforma —PGU, Beneficio por Años Cotizados y CEV para mujeres— para que veas cómo se compone el total.</p>

<p><strong>Si recibes una pensión de gracia, de reparación o montepío de DIPRECA/CAPREDENA:</strong> tu entrada al sistema no es automática, requiere solicitud. Marca junio de 2027 para la anticipada y septiembre para el inicio general, y prepara la documentación que acredite tu calidad de beneficiario.</p>

<p><strong>Si eres empleador:</strong> presupuesta el costo previsional con 4,25% desde agosto de 2027, no 3,5%. El 1,75% que va a favor del trabajador (capitalización + CRP) tampoco es deducible de su líquido: sale del costo laboral completo.</p>

<p>En resumen: 2027 es el año en que la reforma deja de ser solo aporte y también se vuelve competencia (licitación de stock) y cobertura (PGU universal para 65+). Las fechas están en la ley; lo que falta por definirse son las bases de la licitación y la regulación del traspaso, que la Superintendencia irá publicando durante el año.</p>

<p>Este artículo es orientación general: no sustituye la información de tu AFP, del IPS ni una asesoría previsional. Las simulaciones de las calculadoras son referenciales y usan los valores vigentes informados en cada una.</p>`,
  },
];
