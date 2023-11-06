import express from "express";
import { destroy, index } from "../../../controllers/api/v1/posts_api.js";
export const router = express.Router();
router.get("/", index);
router.delete("/:id", destroy);
