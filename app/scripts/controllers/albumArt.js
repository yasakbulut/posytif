/**
 * Created by yasa on 01/12/14.
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
  .controller('AlbumArtCtrl', function ($scope, Player) {
    $scope.defaultArt = 'http://placekitten.com/g/256/256';
    $scope.current = Player.getCurrent();
  });
