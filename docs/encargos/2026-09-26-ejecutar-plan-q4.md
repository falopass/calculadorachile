# Encargo — Ejecutar el plan Q4 2026 completo (correcciones + calculadoras nuevas)

| | |
|---|---|
| **Fecha** | 26 de septiembre de 2026 |
| **Origen** | Auditoría `docs/research/auditoria-2026-09-26-estado-y-beneficios.md` (§4 y §6) |
| **Spec** | `docs/plan-calculadoras-q4-2026.md` (bloques A–E) |
| **Datos** | `docs/research/evidencia-2026-09/*.json` (321 ítems: monto, vigencia, requisitos, URL, cita, confianza) |
| **Lanzamiento** | Sesión Devin del proyecto (pane WezTerm `wa:CalculaChile`) o `devin-run` |

## Misión

Ejecutar **completo** el plan `docs/plan-calculadoras-q4-2026.md`: bloques **A, B, C, D y E**, en ese orden.
Donde el plan cita una URL, el dato sale de la fuente oficial (los JSON de evidencia tienen la cita
textual); no se usa la memoria del agente para montos ni fórmulas.

## Reglas duras (AGENTS.md + auditoría)

1. **Sin fuente oficial verificada no se cambia una fórmula ni un monto.** Si no se puede
   re-verificar la fuente citada, dejar el valor como está y anotarlo en el informe de cierre.
2. No cambiar slugs, URLs canónicas, títulos SEO, AdSense ni structured data existentes.
3. Cada cambio con el test del módulo afectado. Son **obligatorios** los goldens citados en el plan:
   - A1: base 20 UTM → (0,08 − 0,54) × UTM; base $1.636.400 (UTM 71.721) → **$26.727**.
   - A2: tabla anual 13,5/30/50/70/90/120/310 UTA con rebajas 0,54…38,82 UTA.
   - B3: PGU 78 años → $250.275; 70 años → $231.732.
   - C1: AFPER 2 cargas + SSyOO → $200.502.
4. Constantes nuevas con vigencia (`desde`/`hasta`) y comentario de fuente (URL + cita).
5. `node scripts/audit-ymyl-matrix.mjs <id>` en 0 fantasmas para cada calculadora tocada o nueva.
6. **Commit + push a main al terminar cada bloque** (el push a producción está autorizado). Un
   commit por bloque mínimo, con mensaje `fix(...)` / `feat(...)` / `content(...)`.
7. No tocar lo declarado "verificado y correcto" en el informe §2.

## Orden y notas por bloque

### Bloque A — Bugs de cálculo (primero, sin excepción)
- A1 IUSC mensual: rebajas 0,54 / 1,74 / 4,49 / 11,14 / 17,80 / 23,32 / 38,82 UTM.
  Fuente: SII `impuesto2026.htm` (rebaja 0,54 UTM invariante; verificada con sep y oct 2026).
  El test actual que afirma "sin rebaja" se reemplaza (codifica el bug).
- A2 Tabla anual UTA de `operacion-renta` y `simulador-apv`: 13,5–310 UTA, tasas 0,04–0,40,
  rebajas 0,54–38,82 UTA. Fuente: SII personas_naturales AT2026.

### Bloque B — Actualizaciones con fuente lista
- B1 **Aporte empleador 3,5%** (ago-2026): 2,5% Seguro Social + 0,9% CRP + 0,1% cuenta individual;
  calendario 4,25 (ago-2027) → 5,0 (2028) → 5,7 (2029) → … → 8,5% (2033). Fuente: ChileAtiende 130987.
  Ojo: el blog `cotizacion-empleador-3-5-agosto-2026-costo-pyme` ya dice 3,5%; el código debe quedar coherente.
- B2 **SIS: NO cambiar sin doble fuente.** Candidatos: 1,62% (arrastrado), 1,78% (Previred ago–oct 2026),
  1,5% (mencionado en ficha 130987). Verificar en Previred; si no hay acuerdo, dejar 1,62% y documentar.
- B3 **PGU 75+** desde sept-2026 ($250.275). Fuente: ChileAtiende 102077 / 130457.
- B4 **Bodas de Oro: reactivar la calculadora** (el bloqueo por "fórmula sin verificar" ya no aplica —
  ver auditoría §1.5). Montos oct-2026: $482.295 total / $241.147 por cónyuge. Reglas verificadas:
  50 años de matrimonio, RSH 80%, pago único por partes iguales, plazo 1 año desde el aniversario,
  viudez con reglas propias. Reemplazar el 410 por la página activa con los montos y la fuente.
- B5 FONASA: umbrales B/C/D vigentes; eliminar las "cotizaciones" 0,67/2,04 inexistentes.
- B6 Vivienda: DS49 (base 314 UF + complementarios), DS1 T3 rango 250–550 UF, subsidio hipotecario
  Ley 21.836 (60 pb, 80.000 cupos, hasta 6.000 UF, hasta 31-05-2028). **DS19: verificar desglose por
  tramos en MINVU antes de tocar**; si no se aclara, dejar como está y documentar.
- B7 Menores: enlace `postulacion.minvu.gob.cl` → `minvu.gob.cl`; etiqueta "tope 90 UF".

### Bloque C — Calculadoras nuevas (todas, en el orden de prioridad del plan)
Orden: C1 AFPER → C2 seguro de cesantía → C4 licencia médica (SIL) → C5 sueldo part-time → C3 SUE →
C9 bodas de oro (la de B4) → C12 factor hora extra → C6 SUF → C8 subsidio eléctrico → C7 bono $30 mil
por hijo → C11 subsidio arriendo DS52 → C10 asignación por muerte → C13 tope 90 UF.
- C3 SUE: implementar con la fórmula de la Ley 21.808; dejar marcado el umbral 2,25 vs 2,5 IMM
  como dependiente del decreto art. 8 (nota visible + TODO en el código).
- C7 "becas/gratuidad": si la complejidad excede el patrón de una calculadora (RSH + PAES + IES),
  entregar al menos el verificador de elegibilidad + tabla de topes de becas, y documentar la fase 2.

### Bloque D — Contenido de ventana
Publicar según `docs/plan-editorial.md` + auditoría §4.3: FUAS 2027 (ventana 1–22 oct), cupón de gas
(alerta 30-sep), bono $30 mil por hijo, SUE en operación, bodas de oro reajustado, sueldo part-time.
Revalidar cada monto contra su fuente el día de publicación (regla del repo).

### Bloque E — Operación
`/api/values`: alerta si `generatedAt` > 48 h o si todo queda en fallback > 24 h; log de diagnóstico
de BCentral/Mindicador en runtime.

## Cierre

- Al terminar cada bloque: tests verdes + push (paso 6 de las reglas duras).
- Al terminar todo: escribir `docs/research/cierre-plan-q4-2026.md` con:
  1. Lista de bloques completados y commits asociados.
  2. Qué quedó **sin** hacer o bloqueado (SIS, DS19, decreto SUE, fase 2 de becas…) y por qué.
  3. Verificaciones hechas y su fuente.
- Si un bloque se atasca más de lo razonable, no dejar el repo a medias: cerrar el bloque en curso,
  commit, y anotar el pendiente en el informe de cierre.

*Encargo generado por Hermes el 26-09-2026 a partir de la auditoría de beneficios del Estado.*
