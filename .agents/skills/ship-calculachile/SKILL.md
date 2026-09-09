---
name: ship-calculachile
description: "Preparar el cierre y la solicitud proporcional de verificación de CalculaChile: inspeccionar diff, elegir gates y reportar alcance/riesgos sin ejecutar proyecto desde el writer."
---

# Ship check — CalculaChile

Lee `AGENTS.md`. Esta skill valida el estado local; no hace commit, push, PR ni deploy salvo petición explícita.

## Procedimiento

1. Revisa `git status --short` y el diff del repo. Separa cambios del usuario de los de la tarea.
2. Clasifica el cambio y agrega la verificación mínima de `AGENTS.md` a `VERIFICATION_REQUESTED`:

| Alcance | Validación |
|---|---|
| Fórmula | test específico + `npm run typecheck` |
| Wiring o calculadora | test específico + matriz YMYL + typecheck + build |
| Catálogo, rutas o SEO | typecheck + build; tests SEO si aplican |
| API o valores | typecheck + test/endpoint equivalente |
| UI | typecheck + revisión responsive básica |
| Documentación | lectura completa + búsqueda de referencias obsoletas |

3. Solicita `npm run format:check` cuando se modificó código formateable. Solicita `npm run test:run` completo solo si el cambio es transversal o no hay un test más preciso.
4. Si falla un check por el cambio actual, corrígelo y repite. No tapes fallos con exclusiones, snapshots laxos o casts innecesarios.
5. Si el fallo es previo o ajeno, no modifiques código fuera de alcance: registra comando, mensaje y evidencia de que no lo causó el diff.
6. Revisa que no se hayan agregado secretos, `.env`, dumps, tokens, slugs involuntarios, `LocalBusiness`, dark mode o dependencias no aprobadas.
7. El writer reporta `VERIFICATION_PERFORMED: NONE` y libera el lock. Solo `verifier` resume resultados ejecutados; nunca digas “debería pasar”.

## Matriz YMYL

Usa `node scripts/audit-ymyl-matrix.mjs` tras altas o cambios de catálogo/adapter. El `id` afectado debe quedar sin inputs fantasma, salvo campos cosméticos explícitamente documentados.

## Entrega

Incluye alcance revisado, checks con estado, fallos corregidos, riesgos pendientes y cualquier validación manual que aún corresponda.
