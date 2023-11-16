import mongoose from "mongoose";
import { development } from "./env.js";

mongoose.connect(`mongodb://127.0.0.1:27017/${development.db}`);

export const db = mongoose.connection;

db.on("error", console.error.bind(console, "error in connecting to mongodb"));

db.once("open", () => {
  console.log("connect to database :: mongodb");
});
