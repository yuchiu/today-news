const jayson = require("jayson");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

mongoose.connect(
  process.env.MONGODB_URI_LOCAL,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(`DB Connection failed:${err}`);
    } else {
      console.log("DB Connection Success");
    }
  }
);

// create a server
const server = jayson.server({
  add: function(args, callback) {
    callback(null, args[0] + args[1]);
  },
  searchNews: function(searchTerm, callback) {
    controller.searchNews(searchTerm, callback);
  }
});

server
  .http()
  .listen(5050, () =>
    console.log(`search service listenning on port ${process.env.SERVER_PORT}`)
  );
