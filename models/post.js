import mongoose from "mongoose";
import { User } from "./users.js";
import { Comment } from "./comment.js";
const postSchema =new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: User,
    },
    //include the array of ids of all comments in this post schema itself
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Like",
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
