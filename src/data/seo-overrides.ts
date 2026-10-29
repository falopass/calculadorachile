/**
 * ============================================================================
 * SEO OVERRIDES — CTR + posición (CalculaChile)
 * Optimización de seoTitle + seoDescription para mobile chileno
 * Actualizado: 2026-07-08 · GSC últimas 24 h (imp altas / CTR bajo / pos media)
 * Actualizado: 2026-10-08 · GSC 3 meses (baseline): cobertura de las 13 nuevas + demandas cero-clics
 * ============================================================================
 *
 * PRIORIDAD DE KEYS: slug de URL sin path
 *   - calculadoras: calculadora-iva, calculadora-credito-cae, …
 *   - blog: slug del artículo
 *   - guías: slug de la guía
 *
 * CONTEXTO MOBILE CHILE:
 * - Title truncado ~55-58 caracteres: dato clave en los primeros ~40.
 * - Preferir ":" o "|" antes que "—".
 * - Description ~120-130 visibles: gancho al inicio.
 * - Responde a: cifras en $, año "2026", "cuánto", "gratis", SII/DT/SP.
 *
 * REGLAS YMYL:
 * - CAE ≠ pago contingente al ingreso (eso es FES / proyecto).
 * - Tope imponible 90 UF (no 89,9) desde feb-2026.
 * - Patente: capital propio tributario; pago anual (opción 2 cuotas).
 * - IVA = 19% (DL 825).
 *
 * 1 UTM referencial snapshot jul-2026 ≈ $71.649 (no hardcodear en UI live).
 * ============================================================================
 */

import { formatCLP } from '@/lib/formatters';
import { topeGratificacion } from '@/lib/values/gratificacion-tope';

const TOPE_GRAT = topeGratificacion();

export const seoOverrides: Record<string, { seoTitle: string; seoDescription: string }> = {
  // ══════════════════════════════════════════════════════════════════════════
  // CALCULADORAS — GSC 24 h: alta impresión / bajo CTR o pos media
  // ══════════════════════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════════════════════
  // CALCULADORAS — 39 ACTIVAS (100% COBERTURA CTR MOBILE CHILE)
  // ══════════════════════════════════════════════════════════════════════════

  // --- SUELDO Y REMUNERACIONES ---
  'calculadora-sueldo-liquido': {
    seoTitle: 'Calculadora Sueldo Líquido 2026: de bruto a líquido', // 50
    seoDescription:
      '¿Cuánto te descuentan? Calcula tu sueldo líquido con AFP, 7% de salud, seguro de cesantía e impuesto único, con valores oficiales 2026.', // 135
  },

  'calculadora-impuesto-segunda-categoria': {
    seoTitle: 'Impuesto 2ª Categoría 2026: calcula tu IUSC en pesos', // 52
    seoDescription:
      'Calcula el impuesto único de segunda categoría 2026 sobre tu sueldo. Tramos oficiales del SII en UTM y pesos. Gratis y al día.', // 129
  },

  'calculadora-comparador-afp': {
    seoTitle: 'Comisiones AFP 2026: compara y elige la más barata', // 52
    seoDescription:
      'Compara las 7 AFP 2026: Uno desde 0,46% vs ProVida 1,45%. Ve cuánto descuentan al mes y cuánto ahorras al cambiar. Dato oficial SP.', // 135
  },

  // --- BENEFICIOS LABORALES Y TÉRMINO DE CONTRATO ---
  'calculadora-finiquito': {
    seoTitle: 'Calcular finiquito 2026: cálculo por causal en Chile', // 52
    seoDescription:
      'Calcular finiquito 2026: cálculo de finiquito por causal con indemnización, vacaciones proporcionales y aviso previo. Ejemplos en pesos y fuentes DT.', // 149
  },

  'calculadora-indemnizacion-anos-servicio': {
    seoTitle: 'Indemnización por Años 2026: tope legal 90 UF', // 48
    seoDescription:
      'Calcula tu indemnización por años de servicio en Chile: 30 días por año, tope 11 años y 90 UF imponible. Ideal finiquito. Gratis DT.', // 135
  },

  'calculadora-vacaciones-proporcionales': {
    seoTitle: 'Vacaciones proporcionales: tabla por meses y pesos', // 50
    seoDescription:
      'Calcula tus vacaciones proporcionales: 1,25 días hábiles por mes, pagados en días corridos. Tabla de 1 a 11 meses y ejemplo de 6 meses según la DT.', // 147
  },

  // título y meta generados: cambian solos cuando se actualice INGRESO_MINIMO
  'calculadora-gratificacion-legal': {
    seoTitle: `Tope de gratificación ${TOPE_GRAT.anio}: ${formatCLP(TOPE_GRAT.mensual)} al mes`, // 43
    seoDescription: `Tope de gratificación legal ${TOPE_GRAT.anio}: 4,75 ingresos mínimos al año, ${formatCLP(TOPE_GRAT.anual)} o ${formatCLP(TOPE_GRAT.mensual)} al mes. Calcula el 25% de tu sueldo${TOPE_GRAT.vigenteDesde === '2026-05-01' ? ' y revisa el cambio de 2027' : ''}.`, // 149 (con la frase del cambio)
  },

  'calculadora-horas-extra': {
    seoTitle: 'Horas Extra 2026: calcula con jornada 42 horas', // 48
    seoDescription:
      'Calcula tus horas extra en Chile 2026 con jornada de 42 h (Ley 40 Horas), recargo del 50% y festivos. Factor oficial DT en pesos.', // 132
  },

  'calculadora-asignacion-familiar': {
    seoTitle: 'Tramos asignación familiar 2026: monto por carga', // 49
    seoDescription:
      'Calcula la asignación familiar 2026 por carga acreditada: tramos $22.601, $13.870 y $4.382 según ingreso imponible. SUSESO / DT.', // 130
  },

  'calculadora-aguinaldo': {
    seoTitle: 'Aguinaldo 2026: Fiestas Patrias y Navidad en Chile', // 50
    seoDescription:
      'Montos del aguinaldo 2026 para pensionados IPS ($25.280) y sector público ($91.682). Requisitos, fechas de pago y sector privado.', // 130
  },

  // --- TRIBUTARIO Y HONORARIOS ---
  'vacaciones-feriado-legal-chile': {
    seoTitle: 'Vacaciones progresivas y feriado legal en Chile 2026', // 52
    seoDescription:
      'Cuántos días de vacaciones te tocan: 15 días hábiles al año, más 1 día progresivo cada 3 años después de 10 trabajados. Acumulación y ejemplos.', // 148
  },

  'calculadora-iva': {
    seoTitle: 'Calculadora IVA Chile: agrega o quita el 19%', // 44
    seoDescription:
      'Calcula el IVA en Chile (19%, tasa del SII): pasa de neto a bruto o saca el IVA de un total. Ej.: $100.000 neto = $119.000 con IVA. Gratis.', // 141
  },

  'calculadora-boleta-honorarios': {
    seoTitle: 'Calcular boleta de honorarios 2026: retención 15,25%', // 52
    seoDescription:
      'Calcula tu boleta de honorarios 2026: de bruto a líquido y de líquido a bruto con la retención de 15,25% del SII (Ley 21.133). Ejemplos en pesos.', // 148
  },

  'calculadora-operacion-renta': {
    seoTitle: 'Operación Renta 2026: simula devolución e impuesto', // 50
    seoDescription:
      'Simula tu Operación Renta 2026: Global Complementario, rebaja por intereses hipotecarios y devolución o pago al SII. Guía gratis.', // 131
  },

  'calculadora-ppm': {
    seoTitle: 'Cálculo de PPM 2026: tasa Pro Pyme y General SII', // 48
    seoDescription:
      'Calcula tu Pago Provisional Mensual (PPM) 2026: tasa según régimen Pro Pyme Transparente (0,2%) o General. Ventas netas y F29 SII.', // 132
  },

  // --- EMPRESAS Y PYMES ---
  'calculadora-patente-comercial': {
    seoTitle: 'Patente comercial 2026: cómo se calcula y cuánto pagar', // 54
    seoDescription:
      'Calcula tu patente comercial o municipal: 2,5 a 5 por mil del capital propio, mínimo 1 UTM y máximo 8.000 UTM al año. Cuotas de enero y julio.', // 142
  },

  'calculadora-costo-empleado-pyme': {
    seoTitle: 'Costo Empleado PYME 2026: cotización 3,5% y SIS', // 47
    seoDescription:
      'Calcula el costo total de contratar en Chile 2026: sueldo bruto, gratificación, SIS, mutual, cesantía y nueva cotización 3,5%. PYME.', // 134
  },

  'calculadora-propina-legal': {
    seoTitle: 'Propina Legal 10% Chile: calcula el total con boleta', // 52
    seoDescription:
      'Calcula la propina sugerida del 10% en restaurantes y bares de Chile según el Código del Trabajo. Monto voluntario y total a pagar.', // 132
  },

  // --- CONVERSIONES E INDICADORES ECONÓMICOS ---
  'calculadora-uf-clp': {
    seoTitle: 'UF a pesos hoy: conversor y tabla de montos', // 43, sin sufijo (title.absolute)
    seoDescription:
      'UF de hoy y tabla de UF a pesos: 1, 24, 100, 200, 1.000, 2.500, 3.000 y 6.000 UF con el valor oficial del día y dónde ver la UF de una fecha.', // 141
  },

  'calculadora-utm-clp': {
    seoTitle: 'UTM a Pesos Hoy 2026: valor oficial en CLP al mes', // 49
    seoDescription:
      'Convierte UTM a pesos chilenos y CLP a UTM con el valor oficial del mes. Ideal multas, contratos, aranceles y patentes. Gratis SII.', // 132
  },

  'calculadora-conversor-divisas': {
    seoTitle: 'Dólar y Euro a CLP Hoy: conversor Banco Central 2026', // 52
    seoDescription:
      'Convierte dólares y euros a pesos chilenos con el tipo de cambio oficial del Banco Central de Chile. Actualizado hoy, gratis.', // 126
  },

  // --- VIVIENDA Y BIENES RAÍCES ---
  'calculadora-credito-hipotecario': {
    seoTitle: 'Crédito Hipotecario 2026: simula dividendo en UF', // 50
    seoDescription:
      'Simula tu dividendo hipotecario en UF y pesos: monto, pie, tasa y plazo. Estima capacidad de pago y costo total. Gratis, no es banco.', // 136
  },

  'calculadora-subsidio-habitacional': {
    seoTitle: 'Subsidio Habitacional 2026: DS49, DS1 y DS19 MINVU', // 50
    seoDescription:
      'Estima subsidio de vivienda MINVU 2026 según tramo, ahorro en UF y valor de la propiedad. Requisitos DS49, DS1 y DS19 actualizados.', // 133
  },

  'calculadora-contribuciones': {
    seoTitle: 'Calculadora de contribuciones 2026: cuota de noviembre', // 54
    seoDescription:
      'Calcula tu cuota de contribuciones con el avalúo fiscal del SII. Fecha de la cuota de noviembre 2026, exención vigente y cómo pagar por rol o RUT en la TGR.', // 151
  },

  'calculadora-reajuste-arriendo': {
    seoTitle: 'Reajuste de Arriendo 2026: calcula por UF o IPC', // 47
    seoDescription:
      'Calcula cuánto sube tu arriendo en 2026 por variación de UF o IPC según tu contrato. Monto exacto a pagar en pesos. Ley de Arriendo.', // 133
  },

  'calculadora-gastos-comunes': {
    seoTitle: 'Gastos Comunes 2026: prorrateo por alícuota y depto', // 51
    seoDescription:
      'Calcula y prorratea gastos comunes en condominios según alícuota y fondo de reserva (Ley 21.442). Desglose en pesos por unidad.', // 129
  },

  'calculadora-costo-notaria': {
    seoTitle: 'Costos de Notaría 2026: aranceles en Chile al día', // 49
    seoDescription:
      'Estima aranceles notariales en Chile 2026: escrituras de compraventa, poderes, finiquitos y mandatos según arancel oficial. Gratis.', // 132
  },

  'calculadora-plusvalia': {
    seoTitle: 'Plusvalía Inmobiliaria 2026: impuesto y exención UF', // 51
    seoDescription:
      'Calcula la ganancia de capital e impuesto SII por venta de inmuebles en Chile. Exención de 8.000 UF y tasa 10% F22. Referencial.', // 129
  },

  // --- VEHÍCULOS Y TRANSPORTE ---
  'calculadora-permiso-circulacion': {
    seoTitle: 'Permiso de Circulación 2026: tasación y valor auto', // 51
    seoDescription:
      'Estima tu permiso de circulación 2026 según tasación fiscal del SII, antigüedad y opción 1ª/2ª cuota. Confirma con tu municipalidad.', // 135
  },

  'calculadora-multas-transito': {
    seoTitle: 'Multas de Tránsito 2026 Chile: calcula en UTM y CLP', // 52
    seoDescription:
      'Estima multas en UTM y pesos: leves a gravísimas, celular, luz roja, SOAP y alcohol. Valor UTM del día referencial Juzgado de Policía Local.', // 142
  },

  'calculadora-costo-tag': {
    seoTitle: 'Costo TAG 2026: calcula tus peajes al mes en Chile', // 51
    seoDescription:
      'Estima cuánto pagas de TAG al mes según autopista y viajes. Autopista Central, Costanera Norte, Vespucio y peajes interurbanos. Gratis.', // 137
  },

  'calculadora-credito-automotriz': {
    seoTitle: 'Simulador de crédito automotriz 2026: cuota, pie y CAE', // 54
    seoDescription:
      'Simula cuota de auto en Chile: pie %, plazo, tasa y CAE del crédito automotriz. Compara costo total antes de comprar. No es banco.', // 132
  },

  // --- FAMILIA Y BENEFICIOS SOCIALES ---
  'calculadora-pension-alimenticia': {
    seoTitle: 'Pensión Alimenticia 2026: monto mínimo y tabla UTM', // 50
    seoDescription:
      'Calcula la pensión de alimentos en Chile 2026: porcentaje del sueldo mínimo ($553.553), 1 o más hijos, tramos y reajuste en UTM. DT.', // 133
  },

  'calculadora-subsidio-agua': {
    seoTitle: 'Subsidio de Agua 2026: descuento municipal en boleta', // 52
    seoDescription:
      'Estima tu subsidio de agua potable 2026 según RSH y porcentaje de descuento municipal (25% a 100%). Ahorro en pesos en tu boleta.', // 131
  },

  // --- PENSIONES Y PREVISIÓN ---
  'calculadora-simulador-apv': {
    seoTitle: 'Simulador APV 2026: compara Régimen A vs Régimen B', // 50
    seoDescription:
      'Simula tu Ahorro Previsional Voluntario 2026: bonificación fiscal 15% (Régimen A) vs rebaja de impuestos (Régimen B). Ahorro real.', // 132
  },

  'calculadora-pgu': {
    seoTitle: 'Pensión PGU 2026: monto $214.296 y requisitos Chile', // 51
    seoDescription:
      'Conoce el monto de la Pensión Garantizada Universal 2026 ($214.296), requisitos del 90% RSH, pensión base y cómo postular en IPS.', // 131
  },

  'calculadora-cotizacion-independientes': {
    seoTitle: 'Cotización Independientes 2026: total vs parcial', // 49
    seoDescription:
      'Calcula tus cotizaciones obligatorias en la Operación Renta 2026: AFP, salud, SIS y seguro de accidentes. Cobertura total o parcial.', // 134
  },

  // --- EDUCACIÓN ---
  'calculadora-credito-cae': {
    seoTitle: 'Simulador CAE 2026: calcula tu cuota mensual', // 44
    seoDescription:
      'Simula tu cuota CAE con tasa 2% anual: monto, plazo y meses de gracia. Compara la cuota con el 10% de tu ingreso. Gratis y sin registro.', // 136
  },

  // --- HOGAR Y SERVICIOS ---
  'calculadora-cuenta-luz': {
    seoTitle: 'Cuenta de Luz 2026: calcula tu consumo en kWh y CLP', // 51
    seoDescription:
      'Estima tu boleta de luz en Chile 2026 con tarifas actualizadas: consumo en kWh, cargo fijo, descongelamiento y subsidio eléctrico.', // 131
  },

  'calculadora-intereses-mora': {
    seoTitle: 'Intereses por Mora 2026: calcula recargo de deudas', // 50
    seoDescription:
      'Estima intereses por mora de sueldos impagos, deudas comerciales o multas en Chile según tasa máxima convencional y días de atraso.', // 134
  },

  // --- BLOG ASOCIADO A CAE (MANTENER) ---
  'embargos-cae-tgr-2026-cuentas-bienes-raices': {
    seoTitle: 'Embargos CAE 2026: TGR, cuentas y bienes raíces', // 52
    seoDescription:
      'Cómo la TGR cobró deudas CAE morosas en 2026: cuentas, inmuebles, convenios y tramo >$5 millones. Fuentes oficiales.', // 128
  },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOG (ya rankean o tienen imp sin clic)
  // ══════════════════════════════════════════════════════════════════════════

  'comparativa-comisiones-afp-2026': {
    seoTitle: 'AFP más barata 2026: Uno 0,46% | Compara las 7', // 46
    seoDescription:
      'AFP Uno cobra 0,46% y ProVida 1,45% en 2026. Compara las 7 comisiones y calcula cuánto pierdes al año en la AFP equivocada. Dato oficial SP.', // 140
  },

  'subsidios-minvu-2026-guia': {
    seoTitle: 'Subsidio MINVU 2026: ¿cuál me corresponde? | Simula', // 51
    seoDescription:
      'Descubre qué subsidio de vivienda te corresponde en 2026 según tu ahorro y RSH. DS49, DS1 y DS19 desde 10 UF de ahorro. Simula gratis.', // 140
  },

  'reajuste-arriendo-uf-2026': {
    seoTitle: 'Reajuste de Arriendo 2026: ¿cuánto puede subir? | UF', // 52
    seoDescription:
      '¿Te subieron el arriendo? Calcula el reajuste 2026 por UF o IPC según tu contrato y verifica cuánto te corresponde pagar realmente. Con ejemplo.', // 144
  },

  'tope-imponible-2026': {
    seoTitle: 'Tope Imponible 2026: 90 UF en AFP y Salud | Calcula', // 51
    seoDescription:
      'El tope imponible 2026 es 90 UF (no 89,9) desde febrero, y 135,2 UF en cesantía. Mira cuánto cotizas si tu sueldo supera el tope, con ejemplo.', // 142
  },

  'cae-renegociacion-condonacion-2026': {
    seoTitle: 'CAE 2026: cuota, renegociación y condonación', // 46
    seoDescription:
      'Cómo funciona el CAE en 2026: tasa 2%, plazos, condonación a 20 años y opciones si no puedes pagar. Simula tu cuota gratis.', // 130
  },

  'permiso-circulacion-segunda-cuota-agosto-2026': {
    seoTitle: 'Permiso de circulación 2ª cuota 2026: hasta el 31 de agosto', // 58
    seoDescription:
      'Segunda cuota del permiso de circulación 2026: del 1 al 31 de agosto. Requisitos, multas por atraso y cómo estimar el valor. ChileAtiende.', // 142
  },

  'revision-tecnica-chile-2026-calendario-patente': {
    seoTitle: 'Calendario revisión técnica 2026 por dígito', // 43
    seoDescription:
      '¿En qué mes te toca la revisión técnica? Tabla 2026 por último dígito de patente, meses que quedan del año, prórrogas vigentes y qué hacer si se te pasó.', // 153
  },

  'cotizacion-empleador-3-5-agosto-2026-costo-pyme': {
    seoTitle: 'Cotización empleador 3,5% agosto 2026: costo empresa Chile', // 58
    seoDescription:
      'Desde agosto 2026 la cotización del empleador sube a 3,5% (Ley 21.735). Ejemplos en CLP y cómo estimar el costo PYME. No se descuenta al trabajador.', // 150
  },

  // --- #7 sprint: pico búsquedas 10–18 sep; indexar con anticipación ---
  'aguinaldo-fiestas-patrias-2026-pensionados-sector-publico': {
    seoTitle: 'Aguinaldo Fiestas Patrias 2026: IPS y sector público', // 54
    seoDescription:
      'Montos 2026: pensionados IPS $25.280 + $12.969/carga; sector público $91.682 o $63.645. Fechas, tramos y fuentes ChileAtiende / Ley 21.806.', // 145
  },

  // --- #2 P1: jornada 42 h desde 26-04-2026 ---
  'horas-extra-jornada-42-horas-chile-2026': {
    seoTitle: 'Factor horas extras 42 horas 2026: cómo se calcula', // 50
    seoDescription:
      'Desde el 26-04-2026 la jornada es 42 h/semana (Ley 21.561). Calcula horas extra con recargo 50%, valor hora y ejemplos. Dirección del Trabajo.', // 142
  },

  // --- Nuevos artículos 2026-09-23 ---
  'contribuciones-cuarta-cuota-noviembre-2026': {
    seoTitle: 'Contribuciones: cuarta cuota vence 30 de noviembre 2026', // 57
    seoDescription:
      'La cuarta cuota de contribuciones 2026 vence el lunes 30 de noviembre. Exención $61.711.570, tasas 0,893% y 1,042%, ejemplos y canales TGR.', // 140
  },
  'aguinaldo-navidad-pensionados-2026': {
    seoTitle: 'Aguinaldo Navidad 2026 pensionados: $29.055 + cargas', // 55
    seoDescription:
      'Aguinaldo de Navidad 2026 para pensionados IPS: $29.055 base + $16.415 por carga al 30 de noviembre (Ley 21.806). Se paga con la pensión de diciembre.', // 145
  },
  'patente-comercial-2027-calcular': {
    seoTitle: 'Patente comercial 2027: cálculo, cuota de enero y topes', // 55
    seoDescription:
      'Cómo se calcula la patente comercial: 2,5 a 5 por mil del capital propio (mínimo 1 UTM, máximo 8.000 UTM). La cuota de enero 2027 se reajusta por IPC.', // 143
  },

  // --- #3 P1: IMM mayo 2026 ---
  'sueldo-minimo-2026-calcular-liquido': {
    seoTitle: 'Sueldo mínimo en Chile 2026: $553.553 desde mayo', // 48
    seoDescription:
      '¿Cuánto es el sueldo mínimo en Chile? $553.553 brutos desde el 1 de mayo de 2026 (Ley 21.830). Montos para menores y mayores de 65, y cuánto queda líquido.', // 154
  },

  // --- #6 P1: finiquito × IMM ---
  'finiquito-2026-ejemplo-sueldo-minimo': {
    seoTitle: 'Finiquito 2026 con sueldo mínimo $553.553: ejemplos', // 54
    seoDescription:
      'Finiquito con IMM $553.553: despido vs renuncia, indemnización, aviso y vacaciones. Plazo 10 días hábiles. DT y Código del Trabajo.', // 140
  },

  // --- Hub cesantía + Seguro de Cesantía AFC ---
  'seguro-cesantia-finiquito-2026-afc': {
    seoTitle: 'Finiquito y AFC 2026: cuánto pueden descontar', // 45
    seoDescription:
      'Despido por necesidades de la empresa: pueden descontar de la indemnización el aporte del empleador a tu cuenta AFC, no lo que tú cotizaste. Cómo revisarlo.', // 156
  },
  // E-021 (brief 2026-10-29). Única fuente del title/meta: se borran seoTitle/seoDescription de articles.ts.
  'como-cobrar-seguro-cesantia-afc-2026': {
    seoTitle: 'Cómo cobrar el seguro de cesantía 2026: pasos y cuándo pagan', // 60
    seoDescription:
      'Pide el seguro en AFC desde el día siguiente al término. Si lo pides antes del día 30, el 1.er pago llega el jueves siguiente a ese día. Pasos y saldo.', // 151
  },
  // Brief "qué hacer si te despiden" (2026-10-29): title y meta hacia esa intención.
  'checklist-despues-despido-chile-2026': {
    seoTitle: 'Qué hacer si te despiden en Chile 2026: checklist y plazos', // 58
    seoDescription:
      'Qué hacer si te despiden: el finiquito se paga en 10 días hábiles, pide el seguro de cesantía en la AFC, activa la BNE y busca trabajo. Checklist 2026.', // 151
  },
  // Nota: hub /cesantia usa buildPageMetadata en page.tsx (title/desc allí).

  // ══════════════════════════════════════════════════════════════════════════
  // CALCULADORAS NUEVAS Q4 2026 — COBERTURA CTR COMPLETA
  // GSC 2026-10-08: demandas "sueldo part time 30 horas", "factor hora extra
  // 42 horas", "tope imponible" → cifra o factor exacto primero (mobile Chile).
  // ══════════════════════════════════════════════════════════════════════════

  // --- SUELDO Y JORNADA ---
  'calculadora-sueldo-part-time': {
    seoTitle: 'Sueldo Part Time 30 Horas 2026: mínimo y valor hora',
    seoDescription:
      'Con 30 horas o menos el mínimo se paga proporcional ($553.553 × horas ÷ 42); con más de 30 corresponde íntegro. Calcula el mínimo y el valor hora. DT.',
  },

  'calculadora-factor-hora-extra': {
    seoTitle: 'Factor Hora Extra 42 Horas 2026: sueldo × 0,0083333',
    seoDescription:
      'Con la jornada de 42 horas, cada hora extra vale sueldo × 0,0083333 (recargo 50%, fórmula Dirección del Trabajo). Calcula el factor y el valor hora.',
  },

  // GSC/autocomplete 2026-10-08: "calculadora sueldo nana", "cuánto gana una nana";
  // competidores muestran montos 2025 → cifra 2026 primero.
  'calculadora-sueldo-casa-particular': {
    seoTitle: 'Sueldo Nana 2026: mínimo $553.553, líquido y cotizaciones',
    seoDescription:
      '¿Cuánto gana una nana? Mínimo $553.553 puertas adentro o afuera con jornada completa; proporcional con 30 h o menos. Calcula líquido y costo empleador.',
  },

  // --- BENEFICIOS Y SEGURIDAD SOCIAL ---
  // E-022 (brief 2026-10-29): "simulador seguro de cesantía". No cambia name ni H1.
  'calculadora-seguro-cesantia': {
    seoTitle: 'Simulador seguro de cesantía 2026: cuenta AFC y Solidario', // 57
    seoDescription:
      'Simula tus pagos del seguro de cesantía: el 1.er pago de tu cuenta individual es el 70% de tu remuneración. Fondo Solidario, mínimos y máximos 2026.', // 148
  },

  // E-020 (brief 2026-10-29): "si me dan 10 días de licencia cuántos me pagan".
  'calculadora-licencia-medica': {
    seoTitle: 'Licencia médica: ¿cuántos días pagan? Tabla y cálculo 2026', // 58
    seoDescription:
      'Si la licencia dura 10 días o menos, no se pagan los 3 primeros; desde 11 días se paga desde el día 1. Tabla de 1 a 15 días y quién paga. SUSESO.', // 145
  },

  'calculadora-aporte-familiar-permanente': {
    seoTitle: 'Aporte Familiar Permanente 2026: $66.834 por carga',
    seoDescription:
      'El Aporte Familiar Permanente (ex Bono Marzo) paga $66.834 por cada carga familiar acreditada al 31 de diciembre. Revisa requisitos y estima tu monto. IPS.',
  },

  'calculadora-subsidio-familiar-suf': {
    seoTitle: 'Subsidio Familiar (SUF) 2026: $22.601 por causante',
    seoDescription:
      'El SUF paga $22.601 por cada causante acreditado y $45.202 si tiene discapacidad, según el tramo de ingresos del hogar. Requisitos y simulación. IPS.',
  },

  'calculadora-subsidio-electrico': {
    seoTitle: 'Subsidio Eléctrico 2026: $17.346 a $31.224 por hogar',
    seoDescription:
      'El subsidio eléctrico 2026 paga por tramos según el hogar: $17.346 (1 integrante), $22.548 (2 a 3) y $31.224 (4 o más), en cuotas. Simula tu descuento.',
  },

  'calculadora-bono-30-mil-por-hijo': {
    seoTitle: 'Bono $30.000 por Hijo 2026: requisitos y pago',
    seoDescription:
      'Revisa si te corresponde el Bono de $30.000 por hijo (Ley 21.840): pago automático vía IPS para hogares en el Registro Social de Hogares. Simula tu caso.',
  },

  'calculadora-bono-bodas-oro': {
    seoTitle: 'Bono Bodas de Oro 2026: $482.295 por 50 años',
    seoDescription:
      'El bono por 50 años de matrimonio paga $482.295 en total ($241.147 por cónyuge), con 80% en el Registro Social de Hogares. Requisitos y simulación.',
  },

  'calculadora-asignacion-por-muerte': {
    seoTitle: 'Asignación por Muerte 2026: cuota mortuoria 15 UF',
    seoDescription:
      'La asignación por muerte reembolsa gastos funerarios hasta $1.070.445 (3 IMM) y la cuota mortuoria cubre 15 UF del funeral. Requisitos y solicitud IPS.',
  },

  'calculadora-subsidio-arriendo': {
    seoTitle: 'Subsidio de Arriendo 2026: hasta 4,2 UF al mes',
    seoDescription:
      'El subsidio de arriendo DS52 cubre hasta 4,2 UF mensuales del arriendo (4,9 UF en zonas norte/sur/RM) y 170 UF en total; 213 UF para personas mayores o con discapacidad. MINVU.',
  },

  'calculadora-tope-imponible-90-uf': {
    seoTitle: 'Tope Imponible 2026: 90 UF en AFP, salud y cesantía',
    seoDescription:
      'Si tu sueldo supera las 90 UF, el exceso no paga AFP ni salud: calcula tu base topada y tus descuentos reales. El seguro de cesantía topa en 135,2 UF.',
  },

  'calculadora-becas-gratuidad': {
    seoTitle: 'Becas y Gratuidad 2027: ¿a qué beneficios optas?',
    seoDescription:
      'Estima qué beneficios estudiantiles te corresponden (gratuidad y becas de arancel) según tu nivel socioeconómico, carrera, institución, puntaje PAES y NEM. FUAS.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GUÍAS PILLAR
  // ══════════════════════════════════════════════════════════════════════════

  'sueldo-liquido-chile': {
    seoTitle: 'Sueldo bruto vs líquido y total haberes', // 42 (+ | CalculaChile = 56)
    seoDescription:
      '¿Total haberes es lo mismo que sueldo bruto? Diferencia entre bruto, imponible y líquido en tu liquidación, con ejemplo en pesos y base en la DT.', // 145
  },

  'finiquito-laboral-chile': {
    seoTitle: 'Cómo calcular el finiquito en Chile 2026: ejemplos en $', // 55
    seoDescription:
      'Paso a paso: indemnización de 30 días por año (tope 11 años y 90 UF), vacaciones proporcionales y aviso previo. Ejemplos por causal y calculadora gratis.', // 153
  },

  'iva-boleta-honorarios-chile': {
    seoTitle: 'IVA y Boleta de Honorarios Chile 2026: guía SII', // 48
    seoDescription:
      'IVA 19% y boleta de honorarios con retención 15,25% en 2026. Ejemplos y calculadoras gratis. Bases SII y Ley 21.133.', // 124
  },

  'uf-utm-indicadores-chile': {
    seoTitle: 'UF y UTM Chile 2026: qué son y cómo convertir', // 46
    seoDescription:
      'Guía de UF, UTM e IPC en Chile 2026: para qué se usan y cómo pasar a pesos. Conversores gratis con valor del día.', // 122
  },
  'vehiculos-chile-permiso-multas': {
    seoTitle: 'Vehículos en Chile 2026: permiso, multas y TAG', // 46
    seoDescription:
      'Guía verificada 2026 de permiso de circulación, SOAP, revisión técnica, multas, TAG, peajes y compra de un vehículo usado en Chile.',
  },
  'hogar-servicios-basicos-chile': {
    seoTitle: 'Servicios básicos en Chile 2026: luz, agua y gas', // 48
    seoDescription:
      'Guía de costos del hogar en Chile 2026: cuenta de la luz BT1, agua potable, subsidios, gas, internet, gastos comunes Ley 21.442, contribuciones y reajuste de arriendo (Ley 21.461).',
  },
  'empresas-pymes-chile': {
    seoTitle: 'Empresas y pymes en Chile 2026: costos e impuestos', // 50
    seoDescription:
      'Guía completa para empresas y PYMEs en Chile 2026: costo empleador, régimen 14D / 14A, IVA, PPM, patente comercial, contribuciones, retención de honorarios y boletas. Con fórmulas y ejemplos.',
  },
  'comprar-vivienda-chile': {
    seoTitle: 'Comprar vivienda en Chile 2026: subsidios y escritura', // 53
    seoDescription:
      'Guía verificada para comprar vivienda en Chile: promesa, estudio de títulos, subsidios 2026, contribuciones, gastos comunes, escritura e inscripción.',
  },
};

/**
 * ============================================================================
 * GSC 24 h (2026-07-08) → acciones de este archivo
 * ============================================================================
 *  URL / tema                         | Imp ~ | CTR ~  | Acción
 *  -----------------------------------|-------|--------|------------------
 *  calculadora-iva                    | 585   | 0,2%   | Override fuerte (neto/bruto 19%)
 *  calculadora-patente-comercial      | 483   | 3,7%   | Afirmar gancho "¿cuánto pagar?"
 *  blog AFP / tope / arriendo / MINVU | 40-144| <2%    | Overrides numéricos
 *  guía sueldo líquido                | 120   | 1,7%   | Override + cifra
 *  calculadora-cae                    | 80    | 7,5%   | "Simulador" + tasa 2% + no FES
 *  vacaciones / multas / permiso      | 30-90 | medio  | Titles con 2026 + verbo
 * ============================================================================
 */
