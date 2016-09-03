import {constant} from './core'

export const All = (x) => {
  const concat = y => y.value() && y;
  const value = constant(x);
  return {value, concat}
};