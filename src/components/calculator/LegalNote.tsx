/**
 * LegalNote - Componente para disclaimers legales
 * 
 * Muestra notas legales y advertencias sobre los cálculos.
 */

export interface LegalNoteProps {
  /** Tipo de nota */
  type?: 'info' | 'warning' | 'disclaimer' | 'legal';
  /** Contenido personalizado */
  children?: React.ReactNode;
}

const defaultMessages = {
  info: 'Los valores mostrados son referenciales y se actualizan según las normativas vigentes.',
  warning: 'Los cálculos pueden variar según tu situación particular. Consulta con un profesional.',
  disclaimer: 'Esta calculadora es una herramienta de orientación y no constituye asesoría legal ni financiera. Para decisiones importantes, consulta siempre con un profesional calificado.',
  legal: '⚠️ Aviso Legal: Esta calculadora proporciona una estimación basada en la legislación vigente. El resultado puede variar según circunstancias específicas. Consulta con un profesional para tu caso particular.',
};


const styles = {
  info: {
    container: 'bg-[var(--color-primary-50)] border-[var(--color-primary-200)]',
    icon: 'text-[var(--color-primary-500)]',
    text: 'text-[var(--color-primary-700)]',
  },
  warning: {
    container: 'bg-[var(--color-warning-50)] border-[var(--color-warning-200)]',
    icon: 'text-[var(--color-warning-500)]',
    text: 'text-[var(--color-warning-700)]',
  },
  disclaimer: {
    container: 'bg-[var(--background-secondary)] border-[var(--border)]',
    icon: 'text-[var(--foreground-muted)]',
    text: 'text-[var(--foreground-secondary)]',
  },
  legal: {
    container: 'bg-[var(--color-warning-100)] border-[var(--color-warning-300)]',
    icon: 'text-[var(--color-warning-600)]',
    text: 'text-[var(--color-warning-800)]',
  },
};
const icons = {
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  disclaimer: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
  ),
  legal: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
};

/**
 * LegalNote - Componente para mostrar notas legales y disclaimers
 * 
 * @example
 * // Disclaimer por defecto
 * <LegalNote type="disclaimer" />
 * 
 * @example
 * // Nota personalizada
 * <LegalNote type="warning">
 *   Los valores de UF se actualizan diariamente.
 * </LegalNote>
 */
export default function LegalNote({ type = 'disclaimer', children }: LegalNoteProps) {
  const style = styles[type];
  const icon = icons[type];
  const message = children || defaultMessages[type];

  return (
    <div className={`mt-6 p-4 rounded-lg border ${style.container}`}>
      <div className="flex gap-3">
        <span className={`flex-shrink-0 ${style.icon}`}>
          {icon}
        </span>
        <p className={`text-sm ${style.text}`}>
          {message}
        </p>
      </div>
    </div>
  );
}
