# Cierre — Plan de calculadoras y correcciones Q4 2026

| | |
|---|---|
| **Fecha** | 26 de septiembre de 2026 |
| **Spec** | `docs/plan-calculadoras-q4-2026.md` (bloques A–E) |
| **Encargo** | `docs/encargos/2026-09-26-ejecutar-plan-q4.md` |
| **Rama** | `main` (push por bloque; deploy automático en Vercel) |

## 1. Bloques completados y commits

| Bloque | Commit | Contenido |
|---|---|---|
| A | `c5dafbd` fix(impuestos) | IUSC mensual con rebajas oficiales 0,54 / 1,74 / 4,49 / 11,14 / 17,80 / 23,32 / 38,82 UTM; tabla anual AT2026 13,5–310 UTA (y tasa 30,4% en el tramo 90–120, que el código tenía en 30%). Goldens: $1.636.400 con UTM $71.721 → **$26.727**; 20 UTM → 0,26 UTM. |
| (ventana) | `269123e` content(blog) | Alerta Cupón de Gas Licuado (vence 30-sep), publicada tras A por decisión de Diego. Corrige también el ejemplo $1.500.000 de la guía de sueldo. |
| B | `a57944e` fix(values) | Ley 21.735 (3,5% desde ago-2026 incluye SIS → 8,5% en 2033); PGU por edad umbral y fecha (82 → 75 → 65); Bono Bodas de Oro $482.295 desde 1-oct-2026 y **reactivación en la URL original** (se elimina el 410); FONASA con umbrales B/C/D; DS49 base 314 UF + premio al ahorro; DS19 por segmento (Res. Ex. 700/2026); Ley 21.836 en guías. |
| C (lote 1) | `2e0d74c` feat(calc) | Aporte Familiar Permanente, Seguro de Cesantía (CIC + FCS), Licencia médica (SIL), Sueldo part-time. Fechas de vigencia evaluadas a medianoche local. |
| C (lote 2) | `3bd96c3` feat(calc) | SUE (noIndex), Factor hora extra, SUF, Subsidio eléctrico. |
| C (lote 3) | `95c084c` feat(calc) | Bono $30 mil por hijo, Becas y gratuidad, Subsidio de arriendo DS52, Asignación por muerte / cuota mortuoria, Tope imponible 90 UF. |
| D | `c1c9bcb` content(blog) | FUAS 2027, Bono $30 mil por hijo, SUE en operación (#16), Bodas de Oro reajustado, Sueldo part-time 30 h, AFPER cobro (#18). |
| E | `dfc43b9` feat(values) | `health` en `/api/values`, log `[values-alert]`, logs de fuentes sin URL/credenciales y paso de verificación de frescura en `update-values.yml`. |
| Cierre | (este commit) | Este informe + conteos en `AGENTS.md`. |

Catálogo: 39 → **53 calculadoras** (44 indexables, 9 noIndex). Bloque C9 (Bodas de Oro) quedó dentro de B4.

## 2. Verificaciones ejecutadas

- **Tests**: línea base 394 tests / 49 archivos en verde → cierre de C: **500 tests / 63 archivos en verde** (`npm run test:run`); E agregó 8 tests de `values-health` (19/19 en `src/lib/api`).
- **`npm run typecheck`**: limpio en cada bloque.
- **`node scripts/audit-ymyl-matrix.mjs`**: 0 fantasmas, 0 sin fuentes, 0 fallos de gates AdSense en cada bloque (53 calculadoras, 53 adapters al cierre).
- **`node scripts/audit-editorial-content.mjs`**: 44 piezas, 0 bajo 1.500 palabras, 0 sin fuentes, 0 fugas.
- **`npm run build`**: OK al cierre de B y de C; los 13 slugs nuevos y `calculadora-bono-bodas-oro` se generan; `sitemap-calculadoras.xml` con 44 URLs; SUE excluido del sitemap y con `noindex, follow`.
- **Producción (curl, 26-09-2026)**: post del Cupón de Gas 200; `/calculadoras/calculadora-bono-bodas-oro` pasó de 410 a **200**; calculadoras nuevas 200; SUE `noindex, follow`; sitemap 44 `<loc>`; `/api/values` expone `health` (`snapshotAgeHours` 27,9, `stale:false`, `alert:false`).

## 3. Fuentes re-verificadas (fetch del 26-09-2026)

| Dato | Fuente |
|---|---|
| IUSC oct-2026 (rebajas en pesos ÷ UTM $72.150,9) | https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm |
| Tabla anual AT2026 | https://www.sii.cl/valores_y_fechas/renta/2026/personas_naturales.html |
| Aporte empleador 3,5% y calendario | https://www.chileatiende.gob.cl/fichas/130987-aportes-del-empleador-al-sistema-de-pensiones |
| PGU 75+ | https://www.chileatiende.gob.cl/fichas/130457-aumento-de-la-pension-garantizada-universal-pgu |
| Bono Bodas de Oro | https://www.chileatiende.gob.cl/fichas/5369-bono-bodas-de-oro |
| DS49 | https://www.chileatiende.gob.cl/fichas/37960-subsidio-para-comprar-una-vivienda-de-hasta-950-uf-llamado-individual-ds-n-49 |
| DS1 T3 | https://www.chileatiende.gob.cl/fichas/5436-ds-1-tramo-3-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-2-200-uf |
| DS19 llamado 2026 | https://www.minvu.gob.cl/postulacion/llamado-especial-a-concurso-ano-2026-para-proyectos-habitacionales-ds-19/ |
| Ley 21.836 (subsidio al dividendo) | https://www.ventanillaunicasocial.gob.cl/ficha/463/subsidio-al-dividendo-para-adquirir-viviendas-nuevas |
| Cupón de gas | https://www.cupondegas.gob.cl/ |
| AFPER | https://www.chileatiende.gob.cl/fichas/38913-aporte-familiar-permanente |
| Seguro de cesantía / FCS | ChileAtiende 62932 y 36646; afc.cl/mi-seguro-de-cesantia/beneficios (mín./máx. FCS según Res. Ex. 383 SP, desde la evidencia AFC) |
| SUE | Diario Oficial 13-03-2026: https://www.diariooficial.interior.gob.cl/publicaciones/2026/03/13/44399/01/2782286.pdf |
| SUF | https://www.chileatiende.gob.cl/fichas/33112-subsidio-familiar-suf |
| Subsidio eléctrico | https://www.chileatiende.gob.cl/fichas/124375-subsidio-electrico |
| Bono $30 mil por hijo | https://www.chileatiende.gob.cl/fichas/144481-bono-30-mil-por-hijo |
| Asignación por muerte | https://www.chileatiende.gob.cl/fichas/5300-asignacion-por-muerte |
| Subsidio de arriendo DS52 | ChileAtiende 29888; MINVU llamado especial PM/PcD 2026 |
| Gratuidad y becas | portal.beneficiosestudiantiles.cl (gratuidad, BJGM, BNM, BEA, BB); ChileAtiende 43203 (FUAS 1–22 oct) |

Solo desde la evidencia del 26-09 (no re-fetchable en la sesión): FONASA tramos (fonasa.gob.cl responde 403), texto DT de jornada parcial (se usó la cita de `laboral-dt#6`), factor hora extra DT (`laboral-dt#22`), SIL SUSESO (`laboral-dt#31`), SEJ/BTM SENCE, montos BET/BHP/BAR (no usados en cálculo).

## 4. Desviaciones del plan (fuente oficial manda)

1. **Golden A1 del encargo**: dice "(0,08 − 0,54) × UTM"; el correcto es (0,8 − 0,54) = 0,26 UTM, como en el plan técnico.
2. **AFPER (C1)**: el plan pedía "2 cargas + SSyOO → $200.502". La ficha 38913 dice: "si te encuentras en ambos casos, recibirás $66.834 por cada una de tus cargas". Se implementó la regla oficial: **$133.668**. $200.502 corresponde a 3 cargas o a 2 cargas + madre SUF.
3. **DS1 Tramo 3 (B6)**: el plan pedía un rango de 250–550 UF. La ficha ChileAtiende 5436 vigente dice "monto promedio de subsidio de 270 UF, para todas las regiones". **Se mantuvo 270 UF.**
4. **DS19 (B6)**: el MINVU sí desglosa por segmento en el llamado 2026 (1.200 / 425 / 350 UF; 1.700 / 537,5 / 500 en zonas extremas), así que se actualizó. Gran Santiago y los bonos de integración/captación no se modelan (se explica en el FAQ).
5. **DS52 (C11)**: además de lo que decía el plan, la ficha oficial fija un aporte de **4,9 UF** con arriendo máximo de 13 UF en Arica y Parinacota, Antofagasta, Atacama, RM, Aysén y Magallanes. Está incorporado.
6. **PGU**: el cálculo se hace por edad a la fecha. Quien cumple 75 entre oct-2026 y ago-2027 accede desde el mes de su cumpleaños, lo que equivale a tener 75 cumplidos.
7. **Bloque D**: la alerta de gas se adelantó por decisión de Diego. Los posts cumplen el mínimo de 1.500 palabras que exige el audit editorial del repo.

## 5. Pendiente o bloqueado

| Tema | Estado | Motivo / siguiente paso |
|---|---|---|
| **SIS (B2)** | Sin cambio (1,62%) | Desde ago-2026 el SIS va dentro del 2,5% del Seguro Social (ChileAtiende 130987), así que no se cobra aparte. El 1,78% de Previred es esa porción, no un cargo extra. `AFP[].sis` solo aplica a períodos previos a ago-2026 (Previred además informa 2,00% para julio 2026, no modelado). |
| **SUE (C3)** | Publicada con `noIndex` | Falta el decreto del art. 8 (parámetros: IMM del subsidio, PV y umbral 2,25 IMM). Cuando salga: re-verificar `SUBSIDIO_UNIFICADO_EMPLEO`, quitar `noIndex` y el TODO. |
| **Becas fase 2 (C7b)** | Verificador de elegibilidad | No calcula el arancel de referencia por carrera, ni BET/BHP/BAR/BVP, ni becas regionales. Fase 2: tabla de aranceles de referencia 2027 cuando se publique. |
| **Operación renta: UTA** | Limitación documentada | Usa UTM vigente × 12, no la UTA de diciembre del año comercial. |
| **FONASA** | Verificado solo con evidencia | fonasa.gob.cl devolvió 403 a la consulta automática; el cambio fue solo de etiquetas (no participa en cálculos). |
| **Seguro de cesantía** | Estimación | Una sola entrada de cotizaciones para CIC y FCS; no calcula los 2 giros extra por desempleo alto. |
| **SIL** | Estimación | No aplica el tope imponible de 90 UF sobre la base neta (se menciona en el FAQ). |
| **Workflow de frescura** | Activo desde el próximo cron | Podría fallar por lag de deploy si un día el snapshot llega a más de 48 h; si molesta, agregar un retry. |
| **Reajuste IMM ene-2027** | Fuera de alcance | Actualizar `INGRESO_MINIMO` y los montos derivados (part-time, SIL, asignación por muerte) cuando se publique el decreto. |
| **Bodas de Oro** | Monto por fecha | Cambia automáticamente el 1-oct-2026; el reajuste de oct-2027 requiere una entrada nueva en `BONO_BODAS_ORO.calendario`. |
