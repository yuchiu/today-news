const elasticsearch = require("elasticsearch");

const client = new elasticsearch.Client({
  host: process.env.DB_SEARCH_ELASTICSEARCH_HOST,
  log: process.env.DB_SEARCH_ELASTICSEARCH_LOG
});

module.exports = client;
