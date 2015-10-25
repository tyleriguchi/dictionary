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

    var user = new User({
      _id: data.id,
      email: data.attributes.email,
      created_at: data.attributes['created-at'] || new Date()
    }).save(function(err, userResponse) {
      if (err) {
        return reply(Boom.badImplementation(err));
      }
      else {
        console.log('user', userResponse)
        return reply().code(204);

      }
    })
  }
}
