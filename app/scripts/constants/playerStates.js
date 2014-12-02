/**
 * Created by yasa on 02/12/14.
 */
"use strict";

/**
 * @ngdoc constant
 * @name posytifApp.service:playerStates
 * @description
 * # playerStates
 * Player States used throughout posytifApp
 */
angular.module('posytifApp')
  .constant('playerStates', {
    PLAYING: "playing",
    PAUSED: "paused",
    STOPPED: "stopped"
  });
