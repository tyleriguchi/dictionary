import Ember from 'ember';

export default Ember.Controller.extend({
  isAuthenticated: Ember.computed.bool('session.isAuthenticated'),

  actions: {
    saveWord(word) {
      const isAuthenticated = this.get('isAuthenticated');
      let user;

      if (isAuthenticated) {
        user = this.store.peekRecord('user', this.get('session.secure.profile.identities')[0].user_id);
        console.log('user', user)
        let wordRecord = this.store.createRecord('word', {
          word: word,
          user: user
        });

        user.get('words').pushObject(wordRecord);
        return [wordRecord, wordRecord.save()];
      }
      else {
        let wordRecord = this.store.createRecord('word', {
          word: word,
        });

        return [wordRecord, wordRecord.save()];
      }
    },
    transitionOut() {
      this.transitionToRoute('words')
    }
  }
});
