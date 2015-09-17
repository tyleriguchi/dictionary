var request = require('request'),
    Boom = require('boom'),
    UUID = require('node-uuid');

exports.route = {
  method: 'POST',
  path: '/word',
  handler: function (req, reply) {
    var attrs = req.payload.data.attributes;

    if (!attrs.word) {
      Boom.badRequest('invalid query');
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

    request(options, function(err, res) {

      if (err) {
        return reply(Boom.badRequest(err));
      }

      // throw error if null or undefined
      if (res.body.results == null) {
        return reply(Boom.notFound('No definition found'))
      }

      var definitionsArray = res.body.results.map(function(item) {
        return {
          type: 'definition',
          id: UUID.v4(),
          attributes: item
        }
      })

      // push the original word into the payload
      definitionsArray.push({
        type: 'word',
        id: UUID.v4(),
        attributes: attrs
      })
      return reply({ data: definitionsArray })
    })
  }
}
