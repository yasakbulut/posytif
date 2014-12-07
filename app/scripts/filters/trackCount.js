// Filter that calculates the total number of the tracks in a playlist.

// Given a list of tracks, traverse it and count..
// Note: Because Firebase prefers to store arrays as objects,
// we couldn't simply use the `length` property
angular.module('posytifApp')
  .filter('trackCount', function(){
    return function(input){
      input = input || [];
      var result = 0;
      for (var i in input) {
        result++;
      }
      return result;
    }
  });
