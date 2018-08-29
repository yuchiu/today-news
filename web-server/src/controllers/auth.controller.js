import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import config from "../../config";
import { userModel } from "../models";

const jwtSignUser = user => {
  const userJson = user.toJSON();
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(userJson, config.JWT_SECRET, {
    expiresIn: ONE_WEEK
  });
};

const userSummary = user => {
  const summary = {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    desc: user.description,
    timestamp: user.timestamp
  };
  return summary;
};

const authController = {
  autoLogin: async (req, res) => {
    try {
      // req.user is retreived from auth.policy
      const userId = req.user._id;
      const user = await userModel.findOne({
        _id: userId
      });

      res.status(200).send({
        confirmation: true,
        user: userSummary(user)
      });
    } catch (err) {
      console.log(err);
    }
  },
  // eslint-disable-next-line consistent-return
  register: async (req, res) => {
    try {
      const credentials = req.body;

      // find user, return error if user is found
      const isUserCreated = await userModel.findOne({
        email: credentials.email
      });
      if (isUserCreated) {
        res.status(400).send({
          confirmation: false,
          message: `this email account ${req.body.email} is already registered`
        });
      }

      // hash password & create user
      credentials.password = bcrypt.hashSync(credentials.password, 10);
      const user = await userModel.create(credentials);

      res.status(200).send({
        confirmation: true,
        user: userSummary(user),
        token: jwtSignUser(user)
      });
    } catch (err) {
      // other server error
      res.status(500).send({
        confirmation: false,
        message: "An error has occured trying to register"
      });
    }
  },

  // eslint-disable-next-line consistent-return
  login: async (req, res) => {
    try {
      const credentials = req.body;
      // find user, return error if user is not found
      const user = await userModel.findOne({
        email: credentials.email
      });
      if (!user) {
        return res.status(400).send({
          confirmation: false,
          message: `this email account ${req.body.email} is not yet registered`
        });
      }

      // validate password
      const isPasswordValid = bcrypt.compareSync(
        credentials.password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).send({
          confirmation: false,
          message: "Invalid log in infomation"
        });
      }

      // user is validated
      res.status(200).send({
        confirmation: true,
        user: userSummary(user),
        token: jwtSignUser(user)
      });
    } catch (err) {
      // other server error
      res.status(500).send({
        confirmation: false,
        message: "An error has occured trying to log in"
      });
    }
  }
};

export default authController;
