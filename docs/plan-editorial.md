# Plan editorial integrado — CalculaChile (2026-H2 → 2027-H1)

| | |
|---|---|
| **Producto** | calculadorachile.cl — 39 calculadoras · SEO orgánico + AdSense |
| **Objetivo** | Maximizar **pageviews → impresiones AdSense**. Fit a calculadora = preferible, no obligatorio. |
| **Consolidación** | 2026-07-10 · formato blog/guía 2026-07-11 |
| **Estado** | **Único plan editorial operativo** del repo |

## Fuentes de research (en uso)

| Código | Archivo | Rol |
|--------|---------|-----|
| **B** | [`research/deep-research.md`](./research/deep-research.md) | 30 dossiers (`DR[n]`): cifras, queries, fuentes |
| **C** | [`research/inventario-seo.md`](./research/inventario-seo.md) | Temas SEO con montos, fechas y fuentes oficiales |

Contexto: [`contexto.md`](./contexto.md). Código: blog → `src/data/articles.ts` · guías → `src/data/guias.ts`.

---

## Formato: blog vs guía

| | **blog** | **guía** |
|---|----------|----------|
| URL | `/blog/{slug}` | `/guias/{slug}` |
| Pregunta | ¿Cuánto / cuándo / qué cambió **ahora**? | ¿Cómo funciona **todo** el tema? |
| Tamaño | ~800–1.500+ palabras, un `content` | ~2.000–3.500, `sections` H2/H3 |
| Cadencia | 1–2 / semana (este plan) | Pocas al año |
| Uso SEO | Captura + pageview AdSense | Autoridad del cluster |

**Regla de 10 segundos**

1. ¿Tiene **fecha, monto del año o hito legal**? → **blog**  
2. ¿Es el **manual del tema** y **no** hay `/guias/...`? → **guía**  
3. ¿Ya hay guía del cluster? → **blog** satélite (no otra guía)

**En este plan:** ~95% **blog**.  
**Única guía obligada del backlog:** **#39** Operación Renta 2027.  
**Candidatas a guía después** (solo si el blog rankea o falta pillar): #47 licencia médica, #48 contratos, #31 cesantía (ampliada).

### Guías pillar ya existentes (no duplicar)

| Guía (`/guias/…`) | Blogs del plan que cuelgan de ella (satélites) |
|-------------------|-----------------------------------------------|
| `sueldo-liquido-chile` | #1, #2 ✅, #3, #19 |
| `finiquito-laboral-chile` | #6, #28, #31 |
| `uf-utm-indicadores-chile` | #17 |
| `iva-boleta-honorarios-chile` | #12, #13, #24, #32 |
| `credito-hipotecario-chile` | #14, #43 |
| `afp-pension-chile` | #8, #22, #23, #49 |
| `comprar-vivienda-chile` / MINVU | #26 |
| `vehiculos-chile-permiso-multas` | #20 ✅, #40, #46 ✅ |
| `familia-pension-alimenticia-chile` | #9, #38 |
| `credito-cae-educacion-chile` | CAE ✅ |
| `empresas-pymes-chile` | #1, #19, #45 |
| `hogar-servicios-basicos-chile` | #4 |

### Leyenda columna **Formato**

| Valor | Significado |
|-------|-------------|
| **blog** | Escribir en `articles.ts` |
| **guía** | Escribir en `guias.ts` (solo #39 en el plan) |
| **blog\*** | Blog primero; **candidata** a guía pillar más adelante |

---

## Prioridad

| Nivel | Criterio (ref. 2026-07-10) |
|-------|----------------------------|
| **P1** | Fit calculadora **alto** + ventana ≤ ~8 semanas + dossier/inventario |
| **P2-ventana** | Pico o fecha legal acotada |
| **P2-continuo** | Evergreen / sin deadline |
| **P3** | Ene 2027 / relleno |

---

## Publicados

| # | Formato | Título | slug | Fecha | Cluster | Calc |
|--:|--------|--------|------|-------|---------|------|
| 20 | blog | Segunda cuota permiso de circulación 2026 | `permiso-circulacion-segunda-cuota-agosto-2026` | 2026-07-09 | vehículos | permiso, multas |
| 46 | blog | Revisión técnica 2026: calendario por patente | `revision-tecnica-chile-2026-calendario-patente` | 2026-07-10 | vehículos | permiso |
| 1 | blog | Cotización empleador 3,5% desde agosto 2026 | `cotizacion-empleador-3-5-agosto-2026-costo-pyme` | 2026-07-15 | laboral | costo-empleado, sueldo |
| 37→ | blog | CAE 2026: cuota, renegociación y condonación | `cae-renegociacion-condonacion-2026` | 2026-05-16 | educación | credito-cae |
| 7 | blog | Aguinaldo Fiestas Patrias 2026 (IPS + SP) | `aguinaldo-fiestas-patrias-2026-pensionados-sector-publico` | 2026-07-10 | beneficios | aguinaldo |
| 2 | blog | Horas extra con jornada de 42 horas Chile 2026 | `horas-extra-jornada-42-horas-chile-2026` | 2026-07-11 | laboral | horas-extra |

**Notas:** #37 unificado al CAE ya en prod · #7 unifica IPS+SP · evergreen viejos en `articles.ts` no se listan aquí.

---

## Plan integrado (pendientes)

Ordenado por **fecha de publicación sugerida**.

| # | Formato | Título | Slug | DR / nota | Cluster | Fecha | Pico | Prioridad |
|--:|--------|--------|------|-----------|---------|-------|------|-----------|
| ~~2~~ | blog | ~~Horas extra jornada 42 h~~ | ~~`horas-extra-jornada-42-horas-chile-2026`~~ | — | laboral | ~~2026-07-11~~ | ago–oct | ✅ |
| 3 | blog | Sueldo mínimo 2026 $553.553 → líquido | `sueldo-minimo-2026-calcular-liquido` | satélite `sueldo-liquido-chile` | laboral | 2026-08-05 | ago–dic | **P1** |
| 4 | blog | Subsidio eléctrico 2026: resultados y descuento | `subsidio-electrico-2026-resultados-descuento-cuenta` | DR[25] | hogar | 2026-08-18 | ago–sep | **P2-ventana** |
| 5 | blog | BTM/SEJ pago anual + puente SUE | `bono-trabajo-mujer-sej-pago-anual-2026-sue` | DR[13] | empleo | 2026-08-21 | ago | **P2-ventana** |
| 6 | blog | Finiquito 2026 con sueldo mínimo | `finiquito-2026-ejemplo-sueldo-minimo` | DR[12] · satélite finiquito | laboral | 2026-08-23 | continuo | **P1** |
| 8 | blog | Aumento PGU sep 2026 (75+) | `pgu-aumento-septiembre-2026-75-anos` | DR[19] soporte · satélite AFP | pensión | 2026-08-28 | sep | **P1** |
| 9 | blog | Asignación familiar 2026: tramos y montos | `asignacion-familiar-2026-tramos-montos` | satélite familia | familia | 2026-09-01 | sep–dic | **P1** |
| 10 | blog | Feriados irrenunciables 18–19 sep 2026 | `feriados-irrenunciables-18-19-septiembre-2026-comercio` | — | laboral | 2026-09-03 | pre 18–19 sep | **P2-ventana** |
| 11 | blog | Contribuciones 3.ª cuota 30 sep | `contribuciones-tercera-cuota-septiembre-2026` | DR[27] | vivienda | 2026-09-05 | 30 sep | **P2-ventana** |
| 12 | blog | Boleta honorarios retención 15,25% | `boleta-honorarios-retencion-15-25-2026` | DR[24] · satélite iva-boleta | impuestos | 2026-09-08 | continuo | **P2-continuo** |
| 47 | blog\* | Licencia médica 2026: quién paga y SIL | `licencia-medica-2026-quien-paga-sil` | DR[7] · *candidata guía* | laboral | 2026-09-10 | continuo | **P2-continuo** |
| 13 | blog | Formulario 29 + IVA mensual | `formulario-29-iva-mensual-plazos-2026` | satélite iva-boleta | impuestos | 2026-09-11 | ~día 12 | **P2-ventana** |
| 48 | blog\* | Contrato indefinido / plazo / honorarios | `contrato-indefinido-plazo-fijo-honorarios-2026` | DR[8] · *candidata guía* | laboral | 2026-09-12 | continuo | **P2-continuo** |
| 14 | blog | Subsidio crédito hipotecario MINVU | `subsidio-credito-hipotecario-minvu-dividendo-2026` | satélite hipoteca | vivienda | 2026-09-15 | sep–may 2027 | **P2-ventana** |
| 15 | blog | Gratificación legal tope 4,75 IMM | `gratificacion-legal-tope-2026-ingreso-minimo` | evergreen blog | laboral | 2026-09-18 | sep–dic | **P2-ventana** |
| 16 | blog | Subsidio Unificado al Empleo (Ley 21.808) | `subsidio-unificado-empleo-ley-21808-octubre-2026` | DR[13] | empleo | 2026-09-22 | sep–nov | **P2-ventana** |
| 17 | blog | UF y UTM: convertir y usos 2026 | `uf-utm-convertir-chile-2026-usos` | satélite `uf-utm-indicadores` | conversiones | 2026-09-25 | continuo | **P2-continuo** |
| 18 | blog | Aporte Familiar Permanente 2026 (9 meses) | `aporte-familiar-permanente-2026-cobro-plazo` | pageview | familia | 2026-09-29 | oct–nov | **P2-ventana** |
| 19 | blog | Costo empleado PYME + cotización empleador | `costo-empleado-pyme-2026-cotizacion-empleador` | DR[19] · satélite pymes | empresas | 2026-10-02 | oct | **P2-ventana** |
| 21 | blog | Impuesto 2.ª categoría 2026: ejemplo | `impuesto-segunda-categoria-2026-ejemplo` | satélite sueldo | impuestos | 2026-10-06 | continuo | **P2-continuo** |
| 49 | blog | Cambio de AFP 2026: cómo hacerlo | `cambio-afp-2026-como-hacerlo` | DR[14] · hermano #22 | pensión | 2026-10-07 | continuo | **P2-continuo** |
| 22 | blog | Comisiones AFP 2026: comparar descuento | `comisiones-afp-2026-comparar-descuento` | DR[14] · satélite AFP | pensión | 2026-10-09 | continuo | **P2-continuo** |
| 23 | blog | APV 2026: ahorro y efecto tributario | `apv-2026-simulador-ahorro-tributario` | DR[17] | pensión | 2026-10-13 | oct–abr | **P2-ventana** |
| 50 | blog | Reforma tributaria Ley 21.713 (2026) | `reforma-tributaria-ley-21713-2026-personas-pymes` | DR[23] · **no** mega-guía | impuestos | 2026-10-14 | 2026 | **P2-continuo** |
| 24 | blog | Cotización independientes 2026 | `cotizacion-independientes-2026-boleta` | DR[16] · satélite boleta | previsional | 2026-10-16 | oct–abr | **P2-ventana** |
| 25 | blog | Reajuste arriendo UF/IPC 2026 | `reajuste-arriendo-uf-ipc-2026-ejemplo` | evergreen blog | vivienda | 2026-10-20 | continuo | **P2-continuo** |
| 26 | blog | Subsidio habitacional DS01/DS49 | `subsidio-habitacional-ds01-ds49-ahorro-uf-2026` | DR[28] · satélite vivienda | vivienda | 2026-10-23 | continuo | **P2-continuo** |
| 27 | blog | Vacaciones proporcionales 2026 | `vacaciones-proporcionales-2026-calcular` | DR[11] · evergreen | laboral | 2026-10-27 | continuo | **P2-continuo** |
| 28 | blog | Indemnización años servicio tope 90 UF | `indemnizacion-anos-servicio-tope-90-uf-2026` | satélite finiquito | laboral | 2026-10-30 | continuo | **P2-continuo** |
| 29 | blog | Contribuciones 4.ª cuota 30 nov | `contribuciones-cuarta-cuota-noviembre-2026` | DR[27] | vivienda | 2026-11-03 | 30 nov | **P2-ventana** |
| 30 | blog | Aguinaldo Navidad pensionados 2026 | `aguinaldo-navidad-pensionados-2026` | — | pensión | 2026-11-10 | nov–dic | **P2-ventana** |
| 31 | blog\* | Seguro de cesantía + finiquito (AFC) | `seguro-cesantia-finiquito-2026-afc` | DR[12] · *candidata guía* si crece | laboral | 2026-11-13 | continuo | **P2-continuo** |
| 32 | blog | PPM 2026 independientes y empresas | `ppm-2026-calcular-independientes` | satélite iva-boleta | impuestos | 2026-11-17 | nov–abr | **P2-ventana** |
| 33 | blog | Plusvalía venta propiedad 2026 | `plusvalia-venta-propiedad-2026-calcular` | evergreen blog | vivienda | 2026-11-20 | continuo | **P2-continuo** |
| 34 | blog | Feriado irrenunciable 25 dic 2026 | `feriado-irrenunciable-25-diciembre-2026-comercio` | — | laboral | 2026-12-01 | dic | **P2-ventana** |
| 35 | blog | Aguinaldo Navidad sector público 2026 | `aguinaldo-navidad-sector-publico-2026` | — | laboral | 2026-12-04 | dic | **P2-ventana** |
| 36 | blog | Gratificación fin de año 2026 | `gratificacion-fin-de-ano-2026-anticipos` | — | laboral | 2026-12-08 | dic–ene | **P2-ventana** |
| 38 | blog | Pensión alimenticia 2026: ejemplo | `pension-alimenticia-2026-ejemplo-calculo` | satélite familia | familia | 2026-12-15 | continuo | **P2-continuo** |
| **39** | **guía** | **Prep Operación Renta 2027 (checklist)** | `preparacion-operacion-renta-2027-checklist` | DR[20] · **única guía del plan** | impuestos | 2027-01-06 | ene–abr | **P2-ventana** |
| 40 | blog | Permiso circulación 2027 | `permiso-circulacion-2027-calcular-plazo` | satélite vehículos | vehículos | 2027-01-13 | ene–mar | **P3** |
| 41 | blog | Intereses por mora | `intereses-mora-chile-2026-calcular` | — | finanzas | 2027-01-16 | continuo | **P3** |
| 42 | blog | Sueldo mínimo 2027 | `sueldo-minimo-2027-reajuste-simular-liquido` | satélite sueldo | laboral | 2027-01-20 | ene | **P3** |
| 43 | blog | Crédito hipotecario 2027 UF | `credito-hipotecario-2027-simular-dividendo` | satélite hipoteca | vivienda | 2027-01-23 | continuo | **P3** |
| 44 | blog | Costo notaría compraventa 2027 | `costo-notaria-compraventa-2027-estimar` | DR[30] | vivienda | 2027-01-27 | continuo | **P3** |
| 45 | blog | Patente comercial 2027 | `patente-comercial-2027-calcular` | satélite pymes | empresas | 2027-01-29 | ene–mar | **P3** |

**Conteo pendientes:** 44 filas activas (+ #2 ya en publicados).

| Formato en pendientes | Cantidad |
|-----------------------|----------|
| **blog** | 40 |
| **blog\*** (candidata guía) | 3 (#47, #48, #31) |
| **guía** | **1** (#39) |

### Sub-orden P2

| Subnivel | Uso | IDs |
|----------|-----|-----|
| **P2-ventana** | Antes del pico | #4, #5, #10, #11, #13–#16, #18, #19, #23, #24, #29–#30, #32, #34–#36, **#39 (guía)** |
| **P2-continuo** | Sin deadline | #12, #17, #21, #22, #25–#28, #31, #33, #38, #47–#50 |

---

## Duplicados unificados

| Nombre canónico (SEO) | Fuentes unificadas | Descartes / alias |
|-----------------------|--------------------|-------------------|
| Aguinaldo Fiestas Patrias 2026 (IPS + sector público) | Plan #7 ✅ · Inventario (2 filas IPS y SP) | No mantener dos posts FP separados; ya publicado unificado |
| Cotización empleador 3,5% ago 2026 | Plan #1 ✅ · Inventario · DR[19] parcial | No post extra “reforma 3,5%”; hub reforma = solo dossier |
| CAE 2026 cuota / renegociación | Plan #37 · Article `cae-renegociacion-condonacion-2026` ✅ | Slug plan `cae-2026-simular-…` descartado como pendiente |
| BTM + SEJ pago anual 2026 (puente SUE) | Plan #5 · DR[13] · Inventario BTM+SEJ | Un post #5; no tres posts BTM/SEJ/SPTJ |
| Subsidio Unificado al Empleo (Ley 21.808) | Plan #16 · DR[13] · Inventario SUE | Nombre canónico con número de ley |
| Subsidio eléctrico 2026 | Plan #4 · DR[25] · Inventario | — |
| Horas extra / jornada 42 h | Plan #2 · Inventario Ley 21.561 | DR[9] semana corrida **no** se fusiona a #2 |
| Finiquito / término de contrato | Plan #6 · DR[12] · Inventario cesantía (parcial #31) | #6 y #31 siguen separados (ángulo finiquito vs AFC) |
| Vacaciones proporcionales | Plan #27 · DR[11] parcial · evergreen | Feriado legal general no sustituye #27 |
| Boleta honorarios 15,25% | Plan #12 · DR[24] · Inventario · evergreen | DR[21] boleta electrónica de **ventas** es otro tema |
| Cotización independientes 2026 | Plan #24 · DR[16] · Inventario | Nombre canónico con reforma |
| APV 2026 | Plan #23 · DR[17] | — |
| Comisiones AFP vs cambio de AFP | Plan #22 · extensión #49 · DR[14] · evergreen | **Dos hermanos:** #22 comparar comisiones · #49 cómo cambiar (query transaccional) |
| Contrato indefinido / plazo / honorarios | Extensión #48 · DR[8] | Promovido desde huérfano DR (pageview laboral) |
| Licencia médica / SIL | Extensión #47 · DR[7] | Promovido desde huérfano DR (pageview evergreen) |
| Reforma tributaria 21.713 | Extensión #50 · DR[23] | Promovido desde huérfano DR (contexto fiscal 2026) |
| Contribuciones 3.ª y 4.ª cuota | Plan #11 + #29 · DR[27] · Inventario | **Dos posts** (picos sep y nov); un dossier compartido |
| Subsidio habitacional DS01/DS49 | Plan #26 · DR[28] · Inventario · evergreen MINVU | Distinto de #14 (subsidio al dividendo) |
| Operación Renta 2027 / devolución | Plan #39 · DR[20] · Inventario cotiz. indep. renta | #39 canónico tipo guía |
| Escrituración / costo notaría | Plan #44 · DR[30] | DR aporta CBR e impuesto al mutuo |
| Aguinaldo Navidad pensionados vs SP | Plan #30 + #35 · Inventario | **No fusionar** (audiencias distintas) |
| Gratificación tope IMM vs fin de año | Plan #15 + #36 | **No fusionar** (ángulo distinto) |
| Feriados irrenunciables sep vs dic | Plan #10 + #34 · Inventario | **No fusionar** |
| PGU aumento 75+ | Plan #8 · Inventario · DR[19] soporte | — |
| Asignación familiar 2026 | Plan #9 · Inventario | — |
---

## Temas deep research sin lugar en plan

Dossiers de **B** que **siguen fuera** del backlog de posts (tras promover #47–#50). Justificación breve.

| DR | Tema | Justificación |
|----|------|---------------|
| DR[2] | Renovación licencia de conducir 2026 | Costo municipal variable; sin calc fuerte |
| DR[3] | Traspaso de vehículo 2026 | Solapa débil con notaría (#44); no es el mismo post |
| DR[4] | Multas de tránsito 2026 | Solo CTA en plan; reabrir si hace falta volume vehículos |
| DR[5] | TAG y autopistas urbanas | Sin calc; comercial por concesionaria |
| DR[6] | Robo o pérdida de patente | Nicho |
| DR[9] | Semana corrida 2026 | Solape parcial con #2 (no unificar) |
| DR[10] | Fuero maternal y postnatal | YMYL denso; reabrir si hay capacidad |
| DR[15] | Retiros de fondos previsionales 2026 | Sin retiro general vigente; riesgo clickbait |
| DR[18] | Bono por hijo 2026 | Plan A lo dejó fuera; candidato calc más que post |
| DR[19] | Reforma previsional 21.735 “explicada” | Dossier **padre** de #1/#8/#24; no post hub duplicado |
| DR[21] | Boleta electrónica de ventas SII | Distinto de honorarios (#12) |
| DR[22] | Declarar arriendos en el SII | Distinto de reajuste UF (#25) |
| DR[26] | Cambio de distribuidora eléctrica | Bajo fit |
| DR[29] | Registro Social de Hogares | Pageview social; sin calc |

**Promovidos a extensión (ya no huérfanos de backlog):** DR[7]→#47 · DR[8]→#48 · DR[14] ángulo “cómo cambiar”→#49 · DR[23]→#50.

### Inventario (C) sin fila en plan A

Temas del inventario **no** cubiertos por pendientes/publicados del plan (no se crean posts nuevos aquí):

| Tema inventario | Justificación breve del descarte como post del plan |
|-----------------|------------------------------------------------------|
| Bono de Invierno 2026 | Pico mayo pasado |
| SUF / Subsidio Familiar | Nicho beneficios; plan A no lo programó |
| Subsidio discapacidad menores | Nicho; sin calc |
| Bonos Seguridades y Oportunidades (Protección, Base, Niño Sano, Asistencia, Logro, Formalización) | Nicho MDSF; reabrir solo si falta volume AdSense |
| Bono Bodas de Oro | Calc en **410**; no reactivar sin fórmula verificada |
| Asignación por muerte | Bajo volumen editorial planificado |
| Subsidio de arriendo 2026 | Ventana postulación jul–ago ya límite en plan original |
| Subsidio cotización trabajadores jóvenes | Cierre / transición a SUE (#16) |
| Préstamo solidario 2021 (última cuota) | Ciclo renta 2026 ya avanzado |
| IVA compras internacionales ≤ US$500 | Nicho comercio exterior |
| Subsidio calefacción Aysén | Regional |
| Bono recuperación / Bolsillo electrónico emergencia | Event-driven; no calendarizable |
| Beca práctica TP / Pase cultural | Educación/cultura; fuera de core calculadoras |
| Subsidio cesantía IPS (no AFC) | Nicho vs #31 AFC |
| Seguro de lagunas previsionales | Reforma; mejor dentro de hub 21.735 si algún día se abre |
| Bono docentes jubilados | Nicho sectorial |
| Compensación diferencia expectativa de vida (mujeres) | Cubierto como subtema de reforma/DR[19], no post aparte en A |
| Beneficio por años cotizados | Plan A lo dejó como candidato a **calc**, no post del backlog 45 |
| Independientes en Seguro Social (1% adicional) | Solapa #24; no fila extra |
| Jornada bisemanal 21.561 | Subtema de #2 / DT; no post aparte en A |

---

## Posts del plan sin dossier deep research

Pendientes de **A** sin sección clara `DR[n]` dedicada. Prioridad de investigación (para cerrar hueco de datos antes de redactar):

### Prioridad 1 — investigar ya (sprint / ≤ ~8 semanas)

| # | slug | Por qué primero |
|---|------|-----------------|
| 3 | `sueldo-minimo-2026-calcular-liquido` | IMM ancla muchos cálculos; alto volumen |
| 8 | `pgu-aumento-septiembre-2026-75-anos` | Pico septiembre; monto etario YMYL |
| 9 | `asignacion-familiar-2026-tramos-montos` | Tramos SUSESO reajustados con IMM |
| 10 | `feriados-irrenunciables-18-19-septiembre-2026-comercio` | Fecha fija; alto CTR estacional |

### Prioridad 2 — con inventario o evergreen, pero sin DR

| # | Slug | Nota |
|---|------|------|
| 13 | `formulario-29-iva-mensual-plazos-2026` | Inventario F29; evergreen IVA |
| 14 | `subsidio-credito-hipotecario-minvu-dividendo-2026` | Inventario MINVU; no es DR[28] |
| 15 | `gratificacion-legal-tope-2026-ingreso-minimo` | Inventario + evergreen |
| 17 | `uf-utm-convertir-chile-2026-usos` | Evergreen UF; valores live del sitio |
| 18 | `aporte-familiar-permanente-2026-cobro-plazo` | Inventario AFPER (pageview) |
| 19 | `costo-empleado-pyme-2026-cotizacion-empleador` | Extiende #1; inventario cotización |
| 21 | `impuesto-segunda-categoria-2026-ejemplo` | SII; sin DR dedicado |
| 25 | `reajuste-arriendo-uf-ipc-2026-ejemplo` | Evergreen |
| 28 | `indemnizacion-anos-servicio-tope-90-uf-2026` | Evergreen |
| 30 | `aguinaldo-navidad-pensionados-2026` | Inventario montos Navidad IPS |
| 31 | `seguro-cesantia-finiquito-2026-afc` | Inventario AFC |
| 32 | `ppm-2026-calcular-independientes` | SII |
| 33 | `plusvalia-venta-propiedad-2026-calcular` | Evergreen |
| 34 | `feriado-irrenunciable-25-diciembre-2026-comercio` | Inventario |
| 35 | `aguinaldo-navidad-sector-publico-2026` | Inventario / Ley 21.806 |
| 36 | `gratificacion-fin-de-ano-2026-anticipos` | Inventario gratificación |
| 38 | `pension-alimenticia-2026-ejemplo-calculo` | Calc existe; sin DR |

### Prioridad 3 — ciclo 2027 / bajo volumen

| # | Slug |
|---|------|
| 40 | `permiso-circulacion-2027-calcular-plazo` |
| 41 | `intereses-mora-chile-2026-calcular` |
| 42 | `sueldo-minimo-2027-reajuste-simular-liquido` |
| 43 | `credito-hipotecario-2027-simular-dividendo` |
| 45 | `patente-comercial-2027-calcular` |

*(#44 tiene DR[30]; no está en esta lista.)*

### Pendientes que **sí** tienen dossier DR (referencia rápida)

| # | DR |
|---|-----|
| 4 | DR[25] |
| 5, 16 | DR[13] |
| 6 | DR[12] |
| 11, 29 | DR[27] |
| 12 | DR[24] |
| 22, 49 | DR[14] *(comparar vs cómo cambiar)* |
| 23 | DR[17] |
| 24 | DR[16] |
| 26 | DR[28] |
| 27 | DR[11] |
| 39 | DR[20] |
| 44 | DR[30] |
| 47 | DR[7] |
| 48 | DR[8] |
| 50 | DR[23] |
| 8 *(soporte)* | DR[19] |

---

## Extensión del plan: candidatos #47–#50 (decisión)

### Decisión (2026-07-10): **SÍ incorporar**

Objetivo del producto = **pageviews AdSense**, no solo fit calculadora. La restricción “no inventar posts fuera de A” protegió el cuadre inicial, pero dejaba **4 dossiers listos** sin fila. Se promueven a backlog con IDs **#47–#50** (origen `extensión+DR`, no inventados sin fuente).

| # | Título canónico | Slug | DR | Fit calc | Por qué entra | Relación con backlog |
|--:|-----------------|------|-----|----------|---------------|----------------------|
| 47 | Licencia médica 2026: quién paga, plazos y SIL | `licencia-medica-2026-quien-paga-sil` | DR[7] | bajo | Evergreen alto volumen; dossier completo; sin bloqueadores legales abiertos en DR | Refuerza cluster laboral; CTA suave a sueldo-liquido / finiquito si aplica |
| 48 | Contrato indefinido vs plazo fijo vs honorarios 2026 | `contrato-indefinido-plazo-fijo-honorarios-2026` | DR[8] | medio | Query “tipo de contrato” recurrente; enlaza sueldo-liquido + boleta | Hermano de #12 y #2; no reemplaza boleta honorarios |
| 49 | Cambio de AFP 2026: cómo hacerlo | `cambio-afp-2026-como-hacerlo` | DR[14] | alto | Query **transaccional** real; #22 cubre solo “comparar comisiones” | **Hermano de #22** (no fusionar en un solo H1: dos intents) |
| 50 | Reforma tributaria Ley 21.713 (2026) | `reforma-tributaria-ley-21713-2026-personas-pymes` | DR[23] | bajo | Búsqueda de contexto fiscal 2026; dossier hecho | Distinto de #39 (checklist renta) y de hub previsional DR[19] |

**Qué queda fuera a propósito (no #51+ por ahora):** DR[2] licencia conducir, DR[4] multas como post, DR[10] fuero, DR[15] retiros, DR[29] RSH — ver sección “sin lugar”.

**Ritmo:** 45 pendientes / ~24 semanas ≈ **1,9 posts/semana** (antes 1,7). Sigue sostenible si se prioriza P1 → P2-ventana → P2-continuo (#47–#50 entran en el bulk continuo de sep–oct).

---

## Validación de conteos

```text
Antes de dedupe (menciones en los 3 artefactos):
  Plan A:           46  (#1–#45 + #46)
  Deep research B:  30  (DR[1]–DR[30])
  Inventario C:     52
  Suma bruta:      128

Núcleo post-dedupe (catálogo A + CAE):
  Publicados:                    5
  Pendientes del plan A:        41
  Subtotal núcleo:              46  ✓

Extensión AdSense (decisión 2026-07-10):
  #47–#50 desde DR huérfanos:    4

Plan integrado operativo:
  Publicados:                    6  (todos blog)
  Pendientes:                   44
    blog:                       40
    blog* (candidata guía):      3   (#47, #48, #31)
    guía:                        1   (#39 Operación Renta)
    P1:                          4   (#3, #6, #8, #9) todos blog
    P2:                         34
    P3:                          6
  Total publicados + pendientes: 50
```



### Checklist de cruce de los tres archivos

| Paso | Hecho |
|------|-------|
| Cada pendiente de A mapeado a B y/o C en columnas Origen / Dossier | Sí |
| Cada DR[1–30] clasificado (con lugar / sin lugar / extensión) | Sí |
| Temas de C sin fila en A listados con descarte | Sí |
| Duplicados con nombre canónico | Sí |
| Research en `docs/research/` | Sí |
| Extensión #47–#50 documentada y en tabla de pendientes | Sí |
| Docs limpios (sin plan SUPERSEDED ni dumps de sesión) | Sí |

---

## Uso operativo

1. **Siguiente (P1, blog):** #3 `sueldo-minimo-2026-calcular-liquido` → `articles.ts`.  
2. **Cola P2-ventana** (blogs) antes que relleno continuo.  
3. **#39 (guía):** en ene 2027 escribir en `guias.ts`, no en blog.  
4. **#47 / #48 / #31 (blog\*):** blog primero; evaluar guía solo si rankean.  
5. **Antes de publicar:** revalidar montos (T−1).  
6. **Tras publicar:** tachar aquí; si es blog → `articles.ts`; si es guía → `guias.ts`.

---

*Plan editorial + research B/C + extensión #47–#50. No sustituye verificación YMYL el día de publicación.*
