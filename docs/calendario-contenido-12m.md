# Calendario editorial y de temporada — 12 meses (dic 2026 → nov 2027)

> Regla del repo: revalidar montos T−1 antes de publicar. Cada bloqueo se publica 3–6 semanas antes del pico para indexar.
> Pendientes del plan editorial referenciados por su número (#).

| Mes | Pico / evento | Calculadora(s) a empujar | Contenido a publicar (antelación) |
|-----|---------------|---------------------------|-----------------------------------|
| **Dic 2026** | 25 dic irrenunciable, aguinaldo Navidad (sector público + IPS), gratificación fin de año, viajes verano | `trabajo-en-feriado`, `aguinaldo`, `gratificacion-legal`, `costo-viaje`, `costo-tag`, `peso-argentino-clp`, `compras-internacionales` (regalos de Navidad), `real-brasileno-a-peso-chileno`, `sol-peruano-a-peso-chileno` | #34 feriado 25 dic ✅(en este PR), #35 aguinaldo sector público ✅, #36 gratificación fin de año ✅, blog viaje en auto de verano ✅, blog impuestos de compras en Temu/AliExpress/Shein ✅, blog #42 sueldo mínimo enero 2027 ✅ (sin monto: espera el decreto) |
| **Ene 2027** | Vacaciones verano, viajes a Argentina/Brasil/Perú, **reajuste del sueldo mínimo por IPC (Ley 21.830; decreto de Hacienda a más tardar el 15-01-2027)** | `sueldo-liquido`, `costo-viaje`, `peso-argentino-clp`, `real-brasileno-a-peso-chileno`, `sol-peruano-a-peso-chileno`, `vacaciones-proporcionales`, `dias-habiles` | **Tarea con fecha:** al publicarse el decreto, agregar el tramo `2027-01-01` en `CALENDARIO_INGRESO_MINIMO` y reemplazar los escenarios del blog #42 por el monto oficial. Actualizar peajes 2027 del blog de viaje en auto cuando el MOP publique las tarifas |
| **Feb 2027** | Vuelta al cole/trabajo, matrículas, postulación becas JUNAEB/mineduc | `becas-gratuidad`, `promedio-notas`, `nota-minima-escala`, `sueldo-part-time` | Blog "becas y beneficios estudiantiles 2027" + satélite `sueldo part time estudiantes` |
| **Mar 2027** | **Operación Renta** (inicio abril), permiso de circulación (vence 31 mar) | `operacion-renta`, `impuesto-segunda-categoria`, `boleta-honorarios`, `permiso-circulacion`, `costo-notaria` | guía #39 checklist Operación Renta 2027 ✅ (completar con las fechas del Formulario 22 y de devoluciones cuando el SII las publique), #40 permiso circulación 2027, blog "devolución de impuestos: quién recibe" |
| **Abr 2027** | Operación Renta (pico máximo), devoluciones, contribuciones 1ª cuota (30 abr), Semana Santa (viajes) | `operacion-renta`, `ppm`, `contribuciones`, `costo-viaje` | Satélites renta: "documentos para Operación Renta", "PPM vs retención" (#32), "contribuciones 1ª cuota abril 2027" |
| **May 2027** | 1 de mayo (feriado trabajado), Día de la Madre, gratificación semestral | `trabajo-en-feriado`, `sueldo-liquido`, `gratificacion-legal`, `prenatal-postnatal` | Blog feriado 1 mayo; blog "prenatal y postnatal: fechas y aviso al empleador" enlazado a la calculadora |
| **Jun 2027** | Medio año, calefacción/invierno (luz, gas), contribuciones 2ª cuota (30 jun) | `cuenta-luz`, `subsidio-electrico`, `contribuciones` | Blog "subsidio eléctrico convocatoria 2027" + "contribuciones 2ª cuota junio" |
| **Jul 2027** | Vacaciones invierno (viajes a Brasil y Perú), postulaciones SUE/beneficios empleo, nuevo reajuste del sueldo mínimo previsto en la Ley 21.830 (revalidar fecha y monto en la ley antes de publicar) | `vacaciones-proporcionales`, `dias-habiles`, `subsidio-unificado-empleo`, `real-brasileno-a-peso-chileno`, `sol-peruano-a-peso-chileno`, `sueldo-liquido` | Blog empleo/invierno según convocatorias del año; actualización del sueldo mínimo con fuente oficial |
| **Ago 2027** | FUAS admisión 2028 (ventana sep–oct), permiso 2ª cuota, aporte empleador sube a 4,25 % (ago 2027, Ley 21.735) | `becas-gratuidad`, `costo-empleado-pyme`, `permiso-circulacion` | Blog FUAS 2028 (publicar ago), **blog "cotización empleador 4,25 %"** (ventana exacta) |
| **Sep 2027** | **18–19 sep irrenunciables + aguinaldo Fiestas Patrias + viajes**, contribuciones 3ª cuota (30 sep) | `trabajo-en-feriado`, `aguinaldo`, `costo-viaje`, `contribuciones` | Actualizar/republicar blog aguinaldo Fiestas Patrias 2027 + feriado 18 sep + "viaje de Fiestas Patrias cuánto sale" |
| **Oct 2027** | FUAS cierre, SUE, Bodas de Oro, subsidio eléctrico convocatoria | `becas-gratuidad`, `subsidio-unificado-empleo`, `bono-bodas-oro`, `subsidio-electrico` | Blogs de convocatorias del año según fechas oficiales |
| **Nov 2027** | Contribuciones 4ª cuota (30 nov), Cyber y Black Friday, prep navidad | `contribuciones`, `aguinaldo`, `costo-viaje`, `compras-internacionales` | "Contribuciones 4ª cuota noviembre 2027" + actualizar el blog de compras internacionales + prep contenido diciembre |
| **Dic 2027** | (ciclo repite) | — | Actualizar slugs/artículos 2027 → 2028 con redirección si cambia año |

### Evergreen (sin fecha fija)
- `calculadora-impuesto-herencia` y `calculadora-capacidad-credito-hipotecario` no tienen pico estacional: publicar un artículo de apoyo para cada una en los meses de menor carga (feb, jun, oct).

### Notas operativas
- **No duplicar** artículos ya publicados (`articles.ts`): ante cada ventana, actualizar el post del año anterior (fecha + montos revalidados) antes que crear uno nuevo sobre lo mismo.
- Cada post nuevo: actualizar `plan-editorial.md`, citar fuente y fecha, enlazar 3–5 calculadoras del cluster.
- Montos siempre con `lastReviewed`/fuente oficial el día de publicación.
