// Playlist storage service.

// Uses Firebase to store playlist data, and provide 3-way data bindings.
// Exposes:
// * getPlaylistsOfUser
// * addTrackToPlaylist
// * removeTrackFromPlaylist
// * getPlaylistById
// * deletePlaylist
'use strict';
angular.module('posytifApp')
  .factory('PlaylistService', function ($firebase, AuthService) {

    // This reference will be initialized using the logged-in user's id.
    var rootRef = null;

    // Return the playlists of the user as a Firebase Array.
    var getPlaylistsOfUser = function(){
      // Get the user's uid.
      var userUid = AuthService.getUser().uid;
      // Construct a firebase reference using the id obtained above.
      var ref = new Firebase('https://posytif-data.firebaseio.com/users/').
        child(userUid+'/playlists');
      // Set the root reference for later use.
      rootRef = ref;
      // Return the playlists as an array reference.
      return $firebase(ref).$asArray();
    };

    // Return a playlist's details.
    var getPlaylistById = function(playlistId){
      if(rootRef !== null){
        // Using the cached root reference, get its child with the given id.
        var ref = rootRef.child(playlistId);
        // Return the details as an object reference.
        return $firebase(ref).$asObject();
      }
    };

    // Add a track to a given playlist.
    var addTrackToPlaylist = function(track, playlistId){
      if(rootRef !== null){
        // Using the cached root reference, get its child's tracks with the given id.
        var ref = rootRef.child(playlistId+'/tracks');
        // Add the given track to the tracks array.
        $firebase(ref).$asArray().$add(track);
      }
    };

    // Removes a track from a given playlist.
    var removeTrackFromPlaylist = function(trackId, playlistId){
      if(rootRef !== null){
        // Using the cached root reference, get the grandchild with the given ids.
        var ref = rootRef.child(playlistId+'/tracks/'+trackId);
        // Destroy the child.
        $firebase(ref).$remove();
      }
    };

    // Removes a playlist.
    var deletePlaylist = function(playlistId){
      if(rootRef!=null){
        // Using the cached root reference, get its child with the given id.
        var ref = rootRef.child(playlistId);
        // Destroy the child.
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
