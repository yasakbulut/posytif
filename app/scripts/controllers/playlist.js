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
  .controller('PlaylistCtrl', function ($scope, $routeParams, PlaylistService, AuthService) {
    var playlists = PlaylistService(AuthService.getUser().uid);
    playlists.$loaded().then(function(){
       $scope.playlist = playlists.$getRecord($routeParams.playlistId);
    });
  });
