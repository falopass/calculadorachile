// ============================================
// DisclaimerYMYL — Aviso referencial para calculadoras YMYL
// ----------------------------------------------
// Componente reutilizable que renderiza el disclaimer corto:
// "Estimación referencial. No reemplaza la determinación oficial de {organismo}."
//
// Estilo tenue (--foreground-muted) para no competir visualmente con
// el contenido principal, pero suficientemente visible para cumplir
// la señal E-E-A-T que AdSense espera en páginas YMYL.
// ============================================

export interface DisclaimerYMYLProps {
  /** Organismo oficial competente, ej. "el SII", "la Dirección del Trabajo", "el IPS". */
  organismo: string;
  /** Clase extra para casos donde se necesita ajustar margen. */
  className?: string;
}

export default function DisclaimerYMYL({
  organismo,
  className = '',
}: DisclaimerYMYLProps) {
  return (
    <p
      className={`text-sm text-[var(--foreground-muted)] ${className}`.trim()}
      role="note"
    >
      Estimación referencial. No reemplaza la determinación oficial de {organismo}.
    </p>
  );
}
