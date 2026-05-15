"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import type { CalculatorResult } from "@/types/calculator";
import PremiumCalculatorShell from "@/components/calculator/PremiumCalculatorShell";
import EnhancedFAQ from "@/components/calculator/EnhancedFAQ";
import SeoStructuredData from "@/components/calculator/SeoStructuredData";
import CalculatorPageLayout from "@/components/calculator/CalculatorPageLayout";
import LiveValuesSection from "@/components/calculator/LiveValuesSection";
import { calculateSueldoLiquido, sueldoLiquidoToResults } from "@/lib/calculations/sueldo-liquido";
import { calculateFiniquito, finiquitoToResults } from "@/lib/calculations/finiquito";
import { calculateUFCLP, ufclpToResults } from "@/lib/calculations/uf-clp";
import { calculateIVA, ivaToResults } from "@/lib/calculations/iva";
import { calculateUTMCLP, utmClpToResults } from "@/lib/calculations/utm-clp";
import { calculateGratificacion, gratificacionToResults } from "@/lib/calculations/gratificacion";
import { calculateIndemnizacion, indemnizacionToResults } from "@/lib/calculations/indemnizacion";
import { calculatePensionAlimenticia, pensionAlimenticiaToResults } from "@/lib/calculations/pension-alimenticia";
import { calculateReajusteArriendo, reajusteArriendoToResults } from "@/lib/calculations/reajuste-arriendo";
import { calculatePermisoCirculacion, permisoCirculacionToResults } from "@/lib/calculations/permiso-circulacion";
import { calculateCostoEmpleado, costoEmpleadoToResults } from "@/lib/calculations/costo-empleado";
import { calculateHorasExtra, horasExtraToResults } from "@/lib/calculations/horas-extra";
import { calculateVacaciones, vacacionesToResults } from "@/lib/calculations/vacaciones";
import { calculateBoletaHonorarios, boletaHonorariosToResults } from "@/lib/calculations/boleta-honorarios";
import { calculateCreditoHipotecario, creditoHipotecarioToResults } from "@/lib/calculations/credito-hipotecario";
import { calculateOperacionRenta, operacionRentaToResults } from "@/lib/calculations/operacion-renta";
import { calculateContribuciones, contribucionesToResults } from "@/lib/calculations/contribuciones";
import { calculateCostoNotaria, costoNotariaToResults } from "@/lib/calculations/costo-notaria";
import { calculatePlusvalia, plusvaliaToResults } from "@/lib/calculations/plusvalia";
import { calculateSubsidioHabitacional, subsidioHabitacionalToResults } from "@/lib/calculations/subsidio-habitacional";
import { calculatePatenteComercial, patenteComercialToResults } from "@/lib/calculations/patente-comercial";
import { calculateComparadorAFP, comparadorAFPToResults } from "@/lib/calculations/comparador-afp";
import { calculateSimuladorAPV, simuladorAPVToResults } from "@/lib/calculations/simulador-apv";
import { calculateInteresesMora, interesesMoraToResults } from "@/lib/calculations/intereses-mora";
import { calculateAsignacionFamiliar, asignacionFamiliarToResults } from "@/lib/calculations/asignacion-familiar";
import { calculateCreditoCAE, creditoCAEToResults } from "@/lib/calculations/credito-cae";
import { calculateCreditoAutomotriz, creditoAutomotrizToResults } from "@/lib/calculations/credito-automotriz";
import { calculateMultasTransito, multasTransitoToResults } from "@/lib/calculations/multas-transito";
import { calculateCostoTag, costoTagToResults } from "@/lib/calculations/costo-tag";
import { calculateCuentaLuz, cuentaLuzToResults } from "@/lib/calculations/cuenta-luz";
import { calculateImpuestoSegundaCategoria, impuestoSegundaCategoriaToResults } from "@/lib/calculations/impuesto-segunda-categoria";
import { calculatePPM, ppmToResults } from "@/lib/calculations/ppm";
import { calculateBonoBodasOro, bonoBodasOroToResults } from "@/lib/calculations/bono-bodas-oro";
import { calculateSubsidioAgua, subsidioAguaToResults } from "@/lib/calculations/subsidio-agua";
import { calculateCotizacionIndependientes, cotizacionIndependientesToResults } from "@/lib/calculations/cotizacion-independientes";
import { calculatePropinaLegal, propinaLegalToResults } from "@/lib/calculations/propina-legal";
import { calculateGastosComunes, gastosComunesToResults } from "@/lib/calculations/gastos-comunes";
import { calculateConversorDivisas, conversorDivisasToResults } from "@/lib/calculations/conversor-divisas";
import { calculateAguinaldo, aguinaldoToResults } from "@/lib/calculations/aguinaldo";
import { calculatePGU, pguToResults } from "@/lib/calculations/pgu";
import { UF, UTM, INGRESO_MINIMO, IVA } from "@/lib/values/constants";
import { formatCLP, formatUF } from "@/lib/formatters";
import { useValues } from "@/lib/context/ValuesContext";

interface CalculatorPageClientProps {
  calculator: import("@/types/calculator").Calculator;
  canonicalUrl?: string;
}

// Mapa de funciones de cálculo por ID de calculadora
const calculationFunctions: Record<string, (inputs: Record<string, unknown>) => CalculatorResult[]> = {
  "sueldo-liquido": (inputs) => {
    const result = calculateSueldoLiquido({
      sueldoBruto: inputs.sueldoBruto as number,
      afp: inputs.afp as "capital" | "cuprum" | "habitat" | "modelo" | "planvital" | "provida" | "uno",
      saludTipo: inputs.saludTipo as "fonasa" | "isapre",
    });
    return sueldoLiquidoToResults(result);
  },
  finiquito: (inputs) => {
    const result = calculateFiniquito({
      ultimoSueldo: inputs.ultimoSueldo as number,
      añosTrabajados: inputs.añosTrabajados as number,
      mesesTrabajados: inputs.mesesTrabajados as number | undefined,
      diasVacacionesPendientes: inputs.diasVacacionesPendientes as number | undefined,
      causaTermino: inputs.causaTermino as "renuncia" | "despido" | "mutuo_acuerdo" | "necesidades_empresa" | "incumplimiento" | "vencimiento_plazo" | "obra_faena" | "caso_fortuito" | "muerte_trabajador" | "jubilacion",
      tieneGratificacion: inputs.tieneGratificacion as boolean | undefined,
      horasExtraPromedio: inputs.horasExtraPromedio as number | undefined,
      bonosHabituales: inputs.bonosHabituales as number | undefined,
      diasTrabajadosUltimoMes: inputs.diasTrabajadosUltimoMes as number | undefined,
      sueldoBase: inputs.sueldoBase as number | undefined,
    });
    return finiquitoToResults(result);
  },
  "uf-clp": (inputs) => {
    const result = calculateUFCLP({
      monto: inputs.monto as number,
      direccion: inputs.direccion as "uf-a-clp" | "clp-a-uf",
    });
    return ufclpToResults(result);
  },
  iva: (inputs) => {
    const result = calculateIVA({
      monto: inputs.monto as number,
      tipo: inputs.tipo as "agregar-iva" | "quitar-iva",
    });
    return ivaToResults(result);
  },
  // Nuevas calculadoras FASE 1
  "utm-clp": (inputs) => {
    const result = calculateUTMCLP({
      monto: inputs.monto as number,
      direccion: inputs.direccion as "utm-a-clp" | "clp-a-utm",
    });
    return utmClpToResults(result);
  },
  "gratificacion-legal": (inputs) => {
    const result = calculateGratificacion({
      sueldoBruto: inputs.sueldoBruto as number,
      mesesTrabajados: inputs.mesesTrabajados as number,
      tipoGratificacion: inputs.tipoGratificacion as "mensual" | "anual",
    });
    return gratificacionToResults(result);
  },
  "indemnizacion-anos-servicio": (inputs) => {
    const result = calculateIndemnizacion({
      ultimoSueldo: inputs.ultimoSueldo as number,
      añosTrabajados: inputs.añosTrabajados as number,
      incluyeGratificacion: inputs.incluyeGratificacion as boolean,
      gratificacionMensual: inputs.gratificacionMensual as number | undefined,
    });
    return indemnizacionToResults(result);
  },
  "pension-alimenticia": (inputs) => {
    const result = calculatePensionAlimenticia({
      sueldoBruto: inputs.sueldoBruto as number,
      numeroHijos: inputs.numeroHijos as number,
      tieneOtroIngreso: inputs.tieneOtroIngreso as boolean,
      otroIngreso: inputs.otroIngreso as number | undefined,
    });
    return pensionAlimenticiaToResults(result);
  },
  "reajuste-arriendo": (inputs) => {
    const result = calculateReajusteArriendo({
      arriendoActual: inputs.arriendoActual as number,
      arriendoEnUF: inputs.arriendoEnUF as boolean,
      variacionIPC: inputs.variacionIPC as number,
      mesesDesdeUltimoReajuste: inputs.mesesDesdeUltimoReajuste as number,
    });
    return reajusteArriendoToResults(result);
  },
  "permiso-circulacion": (inputs) => {
    const result = calculatePermisoCirculacion({
      valorVehiculo: inputs.valorVehiculo as number,
      tipoVehiculo: inputs.tipoVehiculo as "automovil" | "motocicleta" | "carga" | "bus" | "taxi" | "camion",
      antiguedadVehiculo: inputs.antiguedadVehiculo as number,
      esZonaCarga: inputs.esZonaCarga as boolean,
      esPrimeraVez: inputs.esPrimeraVez as boolean,
    });
    return permisoCirculacionToResults(result);
  },
  "costo-empleado-pyme": (inputs) => {
    const result = calculateCostoEmpleado({
      sueldoBruto: inputs.sueldoBruto as number,
      afp: inputs.afp as keyof typeof import("@/lib/values/constants").AFP,
      saludTipo: inputs.saludTipo as "fonasa" | "isapre",
      contratoIndefinido: inputs.contratoIndefinido as boolean,
      gratificacionIncluida: inputs.gratificacionIncluida as boolean,
      horasExtra: (inputs.horasExtra as number) || 0,
      montoHorasExtra: 0,
    });
    return costoEmpleadoToResults(result);
  },
  "horas-extra": (inputs) => {
    const result = calculateHorasExtra({
      sueldoBruto: inputs.sueldoBruto as number,
      horasExtra: inputs.horasExtra as number,
      esDomingoFestivo: inputs.esDomingo as boolean,
    });
    return horasExtraToResults(result);
  },
  "vacaciones-proporcionales": (inputs) => {
    const result = calculateVacaciones({
      sueldoBruto: inputs.sueldoBruto as number,
      mesesTrabajados: inputs.mesesTrabajados as number,
      diasVacacionesPendientes: inputs.diasNoTomados as number,
    });
    return vacacionesToResults(result);
  },
  "boleta-honorarios": (inputs) => {
    const result = calculateBoletaHonorarios({
      montoBruto: inputs.montoBruto as number,
    });
    return boletaHonorariosToResults(result);
  },
  "credito-hipotecario": (inputs) => {
    const result = calculateCreditoHipotecario({
      montoUF: inputs.montoUF as number,
      plazoAnos: inputs.plazoAnos as number,
      tasaAnual: inputs.tasaAnual as number,
      pieUF: inputs.pieUF as number | undefined,
    });
    return creditoHipotecarioToResults(result);
  },
  "operacion-renta": (inputs) => {
    const result = calculateOperacionRenta({
      ingresosAnuales: inputs.ingresosAnuales as number,
      gastosAnuales: inputs.gastosAnuales as number,
      cotizacionesObligatorias: inputs.cotizacionesObligatorias as number,
      ahorroPrevisional: inputs.ahorroPrevisional as number | undefined,
    });
    return operacionRentaToResults(result);
  },
  contribuciones: (inputs) => {
    const result = calculateContribuciones({
      avaluoFiscal: inputs.avaluoFiscal as number,
      destino: inputs.destino as "habitacional" | "comercial" | "industrial" | "sitio_eriado" | "agrario",
    });
    return contribucionesToResults(result);
  },
  "costo-notaria": (inputs) => {
    const result = calculateCostoNotaria({
      valorPropiedad: inputs.valorPropiedad as number,
      tipo: inputs.tipo as "compraventa" | "hipoteca" | "donacion" | "testamento",
      notariaAdicional: inputs.notariaAdicional as boolean | undefined,
    });
    return costoNotariaToResults(result);
  },
  plusvalia: (inputs) => {
    const result = calculatePlusvalia({
      precioCompra: inputs.precioCompra as number,
      precioVenta: inputs.precioVenta as number,
      anosTenencia: inputs.anosTenencia as number,
      mejoras: inputs.mejoras as number | undefined,
      esViviendaHabitual: inputs.esViviendaHabitual as boolean | undefined,
    });
    return plusvaliaToResults(result);
  },
  "subsidio-habitacional": (inputs) => {
    const result = calculateSubsidioHabitacional({
      valorPropiedad: inputs.valorPropiedad as number,
      ahorro: inputs.ahorro as number,
      tipoSubsidio: inputs.tipoSubsidio as "ds49" | "ds01",
      tramo: inputs.tramo as "tramo1" | "tramo2",
    });
    return subsidioHabitacionalToResults(result);
  },
  "patente-comercial": (inputs) => {
    const result = calculatePatenteComercial({
      capitalInvertido: inputs.capitalInvertido as number,
      actividad: inputs.actividad as "comercio" | "industria" | "servicios" | "transporte",
      comuna: inputs.comuna as "santiago" | "providencia" | "las_condes" | "otra",
    });
    return patenteComercialToResults(result);
  },
  "comparador-afp": (inputs) => {
    const result = calculateComparadorAFP({
      sueldoBruto: inputs.sueldoBruto as number,
      afpActual: inputs.afpActual as keyof typeof import("@/lib/values/constants").AFP,
      anosPension: inputs.anosPension as number,
    });
    return comparadorAFPToResults(result);
  },
  "simulador-apv": (inputs) => {
    const result = calculateSimuladorAPV({
      sueldoBruto: inputs.sueldoBruto as number,
      montoMensualAPV: inputs.montoMensualAPV as number,
      rentabilidadAnual: inputs.rentabilidadAnual as number,
      anosAhorro: inputs.anosAhorro as number,
    });
    return simuladorAPVToResults(result);
  },
  "intereses-mora": (inputs) => {
    const result = calculateInteresesMora({
      montoDeuda: inputs.montoDeuda as number,
      diasMora: inputs.diasMora as number,
      fechaInicio: inputs.fechaInicio as string | undefined,
    });
    return interesesMoraToResults(result);
  },
  "asignacion-familiar": (inputs) => {
    const result = calculateAsignacionFamiliar({
      sueldoBruto: inputs.sueldoBruto as number,
      numeroHijos: inputs.numeroHijos as number,
      tramo: inputs.tramo as "a" | "b" | "c" | undefined,
    });
    return asignacionFamiliarToResults(result);
  },
  "credito-cae": (inputs) => {
    const result = calculateCreditoCAE({
      montoCredito: inputs.montoCredito as number,
      tasaAnual: inputs.tasaAnual as number,
      plazoMeses: inputs.plazoMeses as number,
      tieneGarantiaEstatal: inputs.tieneGarantiaEstatal as boolean,
    });
    return creditoCAEToResults(result);
  },
  "credito-automotriz": (inputs) => {
    const result = calculateCreditoAutomotriz({
      valorVehiculo: inputs.valorVehiculo as number,
      pie: inputs.pie as number,
      tasaAnual: inputs.tasaAnual as number,
      plazoMeses: inputs.plazoMeses as number,
      incluyeSeguro: inputs.incluyeSeguro as boolean | undefined,
    });
    return creditoAutomotrizToResults(result);
  },
  "multas-transito": (inputs) => {
    const result = calculateMultasTransito({
      tipoMulta: inputs.tipoMulta as "leve" | "menos_grave" | "grave" | "gravisima",
      cantidadMultas: inputs.cantidadMultas as number | undefined,
    });
    return multasTransitoToResults(result);
  },
  "costo-tag": (inputs) => {
    const result = calculateCostoTag({
      peajes: inputs.peajes as "santiago_rancagua" | "santiago_valparaiso" | "santiago_los_andes" | "santiago_san_fernando" | "urbano_santiago",
      viajesMes: inputs.viajesMes as number,
      tieneConvenio: inputs.tieneConvenio as boolean | undefined,
    });
    return costoTagToResults(result);
  },
  "cuenta-luz": (inputs) => {
    const result = calculateCuentaLuz({
      consumoKWH: inputs.consumoKWH as number,
      tipoTarifa: inputs.tipoTarifa as "bt1_residencial" | "bt1_comercial" | "bt1_industrial" | undefined,
      zona: inputs.zona as "norte" | "central" | "sur" | undefined,
    });
    return cuentaLuzToResults(result);
  },
  "impuesto-segunda-categoria": (inputs) => {
    const result = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: inputs.sueldoBrutoMensual as number,
      mesesTrabajados: inputs.mesesTrabajados as number | undefined,
    });
    return impuestoSegundaCategoriaToResults(result);
  },
  ppm: (inputs) => {
    const result = calculatePPM({
      ingresosBrutosAnuales: inputs.ingresosBrutosAnuales as number,
      gastosPresuntos: inputs.gastosPresuntos as number | undefined,
      actividad: inputs.actividad as "profesional" | "comercio" | "transporte" | "construccion",
    });
    return ppmToResults(result);
  },
  "bono-bodas-oro": (inputs) => {
    const result = calculateBonoBodasOro({
      anosTrabajados: inputs.anosTrabajados as number,
      esPublico: inputs.esPublico as boolean,
      sueldoBruto: inputs.sueldoBruto as number,
    });
    return bonoBodasOroToResults(result);
  },
  "subsidio-agua": (inputs) => {
    const result = calculateSubsidioAgua({
      consumoM3: inputs.consumoM3 as number,
      numeroPersonas: inputs.numeroPersonas as number,
      tramo: inputs.tramo as "tramo1" | "tramo2",
    });
    return subsidioAguaToResults(result);
  },
  "cotizacion-independientes": (inputs) => {
    const result = calculateCotizacionIndependientes({
      rentaBrutaMensual: inputs.rentaBrutaMensual as number,
      afp: inputs.afp as keyof typeof import("@/lib/values/constants").AFP,
      salud: inputs.salud as "fonasa" | "isapre",
    });
    return cotizacionIndependientesToResults(result);
  },
  "propina-legal": (inputs) => {
    const result = calculatePropinaLegal({
      montoConsumo: inputs.montoConsumo as number,
      incluyePropina: inputs.incluyePropina as boolean,
      porcentajePropina: inputs.porcentajePropina as number | undefined,
    });
    return propinaLegalToResults(result);
  },
  "gastos-comunes": (inputs) => {
    const result = calculateGastosComunes({
      superficieM2: inputs.superficieM2 as number,
      valorM2: inputs.valorM2 as number | undefined,
      incluyeEstacionamiento: inputs.incluyeEstacionamiento as boolean | undefined,
      estacionamientos: inputs.estacionamientos as number | undefined,
      tienePiscina: inputs.tienePiscina as boolean | undefined,
      tieneGimnasio: inputs.tieneGimnasio as boolean | undefined,
      tieneConserje: inputs.tieneConserje as boolean | undefined,
    });
    return gastosComunesToResults(result);
  },
  "conversor-divisas": (inputs) => {
    const result = calculateConversorDivisas({
      monto: inputs.monto as number,
      moneda: inputs.moneda as "usd" | "eur",
      direccion: inputs.direccion as "a_clp" | "desde_clp",
    });
    return conversorDivisasToResults(result);
  },
  aguinaldo: (inputs) => {
    const result = calculateAguinaldo({
      tipo: inputs.tipo as "fiestas_patrias" | "navidad" | "escolar",
      sueldoBruto: inputs.sueldoBruto as number,
      mesesTrabajados: inputs.mesesTrabajados as number,
    });
    return aguinaldoToResults(result);
  },
  pgu: (inputs) => {
    const result = calculatePGU({
      pensionActual: inputs.pensionActual as number,
      anosCotizados: inputs.anosCotizados as number,
      esHombre: inputs.esHombre as boolean,
    });
    return pguToResults(result);
  },
};

export default function CalculatorPageClient({ calculator, canonicalUrl }: CalculatorPageClientProps) {
  const calculateFn = calculationFunctions[calculator.id];

  if (!calculateFn) {
    return (
      <div className="min-h-screen bg-[var(--background)] py-12">
        {/* SEO Schema */}
        {canonicalUrl && <SeoStructuredData calculator={calculator} url={canonicalUrl} />}
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-[var(--color-warning-50)] dark:bg-[var(--color-warning-50)] border border-[var(--color-warning-200)] rounded-2xl p-8 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-warning-100)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--color-warning-600)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">Calculadora en desarrollo</h2>
            <p className="text-[var(--foreground-secondary)]">Esta calculadora estará disponible próximamente.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CalculatorPageLayout
      title={calculator.name}
      description={calculator.description}
      calculatorId={calculator.id}
    >
      {/* SEO Schema */}
      {canonicalUrl && <SeoStructuredData calculator={calculator} url={canonicalUrl} />}
      
      <PremiumCalculatorShell calculator={calculator} calculateFn={calculateFn} />

      {/* SEO Content y FAQ */}
      <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sección de instrucciones */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-7">
          <h2 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-[var(--foreground)] mb-4">
            <svg
              className="w-5 h-5 text-[var(--color-primary-500)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            ¿Cómo usar la calculadora de {calculator.name.toLowerCase()}?
          </h2>
          <p className="text-sm md:text-base text-[var(--foreground-secondary)] leading-relaxed">
            Ingresa los datos solicitados arriba y los resultados se mostrarán
            automáticamente, sin necesidad de hacer clic en ningún botón. Todos los
            cálculos utilizan valores oficiales actualizados a 2026.
          </p>
          <LiveValuesSection />
        </section>

        {/* FAQ */}
        {calculator.faq && calculator.faq.length > 0 && (
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-7">
            <h2 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-[var(--foreground)] mb-4">
              <svg
                className="w-5 h-5 text-[var(--color-primary-500)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Preguntas frecuentes
            </h2>
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
              {calculator.faq.slice(0, 5).map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0"
                >
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
            {calculator.faq.length > 5 && (
              <details className="mt-4 pt-4 border-t border-[var(--border)]">
                <summary className="cursor-pointer text-sm font-medium text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] hover:text-[var(--color-primary-700)]">
                  Ver más preguntas ({calculator.faq.length - 5})
                </summary>
                <div className="mt-4 space-y-4">
                  {calculator.faq.slice(5).map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0"
                    >
                      <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </section>
        )}
      </div>
    </CalculatorPageLayout>
  );
}
