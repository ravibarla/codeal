import express from "express";
import { router as postsRouter } from "./posts.js";
import { router as usersRouter } from "./users.js";
export const router = express.Router();
router.use("/posts", postsRouter);
router.use("/users", usersRouter);
