import express from "express";
import { destroy, index } from "../../../controllers/api/v1/posts_api.js";
import passport from "passport";
export const router = express.Router();
router.get("/", index);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  destroy
);
