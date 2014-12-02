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
  .controller('ControlsCtrl', function ($scope, Player) {
    $scope.position = Player.getPosition();
    $scope.current = Player.getCurrent();
    $scope.play = function () {
      Player.play();
    };
    $scope.pause = function () {
      Player.pause();
    };
    $scope.previous = function () {
      Player.previous();
    };
    $scope.next = function () {
      Player.next();
    };
    $scope.stop = function () {
      Player.stop();
    };
  });
