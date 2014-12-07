// Directive for tracks

// Represents a tracks a-la-web-component style.
'use strict';
angular.module('posytifApp').
  directive('pstTrack', function(){
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'views/templates/track.html'
    };
  });
