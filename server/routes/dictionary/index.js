
module.exports = {
  method: 'POST',
  path: '/dictionary',
  handler: function (request, reply) {
    var request = require('request');

    var options = {
      method: 'GET',
      url: process.env.MashapeUrl,
      headers: {
        'X-Mashape-Key': process.env.MashapeKey
      }
    }
    request(options, function(err, res) {
      console.log(res)
      // reply(res);
    })
    reply('test')
  }
}
