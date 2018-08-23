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
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    desc: user.description,
    timestamp: user.timestamp
  };
  return summary;
};

const authController = {
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

      res.send({
        confirmation: true,
        message: "register successfully",
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
      res.send({
        confirmation: true,
        message: "log in successfully",
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
