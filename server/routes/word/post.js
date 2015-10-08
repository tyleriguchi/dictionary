var request = require('request'),
    Boom    = require('../../libs/Ember-boom'),
    UUID    = require('node-uuid'),
    _       = require('lodash'),
    Word    = require('../../models/word');

module.exports = {
  method: 'POST',
  path: '/word',
  handler: function (req, reply) {
    var attrs = req.payload.data.attributes;
    console.log('req', req.payload)
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

      if (attrs['is-authenticated'] === true) {
        Word.forge({
          id: attrs.word,
          definitions: definitionsArray
          user: attrs.relationships.user.data.id
        })
        // knex tries to update an entry when supplied a primary key,
        // so we gotta tell it to insert it
        .save(null, {method: 'insert'})
        .then(function() {
          return reply().code(204);
        })
        dynamo.put({
          TableName: 'dictionary',
          Item: {
           id: attrs.word,
           definitions: attrs.definitions,
          },
        }, function dynamoResponse(err, data) {
          if (err){
            console.log('dynamoDB put Error', err);
            return reply(Boom.badImplementation('dyanmoDb put error'));
          }
          else {
            return reply(returnPayload);
          }
        });
      }

      else {
        return reply(returnPayload);
      }
    });
  }
}
