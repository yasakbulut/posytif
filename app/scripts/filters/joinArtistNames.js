/**
 * Created by yasa on 04/12/14.
 */
/**
* @ngdoc function
* @name posytifApp.controller:MainCtrl
* @description
* # MainCtrl
* Main controller of the posytifApp. Contains behaviour that's available everywhere.
*/
angular.module('posytifApp')
  .filter('joinArtistNames', function(){
    return function(input){
      input = input || [];
      return input.map(function(artist){return artist.name}).join(", ");
    }
  });
