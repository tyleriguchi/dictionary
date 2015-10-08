var request = require('request'),
    Boom    = require('../../libs/Ember-boom'),
    _       = require('lodash'),
    User    = require('../../models/user');

module.exports = {
  method: 'GET',
  path: '/users/{user}',
  handler: function(req, reply) {
    User.where({id: req.params.user}).fetch().then(function(user) {
      if (user) {
        console.log('user', user.attributes)
        var formattedData = {
          data: {
            type: 'user',
            id: user.id,
            attributes: {
              email: user.attributes.email,
              // why ember data, why
              'created-at': user.attributes.created_at
            }
          }
        }
        return reply(formattedData);
      }
      else {
        return reply(Boom.notFound('User not found'));
      }
    })
    .catch(function(err) {
      return reply(Boom.badImplementation('Error fetching model'));
    })
  }
}
