/**
 * Created by yasa on 02/12/14.
 */
'use strict';

describe('Service: Queue', function () {

  // load the controller's module
  beforeEach(module('posytifApp'));

  var q;
  // Initialize the controller and a mock scope
  beforeEach(inject(function (QueueService) {
    q = QueueService;
  }));

  it('should correctly set a playlist when the queue is empty', function () {
    var list = [
      {
        'album': {
          'title': 'veniam ipsum',
          'art': 'http://placekitten.com/g/256/256?q=4'
        },
        'artist': 'Rojas Mckinney',
        'title': 'reprehenderit enim adipisicing',
        'duration': 202
      },
      {
        'album': {
          'title': 'dolor esse',
          'art': 'http://placekitten.com/g/256/256?q=81'
        },
        'artist': 'Jeannette Wilkerson',
        'title': 'velit labore labore',
        'duration': 243
      },
      {
        'album': {
          'title': 'do ipsum',
          'art': 'http://placekitten.com/g/256/256?q=39'
        },
        'artist': 'Ethel Hopkins',
        'title': 'duis Lorem reprehenderit',
        'duration': 115
      },
      {
        'album': {
          'title': 'aute excepteur',
          'art': 'http://placekitten.com/g/256/256?q=54'
        },
        'artist': 'Valerie Griffin',
        'title': 'laborum mollit voluptate',
        'duration': 221
      },
      {
        'album': {
          'title': 'Lorem fugiat',
          'art': 'http://placekitten.com/g/256/256?q=96'
        },
        'artist': 'Buckner Chaney',
        'title': 'proident incididunt sunt',
        'duration': 225
      }
    ];
    q.setQueue(list);
    expect(q.getNext().artist).toBe('Rojas Mckinney');
    expect(q.getNext().artist).toBe('Jeannette Wilkerson');
    expect(q.getNext().artist).toBe('Ethel Hopkins');
    expect(q.getNext().artist).toBe('Valerie Griffin');
    expect(q.getNext().artist).toBe('Buckner Chaney');
  });

  it('should correctly set a playlist when the queue is not empty', function () {
    var list = [
      {
        'album': {
          'title': 'veniam ipsum',
          'art': 'http://placekitten.com/g/256/256?q=4'
        },
        'artist': 'Rojas Mckinney',
        'title': 'reprehenderit enim adipisicing',
        'duration': 202
      },
      {
        'album': {
          'title': 'dolor esse',
          'art': 'http://placekitten.com/g/256/256?q=81'
        },
        'artist': 'Jeannette Wilkerson',
        'title': 'velit labore labore',
        'duration': 243
      },
      {
        'album': {
          'title': 'do ipsum',
          'art': 'http://placekitten.com/g/256/256?q=39'
        },
        'artist': 'Ethel Hopkins',
        'title': 'duis Lorem reprehenderit',
        'duration': 115
      },
      {
        'album': {
          'title': 'aute excepteur',
          'art': 'http://placekitten.com/g/256/256?q=54'
        },
        'artist': 'Valerie Griffin',
        'title': 'laborum mollit voluptate',
        'duration': 221
      },
      {
        'album': {
          'title': 'Lorem fugiat',
          'art': 'http://placekitten.com/g/256/256?q=96'
        },
        'artist': 'Buckner Chaney',
        'title': 'proident incididunt sunt',
        'duration': 225
      }
    ];
    q.setQueue(list);
    q.getNext();
    var nextList = [
      {
        'album': {
          'title': 'labore aliquip',
          'art': 'http://placekitten.com/g/256/256?q=65'
        },
        'artist': 'Betsy Odonnell',
        'title': 'ut ex commodo',
        'duration': 143
      },
      {
        'album': {
          'title': 'adipisicing ipsum',
          'art': 'http://placekitten.com/g/256/256?q=28'
        },
        'artist': 'Harper Sanchez',
        'title': 'non deserunt adipisicing',
        'duration': 220
      },
      {
        'album': {
          'title': 'adipisicing mollit',
          'art': 'http://placekitten.com/g/256/256?q=83'
        },
        'artist': 'Katina Roy',
        'title': 'aliquip aute magna',
        'duration': 277
      }
    ];
    q.setQueue(nextList);
    expect(q.getNext().artist).toBe('Betsy Odonnell');
    expect(q.getNext().artist).toBe('Harper Sanchez');
    expect(q.getNext().artist).toBe('Katina Roy');
    expect(q.getNext()).toBe(null);


  });

  it('should correctly go backwards in a playing history', function () {
    var list = [
      {
        'album': {
          'title': 'veniam ipsum',
          'art': 'http://placekitten.com/g/256/256?q=4'
        },
        'artist': 'Rojas Mckinney',
        'title': 'reprehenderit enim adipisicing',
        'duration': 202
      },
      {
        'album': {
          'title': 'dolor esse',
          'art': 'http://placekitten.com/g/256/256?q=81'
        },
        'artist': 'Jeannette Wilkerson',
        'title': 'velit labore labore',
        'duration': 243
      },
      {
        'album': {
          'title': 'do ipsum',
          'art': 'http://placekitten.com/g/256/256?q=39'
        },
        'artist': 'Ethel Hopkins',
        'title': 'duis Lorem reprehenderit',
        'duration': 115
      },
      {
        'album': {
          'title': 'aute excepteur',
          'art': 'http://placekitten.com/g/256/256?q=54'
        },
        'artist': 'Valerie Griffin',
        'title': 'laborum mollit voluptate',
        'duration': 221
      },
      {
        'album': {
          'title': 'Lorem fugiat',
          'art': 'http://placekitten.com/g/256/256?q=96'
        },
        'artist': 'Buckner Chaney',
        'title': 'proident incididunt sunt',
        'duration': 225
      }
    ];
    q.setQueue(list);
    q.getNext();
    var nextList = [
      {
        'album': {
          'title': 'labore aliquip',
          'art': 'http://placekitten.com/g/256/256?q=65'
        },
        'artist': 'Betsy Odonnell',
        'title': 'ut ex commodo',
        'duration': 143
      },
      {
        'album': {
          'title': 'adipisicing ipsum',
          'art': 'http://placekitten.com/g/256/256?q=28'
        },
        'artist': 'Harper Sanchez',
        'title': 'non deserunt adipisicing',
        'duration': 220
      },
      {
        'album': {
          'title': 'adipisicing mollit',
          'art': 'http://placekitten.com/g/256/256?q=83'
        },
        'artist': 'Katina Roy',
        'title': 'aliquip aute magna',
        'duration': 277
      }
    ];
    q.setQueue(nextList);
    q.getNext();
    q.getNext();
    q.getNext();
    expect(q.getPrevious().artist).toBe('Harper Sanchez');
    expect(q.getPrevious().artist).toBe('Betsy Odonnell');
    expect(q.getPrevious().artist).toBe('Rojas Mckinney');
    expect(q.getPrevious()).toBe(null);


  });

  it('should correctly queue a song', function () {
    var list = [
      {
        'album': {
          'title': 'veniam ipsum',
          'art': 'http://placekitten.com/g/256/256?q=4'
        },
        'artist': 'Rojas Mckinney',
        'title': 'reprehenderit enim adipisicing',
        'duration': 202
      },
      {
        'album': {
          'title': 'dolor esse',
          'art': 'http://placekitten.com/g/256/256?q=81'
        },
        'artist': 'Jeannette Wilkerson',
        'title': 'velit labore labore',
        'duration': 243
      },
      {
        'album': {
          'title': 'do ipsum',
          'art': 'http://placekitten.com/g/256/256?q=39'
        },
        'artist': 'Ethel Hopkins',
        'title': 'duis Lorem reprehenderit',
        'duration': 115
      }
    ];
    q.setQueue(list);
    q.getNext();
    q.enqueue({
      'album': {
        'title': 'labore aliquip',
        'art': 'http://placekitten.com/g/256/256?q=65'
      },
      'artist': 'Betsy Odonnell',
      'title': 'ut ex commodo',
      'duration': 143
    });
    expect(q.getNext().artist).toBe('Betsy Odonnell');
    expect(q.getNext().artist).toBe('Jeannette Wilkerson');
    expect(q.getPrevious().artist).toBe('Betsy Odonnell');
  });
  it('should correctly return the upcoming songs', function(){
    var list = [
      {
        'album': {
          'title': 'veniam ipsum',
          'art': 'http://placekitten.com/g/256/256?q=4'
        },
        'artist': 'Rojas Mckinney',
        'title': 'reprehenderit enim adipisicing',
        'duration': 202
      },
      {
        'album': {
          'title': 'dolor esse',
          'art': 'http://placekitten.com/g/256/256?q=81'
        },
        'artist': 'Jeannette Wilkerson',
        'title': 'velit labore labore',
        'duration': 243
      }
    ];
    q.setQueue(list);
    q.getNext();
    q.enqueue({
      'album': {
        'title': 'labore aliquip',
        'art': 'http://placekitten.com/g/256/256?q=65'
      },
      'artist': 'Betsy Odonnell',
      'title': 'ut ex commodo',
      'duration': 143
    });
    q.enqueue({
      'album': {
        'title': 'do ipsum',
        'art': 'http://placekitten.com/g/256/256?q=39'
      },
      'artist': 'Ethel Hopkins',
      'title': 'duis Lorem reprehenderit',
      'duration': 115
    });
    var upcoming = q.getUpcoming();
    expect(upcoming.length).toBe(3);
    expect(upcoming[0].artist).toBe('Betsy Odonnell');
    expect(upcoming[1].artist).toBe('Ethel Hopkins');
    expect(upcoming[2].artist).toBe('Jeannette Wilkerson');
  });

});
