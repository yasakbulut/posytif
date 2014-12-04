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
