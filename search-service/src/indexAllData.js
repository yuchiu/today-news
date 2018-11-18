/** ********************************************
 *                   Warning!!!                *
 *                                             *
 * Only run this once for initializing indices *
 *                                             *
 * Ignore this if you know what you are doing  *
 ********************************************** */

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const News = require("./models/News");
const elasticSearchClient = require("./config/elasticSearch.client");

dotenv.config();

elasticSearchClient.ping({ requestTimeout: 30000 }, error => {
  if (error) {
    console.error(`Elasticsearch connection failed: ${error}`);
  } else {
    console.log("Elasticsearch connection success");
  }
});

mongoose.connect(
  process.env.MONGODB_URI_LOCAL,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(`MongoDB connection failed: ${err}`);
    } else {
      console.log("MongoDB connection success");
    }
  }
);

const bulkIndex = function bulkIndex(index, type, data) {
  const bulkBody = [];

  data.forEach(item => {
    /*
      _id parameter is reserved for ElasticSearch, renamed _id to id
    */
    // eslint-disable-next-line
    item._id = item.id;
    // eslint-disable-next-line
    delete item._id;

    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id: item.id
      }
    });
    bulkBody.push(item);
  });

  elasticSearchClient
    .bulk({ body: bulkBody })
    .then(response => {
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.create.error) {
          errorCount += 1;
          console.log(`error count: ${errorCount}, error message:`);
          console.log(item.create.error);
        }
      });
      console.log(
        `Successfully indexed ${response.items.length - errorCount}
       out of ${data.length} items`
      );
    })
    .catch(console.err);
};

/*
  this function will index all data from MongoDB news collection to ElasticSearch
*/
async function indexAllNews() {
  const allNews = await News.find({}).lean();
  console.log(`${allNews.length} items parsed from database`);
  bulkIndex("news", "article", allNews);
}

/*
  indexAllNews() will index all data from MongoDB news collection to ElasticSearch,
  only run this function for initializing ElasticSearch database
*/
indexAllNews();
