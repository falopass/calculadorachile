# Plan de Actualización de Valores Legales 2026

> **Fecha:** 1 de Abril 2026
> **Objetivo:** Actualizar todos los valores legales, tributarios y laborales en `src/lib/values/constants.ts`

---

## Fuentes Oficiales a Consultar

| Valor | Fuente Oficial | URL |
|-------|---------------|-----|
| UF, UTM, Dólar | Banco Central de Chile | https://www.bcentral.cl |
| Sueldo Mínimo | Ministerio del Trabajo | https://www.dt.gob.cl |
| Tramos Impuestos | SII | https://www.sii.cl |
| AFP Comisiones | Superintendencia de Pensiones | https://www.spensiones.cl |
| PGU | Ministerio de Desarrollo Social | https://www.ministeriodesarrollosocial.gob.cl |
| Asignación Familiar | Ministerio del Trabajo | https://www.dt.gob.cl |
| Subsidios | MINVU | https://www.minvu.cl |

---

## Valores a Verificar/Actualizar

### 1. Ingreso Mínimo (Ley 21.630)
- [ ] Verificar monto mensual vigente abril 2026
- [ ] Verificar monto para menores de 18 y mayores de 65
- [ ] Verificar monto para zona extrema (Magallanes)
- [ ] Verificar cálculo de jornal y hora

**Valor actual:** $539.000 mensual

### 2. UF y UTM
- [ ] Verificar valor UF al día actual (BCentral)
- [ ] Verificar valor UTM abril 2026 (BCentral)
- [ ] Verificar valor dólar observado

**Valores actuales:**
- UF: $39.841,72
- UTM: $69.889
- Dólar: $931,57

### 3. Comisiones AFP
- [ ] Verificar comisiones de las 7 AFPs (Superintendencia de Pensiones)
- [ ] Verificar seguro de invalidez y sobrevivencia (SIS)

**Valores actuales:**
- Uno: 0.49%
- Modelo: 0.58%
- PlanVital: 1.16%
- Habitat: 1.27%
- Capital: 1.44%
- Cuprum: 1.44%
- ProVida: 1.45%
- SIS: 1.15% (todas)

### 4. Impuesto Segunda Categoría 2026
- [ ] Verificar tramos en UTA (SII)
- [ ] Verificar tasas y factores
- [ ] Verificar UTA = 12 x UTM

**Valores actuales:** 8 tramos de 0% a 40%

### 5. Asignación Familiar 2026
- [ ] Verificar 5 tramos (A-E) con montos por carga
- [ ] Verificar topes de ingreso

**Valores actuales:**
- Tramo A: $24.668 por carga
- Tramo B: $18.056 por carga
- Tramo C: $10.031 por carga
- Tramo D: $5.016 por carga
- Tramo E: $2.508 por carga

### 6. PGU 2026
- [ ] Verificar monto máximo
- [ ] Verificar tramos de ingreso
- [ ] Verificar edad mínima

**Valor actual:** $260.000 máximo

### 7. Retención Boleta de Honorarios
- [ ] Verificar tasa de retención 2026 (SII)
- [ ] Verificar exento en UTM

**Valor actual:** 15.25% total (10% + 5.25%)

### 8. Subsidio Habitacional DS49/DS01
- [ ] Verificar montos máximos en UF
- [ ] Verificar tramos de ingreso

### 9. Bono Bodas de Oro (Ley 21.674)
- [ ] Verificar monto
- [ ] Verificar requisitos

**Valor actual:** $150.000

### 10. Subsidio Agua Potable
- [ ] Verificar monto máximo mensual
- [ ] Verificar porcentajes de subsidio

### 11. Tarifas TAG
- [ ] Verificar precios por ruta
- [ ] Verificar categorías de vehículos

### 12. Tarifa Eléctrica BT1
- [ ] Verificar cargo fijo
- [ ] Verificar precio por kWh

---

## Pasos de Ejecución

1. **Investigar cada valor** en las fuentes oficiales listadas
2. **Comparar con valores actuales** en `constants.ts`
3. **Actualizar los valores** que estén desactualizados
4. **Agregar fuentes y fechas** como comentarios en el código
5. **Commit y push** con mensaje descriptivo

---

## Notas Importantes

- Los valores de UF, UTM y dólar se obtienen automáticamente de la API del BCentral, pero los fallback en `constants.ts` deben estar actualizados
- Los tramos de impuesto segunda categoría cambian anualmente en enero
- El sueldo mínimo se actualiza por ley (Ley 21.630 establece el calendario)
- Las comisiones AFP pueden cambiar mensualmente

---

*Plan creado el 1 de Abril 2026*
