// This module defines constants to represent playback state, for use throughout the application.
// Kind of like Java Enums.

// 3 values:
// * PLAYING
// * PAUSED
// * STOPPED
'use strict';
angular.module('posytifApp')
  .constant('playerStates', {
    PLAYING: 'playing',
    PAUSED: 'paused',
    STOPPED: 'stopped'
  });
