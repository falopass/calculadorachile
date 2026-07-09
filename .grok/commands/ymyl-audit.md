---
description: Auditoría YMYL de calculadoras (inputs fantasma, fórmulas, tests). Preferir top tráfico o el id que indique el usuario.
---

Ejecuta la skill **auditoria-ymyl** (`.grok/skills/auditoria-ymyl/SKILL.md`).

Contexto fijo de este repo:
- Lee `AGENTS.md` y `docs/auditoria-ymyl-2026-07.md` si existe.
- Corre `node scripts/audit-ymyl-matrix.mjs` y usa la salida.
- Harness: **Grok Build en terminal** (no OpenCode, no web-factory/pyme).
- No cambies fórmulas sin fuente oficial. No toques slugs ni AdSense.
- Si el usuario nombró una calculadora, audita esa con profundidad; si no, top: sueldo-liquido, finiquito, boleta-honorarios, credito-hipotecario, horas-extra, subsidio-habitacional.
- Entrega el informe en el formato de la skill + backlog P0/P1/P2.
