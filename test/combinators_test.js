import {constant, identity, compose, flip, substitution} from '../';
import {strictEqual} from 'assert';
import {assert} from 'chai';
import R from 'ramda';

describe('identity', () => {
  it('returns 0 when argument is 0', () => {
    strictEqual(identity(0), 0);
  });
  it('returns null when argument is null', () => {
    strictEqual(identity(null), null);
  });
});

describe('constant', () => {
  it('returns 0 when either argument is 0', () => {
    strictEqual(constant(0)(), 0);
  });
  it('returns first param when send is given', () => {
    strictEqual(constant(0, 3)(), 0);
  });
});

describe('compose', () => {
  it('returns a function when given one function', () => {
    assert.typeOf(compose(R.toUpper), 'Function');
  });
  it('returns a function when given two functions', () => {
    assert.typeOf(compose(R.toUpper)(R.trim), 'Function');
  });
  it('returns a value from two functions and initial value', () => {
    strictEqual(compose(x => x + 1)(y => y * 2)(4), 9);
  });
});

describe('flip', () => {
  it('returns a function when given one function', () => {
    assert.typeOf(flip(R.add), 'Function');
  });
  it('returns a function when a function and one value', () => {
    assert.typeOf(flip(R.add)('journey'), 'Function');
  });
  it('returns a value from a function and given args which are flipped', () => {
    strictEqual(flip(R.concat)('journey')('fp'), 'fpjourney');
  });
});

describe('substitution', () => {
  it('calls curried function on second argument second time', () => {
    strictEqual(substitution(x => y => x + " " + y + "!")(R.toUpper)("oh"), 'oh OH!');
  });
});