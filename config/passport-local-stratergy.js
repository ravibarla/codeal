import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/users.js";

//authentication using passport
export const passportLocal = passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      //find a user and establish an identity
      User.findOne({ email: email })
        .catch((err) => {
          console.log("error in finding user-->passport");
          return done(err);
        })
        .then((user) => {
          if (!user || user.password != password) {
            console.log("invalid user id or password");
            return done(null, false);
          }
          return done(null, user);
        });
    }
  )
);

//serializing the user to keep in the cookies
passport.serializeUser((user, done) => {
  done(null, user._id);
});
//deserializing the user from the cookies
passport.deserializeUser((id, done) => {
  User.findById(id)
    .catch((err) => {
      console.log("error in finding user");
      return done(err);
    })
    .then((user) => {
      return done(null, user);
    });
});
