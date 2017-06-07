import DS from 'ember-data';

export default DS.Model.extend({
  x:DS.attr("number"),
  y:DS.attr("number"),
  r:DS.attr("number"),
  isIn:DS.attr("boolean")
});
