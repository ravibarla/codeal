import passport from "passport";
import { OAuth2Strategy } from "passport-google-oauth";
import crypto from "crypto";
import { User } from "../models/users.js";

//tell passport to use a new strategy for google login
export const passportGoogle = passport.use(
  new OAuth2Strategy(
    {
      clientID:
        "42169523391-ff8j1pipqskkh23j2uej8efs139s0bmt.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3200/users/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      //find a user
      User.findOne({ email: profile.emails[0].value })
        .then((user) => {
          if (user) {
            //if found set the user as req.user
            // console.log(profile);
            return done(null, user);
          } else {
            //if not found create the user and set it as req.user
            User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            })
              .then((user) => done(null, user))
              .catch((err) => {
                console.log(
                  "error in creating user google startegy passport :",
                  err
                );
                return;
              });
          }
        })
        .catch((err) => {
          console.log("error in google startegy passport :", err);
          return;
        });
    }
  )
);
