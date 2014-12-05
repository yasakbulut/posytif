// Controller for the playlist page.
'use strict';
angular.module('posytifApp')
  .controller('PlaylistCtrl', function ($scope, $routeParams, PlaylistService, $location) {

    // Expose a model to keep track of name editing state.
    $scope.editingName = false;

    // Get the requested playlist.
    $scope.playlist = PlaylistService.getPlaylistById($routeParams.playlistId);

    // If the requested playlist is not found, expose this information, so that an error message can be shown.
    $scope.playlist.$loaded().then(function(obj){
      if(obj.$value === null){
        $scope.playlistNotFound = true;
      }});

    // Expose the track removal behaviour. The track and the playlist objects are always available in this
    // scope, so the function expects the full objects.
    $scope.removeTrackFromPlaylist = function(track, playlist){
      PlaylistService.removeTrackFromPlaylist(track, playlist.$id);
    };

    // Expose the name-edit state setting behaviour..
    $scope.editName = function(){
      $scope.editingName = true;
    };

    // Expose the playlist renaming behaviour.
    $scope.renamePlaylist = function(playlist, newName){
      playlist.name = newName;
      // `playlist` is a firebase object reference, so calling `$save` on it synchronizes the data.
      playlist.$save();
      // We are done editing the name.
      $scope.editingName = false;
    };

    // Expose the playlist removal behaviour.
    $scope.deletePlaylist = function(playlist){
      PlaylistService.deletePlaylist(playlist.$id);
      // After deleting the playlist, we should navigate away.
      $location.path('/search');
    };
  });
