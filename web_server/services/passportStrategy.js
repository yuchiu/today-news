import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      callbackURL: "/",
      clientID:
        "25628771030-k5ucj1s748k0e773rgahps3ec55htlm4.apps.googleusercontent.com",
      clientSecret: "V7x2sjF4qyNzuRcmCffjetpL"
    },
    () => {
      // passport callback
    }
  )
);
