import { Metadata } from 'next';
import FAQ from '@/components/calculator/FAQ';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | CalculaChile',
  description: 'Respuestas a las preguntas más comunes sobre CalculaChile, nuestras calculadoras y cómo usarlas.',
  robots: { index: true, follow: true },
};

const faqItems = [
  {
    question: '¿Qué es CalculaChile?',
    answer: 'CalculaChile es un sitio web gratuito que ofrece más de 47 calculadoras financieras y laborales para trabajadores chilenos. Incluye herramientas para calcular sueldo líquido, finiquito, conversión UF, IVA, créditos hipotecarios, y mucho más.',
  },
  {
    question: '¿Las calculadoras son realmente gratuitas?',
    answer: 'Sí, todas las calculadoras son completamente gratuitas. No necesitas registrarte ni pagar nada. El sitio se mantiene a través de publicidad no intrusiva (Google AdSense).',
  },
  {
    question: '¿Cómo uso una calculadora?',
    answer: 'Simplemente selecciona la calculadora que necesitas desde la página de inicio, completa los campos requeridos y los resultados aparecerán automáticamente. No necesitas presionar ningún botón de "calcular".',
  },
  {
    question: '¿Los resultados son exactos?',
    answer: 'Los resultados son estimaciones basadas en fórmulas oficiales y valores actualizados (UF, UTM, tasas AFP, etc.). Sin embargo, pueden existir pequeñas diferencias con los cálculos de tu empleador o institución. Te recomendamos verificar con fuentes oficiales para trámites formales.',
  },
  {
    question: '¿Puedo usar los resultados para trámites legales?',
    answer: 'Los resultados son orientativos. Para trámites legales formales (finiquitos, demandas, declaraciones de impuestos), te recomendamos consultar con un profesional o verificar con la Dirección del Trabajo, SII u organismo correspondiente.',
  },
  {
    question: '¿Mis datos están seguros?',
    answer: 'Sí. Todos los cálculos se realizan localmente en tu navegador. No enviamos tus datos a ningún servidor. El historial de cálculos se guarda exclusivamente en tu dispositivo (localStorage).',
  },
  {
    question: '¿Puedo sugerir una nueva calculadora?',
    answer: '¡Por supuesto! Nos encanta recibir sugerencias. Contáctanos a contacto@calculachile.cl o a través de nuestras redes sociales con tu idea.',
  },
  {
    question: '¿Cómo contacto soporte?',
    answer: 'Puedes escribirnos a contacto@calculachile.cl para cualquier consulta, reporte de error o sugerencia. Respondemos dentro de 24-48 horas hábiles.',
  },
  {
    question: '¿Existe un plan Premium?',
    answer: 'Próximamente ofreceremos un plan Premium con funcionalidades como: sin publicidad, guardar historial en la nube, exportar a PDF, comparar escenarios y alertas de vencimiento. El precio será accesible ($2.990/mes).',
  },
  {
    question: '¿Con qué frecuencia se actualizan los valores?',
    answer: 'Los valores oficiales (UF, UTM, ingreso mínimo, tasas) se actualizan según las publicaciones oficiales. La UF se actualiza diariamente, la UTM mensualmente, y otros valores anualmente.',
  },
];

export default function FAQPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <div className="container-base py-8 md:py-12">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Preguntas Frecuentes' }]} />
        
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary-500)]/10 mb-4">
              <HelpCircle className="w-8 h-8 text-[var(--color-primary-500)]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-3">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg text-[var(--foreground-secondary)]">
              Respuestas a las dudas más comunes sobre CalculaChile
            </p>
          </div>

          {/* FAQ Component */}
          <FAQ items={faqItems} title="Todas las preguntas" />

          {/* Contact CTA */}
          <div className="mt-12 p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] text-center">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-sm text-[var(--foreground-secondary)] mb-4">
              Escríbenos y te responderemos a la brevedad
            </p>
            <a
              href="mailto:contacto@calculachile.cl"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-500)] text-white font-semibold hover:from-[var(--color-primary-500)] hover:to-[var(--color-primary-400)] transition-all shadow-lg shadow-[var(--color-primary-500)]/20"
            >
              Contactar soporte
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
