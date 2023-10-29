import mongoose from "mongoose";
import { User } from "./users.js";
const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
