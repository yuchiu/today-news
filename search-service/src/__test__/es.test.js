const elasticSearchClient = require("../config/elasticSearch.client");

const esController = require("../esController");

module.exports = {
  testIndices: function indices() {
    return elasticSearchClient.cat
      .indices({ v: true })
      .then(console.log)
      .catch(err => console.error(`Error connecting to the es client: ${err}`));
  },
  testSearch() {
    const body = {
      size: 20,
      from: 0,
      query: {
        match_all: {}
      }
    };

    esController
      .search("news", body)
      .then(results => {
        console.log(`found ${results.hits.total} items in ${results.took}ms`);
        console.log("returned news titles:");
        results.hits.hits.forEach((hit, index) =>
          console.log(`\t${body.from + index + 1} - ${hit._source.title}`)
        );
      })
      .catch(console.error);
  }
};
