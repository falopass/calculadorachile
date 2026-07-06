---
description: Aplica criterio SEO chileno YMYL para CalculaChile
agent: seo-site
---

# SEO chileno YMYL — Guía operativa

Aplicar cuando el trabajo toque contenido, metadata, schema o estrategia
editorial de CalculaChile. Esta skill NO reemplaza la auditoría técnica
(`seo-web`); la complementa con criterio de vertical chileno YMYL.

Distingue explícitamente entre:
- **Sé**: está en el contexto entregado.
- **Infiero**: es probable por patrón, pero no verificado.
- **Supongo**: requiere confirmación antes de avanzar.

## Contexto del vertical

CalculaChile opera en YMYL (Your Money Your Life) financiero chileno.
Google aplica estándares reforzados de E-E-A-T (Experience, Expertise,
Authoritativeness, Trustworthiness) en este vertical.

No es SEO local: no hay ubicación física ni zona de atención. Es SEO
nacional temático con:
- 39 calculadoras herramienta.
- 27 páginas de contenido (12 guías + 15 blogs).
- Adquisición 100% orgánica, monetización 100% AdSense.

## Fuentes oficiales canónicas

Toda cifra, tasa, tramo, tope o valor legal DEBE citarse con URL a una
de estas fuentes. Nunca fuentes secundarias (blogs, medios generalistas,
foros) para datos financieros o legales.

| Fuente | Uso principal |
|---|---|
| SII — https://www.sii.cl/valores_y_fechas/index_valores_y_fechas.html | UF, UTM, UTA, impuestos, retención honorarios, tramos IUSC |
| Banco Central — https://www.bcentral.cl/inicio | UF, TPM, IPC, series estadísticas |
| INE — https://www.ine.gob.cl | IPC, empleo, precios |
| Dirección del Trabajo — https://www.dt.gob.cl | Sueldo mínimo, gratificación, Código del Trabajo, jornada |
| Superintendencia de Pensiones — https://www.spensiones.cl | Comisiones AFP, SIS, sistema previsional, PGU |
| CMF — https://www.cmfchile.cl | TMC, mercado financiero, educación financiera |
| BCN Ley Chile — https://www.bcn.cl/leychile/ | Leyes vigentes con número y artículo |
| ChileAtiende — https://www.chileatiende.gob.cl | Beneficios, PGU, CAE, subsidios |
| MINVU — https://www.minvu.gob.cl/beneficios/ | Subsidios habitacionales DS49/DS1/DS19 |
| SERNAC — https://www.sernac.cl | Consumo financiero, derechos |
| AFC Chile — https://www.afc.cl | Seguro de cesantía |
| Tesorería (TGR) — https://www.tgr.cl | Permiso de circulación, pagos fiscales |

## Marco E-E-A-T — señales obligatorias visibles

Cada calculadora y guía debe mostrar en el DOM visible al usuario
(no solo en `<meta>` ni en JSON-LD):

1. **Fecha de última actualización**: "Actualizado: [mes] de [año]".
   Ubicación: cerca del H1 o debajo del breadcrumb. Formato coherente
   en todo el sitio.
2. **Fuente oficial**: nombre + link directo a la fuente primaria de
   los valores usados. Ejemplo: "Fuente: Servicio de Impuestos Internos".
3. **Autor/revisor** con credenciales cuando sea guía extensa (>1500
   palabras). En calculadoras basta con "Equipo CalculaChile" enlazado
   a `/acerca-de`.
4. **Disclaimer legal**: "Los valores son referenciales; consulta con
   un profesional para decisiones formales."
5. **Cita legal precisa**: número de ley + artículo cuando aplique
   (ej. "Art. 47 Código del Trabajo", "Ley 21.735 Art. 3").

Sin estas señales, Google castiga posicionamiento YMYL aunque el schema
esté perfecto.

## Regla de intención: transaccional gana en SERP

En este vertical, la calculadora (herramienta) supera al blog (lectura)
para queries transaccionales. Si hay competencia interna:

- **Query transaccional** ("calcular sueldo líquido", "cuánto pago de
  patente") → debe rankear la calculadora.
- **Query informativa** ("cómo se calcula el sueldo líquido",
  "diferencia bruto vs líquido") → debe rankear la guía/blog.

Nunca dos páginas del sitio compiten por la misma keyword principal.
Si sucede, ajustar H1 y meta title del blog hacia intención informativa
o consolidar en la calculadora con sección "Aprende más" al final.

## Cambios legislativos vigentes 2026 con potencial SEO

Ejes con poca cobertura editorial en la web chilena. Verificar estado
real en BCN Ley Chile antes de publicar contenido, porque un proyecto
aprobado por una cámara NO es ley vigente hasta promulgación.

| Ley | Tema | Vigencia | Verificar en |
|---|---|---|---|
| Ley 21.735 | Reforma previsional: aporte empleador escalonado, SSP, PGU aumentada | Publicada 26-03-2025; fases operativas en 2026 | BCN + ChileAtiende |
| Ley 21.719 | Protección de datos personales | Entra 01-12-2026 | BCN |
| Ley 21.713 | Cumplimiento tributario / modernización SII | Vigente por fases desde 01-11-2024 | SII + BCN |
| Ley 21.578 | Retención honorarios (15,25% en 2026, escala a 17% en 2028) | Vigente escalonada | SII |
| Ley 21.630 | Ingreso mínimo $539.000 | Desde 01-01-2026 | DT |
| Ley 21.561 | "40 horas" (42h vigentes hasta abril 2028) | Vigente escalonada | BCN |
| Ley 20.255 | SIS pagado por empleador desde 2009 | Vigente | Superintendencia |

Si Diego reporta un cambio legislativo que no está en esta tabla,
verificar estado antes de tratarlo como ley vigente.

## Anti-patrones YMYL que Google penaliza

- Presentar simulaciones como cifras oficiales sin disclaimer.
- Prometer aprobación de créditos, subsidios o beneficios.
- Recomendar cambio de AFP solo por rentabilidad pasada o comisión.
- Presentar CAE y FES como equivalentes: FES es proyecto de ley al 2026.
- Publicar guía sin autor identificable en YMYL financiero.
- Reproducir texto de fuentes oficiales sin cita y sin link.
- Usar tono comercial/promocional en calculadoras: son herramientas,
  no productos que se venden.
- Meta description con clickbait o exageraciones ("¡El truco que...!").
- Fecha de "actualizado" que no coincide con `modifiedTime` en metadata:
  Google lo detecta y devalúa.
- FAQPage schema con preguntas que NO están visibles en el HTML
  renderizado: acción manual asegurada.

## Formato de valores chilenos

- Pesos: `$1.000.000` (punto de miles, sin decimales).
- UF/UTM: `12,34 UF` (coma decimal, 2 decimales).
- Porcentajes: `12,3%` (coma decimal).
- Fecha: `dd-mm-yyyy` o `dd de mes de yyyy` (nunca formato US).
- RUT: `12.345.678-9` (puntos y guión).

Usar siempre `src/lib/formatters.ts` del proyecto (`formatCLP`,
`formatUF`, `formatUTM`, `formatPercentage`). No formateo manual con
`toLocaleString` suelto.

## Rewrite de metadata — reglas prácticas

Al proponer meta title y meta description para una URL:

**Meta title (50-60 caracteres)**:
- Verbo de acción al inicio: Calcula / Simula / Compara / Descubre.
- Query principal presente.
- Año actual si aporta relevancia: `2026`.
- Diferenciador si cabe: `gratis`, `sin registro`, `oficial`.
- No terminar con `| CalculaChile`: el template global ya lo añade.

Ejemplo:
- Actual: "Calculadora de sueldo líquido"
- Propuesto: "Calcula tu Sueldo Líquido 2026 con AFP y FONASA"

**Meta description (140-155 caracteres)**:
- Beneficio concreto en la primera frase.
- Números o dato específico ("desde $539.000", "15,25% retención").
- Call-to-action implícito o explícito.
- Terminar en punto, sin cortar palabras.

Ejemplo:
- Actual: "Calcula tu sueldo líquido según AFP y sistema de salud."
- Propuesto: "Calcula tu sueldo líquido 2026 con AFP, FONASA/Isapre y
  seguro de cesantía. Valores oficiales del SII actualizados a julio."

## Palancas SEO ordenadas por retorno (para CalculaChile)

Orden real de impacto según el estado del sitio (posición 10-20,
autoridad baja, cobertura alta):

1. **Upgrade de páginas top 10** (mayor retorno inmediato).
   - Metadata rewrite en `src/data/seo-overrides.ts`.
   - Bloque "Actualizado + Fuente oficial" visible.
   - Ejemplos numéricos concretos en el cuerpo.
2. **Corrección de canibalizaciones detectadas** (ver skill `seo-web`).
3. **Refuerzo E-E-A-T visible**: fecha, fuente, autor, disclaimer,
   metodología. Aplica a las 39 calculadoras y 27 páginas.
4. **Guías pillar profundas** para las 3-5 queries con impresiones
   altas y 0 clicks. Solo después de agotar las palancas 1-3.
5. **Backlinks orgánicos**: widget embebible UF/UTM, participación
   contextual en comunidades chilenas (Reddit, foros contadores,
   LinkedIn Chile).
6. **Contenido nuevo**: última prioridad. Máximo 2-3 páginas nuevas
   por trimestre, y solo si atacan queries con volumen medido en
   Search Console.

No proponer palanca 4-6 antes de completar 1-3.

## Restricciones específicas del proyecto

- Usar patrón del proyecto para calculadoras:
  - Metadata en `src/data/calculators.ts`.
  - Lógica pura en `src/lib/calculations/[id].ts`.
  - Conexión en `CalculatorPageClient.tsx`.
  - Tests en `src/lib/calculations/__tests__/`.
- SEO overrides van en `src/data/seo-overrides.ts` (no editar el
  catálogo para cambios cosméticos de meta).
- No hardcodear UF, UTM, dólar, IPC, tasas o topes: usar
  `src/lib/values/constants.ts` o valores desde `/api/values`.
- No romper canonical, sitemap, robots, JSON-LD ni rutas indexadas.
- TypeScript estricto: sin `any`; usar `unknown` + narrowing explícito.

## Validación para cambios que aplican esta skill

Según qué se modifique:
- **Metadata rewrite**: `npm run build` + inspeccionar `<meta>` en HTML
  output + Rich Results Test de Google para páginas con schema.
- **Componentes E-E-A-T** (bloque actualizado, autor, fuente):
  `npm run typecheck` + revisión visual desktop y mobile 390px.
- **Guía nueva o rewrite**: `npm run build` + verificar aparición en
  `/sitemap-guias.xml` o `/sitemap-blog.xml`.
- **Cambio en constants.ts**: `npm run test:run -- [modulo afectado]`
  para verificar que los tests siguen pasando con el valor nuevo.

Medición SEO: Search Console cada 2-4 semanas después del deploy.
Los cambios en YMYL tardan más que en otros verticals.

## Estilo de respuesta

- Español neutro, sin voseo.
- Directo, sin ceremonia.
- No estimar tiempos.
- No inventar datos.
- Formato "Diagnóstico / Cambio sugerido / Por qué / Validación /
  Riesgo o nota" cuando aplique.
- Si algo está fuera de scope pero es importante, mencionar en una línea.

## Contexto adicional del prompt

$ARGUMENTS
