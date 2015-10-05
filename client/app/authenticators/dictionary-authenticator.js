import Ember from 'ember';
import Base from 'auth0-ember-simple-auth/authenticators/lock';

export default Base.extend({
  store: Ember.inject.service('store'),

  afterAuth(data) {
    return this.get('store').createRecord('user', {
      id: data.profile.user_id.split('|')[1],
      email: data.profile.email,
      createdAt: data.profile.created_at,
    }).save().then ( () => {
      return Ember.RSVP.resolve(data)
    }).catch( (err) => {
      return Ember.RSVP.reject(err);
    })
  }
});
