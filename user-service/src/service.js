const jayson = require("jayson");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const controller = require("./controllers");

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
  signUpUser: function(credentials, callback) {
    controller.signUpUser(credentials, callback);
  },
  signInUser: function(credentials, callback) {
    console.log("signInUser");
    controller.signInUser(credentials, callback);
  },
  tryAutoSignIn: function(user, callback) {
    controller.tryAutoSignIn(user, callback);
  }
});

server
  .http()
  .listen(4040, () =>
    console.log(`user service listenning on port ${process.env.SERVER_PORT}`)
  );
