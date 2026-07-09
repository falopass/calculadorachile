---
name: auditoria-ymyl
description: >
  Auditar calculadoras YMYL de CalculaChile: fórmulas, constantes, inputs
  fantasma (catálogo vs adapter), fuentes, redondeos, disclaimers y tests
  golden. Usar cuando el usuario pida auditoría, revisar fórmulas, inputs
  fantasma, gap adapter, confiabilidad de cálculo, o /auditoria-ymyl.
---

# Auditoría YMYL — CalculaChile

Producto de dinero real. Prioriza **exactitud y honestidad de la UI** sobre features cosméticas. Lee `AGENTS.md`.

## Objetivo

Detectar y, si el usuario lo pide, corregir riesgos que dañen confianza, AdSense o SEO:

1. Fórmulas o constantes sin fuente / desactualizadas.
2. **Inputs fantasma**: el catálogo muestra campos que el adapter no pasa al cálculo.
3. Adapter incompleto vs capacidades del módulo.
4. Redondeos inconsistentes (off-by-one CLP).
5. Falta de disclaimer, sources o `lastReviewed`.
6. Tests solo de humo (`> 0`) sin montos golden.

## Alcance

Por defecto audita **una calculadora** (la que indique el usuario) o un set pequeño (top tráfico: sueldo-líquido, finiquito, boleta, IVA, hipotecario, AFP).

No audites las 39 de golpe salvo que lo pidan: entrega profundidad, no un checklist vacío.

## Procedimiento

### 1. Ubicar las 4 piezas

Para `calculator.id` / `slug`:

| Pieza | Dónde |
|-------|--------|
| Metadata | `src/data/calculators.ts` |
| Módulo | `src/lib/calculations/<modulo>.ts` |
| Adapter | `calculationFunctions[...]` en `CalculatorPageClient.tsx` |
| Tests | `src/lib/calculations/__tests__/<modulo>.test.ts` |

Nota: el **nombre del archivo** del módulo a veces difiere del `id` (ej. `vacaciones` vs `vacaciones-proporcionales`). La clave real es `id`.

### 2. Matriz inputs → adapter → módulo

1. Lista `inputs[].id` del catálogo.
2. Lista campos que el adapter pasa a `calculateX({...})`.
3. Lista campos que el módulo **acepta** en su interface de input.
4. Clasifica cada input:

| Estado | Significado | Severidad |
|--------|-------------|-----------|
| **OK** | Catálogo → adapter → módulo, afecta resultado | — |
| **FANTASMA** | En catálogo (visible) pero no en adapter | **Alta** |
| **MUERTO** | En módulo/adapter pero no en catálogo (no usable) | Media |
| **COSMÉTICO** | Solo UI (toggle de gráfico, etc.) y documentado como tal | Baja si no miente |
| **DEFAULT SILENCIOSO** | Módulo usa default que el usuario no controla | Media si cambia plata |

**Regla:** si el label sugiere que cambia el cálculo y no lo hace → es bug de producto YMYL, no “detalle”.

### 3. Fórmulas y constantes

- Trazar tasas/topes a `src/lib/values/constants.ts` o snapshot.
- Verificar que no haya números mágicos legales en el componente.
- Comparar comentarios de ley/circular con lo implementado.
- Si no puedes verificar la fuente oficial en el repo o en una URL citada en `sources`, márcalo como **NO VERIFICADO** (no inventes la validación).

### 4. Redondeo y bordes

- ¿`Math.round` / `floor` / truncamiento por paso?
- Casos de tope imponible, prorrateo, “primera vez”, meses parciales.
- Tests: ¿esperan enteros CLP? ¿toleran ±1?

### 5. Capa de confianza (E-E-A-T)

Revisar en la página/catálogo:

- [ ] `sources[]` con URLs específicas
- [ ] `lastReviewed` con fecha creíble
- [ ] FAQ no contradice la fórmula
- [ ] Disclaimer YMYL presente en el flujo de UI (componente / layout)
- [ ] `seoTitle` / description no prometen “oficial del SII/DT”

### 6. Tests

Clasificar cobertura:

| Nivel | Criterio |
|-------|----------|
| A | Golden amounts + topes + al menos un borde |
| B | Varios casos pero sin anclar a fuente |
| C | Solo signos / inequalities |
| F | Sin test o test roto por fórmula cambiada |

## Formato de informe (obligatorio)

```markdown
# Auditoría YMYL — <nombre> (`id`)

## Resumen
- Riesgo global: Bajo | Medio | Alto | Crítico
- ¿Segura para tráfico YMYL?: Sí / Condicional / No

## Matriz de inputs
| input id | catálogo | adapter | módulo | estado | notas |

## Fórmula y constantes
- ...
- Fuentes citadas vs. implementadas: ...

## Hallazgos (ordenados por severidad)
1. **[Alta]** ...
2. **[Media]** ...

## Tests
- Nivel: A/B/C/F
- Gaps: ...

## Acciones recomendadas
1. ...
```

## Corrección

Solo corrige si el usuario lo pide o si el hallazgo es un bug claro de wiring (input fantasma) y el módulo **ya** soporta el campo con semántica obvia.

- No “mejores” la fórmula sin fuente oficial.
- No cambies slugs ni quites disclaimers.
- Toda corrección de fórmula → actualizar test golden + `lastReviewed` si hubo review real.
- Validar: `npm run typecheck` + test del módulo.

## Anti-patrones

- Dar por buena una calculadora porque “compila”.
- Confundir README marketing con comportamiento real.
- Ampliar scope a rediseño UI durante una auditoría de fórmulas.
- Reactivar o reindexar calculadoras retiradas/noIndex sin decisión explícita.
