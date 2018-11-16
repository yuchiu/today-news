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
  signUpUser(credentials, callback) {
    console.log("signUpUser called");
    controller.signUpUser(credentials, callback);
  },
  signInUser(credentials, callback) {
    console.log("signInUser called");
    controller.signInUser(credentials, callback);
  },
  tryAutoSignIn(user, callback) {
    console.log("tryAutoSignIn called");
    controller.tryAutoSignIn(user, callback);
  }
});

server
  .http()
  .listen(process.env.SERVER_PORT, () =>
    console.log(`user service listenning on port ${process.env.SERVER_PORT}`)
  );
