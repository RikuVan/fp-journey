import {constant, identity} from '../';
import {strictEqual} from 'assert';

describe('constant', () => {
  it('returns 0 when either argument is 0', () => {
    strictEqual(constant(0)(), 0);
  });
  it('returns first param when send is given', () => {
    strictEqual(constant(0, 3)(), 0);
  });
});

describe('identity', () => {
  it('returns 0 when argument is 0', () => {
    strictEqual(identity(0), 0);
  });
  it('returns null when argument is null', () => {
    strictEqual(identity(null), null);
  });
});

xdescribe('All', () => {
  //Todo
});
