var request = require('request'),
    Boom = require('boom');

exports.route = {
  method: 'POST',
  path: '/define/{word}',
  handler: function (req, reply) {
    if (!req.params.word) {
      Boom.badRequest('invalid query');
    }
    var options = {
      method: 'GET',
      url: process.env.MashapeUrl + '/words/' + req.params.word,
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
        console.log('item', item)
        return {
          type: 'define',
          data: item
        }
      })

      console.log('body', definitionsArray)

      return reply(definitionsArray)
    })
  }
}
