const elasticsearch = require("elasticsearch");

const client = new elasticsearch.Client({
  host: "localhost:9200",
  log: "error"
});

module.exports = client;
