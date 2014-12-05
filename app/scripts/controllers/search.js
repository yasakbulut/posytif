// Controller for the Search Page.

//Depends on the `SpotifyService` to perform the searches.
'use strict';
angular.module('posytifApp')
  .controller('SearchCtrl', function ($scope, SpotifyService, $routeParams, $route) {

    // Get the search query from the URL.
    $scope.query = $routeParams.query;

    // If there is a query present in the URL, immediately perform the search, and expose the
    // * albums
    // * artists
    // * tracks
    if($scope.query){
      SpotifyService.search($scope.query).then(function(data){
        $scope.albums = data.albums;
        $scope.artists = data.artists;
        $scope.tracks = data.tracks;
      });
    }

    // Expose the search function. Note that this does not, in fact, perform a search. It just updates the
    // URL, and mechanism described above takes care of actually performing the search.
    $scope.search = function(query){
      $route.updateParams({query: query});
    };
  });
