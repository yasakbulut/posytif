/**
 * Created by yasa on 01/12/14.
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
  .factory('PlayerService', function (playerStates, QueueService, $interval) {

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

    var getCurrent = function(){
      return player.currentTrack;
    };

    var play = function(){
      if(!player.currentTrack){
        setCurrentTrack(QueueService.getNext());
      }
      if(player.currentTrack === null || !player.currentTrack.duration){
        return;
      }
      player.statePromise = $interval(tick, 1000);
      player.state.playState = playerStates.PLAYING;
    };

    var pause = function(){
      player.state.playState = playerStates.PAUSED;
      $interval.cancel(player.statePromise);
      console.log('pause called');
    };

    var stop = function(){
      player.state.playState = playerStates.STOPPED;
      angular.copy({}, player.currentTrack);
      player.position.seconds = 0;
      $interval.cancel(player.statePromise);
      //QueueService.empty();
      console.log('stop called');
    };

    var next = function(){
      var nextSong = QueueService.getNext();
      if(nextSong === null){
        stop();
      }else{
        setCurrentTrack(nextSong);
        player.position.seconds = 0;
      }
      console.log('next called');
    };

    var previous = function(){
      var previousSong = QueueService.getPrevious();
      if(previousSong === null){
        stop();
      }else{
        setCurrentTrack(previousSong);
        player.position.seconds = 0;
      }
      console.log('previous called');
    };

    var setCurrentTrack = function(track){
      player.currentTrack.duration = track.duration_ms / 1000;
      player.currentTrack.name = track.name;
      player.currentTrack.artist = track.artists.map(function(artist){return artist.name}).join(", ");
    };

    var tick = function(){
      if(player.currentTrack){
        if(player.position.seconds < player.currentTrack.duration){
          player.position.seconds++;
        }else{
          next();
        }
      }
    };

    var getPosition = function(){
      return player.position;
    };

    var getState = function(){
      return player.state;
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
