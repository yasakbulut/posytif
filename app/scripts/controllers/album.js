// Controller for the album page.
//
// Depends on `SpotifyService` to get album and track data.
'use strict';
angular.module('posytifApp')
  .controller('AlbumCtrl', function ($scope, SpotifyService, $routeParams) {

    // Get the album id from the URL
    var albumId = $routeParams.albumId;

    // Get the specified album and populate the scope when it comes.
    SpotifyService.getAlbum(albumId).then(function(album){
      $scope.album = album;
    });

    // Get the tracks of the specified album and populate the scope when they come.
    SpotifyService.getTracksOfAlbum(albumId).then(function(tracks){
      $scope.tracks = tracks;
    });
  });
