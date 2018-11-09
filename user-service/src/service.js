var jayson = require("jayson");
var userController = require("./controllers/user.controller");

// create a server
var server = jayson.server({
  add: function(args, callback) {
    callback(null, args[0] + args[1]);
  },
  signUpUser: function(args, callback) {
    userController.signUpUser(args, callback);
  },
  signInUser: function(args, callback) {
    console.log("signInUser");
    userController.signInUser(args, callback);
  },
  tryAutoSignIn: function(args, callback) {
    userController.tryAutoSignIn(args, callback);
  }
});

server.http().listen(4040);
