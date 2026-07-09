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

export const seoOverrides: Record<
  string,
  { seoTitle: string; seoDescription: string }
> = {
  // ══════════════════════════════════════════════════════════════════════════
  // CALCULADORAS — GSC 24 h: alta impresión / bajo CTR o pos media
  // ══════════════════════════════════════════════════════════════════════════

  // --- CRÍTICO: ~585 imp, ~1 clic, CTR ~0,2 %, pos ~8 ---
  'calculadora-iva': {
    seoTitle: 'Calculadora IVA Chile 2026: neto y bruto al instante', // 52
    seoDescription:
      'Agrega o quita el IVA del 19% en segundos. Ejemplo: $100.000 neto = $119.000 con IVA. Gratis, sin registro. Datos SII / DL 825.', // 128
  },

  // --- CAE: buscada, hay que capturar más queries (simulador, cuota, tasa) ---
  'calculadora-credito-cae': {
    seoTitle: 'Simulador CAE 2026: calcula tu cuota | Tasa 2%', // 48
    seoDescription:
      'Simula el Crédito con Aval del Estado: cuota mensual, total a pagar y plazo 10–20 años. Tasa fija 2% en UF. CAE vigente 2026 (no es FES). Gratis.', // 148
  },

  // --- #1 del día en clics: defender y afinar ---
  'calculadora-patente-comercial': {
    seoTitle: 'Patente Comercial 2026: ¿cuánto pagar? | Calcula', // 48
    seoDescription:
      'Calcula tu patente comercial 2026 con capital propio tributario y tasa de tu comuna. Desde 1 UTM (~$71.649) hasta 8.000 UTM. Pago anual, opción 2 cuotas.', // 155
  },

  'calculadora-vacaciones-proporcionales': {
    seoTitle: 'Vacaciones Proporcionales 2026: calcula en pesos', // 48
    seoDescription:
      'Calcula tus días y el monto en pesos de vacaciones proporcionales en Chile. Ideal al renunciar o al finiquito. Gratis, Código del Trabajo.', // 138
  },

  'calculadora-multas-transito': {
    seoTitle: 'Multas de Tránsito 2026 Chile: calcula en UTM', // 47
    seoDescription:
      'Estima el valor de multas de tránsito en Chile según tipo de infracción y UTM 2026. Leves, graves y gravísimas. Referencial, gratis.', // 133
  },

  'calculadora-permiso-circulacion': {
    seoTitle: 'Permiso de Circulación 2026: calcula el valor', // 46
    seoDescription:
      'Estima tu permiso de circulación 2026 según valor del vehículo y antigüedad. Incluye idea de 1ª y 2ª cuota (ago). Confirma en tu municipio.', // 142
  },

  'calculadora-credito-automotriz': {
    seoTitle: 'Crédito Automotriz 2026: simula cuota y pie', // 46
    seoDescription:
      'Simula la cuota de tu crédito de auto en Chile: pie, tasa, plazo y costo total. Compara escenarios antes de firmar. Gratis.', // 124
  },

  'calculadora-contribuciones': {
    seoTitle: 'Contribuciones 2026: calcula por avalúo fiscal', // 47
    seoDescription:
      'Estima tus contribuciones (impuesto territorial) 2026 según avalúo SII y destino de la propiedad. Útil para cuotas sep y nov. Gratis.', // 136
  },

  'calculadora-intereses-mora': {
    seoTitle: 'Intereses por Mora 2026: calcula el recargo', // 45
    seoDescription:
      'Estima intereses por mora de sueldos, deudas o multas en Chile. Ingresa monto y días de atraso. Resultado referencial, gratis.', // 128
  },

  'calculadora-credito-hipotecario': {
    seoTitle: 'Crédito Hipotecario 2026: simula dividendo en UF', // 50
    seoDescription:
      'Simula tu dividendo hipotecario en UF y pesos: monto, pie, tasa y plazo. Estima capacidad de pago y costo total. Gratis, no es oferta bancaria.', // 144
  },

  'calculadora-costo-tag': {
    seoTitle: 'Costo TAG 2026: peajes al mes en Chile', // 40
    seoDescription:
      'Estima cuánto pagas de TAG al mes según ruta y viajes. Rancagua, Valparaíso, urbano y más. Referencial, gratis.', // 116
  },

  'calculadora-asignacion-familiar': {
    seoTitle: 'Asignación Familiar 2026: tramos y monto', // 43
    seoDescription:
      'Calcula la asignación familiar 2026 por carga según tu sueldo: tramos $22.601, $13.870 y $4.382. Datos DT/SUSESO. Gratis.', // 128
  },

  'calculadora-gratificacion-legal': {
    seoTitle: 'Gratificación Legal 2026: ¿cuánto te toca?', // 44
    seoDescription:
      'Calcula la gratificación legal 2026: 25% del sueldo con tope 4,75 IMM ($553.553). Mensual o anual. Basado en Código del Trabajo.', // 132
  },

  'calculadora-sueldo-liquido': {
    seoTitle: 'Sueldo Líquido 2026: de bruto a líquido al instante', // 51
    seoDescription:
      'Calcula tu sueldo líquido 2026 con AFP, 7% salud, cesantía e impuesto. Ejemplo con cifras reales. Gratis, actualizado Chile.', // 128
  },

  'calculadora-finiquito': {
    seoTitle: 'Finiquito 2026: calcula indemnización y vacaciones', // 51
    seoDescription:
      'Estima tu finiquito en Chile: años de servicio, vacaciones proporcionales y gratificación. Según causal de término. Gratis.', // 126
  },

  'calculadora-indemnizacion-anos-servicio': {
    seoTitle: 'Indemnización por Años 2026: tope 90 UF', // 42
    seoDescription:
      'Calcula la indemnización por años de servicio en Chile. 30 días por año, tope 11 años y 90 UF. Ideal con finiquito. Gratis.', // 128
  },

  'calculadora-impuesto-segunda-categoria': {
    seoTitle: 'Impuesto 2ª Categoría 2026: calcula tu IUSC', // 47
    seoDescription:
      'Calcula el impuesto único de segunda categoría 2026 sobre tu sueldo. Tramos SII en UTM. Ejemplo claro en pesos. Gratis.', // 122
  },

  'calculadora-subsidio-habitacional': {
    seoTitle: 'Subsidio Habitacional 2026: DS49, DS1 y DS19', // 46
    seoDescription:
      'Estima subsidio de vivienda MINVU 2026 según tramo, ahorro en UF y valor de la propiedad. DS49, DS01 y DS19. Referencial, gratis.', // 134
  },

  'calculadora-comparador-afp': {
    seoTitle: 'Comisiones AFP 2026: compara y elige la más barata', // 52
    seoDescription:
      'Compara las 7 AFP 2026: Uno desde 0,46%. Ve cuánto pagas al mes con tu sueldo y cuánto ahorras al cambiar. Dato Superintendencia.', // 134
  },

  'calculadora-boleta-honorarios': {
    seoTitle: 'Boleta de Honorarios 2026: retención 15,25%', // 47
    seoDescription:
      'Calcula bruto y líquido de tu boleta 2026 con retención 15,25% (Ley 21.133). Ejemplo $100.000 → $15.250 retenidos. SII.', // 128
  },

  'calculadora-horas-extra': {
    seoTitle: 'Horas Extra 2026: calcula con jornada 42 horas', // 48
    seoDescription:
      'Calcula el valor de tus horas extra en Chile 2026. Jornada de 42 h (Ley 21.561), recargo 50% y festivos. Gratis.', // 120
  },

  'calculadora-uf-clp': {
    seoTitle: 'UF a Pesos Hoy 2026: convierte al instante', // 44
    seoDescription:
      'Convierte UF a pesos chilenos y de CLP a UF con el valor del día. Ideal hipoteca, arriendo y contratos. Gratis.', // 116
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

  'guia-horas-extra-chile': {
    seoTitle: 'Horas Extra Chile 2026: recargo 50% y 42 horas', // 48
    seoDescription:
      'Cómo se pagan las horas extra en Chile 2026 con jornada de 42 horas. Recargo legal, topes y calculadora. Dirección del Trabajo.', // 130
  },

  'guia-iva-chile-2026': {
    seoTitle: 'IVA Chile 2026: 19% y cómo calcularlo (SII)', // 44
    seoDescription:
      'Guía del IVA 19% en Chile 2026: agregar, quitar y ejemplos en pesos. Enlace a calculadora gratis. Base legal DL 825 / SII.', // 126
  },

  'boleta-honorarios-completo': {
    seoTitle: 'Boleta de Honorarios 2026: retención 15,25% explicada', // 54
    seoDescription:
      'Todo sobre boleta de honorarios 2026: tasa 15,25%, líquido vs bruto y Operación Renta. Calculadora gratis según SII.', // 122
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
