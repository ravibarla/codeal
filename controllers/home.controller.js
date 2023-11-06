import { Post } from "../models/post.js";
import { User } from "../models/users.js";
export const home = async (req, res) => {
  try {
    //populate the user for each posts
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

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
