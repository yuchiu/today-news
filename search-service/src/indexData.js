const elasticSearchClient = require("./config/elasticSearch.client");
const News = require("./models/News");

const bulkIndex = function bulkIndex(index, type, data) {
  const bulkBody = [];

  data.forEach(item => {
    console.log(item);
    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id: item._id.toString()
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

async function indexData() {
  const allNews = await News.find({}).lean();
  console.log(`${allNews.length} items parsed from database`);
  bulkIndex("news", "article", allNews);
}

module.exports = indexData;
