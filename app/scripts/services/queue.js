/**
 * Created by yasa on 02/12/14.
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
  .factory('QueueService', function () {

    var queue = [];
    var priorityQueue = [];
    var index = -1;

    var enqueue = function(track, insertAtBeginning){
      if(insertAtBeginning){
        priorityQueue.unshift(track);
      }else{
        priorityQueue.push(track);
      }
      console.log(index, queue);
    };

    var setQueue = function(list){
      queue = queue.slice(0,index+1).concat(list);
      console.log(index, queue);
    };

    var getNext = function(){
      if(priorityQueue.length>0){
        var next = priorityQueue.shift();
        queue.splice(index+1, 0, next);
        index++;
        return next;
      }
      if(index<queue.length-1){
        index++;
        return queue[index];
      }else{
        if(index == queue.length-1){
          index++;
        }
        return null;
      }
      console.log(index, queue);
    };

    var getPrevious = function(){
      if(index>0){
        index--;
        return queue[index];
      }else{
        return null;
      }
      console.log(index, queue);
    };

    var empty = function(){
      queue = [];
      index = -1;
      console.log(index, queue);
    };

    var getUpcoming = function(){
      return angular.copy(priorityQueue.concat(queue.slice(index+1, queue.length)));
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
