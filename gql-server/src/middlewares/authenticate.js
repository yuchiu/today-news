import passport from "passport";

export default (req, res, next) => {
  passport.authenticate("jwt", (err, user) => {
    if (err || !user) {
      res.status(403).send({
        meta: {
          type: "error",
          status: 403,
          message: "token authentication failed"
        }
      });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};
