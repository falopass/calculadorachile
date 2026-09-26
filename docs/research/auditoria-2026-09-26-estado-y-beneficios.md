# Auditoría 2026-09-26 — CalculaChile vs. el universo de beneficios y cálculos de Chile

| | |
|---|---|
| **Fecha** | 26 de septiembre de 2026 |
| **Método** | 10 frentes de scrapeo en paralelo sobre fuentes oficiales (ChileAtiende, SII, DT, SUSESO, Superintendencia de Pensiones, MINVU, MINEDUC/JUNAEB/ANID, FONASA/MINSAL, SENCE/Sercotec/Corfo/Fosis/Indap, Minenergía/MTT, BCN/LeyChile, Diario Oficial) + verificación directa contra páginas oficiales |
| **Evidencia** | 321 datos oficiales citados (JSON por dominio en `docs/research/evidencia-2026-09/`) + hallazgos verificados uno a uno contra la página fuente |
| **Alcance** | Estado del catálogo actual (39 calculadoras), constantes de cálculo, brechas de cobertura frente a todos los beneficios/aportes/subsidios del Estado, y ventanas de calendario sep-2026 → mar-2027 |

---

## Resumen ejecutivo

1. **Hay dos errores de cálculo en producción, ambos en impuestos** (YMYL, prioridad máxima):
   - **IUSC mensual**: la tabla de `constants.ts` omite/usa mal las cantidades a rebajar del SII. El sitio **sobreestima el impuesto** en 0,54–0,90 UTM/mes en todos los tramos gravados. Afecta `sueldo-liquido` (la calculadora estrella), `impuesto-segunda-categoria` y todo lo que dependa de esa tabla.
   - **Tabla anual (UTA)** usada por `operacion-renta` y `simulador-apv`: tramos 8/16/24/32/48/64/96 UTA que **no corresponden** a la tabla oficial del SII para el AT2026 (13,5/30/50/70/90/120/310 UTA).
2. **PGU desactualizada**: desde septiembre 2026, el tramo **75+** recibe el monto máximo ($250.275); el código todavía lo reserva para 82+.
3. **Aporte del empleador (Ley 21.735) mal parametrizado**: desde las remuneraciones de agosto 2026 es **3,5%** (2,5% Seguro Social + 0,9% CRP + 0,1% cuenta individual) y escala a 8,5% en 2033. El código aplica **1,75%**. El blog del propio repo dice 3,5% — el repo se contradice a sí mismo.
4. **Bono Bodas de Oro**: el reajuste de octubre 2026 ya está publicado por IPS: **$482.295** ($241.147 por cónyuge). El código tiene $463.166 desde oct-2025 (vigente hasta el 30-sep-2026).
5. **`/api/values` en producción sirve todo desde `fallback`** (BCentral y Mindicador no responden en runtime; el sitio vive del snapshot del GitHub Action). Sin alarma si el action falla, los valores quedan viejos en silencio.
6. **Hay 3 beneficios nuevos o recién cambiados sin cobertura**: Bono $30.000 por hijo (Ley 21.840, sep-2026), Subsidio Unificado al Empleo (Ley 21.808, rige 1-oct-2026) y la ampliación del subsidio hipotecario (Ley 21.836).
7. **Ventanas inmediatas**: Cupón de Gas Licuado $27.000 vence el **30-sep-2026**; FUAS 2027 postula del **1 al 22 de octubre de 2026**; arriendo especial PM/PcD hasta el **8-oct-2026**; SUE rige desde el **1-oct-2026**; reajuste del sueldo mínimo **1-ene-2027** (IPC may–dic 2026).
8. **Brecha estructural**: el sitio cubre bien trabajo/impuestos/vivienda, pero el Estado tiene ~40 bonos, subsidios y becas calculables con montos vigentes y **casi ninguno tiene calculadora**. El referente del nicho (bonoschile.cl) ataca justo eso y ofrece hasta un "evaluador de todos mis beneficios". No tiene nada de sueldo/finiquito/IUSC: la ventaja competitiva del sitio se defiende ampliando el catálogo de beneficios.
9. **Todo lo verificado que ya está OK**: sueldo mínimo, asignación familiar, SUF, AFPER, bono invierno, UF/UTM/dólar, tramos DS1, comisiones AFP, topes imponibles, permiso de circulación, contribuciones, patente municipal, honorarios 15,25%, exención de contribuciones, etc. (tabla completa más abajo).

---

## 1. Hallazgos críticos

### 1.1 IUSC mensual: rebajas faltantes (bug de cálculo)

**Tabla oficial SII (mensual, en UTM) = tramos 13,5 / 30 / 50 / 70 / 90 / 120 / 310 con cantidades a rebajar 0,54 / 1,74 / 4,49 / 11,14 / 17,80 / 23,32 / 38,82.**

Tabla en `src/lib/values/constants.ts` (`IMPUESTO_SEGUNDA_CATEGORIA`):

| Tramo (UTM) | Factor | Rebaja en código (UTM) | Rebaja oficial SII (UTM) | Diferencia |
|---|---|---|---|---|
| 13,5 – 30 | 4% | 0 | 0,54 | −0,54 |
| 30 – 50 | 8% | 1,2 | 1,74 | −0,54 |
| 50 – 70 | 13,5% | 3,95 | 4,49 | −0,54 |
| 70 – 90 | 23% | 10,25 | 11,14 | −0,89 |
| 90 – 120 | 30,4% | 16,9 | 17,80 | −0,90 |
| 120 – 310 | 35% | 22,42 | 23,32 | −0,90 |
| 310 + | 40% | 37,92 | 38,82 | −0,90 |

**Evidencia oficial** (`https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm`):
- Septiembre 2026: "exento hasta $968.233,50 (=13,5 UTM), factor 0,04, cantidad a rebajar **$38.729,34**".
- Octubre 2026: "factor 0,04, cantidad a rebajar **$38.961,54**". Verificación aritmética: 38.961,54 ÷ 72.150,9 (UTM oct) = **0,5400 UTM** exactos. Mayo 2026: 38.117,52 ÷ 70.588 = 0,54001. La rebaja es invariante en UTM.

**Efecto en pesos** (UTM sept 2026 = $71.721): el error va de **~$38.700 a ~$64.500 mensuales** por tramo (0,54–0,90 UTM).

Ejemplo con base tributable $1.636.400 (sueldo bruto ~$2.000.000, AFP y salud descontadas):
- Correcto: 0,04 × 1.636.400 − 38.729 = **$26.727**
- Sitio: 0,04 × 1.636.400 = **$65.456**

Alcance: `sueldo-liquido.ts` y `impuesto-segunda-categoria.ts` usan la tabla directamente; el test del módulo incluso afirma "factor 4% sin rebaja en este tramo" (el test codifica el bug). Cualquier sueldo con renta imponible sobre 13,5 UTM muestra MENOS líquido del real.

### 1.2 Tabla anual (UTA) de operación renta y APV

`IMPUESTO_SEGUNDA_CATEGORIA_2026` (usada en `operacion-renta.ts` y `simulador-apv.ts`): tramos **8 / 16 / 24 / 32 / 48 / 64 / 96 UTA**, rebajas 0,64 / 1,96 / 4,92 / 8,44 / 11,64 / 16,44.

Tabla oficial SII vigente AT2026 (`https://www.sii.cl/valores_y_fechas/renta/2026/personas_naturales.html`), art. 52 LIR:
- Exento hasta $11.265.804 (≈13,5 UTA); tramos hasta $258.696.240 (≈310 UTA); factores 0,04 / 0,08 / 0,135 / 0,23 / 0,304 / 0,35 / 0,40; rebajas $450.632,16 / $1.452.036,96 / $3.746.922,96 / $9.296.374,56 / $14.854.171,20 / $19.460.633,28 / $32.395.445,28.
- Consistente con el IUSC mensual ×12 (verificado).

Efecto: operación renta y APV calculan el impuesto con exención y tramos distintos de los legales (exención de 8 UTA en vez de 13,5 UTA, por ejemplo).

### 1.3 PGU: tramo 75+

- Oficial (ChileAtiende ficha 102077 y 130457): **desde septiembre 2026, 75 años o más → monto máximo $250.275** (automático); 65–74 → $231.732 (sube a 250.275 en septiembre 2027). Umbrales: ≤$789.139 PGU completa; $789.140–$1.252.602 variable; >$1.252.602 sin PGU.
- Código (`pgu.ts`): `edadVal >= 82 ? 250.275 : 231.732`. Personas de 75–81 años quedan con el monto menor.

### 1.4 Aporte del empleador (Ley 21.735) y SIS

- Oficial (ChileAtiende ficha 130987, Nota Técnica Subsecretaría de Previsión Social): **3,5% desde las remuneraciones de agosto 2026** = 2,5% Seguro Social Previsional (incluye SIS) + 0,9% CRP + 0,1% cuenta individual; calendario **4,25% (ago-2027) → 5,0% (2028) → 5,7% (2029) → … → 8,5% (2033)**.
- Código (`SEGURO_SOCIAL_PREVISIONAL.calendario`): 1,0% (ago-2025) → **1,75% (ago-2026)** → … → 7,0% (2033).
- El blog `cotizacion-empleador-3-5-agosto-2026-costo-pyme` (publicado en el repo) ya dice 3,5%: el código quedó atrás.
- Afecta: `costo-empleado-pyme`, aportes del empleador en `sueldo-liquido`.
- **SIS**: la ficha oficial cita "1,5% destinado al SIS" dentro del 8,5% total; Previred (indicadores septiembre 2026) publica **1,78%** para remuneraciones de agosto–octubre 2026 (2,00% en julio; 1,62% abril–junio); spensiones.cl aún publica 1,62%. El código usa 1,62% para las 7 AFP. **Dato a resolver antes de tocar el código** (fuente primaria: Previred mensual).

### 1.5 Bono Bodas de Oro: reajuste octubre 2026 ya publicado

- Oficial (ChileAtiende ficha 5369, actualizada sep-2026): **desde el 1 de octubre de 2026: $482.295 total ($241.147 por cónyuge vivo)**.
- Código: $463.166 / $231.583 (vigente desde oct-2025, expira el 30-sep-2026).
- La calculadora está en 410 Gone con la nota "no reactivar sin fórmula verificada". Con esta ficha quedó verificado: 50 años de matrimonio, 80% RSH, pago único por partes iguales, plazo de 1 año desde el aniversario. Se puede reactivar (decisión de Diego).

### 1.6 Subsidio habitacional: DS49 mal estructurado

- Oficial: DS49 = **subsidio base 314 UF** + complementarios (localización urbana 200 UF, factibilización rural 120 UF, densificación en altura 110 UF, discapacidad 20/80 UF, superficie adicional hasta 50 UF, premio al ahorro 1,5 UF por UF extra hasta 30 UF), tope de vivienda 950 UF (1.050 en zonas extremas), ahorro 10 UF (15 UF en postulaciones colectivas sobre el 40%).
- Código (`SUBSIDIO_HABITACIONAL.ds49`): "tramo1/2/3" con subsidios 450/380/310 UF por ingreso 12/18/24 UF — esa estructura **no corresponde** al DS49 (se parece a una mezcla con DS1).
- DS1: montos verificados (T1 600 UF promedio/vivienda ≤1.100, ahorro 30; T2 450 UF/≤1.600, ahorro 40; T3 **250–550 UF**/≤2.200, ahorro 80). El código tiene T3 = 270 UF fijo y no refleja el rango regional.
- DS19: oficial "hasta 1.200 UF (1.600 zonas extremas) para viviendas hasta 1.500 UF"; el código tiene 800/500/200 UF por tramos. **Verificar antes de tocar** (la información oficial vista no desglosa por tramos como el código).
- Subsidio al Crédito Hipotecario: **Ley 21.836 (2026): 60 puntos base, 80.000 cupos, viviendas nuevas hasta 6.000 UF, vigente hasta 31-05-2028** (esto reemplaza los 50.000 cupos / 4.000 UF / 27-05-2027 de la página antigua).

### 1.7 Frescura de valores en runtime

- `GET https://calculadorachile.cl/api/values` (26-sep-2026): `"source":"fallback"` y `freshness` fallback en UF/UTM/dólar/euro. Los valores llegan bien desde el snapshot (UF 41.016,28 del 25-sep), pero **nunca** en vivo desde BCentral/Mindicador.
- Riesgo: si el GitHub Action `update-values.yml` falla un día, el sitio sirve datos viejos sin señal. Recomendado: alerta si `generatedAt` > 48 h, y log de por qué las fuentes externas fallan en Vercel (¿timeout? ¿bloqueo?).

### 1.8 Menores

- `SALUD.fonasa.tramos` del código tiene "cotización C 0,67% / D 2,04%": **no existe** como cotización diferenciada vigente (la cotización legal es 7% única; los umbrales vigentes de tramos son B ≤ $553.553, C $553.554–$808.187, D ≥ $808.188 desde el 1-may-2026). El campo se ignora en el cálculo (`void saludTramo`), pero está mal etiquetado.
- `postulacion.minvu.gob.cl` **no resuelve DNS** (26-sep-2026): si alguna página del sitio lo enlaza, actualizar a minvu.gob.cl.
- Varias páginas oficiales están desactualizadas y no deben usarse como fuente (DT casa particular: dice $500.000/44 h; SUSESO/Superintendencia en "exceso de cotización": 87,8 UF; FAQ tramos Superintendencia de Salud: valores jul-2025). Registrado en evidencia.

---

## 2. Verificado y correcto (no tocar)

| Constante | Valor del sitio | Oficial 26-sep-2026 | Fuente |
|---|---|---|---|
| Ingreso mínimo | 553.553 / 412.938 / 356.815 | Igual (desde 1-may-2026) | DT, Ley 21.830 |
| Asignación familiar | 22.601 / 13.870 / 4.382 (649.039 / 947.990 / 1.478.539) | Igual | ChileAtiende 25878 |
| SUF | (no hay calc) 22.601 / 45.202 duplo | Igual | ChileAtiende 33112 |
| Tope imponible AFP/salud | 90 UF | 90 UF (desde feb-2026) | Res. Ex. 237 SP |
| Tope cesantía | 135,2 UF | 135,2 UF (desde 1-feb-2026) | Res. Ex. 236 SP |
| Comisiones AFP | Uno 0,46 → ProVida 1,45 | Igual | SP/Previred |
| Jornada | 42 h desde abr-2026 | Igual | Ley 21.561, DT |
| Gratificación | 25% tope 4,75 IMM | Igual (tope $2.629.376,75 en 2026) | DT |
| Indemnización | 30 días/año, tope 11 años, 90 UF | Igual | CT art. 172 |
| UF/UTM/dólar | snapshot 25-sep: 41.016,28 / 71.721 / 965,71 | Igual (+UTM oct 72.151 ya publicada) | Mindicador/SII |
| Permiso circulación | escala 1–4,5%, mínimo 34.876, exención eléctricos | Igual | SII 2026 |
| Contribuciones | exención $61.711.570, tasas 0,893/1,042% | Igual (2º semestre) | SII |
| Patente municipal | 1–8.000 UTM, 0,25–0,5% | Igual | DL 3063 |
| Honorarios | 15,25% (2026) | Igual; umbral cotización $2.767.765 | SII |
| Timbres hipoteca | tope 0,8% anual | Igual (0,066%/mes) | DL 3.475 |
| Exención plusvalía | 8.000 UF | Igual ($317.823.680 al 31-12-2025) | Art. 17 N°8 |
| CAE | 2% anual | Igual | Ley 21.477 |
| PGU umbrales | 789.139 / 1.252.602 | Igual (desde feb-2026) | SP |
| Pensión alimentos | 40% / 30% IMM | Correcto | Ley 14.908 |

---

## 3. El universo: 321 datos oficiales por dominio

Resumen de lo inventariado (detalle completo en `docs/research/evidencia-2026-09/*.json`):

| Dominio | Ítems | Highlights nuevos/críticos |
|---|---|---|
| familia-bonos | 34 | **Bono $30.000 por hijo** (Ley 21.840, sep-2026, automático IPS); AFPER $66.834; **Bodas de Oro $482.295 desde oct-2026**; Logro Escolar pagado 14-sep; emergencias ($375k–$1,5M + 50 UF); Pase Cultural $50.000; becas regionales (Aysén $1.423.000, Magallanes $1.090.650, Polimetales, BIT) |
| prevision-pensiones | 30 | PGU 75+ $250.275; **BAC 0,1 UF/año cotizado (tope 2,5 UF)**; **CEV mujeres mín 0,25 UF**; CRP 0,9% → 1,5%; seguro lagunas 10,25%; comisiones AFP; SIS 1,78%/1,62% (discrepancia) |
| laboral-dt | 41 | Hora extra 42 h: **factor oficial sueldo × 0,0083333**; jornada intermedia >30 h paga IMM íntegro (solo ≤30 h prorratea /42); **FCS montos: $1.004.003 primer pago indefinido**; SIL mínimo diario $5.946,92; casa particular 1,11% indemnización; reajuste IMM 1-ene-2027 por IPC |
| impuestos-sii | 39 | IUSC oficial (fija el bug); IGC AT2026; **no existe tabla 2027**; patente máx 8.000 UTM; timbres 0,066%/0,8%; aranceles notarios/CBR; Pro Pyme 12,5% |
| vivienda-minvu | 28 | DS1 montos y ahorros; **DS52 arriendo 170 UF / especial 213 UF (ventana 8-sep–8-oct-2026)**; DS49 base 314 UF + complementarios; DS27 térmico 120 UF / Banco de Materiales (10-sep–9-oct); **Ley 21.836: 60 pb, 80.000 cupos, 6.000 UF, hasta 31-05-2028** |
| educacion-becas | 35 | **FUAS 2027: 1–22 oct 2026**; resultados 2026: 15-oct; becas MINEDUC con topes ($1.150.000 JGM/Excelencia/DTE, $900.000 BET, $600.000 BNM…); BAES $48.000; ANID doctorado $1.010.084/mes; arancel de referencia vs real |
| salud-fonasa | 25 | **Tramos FONASA B/C/D nuevos**; Copago Cero; GES isapre 20% + prima 0,712–1,036 UF; alzas isapre 2026 (tope 3,5%); Tabla Única (Ley 21.674); Ley SANNA 0,03% |
| empleo-emprendimiento | 25 | **SUE (1-oct-2026): 20% empresa + 10% trabajador, IMM propio $529.000, tramos 661.250/1.190.250, 40% RSH**; SEJ/BTM cerrados; Sercotec $3,5M/$5M/$7–9M; Corfo $15M–$60M; FOSIS Emprendamos; bonificaciones aprendices/experiencia mayor |
| hogar-vehiculos | 29 | Subsidio eléctrico 5ª conv: $17.346/$22.548/$31.224 (6 cuotas de $2.891/$3.758/$5.204); **Cupón Gas $27.000 vence 30-sep**; SAP 25–85%; tarifas 2S-2026 (kWh $237–294); SOAP referencial; revisión técnica por dígito; tarifas transporte 2026 |
| leyes-y-nuevos | 35 | Ley 21.840 (bono niñez), 21.808 (SUE), 21.811 (transportistas $100.000×6), 21.833 (protección tarifaria), 21.836 (hipotecario), 21.830 (IMM), 21.735 (reforma), 21.842 (copropiedad), 21.719 (datos personales 1-dic-2026) |

---

## 4. Brechas de cobertura: qué falta

### 4.1 Correcciones (bugs / desactualizaciones) — P0
1. IUSC mensual (rebajas) + revisar tests.
2. Tabla anual UTA (op. renta + APV).
3. PGU 75+ (y evaluar BAC/CEV como campos informativos).
4. Aporte empleador 3,5% + calendario (resolver SIS primero).
5. Bodas de Oro: montos oct-2026 (+ decidir reactivación de la calculadora).
6. DS49 (estructura) / DS1 T3 / DS19 (verificar) / subsidio hipotecario Ley 21.836.
7. FONASA: limpiar campos inexistentes (0,67/2,04) y actualizar umbrales B/C/D.
8. `/api/values`: telemetría de frescura.

### 4.2 Calculadoras nuevas propuestas (por valor esperado)
| # | Calculadora | Por qué | Datos listos |
|---|---|---|---|
| 1 | **Aporte Familiar Permanente (Bono Marzo)** | pageview alto y recurrente (cobros pendientes oct–dic) | $66.834, plazos ✓ |
| 2 | **Seguro de cesantía (monto mensual y duración)** | hub `/cesantia` ya existe, no hay calculadora | CIC 1–13 pagos, FCS $1.004.003 → $502.0xx ✓ |
| 3 | **SUE (Subsidio Unificado al Empleo)** | rige 1-oct-2026, nadie lo tiene aún | fórmulas DO ✓ |
| 4 | **Licencia médica (SIL)** | evergreen, ya hay plan de post #47 | piso diario $5.946,92, reglas de días ✓ |
| 5 | **Sueldo part-time / jornada parcial** | GSC: "sueldo part time 30 horas" 251 impr | regla IMM×horas/42 para ≤30 h; IMM íntegro >30 h ✓ |
| 6 | **SUF / SUF automático** | nicho beneficios, hoy sin cobertura | $22.601 / $45.202 ✓ |
| 7 | **Becas y gratuidad (¿me alcanza?)** | FUAS abre el 1-oct; categoría educación = solo CAE | topes de becas + RSH ✓ |
| 8 | **Bono $30 mil por hijo** | nuevo, sin cobertura en ningún sitio de cálculos | $30.000 + reglas ✓ |
| 9 | **Subsidio eléctrico (por integrante)** | blog ya publicado; falta la calc | montos 5ª conv ✓ |
| 10 | **Bono Bodas de Oro** (reactivar 410) | fórmula ya verificada | $482.295 ✓ |
| 11 | **Asignación por muerte / cuota mortuoria** | trámite con tope indexado | 3 IMM = $1.070.445; 15 UF ✓ |
| 12 | **DS52 arriendo** | ventana activa hasta 8-oct | 170 UF / 213 UF ✓ |
| 13 | **Pase Cultural / becas regionales** | nicho estacional | montos ✓ |
| 14 | **Factor hora extra 42 h** (contenido + mini-calc) | 741 impresiones, 0 clics | factor 0,0083333 ✓ |
| 15 | **"90 UF" / tope imponible** (contenido) | 277 impresiones, pos 7,97 | tope 90 UF ✓ |

### 4.3 Contenido (blogs) que el plan editorial no tiene
- Bono $30 mil por hijo (nuevo).
- SUE en operación (1-oct) + fin de SEJ/BTM.
- FUAS 2027 paso a paso (ventana 1–22 oct).
- Cupón de Gas Licuado (alerta 30-sep).
- Bodas de Oro reajustado (oct).
- Subida de PGU 75+ (ya publicado #8, ampliar con montos reales).
- Reajuste sueldo mínimo 2027 (enero) y efecto en tramos.
- ¿Calculadora = evaluador de beneficios? (diferenciador frente a bonoschile.cl; propuesta: "qué beneficios me corresponden" con RSH/tipo de trabajador).

---

## 5. Calendario de ventanas (sep-2026 → mar-2027)

| Fecha | Evento | Acción recomendada |
|---|---|---|
| 30-sep-2026 | Vence Cupón de Gas Licuado $27.000 | blog/CTA ya |
| 1–22-oct-2026 | FUAS 2027 (admisión 2027) | guía + calc becas |
| 1-oct-2026 | Entra en vigencia el SUE | blog + calc |
| 8-oct-2026 | Cierra arriendo especial PM/PcD | contenido + calc DS52 |
| 9-oct-2026 | Cierra Banco de Materiales DS27 | contenido |
| 15-oct-2026 | Resultados FUAS 2026 | post de seguimiento |
| Oct-2026 | Reajuste Bono Bodas de Oro | actualizar calc + blog |
| Nov-2026 (?) | Posible 2º llamado DS1 (prensa; sin página oficial) | monitorear |
| 30-nov-2026 | 4ª cuota contribuciones | post #29 ya publicado |
| Dic-2026 | Ley 21.719 datos personales (1-dic) | revisar privacidad del sitio |
| Ene-2027 | Reajuste IMM por IPC may–dic 2026 (decreto ≤ 15-ene) | blog + actualizar constantes |
| Abr-2027 | Operación Renta 2027 | guía #39 planificada |

---

## 6. Plan de acción propuesto (bloques)

**Bloque A (crítico, primero):** IUSC mensual + tabla anual UTA + sus tests. Evidencia en §1.1 y §1.2.
**Bloque B (actualizaciones con fuente lista):** aporte empleador 3,5% + calendario (previa resolución SIS), PGU 75+, Bodas de Oro, FONASA umbrales, DS49/DS1/DS19, subsidio hipotecario 21.836.
**Bloque C (calculadoras nuevas ola 1):** AFPER, seguro de cesantía, SUE, licencia médica, part-time, SUF.
**Bloque D (contenido de ventana):** FUAS, gas, bodas, SUE, bono niñez.
**Bloque E (operación):** telemetría de frescura de `/api/values`.

*(Cada bloque debe ir con test propio y fuentes citadas; el repo exige "sin fuente oficial verificada, no se cambia una fórmula".)*

---

## 7. Método, evidencia y limitaciones

- **Método**: 10 subagentes de scrapeo con instrucciones estrictas de citar URL + cita textual + confianza; verificación cruzada de los puntos que deciden cambios de código contra la página oficial (hecha en esta auditoría); benchmark de competencia; cruce con Search Console del 23-sep-2026.
- **Evidencia**: `docs/research/evidencia-2026-09/` (10 JSON con 321 ítems: nombre, monto, vigencia, requisitos, URL, cita, confianza) + `hallazgos verificados` (§1–2 de este informe).
- **Pendientes/limitaciones**: SUE (discrepancia 2,25 vs 2,5 IMM hasta que se publique el decreto del art. 8); SIS (1,62/1,78/1,5 según fuente); DS19 (falta desglose por tramos oficial); PBSI 2026; montos AFD; convocatorias FOSIS/Sercotec por región; aranceles 2027; calendario FUAS completo 2027. Nada de esto bloquea los bloques A y B.
- **No se inventó ningún dato**: los ítems de confianza baja quedaron marcados como pendientes en cada JSON.

*Auditoría generada por Hermes (análisis + scrapeo) para Diego — 26-09-2026.*
