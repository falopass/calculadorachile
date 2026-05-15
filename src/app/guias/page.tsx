import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { BookOpen, Briefcase, Calculator, Home, Car, TrendingUp, ArrowRight } from 'lucide-react';

/**
 * GuideCard - Componente para mostrar una guía con link a calculadora
 * Separado para evitar anidar Links (error de Next.js 15)
 */
function GuideCard({
  title,
  description,
  href,
  calculator,
  calculatorHref,
}: {
  title: string;
  description: string;
  href: string;
  calculator?: string;
  calculatorHref?: string;
}) {
  return (
    <div className="group block p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] hover:shadow-md transition-all">
      <Link href={href} className="block">
        <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-500)] transition-colors mb-1">
          {title}
        </h3>
        <p className="text-sm text-[var(--foreground-secondary)] mb-3 line-clamp-2">
          {description}
        </p>
      </Link>
      {calculator && calculatorHref && (
        <Link
          href={calculatorHref}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-primary-500)] hover:gap-2.5 transition-all"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>{calculator}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Guías y Recursos | CalculaChile',
  description: 'Guías completas sobre temas laborales, tributarios y financieros en Chile. Aprende a calcular tu sueldo, finiquito, créditos y más.',
  robots: { index: true, follow: true },
};

interface GuideCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  guides: {
    title: string;
    description: string;
    href: string;
    calculator?: string;
    calculatorHref?: string;
  }[];
}

const categories: GuideCategory[] = [
  {
    id: 'laboral',
    title: 'Laboral y Sueldo',
    description: 'Todo sobre remuneraciones, beneficios y derechos laborales.',
    icon: Briefcase,
    color: 'from-[var(--color-primary-500)] to-[var(--color-primary-600)]',
    guides: [
      {
        title: 'Cómo calcular tu sueldo líquido',
        description: 'Aprende la diferencia entre sueldo bruto y líquido, y cómo se calculan los descuentos de AFP, salud y seguro de cesantía.',
        href: '/blog/diferencia-sueldo-bruto-liquido',
        calculator: 'Calculadora de Sueldo Líquido',
        calculatorHref: '/calculadoras/calculadora-sueldo-liquido',
      },
      {
        title: 'Guía completa del finiquito',
        description: 'Qué es, cómo se calcula y qué derechos tienes al terminar tu relación laboral.',
        href: '/blog/como-calcular-finiquito-chile',
        calculator: 'Calculadora de Finiquito',
        calculatorHref: '/calculadoras/calculadora-finiquito',
      },
      {
        title: 'Horas extra: cómo se pagan',
        description: 'Recargo del 50% sobre el valor hora normal. Conoce tus derechos.',
        href: '/blog',
        calculator: 'Calculadora de Horas Extra',
        calculatorHref: '/calculadoras/calculadora-horas-extra',
      },
      {
        title: 'Vacaciones proporcionales',
        description: 'Cómo se calculan las vacaciones al terminar un contrato.',
        href: '/blog',
        calculator: 'Calculadora de Vacaciones',
        calculatorHref: '/calculadoras/calculadora-vacaciones-proporcionales',
      },
    ],
  },
  {
    id: 'tributario',
    title: 'Impuestos y Tributos',
    description: 'IVA, boletas de honorarios, operación renta y más.',
    icon: TrendingUp,
    color: 'from-[var(--color-error-500)] to-[var(--color-error-600)]',
    guides: [
      {
        title: 'Guía completa del IVA en Chile',
        description: 'Cómo funciona el 19% de IVA, cómo calcularlo y cuándo aplicarlo.',
        href: '/blog/guia-iva-chile-2026',
        calculator: 'Calculadora de IVA',
        calculatorHref: '/calculadoras/calculadora-iva',
      },
      {
        title: 'Boleta de honorarios: todo lo que necesitas saber',
        description: 'Retención del 15.25%, cómo emitir boletas y declarar impuestos.',
        href: '/blog',
        calculator: 'Boleta de Honorarios',
        calculatorHref: '/calculadoras/calculadora-boleta-honorarios',
      },
      {
        title: 'Operación Renta para independientes',
        description: 'Cómo declarar tus ingresos anuales ante el SII.',
        href: '/blog',
        calculator: 'Operación Renta',
        calculatorHref: '/calculadoras/calculadora-operacion-renta',
      },
    ],
  },
  {
    id: 'inmobiliario',
    title: 'Vivienda y Hogar',
    description: 'Créditos hipotecarios, arriendo, UF y subsidios.',
    icon: Home,
    color: 'from-[var(--color-warning-500)] to-[var(--color-warning-600)]',
    guides: [
      {
        title: 'Cómo funciona un crédito hipotecario',
        description: 'Dividendo, pie, CAE y todo lo que necesitas saber antes de comprar una casa.',
        href: '/blog',
        calculator: 'Simulador Hipotecario',
        calculatorHref: '/calculadoras/calculadora-credito-hipotecario',
      },
      {
        title: 'Reajuste de arriendo por UF',
        description: 'Cómo se calcula el reajuste anual del arriendo según la variación de la UF.',
        href: '/blog/reajuste-arriendo-uf-2026',
        calculator: 'Reajuste de Arriendo',
        calculatorHref: '/calculadoras/calculadora-reajuste-arriendo',
      },
      {
        title: '¿Qué es la UF y cómo se usa?',
        description: 'La Unidad de Fomento y su uso en créditos, arriendos e inversiones.',
        href: '/blog',
        calculator: 'Conversor UF',
        calculatorHref: '/calculadoras/calculadora-uf-clp',
      },
    ],
  },
  {
    id: 'vehiculos',
    title: 'Vehículos y Transporte',
    description: 'Permiso de circulación, multas, TAG y más.',
    icon: Car,
    color: 'from-[var(--color-accent-500)] to-[var(--color-accent-600)]',
    guides: [
      {
        title: 'Permiso de circulación: cuánto pagar',
        description: 'Cómo se calcula el permiso según el valor del vehículo y la comuna.',
        href: '/blog',
        calculator: 'Permiso de Circulación',
        calculatorHref: '/calculadoras/calculadora-permiso-circulacion',
      },
      {
        title: 'Multas de tránsito: cómo consultarlas',
        description: 'Dónde ver tus multas y cómo calcular el costo en UTM.',
        href: '/blog',
        calculator: 'Multas de Tránsito',
        calculatorHref: '/calculadoras/calculadora-multas-transito',
      },
      {
        title: 'Costo TAG: cuánto gastas al mes',
        description: 'Calcula el gasto mensual en peajes según tu ruta habitual.',
        href: '/blog',
        calculator: 'Costo TAG',
        calculatorHref: '/calculadoras/calculadora-costo-tag',
      },
    ],
  },
];

export default function GuiasPage() {
  return (
    <div className="container-base py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Guías y Recursos' }]} />
      
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary-500)]/10 mb-4">
            <BookOpen className="w-8 h-8 text-[var(--color-primary-500)]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-3">
            Guías y Recursos
          </h1>
          <p className="text-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto">
            Aprende sobre temas laborales, tributarios y financieros con nuestras guías prácticas
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {categories.map((category) => (
            <section key={category.id}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--foreground)]">{category.title}</h2>
                  <p className="text-sm text-[var(--foreground-secondary)]">{category.description}</p>
                </div>
              </div>

              {/* Guides grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {category.guides.map((guide, index) => (
                  <GuideCard
                    key={index}
                    title={guide.title}
                    description={guide.description}
                    href={guide.href}
                    calculator={guide.calculator}
                    calculatorHref={guide.calculatorHref}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] text-center">
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
            ¿Necesitas más información?
          </h3>
          <p className="text-sm text-[var(--foreground-secondary)] mb-4">
            Visita nuestro blog con artículos detallados sobre cada tema
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-500)] text-white font-semibold hover:from-[var(--color-primary-500)] hover:to-[var(--color-primary-400)] transition-all shadow-lg shadow-[var(--color-primary-500)]/20"
          >
            Ir al blog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
