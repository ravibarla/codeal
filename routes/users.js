import express from "express";
import {
  create,
  profile,
  signIn,
  signUp,
  createSession,
} from "../controllers/users.controller.js";
import passport from "passport";
export const router = express.Router();
router.get("/profile", profile);
router.get("/signin", signIn);
router.get("/signup", signUp);
router.post("/create", create);
//use passport as amiddleware to authenticate
router.post(
  "/createSession",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  createSession
);
