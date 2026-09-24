# CTR y embudo — línea base septiembre 2026

Los cambios van en el mismo commit que este archivo. Fecha de corte de la línea base: 2026-09-21.

## Fuente y límites

- GSC UI (usuario, 28 días 25/8–21/9): 1.020 clics · 108.000 impresiones · CTR 0,9% · posición 9,4.
- Export local `calculadorachile.cl-Performance-on-Search-2026-09-23/` (termina el 20/9): 28 días 25/8–20/9 = 966 clics · 103.143 impresiones · CTR 0,94%.
- Las tablas por página y por consulta del export son de **3 meses (21/6–20/9)**, no de 28 días. Sirven para elegir páginas; la comparación "después" debe hacerse en GSC con el mismo filtro de página y ventanas de 28 días.

## Páginas tocadas: antes (export 3 meses)

| URL | Clics | Impr. | CTR | Pos. | Title antes → después |
|---|---|---|---|---|---|
| /calculadoras/calculadora-credito-cae | 396 | 5.349 | 7,40% | 5,70 | Simulador CAE 2026: cuota, UF y % del ingreso → Simulador CAE 2026: calcula tu cuota mensual (+ H1 y respuesta rápida) |
| /calculadoras/calculadora-patente-comercial | 1.161 | 26.750 | 4,34% | 4,95 | Patente Comercial 2026: simula con tu CPT y comuna → Patente comercial 2026: cómo se calcula y cuánto pagar (+ H1 y respuesta rápida) |
| /calculadoras/calculadora-contribuciones | 149 | 1.513 | 9,85% | 6,73 | Contribuciones 2026: calcula por avalúo fiscal SII → Calculadora de contribuciones 2026: cuota por avalúo SII |
| /guias/finiquito-laboral-chile | 6 | 1.076 | 0,56% | 7,65 | Finiquito Laboral Chile 2026: guía con ejemplos en $ → Cómo calcular el finiquito en Chile 2026: ejemplos en $ |
| /blog/seguro-cesantia-finiquito-2026-afc | 0 | 538 | 0% | 9,48 | Seguro de Cesantía 2026: AFC, CIC y finiquito → Finiquito y AFC 2026: cuánto pueden descontar |
| /blog/como-cobrar-seguro-cesantia-afc-2026 | 2 | 349 | 0,57% | 8,88 | Cómo cobrar Seguro de Cesantía AFC 2026: pasos → Cómo cobrar el Seguro de Cesantía AFC 2026: paso a paso |
| /cesantia | 12 | 292 | 4,11% | 11,02 | Me despidieron Chile 2026: finiquito y qué hacer → Me despidieron en Chile 2026: qué hacer paso a paso |
| /blog/revision-tecnica-chile-2026-calendario-patente | 16 | 5.409 | 0,30% | 9,33 | Revisión técnica 2026: calendario por patente y requisitos → Revisión técnica 2026 por patente: mes según último dígito |

Las descripciones nuevas están en `src/data/seo-overrides.ts` (y en `src/app/cesantia/page.tsx`).

## Consultas objetivo: antes (export 3 meses)

| Consulta | Clics | Impr. | CTR | Pos. | Página | Producto enlazado |
|---|---|---|---|---|---|---|
| simulador cae | 84 | 384 | 21,88% | 3,32 | calculadora-credito-cae | — (sin producto afín) |
| afc calcular finiquito | 10 | 117 | 8,55% | 10,05 | blog seguro-cesantia-finiquito / calculadora-finiquito | CVListo |
| calculadora de contribuciones chile | 47 | 85 | 55,29% | 1,82 | calculadora-contribuciones | — (sin producto afín) |
| valor patente comercial | 17 | 244 | 6,97% | 4,25 | calculadora-patente-comercial | Sitiazo |
| como se calcula la patente municipal | 7 | 156 | 4,49% | 3,38 | calculadora-patente-comercial | Sitiazo |

## Enlaces a productos (UTM)

- CVListo: `utm_source=calculachile&utm_medium=referral&utm_campaign=ecosistema_laboral&utm_content=<calc|origen>_<placement>`; carta: sufijo `_carta`. Presente en calculadora de finiquito, /cesantia, guía de finiquito y posts de AFC/despido.
- Sitiazo: `utm_campaign=ecosistema_pymes&utm_content=<calc|blog_slug|guia_slug>_<placement>`. Presente en calculadoras de patente e IVA, /blog/patente-comercial-2027-calcular y /guias/empresas-pymes-chile.
- GA4: `calculator_completed` → `employment_cta_viewed/clicked` (param `link=cv|carta`) y `pyme_cta_viewed/clicked`.

## Cómo medir el después

1. GSC → Rendimiento → filtro de página (cada URL de la tabla) → comparar 28 días 2026-09-25/2026-10-22 contra 2026-08-25/2026-09-21. Registrar clics, CTR y posición. Si la posición cambió más de ~1 puesto, el CTR no es comparable directo.
2. Repetir a los 56 días para descartar ruido estacional (patente tiene pico en enero/julio; contribuciones en abril/junio/septiembre/noviembre).
3. GA4 → Eventos: `pyme_cta_clicked / pyme_cta_viewed` y `employment_cta_clicked / employment_cta_viewed` por `calculator_id`.
4. CVListo/Sitiazo: sesiones con `utm_source=calculachile` y conversiones de cada lado.
