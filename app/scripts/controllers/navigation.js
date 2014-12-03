/**
 * Created by yasa on 03/12/14.
 */
'use strict';

/**
 * @ngdoc function
 * @name posytifApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the posytifApp
 */
angular.module('posytifApp')
  .controller('NavigationCtrl', function ($scope) {

    $scope.createPlaylist = function(name){
      $scope.playlists.$add({
        name: name,
        tracks: []
      });
    };

  });
