const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const jwtSignUser = user => {
  try {
    const userJson = user.toJSON();
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(userJson, process.env.JWT_SECRET, {
      expiresIn: ONE_WEEK
    });
  } catch (err) {
    console.log(err);
  }
};
const userSummary = user => {
  const summary = {
    id: user._id,
    username: user.username,
    email: user.email,
    timestamp: user.timestamp
  };
  return summary;
};

const userController = {
  signUpUser: async function(credentials, callback) {
    try {
      let response;
      const isUsernameRegistered = await User.findOne({
        username: credentials.username
      });

      /* username already registered */
      if (isUsernameRegistered) {
        response = {
          meta: {
            type: "error",
            status: 403,
            message: `username: ${credentials.username} is already registered`
          }
        };
        callback(null, response);
      }

      const isEmailRegistered = await User.findOne({
        email: credentials.email
      });

      /* email already registered */
      if (isEmailRegistered) {
        response = {
          meta: {
            type: "error",
            status: 403,
            message: `email: ${credentials.email} is already registered`
          }
        };
        callback(null, response);
      }

      /* credential is validated */
      credentials.password = await bcrypt.hash(credentials.password, 10);
      const user = await User.create(credentials);
      response = {
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        user: userSummary(user),
        token: jwtSignUser(user)
      };
      callback(null, response);
    } catch (err) {
      response = {
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      };
      callback(null, response);
    }
  },
  signInUser: async function(credentials, callback) {
    try {
      let response;
      const user = await User.findOne({ username: credentials.username });

      /* user not registered */
      if (!user) {
        response = {
          meta: {
            type: "error",
            status: 403,
            message: `this account ${
              credentials.username
            } is not yet registered`
          }
        };
        callback(null, response);
      }

      /* validate password */
      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        user.toJSON().password
      );

      /* invalid password */
      if (!isPasswordValid) {
        response = {
          meta: {
            type: "error",
            status: 403,
            message: "invalid password"
          }
        };
        callback(null, response);
      }

      /* password is validated */
      response = {
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        user: userSummary(user),
        token: jwtSignUser(user)
      };
      callback(null, response);
    } catch (err) {
      console.log(err);
      response = {
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      };
      callback(null, response);
    }
  },

  tryAutoSignIn: function(user, callback) {
    const response = {
      meta: {
        type: "success",
        status: 200,
        message: ""
      },
      user: userSummary(user)
    };
    callback(null, response);
  }
};

module.exports = userController;
