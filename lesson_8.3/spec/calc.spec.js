const calc = require('../calc');

describe('Функция summ()', () => {
    it('должна возвращать 5 при аргументах (3, 2)', () => {
        expect(calc.summ(3, 2)).toBe(5);
    }),
    it('должна возвращать -5 при аргументах (-3, -2)', () => {
        expect(calc.summ(-3, -2)).toBe(-5);
    }),
    it('должна возвращать -5 при аргументах ("-3", "-2")', () => {
        expect(calc.summ('-3', '-2')).toBe(-5);
    }),
    it('должна возвращать null при аргументах (null, "2")', () => {
        expect(calc.summ(null, '2')).toBe(null);
    })
    it('должна возвращать undefined при аргументах (5, undefined)', () => {
        expect(calc.summ(5, undefined)).toBe(undefined);
    })
    
});

describe('Функция subt()', () => {
    it('должна возвращать 1 при аргументах (3, 2)', () => {
        expect(calc.subt(3, 2)).toBe(1);
    })
    it('должна возвращать -1 при аргументах (-3, -2)', () => {
        expect(calc.subt(-3, -2)).toBe(-1);
    }),
    it('должна возвращать -1 при аргументах ("-3", "-2")', () => {
        expect(calc.subt('-3', '-2')).toBe(-1);
    }),
    it('должна возвращать null при аргументах (null, "2")', () => {
        expect(calc.subt(null, '2')).toBe(null);
    })
    it('должна возвращать undefined при аргументах (5, undefined)', () => {
        expect(calc.subt(5, undefined)).toBe(undefined);
    })
});

describe('Функция mult()', () => {
    it('должна возвращать 6 при аргументах (3, 2)', () => {
        expect(calc.mult(3, 2)).toBe(6);
    }),
    it('должна возвращать 6 при аргументах (-3, -2)', () => {
        expect(calc.mult(-3, -2)).toBe(6);
    }),
    it('должна возвращать 6 при аргументах ("-3", "-2")', () => {
        expect(calc.mult('-3', '-2')).toBe(6);
    }),
    it('должна возвращать 0 при аргументах ("-3", 0)', () => {
        expect(calc.mult('-3', 0)).toBe(0);
    }),
    it('должна возвращать null при аргументах (null, "2")', () => {
        expect(calc.mult(null, '2')).toBe(null);
    })
    it('должна возвращать undefined при аргументах (5, undefined)', () => {
        expect(calc.mult(5, undefined)).toBe(undefined);
    })
});

describe('Функция div()', () => {
    it('должна возвращать 4 при аргументах (8, 2)', () => {
        expect(calc.div(8, 2)).toBe(4);
    }),
    it('должна возвращать 1.5 при аргументах (3, 2)', () => {
        expect(calc.div(3, 2)).toBe(1.5);
    })
    it('должна возвращать 1.5 при аргументах ("-3", "-2")', () => {
        expect(calc.div('-3', '-2')).toBe(1.5);
    }),
    it('должна возвращать undefined при аргументах ("-3", 0)', () => {
        expect(calc.div('-3', 0)).toBe(undefined);
    }),
    it('должна возвращать null при аргументах (null, "2")', () => {
        expect(calc.div(null, '2')).toBe(null);
    })
    it('должна возвращать undefined при аргументах (5, undefined)', () => {
        expect(calc.div(5, undefined)).toBe(undefined);
    })
});