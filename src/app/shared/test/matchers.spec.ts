import { isEqual } from 'lodash';

beforeEach(() => {
  jasmine.addMatchers({
    toHaveCssClass: function(util, customEqualityTests) {
      return {compare: buildError(false), negativeCompare: buildError(true)};

      function buildError(isNot: boolean) {
        return function(actual: HTMLElement, className: string) {
          return {
            pass: actual.classList.contains(className) === !isNot,
            message: `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to contain the CSS class "${className}"`
          };
        };
      }
    },

    toDeepEqual: function(util, customEqualityTesters) {
       return {
         compare: function(actual, expected) {
           return {
             pass: isEqual(actual, expected)
           };
         }
       };
    }
  });
});
