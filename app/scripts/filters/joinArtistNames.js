// Filter that joins artist names of a song.

// Given an artist list, traverse it, collecting names along the way, and join the results using `, `.
// For example:
// `[{name: 'Mazhar'},{name: 'Fuat'},{name: 'Ozkan'}]` will result in `Mazhar, Fuat, Ozkan`
angular.module('posytifApp')
  .filter('joinArtistNames', function(){
    return function(input){
      input = input || [];
      return input.map(function(artist){return artist.name}).join(", ");
    }
  });
