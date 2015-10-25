import DS from 'ember-data';

export default DS.Model.extend({
  word: DS.attr('string'),
  definitions: DS.attr(),
  user: DS.belongsTo('user', { async: true}),
  isAuthenticated: DS.attr('boolean', {
    defaultValue: false
  }),
});
