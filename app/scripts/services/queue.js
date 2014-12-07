// The queue service

// The queue service uses a system similar to the queue system found in Spotify. It maintains two queues,
// one named "standard" and the other "priority". Playing a playlist places all its tracks into the standard
// queue, whereas using the "queue" functionality, places the song in the priority queue. This way, normal
// playback flow can be temporarily altered.

// Exports the following properties:
// * enqueue
// * setQueue
// * getNext
// * getPrevious
// * empty
// * getUpcoming

'use strict';
angular.module('posytifApp')
  .factory('QueueService', function () {

    // The index of the current song in the standard queue.
    var index = -1;

    // Initialize the queues.
    var queues = {
      standard: [],
      priority: []
    };

    // ## Enqueue
    // Place the given track in the priority queue, so that it will be played next (or after already queued songs).
    // Set `insertAtBeginning` to true, to place the given the track to the first place. This is useful for
    // behaviours such as "Play Now"
    var enqueue = function(track, insertAtBeginning){
      if(insertAtBeginning){
        queues.priority.unshift(track);
      }else{
        queues.priority.push(track);
      }
    };

    // ## Set Queue
    // Discard the upcoming songs in the standard queue, and replace them with the given tracks. This is useful for
    // behaviours such as "Play playlist"
    var setQueue = function(list){
      // Keep the first part of the standard queue up to the current song, and concatenate it with the given tracks.
      queues.standard = queues.standard.slice(0,index+1).concat(list);
    };

    // ## Get Next
    // Gets the next song to be played, depending on the contents of the queues.
    var getNext = function(){
      // If the priority queue is not empty, get a song from there.
      if(queues.priority.length>0){
        // get the next song in the priority queue
        var next = queues.priority.shift();
        // add it next to the current song in the standard queue
        queues.standard.splice(index+1, 0, next);
        // go to the newly inserted song
        index++;
        return next;
      }
      // If we still have songs in the standard queue, get a song from there.
      if(index<queues.standard.length-1){
        // go to the next song, and return it.
        index++;
        return queues.standard[index];
      }else{
        // if we are on the very last song, just increment the index beyond the queue.
        if(index == queues.standard.length-1){
          index++;
        }
        // we have no next songs.
        return null;
      }
    };

    // ## Get previous
    // Get the previous song in the queue.
    var getPrevious = function(){
      // If we have songs played before, return the previous.
      if(index>0){
        index--;
        return queues.standard[index];
      }else{
        // If we are on the first song, just decrement the index before the first element.
        if(index == 0){
          index--;
        }
        // we have no previous songs.
        return null;
      }
    };

    // ## Empty
    // Empty the standard queue.
    var empty = function(){
      queues.standard = [];
      index = -1;
    };

    // ## Get Upcoming
    // Return a list of the upcoming songs.
    var getUpcoming = function(){
      // Concatenate the priority queue with the "rest" of the standard queue, and return it.
      return queues.priority.concat(queues.standard.slice(index+1, queues.standard.length));
    };

    return {
      enqueue: enqueue,
      setQueue: setQueue,
      getNext: getNext,
      getPrevious: getPrevious,
      empty: empty,
      getUpcoming: getUpcoming
    };

  });
