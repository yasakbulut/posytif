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
  .controller('PlaylistCtrl', function ($scope, $routeParams, PlaylistService) {

    $scope.playlist = PlaylistService.getPlaylistById($routeParams.playlistId);

    $scope.removeTrackFromPlaylist = function(track, playlist){
      PlaylistService.removeTrackFromPlaylist(track, playlist.$id);
    }

  });
