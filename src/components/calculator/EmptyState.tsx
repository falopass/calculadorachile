'use client';

import { motion } from 'framer-motion';
import { Calculator, Lightbulb, ArrowRight } from 'lucide-react';

/**
 * EmptyState - Estado vacío para calculadoras sin resultados
 * 
 * Muestra un mensaje de bienvenida con instrucciones y un ejemplo rápido.
 * Guía al usuario sobre cómo usar la calculadora.
 */

// Ejemplos rápidos por tipo de calculadora
const QUICK_EXAMPLES: Record<string, { label: string; values: Record<string, number | string | boolean> }> = {
  'sueldo-liquido': {
    label: 'Ej: Sueldo bruto $800.000',
    values: { sueldoBruto: 800000, afp: 'habitat', saludTipo: 'fonasa' },
  },
  'finiquito': {
    label: 'Ej: 5 años, $600.000 bruto',
    values: { ultimoSueldo: 600000, añosTrabajados: 5, causaTermino: 'despido' },
  },
  'uf-clp': {
    label: 'Ej: 10 UF a CLP',
    values: { monto: 10, direccion: 'uf-a-clp' },
  },
  'iva': {
    label: 'Ej: $100.000 + IVA',
    values: { monto: 100000, tipo: 'agregar-iva' },
  },
  'utm-clp': {
    label: 'Ej: 5 UTM a CLP',
    values: { monto: 5, direccion: 'utm-a-clp' },
  },
  'gratificacion-legal': {
    label: 'Ej: Sueldo $700.000',
    values: { sueldoBruto: 700000, mesesTrabajados: 12, tipoGratificacion: 'anual' },
  },
  'horas-extra': {
    label: 'Ej: 10 horas extra, $600.000 base',
    values: { sueldoBase: 600000, horasExtra: 10 },
  },
  'vacaciones': {
    label: 'Ej: 6 meses trabajados, $500.000',
    values: { sueldo: 500000, mesesTrabajados: 6, diasPendientes: 0 },
  },
  'boleta-honorarios': {
    label: 'Ej: $1.000.000 bruto',
    values: { montoBruto: 1000000 },
  },
  'credito-hipotecario': {
    label: 'Ej: UF 3.000, 20 años',
    values: { montoUF: 3000, plazoAnios: 20, tasaInteres: 4.5 },
  },
  'pension-alimenticia': {
    label: 'Ej: 2 hijos, ingreso $900.000',
    values: { numeroHijos: 2, ingresoMensual: 900000 },
  },
  'reajuste-arriendo': {
    label: 'Ej: $500.000 con UF',
    values: { arriendoActual: 500000, ufInicial: 28000, ufActual: 37600 },
  },
  'permiso-circulacion': {
    label: 'Ej: Auto 2020, $15.000.000',
    values: { anoVehiculo: 2020, valorVehiculo: 15000000, tipo: 'particular' },
  },
  'costo-empleado': {
    label: 'Ej: Sueldo $700.000',
    values: { sueldoBruto: 700000, afp: 'habitat', saludTipo: 'fonasa' },
  },
};

interface EmptyStateProps {
  /** ID de la calculadora para mostrar ejemplo relevante */
  calculatorId: string;
}

export default function EmptyState({ calculatorId }: EmptyStateProps) {
  const example = QUICK_EXAMPLES[calculatorId];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center py-10 px-6"
    >
      {/* Icono decorativo */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-accent-100)] mb-6"
      >
        <Calculator className="w-10 h-10 text-[var(--color-primary-500)]" />
      </motion.div>

      {/* Título */}
      <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
        Calcula al instante
      </h3>

      {/* Descripción */}
      <p className="text-[var(--foreground-secondary)] text-sm max-w-md mx-auto mb-6 leading-relaxed">
        Completa los campos de arriba y los resultados aparecerán automáticamente.
        No necesitas presionar ningún botón.
      </p>

      {/* Tip */}
      <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-warning-50)] border border-[var(--color-warning-200)] text-sm">
        <Lightbulb className="w-4 h-4 text-[var(--color-warning-600)] flex-shrink-0" />
        <span className="text-[var(--color-warning-700)] font-medium">
          Los resultados se actualizan en tiempo real mientras escribes
        </span>
      </div>

      {/* Ejemplo rápido si existe */}
      {example && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-sm"
        >
          <ArrowRight className="w-4 h-4 text-[var(--color-primary-500)] flex-shrink-0" />
          <span className="text-[var(--foreground-secondary)]">
            Prueba con: <span className="font-semibold text-[var(--foreground)]">{example.label}</span>
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
