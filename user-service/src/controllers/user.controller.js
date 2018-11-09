const User = require("../models/User");
const userController = {
  signUpUser: function(args, callback) {
    const response = "called signUpUser";
    console.log(response);
    callback(null, response);
  },
  signInUser: function(args, callback) {
    const response = "called signInUser";
    console.log(response);
    callback(null, response);
  },
  tryAutoSignIn: function(args, callback) {
    const response = "called tryAutoSignIn";
    console.log(response);
    callback(null, response);
  }
};

module.exports = userController;
