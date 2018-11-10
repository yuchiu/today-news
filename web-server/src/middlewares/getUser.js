import passport from "passport";

export default (req, res, next) => {
  passport.authenticate("jwt", (err, user) => {
    if (err || !user) {
      next();
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};
