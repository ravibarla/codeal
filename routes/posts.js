import express from "express";
import { create } from "../controllers/posts.controller.js";
import passport from "passport";

export const router = express.Router();

router.post(
  "/create",
  (req, res, next) => passport.checkAuthentication(req, res, next),
  create
);
