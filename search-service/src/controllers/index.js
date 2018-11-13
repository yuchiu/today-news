const News = require("../models/News");

const elasticSearchClient = require("../config/elasticSearch.client");

elasticSearchClient.ping({ requestTimeout: 30000 }, error => {
  if (error) {
    console.error("elasticsearch cluster is down!");
  } else {
    console.log("Everything is ok");
  }
});

const searchController = {
  async searchNews(searchTerm, callback) {
    try {
      const response = {
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        searchResult: {
          title: "dads",
          desc: "dsada asd a"
        }
      };
      callback(null, response);
    } catch (err) {
      callback(null, {
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  }
};

module.exports = searchController;
