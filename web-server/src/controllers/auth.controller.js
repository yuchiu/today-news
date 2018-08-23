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
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    timestamp: user.timestamp
  };
  return summary;
};

const authController = {
  // eslint-disable-next-line consistent-return
  register: async (req, res) => {
    try {
      const credential = req.body;

      // find user, return error if user is found
      const isUserCreated = await userModel.findOne({
        email: credential.email
      });
      if (isUserCreated) {
        return res.send({
          confirmation: false,
          error: `this email account ${req.body.email} is already registered`
        });
      }

      // hash password & create user
      credential.password = bcrypt.hashSync(credential.password, 10);
      const user = await userModel.create(credential);

      // user is created successfully
      const userJson = user.toJSON();
      res.send({
        confirmation: true,
        user: userSummary(userJson),
        token: jwtSignUser(userJson)
      });
    } catch (err) {
      // other server error
      res.send({
        confirmation: false,
        error: "an error has occured trying to register"
      });
    }
  },

  // eslint-disable-next-line consistent-return
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // find user, return error if user is not found
      const user = await userModel.findOne({
        email
      });
      if (!user) {
        return res.send({
          confirmation: false,
          error: `this email account ${req.body.email} is not yet registered`
        });
      }

      // validate password
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.send({
          confirmation: false,
          error: "invalid log in information"
        });
      }

      // user is validated
      const userJson = user.toJSON();
      res.send({
        confirmation: true,
        user: userSummary(userJson),
        token: jwtSignUser(userJson)
      });
    } catch (err) {
      // other server error
      res.send({
        confirmation: false,
        error: "an error has occured trying to login"
      });
    }
  }
};

export default authController;
