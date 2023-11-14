import express from "express";
import { toggleLike } from "../controllers/likes.controller.js";
export const router = express.Router();

router.post("/toggle", toggleLike);
