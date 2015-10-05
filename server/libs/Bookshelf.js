var knexConfig = require('../knexfile');
var settings = require('../config/settings');
var knex = require('knex')(knexConfig[settings.environment]);

module.exports = require('bookshelf')(knex);
