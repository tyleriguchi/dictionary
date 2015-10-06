import Ember from 'ember';
import Base from 'auth0-ember-simple-auth/authenticators/lock';
import ajax from 'ic-ajax';

export default Base.extend({
  store: Ember.inject.service('store'),

  afterAuth(data) {
    console.log('data', data)
    const userId = data.profile.user_id.split('|')[1];

    return this.get('store').findRecord('user', userId).then( (response) => {
      return Ember.RSVP.resolve(data);
    })
    .catch( (err) => {
      console.log('err', err)
      if (err.errors[0].detail === "User not found") {
        return this.get('store').createRecord('user', {
          id: data.profile.user_id.split('|')[1],
          email: data.profile.email,
          createdAt: data.profile.created_at,
        }).save().then ( () => {
          return Ember.RSVP.resolve(data)
        }).catch( (err) => {
          // Error on signup, blow up auth0 user to allow them to reuse email
          return ajax({
            method: 'DELETE',
            url: 'https://tyler-iguchi.auth0.com/api/users/' + encodeURI(data.profile.user_id),
            headers: {
              "Authorization": 'Bearer ' + 'yYS9KTdPlC3id1QLtEwZrZU5AAar1Gi7dIfHkQJcA6oCUQvxvUIz4QffsSLmZON3'
            }
          })
          .then( () => {
            return Ember.RSVP.reject(err);
          })
          .catch ( (auth0Error) => {
            return Ember.RSVP.reject(auth0Error);
          })
        })
      }
      else {
        return Ember.RSVP.reject(err);
      }
    })
  }
});
