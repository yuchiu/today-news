import jwt from "jsonwebtoken";
import { userModel } from "../models";

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  });
}

const authController = {
  register: async (req, res) => {
    try {
      const credential = req.body;
      const user = await userModel.create(credential);
      const userJson = user.toJSON();
      res.send({
        confirmation: true,
        user: userJson,
        token: jwtSignUser(userJson)
      });
    } catch (err) {
      res.send({
        confirmation: false,
        error: err
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
          error: "no user was found"
        });
      }
      // validate password
      if (user.password !== password) {
        return res.send({
          confirmation: false,
          error: "password invalid"
        });
      }
      const userJson = user.toJSON();
      res.send({
        confirmation: true,
        user,
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
