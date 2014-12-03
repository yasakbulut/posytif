/**
 * Created by yasa on 03/12/14.
 */
'use strict';

/**
 * @ngdoc function
 * @name posytifApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the posytifApp
 */
angular.module('posytifApp')
  .controller('NavigationCtrl', function ($scope, PlaylistService, AuthService) {

    $scope.loginStatus = AuthService.loginStatus;
    var unbindWatcher = $scope.$watch('loginStatus.loggedIn', function(newValue, oldValue){
      if(newValue !== oldValue
          && newValue === true){
        $scope.playlists = PlaylistService.getPlaylistsOfUser();
        unbindWatcher();
      }
    });

    $scope.createPlaylist = function(name){
      $scope.playlists.$add({
        name: name,
        tracks: []
      });
    }
  });
