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
      if(!player.currentTrack || !player.currentTrack.duration){
        var nextSong = QueueService.getNext();
        if(nextSong === null){
          return;
        }else{
          setCurrentTrack(nextSong);
          player.position.seconds = 0;
        }
      }
      player.statePromise = $interval(tick, 1000);
      player.state.playState = playerStates.PLAYING;
      console.log('play called', player);
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
      console.log('stop called', player);
    };

    var next = function(){
      var nextSong = QueueService.getNext();
      if(nextSong === null){
        stop();
      }else{
        setCurrentTrack(nextSong);
        player.position.seconds = 0;
      }
      console.log('next called', player);
    };

    var previous = function(){
      var previousSong = QueueService.getPrevious();
      if(previousSong === null){
        stop();
      }else{
        setCurrentTrack(previousSong);
        player.position.seconds = 0;
      }
      console.log('previous called', player);
    };

    var setCurrentTrack = function(track){
      player.currentTrack.duration = track.duration_ms / 1000;
      player.currentTrack.name = track.name;
      player.currentTrack.artist = track.artists.map(function(artist){return artist.name}).join(", ");
      player.currentTrack.album = {
        name: track.album.name,
        art: track.album.images.length>0?track.album.images[0].url:''
      }
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
