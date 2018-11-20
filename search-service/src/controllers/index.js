const queryBody = require("./queryBody");
const elasticSearchClient = require("../config/elasticSearch.client");

const searchController = {
  async searchNews(searchTerm, callback) {
    elasticSearchClient
      .search({
        index: "news",
        body: queryBody.searchTermQuery(searchTerm.searchTerm, 10)
      })
      .then(result => {
        const response = {
          meta: {
            type: "success",
            status: 200,
            message: ""
          },
          searchResult: result.hits.hits
        };
        callback(null, response);
      })
      .catch(err => {
        console.log(err);
        callback(null, {
          meta: {
            type: "error",
            status: 500,
            message: "server error"
          }
        });
      });
  }
};

module.exports = searchController;
