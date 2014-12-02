/**
 * Created by yasa on 02/12/14.
 */
'use strict';

/**
 * @ngdoc function
 * @name posytifApp.controller:AlbumArtCtrl
 * @description
 * # AlbumArtCtrl
 * Controller of the album art module of the posytifApp
 */
angular.module('posytifApp')
  .controller('QueueCtrl', function($scope, $rootScope, Queue){
    $scope.getUpcoming = function(){
      $scope.upcoming = Queue.getUpcoming();
    };
    $scope.getUpcoming();
  });
