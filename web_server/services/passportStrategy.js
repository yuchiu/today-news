import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

export default passport.use(
  new GoogleStrategy({
    // options for google strategy
    callbackURL: "/",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
  () => {
    // passport callback
  }
);
