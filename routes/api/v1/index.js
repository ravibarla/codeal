import express from "express";
import { router as postsRouter } from "./posts.js";
export const router = express.Router();
router.use("/posts", postsRouter);
