import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveWord() {
      this.store.createRecord('word', {
        word: this.get('word')
      }).save()
      .then( () => {
        console.log('sdf', this.get('word'))

        this.transitionToRoute('words');
      })
      .catch( (err) => {
        console.log(err)
      })
    }
  }
});
