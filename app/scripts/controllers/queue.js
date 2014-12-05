'use strict';
angular.module('posytifApp')
  .controller('QueueCtrl', function($scope){
    $scope.getUpcoming = function(){
      $scope.upcoming = Queue.getUpcoming();
    };
    $scope.getUpcoming();
  });
