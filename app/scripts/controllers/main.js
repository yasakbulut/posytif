'use strict';

/**
 * @ngdoc function
 * @name posytifApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Main controller of the posytifApp. Contains behaviour that's available everywhere.
 */
angular.module('posytifApp')
  .controller('MainCtrl', function ($scope, SpotifyService, $routeParams, PlaylistService, AuthService, PlayerService, QueueService, playerStates) {

    $scope.loginStatus = AuthService.loginStatus;
    if($scope.loginStatus.loggedIn){
      $scope.playlists = PlaylistService.getPlaylistsOfUser();
    }else{
      var unbindWatcher = $scope.$watch('loginStatus.loggedIn', function(newValue, oldValue){
        if(newValue !== oldValue && newValue === true){
          $scope.playlists = PlaylistService.getPlaylistsOfUser();
          unbindWatcher();
        }
      });
    }

    $scope.addTrackToPlaylist = function(track){
      PlaylistService.addTrackToPlaylist(track, track.destinedPlaylist.$id);
    };

    $scope.playTrack = function (track) {

      QueueService.enqueue(track);

      PlayerService.next();
      if(PlayerService.getState().playState !== playerStates.PLAYING){
        PlayerService.play();
      }
    };

    $scope.queueTrack = function (track) {
      QueueService.enqueue(track);
    };
  });
