var bookshelf = require('../libs/Bookshelf');
var User = require('./user');

module.exports = bookshelf.Model.extend({
  tableName: 'words',
  user: function() {
    return this.belongsTo(User);
  }
});
