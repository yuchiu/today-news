const News = require("../models/News");

const elasticSearchClient = require("../config/elasticSearch.client");

module.exports = {
  search: (index, body) => elasticSearchClient.search({ index, body })
  //   suggest: (index, body) =>
  //     elasticSearchClient.suggest({
  //       index,
  //       body
  //     })
};
