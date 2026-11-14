# Agentes, skills y autoridad frontend

> Contrato de orquestación, catálogo de skills y reparto de autoridad visual. Se movió aquí desde [`AGENTS.md`](../AGENTS.md); [`AGENTS.md`](../AGENTS.md) manda sobre skills y docs auxiliares.
> El contrato vigente sigue en [`AGENTS.md`](../AGENTS.md); este documento conserva el detalle movido.

## Devin y Codex

Inicia la tarea con `CalculaChile` como carpeta de trabajo para descubrir este archivo y las skills del repo. La arquitectura de agentes es la global final; el proyecto no registra clones locales. No hay workflow de pymes: no uses `web-factory`, `pyme-template-intelligence` ni schema `LocalBusiness`.

| Pieza | Path |
|-------|------|
| Contexto + arranque | `docs/contexto.md` |
| Compatibilidad sin agentes locales | `.codex/config.toml` |
| Skills versionadas | `.agents/skills/` |
| Matriz fantasmas | `node scripts/audit-ymyl-matrix.mjs` |

### Skills

| Skill | Uso |
|-------|-----|
| `nueva-calculadora` | Alta / wiring end-to-end |
| `auditoria-ymyl` | Fantasmas, fórmulas, golden tests |
| `seo-adsense` | Metadata, noIndex, schema, AdSense seguro |
| `contenido-editorial-ymyl` | Posts/guías con research y fuentes oficiales |
| `ship-calculachile` | Cierre y validación proporcional al cambio |
| `frontend-calculachile` | UI/UX anti-slop adaptada a YMYL, AdSense y stack actual |
| `periodismo-editorial-chile` | Investigación, noticias y guías de 1.500+ palabras sin prosa IA genérica |

**AGENTS.md manda** sobre skills y docs auxiliares.

### Contrato de orquestación

- Root conserva arquitectura, integración y decisión final. Hereda los nueve perfiles globales y el governor: hasta cuatro agentes activos y tres hijos; no hay delegación anidada.
- `swe-worker` cubre trabajo acotado, `backend-builder` backend complejo y `frontend-builder` implementación visual; `scout`, `analyst` y `red-team` aportan evidencia. Los writers corren en background con `WRITE_SCOPE` y `VALIDATION_COMMANDS`; scopes compartidos van en secuencia y más de un writer requiere pregrant de escritura.
- Root o el writer implementan y releen el cambio sin checks por defecto; `mechanical-worker` no ejecuta. `verifier` independiente bajo `LOCAL_HEAVY_LOCK` se reserva para riesgo alto o petición. Los guards de bloqueo local están desactivados por la decisión YOLO vigente.
- Proveedores, credenciales, routers y aliases son configuración personal, nunca del repo. Grok/OpenCode pueden quedar como compatibilidad histórica, pero no gobiernan Devin.

### Autoridad frontend

Root decide arquitectura técnica. `design-taste-frontend` dirige páginas públicas/editoriales; `interface-design` dirige calculadoras y herramientas de producto. Ambas respetan YMYL, SEO, AdSense, accesibilidad y el DNA; se elige una por superficie. `frontend-builder` implementa y `frontend-director` se reserva para identidad o crítica visual difícil. La UI actual no congela un rediseño autorizado.


## Documentación (mínima)

| Archivo | Uso |
|---------|-----|
| [`AGENTS.md`](../AGENTS.md) | Constitución del producto |
| [`contexto.md`](./contexto.md) | Producto + YMYL + operación con Codex |
| [`plan-editorial.md`](./plan-editorial.md) | Backlog de posts SEO/AdSense |
| [`research/`](./research/) | `dossier-ymyl.md` · `inventario-seo.md` · `deep-research.md` |
