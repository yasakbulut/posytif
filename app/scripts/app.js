// The Posytif Application Module

// The module depends on `firebase` for data storage and authentication, `ngRoute` for client-side routing,
// `ui.bootstrap` for the `tabSelect` directive and `ngAnimate` for the list add/remove animations.
'use strict';
angular
  .module('posytifApp', [
    'firebase', 'ngRoute', 'ui.bootstrap', 'ngAnimate'
  ]).config(function($routeProvider){
    // Configure the route provider, mapping views to controllers.
    $routeProvider.
      when('/playlist/:playlistId', {
        templateUrl: 'views/playlist.html',
        controller: 'PlaylistCtrl'
      }).
      when('/queue', {
        templateUrl: 'views/queue.html',
        controller: 'QueueCtrl'
      }).
      when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      }).
      when('/search/:query', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      }).
      when('/artist/:artistId', {
        templateUrl: 'views/artist.html',
        controller: 'ArtistCtrl'
      }).
      when('/album/:albumId', {
        templateUrl: 'views/album.html',
        controller: 'AlbumCtrl'
      }).
      otherwise({
        redirectTo: '/search'
      });
  });
