const elasticSearchClient = require("../config/elasticSearch.client");

const queryBody = require("../controllers/queryBody");

function testIndices() {
  return elasticSearchClient.cat
    .indices({ v: true })
    .then(result => {
      console.log("|Test Indices|");
      console.log("-----------------------------------");
      console.log("Response Body: ");
      console.log(result);
    })
    .catch(err => console.error(`Error connecting to the es client: ${err}`));
}
function testSearchAll() {
  elasticSearchClient
    .search({ index: "news", body: queryBody.testSearchAll })
    .then(results => {
      console.log("|Test SearchAll|");
      console.log("-----------------------------------");
      console.log("Response Body: ");
      console.log(results);
      console.log(`found ${results.hits.total} items in ${results.took}ms`);
      console.log("returned 10 news titles:");
      results.hits.hits.forEach((hit, index) =>
        console.log(`\t${index} - ${hit._source.title}`)
      );
    })
    .catch(console.error);
}

function testSearchTerm(term, size) {
  elasticSearchClient
    .search({ index: "news", body: queryBody.searchTermQuery(term, size) })
    .then(results => {
      console.log("|Test SearchTerm|");
      console.log("-----------------------------------");
      console.log("Search Term:");
      console.log(term);
      console.log("Response Body: ");
      console.log(results);
      console.log(`found ${results.hits.total} items in ${results.took}ms`);
      console.log("returned 10 news titles:");
      results.hits.hits.forEach((hit, index) =>
        console.log(`\t${index} - ${hit._source.title}`)
      );
    })
    .catch(console.error);
}
testIndices();
testSearchAll();
testSearchTerm("trump", 10);
