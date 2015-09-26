import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveWord(word) {
      return this.store.createRecord('word', {
        word: word
      }).save();
    },
    wordSaved() {
      this.transitionToRoute('words')
    }
  }
});
