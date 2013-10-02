// ****************************************************************** //
//                         cedilla.js                                 //
// ****************************************************************** //

// This is an implementation of the glamurous `underscore.js` library (http://underscorejs.org/).
// It is not intended to replace it in any way. It's just a toy project written
// for learning purposes (you should try doing more of that as well!).


// Please refer to the original documentation for underscore.js for each method's
// behavior and API.

(function() {
  var ç = window.ç = {};

  // Creates an alias in the `ç` object.
  //
  // method        - the name of an existing method to be aliased.
  // aliasedMethod - the name of the new, aliased method, with the same function as `method`.
  function alias(method, aliasedMethod) {
    if (typeof ç[method] === 'function') {
      ç[aliasedMethod] = ç[method];
    }
  }

  // Collection Functions (Arrays and Objects)
  // =========================================

  // _.each

  function hasNative(klass, method) {
    return typeof klass.prototype[method] === 'function';
  }

  // Relies on duck typing: every object that has a numeric `length` property is
  // considered to be an Array.
  function isArray(object) {
    return typeof object.length === 'number';
  }

  function isJsObject(object) {
    return Object.prototype.toString.call(object) === '[object Object]';
  }

  // Performs the `each` method when the `list` argument is an array (or anything
  // that returns true for the `isArray` method.
  //
  // Uses the native `forEach` method if available in the browser.
  function arrayEach(list, iterator, context) {
    if (hasNative(Array, 'forEach')) {
      list.forEach(iterator, context);

    } else {
      for (var i = 0; i < list.length; i++) {
        iterator.call(context, list[i], i, list);
      }
    }
  }

  // Performs the `each` method when the `list` argument is a JavaScript object.
  function jsObjectEach(list, iterator, context) {
    for (property in list) {
      iterator.call(context, list[property], property, list);
    }
  }

  // ç.each method: iterstes over a list of elements, executing a function for each
  // element.
  ç.each = function(list, iterator, context) {
    if (isArray(list)) {
      arrayEach(list, iterator, context);

    } else if (isJsObject(list)) {
      jsObjectEach(list, iterator, context);

    } else {
      throw('ç.each works only with arrays and JavaScript objects.');
    }
  };

  alias('each', 'forEach');


  // _.map

  // Performs the `map` operation when `list `is know to be an Array-ish.
  //
  // Delegates to the native `map` implementation if available.
  function arrayMap(list, iterator, context) {
    if (hasNative(Array, 'map')) {
      return list.map(iterator, context);

    } else {
      var mapped = [];

      for (var i = 0; i < list.length; i++) {
        mapped[i] = iterator.call(context, list[i], i, list);
      }

      return mapped;
    }
  }

  // Perfoms the `map` operation when the `list` operator is known to be a JavaScript object.
  function jsObjectMap(list, iterator, context) {
    var mapped = [], i = 0;

    for (property in list) {
      mapped[i++] = iterator.call(context, list[property], property, list);
    }

    return mapped;
  }

  // Produces a new array with the result of calling `iterator` on each element.
  //
  // list     - the collection to be traversed.
  // iterator - the function to be run for each element.
  // context  - the context in which `iterator` should be run.
  //
  // The arguments passed to iterator are `(element, index, list)`.
  //
  // Example
  //
  //    ç.map([1, 2, 3], function(el) { return el * 2; }) // => [2, 4, 6]
  ç.map = function(list, iterator, context) {
    if (isArray(list)) {
      return arrayMap(list, iterator, context);

    } else if (isJsObject(list)) {
      return jsObjectMap(list, iterator, context);

    } else {
      throw('ç.map works only with arrays and JavaScript objects.');
    }
  };

  alias('map', 'collect');

  // _.reduce

  // Applies the `reduce` method when the list argument is an array.
  //
  // This delegates to the native `reduce` method, when available in the browser.
  // *Important*: the native version of this method does not support passing
  // a custom contexto to the iterator method. So, if your browser supports
  // the method, the context *will* be ignored.
  function arrayReduce(list, iterator, memo, context) {
    var reduced = memo;

    if (hasNative(Array, 'reduce')) {
      // warning: in native `reduce` call, you cannot pass the iterator context.
      reduced = list.reduce(iterator, memo);

    } else {
      for (var i = 0; i < list.length; i++) {
        reduced = iterator.call(context, reduced, list[i], i, list);
      }
    }

    return reduced;
  }

  // Applies the `reduce` method when the list argument is a JavaScript object.
  function jsObjectReduce(list, iterator, memo, context) {
    var reduced = memo;

    for (var property in list) {
      reduced = iterator.call(context, reduced, list[property], property, list);
    }

    return reduced;
  }

  // Returns a computed value for a list, given a function.
  //
  // list     - the list to be processed. Can be either an array or a JavaScript object.
  // iterator - the function to be called for each element. Arguments passed are:
  //            the reduced value so far; the current element; the index; and the list itself.
  // memo     - the initial value for the computed result.
  // context  - the context in which the iterator function will be invoked.
  //
  // Returns the computed value.
  //
  // Example
  //
  // ç.reduce([1, 2, 3], function(result, el) { return result * el; }, 1) // => 6
  ç.reduce = function(list, iterator, memo, context) {
    if (isArray(list)) {
      return arrayReduce(list, iterator, memo, context);

    } else if (isJsObject(list)) {
      return jsObjectReduce(list, iterator, memo, context);

    } else {
      throw('ç.reduce works only with arrays and JavaScript objects.');
    }
  };

  alias('reduce', 'inject');
  alias('reduce', 'foldl');
})();
