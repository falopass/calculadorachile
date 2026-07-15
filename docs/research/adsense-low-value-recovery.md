# Recuperación editorial tras rechazo de AdSense

Fecha de apertura: 2026-07-13
Estado: en ejecución
Alcance: 26 artículos de blog y 12 guías existentes; no incluye crear URLs nuevas.

## Diagnóstico verificable

AdSense informó “Contenido de bajo valor”. La pantalla de rechazo no identifica una URL concreta ni exige un mínimo de 1.500 palabras. Google Search declara expresamente que no tiene un recuento de palabras preferido y recomienda evaluar originalidad, profundidad, fuentes, experiencia, autoría y utilidad para personas.

El piso interno de 1.500 palabras se usa como control editorial para estas piezas YMYL, no como una regla atribuida a Google. Una pieza no se aprueba solo por superar el número: también debe resolver la intención, citar fuentes primarias, mostrar cálculos auditables, distinguir ley vigente de proyecto y eliminar afirmaciones genéricas o falsas.

Fuentes de política:

- [Google Search: contenido útil, fiable y centrado en las personas](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=es)
- [Políticas para Editores de Google](https://support.google.com/publisherpolicies/answer/10502938?hl=es)
- [Políticas del programa AdSense](https://support.google.com/adsense/answer/48182?hl=es)

## Línea base del 13 de julio de 2026

El script `scripts/audit-editorial-content.mjs` encontró 38 piezas:

- 34 bajo 1.500 palabras.
- 4 sobre 1.500 palabras.
- Mediana baja y concentración de resúmenes entre 350 y 850 palabras.
- Muchos artículos con una sola URL institucional genérica, sin enlace al trámite, ley, dictamen o boletín exacto.
- Errores sustantivos detectados en UF, reajuste de arriendo, gratificación y vacaciones proporcionales.

Piezas que ya superaban 1.500 en la línea base:

| Tipo | Slug | Palabras base |
|---|---|---:|
| guía | `hogar-servicios-basicos-chile` | 1.581 |
| guía | `empresas-pymes-chile` | 1.902 |
| guía | `sueldo-liquido-chile` | 2.242 |
| blog | `aguinaldo-fiestas-patrias-2026-pensionados-sector-publico` | 2.290 |

Las 34 piezas bajo el piso, ordenadas por palabras en la línea base:

| # | Tipo | Slug | Palabras base |
|---:|---|---|---:|
| 1 | blog | `reajuste-arriendo-uf-2026` | 361 |
| 2 | blog | `todo-sobre-uf-chile` | 370 |
| 3 | blog | `como-funciona-gratificacion-legal` | 373 |
| 4 | blog | `vacaciones-proporcionales-guia` | 381 |
| 5 | blog | `guia-iva-chile-2026` | 385 |
| 6 | blog | `calcular-indemnizacion-por-anos` | 391 |
| 7 | blog | `guia-horas-extra-chile` | 394 |
| 8 | blog | `boleta-honorarios-completo` | 435 |
| 9 | blog | `diferencia-sueldo-bruto-liquido` | 437 |
| 10 | blog | `como-calcular-finiquito-chile` | 479 |
| 11 | blog | `comparativa-comisiones-afp-2026` | 516 |
| 12 | blog | `tope-imponible-2026` | 543 |
| 13 | blog | `permiso-circulacion-segunda-cuota-agosto-2026` | 559 |
| 14 | blog | `plusvalia-dfl2-vs-comun-chile` | 577 |
| 15 | blog | `subsidios-minvu-2026-guia` | 591 |
| 16 | blog | `checklist-despues-despido-chile-2026` | 603 |
| 17 | guía | `credito-cae-educacion-chile` | 634 |
| 18 | blog | `como-cobrar-seguro-cesantia-afc-2026` | 665 |
| 19 | blog | `cae-renegociacion-condonacion-2026` | 676 |
| 20 | blog | `revision-tecnica-chile-2026-calendario-patente` | 704 |
| 21 | guía | `uf-utm-indicadores-chile` | 718 |
| 22 | blog | `cotizacion-empleador-3-5-agosto-2026-costo-pyme` | 757 |
| 23 | guía | `afp-pension-chile` | 776 |
| 24 | guía | `familia-pension-alimenticia-chile` | 793 |
| 25 | guía | `iva-boleta-honorarios-chile` | 796 |
| 26 | blog | `sueldo-minimo-2026-calcular-liquido` | 810 |
| 27 | guía | `vehiculos-chile-permiso-multas` | 839 |
| 28 | guía | `credito-hipotecario-chile` | 846 |
| 29 | blog | `horas-extra-jornada-42-horas-chile-2026` | 1.059 |
| 30 | blog | `seguro-cesantia-finiquito-2026-afc` | 1.071 |
| 31 | guía | `comprar-vivienda-chile` | 1.127 |
| 32 | blog | `finiquito-2026-ejemplo-sueldo-minimo` | 1.295 |
| 33 | guía | `finiquito-laboral-chile` | 1.338 |
| 34 | blog | `embargos-cae-tgr-2026-cuentas-bienes-raices` | 1.401 |

## Método de investigación por pieza

Cada reescritura debe dejar evidencia de:

1. Pregunta principal y decisiones que la persona necesita tomar.
2. Fuente normativa primaria: LeyChile/BCN, Diario Oficial, regulador o servicio competente.
3. Fuente operativa primaria: trámite, instructivo, circular, metodología, tabla o boletín exacto.
4. Dato 2026 fechado y verificable cuando el tema sea temporal.
5. Noticias para explicar el contexto, sin convertir titulares en derecho vigente.
6. Foros o comunidades solo para descubrir dudas, errores y lenguaje real; nunca para acreditar la ley.
7. Ejemplo numérico reproducible y advertencias sobre supuestos.
8. Enlaces internos útiles, no insertados para rellenar.
9. Bloque final con fuentes y fecha de comprobación.
10. Auditoría de palabras, enlaces, TypeScript y compilación.

Jerarquía de fuentes: norma o institución competente → documentación técnica oficial → datos oficiales → noticia primaria o medio confiable → foro como señal de pregunta.

## Prioridades

- P0: errores legales, cifras falsas, fórmulas incorrectas o piezas bajo 600 palabras.
- P1: YMYL laboral, tributario, vivienda, pensiones y deuda.
- P2: guías de hub que distribuyen tráfico y autoridad temática.
- P3: piezas ya extensas; requieren verificación y mejoras selectivas, no texto por volumen.

## Progreso

### Lote 1 — fundamentos de UF y derechos laborales

| Slug | Base | Actual | Correcciones principales | Estado |
|---|---:|---:|---|---|
| `todo-sobre-uf-chile` | 370 | 1.647 | Valor oficial, período 10–9, días calendario, IPC 0%, diferencia entre reajuste e interés | completado editorialmente |
| `reajuste-arriendo-uf-2026` | 361 | 1.691 | Contrato vigente vs renovación, competencia civil/SERNAC, mora, desahucio máximo de 6 meses | completado editorialmente |
| `como-funciona-gratificacion-legal` | 373 | 1.871 | Beneficiarios, requisitos del empleador, base anual, anticipos, jornada parcial y tope 2026 | completado editorialmente |
| `vacaciones-proporcionales-guia` | 381 | 1.763 | Inclusión de inhábiles, remuneración íntegra, progresivo desde 10+3, sin tope ficticio de 5 días | completado editorialmente |

Validación parcial del lote:

- Auditor de contenido: las cuatro piezas superan 1.500 palabras.
- Enlaces externos exactos: 24 en total entre las cuatro piezas.
- `npm.cmd run typecheck`: aprobado el 13 de julio de 2026.
- Build y validación visual: pendientes para el cierre del lote técnico.

### Lote 2 — honorarios, IVA, horas extra e indemnización

| Slug | Base | Actual | Correcciones principales | Estado |
|---|---:|---:|---|---|
| `boleta-honorarios-completo` | 435 | 1.743 | Retención 15,25% como PPM, emisor/receptor, fecha de emisión, Operación Renta 2027 y cotizaciones | completado editorialmente |
| `guia-iva-chile-2026` | 385 | 1.745 | Crédito no automático, exenciones acotadas, libros afectos, servicios desde Ley 21.420 y plazos F29 variables | completado editorialmente |
| `guia-horas-extra-chile` | 394 | 1.857 | Factor mensual 42 h, recargo dominical no automático, pacto trimestral, límite diario y compensación por feriado | completado editorialmente |
| `calcular-indemnizacion-por-anos` | 391 | 2.052 | Causales reales, base artículo 172, colación/movilización mensual, recargos correctos y plazo judicial | completado editorialmente |
| `diferencia-sueldo-bruto-liquido` | 437 | 1.728 | Imponible vs haberes, aportes del empleador, topes 90/135,2 UF, comisión AFP y base tributaria mensual | completado editorialmente |
| `como-calcular-finiquito-chile` | 479 | 1.917 | Causal antes de fórmula, feriado con calendario, reserva electrónica, descuento AFC y plazos diferenciados | completado editorialmente |
| `comparativa-comisiones-afp-2026` | 516 | 1.585 | Comisión vs saldo/rentabilidad, trámite real de traspaso, nuevos afiliados, SIS y reforma previsional | completado editorialmente |
| `tope-imponible-2026` | 543 | 1.622 | Vigencia enero/febrero, topes separados, UF variable, impuesto, independientes y múltiples empleadores | completado editorialmente |
| `permiso-circulacion-segunda-cuota-agosto-2026` | 559 | 1.538 | Misma municipalidad, reajuste IPC febrero-junio, categorías, compraventa, atraso y fraude | completado editorialmente |
| `plusvalia-dfl2-vs-comun-chile` | 577 | 1.924 | Costo tributario reajustado, cupo vitalicio, plazos, relacionados, elección del exceso y alcance real del DFL2 | completado editorialmente |
| `subsidios-minvu-2026-guia` | 591 | 2.184 | Estado real de llamados 2026, tramos DS1, modalidades DS49, acceso DS19, DS52 vigente y fraude | completado editorialmente |
| `checklist-despues-despido-chile-2026` | 603 | 2.086 | Carta y evidencia, finiquito en diez días, reserva, cotizaciones, plazos 60/90, CIC/FCS y reinserción | completado editorialmente |
| `credito-cae-educacion-chile` | 634 | 2.201 | Firma 2026, arancel de referencia, renovación, UF+2%, rebaja 10%, suspensión, prepago y FES no vigente | completado editorialmente |
| `como-cobrar-seguro-cesantia-afc-2026` | 665 | 1.824 | Documentos por causal, CIC/FCS, flujo digital, calendario de pago, topes 2026, rechazos y suspensión | completado editorialmente |
| `cae-renegociacion-condonacion-2026` | 676 | 1.742 | Diagnóstico por acreedor, rebaja, suspensión, Reprograma CAE, convenios TGR, prepago y FES no vigente | completado editorialmente |
| `revision-tecnica-chile-2026-calendario-patente` | 704 | 2.397 | Preferencia vs vigencia, nueva primera RT 36–48 meses, periodicidades, documentos, reinspección en 15 días y compra de usados | completado editorialmente |
| `cotizacion-empleador-3-5-agosto-2026-costo-pyme` | 757 | 2.076 | El 3,5% incluye SIS, salto real de 0,88 pp frente a julio, base topada, pago en septiembre y control de nómina | completado editorialmente |
| `sueldo-minimo-2026-calcular-liquido` | 810 | 1.869 | Retroactividad desde mayo, sueldo base vs gratificación, jornada parcial ≤30 h, rango líquido por AFP y reliquidación | completado editorialmente |
| `horas-extra-jornada-42-horas-chile-2026` | 1.059 | 1.696 | Fórmula DT sin 4,33, comparación 44→42, cierre semanal, base salarial, festivos y compensación en feriado | completado editorialmente |
| `seguro-cesantia-finiquito-2026-afc` | 1.071 | 2.549 | Imputación limitada del artículo 13, certificado AFC, causales, aporte trabajador protegido, despido injustificado y CIC/FCS | completado editorialmente |
| `embargos-cae-tgr-2026-cuentas-bienes-raices` | 1.401 | 2.332 | Retención vs embargo vs remate, protección de remuneraciones, tercerías, convenios vigentes, fallos 2026 y alzamiento no automático | completado editorialmente |
| `finiquito-2026-ejemplo-sueldo-minimo` | 1.295 | 1.822 | Base artículo 172, gratificación mensual sin duplicar, vacaciones con calendario, artículo 161, AFC y reserva de derechos | completado editorialmente |
| `finiquito-laboral-chile` | 1.338 | 2.313 | Finiquito no constitutivo, bases diferenciadas, feriado con calendario, obra/faena, recargos, plazos 60/90 y reserva electrónica | completado editorialmente |
| `uf-utm-indicadores-chile` | 718 | 1.855 | Período UF 10–9, fecha de conversión, UTA provisional vs anual, IPC junio, dólar acuerdo discontinuado y auditoría de fallback | completado editorialmente |
| `iva-boleta-honorarios-chile` | 796 | 1.653 | Crédito fiscal condicionado, exenciones acotadas, libros afectos, retención como PPM indivisible, emisor/receptor y renta 2027 | completado editorialmente |
| `afp-pension-chile` | 776 | 2.356 | PGU vigente y aumento escalonado, aporte patronal 3,5% con SIS incluido, BAC, compensación a mujeres, multifondos hasta abril de 2027 y modalidades de pensión | completado editorialmente |
| `familia-pension-alimenticia-chile` | 793 | 2.217 | Mínimos sobre IMM sin porcentajes ficticios de sueldo, mediación, liquidación, Registro de Deudores, pago efectivo, Asignación Familiar Ley 21.830 y beneficios vigentes | completado editorialmente |
| `vehiculos-chile-permiso-multas` | 839 | 1.721 | Tasación SII exacta, segunda cuota en agosto, beneficio eléctrico 25%, SOAP duplicado por Ley Jacinta, revisión técnica, multas y TAG sin tarifas universales | completado editorialmente |
| `credito-hipotecario-chile` | 846 | 1.572 | UF separada de tasa, tasación vs precio, capacidad sin regla bancaria ficticia, CAE comparable, seguros básicos/adicionales, gastos documentados y prepago Ley 18.010 | completado editorialmente |
| `comprar-vivienda-chile` | 1.127 | 1.698 | Dominio por inscripción, títulos y regularidad, promesa condicionada, DS1/DS19 2026, costos documentados, contribuciones vigentes y deuda de copropiedad | completado editorialmente |

Hallazgo de fuente del lote: la consulta de la DT para sueldo semanal, actualizada el 29 de abril de 2026, explica dividir por 42 y multiplicar por 1,5, pero publica como atajo `0,0340909`. Ese factor equivale a 44 horas y contradice su propio ejemplo. El artículo conserva el procedimiento reproducible, usa `0,0357143` para 42 horas y declara la inconsistencia en vez de presentar el atajo oficial como un hecho resuelto.

Validación acumulada:

- Las 34 piezas inicialmente breves ya superan 1.500 palabras; las 38 piezas del inventario cumplen el piso.
- Auditor editorial: aprobado para extensión, enlaces y frases genéricas en las treinta y cuatro piezas reescritas.
- `npm.cmd run typecheck`: aprobado el 13 de julio de 2026.
- Suite completa: 43 archivos y 355 pruebas aprobadas.
- Build de producción: aprobado; Next.js generó 113 páginas estáticas.
- Smoke HTTP local: `/`, un artículo, una guía y dos calculadoras respondieron 200.

## Coherencia YMYL corregida durante el cierre

La revisión editorial descubrió contradicciones en herramientas enlazadas y se trató como un gate, no como deuda posterior. El 13 de julio se corrigieron los siguientes bloques con pruebas específicas:

- Vacaciones: ahora pide fecha de término, incorpora la fracción de mes y proyecta sábados, domingos y feriados nacionales. Se retiró el tope ficticio de cinco días progresivos.
- Costo empleador: separa remuneraciones hasta julio de 2026 —1% de reforma más SIS vigente— de las devengadas desde agosto, cuando el 3,5% previsional total ya incluye financiamiento SIS. También aplica el tope de gratificación del artículo 50.
- Horas extra: usa `sueldo ÷ 30 × 28 ÷ (jornada × 4) × 1,5`, elimina el 100% general de domingos/festivos y muestra solo el límite legal de dos horas por día.
- PGU: unificó $231.732, $250.275 y los límites $789.139/$1.252.602; agregó edad y eliminó años cotizados y sexo de la interfaz porque no determinan el monto.
- Alimentos: reemplazó la “pensión sugerida” sobre el sueldo por el piso presunto calculado sobre el IMM y el límite general del artículo 7, con advertencia de evaluación judicial.
- Asignación Familiar y Bono Bodas de Oro: incorporó los montos vigentes de Ley 21.830 y ChileAtiende.
- Agua potable: reemplazó tramos nacionales inventados por el porcentaje asignado de 25% a 85%, tope general de 13 m³ y régimen de 100% sobre 15 m³ para Seguridades y Oportunidades.
- Permiso de circulación: confirmó que la escala progresiva SII sí existe para vehículos livianos y la implementó con UTM de enero de 2026, permiso mínimo y exención de 75% para códigos elegibles. Eliminó descuentos falsos por tipo o 20 años.
- Multas: muestra rangos legales, reclasifica celular, luz roja y conducir sin licencia como gravísimas y duplica/triplica reincidencias graves o gravísimas en sus ventanas legales.
- TAG: ya no asigna tarifas por ruta ni recargo universal; proyecta desde el precio que el usuario copia del tarifario de su concesión.
- Hipotecario: retiró de la interfaz seguros, gastos, capacidad bancaria, CAE y prepago construidos con porcentajes de mercado no verificables; el simulador queda limitado a amortización de capital e intereses.
- Indicadores: el fallback de IPC mensual se actualizó a 0,0% para junio de 2026, fuente INE.

Las pruebas dirigidas de estos bloques, la suite completa, el typecheck, el build y la matriz catálogo → adapter → módulo quedaron aprobados.

## Controles externos bloqueados por el entorno

El verificador `scripts/check-editorial-links.mjs` extrajo 216 URL externas únicas desde artículos, guías y fichas de calculadoras. La comprobación HTTP remota no pudo ejecutarse porque la red del sandbox rechazó las 216 solicitudes y el permiso para repetirla fuera del sandbox fue denegado por el límite de uso vigente. Esto no demuestra enlaces rotos: significa que su estado HTTP no quedó verificado.

La aplicación sí compiló y cinco rutas representativas respondieron 200 en el servidor local. La inspección visual automatizada en escritorio y móvil tampoco pudo completarse: `agent-browser` no está instalado, el runtime disponible no contiene Playwright completo y la ejecución headless del navegador fuera del sandbox fue denegada por el mismo límite. No se declara aprobada una revisión visual que no pudo observarse.

## Criterio de cierre

No se considera terminado por cantidad de palabras. El cierre exige:

- 38 piezas investigadas y registradas.
- 34 piezas inicialmente breves sobre el piso editorial; 38 de 38 piezas totales superan 1.500 palabras.
- Cero afirmaciones críticas sin fuente o marcadas como no verificadas.
- Cero contradicciones conocidas entre contenidos y calculadoras enlazadas.
- Enlaces externos comprobados cuando el entorno permita tráfico remoto.
- Typecheck, pruebas relevantes y build aprobados.
- Revisión visual de plantillas de blog y guía en escritorio y móvil cuando el entorno permita navegador headless.
