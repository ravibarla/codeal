import express from "express";
import { toggleLike } from "../controllers/like.controller.js";
export const router = express.Router();

router.post("/toggle", toggleLike);
