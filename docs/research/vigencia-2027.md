# Vigencia 2027 de `src/lib/values/constants.ts`

Revisión del 17-11-2026 (carril C, expansión total). Lista las constantes que **vencen o cambian entre diciembre de 2026 y diciembre de 2027**, con la fecha, la fuente que la fija y la acción pendiente. Regla: nada se adelanta sin norma o resolución publicada; los montos 2027 se cargan cuando la fuente oficial exista.

**Corregido hoy:** ninguna constante estaba vencida al 17-11-2026 con una fuente oficial que permitiera actualizarla. Único cambio estructural: `INGRESO_MINIMO` pasó a calendario por fecha (`CALENDARIO_INGRESO_MINIMO` + `getIngresoMinimoVigente`) sin cambiar resultados, para que el monto 2027 sea una línea.

## Cambios con fecha fijada por ley o resolución

| Constante | Cambia | Qué cambia | Fuente | Acción |
|---|---|---|---|---|
| `CALENDARIO_INGRESO_MINIMO` / `INGRESO_MINIMO` | 01-01-2027 | Monto general, <18/>65, no remuneracional (arts. 1, 2, 3 y 6), jornal, hora y zona extrema derivados | [Ley 21.830](https://www.bcn.cl/leychile/navegar?idNorma=1225354) arts. 1 y 6: IPC acumulado 01-05-2026 a 31-12-2026; decreto de Hacienda a más tardar el 15-01-2027 | Agregar tramo `vigente_desde: '2027-01-01'` con los montos del decreto. Recalcular `hora` con jornada de 42 h. **No estimar** |
| `ASIGNACION_FAMILIAR_2026` (tramos de ingreso) | 01-01-2027 | Límites de tramos (art. 4); los montos por carga no se reajustan por el art. 6 | Ley 21.830 art. 6, mismo decreto | Calendarizar los tramos con fecha cuando salga el decreto |
| `SUBSIDIO_FAMILIAR` (tramos de ingreso del art. 5) | 01-01-2027 | Tramos de ingreso | Ley 21.830 art. 6, mismo decreto | Igual que la anterior |
| Constantes que leen `INGRESO_MINIMO` (`SALUD` tramos Fonasa, `SUBSIDIO_UNIFICADO_EMPLEO`, `BENEFICIO_MORTUORIO`, `PENSION_ALIMENTICIA`/`PENSION_ALIMENTOS`, `GRATIFICACION`, `CASA_PARTICULAR`) | 01-01-2027 | Si derivan del IMM en tiempo de ejecución, cambian solas con el tramo nuevo | Ley 21.830 | Revisar cuáles copian el monto en vez de leer `INGRESO_MINIMO` (p. ej. umbrales Fonasa "desde 01-05-2026") y alinearlas el día del decreto |
| IMM, asignación familiar y subsidio familiar | 01-07-2027 | Nuevo reajuste por ley | Ley 21.830 art. 7 (proyecto a más tardar en junio de 2027) | Esperar la ley |
| `BOLETA_HONORARIOS` / `RETENCION_HONORARIOS_CALENDARIO` | 01-01-2027 | Retención 15,25% → 16% | Ley 21.133 (calendario ya cargado: 2027 = 16) | Verificar que todos los consumidores usan el año y no `tasa_total` (fallback 15,25) |
| `SEGURO_SOCIAL_PREVISIONAL` | 01-08-2027 | Aporte empleador 3,5% → 4,25% | Ley 21.735 (ya calendarizado) | Ninguna; revisar el texto de artículos que digan "3,5%" en agosto de 2027 |
| `PGU_2026` (edad umbral) | 01-09-2027 | Edad umbral de la PGU máxima 75 → 65 | Calendario ya cargado | Ninguna |
| `SEGURO_CESANTIA_BENEFICIOS` | 01-03-2027 (`vigenteHasta: '2027-02-28'`) | Mínimos y máximos FCS | Reajuste anual informado por la Superintendencia de Pensiones | Cargar valores de marzo de 2027 cuando la SP los publique |
| `BONO_APOYO_NINEZ` | 15-03-2027 (`nacidosHasta`) | Cierre de la ventana de nacimientos | Ya en la constante | Revisar textos después de esa fecha |

## Cambios anuales sin fecha exacta publicada

| Constante | Cuándo | Fuente esperada | Acción |
|---|---|---|---|
| `TOPE_IMPOSITIVO` (90 UF AFP/salud; 135,2 UF cesantía) | Enero–febrero de 2027 | Resolución anual de la Superintendencia de Pensiones (2026: Res. 236 y 237) | Actualizar con la resolución 2027 |
| `PGU_2026` (monto) | Febrero de 2027 | Reajuste anual por IPC (IPS/SP) | Cargar monto 2027 cuando se publique |
| `IMPUESTO_SEGUNDA_CATEGORIA`, `UTM_SII_2026`, `UTM`, `UTA_2026` | Mensual | SII, tabla de UTM/UTA y de impuesto único | Agregar 2027 mes a mes; para el AT 2027 se usa la UTM de diciembre de 2026 (LIR art. 47) |
| `PERMISO_CIRCULACION_TABLA_SII` / `PERMISO_CIRCULACION_ANIO_VIGENTE = 2026` | Enero–febrero de 2027 (pago en marzo) | Tabla de tasación SII 2027 | Agregar tabla 2027 y subir el año vigente |
| `CONTRIBUCIONES_BIENES_RAICES` (`vigencia: '2026-07-01'`) | 01-01-2027 y 01-07-2027 | Reajuste semestral informado por el SII | Revisar en cada semestre |
| `APORTE_FAMILIAR_PERMANENTE` | Primer trimestre de 2027 | Ley anual / ChileAtiende | Monto 2027 cuando exista la ley |
| `AGUINALDO_2026`, `AGUINALDO_PENSIONADOS_IPS_2026` | Septiembre y diciembre de 2027 | Leyes de reajuste/aguinaldo | Nuevos objetos 2027 cuando se publiquen |
| `BONO_BODAS_ORO` | 01-10-2027 (reajuste 100% IPC cada octubre, según ChileAtiende) | IPS / ChileAtiende ficha 5369 | Agregar tramo 2027-10-01 cuando se publique el monto |
| `BECAS_EDUCACION_SUPERIOR_2027`, `SUBSIDIO_ARRIENDO_DS52` | Postulaciones 2026 cerradas | Mineduc / Minvu | Solo editorial: actualizar estados y próximas convocatorias |
| `DESEMPLEO_INE` | Mensual (`proximaPublicacion: '2026-11-27'`) | INE | Actualizar cada publicación |
| `TMC_VIGENTE` | Snapshot mensual | CMF | Automático vía snapshot |
| `VERIFICACION_VALORES` (`verificadoAl: '2026-10-16'`) | — | Varias | Re-verificar en enero de 2027 tras los cambios anteriores |

Sin cambios previstos en el periodo: `IVA` (19%), `CALENDARIO_JORNADA_LEGAL` (próximo cambio 26-04-2028, 40 h), `AFP_OBLIGATORIA_PCT`.

## Pendientes para revisión de Diego

- Las fechas "enero–febrero" de topes imponibles, PGU y permiso de circulación son la práctica de años anteriores, no una fecha publicada para 2027.
- No verificamos la frecuencia exacta de reajuste de `CONTRIBUCIONES_BIENES_RAICES` para 2027.
