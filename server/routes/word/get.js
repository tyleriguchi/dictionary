var request = require('request'),
    Boom    = require('../../libs/Ember-boom'),
    UUID    = require('node-uuid'),
    _       = require('lodash'),
    Word    = require('../../models/word');

module.exports = {
  method: 'GET',
  path: '/word/{word}',
  handler: function(req, reply) {
    var wordId = req.params.word
    Word.findById(wordId, function(err, word) {
      if (err) {
        console.log('err', err)
        return reply(Boom.notFound('User not found'));
      }
      if (word) {
        console.log('word', word)
        var formattedWordData = {
          data: {
            type: 'word',
            id: word.id,
            attributes: {
              word: word.word,
              definitions: word.definitions,
              // why ember data, why
              'created-at': word.created_at
            },
            relationships: {
              data: {
                type: 'user',
                id: word.user_id
              }
            }
          }
        }
        return reply(formattedWordData);
      }
      else {
        return reply(Boom.notFound('Word not found'));
      }
    })
  }
}
