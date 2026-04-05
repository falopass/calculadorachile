# Componentes Premium para Calculadoras

Este documento describe los nuevos componentes premium desarrollados para mejorar la experiencia visual y funcional de las calculadoras en CalculaChile.

## Componentes Disponibles

### 1. PremiumCalculatorShell
Versión premium del contenedor principal de calculadoras con:
- Diseño visual mejorado con gradientes y efectos de vidrio
- Animaciones suaves y transiciones elegantes
- Interacciones mejoradas
- Soporte para todos los tipos de inputs

### 2. PremiumInputField
Campo de entrada premium con:
- Efectos visuales avanzados
- Bordes animados
- Mejor feedback de usuario
- Soporte para prefijos y sufijos

### 3. PremiumResultCard
Tarjeta de resultados premium con:
- Iconos temáticos para diferentes tipos de resultados
- Diseño más elegante
- Mejores animaciones
- Opciones de exportación avanzadas

### 4. PremiumResultChart
Gráficos premium para visualización de datos con:
- Animaciones de entrada
- Gráficos de dona y barras
- Leyendas interactivas
- Efectos visuales mejorados

### 5. PremiumLoadingIndicator
Indicador de carga premium con:
- Varias variantes de animación
- Mensajes personalizables
- Efectos visuales elegantes

### 6. PremiumAnimationWrapper
Componentes de utilidad para animaciones con:
- Wrapper para animaciones básicas
- Contenedor para animaciones escalonadas
- Elementos con animación flotante

## Instalación y Uso

Para usar los componentes premium, simplemente reemplace los componentes estándar:

```tsx
// Antes
import { CalculatorShell } from '@/components/calculator';

// Después
import { PremiumCalculatorShell } from '@/components/calculator';
```

## Estilos CSS

Se incluye un archivo CSS con clases utilitarias para efectos premium:

```css
/* Importar en globals.css o en el layout */
@import '@/components/calculator/premium-calculator-styles.css';
```

## Características Premium

- **Diseño cinematográfico**: Efectos de profundidad y animaciones suaves
- **Experiencia de usuario mejorada**: Feedback visual y transiciones elegantes
- **Visualización de datos avanzada**: Gráficos interactivos y animados
- **Accesibilidad**: Cumple con estándares WCAG
- **Rendimiento**: Optimizado para animaciones fluidas

## Beneficios

- Mayor percepción de calidad
- Mejor experiencia de usuario
- Diferenciación competitiva
- Facilidad de compartir resultados
- Compatible con el sistema de diseño existente