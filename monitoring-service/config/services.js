const serviceConfig = [
  {
    name: process.env.USER_SERVICE_NAME,
    url: process.env.USER_SERVICE_URL,
    port: process.env.USER_SERVICE_PORT
  },
  {
    name: process.env.SEARCH_SERVICE_NAME,
    url: process.env.SEARCH_SERVICE_URL,
    port: process.env.SEARCH_SERVICE_PORT
  },
  {
    name: process.env.NEWS_SERVICE_NAME,
    url: process.env.NEWS_SERVICE_URL,
    port: process.env.NEWS_SERVICE_PORT
  },
  {
    name: process.env.RECOMMENDATION_SERVICE_NAME,
    url: process.env.RECOMMENDATION_SERVICE_URL,
    port: process.env.RECOMMENDATION_SERVICE_PORT
  }
];

module.exports = serviceConfig;
