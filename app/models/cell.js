import DS from 'ember-data';

export default DS.Model.extend({
  x: 0,
  y: 0,
  cleared: false,
  bomb: false,
  neighboringBombs: 0,
  incrementBombs: function () {
    this.set('neighboringBombs', this.get('neighboringBombs') + 1);
  },
  reset: function() {
    this.set('cleared', false);
    this.set('bomb', false);
    this.set('neighboringBombs', 0);
  }
});
