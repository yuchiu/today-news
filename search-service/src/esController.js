const News = require("./models/News");

const elasticSearchClient = require("./config/elasticSearch.client");

elasticSearchClient.ping({ requestTimeout: 30000 }, error => {
  if (error) {
    console.error("elasticsearch cluster is down!");
  } else {
    console.log("Everything is ok");
  }
});

const bulkIndex = function bulkIndex(index, type, data) {
  const bulkBody = [];

  data.forEach(item => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type
      }
    });

    bulkBody.push(item);
  });

  elasticSearchClient
    .bulk({ body: bulkBody })
    .then(response => {
      const errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(errorCount + 1, item.index.error);
        }
      });
      console.log(
        `Successfully indexed ${data.length - errorCount}
       out of ${data.length} items`
      );
    })
    .catch(console.err);
};

module.exports = {
  indexData: async function indexData() {
    const allNews = await News.find({}).lean();
    console.log(`${allNews.length} items parsed from database`);
    bulkIndex("news", "article", allNews);
  },

  checkIndices: function indices() {
    return elasticSearchClient.cat
      .indices({ v: true })
      .then(console.log)
      .catch(err => console.error(`Error connecting to the es client: ${err}`));
  }
};
