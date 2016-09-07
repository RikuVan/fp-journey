import {constant} from './core';
import {isNil, is, reduce, head, curry} from 'ramda';

const empty = (Type, val) => () => Type(val);
const checkForNil = (val, empty) =>  isNil(val) ? empty().value() : val;
const join = (m1, m2) => m1.concat(m2);
const concatAll = (Type, val) => ms => reduce(join, Type(val), ms);
const foldWith = m => (x, y) => x.concat(m(y));

const throwNotNum = n => {
  if(!is(Number, n)) {
    throw new TypeError('Sum: need a number dude')
  }
  return;
};

export const mconcat = (M, xs) => xs.reduce(foldWith(M), M.empty());

/**
 *
 *    All :: Bool -> All
 *
 */
export const All = b => {
  const _empty = empty(All,true);
  const x = checkForNil(b, _empty);
  const value = constant(!!x);
  const concat = m => All(m.value() && value());
  return {
    value,
    concat,
    concatAll: concatAll(All, value()),
    empty: _empty
  }
};

/**
 *
 *    Any :: Bool -> Any
 *
 */
export const Any = b => {
  const _empty = empty(Any, false);
  const x = checkForNil(b, _empty);
  const value = constant(!!x);
  const concat = m => Any(m.value() || value());

  return {
    value,
    concat,
    concatAll: concatAll(Any, value()),
    empty: _empty
  }
};

/**
 *
 *    sum :: a -> Sum a
 *
 */
export const Sum = n => {
  throwNotNum(n);
  const _empty = empty(Sum, 0);
  const x = checkForNil(n, _empty);
  const value   = constant(x);
  const concat = m => Sum(x + m.value());

  return {
    value,
    concat,
    concatAll: concatAll(Sum, x),
    empty: _empty
  }
};

/**
 *
 *    Product :: a -> Product a
 *
 */

export const Product = n => {
  throwNotNum(n);
  const _empty = empty(Product, 1);
  const x = checkForNil(n, _empty);
  const value = constant(x);
  const concat = m => Product(x * m.value());

  return {
    value,
    concat,
    concatAll: concatAll(Product, x),
    empty: _empty
  }
};

/**
 *
 *    Dual :: m a -> Dual m a
 *
 */

export const Dual = M => {
  //TODO: error M.empty is not defined?
  const _empty = empty(InnerDual, M.empty().value());
  function InnerDual(x) {
    const a = M(x);
    const inner = constant(a);
    const value = constant(a.value());
    const concat = m => InnerDual(m.inner().concat(a).value());
    return {
      inner,
      value,
      concat,
      empty: _empty
    }
  }
  InnerDual.empty = _empty;
  return InnerDual;
};

/**
 *
 *  Max :: a -> a
 *
 */

export const Max = (n) => {
  throwNotNum(n);
  const _empty = empty(Max, Number.MIN_VALUE);
  const x = checkForNil(n, _empty);
  const value = constant(x);
  const concat = m => Max(Math.max(x, m.value()));

  return {
    value,
    concat,
    concatAll: concatAll(Max, x),
    empty: _empty
  }
};

/**
 *
 *  Min :: a -> a
 *
 */

export const Min = (n) => {
  throwNotNum(n);
  const _empty = empty(Min, Number.MAX_VALUE);
  const x = checkForNil(n, _empty);
  const value = constant(x);
  const concat = m => Min(Math.min(x, m.value()));

  return {
    value,
    concat,
    concatAll: concatAll(Min, x),
    empty: _empty
  }
};
