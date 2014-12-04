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
  .controller('AlbumCtrl', function ($scope, SpotifyService, $routeParams) {

    var albumId = $routeParams.albumId;

    SpotifyService.getAlbum(albumId).then(function(album){
      $scope.album = album;
    });

    SpotifyService.getTracksOfAlbum(albumId).then(function(tracks){
      $scope.tracks = tracks;
    });

  });
