---
name: frontend-calculachile
description: Diseñar, revisar o mejorar interfaces de CalculaChile sin romper confianza YMYL, SEO, AdSense ni el sistema visual existente. Usar cuando el usuario pida frontend, UI, UX, responsive, accesibilidad, home, calculadoras, resultados, landing, componentes, navegación o un rediseño visual dentro de CalculaChile.
---

# Frontend CalculaChile

Lee `AGENTS.md`, el `AGENTS.md` más cercano al archivo y `package.json`. Las instrucciones del repo prevalecen sobre esta skill.

## Dirección base

Interpreta CalculaChile como un servicio financiero/laboral nacional de confianza, no como una landing experimental.

- `DESIGN_VARIANCE: 3`
- `MOTION_INTENSITY: 2`
- `VISUAL_DENSITY: 5`

Usa estos valores como criterio interno. No los muestres en la UI. Para blog o contenido editorial puedes subir varianza a 4; para formularios y resultados mantenla en 2–3.

## Stack bloqueado

- Next.js 15, React 19, TypeScript 5 y Tailwind CSS 3.
- Geist Sans + Geist Mono mediante `next/font`.
- Lucide como familia de iconos.
- `framer-motion` solo para microinteracciones justificadas.
- Producto light-only. No añadir dark mode, GSAP, Lenis, Three.js, `motion/react`, otra librería de iconos ni un design system nuevo.
- No instalar dependencias salvo aprobación explícita y necesidad demostrada.

## Flujo obligatorio

1. Audita la superficie actual antes de editar: jerarquía, espaciado, estados, responsive, accesibilidad, rendimiento y componentes reutilizables.
2. Declara una lectura breve: `Superficie: <tipo>; audiencia: Chile; objetivo: <tarea>; lenguaje: confianza clara y sobria`.
3. Elige modo:
   - **Preservar:** corregir inconsistencias sin alterar identidad ni estructura pública.
   - **Mejora dirigida:** cambiar una sección o flujo concreto.
   - **Rediseño amplio:** detener y pedir aprobación si afecta navegación, ads, URLs, formularios core o marca.
4. Reutiliza componentes en `src/components/ui`, `calculator`, `home`, `layout` y `article` antes de crear otro.
5. Implementa el cambio mínimo y revisa mobile primero (~375 px), luego tablet y desktop.
6. Ejecuta la validación correspondiente de `AGENTS.md` y reporta resultados reales.

## Criterios visuales

- Prioriza legibilidad, jerarquía de datos y confianza sobre sorpresa visual.
- Usa una sola escala coherente de radios, bordes, sombras y espaciado por superficie.
- Evita gradientes púrpura, glassmorphism decorativo, bento sin función, cards vacías, blobs, halos y tres columnas genéricas repetidas.
- No fuerces asimetría en formularios. Inputs, unidades, ayudas y errores deben escanearse verticalmente.
- Reduce cards cuando una separación, fondo o espacio en blanco exprese mejor la jerarquía.
- Mantén el contenido principal dentro del patrón de ancho existente; no conviertas todo el sitio en un pasillo estrecho.
- Conserva formato chileno mediante `src/lib/formatters.ts`.

## Calculadoras y resultados

- No cambies fórmulas, inputs, labels legales, fuentes, disclaimers o resultados por una mejora visual.
- Mantén alineación catálogo → adapter → módulo. Si detectas un input fantasma, repórtalo como bug YMYL.
- Haz evidente la relación input → acción → resultado; no escondas el CTA principal bajo animación o contenido secundario.
- Implementa estados de carga, vacío, error, validación y éxito con el patrón existente.
- Mantén anuncios y sus espacios reservados; no mover, ocultar o envolver placements AdSense por estética.

## Accesibilidad y movimiento

- Usa HTML semántico, labels asociados, foco visible y orden de teclado lógico.
- Asegura targets táctiles de al menos 44 px y contraste WCAG AA.
- No uses `h-screen` para superficies críticas; prefiere contenido natural o `min-h-[100dvh]` cuando corresponda.
- Anima solo `transform` y `opacity` cuando sea posible.
- Respeta `prefers-reduced-motion`; la información nunca debe depender de una animación.

## Gate de entrega

- `npm run typecheck`.
- Revisión visual mobile y desktop para cambios UI.
- `npm run build` si cambian rutas, metadata, catálogo o integración server/client.
- Confirma que siguen intactos light-only, Geist, Lucide, AdSense, disclaimers, schema y URLs públicas.
