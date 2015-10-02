import Ember from 'ember';

export default Ember.Controller.extend({
  isAuthenticated: Ember.computed.bool('session.isAuthenticated'),

  actions: {
    saveWord(word) {
      let record = this.store.createRecord('word', {
        word: word,
        isAuthenticated: this.get('isAuthenticated'),
      });

      return [record, record.save()];
    },
    transitionOut() {
      this.transitionToRoute('words')
    }
  }
});
