// Controller for the queue view

'use strict';
angular.module('posytifApp')
  .controller('QueueCtrl', function($scope, QueueService){

    //Expose the queue getter function
    $scope.getQueues = function(){
      return QueueService.getUpcoming();
    };
  });
