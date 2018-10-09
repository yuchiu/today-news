import * as passport from "passport";
import { Request, Response, NextFunction } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import User from "../models/User";
import { JWT_SECRET } from "../util/secrets";

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

const checkToken = () => (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", (err, user) => {
    if (err) {
      res.status(403).send({
        error: "token authentication failed"
      });
    } else if (!user) {
      next();
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

export { checkToken };
