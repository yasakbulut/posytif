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

    AuthService.onLoginStatus(function(user){
      if(user){
        $scope.playlists = PlaylistService.getPlaylistsOfUser();
      }else{
        $scope.playlists = [];
      }
    });

    $scope.addTrackToPlaylist = function(track, playlist){
      PlaylistService.addTrackToPlaylist(track, playlist.$id);
    };


    $scope.playTrack = function (track, album) {
      if(album){
        track.album = album;
      }
      QueueService.enqueue(track);
      PlayerService.next();
      if(PlayerService.getState().playState !== playerStates.PLAYING){
        PlayerService.play();
      }
    };

    $scope.queueTrack = function (track) {
      QueueService.enqueue(track);
    };

    $scope.playPlaylist = function(tracks){
      // this is needed b/c playlist tracks
      // are not arrays, but firebase collections
      var trackList = [];
      for(var i in tracks){
        trackList.push(tracks[i]);
      }
      QueueService.setQueue(trackList);
      PlayerService.next();
      if(PlayerService.getState().playState !== playerStates.PLAYING){
        PlayerService.play();
      }
    }
  });
