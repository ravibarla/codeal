import express from "express";
import { index } from "../../../controllers/api/v1/posts_api.js";
export const router = express.Router();
router.get("/", index);
