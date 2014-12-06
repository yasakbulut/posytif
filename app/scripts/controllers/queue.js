'use strict';
angular.module('posytifApp')
  .controller('QueueCtrl', function($scope, QueueService){
    $scope.getQueues = function(){
      return QueueService.getUpcoming();
    };
  });
