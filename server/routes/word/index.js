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
        Boom.badRequest(err);
      }
      var definitionsArray = res.body.results.map(function(item) {
        return {
          type: 'definition',
          id: UUID.v4(),
          attributes: item
        }
      })

      return reply({ data: definitionsArray })
    })
  }
}
