import mongoose from "mongoose";
import multer from "multer";
import path from "path";
const AVATAR_PATH = path.join("/uploads/users/avatar");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
