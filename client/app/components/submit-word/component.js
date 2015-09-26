import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submitWord() {
      this.attrs.saveWord(this.get('word')).then ( () => {
        this.sendAction('wordSaved');
      })
      .catch ( (err) => {
        this.set('error', err.errors[0].detail);
      })
    },
    inputChanged(letter) {
      this.set('word', letter);
    },
  }
});
