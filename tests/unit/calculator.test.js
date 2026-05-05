import { add, divide, modulo, multiply, simpleInterest, subtract } from '../../src/calculator.js';
describe('calculator', () => {
  describe('add', () => {
    it('retourne 5 quand on additionne 2 et 3', () => {
      expect(add(2, 3)).toBe(5);
    });
    it('retourne 1 quand on additionne 1 et 0', () => {
      expect(add(1, 0)).toBe(1);
    });
  });

  describe('subtract', () => {
    it('retourne 1 quand on soustrait 3 et 2', () => {
      expect(subtract(3, 2)).toBe(1);
    });
    it('retourne -1 quand on soustrait 2 et 3', () => {
      expect(subtract(2, 3)).toBe(-1);
    });
  });

  describe('multiply', () => {
    it('retourne 6 quand on multiplie 2 et 3', () => {
      expect(multiply(2, 3)).toBe(6);
    });
    it('retourne 0 quand on multiplie 2 et 0', () => {
      expect(multiply(2, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    it('retourne 1.5 quand on divise 3 par 2', () => {
      expect(divide(3, 2)).toBe(1.5);
    });
    it('retourne erreur quand on divise 2 par 0', () => {
      expect(() => divide(2, 0)).toThrow(Error('Pas de 0 dans une division.'));
    });
  });

  describe('modulo', () => {
    it('retourne 0 quand on fait modulo 6 et 2', () => {
      expect(modulo(6, 2)).toBe(0);
    });
    it('retourne 1 quand on fait modulo 3 et 2', () => {
      expect(modulo(3, 2)).toBe(1);
    });
  });

  describe('simpleInterest', () => {
    it('retourne 0.2 pour un capital de 10 a 2% sur 1 an', () => {
      expect(simpleInterest(10, 2, 1)).toBe(0.2);
    });
    it('retourne 0.6 pour un capital de 10 a 3% sur 2 ans', () => {
      expect(simpleInterest(10, 3, 2)).toBe(0.6);
    });
  });
});
