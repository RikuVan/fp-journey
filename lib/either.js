const noop = () => this;

export const Either = (function() {

  function Either () {}

  Left.prototype = Object.create(Either.prototype);
  function Left (a) {
    this.value = a
  }
  Right.prototype = Object.create(Either.prototype);
  function Right (a) {
    this.value = a
  }

  //These are my Subclasses of Either - Left means failure :(
  Either.Left = function (a) {
    return new Left(a);
  };
  Either.prototype.Left = Either.Left;
  Either.Right = function (a) {
    return new Right(a);
  };
  Either.prototype.Right = Either.Right;

  //I can create a new either with Right value
  Either.of = function (a) {
    return new Right(a);
  };
  Either.prototype.of = Either.of;

  // I create Right unless null or undefined
  Either.fromNullable = function (a) {
    return a != null  ? new Right(a) : new Left(a);
  };
  Either.prototype.fromNullable = Either.fromNullable;

  //I will convert synchronous comp to an Either
  Either.try = function (f) {
    return function() {
      try {
        return new Right(f.apply(null, arguments))
      } catch(e) {
        return new Left(e)
      }
    }
  };

  Left.prototype.isLeft   = true;
  Right.prototype.isRight  = true;

  // As a functor I transform only the right a function
  Left.prototype.map   = noop;
  Right.prototype.map = function (f) {
    return this.of(f(this.value))
  }

  //And I work with monads
  Left.prototype.chain   = noop;
  Right.prototype.chain = function (f) {
    return f(this.value);
  };

  //You can look inside my lefts and rightd
  Left.prototype.inspect = function () {
    return 'Either.Left(' + this.value + ')';
  };
  Right.prototype.inspect = function () {
    return 'Either.Right(' + this.value + ')';
  };

  //Get my values...only Right sorry
  Left.prototype.value = function () {
    throw new TypeError("Can't extract the value of a Left(a).")
  };
  Right.prototype.value = function () {
    return this.value;
  };

  //Watch as I map both sides
  Left.prototype.bimap = function (f, _) {
    return this.Left(f(this.value));
  };
  Right.prototype.bimap = function (_, g) {
    return this.Right(g(this.value));
  };

  //If some some reasone you want to flip sides
  Left.prototype.flip = function () {
    return this.Right(this.value);
  };
  Right.prototype.flip = function () {
    return this.Left(this.value);
  };

  // I will show you what I got
  Either.prototype.merge = function () {
    return this.value;
  };

  return Either

}());


