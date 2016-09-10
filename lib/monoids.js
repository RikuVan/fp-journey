import {identity, compose} from './combinators';
import {tagged} from 'daggy';
import {isNil, is, reduce, head, curry} from 'ramda';

const checkForNil = (val, empty) => (f = identity) => isNil(f(val)) ? empty().value() : val;
const join = (m1, m2) => m1.concat(m2);
const foldWith = m => (x, y) => x.concat(m(y));
const concat = (x, y) => x.concat(y);

const throwNotNum = n => {
  if(!is(Number, n)) {
    throw new TypeError('Need a number dude')
  }
  return n;
};
const throwNotObj = o => {
  if(!is(Object, o)) {
    throw new TypeError('Need an object dude')
  }
  return o;
};

export const mconcat = (xs, empty) => xs.length ? xs.reduce(concat) : empty();

/**
 *
 *    All
 *
 */
export const All = (function() {
  function All(x) {
    this.x = checkForNil(x, this.empty)();
  }
  All.of = function (x) {
    return new All(x);
  };
  All.prototype.empty = function () {
    return new All(true);
  };
  All.prototype.value = function () {
    return !!this.x;
  };
  All.prototype.concat = function (m) {
    return new All(m.value() && this.value());
  };
  All.prototype.concatAll = function(ms) {
    return reduce(join, All.of(this.x), ms)
  };
  return All;
}());


/**
 *
 *    Any
 *
 */

export const Any = (function() {
  function Any(x) {
    this.x = checkForNil(x, this.empty)();
  }
  Any.of = function (x) {
    return new Any(x);
  };
  Any.prototype.empty = function () {
    return new Any(false);
  };
  Any.prototype.value = function () {
    return !!this.x;
  };
  Any.prototype.concat = function (m) {
    return new Any(m.value() || this.value());
  };
  Any.prototype.concatAll = function(ms) {
    return reduce(join, Any.of(this.x), ms)
  };
  return Any;
}());

/**
 *
 *    Sum
 *
 */

export const Sum = (function() {
  function Sum(x) {
    this.x = checkForNil(x, this.empty)(throwNotNum);
  }
  Sum.of = function (x) {
    return new Sum(x);
  };
  Sum.prototype.empty = function () {
    return new Sum(0);
  };
  Sum.prototype.value = function () {
    return this.x;
  };
  Sum.prototype.concat = function (m) {
    return new Sum(m.value() + this.value());
  };
  Sum.prototype.concatAll = function (ms) {
    return reduce(join, Sum.of(this.x), ms)
  };
  return Sum;
}());

/**
 *
 *    Product
 *
 */

export const Product = (function() {
  function Product(x) {
    this.x = checkForNil(x, this.empty)(throwNotNum);
  }
  Product.of = function (x) {
    return new Product(x);
  };
  Product.prototype.empty = function () {
    return new Product(1);
  };
  Product.prototype.value = function () {
    return this.x;
  };
  Product.prototype.concat = function (m) {
    return new Product(m.value() * this.value());
  };
  Product.prototype.concatAll = function (ms) {
    return reduce(join, Product.of(this.x), ms)
  };
  return Product;
}());

/**
 *
 *    Dual
 *
 */

export const Dual = (function() {
  function Dual(M) {
    function Dual(x) {
      this.x = x;
    }

    Dual.of = function (x) {
      return new Dual(M.of(x));
    }
    Dual.prototype.empty = function () {
      return new Dual(M.empty());
    };
    Dual.prototype.extract = function () {
      return this.x;
    }
    Dual.prototype.value = function () {
      return this.x.value();
    };
    Dual.prototype.concat = function (m) {
      return new Dual(m.x.concat(this.x));
    };
    return Dual;
  }
  return Dual;
}());

/**
 *
 *  Max
 *
 */

export const Max = (function() {
  function Max(x) {
    this.x = checkForNil(x, this.empty)(throwNotNum);
  }
  Max.of = function (x) {
    return new Max(x);
  };
  Max.prototype.empty = function () {
    return new Max(Number.MIN_VALUE);
  };
  Max.prototype.value = function () {
    return this.x;
  };
  Max.prototype.concat = function (m) {
    return new Max(Math.max(this.x, m.value()));
  };
  Max.prototype.concatAll = function(ms) {
    return reduce(join, Max.of(this.x), ms)
  };
  return Max;
}());

/**
 *
 *  Min
 *
 */

export const Min = (function() {
  function Min(x) {
    this.x = checkForNil(x, this.empty)(throwNotNum);
  }
  Min.of = function (x) {
    return new Min(x);
  };
  Min.prototype.empty = function () {
    return new Min(Number.MAX_VALUE);
  };
  Min.prototype.value = function () {
    return this.x;
  };
  Min.prototype.concat = function (m) {
    return new Min(Math.min(this.x, m.value()));
  };
  Min.prototype.concatAll = function(ms) {
    return reduce(join, Min.of(this.x), ms)
  };
  return Min;
}());

/**
 *
 *  Endo
 *
 */

export const Endo = (function() {
  function Endo(f) {
    this.x = checkForNil(f, this.empty)(throwNotNum);
  }
  Endo.of = function (x) {
    return new Endo(x);
  };
  Endo.prototype.empty = function () {
    return new Endo(identity);
  };
  Endo.prototype.value = function () {
    return this.x;
  };
  Endo.prototype.concat = function (y) {
    return new Endo(compose(this.x, y.value()));
  };
  return Endo;
}());

/**
 *
 *  Extend
 *
 */

export const Extend = (function() {
  function Extend(o){
    this.x = checkForNil(o, this.empty)(throwNotObj);
  }
  Extend.of = function(o) {
    return new Extend(o);
  };
  Extend.prototype.empty = function (){
    return new Extend({});
  };
  Extend.prototype.value = function (){
    return this.x;
  };
  Extend.prototype.concat = function (o){
    return new Extend(Object.assign({}, this.x, o.value()))
  };
  Extend.prototype.concatAll = function(ms) {
    return reduce(join, Extend.of(this.x), ms)
  };
  return Extend;
}());
