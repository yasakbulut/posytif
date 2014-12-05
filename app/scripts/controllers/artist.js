// Controller for Artist Page.

// Depends on `SpotifyService` to query artist data.
'use strict';
angular.module('posytifApp')
  .controller('ArtistCtrl', function ($scope, SpotifyService, $routeParams) {

    // Get the specified artist id from the URL.
    var artistId = $routeParams.artistId;

    // Set the country to be used in Spotify queries.
    var country = 'TR'; //TODO: detect this

    // Get artist info and put it in the scope.
    SpotifyService.getArtist(artistId).then(function(artist){
      $scope.artist = artist;
    });

    // Get the top tracks of the artist and put them in the scope.
    SpotifyService.getTopTracks(artistId,country).then(function(tracks){
      $scope.topTracks = tracks;
    });

    // Get the albums of the artist and put them in the scope.
    SpotifyService.getAlbumsOfArtist(artistId,country).then(function(albums){
      $scope.albums = albums;
    });

    // Deprecated // TODO
    //$scope.getTracksOfAlbum = function(album){
    //  SpotifyService.getTracksOfAlbum(album.id).then(function(tracks){
    //    $scope.tracksOfSelectedAlbum = tracks;
    //  });
    //};

  });
