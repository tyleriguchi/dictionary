import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submitWord() {
      let [record, recordSave] = this.attrs.saveWord(this.get('word'));

      recordSave.then( () => {
        this.sendAction('transitionOut');
      })
      .catch ( (err) => {
        this.set('error', err.errors[0].detail);
        record.deleteRecord();
      })
    },
    inputChanged(letter) {
      this.set('word', letter);
    },
  }
});
