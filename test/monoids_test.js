import {All, Any, Sum, Product, Max, Min} from '../';
import {strictEqual, throws} from 'assert';

describe('All', () => {
  it('0 => false', () => {
    strictEqual(All.of(0).value(), false);
  });
  it('null => true', () => {
    strictEqual(All.of(null).value(), true);
  });
  it('"" => false', () => {
    strictEqual(All.of('').value(), false);
  });
  it('true.concat(true) => true', () => {
    strictEqual(All.of(true).concat(All.of(true)).value(), true);
  });
  it('true.concat(false) => false', () => {
    strictEqual(All.of(true).concat(All.of(false)).value(), false);
  });
  it('empty() => true', () => {
    strictEqual(All.of(false).empty().value(), true);
  });
  it('true.concatAll(false, true) => false', () => {
    strictEqual(All.of(true).concatAll([All.of(false), All.of(true)]).value(), false);
  });
});

describe('Any', () => {
  it('0 => false', () => {
    strictEqual(Any.of(0).value(), false);
  });
  it('null => false', () => {
    strictEqual(Any.of(null).value(), false);
  });
  it('"" => false', () => {
    strictEqual(Any.of('').value(), false);
  });
  it('false.concat(true) => true', () => {
    strictEqual(Any.of(false).concat(All.of(true)).value(), true);
  });
  it('false.concat(false) => false', () => {
    strictEqual(Any.of(false).concat(All.of(false)).value(), false);
  });
  it('empty() => true', () => {
    strictEqual(Any.of(true).empty().value(), false);
  });
  it('false.concatAll(true, false) => true', () => {
    strictEqual(Any.of(false).concatAll([Any.of(true), Any.of(false)]).value(), true);
  });
});

describe('Sum', () => {
  it('1 => 1', () => {
    strictEqual(Sum.of(1).value(), 1);
  });
  it('empty() => 0', () => {
    strictEqual(Sum.of(0).empty().value(), 0);
  });
  it('string => TypeError', () => {
    throws(() => Sum.of(), TypeError);
  });
  it('3.concat(4) => 7', () => {
    strictEqual(Sum.of(3).concat(Sum.of(4)).value(), 7);
  });
  it('2.concatAll(4,6,9) => 21', () => {
    strictEqual(Sum.of(2).concatAll([Sum.of(4), Sum.of(6), Sum.of(9)]).value(), 21);
  });
});

describe('Product', () => {
  it('1 => 1', () => {
    strictEqual(Product.of(1).value(), 1);
  });
  it('empty() => 1', () => {
    strictEqual(Product.of(0).empty().value(), 1);
  });
  it('string => TypeError', () => {
    throws(() => Product.of(), TypeError);
  });
  it('3.concat(4) => 12', () => {
    strictEqual(Product.of(3).concat(Product.of(4)).value(), 12);
  });
  it('2.concatAll(4, 6) => 48', () => {
    strictEqual(Product.of(2).concatAll([Product.of(4), Product.of(6)]).value(), 48);
  });
});

describe('Max', () => {
  it('1 => 1', () => {
    strictEqual(Max.of(1).value(), 1);
  });
  it('empty() => Number.MIN_VALUE', () => {
    strictEqual(Max.of(0).empty().value(), Number.MIN_VALUE);
  });
  it('string => TypeError', () => {
    throws(() => Max.of(), TypeError);
  });
  it('5.concat(3) => 5', () => {
    strictEqual(Max.of(5).concat(Max.of(3)).value(), 5);
  });
  it('2.concatAll(4, 1) => 4', () => {
    strictEqual(Max.of(2).concatAll([Max.of(4), Max.of(1)]).value(), 4);
  });
});

describe('Min', () => {
  it('1 => 1', () => {
    strictEqual(Min.of(1).value(), 1);
  });
  it('empty() => Number.MIN_VALUE', () => {
    strictEqual(Min.of(0).empty().value(), Number.MAX_VALUE);
  });
  it('string => TypeError', () => {
    throws(() => Min.of(), TypeError);
  });
  it('5.concat(3) => 3', () => {
    strictEqual(Min.of(5).concat(Min.of(3)).value(), 3);
  });
  it('2.concatAll(1, 4) => 1', () => {
    strictEqual(Min.of(2).concatAll([Min.of(1), Min.of(4)]).value(), 1);
  });
});