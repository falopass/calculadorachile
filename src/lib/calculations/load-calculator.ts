// ============================================
// Registry de carga perezosa de calculadoras
// --------------------------------------------
// Cada id del catálogo importa SOLO su módulo de cálculo.
// Los adapters (catálogo UI → motor) viven aquí para no inflar
// el client con 39 imports estáticos.
// ============================================

import type { CalculatorResult } from '@/types/calculator';
import { coerceBool, coerceNumber } from './input-coerce';

export type CalculateFn = (inputs: Record<string, unknown>) => CalculatorResult[];

/** Valores económicos opcionales inyectados desde la UI (UF/UTM en vivo). */
export type LiveCalculationValues = {
  valorUF?: number;
  valorUTM?: number;
};

/**
 * Carga el adaptador de cálculo para un `calculator.id` del catálogo.
 * Devuelve null si el id no está cableado (no debería ocurrir en prod).
 */
export async function loadCalculationFn(
  id: string,
  live?: LiveCalculationValues,
): Promise<CalculateFn | null> {
  switch (id) {
    case 'sueldo-liquido': {
      const { calculateSueldoLiquido, sueldoLiquidoToResults } = await import('./sueldo-liquido');
      return (inputs) => {
        const result = calculateSueldoLiquido({
          sueldoBruto: coerceNumber(inputs.sueldoBruto),
          afp: inputs.afp as 'capital' | 'cuprum' | 'habitat' | 'modelo' | 'planvital' | 'provida' | 'uno',
          saludTipo: inputs.saludTipo as 'fonasa' | 'isapre',
          isapreMonto: coerceNumber(inputs.isapreMonto, 0),
          contratoIndefinido: inputs.contratoIndefinido !== false && inputs.contratoIndefinido !== 'false',
          bonoMovilizacion: coerceNumber(inputs.bonoMovilizacion, 0),
          bonoColacion: coerceNumber(inputs.bonoColacion, 0),
          bonoPerdidaCaja: coerceNumber(inputs.bonoPerdidaCaja, 0),
          comisiones: coerceNumber(inputs.comisiones, 0),
          asignacionFamiliar: coerceNumber(inputs.asignacionFamiliar, 0),
          prestamoEmpleador: coerceNumber(inputs.prestamoEmpleador, 0),
          descuentoSindical: coerceNumber(inputs.descuentoSindical, 0),
          descuentoCajaCompensacion: coerceNumber(inputs.descuentoCajaCompensacion, 0),
          calculoInverso: coerceBool(inputs.calculoInverso),
          valorUF: live?.valorUF,
        });
        return sueldoLiquidoToResults(result);
      };
    }

    case 'finiquito': {
      const { calculateFiniquito, finiquitoToResults } = await import('./finiquito');
      return (inputs) => {
        let recargo = coerceNumber(inputs.recargoArt168Pct, 0) as 0 | 30 | 50 | 80 | 100;
        if (
          !inputs.recargoArt168Pct &&
          (inputs.tieneMulta168 === true || inputs.tieneMulta168 === 'true')
        ) {
          recargo = 50;
        }
        if (![0, 30, 50, 80, 100].includes(recargo)) recargo = 0;

        const result = calculateFiniquito({
          ultimoSueldo: coerceNumber(inputs.ultimoSueldo),
          añosTrabajados: coerceNumber(inputs.añosTrabajados),
          mesesTrabajados: coerceNumber(inputs.mesesTrabajados, 0),
          diasVacacionesPendientes: coerceNumber(inputs.diasVacacionesPendientes, 0),
          causaTermino: inputs.causaTermino as
            | 'renuncia'
            | 'despido'
            | 'mutuo_acuerdo'
            | 'necesidades_empresa'
            | 'incumplimiento'
            | 'vencimiento_plazo'
            | 'obra_faena'
            | 'caso_fortuito'
            | 'muerte_trabajador'
            | 'jubilacion',
          tieneGratificacion:
            inputs.tieneGratificacion !== false && inputs.tieneGratificacion !== 'false',
          horasExtraPromedio: coerceNumber(inputs.horasExtraPromedio, 0),
          bonosHabituales: coerceNumber(inputs.bonosHabituales, 0),
          diasTrabajadosUltimoMes: coerceNumber(inputs.diasTrabajadosUltimoMes, 0),
          sueldoBase: coerceNumber(inputs.sueldoBase, 0) || undefined,
          incluyeAvisoPrevio: coerceBool(inputs.incluyeAvisoPrevio),
          recargoArt168Pct: recargo,
          vacacionesAniosAnteriores: coerceNumber(inputs.vacacionesAniosAnteriores, 0),
          sueldoPromedio: coerceNumber(inputs.sueldoPromedio, 0),
          diasAdicionalesConvenio: coerceNumber(inputs.diasAdicionalesConvenio, 0),
        });
        return finiquitoToResults(result);
      };
    }

    case 'uf-clp': {
      const { calculateUFCLP, ufclpToResults } = await import('./uf-clp');
      return (inputs) => {
        const result = calculateUFCLP({
          monto: coerceNumber(inputs.monto),
          direccion: inputs.direccion as 'uf-a-clp' | 'clp-a-uf',
          valorUF: live?.valorUF,
        });
        return ufclpToResults(result);
      };
    }

    case 'iva': {
      const { calculateIVA, ivaToResults } = await import('./iva');
      return (inputs) => {
        const result = calculateIVA({
          monto: coerceNumber(inputs.monto),
          tipo: inputs.tipo as 'agregar-iva' | 'quitar-iva',
        });
        return ivaToResults(result);
      };
    }

    case 'utm-clp': {
      const { calculateUTMCLP, utmClpToResults } = await import('./utm-clp');
      return (inputs) => {
        const result = calculateUTMCLP({
          monto: coerceNumber(inputs.monto),
          direccion: inputs.direccion as 'utm-a-clp' | 'clp-a-utm',
          valorUTM: live?.valorUTM,
        });
        return utmClpToResults(result);
      };
    }

    case 'gratificacion-legal': {
      const { calculateGratificacion, gratificacionToResults } = await import('./gratificacion');
      return (inputs) => {
        const result = calculateGratificacion({
          sueldoBruto: coerceNumber(inputs.sueldoBruto),
          mesesTrabajados: coerceNumber(inputs.mesesTrabajados),
          tipoGratificacion: inputs.tipoGratificacion as 'mensual' | 'anual',
        });
        return gratificacionToResults(result);
      };
    }

    case 'indemnizacion-anos-servicio': {
      const { calculateIndemnizacion, indemnizacionToResults } = await import('./indemnizacion');
      return (inputs) => {
        const result = calculateIndemnizacion({
          ultimoSueldo: coerceNumber(inputs.ultimoSueldo),
          añosTrabajados: coerceNumber(inputs.añosTrabajados),
          incluyeGratificacion: coerceBool(inputs.incluyeGratificacion),
          gratificacionMensual: coerceNumber(inputs.gratificacionMensual, 0) || undefined,
        });
        return indemnizacionToResults(result);
      };
    }

    case 'pension-alimenticia': {
      const { calculatePensionAlimenticia, pensionAlimenticiaToResults } =
        await import('./pension-alimenticia');
      return (inputs) => {
        const result = calculatePensionAlimenticia({
          sueldoBruto: coerceNumber(inputs.sueldoBruto),
          numeroHijos: coerceNumber(inputs.numeroHijos),
          tieneOtroIngreso: coerceBool(inputs.tieneOtroIngreso),
          otroIngreso: coerceNumber(inputs.otroIngreso, 0) || undefined,
        });
        return pensionAlimenticiaToResults(result);
      };
    }

    case 'reajuste-arriendo': {
      const { calculateReajusteArriendo, reajusteArriendoToResults } =
        await import('./reajuste-arriendo');
      return (inputs) => {
        const result = calculateReajusteArriendo({
          arriendoActual: coerceNumber(inputs.arriendoActual),
          arriendoEnUF: coerceBool(inputs.arriendoEnUF),
          variacionIPC: coerceNumber(inputs.variacionIPC),
          mesesDesdeUltimoReajuste: coerceNumber(inputs.mesesDesdeUltimoReajuste),
        });
        return reajusteArriendoToResults(result);
      };
    }

    case 'permiso-circulacion': {
      const { calculatePermisoCirculacion, permisoCirculacionToResults } =
        await import('./permiso-circulacion');
      return (inputs) => {
        const result = calculatePermisoCirculacion({
          valorVehiculo: coerceNumber(inputs.valorVehiculo),
          tipoVehiculo: inputs.tipoVehiculo as
            | 'automovil'
            | 'motocicleta'
            | 'carga'
            | 'bus'
            | 'taxi'
            | 'camion',
          antiguedadVehiculo: coerceNumber(inputs.antiguedadVehiculo),
          esZonaCarga: coerceBool(inputs.esZonaCarga),
          esPrimeraVez: coerceBool(inputs.esPrimeraVez),
          mesesRestantes: coerceNumber(inputs.mesesRestantes, 12) || 12,
          valorUTM: live?.valorUTM,
        });
        return permisoCirculacionToResults(result);
      };
    }

    case 'costo-empleado-pyme': {
      const { calculateCostoEmpleado, costoEmpleadoToResults } = await import('./costo-empleado');
      return (inputs) => {
        const result = calculateCostoEmpleado({
          sueldoBruto: coerceNumber(inputs.sueldoBruto),
          afp: inputs.afp as keyof typeof import('@/lib/values/constants').AFP,
          saludTipo: inputs.saludTipo as 'fonasa' | 'isapre',
          contratoIndefinido: coerceBool(inputs.contratoIndefinido, true),
          gratificacionIncluida: coerceBool(inputs.gratificacionIncluida),
          horasExtra: coerceNumber(inputs.horasExtra, 0),
          montoHorasExtra: 0,
        });
        return costoEmpleadoToResults(result);
      };
    }

    case 'horas-extra': {
      const { calculateHorasExtra, horasExtraToResults } = await import('./horas-extra');
      return (inputs) => {
        const j = coerceNumber(inputs.jornadaSemanal, 42);
        const jornadaSemanal = ([40, 42, 44, 45].includes(j) ? j : 42) as 40 | 42 | 44 | 45;
        const recargoRaw = inputs.recargoPersonalizado;
        const recargoPersonalizado =
          recargoRaw === undefined || recargoRaw === '' || recargoRaw === null
            ? undefined
            : coerceNumber(recargoRaw);
        const result = calculateHorasExtra({
          sueldoBruto: coerceNumber(inputs.sueldoBruto),
          horasExtra: coerceNumber(inputs.horasExtra),
          esDomingoFestivo: coerceBool(inputs.esDomingo),
          jornadaSemanal,
          recargoPersonalizado,
          sueldoVariable: coerceBool(inputs.sueldoVariable),
          sueldoPromedio3Meses: coerceNumber(inputs.sueldoPromedio3Meses, 0),
          horasExtraFestivos: coerceNumber(inputs.horasExtraFestivos, 0),
          calcularImpactoCotizaciones: coerceBool(inputs.calcularImpactoCotizaciones),
          mostrarTopeLegal: coerceBool(inputs.mostrarTopeLegal),
        });
        return horasExtraToResults(result);
      };
    }

    case 'vacaciones-proporcionales': {
      const { calculateVacaciones, vacacionesToResults } = await import('./vacaciones');
      return (inputs) => {
        const result = calculateVacaciones({
          sueldoBruto: coerceNumber(inputs.sueldoBruto),
          mesesTrabajados: coerceNumber(inputs.mesesTrabajados),
          diasVacacionesPendientes: coerceNumber(inputs.diasNoTomados),
        });
        return vacacionesToResults(result);
      };
    }

    case 'boleta-honorarios': {
      const { calculateBoletaHonorarios, boletaHonorariosToResults } =
        await import('./boleta-honorarios');
      return (inputs) => {
        const anoNum = coerceNumber(inputs.ano, 2026);
        const result = calculateBoletaHonorarios({
          montoBruto: coerceNumber(inputs.montoBruto),
          ano: (
            anoNum === 2025 || anoNum === 2026 || anoNum === 2027 || anoNum === 2028
              ? anoNum
              : 2026
          ) as 2025 | 2026 | 2027 | 2028,
          desgloseCotizaciones: coerceBool(inputs.incluyeCotizaciones),
          moneda: inputs.moneda === 'UF' ? 'UF' : 'CLP',
          calcularPPM: coerceBool(inputs.calcularPPM),
          calcularCostoEmpleador: coerceBool(inputs.calcularCostoEmpleador),
          valorUF: live?.valorUF,
          valorUTM: live?.valorUTM,
        });
        return boletaHonorariosToResults(result);
      };
    }

    case 'credito-hipotecario': {
      const { calculateCreditoHipotecario, creditoHipotecarioToResults } =
        await import('./credito-hipotecario');
      return (inputs) => {
        const result = calculateCreditoHipotecario({
          montoUF: coerceNumber(inputs.montoUF),
          plazoAnos: coerceNumber(inputs.plazoAnos),
          tasaAnual: coerceNumber(inputs.tasaAnual),
          pieUF: coerceNumber(inputs.pieUF, 0),
          ingresoMensual: coerceNumber(inputs.ingresoMensual, 0) || undefined,
          incluyeSeguroDesgravamen: coerceBool(inputs.incluyeSeguroDesgravamen),
          incluyeSeguroIncendio: coerceBool(inputs.incluyeSeguroIncendio),
          incluyeComisionAdministracion: coerceBool(inputs.incluyeComisionAdministracion),
          calcularTablaAmortizacion: coerceBool(inputs.calcularTablaAmortizacion),
          calcularCAE: coerceBool(inputs.calcularCAE),
          calcularGastosNotariales: coerceBool(inputs.calcularGastosNotariales),
          simularPrepago: coerceBool(inputs.simularPrepago),
          montoPrepago: coerceNumber(inputs.montoPrepago, 0),
          valorUF: live?.valorUF,
        });
        return creditoHipotecarioToResults(result);
      };
    }

    case 'operacion-renta': {
      const { calculateOperacionRenta, operacionRentaToResults } = await import('./operacion-renta');
      return (inputs) => {
        const result = calculateOperacionRenta({
          ingresosAnuales: coerceNumber(inputs.ingresosAnuales),
          gastosAnuales: coerceNumber(inputs.gastosAnuales),
          cotizacionesObligatorias: coerceNumber(inputs.cotizacionesObligatorias),
          ahorroPrevisional: coerceNumber(inputs.ahorroPrevisional, 0) || undefined,
        });
        return operacionRentaToResults(result);
      };
    }

    case 'contribuciones': {
      const { calculateContribuciones, contribucionesToResults } = await import('./contribuciones');
      return (inputs) => {
        const result = calculateContribuciones({
          avaluoFiscal: coerceNumber(inputs.avaluoFiscal),
          destino: inputs.destino as
            | 'habitacional'
            | 'comercial'
            | 'industrial'
            | 'sitio_eriado'
            | 'agrario',
        });
        return contribucionesToResults(result);
      };
    }

    case 'costo-notaria': {
      const { calculateCostoNotaria, costoNotariaToResults } = await import('./costo-notaria');
      return (inputs) => {
        const result = calculateCostoNotaria({
          valorPropiedad: coerceNumber(inputs.valorPropiedad),
          tipo: inputs.tipo as 'compraventa' | 'hipoteca' | 'donacion' | 'testamento',
          notariaAdicional: coerceBool(inputs.notariaAdicional) || undefined,
        });
        return costoNotariaToResults(result);
      };
    }

    case 'plusvalia': {
      const { calculatePlusvalia, plusvaliaToResults } = await import('./plusvalia');
      return (inputs) => {
        const result = calculatePlusvalia({
          precioCompra: coerceNumber(inputs.precioCompra),
          precioVenta: coerceNumber(inputs.precioVenta),
          anosTenencia: coerceNumber(inputs.anosTenencia),
          mejoras: coerceNumber(inputs.mejoras, 0) || undefined,
          esViviendaHabitual: coerceBool(inputs.esViviendaHabitual) || undefined,
        });
        return plusvaliaToResults(result);
      };
    }

    case 'subsidio-habitacional': {
      const { calculateSubsidioHabitacional, subsidioHabitacionalToResults } =
        await import('./subsidio-habitacional');
      return (inputs) => {
        const result = calculateSubsidioHabitacional({
          valorPropiedadUF: coerceNumber(inputs.valorPropiedad),
          ahorroUF: coerceNumber(inputs.ahorro),
          tipoSubsidio: inputs.tipoSubsidio as 'ds49' | 'ds01' | 'ds19' | undefined,
          tramo: (inputs.tramo as 'tramo1' | 'tramo2' | 'tramo3') || 'tramo1',
          esZonaExtrema: coerceBool(inputs.esZonaExtrema),
        });
        return subsidioHabitacionalToResults(result);
      };
    }

    case 'patente-comercial': {
      const { calculatePatenteComercial, patenteComercialToResults } =
        await import('./patente-comercial');
      return (inputs) => {
        const result = calculatePatenteComercial({
          capitalInvertido: coerceNumber(inputs.capitalInvertido),
          actividad: inputs.actividad as 'comercio' | 'industria' | 'servicios' | 'transporte',
          comuna: inputs.comuna as 'santiago' | 'providencia' | 'las_condes' | 'otra',
        });
        return patenteComercialToResults(result);
      };
    }

    case 'comparador-afp': {
      const { calculateComparadorAFP, comparadorAFPToResults } = await import('./comparador-afp');
      return (inputs) => {
        const result = calculateComparadorAFP({
          sueldoBruto: coerceNumber(inputs.sueldoBruto),
          afpActual: inputs.afpActual as keyof typeof import('@/lib/values/constants').AFP,
          anosPension: coerceNumber(inputs.anosPension),
        });
        return comparadorAFPToResults(result);
      };
    }

    case 'simulador-apv': {
      const { calculateSimuladorAPV, simuladorAPVToResults } = await import('./simulador-apv');
      return (inputs) => {
        const result = calculateSimuladorAPV({
          sueldoBruto: coerceNumber(inputs.sueldoBruto),
          montoMensualAPV: coerceNumber(inputs.montoMensualAPV),
          rentabilidadAnual: coerceNumber(inputs.rentabilidadAnual),
          anosAhorro: coerceNumber(inputs.anosAhorro),
        });
        return simuladorAPVToResults(result);
      };
    }

    case 'intereses-mora': {
      const { calculateInteresesMora, interesesMoraToResults } = await import('./intereses-mora');
      return (inputs) => {
        const result = calculateInteresesMora({
          montoDeuda: coerceNumber(inputs.montoDeuda),
          diasMora: coerceNumber(inputs.diasMora),
          fechaInicio: typeof inputs.fechaInicio === 'string' ? inputs.fechaInicio : undefined,
        });
        return interesesMoraToResults(result);
      };
    }

    case 'asignacion-familiar': {
      const { calculateAsignacionFamiliar, asignacionFamiliarToResults } =
        await import('./asignacion-familiar');
      return (inputs) => {
        const result = calculateAsignacionFamiliar({
          sueldoBruto: coerceNumber(inputs.sueldoBruto),
          numeroHijos: coerceNumber(inputs.numeroHijos),
          tramo: inputs.tramo as 'a' | 'b' | 'c' | undefined,
        });
        return asignacionFamiliarToResults(result);
      };
    }

    case 'credito-cae': {
      const { calculateCreditoCAE, creditoCAEToResults } = await import('./credito-cae');
      return (inputs) => {
        const result = calculateCreditoCAE({
          montoCredito: coerceNumber(inputs.montoCredito),
          tasaAnual: coerceNumber(inputs.tasaAnual, 2),
          plazoMeses: coerceNumber(inputs.plazoMeses),
          tieneGarantiaEstatal: coerceBool(inputs.tieneGarantiaEstatal, true),
          mesesGracia: coerceNumber(inputs.mesesGracia, 0),
          ingresoMensualBruto: coerceNumber(inputs.ingresoMensualBruto, 0),
          valorUF: live?.valorUF,
        });
        return creditoCAEToResults(result);
      };
    }

    case 'credito-automotriz': {
      const { calculateCreditoAutomotriz, creditoAutomotrizToResults } =
        await import('./credito-automotriz');
      return (inputs) => {
        const result = calculateCreditoAutomotriz({
          valorVehiculo: coerceNumber(inputs.valorVehiculo),
          pie: coerceNumber(inputs.pie),
          tasaAnual: coerceNumber(inputs.tasaAnual),
          plazoMeses: coerceNumber(inputs.plazoMeses),
          incluyeSeguro: coerceBool(inputs.incluyeSeguro) || undefined,
          gastosAsociadosPct:
            coerceNumber(inputs.gastosAsociadosPct, 0) > 0
              ? coerceNumber(inputs.gastosAsociadosPct)
              : undefined,
        });
        return creditoAutomotrizToResults(result);
      };
    }

    case 'multas-transito': {
      const { calculateMultasTransito, multasTransitoToResults } = await import('./multas-transito');
      return (inputs) => {
        const result = calculateMultasTransito({
          tipoMulta: inputs.tipoMulta as import('./multas-transito').TipoMulta,
          cantidadMultas: coerceNumber(inputs.cantidadMultas, 0) || undefined,
          esReincidente: coerceBool(inputs.esReincidente) || undefined,
        });
        return multasTransitoToResults(result);
      };
    }

    case 'costo-tag': {
      const { calculateCostoTag, costoTagToResults } = await import('./costo-tag');
      return (inputs) => {
        const cat = coerceNumber(inputs.categoria, 0);
        const result = calculateCostoTag({
          peajes: inputs.peajes as
            | 'santiago_rancagua'
            | 'santiago_valparaiso'
            | 'santiago_los_andes'
            | 'santiago_san_fernando'
            | 'urbano_santiago',
          viajesMes: coerceNumber(inputs.viajesMes),
          tieneConvenio: coerceBool(inputs.tieneConvenio) || undefined,
          categoria: ([1, 2, 3].includes(cat) ? cat : undefined) as 1 | 2 | 3 | undefined,
        });
        return costoTagToResults(result);
      };
    }

    case 'cuenta-luz': {
      const { calculateCuentaLuz, cuentaLuzToResults } = await import('./cuenta-luz');
      return (inputs) => {
        const result = calculateCuentaLuz({
          consumoKWH: coerceNumber(inputs.consumoKWH),
          tipoTarifa: inputs.tipoTarifa as
            | 'bt1_residencial'
            | 'bt1_comercial'
            | 'bt1_industrial'
            | undefined,
          zona: inputs.zona as 'norte' | 'central' | 'sur' | undefined,
        });
        return cuentaLuzToResults(result);
      };
    }

    case 'impuesto-segunda-categoria': {
      const { calculateImpuestoSegundaCategoria, impuestoSegundaCategoriaToResults } =
        await import('./impuesto-segunda-categoria');
      return (inputs) => {
        const result = calculateImpuestoSegundaCategoria({
          sueldoBrutoMensual: coerceNumber(inputs.sueldoBrutoMensual),
          mesesTrabajados: coerceNumber(inputs.mesesTrabajados, 0) || undefined,
        });
        return impuestoSegundaCategoriaToResults(result);
      };
    }

    case 'ppm': {
      const { calculatePPM, ppmToResults } = await import('./ppm');
      return (inputs) => {
        const result = calculatePPM({
          ingresosBrutosAnuales: coerceNumber(inputs.ingresosBrutosAnuales),
          gastosPresuntos: coerceNumber(inputs.gastosPresuntos, 0) || undefined,
          actividad: inputs.actividad as
            | 'profesional'
            | 'comercio'
            | 'transporte'
            | 'construccion',
        });
        return ppmToResults(result);
      };
    }

    case 'subsidio-agua': {
      const { calculateSubsidioAgua, subsidioAguaToResults } = await import('./subsidio-agua');
      return (inputs) => {
        const result = calculateSubsidioAgua({
          consumoM3: coerceNumber(inputs.consumoM3),
          numeroPersonas: coerceNumber(inputs.numeroPersonas),
          tramo: inputs.tramo as 'tramo1' | 'tramo2',
        });
        return subsidioAguaToResults(result);
      };
    }

    case 'cotizacion-independientes': {
      const { calculateCotizacionIndependientes, cotizacionIndependientesToResults } =
        await import('./cotizacion-independientes');
      return (inputs) => {
        const result = calculateCotizacionIndependientes({
          rentaBrutaMensual: coerceNumber(inputs.rentaBrutaMensual),
          afp: inputs.afp as keyof typeof import('@/lib/values/constants').AFP,
          salud: inputs.salud as 'fonasa' | 'isapre',
        });
        return cotizacionIndependientesToResults(result);
      };
    }

    case 'propina-legal': {
      const { calculatePropinaLegal, propinaLegalToResults } = await import('./propina-legal');
      return (inputs) => {
        const result = calculatePropinaLegal({
          montoConsumo: coerceNumber(inputs.montoConsumo),
          incluyePropina: coerceBool(inputs.incluyePropina),
          porcentajePropina: coerceNumber(inputs.porcentajePropina, 0) || undefined,
        });
        return propinaLegalToResults(result);
      };
    }

    case 'gastos-comunes': {
      const { calculateGastosComunes, gastosComunesToResults } = await import('./gastos-comunes');
      return (inputs) => {
        const result = calculateGastosComunes({
          superficieM2: coerceNumber(inputs.superficieM2),
          valorM2: coerceNumber(inputs.valorM2, 0) || undefined,
          incluyeEstacionamiento: coerceBool(inputs.incluyeEstacionamiento) || undefined,
          estacionamientos: coerceNumber(inputs.estacionamientos, 0) || undefined,
          tienePiscina: coerceBool(inputs.tienePiscina) || undefined,
          tieneGimnasio: coerceBool(inputs.tieneGimnasio) || undefined,
          tieneConserje: coerceBool(inputs.tieneConserje) || undefined,
        });
        return gastosComunesToResults(result);
      };
    }

    case 'conversor-divisas': {
      const { calculateConversorDivisas, conversorDivisasToResults } =
        await import('./conversor-divisas');
      return (inputs) => {
        const result = calculateConversorDivisas({
          monto: coerceNumber(inputs.monto),
          moneda: inputs.moneda as 'usd' | 'eur',
          direccion: inputs.direccion as 'a_clp' | 'desde_clp',
        });
        return conversorDivisasToResults(result);
      };
    }

    case 'aguinaldo': {
      const { calculateAguinaldo, aguinaldoToResults } = await import('./aguinaldo');
      return (inputs) => {
        const result = calculateAguinaldo({
          tipo: inputs.tipo as 'fiestas_patrias' | 'navidad' | 'escolar',
          sueldoBruto: coerceNumber(inputs.sueldoBruto),
          mesesTrabajados: coerceNumber(inputs.mesesTrabajados),
          esSectorPublico: coerceBool(inputs.esSectorPublico) || undefined,
        });
        return aguinaldoToResults(result);
      };
    }

    case 'pgu': {
      const { calculatePGU, pguToResults } = await import('./pgu');
      return (inputs) => {
        const result = calculatePGU({
          pensionActual: coerceNumber(inputs.pensionActual),
          anosCotizados: coerceNumber(inputs.anosCotizados),
          esHombre: coerceBool(inputs.esHombre, true),
          edad: coerceNumber(inputs.edad, 0) || undefined,
        });
        return pguToResults(result);
      };
    }

    default:
      return null;
  }
}
