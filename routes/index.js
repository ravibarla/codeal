import express from "express"
import { home } from "../controllers/home.controller.js"
import { profile } from "../controllers/users.controller.js"
export const router = express.Router()
router.get("/", home)
router.use("/users", profile)
console.log("router is loaded")