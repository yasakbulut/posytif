// Navigation Controller. Contains behaviour for the left navigation bar.
'use strict';
angular.module('posytifApp')
  .controller('NavigationCtrl', function ($scope) {
    // Expose a model to hold the to-be-created playlist's name.
    $scope.newPlaylist = {
      name: ''
    };

    // Expose a playlist creation function.
    $scope.createPlaylist = function(name){

      // Add a new playlist to the `playlists` list in the parent scope, via the `$add` method of firebase.
      // This way, 3-way data binding will take place.
      $scope.playlists.$add({
        name: name,
        tracks: []
      });
      // Clear the now-useless model.
      $scope.newPlaylist.name = '';
    };

  });
