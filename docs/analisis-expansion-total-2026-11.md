# Análisis y plan — expansión total (2026-11-17)

> Segundo pase tras el PR #84. Objetivo: más visitas y que vuelvan. Priorización impacto × esfuerzo.
> Convención: **verificado** (medido en repo o en producción), **inferido**, **supuesto**.

## 1. Estado medido

| Área | Hallazgo | Tipo |
|------|----------|------|
| Catálogo | 67 calculadoras en `calculators.ts`, 62 indexables, 6 `noIndex`; `audit-ymyl-matrix`: 0 inputs fantasma, 0 fallos de gates AdSense | verificado |
| Contenido | 42 artículos, 13 guías pillar + 2 guías de datos (feriados 2027, licencia médica) | verificado |
| Datos | `snapshot.json` del 16-11-2026 (UF, UTM, dólar, euro, ARS desde BCentral); `/api/values` en producción responde con `stale:false` | verificado |
| Sueldo mínimo | `INGRESO_MINIMO` es un valor fijo ($553.553). La Ley 21.830 art. 1 ordena reajuste por IPC desde el **01-01-2027**, con decreto de Hacienda a más tardar el 15-01-2027. Hoy no hay calendario por fecha: el cambio exige editar la constante a mano | verificado (BCN idNorma 1225354, DT Ord. 307/28) |
| Vencimientos próximos | Topes FCS vigentes hasta 28-02-2027; `DESEMPLEO_INE` caduca el 27-11-2026; tope imponible 2027 (resolución SP de febrero); escalón 4,25 % empleador el 01-08-2027 (ya en calendario) | verificado en `constants.ts` |
| SIS | Desde ago-2026 el SIS (1,78 % según SP) va dentro del 3,5 % y el código no lo cobra aparte; 1,62 % solo rige antes de ago-2026. Residual: julio-2026 2,00 % (solo Previred) | cerrado 2026-11-18 ([cierre Q4 §5](research/cierre-plan-q4-2026.md)) |
| SEO on-page | Title, description, canonical y H1 únicos en las 6 URL muestreadas; JSON-LD completo en calculadoras (SoftwareApplication, HowTo, FAQPage, BreadcrumbList, Speakable) | verificado |
| Peso de página | `/calculadoras` pesa **580 KB de HTML** (388 KB son payload RSC); home 282 KB; `/blog` 265 KB. Una calculadora pesa 118–141 KB | verificado (curl a producción) |
| JS por página | En producción una calculadora descarga **2,23 MB de JS (640 KB gzip)**: el buscador del header arrastraba el texto completo de artículos, guías y catálogo a todas las páginas. Con este PR (build local): calculadora 0,87 MB (264 KB gzip), home 0,66 MB, blog 0,74 MB, `/calculadoras` 0,64 MB | verificado (suma de chunks referenciados por el HTML) |
| TTFB | 0,25–0,40 s en calculadoras y blog; 0,74 s home; 1,24 s `/calculadoras` | verificado, una sola muestra |
| GEO | `llms.txt` con catálogo completo por categoría (134 líneas), `quick-answers`, `/prensa` citable, `/api/values` público. Falta una página "valores de hoy" pensada para la consulta diaria | verificado |
| Retención | Exportar/compartir resultado, `HistoryPanel`, hub `/cesantia`. No hay página de retorno diario ni estado compartible por URL | verificado |
| PageSpeed | Sin medición: la API pública devolvió cuota agotada | no medido |

## 2. Demanda no cubierta

Competidores revisados: calc.cl, tecalculo.cl, calculadoraenlinea.cl, comocalcular.cl, haberes.cl, utmchile.cl, utilidad.cl, preciodolarhoy.cl, netfigure.co.

| Intención | Quién la cubre | CalculaChile | Fuente oficial disponible |
|-----------|----------------|--------------|---------------------------|
| Impuestos por compras en Temu, AliExpress, Shein, Amazon | preciodolarhoy.cl, netfigure.co | No | Aduanas ("¿Cuánto impuesto se paga al importar?"), Ley 21.713 |
| Real brasileño / sol peruano a peso chileno (viajes de verano) | xe.com, utilidad.cl | Solo dólar, euro y peso argentino | BCentral serie `F072.CLP.BRL.N.O.D` y equivalentes |
| Fechas de prenatal, postnatal y postnatal parental | comocalcular.cl, haberes.cl | No | Código del Trabajo arts. 195 y 197 bis; DT |
| Impuesto a la herencia | utmchile.cl, resuelvotuherencia.cl | No | Ley 16.271 art. 2; SII |
| Cuánto crédito hipotecario dan según el sueldo | calc.cl, tecalculo.cl | Solo dividendo | No hay norma: la relación dividendo/renta es política de cada banco → supuesto editable |
| Sueldo mínimo 2027 | — (pico en enero) | No | Ley 21.830; monto recién con el decreto |
| Operación Renta 2027 | contando.cl, SII | Solo calculadora | SII (guía #39 del plan editorial) |

## 3. Plan priorizado

| Prio | Trabajo | Impacto | Esfuerzo | Carril |
|------|---------|---------|----------|--------|
| P0 | Calculadora `compras-internacionales` | Alto: Navidad, Cyber, todo el año | Medio | A |
| P0 | Conversor real brasileño → peso chileno (y otras monedas de viaje con serie BCentral) | Alto estacional dic–mar | Medio | A |
| P0 | Sueldo mínimo por calendario de fecha + blog #42 "sueldo mínimo enero 2027" | Alto en enero; evita dato vencido | Bajo | C |
| P1 | Calculadora `prenatal-postnatal` | Evergreen | Medio | B |
| P1 | Calculadora `impuesto-herencia` | Evergreen | Medio | B |
| P1 | Calculadora `capacidad-credito-hipotecario` | Evergreen alto volumen | Medio | B |
| P1 | Guía pillar #39 Operación Renta 2027 + blog viaje de verano en auto | Estacional ene–abr | Alto | C |
| P1 | Enlace compartible con el cálculo cargado (inputs en la URL; el canonical no cambia) | Compartir y recomendar | Bajo | raíz |
| P0 | Sacar artículos, guías y catálogo del JS de cada página (hallazgo durante la implementación) | Velocidad móvil en todo el sitio | Bajo | raíz |
| P1 | Reducir el payload de `/calculadoras` | Velocidad móvil | Bajo | raíz |
| P2 | Auditoría de vigencia de constantes con vencimiento en 2027 | Confianza YMYL | Bajo | C |
| P2 | `llms.txt`, quick-answers y enlazado interno de lo nuevo | GEO | Bajo | raíz |

> Descartado tras revisar el código: una página nueva de "valores de hoy". La home (`OfficialValuesBlock`), `/prensa` y las calculadoras de UF/UTM/dólar (título con el valor en vivo) ya responden esa consulta; una cuarta URL competiría con ellas.

Lo que no entra en este pase queda en [`backlog-ideas.md`](./backlog-ideas.md); el calendario en [`calendario-contenido-12m.md`](./calendario-contenido-12m.md).

## Decisiones que necesitan revisión (17-11-2026)

### Datos sin fuente clara o con interpretación
| Tema | Qué se hizo | Qué falta decidir |
|------|-------------|-------------------|
| Sueldo mínimo 2027 | No se cargó ningún monto. El blog #42 muestra el IPC parcial del INE (abril 112,18; octubre 114,13) y una tabla rotulada como ejercicio hipotético | Si prefieres quitar la tabla de escenarios hasta el decreto de Hacienda (plazo 15-01-2027) |
| SIS | Cerrado sin cambio de fórmula: el 1,78 % (SP) está dentro del 3,5 % desde ago-2026 | Nada; residual de julio-2026 en [cierre Q4 §5.1](research/cierre-plan-q4-2026.md) |
| Compras internacionales: umbral US$500 | Se compara contra el valor de los productos; la base del impuesto sí incluye envío y seguro. Aduanas solo dice "compra hasta US$500" | Confirmar si el umbral considera el envío |
| Compras internacionales: arancel en compras de hasta US$500 a plataformas no inscritas | Se modeló solo IVA, como indica Aduanas para ese tramo | Confirmar con Aduanas |
| Compras internacionales: tipo de cambio | Dólar observado como referencia; Aduanas usa el tipo de cambio de la fecha de aceptación de la declaración | Aceptar la referencia o pedir el dólar al usuario |
| Compras internacionales: TLC | Opción manual de 0 % de arancel; no verifica origen ni rebajas parciales | Mantenerla u ocultarla |
| Real y sol | Valores iniciales del 17-11-2026 marcados como referencia hasta que corra el cron con credenciales reales del Banco Central | Ejecutar el cron y revisar que se actualicen |
| Herencia: UTM | Usa la UTM actual si no se ingresa la del mes del fallecimiento; la ley fija la de esa fecha | Hacer obligatorio el campo o dejar el aviso |
| Herencia: donaciones previas | No se acumulan | Agregar o dejar como límite declarado |
| Prenatal/postnatal: subsidio en pesos | No se calcula; solo fechas | Ver backlog |
| Capacidad hipotecaria | 25 % dividendo/renta (recomendación citada por CMF Educa, no norma), 80 % de financiamiento y tasa de 4,5 % son supuestos editables | Valores por defecto |
| Blog de viaje en auto | Ejemplo con litro a $1.500, 12 km/l, peajes y TAG rotulados como supuestos | Aceptar o ajustar |
| Blog de compras | Ejemplo con dólar a $950 rotulado como supuesto | Aceptar o ajustar |
| Operación Renta 2027 | El SII no ha publicado fechas del Formulario 22 ni de devoluciones; la guía lo dice | Completar cuando se publiquen |

### Monetización
No se tocaron el script de AdSense, los componentes de anuncios, su ubicación, `robots`, los sitemaps ni las redirecciones. Las páginas nuevas usan las plantillas existentes. El enlace compartible agrega parámetros a la URL, pero el canonical sigue siendo la URL limpia.
