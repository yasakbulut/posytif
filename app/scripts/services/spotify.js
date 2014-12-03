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
  .factory('SpotifyService', function ($http) {

    var search = function(query, type){
      //Search for all items by default
      type = type||'album,artist,track';
      return $http.get('https://api.spotify.com/v1/search?q='+query+'&type='+type+'&limit=50').
        then(function(response){
          return response.data;
        });
    };

    var getTopTracks = function(artistId, country){
      return $http.get('https://api.spotify.com/v1/artists/'+artistId+'/top-tracks?country='+country+'').
        then(function(response){
          return response.data.tracks;
        });
    };

    var getArtist = function(artistId){
      return $http.get('https://api.spotify.com/v1/artists/'+artistId).
        then(function(response){
          return response.data;
        });
    };

    var getAlbumsOfArtist = function(artistId, country){
      return $http.get('https://api.spotify.com/v1/artists/'+artistId+'/albums?country='+country).
        then(function(response){
          return response.data.items;
        });
    };
    var getTracksOfAlbum = function(albumId){
      return $http.get('https://api.spotify.com/v1/albums/'+albumId+'/tracks').
        then(function(response){
          return response.data.items;
        });
    };

    return {
      search: search,
      getTopTracks: getTopTracks,
      getArtist: getArtist,
      getAlbumsOfArtist: getAlbumsOfArtist,
      getTracksOfAlbum: getTracksOfAlbum
    };
  });
