# Grok Build — CalculaChile (configuración canónica)

Único harness de desarrollo de este producto: **Grok Build en terminal**, modelo **Grok 4.5 / `grok-build`**.

No hay workflow de pymes en este repo ni en la config de usuario recomendada.

---

## Arranque (cada sesión)

```powershell
cd C:\code\SaaS2\CalculaChile
grok
```

Primera vez en el repo:

```text
/hooks-trust
```

Comprobar:

```text
/skills          → nueva-calculadora, auditoria-ymyl, seo-adsense
/                → ymyl-audit, p0-wiring, ship-check, nueva-calc, seo-fix
```

Modelo de la sesión: **grok-build**.

---

## Qué se carga solo

| Capa | Path |
|------|------|
| Constitución | `AGENTS.md` |
| Contexto vivo | `docs/PRODUCT_CONTEXT.md` |
| Reglas cortas | `.grok/rules/*.md` |
| Skills | `.grok/skills/*` |
| Slash | `.grok/commands/*` |
| Hook sesión | `.grok/hooks/session-start.json` |
| Manual | este archivo |
| Auditoría código | `docs/auditoria-ymyl-2026-07.md` |
| Research | `docs/research/` |

Config de usuario (`~/.grok/config.toml`):

- `models.default = "grok-build"`
- `memory.enabled = true`
- skills pyme **disabled** (`web-factory`, `pyme-template-intelligence`)

---

## Slash commands

| Comando | Uso |
|---------|-----|
| `/ymyl-audit` | Inputs fantasma, fórmulas, tests |
| `/p0-wiring` | Cerrar P0 (sueldo → subsidio → boleta) |
| `/ship-check` | Gate typecheck/test/build/matriz |
| `/nueva-calc` | Nueva calculadora end-to-end |
| `/seo-fix` | SEO/AdSense sin romper indexación |

Skills bundled de Grok (`design`, `review`, `execute-plan`, …): OK para proceso/PRs; **no** reemplazan las YMYL del repo en fórmulas.

---

## Flujo de la semana (máximo Grok 4.5)

```text
1. Research → docs/research/ (dossier YMYL + inventario SEO)
2. /ymyl-audit o leer PRODUCT_CONTEXT + auditoría
3. Plan mode si hay duda de ley/unidades
4. /p0-wiring (multi-file + tests)
5. /ship-check
6. /review + git
7. Memory retiene la decisión
```

### Prompts listos

```text
Lee AGENTS.md y docs/PRODUCT_CONTEXT.md. Resume P0 en 5 viñetas y espera.
```

```text
/p0-wiring
```

```text
/ymyl-audit sueldo-liquido
Cruza con docs/research si existe. No implementes aún; backlog con severidad.
```

```text
/ship-check
```

---

## Validación

```bash
npm run typecheck
npm run test:run -- src/lib/calculations/__tests__/<mod>.test.ts
node scripts/audit-ymyl-matrix.mjs
npm run build   # si tocaste catálogo/rutas/SEO
```

---

## Panel xAI → este repo

| Tile | Uso aquí |
|------|----------|
| Plan mode | P0 ambiguo, fórmulas, unidades UF/CLP |
| Skills | `.grok/skills` + slash |
| Subagents | explore / review en paralelo |
| AGENTS.md | Ley del producto |
| Memory | P0 y decisiones YMYL entre días |
| Code search | adapters, constants, catálogo |
| Multi-file | catálogo + Client + tests |
| Terminal | typecheck / vitest / matriz |
| Web search | contraste fuente oficial |
| Git + review | branches `fix/ymyl-*` |
| Hooks | banner de sesión |
| Deep reasoning | finiquito 168, boleta retención, subsidio |

---

## Prohibido

- web-factory, pyme-template-intelligence, LocalBusiness
- Cambiar slugs / AdSense / 410 sin OK
- Inventar tasas
- Inputs fantasma a sabiendas
