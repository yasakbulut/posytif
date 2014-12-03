/**
 * Created by yasa on 03/12/14.
 */
'use strict';

/**
 * @ngdoc function
 * @name posytifApp.controller:AlbumArtCtrl
 * @description
 * # AlbumArtCtrl
 * Controller of the album art module of the posytifApp
 */
angular.module('posytifApp').
  directive('pstTrack', function(){
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'views/templates/track.html'
    };
  });
