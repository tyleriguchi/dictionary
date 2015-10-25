var request = require('request'),
    Boom    = require('../../libs/Ember-boom'),
    UUID    = require('node-uuid'),
    _       = require('lodash'),
    AWS     = require('aws-sdk'),
    Word    = require('../../models/word'),
    User    = require('../../models/user');

module.exports = {
  method: 'POST',
  path: '/word',
  handler: function (req, reply) {
    var attrs = req.payload.data.attributes;
    var userId = req.payload.data.relationships.user.data.id;

    if (attrs.word == null || attrs.word === '') {
      return reply(Boom.badRequest('Please enter a word'));
    }

    var options = {
      method: 'GET',
      url: process.env.MashapeUrl + '/words/' + attrs.word,
      accept: 'application/json',
      'Content-type': 'application/json',
      json: true,
      headers: {
        'X-Mashape-Key': process.env.MashapeKey
      }
    }

    request(options, function request(err, res) {
      var definitionData = res.body.results;

      if (err) {
        return reply(Boom.badRequest(err));
      }

      // throw error if null or undefined
      if (definitionData == null) {
        return reply(Boom.notFound('No definition found'))
      }

      var definitionsArray = definitionData.map(function definitionsArray(item) {
        item.id = UUID.v4();
        item.type ='definition';
        return item;
      })

      attrs.definitions = definitionsArray;

      var returnPayload = {
        data: {
          type: 'word',
          id: attrs.word,
          attributes: attrs,
        }
      }

      if (userId) {
        User.findById(userId, function(userFindError, foundUser) {
          console.log('found', foundUser)
          if (userFindError) {
            return reply(Boom.badImplementation(userFindError));
          }

          var word = new Word({
            _id: UUID.v4(),
            word: attrs.word,
            definitions: attrs.definitions,
            user_id: req.payload.data.relationships.user.data.id
          })

          foundUser.words.push(word._id);

          foundUser.save(function(userSaveError) {
            if (userSaveError) {
              return reply(Boom.badImplementation(userSaveError));
            }
            word.save(function(err, data) {
              if (err){
                console.log('word save error', err);
                return reply(Boom.badImplementation('dyanmoDb put error'));
              }
              else {
                return reply(returnPayload);
              }
            })
          })
        })
      }

      else {
        return reply(returnPayload);
      }
    });
  }
}
