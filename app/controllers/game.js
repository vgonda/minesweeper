import Ember from 'ember';

export default Ember.Controller.extend({
  grid: Ember.computed.alias('model'),
  width: 10,
  height: 10,
  numberOfBombs: 15,
  numberCleared: 0,
  gameStarted: false,
  lost: false,
  won: Ember.computed('numberCleared', function() {
    return this.get('numberCleared') === (100 - this.get('numberOfBombs'));
  }),

  actions: {
    clear: function(cell) {
      if (!this.get('gameStarted')){
        this.placeBombs(cell);
        this.set('gameStarted', true);
      }
      if (cell.bomb) {
        this.set('lost', true);
      } else {
        this.clearCell(cell);
      }
    },

    restart() {
      this.set('gameStarted', false);
      this.set('numberCleared', 0);
      this.set('lost', false);
      var grid = this.get('grid');
      for (let i = 0; i < 10; i++) {
        var row = grid[i];
        for (let j = 0; j < 10; j++) {
          row[j].reset();
        }
      }
    }
  },

  clearCell(cell) {
    cell.set('cleared', true);
    this.set('numberCleared', this.get('numberCleared') + 1);
    if (cell.get('neighboringBombs') === 0) {
      var neighbors = this.getNeighbors(cell);
      for (let i = 0; i < neighbors.length; i++) {
        if (!neighbors[i].get('cleared')) {
          this.clearCell(neighbors[i]);
        }
      }
    }
  },

  placeBombs: function(clicked) {
    var grid = this.get('grid');
    for (let bombs = this.get('numberOfBombs'); bombs > 0; ) {
      let x = Math.floor(Math.random()*10);
      let y = Math.floor(Math.random()*10);
      var cell = grid[y][x];
      if (!cell.get('bomb') && cell !== clicked) {
        cell.set('bomb', true);
        var neighbors = this.getNeighbors(cell);
        neighbors.forEach(function(n) {
          n.incrementBombs();
        });
        bombs--;
      }
    }
  },

  getNeighbors: function(cell) {
    var list = [];
    var grid = this.get('grid');
    var x = cell.get('x');
    var y = cell.get('y');
    if (grid[y + 1]) {
      list.push(grid[y + 1][x]);
      if (grid[y+1][x+1]){list.push(grid[y+1][x+1]);}
    }
    if (grid[y - 1]) {
      list.push(grid[y - 1][x]);
      if (grid[y-1][x-1]){list.push(grid[y-1][x-1]);}
    }
    if (grid[y][x + 1]) {
      list.push(grid[y][x + 1]);
      if (grid[y-1]){list.push(grid[y-1][x+1]);}
    }
    if (grid[y][x - 1]) {
      list.push(grid[y][x - 1]);
      if (grid[y+1]){list.push(grid[y+1][x-1]);}
    }
    return list;
  }
});
