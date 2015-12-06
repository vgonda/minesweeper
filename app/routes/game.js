import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var size = 10;
    var grid = new Array(size);
    for (let i = 0; i < size; i++) {
      var row = new Array(size);
      for (let j = 0; j < size; j++) {
        row[j] = this.store.createRecord('cell', {x: j, y: i});
      }
      grid[i] = row;
    }
    return grid;
  }
});
