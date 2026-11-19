# Post #38 — bitácora documental

Consulta: 2026-11-19. Blog explicativo para familias en Chile; ejemplo para menores y alimentante en tramo general del IMM. Pregunta: qué referencias entrega la calculadora, sin presentarlas como pensión fijada. Publicación adelantada respecto del 15 de diciembre planificado.

| Afirmación | Estado | Fuente primaria abierta | Soporte / límite |
|---|---|---|---|
| Un menor: 40% del IMM; dos o más: 30% por menor; posible rebaja acreditando falta de medios | VERIFICADA | [Ley 19.741](https://www.bcn.cl/leychile/navegar?idNorma=187930), art. 1 n.º 3; [texto refundido Ley 14.908](https://www.bcn.cl/leychile/navegar?idNorma=172986&idParte=8720734) | Porcentaje del IMM remuneracional según edad del alimentante, no de su sueldo. No extender a alimentarios adultos. |
| Límite general 50% de rentas, con excepción fundada | VERIFICADA | [Ley 21.389](https://www.bcn.cl/leychile/Navegar?idNorma=1168463), art. 1 n.º 6 | Interés superior del niño y reparto equitativo; no tope absoluto ni recorte automático. |
| Resolución en UTM, pago mensual anticipado y antecedentes económicos | VERIFICADA | Ley 21.389, art. 1 n.º 2, 4 y 5 | No sustituir obligación vigente por piso del IMM. |
| IMM $539.000 desde enero de 2026 | VERIFICADA | [Ley 21.751](https://www.bcn.cl/leychile/navegar?idNorma=1214530), art. 1 | Contexto enero–abril, no base del ejemplo desde mayo. |
| IMM $553.553 desde mayo de 2026; reajuste desde enero de 2027 | VERIFICADA | [Ley 21.830](https://www.bcn.cl/leychile/navegar?idNorma=1225354), art. 1; [DT](https://www.dt.gob.cl/portal/1628/w3-article-60141.html) | Tramo general de edad; DT corrobora monto y vigencia. No proyectar cifra a 2027. |
| Sueldo $1.000.000, dos menores; variante sueldo $300.000 | SUPUESTO DIDÁCTICO | No es dato observado | Identificados como hipotéticos; sin entrevistas ni casos reales. |
| $166.066 por menor, $332.132 total; límite $500.000; variante $150.000 | INFERIDA (aritmética reproducible) | Reglas oficiales anteriores + `calculatePensionAlimenticia` y `INGRESO_MINIMO` | 553.553 × 0,30 = 166.065,90; total sin redondear 332.131,80. Redondeo al peso. No son montos decretados. |

Prueba: `src/data/__tests__/articulo-pension-alimenticia.test.ts`; suite existente del módulo cubre cero menores e ingreso adicional desactivado. La matriz YMYL audita calculadoras, no registra artículos; no requiere nueva fila ni cambios al catálogo. `Article` usa `updatedAt`, `sources` y autoría de la plantilla; no define `lastReviewed`.
