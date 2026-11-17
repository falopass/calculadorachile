# Calendario editorial y de temporada — 12 meses (dic 2026 → nov 2027)

> Regla del repo: revalidar montos T−1 antes de publicar. Cada bloqueo se publica 3–6 semanas antes del pico para indexar.
> Pendientes del plan editorial referenciados por su número (#).

| Mes | Pico / evento | Calculadora(s) a empujar | Contenido a publicar (antelación) |
|-----|---------------|---------------------------|-----------------------------------|
| **Dic 2026** | 25 dic irrenunciable, aguinaldo Navidad (sector público + IPS), gratificación fin de año, viajes verano | `trabajo-en-feriado`, `aguinaldo`, `gratificacion-legal`, `costo-viaje`, `costo-tag`, `peso-argentino-clp` | #34 feriado 25 dic ✅(en este PR), #35 aguinaldo sector público ✅, #36 gratificación fin de año ✅, viajes verano costo auto (blog nuevo si hay capacidad) |
| **Ene 2027** | Vacaciones verano, viajes, viaje a Argentina, reajustes enero | `costo-viaje`, `peso-argentino-clp`, `conversor-divisas`, `vacaciones-proporcionales`, `dias-habiles` | Blog "cuánto cuesta viajar en auto este verano" (bencina + TAG + peajes); reseña feriados 2027 ya existe como guía |
| **Feb 2027** | Vuelta al cole/trabajo, matrículas, postulación becas JUNAEB/mineduc | `becas-gratuidad`, `promedio-notas`, `nota-minima-escala`, `sueldo-part-time` | Blog "becas y beneficios estudiantiles 2027" + satélite `sueldo part time estudiantes` |
| **Mar 2027** | **Operación Renta** (inicio abril), permiso de circulación (vence 31 mar) | `operacion-renta`, `impuesto-segunda-categoria`, `boleta-honorarios`, `permiso-circulacion`, `costo-notaria` | **#39 guía pillar Operación Renta 2027** (publicar 1ª quincena mar), #40 permiso circulación 2027, blog "devolución de impuestos: quién recibe" |
| **Abr 2027** | Operación Renta (pico máximo), devoluciones, contribuciones 1ª cuota (30 abr), Semana Santa (viajes) | `operacion-renta`, `ppm`, `contribuciones`, `costo-viaje` | Satélites renta: "documentos para Operación Renta", "PPM vs retención" (#32), "contribuciones 1ª cuota abril 2027" |
| **May 2027** | 1 de mayo (feriado trabajado), posible reajuste sueldo mínimo, gratificación semestral | `trabajo-en-feriado`, `sueldo-liquido`, `sueldo-minimo` (blog), `gratificacion-legal` | #42 sueldo mínimo 2027 cuando haya ley/publicación oficial; blog feriado 1 mayo |
| **Jun 2027** | Medio año, calefacción/invierno (luz, gas), contribuciones 2ª cuota (30 jun) | `cuenta-luz`, `subsidio-electrico`, `contribuciones` | Blog "subsidio eléctrico convocatoria 2027" + "contribuciones 2ª cuota junio" |
| **Jul 2027** | Vacaciones invierno, postulaciones SUE/beneficios empleo | `vacaciones-proporcionales`, `dias-habiles`, `subsidio-unificado-empleo` | Blog empleo/invierno según convocatorias del año |
| **Ago 2027** | FUAS admisión 2028 (ventana sep–oct), permiso 2ª cuota, aporte empleador sube a 4,25 % (ago 2027, Ley 21.735) | `becas-gratuidad`, `costo-empleado-pyme`, `permiso-circulacion` | Blog FUAS 2028 (publicar ago), **blog "cotización empleador 4,25 %"** (ventana exacta) |
| **Sep 2027** | **18–19 sep irrenunciables + aguinaldo Fiestas Patrias + viajes**, contribuciones 3ª cuota (30 sep) | `trabajo-en-feriado`, `aguinaldo`, `costo-viaje`, `contribuciones` | Actualizar/republicar blog aguinaldo Fiestas Patrias 2027 + feriado 18 sep + "viaje de Fiestas Patrias cuánto sale" |
| **Oct 2027** | FUAS cierre, SUE, Bodas de Oro, subsidio eléctrico convocatoria | `becas-gratuidad`, `subsidio-unificado-empleo`, `bono-bodas-oro`, `subsidio-electrico` | Blogs de convocatorias del año según fechas oficiales |
| **Nov 2027** | Contribuciones 4ª cuota (30 nov), prep navidad | `contribuciones`, `aguinaldo`, `costo-viaje` | "Contribuciones 4ª cuota noviembre 2027" + prep contenido diciembre |
| **Dic 2027** | (ciclo repite) | — | Actualizar slugs/artículos 2027 → 2028 con redirección si cambia año |

### Notas operativas
- **No duplicar** artículos ya publicados (`articles.ts`): ante cada ventana, actualizar el post del año anterior (fecha + montos revalidados) antes que crear uno nuevo sobre lo mismo.
- Cada post nuevo: actualizar `plan-editorial.md`, citar fuente y fecha, enlazar 3–5 calculadoras del cluster.
- Montos siempre con `lastReviewed`/fuente oficial el día de publicación.
