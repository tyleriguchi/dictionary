import DS from 'ember-data';

export default DS.Model.extend({
  word: DS.belongsTo('word'),
  definition: DS.attr('string'),
  synonyms: DS.attr(),
  examples: DS.attr(),
  partOfSpeech: DS.attr('string')
});
