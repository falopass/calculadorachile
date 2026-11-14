# Estilo, UI y accesibilidad — CalculaChile

> Reglas de presentación, fuentes y accesibilidad. Contenido movido aquí desde [`AGENTS.md`](../AGENTS.md) al reducir el contrato normativo a 6 KiB.
> El contrato vigente sigue en [`AGENTS.md`](../AGENTS.md); este documento conserva el detalle completo.

## Estilo, UI y accesibilidad

- El sitio está en **modo light-only**. `tailwind.config.ts` mantiene `darkMode: 'class'` para que clases `dark:` residuales no se activen por `prefers-color-scheme`. No reintroduzcas dark mode.
- Usa las fuentes activas: Geist Sans y Geist Mono. No reintroduzcas Inter/Syne/DM Sans/Playfair/JetBrains como stack global.
- Mantén UI mobile-first, accesible y rápida. Semántica HTML, labels, focus visible y contraste son mínimos.
- Formato chileno siempre desde `src/lib/formatters.ts`: pesos como `$1.000.000`, UF/UTM con convención local.
- Framer Motion está permitido para microinteracciones existentes. No agregues animaciones pesadas a calculadoras core.
