// Directive used to add specified CSS classes on elements for a specified period of time.

// Makes use of 3 attributes added to the element:
// 1. `hoc-expression`: the angular expression to watch for changes
// 2. `hoc-class-name`: the CSS class name to add when a change is detected
// 3. `hoc-duration`: the time (in ms) before the CSS class is removed
angular.module('posytifApp')
  .directive('highlightOnChange',
    function($timeout){
      return {
        restrict: 'A',
        link: function (scope, element, attr) {
          scope.$watch(attr.hocExpression,function(newValue, oldValue){
            if(newValue > oldValue){
              element.addClass(attr.hocClassName);
                $timeout(function(){
                  element.removeClass(attr.hocClassName);
                }, attr.hocDuration);
            }
          });
        }
      };
    });
