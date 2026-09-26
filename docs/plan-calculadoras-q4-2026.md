# Plan de calculadoras y correcciones — Q4 2026 (post-auditoría 26-09-2026)

> Origen: `docs/research/auditoria-2026-09-26-estado-y-beneficios.md` (§4 y §6).
> Evidencia oficial: `docs/research/evidencia-2026-09/*.json` (321 ítems citados).
> Complementa —no reemplaza— `docs/plan-editorial.md`. Este documento es el encargo técnico
> para implementar (Devin/agente) con specs y criterios de aceptación por bloque.

Regla del repo: sin fuente oficial verificada no se cambia una fórmula; toda fórmula nueva o
alterada conserva su test. Cada bloque cierra con typecheck si cambió un contrato + test del módulo
afectado.

---

## Bloque A — Correcciones críticas de cálculo (primero y aparte)

### A1. IUSC mensual: rebajas faltantes
- **Archivo**: `src/lib/values/constants.ts` → `IMPUESTO_SEGUNDA_CATEGORIA.tramos`.
- **Cambio**: rebajas oficiales del SII (en UTM), dejar los factores como están:
  - 13,5–30 → rebaja **0,54** (hoy 0)
  - 30–50 → **1,74** (hoy 1,2)
  - 50–70 → **4,49** (hoy 3,95)
  - 70–90 → **11,14** (hoy 10,25)
  - 90–120 → **17,80** (hoy 16,9)
  - 120–310 → **23,32** (hoy 22,42)
  - 310+ → **38,82** (hoy 37,92)
- **Fuente**: SII, "Monto de Cálculo del Impuesto Único de Segunda Categoría"
  (https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm).
  Comprobación: rebaja del tramo 4% = $38.729,34 (sep-2026, UTM 71.721) y $38.961,54 (oct-2026,
  UTM 72.151); ambas = 0,54 UTM exactos.
- **Tests**: `impuesto-segunda-categoria.test.ts` — reemplazar el test que asume "sin rebaja"
  (comentario incluido) por golden con rebaja: base 20 UTM → (0,8 − 0,54) × UTM = impuesto;
  base $1.636.400 con UTM 71.721 → **$26.727** (redondeo de (0,04×1.636.400 − 38.729,34)).
  Revisar también `sueldo-liquido.test.ts` (impuesto cambia donde la base supere 13,5 UTM).
- **Impacto**: `sueldo-liquido`, `impuesto-segunda-categoria` y consumidores de la tabla.

### A2. Tabla anual (UTA) de Operación Renta y APV
- **Archivo**: `constants.ts` → `IMPUESTO_SEGUNDA_CATEGORIA_2026`.
- **Cambio**: tramos oficiales **13,5 / 30 / 50 / 70 / 90 / 120 / 310 UTA** con tasas
  0 / 0,04 / 0,08 / 0,135 / 0,23 / 0,304 / 0,35 / 0,40 y rebajas (UTA)
  **0,54 / 1,74 / 4,49 / 11,14 / 17,80 / 23,32 / 38,82** (la mensual ×12).
- **Fuente**: SII, tabla art. 52 LIR AT2026 (https://www.sii.cl/valores_y_fechas/renta/2026/personas_naturales.html):
  exento hasta $11.265.804; tramos hasta $258.696.240; rebajas $450.632,16 … $32.395.445,28.
- **Tests**: `operacion-renta.test.ts` y `simulador-apv.test.ts` (goldens con la nueva tabla).

---

## Bloque B — Actualizaciones de constantes con fuente lista

### B1. Aporte del empleador (Ley 21.735)
- **Archivo**: `constants.ts` → `SEGURO_SOCIAL_PREVISIONAL.calendario` (+ usos en
  `costo-empleado.ts` y `sueldo-liquido.ts`).
- **Cambio**: calendario oficial: **3,5% (ago-2026)** → 4,25% (ago-2027) → 5,0% (2028) → 5,7% (2029)
  → … → **8,5% (2033)**. Desglose desde ago-2026: 2,5% Seguro Social + 0,9% CRP + 0,1% cuenta
  individual. Actualizar comentarios y el tope estimado a 2033.
- **Fuente**: ChileAtiende ficha 130987 + Nota Técnica Subsecretaría de Previsión Social.
- **Ojo**: el blog `cotizacion-empleador-3-5-agosto-2026-costo-pyme` ya publica 3,5%; hoy el
  código (1,75%) contradice al blog.

### B2. SIS: resolver discrepancia antes de tocar
- Candidatos: 1,62% (spensiones.cl, valor arrastrado), **1,78% para remuneraciones ago–oct 2026**
  (Previred Indicadores sep-2026), 1,5% (mencionado en ficha 130987 como componente del 8,5% al 2033).
- **Acción**: verificar en Previred (fuente mensual) y dejar la constante con vigencia mensual; no
  cambiar hasta tener dos fuentes de acuerdo.

### B3. PGU tramo 75+
- **Archivo**: `pgu.ts` + `PGU_2026`.
- **Cambio**: monto máximo ($250.275) para **75+ desde sept-2026** (hoy 82+). Los que cumplen 75
  entre oct-2026 y ago-2027 acceden desde su cumpleaños (evaluar por fecha si se quiere fino).
- **Fuente**: ChileAtiende 102077 y 130457.
- **Test**: `pgu.test.ts` — agregar caso 78 años → 250.275; 70 años → 231.732.

### B4. Bono Bodas de Oro
- **Cambio**: $482.295 total / $241.147 por cónyuge desde 1-oct-2026 (`BONO_BODAS_ORO`).
- **Fuente**: ChileAtiende 5369 (reajuste oct-2026 publicado).
- **Decisión pendiente de Diego**: reactivar la calculadora (hoy 410 Gone). Gobernanza:
  `AGENTS.md` prohíbe reactivarla sin fórmula verificada; ya está verificada (50 años de
  matrimonio, 80% RSH, pago único por partes iguales, plazo 1 año, viudez con reglas).

### B5. FONASA: umbrales de tramos y limpieza
- **Cambio**: `SALUD.fonasa.tramos` → B ≤ $553.553; C $553.554–$808.187; D ≥ $808.188 (desde 1-may-2026).
  Eliminar/reetiquetar las "cotizaciones" 0,67% y 2,04% (no existen como cotización legal).
- **Fuente**: fonasa.gob.cl/tramos (no la FAQ de la Superintendencia, desactualizada).

### B6. Vivienda
- **DS49**: reemplazar la estructura tramo1/2/3 por **subsidio base 314 UF + complementarios**
  (localización 200 UF, rural 120 UF, densificación 110 UF, discapacidad 20/80 UF, superficie ≤50 UF,
  premio al ahorro 1,5 UF/UF hasta 30 UF); ahorro 10 UF (15 UF colectivas >40% RSH); tope 950 UF
  (1.050 extremas). Fuente: MINVU/ChileAtiende.
- **DS1 T3**: reemplazar 270 UF fijo por **rango 250–550 UF según región**.
- **DS19**: verificar desglose por tramos en MINVU antes de tocar (la fuente vista da "hasta 1.200 UF").
- **Subsidio al Crédito Hipotecario**: actualizar a **Ley 21.836** (60 pb, 80.000 cupos, viviendas
  nuevas hasta 6.000 UF, vigente hasta 31-05-2028).

### B7. Menores
- Enlaces: `postulacion.minvu.gob.cl` no resuelve → usar `minvu.gob.cl`.
- Revisar etiqueta "tope 90 UF" vs "89,9 UF" en textos informativos (vigente: 90 UF desde feb-2026).

---

## Bloque C — Calculadoras nuevas (specs)

Formato por ítem: slug propuesto · inputs · reglas · fuente · test mínimo.

1. **`calculadora-aporte-familiar-permanente`** (AFPER/Bono Marzo)
   inputs: nº cargas AF/SUF acreditadas al 31-12; ¿familia SSyOO/Chile Solidario? → $66.834 × cargas
   (+ $66.834 por grupo si SSyOO). Fuente: ChileAtiende 38913. Test: 2 cargas + SSyOO → 200.502.
2. **`calculadora-seguro-cesantia`**
   inputs: tipo de contrato, remuneraciones promedio (10 últimas indefinido / 5 plazo fijo), meses
   cotizados, saldo CIC opcional → nº giros (1–13 CIC), monto por giro (70% primer giro), FCS si
   aplica: máximos $1.004.003 / $860.574 / $645.429 / $573.718 / $502.0xx. Fuente: AFC/DT (JSON laboral).
3. **`calculadora-subsidio-unificado-empleo`** (publicar tras decreto art. 8)
   inputs: renta bruta, grupo prioritario → tramo A: PV%×RB (tope 1 IMM SUE $529.000); tramo B:
   (PV%×1 IMM) − (PV%×(RB − 1,25 IMM)); piso 2,5% IMM; empresa tramo B: (PV%×1,25 IMM) − (PV%×1,25×(RB−1,25 IMM)).
   Primer año: 20% empresa + 10% trabajador; 12 meses (15 PcD/micro-pequeña). Pendiente: umbral
   2,25 vs 2,5 IMM (decreto art. 8). Fuente: Ley 21.808, DO 13-03-2026.
4. **`calculadora-licencia-medica`** (SIL)
   inputs: remuneración neta promedio 3 meses, días de licencia → monto diario 1/30 de la base, piso
   $5.946,92; pago desde día 1 si >10 días; desde el 4º si ≤10. Fuente: SUSESO/DT.
5. **`calculadora-sueldo-part-time`**
   inputs: horas semanales, sueldo base → ≤30 h: IMM × horas / 42 (piso proporcional); >30 h y
   <42 h: IMM íntegro (sin proporcionalidad); mostrar valor hora. Fuente: DT (ORD. 307/28).
6. **`calculadora-suf`**
   inputs: nº causantes, discapacidad → $22.601 / $45.202 por causante. Fuente: ChileAtiende 33112.
7. **`calculadora-bono-30-mil-por-hijo`** (verificador)
   niños 0–13 al 1-jun-2026, 80% RSH, pago automático IPS; caso nacidos 2-jun-2026→15-mar-2027
   (madre). Fuente: ChileAtiende 144481, Ley 21.840.
8. **`calculadora-subsidio-electrico`**
   inputs: integrantes del hogar → $17.346 / $22.548 / $31.224 por semestre; cuotas $2.891/$3.758/$5.204.
   Fuente: subsidioelectrico.cl, 5ª convocatoria.
9. **`calculadora-bono-bodas-de-oro`** (reactivación del 410, ver B4).
10. **`calculadora-asignacion-por-muerte`**
    tope 3 IMM no remuneracionales = $1.070.445; cuota mortuoria 15 UF. Fuente: ChileAtiende 5300.
11. **`calculadora-subsidio-arriendo`** (DS52)
    inputs: arriendo mensual, región, categoría → tope 4,2 UF/mes (regular, 170 UF totales; tope
    arriendo 11 UF, 13 UF zonas) / especial PM-PcD 213 UF, hasta 90%. Fuente: MINVU.
12. **`calculadora-factor-hora-extra`** (mini + contenido)
    factor oficial 42 h: sueldo × 1/30 × 28/168 × 1,5 = sueldo × **0,0083333**. Fuente: DT.
    (Demanda GSC: "factor horas extras 42 horas", 741 impresiones.)
13. **`calculadora-tope-imponible-90-uf`** (mini + contenido)
    90 UF = $ dónde se topan AFP/salud ($3.695.148 al 30-09-2026) y 135,2 UF cesantía. GSC "90 uf".

Prioridad sugerida dentro de C: 1, 2, 4, 5, 3 (cuando haya decreto), 9, 12, 6, 8, 7, 11, 10, 13.

---

## Bloque D — Contenido de ventana (blogs)
- FUAS admisión 2027 (postula 1–22 oct 2026) — guía corta + CTA a calc becas (C7 fase 2).
- Cupón de Gas Licuado $27.000 (vence 30-sep-2026) — alerta.
- Bono $30 mil por hijo — explicación + pago.
- SUE en operación (1-oct) — reemplaza al plan editorial #16 (sigue unbublished).
- Bodas de Oro reajustado (oct-2026) — CTA a la calc reactivada.
- Sueldo part-time (30 h) — CTA a C5.
- AFPER cobro pendiente (plan editorial #18 ya lo tiene agendado).

## Bloque E — Operación
- `/api/values`: alerta si `generatedAt` > 48 h o si `sources` queda todo en fallback por más de
  24 h; log diagnóstico de por qué BCentral/Mindicador fallan en runtime (hoy siempre fallback).

---

## Criterios de aceptación por bloque
- A y B: test del módulo afectado verde + los goldens nuevos citados arriba; sin cambios de slugs,
  URLs, AdSense ni structured data.
- C: cada calculadora con módulo puro + test + wiring en `CalculatorPageClient.tsx` + entrada en
  `calculators.ts` (con `sources` y `lastReviewed`) + `node scripts/audit-ymyl-matrix.mjs <id>`
  con 0 fantasmas.
- D: post con fuente citada y revalidación de montos el día de publicación (regla del repo).
- E: prueba con la API en producción tras desplegar.

*Generado por Hermes el 26-09-2026 a partir de la auditoría y de la evidencia oficial.*
