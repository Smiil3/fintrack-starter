import { reverse } from '../../src/string-utils';

describe('string utils', () => {
  it('reverse "abc" returns "cba"', () => {
    expect(reverse('abc')).toBe('cba');
  });
  it('reverse "" returns ""', () => {
    expect(reverse('')).toBe('');
  });
  it('reverse null returns error', () => {
    expect(() => reverse(null)).toThrow(TypeError("Ce n'est pas un string"));
  });
});
