# Backlog de ideas no implementadas — ordenado por impacto

> Detectadas en el análisis de expansión 2026-11 (actualizado 17-11-2026: salieron de la lista el enlace compartible, la guía de Operación Renta 2027 y prenatal/postnatal, ya implementados). Requieren fuente verificada, decisión de producto o más esfuerzo del disponible en este pase.

| # | Idea | Impacto | Esfuerzo | Bloqueador |
|---|------|---------|----------|------------|
| 1 | **Widget embebible** de calculadoras top (iframe + "por calculadorachile.cl") para que medios y blogs lo incrusten | Muy alto: backlinks + tráfico recurrente | Alto (embed route, CSP, estilos) | Decisión de producto y diseño del embed |
| 2 | **Simulador de pensión estimada AFP** | Muy alto volumen | Alto + YMYL sensible | Supuestos actuariales (rentabilidad, expectativa vida) requieren revisión de Diego |
| 3 | **Alertas de indicadores** (suscripción correo: te avisa cuando cambia UF/UTM/sueldo mínimo) | Alto retención | Alto (infra de correo, legal) | Infra inexistente; Ley 21.719 consentimiento |
| 4 | **Calculadora posesión efectiva** (costo trámite SII/TGR por herencia) | Medio-alto | Medio | Tarifas y reglas deben verificarse con SII |
| 5 | **EV vs bencina** (costo cargar auto eléctrico vs combustible por km) | Medio, en crecimiento | Medio | Precios de referencia no oficiales → solo input |
| 6 | **Días administrativos** (sector público, 6/año) | Medio estacional | Bajo | Nicho; reglas por servicio |
| 7 | **"Qué subsidios puedo pedir"** (quiz guiado → calculadoras aplicables) | Medio retención | Medio-alto | Reglas de elegibilidad por subsidio (RSH) ya existen; el quiz las orquesta |
| 8 | **Página "indicadores del día"** con snapshot UF/UTM/dólar + cambio vs ayer (landing de retorno diario) | Medio retención | Bajo-medio | Evaluada y descartada en este pase: home, `/prensa` y las calculadoras de UF/UTM/dólar ya cubren la consulta; solo valdría con el dato "cambio vs ayer" |
| 9 | **Diccionario laboral/tributario** (glosario enlazado desde calculadoras) | Medio SEO long-tail | Medio | Contenido a producir |
| 10 | **Cobertura `quick-answers`** en el 100 % de calculadoras indexables (hoy no todas la tienen) | GEO/AI Overviews | Bajo-medio | Mapear faltantes |
| 11 | **Herramienta sueldo empresarial** (dueño pyme: sueldo + retiro + impuestos) | Medio | Medio | Reforma tributaria complica supuestos |
| 12 | **Marca temporal en títulos SEO** ("…2026" → auto-rotar por año en seo-overrides) | CTR sostenido | Bajo | Riesgo de contenido desactualizado si el body no se revisa; mejor manual |
| 13 | **Subsidio maternal en pesos** dentro de `calculadora-prenatal-postnatal` (hoy solo calcula fechas) | Alto: es la pregunta siguiente del mismo usuario | Medio | Base de cálculo y topes del DFL 44 sin verificar por completo |
| 14 | **Más monedas de viaje** (peso colombiano, peso mexicano, boliviano) con el mismo módulo de real y sol | Medio estacional dic–mar | Bajo | Confirmar que el Banco Central publica cada serie |
| 15 | **Índice liviano para el buscador** (hoy, al abrirlo, baja ~1,3 MB con artículos y guías completos) | Medio: velocidad móvil | Bajo-medio | Ninguno; solo conviene si la búsqueda gana uso |
| 16 | **Impuestos adicionales por tipo de producto** en `calculadora-compras-internacionales` (alcohol, tabaco, usados con recargo de 50 %) | Medio | Medio | Tasas por partida arancelaria por verificar con Aduanas |

### Descartadas
- `LocalBusiness`, dark mode, dependencias de animación pesadas: prohibidas por AGENTS.md.
- Cambio de slugs existentes por estética: rompe tráfico orgánico.
- Precio de bencina hardcodeado: no hay fuente oficial única y varía por comuna/día.
