import { Post } from "../models/post.js";

export const home = (req, res) => {
  // console.log(req.cookies)
  // res.cookies("user_id",25)
  //   Post.find({})
  //     .then((posts) => {
  //       return res.render("home", {
  //         title: "codeal |home",
  //         posts: posts,
  //       });
  //     })
  //     .catch((err) => console.log("error in finding the posts"));

  //populate the user for each posts
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((posts) => {
      return res.render("home", {
        title: "codeal |home",
        posts: posts,
      });
    });
};
