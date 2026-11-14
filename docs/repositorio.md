# Repositorio y estado — CalculaChile

> Remoto, despliegue y estado verificado. Contenido movido aquí desde [`AGENTS.md`](../AGENTS.md) al reducir el contrato normativo a 6 KiB.
> El contrato vigente sigue en [`AGENTS.md`](../AGENTS.md); este documento conserva el detalle completo.

## Repositorio y estado
- Remoto `github.com/falopass/calculadorachile`, rama `main`. El push a `main` despliega por Workers Builds.
- Deploy: Cloudflare Workers vía OpenNext, worker **`calculadorachile`** (`wrangler.jsonc` + `open-next.config.ts`). Scripts: `cf:build`, `cf:deploy`, `cf:upload`, `cf-typegen`.
- Verificado 2026-11-08: HEAD `aafb46f` (2026-11-04), árbol limpio, **6 commits detrás de `origin`**. Sincronizar antes de asumir el estado del código.
