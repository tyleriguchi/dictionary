import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  createdAt: DS.attr('string'),
  words: DS.hasMany('word', { async: true}),
});
