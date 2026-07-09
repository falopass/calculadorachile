# Plan editorial SEO — CalculaChile (jul 2026 – ene 2027)

| | |
|---|---|
| **Producto** | calculadorachile.cl — 39 calculadoras, AdSense + SEO orgánico |
| **Objetivo** | **Pageviews → impresiones AdSense → ingresos**. Un post con tráfico vale aunque no convierta a calculadora. CTA a calc = preferible, no obligatorio. |
| **Ventana** | 2026-07-09 → 2027-01-29 |
| **Meta** | 45 piezas (~1–2/semana). Si un mes sale corto, **bajar** el siguiente (no acumular deuda). |
| **Inventario** | [`docs/research/inventario_seo_chile_financiero_laboral_2026.md`](./research/inventario_seo_chile_financiero_laboral_2026.md) |
| **Código blog** | `src/data/articles.ts` → URL `/blog/{slug}` |
| **Última revisión** | 2026-07-08 |

---

## Cómo marcar lo publicado (no borrar filas)

Cuando un post se agrega a `articles.ts` y queda listo para deploy:

1. En **Progreso** y en el **Calendario maestro**, envolver el título (y la fila si quieres) con tachado Markdown:

   ```markdown
   ~~#20 Permiso 2.ª cuota~~ ✅
   ```

2. Completar la columna **Estado** con: `✅ en código · YYYY-MM-DD` y el slug real.

3. **No eliminar** la fila ni el detalle del post: el plan es histórico + backlog.

4. Opcional: en **Detalle por post**, tachar el encabezado `### [#N] …` igual.

**Convención visual**

| En el doc | Significado |
|-----------|-------------|
| `~~texto~~` | Ya agregado a `articles.ts` (publicado en código) |
| Sin tachar | Pendiente de redactar / agregar |
| ⚠ | Revalidar monto/fecha el día T-1 |

---

## Progreso

**Hechos: 3 / 46** · Pendientes: 43  
*(#46 = post pageview vehículos añadido fuera del backlog original: revisión técnica)*

### Sprint de arranque (orden real)

| Orden | # | Pieza | Fecha publish | Estado |
|------:|---|--------|---------------|--------|
| 1 | 20 | ~~Segunda cuota permiso de circulación 2026~~ | 9–10 jul 2026 | ✅ en código · 2026-07-09 · [`permiso-circulacion-segunda-cuota-agosto-2026`](/blog/permiso-circulacion-segunda-cuota-agosto-2026) |
| 1b | 46 | ~~Revisión técnica 2026 (calendario patente)~~ | 10 jul 2026 | ✅ en código · 2026-07-10 · [`revision-tecnica-chile-2026-calendario-patente`](/blog/revision-tecnica-chile-2026-calendario-patente) |
| 2 | 1 | ~~Cotización empleador 3,5%~~ | 15–16 jul 2026 | ✅ en código · 2026-07-15 · [`cotizacion-empleador-3-5-agosto-2026-costo-pyme`](/blog/cotizacion-empleador-3-5-agosto-2026-costo-pyme) |
| 3 | 7 | Aguinaldo Fiestas Patrias 2026 | 22–23 jul 2026 | ⏳ pendiente |
| 4 | 2 | Horas extra 42 h | 30 jul 2026 | ⏳ pendiente |
| 5 | 3 | Sueldo mínimo $553.553 | 5 ago 2026 | ⏳ pendiente |

### Checklist maestro (tachar al publicar)

- [x] ~~**#20** `permiso-circulacion-segunda-cuota-agosto-2026`~~ — 2026-07-09
- [x] ~~**#46** `revision-tecnica-chile-2026-calendario-patente`~~ — 2026-07-10 *(pageview + cluster vehículos)*
- [x] ~~**#1** `cotizacion-empleador-3-5-agosto-2026-costo-pyme`~~ — 2026-07-15
- [ ] **#2** `horas-extra-jornada-42-horas-chile-2026`
- [ ] **#3** `sueldo-minimo-2026-calcular-liquido`
- [ ] **#4** `subsidio-electrico-2026-resultados-descuento-cuenta`
- [ ] **#5** `bono-trabajo-mujer-sej-pago-anual-2026-sue`
- [ ] **#6** `finiquito-2026-ejemplo-sueldo-minimo`
- [ ] **#7** `aguinaldo-fiestas-patrias-2026-pensionados-sector-publico`
- [ ] **#8** `pgu-aumento-septiembre-2026-75-anos`
- [ ] **#9** `asignacion-familiar-2026-tramos-montos`
- [ ] **#10** `feriados-irrenunciables-18-19-septiembre-2026-comercio`
- [ ] **#11** `contribuciones-tercera-cuota-septiembre-2026`
- [ ] **#12** `boleta-honorarios-retencion-15-25-2026`
- [ ] **#13** `formulario-29-iva-mensual-plazos-2026`
- [ ] **#14** `subsidio-credito-hipotecario-minvu-dividendo-2026`
- [ ] **#15** `gratificacion-legal-tope-2026-ingreso-minimo`
- [ ] **#16** `subsidio-unificado-empleo-ley-21808-octubre-2026`
- [ ] **#17** `uf-utm-convertir-chile-2026-usos`
- [ ] **#18** `aporte-familiar-permanente-2026-cobro-plazo`
- [ ] **#19** `costo-empleado-pyme-2026-cotizacion-empleador`
- [ ] **#21** `impuesto-segunda-categoria-2026-ejemplo`
- [ ] **#22** `comisiones-afp-2026-comparar-descuento`
- [ ] **#23** `apv-2026-simulador-ahorro-tributario`
- [ ] **#24** `cotizacion-independientes-2026-boleta`
- [ ] **#25** `reajuste-arriendo-uf-ipc-2026-ejemplo`
- [ ] **#26** `subsidio-habitacional-ds01-ds49-ahorro-uf-2026`
- [ ] **#27** `vacaciones-proporcionales-2026-calcular`
- [ ] **#28** `indemnizacion-anos-servicio-tope-90-uf-2026`
- [ ] **#29** `contribuciones-cuarta-cuota-noviembre-2026`
- [ ] **#30** `aguinaldo-navidad-pensionados-2026`
- [ ] **#31** `seguro-cesantia-finiquito-2026-afc`
- [ ] **#32** `ppm-2026-calcular-independientes`
- [ ] **#33** `plusvalia-venta-propiedad-2026-calcular`
- [ ] **#34** `feriado-irrenunciable-25-diciembre-2026-comercio`
- [ ] **#35** `aguinaldo-navidad-sector-publico-2026`
- [ ] **#36** `gratificacion-fin-de-ano-2026-anticipos`
- [ ] **#37** `cae-2026-simular-cuota-renegociacion`
- [ ] **#38** `pension-alimenticia-2026-ejemplo-calculo`
- [ ] **#39** `preparacion-operacion-renta-2027-checklist` *(guía pillar)*
- [ ] **#40** `permiso-circulacion-2027-calcular-plazo`
- [ ] **#41** `intereses-mora-chile-2026-calcular`
- [ ] **#42** `sueldo-minimo-2027-reajuste-simular-liquido`
- [ ] **#43** `credito-hipotecario-2027-simular-dividendo`
- [ ] **#44** `costo-notaria-compraventa-2027-estimar`
- [ ] **#45** `patente-comercial-2027-calcular`

---

## YMYL — bloqueadores ya verificados (2026-07-08)

| Tema | Resultado | Fuente |
|------|-----------|--------|
| Ley **21.808** SUE | OK — existe; rige **1 oct 2026**; unifica BTM/SEJ/SPTJ | [BCN 1222281](https://www.bcn.cl/leychile/Navegar?idNorma=1222281) |
| Aguinaldo SP **21.806** | OK — FP **$91.682** / **$63.645**; umbral líquido ~**$1.060.493** ⚠ revalidar BCN al escribir #7 | BCN · DIPRES |
| Pensionados IPS FP | OK — **$25.280** + **$12.969**/carga | [ChileAtiende](https://www.chileatiende.gob.cl/fichas/26553-aguinaldo-de-fiestas-patrias-para-pensionados-ips) |
| Subsidio eléctrico 5.ª conv. | OK con matiz — $17.346 / $22.548 / **$32.224** (sitio oficial) vs **$31.224** (ChileAtiende 4+) | [subsidioelectrico.cl](https://www.subsidioelectrico.cl/) |
| Cotización empleador **3,5%** | OK — 0,1% cuenta + 0,9% CRP + 2,5% SIS/CEV | [ChileAtiende 130987](https://www.chileatiende.gob.cl/fichas/130987-aportes-del-empleador-al-sistema-de-pensiones) |

---

## Reglas operativas

| Tema | Regla |
|------|--------|
| Enlaces | Solo a calcs/guías/**posts ya en código**. Nunca slug de blog futuro (404). |
| CTA calc | Preferible; no obligatorio (AdSense = pageview). |
| YMYL T-1 | Reabrir fuente oficial de montos/fechas. |
| YMYL T+3 | `site:calculadorachile.cl "título"`; si no, GSC → solicitar indexación. |
| Mantenimiento | Calendarios por dígito patente / feriados: renovar cada dic–ene. Municipales: disclaimer de comuna. |
| Capacidad | Si publicas 5 en vez de 9 en un mes, recorta el mes siguiente. |

---

## Calendario maestro

Fechas del sprint de arranque **gobiernan** sobre la columna “Fecha plan” para #20, #1, #7, #2, #3.

| # | Título | Slug | Fecha plan | Pico | CTA calc (opcional) | Keyword | Vol. | Comp. | Longev. | Estado |
|---|--------|------|------------|------|---------------------|---------|------|-------|---------|--------|
| ~~20~~ | ~~Segunda cuota permiso circulación 2026~~ | ~~`permiso-circulacion-segunda-cuota-agosto-2026`~~ | ~~9–10 jul~~ | 31 ago 2026 | permiso, multas | permiso 2ª cuota 2026 | alto | media | anual | ✅ 2026-07-09 |
| ~~46~~ | ~~Revisión técnica 2026 calendario patente~~ | ~~`revision-tecnica-chile-2026-calendario-patente`~~ | ~~10 jul~~ | continuo + ago (dígito 5) | permiso, multas | revisión técnica 2026 | alto | media | anual | ✅ 2026-07-10 |
| ~~1~~ | ~~Cotización empleador 3,5% ago 2026~~ | ~~`cotizacion-empleador-3-5-agosto-2026-costo-pyme`~~ | ~~15–16 jul~~ | ago–sep | costo-empleado, sueldo | cotización empleador 3,5% | alto | media | anual | ✅ 2026-07-15 |
| 7 | Aguinaldo Fiestas Patrias 2026 | `aguinaldo-fiestas-patrias-2026-pensionados-sector-publico` | 22–23 jul | ago–sep | aguinaldo | aguinaldo fiestas patrias 2026 | alto | alta | anual | ⏳ |
| 2 | Horas extra con jornada 42 h | `horas-extra-jornada-42-horas-chile-2026` | 30 jul | ago–oct | horas-extra | horas extra 42 horas | alto | media | anual | ⏳ |
| 3 | Sueldo mínimo 2026 $553.553 | `sueldo-minimo-2026-calcular-liquido` | 5 ago | ago–dic | sueldo-liquido | sueldo mínimo 2026 | alto | alta | anual | ⏳ |
| 4 | Subsidio eléctrico 2026 resultados | `subsidio-electrico-2026-resultados-descuento-cuenta` | 18 ago | ago–sep | cuenta-luz | subsidio eléctrico 2026 | alto | alta | anual | ⏳ |
| 5 | BTM / SEJ pago anual + SUE | `bono-trabajo-mujer-sej-pago-anual-2026-sue` | 21 ago | ago | sueldo-liquido | bono trabajo mujer 2026 | alto | alta | anual | ⏳ |
| 6 | Finiquito 2026 ejemplo IMM | `finiquito-2026-ejemplo-sueldo-minimo` | 23 ago | continuo | finiquito | calcular finiquito 2026 | alto | media | perenne | ⏳ |
| 8 | PGU aumento sep 2026 (75+) | `pgu-aumento-septiembre-2026-75-anos` | 28 ago | sep | pgu | aumento PGU 2026 | alto | alta | anual | ⏳ |
| 9 | Asignación familiar 2026 tramos | `asignacion-familiar-2026-tramos-montos` | 1 sep | sep–dic | asignacion-familiar | asignación familiar 2026 | alto | media | anual | ⏳ |
| 10 | Feriados irrenunciables 18–19 sep | `feriados-irrenunciables-18-19-septiembre-2026-comercio` | 3 sep | pre 18–19 sep | horas-extra | feriado irrenunciable sep | alto | alta | anual | ⏳ |
| 11 | Contribuciones 3.ª cuota 30 sep | `contribuciones-tercera-cuota-septiembre-2026` | 5 sep | 30 sep | contribuciones | contribuciones septiembre | medio | media | anual | ⏳ |
| 12 | Boleta honorarios retención 15,25% | `boleta-honorarios-retencion-15-25-2026` | 8 sep | continuo | boleta-honorarios | retención boleta 2026 | alto | media | perenne | ⏳ |
| 13 | Formulario 29 + IVA mensual | `formulario-29-iva-mensual-plazos-2026` | 11 sep | cada mes | iva, ppm | formulario 29 plazo | alto | media | perenne | ⏳ |
| 14 | Subsidio crédito hipotecario MINVU | `subsidio-credito-hipotecario-minvu-dividendo-2026` | 15 sep | sep–may 2027 | credito-hipotecario | subsidio hipotecario MINVU | medio | media | anual | ⏳ |
| 15 | Gratificación legal tope 4,75 IMM | `gratificacion-legal-tope-2026-ingreso-minimo` | 18 sep | sep–dic | gratificacion-legal | gratificación legal 2026 | medio | media | anual | ⏳ |
| 16 | SUE Ley 21.808 (1 oct) | `subsidio-unificado-empleo-ley-21808-octubre-2026` | 22 sep | sep–nov | sueldo-liquido | subsidio unificado empleo | alto | media | anual | ⏳ |
| 17 | UF y UTM: convertir y usos | `uf-utm-convertir-chile-2026-usos` | 25 sep | continuo | uf-clp, utm-clp | valor UF hoy | alto | media | perenne | ⏳ |
| 18 | AFPER 2026 cobro 9 meses | `aporte-familiar-permanente-2026-cobro-plazo` | 29 sep | oct–nov | *(pageview)* | aporte familiar permanente | alto | alta | anual | ⏳ |
| 19 | Costo empleado PYME + 3,5% | `costo-empleado-pyme-2026-cotizacion-empleador` | 2 oct | oct | costo-empleado-pyme | costo empleado 2026 | alto | media | anual | ⏳ |
| 21 | Impuesto 2.ª categoría 2026 | `impuesto-segunda-categoria-2026-ejemplo` | 6 oct | continuo | impuesto-segunda-categoria | IUSC 2026 | medio | media | perenne | ⏳ |
| 22 | Comisiones AFP 2026 | `comisiones-afp-2026-comparar-descuento` | 9 oct | continuo | comparador-afp | comisión AFP 2026 | medio | media | anual | ⏳ |
| 23 | APV 2026 | `apv-2026-simulador-ahorro-tributario` | 13 oct | oct–abr | simulador-apv | APV 2026 | medio | media | perenne | ⏳ |
| 24 | Cotización independientes | `cotizacion-independientes-2026-boleta` | 16 oct | oct–abr | cotizacion-independientes | cotización independientes | medio | media | perenne | ⏳ |
| 25 | Reajuste arriendo UF/IPC | `reajuste-arriendo-uf-ipc-2026-ejemplo` | 20 oct | continuo | reajuste-arriendo | reajuste arriendo UF | medio | media | perenne | ⏳ |
| 26 | Subsidio habitacional DS01/DS49 | `subsidio-habitacional-ds01-ds49-ahorro-uf-2026` | 23 oct | continuo | subsidio-habitacional | subsidio habitacional 2026 | medio | media | anual | ⏳ |
| 27 | Vacaciones proporcionales | `vacaciones-proporcionales-2026-calcular` | 27 oct | continuo | vacaciones-proporcionales | vacaciones proporcionales | medio | baja | perenne | ⏳ |
| 28 | Indemnización años servicio 90 UF | `indemnizacion-anos-servicio-tope-90-uf-2026` | 30 oct | continuo | indemnizacion-anos-servicio | indemnización años servicio | alto | media | perenne | ⏳ |
| 29 | Contribuciones 4.ª cuota 30 nov | `contribuciones-cuarta-cuota-noviembre-2026` | 3 nov | 30 nov | contribuciones | contribuciones noviembre | medio | media | anual | ⏳ |
| 30 | Aguinaldo Navidad pensionados | `aguinaldo-navidad-pensionados-2026` | 10 nov | nov–dic | aguinaldo | aguinaldo navidad IPS | alto | alta | anual | ⏳ |
| 31 | Seguro cesantía + finiquito | `seguro-cesantia-finiquito-2026-afc` | 13 nov | continuo | finiquito | seguro de cesantía | alto | alta | perenne | ⏳ |
| 32 | PPM 2026 | `ppm-2026-calcular-independientes` | 17 nov | nov–abr | ppm | PPM 2026 | medio | media | perenne | ⏳ |
| 33 | Plusvalía venta propiedad | `plusvalia-venta-propiedad-2026-calcular` | 20 nov | continuo | plusvalia | plusvalía Chile 2026 | medio | media | perenne | ⏳ |
| 34 | Feriado irrenunciable 25 dic | `feriado-irrenunciable-25-diciembre-2026-comercio` | 1 dic | dic | horas-extra | feriado 25 diciembre | alto | alta | anual | ⏳ |
| 35 | Aguinaldo Navidad sector público | `aguinaldo-navidad-sector-publico-2026` | 4 dic | dic | aguinaldo | aguinaldo navidad SP | medio | alta | anual | ⏳ |
| 36 | Gratificación fin de año | `gratificacion-fin-de-ano-2026-anticipos` | 8 dic | dic–ene | gratificacion-legal | gratificación fin de año | medio | media | anual | ⏳ |
| 37 | CAE 2026 cuota / renegociación | `cae-2026-simular-cuota-renegociacion` | 11 dic | continuo | credito-cae | calculadora CAE | medio | media | perenne | ⏳ |
| 38 | Pensión alimenticia ejemplo | `pension-alimenticia-2026-ejemplo-calculo` | 15 dic | continuo | pension-alimenticia | pensión alimenticia | alto | media | perenne | ⏳ |
| 39 | Prep Operación Renta 2027 | `preparacion-operacion-renta-2027-checklist` | 6 ene 2027 | ene–abr | operacion-renta, boleta… | operación renta 2027 | alto | media | anual | ⏳ |
| 40 | Permiso circulación 2027 | `permiso-circulacion-2027-calcular-plazo` | 13 ene 2027 | ene–mar | permiso-circulacion | permiso circulación 2027 | alto | media | anual | ⏳ |
| 41 | Intereses por mora | `intereses-mora-chile-2026-calcular` | 16 ene 2027 | continuo | intereses-mora | intereses mora | bajo | baja | perenne | ⏳ |
| 42 | Sueldo mínimo 2027 (reajuste) | `sueldo-minimo-2027-reajuste-simular-liquido` | 20 ene 2027 | ene | sueldo-liquido | sueldo mínimo 2027 | alto | alta | anual | ⏳ |
| 43 | Crédito hipotecario 2027 UF | `credito-hipotecario-2027-simular-dividendo` | 23 ene 2027 | continuo | credito-hipotecario | simulador hipotecario | alto | media | perenne | ⏳ |
| 44 | Costo notaría compraventa | `costo-notaria-compraventa-2027-estimar` | 27 ene 2027 | continuo | costo-notaria | costo notaría | bajo | baja | perenne | ⏳ |
| 45 | Patente comercial 2027 | `patente-comercial-2027-calcular` | 29 ene 2027 | ene–mar | patente-comercial | patente comercial | medio | media | anual | ⏳ |

---

## Detalle por post (resumen)

> Al publicar: tacha el `### [#N]` y anota la URL bajo el bloque. **No borres el bloque.**

### ~~[#20] Segunda cuota permiso de circulación 2026~~ ✅

- **URL:** `/blog/permiso-circulacion-segunda-cuota-agosto-2026`
- **En código:** 2026-07-09
- **Notas:** Disclaimer municipal; plazo 1–31 ago; CTA suave permiso + multas.
- **Mantener:** renovar fechas cada año (ago 2027…).

### ~~[#46] Revisión técnica Chile 2026: calendario por patente~~ ✅

- **URL:** `/blog/revision-tecnica-chile-2026-calendario-patente`
- **En código:** 2026-07-10
- **Notas:** Pageview vehículos; cluster con #20; tabla dígito→mes; consulta PRT; sin precio fijo nacional; **renovar calendario cada dic–ene**.
- **Fuentes:** ChileAtiende RT + consulta estado · prt.cl

### ~~[#1] Cotización del empleador 3,5% desde agosto 2026~~ ✅

- **URL:** `/blog/cotizacion-empleador-3-5-agosto-2026-costo-pyme`
- **En código:** 2026-07-15
- **Desglose usado:** 0,1% + 0,9% CRP + 2,5% SIS/CEV (ChileAtiende).
- **Notas:** 3,5% no descuenta al trabajador; ejemplos $28.000 / $52.500.

### [#7] Aguinaldo de Fiestas Patrias 2026 — *siguiente en sprint*

- **Por qué ahora:** Corte pensionados 31 ago; pago sep; SP por Ley 21.806.
- **Outline:** IPS base+carga → ejemplos → SP tramos ($91.682 / $63.645, umbral ~$1.060.493) → no confundir con gratificación → calc aguinaldo.
- **Fuentes:** [ChileAtiende IPS](https://www.chileatiende.gob.cl/fichas/26553-aguinaldo-de-fiestas-patrias-para-pensionados-ips) · BCN 21.806
- **CTA:** `/calculadoras/calculadora-aguinaldo`
- **Links internos (solo vivos):** sueldo líquido guía; **no** linkear #8/#9 hasta existir.
- **Riesgo YMYL:** Separar IPS / SP / privado; revalidar umbral SP en BCN.

### [#2] Horas extra con jornada de 42 horas

- **Por qué:** Ley 21.561 desde 26 abr 2026 → 42 h ordinarias.
- **Outline:** ordinario vs extra → recargo 50% → ejemplo → festivo → calc jornada 42.
- **Fuentes:** [DT 40 horas](https://www.dt.gob.cl/portal/1628/w3-article-125909.html)
- **CTA:** `/calculadoras/calculadora-horas-extra` · guía horas extra existente
- **Riesgo YMYL:** Mínimo legal 50%; no bajar sueldo por reducción jornada.

### [#3] Sueldo mínimo 2026 $553.553

- **Datos DT:** $553.553 (18–65); $412.938 (<18/>65); $356.815 no remuneracional.
- **CTA:** `/calculadoras/calculadora-sueldo-liquido`
- **Fuente:** [DT IMM](https://www.dt.gob.cl/portal/1626/w3-article-60141.html)

### [#4]–[#6], [#8]–[#19], [#21]–[#45]

Usar la fila del **Calendario maestro** + inventario. Al redactar, copiar el patrón de #20/#1:

1. Fuentes oficiales al pie  
2. Disclaimer YMYL  
3. Links solo a URLs vivas  
4. FAQ 2–3 si el tema es YMYL  
5. Tachar en **Progreso** + **Calendario** + este encabezado  

Detalle ampliado de outlines originales (referencia rápida):

| # | Outline en 1 línea |
|---|-------------------|
| 4 | Resultados ago + montos hogar + descuento boleta + calc luz |
| 5 | Pago anual BTM/SEJ ago + cierre postulaciones + puente SUE 1/10 |
| 6 | Finiquito componentes + ejemplo IMM + vacaciones/indemnización |
| 8 | PGU $250.275 para 75+ en sep + calc pgu |
| 9 | Tramos asignación $22.601 / $13.870 / $4.382 |
| 10 | 18–19 sep irrenunciables comercio + excepciones DT |
| 11 | 3.ª cuota contribuciones 30 sep |
| 12 | Retención 15,25% boleta + ejemplo $100.000 |
| 13 | F29 día 12 + IVA agregar/quitar |
| 14 | Subsidio tasa hipoteca hasta 4.000 UF |
| 15 | Tope gratificación 4,75×IMM → ~$2.629.377 ⚠ redondeo |
| 16 | SUE 21.808 desde 1/10 — tramos ⚠ SENCE |
| 17 | UF/UTM live del sitio |
| 18 | AFPER $66.834 + 9 meses cobro (pageview) |
| 19 | Costo PYME sumando 3,5% |
| 21–28 | Evergreen laboral/previsional/vivienda (ver calendario) |
| 29–30 | Cuota nov + aguinaldo Navidad IPS $29.055+$16.415 |
| 31–38 | Cesantía, PPM, plusvalía, feriado 25, SP Navidad, CAE, alimenticia |
| 39–45 | Prep renta 2027, permiso 2027, IMM 2027, hipoteca/notaría/patente |

---

## Temas descartados (o “solo pageview” opcional)

| Tema | Nota |
|------|------|
| Bono Invierno 2026 | Pico pasado (may) |
| Beneficio años cotizados (solo blog) | Mejor con calc nueva |
| Bonos Seguridades y Oportunidades | Nicho; **reabrir si hace falta volume AdSense** |
| Bono Bodas de Oro | Calc en 410; no reactivar |
| Subsidio arriendo postulación | Ventana jul–ago ya límite |
| Préstamo solidario 2021 | Renta 2026 pasada |
| Emergencias / Aysén / Pase cultural | Nicho o no planificable |

---

## Candidatos a calculadora nueva

| Tema | Qué calcula | Complejidad | Prioridad |
|------|-------------|-------------|-----------|
| Años cotizados Ley 21.735 | 0,1 UF×años (tope 2,5 UF) | Media | Alta |
| Cotización empleador gradual | % por tramo × imponible | Baja–media | Alta |
| Aguinaldo IPS (FP/Navidad) | Base + cargas | Baja | Media |
| SUE | % bruto por tramo SENCE | Alta | Media |
| PGU por tramo etario | Monto máx. según edad/mes | Media | Media |

---

## Checklist al cerrar un post

```text
[ ] Redactado en articles.ts (slug del plan)
[ ] date / updatedAt / keywords / faq si aplica
[ ] Links solo a URLs que existen hoy
[ ] Fuentes oficiales al pie
[ ] Disclaimer YMYL
[ ] npm run typecheck
[ ] ~~Tachar~~ en Progreso + Calendario + Detalle de este doc
[ ] Contador Hechos: N/45 actualizado
[ ] T+3: site: + GSC si no indexa
```

---

*No borrar filas publicadas: tachar y dejar rastro de slug + fecha.*
