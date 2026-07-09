# Auditoría de código — estructura, spaghetti, riesgos y UX

**Fecha:** 2026-07-08  
**Alcance:** runtime app (`src/`), no `node_modules`.  
**Enfoque:** errores latentes, acoplamiento, duplicación, dead code, performance percibida.

---

## Resumen ejecutivo

| Severidad | Cantidad aprox. | Tema dominante |
|-----------|-----------------|----------------|
| **Alta** | 3 | Bundle de calculadoras (1 client importa 40 módulos); throws sin UI; monolitios de data |
| **Media** | 8 | Adapters duplicados; FAQ×2; dead imports; SEO intro en client; sin code-split |
| **Baja** | 6 | Docs legacy, DisclaimerYMYL huérfano, dark: residuales, formatCLP local |

El proyecto **no es un caos total**: hay separación clara `data` / `calculations` / UI. El “spaghetti” real está concentrado en **`CalculatorPageClient.tsx`** (mega-mapa de adapters + imports) y en **contenido monolítico** (`guias.ts` 157 KB, `calculators.ts` 128 KB).

---

## 1. Riesgos que pueden romper la página (Alta)

### 1.1 Bundle client monstruoso en cada calculadora

**Archivo:** `src/app/calculadoras/[slug]/CalculatorPageClient.tsx` (~37 KB solo fuente)

- Es **`"use client"`**.
- Importa **~40 módulos** de `src/lib/calculations/*` de forma estática.
- El mapa `calculationFunctions` registra **todas** las calcs en el mismo chunk.

**Efecto en el usuario:** al abrir *cualquier* calculadora, el browser descarga lógica de finiquito, hipotecario, TAG, PGU, etc., aunque solo use sueldo líquido.

**Impacto:** TTI/TBT peores en mobile, más JS parseado, peor AdSense/UX en redes lentas.

**Mejora recomendada (ordenada):**

1. **Corto plazo:** dividir adapters por id en archivos lazy:
   ```ts
   // registry dinámico
   const load = () => import(`@/lib/calculations/adapters/${id}`);
   ```
2. O un registry server-side que pase solo el `calculateFn` serializable no es viable (funciones); mejor **dynamic import** del módulo de cálculo al montar según `calculator.id`.
3. Mover `seoIntroText` y el switch de categoría al **Server Component** (`page.tsx`) y pasar string ya resuelto al client (menos trabajo en el hilo de React client).

### 1.2 `throw new Error` en módulos usados desde el client

| Módulo | Cuándo lanza |
|--------|----------------|
| `credito-hipotecario.ts` | pie ≥ monto, tasa fuera de rango, plazo inválido |
| `uf-clp.ts` | UF ≤ 0 |
| `cotizacion-independientes.ts` | AFP desconocida |

`PremiumCalculatorShell` tiene un `catch` genérico, pero si el error se escapa o el mensaje es técnico, la UX es “pantalla rota” o toast vago.

**Mejora:** unificar política: **nunca throw en cálculos de UI**; devolver `{ errores: string[] }` (como subsidio) o resultados vacíos + mensaje amable. Throws solo en tests/assert internos.

### 1.3 Monolitios de contenido en el bundle de data

| Archivo | ~Tamaño |
|---------|---------|
| `guias.ts` | 157 KB |
| `calculators.ts` | 128 KB |
| `articles.ts` | 85 KB |

- Toda guía se importa desde listados/mapas → Next puede incluir mucho HTML en el grafo de módulos.
- Diffs de git y reviews son dolorosos; alto riesgo de conflictos.

**Mejora:** un archivo por guía/artículo (`content/guias/*.mdx` o `.ts` por slug) + índice liviano. Carga por `import()` o `fs` en server components.

---

## 2. Spaghetti / mala estructura (Media)

### 2.1 Mega-adapter en un solo archivo

`calculationFunctions` mezcla:

- Parsing de inputs (`num` **copiado 6+ veces** en el mismo archivo).
- Mapeos id catálogo → API del módulo (`esDomingo` → `esDomingoFestivo`, `incluyeCotizaciones` → `desgloseCotizaciones`).
- Casts `as` sin validación en la mayoría de calcs “viejas”.

**Problemas:**

- Fácil reintroducir fantasmas (ya lo vivimos).
- Sin tests del adapter (solo del módulo puro).
- Difícil code-review de PRs de wiring.

**Mejora:**

```text
src/lib/calculations/adapters/
  sueldo-liquido.ts   → export function adaptSueldoLiquido(inputs)
  finiquito.ts
  index.ts            → Record<id, Adapter>
src/lib/input-coerce.ts → num(), bool(), enumOf()
```

Cada adapter con 1–2 tests de “catálogo → resultado no NaN”.

### 2.2 Dos FAQs, un Disclaimer muerto

| Componente | Uso real |
|------------|----------|
| `EnhancedFAQ` | Calculadoras |
| `FAQ` | `/faq` (+ emite JSON-LD opcional) |
| `DisclaimerYMYL` | **Nadie lo importa** |
| `LegalNote` | Shell (disclaimer genérico) |

**Mejora UX YMYL:** un solo `FAQ` base + variantes visuales; montar `DisclaimerYMYL` por categoría (SII / DT / MINVU) en el shell.

### 2.3 SEO en el client innecesariamente

`seoIntroText` + `switch(category)` viven en el client component. Es HTML/SEO estático.

**Mejora:** calcular en `page.tsx` (server) y pasar `seoIntro` como prop. El client solo monta shell interactivo.

### 2.4 Comentarios / docs desactualizados

- `page.tsx` dice “40 calculadoras” (son 39 activas).
- `PREMIUM_COMPONENTS.md` (obsoleto) fue eliminado del repo; el shell activo es `PremiumCalculatorShell`.
- `horas-extra.ts` comentario “default 44” pero default real es `JORNADA_LEGAL.actual` (42).

Ruido para el siguiente dev/agente.

### 2.5 Residuos `dark:` en componentes “premium”

`EnhancedFAQ`, algunos `dark:bg-...` en warning boxes: el sitio es **light-only**. No rompe (darkMode: class), pero es basura y confunde.

---

## 3. Duplicación e innecesario (Media–Baja)

| Qué | Dónde | Acción |
|-----|--------|--------|
| `const num = ...` ×6 | CalculatorPageClient | Extraer `coerceNum` / `coerceBool` |
| `formatCLP` local | `guias/[slug]/page.tsx` | Usar `@/lib/formatters` |
| Imports muertos | CalculatorPageClient: `UF, UTM, INGRESO_MINIMO, IVA, formatCLP, formatUF, useValues` | **Borrar** (hoy no se usan) |
| FAQ types duplicados | `FAQ.tsx` vs `EnhancedFAQ` vs `types/calculator` | Un solo `FAQItem` |
| `SelectField` en barrel | ¿Poco uso vs PremiumInputField? | Auditar y consolidar |
| `bono-bodas-oro` módulo+test | Histórico + 410 | Mantener fuera de catálogo; no reimportar en client (OK hoy) |

---

## 4. Performance / uso de la página (UX)

### 4.1 Prioridad alta — JS de calculadoras
Ya cubierto en §1.1. Es el mayor win de performance real.

### 4.2 Scroll + layout
- Mobile overflow se mitigó (globals + guías).
- Shell: `scrollIntoView` en cada resultado — bien, pero en mobile a veces empuja demasiado; valorar `block: 'start'` solo si el teclado no está abierto.

### 4.3 Historial en `localStorage`
`useCalculationHistory` — bien para reengagement; revisar cuota y privacidad (no guardar RUT/datos sensibles; hoy son inputs de calc, OK).

### 4.4 Valores en vivo
`/api/values` + context — buen diseño. Asegurar que el shell use UF/UTM live donde el módulo aún lee `constants.UF` **estático** (snapshot).

**Riesgo de producto:** el usuario ve “UF del día” en un bloque, pero el cálculo usa `UF.valor` del **snapshot** del build, no el live del context.

**Mejora fuerte de confiabilidad:** inyectar `valorUF` / `valorUTM` en los adapters desde `useValues()` cuando esté disponible, con fallback a constants.

### 4.5 Imágenes / fuentes
Geist ya limitó pesos. OG canvas es server-side. OK.

### 4.6 Framer Motion
Solo en FAQ clásico y microinteracciones. No crítico; no meter más animación en calculadoras core.

---

## 5. Type safety y errores silenciosos

| Patrón | Riesgo |
|--------|--------|
| `inputs.x as number` sin coerce en adapters viejos | `NaN` en resultados |
| Select values string `"2026"` | Ya mitigado en boleta/sueldo P0; resto inconsistente |
| `pie >= monto` throw en hipotecario | UX depende del catch del shell |
| Validación shell: `number <= 0` required | Impide 0 legítimo en algunos campos (días 0 está OK con default) |

**Mejora:** coerce central + validación por `unit` / `min` del catálogo; mensajes en español por campo.

---

## 6. Lo que está bien (no reescribir)

1. **Lógica pura** en `lib/calculations` + tests Vitest.  
2. **Catálogo tipado** `Calculator` con sources / lastReviewed / noIndex.  
3. **API values** con fallback en cadena.  
4. **SEO schemas** centralizados en `lib/seo/schema.ts`.  
5. **SSG** de slugs de calculadoras.  
6. Matriz de fantasmas + dossier YMYL (proceso de calidad).

No conviene un rewrite full; sí **cirugía en el client de calculadoras** y **split de data**.

---

## 7. Backlog priorizado (mejorar uso real de la página)

### P0 ingeniería (1–3 días)
1. **Code-split** por `calculator.id` (dynamic import del módulo de cálculo).  
2. **Eliminar imports muertos** del client + helper `num/bool` único.  
3. **UF/UTM live** en cálculos que hoy leen snapshot (sueldo, UF-CLP, hipotecario).  
4. **No throw** en `credito-hipotecario` / uf-clp hacia la UI.

### P1 (semana)
5. Extraer `adapters/` + tests de wiring.  
6. Unificar FAQ + montar DisclaimerYMYL.  
7. Mover `seoIntroText` al server.  
8. Limpiar `dark:` residual y docs PREMIUM.

### P2 (estructura a medio plazo)
9. Split `guias.ts` / `articles.ts` / `calculators.ts` por archivo.  
10. CI: `audit-ymyl-matrix` en PR + size budget del chunk de calculadoras.

---

## 8. Métricas de éxito

| Métrica | Hoy (estimado) | Objetivo |
|---------|----------------|----------|
| Fantasmas catálogo | 0 | Mantener 0 |
| JS parseado al abrir 1 calc | ~todos los módulos | Solo 1 módulo + shell |
| Throws visibles en UI | Posibles (hipoteca) | 0 |
| Disclaimer YMYL por organismo | Genérico LegalNote | DisclaimerYMYL activo |
| Diff review `guias.ts` | 157 KB archivo | &lt; 15 KB por guía |

---

## 9. Conclusión

El código de **fórmulas** está razonablemente disciplinado. El spaghetti que más duele al **usuario** y al **mantenimiento** es:

1. **Un client que carga todo el universo de cálculos.**  
2. **Adapters manuales frágiles** (mitigados en P0/P1, aún sin arquitectura).  
3. **Data SEO monolítica.**  
4. **Desacople snapshot vs valores live.**

Siguiente paso de implementación de mayor ROI: **code-split de calculations + UF live en adapters core**, sin reescribir el shell premium.
