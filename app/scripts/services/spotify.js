// The Spotify Service

// This service is responsible for all the track metadata. Uses Spotify Web API. All the requests are cached. This is
// good for 2 things:
// 1. No unnecessary queries: less bandwidth wasted, Spotify endpoints are happy
// 2. Already-made queries happen instantaneously

// Exports the following properties:
// * search
// * getTopTracks
// * getArtist
// * getAlbum
// * getAlbumsOfArtist
// * getTracksOfAlbum
'use strict';
angular.module('posytifApp')
  .factory('SpotifyService', function ($http) {

    // The config object that will be used to configure the `$http` service, to enable caching.
    var defaultConfig = {
      cache: true
    };

    // ## Search
    // Searches Spotify for a given query.
    var search = function(query, type){
      // Search for all items by default.
      type = type||'album,artist,track';
      // Get the results, extract the data.
      return $http.get('https://api.spotify.com/v1/search?q='+query+'&type='+type+'&limit=50', defaultConfig).
        then(function(response){
          return response.data;
        });
    };

    // ## Get Top Tracks
    // Gets the top tracks for an artist, in a given country.
    var getTopTracks = function(artistId, country){
      // Get the results, extract the data.
      return $http.get('https://api.spotify.com/v1/artists/'+artistId+'/top-tracks?country='+country, defaultConfig).
        then(function(response){
          return response.data.tracks;
        });
    };

    // ## Get Artist
    // Gets info about an artist.
    var getArtist = function(artistId){
      // Get the results, extract the data.
      return $http.get('https://api.spotify.com/v1/artists/'+artistId, defaultConfig).
        then(function(response){
          return response.data;
        });
    };

    // ## Get Album
    // Gets info about an album.
    var getAlbum = function(albumId){
      // Get the results, extract the data.
      return $http.get('https://api.spotify.com/v1/albums/'+albumId, defaultConfig).
        then(function(response){
          return response.data;
        });
    };

    // ## Get Albums of Artist
    // Gets the list of albums, given an artist and country.
    var getAlbumsOfArtist = function(artistId, country){
      // Get the results, extract the data.
      return $http.get('https://api.spotify.com/v1/artists/'+artistId+'/albums?country='+country, defaultConfig).
        then(function(response){
          return response.data.items;
        });
    };

    // ## Get Tracks of Album
    // Gets the track list for an album.
    var getTracksOfAlbum = function(albumId){
      // Get the album first.
      return getAlbum(albumId).then(function(album){
        // Then get its tracks.
        return $http.get('https://api.spotify.com/v1/albums/'+albumId+'/tracks', defaultConfig).
          then(function(response){
            // Then set the `album` property on each track. This is necessary, because the rest of the system
            // assumes each track has an `album` property, whereas this endpoint returns tracks without the `album`
            // property.
            return response.data.items.map(function(item){item.album = album; return item});
          });
      });

    };

    return {
      search: search,
      getTopTracks: getTopTracks,
      getArtist: getArtist,
      getAlbum: getAlbum,
      getAlbumsOfArtist: getAlbumsOfArtist,
      getTracksOfAlbum: getTracksOfAlbum
    };
  });
