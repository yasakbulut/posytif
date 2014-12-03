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
  .controller('SearchCtrl', function ($scope, SpotifyService, $routeParams, $route) {

    $scope.query = $routeParams.query;

    $scope.search = function(query){
      $route.updateParams({query: query});
    };

    $scope.getTopTracks = function(artist){
      SpotifyService.getTopTracks(artist.id, 'TR').then(function(data){
        $scope.tracks = data.tracks;
      })
    };
    if($scope.query){
      SpotifyService.search($scope.query).then(function(data){
        $scope.albums = data.albums;
        $scope.artists = data.artists;
        $scope.tracks = data.tracks;
      });
    }
  });
