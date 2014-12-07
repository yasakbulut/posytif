// The music "player" service.

// This service depends on a QueueService to provide a track to be played. When playing, it sets an interval of `1s`
// to update the position in the song, and to see if the song is ended. Read on for details.
// Exposes the following properties:
// * getCurrent
// * play
// * pause
// * stop
// * next
// * previous
// * getPosition
// * getState
angular.module('posytifApp')
  .factory('PlayerService', function (playerStates, QueueService, $interval) {

    // The player object. Holds the global state of the player.
    var player = {
      currentTrack: {},
      position: {
        seconds: 0
      },
      state: {
        playState:playerStates.STOPPED
      },
      statePromise: null
    };

    // The time, in seconds, after which the previous button will return to the beginning of the current song,
    // instead of going back to the previous song.
    var PREVIOUS_GRACE_PERIOD = 5;

    // ## Return the current track, playing or paused.
    var getCurrent = function(){
      return player.currentTrack;
    };

    // ## Start playback.
    var play = function(){
      // If there is no current track, request the next song from the queue.
      if(!player.currentTrack || !player.currentTrack.duration){
        var nextSong = QueueService.getNext();
        // If there is no next song, just return and do nothing.
        if(nextSong === null){
          return;
        }else{
          // Set the new track
          setCurrentTrack(nextSong);
        }
      }
      // Set the interval to update the position once a second, thus "moving the playhead"/
      player.statePromise = $interval(tick, 1000);
      // Set the player state to PLAYING.
      player.state.playState = playerStates.PLAYING;
    };

    // ## Pause the player
    var pause = function(){
      // Cancel the interval previously set, to stop the "playhead to move"/
      $interval.cancel(player.statePromise);
      // Set the player state to PAUSED.
      player.state.playState = playerStates.PAUSED;
    };

    // ## Stop
    var stop = function(){
      // Cancel the interval previously set, to stop the "playhead to move"/
      $interval.cancel(player.statePromise);
      // Move the "playhead" to the start of the song.
      player.position.seconds = 0;
      // Clear the current song.
      angular.copy({}, player.currentTrack);
      // Set the state to STOPPED.
      player.state.playState = playerStates.STOPPED;
    };


    // ## Skip song (Next)
    var next = function(){
      // Request the next song from the queue.
      var nextSong = QueueService.getNext();
      // If there is no next track in the queue, stop the player.
      if(nextSong === null){
        stop();
      }else{
        // Set the new track
        setCurrentTrack(nextSong);
      }
    };

    // ## Previous song
    var previous = function(){
      // If the playback of the current song is recently started, go back one song.
      if(player.position.seconds < PREVIOUS_GRACE_PERIOD){
        // Request the next song from the queue.
        var previousSong = QueueService.getPrevious();
        // If there is no previous track in the queue, stop the player.
        if(previousSong === null){
          stop();
        }else{
          // Set the new track
          setCurrentTrack(previousSong);
        }
      }else{
        // If we are well into the song, return to the beginning of it.
        player.position.seconds = 0;
      }
    };

    // Return the current position.
    var getPosition = function(){
      return player.position;
    };

    // Return the current state.
    var getState = function(){
      return player.state;
    };

    // ## Private Methods

    // Update the current track, and move the "playhead" to the start of the song.
    var setCurrentTrack = function(track){
      // Convert the tracks' ms into seconds.
      player.currentTrack.duration = track.duration_ms / 1000;
      // Keep thrack of the metadata
      player.currentTrack.name = track.name;
      player.currentTrack.artist = track.artists.map(function(artist){return artist.name}).join(", ");
      player.currentTrack.album = {
        name: track.album.name,
        art: track.album.images.length>0?track.album.images[0].url:''
      };
      // Reset the "playhead"
      player.position.seconds = 0;
    };

    // Move the "playhead", if we have finished this song, go to the next one.
    var tick = function(){
      if(player.currentTrack){
        if(player.position.seconds < player.currentTrack.duration){
          player.position.seconds++;
        }else{
          next();
        }
      }
    };

    return {
      getCurrent: getCurrent,
      play: play,
      pause: pause,
      stop: stop,
      next: next,
      previous: previous,
      getPosition: getPosition,
      getState: getState
    };

  });
