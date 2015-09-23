import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeSingleResponse: function(store, primaryModelClass, payload, id, requestType) {
    // convert the definitions object to an ember object
    let definitions = payload.data.attributes.definitions;
    let convertedDefinitions = definitions.map( (item) => {
      return Ember.Object.create(item);
    })

    payload.data.attributes.definitions = convertedDefinitions;

    return payload
  },
});
