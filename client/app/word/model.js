import DS from 'ember-data';

export default DS.Model.extend({
  word: DS.attr('string'),
  definitions: DS.attr(),
});
