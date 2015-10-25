var request = require('request'),
    Boom    = require('../../libs/Ember-boom'),
    _       = require('lodash'),
    User    = require('../../models/user');

module.exports = {
  method: 'GET',
  path: '/users/{user}',
  handler: function(req, reply) {
    User.findById(req.params.user, function(err, user) {
      if (err) {
        console.log('err', err)
        return reply(Boom.notFound('User not found'));
      }
      if (user) {
        console.log('user', user)
        formattedWordData = user.words.map(function(word) {
          console.log('word', word)
          return {
            type: "words",
            id: word
          }
        })

        console.log('dasd', formattedWordData)
        var formattedUserData = {
          data: {
            type: 'user',
            id: user._id,
            attributes: {
              email: user.email,
              'created-at': user.created_at
            },
            relationships: {
              words: {
                data: formattedWordData
              }
            }
          }
        }

        console.log('data', formattedUserData.data.relationships)
        return reply(formattedUserData);
      }
      else {
        return reply(Boom.notFound('User not found'));
      }
    })
  }
}
