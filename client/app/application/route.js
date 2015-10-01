import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('words');
    }
  },

  actions: {
    sessionRequiresAuthentication(){
      // Check out the docs for all the options:
      // https://auth0.com/docs/libraries/lock/customization

      // These options will request a refresh token and launch lock.js in popup mode by default
      var lockOptions = {authParams:{scope: 'openid'}};

      this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
    },
    invalidateSession() {
      return this.get('session').invalidate().then( () => {
        this.transitionTo('application');
      })
    }
  }
});
