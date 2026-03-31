import Link from "next/link";

/**
 * Pagina 404 personalizada
 * Se muestra cuando el usuario visita una ruta que no existe.
 * Server component - sin 'use client'.
 */
export default function NotFound() {
  const calculadoras = [
    {
      href: "/calculadoras/calculadora-sueldo-liquido",
      nombre: "Sueldo Liquido",
      descripcion: "Calcula tu sueldo liquido a partir del bruto",
    },
    {
      href: "/calculadoras/calculadora-finiquito",
      nombre: "Finiquito",
      descripcion: "Calcula el monto de tu finiquito laboral",
    },
    {
      href: "/calculadoras/calculadora-uf-clp",
      nombre: "UF a CLP",
      descripcion: "Convierte UF a pesos chilenos y viceversa",
    },
    {
      href: "/calculadoras/calculadora-iva",
      nombre: "IVA",
      descripcion: "Calcula el IVA de cualquier monto en Chile",
    },
  ];

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      {/* Mensaje principal */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-7xl sm:text-8xl font-bold text-[var(--color-primary-500)] mb-4">
          404
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
          Pagina no encontrada
        </h1>
        <p className="text-lg text-[var(--foreground-secondary)] mb-8 max-w-lg mx-auto">
          Lo sentimos, la pagina que buscas no existe o fue movida.
          Te invitamos a volver al inicio o usar una de nuestras calculadoras.
        </p>

        {/* Boton volver al inicio */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary-600)] text-white font-medium hover:bg-[var(--color-primary-700)] transition-colors duration-200"
        >
          Volver al inicio
        </Link>
      </div>

      {/* Calculadoras populares */}
      <div className="mt-16 w-full max-w-2xl">
        <h2 className="text-lg font-semibold text-[var(--foreground)] text-center mb-6">
          Calculadoras populares
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {calculadoras.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="block p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--color-primary-400)] hover:shadow-md transition-all duration-200"
            >
              <p className="font-semibold text-[var(--foreground)] mb-1">
                {calc.nombre}
              </p>
              <p className="text-sm text-[var(--foreground-secondary)]">
                {calc.descripcion}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
