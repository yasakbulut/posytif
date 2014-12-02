/**
 * Created by yasa on 02/12/14.
 */
/**
 * @ngdoc service
 * @name posytifApp.service:Player
 * @description
 * # Player
 * Track player for posytifApp
 */
angular.module('posytifApp')
  .factory('Queue', function () {

    var queue = [];
    var priorityQueue = [];
    var index = -1;

    var enqueue = function(song){
      priorityQueue.push(song);
    };

    var setQueue = function(list){
      queue = queue.slice(0,index+1).concat(list);
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
        return null; //TODO:maybe trigger event
      }
    };

    var getPrevious = function(){
      if(index>0){
        index--;
        return queue[index];
      }else{
        return null;
      }
    };

    var empty = function(){
      queue = [];
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
