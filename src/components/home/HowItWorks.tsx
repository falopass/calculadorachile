import { MousePointerClick, Calculator, Download } from 'lucide-react';

const steps = [
  {
    icon: MousePointerClick,
    title: 'Elige tu calculadora',
    description: 'Encuentra la herramienta que necesitas en segundos.',
  },
  {
    icon: Calculator,
    title: 'Ingresa tus datos',
    description: 'Completa el formulario. Sin registro, sin instalaciones.',
  },
  {
    icon: Download,
    title: 'Obtén el resultado',
    description: 'Resultado al instante. Cópialo, descárgalo o compártelo.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="container-base">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="heading-display text-3xl md:text-4xl">
            Tres pasos. Sin fricción.
          </h2>
          <p className="mt-2 text-[var(--foreground-secondary)]">
            Diseñado para que resuelvas tu duda en menos de un minuto.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((step, i) => (
            <li key={step.title} className="card p-6 relative">
              <div className="absolute top-6 right-6 text-5xl font-bold text-[var(--background-secondary)] tabular-nums leading-none">
                0{i + 1}
              </div>
              <div className="relative">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white shadow-sm">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm text-[var(--foreground-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
