# Estándares editoriales y gate de calidad

## Fuentes profesionales consultadas

Consulta vigente realizada el 2026-07-13:

- [Reuters: Standards and Values](https://reutersagency.com/about/standards-values/): precisión y balance antes que velocidad; fuentes nombradas preferibles; contexto sobre posición y motivos; correcciones claras; toda afirmación sugerida por IA debe verificarse de forma independiente.
- [SPJ Code of Ethics](https://www.spj.org/spj-code-of-ethics/): verificar antes de publicar, usar fuentes originales, dar contexto, actualizar durante la vida de la noticia y reconocer errores de manera prominente.
- [BBC Editorial Guidelines: Accuracy](https://www.bbc.com/editorialguidelines/guidelines/accuracy): evidencia sólida, corroboración cuando sea posible, atribución de lo no corroborado y transparencia sobre lo desconocido.
- [IFCN Code of Principles](https://ifcncodeofprinciples.poynter.org/know-more/the-commitments-of-the-code-of-principles): fuentes replicables, metodología transparente, evidencia por sobre posición partidaria y política pública de correcciones.
- [Google: contenido útil y centrado en personas](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): información original, cobertura sustantiva y valor adicional; evitar automatización extensa, resúmenes sin aporte y contenido escrito solo para buscadores o una cifra de palabras.
- [Google: uso de IA generativa](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content): la IA puede apoyar investigación y estructura, pero producir páginas a escala sin valor puede infringir políticas; precisión, calidad, relevancia y contexto de creación siguen siendo responsabilidad del editor.

Estas fuentes orientan el método; no reemplazan las fuentes temáticas de cada artículo.

## Jerarquía de evidencia

1. **Primaria oficial:** ley, fallo, resolución, comunicado, base de datos, metodología, documento o declaración original.
2. **Primaria directa:** entrevista real, registro, presentación, paper o documento de la entidad/persona involucrada.
3. **Secundaria experta:** medio reconocido, universidad, organismo técnico o especialista identificable que interpreta evidencia primaria.
4. **Contextual:** reportes sectoriales, prensa general o documentación comercial con interés declarado.
5. **Pista, no prueba:** redes sociales, foros, agregadores, snippets, contenido SEO y respuestas de IA.

No permitas que una fuente de nivel 5 sostenga una afirmación material. Una fuente interesada puede documentar lo que esa parte afirma, no demostrar por sí sola que sea cierto.

## Bitácora mínima de afirmaciones

Mantén durante el trabajo una tabla como esta:

| ID | Afirmación | Estado | Fuente exacta | Tipo | Fecha del hecho | Fecha fuente | Soporte / límite |
|---|---|---|---|---|---|---|---|
| C01 | … | VERIFICADA | URL/documento | primaria | YYYY-MM-DD | YYYY-MM-DD | página, tabla o sección |

Estados permitidos:

- **VERIFICADA:** la fuente respalda exactamente la redacción.
- **INFERIDA:** conclusión razonable explicada como análisis.
- **DISPUTADA:** existe evidencia material en conflicto.
- **NO VERIFICADA:** no publicar como hecho.

## Gate para cifras

Antes de publicar una cifra, responde:

- ¿Qué mide exactamente?
- ¿Cuál es la unidad, moneda y valor nominal/real?
- ¿Qué periodo y territorio cubre?
- ¿Cuál es el universo, muestra o denominador?
- ¿La fuente informa metodología, revisión o margen de error?
- ¿La comparación usa la misma base?
- ¿La cifra sigue vigente en la fecha de corte?

Evita porcentajes sin base, promedios que esconden distribución, correlación presentada como causalidad y montos sin fecha.

## Protocolo de actualidad

- Registra fecha del evento y fecha de publicación por separado.
- Prioriza la versión más reciente del documento original.
- Para una noticia en desarrollo, busca confirmación inmediatamente antes de publicar.
- No uses presente para reglas anunciadas pero aún no vigentes.
- No conviertas una propuesta, proyecto de ley, demanda o declaración en un hecho consumado.
- Conserva una nota de actualización cuando un cambio material altere alcance, monto, vigencia o conclusión.

## Gate anti-prosa-IA

Eliminar o reescribir:

- “En un mundo cada vez más…”, “En la era digital…”, “En la actualidad…”.
- “Es importante destacar/señalar/mencionar…”, “Cabe destacar…”.
- “A lo largo de este artículo exploraremos…”.
- “Todo lo que necesitas saber”, salvo que la cobertura sea realmente exhaustiva.
- “Sin duda”, “Resulta fundamental”, “Juega un papel crucial”, “Marca un antes y un después”.
- “No solo… sino también…” repetido como muletilla.
- “En conclusión” seguido de un resumen genérico.
- Preguntas retóricas que no representan una duda real del lector.
- Adjetivos sin evidencia: revolucionario, innovador, robusto, transformador, alarmante.
- Autoridad difusa: expertos, estudios, fuentes cercanas, se estima, muchos creen.
- Párrafos simétricos con la misma longitud y cadencia en toda la pieza.
- Un H2 por keyword, aunque no exista una diferencia editorial real.
- Listas de tres elementos creadas solo para producir ritmo.
- Repetir la misma tesis en lede, introducción, cada cierre de sección y conclusión.

Prueba de especificidad: sustituye el tema y la marca por otros. Si el párrafo sigue funcionando, probablemente es genérico.

## Gate final de publicación

- [ ] 1.500+ palabras sustantivas sin relleno.
- [ ] Lede concreto y enfoque antes de 250 palabras.
- [ ] Cada afirmación sensible existe en la bitácora.
- [ ] Fuentes primarias abiertas y enlazadas.
- [ ] Cifras revisadas con periodo, universo y metodología.
- [ ] Hechos, inferencias y disputas claramente separados.
- [ ] Citas exactas y breves; sin citas fabricadas.
- [ ] Cada H2 agrega evidencia o responde otra pregunta.
- [ ] Sin muletillas ni patrones anti-IA.
- [ ] Title, description y FAQ no exageran lo demostrado.
- [ ] Fechas de publicación, corte y actualización coherentes.
- [ ] Correcciones o cambios materiales visibles.
- [ ] Validación técnica y render según el repo.
