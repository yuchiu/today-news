const serviceConfig = [
  {
    name: process.env.SERVICE_USER_NAME,
    url: process.env.SERVICE_USER_URL,
    port: process.env.SERVICE_USER_PORT
  },
  {
    name: process.env.SERVICE_SEARCH_NAME,
    url: process.env.SERVICE_SEARCH_URL,
    port: process.env.SERVICE_SEARCH_PORT
  },
  {
    name: process.env.SERVICE_NEWS_NAME,
    url: process.env.SERVICE_NEWS_URL,
    port: process.env.SERVICE_NEWS_PORT
  },
  {
    name: process.env.SERVICE_RECOMMENDATION_NAME,
    url: process.env.SERVICE_RECOMMENDATION_URL,
    port: process.env.SERVICE_RECOMMENDATION_PORT
  }
];

module.exports = serviceConfig;
