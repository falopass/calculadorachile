import { describe, it, expect } from 'vitest';
import { calculateFiniquito, type FiniquitoInput } from '../finiquito';
import { INDEMNIZACION, UF } from '@/lib/values/constants';

describe('calculateFiniquito', () => {
  const inputBase: FiniquitoInput = {
    ultimoSueldo: 1000000,
    añosTrabajados: 5,
    mesesTrabajados: 6,
    diasVacacionesPendientes: 5,
    causaTermino: 'despido',
    tieneGratificacion: true,
  };

  describe('indemnización por años de servicio', () => {
    it('debería calcular indemnización para despido', () => {
      const result = calculateFiniquito(inputBase);
      // 5 años * 30 días = 150 días
      // 150 días * (1000000 / 30) = 5000000
      expect(result.indemnizacion).toBe(5000000);
    });

    it('no debería pagar indemnización por renuncia', () => {
      const input = { ...inputBase, causaTermino: 'renuncia' as const };
      const result = calculateFiniquito(input);
      expect(result.indemnizacion).toBe(0);
    });

    it('no debería pagar indemnización por mutuo acuerdo', () => {
      const input = { ...inputBase, causaTermino: 'mutuo_acuerdo' as const };
      const result = calculateFiniquito(input);
      expect(result.indemnizacion).toBe(0);
    });

    it('debería aplicar tope de 11 años', () => {
      const input = { ...inputBase, añosTrabajados: 15 };
      const result = calculateFiniquito(input);
      // 11 años * 30 días = 330 días
      // 330 días * (1000000 / 30) = 11000000
      expect(result.indemnizacion).toBe(11000000);
      expect(result.desglose.añosIndemnizacion).toBe(11);
    });
  });

  describe('vacaciones proporcionales', () => {
    it('debería calcular vacaciones proporcionales', () => {
      const result = calculateFiniquito(inputBase);
      // 5 años * 12 meses + 6 meses = 66 meses
      // (15 días / 12) * 66 = 82.5 días + 5 días pendientes = 87.5 días
      // 87.5 días * (1000000 / 30) = 2916666.67 -> 2916667
      expect(result.vacacionesProporcionales).toBeGreaterThan(0);
    });

    it('debería manejar meses trabajados 0', () => {
      const input = { ...inputBase, añosTrabajados: 0, mesesTrabajados: 0 };
      const result = calculateFiniquito(input);
      // Solo días pendientes: 5 días * (1000000 / 30) = 166666.67 -> 166667
      expect(result.vacacionesProporcionales).toBe(166667);
    });

    it('debería manejar sin días pendientes', () => {
      const input = { ...inputBase, diasVacacionesPendientes: 0 };
      const result = calculateFiniquito(input);
      expect(result.vacacionesProporcionales).toBeGreaterThan(0);
    });
  });

  describe('gratificación proporcional', () => {
    it('debería calcular gratificación cuando tieneGratificacion es true', () => {
      const result = calculateFiniquito(inputBase);
      expect(result.gratificacionProporcional).toBeGreaterThan(0);
    });

    it('no debería pagar gratificación cuando tieneGratificacion es false', () => {
      const input = { ...inputBase, tieneGratificacion: false };
      const result = calculateFiniquito(input);
      expect(result.gratificacionProporcional).toBe(0);
    });
  });

  describe('total finiquito', () => {
    it('debería sumar todos los componentes', () => {
      const result = calculateFiniquito(inputBase);
      const suma = result.indemnizacion + result.vacacionesProporcionales + result.gratificacionProporcional;
      expect(result.totalFiniquito).toBe(suma);
    });

    it('debería incluir el último sueldo en el resultado', () => {
      const result = calculateFiniquito(inputBase);
      expect(result.ultimoSueldo).toBe(1000000);
    });
  });

  describe('desglose', () => {
    it('debería incluir años de indemnización en desglose', () => {
      const result = calculateFiniquito(inputBase);
      expect(result.desglose.añosIndemnizacion).toBe(5);
    });

    it('debería incluir días de vacaciones en desglose', () => {
      const result = calculateFiniquito(inputBase);
      expect(result.desglose.diasVacaciones).toBeGreaterThan(0);
    });

    it('debería incluir meses de gratificación en desglose', () => {
      const result = calculateFiniquito(inputBase);
      expect(result.desglose.mesesGratificacion).toBe(6);
    });
  });

  describe('casos edge', () => {
    it('debería manejar sueldo 0', () => {
      const input = { ...inputBase, ultimoSueldo: 0 };
      const result = calculateFiniquito(input);
      expect(result.totalFiniquito).toBe(0);
    });

    it('debería manejar años trabajados 0', () => {
      const input = { ...inputBase, añosTrabajados: 0, causaTermino: 'renuncia' as const };
      const result = calculateFiniquito(input);
      expect(result.indemnizacion).toBe(0);
      expect(result.totalFiniquito).toBeGreaterThan(0);
    });
  });

  describe('golden: aviso previo y Art. 168', () => {
    it('sin aviso previo opt-in no suma mes extra', () => {
      const sin = calculateFiniquito({
        ...inputBase,
        causaTermino: 'necesidades_empresa',
        incluyeAvisoPrevio: false,
      });
      const con = calculateFiniquito({
        ...inputBase,
        causaTermino: 'necesidades_empresa',
        incluyeAvisoPrevio: true,
      });
      expect(sin.indemnizacionAvisoPrevio).toBe(0);
      expect(con.indemnizacionAvisoPrevio).toBe(1_000_000);
      expect(con.totalFiniquito - sin.totalFiniquito).toBe(1_000_000);
    });

    it('recargo 50% Art. 168 es la mitad de la indemnización por años', () => {
      const r = calculateFiniquito({
        ...inputBase,
        causaTermino: 'despido',
        incluyeAvisoPrevio: false,
        recargoArt168Pct: 50,
        tieneGratificacion: false,
        diasVacacionesPendientes: 0,
        mesesTrabajados: 0,
      });
      // 5 años × 30 días × (1.000.000/30) = 5.000.000
      expect(r.indemnizacion).toBe(5_000_000);
      expect(r.multaArt168).toBe(2_500_000);
      expect(r.recargoArt168Pct).toBe(50);
    });

    it('vacaciones años anteriores: N días × sueldo/30', () => {
      const r = calculateFiniquito({
        ultimoSueldo: 900_000,
        añosTrabajados: 0,
        mesesTrabajados: 0,
        causaTermino: 'renuncia',
        tieneGratificacion: false,
        vacacionesAniosAnteriores: 10,
      });
      expect(r.vacacionesPendientesAniosAnteriores).toBe(Math.round((900_000 / 30) * 10));
    });
  });

  describe('aviso previo: tope 90 UF (Art. 172 inciso final)', () => {
    const topeMensual = INDEMNIZACION.tope_uf_mensual * UF.valor;

    it('sueldo bajo el tope: paga el sueldo completo', () => {
      const sueldo = Math.floor(topeMensual / 2);
      const r = calculateFiniquito({
        ...inputBase,
        ultimoSueldo: sueldo,
        causaTermino: 'necesidades_empresa',
        incluyeAvisoPrevio: true,
      });
      expect(r.indemnizacionAvisoPrevio).toBe(sueldo);
    });

    it('sueldo sobre el tope: paga máximo 90 UF', () => {
      const r = calculateFiniquito({
        ...inputBase,
        ultimoSueldo: Math.ceil(topeMensual * 2),
        causaTermino: 'necesidades_empresa',
        incluyeAvisoPrevio: true,
      });
      expect(r.indemnizacionAvisoPrevio).toBeCloseTo(topeMensual, 0);
    });
  });

  describe('fracción superior a 6 meses (Art. 163 inc. 2 CdT)', () => {
    const base: FiniquitoInput = {
      ultimoSueldo: 1000000,
      añosTrabajados: 3,
      mesesTrabajados: 0,
      causaTermino: 'necesidades_empresa',
      tieneGratificacion: false,
    };

    it('3 años y 7 meses cuentan como 4 años', () => {
      const r = calculateFiniquito({ ...base, mesesTrabajados: 7 });
      expect(r.desglose.añosIndemnizacion).toBe(4);
      expect(r.indemnizacion).toBe(4000000);
    });

    it('3 años y 6 meses cuentan como 3 años', () => {
      const r = calculateFiniquito({ ...base, mesesTrabajados: 6 });
      expect(r.desglose.añosIndemnizacion).toBe(3);
      expect(r.indemnizacion).toBe(3000000);
    });

    it('con menos de 1 año no hay indemnización por la fracción', () => {
      const r = calculateFiniquito({ ...base, añosTrabajados: 0, mesesTrabajados: 8 });
      expect(r.desglose.añosIndemnizacion).toBe(0);
      expect(r.indemnizacion).toBe(0);
    });

    it('con años con decimales no suma la fracción otra vez', () => {
      const r = calculateFiniquito({ ...base, añosTrabajados: 1.5, mesesTrabajados: 7 });
      expect(r.desglose.añosIndemnizacion).toBe(1.5);
    });

    it('la fracción se suma antes del tope de 11 años', () => {
      const r = calculateFiniquito({ ...base, añosTrabajados: 10, mesesTrabajados: 7 });
      expect(r.desglose.añosIndemnizacion).toBe(INDEMNIZACION.tope_años);
      const r2 = calculateFiniquito({ ...base, añosTrabajados: 11, mesesTrabajados: 7 });
      expect(r2.desglose.añosIndemnizacion).toBe(INDEMNIZACION.tope_años);
    });
  });
});

describe('feriado proporcional en días corridos con fecha de término (DT w3-article-60200)', () => {
  const casoVigia: FiniquitoInput = {
    ultimoSueldo: 800_000,
    añosTrabajados: 3,
    mesesTrabajados: 4,
    causaTermino: 'necesidades_empresa',
    incluyeAvisoPrevio: true,
    tieneGratificacion: false,
  };

  it('término el 20-10-2026 con 4 meses: 5 días hábiles = 7 días corridos = $186.667', () => {
    const r = calculateFiniquito({ ...casoVigia, fechaTermino: '2026-10-20' });
    // 4 × 1,25 = 5 días hábiles desde el miércoles 21-10: 21, 22, 23, (sáb 24, dom 25), 26, 27.
    expect(r.desglose.diasVacaciones).toBe(7);
    expect(r.desglose.feriadoEnDiasCorridos).toBe(true);
    expect(r.vacacionesProporcionales).toBe(186_667);
    expect(r.indemnizacion).toBe(2_400_000);
    expect(r.indemnizacionAvisoPrevio).toBe(800_000);
    expect(r.totalFiniquito).toBe(3_386_667);
  });

  it('sin fecha de término la función pura paga días hábiles sin proyectar ($133.333)', () => {
    const r = calculateFiniquito(casoVigia);
    expect(r.desglose.feriadoEnDiasCorridos).toBe(false);
    expect(r.desglose.diasVacaciones).toBe(5);
    expect(r.vacacionesProporcionales).toBe(133_333);
  });

  it('una fecha inválida se trata como sin fecha', () => {
    const r = calculateFiniquito({ ...casoVigia, fechaTermino: '20-10-2026' });
    expect(r.vacacionesProporcionales).toBe(133_333);
    const imposible = calculateFiniquito({ ...casoVigia, fechaTermino: '2026-02-30' });
    expect(imposible.desglose.feriadoEnDiasCorridos).toBe(false);
    expect(imposible.vacacionesProporcionales).toBe(133_333);
  });

  it('suma también un feriado nacional: término el 30-10-2026, 4 meses', () => {
    // 5 hábiles desde el sáb 31-10 (feriado): 31, 1 (dom, feriado), 2, 3, 4, 5, 6 = 7 corridos.
    const r = calculateFiniquito({ ...casoVigia, fechaTermino: '2026-10-30' });
    expect(r.desglose.diasVacaciones).toBe(7);
    expect(r.vacacionesProporcionales).toBe(186_667);
  });
});
