import express from "express";
import { home } from "../controllers/home.controller.js";
import { router as usersRouter } from "./users.js";
import { router as postsRouter } from "./posts.js";
import { router as commentsRouter } from "./comments.js";
import { router as apiRouter } from "./api/index.js";
export const router = express.Router();
router.get("/", home);
router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/api", apiRouter);

console.log("router is loaded");
