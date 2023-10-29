import express from "express";
import { create, destroy } from "../controllers/comment.controller.js";
export const router = express.Router();
import passport from "passport";

router.post(
  "/create",
  (req, res, next) => passport.checkAuthentication(req, res, next),
  create
);
router.get(
  "/destroy/:id",
  (req, res, next) => passport.checkAuthentication(req, res, next),
  destroy
);
