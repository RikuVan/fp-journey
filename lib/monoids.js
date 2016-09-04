import {constant} from './core';
import {isNil, is} from 'ramda';

/**
 *
 *    all :: Foldable t => (a -> Bool) -> t a -> Bool
 *
 */
export const All = (b) => {
  const empty  = () => All(true);
  const x = isNil(b) ? empty().value() : b;
  const value = constant(!!x);
  const concat = m => All(m.value() && value());
  return {value, concat, empty}
};

/**
 *
 *    any :: Foldable t => (a -> Bool) -> t a -> Bool
 *
 */
export const Any = (b) => {
  const empty = () => Any(false);
  const x = isNil(b) ? empty().value() : b;
  const value = constant(!!x);
  const concat = (m) => {
    return Any(m.value() || value())
  };

  return {value, concat, empty}
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
  const empty  = () => Sum(0);
  const x = isNil(n) ? empty().value() : n;
  const value   = constant(x);
  const concat = m => Sum(x + m.value());

  return {value, concat, empty}
};