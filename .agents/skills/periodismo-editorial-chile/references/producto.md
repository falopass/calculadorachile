# Aplicación en CalculaChile

## Antes de escribir

1. Lee `AGENTS.md`, `docs/contexto.md` y `docs/plan-editorial.md`.
2. Abre solo el research pertinente en `docs/research/`.
3. Confirma si corresponde a `blog` (`src/data/articles.ts`) o `guía` (`src/data/guias.ts`). No cambies el tipo o slug definido sin plan SEO.

## Fuentes temáticas

Prioriza Banco Central, SII, Dirección del Trabajo, Superintendencia de Pensiones, CMF, IPS/ChileAtiende, MINVU, SUSESO, TGR, INE y BCN/Ley Chile. Prensa reputada sirve para contexto y cronología, no para sustituir una norma o cifra oficial disponible.

Toda fórmula, tasa, tope, beneficio, plazo o requisito es YMYL:

- Verifica vigencia y fecha efectiva.
- Distingue norma vigente, anuncio, proyecto y controversia judicial.
- No cambies módulos de cálculo durante una tarea editorial salvo petición explícita y fuente oficial suficiente.
- Si el texto y la calculadora difieren, detén publicación y reporta el conflicto.

## Formato del repo

- Blog: conserva el contrato de `Article` y HTML/componentes ya usados en `src/data/articles.ts`.
- Guías: conserva `Guia`, `GuiaSection`, sources, related calculators/articles y bloques existentes en `src/data/guias.ts`.
- Usa callouts legales, tablas, cronologías y ejemplos numéricos solo cuando aporten comprensión.
- Enlaza calculadora y guía/post relacionado sin forzar CTA en cada sección.
- Mantén autoría, disclaimer, fuentes, fecha de revisión, metadata y JSON-LD alineados al contenido visible.
- Para noticias, incluye fecha de corte y nota de actualización material dentro del contenido.

## Gate CalculaChile

- Recuento mínimo de 1.500 palabras sustantivas; guías preferentemente 2.000–3.500.
- `npm run typecheck`.
- `npm run build` al modificar catálogo editorial, rutas, metadata o schema.
- Tests SEO relevantes si cambian helpers.
- Revisión manual del slug renderizado, enlaces, tablas, callouts, canonical y fuentes.
