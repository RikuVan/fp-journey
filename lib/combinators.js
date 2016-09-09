
export const constant = x => _ => x;

export const identity = (value) => value;

export const compose = (f) => (g) => (x) => f(g(x));

export const flip = (f) => (a) => (b) => f(b)(a);

export const substitution = (f) => (g) => (x) => f(x)(g(x));