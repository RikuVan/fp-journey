import {constant} from './core';
import {isNil, is} from 'ramda';

const empty = (Type, val) => () => Type(val);
const checkForNil = (val, empty)=>  isNil(val) ? empty().value() : val;

/**
 *
 *    all :: Foldable t => (a -> Bool) -> t a -> Bool
 *
 */
export const All = (b) => {
  const _empty = empty(All,true);
  const x = checkForNil(b, _empty);
  const value = constant(!!x);
  const concat = m => All(m.value() && value());
  return {value, concat, empty: _empty}
};

/**
 *
 *    any :: Foldable t => (a -> Bool) -> t a -> Bool
 *
 */
export const Any = (b) => {
  const _empty = empty(Any, false);
  const x = checkForNil(b, _empty);
  const value = constant(!!x);
  const concat = (m) => Any(m.value() || value());

  return {value, concat, empty: _empty}
};

/**
 *
 *    sum :: Num a => [a] -> a
 *
 */
export const Sum = (n) => {
  if(!is(Number, n)) {
    throw new TypeError('Sum: only numbers dude')
  }
  const _empty = empty(Sum, 0);
  const x = checkForNil(n, _empty);
  const value   = constant(x);
  const concat = m => Sum(x + m.value());

  return {value, concat, empty: _empty}
};