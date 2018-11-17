const elasticSearchClient = require("../config/elasticSearch.client");

const esController = require("../controllers/es.controller");
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
  esController
    .search("news", queryBody.testSearchAll)
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

function testSearchTerm(searchTerm, size) {
  esController
    .search("news", queryBody.search(searchTerm, size))
    .then(results => {
      console.log("|Test SearchTerm|");
      console.log("-----------------------------------");
      console.log("Search Term:");
      console.log(searchTerm);
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
// function testSuggestTerm(text, field, size) {
//   esController
//     .suggest("news", queryBody.suggest(text, field, size))
//     .then(results => {
//       console.log("|Test SuggestTerm|");
//       console.log("-----------------------------------");
//       console.log("Text:");
//       console.log(text);
//       console.log("Response Body: ");
//       console.log(results);
//     })
//     .catch(console.error);
// }

testIndices();
testSearchAll();
testSearchTerm("trump", 10);
// testSuggestTerm("tru", "title", 5);
