export const validMovie = 'Forrest Gump';
export const invalidMovie = 'A<SDOPHADGH()&E@(#@';
export const partialMovie = 'For';
export const dateInitial = '01/01/2000';

// Escopados em "button" de propósito: um texto genérico como
// "Aceitar todos os cookies" também aparece no parágrafo de política de
// cookies ao lado do botão, e isso vira strict-mode violation sempre que
// o banner aparece (não é flakiness, acontece toda vez).
export const cookieSelectors = [
  'button#onetrust-accept-btn-handler',
  'button:has-text("Aceitar todos os cookies")',
  'button:has-text("Accept all cookies")',
  'button:has-text("Aceitar todos")',
];
