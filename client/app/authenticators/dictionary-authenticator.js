import Ember from 'ember';
import Base from 'auth0-ember-simple-auth/authenticators/lock';
import ajax from 'ic-ajax';

export default Base.extend({
  store: Ember.inject.service('store'),

  afterAuth(data) {
    console.log('data', data)
    const userId = data.profile.user_id.split('|')[1];

    return this.get('store').findRecord('user', userId).then( (user) => {
      console.log('what', user)
      return user.get('words').then( (words) => {
        return Ember.RSVP.resolve(data);
      })
      .catch( (err) => {
        return Ember.RSVP.reject(err);
      })
    })
    .catch( (err) => {
      console.log('err', err)
      if (err.errors[0].detail === "User not found") {
        return this.get('store').createRecord('user', {
          id: userId,
          email: data.profile.email,
          createdAt: data.profile.created_at,
        }).save().then ( () => {
          return Ember.RSVP.resolve(data)
        }).catch( (err) => {
          return Ember.RSVP.reject(err)
          // TODO delete user account on auth0 in error, so they can reuse their email
          // can't figure out how to get proper permisions to delete a user
          // return ajax({
          //   method: 'DELETE',
          //   url: 'https://tyler-iguchi.auth0.com/api/users/' + encodeURI(data.profile.user_id),
          //   headers: {
          //     "Authorization": 'Bearer ' + data.jwt
          //   }
          // })
          // .then( () => {
          //   return Ember.RSVP.reject(err);
          // })
          // .catch ( (auth0Error) => {
          //   return Ember.RSVP.reject(auth0Error);
          // })
        })
      }
      else {
        return Ember.RSVP.reject(err);
      }
    })
  }
});
