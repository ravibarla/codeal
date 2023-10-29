import { Comment } from "../models/comment.js";
import { Post } from "../models/post.js";

export const create = (req, res) => {
  Post.findById(req.body.post)
    .then((post) => {
      Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      })
        .then((comment) => {
          post.comments.push(comment);
          post.save();
          return res.redirect("/");
        })
        .catch((err) => console.log("error in creating comment"));
    })
    .catch((err) => console.log(""));
};
