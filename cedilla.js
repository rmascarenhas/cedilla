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

  // Collection Functions (Arrays and Objects)
  // =========================================

  // _.each

  var hasNativeForEach = (typeof Array.prototype.forEach === 'function');

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
    if (hasNativeForEach) {
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
})();
