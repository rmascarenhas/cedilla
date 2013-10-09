assertist('cedilla.js', function(test) {
  // collection test data
  var array   = [1, 2, 3],
      object  = { one: 1, two: 2 },
      invalid = 3,
      passed = true;

  function arrayEquals(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  test.group('#each', function() {
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

    (function aliasForEach() {
      test.assert(ç.each === ç.forEach, 'It is aliased to `forEach`');
    })();
  });

  test.group('#map', function() {
    (function worksForArrays() {
      var mapped = ç.map(array, function(el, index, list) {
        passed = passed && el === array[index] && array === list;

        return el + 1;
      });

      test.assert(passed, 'Works for arrays');

      var expected = [2, 3, 4], equal = true;
      for (var i = 0; i < mapped.length; i++) {
        equal = equal && mapped[i] === expected[i];
      }

      test.assert(equal, 'Returns the mapped array');
    })();

    (function worksForObjects() {
      passed = true;

      var mapped = ç.map(object, function(el, property, list) {
        passed = passed && el === object[property] && object === list
        return el * 2;
      });

      test.assert(passed, 'Works for JavaScript objects');
      test.assert(mapped[0] === 2 && mapped[1] === 4, 'Returns the mapped list');
    })();

    (function passingContext() {
      passed = true;
      context = { amount: 5 };

      var mapped = ç.map(object, function(el) {
        return el + this.amount;
      }, context);

      test.assert(mapped[0] === 6 && mapped[1] === 7, 'Context is properly passed');
    })();

    (function throwingError() {
      passed = true;

      try {
        ç.map(invalid, function() {});
      } catch(msg) {
        test.assert(msg === 'ç.map works only with arrays and JavaScript objects.', 'Throws an error when the object is not a list');
      }
    })();

    (function aliasCollect() {
      test.assert(ç.map === ç.collect, 'It is aliased to `collect`');
    })();
  });

  test.group('#reduce', function() {
    (function worksForArrays() {
      passed = true;

      var reduced = ç.reduce(array, function(sum, el, index, list) {
        passed = passed && el === array[index] && array === list;
        return sum + el;
      }, 0);

      test.assert(passed, 'Properly passes arguments when list is an array');
      test.assert(reduced === 6, 'Reduces to a value for arrays');
    })();

    (function worksForObjects() {
      passed = true;

      var reduced = ç.reduce(object, function(sum, el, property, list) {
        passed = passed && el === object[property] && object === list
        return sum + el;
      }, 0);

      test.assert(passed, 'Properly passes arguments when list is a JavaScript object');
      test.assert(reduced === 3, 'Reduces to a value for JavaScript objects');
    })();

    (function passingContext() {
      passed = true;
      context = { property: 'value' };

      ç.reduce(object, function() {
        passed = passed && this.property === 'value';
      }, 0, context);

      test.assert(passed, 'Context is properly passed (objects)');
    })();

    (function throwingError() {
      passed = true;

      try {
        ç.reduce(invalid, function() {});
      } catch(msg) {
        test.assert(msg === 'ç.reduce works only with arrays and JavaScript objects.', 'Throws an error when the object is not a list');
      }
    })();

    (function aliases() {
      test.assert(ç.reduce === ç.inject, 'It is aliased to `inject`');
      test.assert(ç.reduce === ç.foldl, 'It is aliased to `foldl`');
    })();
  });

  test.group('#reduceRight', function() {
    (function worksForArrays() {
      var passed = true, subject = [[0, 1], [2, 3], [4, 5]];

      var reduced = ç.reduceRight(subject, function(collection, el, index, list) {
        passed = passed && arrayEquals(el, subject[index]) && arrayEquals(subject, list);
        return collection.concat(el);
      }, []);

      test.assert(passed, 'Properly passes arguments when list is an array');
      test.assert(arrayEquals(reduced, [4, 5, 2, 3, 0, 1]), 'Right reduces to a value for arrays');
    })();

    (function throwingError() {
      passed = true;

      try {
        ç.reduceRight(invalid, function() {});
      } catch(msg) {
        test.assert(msg === 'ç.reduceRight works only with arrays.', 'Throws an error when the object is not an array');
      }
    })();

    (function aliases() {
      test.assert(ç.reduceRight === ç.foldr, 'It is aliased to `foldr`');
    })();
  });

  test.group('#find', function() {
    (function findsExistingElement() {
      var result = ç.find(array, function(num) {
        return num % 2 === 0;
      });

      test.assert(result === 2, 'Returns matched element');
    })();

    (function returnsUndefined() {
      var result = ç.find(array, function(num) {
        return num > 100;
      });

      test.assert(typeof result === 'undefined', 'Returns undefined when no element matches');
    })();

    (function passingContext() {
      var passed = false, context = { property: 'value' };

      ç.find(array, function(num) {
        passed = this.property === 'value';
      }, context);

      test.assert(passed, 'Context is properly passed');
    })();

    (function throwsError() {
      try {
        ç.find(invalid);
      } catch (msg) {
        test.assert(msg === 'ç.find works only with arrays.', 'Throws an error when collection is not an array');
      }
    })();

    (function aliases() {
      test.assert(ç.find === ç.detect, 'It is aliased to `detect`');
    })();
  });
});
