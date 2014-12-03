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
  .factory('Player', function (playerStates, Queue, $interval) {

    var player = {
      currentTrack: {},
      position: {
        seconds: 0
      },
      state: playerStates.STOPPED,
      statePromise: null
    };

    var getCurrent = function(){
      return player.currentTrack;
    };

    var play = function(){
      if(!player.currentTrack){
        angular.copy(Queue.getNext(), player.currentTrack);
      }
      if(player.currentTrack === null){
        return;
      }
      player.statePromise = $interval(tick, 1000);
      player.state = playerStates.PLAYING;
    };

    var pause = function(){
      player.state = playerStates.PAUSED;
      $interval.cancel(player.statePromise);
      console.log('pause called');
    };

    var stop = function(){
      player.state = playerStates.STOPPED;
      angular.copy({}, player.currentTrack);
      player.position.seconds = 0;
      $interval.cancel(player.statePromise);
      //Queue.empty();
      console.log('stop called');
    };

    var next = function(){
      var nextSong = Queue.getNext();
      if(nextSong === null){
        stop();
      }else{
        angular.copy(nextSong, player.currentTrack);
        player.position.seconds = 0;
      }
      console.log('next called');
    };

    var previous = function(){
      var previousSong = Queue.getPrevious();
      if(previousSong === null){
        stop();
      }else{
        angular.copy(previousSong, player.currentTrack);
        player.position.seconds = 0;
      }
      console.log('previous called');
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

    return {
      getCurrent: getCurrent,
      play: play,
      pause: pause,
      stop: stop,
      next: next,
      previous: previous,
      getPosition: getPosition
    };

  });
