'use strict';

/**
 * @ngdoc overview
 * @name posytifApp
 * @description
 * # posytifApp
 *
 * Main module of the application.
 */
angular
  .module('posytifApp', [
    'firebase', 'ngRoute', 'ui.bootstrap', 'ngAnimate'
  ]).config(function($routeProvider){
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
