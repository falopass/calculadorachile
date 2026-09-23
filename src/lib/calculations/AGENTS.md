# Instrucciones — cálculos YMYL

- Toda fórmula o constante legal requiere una fuente oficial verificable. Si falta, detén el cambio de fórmula y reporta el bloqueo.
- Mantén las funciones puras: sin React, DOM ni fetch. Inyecta valores dinámicos cuando corresponda.
- Alinea catálogo → adapter → módulo. Un input visible que no afecte el resultado es un bug YMYL.
- Explicita el redondeo y agrega tests golden más casos de borde o topes.
- Para lógica de cálculo, ejecuta el test específico; si cambia el wiring, elige `npm run typecheck` o `node scripts/audit-ymyl-matrix.mjs` según el riesgo. Root o el implementador puede ejecutar y corregir directamente; `verifier` independiente es opcional.
