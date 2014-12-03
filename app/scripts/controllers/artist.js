/**
 * Created by yasa on 02/12/14.
 */
'use strict';

/**
 * @ngdoc service
 * @name posytifApp.service:Player
 * @description
 * # Player
 * Track player for posytifApp
 */
angular.module('posytifApp')
  .controller('ArtistCtrl', function ($scope, SpotifyService, $routeParams) {

    var artistId = $routeParams.artistId;

    var country = 'TR'; //TODO: detect this

    SpotifyService.getArtist(artistId).then(function(artist){
      $scope.artist = artist;
    });

    SpotifyService.getTopTracks(artistId,country).then(function(tracks){
      $scope.topTracks = tracks;
    });

    SpotifyService.getAlbumsOfArtist(artistId,country).then(function(albums){
      $scope.albums = albums;
    });

    $scope.getTracksOfAlbum = function(album){
      SpotifyService.getTracksOfAlbum(album.id).then(function(tracks){
        $scope.tracksOfSelectedAlbum = tracks;
      });
    };

  });
