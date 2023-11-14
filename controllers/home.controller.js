import { Post } from "../models/post.js";
import { User } from "../models/users.js";
export const home = async (req, res) => {
  try {
    // change :: populate likes of each post and comment
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
        populate: {
          path: "likes",
        }
      })
      .populate("comments")
      .populate("likes");

    let users = await User.find({});

    return res.render("home", {
      title: "codeal |home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return; 
  }
};
