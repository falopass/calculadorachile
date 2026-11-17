# Backlog de ideas no implementadas — ordenado por impacto

> Detectadas en el análisis de expansión 2026-11. Requieren fuente verificada, decisión de producto o más esfuerzo del disponible en este pase.

| # | Idea | Impacto | Esfuerzo | Bloqueador |
|---|------|---------|----------|------------|
| 1 | **Widget embebible** de calculadoras top (iframe + "por calculadorachile.cl") para que medios y blogs lo incrusten | Muy alto: backlinks + tráfico recurrente | Alto (embed route, CSP, estilos) | Decisión de producto y diseño del embed |
| 2 | **Estado compartible por URL** en calculadoras (inputs → query params; resultado reproducible al compartir el link) | Alto: viraliza resultados, ya existe `navigator.share` | Medio (serialización por calculadora) | Define formato de params; ruido en URLs indexadas (canonical) |
| 3 | **Guía pillar Operación Renta 2027** (#39 del plan editorial) | Alto estacional mar–abr | Alto (~3.000 palabras) | Ventana correcta es ene–feb 2027 |
| 4 | **Simulador de pensión estimada AFP** | Muy alto volumen | Alto + YMYL sensible | Supuestos actuariales (rentabilidad, expectativa vida) requieren revisión de Diego |
| 5 | **Alertas de indicadores** (suscripción correo: te avisa cuando cambia UF/UTM/sueldo mínimo) | Alto retención | Alto (infra de correo, legal) | Infra inexistente; Ley 21.719 consentimiento |
| 6 | **Calculadora posesión efectiva** (costo trámite SII/TGR por herencia) | Medio-alto | Medio | Tarifas y reglas deben verificarse con SII |
| 7 | **Permiso postnatal / prenatal / parental** | Medio | Medio | Reglas SUSESO-Laboral por verificar caso a caso |
| 8 | **EV vs bencina** (costo cargar auto eléctrico vs combustible por km) | Medio, en crecimiento | Medio | Precios de referencia no oficiales → solo input |
| 9 | **Días administrativos** (sector público, 6/año) | Medio estacional | Bajo | Nicho; reglas por servicio |
| 10 | **"Qué subsidios puedo pedir"** (quiz guiado → calculadoras aplicables) | Medio retención | Medio-alto | Reglas de elegibilidad por subsidio (RSH) ya existen; el quiz las orquesta |
| 11 | **Página "indicadores del día"** con snapshot UF/UTM/dólar + cambio vs ayer (landing de retorno diario) | Medio retención | Bajo-medio | `/prensa` ya da valores vigentes; diferenciar formato "hoy" |
| 12 | **Diccionario laboral/tributario** (glosario enlazado desde calculadoras) | Medio SEO long-tail | Medio | Contenido a producir |
| 13 | **Cobertura `quick-answers`** en el 100 % de calculadoras indexables (hoy no todas la tienen) | GEO/AI Overviews | Bajo-medio | Mapear faltantes |
| 14 | **Herramienta sueldo empresarial** (dueño pyme: sueldo + retiro + impuestos) | Medio | Medio | Reforma tributaria complica supuestos |
| 15 | **Marca temporal en títulos SEO** ("…2026" → auto-rotar por año en seo-overrides) | CTR sostenido | Bajo | Riesgo de contenido desactualizado si el body no se revisa; mejor manual |

### Descartadas
- `LocalBusiness`, dark mode, dependencias de animación pesadas: prohibidas por AGENTS.md.
- Cambio de slugs existentes por estética: rompe tráfico orgánico.
- Precio de bencina hardcodeado: no hay fuente oficial única y varía por comuna/día.
