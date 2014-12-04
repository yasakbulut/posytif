/**
 * Created by yasa on 04/12/14.
 */
angular.module('posytifApp')
  .directive('highlightOnAdd',
    function($timeout){
      return {
        restrict: 'A',
        link: function (scope, element, attr) {
          scope.$watch('playlist.tracks | trackCount',function(newValue, oldValue){
            if(newValue > oldValue){
              element.addClass('highlight-on-add');
                $timeout(function(){
                  element.removeClass('highlight-on-add');
                }, 1000);
            }
          });
        }
      };
    });
