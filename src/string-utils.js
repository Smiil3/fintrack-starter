export function reverse(str) {
  if (typeof str !== 'string') {
    throw new TypeError("Ce n'est pas un string");
  }
  return str.split('').reverse().join('');
}
