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
import {
  faqPageSchema,
  breadcrumbSchema,
  webPageSchema,
} from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, CONTACT_EMAIL } from '@/lib/site';

const PAGE_TITLE = 'Preguntas frecuentes sobre cálculos en Chile';
const PAGE_DESC =
  'Respuestas a las preguntas más buscadas sobre sueldo líquido, finiquito, UF, UTM, IVA y AFP en Chile. Con bases legales y ejemplos numéricos en pesos chilenos.';

export const metadata: Metadata = buildPageMetadata({
  path: '/faq',
  title: PAGE_TITLE,
  description: PAGE_DESC,
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
          'CalculaChile es un sitio web gratuito con 39 calculadoras para Chile: sueldo líquido, finiquito, UF, IVA, créditos hipotecarios, permiso de circulación, subsidios, AFP, boleta de honorarios y más. Todos los cálculos usan valores oficiales actualizados (UF y UTM diaria, tasas legales 2026) y citan las leyes que los respaldan.',
      },
      {
        question: '¿Las calculadoras son gratuitas?',
        answer:
          'Sí, todas son gratuitas y no requieren registro. El sitio se financia con publicidad mínima (Google AdSense) que no rastrea datos personales sensibles. Los cálculos se ejecutan localmente en tu navegador, no se envían a ningún servidor.',
      },
      {
        question: '¿Los resultados son exactos?',
        answer:
          'Los resultados son exactos según las fórmulas oficiales y los valores publicados. Pueden existir pequeñas diferencias con tu liquidación de sueldo o finiquito si tu empleador aplica reglas internas (por ejemplo, redondeos distintos en el tope imponible o pago de bonos no estándar). Para trámites legales formales recomendamos validar con la Dirección del Trabajo, el SII o un profesional.',
      },
      {
        question: '¿Mis datos están seguros?',
        answer:
          'Sí. Todos los cálculos ocurren en tu navegador (cliente). Lo que ingresas no viaja a nuestros servidores. El historial de cálculos se guarda solo en tu dispositivo (localStorage). Lee nuestra política de privacidad y aviso de cookies para detalle.',
      },
      {
        question: '¿Con qué frecuencia se actualizan los valores?',
        answer:
          'La UF se actualiza diariamente vía GitHub Action desde mindicador.cl con respaldo del Banco Central. La UTM se actualiza mensualmente. El dólar y el euro son diarios. Las tasas legales (AFP, salud, cesantía, tramos de impuesto) se actualizan cada vez que cambia la normativa. La fecha del último snapshot está visible en la página de cada calculadora.',
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
          'Tu sueldo líquido es el bruto menos AFP (10% + comisión variable, entre 0,46% y 1,45%), salud (7% mínimo), seguro de cesantía (0,6% si tienes contrato indefinido) e impuesto único de segunda categoría si tu base supera 13,5 UTM mensuales. Para el cálculo exacto con tu AFP y plan de salud, usa la calculadora de sueldo líquido.',
      },
      {
        question: '¿Cuál es el tope imponible AFP/Salud en 2026?',
        answer:
          'El tope imponible AFP y Salud en 2026 es de 90 UF mensuales. Las cotizaciones se calculan solo sobre ese monto: si tu sueldo bruto es mayor, la porción que excede no cotiza. El tope del seguro de cesantía es distinto: 135,2 UF mensuales.',
      },
      {
        question: '¿Cuándo me corresponde indemnización por años de servicio?',
        answer:
          'La indemnización (30 días por año, tope 11 años, base 90 UF) corresponde solo cuando el empleador pone término al contrato sin causa justificada o por necesidades de la empresa (artículo 161 del Código del Trabajo). Si renuncias voluntariamente NO te corresponde. Si te despiden por falta de probidad sin pruebas, el tribunal puede ordenar pagar la indemnización con un recargo de 30% a 100% (artículo 168).',
      },
      {
        question: '¿Cómo se calculan las vacaciones proporcionales?',
        answer:
          'Por cada mes trabajado en el año en curso te corresponden 1,25 días hábiles (15 días anuales ÷ 12 meses). El valor del día se calcula como sueldo mensual ÷ 30. Si trabajaste 8 meses con sueldo $700.000: 8 × 1,25 = 10 días × $23.333 = $233.330 a pagar en el finiquito.',
      },
      {
        question: '¿Cuántas horas extra puedo hacer en una jornada?',
        answer:
          'Máximo 2 horas extra diarias (artículo 31 del Código del Trabajo). Se pagan con un recargo del 50% sobre el valor de la hora ordinaria. Para domingos y festivos trabajados, el recargo es 100%. La jornada legal vigente desde abril 2026 es 42 horas semanales (Ley 21.561).',
      },
      {
        question: '¿La gratificación legal es obligatoria?',
        answer:
          'Sí, para empresas con utilidades, la gratificación legal es obligatoria (artículo 47 del Código del Trabajo). Equivale al 25% de la remuneración mensual con tope de 4,75 IMM mensuales. La mayoría de los empleadores la paga mensualizada incluida en el sueldo. Si la pagan anual, debe liquidarse en abril.',
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
          'El IVA en Chile es 19% único. Para agregar IVA: precio_neto × 1,19. Para quitar IVA: precio_bruto ÷ 1,19. Por ejemplo, una factura de $100.000 neto tiene IVA de $19.000 y total $119.000. Algunos servicios están exentos: educación, salud (en hospitales), libros, transporte público, seguros de vida y servicios financieros.',
      },
      {
        question: '¿Cuánto retiene una boleta de honorarios en 2026?',
        answer:
          'En 2026 la retención total es 15,25% (10% impuesto a la renta + 5,25% cotizaciones previsionales). Sube a 16% en 2027 y 17% en 2028 según la Ley 21.578. Boletas bajo 10 UTM mensuales no requieren cotización obligatoria. El líquido recibido es bruto × (1 − 0,1525).',
      },
      {
        question: '¿Cuándo debo declarar Operación Renta?',
        answer:
          'Si emitiste boletas de honorarios en el año calendario, recibiste sueldos sobre 13,5 UTM mensuales o tienes ingresos como inversionista, debes presentar el Formulario 22 entre marzo y mayo del año siguiente. Si lo retenido excede el impuesto que te corresponde, recibes devolución; si fue insuficiente, pagas la diferencia.',
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
          'La UF (Unidad de Fomento) es una unidad reajustable diaria según la inflación del mes anterior. La calcula y publica el Banco Central. En mayo 2026 la UF vale aproximadamente $40.340. Se usa en créditos hipotecarios, arriendos largos, seguros, topes imponibles y subsidios habitacionales.',
      },
      {
        question: '¿Cuál es la diferencia entre UF y UTM?',
        answer:
          'La UF se reajusta diariamente y se usa en contratos privados (créditos, arriendos). La UTM (Unidad Tributaria Mensual) se reajusta mensualmente y se usa en el ámbito tributario (impuestos, multas, trámites SII). En mayo 2026, UF ≈ $40.340 y UTM ≈ $70.588.',
      },
      {
        question: '¿Cuánto reajusta el arriendo cada año?',
        answer:
          'Si tu arriendo está en pesos, el reajuste depende del IPC acumulado del período según lo pactado en el contrato. Si está en UF, el reajuste es automático con la variación diaria de la UF. No hay un tope legal de aumento, pero el arrendador no puede subir el precio sin lo establecido en el contrato.',
      },
      {
        question: '¿Dónde puedo ver el valor de la UF actualizado?',
        answer:
          'En el sitio del Banco Central de Chile (bcentral.cl/inicio/indicadores), en el SII (sii.cl), o directamente en nuestra calculadora UF→CLP que se actualiza diariamente desde fuentes oficiales.',
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
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Preguntas Frecuentes' },
    ]),
  ];

  return (
    <>
      <JsonLd id="faq-schemas" data={schemas} />

      <div className="container-base py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Preguntas Frecuentes' },
          ]}
        />

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
              Respuestas concretas con bases legales, fórmulas y ejemplos en pesos
              chilenos. Si no encuentras tu pregunta, escríbenos.
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
                        <a
                          href={`#faq-${group.id}`}
                          className="toc-link block"
                        >
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
                  Escríbenos y respondemos en 24-48 horas hábiles.
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
                  <p className="text-xs text-[var(--foreground-muted)]">
                    40+ herramientas
                  </p>
                </Link>
                <Link
                  href="/guias"
                  className="p-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface)] transition-all"
                >
                  <h3 className="font-semibold text-[var(--foreground)] mb-1">
                    Guías profundas
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)]">
                    Pillar content 15min+
                  </p>
                </Link>
                <Link
                  href="/blog"
                  className="p-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface)] transition-all"
                >
                  <h3 className="font-semibold text-[var(--foreground)] mb-1">
                    Blog
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)]">
                    Artículos cortos
                  </p>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
