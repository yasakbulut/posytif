// Controller for the album art area.

// Depends on `PlayerService` to get the current tracks.
'use strict';
angular.module('posytifApp')
  .controller('AlbumArtCtrl', function ($scope, PlayerService) {
    // Provide a default art, to be used if no track is playing
    $scope.defaultArt = 'http://placekitten.com/g/256/256';

    // Get a reference to the current track object and put it in the scope.
    $scope.current = PlayerService.getCurrent();
  });
