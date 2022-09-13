export const pipe = (...fns) => (arg) => fns.reduce((v, fn) => fn(v), arg);
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
export const implode = (func) => (args) => func(...args);
export const explode = (func) => (...args) => func(args);

const curry = (f, ...args) => (args.length >= f.length)
  ? f(...args)
  : (...next) => curry(f.bind(f, ...args), ...next);

const burry = (f, ...args) => (args.length >= f.length)
  ? f(...args)
  : (...next) => burry(f, ...args, ...next);

const partial = (fn, ...cache) => (...args) => {
  const all = cache.concat(args);
  return all.length >= fn.length ? fn(...all) : partial(fn, ...all);
};

export const papply = (f, ...vals) => (...args) => f(...vals, ...args)

// Recursion
export const rec = (f) => f((...xs) => rec(f)(...xs));
export const unfold = (fn, seed, acc = [], next = fn(seed)) => next ? unfold(fn, next[1], [...acc, next[0]]) : acc;

// Array
export const groupBy = (arr, k) => arr.reduce((r, x) => (r[x[k]] = r[x[k]] ? x : [], r), {});
export const indexBy = (arr, k) => arr.reduce((r, x) => (r[x[k]] = x, r), {});
export const keyBy = (arr, fn) => arr.reduce((r, x) => (r[fn(x)] = x, r), {});
export const flatten = (arr) => arr.reduce((r, x) => r.push(x), []);
export const splat = (arr) => arr.reduce((r, x) => r.push(Array.isArray(x) ? splat(x) : x), []);
export const partition = (arr, pred) => arr.reduce((r, x) => (r[Number(!pred(x))].push(x), r), [[], []]);

// Object
export const entries = (o) => Object.keys(o).map(k => [k, o[k]]);

// Values
export const range = (a, b, k = 1) => Array.from({ length: Math.ceil((b - a) / k) }, (_, i) => a + i * k);
export const prop = (obj, path) => path.split('.').reduce((acc, curr) => acc && acc[curr], obj);

export const isEmpty = (obj) => (Array.isArray(obj) ? obj : Object.keys(obj)).length !== 0;
export const notEmpty = (obj) => (Array.isArray(obj) ? obj : Object.keys(obj)).length === 0;
