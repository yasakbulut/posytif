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
  .controller('ControlsCtrl', function ($scope, PlayerService, playerStates) {
    $scope.position = PlayerService.getPosition();
    $scope.current = PlayerService.getCurrent();
    $scope.state = PlayerService.getState();
    $scope.states = playerStates;

    $scope.play = function () {
      PlayerService.play();
    };

    $scope.pause = function () {
      PlayerService.pause();
    };
    $scope.previous = function () {
      PlayerService.previous();
    };
    $scope.next = function () {
      PlayerService.next();
    };
    $scope.stop = function () {
      PlayerService.stop();
    };
  });
