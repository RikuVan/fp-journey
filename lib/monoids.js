import {constant} from './core';
import {isNil, is, reduce, head, curry} from 'ramda';

const empty = (Type, val) => () => Type(val);
const checkForNil = (val, empty) =>  isNil(val) ? empty().value() : val;
const join = (m1, m2) => m1.concat(m2);
const concatAll = (Type, val) => ms => reduce(join, Type(val), ms);

const throwNotNum = n => {
  if(!is(Number, n)) {
    throw new TypeError('Sum: need a number dude')
  }
  return;
};

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

export const Dual = m => {
  const _empty = empty(Dual, m.empty().value());
  const x = m.value() ? m : m.empty();
  const value = x.value();
  //TODO...what should the concat actually do?

  return {
    value,
    empty: _empty
  }
};

/**
 *
 *  Max :: a -> Dual a
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
}

/**
 *
 *  TODO: Min
 *
 */
