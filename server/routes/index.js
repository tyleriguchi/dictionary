
module.exports = {
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    console.log('asdf')
    reply('PREPARE YOURSELF');
  }
};
