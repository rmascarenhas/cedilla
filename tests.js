assertist('cedilla.js', function(test) {
  test.group('#each', function() {
    var array   = [1, 2, 3],
        object  = { one: 1, two: 2 },
        invalid = 3,
        passed = true;

    (function worksForArrays() {
      ç.each(array, function(el, index, list) {
        passed = passed && el === array[index] && array === list;
      });

      test.assert(passed, 'Works for arrays');
    })();

    (function worksForObjects() {
      passed = true;

      ç.each(object, function(el, property, list) {
        passed = passed && el === object[property] && object === list
      });

      test.assert(passed, 'Works for JavaScript objects');
    })();

    (function passingContext() {
      passed = true;
      context = { property: 'value' };

      ç.each(array, function() {
        passed = passed && this.property === 'value';
      }, context);

      test.assert(passed, 'Context is properly passed');
    })();

    (function throwingError() {
      passed = true;

      try {
        ç.each(invalid, function() {});
      } catch(msg) {
        test.assert(msg === 'ç.each works only with arrays and JavaScript objects.', 'Throws an error when the object is not a list');
      }
    })();
  });
});
