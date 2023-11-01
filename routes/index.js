import express from "express";
import { home } from "../controllers/home.controller.js";
import { router as usersRouter } from "./users.js";
import { router as postsRouter } from "./posts.js";
import { router as commentsRouter } from "./comments.js";

export const router = express.Router();
router.get("/", home);
router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);

console.log("router is loaded");
