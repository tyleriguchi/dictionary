import DS from 'ember-data';

export default DS.Model.extend({
  word: DS.attr('string'),
  createdDate: DS.attr('string', {
    defaultValue() {
      return new Date();
    }
  })
});
