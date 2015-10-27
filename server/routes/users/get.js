var request = require('request'),
    Boom    = require('../../libs/Ember-boom'),
    UUID    = require('node-uuid'),
    _       = require('lodash'),
    User    = require('../../models/user');

module.exports = {
  method: 'GET',
  path: '/users',
  handler: function(req, reply) {
    User.fetchAll().then(function(users) {
      return reply(users);
    })
    .catch(function(err) {
      console.log('users get server error', err);
      return reply(Boom.badImplementation);
    })
  }
}
