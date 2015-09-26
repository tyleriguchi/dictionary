var request = require('request'),
    Boom = require('../../lib/Ember-boom'),
    UUID = require('node-uuid'),
    _ = require('lodash');

exports.route = {
  method: 'POST',
  path: '/word',
  handler: function (req, reply) {
    var attrs = req.payload.data.attributes;

    if (attrs.word == null || attrs.word === '') {
      return reply(Boom.badRequest('Please enter a word'));
    }
    console.log('eh', attrs.word == null)
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

    request(options, function(err, res) {

      if (err) {
        return reply(Boom.badRequest(err));
      }

      // throw error if null or undefined
      if (res.body.results == null) {
        return reply(Boom.notFound('No definition found'))
      }

      var definitionsArray = res.body.results.map(function(item) {
        item.id = UUID.v4();
        item.type ='definition';
        return item;
      })

      attrs.definitions = definitionsArray;

      var returnPayload = {
        data: {
          type: 'word',
          id: UUID.v4(),
          attributes: attrs,
        }
      }

      return reply(returnPayload);
    })
  }
}
