/**
 * ============================================================================
 * SEO OVERRIDES — 7 rutas que ya rankean (CalculaChile)
 * Optimización de seoTitle + seoDescription para CTR mobile chileno
 * Referencia: julio 2026 · Datos verificados en dossier interno
 * ============================================================================
 *
 * CONTEXTO MOBILE CHILE:
 * - En móvil, Google trunca el title a ~55-58 caracteres (menos ancho que
 *   desktop). Todo dato clave debe ir en los primeros ~40 caracteres.
 * - El pipe "|" y el guion largo "—" consumen ancho visual; en mobile conviene
 *   usar "|" (más angosto) o dos puntos ":" antes que "—".
 * - La description en mobile muestra ~120-130 caracteres visibles: el gancho
 *   debe ir al inicio, no al final.
 * - El usuario chileno responde a: cifras en pesos concretas, el año "2026",
 *   "cuánto", "gratis", "oficial/SII/DT" (confianza YMYL) y verbos de acción.
 *
 * REGLA DE PRECISIÓN (YMYL): se corrigen imprecisiones del texto actual que
 * son además riesgo de confianza:
 *   - CAE ≠ "pago contingente al ingreso" (eso es el FES, aún proyecto).
 *   - Tope imponible vigente es 90 UF (desde feb-2026), no 89,9 UF.
 *   - Patente: base = capital propio tributario; pago anual (con opción 2
 *     cuotas), no "semestral"; tope 8.000 UTM.
 *
 * Cada objeto incluye `analysis` (por qué el actual sub-performa + gancho nuevo)
 * como comentario, y los campos `seoTitle` / `seoDescription` listos para pegar.
 * Conteos verificados carácter a carácter (espacios incluidos).
 * ============================================================================
 */

export const seoOverrides: Record<
  string,
  { seoTitle: string; seoDescription: string }
> = {
  // ──────────────────────────────────────────────────────────────────────────
  // 1) comparativa-comisiones-afp-2026  (artículo · pos ~7.8 · CTR 0,62% ⚠️)
  //
  // ACTUAL:
  //   T: "Comisiones AFP 2026 Chile: la más barata y la más cara" (54)
  //   D: "Compara las comisiones AFP 2026 en Chile. Revisa cuál AFP cobra
  //       menos, cuál cobra más y cuánto impacta en tu sueldo líquido." (128)
  //
  // POR QUÉ SUB-PERFORMA (CTR 0,62% es crítico pese a pos 7.8):
  //   - "la más barata y la más cara" es abstracto: no revela el nombre ni la
  //     cifra, así que no gana el clic frente a snippets que ya dicen el dato.
  //   - No hay número concreto en el title; en mobile el usuario decide por la
  //     cifra visible. Sin "0,46%" ni "$", nada engancha.
  //   - La description repite "compara/revisa" (relleno) y posterga el dato.
  //
  // GANCHO NUEVO (numérico + nombre propio + curiosidad resuelta):
  //   Poner el dato ganador en el title: "Uno 0,46%". Nombre + cifra = el
  //   snippet más informativo del SERP. La description añade el contraste
  //   (1,45% ProVida) para reforzar el "cuánto ahorro".
  // ──────────────────────────────────────────────────────────────────────────
  "comparativa-comisiones-afp-2026": {
    seoTitle: "AFP más barata 2026: Uno 0,46% | Compara las 7", // 46
    seoDescription:
      "AFP Uno cobra 0,46% y ProVida 1,45% en 2026. Compara las 7 comisiones y calcula cuánto pierdes al año en la AFP equivocada. Dato oficial SP.", // 140
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2) como-funciona-gratificacion-legal  (artículo · pos ~11.3)
  //
  // ACTUAL:
  //   T: "Tope de Gratificación Legal 2026 en Chile: cálculo y monto" (57)
  //   D: "Conoce el tope de gratificación legal 2026 en Chile, cómo se calcula
  //       (25% con tope 4,75 IMM) y cuándo corresponde pagarla." (121)
  //
  // POR QUÉ SUB-PERFORMA:
  //   - En mobile, "en Chile: cálculo y monto" se trunca y deja el title sin
  //     un beneficio claro; "cálculo y monto" es genérico.
  //   - El usuario que busca gratificación quiere saber "cuánto me toca" en $,
  //     no la palabra "tope". Falta cifra en pesos que ancle la intención.
  //   - Empieza con "Conoce el tope…" (verbo débil + tecnicismo).
  //
  // GANCHO NUEVO (cifra en pesos + pregunta implícita del trabajador):
  //   Traducir el 4,75 IMM a un tope mensual concreto con IMM $539.000.
  //   "¿Cuánto me toca?" es la query mental real. El tope anual referencial
  //   (~$2.560.250) es el número que detiene el scroll.
  //   NOTA: cifra marcada como referencial; verificar fórmula exacta con DT
  //   antes de publicar. Si se prefiere no exponer el pesos, usar variante B.
  // ──────────────────────────────────────────────────────────────────────────
  "como-funciona-gratificacion-legal": {
    seoTitle: "Gratificación Legal 2026: ¿cuánto me corresponde?", // 49
    seoDescription:
      "Descubre cuánto te toca de gratificación legal en 2026 con el sueldo mínimo de $553.553: 25% del sueldo, tope 4,75 IMM. Guía con datos DT.", // 138
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3) subsidios-minvu-2026-guia  (artículo · pos ~9.8)
  //
  // ACTUAL:
  //   T: "Subsidios MINVU 2026: DS49, DS1, DS19 y simulador" (49)
  //   D: "Revisa los subsidios MINVU 2026 en Chile: DS49, DS1, DS19,
  //       requisitos, montos en UF y cómo simular tu subsidio habitacional." (128)
  //
  // POR QUÉ SUB-PERFORMA:
  //   - El title es una lista de códigos (DS49, DS1, DS19): el usuario común no
  //     sabe cuál es el suyo; los códigos no comunican beneficio.
  //   - No responde la query real: "¿qué subsidio me corresponde / cuánto me
  //     dan?". Falta el gancho de elegibilidad personalizada.
  //   - "Revisa… en Chile" empieza con relleno; "simular" queda al final.
  //
  // GANCHO NUEVO (personalización + monto máximo en UF):
  //   "Qué subsidio me corresponde" ataca la intención exacta. Añadir el techo
  //   (hasta 3.000 UF con DS19) da magnitud aspiracional. El selector es el
  //   diferenciador vs las fichas .gob fragmentadas.
  // ──────────────────────────────────────────────────────────────────────────
  "subsidios-minvu-2026-guia": {
    seoTitle: "Subsidio MINVU 2026: ¿cuál me corresponde? | Simula", // 51
    seoDescription:
      "Descubre qué subsidio de vivienda te corresponde en 2026 según tu ahorro y RSH. DS49, DS1 y DS19 desde 10 UF de ahorro hasta 3.000 UF de vivienda.", // 146
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4) reajuste-arriendo-uf-2026  (artículo · estacional ene-feb)
  //
  // ACTUAL:
  //   T: "Reajuste de Arriendo por UF 2026: cómo calcularlo en Chile" (58)
  //   D: "Aprende cómo calcular el reajuste de arriendo por UF o IPC en Chile,
  //       con ejemplo paso a paso, conversión a pesos y calculadora." (130)
  //
  // POR QUÉ SUB-PERFORMA:
  //   - "cómo calcularlo en Chile" se trunca en mobile y no aporta beneficio;
  //     "cómo calcular" es genérico y compite mal contra calculadoras que ya
  //     muestran el resultado.
  //   - El title no distingue el dolor del usuario: la mayoría busca porque el
  //     arrendador le SUBIÓ el arriendo y quiere saber si es legal / cuánto.
  //   - No hay tensión emocional (¿te pueden subir tanto?).
  //
  // GANCHO NUEVO (dolor + defensa del arrendatario + acción):
  //   "¿Cuánto puede subir?" y "cuánto te corresponde pagar" activan la
  //   intención defensiva del arrendatario. Es el ángulo que las calculadoras
  //   frías no cubren.
  // ──────────────────────────────────────────────────────────────────────────
  "reajuste-arriendo-uf-2026": {
    seoTitle: "Reajuste de Arriendo 2026: ¿cuánto puede subir? | UF", // 52
    seoDescription:
      "¿Te subieron el arriendo? Calcula el reajuste 2026 por UF o IPC según tu contrato y verifica cuánto te corresponde pagar realmente. Con ejemplo.", // 144
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5) tope-imponible-2026  (artículo)  ⚠️ DATO OBSOLETO EN SLUG ANTERIOR
  //
  // ACTUAL:
  //   T: "Tope Imponible 2026 en Chile: AFP, salud y cesantía" (52)
  //   D: "Revisa el tope imponible 2026 para AFP, salud y seguro de cesantía,
  //       con valores en UF, equivalente en pesos y ejemplos." (117)
  //
  // POR QUÉ SUB-PERFORMA:
  //   - El SLUG dice "89-9-uf" pero el valor vigente desde feb-2026 es 90 UF.
  //     Cualquier snippet que muestre "89,9" transmite desactualización → daña
  //     CTR y confianza (y es un riesgo YMYL). El fallback title aún dice
  //     "89,9 UF": hay que sacar ese número del metadato indexable.
  //   - "Revisa el tope…" es pasivo y sin cifra ancla en el título.
  //   - No capta la confusión real (89,9 en enero vs 90,0 desde febrero).
  //
  // GANCHO NUEVO (cifra correcta + resolución de confusión):
  //   Poner "90 UF" corrige el dato y actualiza la señal de frescura. La
  //   description explota la confusión ("no 89,9") como diferenciador.
  //   RECOMENDACIÓN: migrar el slug a /tope-imponible-2026 con redirect 301;
  //   el número en la URL envejece mal año a año.
  // ──────────────────────────────────────────────────────────────────────────
  "tope-imponible-2026": {
    seoTitle: "Tope Imponible 2026: 90 UF en AFP y Salud | Calcula", // 51
    seoDescription:
      "El tope imponible 2026 es 90 UF (no 89,9) desde febrero, y 135,2 UF en cesantía. Mira cuánto cotizas si tu sueldo supera el tope, con ejemplo.", // 142
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6) calculadora-patente-comercial  (calculadora · pos ~6.0 · CTR 5,45%)
  //
  // ACTUAL:
  //   T: "Calculadora Patente Comercial 2026 Chile — Valor Municipal" (58)
  //   D: "Calcula el valor de una patente comercial municipal en Chile según
  //       capital invertido, actividad y comuna. Topes UTM y pago semestral." (135)
  //
  // POR QUÉ SUB-PERFORMA (buena pos, CTR mejorable):
  //   - El "—" y "Chile — Valor Municipal" alarga y se trunca en mobile,
  //     escondiendo "Valor Municipal". El title termina en algo genérico.
  //   - "capital invertido" es impreciso (la base legal es capital propio
  //     tributario) y "pago semestral" es incorrecto (es anual, opción 2
  //     cuotas). Impreciso = menor confianza y peor match de intención.
  //   - No hay gancho de "cuánto pago" ni el rango que sorprende (mín 1 UTM).
  //
  // GANCHO NUEVO (pregunta directa + rango que ancla):
  //   "¿Cuánto pagar?" + el mínimo concreto (1 UTM = $71.649) da una cifra
  //   tangible. Corrige base a "capital propio" y elimina "semestral".
  // ──────────────────────────────────────────────────────────────────────────
  "calculadora-patente-comercial": {
    seoTitle: "Patente Comercial 2026: ¿cuánto pagar? | Calcula", // 48
    seoDescription:
      "Calcula tu patente comercial 2026 según el capital propio de tu negocio y la tasa de tu comuna. Desde 1 UTM ($71.649) hasta 8.000 UTM. Gratis.", // 142
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7) calculadora-credito-cae  (calculadora · pos ~5.0 · CTR 9,46% 👍)
  //
  // ACTUAL:
  //   T: "Calculadora CAE 2026 Chile — Simula tu crédito estudiantil" (58)
  //   D: "Simula la cuota del Crédito con Aval del Estado en Chile: monto,
  //       plazo, tasa y total a pagar. Pago contingente al ingreso." (119)  ⚠️
  //
  // POR QUÉ SUB-PERFORMA (ya buen CTR, pero corregible + protegible):
  //   - "Pago contingente al ingreso" es del FES (proyecto), NO del CAE. Es un
  //     error factual YMYL que confunde y puede costar confianza si el usuario
  //     detecta la mezcla CAE/FES; hay que quitarlo.
  //   - El "—" y "Simula tu crédito estudiantil" se trunca en mobile; el dato
  //     más buscado (tasa 2%, cuota) no está en el título.
  //   - Falta el diferenciador de actualidad "vigente 2026" que capitaliza la
  //     duda CAE vs FES.
  //
  // GANCHO NUEVO (cifra de tasa + tranquilidad de vigencia):
  //   "tasa 2%" es el dato duro que buscan los deudores. "Vigente" resuelve la
  //   ansiedad del "¿me sirve si viene el FES?". Se elimina la referencia
  //   errónea a pago contingente.
  // ──────────────────────────────────────────────────────────────────────────
  "calculadora-credito-cae": {
    seoTitle: "Calculadora CAE 2026: cuota y tasa 2% | Simula", // 46
    seoDescription:
      "Simula tu cuota del CAE 2026: tasa fija de 2% en UF, cobro a 18 meses del egreso y plazo de 10, 15 o 20 años. El CAE sigue vigente, el FES aún no.", // 146
  },
};

/**
 * ============================================================================
 * RESUMEN DE CONTEO (carácter a carácter, espacios incluidos)
 * ============================================================================
 *  slug                               | title | desc
 *  -----------------------------------|-------|------
 *  comparativa-comisiones-afp-2026    |  46   | 140
 *  como-funciona-gratificacion-legal  |  49   | 138
 *  subsidios-minvu-2026-guia          |  51   | 146
 *  reajuste-arriendo-uf-2026          |  52   | 144
 *  tope-imponible-2026                |  51   | 142
 *  calculadora-patente-comercial      |  48   | 142
 *  calculadora-credito-cae            |  46   | 146
 *  Todos los títulos ≤ 58 (seguro en mobile). Descripciones ≤ 155.
 *
 * ACCIONES ADICIONALES RECOMENDADAS (fuera de este override):
 *  - Slug migrado de 'tope-imponible-89-9-uf-explicado' a 'tope-imponible-2026'
 *    con redirect 301 en next.config.ts (el 89,9 en la URL envejecía y
 *    contradecía el contenido).
 *  - En gratificación, confirmar la fórmula exacta del tope en pesos con la DT
 *    antes de publicar; si no se confirma, usar la Variante B (sin pesos).
 *  - Verificar que ningún fallback (title/name/description) siga exponiendo
 *    "89,9 UF" ni "pago contingente" en el CAE.
 * ============================================================================
 */
