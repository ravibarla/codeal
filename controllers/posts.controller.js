import { Post } from "../models/post.js";
export const create = (req, res) => {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then((post) => res.redirect("back"))
    .catch((err) => {
      if (err) {
        console.log("error in creating a post");
        return;
      }
    });
};
