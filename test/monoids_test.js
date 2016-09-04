import {All, Any, Sum, Product, Max} from '../';
import {strictEqual, throws} from 'assert';

describe('All', () => {
  it('0 => false', () => {
    strictEqual(All(0).value(), false);
  });
  it('null => true', () => {
    strictEqual(All(null).value(), true);
  });
  it('"" => false', () => {
    strictEqual(All('').value(), false);
  });
  it('true.concat(true) => true', () => {
    strictEqual(All(true).concat(All(true)).value(), true);
  });
  it('true.concat(false) => false', () => {
    strictEqual(All(true).concat(All(false)).value(), false);
  });
  it('empty() => true', () => {
    strictEqual(All(false).empty().value(), true);
  });
  it('true.concatAll(false, true) => false', () => {
    strictEqual(All(true).concatAll([All(false), All(true)]).value(), false);
  });
});

describe('Any', () => {
  it('0 => false', () => {
    strictEqual(Any(0).value(), false);
  });
  it('null => false', () => {
    strictEqual(Any(null).value(), false);
  });
  it('"" => false', () => {
    strictEqual(Any('').value(), false);
  });
  it('false.concat(true) => true', () => {
    strictEqual(Any(false).concat(All(true)).value(), true);
  });
  it('false.concat(false) => false', () => {
    strictEqual(Any(false).concat(All(false)).value(), false);
  });
  it('empty() => true', () => {
    strictEqual(Any(true).empty().value(), false);
  });
  it('false.concatAll(true, false) => true', () => {
    strictEqual(Any(false).concatAll([Any(true), Any(false)]).value(), true);
  });
});

describe('Sum', () => {
  it('1 => 1', () => {
    strictEqual(Sum(1).value(), 1);
  });
  it('empty() => 0', () => {
    strictEqual(Sum(0).empty().value(), 0);
  });
  it('string => TypeError', () => {
    throws(() => Sum(), TypeError);
  });
  it('3.concat(4) => 7', () => {
    strictEqual(Sum(3).concat(Sum(4)).value(), 7);
  });
  it('2.concatAll(4,6,9) => 21', () => {
    strictEqual(Sum(2).concatAll([Sum(4), Sum(6), Sum(9)]).value(), 21);
  });
});

describe('Product', () => {
  it('1 => 1', () => {
    strictEqual(Product(1).value(), 1);
  });
  it('empty() => 1', () => {
    strictEqual(Product(0).empty().value(), 1);
  });
  it('string => TypeError', () => {
    throws(() => Product(), TypeError);
  });
  it('3.concat(4) => 12', () => {
    strictEqual(Product(3).concat(Product(4)).value(), 12);
  });
  it('2.concatAll(4, 6) => 48', () => {
    strictEqual(Product(2).concatAll([Product(4), Product(6)]).value(), 48);
  });
});

describe('Max', () => {
  it('1 => 1', () => {
    strictEqual(Max(1).value(), 1);
  });
  it('empty() => Number.MIN_VALUE', () => {
    strictEqual(Max(0).empty().value(), Number.MIN_VALUE);
  });
  it('string => TypeError', () => {
    throws(() => Max(), TypeError);
  });
  it('5.concat(3) => 5', () => {
    strictEqual(Max(5).concat(Max(3)).value(), 5);
  });
  it('2.concatAll(4, 1) => 4', () => {
    strictEqual(Max(2).concatAll([Max(4), Max(1)]).value(), 4);
  });
});