---
name: periodismo-editorial-chile
description: Investigar, verificar, escribir, editar o actualizar noticias, análisis, artículos y guías extensas para los blogs de CalculaChile o CVListo con estándar periodístico profesional, fuentes trazables y mínimo 1.500 palabras sustantivas. Usar cuando el usuario pida investigación profunda, actualidad, cobertura noticiosa, reportaje explicativo, guía SEO larga, artículo evergreen, actualización editorial, fact-checking o prosa que no parezca generada por IA.
---

# Periodismo editorial Chile

Lee `AGENTS.md`, `docs/contexto.md` y [references/producto.md](references/producto.md). Para investigar, verificar o editar, aplica [references/estandares-editoriales.md](references/estandares-editoriales.md).

Esta skill no convierte un resumen automático en periodismo. Exige reporting documental, trazabilidad de afirmaciones y edición humana simulada en varias pasadas.

## Contrato de extensión

- Publica un mínimo de **1.500 palabras sustantivas** en el cuerpo.
- Excluye del conteo frontmatter, navegación, schema, bibliografía, fuentes, CTA repetidos y boilerplate legal.
- Orientación: noticia explicativa 1.500–2.200; análisis 1.800–2.800; guía 2.000–3.500; pillar 2.500–4.000.
- No rellenes para alcanzar una cifra. Si el reporting no sostiene 1.500 palabras, amplía fuentes, cronología, mecanismo, consecuencias, ejemplos y límites; si aun así no alcanza, detén la publicación y explica el gap.

## 1. Definir el encargo

Antes de buscar o redactar, fija:

1. Tipo: noticia, análisis explicativo, guía evergreen, actualización o fact-check.
2. Pregunta central del lector y acción que debería poder tomar después.
3. Audiencia, alcance geográfico, periodo y fecha de corte en horario de Chile.
4. Tesis provisional de una frase; debe poder cambiar si la evidencia la contradice.
5. Riesgos: YMYL, empleo, reputación, cifras, normativa, empresa nombrada, precio o actualidad.

No elijas el ángulo por volumen de búsqueda solamente. Debe existir utilidad real para la audiencia del producto.

## 2. Construir el expediente de fuentes

1. Lista las afirmaciones que el artículo necesitará demostrar.
2. Busca primero documentos primarios: ley, resolución, comunicado, base estadística, metodología, organismo o documento original.
3. Agrega fuentes secundarias solo para contexto, contraste o interpretación.
4. Registra cada evidencia en la bitácora definida en `estandares-editoriales.md`.
5. Separa fecha del hecho, fecha de publicación y fecha de consulta.
6. Para afirmaciones controvertidas o de alto impacto, exige corroboración independiente o explica por qué una fuente primaria única es suficiente.
7. Contacto, testimonio o experto solo puede aparecer si existe realmente en el material entregado o publicado. Nunca inventes entrevistas, citas, escenas ni personas compuestas.

Usa internet para toda noticia, normativa vigente, cifra temporal o recomendación actual. No cites el modelo ni un snippet de buscador como fuente.

## 3. Verificar antes de redactar

- Marca cada afirmación de trabajo como **VERIFICADA**, **INFERIDA**, **DISPUTADA** o **NO VERIFICADA**.
- Publica como hecho solo lo verificado.
- Atribuye inferencias y explica el razonamiento sin disfrazarlas de certeza.
- Presenta desacuerdos materiales con evidencia y contexto; no fabriques una falsa equivalencia.
- Revisa números con unidad, periodo, universo, denominador, metodología y comparación correcta.
- Abre la fuente original y confirma que realmente respalda la frase prevista.
- Usa citas textuales breves, exactas y necesarias; para el resto, parafrasea con enlace y atribución.
- Si una fuente no responde, dilo solo cuando ese intento sea relevante para comprender el caso.

## 4. Diseñar la arquitectura

### Apertura

- Escribe un lede de 40–100 palabras con el hecho, tensión o respuesta concreta. No abras con una definición de diccionario ni “En un mundo cada vez más…”.
- Incluye antes de las primeras 250 palabras un párrafo de enfoque: qué investigó la pieza, por qué importa, fecha de corte y qué límites tiene.

### Desarrollo

Ordena secciones por necesidad editorial, no por una plantilla fija. Combina cuando corresponda:

- Qué pasó o qué problema resuelve.
- Cronología verificable.
- Cómo funciona el mecanismo.
- Cifras con contexto y metodología.
- Consecuencias prácticas para personas en Chile.
- Casos o ejemplos claramente reales o etiquetados como hipotéticos.
- Límites, excepciones y evidencia que complica la tesis.
- Qué hacer ahora y qué vigilar después.

Cada H2 debe aportar evidencia o responder una pregunta distinta. Evita que todas las secciones repitan “explicación + tres bullets + mini resumen”.

### Cierre

Cierra con una conclusión específica: decisión, siguiente paso o incógnita abierta. No repitas el artículo ni uses “En conclusión, este tema seguirá evolucionando”. FAQ solo con preguntas reales que el cuerpo todavía no resuelva.

## 5. Escribir sin voz genérica de IA

- Usa sustantivos concretos, verbos activos, instituciones nombradas, fechas y cifras atribuidas.
- Escribe español claro para Chile sin caricatura local ni jerga innecesaria.
- Varía ritmo y longitud: párrafos breves para hechos duros; párrafos más largos para mecanismo o contexto.
- Conserva una idea principal por párrafo. Usa listas únicamente cuando la información sea realmente enumerable.
- Explica siglas la primera vez. Traduce jerga legal, financiera, tecnológica o laboral sin deformarla.
- No uses autoridad nebulosa: quedan prohibidos “expertos señalan”, “diversos estudios”, “se sabe que” o “según fuentes” sin identificación y enlace.
- No uses anécdotas decorativas, testimonios ficticios, cifras redondas inventadas ni ejemplos presentados como casos reales.
- Elimina las muletillas y patrones del gate anti-IA en `estandares-editoriales.md`.
- No introduzcas keywords a costa de sintaxis natural. Una frase debe existir por información, no por SEO.

## 6. Editar en cuatro pasadas

1. **Edición estructural:** comprueba ángulo, orden, vacíos, repeticiones y secciones sin valor.
2. **Fact-check:** coteja cada nombre, fecha, monto, porcentaje, URL, cita y atribución contra la bitácora.
3. **Edición de línea:** corta abstracciones, redundancias, transiciones mecánicas y lenguaje promocional.
4. **Copy edit:** revisa ortografía, puntuación, consistencia terminológica, enlaces, metadata y componentes.

Después, ejecuta el gate anti-IA y lee apertura, transiciones y cierre en voz alta mentalmente. Si cualquier párrafo podría pertenecer a cualquier marca, reescríbelo con hechos y contexto del tema.

## 7. Transparencia, actualización y correcciones

- Incluye fecha de publicación y fecha de actualización real.
- En noticias, declara la fecha de corte y diferencia claramente lo confirmado de lo pendiente.
- Si cambia un hecho central, actualiza cuerpo, metadata y FAQ; agrega nota visible de actualización cuando altere la comprensión.
- Corrige errores de forma rápida, clara y proporcional. No reemplaces silenciosamente una cifra, causal o conclusión material.
- Conserva enlaces a documentos originales para que el lector pueda verificar.

## 8. Implementar y entregar

Sigue rutas, componentes, SEO y validación de `references/producto.md`. No inventes un CMS, una ruta de guías o un schema nuevo.

Entrega siempre:

1. Ángulo, tipo de pieza y fecha de corte.
2. Recuento de palabras sustantivas.
3. Fuentes primarias y secundarias utilizadas.
4. Afirmaciones disputadas, inferidas o descartadas.
5. Archivos modificados, enlaces internos y resultado real de validación.
