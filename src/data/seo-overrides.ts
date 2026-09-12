/**
 * ============================================================================
 * SEO OVERRIDES — CTR + posición (CalculaChile)
 * Optimización de seoTitle + seoDescription para mobile chileno
 * Actualizado: 2026-07-08 · GSC últimas 24 h (imp altas / CTR bajo / pos media)
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

export const seoOverrides: Record<string, { seoTitle: string; seoDescription: string }> = {
  // ══════════════════════════════════════════════════════════════════════════
  // CALCULADORAS — GSC 24 h: alta impresión / bajo CTR o pos media
  // ══════════════════════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════════════════════
  // CALCULADORAS — 39 ACTIVAS (100% COBERTURA CTR MOBILE CHILE)
  // ══════════════════════════════════════════════════════════════════════════

  // --- SUELDO Y REMUNERACIONES ---
  'calculadora-sueldo-liquido': {
    seoTitle: 'Sueldo Líquido 2026: de bruto a líquido al instante', // 51
    seoDescription:
      'Calcula tu sueldo líquido 2026 con AFP, 7% salud, cesantía e impuesto único. Desglose en pesos reales. Gratis y actualizado Chile DT.', // 135
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
    seoTitle: 'Finiquito 2026: calcula indemnización y vacaciones', // 51
    seoDescription:
      'Estima tu finiquito en Chile: años de servicio, vacaciones proporcionales y aviso previo según causal DT. Desglose en pesos, gratis.', // 133
  },

  'calculadora-indemnizacion-anos-servicio': {
    seoTitle: 'Indemnización por Años 2026: tope legal 90 UF', // 48
    seoDescription:
      'Calcula tu indemnización por años de servicio en Chile: 30 días por año, tope 11 años y 90 UF imponible. Ideal finiquito. Gratis DT.', // 135
  },

  'calculadora-vacaciones-proporcionales': {
    seoTitle: 'Vacaciones Proporcionales 2026: calcula en pesos', // 48
    seoDescription:
      'Calcula tus días hábiles y el monto en pesos de vacaciones proporcionales en Chile. Para renuncia voluntaria o despido. Código del Trabajo.', // 139
  },

  'calculadora-gratificacion-legal': {
    seoTitle: 'Gratificación Legal 2026: ¿cuánto te toca en pesos?', // 53
    seoDescription:
      'Calcula la gratificación legal 2026: 25% del sueldo con tope 4,75 IMM ($553.553). Modalidad mensual o anual. Datos Código del Trabajo.', // 136
  },

  'calculadora-horas-extra': {
    seoTitle: 'Horas Extra 2026: calcula con jornada 42 horas', // 48
    seoDescription:
      'Calcula tus horas extra en Chile 2026 con jornada de 42 h (Ley 40 Horas), recargo del 50% y festivos. Factor oficial DT en pesos.', // 132
  },

  'calculadora-asignacion-familiar': {
    seoTitle: 'Asignación Familiar 2026: tramos y monto por carga', // 53
    seoDescription:
      'Calcula la asignación familiar 2026 por carga acreditada: tramos $22.601, $13.870 y $4.382 según ingreso imponible. SUSESO / DT.', // 130
  },

  'calculadora-aguinaldo': {
    seoTitle: 'Aguinaldo 2026: Fiestas Patrias y Navidad en Chile', // 50
    seoDescription:
      'Montos del aguinaldo 2026 para pensionados IPS ($25.280) y sector público ($91.682). Requisitos, fechas de pago y sector privado.', // 130
  },

  // --- TRIBUTARIO Y HONORARIOS ---
  'calculadora-iva': {
    seoTitle: 'Calculadora IVA Chile 2026: neto a bruto y 19%', // 48
    seoDescription:
      'Calcula el IVA del 19%: pasa de neto a bruto o quita el IVA a un total al instante. Con desglose en pesos, gratis y sin registro. SII.', // 135
  },

  'calculadora-boleta-honorarios': {
    seoTitle: 'Boleta de Honorarios 2026: retención 15,25% SII', // 47
    seoDescription:
      'Calcula el valor bruto y líquido de tu boleta 2026 con retención 15,25% (Ley 21.133). Factor 0,8475 al instante. Gratis, datos SII.', // 132
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
    seoTitle: 'Patente Comercial 2026: simula con tu CPT y comuna', // 50
    seoDescription:
      'Calcula tu patente comercial 2026 con Capital Propio Tributario y tasa comunal (0,25% a 0,5%). Tramos en UTM, cuota anual o semestral.', // 136
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
    seoTitle: 'UF a Pesos Hoy 2026: convierte al instante oficial', // 51
    seoDescription:
      'Convierte UF a pesos chilenos y de CLP a UF con el valor oficial de hoy del Banco Central. Ideal hipotecario, arriendo y contratos.', // 133
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
    seoTitle: 'Contribuciones 2026: calcula por avalúo fiscal SII', // 51
    seoDescription:
      'Estima contribuciones 2026: cuotas abr/jun/sep/nov, exención habitacional en UTM y avalúo fiscal del SII. Referencial, gratis.', // 130
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
    seoTitle: 'Crédito Automotriz 2026: simula cuota, pie y CAE', // 49
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
    seoTitle: 'Simulador CAE 2026: cuota, UF y % del ingreso', // 50
    seoDescription:
      'Simula cuota CAE a tasa 2%: total, UF, gracia y cuota vs ingreso. Aviso cobro TGR. No es FES ni embargo. Gratis y referencial.', // 130
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

  'como-funciona-gratificacion-legal': {
    seoTitle: 'Gratificación Legal 2026: ¿cuánto me corresponde?', // 49
    seoDescription:
      'Descubre cuánto te toca de gratificación legal en 2026 con el sueldo mínimo de $553.553: 25% del sueldo, tope 4,75 IMM. Guía con datos DT.', // 138
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

  'diferencia-sueldo-bruto-liquido': {
    seoTitle: 'Sueldo Bruto vs Líquido 2026: diferencia real en $', // 50
    seoDescription:
      'Cuánto te descuentan de AFP, salud y cesantía en 2026. Ejemplo de bruto a líquido y calculadora gratis. Chile actualizado.', // 126
  },

  'cae-renegociacion-condonacion-2026': {
    seoTitle: 'CAE 2026: cuota, renegociación y condonación', // 46
    seoDescription:
      'Cómo funciona el CAE en 2026: tasa 2%, plazos, condonación a 20 años y opciones si no puedes pagar. Simula tu cuota gratis.', // 130
  },

  'calcular-indemnizacion-por-anos': {
    seoTitle: 'Indemnización por Años de Servicio 2026: calcula', // 50
    seoDescription:
      'Cómo calcular la indemnización por años de servicio en Chile: 30 días por año, tope 90 UF. Ejemplo y calculadora gratis.', // 126
  },

  'permiso-circulacion-segunda-cuota-agosto-2026': {
    seoTitle: 'Permiso de circulación 2ª cuota 2026: hasta el 31 de agosto', // 58
    seoDescription:
      'Segunda cuota del permiso de circulación 2026: del 1 al 31 de agosto. Requisitos, multas por atraso y cómo estimar el valor. ChileAtiende.', // 142
  },

  'revision-tecnica-chile-2026-calendario-patente': {
    seoTitle: 'Revisión técnica 2026: calendario por patente y requisitos', // 58
    seoDescription:
      'Calendario de revisión técnica 2026 por dígito de patente, consulta en PRT, multas y vínculo con el permiso de circulación. ChileAtiende.', // 140
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
    seoTitle: 'Horas extra Chile 2026: jornada 42 h y recargo 50%', // 52
    seoDescription:
      'Desde el 26-04-2026 la jornada es 42 h/semana (Ley 21.561). Calcula horas extra con recargo 50%, valor hora y ejemplos. Dirección del Trabajo.', // 142
  },

  // --- #3 P1: IMM mayo 2026 ---
  'sueldo-minimo-2026-calcular-liquido': {
    seoTitle: 'Sueldo mínimo 2026 $553.553: líquido y descuentos', // 52
    seoDescription:
      'IMM desde mayo 2026: $553.553 (18–65), $412.938 y $356.815 no remuneracional. Estima tu líquido. DT y Ley 21.830.', // 128
  },

  // --- #6 P1: finiquito × IMM ---
  'finiquito-2026-ejemplo-sueldo-minimo': {
    seoTitle: 'Finiquito 2026 con sueldo mínimo $553.553: ejemplos', // 54
    seoDescription:
      'Finiquito con IMM $553.553: despido vs renuncia, indemnización, aviso y vacaciones. Plazo 10 días hábiles. DT y Código del Trabajo.', // 140
  },

  // --- Hub cesantía + Seguro de Cesantía AFC ---
  'seguro-cesantia-finiquito-2026-afc': {
    seoTitle: 'Seguro de Cesantía 2026: AFC, CIC y finiquito', // 50
    seoDescription:
      'Cómo funciona el Seguro de Cesantía en Chile: cotizaciones, giros, CIC vs Fondo Solidario y diferencia con el finiquito. Fuentes AFC y ChileAtiende.', // 148
  },
  'como-cobrar-seguro-cesantia-afc-2026': {
    seoTitle: 'Cómo cobrar Seguro de Cesantía AFC 2026: pasos', // 50
    seoDescription:
      'Solicita el Seguro de Cesantía: documentos, 10 o 5 cotizaciones, sucursal virtual AFC y giros. Guía práctica Chile 2026.', // 120
  },
  'checklist-despues-despido-chile-2026': {
    seoTitle: 'Checklist despido Chile 2026: finiquito, AFC y CV', // 52
    seoDescription:
      'Qué hacer tras un despido: finiquito, plazos, Seguro de Cesantía y reinserción. Checklist práctico con calculadoras gratis.', // 128
  },
  // Nota: hub /cesantia usa buildPageMetadata en page.tsx (title/desc allí).

  // ══════════════════════════════════════════════════════════════════════════
  // GUÍAS PILLAR
  // ══════════════════════════════════════════════════════════════════════════

  'sueldo-liquido-chile': {
    seoTitle: 'Sueldo Líquido Chile 2026: descuentos y ejemplos en $', // 54
    seoDescription:
      'Cómo se calcula el sueldo líquido 2026: AFP, 7% salud, cesantía, IUSC y topes. Ejemplos en pesos y calculadora gratis. Fuentes DT y SP.', // 140
  },

  'finiquito-laboral-chile': {
    seoTitle: 'Finiquito Laboral Chile 2026: guía con ejemplos en $', // 52
    seoDescription:
      'Guía del finiquito 2026: indemnización, vacaciones y gratificación según causal. Ejemplos y calculadora. Código del Trabajo / DT.', // 132
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
