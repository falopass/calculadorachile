---
name: ship-calculachile
description: "Cerrar y validar cambios de CalculaChile antes de entregarlos: inspeccionar diff, elegir typecheck, tests, matriz YMYL, formato y build según el alcance, corregir fallos relacionados y reportar evidencia real. Usar cuando el usuario pida validar, revisar antes de entregar, ship check, comprobar que está listo, ejecutar checks o preparar un cambio para commit/PR."
---

# Ship check — CalculaChile

Lee `AGENTS.md`. Esta skill valida el estado local; no hace commit, push, PR ni deploy salvo petición explícita.

## Procedimiento

1. Revisa `git status --short` y el diff del repo. Separa cambios del usuario de los de la tarea.
2. Clasifica el cambio y ejecuta la validación mínima de `AGENTS.md`:

| Alcance | Validación |
|---|---|
| Fórmula | test específico + `npm run typecheck` |
| Wiring o calculadora | test específico + matriz YMYL + typecheck + build |
| Catálogo, rutas o SEO | typecheck + build; tests SEO si aplican |
| API o valores | typecheck + test/endpoint equivalente |
| UI | typecheck + revisión responsive básica |
| Documentación | lectura completa + búsqueda de referencias obsoletas |

3. Añade `npm run format:check` cuando se modificó código formateable. Ejecuta `npm run test:run` completo si el cambio es transversal o no hay un test más preciso.
4. Si falla un check por el cambio actual, corrígelo y repite. No tapes fallos con exclusiones, snapshots laxos o casts innecesarios.
5. Si el fallo es previo o ajeno, no modifiques código fuera de alcance: registra comando, mensaje y evidencia de que no lo causó el diff.
6. Revisa que no se hayan agregado secretos, `.env`, dumps, tokens, slugs involuntarios, `LocalBusiness`, dark mode o dependencias no aprobadas.
7. Resume únicamente resultados ejecutados. No digas “debería pasar”.

## Matriz YMYL

Usa `node scripts/audit-ymyl-matrix.mjs` tras altas o cambios de catálogo/adapter. El `id` afectado debe quedar sin inputs fantasma, salvo campos cosméticos explícitamente documentados.

## Entrega

Incluye alcance revisado, checks con estado, fallos corregidos, riesgos pendientes y cualquier validación manual que aún corresponda.
