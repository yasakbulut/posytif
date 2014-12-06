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

    var index = -1;

    var queues = {
      standard: [],
      priority: []
    };

    var enqueue = function(track, insertAtBeginning){
      if(insertAtBeginning){
        queues.priority.unshift(track);
      }else{
        queues.priority.push(track);
      }
      console.log(index, queues.standard);
    };

    var setQueue = function(list){
      queues.standard = queues.standard.slice(0,index+1).concat(list);
      console.log(index, queues.standard);
    };

    var getNext = function(){
      if(queues.priority.length>0){
        var next = queues.priority.shift();
        queues.standard.splice(index+1, 0, next);
        index++;
        return next;
      }
      if(index<queues.standard.length-1){
        index++;
        return queues.standard[index];
      }else{
        if(index == queues.standard.length-1){
          index++;
        }
        return null;
      }
      console.log(index, queues.standard);
    };

    var getPrevious = function(){
      if(index>0){
        index--;
        return queues.standard[index];
      }else{
        if(index == 0){
          index--;
        }
        return null;
      }
      console.log(index, queues.standard);
    };

    var empty = function(){
      queues.standard = [];
      index = -1;
      console.log(index, queues.standard);
    };

    var getUpcoming = function(){
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
