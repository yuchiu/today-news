import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../util/secrets";

import User from "../models/User";
import rpcClient from "../config/rpcClient";

const logNewsClickForUser = (userId, newsId) => {
  rpcClient.request(
    "logNewsClickForUser",
    [userId, newsId],
    (err, response) => {
      if (err) throw err;
    }
  );
};

const jwtSignUser = user => {
  try {
    const userJson = user.toJSON();
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(userJson, JWT_SECRET, {
      expiresIn: ONE_WEEK
    });
  } catch (err) {
    console.log(err);
  }
};
const userSummary = user => {
  const summary = {
    username: user.username,
    email: user.email,
    timestamp: user.timestamp
  };
  return summary;
};

const userController = {
  signUpUser: async (req, res) => {
    try {
      const credentials = req.body;

      const isUsernameRegistered = await User.findOne({
        username: credentials.username
      });

      /* username already registered */
      if (isUsernameRegistered) {
        res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: `username: ${credentials.username} is already registered`
          }
        });
      }

      const isEmailRegistered = await User.findOne({
        email: credentials.email
      });

      /* email already registered */
      if (isEmailRegistered) {
        res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: `email: ${credentials.email} is already registered`
          }
        });
      }

      /* credential is validated */
      credentials.password = await bcrypt.hash(credentials.password, 10);
      const user = await User.create(credentials);
      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        user: userSummary(user),
        token: jwtSignUser(user)
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  },
  signInUser: async (req, res) => {
    try {
      const credentials = req.body;
      const user = await User.findOne({ username: credentials.username });

      /* user not registered */
      if (!user) {
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: `this account ${credentials.username} is not yet registered`
          }
        });
      }

      /* validate password */
      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        user.toJSON().password
      );

      /* invalid password */
      if (!isPasswordValid) {
        res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: "invalid password"
          }
        });
      }

      /* password is validated */
      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        user: userSummary(user),
        token: jwtSignUser(user)
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  },
  tryAutoSignIn: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      res.status(200).send({
        confirmation: true,
        user: userSummary(req.user)
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  },
  preferenceLogger: async (req, res) => {
    try {
      if (req.user) {
        logNewsClickForUser(req.user.id, req.params.newsDigestId);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export default userController;
