# Qué no tocar sin aprobación explícita — CalculaChile

> Límites duros del repo y excepciones permitidas. Contenido movido aquí desde [`AGENTS.md`](../AGENTS.md) al reducir el contrato normativo a 6 KiB.
> El contrato vigente sigue en [`AGENTS.md`](../AGENTS.md); este documento conserva el detalle completo.

## Qué no tocar sin aprobación explícita

- Fórmulas, topes, tasas o constantes financieras sin fuente oficial verificada.
- Slugs, URLs públicas, canonicals, redirects, 410, robots o sitemaps. Romper rutas indexadas rompe tráfico orgánico.
- AdSense: script global, placeholders, componentes o ubicación de placements.
- Structured data SEO/YMYL: Organization/WebSite/Person/FAQ/HowTo/SoftwareApplication/Breadcrumbs. Excepción: se permite corregir propiedades inválidas según schema.org o las reglas de Google en los tipos existentes, sin agregar tipos nuevos ni quitar entidades.
- Dark mode: el producto está light-only.
- Nuevas dependencias de animación/3D/smooth scroll no instaladas.
- Formato de moneda chilena.
- Secretos o credenciales.
