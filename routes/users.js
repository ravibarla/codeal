import express from "express";

export const router = express.Router();
import {
  create,
  profile,
  signIn,
  signUp,
  createSession,
  destroySession,
  update,
} from "../controllers/users.controller.js";
import passport from "passport";
router.get(
  "/profile/:id",
  (req, res, next) => passport.checkAuthentication(req, res, next),
  profile
);

router.post(
  "/update/:id",
  (req, res, next) => passport.checkAuthentication(req, res, next),
  update
);
router.get("/signin", signIn);
router.get("/signup", signUp);
router.post("/create", create);

//use passport as amiddleware to authenticate
router.post(
  "/createSession",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  createSession
);
router.get("/signout", destroySession);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/signin" }),
  createSession
);
