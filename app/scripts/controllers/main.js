// Main controller. Contains behaviour available to all child controllers and their views.

// Depends on `PlaylistService`, `AuthService`, `PlayerService`, `QueueService` and uses constants from `playerStates`.
'use strict';
angular.module('posytifApp')
  .controller('MainCtrl', function ($scope, $routeParams, PlaylistService, AuthService, PlayerService, QueueService, playerStates, $document) {

    // Expose the login status.
    $scope.loginStatus = AuthService.loginStatus;

    // Listen for changes on login status. If the user becomes logged in, load her playlists.
    // If she logs off, clear the playlist data from the scope.
    AuthService.onLoginStatus(function(user){
      if(user){
        $scope.playlists = PlaylistService.getPlaylistsOfUser();
      }else{
        $scope.playlists = [];
      }
    });

    // ## Play Now
    // Expose the "play now" functionality.
    $scope.playTrack = function (track) {

      // Add the requested track to the queue, so that the current song will be pushed to the history.
      QueueService.enqueue(track);

      // Get to the newly queued song.
      PlayerService.next();

      // If we were not playing before, we will start the playback. If we were playing, we'll just continue playing
      // the new song. No action necessary.
      if(PlayerService.getState().playState !== playerStates.PLAYING){
        PlayerService.play();
      }
    };

    // ## Play Playlist
    // Expose the "play playlist" functionality.
    $scope.playPlaylist = function(tracks){
      // First, we need to create an array containing the tracks, because `QueueService` expects an array of tracks.
      // Also, this is needed because playlist tracks are not arrays, but firebase collections. So, we convert the
      // firebase collection to an array.
      var trackList = [];
      for(var i in tracks){
        trackList.push(tracks[i]);
      }

      // Populate the upcoming tracks with the newly created array.
      QueueService.setQueue(trackList);

      // Get the next song in the queue, which should be the first song of the playlist.
      PlayerService.next();

      // If we were not playing before, we will start the playback. If we were playing, we'll just continue playing
      // the new song. No action necessary.
      if(PlayerService.getState().playState !== playerStates.PLAYING){
        PlayerService.play();
      }
    };

    // ## Other

    // Expose the "queue track" functionality. This is fairly straightforward.
    $scope.queueTrack = function (track) {
      QueueService.enqueue(track);
    };

    // Expose track addition functionality. The track and the playlist objects are always available in the relevant
    // scopes, so the function expects the full objects.
    $scope.addTrackToPlaylist = function(track, playlist){
      PlaylistService.addTrackToPlaylist(track, playlist.$id);
    };

    // Initialize the material design library. This is needed because, `bootstrap-material` does not yet have
    // angular bindings.
    $document.ready(function(){
      jQuery.material.init();
    });
  });
