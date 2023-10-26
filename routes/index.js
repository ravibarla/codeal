import express from "express"
import { home } from "../controllers/home.controller.js"
import { router as users } from "./users.js"
export const router = express.Router()
router.get("/", home)
router.use("/users", users)
console.log("router is loaded")