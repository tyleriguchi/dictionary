import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPISerializer.extend({
  normalizeSingleResponse: function(store, primaryModelClass, payload, id, requestType) {
    // convert the definitions object to an ember object
    let definitions = payload.data.attributes.definitions;
    let convertedDefinitions = definitions.map( (item) => {
      return Ember.Object.create(item);
    })

    // create a proxy array to be able to access those nice ember features
    payload.data.attributes.definitions = Ember.ArrayProxy.create({'content': Ember.A(convertedDefinitions)});
    return payload
  },
});
