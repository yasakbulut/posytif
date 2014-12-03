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
  .controller('ArtistCtrl', function ($scope, SpotifyService, $routeParams, PlaylistService, AuthService) {

    var artistId = $routeParams.artistId;

    var country = 'TR'; //TODO: detect this

    $scope.loginStatus = AuthService.loginStatus;
    if($scope.loginStatus.loggedIn){
      $scope.playlists = PlaylistService(AuthService.getUser().uid);
    }else{
      var unbindWatcher = $scope.$watch('loginStatus.loggedIn', function(newValue, oldValue){
        if(newValue !== oldValue
          && newValue === true){
          $scope.playlists = PlaylistService(AuthService.getUser().uid);
          unbindWatcher();
        }
      });
    }

    $scope.addTrackToPlaylist = function(track){
      $scope.playlists.$getRecord(track.destinedPlaylist.$id).tracks.$asArray().$add(track);
    };

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
