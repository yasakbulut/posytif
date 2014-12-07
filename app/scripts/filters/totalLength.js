// Filter that calculates the total duration of the tracks in a playlist.

// Given a list of tracks, traverse it and sum each duration.
// Note: foreach is used because Firebase prefers to store arrays as objects,
// which prevents us from using the `length` property
angular.module('posytifApp')
  .filter('totalLength', function(){
    return function(input){
      input = input || [];
      var result = 0;
      for (var i in input) {
        result += input[i].duration_ms || 0;
      }
      return result;
    }
  });
