import Ember from 'ember';

export default Ember.Controller.extend({
  isAuthenticated: Ember.computed.bool('session.isAuthenticated'),

  actions: {
    saveWord(word) {
      const isAuthenticated = this.get('isAuthenticated');
      let user;

      if (isAuthenticated) {
        user = this.store.peekRecord('user', this.get('session.secure.profile.identities')[0].user_id)
      }

      // console.log('user', userId)
      let record = this.store.createRecord('word', {
        word: word,
        isAuthenticated: isAuthenticated,
        user: isAuthenticated ? user : null
      });
      
      return [record, record.save()];
    },
    transitionOut() {
      this.transitionToRoute('words')
    }
  }
});
