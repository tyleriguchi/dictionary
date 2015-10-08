var request = require('request'),
    Boom    = require('../../libs/Ember-boom'),
    UUID    = require('node-uuid'),
    _       = require('lodash'),
    User    = require('../../models/user');

module.exports = {
  method: 'POST',
  path: '/users',
  handler: function(req, reply) {
    var data = req.payload.data;

    User.forge({
      id: data.id,
      email: data.attributes.email,
      created_at: data.attributes['created-at'] || new Date(),
    })
    // knex tries to update an entry when supplied a primary key,
    // so we gotta tell it to insert it
    .save(null, {method: 'insert'})
    .then(function() {
      return reply().code(204);
    })
    .catch(function(err) {
      console.log('err', err)
      return reply(Boom.badImplementation(err));
    })
  }
}
