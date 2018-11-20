import mongoose from "mongoose";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JWT_SECRET } from "../util/secrets";

const User = mongoose.model("users", new mongoose.Schema({}));

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findOne({
          _id: jwtPayload._id
        });
        if (!user) {
          return done(new Error(), false);
        }
        return done(null, user);
      } catch (err) {
        return done(new Error(), false);
      }
    }
  )
);
