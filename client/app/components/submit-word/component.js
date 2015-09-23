import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submitWord() {
      this.attrs.saveWord(this.get('word'));
    },
    wordInputChanged(letter) {
      this.set('word', letter);
    },
  }
});
