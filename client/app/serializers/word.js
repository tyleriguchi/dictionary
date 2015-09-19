import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeSingleResponse: function(store, primaryModelClass, payload, id, requestType) {
    // // push in the definitions array from the response from the server
    // payload.data.forEach( (definition) => {
    //   store.push(definition);
    // })

    return this._super(...arguments);
  },
});
