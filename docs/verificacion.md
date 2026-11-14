# Comprobaciones por riesgo o petición

> Tabla de comprobaciones proporcionales. Se movió aquí desde [`AGENTS.md`](../AGENTS.md); sigue siendo normativa cuando el riesgo lo exige.
> El contrato vigente sigue en [`AGENTS.md`](../AGENTS.md); este documento conserva el detalle movido.

## Comprobaciones por riesgo o petición

Ningún comando es obligatorio por defecto. Estas opciones se usan solo ante petición o riesgo concreto no resoluble por lectura; las fórmulas nuevas o alteradas conservan su prueba específica por el riesgo de cálculo. `verifier` independiente se reserva para riesgo alto; build y suite completa solo por petición o riesgo que un check menor no cubra.

| Cambio | Comprobación si corresponde |
|---|---|
| Fórmula de cálculo | Test específico; typecheck solo si cambió el contrato TypeScript |
| Nueva calculadora | Test de cálculo y auditoría del wiring; build solo por despliegue o fallo que no cubran esos checks |
| Catálogo/categorías/rutas | Check de rutas afectadas; typecheck si cambió su contrato, build solo si hace falta observar generación |
| SEO metadata/schema/sitemap | Inspección de salida/canonical afectados; build solo si se necesita comprobar generación estática |
| `/api/values` o datos externos | Test o smoke focalizado del endpoint; typecheck si cambió su contrato |
| UI/componente | Inspección de la superficie afectada; responsive cuando cambió layout, typecheck cuando cambió lógica TS |
| Solo documentación | Releer el diff y las referencias afectadas |

Si un check falla, quien implementa corrige la causa y repite solo ese check; un `verifier` independiente, si fue solicitado, reporta sin editar. Un PASS vigente no se repite mientras no cambien sus inputs.
