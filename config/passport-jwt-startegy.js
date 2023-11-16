import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/users.js";
import { development } from "./env.js";

export const passportJWT = null;

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: development.jwtSecretKey,
};
passport.use(
  new Strategy(opts, (jwtPayLoad, done) => {
    User.findById(jwtPayLoad._id)
      .catch((err) => {
        console.log("error in finding user from jwt");
      })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
  })
);
