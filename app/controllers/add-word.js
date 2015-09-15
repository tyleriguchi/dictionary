import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveWord(word) {
      Ember.Logger.log('oword', word)
      return;
    }
  }
});
