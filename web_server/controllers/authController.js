import bcrypt from "bcrypt";

import { userModel } from "../models";

const authController = {
  register: async (req, res) => {
    try {
      const credential = req.body;
      const user = await userModel.create(credential);
      const userJson = user.toJSON();
      res.send({
        confirmation: true,
        user: userJson,
        token: "xxx"
      });
    } catch (err) {
      res.send({
        confirmation: false,
        error: err
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({
        where: {
          email
        }
      });
      if (!user) {
        res.status(403).send({
          confirmation: false,
          error: "invalid sign in info"
        });
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(403).send({
          error: "Invalid log in info"
        });
      }
      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: "xxx"
      });
    } catch (err) {
      // email already exists
      res.status(500).send({
        error: "an error has occured trying to login"
      });
    }
  }
};

export default authController;
