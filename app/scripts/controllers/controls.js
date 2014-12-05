//Controller for the Player Controls view.

// Depends on `PlayerService` for obvious reasons, and uses constants from `playerStates`.
'use strict';
angular.module('posytifApp')
  .controller('ControlsCtrl', function ($scope, PlayerService, playerStates) {
    // Expose position, current track info and player state, for usage in the view.
    $scope.position = PlayerService.getPosition();
    $scope.current = PlayerService.getCurrent();
    $scope.state = PlayerService.getState();
    $scope.states = playerStates;

    // Expose play, pause, previous, next functions for usage in view.
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
  });
