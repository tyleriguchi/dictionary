import ApplicationAdapter from './application';
import DS from 'ember-data';
import ajax from 'ic-ajax';

export default DS.JSONAPIAdapter.extend({
  host: "http://dictionary-tyleriguchi.rhcloud.com/content",
  pathForType() {
    return 'word';
  },

  createRecord(store, type, snapshot) {
    var data = this.serialize(snapshot);

    return ajax({
      url: this.get('host') + '/word/',
      method: 'POST',
      dataType: 'json',
      data: JSON.stringify({ post: data})
    }).then(function(res) {
      data.id = res._id;

      return {
        data: {
          type: 'word',
          id: data.id
        }
      };
      
    }).catch(function(err) {
      throw new Error(err);
    })
  },

  findAll: function(store, type) {
    return ajax({
      url: this.get('host') + '/word/_search',
      method: 'get',
      dataType: 'json',
      data: JSON.stringify({
        "query" : {
          "match_all" : {}
        }
      })
    }).then( (res) => {
      var results = res.hits.hits;
      var resultObjects = results.map( (item) => {
        let obj = item._source.post;
        obj.id = item._id;
        return obj;
      });
      return {
        words: resultObjects
      }
    }).catch( (err) => {
      return err;
    })
  },
  findRecord: function(store, type, id) {
    return ajax({
      url: this.get('host') + '/word/_search/?q=_id:' + id,
      method: 'get',
      dataType: 'json',
      data: JSON.stringify({
        "query" : {
          "match_all" : {}
        }
      })
    }).then( (res) => {
      var results = res.hits.hits;
      var resultObjects = results.map( (item) => {
        let obj = item._source.post;
        obj.id = item._id;
        return obj;
      })
      return {
        words: resultObjects
      }
    }).catch( (err) => {
      return err;
    })
  },

  query(store, type, query) {
    var queryString = query.title;

    // if there isn't a query, return all the postings
    if (Ember.isEmpty(queryString)) {
      return this.findAll(store, type);
    }

    // split the string into individual words, return both fields and reflatten the array
    queryString = queryString.split(' ').map( function(item) {
      return [{ "term": { "title": item }}, { "term": { "description": item }}];
    });

    queryString = _.flatten(queryString);

    return ajax({
      type: 'POST',
      url: this.get('host') + '/_search',
      dataType: 'json',
      data: JSON.stringify({
        "query": {
          "bool": {
            "should": [
              queryString
            ]
          }
        }

      })
    }).then(function(res) {
      var results = res.hits.hits;
      var resultObjects = results.map( (item) => {
        let obj = item._source.post;
        obj.id = item._id;
        return obj;
      })
      return {
        word: resultObjects
      }

    }).catch(function(err) {
       return err;
    })
  }
});
