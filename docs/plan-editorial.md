# Plan editorial integrado — CalculaChile (2026-H2 → 2027-H1)

| | |
|---|---|
| **Producto** | calculadorachile.cl — 39 calculadoras · SEO orgánico + AdSense |
| **Objetivo** | Maximizar **pageviews → impresiones AdSense**. Fit a calculadora = preferible, no obligatorio. |
| **Consolidación** | 2026-07-10 |
| **Estado** | **Único plan editorial operativo** del repo |

## Fuentes de research (en uso)

| Código | Archivo | Rol |
|--------|---------|-----|
| **B** | [`research/deep-research.md`](./research/deep-research.md) | 30 dossiers (`DR[n]`): cifras, queries, fuentes |
| **C** | [`research/inventario-seo.md`](./research/inventario-seo.md) | Temas SEO con montos, fechas y fuentes oficiales |

Contexto de producto/Grok/YMYL: [`contexto.md`](./contexto.md).  
Research en **`docs/research/`**. El backlog de posts está **solo en este archivo**.

**Publicados en producción** se verificaron en `src/data/articles.ts`.

**Reglas**

1. No inventar slugs fuera de este plan o de posts ya en `articles.ts`.
2. Al redactar, abrir el `DR[n]` y/o la fila de inventario cuando existan.
3. **Extensión #47–#50:** pageview AdSense desde DR huérfanos (decisión 2026-07-10).
4. Patrón de publicación: el de `articles.ts` (frontmatter + HTML prose); este doc no escribe posts.

**Prioridad**

| Nivel | Criterio (ref. 2026-07-10) |
|-------|----------------------------|
| **P1** | Fit calculadora **alto** + ventana de publish/pico **≤ 8 semanas** (hasta ~2026-09-04) + dossier disponible (**DR** o **inventario** con montos/fechas + fuente) |
| **P2** | Fit medio **o** dossier disponible pero ventana no urgente. *Dentro de P2 usar sub-orden abajo.* |
| **P2-ventana** | P2 con **fecha o pico acotado** en las próximas ~12 semanas (útil sep–dic) |
| **P2-continuo** | P2 evergreen / “todo el año” (sin urgencia de calendario) |
| **P3** | Sin fit fuerte + sin dossier + ventana amplia / relleno ene 2027 |

---

## Publicados

| # plan | Título | slug | Fecha (`date`) | Cluster | Calculadora enlazada |
|-------:|--------|------|----------------|---------|----------------------|
| 20 | Segunda cuota permiso de circulación 2026 | `permiso-circulacion-segunda-cuota-agosto-2026` | 2026-07-09 | vehículos | permiso-circulacion, multas-transito |
| 46 | Revisión técnica 2026: calendario por patente | `revision-tecnica-chile-2026-calendario-patente` | 2026-07-10 | vehículos | permiso-circulacion |
| 1 | Cotización empleador 3,5% desde agosto 2026 | `cotizacion-empleador-3-5-agosto-2026-costo-pyme` | 2026-07-15 | laboral / previsional | costo-empleado-pyme, sueldo-liquido |
| 37→ | CAE 2026: cuota, renegociación y condonación | `cae-renegociacion-condonacion-2026` | 2026-05-16 | educación / deuda | credito-cae |
| 7 | Aguinaldo Fiestas Patrias 2026 (IPS + sector público) | `aguinaldo-fiestas-patrias-2026-pensionados-sector-publico` | 2026-07-10 | beneficios / laboral | aguinaldo, sueldo-liquido |
| 2 | Horas extra con jornada de 42 horas Chile 2026 | `horas-extra-jornada-42-horas-chile-2026` | 2026-07-11 | laboral | horas-extra, sueldo-liquido |

**Notas**

- **#37** del plan original (`cae-2026-simular-cuota-renegociacion`) se unifica al post CAE ya en producción (slug canónico de la tabla). No reaparece en pendientes.
- **#7** unifica en un solo post los dos temas de inventario (aguinaldo IPS + aguinaldo sector público FP).
- **#46** no estaba en el backlog 1–45 original; se mantiene como pieza publicada del sprint vehículos.
- Existen evergreen previos en `articles.ts` (finiquito, UF, boleta, horas extra, etc.). No se listan aquí como “publicados del plan”; si un pendiente solapa evergreen, se anota en **Origen**.

---

## Plan integrado (pendientes)

Ordenado por **fecha de publicación sugerida** (del plan A; sprint de arranque para #2/#3).

| # | Título | Slug | Origen | Dossier deep research | Fit calculadora | Cluster | Fecha sugerida | Ventana pico | Prioridad |
|--:|--------|------|--------|----------------------|-----------------|---------|----------------|--------------|-----------|
| ~~2~~ | ~~Horas extra con jornada de 42 horas Chile 2026~~ | ~~`horas-extra-jornada-42-horas-chile-2026`~~ | plan+inventario | — · evergreen: `guia-horas-extra-chile` | alto | laboral | ~~2026-07-11~~ | ago–oct 2026 | ✅ **publicado** |
| 3 | Sueldo mínimo 2026 $553.553: recalcular líquido | `sueldo-minimo-2026-calcular-liquido` | plan+inventario | — | alto | laboral | 2026-08-05 | ago–dic 2026 | **P1** |
| 4 | Subsidio eléctrico 2026: resultados y descuento en la cuenta | `subsidio-electrico-2026-resultados-descuento-cuenta` | plan+DR+inventario | DR[25] subsidio eléctrico | medio | hogar / servicios | 2026-08-18 | ago–sep 2026 (resultados + descuento) | **P2-ventana** |
| 5 | Pago anual BTM y SEJ 2026 y puente al Subsidio Unificado | `bono-trabajo-mujer-sej-pago-anual-2026-sue` | plan+DR+inventario | DR[13] BTM/SEJ → SUE | medio | empleo / beneficios | 2026-08-21 | ago 2026 | **P2-ventana** |
| 6 | Finiquito 2026 con sueldo mínimo: ejemplo paso a paso | `finiquito-2026-ejemplo-sueldo-minimo` | plan+DR+inventario | DR[12] renuncia vs despido | alto | laboral | 2026-08-23 | continuo | **P1** |
| 8 | Aumento PGU septiembre 2026 (75 años o más) | `pgu-aumento-septiembre-2026-75-anos` | plan+inventario | DR[19] reforma 21.735 *(soporte)* | alto | pensión | 2026-08-28 | sep 2026 | **P1** |
| 9 | Asignación familiar 2026: tramos y montos | `asignacion-familiar-2026-tramos-montos` | plan+inventario | — | alto | familia / beneficios | 2026-09-01 | sep–dic 2026 | **P1** |
| 10 | Feriados irrenunciables 18 y 19 de septiembre 2026 (comercio) | `feriados-irrenunciables-18-19-septiembre-2026-comercio` | plan+inventario | — | medio | laboral / comercio | 2026-09-03 | 1–3 sem. previas al 18–19 sep | **P2-ventana** |
| 11 | Contribuciones 2026: 3.ª cuota 30 de septiembre | `contribuciones-tercera-cuota-septiembre-2026` | plan+DR+inventario | DR[27] contribuciones bienes raíces | alto | vivienda / impuestos | 2026-09-05 | 30 sep 2026 | **P2-ventana** |
| 12 | Boleta de honorarios 2026: retención 15,25% | `boleta-honorarios-retencion-15-25-2026` | plan+DR+inventario | DR[24] boleta honorarios | alto | impuestos / independientes | 2026-09-08 | continuo | **P2-continuo** |
| 47 | Licencia médica 2026: quién paga, plazos y SIL | `licencia-medica-2026-quien-paga-sil` | extensión+DR | DR[7] licencia médica | bajo *(pageview AdSense)* | laboral / salud | 2026-09-10 | continuo (evergreen alto) | **P2-continuo** |
| 13 | Formulario 29 e IVA mensual: plazos y cálculo | `formulario-29-iva-mensual-plazos-2026` | plan+inventario | — · evergreen IVA: `guia-iva-chile-2026` | alto | impuestos | 2026-09-11 | cada mes (~día 12) | **P2-ventana** |
| 48 | Contrato indefinido vs plazo fijo vs honorarios 2026 | `contrato-indefinido-plazo-fijo-honorarios-2026` | extensión+DR | DR[8] tipos de contrato | medio | laboral | 2026-09-12 | continuo | **P2-continuo** |
| 14 | Subsidio al crédito hipotecario MINVU: impacto en dividendo | `subsidio-credito-hipotecario-minvu-dividendo-2026` | plan+inventario | — *(distinto de DR[28] habitacional)* | alto | vivienda | 2026-09-15 | sep 2026–may 2027 | **P2-ventana** |
| 15 | Gratificación legal 2026: tope 4,75 IMM | `gratificacion-legal-tope-2026-ingreso-minimo` | plan+inventario | — · evergreen: `como-funciona-gratificacion-legal` | alto | laboral | 2026-09-18 | sep–dic 2026 | **P2-ventana** |
| 16 | Subsidio Unificado al Empleo (Ley 21.808) desde 1 oct 2026 | `subsidio-unificado-empleo-ley-21808-octubre-2026` | plan+DR+inventario | DR[13] transición SUE | medio | empleo / beneficios | 2026-09-22 | sep–nov 2026 | **P2-ventana** |
| 17 | UF y UTM: convertir y usos en 2026 | `uf-utm-convertir-chile-2026-usos` | plan | — · evergreen: `todo-sobre-uf-chile` | alto | conversiones | 2026-09-25 | continuo | **P2-continuo** |
| 18 | Aporte Familiar Permanente 2026: cobro y plazo 9 meses | `aporte-familiar-permanente-2026-cobro-plazo` | plan+inventario | — | bajo *(pageview)* | familia / beneficios | 2026-09-29 | oct–nov 2026 | **P2-ventana** |
| 19 | Costo real de un empleado PYME 2026 (+ cotización empleador) | `costo-empleado-pyme-2026-cotizacion-empleador` | plan+inventario | DR[19] *(contexto reforma)* | alto | laboral / empresas | 2026-10-02 | oct 2026 | **P2-ventana** |
| 21 | Impuesto de segunda categoría 2026: tramos y ejemplo | `impuesto-segunda-categoria-2026-ejemplo` | plan | — | alto | impuestos / laboral | 2026-10-06 | continuo | **P2-continuo** |
| 49 | Cambio de AFP 2026: cómo hacerlo, plazos y multifondos | `cambio-afp-2026-como-hacerlo` | extensión+DR | DR[14] *(ángulo transaccional; hermano de #22)* | alto | pensión | 2026-10-07 | continuo | **P2-continuo** |
| 22 | Comisiones AFP 2026: comparar descuento mensual | `comisiones-afp-2026-comparar-descuento` | plan+DR | DR[14] *(ángulo comparativo)* · evergreen: `comparativa-comisiones-afp-2026` | alto | pensión | 2026-10-09 | continuo | **P2-continuo** |
| 23 | APV 2026: simular ahorro y efecto tributario | `apv-2026-simulador-ahorro-tributario` | plan+DR | DR[17] APV y APVC | alto | pensión / impuestos | 2026-10-13 | oct–abr | **P2-ventana** |
| 50 | Reforma tributaria Ley 21.713: cambios 2026 para personas y PYMES | `reforma-tributaria-ley-21713-2026-personas-pymes` | extensión+DR | DR[23] reforma tributaria 21.713 | bajo *(pageview)* | impuestos | 2026-10-14 | continuo 2026 | **P2-continuo** |
| 24 | Cotización de independientes 2026 (boleta + reforma) | `cotizacion-independientes-2026-boleta` | plan+DR+inventario | DR[16] independientes cotización | alto | previsional / independientes | 2026-10-16 | oct–abr | **P2-ventana** |
| 25 | Reajuste de arriendo por UF e IPC: ejemplo 2026 | `reajuste-arriendo-uf-ipc-2026-ejemplo` | plan | — · evergreen: `reajuste-arriendo-uf-2026` | alto | vivienda | 2026-10-20 | continuo | **P2-continuo** |
| 26 | Subsidio habitacional DS01/DS49: ahorro UF y topes | `subsidio-habitacional-ds01-ds49-ahorro-uf-2026` | plan+DR+inventario | DR[28] subsidio habitacional MINVU · evergreen: `subsidios-minvu-2026-guia` | alto | vivienda | 2026-10-23 | continuo / llamados | **P2-continuo** |
| 27 | Vacaciones proporcionales 2026: cómo se pagan | `vacaciones-proporcionales-2026-calcular` | plan+DR | DR[11] feriado legal / vacaciones · evergreen: `vacaciones-proporcionales-guia` | alto | laboral | 2026-10-27 | continuo | **P2-continuo** |
| 28 | Indemnización por años de servicio: tope 90 UF 2026 | `indemnizacion-anos-servicio-tope-90-uf-2026` | plan | — · evergreen: `calcular-indemnizacion-por-anos` | alto | laboral | 2026-10-30 | continuo | **P2-continuo** |
| 29 | Contribuciones 2026: 4.ª cuota 30 de noviembre | `contribuciones-cuarta-cuota-noviembre-2026` | plan+DR+inventario | DR[27] contribuciones *(compartido con #11)* | alto | vivienda / impuestos | 2026-11-03 | 30 nov 2026 | **P2-ventana** |
| 30 | Aguinaldo de Navidad pensionados 2026 | `aguinaldo-navidad-pensionados-2026` | plan+inventario | — | alto | pensión / beneficios | 2026-11-10 | nov–dic 2026 | **P2-ventana** |
| 31 | Seguro de cesantía y finiquito 2026 (AFC) | `seguro-cesantia-finiquito-2026-afc` | plan+inventario | DR[12] *(parcial término contrato)* | alto | laboral | 2026-11-13 | continuo | **P2-continuo** |
| 32 | PPM 2026 para independientes y empresas | `ppm-2026-calcular-independientes` | plan | — | alto | impuestos | 2026-11-17 | nov–abr | **P2-ventana** |
| 33 | Plusvalía al vender propiedad 2026 | `plusvalia-venta-propiedad-2026-calcular` | plan | — · evergreen: `plusvalia-dfl2-vs-comun-chile` | alto | vivienda / impuestos | 2026-11-20 | continuo | **P2-continuo** |
| 34 | Feriado irrenunciable 25 de diciembre 2026 (comercio) | `feriado-irrenunciable-25-diciembre-2026-comercio` | plan+inventario | — | medio | laboral / comercio | 2026-12-01 | dic 2026 | **P2-ventana** |
| 35 | Aguinaldo Navidad sector público 2026 | `aguinaldo-navidad-sector-publico-2026` | plan+inventario | — | alto | laboral / beneficios | 2026-12-04 | dic 2026 | **P2-ventana** |
| 36 | Gratificación de fin de año 2026: anticipos y tope | `gratificacion-fin-de-ano-2026-anticipos` | plan+inventario | — | alto | laboral | 2026-12-08 | dic 2026–ene 2027 | **P2-ventana** |
| 38 | Pensión alimenticia 2026: ejemplo de cálculo | `pension-alimenticia-2026-ejemplo-calculo` | plan | — | alto | familia | 2026-12-15 | continuo | **P2-continuo** |
| 39 | Prep Operación Renta 2027: checklist (guía pillar) | `preparacion-operacion-renta-2027-checklist` | plan+DR+inventario | DR[20] devolución impuestos / F22 | alto | impuestos | 2027-01-06 | ene–abr 2027 | **P2-ventana** |
| 40 | Permiso de circulación 2027: valor y plazos | `permiso-circulacion-2027-calcular-plazo` | plan | — | alto | vehículos | 2027-01-13 | ene–mar 2027 | **P3** |
| 41 | Intereses por mora Chile: cómo estimar el recargo | `intereses-mora-chile-2026-calcular` | plan | — | medio | finanzas | 2027-01-16 | continuo | **P3** |
| 42 | Sueldo mínimo 2027: reajuste y simular líquido | `sueldo-minimo-2027-reajuste-simular-liquido` | plan | — | alto | laboral | 2027-01-20 | ene 2027 | **P3** |
| 43 | Crédito hipotecario 2027: dividendo en UF | `credito-hipotecario-2027-simular-dividendo` | plan | — | alto | vivienda | 2027-01-23 | continuo | **P3** |
| 44 | Costo notaría compraventa 2027 | `costo-notaria-compraventa-2027-estimar` | plan+DR | DR[30] escrituración compraventa | medio | vivienda | 2027-01-27 | continuo | **P3** |
| 45 | Patente comercial 2027 | `patente-comercial-2027-calcular` | plan | — | alto | empresas | 2027-01-29 | ene–mar | **P3** |

**Conteo pendientes:** 45 filas (41 del plan A + 4 extensión #47–#50).

### Sub-orden operativo dentro de P2

| Subnivel | Uso día a día | Ejemplos |
|----------|---------------|----------|
| **P2-ventana** | Publicar **antes** del pico/fecha legal | #4, #5, #10, #11, #13–#16, #18, #19, #23, #24, #29–#30, #32, #34–#36, #39 |
| **P2-continuo** | Relleno de tráfico sin deadline duro; ideal AdSense | #12, #17, #21, #22, #25–#28, #31, #33, #38, **#47–#50** |

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
  Publicados:                    6  (+ #2 horas extra 42 h · 2026-07-11)
  Pendientes totales:           44
    P1:                          4   (#3, #6, #8, #9)
    P2-ventana + P2-continuo:   34   (incluye #47–#50)
    P3:                          6   (#40–#45)
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

1. **Siguiente post (sprint P1):** #3 `sueldo-minimo-2026-calcular-liquido`.  
2. **Cola P2-ventana** en sep (feriados, contribuciones 3.ª, SUE, AFPER) antes que relleno continuo.  
3. **#47–#50** entran en P2-continuo sep–oct (dossier en `research/deep-research.md`).  
4. **Antes de publicar:** revalidar montos en fuente oficial (T−1).  
5. **Tras publicar:** tachar en **Publicados** / **Pendientes** de este doc y actualizar contadores.  
6. Detalle de fuentes: `DR[n]` en deep-research o fila del inventario.

---

*Plan editorial + research B/C + extensión #47–#50. No sustituye verificación YMYL el día de publicación.*
