import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/codeal_development")

export const db = mongoose.connection

db.on("error", console.error.bind(console, "error in connecting to mongodb"))

db.once("open", () => {
    console.log("connect to database :: mongodb")
})