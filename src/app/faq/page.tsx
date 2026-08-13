// ============================================
// FAQ — /faq
// ----------------------------------------------
// Preguntas frecuentes organizadas en tres bloques:
//   1. Sobre el sitio (uso, privacidad, monetización)
//   2. Sobre cálculos laborales (sueldo, finiquito, vacaciones)
//   3. Sobre indicadores (UF, UTM, dólar)
//
// Solo se emite UN FAQPage schema (deduplicado: el componente FAQ
// recibe `emitSchema={false}` para evitar el segundo `<script>`).
// ============================================

import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, List } from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import FAQ from '@/components/calculator/FAQ';
import TocSticky from '@/components/article/TocSticky';
import JsonLd from '@/components/seo/JsonLd';
import { faqPageSchema, breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, CONTACT_EMAIL } from '@/lib/site';

const PAGE_TITLE = 'Preguntas frecuentes sobre cálculos en Chile';
const PAGE_DESC =
  'Respuestas a las preguntas más buscadas sobre sueldo líquido, finiquito, UF, UTM, IVA y AFP en Chile. Con bases legales y ejemplos numéricos en pesos chilenos.';

export const metadata: Metadata = buildPageMetadata({
  path: '/faq',
  title: PAGE_TITLE,
  description: PAGE_DESC,
  noIndex: true,
  keywords: [
    'preguntas frecuentes calculadora chile',
    'FAQ sueldo líquido',
    'cómo calcular finiquito',
    'qué es UF',
    'cómo emitir boleta de honorarios',
    'tope imponible 2026',
    'AFP comisión',
  ],
});

interface FAQGroup {
  id: string;
  title: string;
  items: { question: string; answer: string }[];
}

const faqGroups: FAQGroup[] = [
  {
    id: 'sobre-el-sitio',
    title: 'Sobre CalculaChile',
    items: [
      {
        question: '¿Qué es CalculaChile?',
        answer:
          'CalculaChile es un sitio web gratuito con 39 calculadoras para Chile: sueldo líquido, finiquito, UF, IVA, créditos hipotecarios, permiso de circulación, subsidios, AFP, boleta de honorarios y más. Cada herramienta publica sus fuentes, fecha de revisión, supuestos y límites; el resultado es una estimación y no reemplaza el trámite o documento aplicable.',
      },
      {
        question: '¿Las calculadoras son gratuitas?',
        answer:
          'Sí, todas son gratuitas y no requieren registro. Puedes revisar la política de privacidad y cookies para conocer el tratamiento de datos y las tecnologías que eventualmente se usen para medir audiencia o mostrar publicidad. Los resultados no sustituyen la respuesta de la institución competente.',
      },
      {
        question: '¿Los resultados son exactos?',
        answer:
          'Son estimaciones referenciales construidas con las reglas, valores y supuestos que cada página declara. Un contrato, cotización, resolución, redondeo, bono o antecedente personal puede cambiar el resultado. Para trámites formales debes confirmar con la institución competente o un profesional.',
      },
      {
        question: '¿Mis datos están seguros?',
        answer:
          'Sí. Todos los cálculos ocurren en tu navegador (cliente). Lo que ingresas no viaja a nuestros servidores. El historial de cálculos se guarda solo en tu dispositivo (localStorage). Lee nuestra política de privacidad y aviso de cookies para detalle.',
      },
      {
        question: '¿Con qué frecuencia se actualizan los valores?',
        answer:
          'UF, UTM y tipos de cambio se consultan mediante fuentes públicas con respaldo cuando una fuente no responde. Las tasas, topes, tramos y calendarios se revisan cuando cambia la normativa o antes de publicar contenido estacional. La página de cada herramienta indica sus fuentes, fecha de revisión y limitaciones.',
      },
    ],
  },
  {
    id: 'sueldo-y-trabajo',
    title: 'Sueldo, finiquito y derechos laborales',
    items: [
      {
        question: '¿Cómo calculo mi sueldo líquido?',
        answer:
          'El sueldo líquido se obtiene al descontar cotizaciones, salud, seguro de cesantía, impuestos y otros descuentos que correspondan a tu caso. El resultado depende de la AFP, el plan de salud, el tipo de contrato y la liquidación. Usa la calculadora como orientación y contrasta los datos con tu liquidación.',
      },
      {
        question: '¿Cuál es el tope imponible AFP/Salud en 2026?',
        answer:
          'Los topes imponibles previsionales cambian y pueden diferir según el tipo de cotización. Revisa la fecha de revisión y las fuentes de la calculadora de sueldo líquido antes de usar una cifra en una liquidación o finiquito.',
      },
      {
        question: '¿Cuándo me corresponde indemnización por años de servicio?',
        answer:
          'La procedencia y el monto de una indemnización dependen de la causal de término, contrato, remuneración, antigüedad y antecedentes del caso. La calculadora entrega una orientación inicial; no determina si una causal es jurídicamente válida ni reemplaza la revisión de la carta de despido.',
      },
      {
        question: '¿Cómo se calculan las vacaciones proporcionales?',
        answer:
          'El feriado proporcional depende del período trabajado, los días pendientes, la remuneración y las reglas aplicables al contrato. Usa la calculadora para ordenar los antecedentes y confirma el pago final con la documentación de término.',
      },
      {
        question: '¿Cuántas horas extra puedo hacer en una jornada?',
        answer:
          'Las horas extraordinarias tienen límites y recargos definidos por la normativa laboral, pero pueden existir pactos, jornadas especiales y descansos compensatorios. La calculadora estima el valor según los datos ingresados; revisa el contrato, el registro de asistencia y la fuente oficial antes de reclamar un pago.',
      },
      {
        question: '¿La gratificación legal es obligatoria?',
        answer:
          'La gratificación legal depende, entre otros factores, de la situación de la empresa, la modalidad de pago y la remuneración. La herramienta permite una estimación, pero la liquidación y los antecedentes del empleador son los que determinan el monto exigible.',
      },
    ],
  },
  {
    id: 'tributario',
    title: 'IVA, boletas e impuestos',
    items: [
      {
        question: '¿Cómo se calcula el IVA?',
        answer:
          'La calculadora separa neto, IVA y total usando la tasa general vigente. No determina si una operación, venta o servicio está afecto, exento o no gravado: esa calificación debe confirmarse con la normativa y el SII.',
      },
      {
        question: '¿Cuánto retiene una boleta de honorarios en 2026?',
        answer:
          'En 2026 la retención de la boleta de honorarios es 15,25% del monto bruto. Es un pago provisional y no debe dividirse automáticamente entre impuesto y cotizaciones: la situación se determina en la Operación Renta según ingresos, gastos y reglas previsionales aplicables. Revisa la calculadora y la guía de honorarios antes de usarla para proyectar una devolución o pago.',
      },
      {
        question: '¿Cuándo debo declarar Operación Renta?',
        answer:
          'La obligación de presentar el Formulario 22 depende del tipo de ingreso, retenciones, rebajas y antecedentes del año tributario. No asumas que emitir una boleta o superar un monto aislado define por sí solo la obligación: revisa la información de Operación Renta del SII.',
      },
    ],
  },
  {
    id: 'indicadores',
    title: 'UF, UTM y otros indicadores',
    items: [
      {
        question: '¿Qué es la UF y cómo se calcula?',
        answer:
          'La UF es una unidad reajustable que publica el Banco Central y se usa en contratos, créditos, seguros, topes y otros cálculos. Como su valor cambia, consulta la fecha mostrada por la herramienta y confirma el valor aplicable a tu contrato o trámite.',
      },
      {
        question: '¿Cuál es la diferencia entre UF y UTM?',
        answer:
          'La UF se utiliza habitualmente en contratos, créditos y otros valores reajustables; la UTM se usa en materias tributarias, multas y trámites. Ambas cambian con el tiempo, por lo que la cifra válida depende de la fecha que corresponda.',
      },
      {
        question: '¿Cuánto reajusta el arriendo cada año?',
        answer:
          'El reajuste depende de la moneda, la cláusula pactada y el período que establezca el contrato. La calculadora sirve para estimar una variación; revisa el texto contractual y busca orientación si existe una controversia.',
      },
      {
        question: '¿Dónde puedo ver el valor de la UF actualizado?',
        answer:
          'Puedes consultarlo directamente en el Banco Central de Chile. Nuestra calculadora UF→CLP indica la fuente disponible y la fecha de actualización, pero para un trámite o contrato prevalece el valor oficial aplicable a la fecha correspondiente.',
      },
    ],
  },
];

// Aplanamos para el schema FAQPage (Google admite preguntas múltiples)
const allFaqs = faqGroups.flatMap((g) => g.items);

export default function FAQPage() {
  const url = absoluteUrl('/faq');

  // Schema: FAQPage (uno solo, con todas las preguntas) + WebPage genérico + BreadcrumbList
  const schemas = [
    faqPageSchema(allFaqs),
    webPageSchema({
      url,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      // Speakable: en /faq las preguntas y respuestas son el "valor"
      // de la página; le indicamos al asistente de voz exactamente
      // qué selectores leer en alto.
      speakableSelectors: ['.faq-question', '.faq-answer'],
    }),
    breadcrumbSchema([{ name: 'Inicio', path: '/' }, { name: 'Preguntas Frecuentes' }]),
  ];

  return (
    <>
      <JsonLd id="faq-schemas" data={schemas} />

      <div className="container-base py-8 md:py-12">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Preguntas Frecuentes' }]} />

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary-500)]/10 mb-4">
              <HelpCircle className="w-8 h-8 text-[var(--color-primary-500)]" />
            </div>
            <h1 className="heading-display text-3xl md:text-4xl text-[var(--foreground)] mb-3">
              Preguntas frecuentes
            </h1>
            <p className="text-lg text-[var(--foreground-secondary)] leading-relaxed max-w-2xl mx-auto">
              Respuestas concretas con bases legales, fórmulas y ejemplos en pesos chilenos. Si no
              encuentras tu pregunta, escríbenos.
            </p>
          </div>

          {/*
            Grid responsive: en >=lg, TOC sticky a la izquierda
            (3 cols) y contenido a la derecha (8 cols con offset
            de 1). En mobile, TOC arriba como bloque colapsable.
          */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* TOC sticky / collapsible */}
            <aside className="lg:col-span-3 order-1">
              <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2">
                {/* Mobile: collapsible */}
                <details
                  className="lg:hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 mb-6"
                  open
                >
                  <summary className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide select-none">
                    <List className="w-4 h-4" />
                    En esta página
                  </summary>
                  <ol className="mt-3 space-y-1 list-none">
                    {faqGroups.map((group, idx) => (
                      <li key={group.id}>
                        <a href={`#faq-${group.id}`} className="toc-link block">
                          <span className="text-[var(--foreground-muted)] mr-2 tabular-nums">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          {group.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
                {/* Desktop: scroll-spy TOC */}
                <div className="hidden lg:block">
                  <TocSticky
                    items={faqGroups.map((g) => ({
                      id: `faq-${g.id}`,
                      title: g.title,
                    }))}
                    title="En esta página"
                  />
                </div>
              </div>
            </aside>

            {/* Contenido */}
            <div className="lg:col-span-8 lg:col-start-5 order-2 max-w-3xl">
              {/* Grupos de preguntas */}
              <div className="space-y-10">
                {faqGroups.map((group) => (
                  <section
                    key={group.id}
                    id={`faq-${group.id}`}
                    aria-labelledby={`faq-${group.id}-heading`}
                    className="scroll-mt-24"
                  >
                    <h2
                      id={`faq-${group.id}-heading`}
                      className="text-xl font-bold text-[var(--foreground)] mb-4"
                    >
                      {group.title}
                    </h2>
                    {/*
                      emitSchema={false} para evitar duplicar el FAQPage
                      schema global. Cada grupo solo necesita el componente
                      visual.
                    */}
                    <FAQ items={group.items} emitSchema={false} />
                  </section>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="mt-12 p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] text-center">
                <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                  ¿No encontraste tu pregunta?
                </h2>
                <p className="text-sm text-[var(--foreground-secondary)] mb-4">
                  Escríbenos con la URL y la fuente oficial si detectaste un dato que requiere
                  revisión.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-500)] text-white font-semibold hover:from-[var(--color-primary-500)] hover:to-[var(--color-primary-400)] transition-all shadow-lg shadow-[var(--color-primary-500)]/20"
                >
                  Contactar soporte
                </a>
              </div>

              {/* Enlaces útiles */}
              <nav className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <Link
                  href="/calculadoras"
                  className="p-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface)] transition-all"
                >
                  <h3 className="font-semibold text-[var(--foreground)] mb-1">
                    Todas las calculadoras
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)]">39 herramientas</p>
                </Link>
                <Link
                  href="/guias"
                  className="p-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface)] transition-all"
                >
                  <h3 className="font-semibold text-[var(--foreground)] mb-1">Guías profundas</h3>
                  <p className="text-xs text-[var(--foreground-muted)]">Pillar content 15min+</p>
                </Link>
                <Link
                  href="/blog"
                  className="p-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface)] transition-all"
                >
                  <h3 className="font-semibold text-[var(--foreground)] mb-1">Blog</h3>
                  <p className="text-xs text-[var(--foreground-muted)]">Artículos cortos</p>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
