import * as passport from "passport";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", (err, user) => {
    if (err || !user) {
      res.status(403).send({
        error: "token authentication failed"
      });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};
