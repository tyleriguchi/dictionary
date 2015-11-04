var request = require('request'),
    Boom    = require('../../libs/Ember-boom'),
    UUID    = require('node-uuid'),
    _       = require('lodash'),
    Word    = require('../../models/word'),
    User    = require('../../models/user');

module.exports = {
  method: 'DELETE',
  path: '/word/{word}',
  handler: function(req, reply) {
    var wordId = req.params.word;

    Word.findById(wordId, function(err, word) {
      if (err) {
        console.log('err', err)
        return reply(Boom.notFound('User not found'));
      }
      if (word) {
        console.log('word', word)
        var userId = word.user_id;

        if (userId) {
          User.findById(userId, function(userFindError, foundUser) {
            console.log('found', foundUser)
            if (userFindError) {
              return reply(Boom.badImplementation(userFindError));
            }

            console.log('before delete word', foundUser.words)

            foundUser.words = _.without(foundUser.words, wordId);

            console.log('did delete word', foundUser.words)
            foundUser.save(function(userSaveError) {
              if (userSaveError) {
                return reply(Boom.badImplementation(userSaveError));
              }
              word.remove(function(err, data) {
                if (err){
                  console.log('word save error', err);
                  return reply(Boom.badImplementation('dyanmoDb put error'));
                }
                else {
                  return reply().code(204);
                }
              })
            })
          })
        }
      }
      else {
        return reply(Boom.notFound('Word not found'));
      }
    })
  }
}
