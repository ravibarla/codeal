import express from "express"
import { profile } from "../controllers/users.controller.js"

export const router = express.Router()
router.get("/profile", profile)
