import mongoose from "mongoose";
import { User } from "./users.js";
import { Post } from "./post.js";
export const commentSchema =new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    //comment belong to a user
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Like",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
