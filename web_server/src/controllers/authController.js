import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { userModel } from "../models";

const jwtSignUser = user => {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, process.env.JWT_SECRET, {
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
  register: async (req, res) => {
    try {
      // hash password & create user
      const credential = req.body;
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
      res.send({
        confirmation: false,
        error: `this email account ${req.body.email} is already registered`
      });
    }
  },
  // eslint-disable-next-line consistent-return
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({
        email
      });
      // find user
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
      res.status(500).send({
        error: "an error has occured trying to login"
      });
    }
  }
};

export default authController;
