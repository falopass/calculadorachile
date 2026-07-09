# Auditoría YMYL — CalculaChile (julio 2026)

**Método:** skill `.agents/skills/auditoria-ymyl` + `AGENTS.md` + catálogo real + adapters + módulos + tests.  
**Herramienta:** `node scripts/audit-ymyl-matrix.mjs` (matriz catálogo ↔ adapter ↔ módulo).  
**Alcance profundo:** top tráfico phase 1 + hallazgos sistémicos. No se reindexaron ni se “mejoraron” fórmulas sin fuente.

**Fecha de informe:** 2026-07-08  
**Estado del catálogo (README/AGENTS):** 39 activas · 8 noIndex · bono-bodas-oro 410.

---

## Resumen ejecutivo

| Métrica | Valor |
|---------|--------|
| Calculadoras con adapter | 39/39 |
| Con al menos 1 **input fantasma** | **8** |
| Campos fantasma totales | **56** |
| Concentración del riesgo | Casi todo en **phase 1** (sueldo, finiquito, boleta, hipotecario, horas extra, UF) |
| Sin `sources` en catálogo | 0 |
| `lastReviewed` | Todas `2026-07-04` (sello de lote; no prueba de review individual) |
| `DisclaimerYMYL.tsx` | Existe pero **no se usa** en páginas (sí hay `LegalNote` genérico en shell) |

**Riesgo global del producto (top tráfico):** **Alto**  
**¿Seguro para tráfico YMYL “tal cual”?** **Condicional / No** en sueldo líquido, boleta (año), hipotecario (opciones), subsidio habitacional (cableado + unidades).  
**IVA y comparador AFP:** cableado limpio (referencia de cómo debería verse el resto).

### Hallazgo madre

El **módulo puro** a menudo ya soporta el caso real chileno; el **adapter** en `CalculatorPageClient` solo pasa 2–4 campos. La UI del catálogo, en cambio, promete 10–16 inputs. Eso es **mentira de producto YMYL**, no un detalle de UX.

Regla de la skill: *si el label sugiere que cambia el cálculo y no lo hace → bug de producto*.

---

## Portfolio: fantasma por calculadora

| id | Fantasmas | Severidad | Nota |
|----|-----------|-----------|------|
| `sueldo-liquido` | 13 | **Crítica** | Módulo 15 campos; adapter 3. Isapre, bonos, cesantía, inverso muertos en UI. |
| `credito-hipotecario` | 11 | **Alta** | Seguros, CAE, amortización, prepago, ingreso: UI muerta; módulo los tiene. |
| `finiquito` | 9 | **Alta** | Aviso previo, art. 168, vacaciones años anteriores, etc. no cableados. |
| `horas-extra` | 8 | **Alta** | Jornada 40–45, festivos, impacto cotizaciones no cableados. `horasExtraNocturnas` en catálogo pero el módulo ya lo eliminó (inconsistencia). |
| `boleta-honorarios` | 7 | **Alta** | Solo `montoBruto`. Año de retención (15,25% 2026) no se elige desde UI. |
| `uf-clp` | 6 | Media | Histórico/proyección/gráfico en catálogo; módulo solo monto+dirección. |
| `subsidio-habitacional` | 1 + dead | **Crítica** | Falta `tipoSubsidio` en catálogo (adapter lo pide). `esZonaExtrema` fantasma. **Unidades UF vs CLP inconsistentes** (ver abajo). |
| `subsidio-agua` | 1 | Baja | `zona` fantasma; ya `noIndex`. |

**Sin fantasmas (muestra top):** `iva`, `comparador-afp` (y la mayoría de phase 2/3 con formularios cortos).

---

# Auditoría YMYL — Sueldo líquido (`sueldo-liquido`)

## Resumen
- **Riesgo global: Crítico**
- **¿Segura para tráfico YMYL?: No** (hasta alinear UI ↔ adapter)

## Matriz de inputs

| input id | catálogo | adapter | módulo | estado | notas |
|----------|----------|---------|--------|--------|-------|
| sueldoBruto | sí | sí | sí | OK | |
| afp | sí | sí | sí | OK | |
| saludTipo | sí | sí | sí | OK | |
| saludTramo | sí | no | sí | **FANTASMA** | FONASA: tramo casi irrelevante hoy; confunde |
| isapreMonto | sí | no | sí | **FANTASMA** | Plan Isapre en UF **sí** cambia el descuento en módulo |
| contratoIndefinido | sí | no | sí | **FANTASMA** | Cambia seguro cesantía; default silencioso del módulo |
| bonoMovilizacion…comisiones | sí | no | sí | **FANTASMA** | No imponibles / estructura del líquido |
| prestamo/sindicato/caja | sí | no | sí | **FANTASMA** | Descuentos voluntarios |
| tipoCalculo | sí | no | no | **FANTASMA** | Solo catálogo |
| calculoInverso | sí | no | sí | **FANTASMA** | Líquido→bruto implementado en módulo, no expuesto |

**Cableado:** 3/15 campos del módulo. El test de Isapre y contrato **prueba el módulo**, no lo que ve el usuario en producción.

## Fórmula y constantes
- AFP, salud, cesantía, impuesto 2ª cat., topes desde `constants.ts` (comentado 2026 / SP).
- Fuentes catálogo: DT, SP, AFC, SII (URLs genéricas home en varios casos).
- **NO VERIFICADO aquí:** que cada tasa del snapshot coincida con la circular SP del mes (hay que contrastar offline con SP/SII).

## Hallazgos
1. **[Crítica]** UI promete Isapre en UF, bonos y cálculo inverso; el adapter ignora todo → resultado de “caso FONASA simple”.
2. **[Alta]** `contratoIndefinido` no cableado → cesantía trabajador siempre con default del módulo (true), aunque el usuario desmarque.
3. **[Media]** Tests nivel **C/B**: muchas inequalities; pocos montos golden anclados a fuente.
4. **[Media]** FAQ/tramo salud puede contradecir la realidad FONASA 7% único.

## Tests
- Nivel: **C→B** (17 its, pocos `toBe` exactos de líquido final).
- Gaps: golden con AFP X + $1.000.000; caso Isapre plan > 7%; inverso.

## Acciones recomendadas
1. Cablear adapter a **todos** los campos que el módulo ya soporta y el catálogo muestra.
2. Quitar `tipoCalculo` o implementarlo.
3. Añadir 3 golden tests de líquido exacto + Isapre + cesantía plazo fijo.

---

# Auditoría YMYL — Finiquito (`finiquito`)

## Resumen
- **Riesgo global: Alto**
- **¿Segura para tráfico YMYL?: Condicional** (núcleo indemnización/vacaciones/gratificación cableado; extras legales no)

## Matriz (resumen)

| Grupo | Estado |
|-------|--------|
| ultimoSueldo, años, meses, vacaciones pendientes, causa, gratificación, HE/bonos, sueldo base, días último mes | OK |
| fechaInicio/Termino, sueldoVariablePromedio, incluyeAvisoPrevio, tipoContrato, vacaciones años ant., sueldoPromedio, días convenio | **FANTASMA** |
| tieneMulta168 (catálogo) vs `recargoArt168Pct` (módulo) | **Nombre roto** — no hay puente |

## Fórmula y constantes
- Art. 163, vacaciones, gratificación, recargo 168 en módulo/constants con comentarios legales.
- Tests indemnización: **golden buenos** (5 años → $5.000.000; tope 11 años).

## Hallazgos
1. **[Alta]** Aviso previo (1 mes) y recargo 168 visibles o semi-visibles pero no conectados → finiquito subestimado en despidos relevantes.
2. **[Alta]** `tieneMulta168` boolean en catálogo no mapea a `recargoArt168Pct` (0|30|50|80|100).
3. **[Media]** Fechas de inicio/término no calculan antigüedad automática (usuario debe llenar años/meses a mano; campos fecha engañan).

## Tests
- Nivel: **B+** en indemnización; vacaciones a veces soft (`> 0`).

## Acciones
1. Cablear `incluyeAvisoPrevio`, `vacacionesAniosAnteriores`, `recargoArt168Pct` (renombrar UI).
2. Ocultar fechas si no calculan, o implementar cálculo de antigüedad.

---

# Auditoría YMYL — Boleta de honorarios (`boleta-honorarios`)

## Resumen
- **Riesgo global: Alto**
- **¿Segura?: Condicional** (retención base OK si default año correcto; UI de año inútil)

## Matriz
| Campo | Estado |
|-------|--------|
| montoBruto | OK |
| ano, moneda, calcularPPM, calcularCostoEmpleador | **FANTASMA** (módulo sí) |
| calculoInverso, incluyeCotizaciones, incluyePrestamoSolidario | **FANTASMA** (nombres distintos / no en interface) |

## Hallazgos
1. **[Alta]** Año de retención (Ley 21.578: 14,5→17%) no llega al cálculo desde UI.
2. **[Media]** `incluyeCotizaciones` en catálogo contradice el diseño actual del módulo (retención ya incluye previsión; desglose informativo).
3. **[Baja]** Tests con algunos exactos; ampliar por año.

## Acciones
Cablear `ano`, `calcularPPM`, `calcularCostoEmpleador`, `moneda`; renombrar/eliminar flags obsoletos del catálogo.

---

# Auditoría YMYL — Crédito hipotecario (`credito-hipotecario`)

## Resumen
- **Riesgo global: Alto** (simulación base OK; promesas de producto no)
- **¿Segura?: Condicional** como dividendo simple UF; **No** si el usuario activa seguros/CAE/prepago creyendo que cuentan

## Matriz
Adapter solo: `montoUF, plazoAnos, tasaAnual, pieUF`.  
Resto del catálogo (11 campos) + soporte en módulo = **FANTASMA**.

## Hallazgos
1. **[Alta]** Tooltips de CAE, seguros, tabla de amortización, prepago → no tienen efecto.
2. **[Media]** Es simulación financiera de usuario (tasa propia), no tasa CMF obligatoria — el disclaimer debe ser explícito (LegalNote genérico ayuda, no cita CMF por página).

## Acciones
Cablear flags del módulo o **recortar catálogo** a los 4 campos reales hasta que existan resultados de seguros/CAE en UI.

---

# Auditoría YMYL — Horas extra (`horas-extra`)

## Resumen
- **Riesgo: Alto**
- Adapter: sueldoBruto, horasExtra, esDomingo→esDomingoFestivo (rename OK).

## Hallazgos
1. **[Alta]** `jornadaSemanal` (Ley 21.561 44→40) fantasma → valor hora puede estar mal según año de transición.
2. **[Alta]** `horasExtraFestivos` en módulo no cableado.
3. **[Media]** Catálogo aún tiene `horasExtraNocturnas`; módulo documenta que se eliminó (ley no trae recargo nocturno automático) → input mentiroso.

## Acciones
Quitar nocturnas del catálogo; cablear jornada + festivos + impacto cotizaciones.

---

# Auditoría YMYL — UF↔CLP (`uf-clp`)

## Resumen
- **Riesgo: Medio**
- Conversión base OK; 6 inputs de histórico/gráfico son **FANTASMA** (módulo no tiene API histórica).

## Acciones
Quitar del catálogo o implementar con `/api/values`/series. Hasta entonces son promesas falsas.

---

# Auditoría YMYL — Subsidio habitacional (`subsidio-habitacional`)

## Resumen
- **Riesgo global: Crítico** (cableado + unidades)
- **¿Segura?: No** en la UI actual

## Hallazgos
1. **[Crítica]** Catálogo **no** expone `tipoSubsidio` (ds49/ds01/ds19). El adapter hace `inputs.tipoSubsidio as …` → `undefined`. El módulo indexa `SUBSIDIO_HABITACIONAL[tipoSubsidio]` → riesgo de **crash o basura** en runtime.
2. **[Crítica]** Labels/tooltips dicen montos en **UF**; el módulo convierte con `valor / UF.valor` (espera **CLP**). Los tests pasan **CLP** (`UF.valor * 600`). Un usuario que escribe `2000` creyendo UF obtiene ~0,05 UF de propiedad.
3. **[Alta]** `esZonaExtrema` en catálogo, no existe en el módulo ni en el adapter.

## Acciones (urgentes)
1. Agregar select `tipoSubsidio` al catálogo.
2. Unificar unidad: o label CLP, o dejar de dividir por UF en el módulo cuando el input ya es UF.
3. Quitar o implementar zona extrema.

---

# Auditoría YMYL — IVA (`iva`) y Comparador AFP (`comparador-afp`)

## Resumen
- **Riesgo: Bajo**
- Matriz limpia; buenos patrones a copiar.
- AFP: depende de comisiones en `constants` (SIS 1,62% comentado abr-2026) — **revisar** con circular SP al cambiar mes, no es bug de wiring.

---

## Capa E-E-A-T (transversal)

| Control | Estado |
|---------|--------|
| `sources[]` en catálogo | Presente en las 39 |
| URLs a subpáginas específicas | Parcial (muchas home institucionales) |
| `lastReviewed` | Presente; **mismo día** en todas → señal débil |
| Disclaimer en UI | `LegalNote` genérico en shell; **`DisclaimerYMYL` no montado** |
| FAQ vs fórmula | Riesgo de desalineación donde hay fantasmas |
| Promesas “oficial SII/DT” en SEO | No auditado línea a línea; skill `seo-adsense` para CTR |
| Mapa guía ↔ calc | `calculator-guia-map.ts` completo y razonable |
| noIndex | 8 delgadas; coherente con cuarentena AdSense |

---

## Tests (muestra)

| Módulo | Nivel aprox. | Comentario |
|--------|--------------|------------|
| iva, uf-clp | A/B | Exactos frecuentes |
| finiquito (indemnización) | B+ | Golden de años/tope |
| boleta, hipotecario | B | Varios casos |
| sueldo-liquido | C | Humo + topes |
| permiso-circulacion | B con flaky ±1 | Redondeo (conocido) |
| subsidio-habitacional | B en módulo | No cubre el bug de UI/unidades |

---

## Prioridad de remediación (orden de ataque)

### P0 — esta semana (verdad de producto)
1. **Sueldo líquido:** cablear adapter completo (o recortar inputs del catálogo a 3 y ser honestos). Preferible cablear: el módulo ya está.
2. **Subsidio habitacional:** `tipoSubsidio` + unidad UF/CLP.
3. **Boleta:** cablear `ano` (y flags reales del módulo).

### P1 — siguiente
4. Finiquito: aviso previo + art. 168 + vacaciones años anteriores.  
5. Hipotecario: cablear o podar catálogo.  
6. Horas extra: jornada + festivos; borrar nocturnas del catálogo.  
7. UF-CLP: podar fantasmas cosméticos.

### P2 — calidad
8. Golden tests top 5.  
9. Montar `DisclaimerYMYL` con organismo por categoría o enriquecer `LegalNote`.  
10. `lastReviewed` solo al review real de cada fórmula.  
11. CI: reutilizar `scripts/audit-ymyl-matrix.mjs` y fallar si aparecen fantasmas nuevos en phase 1.

---

## Qué no se hizo en esta pasada (a propósito)

- No se cambiaron fórmulas ni tasas sin fuente nueva.
- No se “arregló” el test ±1 de permiso de circulación (rodeo aceptado).
- No se reactivó bono-bodas-oro.
- No se tocaron slugs, AdSense ni sitemaps.

---

## Cómo re-auditar

```bash
node scripts/audit-ymyl-matrix.mjs
# salida: consola + scripts/audit-ymyl-matrix-out.json
```

Tras un fix de wiring, la lista de fantasmas de esa calculadora debe quedar en **cero** (o solo cosméticos documentados).

---

## Conclusión

CalculaChile tiene **buena arquitectura YMYL en el papel** (módulos puros, tests, sources, guías, AGENTS). El agujero principal no es “falta de catálogo”: es el **desacople catálogo → adapter**, concentrado en las páginas que más confían los usuarios.

Hasta no cerrar P0, el sitio puede rankear y monétizar, pero **no cumple el estándar de honestidad YMYL** en sueldo, boleta, hipotecario y subsidio habitacional.

**Siguiente paso natural de implementación:** PR de wiring sueldo-líquido (skill `nueva-calculadora` / fix adapter) + fix subsidio unidades/`tipoSubsidio`, sin rediseño visual.
