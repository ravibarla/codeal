import express from "express";
import { create } from "../controllers/posts.controller.js";

export const router = express.Router();

router.post("/create", create);
