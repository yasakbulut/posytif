/**
 * Created by yasa on 03/12/14.
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
  .factory('PlaylistService', function ($firebase) {

    return function(userUid){
      var ref = new Firebase('https://posytif-data.firebaseio.com/users/').
        child(userUid+'/playlists');

      return $firebase(ref).$asArray();
    };

  });
