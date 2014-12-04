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
  .controller('PlaylistCtrl', function ($scope, $routeParams, PlaylistService, $location) {

    $scope.playlist = PlaylistService.getPlaylistById($routeParams.playlistId);
    $scope.playlist.$loaded().then(function(obj){
      if(obj.$value === null){
        $scope.playlistNotFound = true;
      }});
    $scope.removeTrackFromPlaylist = function(track, playlist){
      PlaylistService.removeTrackFromPlaylist(track, playlist.$id);
    };

    $scope.deletePlaylist = function(playlist){
      PlaylistService.deletePlaylist(playlist.$id);
      $location.path('/search');
    };
  });
