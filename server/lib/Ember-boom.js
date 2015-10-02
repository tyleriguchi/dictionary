var Boom = require('boom');
var _ = require('lodash');

EmberBoom = _.cloneDeep(Boom);

// format the error payload to JSONAPI spec
var formatBoom = function(boomRequest, message, data) {
  var Boomed = Boom[boomRequest](message, data);
  var payload = Boomed.output.payload;
  console.log('a', payload)
  Boomed.output.payload = formatPayload(payload);

  return Boomed;
}

var formatPayload = function(payload) {
  return {
    errors: [
      {
        status: payload.statusCode,
        title: payload.error,
        detail: payload.message
      }
    ]
  }
}

EmberBoom.badRequest = function(message, data) {
  return formatBoom('badRequest', message, data);
}

EmberBoom.notFound = function(message, data) {
  return formatBoom('notFound', message, data)
}

EmberBoom.badImplementation = function(message, data) {
  return formatBoom('badImplementation', message, data)
}

module.exports = EmberBoom;
