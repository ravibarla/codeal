import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/users.js";

//authentication using passport
export const passportLocal = passport.use(
  new Strategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      //find a user and establish an identity
      User.findOne({ email: email })
        .catch((err) => {
          req.flash("error", err);
          return done(err);
        })
        .then((user) => {
          if (!user || user.password != password) {
            req.flash("error", "invalid user/password");
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

//check if user is authenticated
passport.checkAuthentication = (req, res, next) => {
  //if user is signed in then pass on the request to the next function (controllers action)
  if (req.isAuthenticated()) {
    return next();
  }
  //if user is not sign in
  return res.redirect("/users/signin");
};

passport.setAuthenticatorUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    //req.user contains current signed in user from the session and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  return next();
};
