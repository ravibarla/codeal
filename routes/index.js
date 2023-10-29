import express from "express";
import { home } from "../controllers/home.controller.js";
import { router as users } from "./users.js";
import { router as posts } from "./posts.js";
export const router = express.Router();
router.get("/", home);
router.use("/users", users);
router.use("/posts", posts);
console.log("router is loaded");
