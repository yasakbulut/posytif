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
  .factory('PlaylistService', function ($firebase, AuthService) {

    var rootRef = null;

    var getPlaylistsOfUser = function(){
      var userUid = AuthService.getUser().uid;
      var ref = new Firebase('https://posytif-data.firebaseio.com/users/').
        child(userUid+'/playlists');
      rootRef = ref;
      return $firebase(ref).$asArray();
    };

    var getPlaylistById = function(playlistId){
      if(rootRef !== null){
        var ref = rootRef.child(playlistId);
        return $firebase(ref).$asObject();
      }
    };

    var addTrackToPlaylist = function(track, playlistId){
      if(rootRef !== null){
        var ref = rootRef.child(playlistId+'/tracks');
        $firebase(ref).$asArray().$add(track);
      }
    };
    var removeTrackFromPlaylist = function(trackId, playlistId){
      if(rootRef !== null){
        var ref = rootRef.child(playlistId+'/tracks/'+trackId);
        $firebase(ref).$remove();
      }
    };

    var deletePlaylist = function(playlistId){
      if(rootRef!=null){
        var ref = rootRef.child(playlistId);
        $firebase(ref).$remove();
      }
    };

    return {
      getPlaylistsOfUser: getPlaylistsOfUser,
      addTrackToPlaylist: addTrackToPlaylist,
      removeTrackFromPlaylist: removeTrackFromPlaylist,
      getPlaylistById: getPlaylistById,
      deletePlaylist: deletePlaylist
    };

  });
