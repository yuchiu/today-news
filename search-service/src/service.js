const jayson = require("jayson");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const controller = require("./controllers");
const elasticSearchClient = require("./config/elasticSearch.client");

// Load environment variables from .env file, where API keys and passwords are configured
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

const server = jayson.server({
  heartbeat(args, callback) {
    console.log("heartbeat called");
    callback(null, {
      success: true,
      config: {
        name: process.env.SERVICE_NAME,
        url: process.env.SERVER_URL,
        port: process.env.SERVER_PORT
      }
    });
  },
  searchNews(searchTerm, callback) {
    console.log("searchNews called");
    controller.searchNews(searchTerm, callback);
  }
});

server
  .http()
  .listen(process.env.SERVER_PORT, () =>
    console.log(`search service listenning on port ${process.env.SERVER_PORT}`)
  );
