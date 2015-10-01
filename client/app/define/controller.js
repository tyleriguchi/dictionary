import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveWord(word) {
      let record = this.store.createRecord('word', {
        word: word
      });

      return [record, record.save()];
    },
    transitionOut() {
      this.transitionToRoute('words')
    }
  }
});
