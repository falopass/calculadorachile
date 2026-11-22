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
| `frontend-calculachile` | Contexto de producto YMYL, AdSense y stack actual; no es una guía visual alternativa |
| `periodismo-editorial-chile` | Investigación, noticias y guías de 1.500+ palabras sin prosa IA genérica |

**AGENTS.md manda** sobre skills y docs auxiliares.

### Contrato de orquestación

- Root conserva arquitectura, integración y decisión final: máximo 2 hijos, profundidad uno, ownership disjunto y un writer por recurso mutable.
- Los builders implementan y los scouts aportan evidencia. Los writers trabajan en background con alcance de escritura y validaciones explícitas; los scopes compartidos van en secuencia.
- Quien implementa relee el cambio sin checks por defecto; la verificación independiente se reserva para riesgo alto o petición. Los guards de bloqueo local están desactivados por la decisión YOLO vigente.
- Proveedores, credenciales, routers y aliases son configuración personal, nunca del repo.

### Autoridad frontend

Root decide arquitectura técnica. `frontend-base` es la única entrada para páginas públicas, editoriales, calculadoras y herramientas de producto, siempre con YMYL, SEO, AdSense, accesibilidad y DNA. La UI actual no congela un rediseño autorizado.


## Documentación (mínima)

| Archivo | Uso |
|---------|-----|
| [`AGENTS.md`](../AGENTS.md) | Constitución del producto |
| [`contexto.md`](./contexto.md) | Producto + YMYL + operación con Codex |
| [`plan-editorial.md`](./plan-editorial.md) | Backlog de posts SEO/AdSense |
| [`research/`](./research/) | `dossier-ymyl.md` · `inventario-seo.md` · `deep-research.md` |
