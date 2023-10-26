import express from "express"
import { create, createSession, profile, signIn, signUp } from "../controllers/users.controller.js"

export const router = express.Router()
router.get("/profile", profile)
router.get("/signin", signIn)
router.get("/signup", signUp)
router.post("/create", create)
router.post("/createSession", createSession)
