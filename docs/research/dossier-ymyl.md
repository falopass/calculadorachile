# Dossier de verificación YMYL — CalculaChile (calculadorachile.cl)

**Fecha del dossier:** 2026-07-08 · **País:** Chile · **Uso:** cruce contra catálogo de inputs de UI, funciones de cálculo y tests golden.
**Método:** solo fuentes oficiales primarias (SII, DT, Superintendencia de Pensiones/Previred, SUSESO, Superintendencia de Salud, AFC, MINVU/SERVIU/ChileAtiende, BCN-LeyChile, Banco Central, CMF, Hacienda, Diario Oficial). Etiquetas: **VIGENTE 2026** · **VIGENTE PERO VERIFICAR MES** · **VIGENTE PERO VERIFICAR LLAMADO** · **HISTÓRICO / DEROGADO** · **PRÁCTICA DE MERCADO (no ley)** · **NO VERIFICADO**.

**Limitación declarada:** la tabla de comisiones de spensiones.cl no fue accesible directamente (bloqueo BitNinja del sitio); los valores de comisiones AFP provienen del boletín Previred de junio 2026, cuya fuente declarada es la Superintendencia de Pensiones. Todo lo demás está verificado contra fuente primaria.

---

## 0. Resumen ejecutivo

- **Jornada laboral ya es 42 horas desde el 26-04-2026** (Ley 21.561, 2ª etapa). Toda calculadora de horas extra que use divisor 180 (45 h) o 176 (44 h) está mal HOY: el divisor vigente es **168** y el factor de hora extra con 50% es **0,0083333** ([DT, actualizado 28-04-2026](https://www.dt.gob.cl/portal/1628/w3-article-95182.html)). Es el cambio 2026 que más rompe fórmulas viejas.
- **SIS subió a 1,62% desde remuneraciones de abril 2026** (antes 1,54%) y es **100% cargo del empleador** en dependientes ([SUSESO](https://www.suseso.gob.cl/612/w3-article-775740.html)). La constante 1,62% comentada "abr-2026" en `constants.ts` es correcta. Cualquier calculadora que lo descuente al trabajador miente. Además, **desde agosto 2026 el SIS se integra al nuevo Seguro Social** de la reforma ([Hacienda](https://www.hacienda.cl/noticias-y-eventos/noticias/implementacion-de-la-reforma-previsional-nueva-cotizacion-del-empleador-regira)).
- **Reforma previsional Ley 21.735:** cotización adicional **exclusiva del empleador**, hoy 1% y **salta a 3,5% en agosto 2026** ([Hacienda](https://www.hacienda.cl/noticias-y-eventos/noticias/implementacion-de-la-reforma-previsional-nueva-cotizacion-del-empleador-regira)). **No toca el sueldo líquido**, pero sí cualquier feature de "costo empleador".
- **Topes imponibles 2026 reajustados:** AFP/salud **90 UF**, cesantía **135,2 UF**, IPS **60 UF** ([Previred jun-2026](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf)). Los valores 2025 (87,8 / 131,9 UF) están **HISTÓRICOS**: fórmulas con esas constantes ya están vencidas.
- **Retención de boletas 2026 = 15,25%** y el calendario es de la **Ley 21.133**, no de la Ley 21.578 ([SII — aumento gradual](https://www.sii.cl/destacados/boletas_honorarios/aumento_gradual.html)). Las propias guías de calculadorachile.cl citan "Ley 21.578 de 2023" (ley de ingreso mínimo): **error de atribución legal en contenido propio, corregir**.
- **La retención de boleta YA es el vehículo de las cotizaciones del independiente** (se liquidan una vez al año en la Operación Renta). Descontar AFP+salud además de la retención en el líquido mensual es **doble descuento**, error validado ([SII](https://www.sii.cl/destacados/renta/2025/cotizaciones_previsionales_informacion_general.html)).
- **Isapre se descuenta como máx(7%, plan en UF)**, no 7% fijo; con tope de 90 UF la cotización legal máxima de salud es 6,3 UF ([Superintendencia de Salud](https://www.superdesalud.gob.cl/preguntas-frecuentes/tax-grupos-de-interes/personas-6051/beneficiarios-isapres-6059/); [SUSESO 4080-2019](https://www.suseso.gob.cl/612/w3-article-578426.html)). El input fantasma `isapreMonto` de la UI **sí** cambia el resultado legal: cablearlo es obligatorio.
- **Contrato indefinido vs plazo fijo cambia el líquido:** cesantía trabajador 0,6% solo en indefinido; plazo fijo 0% trabajador / 3% empleador ([Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf)). El fantasma `contratoIndefinido` es un bug de resultado, no cosmético.
- **No existe recargo nocturno legal automático** en Chile: el 50% aplica igual de día, noche, domingo o festivo, salvo pacto ([DT](https://www.dt.gob.cl/portal/1628/w3-article-60173.html)). Eliminar `horasExtraNocturnas` del catálogo es correcto y urgente. Excepción acotada: comercio tiene recargo 30% sobre horas **ordinarias** en domingo ([DT](https://www.dt.gob.cl/portal/1628/w3-article-105587.html)).
- **Recargos del Art. 168 (30/50/80/100%) son judiciales**, "el juez ordenará…": jamás automáticos ([SUSESO](https://www.suseso.gob.cl/612/w3-propertyvalue-69859.html)). Mostrarlos como monto garantizado del finiquito es anti-patrón YMYL.
- **Subsidios MINVU: todos los montos oficiales se publican en UF**, nunca CLP ([ChileAtiende DS1 T1](https://www.chileatiende.gob.cl/fichas/19094-ds-1-tramo-1-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-100-uf)). El bug de dividir de nuevo por la UF un input ya en UF queda **validado como error real** (~40.000× de subestimación).
- **DS01 Tramo 2 tope es 1.600 UF (1.800 zonas extremas); 2.200 UF es el Tramo 3** ([ChileAtiende T2](https://www.chileatiende.gob.cl/fichas/5172-ds-1-tramo-2-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-600-uf) vs [T3](https://www.chileatiende.gob.cl/fichas/5436-ds-1-tramo-3-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-2-200-uf)). La premisa interna "T2 ~2.200" estaba mal. Sin `tipoSubsidio` + tramo RSH el cálculo es basura: **una calculadora seria NO puede adivinarlos**.
- **El plazo de pago del finiquito (10 días hábiles) viene de la Ley 20.684; la Ley 21.361 regula el finiquito electrónico** — corregir atribución si el sitio la usa ([BCN Ley 21.361](https://www.bcn.cl/leychile/navegar?idNorma=1162963)).
- **Comisiones AFP julio 2026:** Uno 0,46% · Modelo 0,58% · PlanVital 1,16% · Habitat 1,27% · Capital 1,44% · Cuprum 1,44% · Provida 1,45% ([Previred jun-2026](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf)) — **VIGENTE PERO VERIFICAR MES** (fuente primaria SP bloqueada en esta sesión).
- **Prepago hipotecario:** comisión máx. 1 mes de intereses (no reajustable) o 1,5 meses (reajustable), operaciones ≤5.000 UF; prepago parcial <10% del saldo requiere consentimiento del acreedor ([Ley 18.010 Art. 10](https://www.bcn.cl/leychile/navegar?idNorma=29438)). Un simulador que muestre CAE/seguros/prepago sin calcularlos es promesa falsa: cablear o podar.

---

## 1. Ficha por calculadora

### A) Sueldo líquido (dependiente)

**Riesgo YMYL si se calcula mal:** Alto
**Organismo rector:** Superintendencia de Pensiones (AFP/SIS/topes), Superintendencia de Salud (FONASA/Isapre), AFC (cesantía), SII (Impuesto Único 2ª Categoría), DT (imponibilidad).
**Base legal principal:** DL 3.500 Art. 17 (cotización 10% + comisión); Ley 21.735 (reforma previsional, aporte empleador); Ley 19.728 (seguro cesantía); DFL 1/2005 Salud (7%); LIR Art. 42 N°1 y 43 (IUSC); Código del Trabajo Art. 41 (imponibilidad).

**Parámetros obligatorios del cálculo correcto:**
- Sueldo bruto imponible mensual (CLP)
- AFP (define comisión 0,46%–1,45%)
- Sistema de salud: FONASA o Isapre
- Si Isapre: precio del plan pactado en UF (`isapreMonto`)
- Tipo de contrato: indefinido / plazo fijo u obra (define 0,6% vs 0% cesantía trabajador)
- Constantes del mes: valor UF, topes 90 / 135,2 UF, tabla IUSC mensual del mes

**Parámetros opcionales / avanzados:**
- Haberes no imponibles (colación, movilización, viáticos, asignación familiar)
- Descuentos voluntarios (APV, préstamos CCAF, cuota sindical)
- Cálculo inverso líquido→bruto (iterativo, como estimación)
- Trabajador exento de cesantía (casa particular, pensionado, etc.)

**Parámetros que NO deben inventarse:**
- SIS como descuento al trabajador (es del empleador)
- Aporte empleador Ley 21.735 como descuento al trabajador
- "Tramo FONASA" como variable del líquido (el descuento es 7% plano; el tramo solo afecta copagos de atención, no la liquidación)
- Tabla de impuesto anual (Global Complementario) en un cálculo mensual

**Valores / tasas / topes vigentes:**

| Concepto | Valor | Unidad | Vigencia | Etiqueta | Fuente |
|---|---:|---|---|---|---|
| Cotización obligatoria pensión | 10 | % imponible (trabajador) | permanente | VIGENTE 2026 | [Subsecretaría Previsión Social](https://previsionsocial.gob.cl/organizaciones/empresas-y-empleadores-empleadoras/cotizaciones-previsionales/) |
| Comisión AFP Uno / Modelo / PlanVital / Habitat / Capital / Cuprum / Provida | 0,46 / 0,58 / 1,16 / 1,27 / 1,44 / 1,44 / 1,45 | % imponible (trabajador) | jun-2026 | VIGENTE PERO VERIFICAR MES | [Previred jun-2026](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) |
| SIS | 1,62 | % imponible (**empleador**) | desde abr-2026 (antes 1,54%) | VIGENTE 2026 | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf); [SUSESO](https://www.suseso.gob.cl/612/w3-article-775740.html) |
| Aporte empleador Ley 21.735 | 1,0 (→ **3,5 desde ago-2026**) | % imponible (**empleador**) | ago-2025 → jul-2026 | VIGENTE 2026 | [Hacienda](https://www.hacienda.cl/noticias-y-eventos/noticias/implementacion-de-la-reforma-previsional-nueva-cotizacion-del-empleador-regira) |
| Salud FONASA | 7 | % imponible (trabajador) | permanente | VIGENTE 2026 | [Superintendencia de Salud](https://www.superdesalud.gob.cl/preguntas-frecuentes/tax-grupos-de-interes/personas-6051/beneficiarios-isapres-6059/) |
| Salud Isapre | máx(7% imponible; plan UF) | UF/% | permanente | VIGENTE 2026 | [SUSESO 4080-2019](https://www.suseso.gob.cl/612/w3-article-578426.html) |
| Cesantía indefinido | 0,6 / 2,4 | % trabajador / empleador | permanente | VIGENTE 2026 | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) |
| Cesantía plazo fijo/obra | 0 / 3,0 | % trabajador / empleador | permanente | VIGENTE 2026 | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) |
| Tope imponible AFP/salud | 90,0 | UF | 2026 (desde feb-2026) | VIGENTE 2026 | [Superintendencia de Salud](https://www.superdesalud.gob.cl/preguntas-frecuentes/tax-grupos-de-interes/personas-6051/beneficiarios-isapres-6059/) |
| Tope imponible cesantía | 135,2 (D.O. fijó 135,1 el 26-01-2026; Previred jun muestra 135,2 — **conflicto expuesto**) | UF | 2026 | VIGENTE PERO VERIFICAR MES | [Diario Oficial](https://www.diariooficial.interior.gob.cl/publicaciones/2026/01/26/44359/01/2755277.pdf); [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) |
| Tope imponible IPS | 60,0 | UF | 2026 | VIGENTE PERO VERIFICAR MES | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) |
| Ingreso mínimo mensual | 553.553 | CLP | jun-2026 | VIGENTE PERO VERIFICAR MES | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) |
| Asignación familiar tramos A/B/C/D | 22.601 / 13.870 / 4.382 / 0 | CLP | desde may-2026 | VIGENTE PERO VERIFICAR MES | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) |

Tabla IUSC mensual julio 2026 (impuesto = base × factor − rebaja; base = imponible tope 90 UF − cotizaciones del trabajador) — **VIGENTE PERO VERIFICAR MES**, [SII](https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm):

| Tramo mensual (CLP) | Factor | Rebaja (CLP) |
|---|---:|---:|
| hasta 967.261,50 | exento | — |
| 967.261,51 – 2.149.470,00 | 0,04 | 38.690,46 |
| 2.149.470,01 – 3.582.450,00 | 0,08 | 124.669,26 |
| 3.582.450,01 – 5.015.430,00 | 0,135 | 321.704,01 |
| 5.015.430,01 – 6.448.410,00 | 0,23 | 798.169,86 |
| 6.448.410,01 – 8.597.880,00 | 0,304 | 1.275.352,20 |
| 8.597.880,01 – 22.211.190,00 | 0,35 | 1.670.854,68 |
| sobre 22.211.190,01 | 0,40 | 2.781.414,18 |

La segunda tabla de la misma página SII (Art. 52 bis) es **solo para autoridades**: no usarla ([SII](https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026_art52.htm)).

**Imponible vs no imponible (nivel liquidación):** colación, movilización, viáticos, pérdida de caja, desgaste de herramientas y asignación familiar legal **no son remuneración** (Art. 41 CdT) si son de monto razonable; si exceden su fin compensatorio pasan a ser imponibles, calificación caso a caso del Inspector del Trabajo ([DT ORD. 2473/2017](https://www.dt.gob.cl/legislacion/1624/w3-article-112157.html)). En la liquidación: se suman al líquido después de cotizaciones e impuesto.

**Cálculo inverso líquido→bruto:** legítimo **solo como estimación iterativa**. No hay fórmula cerrada: el IUSC es progresivo con rebajas por tramo, la comisión depende de la AFP, los topes de 90/135,2 UF generan quiebres, la Isapre en UF rompe la proporcionalidad y los no imponibles pasan directo al líquido ([SII](https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm)). Debe declararse "aproximado" y fijar supuestos (AFP, contrato, FONASA).

**Respuesta a la pregunta de auditoría — inputs imprescindibles vs nice-to-have:** imprescindibles: bruto, AFP, FONASA/Isapre, monto plan Isapre en UF cuando aplica, tipo de contrato. Nice-to-have: no imponibles, descuentos voluntarios, inverso, APV. `saludTramo` (FONASA) no cambia el líquido: quitar o degradar a nota informativa.

**Errores frecuentes de implementaciones web:**
1. Descontar SIS (1,62%) al trabajador — es del empleador.
2. No aplicar topes 90 / 135,2 UF.
3. Usar 10% sin la comisión de la AFP elegida.
4. Aplicar la tabla anual del Global Complementario en vez de la mensual del IUSC.
5. Calcular el impuesto sobre el bruto en vez de la base tributable (imponible topada − cotizaciones del trabajador).
6. Descontar 7% fijo con Isapre de plan mayor a 7%.
7. Tratar colación/movilización como imponibles.
8. Ignorar que el plazo fijo no cotiza cesantía trabajador.
9. Descontar al trabajador el aporte del empleador de la Ley 21.735.

**Disclaimer mínimo responsable:** "Resultado referencial calculado con los indicadores del mes (UF, UTM, topes y tabla SII). No reemplaza tu liquidación de sueldo: el valor exacto depende de tu contrato, plan de salud y descuentos pactados. Verifica en tu liquidación oficial o con tu empleador."

**Fuentes canónicas:**
- [Previred — Indicadores previsionales del mes (PDF)](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf): comisiones AFP, SIS, topes, IMM, asignación familiar (consolida datos SP).
- [SII — Impuesto de Segunda Categoría, tabla mensual](https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm): tramos, factores y rebajas del mes.
- [Superintendencia de Salud — Beneficiarios Isapre (FAQ)](https://www.superdesalud.gob.cl/preguntas-frecuentes/tax-grupos-de-interes/personas-6051/beneficiarios-isapres-6059/): 7%, tope 90 UF, cotización máxima 6,3 UF.
- [SUSESO — Dictamen 4080-2019](https://www.suseso.gob.cl/612/w3-article-578426.html): descuento = valor del plan Isapre, no 7%.
- [SUSESO — Dictamen O-01-S-00831-2026](https://www.suseso.gob.cl/612/w3-article-775740.html): SIS de cargo del empleador.
- [Hacienda — implementación reforma previsional](https://www.hacienda.cl/noticias-y-eventos/noticias/implementacion-de-la-reforma-previsional-nueva-cotizacion-del-empleador-regira): calendario aporte empleador 1%→8,5%.
- [Subsecretaría de Previsión Social — cotizaciones previsionales](https://previsionsocial.gob.cl/organizaciones/empresas-y-empleadores-empleadoras/cotizaciones-previsionales/): estructura de cotizaciones y base del IUSC.
- [DT — ORD. 2473/2017](https://www.dt.gob.cl/legislacion/1624/w3-article-112157.html): no imponibles Art. 41.

**Checklist de aceptación:**
1. ¿La comisión AFP proviene de una tabla mensual actualizable y no de un hardcode viejo? sí/no
2. ¿El SIS y el aporte Ley 21.735 están excluidos del descuento al trabajador? sí/no
3. ¿Isapre usa máx(7% topado, plan UF) con UF del día? sí/no
4. ¿El tipo de contrato cambia la cesantía trabajador (0,6%/0%)? sí/no
5. ¿Se aplican topes 90 UF (AFP/salud) y 135,2 UF (cesantía) antes de calcular? sí/no
6. ¿El IUSC usa la tabla mensual del mes corriente sobre la base tributable correcta? sí/no
7. ¿Los no imponibles quedan fuera de cotizaciones e impuesto y se suman al final? sí/no
8. ¿El inverso declara ser aproximación iterativa con supuestos visibles? sí/no
9. ¿Todo input visible altera el resultado (cero fantasmas)? sí/no
10. ¿El resultado muestra mes de vigencia de los indicadores usados? sí/no

---

### B) Subsidio habitacional MINVU (DS49 / DS01 / DS19)

**Riesgo YMYL si se calcula mal:** Alto (decisiones de ahorro y postulación de familias vulnerables)
**Organismo rector:** MINVU / SERVIU regionales.
**Base legal principal:** [D.S. 49/2011 MINVU](https://www.bcn.cl/leychile/navegar?idNorma=1039424) (Fondo Solidario de Elección de Vivienda); D.S. 1/2011 MINVU (Sistema Integrado de Subsidio, tramos 1-2-3); [D.S. 19/2016 MINVU](https://www.bcn.cl/leychile/navegar?idNorma=1092547) (Integración Social y Territorial); resoluciones exentas de cada llamado (p. ej. [Res. Ex. 1720/2025 precios DS19](https://www.bcn.cl/leychile/navegar?idNorma=1218848), Res. Ex. 669/2026 llamado DS01, Res. Ex. 685/2026 llamado DS49).

**Diferencias estructurales — VIGENTE 2026 / VERIFICAR LLAMADO:**

| Programa | Tramo RSH | ¿Crédito hipotecario? | Ahorro mínimo | Tope precio vivienda | Fuente |
|---|---|---|---|---|---|
| DS49 | hasta 40% (casos especiales hasta 90% colectivo) | **No — sin deuda** | 10 UF (15 UF sobre 40% en llamados especiales) | ~950 UF (1.050 UF zonas especiales) | [SERVIU RM](https://serviumetropolitana.minvu.gob.cl/fondo-solidario-de-eleccion-de-vivienda-ds49/); [Llamado 2026](https://www.minvu.gob.cl/postulacion/llamado-en-condiciones-especiales-del-ds49-para-construccion-en-nuevos-terrenos-para-todas-las-regiones-del-pais-2026/); [díptico DS49](https://www.minvu.gob.cl/wp-content/uploads/2019/05/DS49-diptico-compra.pdf) |
| DS01 T1 | hasta 60% | opcional | 30 UF | 1.100 UF (1.200 zonas extremas), subsidio ~600 UF | [ChileAtiende T1](https://www.chileatiende.gob.cl/fichas/19094-ds-1-tramo-1-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-100-uf) |
| DS01 T2 | hasta 80% | sí (habitual) | 40 UF | **1.600 UF** (1.800 zonas extremas), subsidio ~450 UF | [ChileAtiende T2](https://www.chileatiende.gob.cl/fichas/5172-ds-1-tramo-2-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-600-uf) |
| DS01 T3 | sin tope de tramo (límite de renta sobre 90%) | sí | 80 UF | 2.200 UF (2.600 zonas extremas), subsidio ~270 UF | [ChileAtiende T3](https://www.chileatiende.gob.cl/fichas/5436-ds-1-tramo-3-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-2-200-uf) |
| DS19 | mixto: vulnerables (vía DS49) + sectores medios (vía DS1) | según perfil | según subsidio aplicado | 1.100–1.600 UF regla general; hasta 2.000 UF Aysén/Magallanes/Palena/Rapa Nui/J. Fernández; hasta 2.400–3.000 UF por resoluciones recientes en comunas definidas | [MINVU DS19](https://www.minvu.gob.cl/beneficio/vivienda/subsidio-de-integracion-social-y-territorial-ds19/); [MINVU info familias](https://www.minvu.gob.cl/beneficio/vivienda/informacion-para-familias-con-o-sin-subsidio-interesadas-en-incorporarse-a-proyectos-ds-19/); [Res. 1720/2025](https://www.bcn.cl/leychile/navegar?idNorma=1218848) |

Nota DS49: el subsidio no es un número único — SERVIU RM publica "subsidio base 800 UF" mientras el díptico de compra estructura 314 UF base + complementarios (localización 120/200 UF, densificación 110 UF, discapacidad 20/80 UF, superficie hasta 50 UF, ahorro adicional hasta 30 UF). Depende de modalidad, localización y grupo familiar ([SERVIU RM](https://serviumetropolitana.minvu.gob.cl/fondo-solidario-de-eleccion-de-vivienda-ds49/); [díptico](https://www.minvu.gob.cl/wp-content/uploads/2019/05/DS49-diptico-compra.pdf)). **VIGENTE PERO VERIFICAR LLAMADO.**

**Zona extrema:** los recargos existen y están en los propios reglamentos, activados por resolución de cada llamado: DS49 sube tope a 1.050 UF en Juan Fernández, Rapa Nui, Aysén, Magallanes, Palena, Isla Mocha, Isla Santa María; DS01 sube topes a 1.200/1.800/2.600 UF; DS19 llega a 2.000 UF (subsidio máx. 1.700 UF) en Aysén/Magallanes/Palena/Rapa Nui/J. Fernández ([díptico DS49](https://www.minvu.gob.cl/wp-content/uploads/2019/05/DS49-diptico-compra.pdf); [ChileAtiende T2](https://www.chileatiende.gob.cl/fichas/5172-ds-1-tramo-2-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-600-uf); [MINVU info familias DS19](https://www.minvu.gob.cl/beneficio/vivienda/informacion-para-familias-con-o-sin-subsidio-interesadas-en-incorporarse-a-proyectos-ds-19/)). El input `esZonaExtrema` es legítimo **solo si** el motor tiene la tabla regional; si no, quitar.

**Unidades — validación del bug:** todos los montos oficiales (ahorro, subsidio, tope de vivienda) se publican **en UF**. Una calculadora que rotula el input "UF" y luego divide por el valor de la UF (esperando CLP) subestima ~40.000×. Regla: motor interno en UF; conversión a CLP una sola vez al final (UF × valor UF del día). **Bug confirmado como real y crítico.**

**Respuesta a la pregunta de auditoría:** una calculadora seria **DEBE** pedir tipo de subsidio y tramo RSH. Tipo y tramo determinan elegibilidad (40/60/80/90%), ahorro exigido (10→80 UF), tope de vivienda (950→2.600 UF) y estructura de financiamiento (sin deuda vs con crédito). "Adivinar" produce resultados sin sentido.

**Parámetros obligatorios del cálculo correcto:** tipo de subsidio (DS49/DS01 T1-T2-T3/DS19), tramo RSH del postulante, valor de la vivienda en UF, ahorro disponible en UF, región/zona (si el motor aplica recargos).
**Parámetros opcionales / avanzados:** modalidad (compra/construcción), complementos DS49 (localización, discapacidad), bonos DS19.
**Parámetros que NO deben inventarse:** puntaje de selección, probabilidad de asignación, montos "fijos" sin citar el llamado/resolución vigente, recargo de zona extrema sin tabla regional implementada.

**Errores frecuentes de implementaciones web:**
1. Doble conversión UF→UF/CLP (dividir un input ya en UF por el valor UF).
2. Mezclar topes de programas (2.200 UF del T3 aplicado al T2).
3. Montos congelados de años anteriores (los topes cambiaron por resoluciones 2022–2025).
4. Ignorar tramo RSH (elegibilidad).
5. Prometer elegibilidad/selección (la determina SERVIU por puntaje y cupos).
6. Omitir la diferencia sin deuda (DS49) vs con crédito (DS01 T2/T3).
7. No citar la resolución del llamado vigente.

**Disclaimer mínimo responsable:** "Resultado referencial en UF: no es una postulación ni garantiza elegibilidad o asignación. Los montos, ahorros mínimos y topes cambian por resolución en cada llamado del MINVU y la selección la determina SERVIU según tu Registro Social de Hogares. Verifica el llamado vigente en minvu.gob.cl."

**Fuentes canónicas:**
- [SERVIU Metropolitano — DS49](https://serviumetropolitana.minvu.gob.cl/fondo-solidario-de-eleccion-de-vivienda-ds49/): requisitos, ahorro 10 UF, subsidio base.
- [MINVU — llamado DS49 2026](https://www.minvu.gob.cl/postulacion/llamado-en-condiciones-especiales-del-ds49-para-construccion-en-nuevos-terrenos-para-todas-las-regiones-del-pais-2026/): resolución y fechas del llamado vigente.
- [ChileAtiende — DS1 T1](https://www.chileatiende.gob.cl/fichas/19094-ds-1-tramo-1-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-100-uf), [T2](https://www.chileatiende.gob.cl/fichas/5172-ds-1-tramo-2-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-600-uf), [T3](https://www.chileatiende.gob.cl/fichas/5436-ds-1-tramo-3-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-2-200-uf): ahorros, topes y zonas extremas por tramo.
- [MINVU — DS19 beneficio](https://www.minvu.gob.cl/beneficio/vivienda/subsidio-de-integracion-social-y-territorial-ds19/) y [DS19 info familias](https://www.minvu.gob.cl/beneficio/vivienda/informacion-para-familias-con-o-sin-subsidio-interesadas-en-incorporarse-a-proyectos-ds-19/): estructura y montos DS19.
- [BCN — D.S. 49/2011](https://www.bcn.cl/leychile/navegar?idNorma=1039424), [D.S. 19/2016](https://www.bcn.cl/leychile/navegar?idNorma=1092547), [Res. Ex. 1720/2025](https://www.bcn.cl/leychile/navegar?idNorma=1218848): texto normativo y actualizaciones de precios.

**Checklist de aceptación:**
1. ¿La UI exige tipo de subsidio (DS49/DS01 T1-T2-T3/DS19)? sí/no
2. ¿La UI exige tramo RSH y lo usa para elegibilidad? sí/no
3. ¿El motor opera internamente en UF y convierte a CLP una sola vez, al final? sí/no
4. ¿Los topes por programa/tramo coinciden con el llamado vigente y citan su resolución? sí/no
5. ¿Zona extrema solo existe en UI si hay tabla regional implementada? sí/no
6. ¿El resultado dice explícitamente que no garantiza elegibilidad ni selección? sí/no
7. ¿Con tipoSubsidio ausente el motor falla de forma controlada (no crash ni basura)? sí/no
8. ¿Hay test golden por programa y tramo con montos del llamado vigente? sí/no

---

### C) Boleta de honorarios (retención + previsión independientes)

**Riesgo YMYL si se calcula mal:** Alto
**Organismo rector:** SII (retención/PPM); Subsecretaría de Previsión Social y SP (cotizaciones de independientes).
**Base legal principal:** [Ley 21.133 (2019)](https://www.bcn.cl/leychile/navegar?idNorma=1128420) — incorporación de independientes a la protección social y calendario de retención; LIR Art. 74 N°2 y 89 (retención/PPM). **Corrección al contenido del sitio:** las guías de calculadorachile.cl atribuyen el calendario a la "Ley 21.578 de 2023", que es la ley de reajuste del ingreso mínimo; el SII cita expresamente la Ley 21.133 ([SII — boletas de honorarios](https://www.sii.cl/destacados/boletas_honorarios/)). **HISTÓRICO/ERRÓNEO en el sitio: corregir la cita legal.**

**Calendario de retención (% sobre el bruto de la boleta) — [SII, aumento gradual](https://www.sii.cl/destacados/boletas_honorarios/aumento_gradual.html):**

| Año | Retención | Etiqueta |
|---|---:|---|
| 2024 | 13,75% | HISTÓRICO |
| 2025 | 14,50% | HISTÓRICO |
| **2026** | **15,25%** | **VIGENTE 2026** (desde 01-01-2026) |
| 2027 | 16,00% | futuro (legal) |
| 2028 | 17,00% | futuro (legal, salto de 1 punto) |

**Qué financia la retención:** es un anticipo que en la Operación Renta paga **primero** las cotizaciones obligatorias del independiente (pensión, salud, SIS, ATEP Ley 16.744, Ley SANNA, asignación familiar) y solo el remanente va a impuesto o devolución ([SII — noticia dic-2025](https://www.sii.cl/noticias/2025/261225noti01smn.htm); [SII — cotizaciones info general](https://www.sii.cl/destacados/renta/2025/cotizaciones_previsionales_informacion_general.html)). **El seguro de cesantía NO está incluido** (independientes no cotizan AFC). Por eso el líquido mensual de la boleta 2026 es simplemente bruto × (1 − 0,1525): **descontar AFP+salud además de la retención es contar dos veces la misma obligación**.

**Cobertura total vs parcial:** base imponible = 80% de la renta bruta anual (tope 867,6 UF); la opción de cobertura parcial (base reducida, mayor devolución) es transitoria y **desaparece en la Operación Renta 2028** ([SII — ayuda cotizaciones](https://www.sii.cl/ayudas/ayudas_por_servicios/2032-cp-2035.html); [SII — info general](https://www.sii.cl/destacados/renta/2025/cotizaciones_previsionales_informacion_general.html)). **VIGENTE 2026.**

**PPM:** si el pagador es un contribuyente obligado a retener (empresas, instituciones), retiene él; si la boleta se emite a una **persona natural** sin obligación de retener, el emisor declara y paga PPM en el F29 con la misma tasa del año ([SII — independientes](https://www.sii.cl/siieduca/aprende-con-nosotros/contribuyentes-de-tipo-profesionales-y-trabajadores-independientes.html)). Ojo: páginas educativas antiguas del SII aún dicen "10%" — usar siempre el calendario vigente.

**Parámetros obligatorios del cálculo correcto:** monto bruto; **año de emisión** (define la tasa 13,75/14,5/15,25/16/17%); quién retiene (pagador obligado vs PPM propio).
**Parámetros opcionales / avanzados:** desglose informativo de a qué van las cotizaciones en la Operación Renta; cobertura total vs parcial (solo como estimación anual); costo empresa.
**Parámetros que NO deben inventarse:** descuento mensual adicional de AFP/salud sobre el líquido; "impuesto final" igual a la retención (la retención es provisional; el impuesto real se determina en abril con el F22); cesantía para independientes.

**Errores frecuentes de implementaciones web:**
1. Doble cotización: restar AFP+salud además de la retención.
2. Tasa de año equivocado (14,5% o 10% en 2026).
3. Confundir retención (anticipo) con impuesto final.
4. Ignorar el caso PPM (boleta a persona natural).
5. Confundir renta bruta con imponible (la imponible es el 80% de la bruta).
6. Citar la ley equivocada (21.578 en vez de 21.133).

**Disclaimer mínimo responsable:** "El líquido mostrado descuenta solo la retención legal del año (15,25% en 2026). Tu impuesto y cotizaciones definitivos se calculan una vez al año en la Operación Renta del SII y pueden generar devolución o pago adicional. Resultado referencial, no es información oficial del SII."

**Fuentes canónicas:**
- [SII — Boletas de honorarios (destacado 2026)](https://www.sii.cl/destacados/boletas_honorarios/): tasa 15,25% vigente y simulador oficial.
- [SII — Calendario de aumento gradual](https://www.sii.cl/destacados/boletas_honorarios/aumento_gradual.html): tabla completa 2020–2028.
- [SII — Cotizaciones previsionales, información general](https://www.sii.cl/destacados/renta/2025/cotizaciones_previsionales_informacion_general.html): qué paga la retención y cobertura total/parcial.
- [SII — Ayuda cotizaciones independientes](https://www.sii.cl/ayudas/ayudas_por_servicios/2032-cp-2035.html): base imponible 80%, tope 867,6 UF.
- [BCN — Ley 21.133](https://www.bcn.cl/leychile/navegar?idNorma=1128420): texto legal.
- [SII — FAQ tasas por año](https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_7297.htm): confirmación por año comercial.

**Checklist de aceptación:**
1. ¿El año de emisión es input y cambia la tasa? sí/no
2. ¿La tasa 2026 es 15,25% y hay tabla por año hasta 2028? sí/no
3. ¿El líquido NO descuenta AFP/salud adicionales? sí/no
4. ¿Existe el caso "boleta a persona natural" (PPM propio)? sí/no
5. ¿Se explica que la retención es provisional (Operación Renta)? sí/no
6. ¿La cita legal es Ley 21.133? sí/no
7. ¿Test golden por cada año 2024–2028? sí/no

---

### D) Finiquito laboral

**Riesgo YMYL si se calcula mal:** Alto
**Organismo rector:** Dirección del Trabajo; tribunales laborales (recargos).
**Base legal principal:** Código del Trabajo Arts. 159–161 (causales), 162 (aviso previo), 163 (indemnización años de servicio), 168 (recargos judiciales), 172 (base de cálculo), 67/73 (feriado), 50 (gratificación), 177 (formalidades y plazo — 10 días hábiles, incorporado por Ley 20.684; la [Ley 21.361](https://www.bcn.cl/leychile/navegar?idNorma=1162963) regula el finiquito electrónico).

**Valores / reglas vigentes:**

| Concepto | Regla | Unidad | Etiqueta | Fuente |
|---|---|---|---|---|
| Indemnización años de servicio | 30 días por año y fracción >6 meses; requiere contrato ≥1 año | días de remuneración | VIGENTE 2026 | [DT ORD. 1480](https://www.dt.gob.cl/legislacion/1624/w3-article-111687.html) |
| Tope de años | 330 días (11 años), contratos desde 14-08-1981 | días | VIGENTE 2026 | [DT ORD. 2818](https://www.dt.gob.cl/legislacion/1624/w3-article-109587.html) |
| Base de cálculo (Art. 172) | última remuneración mensual; excluye asignación familiar, sobretiempo y beneficios esporádicos; variable = promedio 3 últimos meses | CLP | VIGENTE 2026 | [DT ORD. 1480](https://www.dt.gob.cl/legislacion/1624/w3-article-111687.html) |
| Tope de la base | 90 UF del último día del mes anterior al pago | UF | VIGENTE 2026 | [DT ORD. 1480](https://www.dt.gob.cl/legislacion/1624/w3-article-111687.html) |
| Aviso previo (Art. 162) | 30 días o indemnización sustitutiva de 1 remuneración (tope 90 UF), compatible con la de años de servicio | días/CLP | VIGENTE 2026 | [DT — despido Art. 161](https://www.dt.gob.cl/portal/1628/w3-article-60533.html) |
| Recargos Art. 168 | +30% (161 improcedente) / +50% (159 injustificado o sin causal) / +80% (160 indebido) / +100% (160 N°1,5,6 sin motivo plausible); **solo por sentencia**; demanda en 60 días hábiles | % sobre indemnización años de servicio | VIGENTE 2026 | [SUSESO — Art. 168](https://www.suseso.gob.cl/612/w3-propertyvalue-69859.html) |
| Feriado proporcional | 1,25 días hábiles por mes trabajado + fracción; se agregan inhábiles incidentes; no aplica a contratos ≤30 días | días | VIGENTE 2026 | [DT — cálculo](https://www.dt.gob.cl/portal/1628/w3-article-60200.html); [DT ≤30 días](https://www.dt.gob.cl/portal/1628/w3-article-60205.html) |
| Feriado pendiente | se paga cualquiera sea la causal (Art. 73); base 15 días hábiles/año (20 en regiones extremas) | días | VIGENTE 2026 | [DT ORD. 3838/192](https://www.dt.gob.cl/legislacion/1624/w3-article-63540.html); [DT feriado](https://www.dt.gob.cl/portal/1628/w3-article-60177.html) |
| Gratificación proporcional | Art. 50: 25% de lo devengado, tope 4,75 IMM anual (tope no se prorratea; la base sí baja por meses no trabajados) | CLP / IMM | VIGENTE 2026 | [DT ORD. 5623](https://www.dt.gob.cl/legislacion/1624/w3-article-114038.html); [DT finiquito](https://www.dt.gob.cl/portal/1628/w3-article-60204.html) |
| Plazo pago finiquito | 10 días hábiles desde la separación; ratificación ante ministro de fe | días hábiles | VIGENTE 2026 | [DT ORD. 3866/42](https://www.dt.gob.cl/legislacion/1624/w3-article-102513.html); [DT ratificación](https://www.dt.gob.cl/portal/1628/w3-article-60618.html) |

**Mapa de causales:**

| Causal | ¿Indemnización años de servicio? | ¿Aviso previo/sustitutiva? |
|---|---|---|
| Art. 159 (renuncia, mutuo acuerdo, plazo, obra, caso fortuito) | No (salvo pacto) | No |
| Art. 160 (imputables al trabajador) | No | No |
| Art. 161 (necesidades de la empresa / desahucio) | **Sí** | **Sí** (30 días o sustitutiva) |
| Despido declarado injustificado (juicio) | Sí + recargo Art. 168 | según causal original |

Fuente: [DT — causales de término](https://www.dt.gob.cl/portal/1628/w3-article-60570.html).

**Parámetros obligatorios del cálculo correcto:** causal de término; última remuneración según Art. 172 (o promedio 3 meses si variable); antigüedad (años + fracción >6 meses); días de feriado pendiente y proporcional; si el empleador dio aviso con 30 días o no (solo causal 161); régimen de gratificación.
**Parámetros opcionales / avanzados:** recargo Art. 168 como **escenario judicial** claramente rotulado (0/30/50/80/100%); vacaciones de años anteriores acumuladas; gratificación proporcional del ejercicio.
**Parámetros que NO deben inventarse:** recargos automáticos del 168; indemnización en causales 159/160; base sin tope 90 UF; "multa 168" (es recargo indemnizatorio, no multa).

**Errores frecuentes de implementaciones web:**
1. Mostrar el Art. 168 como monto garantizado (es judicial; además el naming "tieneMulta168" boolean no mapea a un recargo de 0/30/50/80/100%).
2. Omitir el tope 90 UF de la base y el tope 330 días.
3. No contar la fracción >6 meses como año completo.
4. Incluir horas extra o asignación familiar en la base Art. 172.
5. Ignorar el aviso previo sustitutivo en despidos Art. 161.
6. Feriado proporcional sin agregar los días inhábiles incidentes.
7. Pagar indemnización en renuncia (Art. 159) — no corresponde.

**Disclaimer mínimo responsable:** "Cálculo referencial según Código del Trabajo: el monto real depende de tu causal, contrato y remuneraciones efectivas, y los recargos por despido injustificado solo los fija un tribunal. No reemplaza asesoría legal ni el finiquito ratificado ante ministro de fe."

**Fuentes canónicas:**
- [DT — ORD. 1480](https://www.dt.gob.cl/legislacion/1624/w3-article-111687.html): Art. 163 y base Art. 172 con tope 90 UF.
- [DT — causales de término](https://www.dt.gob.cl/portal/1628/w3-article-60570.html): mapa 159/160/161.
- [SUSESO — recargos Art. 168](https://www.suseso.gob.cl/612/w3-propertyvalue-69859.html): porcentajes y carácter judicial.
- [DT — feriado proporcional](https://www.dt.gob.cl/portal/1628/w3-article-60200.html): fórmula oficial 1,25 días/mes.
- [DT — ORD. 5623](https://www.dt.gob.cl/legislacion/1624/w3-article-114038.html): gratificación Art. 50 y tope 4,75 IMM.
- [DT — ORD. 3866/42](https://www.dt.gob.cl/legislacion/1624/w3-article-102513.html): plazo 10 días hábiles.
- [BCN — Ley 21.361](https://www.bcn.cl/leychile/navegar?idNorma=1162963): finiquito electrónico.

**Checklist de aceptación:**
1. ¿La causal determina qué partidas se pagan? sí/no
2. ¿Base Art. 172 con tope 90 UF y exclusiones correctas? sí/no
3. ¿Tope 330 días y fracción >6 meses implementados? sí/no
4. ¿Aviso previo sustitutivo solo en Art. 161 y cableado en UI? sí/no
5. ¿Art. 168 rotulado como escenario judicial con selector 0/30/50/80/100%? sí/no
6. ¿Feriado proporcional con fórmula DT (1,25 + inhábiles)? sí/no
7. ¿Vacaciones de años anteriores sumables y cableadas? sí/no
8. ¿Ningún campo de fecha visible que no calcule antigüedad? sí/no
9. ¿Disclaimer aclara que no promete resultado judicial ni "oficial DT"? sí/no

---

### E) Horas extraordinarias

**Riesgo YMYL si se calcula mal:** Medio-Alto
**Organismo rector:** Dirección del Trabajo.
**Base legal principal:** Código del Trabajo Arts. 30–32 ([texto vigente, BCN](https://www.bcn.cl/leychile/navegar?idNorma=207436)); Ley 21.561 (reducción de jornada); Art. 38 (descanso dominical); Ley 21.164 / normativa de comercio (recargo 30% domingo).

**Reglas y valores vigentes:**

| Concepto | Valor / regla | Etiqueta | Fuente |
|---|---|---|---|
| Recargo mínimo | 50% sobre el sueldo convenido (mínimo legal; base = IMM si el sueldo es menor) | VIGENTE 2026 | [BCN — CdT Art. 32](https://www.bcn.cl/leychile/navegar?idNorma=207436) |
| Máximo diario | 2 horas extra/día; solo necesidades temporales; pacto escrito ≤3 meses renovable | VIGENTE 2026 | [BCN — CdT Arts. 31-32](https://www.bcn.cl/leychile/navegar?idNorma=207436) |
| **Jornada máxima HOY** | **42 horas desde el 26-04-2026** (44 h entre 26-04-2024 y 25-04-2026; 40 h desde 26-04-2028) | VIGENTE 2026 | [DT — calendario Ley 21.561 (PDF)](https://www.dt.gob.cl/legislacion/1624/articles-129008_recurso_pdf.pdf) |
| Valor hora (jornada 42 h) | sueldo/30 × 28/168 → hora extra = sueldo × **0,0083333** (incluye 50%) | VIGENTE 2026 | [DT — valor hora extraordinaria (act. 28-04-2026)](https://www.dt.gob.cl/portal/1628/w3-article-95182.html) |
| Factores por jornada | 45 h: 0,0077778 (HISTÓRICO) · 44 h: 0,0079545 (HISTÓRICO desde 26-04-2026) · **42 h: 0,0083333 (VIGENTE)** · 40 h: 0,0087500 (desde 2028) | mixto | [DT](https://www.dt.gob.cl/portal/1628/w3-article-95182.html) |
| Domingo/festivo | mismo 50% legal; las horas en domingo son extra solo si exceden la jornada ordinaria semanal (trabajadores exceptuados Art. 38); recargos mayores = convención colectiva (**PRÁCTICA DE MERCADO/contractual**) | VIGENTE 2026 | [DT — descanso dominical](https://www.dt.gob.cl/portal/1628/w3-article-60255.html) |
| Comercio en domingo | recargo 30% sobre horas **ordinarias** trabajadas en domingo (no confundir con hora extra) | VIGENTE 2026 | [DT — recargo 30% comercio](https://www.dt.gob.cl/portal/1628/w3-article-105587.html) |
| Recargo nocturno | **NO existe recargo nocturno legal automático**: el 50% aplica igual en horario nocturno; más solo por pacto | VIGENTE 2026 | [DT — horas extra nocturnas](https://www.dt.gob.cl/portal/1628/w3-article-60173.html) |

**Parámetros obligatorios del cálculo correcto:** sueldo base mensual (o el IMM si es menor); número de horas extra; **jornada semanal pactada** (≤42 h hoy — define el divisor).
**Parámetros opcionales / avanzados:** recargo pactado superior al 50%; caso comercio-domingo (recargo 30% sobre ordinarias); semana corrida.
**Parámetros que NO deben inventarse:** recargo nocturno automático; recargo legal especial de festivos distinto del 50%; jornadas de 45 h como vigentes.

**Errores frecuentes de implementaciones web:**
1. Divisor 180 (45 h) o 176 (44 h) después del 26-04-2026: subestima ~4,8% cada hora.
2. Input "horas nocturnas" con recargo inventado.
3. Tratar todo domingo como hora extra (para exceptuados del descanso dominical solo el exceso sobre la jornada semanal es extra).
4. No usar el IMM como piso de la base.
5. Ignorar el máximo legal de 2 h/día (sin advertirlo).

**Disclaimer mínimo responsable:** "Valor calculado con el recargo legal mínimo del 50% y la jornada máxima vigente (42 horas desde abril 2026). Tu contrato o convenio colectivo puede pactar recargos mayores. Resultado referencial según la fórmula de la Dirección del Trabajo."

**Fuentes canónicas:**
- [DT — valor de la hora extraordinaria](https://www.dt.gob.cl/portal/1628/w3-article-95182.html): fórmula y factor vigente con 42 h.
- [DT — calendario Ley 21.561 (PDF)](https://www.dt.gob.cl/legislacion/1624/articles-129008_recurso_pdf.pdf): hitos 44/42/40.
- [BCN — Código del Trabajo](https://www.bcn.cl/leychile/navegar?idNorma=207436): Arts. 30–32 y 38.
- [DT — recargo nocturno](https://www.dt.gob.cl/portal/1628/w3-article-60173.html): inexistencia de recargo nocturno automático.
- [DT — recargo 30% comercio domingo](https://www.dt.gob.cl/portal/1628/w3-article-105587.html): caso especial comercio.

**Checklist de aceptación:**
1. ¿La jornada semanal es input y el divisor sale de ella (168 hoy)? sí/no
2. ¿El default de jornada es 42 h con fecha de vigencia visible? sí/no
3. ¿No existe ningún input "nocturnas" con recargo automático? sí/no
4. ¿Domingo/festivo se maneja como 50% legal + nota de convenios? sí/no
5. ¿Se usa IMM como piso de base cuando corresponde? sí/no
6. ¿Advertencia del máximo 2 h/día? sí/no
7. ¿Tests golden para 44 h (histórico) y 42 h (vigente) con montos exactos? sí/no

---

### F) Crédito hipotecario (simulador)

**Riesgo YMYL si se calcula mal:** Alto (decisión financiera de largo plazo)
**Organismo rector:** CMF (bancos y seguros); SERNAC (información al consumidor).
**Base legal principal:** [Ley 20.555](https://www.bcn.cl/leychile/Navegar?idNorma=1032865) (CAE y SERNAC Financiero); [DFL 251 Art. 40](https://www.bcn.cl/leychile/navegar?idNorma=5201&idVersion=2019-01-12&idParte=100022198) (seguros asociados y licitación); [Ley 18.010 Art. 10](https://www.bcn.cl/leychile/navegar?idNorma=29438) (prepago).

**Conceptos y reglas:**

| Concepto | Regla | Etiqueta | Fuente |
|---|---|---|---|
| Dividendo | cuota periódica = amortización + intereses + seguros | VIGENTE 2026 | [CMF Cliente Bancario](https://clientebancario.cl/clientebancario/credito-hipotecario-como-comparar.html) |
| CAE | indicador % único (capital, tasa, plazo, todos los seguros y cargos): la métrica legal de comparación | VIGENTE 2026 | [SERNAC — CAE](https://www.sernac.cl/portal/618/w3-article-11834.html); [Ley 20.555](https://www.bcn.cl/leychile/Navegar?idNorma=1032865) |
| Seguro desgravamen e incendio | exigidos en la operatoria del DFL 251 Art. 40; contratación **colectiva por licitación**, con derecho del deudor a contratar póliza individual equivalente | VIGENTE 2026 | [BCN — DFL 251 Art. 40](https://www.bcn.cl/leychile/navegar?idNorma=5201&idVersion=2019-01-12&idParte=100022198) |
| Sismo / salida de mar | cobertura complementaria habitual exigida por bancos | PRÁCTICA DE MERCADO (no ley general) | [BCN — DFL 251 Art. 40](https://www.bcn.cl/leychile/navegar?idNorma=5201&idVersion=2019-01-12&idParte=100022198) |
| Simulación vs oferta | la simulación es **referencial y no vinculante**, "no constituye un análisis crediticio"; la cotización sí es propuesta vinculante | VIGENTE 2026 | [Simulador CMF](https://servicios.cmfchile.cl/simuladorhipotecario/aplicacion?indice=101.2.3) |
| Costos excluidos típicos del simulador | impuesto de timbres, gastos notariales y Conservador de Bienes Raíces | VIGENTE 2026 | [Simulador CMF](https://servicios.cmfchile.cl/simuladorhipotecario/aplicacion?indice=101.2.3) |
| Prepago (≤5.000 UF) | irrenunciable; comisión máx: 1 mes de intereses (no reajustable) / 1,5 meses (reajustable); prepago parcial <10% del saldo requiere consentimiento del acreedor | VIGENTE 2026 | [BCN — Ley 18.010 Art. 10](https://www.bcn.cl/leychile/navegar?idNorma=29438) |

**Parámetros obligatorios del cálculo correcto (simulación educativa):** monto del crédito en UF; pie en UF; plazo en años; tasa anual (del usuario, rotulada como supuesta).
**Parámetros opcionales / avanzados:** seguros mensuales estimados (rotulados PRÁCTICA DE MERCADO), CAE resultante si se incluyen todos los costos, tabla de amortización, escenario de prepago con comisión legal.
**Parámetros que NO deben inventarse:** CAE "oficial" sin incluir seguros/cargos reales; tasas de mercado presentadas como oferta; aprobación crediticia; costos de originación exactos.

**Errores frecuentes de implementaciones web:**
1. Mostrar tooltips/campos de CAE, seguros y prepago que no afectan el resultado (promesa falsa).
2. Confundir dividendo con cuota sin seguros y llamarlo "dividendo total".
3. Presentar la simulación como equivalente a una oferta bancaria.
4. Omitir que el prepago tiene comisión legal máxima y umbral del 10%.
5. No advertir la exclusión de impuestos/gastos notariales/CBR.

**Disclaimer mínimo responsable:** "Simulación educativa con la tasa que tú ingresas: no es una oferta ni una evaluación crediticia. El dividendo real incluye seguros y otros cargos, y se compara entre bancos con la CAE. Cotiza formalmente en instituciones fiscalizadas por la CMF antes de decidir."

**Fuentes canónicas:**
- [CMF — Simulador hipotecario oficial](https://servicios.cmfchile.cl/simuladorhipotecario/aplicacion?indice=101.2.3): advertencias modelo de no vinculación.
- [CMF Cliente Bancario — cómo comparar créditos hipotecarios](https://clientebancario.cl/clientebancario/credito-hipotecario-como-comparar.html): dividendo, CAE, CTC.
- [SERNAC — qué es la CAE](https://www.sernac.cl/portal/618/w3-article-11834.html): definición legal de la CAE.
- [BCN — DFL 251 Art. 40](https://www.bcn.cl/leychile/navegar?idNorma=5201&idVersion=2019-01-12&idParte=100022198): seguros y licitación.
- [BCN — Ley 18.010](https://www.bcn.cl/leychile/navegar?idNorma=29438): prepago.

**Checklist de aceptación:**
1. ¿Todo campo visible (seguros, CAE, prepago) altera el resultado o fue eliminado? sí/no
2. ¿El resultado distingue "dividendo sin seguros" de "dividendo total estimado"? sí/no
3. ¿Los seguros están rotulados como estimación de mercado, no ley? sí/no
4. ¿Existe advertencia explícita "no es oferta ni evaluación crediticia (CMF)"? sí/no
5. ¿El prepago usa la comisión legal máxima correcta según reajustabilidad? sí/no
6. ¿La UI opera en UF y muestra conversión CLP con UF del día citada? sí/no

---

### G) UF / UTM / IVA

**Riesgo YMYL si se calcula mal:** Bajo-Medio (es insumo de todas las demás)
**Organismo rector:** Banco Central de Chile (UF); SII (UTM, IVA).
**Base legal principal:** LOC del Banco Central Art. 35 N°9 y Compendio de Normas Financieras Cap. II.B.3 (UF); DL 830 (UTM); DL 825 Art. 14 (IVA).

| Concepto | Valor / regla | Etiqueta | Fuente |
|---|---|---|---|
| UF | reajuste **diario**, publicada del día 10 de cada mes al 9 del siguiente según IPC del mes anterior; valor 08-07-2026: $40.839,35 | VIGENTE PERO VERIFICAR DÍA | [CMF — documentación UF](https://api.cmfchile.cl/documentacion/UF.html); [BCCh — indicadores diarios](https://si3.bcentral.cl/indicadoressiete/secure/indicadoresdiarios.aspx); [serie UF](https://si3.bcentral.cl/Indicadoressiete/secure/Serie.aspx?gcode=UF) |
| UTM | mensual, publicada por el SII; jul-2026: **$71.649** (jun: $71.506) · UTA = UTM × 12 | VIGENTE PERO VERIFICAR MES | [SII — UTM 2026](https://www.sii.cl/valores_y_fechas/utm/utm2026.htm) |
| IVA | **19%** sobre base imponible (DL 825 Art. 14, tasa desde 2003); mecanismo débito/crédito; redondeo al peso | VIGENTE 2026 | [SII — DL 825 (PDF)](https://www.sii.cl/normativa_legislacion/dl825.pdf); [BCN — DL 825](https://www.bcn.cl/leychile/navegar?idNorma=6369) |

**Buenas prácticas de cita del valor UF:** mostrar fecha exacta del valor usado ("UF del 08-07-2026: $40.839,35, Banco Central"), refrescar diariamente desde la serie oficial del BCCh (o CMF API), y nunca congelar la UF en una constante de código. Advertencia: páginas antiguas del reglamento del SII aún muestran IVA 17% — **HISTÓRICO/DEROGADO**, no usar.

**Parámetros obligatorios:** monto y dirección de conversión (UF→CLP o CLP→UF); valor UF del día citado con fecha.
**Parámetros que NO deben inventarse:** histórico/proyección/gráficos si no hay serie de datos implementada (los 6 inputs fantasma detectados deben eliminarse o conectarse a la serie oficial del BCCh).

**Errores frecuentes:**
1. UF hardcodeada o desactualizada sin fecha.
2. Prometer histórico/proyección sin API de series.
3. IVA con redondeos inconsistentes entre neto→bruto y bruto→neto.
4. Confundir UTM del mes con UTM promedio o anual.

**Disclaimer mínimo responsable:** "Valores UF y UTM obtenidos de fuentes oficiales (Banco Central y SII) para la fecha indicada. Para operaciones formales usa el valor publicado del día exacto de tu operación."

**Fuentes canónicas:**
- [BCCh — indicadores diarios](https://si3.bcentral.cl/indicadoressiete/secure/indicadoresdiarios.aspx) y [serie UF](https://si3.bcentral.cl/Indicadoressiete/secure/Serie.aspx?gcode=UF): valor diario oficial.
- [SII — UTM/UTA/IPC 2026](https://www.sii.cl/valores_y_fechas/utm/utm2026.htm): tabla mensual.
- [SII — DL 825](https://www.sii.cl/normativa_legislacion/dl825.pdf): tasa IVA 19%.

**Checklist de aceptación:**
1. ¿UF viene de serie oficial actualizada y muestra su fecha? sí/no
2. ¿UTM del mes correcto? sí/no
3. ¿IVA 19% con redondeo documentado y simétrico? sí/no
4. ¿Inputs de histórico/proyección eliminados o respaldados por serie real? sí/no
5. ¿Conversión inversa (CLP→UF) usa el mismo valor citado? sí/no

---

### H) Comparador de comisiones AFP

**Riesgo YMYL si se calcula mal:** Medio
**Organismo rector:** Superintendencia de Pensiones.
**Base legal principal:** DL 3.500 (comisiones, Art. 17 y ss.); normativa SP sobre publicación de comisiones (Compendio de Normas del Sistema de Pensiones); avisos de cambio: 30 días (rebaja) / 90 días (alza).

**Tabla de comisiones (dependientes, % sobre renta imponible) — VIGENTE PERO VERIFICAR MES:**

| AFP | Comisión | Total descuento trabajador (10% + comisión) |
|---|---:|---:|
| Uno | 0,46% | 10,46% |
| Modelo | 0,58% | 10,58% |
| PlanVital | 1,16% | 11,16% |
| Habitat | 1,27% | 11,27% |
| Capital | 1,44% | 11,44% |
| Cuprum | 1,44% | 11,44% |
| Provida | 1,45% | 11,45% |

Fuente: [Previred jun-2026 (PDF)](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf), que declara como fuente a la SP. La tabla primaria en spensiones.cl no fue accesible en esta sesión (bloqueo del sitio): reverificar mensualmente contra [SP — Infórmate y Decide](https://www.spensiones.cl/infoafp/). SIS 1,62% (empleador) no debe sumarse al descuento del trabajador. AFP Uno mantiene la licitación de nuevos afiliados 2025–2027 (**VIGENTE PERO VERIFICAR MES**).

**Qué se puede comparar con seriedad:** comisión % y su costo mensual en CLP para una renta dada (con tope 90 UF); diferencia anual entre AFP en CLP. **Qué es engañoso:** proyectar pensión solo con la comisión (la rentabilidad del fondo domina el resultado de largo plazo — la SP publica rentabilidad por multifondo A–E y esta varía por periodo); presentar rentabilidad pasada como garantía futura; ordenar AFP como "mejor" solo por comisión ([SP — Infórmate y Decide](https://www.spensiones.cl/infoafp/)).

**Parámetros obligatorios:** renta imponible (con tope 90 UF); tabla de comisiones del mes.
**Parámetros opcionales / avanzados:** horizonte en años para acumular la diferencia de comisión (sin proyectar pensión); nota de rentabilidad por fondo con fuente SP.
**Parámetros que NO deben inventarse:** pensión proyectada sin modelo de rentabilidad; "ranking de mejor AFP"; rentabilidades futuras.

**Errores frecuentes:**
1. Comparar comisión ignorando el tope imponible.
2. Proyectar pensiones sin rentabilidad ni disclaimers.
3. Tabla de comisiones desactualizada (cambian con aviso de 30/90 días).
4. Sumar el SIS al costo del trabajador.

**Disclaimer mínimo responsable:** "Comparación solo de comisiones de administración vigentes: no considera la rentabilidad de los fondos, que puede impactar tu pensión mucho más que la comisión. Verifica los valores del mes en spensiones.cl antes de cambiarte."

**Fuentes canónicas:**
- [SP — Infórmate y Decide](https://www.spensiones.cl/infoafp/): comparador y metodología oficial.
- [Previred — indicadores del mes (PDF)](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf): tabla mensual consolidada de comisiones.

**Checklist de aceptación:**
1. ¿Comisiones actualizadas mensualmente con fecha visible? sí/no
2. ¿El costo mensual respeta el tope 90 UF? sí/no
3. ¿Sin proyección de pensión ni ranking de "mejor AFP"? sí/no
4. ¿SIS excluido del costo del trabajador? sí/no
5. ¿Disclaimer menciona rentabilidad como factor dominante? sí/no

---

## 2. Matriz de inputs "honestos"

Validación normativa de los inputs problemáticos detectados en la auditoría de wiring (2026-07-08). "Debe existir" = el input es necesario para un cálculo correcto; si existe, DEBE estar cableado.

| Calculadora | Input | ¿Debe existir en UI? | ¿Cambia el resultado legal/financiero? | Severidad si es fantasma | Fuente |
|---|---|---|---|---|---|
| sueldo-liquido | isapreMonto (UF) | **Sí** | **Sí** — descuento = máx(7%, plan UF) | **Crítica** | [SUSESO 4080-2019](https://www.suseso.gob.cl/612/w3-article-578426.html) |
| sueldo-liquido | contratoIndefinido | **Sí** | **Sí** — 0,6% vs 0% cesantía trabajador | **Crítica** (default silencioso miente) | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) |
| sueldo-liquido | bonos colación/movilización | Sí (opcional) | Sí — no imponibles, pasan directo al líquido | Alta | [DT ORD. 2473](https://www.dt.gob.cl/legislacion/1624/w3-article-112157.html) |
| sueldo-liquido | saludTramo (FONASA) | **No** (o solo informativo) | No — el descuento es 7% plano | Media (confunde) | [Superintendencia de Salud](https://www.superdesalud.gob.cl/preguntas-frecuentes/tax-grupos-de-interes/personas-6051/beneficiarios-isapres-6059/) |
| sueldo-liquido | calculoInverso | Opcional (si se expone, cablear) | Sí — modo de cálculo distinto (iterativo) | Alta | [SII — IUSC](https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm) |
| finiquito | incluyeAvisoPrevio | **Sí** (solo causal 161) | **Sí** — +1 remuneración (tope 90 UF) | **Crítica** (subestima despidos) | [DT ORD. 1480](https://www.dt.gob.cl/legislacion/1624/w3-article-111687.html) |
| finiquito | recargo Art. 168 | Sí, como **escenario judicial** selector 0/30/50/80/100% (no boolean "multa") | Sí — hasta duplica la indemnización, pero solo por sentencia | Alta (naming roto induce error) | [SUSESO Art. 168](https://www.suseso.gob.cl/612/w3-propertyvalue-69859.html) |
| finiquito | vacaciones años anteriores | **Sí** | **Sí** — feriado pendiente se paga siempre (Art. 73) | Alta | [DT ORD. 3838/192](https://www.dt.gob.cl/legislacion/1624/w3-article-63540.html) |
| finiquito | fechaInicio/Termino sin cálculo | No (si no calculan antigüedad) | No en el estado actual | Media (engaña) | [DT ORD. 1480](https://www.dt.gob.cl/legislacion/1624/w3-article-111687.html) |
| boleta | año de retención | **Sí** | **Sí** — 13,75%→17% según año | **Crítica** | [SII aumento gradual](https://www.sii.cl/destacados/boletas_honorarios/aumento_gradual.html) |
| boleta | "incluir cotizaciones" además de retención | **No** como descuento adicional (solo desglose informativo) | No debe cambiar el líquido mensual | **Crítica si descuenta** (doble cobro) | [SII cotizaciones](https://www.sii.cl/destacados/renta/2025/cotizaciones_previsionales_informacion_general.html) |
| horas-extra | jornada semanal 40/42/44/45 | **Sí** (default 42) | **Sí** — divisor 160/168/176/180 | **Crítica** post 26-04-2026 | [DT valor hora](https://www.dt.gob.cl/portal/1628/w3-article-95182.html) |
| horas-extra | horas festivas | Sí (si el motor las distingue) | Sí para exceptuados Art. 38 / comercio 30% | Alta | [DT Art. 38](https://www.dt.gob.cl/portal/1628/w3-article-60255.html) |
| horas-extra | "nocturnas" | **No — eliminar** | No — no existe recargo legal | Alta (inventa derecho) | [DT nocturno](https://www.dt.gob.cl/portal/1628/w3-article-60173.html) |
| hipotecario | CAE | Opcional (solo si se calcula con seguros/cargos reales) | Sí cuando incluye costos | Alta | [SERNAC CAE](https://www.sernac.cl/portal/618/w3-article-11834.html) |
| hipotecario | seguros | Opcional (rotulado PRÁCTICA DE MERCADO) | Sí — cambian el dividendo total | Alta | [DFL 251 Art. 40](https://www.bcn.cl/leychile/navegar?idNorma=5201&idVersion=2019-01-12&idParte=100022198) |
| hipotecario | prepago | Opcional | Sí — comisión legal máxima | Media | [Ley 18.010 Art. 10](https://www.bcn.cl/leychile/navegar?idNorma=29438) |
| subsidio | tipoSubsidio DS49/DS01/DS19 | **Sí — obligatorio** | **Sí** — cambia todo (elegibilidad, ahorro, topes) | **Crítica** (hoy además crashea) | [ChileAtiende T1-T3](https://www.chileatiende.gob.cl/fichas/19094-ds-1-tramo-1-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-100-uf) |
| subsidio | tramo RSH | **Sí — obligatorio** | **Sí** — elegibilidad 40/60/80/90% | **Crítica** | [SERVIU DS49](https://serviumetropolitana.minvu.gob.cl/fondo-solidario-de-eleccion-de-vivienda-ds49/) |
| subsidio | zona extrema | Solo si hay tabla regional en el motor | Sí — topes +100 a +400 UF | Alta | [ChileAtiende T2](https://www.chileatiende.gob.cl/fichas/5172-ds-1-tramo-2-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-600-uf) |
| subsidio | unidad UF vs CLP | **Sí — UF interna, CLP solo al final** | **Sí** — bug actual subestima ~40.000× | **Crítica** | [ChileAtiende T1](https://www.chileatiende.gob.cl/fichas/19094-ds-1-tramo-1-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-100-uf) |
| uf-clp | histórico / proyección | **No** (sin serie BCCh implementada) | Solo si existe la serie | Media | [BCCh serie UF](https://si3.bcentral.cl/Indicadoressiete/secure/Serie.aspx?gcode=UF) |

---

## 3. Tabla de constantes 2026 "candidatas a código"

| constante | valor | unidad | vigencia desde | organismo | URL | confianza |
|---|---:|---|---|---|---|---|
| COTIZACION_PENSION | 10 | % | permanente | SP | [previsionsocial.gob.cl](https://previsionsocial.gob.cl/organizaciones/empresas-y-empleadores-empleadoras/cotizaciones-previsionales/) | alta |
| COMISION_AFP_UNO | 0,46 | % | jun-2026 | SP (vía Previred) | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) | media (SP bloqueada) |
| COMISION_AFP_MODELO | 0,58 | % | jun-2026 | SP (vía Previred) | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) | media |
| COMISION_AFP_PLANVITAL | 1,16 | % | jun-2026 | SP (vía Previred) | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) | media |
| COMISION_AFP_HABITAT | 1,27 | % | jun-2026 | SP (vía Previred) | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) | media |
| COMISION_AFP_CAPITAL | 1,44 | % | jun-2026 | SP (vía Previred) | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) | media |
| COMISION_AFP_CUPRUM | 1,44 | % | jun-2026 | SP (vía Previred) | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) | media |
| COMISION_AFP_PROVIDA | 1,45 | % | jun-2026 | SP (vía Previred) | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) | media |
| TASA_SIS (cargo empleador) | 1,62 | % | abr-2026 | SP | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) | alta |
| APORTE_EMPLEADOR_L21735 | 1,0 (→3,5 en ago-2026) | % | ago-2025 | Hacienda/SP | [Hacienda](https://www.hacienda.cl/noticias-y-eventos/noticias/implementacion-de-la-reforma-previsional-nueva-cotizacion-del-empleador-regira) | alta |
| SALUD_LEGAL | 7 | % | permanente | Superintendencia de Salud | [superdesalud.gob.cl](https://www.superdesalud.gob.cl/preguntas-frecuentes/tax-grupos-de-interes/personas-6051/beneficiarios-isapres-6059/) | alta |
| TOPE_IMPONIBLE_AFP_SALUD | 90,0 | UF | feb-2026 | SP / Superintendencia de Salud | [superdesalud.gob.cl](https://www.superdesalud.gob.cl/preguntas-frecuentes/tax-grupos-de-interes/personas-6051/beneficiarios-isapres-6059/) | alta |
| TOPE_IMPONIBLE_CESANTIA | 135,2 (D.O.: 135,1) | UF | ene-2026 | SP / D.O. | [Diario Oficial](https://www.diariooficial.interior.gob.cl/publicaciones/2026/01/26/44359/01/2755277.pdf); [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) | media (conflicto 135,1/135,2 — resolver contra circular SP del mes) |
| TOPE_IMPONIBLE_IPS | 60,0 | UF | 2026 | IPS/Previred | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) | media |
| CESANTIA_INDEF_TRAB / EMP | 0,6 / 2,4 | % | permanente | AFC | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) | alta |
| CESANTIA_PLAZO_TRAB / EMP | 0 / 3,0 | % | permanente | AFC | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) | alta |
| RETENCION_BOLETA (2024/2025/2026/2027/2028) | 13,75 / 14,5 / 15,25 / 16 / 17 | % | 01-ene de cada año | SII | [SII aumento gradual](https://www.sii.cl/destacados/boletas_honorarios/aumento_gradual.html) | alta |
| IVA | 19 | % | 2003 | SII | [DL 825 (PDF)](https://www.sii.cl/normativa_legislacion/dl825.pdf) | alta |
| IUSC_TABLA_MENSUAL | tramos jul-2026 (ver ficha A) | CLP/factor | mensual | SII | [SII IUSC 2026](https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm) | alta (refrescar cada mes) |
| JORNADA_MAX_SEMANAL | 42 (40 desde 26-04-2028) | horas | 26-04-2026 | DT | [DT calendario 21.561](https://www.dt.gob.cl/legislacion/1624/articles-129008_recurso_pdf.pdf) | alta |
| FACTOR_HORA_EXTRA_42H | 0,0083333 | factor s/sueldo mensual | 26-04-2026 | DT | [DT valor hora](https://www.dt.gob.cl/portal/1628/w3-article-95182.html) | alta |
| RECARGO_HORA_EXTRA | 50 | % | permanente | CdT Art. 32 | [BCN CdT](https://www.bcn.cl/leychile/navegar?idNorma=207436) | alta |
| TOPE_BASE_FINIQUITO | 90 | UF | permanente (Art. 172) | DT | [DT ORD. 1480](https://www.dt.gob.cl/legislacion/1624/w3-article-111687.html) | alta |
| TOPE_ANOS_INDEMNIZACION | 330 | días (11 años) | permanente | DT | [DT ORD. 2818](https://www.dt.gob.cl/legislacion/1624/w3-article-109587.html) | alta |
| RECARGOS_ART168 | 30 / 50 / 80 / 100 | % (judicial) | permanente | CdT Art. 168 | [SUSESO](https://www.suseso.gob.cl/612/w3-propertyvalue-69859.html) | alta |
| GRATIFICACION_TOPE | 4,75 | IMM/año | permanente | CdT Art. 50 | [DT ORD. 5623](https://www.dt.gob.cl/legislacion/1624/w3-article-114038.html) | alta |
| IMM (ingreso mínimo) | 553.553 | CLP | jun-2026 | Previred/IPS | [Previred](https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf) | media (VERIFICAR MES) |
| AHORRO_MIN_DS49 / DS01_T1 / T2 / T3 | 10 / 30 / 40 / 80 | UF | llamados 2026 | MINVU | [ChileAtiende T1](https://www.chileatiende.gob.cl/fichas/19094-ds-1-tramo-1-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-100-uf), [T2](https://www.chileatiende.gob.cl/fichas/5172-ds-1-tramo-2-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-600-uf), [T3](https://www.chileatiende.gob.cl/fichas/5436-ds-1-tramo-3-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-2-200-uf) | alta (VERIFICAR LLAMADO) |
| TOPE_VIVIENDA_DS01 T1/T2/T3 | 1.100 / 1.600 / 2.200 (zonas extremas 1.200 / 1.800 / 2.600) | UF | llamado 2026 (Res. Ex. 669/2026) | MINVU | [ChileAtiende T1-T3](https://www.chileatiende.gob.cl/fichas/5436-ds-1-tramo-3-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-2-200-uf) | alta (VERIFICAR LLAMADO) |
| PREPAGO_COMISION_MAX | 1 mes intereses (no reajustable) / 1,5 meses (reajustable) | intereses | permanente | Ley 18.010 | [BCN](https://www.bcn.cl/leychile/navegar?idNorma=29438) | alta |
| UTM_JUL_2026 | 71.649 | CLP | jul-2026 | SII | [SII UTM](https://www.sii.cl/valores_y_fechas/utm/utm2026.htm) | alta (VERIFICAR MES) |
| UF_2026_07_08 | 40.839,35 | CLP | 08-jul-2026 | BCCh | [BCCh](https://si3.bcentral.cl/indicadoressiete/secure/indicadoresdiarios.aspx) | alta (VERIFICAR DÍA — nunca hardcodear) |

---

## 4. Anti-patrones YMYL (lista priorizada)

1. **Doble conversión UF en subsidio habitacional** — CONFIRMADO como error real: los montos MINVU se publican en UF; dividir de nuevo por la UF destruye el resultado (~40.000×). Máximo daño + máxima facilidad de mentira en UI.
2. **Cobrar SIS al trabajador** — CONFIRMADO anti-patrón: el SIS (1,62%) es de cargo del empleador ([SUSESO](https://www.suseso.gob.cl/612/w3-article-775740.html)). Igual para el aporte Ley 21.735.
3. **Descontar AFP+salud además de la retención de boleta** — CONFIRMADO anti-patrón: la retención ya financia las cotizaciones en la Operación Renta ([SII](https://www.sii.cl/destacados/renta/2025/cotizaciones_previsionales_informacion_general.html)).
4. **Divisor de hora extra desactualizado** — desde el 26-04-2026 el divisor es 168 (42 h); usar 176/180 subestima cada hora ([DT](https://www.dt.gob.cl/portal/1628/w3-article-95182.html)).
5. **Inventar recargo nocturno legal** — CONFIRMADO anti-patrón: no existe ([DT](https://www.dt.gob.cl/portal/1628/w3-article-60173.html)). El catálogo aún lo muestra: eliminar.
6. **Mostrar Art. 168 como automático** — CONFIRMADO anti-patrón: es judicial y el naming boolean "tieneMulta168" es conceptualmente erróneo ([SUSESO](https://www.suseso.gob.cl/612/w3-propertyvalue-69859.html)).
7. **Inputs fantasma que prometen alterar el cálculo** (Isapre UF, tipo de contrato, año de boleta, seguros/CAE) — mentira de producto: el label promete efecto legal real que el adapter ignora.
8. **Prometer "resultado oficial del SII/DT/MINVU"** — ninguna cifra de calculadora privada es oficial; SERVIU decide elegibilidad, el juez los recargos, el SII el impuesto final.
9. **Citar la ley equivocada** — el sitio atribuye la retención a la Ley 21.578 (ingreso mínimo) en vez de la Ley 21.133; y el plazo de finiquito a la Ley 21.361 (electrónico) en vez de la Ley 20.684. Daña E-E-A-T ante revisión experta.
10. **Congelar UF/UTM/tabla IUSC/comisiones en constantes sin fecha** — todo valor mensual debe llevar vigencia visible y proceso de refresco.
11. **Isapre al 7% fijo** — el descuento correcto es máx(7% topado, plan en UF) ([SUSESO 4080-2019](https://www.suseso.gob.cl/612/w3-article-578426.html)).
12. **Pedir UF y volver a convertir como si fuera CLP** (caso general del bug 1) — regla transversal: una sola conversión, al final, con UF del día citada.

---

## 5. Plan de verificación para ingeniería (orden de fix)

Priorización = daño al usuario × tráfico típico × facilidad de mentira en UI.

### P0 — esta semana

1. **subsidio-habitacional (daño máximo):**
   - Agregar select `tipoSubsidio` (ds49/ds01-t1/ds01-t2/ds01-t3/ds19) y `tramoRSH` obligatorios; sin ellos, no calcular (estado vacío controlado, sin crash).
   - Unificar unidades: motor interno 100% en UF; conversión CLP solo en presentación con UF del día y fecha.
   - Corregir topes: T2 = 1.600 UF (no 2.200); zonas extremas 1.200/1.800/2.600 UF o eliminar `esZonaExtrema`.
   - Criterio de aceptación: test golden por programa/tramo con montos del llamado 2026 (Res. Ex. 669 y 685 de 2026); input 2000 (UF) produce resultado en UF, jamás ~0,05 UF.
2. **sueldo-liquido:**
   - Cablear `isapreMonto` (máx(7% topado, plan UF)), `contratoIndefinido` (0,6%/0%), no imponibles y descuentos voluntarios; eliminar `tipoCalculo` y `saludTramo` (o degradarlo a nota).
   - Verificar constantes contra Previred/circular SP del mes: SIS 1,62%, topes 90/135,2/60 UF, comisiones AFP jun-2026.
   - Criterio: 3 golden exactos — (a) $1.000.000 FONASA AFP Modelo indefinido; (b) Isapre plan > 7%; (c) plazo fijo sin 0,6%; cero inputs fantasma en `audit-ymyl-matrix`.
3. **boleta-honorarios:**
   - Cablear `ano` (tabla 13,75→17%); default = año actual del sistema; garantizar que ningún flag reste AFP/salud del líquido mensual; corregir cita legal a Ley 21.133 en guías/FAQ.
   - Criterio: golden por año 2024–2028; para 2026, $1.000.000 → líquido $847.500.

### P1 — siguiente sprint

4. **horas-extra:** cablear `jornadaSemanal` con default 42 y divisor derivado (168); eliminar `horasExtraNocturnas` del catálogo; festivos solo si el motor implementa Art. 38/comercio 30%. Criterio: golden DT — sueldo $800.000, 42 h → hora extra $6.666,6; test que falle si el default de jornada no corresponde a la fecha del sistema.
5. **finiquito:** cablear `incluyeAvisoPrevio` (solo causal 161), `vacacionesAniosAnteriores` y renombrar `tieneMulta168` → selector `recargoArt168Pct` (0/30/50/80/100) rotulado "escenario judicial"; ocultar fechas que no calculan antigüedad o implementarla. Criterio: golden con aviso previo + tope 90 UF + feriado proporcional fórmula DT.
6. **credito-hipotecario:** decisión binaria — cablear seguros/CAE/prepago con resultados visibles o podar el catálogo a los 4 campos reales; agregar advertencia tipo CMF ("no es oferta ni evaluación crediticia"). Criterio: cero tooltips de features inexistentes; dividendo con/sin seguros diferenciados si se cablean.
7. **uf-clp:** podar histórico/proyección/gráfico del catálogo o implementarlos contra la serie oficial del BCCh; citar fecha del valor UF usado. Criterio: cero inputs sin efecto.

### P2 — calidad continua

8. **Golden tests top 5** anclados a cifras de este dossier (con URL fuente en el comentario del test).
9. **Montar `DisclaimerYMYL`** por categoría usando los textos de las fichas A–H (organismo + no-oficialidad + vigencia mensual).
10. **Pipeline de constantes mensuales:** job que refresque UF (BCCh), UTM/IUSC (SII), indicadores Previred, y marque `lastReviewed` real por calculadora solo tras review humano.
11. **CI anti-fantasmas:** `audit-ymyl-matrix.mjs` como gate que falle ante cualquier fantasma nuevo en phase 1.
12. **Corrección editorial E-E-A-T:** reemplazar citas legales erróneas (21.578→21.133; 21.361→20.684 donde corresponda) y URLs home por las subpáginas canónicas de la bibliografía.

---

## 6. Bibliografía final (URLs oficiales deduplicadas)

**SII**
- https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm — tabla mensual IUSC 2026
- https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026_art52.htm — tabla especial autoridades (no usar para trabajadores)
- https://www.sii.cl/valores_y_fechas/utm/utm2026.htm — UTM/UTA/IPC 2026
- https://www.sii.cl/destacados/boletas_honorarios/ — retención 2026 (15,25%)
- https://www.sii.cl/destacados/boletas_honorarios/aumento_gradual.html — calendario 2020–2028
- https://www.sii.cl/destacados/renta/2025/cotizaciones_previsionales_informacion_general.html — cotizaciones independientes / cobertura parcial
- https://www.sii.cl/ayudas/ayudas_por_servicios/2032-cp-2035.html — base imponible 80%, tope 867,6 UF
- https://www.sii.cl/noticias/2025/261225noti01smn.htm — noticia oficial alza 2026
- https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_7297.htm — FAQ tasas por año
- https://www.sii.cl/siieduca/aprende-con-nosotros/contribuyentes-de-tipo-profesionales-y-trabajadores-independientes.html — PPM emisor
- https://www.sii.cl/normativa_legislacion/dl825.pdf — DL 825 (IVA 19%)

**Dirección del Trabajo**
- https://www.dt.gob.cl/portal/1628/w3-article-95182.html — valor hora extraordinaria (42 h, factor 0,0083333)
- https://www.dt.gob.cl/legislacion/1624/articles-129008_recurso_pdf.pdf — calendario Ley 21.561
- https://www.dt.gob.cl/portal/1628/w3-article-60255.html — descanso dominical Art. 38
- https://www.dt.gob.cl/portal/1628/w3-article-105587.html — recargo 30% comercio domingo
- https://www.dt.gob.cl/portal/1628/w3-article-60173.html — sin recargo nocturno automático
- https://www.dt.gob.cl/legislacion/1624/w3-article-112157.html — ORD. 2473 no imponibles Art. 41
- https://www.dt.gob.cl/legislacion/1624/w3-article-111687.html — ORD. 1480 Arts. 163/172, tope 90 UF
- https://www.dt.gob.cl/legislacion/1624/w3-article-109587.html — ORD. 2818 tope 330 días
- https://www.dt.gob.cl/portal/1628/w3-article-60570.html — causales de término
- https://www.dt.gob.cl/portal/1628/w3-article-60533.html — despido Art. 161 / aviso previo
- https://www.dt.gob.cl/portal/1628/w3-article-60200.html — feriado proporcional (fórmula)
- https://www.dt.gob.cl/portal/1628/w3-article-60205.html — feriado en contratos ≤30 días
- https://www.dt.gob.cl/legislacion/1624/w3-article-63540.html — ORD. 3838/192 feriado pendiente
- https://www.dt.gob.cl/portal/1628/w3-article-60177.html — feriado 15/20 días
- https://www.dt.gob.cl/legislacion/1624/w3-article-114038.html — ORD. 5623 gratificación Art. 50
- https://www.dt.gob.cl/portal/1628/w3-article-60204.html — gratificación en finiquito
- https://www.dt.gob.cl/legislacion/1624/w3-article-102513.html — ORD. 3866/42 plazo 10 días hábiles
- https://www.dt.gob.cl/portal/1628/w3-article-60613.html — plazo de pago finiquito
- https://www.dt.gob.cl/portal/1628/w3-article-60618.html — ratificación ante ministro de fe

**Superintendencia de Pensiones / Previred / Previsión Social / SUSESO / Hacienda**
- https://www.spensiones.cl/infoafp/ — comparador oficial "Infórmate y Decide"
- https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf — indicadores jun-2026 (comisiones, SIS, topes, IMM, asignación familiar)
- https://previsionsocial.gob.cl/organizaciones/empresas-y-empleadores-empleadoras/cotizaciones-previsionales/ — estructura de cotizaciones
- https://www.suseso.gob.cl/612/w3-article-775740.html — dictamen SIS cargo empleador (2026)
- https://www.suseso.gob.cl/612/w3-article-578426.html — dictamen 4080-2019 descuento plan Isapre
- https://www.suseso.gob.cl/612/w3-propertyvalue-69859.html — recargos Art. 168
- https://www.hacienda.cl/noticias-y-eventos/noticias/implementacion-de-la-reforma-previsional-nueva-cotizacion-del-empleador-regira — calendario Ley 21.735
- https://www.diariooficial.interior.gob.cl/publicaciones/2026/01/26/44359/01/2755277.pdf — tope cesantía 2026 (D.O.)

**Superintendencia de Salud**
- https://www.superdesalud.gob.cl/preguntas-frecuentes/tax-grupos-de-interes/personas-6051/beneficiarios-isapres-6059/ — 7%, tope 90 UF, cotización máx. 6,3 UF

**MINVU / SERVIU / ChileAtiende**
- https://serviumetropolitana.minvu.gob.cl/fondo-solidario-de-eleccion-de-vivienda-ds49/ — DS49 requisitos
- https://www.minvu.gob.cl/postulacion/llamado-en-condiciones-especiales-del-ds49-para-construccion-en-nuevos-terrenos-para-todas-las-regiones-del-pais-2026/ — llamado DS49 2026
- https://www.minvu.gob.cl/wp-content/uploads/2019/05/DS49-diptico-compra.pdf — estructura de montos DS49
- https://www.minvu.gob.cl/beneficio/vivienda/subsidio-de-integracion-social-y-territorial-ds19/ — DS19
- https://www.minvu.gob.cl/beneficio/vivienda/informacion-para-familias-con-o-sin-subsidio-interesadas-en-incorporarse-a-proyectos-ds-19/ — DS19 montos por zona
- https://www.minvu.gob.cl/noticia/noticias/minvu-anuncia-apertura-del-segundo-llamado-de-2024-al-subsidio-para-sectores-medios-ds1/ — mejoras transitorias DS1
- https://www.chileatiende.gob.cl/fichas/19094-ds-1-tramo-1-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-100-uf — DS1 T1
- https://www.chileatiende.gob.cl/fichas/5172-ds-1-tramo-2-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-600-uf — DS1 T2
- https://www.chileatiende.gob.cl/fichas/5436-ds-1-tramo-3-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-2-200-uf — DS1 T3
- https://www.chileatiende.gob.cl/momentos-de-vida/Acceder+a+una+vivienda/Revisa+qu%C3%A9+alternativas+existen — panorama de programas
- https://www.chileatiende.gob.cl/momentos-de-vida/Acceder+a+una+vivienda/Postula,+obt%C3%A9n+y+usa+el+subsidio+para+acceder+a+una+vivienda — proceso de postulación

**BCN / LeyChile**
- https://www.bcn.cl/leychile/navegar?idNorma=207436 — Código del Trabajo vigente
- https://www.bcn.cl/leychile/navegar?idNorma=1128420 — Ley 21.133
- https://www.bcn.cl/leychile/navegar?idNorma=1162963 — Ley 21.361 (finiquito electrónico)
- https://www.bcn.cl/leychile/navegar?idNorma=29438 — Ley 18.010 (prepago)
- https://www.bcn.cl/leychile/Navegar?idNorma=1032865 — Ley 20.555 (CAE/SERNAC Financiero)
- https://www.bcn.cl/leychile/navegar?idNorma=5201&idVersion=2019-01-12&idParte=100022198 — DFL 251 Art. 40 (seguros hipotecarios)
- https://www.bcn.cl/leychile/navegar?idNorma=1039424 — D.S. 49/2011 MINVU
- https://www.bcn.cl/leychile/navegar?idNorma=1092547 — D.S. 19/2016 MINVU
- https://www.bcn.cl/leychile/navegar?idNorma=1218848 — Res. Ex. 1720/2025 (precios DS19)
- https://www.bcn.cl/leychile/navegar?idNorma=6369 — DL 825 (IVA)

**Banco Central / CMF / SERNAC**
- https://si3.bcentral.cl/indicadoressiete/secure/indicadoresdiarios.aspx — indicadores diarios (UF)
- https://si3.bcentral.cl/Indicadoressiete/secure/Serie.aspx?gcode=UF — serie histórica UF
- https://api.cmfchile.cl/documentacion/UF.html — definición y API UF
- https://servicios.cmfchile.cl/simuladorhipotecario/aplicacion?indice=101.2.3 — simulador CMF (texto de advertencia modelo)
- https://clientebancario.cl/clientebancario/credito-hipotecario-como-comparar.html — CMF Cliente Bancario, comparación hipotecaria
- https://www.sernac.cl/portal/618/w3-article-11834.html — CAE
